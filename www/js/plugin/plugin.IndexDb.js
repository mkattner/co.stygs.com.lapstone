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

var plugin_IndexDb = {
	config : null,
	db : null,
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		// In the following line, you should include the prefixes of
		// implementations you want to test.
		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		// DON'T use "var indexedDB = ..." if you're not in a function.
		// Moreover, you may need references to some window.IDB* objects:
		window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
		// (Mozilla has never prefixed these objects, so we don't need
		// window.mozIDB*)
		if (!window.indexedDB) {
			console.error("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
		}

		//plugin_IndexDb.initDb();

		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred();

		dfd.resolve();
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
	initDb : function() {

		request = indexedDB.open(app.config.name, app.config.version.app_int * 100);

		request.onerror = function(event) {
			console.error("Why didn't you allow my web app to use IndexedDB?!");
		};
		request.onsuccess = function(event) {
			plugin_IndexDb.db = event.target.result;
		};

		// This event is only implemented in recent browsers
		request.onupgradeneeded = function(event) {
			plugin_IndexDb.db = event.target.result;
		}
	},

	// public functions
	// called by user
	/**
	 * Public functions for plugin_IndexDb
	 * 
	 * @namespace plugin_IndexDb.functions
	 * 
	 */
	functions : {
		getObjectStore : function(objectStoreName, options) {
			if (plugin_IndexDb.db.objectStoreNames.contains(objectStoreName)) {
				return plugin_IndexDb.db.transaction(objectStoreName, "readwrite").objectStore(objectStoreName);
			} else {
				return plugin_IndexDb.db.createObjectStore(objectStoreName, options);
			}
		}
	}
};