//# sourceURL=plugin.Informator.js
/**
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted,
 * free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions: The above copyright notice and this
 * permission notice shall be included in all copies or substantial portions of
 * the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
 * EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var plugin_Informator = {

	config : null,
	configurationPrefix : "informator-config",

	constructor : function() {
		var dfd = $.Deferred();

		plugin_Informator.config.excludedPlugins.push("HtmlTemplates");
		plugin_Informator.config.excludedPlugins.push("RestClient");
		plugin_Informator.config.excludedPlugins.push("ImageProvider");

		dfd.resolve();
		return dfd.promise();
	},

	pluginsLoaded : function() {
		app.debug.trace("plugin_Informator.pluginsLoaded(" + app.debug.arguments(arguments) + ")");

		var dfd, global;

		dfd = $.Deferred();

		// first use
		// alert(app.store.localStorage.get("informator-first-use"));
		if (app.store.localStorage.get("informator-first-use") === null) {
			app.store.localStorage.set("informator-first-use", true);
		}

		else if (app.store.localStorage.get("informator-first-use") === true) {
			app.store.localStorage.set("informator-first-use", false);
		}

		// alert(app.store.localStorage.get("informator-first-use"));

		// sync the plugins' configuration with html5 storage
		if (this.config.useHtml5Storage && this.config.savePluginConfig) {
			app.debug.debug("plugin_Informator.pluginsLoaded() - case: load plugin config from html5 storage");
			global = {};
			$.each(app.plugins.pluginNames, function(key, value) {
				if (plugin_Informator.config.excludedPlugins.indexOf(value) == -1) {

					if (global["plugin_" + value] == undefined)
						global["plugin_" + value] = {};

					global["plugin_" + value]['config'] = window['plugin_' + value]['config'];
				}
			});

			this.syncObjectWithHtml5Storage(global);
		}

		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.trace("plugin_Informator.pagesLoaded(" + app.debug.arguments(arguments) + ")");
		var dfd = $.Deferred(), global;

		// validate functionality

		// sync the pages' configuration with html5 storage
		if (this.config.useHtml5Storage && this.config.savePageConfig) {
			global = {};
			// alert("xxxxxxxx");
			$.each(pages.pageNames, function(key, value) {
				if (global["page_" + value] == undefined)
					global["page_" + value] = {};
				// dirty!! do not use json loader
				global["page_" + value]['config'] = globalLoader.JsonLoader("../js/page/page." + value + ".json");
			});
			this.syncObjectWithHtml5Storage(global);
		}
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents : function() {
		app.debug.trace("plugin_Informator.definePluginEvents(" + app.debug.arguments(arguments) + ")");

	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_Informator.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");

	},
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_Informator.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");

	},

	// private functions

	syncObjectWithHtml5Storage : function(configurationObject, start) {
		app.debug.trace("plugin_Informator.syncObjectWithHtml5Storage(" + app.debug.arguments(arguments) + ")");
		app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage()");
		app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - if property is in html5 storage then use this value");
		app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - else use property from json file");

		if (!configurationObject || configurationObject == undefined)
			return;

		if (start == undefined)
			start = "";

		$.each(configurationObject, function(key, value) {
			app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - compute  key/value pair");

			var currentKey;

			if (typeof value != "object") {
				app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: value != object");

				currentKey = plugin_Informator.configurationPrefix + start + "." + key;

				if (app.store.localStorage.get(currentKey) === null) {
					app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: key '" + currentKey + "' doesn't exists in html5 storage");

					app.debug.validate(plugin_Informator.config.firstLevelReservedNames);
					if (plugin_Informator.config.firstLevelReservedNames.indexOf(key) != -1) {
						app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: key '" + currentKey + "' but it's in reserved list");
						// alert();
					}

					else {
						app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: key '" + currentKey + "' write in html5 storage");
						app.store.localStorage.set(currentKey, value);
					}
				} else {
					app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: key '" + currentKey + "' exists in html5 storage");
					plugin_Informator.loadValueIntoObject(currentKey);
				}
			} else {
				app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: value == object");
				app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - go recursive into object");
				plugin_Informator.syncObjectWithHtml5Storage(value, start + "." + key);
			}
		});

	},

	loadValueIntoObject : function(propertyLocation) {
		app.debug.trace("plugin_Informator.loadValueIntoObject(" + app.debug.arguments(arguments) + ")");
		
		var  propertyValue;

		
		propertyValue = app.store.localStorage.get(propertyLocation);
		propertyLocation = propertyLocation.substring(plugin_Informator.configurationPrefix.length + 1);
		
		if (propertyLocation.indexOf("..") < 0)
			plugin_HTML5Storage.setDeep(window, propertyLocation, propertyValue);
		else
			app.debug.debug('plugin_Informator.loadValueIntoObject() - ".." detected');
	},

	functions : {
		// auch direkt die datei ���ndern
		set : function(key, value) {
			app.debug.trace("plugin_Informator.functions.set(" + app.debug.arguments(arguments) + ")");

			if (plugin_Informator.config.useHtml5Storage) {
				if (typeof value === "object") {
					app.store.localStorage.setObject(plugin_Informator.configurationPrefix + "." + key, value);
				}

				else {
					app.store.localStorage.set(plugin_Informator.configurationPrefix + "." + key, value);
				}
			}
			// change property
			plugin_HTML5Storage.setDeep(window, key, value);
		},

		firstUse : function(value) {
			app.debug.trace("plugin_Informator.functions.firstUse(" + app.debug.arguments(arguments) + ")");

			if (value == undefined) {
				app.debug.debug("plugin_Informator.functions.firstUse(" + value + ") - case: value == undefined");
				app.debug.debug("plugin_Informator.functions.firstUse() - return: " + app.store.localStorage.get("informator-first-use"));

				if (app.store.localStorage.get("informator-first-use") === null) {
					return true;
				}

				else if (app.store.localStorage.get("informator-first-use") === true) {
					return true;
				}

				else {
					return false;
				}
			}

			else if (typeof value == "boolean") {
				app.debug.debug("plugin_Informator.functions.firstUse(" + value + ") - case: typeof value == boolean");
				app.debug.debug("plugin_Informator.functions.firstUse() - set firstUse to: " + value);
				app.store.localStorage.set("informator-first-use", value);
				if (value == false) {
					app.debug.debug("plugin_Informator.functions.firstUse() - case: value == false");
					// app.store.localStorage.clear();
				}
				app.debug.debug("plugin_Informator.functions.firstUse() - return: " + value);
				return value;
			}

			else {
				app.debug.debug("plugin_Informator.functions.firstUse() - return: null");
				return null;
			}
		}
	// data-info-URI

	}
};