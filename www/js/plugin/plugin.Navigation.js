// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_Navigation
 * 
 * @version 1.0
 * @namespace plugin_Navigation
 */
var plugin_Navigation = {
	config : null,

	history : [],
	lastTransition : "none",

	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
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

		$("body").on("pagecontainerbeforetransition", function(event, ui) {
			if (plugin_Navigation.history.length > 0) {
				if (plugin_Navigation.history[plugin_Navigation.history.length - 1].page != ui.toPage.attr("id")) {
					plugin_Navigation.history.push({
						"page" : ui.toPage.attr("id"),
						"transition" : ui.options.transition
					});
				}
			} else {
				plugin_Navigation.history.push({
					"page" : ui.toPage.attr("id"),
					"transition" : ui.options.transition
				});
			}
		});

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
	 * Public functions for plugin_Navigation
	 * 
	 * @namespace plugin_Navigation.functions
	 * 
	 */
	functions : {
		redirect : function(url, transition, reverse) {
			setTimeout(function() {
				if (transition != undefined)
					$("body").pagecontainer("change", url, {
						transition : transition,
						reverse : (reverse == undefined) ? false : reverse
					});
				else {
					$(location).attr("href", url);
				}
			}, 50);
		},
		back : function(transition) {
			var lastPage, currentPage;
			if (plugin_Navigation.history.length > 1) {
				currentPage = plugin_Navigation.history.pop();
				lastPage = plugin_Navigation.history[plugin_Navigation.history.length - 1];
				this.redirect(lastPage.page + ".html", currentPage.transition, true);
			}
		},
		forward : function() {
			window.history.forward();
		},
		reload : function() {
			location.reload();
		},
		refresh : function() {
			location.reload();
		},
		redirectAndReload : function(url) {
			$.mobile.ajaxEnabled = false;
			window.location.replace(url);
		},
		normalizeUrl : function(uri) {
			var uri = URI(uri);
			if (uri.protocol() === "")
				uri.protocol('http');
			return uri.toString();
		}
	}
};