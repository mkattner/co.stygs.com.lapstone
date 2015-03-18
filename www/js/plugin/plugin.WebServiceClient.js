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
var plugin_WebServiceClient = {
	config : null,
	interval : null,
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},
	pluginsLoaded : function() {
		app.debug.alert("plugin.WebServiceClient.js ~ " + this.config.name + ".pluginsLoaded()", 11);
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.pluginsLoaded() - try first keep alive", 5);
		var dfd = $.Deferred();
		if (plugin_WebServiceClient.config.useKeepAlive) {
			app.debug
					.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.pluginsLoaded() case: plugin_WebServiceClient.config.useKeepAlive == true", 5);
			app.debug
					.alert(
							"plugin.WebServiceClient.js ~ plugin_WebServiceClient.pluginsLoaded() call: plugin_WebServiceClient.keepAliveRequest() to make a first keepAlive request",
							5);
			plugin_WebServiceClient.keepAliveRequest();
			app.debug
					.alert(
							"plugin.WebServiceClient.js ~ plugin_WebServiceClient.pluginsLoaded() initialize the keepAlive interval: plugin_WebServiceClient.interval ",
							5);
			plugin_WebServiceClient.interval = window.setInterval("plugin_WebServiceClient.keepAliveRequest()",
					plugin_WebServiceClient.config.keepAlive.keepAliveIntervalInS * 1000);
		}

		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents : function() {
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_" + this.config.name + ".definePluginEvents()", 11);
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("plugin.WebServiceClient.js ~ Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
	},

	pageSpecificEvents : function(container) {
		app.debug.alert("plugin.WebServiceClient.js ~ Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
	},

	// private methods
	getPreferedServer : function(name) {
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getPreferedServer()", 14);
		plugin_WebServiceClient.setPreferedServer(name);
		return plugin_WebServiceClient.config.preferedServer[name];
	},

	// server anhand der namen speichern
	// server pingen
	setPreferedServer : function(name) {
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.setPreferedServer() ... mehrere server implementieren", 14);

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

	getAjax : function(url, data, type, method, timeout, async, dataType) {
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax(" + url + ", " + data + ", " + type + ", " + method + ", " + timeout
				+ ", " + async + ")", 14);
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - webservice: " + url + "?" + data, 60);
		var json = null, dfd = null, headers = null, contentType, splittedData, obj, pairs, paramKey, paramValue, indexOfEquals;
		if (async) {
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: webservice is async - create deferred object", 60);
			dfd = $.Deferred();
			json = dfd.promise();
		}

		if (data.indexOf('§') != -1) {
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: webservice needs special headers", 60);
			splittedData = data.split("§");
			headers = splittedData[1];
			data = splittedData[0];
		}

		contentType = "application/x-www-form-urlencoded";
		if (dataType != undefined) {
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: dataType != undefined", 60);
			if (dataType.toLowerCase() == "query") {
				app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: contentType = application/x-www-form-urlencoded", 60);

			} else if (dataType.toLowerCase() == "json") {
				app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: contentType = application/json; charset=utf-8", 60);
				app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - create json object", 60);
				obj = {}
				pairs = data.split('&');
				for (i in pairs) {
					indexOfEquals = pairs[i].indexOf('=');
					paramKey = pairs[i].substring(0, indexOfEquals);
					paramValue = pairs[i].substring(indexOfEquals + 1);
					// var split = pairs[i].split('=');
					// alert(paramKey);
					// alert(paramValue);
					if (paramValue.substr(0, 1) == "{" || paramValue.substr(0, 1) == "[") {
						try {
							app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - map json/array object: key = " + paramKey, 20);
							app.debug
									.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - map json/array object: value = " + paramValue, 20);
							paramValue = JSON.parse(paramValue);
							obj[paramKey] = paramValue;
						} catch (e) {
							app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - Ein parameter ist nicht gesetzt: " + paramKey, 9);
						}
					} else {
						app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - set to json object: " + paramKey + "=" + paramValue,
								20);
						obj[paramKey] = paramValue;
					}

				}
				data = JSON.stringify(obj);
				contentType = "application/json; charset=utf-8";
			} else if (dataType.toLowerCase() == "form") {
				app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() case: contentType = application/x-www-form-urlencoded", 60);
				contentType = "application/x-www-form-urlencoded; charset=UTF-8";
			} else {
				alert("unknown type: " + dataType);
			}
		}

		try {
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - set up ajax request", 60);
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - parameter: url = " + url, 60);
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - parameter: data = " + data, 60);
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - parameter: dataType = " + dataType, 60);
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - parameter: contentType = " + contentType, 60);
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - parameter: async = " + async, 60);
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - parameter: method = " + method, 60);
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - parameter: timeout = " + timeout, 60);
			$.ajax({
				url : url,
				data : data,// ?key=value
				dataType : type, // json
				contentType : contentType,
				async : async, // false
				method : method, // post
				timeout : timeout, // 5000
				beforeSend : function(jqXHR, settings) {
					app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() beforeSend: set http headers", 60);
					if (plugin_WebServiceClient.config.useHeaderToken) {
						app.debug.alert(
								"plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() case: plugin_WebServiceClient.config.useHeaderToken =≠ true",
								60);
						app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() paramerter: "
								+ plugin_WebServiceClient.config.headerToken.key + " = "
								+ app.store.localStorage.get(plugin_WebServiceClient.config.headerToken.value), 60);

						jqXHR.setRequestHeader(plugin_WebServiceClient.config.headerToken.key, app.store.localStorage
								.get(plugin_WebServiceClient.config.headerToken.value));
					}
					if (headers != null) {
						app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: headers != null", 60);
						app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - set additional headers", 60);
						var pairs = headers.split('&'), split;
						for (i in pairs) {
							split = pairs[i].split('=');
							app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - setRequestHeader(" + split[0] + ", " + split[1]
									+ ")", 60);
							jqXHR.setRequestHeader(split[0], split[1]);
						}
					}
				},

				success : function(data, textStatus, jqXHR) {
					app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() - Webservice done: " + JSON.stringify(data), 5);
					json = data;

					app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - start exception handling", 60);
					if (plugins.config.WebServiceError === true) {
						app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: wse plugin is active", 60);

						if ((exeptionConfig = app.wse.getExceptionConfig(data)) === false) {
							if (dfd != undefined && dfd != null) {
								app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: no exception: " + JSON.stringify(json),
										60);
								dfd.resolve(json);
							}

						} else {
							if (dfd != undefined && dfd != null) {
								app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: exception found: "
										+ JSON.stringify(exeptionConfig), 60);
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
					app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - error: " + errorThrown, 50);
					app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - error: " + JSON.stringify(jqXHR), 50);
					app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - error: " + textStatus, 50);
					json = null;
					if (dfd != undefined && dfd != null) {
						app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: reject deferred object", 60);

						if (plugins.config.WebServiceError === true) {
							app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - case: wse plugin is active", 60);
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
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - catch block: " + JSON.stringify(err), 50);
			json = null;
		}
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.getAjax() - Webservice returns: " + JSON.stringify(json), 60);
		return json;
	},

	keepAliveStartTime : 0.0,

	keepAliveSuccess : function(data, textStatus, jqXHR) {
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.keepAliveSuccess()", 14);
		var wsDuration = Date.now() - plugin_WebServiceClient.keepAliveStartTime;
		if (wsDuration >= plugin_WebServiceClient.config.keepAlive.maximumResponseTime) {
			app.info.set("plugin_WebServiceClient.config.keepAlive.lastDuration", wsDuration);
			app.info.set("plugin_WebServiceClient.config.keepAlive.isAlive", false);
			app.info.set("plugin_WebServiceClient.config.keepAlive.error.code", 2);
			app.info.set("plugin_WebServiceClient.config.keepAlive.error.text", "Timeout error");
		} else {
			app.info.set("plugin_WebServiceClient.config.keepAlive.lastDuration", wsDuration);
			app.info.set("plugin_WebServiceClient.config.keepAlive.isAlive", true);
			app.info.set("plugin_WebServiceClient.config.keepAlive.error.code", 0);
			app.info.set("plugin_WebServiceClient.config.keepAlive.error.text", "No error");
		}
		app.debug.alert(
				"plugin.WebServiceClient.js ~ plugin_WebServiceClient.keepAliveSuccess() value: plugin_WebServiceClient.config.keepAlive.lastDuration = "
						+ app.store.localStorage.get("config.plugin_WebServiceClient.config.keepAlive.lastDuration"), 50);
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.keepAliveSuccess() value: plugin_WebServiceClient.config.keepAlive.isAlive = "
				+ app.store.localStorage.get("config.plugin_WebServiceClient.config.keepAlive.isAlive"), 50);
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.keepAliveSuccess() value: plugin_WebServiceClient.config.keepAlive.error.code = "
				+ app.store.localStorage.get("config.plugin_WebServiceClient.config.keepAlive.error.code"), 50);
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.keepAliveSuccess() value: plugin_WebServiceClient.config.keepAlive.error.text = "
				+ app.store.localStorage.get("config.plugin_WebServiceClient.config.keepAlive.error.text"), 50);
		if (!plugin_WebServiceClient.config.keepAlive.isAlive) {
			app.debug.alert("KeepAlive request failed.\nReason: " + plugin_WebServiceClient.config.keepAlive.error.text + "\nTime: " + wsDuration, 60);
			$("[data-role=page]").trigger("connectionisdead", wsDuration);
		} else if (plugin_WebServiceClient.config.keepAlive.isAlive) {
			$("[data-role=page]").trigger("connectionisalive", wsDuration);
		}
	},

	keepAliveError : function(jqXHR, textStatus, errorThrown) {
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.keepAliveError()", 14);
		var wsDuration = Date.now() - plugin_WebServiceClient.keepAliveStartTime;
		app.info.set("plugin_WebServiceClient.config.keepAlive.lastDuration", wsDuration);
		app.info.set("plugin_WebServiceClient.config.keepAlive.isAlive", false);
		app.info.set("plugin_WebServiceClient.config.keepAlive.error.code", 1);
		app.info.set("plugin_WebServiceClient.config.keepAlive.error.text", "Webservice Error: ");
		app.debug.alert("KeepAlive request failed.\nReason: " + plugin_WebServiceClient.config.keepAlive.error.text + "\nTime: " + wsDuration + "\n\n"
				+ JSON.stringify(errorThrown, null, 4), 60);
		$("[data-role=page]").trigger("connectionisdead", wsDuration);
	},

	keepAliveAjax : function(url, data, type, method, timeout) {
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.keepAliveAjax(" + url + ", " + data + ", " + type + ", " + method + ", " + timeout
				+ ")", 14);
		try {
			$.ajax({
				cache : false,
				url : url,
				data : data,// ?key=value
				dataType : type, // json
				async : true,
				method : method, // post
				timeout : timeout, // 5000
				success : plugin_WebServiceClient.keepAliveSuccess,
				error : plugin_WebServiceClient.keepAliveError
			});
		} catch (err) {
			alert("Fatal exception!\n\n" + JSON.stringify(err, null, 4), 50);
			app.debug.log(JSON.stringify(err, null, 4));
		}
	},

	/*
	 * 
	 * 0 OK; 1 Webservice failed; 2 Timeout Error
	 */
	keepAliveRequest : function() {
		app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.keepAliveRequest()", 14);

		var path, data, method, timeout, server, url, wsDuration;

		path = plugin_WebServiceClient.config.keepAlive.keepAlivePath;
		data = "";
		method = plugin_WebServiceClient.config.keepAlive.method;
		timeout = plugin_WebServiceClient.config.keepAlive.timeout;
		server = plugin_WebServiceClient.getPreferedServer(plugin_WebServiceClient.config.keepAlive.keepAliveServer);
		url = server.scheme + server.scheme_specific_part + server.host + ":" + server.port + server.path + path;
		wsDuration = 0;

		switch (plugin_WebServiceClient.config.keepAlive.type) {
		case "json":
			plugin_WebServiceClient.keepAliveStartTime = Date.now();
			plugin_WebServiceClient.keepAliveAjax(url, data, "json", method, timeout);
			break;
		case "xml":
			alert("still not implemented");
			break;
		case "text":
			alert("still not implemented");
			break;
		case "html":
			alert("still not implemented");
			break;
		default:
			alert("keepAliveRequest: no such type: " + plugin_WebServiceClient.config.keepAlive.type);
		}
	},

	functions : {
		getXml : function(uri, data, method, timeout) {
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.functions.getXml(" + uri + ", " + data + ", " + method + ", " + type + ")",
					20);
			var xml = plugin_WebServiceClient.getAjax(uri, data, "xml");
			return xml;
		},

		getJson : function(path, data, method, timeout, async, local, server) {
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.functions.getJson(" + path + ", " + data + ", " + method + ", " + timeout
					+ ", " + async + ", " + local + ", " + server + ")", 20);
			var url = null, dataType = null, json, serverConfig;
			if (local === true) {
				app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.functions.getJson() - case: local == true", 20);
				url = path;
			} else {
				app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.functions.getJson() - case: local == false", 20);
				serverConfig = plugin_WebServiceClient.getPreferedServer(server);
				// alert(JSON.stringify(serverConfig));
				url = serverConfig.scheme + serverConfig.scheme_specific_part + serverConfig.host + ":" + serverConfig.port + serverConfig.path + path;
				dataType = plugin_WebServiceClient.config.server[server].mappings[method.toLowerCase()];
				// alert(dataType);
			}

			json = plugin_WebServiceClient.getAjax(url, data, "json", method, timeout, async, dataType);
			return json;
		},

		// ask first or second or third or fourth or fifth server for the
		// prefered server
		askForPreferedServer : function() {
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.functions.askForPreferedServer()", 20);
			var preferedServer = null;

			plugin_WebServiceClient.config.preferedServer = preferedServer;
			return success;
		},
		getServer : function(name) {
			var server = plugin_WebServiceClient.getPreferedServer(name);
			// alert(JSON.stringify(server));
			return server.scheme + server.scheme_specific_part + server.host + ":" + server.port + server.path;
		},
		setServer : function(name, url) {
			url = URI(url);
			var scheme = url.scheme(), hostname = url.hostname(), port = url.port(), path = url.path();

			if (scheme === "") {
				scheme = plugin_WebServiceClient.config.server[name].template.scheme;
			}

			if (hostname === "") {
				;
			}

			if (port === "") {
				port = plugin_WebServiceClient.config.server[name].template.port;
			}

			if (path === "") {
				path = plugin_WebServiceClient.config.server[name].template.path;
			}

			app.info.set("plugin_WebServiceClient.config.server." + name + ".first.scheme", scheme);
			app.info.set("plugin_WebServiceClient.config.server." + name + ".first.host", hostname);
			app.info.set("plugin_WebServiceClient.config.server." + name + ".first.port", port);
			app.info.set("plugin_WebServiceClient.config.server." + name + ".first.path", path);

			return plugin_WebServiceClient.functions.getServer(name);
		},
		keepAliveRequest : function() {
			app.debug.alert("plugin.WebServiceClient.js ~ plugin_WebServiceClient.functions.keepAliveRequest()", 20);
		},
		ping : function(serverName) {
			var path, data, method, timeout, server, url, success = null;

			path = plugin_WebServiceClient.config.server[serverName].pingPath;
			data = "";
			method = "GET";
			timeout = 2000;
			server = plugin_WebServiceClient.getPreferedServer(serverName);
			url = server.scheme + server.scheme_specific_part + server.host + ":" + server.port + server.path + path;
			// alert(url);
			try {
				$.ajax({
					cache : false,
					url : url,
					data : data,
					async : false,
					method : method,
					timeout : timeout,
					success : function() {
						success = true;
					},
					error : function() {
						success = false;
					}
				});
			} catch (err) {
				success = false;
			}
			return success;
		}
	}
};