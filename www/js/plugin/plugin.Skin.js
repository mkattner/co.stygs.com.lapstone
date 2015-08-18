// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_Skin
 * 
 * @version 1.0
 * @namespace plugin_Skin
 */
var plugin_Skin = {
	config : null,
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.trace("plugin_Skin.pluginsLoaded()");
		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;
		if (plugin_Skin.config.useSkinPlugin) {
			// load the skin's css files
			$.each(plugin_Skin.config.skins[plugin_Skin.config.defaultSkin], function(index, cssFileUrl) {
				app.debug.debug("plugin_Skin.pluginsLoaded() - Load css: " + cssFileUrl);
				promises.push(app.load.css(cssFileUrl));
			});

			promiseOfPromises = $.when.apply($, promises);

			promiseOfPromises.done(function() {
				app.debug.debug("plugin_Skin.pluginsLoaded() - loading css files done");
				dfd.resolve();
			}).fail(function() {
				app.debug.debug("plugin_Skin.pluginsLoaded() - loading css files failes");
				dfd.reject();
			});

			return dfd.promise();
		} else {
			return dfd.resolve();
		}

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.alert("plugin_Skin.pagesLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.trace("plugin_Skin.definePluginEvents()");

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_Skin.afterHtmlInjectedBeforePageComputing()");

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_Skin.pageSpecificEvents()");

	},
	// private functions

	// public functions
	// called by user
	/**
	 * Public functions for plugin_Skin
	 * 
	 * @namespace plugin_Skin.functions
	 * 
	 */
	functions : {

		changeSkin : function(skin) {
			app.debug.trace("plugin_Skin.functions.change()");
			if (this.skinAvailable(skin)) {
				// change skin in config
				app.info.set("plugin_Skin.config.defaultSkin", skin);
				return true;
			} else {
				return false;
			}
		},

		skinAvailable : function(skin) {
			app.debug.trace("plugin_Skin.functions.skinAvailable()");
			if (this.getAvailableSkins().indexOf(skin) != -1) {
				app.debug.debug("plugin_Skin.functions.skinAvailable() - skin available: " + skin);
				return true;
			} else {
				app.debug.trace("plugin_Skin.functions.skinAvailable() - skin not available: " + skin);
				return false;
			}
		},

		getAvailableSkins : function() {
			app.debug.trace("plugin_Skin.functions.getAvailableSkins()");
			return Object.keys(plugin_Skin.config.skins);
		},

		getCurrentSkin : function() {
			app.debug.trace("plugin_Skin.functions.gatAvailableSkins()");
			return plugin_Skin.config.defaultSkin;
		}
	}
};