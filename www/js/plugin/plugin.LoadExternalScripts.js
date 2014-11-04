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
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
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
				var url = key;
				$.ajax({
					url : url,
					dataType : "script",
					async : false,
					success : function(data, textStatus, jqXHR) {
						;
					},
					error : function(jqXHR, textStatus, errorThrown) {
						alert("Fatal error in plugin_LoadExternalScripts.js: Can't load the javascript. Url: " + key + " Error: " + textStatus);
						alert(errorThrown);
					}
				});
			}
		});
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
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
		javascript : function() {
			app.debug.alert("plugin_LoadExternalScripts.functions.javascript(" + url + ")", 20);
		}
	}
};