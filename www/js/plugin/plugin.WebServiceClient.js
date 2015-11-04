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

	getAjax : function(url, data, parameter, type, method, timeout, async, dataType) {
		app.debug.trace("plugin_WebServiceClient.getAjax(" + url + ", " + data + ", " + type + ", " + method + ", " + timeout + ", " + async + ")");
		app.debug.debug("plugin_WebServiceClient.getAjax() - webservice: " + url + "?" + data);

		var json = null, dfd = null, headers = null, contentType, splittedData, obj, pairs, paramKey, paramValue, indexOfEquals, encodedValue, exeptionConfig;

		if (async) {
			app.debug.debug("plugin_WebServiceClient.getAjax() - case: webservice is async - create deferred object");
			dfd = $.Deferred();
			json = dfd.promise();
		}

		if (data.indexOf('§') != -1) {
			app.debug.debug("plugin_WebServiceClient.getAjax() - case: webservice needs special headers");
			splittedData = data.split("§");
			headers = splittedData[1];
			data = splittedData[0];
		}

		contentType = "application/x-www-form-urlencoded";
		if (dataType != undefined) {
			app.debug.debug("plugin_WebServiceClient.getAjax() - case: dataType != undefined");

			if (dataType.toLowerCase() == "query") {
				app.debug.debug("plugin_WebServiceClient.getAjax() - case: contentType = text/plain");
				$.each(parameter, function(key, value) {
					if (typeof value == "object") {
						app.debug.debug("plugin_WebServiceClient.getAjax() - case: value == object");

						if (value instanceof Array) {
							app.debug.debug("plugin_WebServiceClient.getAjax() - case: value == array");
							encodedValue = "";
							for (v in value) {
								encodedValue += "&" + key + "=" + encodeURIComponent(value[v]);
								app.debug.debug("plugin_WebServiceClient.getAjax() - array value: " + encodedValue);
							}

							encodedValue = encodedValue.substring(encodedValue.indexOf('=') + 1);
							data = data.replace('{' + key + '}', encodedValue);
							app.debug.debug("pugin.RestClient.js ~ plugin_WebServiceClient.getAjax() - set in data: " + key + " = " + encodedValue);
						}

						else {
							app.debug.debug("plugin_WebServiceClient.getAjax() - case: value == undefined object");

							value = JSON.stringify(value);
							data = data.replace('{' + key + '}', encodeURIComponent(value));
							app.debug.debug("pugin.RestClient.js ~ plugin_WebServiceClient.getAjax() - set in data: " + key + " = " + encodeURIComponent(value));

						}
					}

					else {
						app.debug.debug("plugin_WebServiceClient.getAjax() - case: value != array");

						data = data.replace('{' + key + '}', encodeURIComponent(value));
						app.debug.debug("pugin.RestClient.js ~ plugin_WebServiceClient.getAjax() - set in data: " + key + " = " + encodeURIComponent(value));

					}

				});

				url += "?" + data;
				data = '';
				contentType = "text/plain";

			} // end if

			else if (dataType.toLowerCase() == "json") {
				app.debug.debug("plugin_WebServiceClient.getAjax() - case: contentType = application/json; charset=utf-8");
				app.debug.debug("plugin_WebServiceClient.getAjax() - create json object");
				obj = {}
				pairs = data.split('&');
				for (i in pairs) {
					indexOfEquals = pairs[i].indexOf('=');
					paramKey = pairs[i].substring(0, indexOfEquals);
					paramValue = pairs[i].substring(indexOfEquals + 1);
					// var split = pairs[i].split('=');
					// alert(paramKey);
					// alert(paramValue);

					if (paramValue.indexOf('{') != -1) {
						app.debug.debug("plugin_WebServiceClient.getAjax() - parameter: " + paramKey + " = " + parameter[paramKey]);
						obj[paramKey] = parameter[paramKey];

					} else {
						app.debug.debug("plugin_WebServiceClient.getAjax() - parameter: " + paramKey + " = " + paramValue);
						obj[paramKey] = paramValue
					}

				}
				data = JSON.stringify(obj);
				contentType = "application/json; charset=utf-8";
			}

			else if (dataType.toLowerCase() == "form") {
				app.debug.debug("plugin_WebServiceClient.getAjax() case: contentType = application/x-www-form-urlencoded");

				$.each(parameter, function(key, value) {
					if (typeof value == "object") {
						value = JSON.stringify(value);
						data = data.replace('{' + key + '}', encodeURIComponent(value));
					} else {
						data = data.replace('{' + key + '}', encodeURIComponent(value));
					}
					app.debug.debug("pugin.RestClient.js ~ plugin_WebServiceClient.getAjax() - set in data: " + key + " = " + encodeURIComponent(value));
				});

				contentType = "application/x-www-form-urlencoded; charset=UTF-8";
			}

			else {
				alert("unknown type: " + dataType);
			}
		}

		try {
			app.debug.debug("plugin_WebServiceClient.getAjax() - ajax request");
			app.debug.debug("plugin_WebServiceClient.getAjax() - ajax parameter: url = " + url);
			app.debug.debug("plugin_WebServiceClient.getAjax() - ajax parameter: data = " + data);
			app.debug.debug("plugin_WebServiceClient.getAjax() - ajax parameter: dataType = " + dataType);
			app.debug.debug("plugin_WebServiceClient.getAjax() - ajax parameter: contentType = " + contentType);
			app.debug.debug("plugin_WebServiceClient.getAjax() - ajax parameter: async = " + async);
			app.debug.debug("plugin_WebServiceClient.getAjax() - ajax parameter: method = " + method);
			app.debug.debug("plugin_WebServiceClient.getAjax() - ajax parameter: timeout = " + timeout);
			$.ajax({
				url : url,
				data : data,// ?key=value
				dataType : type, // json
				contentType : contentType,
				async : async, // false
				method : method, // post
				timeout : timeout, // 5000
				beforeSend : function(jqXHR, settings) {
					app.debug.debug("plugin_WebServiceClient.getAjax() beforeSend: set http headers");
					if (plugin_WebServiceClient.config.useHeaderToken) {
						app.debug.debug("plugin_WebServiceClient.getAjax() case: plugin_WebServiceClient.config.useHeaderToken =≠ true");
						app.debug.debug("plugin_WebServiceClient.getAjax() paramerter: " + plugin_WebServiceClient.config.headerToken.key + " = " + app.store.localStorage.get(plugin_WebServiceClient.config.headerToken.value));

						jqXHR.setRequestHeader(plugin_WebServiceClient.config.headerToken.key, app.store.localStorage.get(plugin_WebServiceClient.config.headerToken.value));
					}

					if (headers != null) {
						app.debug.debug("plugin_WebServiceClient.getAjax() - case: headers != null");
						app.debug.debug("plugin_WebServiceClient.getAjax() - set additional headers");
						var pairs = headers.split('&'), split;
						for (i in pairs) {
							split = pairs[i].split('=');
							paramKey = split[0];
							paramValue = split[1];

							if (paramValue.indexOf('{') != -1) {
								paramValue = parameter[paramKey];
							}

							app.debug.debug("plugin_WebServiceClient.getAjax() - setRequestHeader(" + paramKey + ", " + paramValue + ")");
							jqXHR.setRequestHeader(split[0], split[1]);
						}
					}
				},

				success : function(data, textStatus, jqXHR) {
					app.debug.debug("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() - Webservice done: " + JSON.stringify(data));
					json = data;

					app.debug.debug("plugin_WebServiceClient.getAjax() - start exception handling");
					if (plugins.config.WebServiceError === true) {
						app.debug.debug("plugin_WebServiceClient.getAjax() - case: wse plugin is active");

						if ((exeptionConfig = app.wse.getExceptionConfig(data)) === false) {
							if (dfd != undefined && dfd != null) {
								app.debug.debug("plugin_WebServiceClient.getAjax() - case: no exception: " + JSON.stringify(json));
								dfd.resolve(json);
							}

						}

						else {
							if (dfd != undefined && dfd != null) {
								app.debug.debug("plugin_WebServiceClient.getAjax() - case: exception found: " + JSON.stringify(exeptionConfig));
								dfd.reject(exeptionConfig);
							}

						}

					} else {
						if (dfd != undefined && dfd != null) {
							console.warn("Webservice Success!: Please use the plugin.WebServiceError (wse) to compute your errors and exceptions");
							dfd.resolve(json);
						}
					}
				},

				error : function(jqXHR, textStatus, errorThrown) {
					app.debug.debug("plugin_WebServiceClient.getAjax() - error: " + errorThrown);
					app.debug.debug("plugin_WebServiceClient.getAjax() - error: " + JSON.stringify(jqXHR));
					app.debug.debug("plugin_WebServiceClient.getAjax() - error: " + textStatus);
					json = null;
					if (dfd != undefined && dfd != null) {
						app.debug.debug("plugin_WebServiceClient.getAjax() - case: reject deferred object");

						if (plugins.config.WebServiceError === true) {
							app.debug.debug("plugin_WebServiceClient.getAjax() - case: wse plugin is active");
							dfd.reject(app.wse.getExceptionConfig(jqXHR));
						} else {
							console.warn("Webservice Error!: Please use the plugin.WebServiceError (wse) to compute your errors and exceptions");
							dfd.reject({
								"call" : {
									"url" : url,
									"data" : data,
									"type" : type,
									"async" : async,
									"mehtod" : method,
									"timeout" : timeout
								},
								"jqXHR" : JSON.parse(JSON.stringify(jqXHR))
							});
						}
					}
				}
			});
		} catch (err) {
			app.debug.debug("plugin_WebServiceClient.getAjax() - catch block: " + JSON.stringify(err));
			json = null;
		}
		app.debug.debug("plugin_WebServiceClient.getAjax() - Webservice returns: " + JSON.stringify(json));
		return json;
	},

	functions : {

		getXml : function(uri, data, method, timeout) {
			app.debug.trace("plugin_WebServiceClient.functions.getXml()");
			var xml = plugin_WebServiceClient.getAjax(uri, data, "xml");
			return xml;
		},

		getJson : function(path, data, parameter, method, timeout, async, local, server) {
			app.debug.trace("plugin_WebServiceClient.functions.getJson()");
			var url = null, dataType = null, json, serverConfig;
			if (local === true) {
				app.debug.debug("plugin_WebServiceClient.functions.getJson() - case: local == true");
				url = path;
			} else {
				app.debug.debug("plugin_WebServiceClient.functions.getJson() - case: local == false");
				serverConfig = plugin_WebServiceClient.getPreferedServer(server);
				// alert(JSON.stringify(serverConfig));
				url = serverConfig.scheme + serverConfig.scheme_specific_part + serverConfig.host + ":" + serverConfig.port + serverConfig.path + path;
				dataType = plugin_WebServiceClient.config.server[server].mappings[method.toLowerCase()];
				// alert(dataType);
			}

			json = plugin_WebServiceClient.getAjax(url, data, parameter, "json", method, timeout, async, dataType);
			return json;
		},

		// ask first or second or third or fourth or fifth server for the
		// prefered server
		askForPreferedServer : function() {
			app.debug.trace("plugin_WebServiceClient.functions.askForPreferedServer()");
			var preferedServer = null;

			plugin_WebServiceClient.config.preferedServer = preferedServer;
			return success;
		},

		getDefaultServerName : function() {
			app.debug.trace("plugin_WebServiceClient.functions.getDefaultServerName()");
			return plugin_WebServiceClient.config.defaultServer;
		},

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

		keepAliveRequest : function() {
			app.debug.trace("plugin_WebServiceClient.functions.keepAliveRequest()");
			console.error("Deprecated function!")
		},

		ping : function(serverName, async) {
			app.debug.trace("plugin_WebServiceClient.functions.ping()");
			var path, server, url;

			path = plugin_WebServiceClient.config.server[serverName].pingPath;
			server = plugin_WebServiceClient.getPreferedServer(serverName);
			url = server.scheme + server.scheme_specific_part + server.host + ":" + server.port + server.path + path;

			if (async) {

				return globalLoader.AsyncJsonLoader(url);
			}

			else {

				return globalLoader.JsonLoader(url);
			}
		}
	}
};