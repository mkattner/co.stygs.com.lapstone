/*
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

/**
 * @author Martin Kattner <martin.kattner@gmail.com>
 */

//LoadExternalScripts
/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
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
		promises.push(plugin_LoadExternalScripts.loadScriptsAsync(plugin_LoadExternalScripts.config.scripts.javascriptOrdered.slice()));

		// scripts unordered
		app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - case: load unordered scripts");
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
		})

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