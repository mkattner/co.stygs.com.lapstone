// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_ImageProvider
 * 
 * @version 1.0
 * @namespace plugin_ImageProvider
 */
var plugin_ImageProvider = {
	config : null,
	images : {},
	// called by plugins.js
	constructor : function() {

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		
		try {
			$.each(plugin_ImageProvider.config.imgdFiles, function(path, loadFile) {
				if (loadFile) {
					var json = JsonLoader(path);
					// alert(JSON.stringify(json));
					$.each(json, function(id, url) {
						// alert(id + " = " + url);
						plugin_ImageProvider.images[id] = url;
					});
				}
			});
			// alert(JSON.stringify(plugin_ImageProvider.images));
			success = true;
		} catch (err) {
			app.debug.alert("Fatal exception!\n\n" + JSON.stringify(err, null, 4), 50);
			app.debug.log(JSON.stringify(err, null, 4));
			success = false;
		}
		return success;
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
	 * Public functions for plugin_ImageProvider
	 * 
	 * @namespace plugin_ImageProvider.functions
	 * 
	 */
	functions : {
		getUrlById : function(id) {
			var img;
			// alert(id + " = " + plugin_ImageProvider.images[id])
			if ((img = plugin_ImageProvider.images[id]) == undefined)
				img = id;
			return img;
		}
	}
};