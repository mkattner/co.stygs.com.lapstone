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
			var img, toParse;
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