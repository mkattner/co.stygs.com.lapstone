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
				return app.store.localStorage.get(plugin_Session.config.loginHtml5StorageKey);
			if (typeof value == "boolean") {
				app.store.localStorage.set(plugin_Session.config.loginHtml5StorageKey, value);
				return value;
			} else
				return null;
		}

	}
};