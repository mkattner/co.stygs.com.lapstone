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
		$.each(plugin_LoadExternalScripts.config.scripts.css, function(key, value) {
			if (value) {
				if (key in plugin_LoadExternalScripts.loadedScripts) {
					;// do nothing already loaded
				} else {
					var cssLink = "<link rel='stylesheet' type='text/css' href='" + key + "'>";
					$("head").append(cssLink);
					plugin_LoadExternalScripts.loadedScripts[key] = true;
				}

			}
		});
		$.each(plugin_LoadExternalScripts.config.scripts.javascript, function(key, value) {
			if (value) {
				promises.push(globalLoader.AsyncScriptLoader(key));
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
	// public
	// called by user
	functions : {
		css : function(url) {
			app.debug.alert("plugin_LoadExternalScripts.functions.css(" + url + ")", 20);
			if (url in plugin_LoadExternalScripts.loadedScripts) {
				;// do nothing already loaded
			} else {
				var cssLink = "<link rel='stylesheet' type='text/css' href='" + url + "'>";
				$("head").append(cssLink);
				plugin_LoadExternalScripts.loadedScripts[url] = true;
			}
		},
		javascript : function(url) {
			app.debug.alert("plugin_LoadExternalScripts.functions.javascript(" + url + ")", 20);
		}
	}
};