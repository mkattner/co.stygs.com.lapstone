//# sourceURL=plugin.WebServiceClient.js
/**
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted,
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

var plugin_WebServiceClient = {
	config : null,
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},
	pluginsLoaded : function() {
		app.debug.trace("" + this.config.name + ".pluginsLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents : function() {
		app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()");
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()");
	},

	pageSpecificEvents : function(container) {
		app.debug.trace("Plugin: " + this.config.name + ".pageSpecificEvents()");
	},

	// private methods
	getPreferedServer : function(name) {
		app.debug.trace("plugin_WebServiceClient.getPreferedServer()");
		plugin_WebServiceClient.setPreferedServer(name);
		return plugin_WebServiceClient.config.preferedServer[name];
	},

	// server anhand der namen speichern
	// server pingen
	setPreferedServer : function(name) {
		app.debug.trace("plugin_WebServiceClient.setPreferedServer() ... mehrere server implementieren");

		$.each(plugin_WebServiceClient.config.server, function(serverName, data) {
			if (data.active === true) {
				if (plugin_WebServiceClient.config.preferedServer == undefined)
					app.info.set("plugin_WebServiceClient.config.preferedServer", {});
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName, {});
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName + ".scheme", data.first.scheme);
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName + ".scheme_specific_part", data.first.scheme_specific_part);
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName + ".host", data.first.host);
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName + ".port", data.first.port);
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName + ".path", data.first.path);
			}
		});
	},

	getAjax : function(wsd, parameters, async) {
		// app.debug.trace("plugin_WebServiceClient.getAjax(" + url + ", " +
		// data +
		// ", " + type + ", " + method + ", " + timeout + ", " + async + ")");
		// app.debug.debug("plugin_WebServiceClient.getAjax() - webservice: " +
		// url
		// + "?" + data);

		app.debug.operation(function() {
			currentWsd = wsd;
		});

		var returnValue = null, dfd = null, jqXHR;// , headers = null,
		// contentType, splittedData,
		// obj, pairs, paramKey,
		// paramValue, indexOfEquals,
		// encodedValue, exeptionConfig;

		// the web service call is asynchronous; so return a dfd.promise()
		// object
		if (async) {
			app.debug.debug("plugin_WebServiceClient.getAjax() - case: webservice is async - create deferred object");
			dfd = $.Deferred();
			returnValue = dfd.promise();
		}

		wsd["serverObject"] = plugin_WebServiceClient.getPreferedServer(wsd.server);
		app.debug.validate(wsd.serverObject, "object")

		// replace and delete url parameters
		$.each(wsd.parameters, function(parameterName, parameterValue) {
			if (wsd.url.occurences("{" + parameterName + "}") > 0) {
				wsd.url = wsd.url.replaceAll("{" + parameterName + "}", parameterValue);
				delete wsd.parameters[parameterName];
			}
		});

		wsd.url = (wsd.serverObject.scheme + wsd.serverObject.scheme_specific_part + wsd.serverObject.host + ":" + wsd.serverObject.port + wsd.serverObject.path).pathCombine(wsd.url);

		// do something with the dataType
		if (wsd.dataType.length === 0) {
			wsd.dataType = plugin_WebServiceClient.config.server[wsd.server].mappings[wsd.method.toLowerCase()];
		}

		switch (wsd.dataType) {
		case "application/json":
			wsd.dataType = "json";
			break;
		default:
			app.debug.fatal("plugin_WebServiceClient.getAjax() - unknown dataType: " + wsd.dataType);
			return null;
			break;
		}

		// do something with the contentType
		if (wsd.contentType.length === 0) {
			wsd.contentType = "application/x-www-form-urlencoded";
		}

		switch (wsd.contentType) {
		case "text/plain":
			wsd["data"] = wsd.parameters
			break;
		case "application/json":
			wsd["data"] = JSON.stringify(wsd.parameters);
			break;
		case "multipart/form-data":
			if (wsd.parameters.formData === undefined) {
				app.debug.fatal("plugin_WebServiceClient.getAjax() - wsd.parameters.formData is undefined");
				return null;
			} else {
				wsd.contentType=false; // jQuery bug?
				wsd["data"] = wsd.parameters.formData;
			}
			break;
		default:
			wsd["data"] = $.extend(true, {}, wsd.parameters);
			break;
		}

		try {

			app.debug.operation(function() {
				plugin_WebServiceClient["wsCallHistory"] = plugin_WebServiceClient["wsCallHistory"] || [];
				plugin_WebServiceClient.wsCallHistory.push($.extend(true, {}, wsd));
			});

			jqXHR = $.ajax({
				url : wsd.url,
				data : wsd.data,// ?key=value
				processData : false,
				dataType : wsd.dataType, // json
				contentType : wsd.contentType,
				async : async, // false
				method : wsd.method, // post
				timeout : wsd.timeout, // 5000
				crossDomain : true,
				beforeSend : function(jqXHR, settings) {
					app.debug.debug("plugin_WebServiceClient.getAjax() beforeSend: set http headers");
					if (plugin_WebServiceClient.config.useHeaderToken) {
						app.debug.debug("plugin_WebServiceClient.getAjax() case: plugin_WebServiceClient.config.useHeaderToken =≠ true");
						app.debug.debug("plugin_WebServiceClient.getAjax() paramerter: " + plugin_WebServiceClient.config.headerToken.key + " = " + app.store.localStorage.get(plugin_WebServiceClient.config.headerToken.value));

						jqXHR.setRequestHeader(plugin_WebServiceClient.config.headerToken.key, app.store.localStorage.get(plugin_WebServiceClient.config.headerToken.value));
					}

					if (Object.keys(wsd.headers).length > 0) {
						// app.debug.debug("plugin_WebServiceClient.getAjax() -
						// case:
						// headers !== undefined");
						// app.debug.debug("plugin_WebServiceClient.getAjax() -
						// set
						// additional headers");
						// var pairs = headers.split('&'), split;

						$.each(wsd.headers, function(headerKey, headerValue) {
							jqXHR.setRequestHeader(headerKey, headerValue);
						});
						// for (i in pairs) {
						// split = pairs[i].split('=');
						// paramKey = split[0];
						// paramValue = split[1];
						//
						// if (paramValue.indexOf('{') != -1) {
						// paramValue = parameter[paramKey];
						// }
						//
						// app.debug.debug("plugin_WebServiceClient.getAjax() -
						// setRequestHeader(" + paramKey + ", " + paramValue +
						// ")");
						// jqXHR.setRequestHeader(paramKey, paramValue);
						// }
					}
				},

				success : function(data, textStatus, jqXHR) {
					app.debug.debug("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() - Webservice done: " + JSON.stringify(data));
					returnValue = data;

					app.debug.debug("plugin_WebServiceClient.getAjax() - start exception handling");
					if (app.plugins.functions.pluginLoaded("WebServiceError") === true) {
						app.debug.debug("plugin_WebServiceClient.getAjax() - case: wse plugin is active");

						if ((exeptionConfig = app.wse.getExceptionConfig(data)) === false) {
							if (dfd != undefined && dfd != null) {
								app.debug.debug("plugin_WebServiceClient.getAjax() - case: no exception: " + JSON.stringify(returnValue));
								dfd.resolve(returnValue);
							}

						}

						else {
							if (dfd != undefined && dfd != null) {
								app.debug.debug("plugin_WebServiceClient.getAjax() - case: exception found: " + JSON.stringify(exeptionConfig));
								dfd.reject(exeptionConfig, jqXHR);
							}

						}

					} else {
						if (dfd != undefined && dfd != null) {
							console.warn("Webservice Success!: Please use the plugin.WebServiceError (wse) to compute your errors and exceptions");
							dfd.resolve(returnValue);
						}
					}
				},

				error : function(jqXHR, textStatus, errorThrown) {
					app.debug.debug("plugin_WebServiceClient.getAjax() - error: " + errorThrown);
					app.debug.debug("plugin_WebServiceClient.getAjax() - error: " + JSON.stringify(jqXHR));
					app.debug.debug("plugin_WebServiceClient.getAjax() - error: " + textStatus);
					returnValue = null;
					if (dfd != undefined && dfd != null) {
						app.debug.debug("plugin_WebServiceClient.getAjax() - case: reject deferred object");

						if (app.plugins.functions.pluginLoaded("WebServiceError") === true) {
							app.debug.debug("plugin_WebServiceClient.getAjax() - case: wse plugin is active");
							dfd.reject(app.wse.getExceptionConfig(jqXHR), jqXHR);
						} else {
							console.warn("Webservice Error!: Please use the plugin.WebServiceError (wse) to compute your errors and exceptions");
							dfd.reject({
								"call" : wsd,
								"jqXHR" : JSON.parse(JSON.stringify(jqXHR))
							}, jqXHR);
						}
					}
				}
			});
		} catch (err) {
			app.debug.debug("plugin_WebServiceClient.getAjax() - catch block: " + JSON.stringify(err));
			returnValue = null;
		}

		if (async) {
			dfd.notify({
				"jqXHR" : jqXHR
			});
		}

		app.debug.debug("plugin_WebServiceClient.getAjax() - Webservice returns: " + JSON.stringify(returnValue));
		return returnValue;
	},

	functions : {

		// /**
		// *
		// */
		// getXml: function(uri, data, method, timeout) {
		// app.debug.trace("plugin_WebServiceClient.functions.getXml()");
		// var xml = plugin_WebServiceClient.getAjax(uri, data, "xml");
		// return xml;
		// },

		/**
		 * 
		 */
		getJson : function(wsd, parameters, async) {
			app.debug.trace("plugin_WebServiceClient.functions.getJson()");
			var returnValue;
			// if (local === true) {
			// app.debug.debug("plugin_WebServiceClient.functions.getJson() -
			// case:
			// local == true");
			// url = path;
			// } else {
			// app.debug.debug("plugin_WebServiceClient.functions.getJson() -
			// case:
			// local == false");
			// serverConfig = plugin_WebServiceClient.getPreferedServer(server);
			// alert(JSON.stringify(serverConfig));
			// url = serverConfig.scheme + serverConfig.scheme_specific_part +
			// serverConfig.host + ":" + serverConfig.port + serverConfig.path +
			// path;
			// dataType =
			// plugin_WebServiceClient.config.server[server].mappings[method.toLowerCase()];
			// alert(dataType);
			// }

			returnValue = plugin_WebServiceClient.getAjax(wsd, parameters, async);
			return returnValue;
		},

		getWebSocket : function(wsd) {
			if (!window.WebSocket) {
				return null;
			} else {
				var connection, dfd = $.Deferred();

				wsd["serverObject"] = plugin_WebServiceClient.getPreferedServer(wsd.server);

				wsd.url = (wsd.serverObject.scheme + wsd.serverObject.scheme_specific_part + wsd.serverObject.host + ":" + wsd.serverObject.port + wsd.serverObject.path).pathCombine(wsd.url);

				connection = new WebSocket(wsd.url);

				// When the connection is open, send some data to the server
				connection.onopen = function() {
					// connection.send('Ping'); // Send the message 'Ping' to
					// the server
				};

				// Log errors
				connection.onerror = function(error) {
					// console.log('WebSocket Error ' + error);
					dfd.reject(error);
				};

				// Log messages from the server
				connection.onmessage = function(e) {
					dfd.notify(JSON.parse(e.data));
				};

				dfd["sendMessage"] = function(message) {
					connection.send(message);
				}

				dfd.fail(function() {
					try {
						connection.close();
					} catch (e) {
						console.log(e);
					}

				});

				return dfd;
			}
		},

		getServerSideEvent : function(wsd) {
			// case: webservice request
			// ask for the json file
			if (!window.EventSource) {
				return null;
			} else {
				var dfd = $.Deferred();

				wsd["serverObject"] = plugin_WebServiceClient.getPreferedServer(wsd.server);

				// replace and delete url parameters
				$.each(wsd.parameters, function(parameterName, parameterValue) {
					if (wsd.url.occurences("{" + parameterName + "}") > 0) {
						wsd.url = wsd.url.replaceAll("{" + parameterName + "}", parameterValue);
						delete wsd.parameters[parameterName];
					}
				});

				wsd.url = (wsd.serverObject.scheme + wsd.serverObject.scheme_specific_part + wsd.serverObject.host + ":" + wsd.serverObject.port + wsd.serverObject.path).pathCombine(wsd.url);

				var source = new EventSource(wsd.url);

				source.addEventListener('message', function(e) {
					dfd.notify(JSON.parse(e.data));
				}, false);

				source.addEventListener('open', function(e) {
				}, false);

				source.addEventListener('error', function(e) {
					if (e.readyState == EventSource.CONNECTING) {
					}

					else if (e.readyState == EventSource.OPEN) {
						// error in open connection
					}

					else if (e.readyState == EventSource.CLOSED) {
						// Connection was closed.
					}

					dfd.reject(e);
				}, false);

				dfd.fail(function() {
					try {
						source.close();
					} catch (e) {
						console.log(e);
					}

				});

				return dfd;
			}
		},

		// ask first or second or third or fourth or fifth server for the
		// prefered server
		/**
		 * 
		 */
		askForPreferedServer : function() {
			app.debug.trace("plugin_WebServiceClient.functions.askForPreferedServer()");
			var preferedServer = null;

			plugin_WebServiceClient.config.preferedServer = preferedServer;
			return success;
		},

		/**
		 * 
		 */
		getDefaultServerName : function() {
			app.debug.trace("plugin_WebServiceClient.functions.getDefaultServerName()");
			return plugin_WebServiceClient.config.defaultServer;
		},

		/**
		 * 
		 */
		getServer : function(name, asObject) {
			app.debug.trace("plugin_WebServiceClient.functions.getServer()");

			var server = plugin_WebServiceClient.getPreferedServer(name);

			if (asObject == undefined) {
				asObject = false;
			}

			// alert(JSON.stringify(server));
			if (asObject === true) {
				app.debug.debug("plugin_WebServiceClient.functions.getServer() - case: return server as object: " + JSON.stringify(server));
				return server;
			}

			else if (asObject == false) {
				server = server.scheme + server.scheme_specific_part + server.host + ":" + server.port + server.path;
				app.debug.debug("plugin_WebServiceClient.functions.getServer() - case: return server as string");
				return server;
			}

			else {
				console.error("Error");
			}
		},

		/**
		 * 
		 */
		setServer : function(name, url, async) {
			app.debug.trace("plugin_WebServiceClient.functions.setServer()");

			url = URI(url);

			var scheme, hostname, port, path;

			scheme = url.scheme();
			hostname = url.hostname();
			port = url.port();
			path = url.path();

			if (scheme === "") {
				app.debug.debug("plugin_WebServiceClient.functions.setServer() - case: scheme is not set");
				scheme = "http";
			}

			if (hostname === "") {
				;
			}

			if (port === "") {
				app.debug.debug("plugin_WebServiceClient.functions.setServer() - case: port is not set");

				if (scheme === "http") {
					app.debug.debug("plugin_WebServiceClient.functions.setServer() - case: scheme == http - use port: 80");
					port = 80;
				}

				else if (scheme === "https") {
					app.debug.debug("plugin_WebServiceClient.functions.setServer() - case: scheme == https - use port: 443");
					port = 443;

				}
			}

			if (path === "") {
				app.debug.debug("plugin_WebServiceClient.functions.setServer() - case: path is not set");
				path = plugin_WebServiceClient.config.server[name].template.path;
			}

			app.info.set("plugin_WebServiceClient.config.server." + name + ".first.scheme", scheme);
			app.info.set("plugin_WebServiceClient.config.server." + name + ".first.scheme_specific_part", "://");
			app.info.set("plugin_WebServiceClient.config.server." + name + ".first.host", hostname);
			app.info.set("plugin_WebServiceClient.config.server." + name + ".first.port", port);
			app.info.set("plugin_WebServiceClient.config.server." + name + ".first.path", path);

			return this.ping(name, async);
		},

		/**
		 * 
		 */
		keepAliveRequest : function() {
			app.debug.trace("plugin_WebServiceClient.functions.keepAliveRequest()");
			console.error("Deprecated function!")
		},

		/**
		 * 
		 */
		ping : function(serverName, async) {
			app.debug.trace("plugin_WebServiceClient.functions.ping()");
			var path, server, url;

			path = plugin_WebServiceClient.config.server[serverName].pingPath;
			server = plugin_WebServiceClient.getPreferedServer(serverName);
			url = server.scheme + server.scheme_specific_part + server.host + ":" + server.port + server.path + path;

			if (async === true) {

				return globalLoader.AsyncJsonLoader(url);
			}

			else {

				return globalLoader.JsonLoader(url);
			}
		}
	}
};
