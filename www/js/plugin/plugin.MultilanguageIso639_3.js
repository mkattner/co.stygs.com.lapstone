/**
 * Copyright (c) 2015 martin.kattner@stygs.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var plugin_MultilanguageIso639_3 = {
	config : null,
	dictionary : null,
	parameter : null,
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		var promise;

		promise = globalLoader.AsyncJsonLoader("../files/language/" + plugin_MultilanguageIso639_3.config.defaultLanguage + ".json").done(function(json) {
			plugin_MultilanguageIso639_3.dictionary = json;
		});

		return promise;
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
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
		get : function() {
			return plugin_MultilanguageIso639_3.config.defaultLanguage;
		},

		getAvailableLanguages : function() {
			return plugin_MultilanguageIso639_3.config.availableLanguages;
		},

		getCurrentLanguage : function() {
			return plugin_MultilanguageIso639_3.config.defaultLanguage;
		},

		languageAvailable : function(language) {
			if (this.getAvailableLanguages().indexOf(language) != -1)
				return true;
			else
				return false;
		},
		changeLanguage : function(language) {
			if (this.languageAvailable(language)) {
				app.info.set("plugin_MultilanguageIso639_3.config.defaultLanguage", language);
				return true;
			} else {
				return false;
			}
		},

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
			var text = null, toParse;
			if (!plugin_MultilanguageIso639_3.dictionary) {
				plugin_MultilanguageIso639_3.loadLanguageIntoDict(plugin_MultilanguageIso639_3.config.defaultLanguage)
			}
			if (context == undefined) {
				text = plugin_MultilanguageIso639_3.dictionary[id];
			} else {
				if (plugin_MultilanguageIso639_3.dictionary[context] == undefined) {
					//console.warn("Language - Context doesn't exist: " + context);
					toParse = '{"' + context + '" : {}}';
					app.debug.feedback.language(JSON.parse(toParse));
					text = id;
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
			} else {
				//console.warn("Language - " + context + '.' + id + " == undefined");
				// console.log('"' + id + '" : "TRANSLATION"');
				toParse = '{"' + context + '" : {"' + id + '" : "TRANSLATION"}}';
				app.debug.feedback.language(JSON.parse(toParse));

				return id;
			}
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
		},
		set : function(language) {
			plugin_MultilanguageIso639_3.loadLanguageIntoDict(language);
			app.info.set("plugin_MultilanguageIso639_3.config.defaultLanguage", language);
		}
	}
};