//# sourceURL=plugin.Debug.js
/**
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Plugin to create debug output. It will be removed in release Versions.
 * 
 * @namespace plugin_Debug
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
	 */
	constructor : function() {
		var dfd = $.Deferred();

		// validate config file
		plugin_Debug.functions.validate(plugin_Debug.config.consoleLevel, "array");
		plugin_Debug.functions.validate(plugin_Debug.config.logLevel, "array");

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

		/**
		 * show app.about() when you click 7 times in 4 secconds
		 */
		$(document).on("vclick", function(event) {
			plugin_Debug.aboutListener(event, $(this));

		});
		if (!app.config.min) {
			$(document).on("webserviceCall", function(event, promise, wsName, wsd) {
				promise.fail(function(error) {
					var parameterString = "?";

					if (wsd.parameters !== undefined) {
						$.each(wsd.parameters, function(name, value) {
							parameterString += (name + "=" + value + "&");
						});
					}

					alert(wsName + ": \n" + "URL:\n" + wsd.url + parameterString + "\n\nWsd:\n" + JSON.stringify(wsd) + "\n\nWebservice returns:\n" + JSON.stringify(error));
				});

			});
		}
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

			debugDiv = $("<div>").attr({
				id : "divDebug",
				"data-enhance" : "false"
			}).css({
				"position" : "fixed",
				"display" : "none",
				"z-index" : "1050",
				"top" : "0px",
				"left" : "0px",
				"padding" : "5px",
				"min-width" : "150px",
				"min-height" : "50px",
				"background-color" : "rgba(200, 200, 200, 0.7)"
			});

			/**
			 * console level
			 */
			select = $("<div>").addClass("ui-field-contain").append(function() {
				return $("<label>").attr({
					"for" : "selConsoleLevel"
				}).text("console level")
			}).append(function() {
				return $("<select>").attr({
					"id" : "selConsoleLevel",
					"multiple" : "multiple",
					"data-native-menu" : "false"
				})
			});

			$.each(plugin_Debug.config.debugLevels, function(levelName, ratingValue) {

				select.find("select").append(function() {
					return $("<option>").attr({
						value : levelName
					}).prop({
						"selected" : (plugin_Debug.config.consoleLevel.indexOf(levelName) > -1) ? true : false
					}).text(levelName)
				});

			});

			debugDiv.append(select);

			/**
			 * log level
			 */
			select = $("<div>").addClass("ui-field-contain").append(function() {
				return $("<label>").attr({
					"for" : "selLogLevel"
				}).text("log level")
			}).append(function() {
				return $("<select>").attr({
					"id" : "selLogLevel",
					"multiple" : "multiple",
					"data-native-menu" : "false"
				})
			});

			$.each(plugin_Debug.config.debugLevels, function(levelName, ratingValue) {

				select.find("select").append(function() {
					return $("<option>").attr({
						value : levelName
					}).prop({
						"selected" : (plugin_Debug.config.logLevel.indexOf(levelName) > -1) ? true : false
					}).text(levelName)
				});

			});

			debugDiv.append(select);

			/**
			 * close button
			 */
			debugDiv.append(function() {
				return $("<button>").attr({
					id : "btnClose",
				}).text("Close")
			});

			container.append(debugDiv);

			debugDiv.css({
				"display" : "none"
			});

			container.append(function() {
				return $("<div>").attr("id", "divDebugButton").css({
					"position" : "fixed",
					"display" : "block",
					"z-index" : "1050",
					"top" : "0px",
					"left" : "0px",
					"height" : "10px",
					"width" : "20px",
					"background-color" : "red"
				}).on("click", function() {
					$(this).hide();
					$("#divDebug").show();
				})
			});
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
				app.debug.event(event);

				app.info.set("plugin_Debug.config.consoleLevel", $("#selConsoleLevel").val() || [ "OFF" ]);
			});

			$(document).on('change', '#selLogLevel', function() {
				app.debug.event(event);

				app.info.set("plugin_Debug.config.logLevel", $("#selLogLevel").val() || [ "OFF" ]);
			});

			$(document).on('click', '#btnClose', function() {
				app.debug.event(event);

				$('#divDebug').hide();

				// $('#divDebug').animate({
				// "height": "0px"
				// }, {
				// "duration": 200
				// });

				$("#divDebugButton").show();
			})
		}
	},

	// private functions
	aboutListener : function(event, element) {
		var clicks;

		if (!element.data("clicks")) {
			element.data("clicks", []);
		}

		clicks = element.data("clicks");

		clicks.unshift(Date.now());

		if ((clicks[0] - clicks[6]) < 1500) {

			clicks = [];
			plugin_Debug.about();
		}

		clicks = clicks.slice(0, 7);

		// alert(clicks);
	},

	about : function() {
		app.debug.validate(plugin_Notification);

		var content;

		$("html").off("vclick");

		content = $("<ul>");

		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("App version: ").append(function() {
					return $("<strong>").text(app.config.version.app)
				})
			})
		});
		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("Lapstone version: ").append(function() {
					return $("<strong>").text(app.config.version.lapstone)
				})
			})
		});
		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("Lapstone release version: ").append(function() {
					return $("<strong>").text(app.config.min)
				})
			})
		});

		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("jQuery version: ").append(function() {
					return $("<strong>").text($.fn.jquery)
				})
			})
		});
		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("jQuery mobile version: ").append(function() {
					return $("<strong>").text($.mobile.version)
				})
			})
		});
		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("Use apache cordova: ").append(function() {
					return $("<strong>").text(app.config.apacheCordova)
				})
			})
		});

		// HTML Meta
		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("User Agent: ").append(function() {
					return $("<strong>").text(navigator.userAgent)
				})
			})
		});
		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("HTML Viewport: ").append(function() {
					return $("<strong>").text($("meta[name=viewport]").attr("content"))
				})
			})
		});
		// Page
		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("Current Page: ").append(function() {
					return $("<strong>").text($("div[data-role=page]").attr("id"))
				})
			})
		});
		// App
		content.append(function() {
			return $("<li>").append(function() {
				return $("<p>").text("Startup Time: ").append(function() {
					return $("<strong>").text(app.config.startup + " seconds")
				})
			})
		});

		app.notify.dialog({
			text : content,
			title : "About the app.",
			headline : "Use this data when you report a bug.",
			buttonLeft : "Report a Bug",
			buttonRight : "Close",
			callbackButtonLeft : function(popup) {
				$("html").on("vclick", function(event) {
					plugin_Debug.aboutListener(event, $(this));
				});
			},
			callbackButtonRight : function(popup) {
				$("html").on("vclick", function(event) {
					plugin_Debug.aboutListener(event, $(this));
				});
			},
			delayInMs : 0,
			width : "80%"
		})
	},

	// public functions
	/**
	 * The public functions used by the API *
	 * 
	 * @memberof plugin_Debug
	 * @namespace plugin_Debug.functions
	 */
	functions : {

		/**
		 * Consumes an array with values of different types and returns it as a
		 * string.
		 * 
		 * @memberof plugin_Debug.functions
		 * @function arguments
		 * @param {Array}
		 *            argumentsToPrint - An array with the arguments to print.
		 * @returns {String} A string representation of the array.
		 */
		arguments : function(argumentsToPrint) {
			var returnValue = "";

			$.each(argumentsToPrint, function(index, argument) {
				if ($.isPlainObject(argument))
					returnValue += JSON.stringify(argument) + ", ";
				else
					returnValue += argument + ", ";
			});

			return returnValue.substring(0, returnValue.length - 2);
		},

		// debug functions
		/**
		 * Handles the debug output on level: TRACE
		 * 
		 * @memberof plugin_Debug.functions
		 * @function trace
		 * @param {String}
		 *            output - The debug output.
		 */
		webservice : function(serviceName) {
			if (typeof serviceName === "string") {
				plugin_RestClient.config.webservices[serviceName]['calls'] = plugin_RestClient.config.webservices[serviceName]['calls'] || 0;
				plugin_RestClient.config.webservices[serviceName]['calls']++;
			}
		},

		/**
		 * Handles the debug output on level: TRACE
		 * 
		 * @memberof plugin_Debug.functions
		 * @function trace
		 * @param {String}
		 *            output - The debug output.
		 */
		trace : function(output) {
			// log debug output
			this.log(output, "TRACE");
		},

		/**
		 * Handles the debug output on level: DEBUG
		 * 
		 * @memberof plugin_Debug.functions
		 * @function debug
		 * @param {String}
		 *            output - The debug output.
		 */
		debug : function(output) {
			// log debug output
			this.log(output, "DEBUG");
		},

		/**
		 * Handles the debug output on level: TODO
		 * 
		 * @memberof plugin_Debug.functions
		 * @function todo
		 * @param {String}
		 *            output - The debug output.
		 */
		todo : function(output) {
			// log debug output
			this.log(output, "TODO", true);
		},

		/**
		 * Handles the debug output on level: INFO
		 * 
		 * @memberof plugin_Debug.functions
		 * @function info
		 * @param {String}
		 *            output - The debug output.
		 */
		info : function(output) {
			// log debug output
			this.log(output, "INFO");
		},

		/**
		 * Handles the debug output on level: EVENT
		 * 
		 * @memberof plugin_Debug.functions
		 * @function event
		 * @param {jQuery.Event}
		 *            output - The debug output.
		 */
		event : function(event) {
			// log debug output
			// eventinger = event;
			this.log("            Type: " + event.type, "EVENT");
			if ($(event.target).attr("class"))
				this.log("   Event classes: ." + $(event.target).attr("class").split(" ").join("."), "EVENT");
			if ($(event.target).attr("id"))
				this.log("        Event id: #" + $(event.target).attr("id"), "EVENT");
			if ($(event.delegateTarget).attr("class"))
				this.log("Delegate classes: ." + $(event.delegateTarget).attr("class").split(" ").join("."), "EVENT");
			if ($(event.delegateTarget).attr("id"))
				this.log("     Delegate id: #" + $(event.delegateTarget).attr("id"), "EVENT");

		},

		/**
		 * Handles the debug output on level: APP
		 * 
		 * @memberof plugin_Debug.functions
		 * @function app
		 * @param {String}
		 *            output - The debug output.
		 */
		app : function(output) {
			// log debug output
			this.log(output, "APP");
		},

		/**
		 * Handles the debug output on level: WARN
		 * 
		 * @memberof plugin_Debug.functions
		 * @function warn
		 * @param {String}
		 *            output - The debug output.
		 */
		warn : function(output) {
			// log debug output
			this.log(output, "WARN");
		},

		/**
		 * Handles the debug output on level: ERROR
		 * 
		 * @memberof plugin_Debug.functions
		 * @function error
		 * @param {String}
		 *            output - The debug output.
		 */
		error : function(output) {
			// log debug output
			this.log(output, "ERROR", true);
		},

		/**
		 * Calls a function
		 * 
		 * @memberof plugin_Debug.functions
		 * @function operation
		 * @param {Function}
		 *            operation - The function to call.
		 */
		operation : function(operation) {
			operation();
		},

		/**
		 * Calls a function
		 * 
		 * @memberof plugin_Debug.functions
		 * @function object
		 * @param {Function}
		 *            operation - The function to call.
		 */
		object : function(object) {
			console.log(object)
		},

		/**
		 * Handles the debug output on level: FATAL
		 * 
		 * @memberof plugin_Debug.functions
		 * @function fatal
		 * @param {String}
		 *            output - The debug output.
		 */
		fatal : function(output) {
			// log debug output
			this.log(output, "FATAL", true);
		},

		/**
		 * Handles the debug output on level: DEPRECATED
		 * 
		 * @memberof plugin_Debug.functions
		 * @function deprecated
		 * @param {String}
		 *            output - The debug output.
		 */
		deprecated : function(text) {
			if (plugin_Debug.config.debugDevice) {
				try {
					console.error("Deprecated: " + text);
				}

				catch (e) {
					;
				}

			}
		},

		flat : function() {

		},

		/**
		 * Validates if an objects exists. You can use this function to validate
		 * that an object exists before you use it. E.g.: Validate if a JSON
		 * configuration file has specific members.
		 * 
		 * @memberof plugin_Debug.functions
		 * @function validate
		 * @param {Object}
		 *            object - The object to validate.
		 */

		/**
		 * Validates if an objects of a specific type exists. You can use this
		 * function to validate that an object of a specific type exists before
		 * you use it. E.g.: Validate if a JSON configuration file has specific
		 * members with specific types.
		 * 
		 * @memberof plugin_Debug.functions
		 * @function validate
		 * @param {Object}
		 *            object - The object to validate.
		 * @param {Type}
		 *            type - Type to validate.
		 */
		validate : function(object, type, message) {
			message = message || "No specific message."

			if (type) {
				if (type === "boolean") {
					if (object === false) {
						return true;
					}

					else if (object === true) {
						return true;
					}
					
					else{
						throw new Error("Validation problem. Please look at the stacktrace; " + message);
					}
				}

				else if (type === "array") {
					if (!Array.isArray(object)) {
						plugin_Debug.functions.fatal();
						throw new Error("Validation problem. Please look at the stacktrace; " + message);

					}
				}

				else if ((typeof object === type)) {
					if (type === "object" && !$.isPlainObject(object)) {
						throw new Error("Validation problem: Your object is an Array but not a Plain Object; " + message);
					}

					return true;
				}

				else {
					plugin_Debug.functions.fatal();
					throw new Error("Validation problem: " + typeof object + " != " + type + ". Please look at the stacktrace; " + message);
				}
			} else {
				if (typeof object === "number" || typeof object === "boolean" || typeof object === "string") {
					return true;
				}

				else if (!object) {
					plugin_Debug.functions.fatal();
					throw new Error("Validation problem. Please look at the stacktrace; " + message);
				}
			}
		},

		alert : function(text, level) {
			console.warn("Dep. " + text);
		},

		/**
		 * Handles the debug output. Depending of the configuration the function
		 * is printing to console and/or to a log object.
		 * 
		 * @memberof plugin_Debug.functions
		 * @function log
		 * @param {String}
		 *            output - The debug output.
		 * @param {String} -
		 *            The debug level.
		 */
		log : function(output, level, trace) {
			var now = new Date();
			var dateString = /*
								 * now.getUTCFullYear().toString() + "." +
								 * (now.getUTCMonth() + 1).pad() + "." +
								 * now.getUTCDate().pad() + " " +
								 */now.getUTCHours().pad() + ":" + now.getUTCMinutes().pad() + ":" + now.getUTCSeconds().pad() + "." + now.getUTCMilliseconds().pad(3);

			if (plugin_Debug.config.debugDevice) {

				// log to object
				if (plugin_Debug.config.logLevel.indexOf(level) > -1) {
					plugin_Debug.logObject.push(output);
				}

				// log to console
				if (plugin_Debug.config.consoleLevel.indexOf(level) > -1) {
					console.log((level + ": " + "      ").slice(0, 7) + dateString + ": " + output);
					if (trace) {
						// print stack trace
						try {
							console.error("Trace:");
						}

						catch (e) {
							;
						}
					}
				}

				// log to webservice
			}
		},

		showLog : function() {
			console.warn("Deprecated function!!");
			alert(JSON.stringify(plugin_Debug.logObject));
		},

		/**
		 * List functions.
		 * 
		 * @memberof plugin_Debug.functions
		 * @namespace plugin_Debug.functions.ls
		 */
		ls : {
			cleanupWsd : function() {
				$.each(plugin_RestClient.config.wsdFiles, function(index, wsdUrl) {
					globalLoader.AsyncJsonLoader(wsdUrl, 3).done(function(wsd) {
						var newWsdFileContent, sortMembers;

						// function
						sortMembers = function(obj) {
							return Object.keys(obj).sort(function(a, b) {
								return a[0].hashCode() - b[0].hashCode();
							}).reduce(function(result, key) {
								result[key] = obj[key];
								return result;
							}, {});
						};

						newWsdFileContent = {}
						// alert(JSON.stringify(wsd) + "\n" + typeof wsd.headers
						// + wsd.headers)

						$.each(wsd, function(wsdName, wsdObject) {
							if (typeof wsdObject.headers !== "object") {
								var url, parameters, headers, newWsd;

								newWsdFileContent[wsdName] = wsdObject;
								newWsdFileContent[wsdName]["parameters"] = {};
								newWsdFileContent[wsdName]["headers"] = {};

								url = wsdObject.url.split("?")[0];
								parameters = wsdObject.url.split("?")[1].split("$")[0];
								headers = wsdObject.url.split("?")[1].split("$")[1];

								if (parameters)
									$.each(parameters.split("&"), function(index, singleParameter) {
										newWsdFileContent[wsdName]["parameters"][singleParameter.split("=")[0]] = singleParameter.split("=")[1];
									});

								if (headers)
									$.each(headers.split("&"), function(index, singleParameter) {
										newWsdFileContent[wsdName]["headers"][singleParameter.split("=")[0]] = singleParameter.split("=")[1];
									});

								if (url[0] !== '/')
									url = "/" + url;
								newWsdFileContent[wsdName]["url"] = url;

								newWsdFileContent[wsdName]["info"] = newWsdFileContent[wsdName]["info"] || "Add description or info here.";
								newWsdFileContent[wsdName]["method"] = newWsdFileContent[wsdName]["method"] || "POST";
								newWsdFileContent[wsdName]["timeout"] = newWsdFileContent[wsdName]["timeout"] || 5000;
								newWsdFileContent[wsdName]["cacheable"] = newWsdFileContent[wsdName]["cacheable"] || false;
								newWsdFileContent[wsdName]["cacheInMs"] = newWsdFileContent[wsdName]["cacheInMs"] || 0;

								// sort keys
								newWsd = {
									"info" : newWsdFileContent[wsdName]["info"],
									"url" : newWsdFileContent[wsdName]["url"],
									"parameters" : newWsdFileContent[wsdName]["parameters"],
									"headers" : newWsdFileContent[wsdName]["headers"],
									"method" : newWsdFileContent[wsdName]["method"],
									"timeout" : newWsdFileContent[wsdName]["timeout"],
									"cacheable" : newWsdFileContent[wsdName]["cacheable"],
									"cacheInMs" : newWsdFileContent[wsdName]["cacheInMs"]

								}

								newWsd["parameters"] = sortMembers(newWsd["parameters"]);
								newWsd["headers"] = sortMembers(newWsd["headers"]);
								newWsdFileContent[wsdName] = newWsd;
							} else {
								newWsdFileContent[wsdName] = wsdObject;
							}
						});

						$.each(newWsdFileContent, function(wsdName, wsdObject) {
							wsdObject["server"] = "";
							wsdObject["dataType"] = "";
							wsdObject["contentType"] = "";
							wsdObject = sortMembers(wsdObject);
						});

						newWsdFileContent = sortMembers(newWsdFileContent);
						console.log(wsdUrl);
						console.log(JSON.stringify(newWsdFileContent));
					});
				});
			},
			/**
			 * Lists all webservice definitions (wsd).
			 * 
			 * @memberof plugin_Debug.functions.ls
			 * @function wsd
			 */
			wsd : function(snipplet) {
				app.debug.trace("plugin_Debug.functions.ls.wsd(" + app.debug.arguments(arguments) + ")");
				$.each(plugin_RestClient.config.webservices, function(wsName, singleWsd) {
					var path, query;

					if (typeof snipplet === "string" && wsName.contains(snipplet)) {
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
									console.log("\t\t" + parameter.replace("=", " : "));
								});
							console.log(" ");
						}

						else {
							console.error("Webservice has no url property.");
						}
					}
				});

			}
		},

		functionTree : function(startObject, startPrefix) {

			// console.log(startPrefix);
			if (startObject)
				$.each(startObject, function(currentObjectKey, currentObject) {

					if (typeof currentObject === "function") {
						console.log(startPrefix + "." + currentObjectKey + "()");
					}

					else if (typeof currentObject === "object") {
						app.debug.functionTree(currentObject, startPrefix + "." + currentObjectKey)
					}

					else {
						// console.log(startPrefix + "." + currentObjectKey +
						// "=" + currentObject)
					}
				});
		},

		/**
		 * Feedback functions.
		 * 
		 * @memberof plugin_Debug.functions
		 * @namespace plugin_Debug.functions.feedback
		 */
		feedback : {

			/**
			 * Collect untranslated language IDs
			 * 
			 * @memberof plugin_Debug.functions.feedback
			 * @function language
			 * @param {Object
			 *            <String, String> - Untranslated
			 */

			/**
			 * Collect untranslated language IDs. And prints the untranslated
			 * IDs to console with debug level: WARN.
			 * 
			 * @memberof plugin_Debug.functions.feedback
			 * @function language
			 * @param {Object
			 *            <String, Object> - Untranslated
			 */
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
				return JSON.stringify($.extend(true, plugin_Debug.feedback.image, plugin_ImageProvider.config.images));
			},
			wsdGetJson : function() {
				app.debug.trace("plugin_Debug.functions.feedback.wsdGetJson(" + app.debug.arguments(arguments) + ")");
				return JSON.stringify(plugin_RestClient.config.webservices);
			},
			wsdGetCalls : function() {
				$.each(plugin_RestClient.config.webservices, function(serviceName, wsd) {
					console.log((wsd.calls || 0) + " - " + serviceName + " - " + wsd.url);
				});
			}
		}
	},

};