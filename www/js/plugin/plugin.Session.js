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

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);

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
			if (value == undefined) {
				app.debug.alert("plugin_Session.functions.loggedIn(" + value + ") - case: value == undefined", 20);
				app.debug.alert("plugin_Session.functions.loggedIn() - return: "
						+ app.store.localStorage.get(plugin_Session.config.sessionHTML5StoragePrefix
								+ plugin_Session.config.loginHtml5StorageKey), 20);
				return app.store.localStorage.get(plugin_Session.config.sessionHTML5StoragePrefix
						+ plugin_Session.config.loginHtml5StorageKey);
			} else if (typeof value == "boolean") {
				app.debug.alert("plugin_Session.functions.loggedIn(" + value + ") - case: typeof value == boolean", 20);
				app.debug.alert("plugin_Session.functions.loggedIn() - set loged in to: " + value, 20);
				app.store.localStorage.set(plugin_Session.config.sessionHTML5StoragePrefix + plugin_Session.config.loginHtml5StorageKey,
						value);
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
		setValue : function(key, value) {
			app.debug.alert("plugin_Session.functions.setValue(" + key + ", " + value + ")", 20);
			app.store.localStorage.set(plugin_Session.config.sessionHTML5StoragePrefix + key, value);
		},
		getValue : function(key) {
			app.debug.alert("plugin_Session.functions.getValue(" + key + ")", 20);
			return app.store.localStorage.get(plugin_Session.config.sessionHTML5StoragePrefix + key);
		},
		destroy : function() {
			app.debug.alert("plugin_Session.functions.destroy()", 20);
			$.each(window.localStorage, function(key, value) {
				if (key.substring(0, app.config.name.length) == app.config.name) {
					newkey = key.substring(app.config.name.length + 1);
					var comp1 = newkey.substring(0, plugin_Session.config.sessionHTML5StoragePrefix.length).toLowerCase();
					var comp2 = plugin_Session.config.sessionHTML5StoragePrefix.toLowerCase();
					// console.log(comp1 + " == " + comp2);
					// console.log(comp2);
					if (comp1 == comp2) {
						// alert("dsasd");
						window.localStorage.removeItem(key);
					}
				}
			});
		}

	}
};