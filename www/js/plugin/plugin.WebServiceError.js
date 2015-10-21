/**
 * Copyright (c) 2015 martin.kattner@stygs.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var plugin_WebServiceError = {
	config : null,
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred(), hash, length, _char;

		String.prototype.hashCode = function() {
			hash = 0;
			length = this.length;

			if (length == 0)
				return hash;
			for (i = 0; i < length; i++) {
				_char = this.charCodeAt(i);
				hash = ((hash << 5) - hash) + _char;
				hash = hash & hash; // Convert to 32bit integer
			}
			return hash;
		}

		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.trace("plugin_WebServiceError.pluginsLoaded()");
		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;

		if (plugin_WebServiceError.config.errorKeys == undefined) {
			app.debug.error("No errorKeys Array in plugin.WebServiceError.json");
			dfd.reject();
		}

		// load the webservice definitions
		$.each(plugin_WebServiceError.config.wseFiles, function(path, loadFile) {
			if (loadFile) {
				promises.push(plugin_WebServiceError.loadDefinitionFileAsync(path));
			}
		});

		promiseOfPromises = $.when.apply($, promises);

		promiseOfPromises.done(function() {
			dfd.resolve();
		});
		promiseOfPromises.fail(function() {
			dfd.reject();
		});

		return dfd.promise();

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.trace("plugin_WebServiceError.pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.trace("plugin_WebServiceError.definePluginEvents()");

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_WebServiceError.afterHtmlInjectedBeforePageComputing()");

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_WebServiceError.pageSpecificEvents()");

	},
	// private functions
	loadDefinitionFileAsync : function(path) {
		app.debug.trace("plugin_WebServiceError.loadDefinitionFileAsync(" + path + ")", 20);
		var dfd = $.Deferred(), promise;
		promise = globalLoader.AsyncJsonLoader(path);

		promise.done(function(json) {
			$.each(json, function(name, values) {
				app.debug.debug("pugin.WebServiceError.js ~ plugin_WebServiceError.loadDefinitionFileAsync() - add: " + name, 20);
				plugin_WebServiceError.config.wse[name] = values;
			});
			dfd.resolve();
		});
		promise.done(function() {
			dfd.reject();
		});

		return dfd.promise();
	},

	loadDefinitionFile : function(path) {
		app.debug.trace("plugin_WebServiceError.loadDefinitionFile()");
		app.debug.debug("Load definition file: " + path);
		var json = globalLoader.JsonLoader(path);
		$.each(json, function(name, values) {
			app.debug.debug("Add definition: " + name, 20);
			plugin_WebServiceError.config.wse[name] = values;
		});
	},

	// public functions
	// called by user
	functions : {
		action : function(exceptionConfig) {
			app.debug.trace("plugin_WebServiceError.functions.action()");
		},

		getErrorName : function(webserviceResult) {
			app.debug.trace("plugin_WebServiceError.functions.getErrorName()");
			var errorName = false;

			if (webserviceResult.statusText === "error" && webserviceResult.readyState === 0 && webserviceResult.status === 0) {
				app.debug.debug("plugin_WebServiceError.functions.getErrorName() - case: webservice timed out");
				errorName = "timeout";
			}

			else {

				$.each(plugin_WebServiceError.config.errorKeys, function(index, errorKey) {

					if (webserviceResult.hasOwnProperty(errorKey)) {
						app.debug.debug("plugin_WebServiceError.functions.getErrorName() - case: webservice result has error key: " + errorKey);
						errorName = webserviceResult[errorKey];
						return false;
					}

				});
			}

			return errorName;
		},

		getExceptionConfig : function(webserviceResult) {
			app.debug.trace("plugin_WebServiceError.functions.getExceptionConfig()");

			var errorName = null;

			errorName = plugin_WebServiceError.functions.getErrorName(webserviceResult);

			if (errorName) {
				app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - errors");
				for (key in plugin_WebServiceError.config.wse) {
					app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - " + key + " == " + errorName);
					if (key == errorName) {
						app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - case: error found");
						return {
							"id" : Math.abs(key.hashCode()),
							"wse" : plugin_WebServiceError.config.wse[key]
						};
					}
				}
			}

			return false;
		}

	}
};