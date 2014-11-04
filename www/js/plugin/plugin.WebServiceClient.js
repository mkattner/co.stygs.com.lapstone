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

	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);

		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.pluginsLoaded() Try first keep alive", 5);
		if (plugin_WebServiceClient.config.useKeepAlive) {
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.pluginsLoaded() case: plugin_WebServiceClient.config.useKeepAlive = true", 5);
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.pluginsLoaded() call: plugin_WebServiceClient.keepAliveRequest() to make a first keepAlive request", 5);
			plugin_WebServiceClient.keepAliveRequest();
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.pluginsLoaded() initialize the keepAlive interval: plugin_WebServiceClient.interval ", 5);
			plugin_WebServiceClient.interval = window.setInterval("plugin_WebServiceClient.keepAliveRequest()", plugin_WebServiceClient.config.keepAlive.keepAliveIntervalInS * 1000);
		}

	},

	// called after all pages are loaded
	pagesLoaded : function() {

		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
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

	// private methods
	getPreferedServer : function(name) {
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getPreferedServer()", 14);
		plugin_WebServiceClient.setPreferedServer(name);
		return plugin_WebServiceClient.config.preferedServer[name];
	},

	// server anhand der namen speichern
	// server pingen
	setPreferedServer : function(name) {
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.setPreferedServer() ... mehrere server implementieren", 14);

		$.each(plugin_WebServiceClient.config.server, function(serverName, data) {
			if (data.active === true) {
				if (plugin_WebServiceClient.config.preferedServer == undefined)
					app.info.set("plugin_WebServiceClient.config.preferedServer", {});
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName, {});
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName + ".scheme", data.first.scheme);
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName + ".scheme_specific_part", data.first.scheme_specific_part);
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName + ".host", data.first.host);
				app.info.set("plugin_WebServiceClient.config.preferedServer." + serverName + ".port", data.first.port);
			}
		});
	},

	getAjax : function(url, data, type, method, timeout, async, dataType) {
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax(" + url + ", " + data + ", " + type + ", " + method + ", " + timeout + ", " + async + ")", 14);
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() webservice: " + url + "?" + data, 60);
		var json = null;

		var dfd = null;
		if (async) {
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() case: webservice is async - create deferred object", 60);
			dfd = $.Deferred();
			json = dfd.promise();
		}

		var headers = null;
		if (data.indexOf('§') != -1) {
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() case: webservice needs special headers", 60);
			var splittedData = data.split("§");
			headers = splittedData[1];
			data = splittedData[0];
		}

		var contentType = "application/x-www-form-urlencoded";
		if (dataType != undefined) {
			if (dataType.toLowerCase() == "query") {
				app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() case: contentType = application/x-www-form-urlencoded", 60);

			} else if (dataType.toLowerCase() == "json") {
				app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() case: contentType = application/json; charset=utf-8", 60);
				app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() Create json object", 60);
				var obj = {};
				var pairs = data.split('&');
				for (i in pairs) {
					var split = pairs[i].split('=');
					if (split[1].substr(0, 1) == "{" || split[1].substr(0, 1) == "[") {
						try {
							split[1] = JSON.parse(split[1]);
							obj[split[0]] = split[1];
						} catch (e) {
							alert("Ein parameter ist nicht gesetzt: " + split[0]);
						}
					} else {
						obj[split[0]] = split[1];
					}

				}
				data = JSON.stringify(obj);
				contentType = "application/json; charset=utf-8"
			}
		}

		try {
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() set up ajax request", 60);
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() parameter: url = " + url, 60);
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() parameter: data = " + data, 60);
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() parameter: dataType = " + dataType, 60);
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() parameter: contentType = " + contentType, 60);
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() parameter: async = " + async, 60);
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() parameter: method = " + method, 60);
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() parameter: timeout = " + timeout, 60);
			$.ajax({
				url : url,
				data : data,// ?key=value
				dataType : type, // json
				contentType : contentType,
				async : async, // false
				method : method, // post
				timeout : timeout, // 5000
				beforeSend : function(jqXHR, settings) {
					app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() beforeSend: set http headers", 60);
					if (plugin_WebServiceClient.config.useHeaderToken) {
						app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() case: plugin_WebServiceClient.config.useHeaderToken = true", 60);
						app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() paramerter: " + plugin_WebServiceClient.config.headerToken.key + " = " + app.store.localStorage.get(plugin_WebServiceClient.config.headerToken.value), 60);

						jqXHR.setRequestHeader(plugin_WebServiceClient.config.headerToken.key, app.store.localStorage.get(plugin_WebServiceClient.config.headerToken.value));
					}
					if (headers != null) {
						app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() case: headers != null", 60);
						app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() set additional headers", 60);
						var obj = {};
						var pairs = headers.split('&');
						for (i in pairs) {
							var split = pairs[i].split('=');
							app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() setRequestHeader(" + split[0] + ", " + split[1] + ")", 60);
							jqXHR.setRequestHeader(split[0], split[1]);
						}
					}
				},

				success : function(data, textStatus, jqXHR) {
					app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() Webservice done: " + JSON.stringify(data), 5);
					json = data;
					if (dfd != undefined && dfd != null) {
						dfd.resolve(json);
					}
				},

				error : function(jqXHR, textStatus, errorThrown) {
					app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() Error: " + errorThrown, 50);
					app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() Error: " + JSON.stringify(jqXHR), 50);
					app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() Error: " + textStatus, 50);
					json = false;
					if (dfd != undefined && dfd != null) {
						app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() case: reject deferred object", 60);
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
			});
		} catch (err) {
			app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() catch block: " + JSON.stringify(err), 50);
			app.debug.log(JSON.stringify(err, null, 4));
			json = false;
		}
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() Webservice returns: " + JSON.stringify(json), 60);
		return json;
	},

	keepAliveStartTime : 0.0,

	keepAliveSuccess : function(data, textStatus, jqXHR) {
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.keepAliveSuccess()", 14);
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
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.keepAliveSuccess() value: plugin_WebServiceClient.config.keepAlive.lastDuration = " + app.store.localStorage.get("config.plugin_WebServiceClient.config.keepAlive.lastDuration"), 50);
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.keepAliveSuccess() value: plugin_WebServiceClient.config.keepAlive.isAlive = " + app.store.localStorage.get("config.plugin_WebServiceClient.config.keepAlive.isAlive"), 50);
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.keepAliveSuccess() value: plugin_WebServiceClient.config.keepAlive.error.code = " + app.store.localStorage.get("config.plugin_WebServiceClient.config.keepAlive.error.code"), 50);
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.keepAliveSuccess() value: plugin_WebServiceClient.config.keepAlive.error.text = " + app.store.localStorage.get("config.plugin_WebServiceClient.config.keepAlive.error.text"), 50);
		if (!plugin_WebServiceClient.config.keepAlive.isAlive) {
			app.debug.alert("KeepAlive request failed.\nReason: " + plugin_WebServiceClient.config.keepAlive.error.text + "\nTime: " + wsDuration, 60);
		}

	},

	keepAliveError : function(jqXHR, textStatus, errorThrown) {
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.keepAliveError()", 14);
		var wsDuration = Date.now() - plugin_WebServiceClient.keepAliveStartTime;
		app.info.set("plugin_WebServiceClient.config.keepAlive.lastDuration", wsDuration);
		app.info.set("plugin_WebServiceClient.config.keepAlive.isAlive", false);
		app.info.set("plugin_WebServiceClient.config.keepAlive.error.code", 1);
		app.info.set("plugin_WebServiceClient.config.keepAlive.error.text", "Webservice Error: ");
		app.debug.alert("KeepAlive request failed.\nReason: " + plugin_WebServiceClient.config.keepAlive.error.text + "\nTime: " + wsDuration + "\n\n" + JSON.stringify(errorThrown, null, 4), 60);
	},

	keepAliveAjax : function(url, data, type, method, timeout) {
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.keepAliveAjax(" + url + ", " + data + ", " + type + ", " + method + ", " + timeout + ")", 14);
		try {
			$.ajax({
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
		app.debug.alert("plugin.WebServiceClient.js plugin_WebServiceClient.keepAliveRequest()", 14);
		var path = plugin_WebServiceClient.config.keepAlive.keepAlivePath;
		var data = "";
		var method = plugin_WebServiceClient.config.keepAlive.method;
		var timeout = plugin_WebServiceClient.config.keepAlive.timeout;
		var server = plugin_WebServiceClient.getPreferedServer(plugin_WebServiceClient.config.keepAlive.keepAliveServer);
		var url = server.scheme + server.scheme_specific_part + server.host + ":" + server.port + path;
		var wsDuration = 0;
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
			app.debug.alert("plugin_WebServiceClient.functions.getXml(" + uri + ", " + data + ", " + method + ", " + type + ")", 20);
			var xml = plugin_WebServiceClient.getAjax(uri, data, "xml");
			return xml;
		},

		getJson : function(path, data, method, timeout, async, local, server) {
			app.debug.alert("plugin_WebServiceClient.functions.getJson(" + path + ", " + data + ", " + method + ", " + timeout + ", " + async + ", " + local + ")", 20);
			var url = null;
			var dataType = null;
			if (local === true)
				url = path;
			else {
				// alert(server);
				var serverConfig = plugin_WebServiceClient.getPreferedServer(server);
				// alert(JSON.stringify(serverConfig));
				url = serverConfig.scheme + serverConfig.scheme_specific_part + serverConfig.host + ":" + serverConfig.port + path;
				var dataType = plugin_WebServiceClient.config.server[server].mappings[method.toLowerCase()];
				// alert(dataType);
			}

			var json = plugin_WebServiceClient.getAjax(url, data, "json", method, timeout, async, dataType);
			return json;
		},

		// ask first or second or third or fourth or fifth server for the
		// prefered server
		askForPreferedServer : function() {
			var preferedServer = null;

			plugin_WebServiceClient.config.preferedServer = preferedServer;
			return success;
		},
		keepAliveRequest : function() {

		}
	}
};