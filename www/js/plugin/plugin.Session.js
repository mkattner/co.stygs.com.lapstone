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
			if (value == undefined)
				return app.store.localStorage.get(plugin_Session.config.sessionHTML5StoragePrefix + plugin_Session.config.loginHtml5StorageKey);
			if (typeof value == "boolean") {
				app.store.localStorage.set(plugin_Session.config.sessionHTML5StoragePrefix + plugin_Session.config.loginHtml5StorageKey, value);
				if(value==false){
					//app.store.localStorage.clear();
				}
				return value;
			} else
				return null;
		},
		setValue : function(key, value) {
			app.store.localStorage.set(plugin_Session.config.sessionHTML5StoragePrefix + key, value);
		},
		getValue : function(key) {
			return app.store.localStorage.get(plugin_Session.config.sessionHTML5StoragePrefix + key);
		},
		destroy : function() {
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