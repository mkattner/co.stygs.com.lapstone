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
 * Plugin: plugin_Session
 * 
 * @version 1.0
 * @namespace plugin_Session
 */
var plugin_Session = {
	config : null,
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		console.log("TODO - create session registry")
		dfd.resolve();
		return dfd.promise();

	},

	sessions : {},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.alert("plugin_" + this.config.name + ".definePluginEvents()", 11);

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 11);

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".pageSpecificEvents()", 11);

	},
	// private functions
	getPrefix : function(prefix) {
		if (prefix == undefined)
			prefix = plugin_Session.config.sessionHTML5StoragePrefix;
		return prefix;
	},
	// public functions
	// called by user
	/**
	 * Public functions for plugin_Session
	 * 
	 * @namespace plugin_Session.functions
	 * 
	 */
	functions : {
		loggedIn : function(value) {
			app.debug.alert("plugin_Session.functions.loggedIn(" + value + ")", 20);
			var storedValue = this.getValue(plugin_Session.config.loginHtml5StorageKey);
			if (value == undefined) {
				app.debug.alert("plugin_Session.functions.loggedIn(" + value + ") - case: value == undefined", 20);
				app.debug.alert("plugin_Session.functions.loggedIn() - return: " + storedValue, 20);
				if (storedValue === null || storedValue === false) {
					return false;
				} else {
					return true;
				}
			} else if (typeof value == "boolean") {
				app.debug.alert("plugin_Session.functions.loggedIn(" + value + ") - case: typeof value == boolean", 20);
				app.debug.alert("plugin_Session.functions.loggedIn() - set loged in to: " + value, 20);
				this.setValue(plugin_Session.config.loginHtml5StorageKey, value);
				if (value == false) {
					app.debug.alert("plugin_Session.functions.loggedIn() - case: value == false", 20);
					// app.store.localStorage.clear();
				}
				app.debug.alert("plugin_Session.functions.loggedIn() - return: " + value, 20);
				return value;
			} else {
				app.debug.alert("plugin_Session.functions.loggedIn() - return: null", 20);
				return null;
			}
		},
		setValue : function(key, value, prefix) {
			prefix = plugin_Session.getPrefix(prefix);
			app.debug.alert("plugin_Session.functions.setValue(" + key + ", " + value + ")", 20);
			app.store.localStorage.set(prefix + key, value);
			plugin_Session.sessions[prefix] = true;
		},
		getValue : function(key, prefix) {
			prefix = plugin_Session.getPrefix(prefix);
			app.debug.alert("plugin_Session.functions.getValue(" + key + ")", 20);
			return app.store.localStorage.get(prefix + key);
		},
		destroy : function(prefix) {
			prefix = plugin_Session.getPrefix(prefix);
			app.debug.alert("plugin_Session.functions.destroy()", 20);
			$.each(window.localStorage, function(key, value) {
				if (key.substring(0, app.config.name.length) == app.config.name) {
					var newkey, comp1, comp2;
					newkey = key.substring(app.config.name.length + 1);
					comp1 = newkey.substring(0, prefix.length).toLowerCase();
					comp2 = prefix.toLowerCase();
					if (comp1 == comp2) {
						window.localStorage.removeItem(key);
					}
				}
			});
			plugin_Session.sessions[prefix] = false;
		},
		destroyAll : function() {
			$.each(plugin_Session.sessions, function(sessionName, isLoaded) {
				plugin_Session.functions.destroy(sessionName);
			});
			console.log("TODO - implement");
		},
		setObject : function(name, object, prefix) {
			prefix = plugin_Session.getPrefix(prefix);
			name = prefix + name;
			name = name.split(".").join("-");
			app.store.localStorage.setObject(prefix + name, object);
		},
		getObject : function(name, prefix) {
			prefix = plugin_Session.getPrefix(prefix);
			name = prefix + name;
			name = name.split(".").join("-");
			return app.store.localStorage.getObject(prefix + name);
		}

	}
};