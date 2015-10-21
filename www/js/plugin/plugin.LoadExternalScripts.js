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

var plugin_LoadExternalScripts = {
	config : null,
	loadedScripts : {},
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);

		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;
		console.log("TODO - script loading");

		// styles
		$.each(plugin_LoadExternalScripts.config.scripts.css, function(key, value) {
			if (value) {
				if (key in plugin_LoadExternalScripts.loadedScripts) {
					;// do nothing already loaded
				} else {
					promises.push(globalLoader.AsyncStyleLoader(key));
					plugin_LoadExternalScripts.loadedScripts[key] = true;
				}

			}
		});

		// scripts ordered
		app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - case: load ordered scripts");
		if (plugin_LoadExternalScripts.config.scripts.javascriptOrdered)
			promises.push(plugin_LoadExternalScripts.loadScriptsAsync(plugin_LoadExternalScripts.config.scripts.javascriptOrdered.slice()));

		// scripts unordered
		app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - case: load unordered scripts");
		if (plugin_LoadExternalScripts.config.scripts.javascript)
			$.each(plugin_LoadExternalScripts.config.scripts.javascript, function(key, value) {
				if (value) {
					promises.push(globalLoader.AsyncScriptLoader(key));
					plugin_LoadExternalScripts.loadedScripts[key] = true;
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
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents : function() {
	},
	// called by pages.js
	// called for each page
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
	},
	// called once
	pageSpecificEvents : function() {
		app.debug.alert("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
	},

	loadScriptsAsync : function(scriptArray) {
		app.debug.trace("plugin_LoadExternalScripts.loadSingleScriptAsync()");

		var dfd = $.Deferred(), url, promise;

		url = scriptArray.pop();

		app.debug.debug("plugin_LoadExternalScripts.loadSingleScriptAsync() - LOAD url: " + url);

		globalLoader.AsyncScriptLoader(url).done(function() {
			plugin_LoadExternalScripts.loadedScripts[url] = true;
			app.debug.debug("plugin_LoadExternalScripts.loadSingleScriptAsync() - DONE url: " + url);
			if (scriptArray.length) {
				app.debug.debug("plugin_LoadExternalScripts.loadSingleScriptAsync() - case: script array not empty; call again");
				promise = plugin_LoadExternalScripts.loadScriptsAsync(scriptArray);

				promise.done(function() {
					dfd.resolve();
				});

				promise.fail(function() {
					dfd.reject();
				});
			}

			else {
				app.debug.debug("plugin_LoadExternalScripts.loadSingleScriptAsync() - case: script array empty; resolve");
				dfd.resolve();
			}
		}).fail(function() {
			app.debug.debug("plugin_LoadExternalScripts.loadSingleScriptAsync() - FAIL url: " + url);
			dfd.reject();
		});
		return dfd.promise();
	},

	// public
	// called by user
	functions : {
		css : function(url) {
			app.debug.trace("plugin_LoadExternalScripts.functions.css()");
			var promise;
			if (url in plugin_LoadExternalScripts.loadedScripts) {
				app.debug.debug("plugin_LoadExternalScripts.functions.css() - css already loaded: " + url);

				return $.Deferred().resolve();
			}

			else {
				app.debug.debug("plugin_LoadExternalScripts.functions.css() - load css: " + url);
				promise = globalLoader.AsyncStyleLoader(url);

				promise.done(function() {
					app.debug.debug("plugin_LoadExternalScripts.functions.css() - css loading done: " + url);
					app.debug.debug("plugin_LoadExternalScripts.functions.css() - add url to loadedScripts array");
					plugin_LoadExternalScripts.loadedScripts[url] = true;
				});

				return promise;
			}

		},
		javascript : function(url) {
			app.debug.trace("plugin_LoadExternalScripts.functions.javascript()");
			if (url in plugin_LoadExternalScripts.loadedScripts) {
				;// do nothing already loaded
			} else {
				globalLoader.AsyncScriptLoader(url);
				plugin_LoadExternalScripts.loadedScripts[url] = true;
			}
		}
	}
};