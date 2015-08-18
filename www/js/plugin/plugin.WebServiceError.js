// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_TEMPLATE__
 * 
 * @version 1.0
 * @namespace plugin_TEMPLATE__
 */
var plugin_WebServiceError = {
	config : null,
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
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
				app.debug.alert("pugin.WebServiceError.js ~ plugin_WebServiceError.loadDefinitionFileAsync() - add: " + name, 20);
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
		doAction : function() {
		},

		getExceptionConfig : function(exception) {
			app.debug.trace("plugin_WebServiceError.functions.getExceptionConfig()");

			var errorName = null;

			app.debug.alert("plugin.WebServiceError.js ~ plugin_WebServiceError.functions.getExceptionConfig()" + JSON.stringify(exception));

			if (exception.statusText === "error" && exception.readyState === 0 && exception.status === 0) {
				errorName = "timeout";
			} else {

				// if (exception.error != undefined) {
				// errorName = exception.error;
				// } else if (exception.status != undefined) {
				// errorName = exception.status;
				// } else if (exception.exception)
				// errorName = exception.exception;

				$.each(plugin_WebServiceError.config.errorKeys, function(key, value) {
					if (exception[value] != undefined) {
						errorName = exception[value];
						return false;
					}
				});
			}

			if (errorName != null) {
				app.debug.alert("plugin.WebServiceError.js ~ plugin_WebServiceError.functions.getExceptionConfig() - errors", 60);
				for (key in plugin_WebServiceError.config.wse) {
					app.debug.alert("plugin.WebServiceError.js ~ plugin_WebServiceError.functions.getExceptionConfig() - " + key + " == " + errorName, 60);
					if (key == errorName) {
						app.debug.alert("plugin.WebServiceError.js ~ plugin_WebServiceError.functions.getExceptionConfig() - case: error found", 60);
						return plugin_WebServiceError.config.wse[key];
					}
				}
			}

			return false;
		}

	}
};