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
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	loadDefinitionFile : function(path) {
		var dfd = $.Deferred(), promise;
		promise = globalLoader.AsyncJsonLoader(path);
		// alert(JSON.stringify(json));

		promise.done(function(json) {
			$.each(json, function(id, url) {
				// alert(id + " = " + url);
				plugin_ImageProvider.images[id] = url;
			});
			dfd.resolve();
		});
		promise.fail(function() {
			dfd.reject();
		});

		return dfd.promise();
	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;

		$.each(plugin_ImageProvider.config.imgdFiles, function(path, loadFile) {
			if (loadFile) {
				promises.push(plugin_ImageProvider.loadDefinitionFile(path));
			}
		});

		promiseOfPromises = $.when.apply($, promises);

		promiseOfPromises.done(function() {
			dfd.resolve();
		});
		promiseOfPromises.done(function() {
			dfd.reject();
		});

		return dfd.promise();
	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

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
		getUrlById : function(id, cont) {
			var img, toParse, lastSlash;
			// alert(id + " = " + plugin_ImageProvider.images[id])
			if ((img = plugin_ImageProvider.images[id]) == undefined) {
				console.warn("ImageProvider - Undefined image: " + id);
				toParse = '{"' + id + '":"PATH"}';
				app.debug.feedback.image(JSON.parse(toParse));
				img = id;
			}
			return img;
		},
		getUrlByIdForSkin : function(id, context) {
			var imageUrl = null, toParse;

			if (context == undefined) {
				imageUrl = plugin_ImageProvider.images[id];
			} else {
				if (plugin_ImageProvider.images[context] == undefined) {
					console.warn("Image - context doesn't exist: " + context);
					toParse = '{"' + context + '" : {}}';
					app.debug.feedback.image(JSON.parse(toParse));
					imageUrl = id;
				} else {
					imageUrl = plugin_ImageProvider.images[context][id];
				}
			}
			if (imageUrl != undefined) {

				return imageUrl.substring(0, imageUrl.lastIndexOf("/")) + "/" + plugin_Skin.config.defaultSkin + imageUrl.substring(imageUrl.lastIndexOf("/"), imageUrl.length);
			} else {
				console.warn("Image - " + context + '.' + id + " == undefined");
				// console.log('"' + id + '" : "TRANSLATION"');
				toParse = '{"' + context + '" : {"' + id + '" : "URL"}}';
				app.debug.feedback.image(JSON.parse(toParse));

				return id;
			}
		}
	}
};