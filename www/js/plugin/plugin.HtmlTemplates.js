//# sourceURL=plugin.HtmlTemplates.js
/**
 * Copyright (c) 2018 martin.kattner@gmail.com Permission is hereby granted,
 * free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions: The above copyright notice and this
 * permission notice shall be included in all copies or substantial portions of
 * the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
 * EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var plugin_HtmlTemplates = {
	config : null,
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded : function() {
		app.debug.trace("plugin_HtmlTemplates.pluginsLoaded()");

		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;

		if (app.config.min) {
			dfd.resolve();
		} else {
			$.each(plugin_HtmlTemplates.config.templates, function(key, template) {

				app.debug.validate(template.content);
				app.debug.validate(template.style);

				promises.push(globalLoader.AsyncTextLoader(template.content));
				promises.push(globalLoader.AsyncTextLoader(template.style));

			});

			promiseOfPromises = $.when.apply($, promises);

			promiseOfPromises.done(function() {
				var args = arguments, argumentsIndex = 0;

				$.each(plugin_HtmlTemplates.config.templates, function(key, template) {

					// plugin_HtmlTemplates.config.templates[key] = {};
					// console.log(i + args[i]);
					plugin_HtmlTemplates.config.templates[key]['content'] = args[argumentsIndex];
					argumentsIndex++;

					plugin_HtmlTemplates.config.templates[key]['style'] = args[argumentsIndex];

					argumentsIndex++;
				});

				dfd.resolve();
			});
			promiseOfPromises.fail(function() {
				dfd.reject();
			});
		}

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

	parseLess : function(data, attempt) {
		var css;
		attempt = attempt || 0;

		if (attempt < 3)
			try {
				less.render(data, {
					filename : "../files/template/xxx.less"
				}, function(error, output) {
					css = output.css;
					// output.imports = array of string filenames of the imports
					// referenced
				});
			} catch (e) {
				attempt++;
				css = plugin_HtmlTemplates.parseLess(data, attempt)
			}
		else {
			alert("less error")
		}
		return css;
	},

	getText : function(templateId) {
		app.debug.trace("plugin_HtmlTemplates.getText()");
		var text = null, style = null, styleIsActive;

		// VALIDATE THE TEMPLATE
		app.debug.validate(app.template.config.templates[templateId]);
		app.debug.validate(app.template.config.templates[templateId]["content"]);
		app.debug.validate(app.template.config.templates[templateId]["style"]);

		text = plugin_HtmlTemplates.config.templates[templateId]["content"];
		style = plugin_HtmlTemplates.config.templates[templateId]["style"];

		if (!app.config.min) {
			style = plugin_HtmlTemplates.parseLess(style);
		}

		styleIsActive = plugin_HtmlTemplates.config.templates[templateId]['styleIsActive'];

		if (styleIsActive == undefined) {
			styleIsActive = plugin_HtmlTemplates.config.templates[templateId]['styleIsActive'] = false;
		}

		if ($("style#lapstoneStyles")[0] == undefined) {
			$('head').append(function() {
				return $("<style>").attr("id", "lapstoneStyles")
			});
		}

		if (styleIsActive === false) {
			$("style#lapstoneStyles").append(style);

			plugin_HtmlTemplates.config.templates[templateId]['styleIsActive'] = true;

		}
		app.debug.debug("plugin_HtmlTemplates.getText() - text: " + text);
		return text;
	},

	getElements : function(templateId) {
		app.debug.trace("plugin_HtmlTemplates.getElements()");
		var elements;

		elements = plugin_HtmlTemplates.config.templates[templateId]['elements'];

		if (elements == undefined)
			elements = {};

		app.debug.debug("plugin_HtmlTemplates.getElements() - elements: " + JSON.stringify(elements));

		return elements;
	},

	functions : {

		get : function(templateId, $templateObject) {
			app.debug.trace("plugin_HtmlTemplates.functions.get()");
			app.debug.debug("plugin_HtmlTemplates.functions.get() - templateId: " + templateId);
			var extendObject;

			$templateObject = $templateObject || $(plugin_HtmlTemplates.getText(templateId));
			extendObject = {};

			// add templateId as class to $templateObject
			if (!$templateObject.hasClass("template" + templateId))
				$templateObject.addClass("template" + templateId);

			// extend the jQuery template object with some element functions
			app.debug.validate(app.template.config.templates[templateId]);
			if (plugin_HtmlTemplates.config.templates[templateId].elements) {
				$.each(plugin_HtmlTemplates.config.templates[templateId].elements, function(elementKey, elementSelector) {
					extendObject["_" + elementKey] = function(contentObject) {
						if (contentObject) {
							return this.find(elementSelector).append(contentObject);
						}

						else {
							return this.find(elementSelector);
						}
					}

				});
			}

			$templateObject.extend(extendObject);

			return $templateObject;
		},
		append : function(selector, templateId) {
			app.debug.trace("plugin_HtmlTemplates.functions.append()");
			$(selector).append(plugin_HtmlTemplates.functions.get(templateId));
		},
		prepend : function(selector, templateId) {
			app.debug.trace("plugin_HtmlTemplates.functions.prepend()");
			$(selector).prepend(plugin_HtmlTemplates.functions.get(templateId));
		},
		overwrite : function(selector, templateId) {
			app.debug.trace("plugin_HtmlTemplates.functions.overwrite()");
			app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - selector: " + selector);
			app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - templateId: " + templateId);
			$(selector).empty();
			$(selector).attr("data-context", templateId);
			$(selector).prepend(plugin_HtmlTemplates.functions.get(templateId));
			app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - new html code: " + $(selector)[0].outerHTML);
		},
		elements : function(templateId) {
			app.debug.trace("plugin_HtmlTemplates.functions.elements()");
			return plugin_HtmlTemplates.getElements(templateId);
		}
	}
};