//# sourceURL=plugin.DemoServer.js
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

var plugin_DemoServer = {
	config: null,
	// called by plugins.js
	constructor: function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded: function() {
		app.debug.trace("plugin_DemoServer.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded: function() {
		app.debug.trace("plugin_DemoServer.pagesLoaded(" + app.debug.arguments(arguments) + ")");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents: function() {
		app.debug.trace("plugin_DemoServer.definePluginEvents(" + app.debug.arguments(arguments) + ")");

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing: function(container) {
		app.debug.trace("plugin_DemoServer.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents: function(container) {
		app.debug.trace("plugin_DemoServer.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");

	},
	// private functions

	// public functions
	// called by user
	/**
	 * Public functions for plugin_DemoServer
	 * 
	 * @namespace plugin_DemoServer.functions
	 * 
	 */
	functions: {

	}
};