/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
 */
var plugin_Informator = {
	config : null,
	constructor : function() {
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);

		try {
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
			success = true;
		} catch (err) {
			success = false;
		}
		return success;
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);

		try {
			// load the pages' configuartion into html5 storage
			if (this.config.useHtml5Storage && this.config.savePageConfig) {
				var global = {};
				$.each(pages.pageNames, function(key, value) {
					if (global["page_" + value] == undefined)
						global["page_" + value] = {};
					// dirty!! do not use json loader
					global["page_" + value]['config'] = JsonLoader("../js/page/page." + value + ".json");
				});
				this.loadConfigurationIntoHtml5Storage(global);
			}
			success = true;
		} catch (err) {
			success = false;
			app.debug.alert("Fatal exception!\n\n" + JSON.stringify(err, null, 4), 50);
			app.debug.log(JSON.stringify(err, null, 4));
		}
		return success;
	},

	definePluginEvents : function() {

		try {

			success = true;
		} catch (err) {
			success = false;
		}
		return success;
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);

		try {
			success = true;
		} catch (err) {
			success = false;
		}
		return success;
	},
	pageSpecificEvents : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);

		try {
			success = true;
		} catch (err) {
			success = false;
		}
		return success;
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