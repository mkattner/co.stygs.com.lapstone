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
		if (app.detect.isMobile()) {

			if (app.detect.mobile.google.Android()) {

				$('head').append(this.config.viewport.android);
				js = this.config.files.android + ".js";
				css = this.config.files.android + ".css";
			} 
			
			else if (app.detect.mobile.apple.iOS()) {
				$('head').append(this.config.viewport.ios)
				js = this.config.files.ios + ".js";
				css = this.config.files.ios + ".css";
			} 
			
			else if (app.detect.mobile.microsoft.Windows()) {
				$('head').append(this.config.viewport.windows)
				js = this.config.files.windows + ".js";
				css = this.config.files.windows + ".css";
			} 
			
			else {
				console.error("Unknown device!");
			}

			scriptLoading = globalLoader.AsyncScriptLoader(js);

			scriptLoading.done(function() {
				if (app[plugin_DeviceManager.config.shortname].current == undefined)
					console.loc("app." + plugin_DeviceManager.config.shortname + ".current is undefined");
				else {
					if (app[plugin_DeviceManager.config.shortname].current.constructor == undefined)
						console.loc("app." + plugin_DeviceManager.config.shortname + ".current.constructor is undefined");
					if (app[plugin_DeviceManager.config.shortname].current.afterHtmlInjectedBeforePageComputing == undefined)
						console.loc("app." + plugin_DeviceManager.config.shortname + ".current.afterHtmlInjectedBeforePageComputing is undefined");
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