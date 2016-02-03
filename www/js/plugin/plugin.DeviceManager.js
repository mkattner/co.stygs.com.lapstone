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

var plugin_DeviceManager = {
	config : null,
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.trace("plugin_DeviceManager.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
		var js, css, promiseArray = [], dfd, scriptLoading;

		// load specific scripts
		app.debug.validate(plugin_DeviceManager.config.viewport);
		if (app.detect.isMobile()) {

			if (app.detect.mobile.google.Android()) {

				$('head').append(plugin_DeviceManager.config.viewport.android);

				if (app.config.min) {
					js = plugin_DeviceManager.config.files.android + ".js";
					css = plugin_DeviceManager.config.files.android + "." + app.config.version.app + ".css";
				}

				else {
					js = plugin_DeviceManager.config.files.android + ".js";
					css = plugin_DeviceManager.config.files.android + ".css";
				}

			}

			else if (app.detect.mobile.apple.iOS()) {
				$('head').append(plugin_DeviceManager.config.viewport.ios)

				if (app.config.min) {
					js = plugin_DeviceManager.config.files.ios + ".js";
					css = plugin_DeviceManager.config.files.ios + "." + app.config.version.app + ".css";
				}

				else {
					js = plugin_DeviceManager.config.files.ios + ".js";
					css = plugin_DeviceManager.config.files.ios + ".css";
				}

			}

			else if (app.detect.mobile.microsoft.Windows()) {
				$('head').append(plugin_DeviceManager.config.viewport.windows)

				if (app.config.min) {
					js = plugin_DeviceManager.config.files.windows + ".js";
					css = plugin_DeviceManager.config.files.windows + "." + app.config.version.app + ".css";
				}

				else {
					js = plugin_DeviceManager.config.files.windows + ".js";
					css = plugin_DeviceManager.config.files.windows + ".css";
				}

			}

			else {
				console.error("Unknown device!");
			}

			scriptLoading = globalLoader.AsyncScriptLoader(js);

			scriptLoading.done(function() {
				if (app[plugin_DeviceManager.config.shortname].current == undefined)
					console.log("app." + plugin_DeviceManager.config.shortname + ".current is undefined");
				else {
					if (app[plugin_DeviceManager.config.shortname].current.constructor == undefined)
						console.log("app." + plugin_DeviceManager.config.shortname + ".current.constructor is undefined");
					if (app[plugin_DeviceManager.config.shortname].current.afterHtmlInjectedBeforePageComputing == undefined)
						console.log("app." + plugin_DeviceManager.config.shortname + ".current.afterHtmlInjectedBeforePageComputing is undefined");
				}
				app[plugin_DeviceManager.config.shortname]['current'].constructor();

			});
			promiseArray.push(scriptLoading);
			promiseArray.push(globalLoader.AsyncStyleLoader(css));

			return $.when.apply($, promiseArray);
		} else {
			dfd = $.Deferred()
			dfd.resolve();
			return dfd.promise();
		}

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.trace("plugin_DeviceManager.pagesLoaded(" + app.debug.arguments(arguments) + ")");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.trace("plugin_DeviceManager.definePluginEvents(" + app.debug.arguments(arguments) + ")");

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_DeviceManager.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");
		if (app.dm.hasOwnProperty("current"))
			app.dm.current.afterHtmlInjectedBeforePageComputing();
	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_DeviceManager.pageSpecificEvents()");

	},
	// private functions

	// public functions
	// called by user
	/**
	 * Public functions for plugin_DeviceManager
	 * 
	 * @namespace plugin_DeviceManager.functions
	 * 
	 */
	functions : {

	}
};