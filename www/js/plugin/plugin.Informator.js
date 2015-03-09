/*
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

/**
 * @author Martin Kattner <martin.kattner@gmail.com>
 */

/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
 */
var plugin_Informator = {
	config : null,
	configurationPrefix : "informator-config",

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
			app.debug.alert("plugin.Informator.js ~ plugin_Informator.pluginsLoaded() - case: load plugin config from html5 storage", 20);
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

		// validate functionality

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
		console.warn("Fuction is deprecated. Use: app.help.object.setDeep");
		key = key.split('.');
		var i = 0, n = key.length;
		for (; i < n - 1; ++i) {
			el = el[key[i]];
		}
		return el[key[i]] = value;
	},

	getDeep : function(el, key) {
		console.warn("Fuction is deprecated. Use: app.help.object.getDeep");
		key = key.split('.');
		var i = 0, n = key.length;
		for (; i < n; ++i) {
			el = el[key[i]];
		}
		return el;
	},

	loadConfigurationIntoHtml5Storage : function(configurationObject, start) {
		app.debug.alert("plugin.Informator.js ~ plugin_Informator.loadConfigurationIntoHtml5Storage()", 20);
		app.debug.alert("plugin.Informator.js ~ plugin_Informator.loadConfigurationIntoHtml5Storage() - if property is in html5 storage then use this value",
				20);
		app.debug.alert("plugin.Informator.js ~ plugin_Informator.loadConfigurationIntoHtml5Storage() - else use property from json file", 20);

		if (!configurationObject || configurationObject == undefined)
			return;

		if (start == undefined)
			start = '';

		$.each(configurationObject, function(key, value) {
			app.debug.alert("plugin.Informator.js ~ plugin_Informator.loadConfigurationIntoHtml5Storage() - compute  key/value pair", 30);

			var currentKey;

			if (typeof value != "object") {
				app.debug.alert("plugin.Informator.js ~ plugin_Informator.loadConfigurationIntoHtml5Storage() - case: value != object", 30);

				currentKey = plugin_Informator.configurationPrefix + start + "." + key;

				if (app.store.localStorage.get(currentKey) === null) {
					app.debug.alert("plugin.Informator.js ~ plugin_Informator.loadConfigurationIntoHtml5Storage() - case: key '" + currentKey
							+ "' doesn't exists in html5 storage", 30);

					app.store.localStorage.set(currentKey, value);
				} else {
					app.debug.alert("plugin.Informator.js ~ plugin_Informator.loadConfigurationIntoHtml5Storage() - case: key '" + currentKey
							+ "' exists in html5 storage", 30);
					plugin_Informator.loadValueIntoObject(currentKey);
				}
			} else {
				app.debug.alert("plugin.Informator.js ~ plugin_Informator.loadConfigurationIntoHtml5Storage() - case: value == object", 30);
				app.debug.alert("plugin.Informator.js ~ plugin_Informator.loadConfigurationIntoHtml5Storage() - go recursive into object", 30);
				plugin_Informator.loadConfigurationIntoHtml5Storage(value, start + "." + key);
			}
		});

	},

	loadValueIntoObject : function(locator) {
		app.debug.alert('plugin.Informator.js ~ plugin_Informator.loadValueIntoObject(' + locator + ')', 20);
		var propertyLocation = locator.substring(plugin_Informator.configurationPrefix.length + 1), value = app.store.localStorage.get(locator);
		if (propertyLocation.indexOf("..") < 0)
			app.help.object.setDeep(window, propertyLocation, value);
		else
			app.debug.alert('plugin.Informator.js ~ plugin_Informator.loadValueIntoObject() - ".." detected', 20);
	},

	functions : {
		// auch direkt die datei ���ndern
		set : function(key, value) {
			app.debug.alert("plugin.Informator.js ~ plugin_Informator.functions.set(" + key + ", " + value + ")", 50);

			if (plugin_Informator.config.useHtml5Storage) {
				app.store.localStorage.set(plugin_Informator.configurationPrefix + "." + key, value);
			}
			// change property
			app.help.object.setDeep(window, key, value);
		},

		firstUse : function(value) {
			app.debug.alert("plugin.Informator.js ~ plugin_Informator.functions.firstUse(" + value + ")", 20);
			if (value == undefined) {
				app.debug.alert("plugin.Informator.js ~ plugin_Informator.functions.firstUse(" + value + ") - case: value == undefined", 20);
				app.debug.alert(
						"plugin.Informator.js ~ plugin_Informator.functions.firstUse() - return: " + app.store.localStorage.get("informator-first-use"), 20);
				if (app.store.localStorage.get("informator-first-use") === null) {
					return true;
				} else {
					return false;
				}
			} else if (typeof value == "boolean") {
				app.debug.alert("plugin.Informator.js ~ plugin_Informator.functions.firstUse(" + value + ") - case: typeof value == boolean", 20);
				app.debug.alert("plugin.Informator.js ~ plugin_Informator.functions.firstUse() - set firstUse to: " + value, 20);
				app.store.localStorage.set("informator-first-use", value);
				if (value == false) {
					app.debug.alert("plugin.Informator.js ~ plugin_Informator.functions.firstUse() - case: value == false", 20);
					// app.store.localStorage.clear();
				}
				app.debug.alert("plugin.Informator.js ~ plugin_Informator.functions.firstUse() - return: " + value, 20);
				return value;
			} else {
				app.debug.alert("plugin.Informator.js ~ plugin_Informator.functions.firstUse() - return: null", 20);
				return null;
			}
		}
	// data-info-URI

	}
};