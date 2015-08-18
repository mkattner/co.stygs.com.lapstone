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
	templates : {},
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded : function() {
		app.debug.trace("plugin_HtmlTemplates.pluginsLoaded()");

		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;

		$.each(plugin_HtmlTemplates.config.templates, function(key, template) {
			if (template.url != undefined) {
				promises.push(globalLoader.AsyncTextLoader(template.url));
				promises.push(globalLoader.AsyncTextLoader(template.url.substr(0, template.url.lastIndexOf(".")) + ".css"));
			} else {
				$.each(plugin_HtmlTemplates.config.templates[key], function(key, template) {
					if (template.url != undefined) {
						promises.push(globalLoader.AsyncTextLoader(template.url));
						promises.push(globalLoader.AsyncTextLoader(template.url.substr(0, template.url.lastIndexOf(".")) + ".css"));
					}

				});
			}
		});

		promiseOfPromises = $.when.apply($, promises);

		promiseOfPromises.done(function() {
			var args = arguments, context, i = 0;
			$.each(plugin_HtmlTemplates.config.templates, function(key, template) {
				if (template.url != undefined) {
					plugin_HtmlTemplates.templates[key] = {};
					// console.log(i + args[i]);
					plugin_HtmlTemplates.templates[key]['html'] = (args[i]);
					i = i + 1;
					// console.log(i + args[i]);
					plugin_HtmlTemplates.templates[key]['css'] = (args[i]);
					i = i + 1;
				} else {
					context = key;
					plugin_HtmlTemplates.templates[context] = {};
					$.each(plugin_HtmlTemplates.config.templates[key], function(key, template) {
						if (template.url != undefined) {
							plugin_HtmlTemplates.templates[context][key] = {};
							// console.log(i + args[i]);
							plugin_HtmlTemplates.templates[context][key]['html'] = (args[i]);
							i = i + 1;
							// console.log(i + args[i]);
							plugin_HtmlTemplates.templates[context][key]['css'] = (args[i]);
							i = i + 1;
						}

					});
				}
			});
			dfd.resolve();
		});
		promiseOfPromises.fail(function() {
			dfd.reject();
		});

		return dfd.promise();
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.trace("plugin_HtmlTemplates.pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents : function() {
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_HtmlTemplates.afterHtmlInjectedBeforePageComputing()");
	},
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_HtmlTemplates.pageSpecificEvents()");
	},

	getText : function(templateId, context) {
		app.debug.trace("plugin_HtmlTemplates.getText()");
		var text = null, css = null, styleIsActive;
		if (context != undefined) {
			text = plugin_HtmlTemplates.templates[context][templateId]['html'];
			css = plugin_HtmlTemplates.templates[context][templateId]['css'];
			styleIsActive = plugin_HtmlTemplates.templates[context][templateId]['styleIsActive'];
			if (styleIsActive == undefined)
				styleIsActive = plugin_HtmlTemplates.templates[context][templateId]['styleIsActive'] = false;

		} else {
			text = plugin_HtmlTemplates.templates[templateId]['html'];
			css = plugin_HtmlTemplates.templates[templateId]['css'];
			styleIsActive = plugin_HtmlTemplates.templates[templateId]['styleIsActive'];
			if (styleIsActive == undefined)
				styleIsActive = plugin_HtmlTemplates.templates[templateId]['styleIsActive'] = false;
		}

		if ($("style")[0] == undefined)
			$('head').append("<style></style>");

		if (styleIsActive === false) {
			$("style").append(css);

			if (context != undefined) {
				plugin_HtmlTemplates.templates[context][templateId]['styleIsActive'] = true;
			} else {
				plugin_HtmlTemplates.templates[templateId]['styleIsActive'] = true;
			}
		}
		app.debug.debug("plugin_HtmlTemplates.getText() - text: " + text);
		return text;
	},

	getElements : function(templateId, context) {
		app.debug.trace("plugin_HtmlTemplates.getElements()");
		var elements;
		if (context != undefined) {
			elements = plugin_HtmlTemplates.config.templates[context][templateId]['elements'];
		} else {
			elements = plugin_HtmlTemplates.config.templates[templateId]['elements'];
		}
		if (elements == undefined)
			elements = {};

		app.debug.debug("plugin_HtmlTemplates.getElements() - elements: " + JSON.stringify(elements));

		return elements;
	},

	functions : {
		get : function(templateId, context) {
			app.debug.trace("plugin_HtmlTemplates.functions.get()");
			app.debug.debug("plugin_HtmlTemplates.functions.get() - templateId: " + templateId);
			app.debug.debug("plugin_HtmlTemplates.functions.get() - context: " + context);
			return $(plugin_HtmlTemplates.getText(templateId, context));
		},
		append : function(selector, templateId, context) {
			app.debug.trace("plugin_HtmlTemplates.functions.append()");
			$(selector).append(plugin_HtmlTemplates.functions.get(templateId, context));
		},
		prepend : function(selector, templateId, context) {
			app.debug.trace("plugin_HtmlTemplates.functions.prepend()");
			$(selector).prepend(plugin_HtmlTemplates.functions.get(templateId, context));
		},
		overwrite : function(selector, templateId, context) {
			app.debug.trace("plugin_HtmlTemplates.functions.overwrite()");
			app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - selector: " + selector);
			app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - templateId: " + templateId);
			app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - context: " + context);
			$(selector).empty();
			$(selector).attr("data-context", templateId);
			$(selector).prepend(plugin_HtmlTemplates.functions.get(templateId, context));
			app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - new html code: " + $(selector)[0].outerHTML);
		},
		elements : function(templateId, context) {
			app.debug.trace("plugin_HtmlTemplates.functions.elements()");
			return plugin_HtmlTemplates.getElements(templateId, context);
		}
	}
};