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
			//alert("pagecontainerbeforetransition");
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