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
		app.debug.trace(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()", 11);

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 11);

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_" + this.config.name + ".pageSpecificEvents()", 11);

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
			app.debug.trace("plugin_Session.functions.loggedIn(" + value + ")");
			var storedValue = this.getValue(plugin_Session.config.loginHtml5StorageKey);
			if (value == undefined) {
				app.debug.debug("plugin_Session.functions.loggedIn(" + value + ") - case: value == undefined");
				app.debug.debug("plugin_Session.functions.loggedIn() - return: " + storedValue);
				if (storedValue === null || storedValue === false) {
					return false;
				} else {
					return true;
				}
			} else if (typeof value == "boolean") {
				app.debug.debug("plugin_Session.functions.loggedIn(" + value + ") - case: typeof value == boolean");
				app.debug.debug("plugin_Session.functions.loggedIn() - set loged in to: " + value);
				this.setValue(plugin_Session.config.loginHtml5StorageKey, value);
				if (value == false) {
					app.debug.trace("plugin_Session.functions.loggedIn() - case: value == false");
					// app.store.localStorage.clear();
				}
				app.debug.trace("plugin_Session.functions.loggedIn() - return: " + value);
				return value;
			} else {
				app.debug.trace("plugin_Session.functions.loggedIn() - return: null");
				return null;
			}
		},
		setValue : function(key, value, prefix) {
			prefix = plugin_Session.getPrefix(prefix);
			app.debug.trace("plugin_Session.functions.setValue(" + key + ", " + value + ")");
			app.store.localStorage.set(prefix + key, value);
			plugin_Session.sessions[prefix] = true;
		},
		getValue : function(key, prefix) {
			prefix = plugin_Session.getPrefix(prefix);
			app.debug.trace("plugin_Session.functions.getValue(" + key + ")");
			return app.store.localStorage.get(prefix + key);
		},
		destroy : function(prefix) {
			prefix = plugin_Session.getPrefix(prefix);
			app.debug.trace("plugin_Session.functions.destroy()");
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