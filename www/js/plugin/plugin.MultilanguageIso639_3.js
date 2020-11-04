//# sourceURL=plugin.MultilanguageIso693_3.js
/**
 * Copyright (c) 2018 martin.kattner@gmail.com
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
	config: null,
	dictionary: null,
	parameter: null,
	constructor: function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded: function() {
		app.debug.trace(this.config.name + ".pluginsLoaded()", 11);

		app.debug.validate(plugin_MultilanguageIso639_3.config.availableLanguages, "object");

		// add dev language to language array
		app.debug.operation(function() {
			plugin_MultilanguageIso639_3.config.availableLanguages["dev"] = ["dev"];
		});

		return plugin_MultilanguageIso639_3.loadLanguageIntoDict(plugin_MultilanguageIso639_3.config.defaultLanguage);
	},

	// called after all pages are loaded
	pagesLoaded: function() {
		app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents: function() {
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing: function(container) {
		app.debug.trace("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
	},
	pageSpecificEvents: function(container) {
		app.debug.trace("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
	},

	// private functions
	loadLanguageIntoDict: function(language) {
		var promise, langUri;

		langUri = "../files/language/" + language + ".json";
		promise = lapstone.globalLoader.AsyncJsonLoader(langUri);

		promise.done(function(json) {
			plugin_MultilanguageIso639_3.dictionary = json;

			// Change the HTML language attribute
			$("html").attr({
				"lang": plugin_MultilanguageIso639_3.config.availableLanguages[language][0]
			});

			// CHANGE LANGUAGE IN MOMENT
			if (window.moment !== undefined) {
				moment.locale(plugin_MultilanguageIso639_3.config.availableLanguages[language][0])
			}

		}).fail(function(error) {
			alert("Fatal error: Can't load language: " + langUri + " Error: " + JSON.stringify(error));
		});

		return promise;
	},
	// public functions
	functions: {
		get: function() {
			return plugin_MultilanguageIso639_3.config.defaultLanguage;
		},

		getAvailableLanguages: function() {
			return plugin_MultilanguageIso639_3.config.availableLanguages;
		},

		getCurrentLanguage: function() {
			return plugin_MultilanguageIso639_3.config.defaultLanguage;
		},

		languageAvailable: function(language) {
			return this.getAvailableLanguages().hasOwnProperty(language);
		},
		changeLanguage: function(language) {
			return plugin_MultilanguageIso639_3.loadLanguageIntoDict(language).done(function() {
				app.info.set("plugin_MultilanguageIso639_3.config.defaultLanguage", language);
			})

		},

		addParameter: function(key, value) {
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

		extendDictionary: function(map, context) {
			if (context !== undefined) {
				$.extend(true, plugin_MultilanguageIso639_3.dictionary[context], map);
			} else {
				$.extend(true, plugin_MultilanguageIso639_3.dictionary, map);
			}
		},

		// TODO not a bad idea
		// "infotext edit mode": [
		// + "<b>If Editing mode is on the following Features are active:</b>",
		// + "In the competence grid you can add new materials, add descriptors
		// to themes and hide materials and descriptors.",
		// + "In the theme menu you can create themes and delete or edit or hide
		// them."
		// + ]
		string: function(id, context, options) {
			var text = null, toParse;
			if (!plugin_MultilanguageIso639_3.dictionary) {
				plugin_MultilanguageIso639_3.loadLanguageIntoDict(plugin_MultilanguageIso639_3.config.defaultLanguage)
			}
			if (context == undefined) {
				text = plugin_MultilanguageIso639_3.dictionary[id];
			} else {
				if (plugin_MultilanguageIso639_3.dictionary[context] == undefined) {
					// console.warn("Language - Context doesn't exist: " +
					// context);
					toParse = '{"' + context + '" : {}}';
					app.debug.feedback.language(JSON.parse(toParse));
					app.fb.send("plugin.MultilanguageIso_639_3: " + toParse);
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
				// console.warn("Language - " + context + '.' + id + " ==
				// undefined");
				// console.log('"' + id + '" : "TRANSLATION"');
				toParse = '{"' + context + '" : {"' + id + '" : "TRANSLATION"}}';
				app.debug.feedback.language(JSON.parse(toParse));
				app.fb.send("plugin.MultilanguageIso_639_3: " + toParse);
				return id;
			}
		},
		list: function(language) {
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
		set: function(language) {
			plugin_MultilanguageIso639_3.loadLanguageIntoDict(language);
			app.info.set("plugin_MultilanguageIso639_3.config.defaultLanguage", language);
		}
	}
};