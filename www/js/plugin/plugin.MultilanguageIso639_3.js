/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
 */
var plugin_MultilanguageIso639_3 = {
	config : null,
	dictionary : null,
	parameter : null,
	constructor : function() {
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
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
	loadLanguageIntoDict : function(language) {
		var langUri = "../files/language/" + language + ".json";
		$.ajax({
			dataType : "json",
			url : langUri,
			async : false,
			success : function(json) {
				app.debug.alert("Langugae successfully loaded: " + language, 3);
				plugin_MultilanguageIso639_3.dictionary = json;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Fatal error: Can't load language: " + langUri + " Error: " + textStatus);
			}
		});
	},
	// public functions
	functions : {
		addParameter : function(key, value) {
			if (!plugin_MultilanguageIso639_3.parameter) {
				plugin_MultilanguageIso639_3.parameter = {};
				if (plugin_HTML5Storage != undefined) {
					app.store.localStorage.getList("language-");
				}
			}
			plugin_MultilanguageIso639_3.parameter[key] = value;
			if (plugin_HTML5Storage != undefined) {
				app.store.localStorage.set("language-" + key, value);
			}
		},
		string : function(id, context, options) {
			var text = null;
			if (!plugin_MultilanguageIso639_3.dictionary) {
				plugin_MultilanguageIso639_3.loadLanguageIntoDict(plugin_MultilanguageIso639_3.config.defaultLanguage)
			}
			if (context == undefined) {
				text = plugin_MultilanguageIso639_3.dictionary[id];
			} else {
				if (plugin_MultilanguageIso639_3.dictionary[context] == undefined) {
					text = "context doesn't exist: " + context;
				} else {
					text = plugin_MultilanguageIso639_3.dictionary[context][id];
				}
			}
			if (text != undefined) {
				// replace the wildcards
				if (plugin_MultilanguageIso639_3.parameter != null) {
					$.each(plugin_MultilanguageIso639_3.parameter, function(key, value) {
						text = text.replace('%' + key + '%', value);
					});
				}
				if (options != undefined) {
					$.each(options, function(key, value) {
						text = text.replace('%' + key + '%', value);
					});
				}
				return text;
			} else
				return context + '.' + id + " = undefined";
		},
		list : function(language) {
			var list = "";
			if (!plugin_MultilanguageIso639_3.dictionary) {
				plugin_MultilanguageIso639_3.loadLanguageIntoDict(plugin_MultilanguageIso639_3.config.defaultLanguage)
			}
			$.each(plugin_MultilanguageIso639_3.dictionary, function(key, value) {
				if (typeof value == "object") {
					$.each(value, function(key, value) {
						list += value + "\n";
					});
				} else {
					list += value + "\n";
				}
			});
			return list;
		}
	}
};