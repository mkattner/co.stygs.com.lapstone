//LoadExternalScripts
/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
 */
var plugin_LoadExternalScripts = {
	config : null,
	loadedScripts : {},
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);

		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;
		console.log("todo");
		$.each(plugin_LoadExternalScripts.config.scripts.css, function(key, value) {
			if (value) {
				if (key in plugin_LoadExternalScripts.loadedScripts) {
					;// do nothing already loaded
				} else {
					var cssLink = "<link rel='stylesheet' type='text/css' href='" + key + "'>";
					$("head").append(cssLink);
					plugin_LoadExternalScripts.loadedScripts[key] = true;
				}

			}
		});
		$.each(plugin_LoadExternalScripts.config.scripts.javascript, function(key, value) {
			if (value) {
				promises.push(globalLoader.AsyncScriptLoader(key));
			}
		});

		promiseOfPromises = $.when.apply($, promises);

		promiseOfPromises.done(function() {
			dfd.resolve();
		});
		
		promiseOfPromises.fail(function() {
			dfd.reject();
		})

		return dfd.promise();
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
	// called for each page
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
	},
	// called once
	pageSpecificEvents : function() {
		app.debug.alert("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
	},
	// public
	// called by user
	functions : {
		css : function(url) {
			app.debug.alert("plugin_LoadExternalScripts.functions.css(" + url + ")", 20);
			if (url in plugin_LoadExternalScripts.loadedScripts) {
				;// do nothing already loaded
			} else {
				var cssLink = "<link rel='stylesheet' type='text/css' href='" + url + "'>";
				$("head").append(cssLink);
				plugin_LoadExternalScripts.loadedScripts[url] = true;
			}
		},
		javascript : function(url) {
			app.debug.alert("plugin_LoadExternalScripts.functions.javascript(" + url + ")", 20);
		}
	}
};