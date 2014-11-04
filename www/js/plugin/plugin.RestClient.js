/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
 */
var plugin_RestClient = {
	config : null,
	constructor : function() {
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		// load the webservice definitions
		$.each(plugin_RestClient.config.wsdFiles, function(path, loadFile) {
			if (loadFile) {
				plugin_RestClient.loadDefinitionFile(path);
			}
		});
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
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

	loadDefinitionFile : function(path) {
		var json = JsonLoader(path);
		// alert(JSON.stringify(json));
		$.each(json, function(name, values) {
			plugin_RestClient.config.webservices[name] = values;
		});
	},
	getSingleJson : function(service, parameter, async) {
		app.debug.alert("plugin_RestClient: Get a single json object; async = false", 60);

		// get the server
		if (service.indexOf('.') != -1) {
			var splittedService = service.split(".");
			var server = splittedService[0];
			service = splittedService[1];
		} else {
			var server = plugin_WebServiceClient.config.defaultServer;
		}

		// get the path wich is defined in wsd file
		var path = plugin_RestClient.config.webservices[service].url;
		// set async to false (in each case)
		async = false;
		// replace the parameters in path string
		if (parameter != undefined) {
			$.each(parameter, function(key, value) {
				path = path.replace('{' + key + '}', value);
			});
		}
		var data = path.split('?')[1];
		// if webservice has no parameter
		if (data == undefined)
			data = "";
		// URL of the webservice provider including the path to
		// webservice
		var pathX = path.split('?')[0];
		// ask for the json file
		var json = app.wsc.getJson(pathX, data, plugin_RestClient.config.webservices[service].method, plugin_RestClient.config.webservices[service].timeout, async, plugin_RestClient.config.webservices[service].local, server);
		// add language wildcards wich could be defined in webservice
		// response
		if (plugin_MultilanguageIso639_3 != undefined) {
			if (json.language != undefined) {
				$.each(json.language, function(key, value) {
					app.lang.addParameter(key, value);
				});
			}
		}
		return json;
	},
	getSingleJsonAsync : function(service, parameter, async) {
		app.debug.alert("plugin_RestClient: Get a single json object; async = true;", 60);
		// the deferred object for the caller
		var dfd = $.Deferred();

		// get the server
		if (service.indexOf('.') != -1) {
			var splittedService = service.split(".");
			var server = splittedService[0];
			service = splittedService[1];
		} else {
			var server = plugin_WebServiceClient.config.defaultServer;
		}

		// get the path wich is defined in wsd file
		var path = plugin_RestClient.config.webservices[service].url;
		// replace the parameters in path string
		if (parameter != undefined) {
			$.each(parameter, function(key, value) {
				if (typeof value == "object") {
					value = JSON.stringify(value);
				}
				path = path.replace('{' + key + '}', value);
			});
		}
		var data = path.split('?')[1];
		// if webservice has no parameter
		if (data == undefined)
			data = "";
		// URL of the webservice provider including the path to
		// webservice
		var pathX = path.split('?')[0];

		// ask for the json file
		var promise = app.wsc.getJson(pathX, data, plugin_RestClient.config.webservices[service].method, plugin_RestClient.config.webservices[service].timeout, async, plugin_RestClient.config.webservices[service].local, server);
		// add language wildcards wich could be defined in webservice
		// response

		promise.done(function(json) {
			// alert("async webservice call done", 60);
			if (plugin_MultilanguageIso639_3 != undefined) {
				if (json.language != undefined) {
					$.each(json.language, function(key, value) {
						app.lang.addParameter(key, value);
					});
				}
			}
			app.debug.alert("pugin.RestClient.js Webservice call done: " + JSON.stringify(json), 60);
			dfd.resolve(json);
		});

		promise.fail(function(jqXHR) {
			app.debug.alert("pugin.RestClient.js Webservice call failed: " + JSON.stringify(jqXHR), 60);
			dfd.reject(jqXHR);
		});

		return dfd.promise();
	},
	getMultipleJson : function(service, parameter, async) {
		app.debug.alert("plugin_RestClient: Get multible json objects; async = false", 60);
		var jsonObject = {};
		$.each(service, function(key, call) {
			var serviceName = call[0], parameter = call[1];

			// get the server
			if (serviceName.indexOf('.') != -1) {
				var splittedService = serviceName.split(".");
				var server = splittedService[0];
				serviceName = splittedService[1];
			} else {
				var server = plugin_WebServiceClient.config.defaultServer;
			}

			// get the path wich is defined in wsd file
			var path = plugin_RestClient.config.webservices[serviceName].url;
			// set async to false (in each case)
			async = false;
			// replace the parameters in path string
			if (parameter != undefined) {
				$.each(parameter, function(key, value) {
					path = path.replace('{' + key + '}', value);
				});
			}
			var data = path.split('?')[1];
			// if webservice has no parameter
			if (data == undefined)
				data = "";
			// URL of the webservice provider including the path to
			// webservice
			var pathX = path.split('?')[0];
			// ask for the json file
			var json = app.wsc.getJson(pathX, data, plugin_RestClient.config.webservices[serviceName].method, plugin_RestClient.config.webservices[serviceName].timeout, async, plugin_RestClient.config.webservices[serviceName].local, server);
			// add language wildcards wich could be defined in
			// webservice response
			if (plugin_MultilanguageIso639_3 != undefined) {
				if (json.language != undefined) {
					$.each(json.language, function(key, value) {
						app.lang.addParameter(key, value);
					});
				}
			}
			jsonObject[serviceName] = json;
		});
		return jsonObject;
	},
	getMultipleJsonAsync : function(service, parameter, async) {
		app.debug.alert("plugin_RestClient: Get multible json objects; async = true", 60);
		// the deferred object for the caller
		var dfd = $.Deferred();
		var promiseArray = [], webserviceNamesArray = [];
		var async = true;
		$.each(service, function(key, call) {
			var serviceName = call[0], parameter = call[1];

			// get the server
			if (serviceName.indexOf('.') != -1) {
				var splittedService = serviceName.split(".");
				var server = splittedService[0];
				serviceName = splittedService[1];
			} else {
				var server = plugin_WebServiceClient.config.defaultServer;
			}

			// get the path wich is defined in wsd file
			var path = plugin_RestClient.config.webservices[serviceName].url;
			// replace the parameters in path string
			if (parameter != undefined) {
				$.each(parameter, function(key, value) {
					path = path.replace('{' + key + '}', value);
				});
			}
			var data = path.split('?')[1];
			// if webservice has no parameter
			if (data == undefined)
				data = "";
			// URL of the webservice provider including the path to
			// webservice
			var pathX = path.split('?')[0];
			// ask for the deferred promise object
			var promise = app.wsc.getJson(pathX, data, plugin_RestClient.config.webservices[serviceName].method, plugin_RestClient.config.webservices[serviceName].timeout, async, plugin_RestClient.config.webservices[serviceName].local, server);
			promiseArray.push(promise);
			webserviceNamesArray.push(serviceName);
		});
		// alert("promiseArray: " + JSON.stringify(promiseArray));
		$.when.apply($, promiseArray).then(function() {
			// alert(JSON.stringify([].slice.apply(arguments)));
			var argumentsArray = [].slice.apply(arguments);
			var resultObject = {};
			$.each(webserviceNamesArray, function(key, value) {
				resultObject[value] = argumentsArray[key];
			});
			app.debug.alert("pugin.RestClient.js Webservice call done: " + JSON.stringify(resultObject), 60);
			dfd.resolve(resultObject);
		}, function(errorObject) {
			app.debug.alert("pugin.RestClient.js Webservice call failed: " + JSON.stringify(errorObject), 60);
			dfd.reject(errorObject);
		});

		return dfd.promise();
	},
	functions : {
		addWebserviceDefinition : function(name, path, method, timeout, cachetime, local) {
			app.debug.alert("plugin.RestClient.js plugin_RestClient.functions.addWebserviceDefinition(" + name + ", " + path + ", " + method + ", " + timeout + ", " + cachetime + ", " + local + ")", 5);
			plugin_RestClient.config.webservices[name] = {
				"url" : path,
				"method" : method,
				"timeout" : timeout,
				"cachetime" : cachetime,
				"local" : local
			};
			return true;
		},
		addWebserviceDefinitionFile : function(path) {
			app.debug.alert("plugin.RestClient.js plugin_RestClient.functions.addWebserviceDefinitionFile(" + path + ")", 5);
			plugin_RestClient.loadDefinitionFile(path);
		},
		getJson : function(service, parameter, async) {
			app.debug.alert("plugin.RestClient.js plugin_RestClient.functions.getJson(" + service + ", " + parameter + ", " + async + ")", 20);

			if (typeof service == "object" && (parameter == false || parameter == undefined)) {
				app.debug.alert("plugin.RestClient.js case: get multible json objects; async = false", 5);
				return plugin_RestClient.getMultipleJson(service, parameter, async);
			}

			else if (typeof service == "object" && parameter == true) {
				app.debug.alert("plugin.RestClient.js case: get multible json objects; async = true", 5);
				return plugin_RestClient.getMultipleJsonAsync(service, parameter, async);
			}

			else if (typeof service == "string" && (parameter == undefined || typeof parameter == "object") && (async == undefined || async == false)) {
				app.debug.alert("plugin.RestClient.js case: get a single json object; async = false", 5);
				return plugin_RestClient.getSingleJson(service, parameter, async);
			}

			else if (typeof service == "string" && (parameter == undefined || typeof parameter == "object") && async == true) {
				app.debug.alert("plugin.RestClient.js case: get a single json object; async = true", 5);
				return plugin_RestClient.getSingleJsonAsync(service, parameter, async);
			}

			return null;
		}
	}
};
