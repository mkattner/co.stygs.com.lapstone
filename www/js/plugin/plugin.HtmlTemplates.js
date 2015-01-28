/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
 */
var plugin_HtmlTemplates = {
	config : null,
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

	getText : function(templateId, context) {
		app.debug.alert("plugin_HtmlTemplates.getText(" + templateId + ", " + context + ")", 14);
		var text = null, url = null;
		if (context != undefined) {
			url = plugin_HtmlTemplates.config.templates[context][templateId];
		} else {
			url = plugin_HtmlTemplates.config.templates[templateId];
		}
		if (text = TextLoader(url)) {
			app.load.css(url.substr(0, url.lastIndexOf(".")) + ".css");
			return text;
		} else {
			return false;
		}
	},

	functions : {
		get : function(templateId, context) {
			app.debug.alert("plugin_HtmlTemplates.functions.get(" + templateId + ", " + context + ")", 20);
			return $(plugin_HtmlTemplates.getText(templateId, context));
		},
		append : function(selector, templateId, context) {
			app.debug.alert("plugin_HtmlTemplates.functions.append(" + selector + ", " + templateId + ", " + context + ")", 20);
			$(selector).append(plugin_HtmlTemplates.functions.get(templateId, context));
		},
		prepend : function(selector, templateId, context) {
			app.debug.alert("plugin_HtmlTemplates.functions.prepend(" + selector + ", " + templateId + ", " + context + ")", 20);
			$(selector).prepend(plugin_HtmlTemplates.functions.get(templateId, context));
		},
		overwrite : function(selector, templateId, context) {
			app.debug.alert("plugin_HtmlTemplates.functions.overwrite(" + selector + ", " + templateId + ", " + context + ")", 20);
			$(selector).empty();
			$(selector).prepend(plugin_HtmlTemplates.functions.get(templateId, context));
		}
	}
};