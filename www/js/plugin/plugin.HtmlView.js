// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_HtmlView
 * 
 * @version 1.0
 * @namespace plugin_HtmlView
 */
var plugin_HtmlView = {
	config : null,
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

		$(document).on("pagecontainerbeforetransition", function(event, ui) {
			var pageId, context, text;
			pageId = ui.toPage.attr('id');
			context = plugin_HtmlView.config.multilanguageContext;
			text = app.lang.string(app.config.title, context) + " - " + app.lang.string(pageId, context);
			ui.toPage.attr("data-title", text);
		});
	},
	// private functions

	// public functions
	// called by user
	/**
	 * Public functions for plugin_HtmlView
	 * 
	 * @namespace plugin_HtmlView.functions
	 * 
	 */
	functions : {
		page : {
			width : function(minimum, maximum) {
				var val = parseInt($("div[data-role=page]").css("width"));
				if (val > maximum)
					return maximum;
				else if (val < minimum)
					return minimum;
				return val;
			},
			height : function(minimum, maximum) {
				var val = parseInt($("div[data-role=page]").css("height"));
				if (val > maximum)
					return maximum
				return val;
			}
		},
		content : {
			width : function(minimum, maximum) {
				var val = parseInt($("div[data-role=content]").css("width"));
				if (val > maximum)
					return maximum;
				else if (val < minimum)
					return minimum;
				return val;
			},
			height : function(minimum, maximum) {
				var val = parseInt($("div[data-role=content]").css("height"));
				if (val > maximum)
					return maximum;
				else if (val < minimum)
					return minimum;
				return val;
			}
		},
		window : {
			width : function(minimum, maximum) {
				var val = parseInt($(window).width());
				if (val > maximum)
					return maximum;
				else if (val < minimum)
					return minimum;
				return val;
			},
			height : function(minimum, maximum) {
				var val = parseInt($(window).height());
				if (val > maximum)
					return maximum;
				else if (val < minimum)
					return minimum;
				return val;
			}
		}
	}
};