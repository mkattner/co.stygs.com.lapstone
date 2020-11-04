// # sourceURL=plugin.Session.js
/**
 * Copyright (c) 2018 martin.kattner@gmail.com Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var plugin_Session = {
	config: null,
	glabalSessionIdentifyer: "globalsession",
	sessionIndentifyer: "_t_lapstonesession_",
	// called by plugins.js
	constructor: function() {
		var dfd, PO, PA;
		dfd = $.Deferred();

		PO = function(persistenceKey, object) {
			this.persistenceKey = persistenceKey;
			if (object !== undefined) $.extend(true, this, object);
			// Object.call(this);
		}

		// Persistence for Objects
		PO.prototype.persist = function() {
			return app.sess.setObject(this.persistenceKey, this, "persistentObjects");
		};

		PO.prototype.recover = function() {
			$.extend(true, this, app.sess.getObject(this.persistenceKey, "persistentObjects"));
		}

		/**
		 * persistent array
		 */
		PA = function SubArray() {
			var arr, persistenceKey;

			arr = [];

			arr.push.apply(arr, arguments);
			arr.__proto__ = SubArray.prototype;
			return arr;
		}

		PA.prototype = new Array;

		PA.prototype.persist = function(persistenceKey) {
			app.debug.operation(function() {
				if (persistenceKey === undefined) app.debug.error("persistenceKey not defined")
			});

			return app.sess.setObject(persistenceKey, this, "persistentObjects");
		};

		PA.prototype.recover = function(persistenceKey) {
			app.debug.operation(function() {
				if (persistenceKey === undefined) app.debug.error("persistenceKey not defined")
			});

			var recoveredArray;
			this.splice(0, this.length);
			recoveredArray = app.sess.getObject(persistenceKey, "persistentObjects")
			Array.prototype.push.apply(this, recoveredArray)
		}

		dfd.resolve();
		return dfd.promise();
	},

	// called after all plugins are loaded
	pluginsLoaded: function() {
		app.debug.trace(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded: function() {
		app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents: function() {
		app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()", 11);

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing: function(container) {
		app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 11);

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents: function(container) {
		app.debug.trace("plugin_" + this.config.name + ".pageSpecificEvents()", 11);

	},

	// private functions
	getPrefix: function(prefix) {
		if (prefix == undefined) prefix = plugin_Session.glabalSessionIdentifyer;
		return prefix + "_";
	},

	// public functions
	// called by user
	/**
	 * Public functions for plugin_Session
	 * 
	 * @namespace plugin_Session.functions
	 */
	functions: {
		/**
		 * 
		 */
		loggedIn: function(value) {
			app.debug.trace("plugin_Session.functions.loggedIn(" + app.debug.arguments(arguments) + ")");

			//app.debug.validate(app.sess.config.loggedIn, "boolean");

			var storedValue = app.sess.config.loggedIn;// this.getValue(plugin_Session.config.loginHtml5StorageKey);

			// GETTER
			if (value == undefined) {
				app.debug.debug("plugin_Session.functions.loggedIn(" + value + ") - case: value == undefined");
				app.debug.debug("plugin_Session.functions.loggedIn() - return: " + storedValue);
				if (storedValue === null || storedValue === false) {
					return false;
				}

				else {
					return true;
				}
			}

			// SETTER
			else if (typeof value == "boolean") {
				app.debug.debug("plugin_Session.functions.loggedIn(" + value + ") - case: typeof value == boolean");
				app.debug.debug("plugin_Session.functions.loggedIn() - set loged in to: " + value);

				app.persist.setPluginConfiguration("Session", "loggedIn", value);// this.setValue(plugin_Session.config.loginHtml5StorageKey, value);

				if (value == false) {
					app.debug.trace("plugin_Session.functions.loggedIn() - case: value == false");
					// app.store.localStorage.clear();
				}
				app.debug.trace("plugin_Session.functions.loggedIn() - return: " + value);
				return value;
			}

			else {
				app.debug.trace("plugin_Session.functions.loggedIn() - return: null");
				return null;
			}
		},

		/**
		 * 
		 */
		setValue: function(key, value, sessionName) {
			app.debug.trace("plugin_Session.functions.setValue(" + app.debug.arguments(arguments) + ")");
			sessionName = plugin_Session.getPrefix(sessionName);
			app.debug.trace("plugin_Session.functions.setValue(" + key + ", " + value + ")");
			app.store.localStorage.set(plugin_Session.sessionIndentifyer + sessionName + key, value);
		},

		/**
		 * 
		 */
		getValue: function(key, sessionName) {
			app.debug.trace("plugin_Session.functions.getValue(" + app.debug.arguments(arguments) + ")");
			sessionName = plugin_Session.getPrefix(sessionName);
			app.debug.trace("plugin_Session.functions.getValue(" + key + ")");
			return app.store.localStorage.get(plugin_Session.sessionIndentifyer + sessionName + key);
		},

		/**
		 * 
		 */
		destroy: function(sessionName) {
			app.debug.trace("plugin_Session.functions.destroy(" + app.debug.arguments(arguments) + ")");
			sessionName = plugin_Session.getPrefix(sessionName);
			app.debug.trace("plugin_Session.functions.destroy()");

			app.store.localStorage.removeItem(plugin_Session.sessionIndentifyer + sessionName + "*");

		},

		/**
		 * 
		 */
		destroyAll: function() {
			app.debug.trace("plugin_Session.functions.destroyAll(" + app.debug.arguments(arguments) + ")");

			app.store.localStorage.removeItem(plugin_Session.sessionIndentifyer + "*");
			console.log("TODO - implement");
		},

		/**
		 * 
		 */
		setObject: function(name, object, sessionName) {
			app.debug.trace("plugin_Session.functions.setObject(" + app.debug.arguments(arguments) + ")");
			sessionName = plugin_Session.getPrefix(sessionName);
			name = sessionName + name;
			name = name.split(".").join("-");
			app.store.localStorage.removeObject(plugin_Session.sessionIndentifyer + sessionName + name);
			app.store.localStorage.setObject(plugin_Session.sessionIndentifyer + sessionName + name, object);
		},

		/**
		 * 
		 */
		getObject: function(name, sessionName) {
			app.debug.trace("plugin_Session.functions.getObject(" + app.debug.arguments(arguments) + ")");
			sessionName = plugin_Session.getPrefix(sessionName);
			name = sessionName + name;
			name = name.split(".").join("-");
			return app.store.localStorage.getObject(plugin_Session.sessionIndentifyer + sessionName + name);
		}

	}
};