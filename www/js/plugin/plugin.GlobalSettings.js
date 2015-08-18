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

//plugin_GlobalSettings
/**
 * Plugin:
 * 
 * 
 * @version 1.0
 * @namespace plugin_GlobalSettings
 */
var plugin_GlobalSettings = {
	config : null,
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},
	pluginsLoaded : function() {
		app.debug.trace(this.config.name + ".pluginsLoaded()");
		// load settings from html5 storage
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.trace("plugin_GlobalSettings.pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents : function() {
		app.debug.trace("plugin_GlobalSettings.definePluginEvents()");
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_GlobalSettings.afterHtmlInjectedBeforePageComputing()");
	},
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_GlobalSettings.pageSpecificEvents()");
	},
	/**
	 * @namespace plugin_GlobalSettings.functions
	 */
	functions : {
		get : function(key) {
			app.debug.trace("plugin_GlobalSettings.functions.get()");
			return plugin_GlobalSettings.config['key'];
		},
		set : function(key, val) {
			app.debug.trace("plugin_GlobalSettings.functions.set()");
			plugin_GlobalSettings.config['key'] = val;
		}
	}
};