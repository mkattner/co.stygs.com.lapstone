/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
 */
var plugin_Informator = {
	config : null,
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);

		var dfd = $.Deferred();
		// load the plugins' configuartion into html5 storage
		if (this.config.useHtml5Storage && this.config.savePluginConfig) {
			var global = {};
			$.each(plugins.pluginNames, function(key, value) {
				if (global["plugin_" + value] == undefined)
					global["plugin_" + value] = {};
				global["plugin_" + value]['config'] = window['plugin_' + value]['config'];
			});
			this.loadConfigurationIntoHtml5Storage(global);
		}

		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		var dfd = $.Deferred();

		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);

		// load the pages' configuartion into html5 storage
		if (this.config.useHtml5Storage && this.config.savePageConfig) {
			var global = {};
			alert("xxxxxxxx");
			$.each(pages.pageNames, function(key, value) {
				if (global["page_" + value] == undefined)
					global["page_" + value] = {};
				// dirty!! do not use json loader
				global["page_" + value]['config'] = globalLoader.JsonLoader("../js/page/page." + value + ".json");
			});
			this.loadConfigurationIntoHtml5Storage(global);
		}
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents : function() {

	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);

	},
	pageSpecificEvents : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);

	},

	// private functions
	setDeep : function(el, key, value) {
		key = key.split('.');
		var i = 0, n = key.length;
		for (; i < n - 1; ++i) {
			el = el[key[i]];
		}
		return el[key[i]] = value;
	},

	getDeep : function(el, key) {
		key = key.split('.');
		var i = 0, n = key.length;
		for (; i < n; ++i) {
			el = el[key[i]];
		}
		return el;
	},

	loadConfigurationIntoHtml5Storage : function(configurationObject, start) {
		// 1: if property is in html5 storage then use this value
		// 2: else use property from json file
		console.log("todo !!!!");
		try {
			if (!configurationObject || configurationObject == undefined)
				return;
			if (start == undefined)
				start = '';
			$.each(configurationObject, function(key, value) {
				if (typeof value != "object") {
					// alert(app.store.localStorage.get("config" + start + "." +
					// key));
					if (app.store.localStorage.get("config" + start + "." + key) == undefined) {
						// load into html5 storage
						// alert("Into html5: " + "config" + start + "." + key);
						app.store.localStorage.set("config" + start + "." + key, value);
					} else {
						// load from html5 storage
						// alert("From html5: " + "config" + start + "." + key);
						app.store.loadValueIntoObject("config" + start + "." + key);
					}
				} else {
					// go recursive into object
					plugin_Informator.loadConfigurationIntoHtml5Storage(value, start + "." + key);
				}
			});
			success = true;
		} catch (err) {
			success = false;
		}
		return success;
	},

	functions : {
		// auch direkt die datei ���ndern
		set : function(key, value) {
			app.debug.alert("plugin.Informator.js plugin_Informator.functions.set(" + key + ", " + value + ")", 50);
			if (plugin_Informator.config.useHtml5Storage) {
				app.store.localStorage.set("config." + key, value);
			}
			// change property
			plugin_Informator.setDeep(window, key, value);
		}
	// data-info-URI

	}
};