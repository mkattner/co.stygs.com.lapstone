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

/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
 */
var plugin_HtmlTemplates = {
	config : null,
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
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
			url = plugin_HtmlTemplates.config.templates[context][templateId]['url'];
		} else {
			url = plugin_HtmlTemplates.config.templates[templateId]['url'];
		}
		if (text = globalLoader.TextLoader(url)) {
			app.load.css(url.substr(0, url.lastIndexOf(".")) + ".css");
			return text;
		} else {
			return false;
		}
	},

	getElements : function(templateId, context) {
		app.debug.alert("plugin_HtmlTemplates.getElements(" + templateId + ", " + context + ")", 14);
		var elements;
		if (context != undefined) {
			elements = plugin_HtmlTemplates.config.templates[context][templateId]['elements'];
		} else {
			elements = plugin_HtmlTemplates.config.templates[templateId]['elements'];
		}
		if (elements == undefined)
			return {};
		else
			return elements;
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
		},
		elements : function(templateId, context) {
			return plugin_HtmlTemplates.getElements(templateId, context);
		}
	}
};