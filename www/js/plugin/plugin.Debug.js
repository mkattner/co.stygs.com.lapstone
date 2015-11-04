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

var plugin_Debug = {
	/**
	 * Configuration loaded from json file or html5 storage. Use
	 * plugin_Informator to get access.
	 * 
	 * @private
	 */
	config : null,

	/**
	 * Log object
	 * 
	 * @private
	 */
	logObject : [],
	feedback : {
		language : {},
		image : {}
	},
	// obligate functions

	/**
	 * Constructor is called by plugins.js
	 * 
	 * @protected
	 * 
	 */
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	/**
	 * PluginsLoaded event. Called by plugins.js after all plugins are loaded.
	 * 
	 * @protected
	 */
	pluginsLoaded : function() {
		app.debug.trace("plugin_Debug.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
		var dfd = $.Deferred();

		// add dev language to language array
		plugin_MultilanguageIso639_3.config.availableLanguages.push("dev");

		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	/**
	 * PagesLoaded event. Called by pages.js after all pages are loaded.
	 * 
	 * @protected
	 */
	pagesLoaded : function() {
		app.debug.trace("plugin_Debug.pagesLoaded(" + app.debug.arguments(arguments) + ")");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	/**
	 * Define the jQuery event delegations for the plugin. Called by pages.js
	 * after ...
	 * 
	 * @protected
	 * @returns {boolean} Succesfull or unsuccessful
	 */
	definePluginEvents : function() {
		app.debug.trace("plugin_Debug.definePluginEvents(" + app.debug.arguments(arguments) + ")");
	},

	// called by pages.js
	/**
	 * AfterHtmlInjectedBeforePageComputing event. Called by pages.js after
	 * page.create().
	 * 
	 * @protected
	 * @param container
	 *            {object} jQuery page div
	 */
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_Debug.pagesLoaded(" + app.debug.arguments(arguments) + ")");
		if (plugin_Debug.config.debugDevice && (app.config.min == false)) {
			var debugDiv, select;

			debugDiv = app.ni.element.div({
				id : "divDebug",
				attributes : {
					"data-enhance" : "false"
				},
				styles : {
					"position" : "fixed",
					"z-index" : "1050",
					"top" : "0px",
					"left" : "0px",
					"padding" : "5px",
					"min-width" : "150px",
					"min-height" : "50px",
					"background-color" : "rgba(200, 200, 200, 0.7)"
				}
			});

			select = app.ni.select.single({
				id : "selConsoleLevel",
				label : true,
				labelText : "console level",
				container : true
			});

			$.each(plugin_Debug.config.debugLevels, function(levelName, ratingValue) {
				select.find("select").append(app.ni.select.option({
					text : levelName,
					value : levelName,
					selected : (plugin_Debug.config.consoleLevel == levelName) ? true : false
				}));
			});

			debugDiv.append(select);

			select = app.ni.select.single({
				id : "selLogLevel",
				label : true,
				labelText : "log level",
				container : true
			});

			$.each(plugin_Debug.config.debugLevels, function(levelName, ratingValue) {
				select.find("select").append(app.ni.select.option({
					text : levelName,
					value : levelName,
					selected : (plugin_Debug.config.logLevel == levelName) ? true : false
				}));
			});

			debugDiv.append(select);

			debugDiv.append(app.ni.button.button({
				id : "btnClose",
				value : "close"
			}))

			container.append(debugDiv);
		}
	},
	/**
	 * Called once by pages.js
	 * 
	 * @protected
	 * @param container
	 *            {object} jQuery page div
	 */
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_Debug.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");

		if (plugin_Debug.config.debugDevice && (app.config.min == false)) {
			$(document).on('change', '#selConsoleLevel', function() {
				app.info.set("plugin_Debug.config.consoleLevel", $('#selConsoleLevel option:selected').val());
			});

			$(document).on('change', '#selLogLevel', function() {
				app.info.set("plugin_Debug.config.logLevel", $('#selLogLevel option:selected').val());
			});

			$(document).on('click', '#btnClose', function() {
				$('#divDebug').slideUp();
			})
		}
	},

	// private functions
	/**
	 * @private
	 */

	// public functions
	/**
	 * @namespace plugin_Debug.functions
	 * 
	 */
	functions : {
		arguments : function(argumentsToPrint) {
			var returnValue = "";

			$.each(argumentsToPrint, function(index, argument) {
				returnValue += argument + ", ";
			});

			return returnValue.substring(0, returnValue.length - 2);
		},

		// debug functions

		trace : function(output) {
			// log debug output
			this.log(output, "TRACE");
		},

		debug : function(output) {
			// log debug output
			this.log(output, "DEBUG");
		},

		info : function(output) {
			// log debug output
			this.log(output, "INFO");
		},

		app : function(output) {
			// log debug output
			this.log(output, "APP");
		},

		warn : function(output) {
			// log debug output
			this.log(output, "WARN");
		},

		error : function(output) {
			// log debug output
			this.log(output, "ERROR");

			// print stack trace
			try {
				console.error("Error trace:");
			}

			catch (e) {
				;
			}
		},

		fatal : function(output) {
			// log debug output
			this.log(output, "FATAL");

			// print stack trace
			try {
				console.error("Error trace:");
			}

			catch (e) {
				;
			}
		},

		alert : function(text, level) {
			console.warn("Dep. " + text);
		},

		log : function(output, level) {

			if (plugin_Debug.config.debugDevice) {
				// log to object
				if (plugin_Debug.config.debugLevels[level] >= plugin_Debug.config.debugLevels[plugin_Debug.config.logLevel]) {
					plugin_Debug.logObject.push(output);
				}
				// log to console

				// alert(output + level);
				if (plugin_Debug.config.debugLevels[level] >= plugin_Debug.config.debugLevels[plugin_Debug.config.consoleLevel]) {
					console.log(level + ": " + output);
				}
				// log to webservice
			}
		},

		/**
		 * Shows the log object in an alert window
		 */
		showLog : function() {
			console.warn("Deprecated function!!");
			alert(JSON.stringify(plugin_Debug.logObject));
		},

		ls : {
			wsd : function() {
				app.debug.trace("plugin_Debug.functions.ls.wsd(" + app.debug.arguments(arguments) + ")");
				$.each(plugin_RestClient.config.webservices, function(wsName, singleWsd) {
					var path, query;

					console.log("Name: " + wsName);

					if (singleWsd.hasOwnProperty("url")) {
						path = singleWsd.url.split('?')[0];
						query = singleWsd.url.split('?')[1];

						console.log("\tPath: " + path);
						// console.log("\tQuery: " + query);

						// console.log("\tPath parameter: todo");

						console.log("\tQuery parameter:");
						if (query)
							$.each(query.split("&"), function(index, parameter) {
								console.log("\t\t" + parameter.replace("=", " = "));
							});
						console.log(" ");
					}

					else {
						console.error("Webservice has no url property.");
					}
				});

			}
		},

		feedback : {

			language : function(object) {
				app.debug.trace("plugin_Debug.functions.feedback.language(" + app.debug.arguments(arguments) + ")");
				app.debug.warn("Unimplemented language: " + JSON.stringify(object));
				$.extend(true, plugin_Debug.feedback.language, object);
			},

			languageGetJson : function() {
				app.debug.trace("plugin_Debug.functions.feedback.languageGetJson(" + app.debug.arguments(arguments) + ")");
				return JSON.stringify($.extend(true, plugin_Debug.feedback.language, plugin_MultilanguageIso639_3.dictionary));
			},

			image : function(object) {
				app.debug.trace("plugin_Debug.functions.feedback.image(" + app.debug.arguments(arguments) + ")");
				app.debug.warn("Unimplemented image: " + JSON.stringify(object));
				$.extend(true, plugin_Debug.feedback.image, object);
			},
			imageGetJson : function() {
				app.debug.trace("plugin_Debug.functions.feedback.languageGetJson(" + app.debug.arguments(arguments) + ")");
				return JSON.stringify($.extend(true, plugin_Debug.feedback.image, plugin_ImageProvider.images));
			},
			wsdGetJson : function() {
				app.debug.trace("plugin_Debug.functions.feedback.wsdGetJson(" + app.debug.arguments(arguments) + ")");
				return JSON.stringify(plugin_RestClient.config.webservices);
			}
		}
	},
/**
 * Add line to log object.
 * 
 * @param {string}
 *            text text to log
 */

};