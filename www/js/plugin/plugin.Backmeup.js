// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_Backmeup
 * 
 * @version 1.0
 * @namespace plugin_Backmeup
 */
var plugin_Backmeup = {
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
	 * Public functions for plugin_Backmeup
	 * 
	 * @namespace plugin_Backmeup.functions
	 * 
	 */
	functions : {
		print : {
			formElement : function(value, languageContext) {
				switch (value.type.toLowerCase()) {
				case 'number':
					return app.ni.text.number({
						"name" : value.name,
						"placeholder" : app.lang.string(value.label, languageContext),
						"label" : true,
						"labelText" : app.lang.string(value.label, languageContext),
						"container" : true,
						"attributes" : {
							"title" : app.lang.string(value.description, languageContext)
						}
					});
					break;
				case 'bool':
					return app.ni.checkbox.checkbox({
						"name" : value.name,
						"placeholder" : app.lang.string(value.label, languageContext),
						"label" : true,
						"labelText" : app.lang.string(value.label, languageContext),
						"container" : true,
						"attributes" : {
							"title" : app.lang.string(value.description, languageContext)
						}
					});
					break;
				case 'string':
					return app.ni.text.text({
						"name" : value.name,
						"placeholder" : app.lang.string(value.label, languageContext),
						"label" : true,
						"labelText" : app.lang.string(value.label, languageContext),
						"container" : true,
						"attributes" : {
							"title" : app.lang.string(value.description, languageContext)
						}
					});
					break;
				case 'password':
					return app.ni.text.password({
						"name" : value.name,
						"placeholder" : app.lang.string(value.label, languageContext),
						"label" : true,
						"labelText" : app.lang.string(value.label, languageContext),
						"container" : true,
						"attributes" : {
							"title" : app.lang.string(value.description, languageContext)
						}
					});
					break;
				default:
					alert("Unknown type:" + value.type.toLowerCase());
					break;
				}
			}
		}
	}
};