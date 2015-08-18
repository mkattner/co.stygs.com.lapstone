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

// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_Actions
 * 
 * @version 1.0
 * @namespace plugin_Actions
 */
var plugin_Actions = {
	config : null,
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.trace("plugin_Actions.pluginsLoaded()");

		return globalLoader.AsyncScriptLoader('../files/actions.js');
	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.trace("plugin_Actions.pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.trace("plugin_Actions.definePluginEvents()");

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_Actions.afterHtmlInjectedBeforePageComputing()");

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_Actions.pageSpecificEvents()");

	},
	// private functions

	// public functions
	// called by user
	/**
	 * Public functions for plugin_Actions
	 * 
	 * @namespace plugin_Actions.functions
	 * 
	 */
	functions : {
	// defined in files/actions.js

	}
};