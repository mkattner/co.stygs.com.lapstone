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

var plugin_FormInputDesigner = {
	config : null,

	classes : [],
	attributes : {},

	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded : function() {
		app.debug.trace("plugin_FormInputDesigner.pluginsLoaded()");
		var dfd = $.Deferred();

		if (plugins.functions.pluginLoaded("Skin")) {
			if (plugin_Skin.config.useSkinPlugin) {
				app.debug.trace("plugin_FormInputDesigner.pluginsLoaded() - case: Skin plugin is active");
				plugin_FormInputDesigner.classes = [ plugin_Skin.config.defaultSkin ];
			}
		}

		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.trace("plugin_FormInputDesigner.pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents : function() {
		app.debug.trace("plugin_FormInputDesigner.definePluginEvents()");
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_FormInputDesigner.afterHtmlInjectedBeforePageComputing()");
	},
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_FormInputDesigner.pageSpecificEvents()");
	},

	getAttributes : function(options) {
		app.debug.trace("plugin_FormInputDesigner.getAttributes()");

		var attributes, styles;

		styles = '';
		options.classes = options.classes.concat(plugin_FormInputDesigner.classes);

		attributes = 'class="' + plugin_FormInputDesigner.getClasses(options) + '"';

		if (options.hasOwnProperty("placeholder")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: placeholder");
			attributes += ' placeholder="' + options.placeholder + '"';
		}

		if (options.hasOwnProperty("id")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: id");
			attributes += ' id="' + options.id + '"';
		}

		if (options.hasOwnProperty("name")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: name");
			attributes += ' name="' + options.name + '"';
		}

		if (options.hasOwnProperty("value")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: value");
			attributes += ' value="' + options.value + '"';
		}

		if (options.hasOwnProperty("href")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: href");
			attributes += ' href="' + options.href + '"';
		}

		if (options.hasOwnProperty("onclick")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: onclick");
			attributes += ' onclick="' + options.onclick + '"';
		}

		if (options.hasOwnProperty("src")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: src");
			attributes += ' src="' + options.src + '"';
		}

		if (options.hasOwnProperty("disabled")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: disabled");
			if (options.disabled)
				attributes += ' disabled="disabled"';
		}

		if (options.hasOwnProperty("checked")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: checked");
			if (options.checked)
				attributes += ' checked="checked"';
		}

		if (options.hasOwnProperty("selected")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: selected");
			if (options.selected)
				attributes += ' selected="selected"';
		}

		if (options.hasOwnProperty("attributes")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: attributes");
			$.each(options.attributes, function(key, value) {
				attributes += ' ' + key + '="' + value + '"';
			});
		}

		if (options.hasOwnProperty("styles")) {
			app.debug.debug("plugin_FormInputDesigner.getAttributes() - has property: styles");
			$.each(options.styles, function(key, value) {
				styles += ' ' + key + ':' + value + ';';
			});
			attributes += ' style="' + styles + '"';
		}
		return attributes;
	},

	getClasses : function(options) {
		app.debug.trace("plugin_FormInputDesigner.getClasses()");
		var classes = "";
		if (options.classes != undefined) {
			$.each(options.classes, function(key, value) {
				classes += value + " ";
			});
		}
		return classes;
	},

	getLabel : function(options) {
		app.debug.trace("plugin_FormInputDesigner.getLabel()");
		var labelText = "", visible = "", forId = "";
		if (options.labelText != undefined) {
			labelText = options.labelText;
		}
		if (options.label != undefined && !options.label) {
			visible = "ui-hidden-accessible app-form-label-hidden";
		}
		if (options.id != undefined) {
			forId += ' for="' + options.id + '"';
		}
		return '<label ' + forId + ' class="' + visible + '">' + labelText + '</label>';
	},

	wrapInContainer : function(label, input) {
		app.debug.trace("plugin_FormInputDesigner.wrapInContainer()");
		return '<div class="ui-field-contain app-form-label-input-container">' + label + input + '</div>';
	},

	addClassToOptions : function(options, className) {
		app.debug.trace("plugin_FormInputDesigner.addClassToOptions()");
		if (options.classes == undefined)
			options['classes'] = new Array();
		options.classes.push(className);
		return options;
	},

	generateInput : function(options, type) {
		app.debug.trace("plugin_FormInputDesigner.generateInput()");
		options = plugin_FormInputDesigner.verifyOptions(options);
		var attributes = plugin_FormInputDesigner.getAttributes(options), input = '<input type="' + type + '"  ' + attributes + ' />', label = "", html;
		if (options.label != undefined && options.label == true)
			label = plugin_FormInputDesigner.getLabel(options);

		if (options.container != undefined && options.container) {
			html = plugin_FormInputDesigner.wrapInContainer(label, input);
		} else {
			html = label + input;
		}
		return $(html);
	},

	generateOutput : function(options, type) {
		app.debug.trace("plugin_FormInputDesigner.generateOutput()");
		options = plugin_FormInputDesigner.verifyOptions(options);
		var attributes = plugin_FormInputDesigner.getAttributes(options), output;
		if (options.text == undefined)
			options.text = "";
		switch (type) {
		case 'img':
			output = '<' + type + ' ' + attributes + '/>';
			break;
		default:
			output = '<' + type + ' ' + attributes + '>' + options.text + '</' + type + '>';
			break;
		}

		return $(output);
	},
	verifyOptions : function(options) {
		app.debug.trace("plugin_FormInputDesigner.verifyOptions()");
		if (options == undefined) {
			options = {};
		}

		if (options.classes == undefined)
			options.classes = [];

		if (options.attributes == undefined)
			options.attributes = {};

		if (options.styles == undefined)
			options.styles = {};

		if (options.text != undefined)
			if (typeof options.text == "object")
				options.text = options.text[0].outerHTML;

		return options;
	},
	// public functions
	functions : {
		form : {
			form : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.form.form()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "form", attributes = plugin_FormInputDesigner.getAttributes(options), output;
				plugin_FormInputDesigner.addClassToOptions(options, "app-form");

				if (options.text == undefined) {
					options.text = "";
				}
				output = '<' + type + ' ' + attributes + '>' + options.text + '</' + type + '>';

				return $(output);
			}
		},
		text : {
			hidden : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.text()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "hidden";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-text");
				return plugin_FormInputDesigner.generateInput(options, type);
			},

			text : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.text()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "text";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-text");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			search : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.search()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "search";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-search");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			textarea : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.textarea()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "textarea";
				plugin_FormInputDesigner.addClassToOptions(options, "app-textarea");
				return $(plugin_FormInputDesigner.generateOutput(options, type));
			},
			number : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.number()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "number";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-number");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			date : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.date()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "date";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-date");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			month : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.month()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "month";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-month");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			week : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.week()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "week";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-week");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			time : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.time()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "time";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-time");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			datetime : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.datetime()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "datetime";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-datetime");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			telephone : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.telephone()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "telephone";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-telephone");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			email : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.email()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "email";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-email");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			url : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.url()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "url";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-url");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			password : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.password()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "password";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-password");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			color : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.color()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "color";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-color");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			file : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.text.file()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "file";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-file");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
		},
		button : {
			button : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.button.button()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "button";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-button");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			submit : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.button.submit()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "submit";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-submit");
				return plugin_FormInputDesigner.generateInput(options, type);
			},
			reset : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.button.reset()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "reset";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-submit");
				return plugin_FormInputDesigner.generateInput(options, type);
			}
		},
		radio : {
			radio : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.radio.radio()");
				options = plugin_FormInputDesigner.verifyOptions(options);

				var type = "radio";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-radio");
				return plugin_FormInputDesigner.generateInput(options, type);
			}
		},
		checkbox : {
			checkbox : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.checkbox.checkbox()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "checkbox";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-checkbox");
				return plugin_FormInputDesigner.generateInput(options, type);
			}
		},
		range : {
			range : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.range.range()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "range";
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-input-checkbox");
				return plugin_FormInputDesigner.generateInput(options, type);
			}
		},
		select : {
			multiple : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.select.select()");
				options = plugin_FormInputDesigner.verifyOptions(options);

				options.attributes['multiple'] = "multiple";

				var type = "select", attributes = plugin_FormInputDesigner.getAttributes(options), output;
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-select-multiple");

				if (options.text == undefined) {
					options.text = "";
				}

				output = '<' + type + ' ' + attributes + '>' + options.text + '</' + type + '>';
				return $(output);
			},
			single : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.select.select()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var attributes = plugin_FormInputDesigner.getAttributes(options), input = '<select ' + attributes + ' ></select>', label = "", html;
				if (options.label != undefined && options.label == true)
					label = plugin_FormInputDesigner.getLabel(options);

				if (options.container != undefined && options.container) {
					html = plugin_FormInputDesigner.wrapInContainer(label, input);
				} else {
					html = label + input;
				}
				return $(html);
			},
			option : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.select.option()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "option", attributes = plugin_FormInputDesigner.getAttributes(options), output;
				plugin_FormInputDesigner.addClassToOptions(options, "app-form-select-option");

				if (options.text == undefined) {
					options.text = "";
				}
				output = '<' + type + ' ' + attributes + '>' + options.text + '</' + type + '>';

				return $(output);
			}
		},
		collabsible : {},
		list : {
			thumbnail : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.list.thumbnail()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var thumbnail = '<li>';
				thumbnail += '<a href="' + options.href + '" ' + plugin_FormInputDesigner.getAttributes(options) + '> <img src="' + options.imageSrc + '" class="ui-li-thumb ">';
				thumbnail += '<h2>' + options.headline + '</h2>';
				thumbnail += '<p class="ui-li-responsive-p">' + options.text + '</p>';
				thumbnail += '<p class="ui-li-aside">' + options.title + '</p>';
				thumbnail += '</a>';
				thumbnail += '</li>';
				return $(thumbnail);
			}
		},
		slider : {},
		navigation : {
			navbar : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.navigation.navbar()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var attributes = plugin_FormInputDesigner.getAttributes(options), navbar = $('<div data-role="navbar" ' + attributes + '></div>');
				return navbar;
			},
			panel : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.navigation.panel()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var attributes = plugin_FormInputDesigner.getAttributes(options), navbar = $('<div data-role="panel" ' + attributes + '></div>');
				return navbar;
			}
		},
		table : {
			table : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.table.table()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var attributes = plugin_FormInputDesigner.getAttributes(options), table = '<table ' + attributes + '><thead></thead><tbody></tbody></table>';
				return $(table);
			},
			th : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.table.th()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "th";
				plugin_FormInputDesigner.addClassToOptions(options, "app-th");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			tr : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.table.tr()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "tr";
				plugin_FormInputDesigner.addClassToOptions(options, "app-tr");
				return $(plugin_FormInputDesigner.generateOutput(options, type));
			},
			td : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.table.td()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "td";
				plugin_FormInputDesigner.addClassToOptions(options, "app-td");
				return $(plugin_FormInputDesigner.generateOutput(options, type));
			}
		},
		element : {

			table : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.table()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "table";
				plugin_FormInputDesigner.addClassToOptions(options, "app-table");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			tr : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.tr()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "tr";
				plugin_FormInputDesigner.addClassToOptions(options, "app-tr");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			td : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.td()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "td";
				plugin_FormInputDesigner.addClassToOptions(options, "app-td");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			th : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.th()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "th";
				plugin_FormInputDesigner.addClassToOptions(options, "app-th");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},

			thead : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.thead()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "thead";
				plugin_FormInputDesigner.addClassToOptions(options, "app-thead");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			tbody : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.tbody()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "tbody";
				plugin_FormInputDesigner.addClassToOptions(options, "app-tbody");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},

			h1 : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.h1()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "h1";
				plugin_FormInputDesigner.addClassToOptions(options, "app-h1");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			h2 : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.h2()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "h2";
				plugin_FormInputDesigner.addClassToOptions(options, "app-h2");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			h3 : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.h3()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "h3";
				plugin_FormInputDesigner.addClassToOptions(options, "app-h3");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			h4 : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.h4()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "h4";
				plugin_FormInputDesigner.addClassToOptions(options, "app-h4");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			h5 : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.h4()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "h4";
				plugin_FormInputDesigner.addClassToOptions(options, "app-h4");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			h6 : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.h4()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "h4";
				plugin_FormInputDesigner.addClassToOptions(options, "app-h4");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			img : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.img()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "img";
				plugin_FormInputDesigner.addClassToOptions(options, "app-p");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			p : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.p()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "p";
				plugin_FormInputDesigner.addClassToOptions(options, "app-p");
				return $(plugin_FormInputDesigner.generateOutput(options, type));
			},
			a : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.a()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "a";
				plugin_FormInputDesigner.addClassToOptions(options, "app-a");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			ol : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.ol()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "ol";
				plugin_FormInputDesigner.addClassToOptions(options, "app-ol");
				return $(plugin_FormInputDesigner.generateOutput(options, type));
			},
			ul : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.ul()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "ul";
				plugin_FormInputDesigner.addClassToOptions(options, "app-ul");
				return $(plugin_FormInputDesigner.generateOutput(options, type));
			},
			li : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.li()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "li";
				plugin_FormInputDesigner.addClassToOptions(options, "app-li");
				return $(plugin_FormInputDesigner.generateOutput(options, type));
			},
			div : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.div()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "div";
				plugin_FormInputDesigner.addClassToOptions(options, "app-div");
				return $(plugin_FormInputDesigner.generateOutput(options, type));
			},
			span : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.span()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "span";
				plugin_FormInputDesigner.addClassToOptions(options, "app-span");
				return plugin_FormInputDesigner.generateOutput(options, type);
			},
			canvas : function(options) {
				app.debug.trace("plugin_FormInputDesigner.functions.element.canvas()");
				options = plugin_FormInputDesigner.verifyOptions(options);
				var type = "canvas";
				plugin_FormInputDesigner.addClassToOptions(options, "app-canvas");
				return $(plugin_FormInputDesigner.generateOutput(options, type));
			}
		}
	}
};