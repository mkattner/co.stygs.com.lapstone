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

var plugin_RestClient = {
	config : null,
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	pluginsLoaded : function() {
		app.debug.trace("plugin_RestClient.pluginsLoaded()");
		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;
		// load the webservice definitions
		$.each(plugin_RestClient.config.wsdFiles, function(path, loadFile) {
			if (loadFile) {
				promises.push(plugin_RestClient.loadDefinitionFileAsync(path));
			}
		});

		promiseOfPromises = $.when.apply($, promises);

		promiseOfPromises.done(function() {
			dfd.resolve();
		});
		promiseOfPromises.fail(function() {
			dfd.reject();
		});

		return dfd.promise();
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.trace("plugin_RestClient.pagesLoaded()");
		app.debug.debug("plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	definePluginEvents : function() {
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_RestClient.afterHtmlInjectedBeforePageComputing()");
	},
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_RestClient.pageSpecificEvents()");
	},

	loadDefinitionFileAsync : function(path) {
		app.debug.trace("plugin_RestClient.loadDefinitionFile()");
		var dfd = $.Deferred(), promise;
		promise = globalLoader.AsyncJsonLoader(path);

		promise.done(function(json) {
			$.each(json, function(name, values) {
				app.debug.debug("plugin_RestClient.loadDefinitionFile() - add: " + name);
				plugin_RestClient.config.webservices[name] = values;
			});
			dfd.resolve();
		});
		promise.done(function() {
			dfd.reject();
		});

		return dfd.promise();
	},

	loadDefinitionFile : function(path) {
		app.debug.trace("plugin_RestClient.loadDefinitionFile()");
		var json = globalLoader.JsonLoader(path);
		app.debug.debug("plugin_RestClient.loadDefinitionFile() - add each webservice definition");
		$.each(json, function(name, values) {
			app.debug.debug("plugin_RestClient.loadDefinitionFile() - add: " + name);
			plugin_RestClient.config.webservices[name] = values;
		});
	},

	getPath : function(parameter, path) {
		app.debug.trace("plugin_RestClient.getPath()");
		app.debug.debug("plugin_RestClient.getPath() - parameter: " + JSON.stringify(parameter));

		var data = path.split('?')[1];
		path = path.split('?')[0];

		if (parameter != undefined) {
			$.each(parameter, function(key, value) {
				if (typeof value == "object") {
					value = JSON.stringify(value);
					path = path.replace('{' + key + '}', encodeURIComponent(value));
				} else {
					path = path.replace('{' + key + '}', encodeURIComponent(value));
				}
				app.debug.debug("plugin_RestClient.getPath() - set in path: " + key + " = " + encodeURIComponent(value));

			});
		}

		if (data == undefined)
			data = ""

		app.debug.debug("plugin_RestClient.getPath() - path: " + path);
		app.debug.debug("plugin_RestClient.getPath() - data: " + data);
		app.debug.debug("plugin_RestClient.getPath() - parameter: " + JSON.stringify(parameter));

		return [ path, data ];
	},

	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// JSON functions
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	getSingleJson : function(service, parameter, async) {
		app.debug.debug("plugin_RestClient.getSingleJson() - get a single json object; async = false");
		app.debug.info("plugin_RestClient - CALL: " + service);
		var server, path, json, splittedService, wsd;
		app.debug.debug("plugin_RestClient.getSingleJson() - get server name");
		if (service.indexOf('.') != -1) {
			splittedService = service.split(".");
			server = splittedService[0];
			service = splittedService[1];
		} else {
			server = app.wsc.getDefaultServerName();
		}

		// get the path which is defined in wsd file
		wsd = plugin_RestClient.config.webservices[service]
		if (wsd) {
			path = wsd.url;
		}

		else {
			app.debug.error("plugin_RestClient.getSingleJson() - service not defined: " + service);
			return null;
		}

		// set async to false (in each case)
		async = false;

		// replace the parameters in path string
		path = plugin_RestClient.getPath(parameter, path);

		// ask for the json file
		json = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[service].method, plugin_RestClient.config.webservices[service].timeout, async, plugin_RestClient.config.webservices[service].local, server);
		// add language wildcards wich could be defined in webservice
		// response
		if (plugins.functions.pluginLoaded("MultilanguageIso639_3")) {
			if (json.language != undefined) {
				$.each(json.language, function(key, value) {
					app.lang.addParameter(key, value);
				});
			}
		}
		return json;
	},
	getSingleJsonAsync : function(service, parameter, async) {
		app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get a single json object; async = true;");
		app.debug.info("plugin_RestClient - CALL: " + service);

		// the deferred object for the caller
		var dfd = $.Deferred(), server, path, promise, splittedService, wsd;

		app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get server name");
		if (service.indexOf('.') != -1) {
			splittedService = service.split(".");
			server = splittedService[0];
			service = splittedService[1];
		} else {
			server = app.wsc.getDefaultServerName();
		}

		app.debug.debug("plugin_RestClient.getSingleJsonAsync() server: " + server + "; service: " + service);

		// get the path which is defined in wsd file
		wsd = plugin_RestClient.config.webservices[service]
		if (wsd) {
			path = wsd.url;
		}

		else {
			app.debug.error("plugin_RestClient.getSingleJsonAsync() - service not defined: " + service);
			return dfd.reject();
		}

		// replace the parameters in path string
		path = plugin_RestClient.getPath(parameter, path);

		// ask for the json file
		promise = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[service].method, plugin_RestClient.config.webservices[service].timeout, async, plugin_RestClient.config.webservices[service].local, server);
		// add language wildcards wich could be defined in webservice
		// response

		promise.done(function(json) {
			// alert("async webservice call done");
			if (plugins.functions.pluginLoaded("MultilanguageIso639_3")) {
				if (json.language != undefined) {
					$.each(json.language, function(key, value) {
						app.lang.addParameter(key, value);
					});
				}
			}
			app.debug.debug("plugin_RestClient.getSingleJsonAsync()- Webservice call done: " + JSON.stringify(json));
			dfd.resolve(json);
		});

		promise.fail(function(error) {
			app.debug.debug("plugin_RestClient.getSingleJsonAsync() - Webservice call failed: " + JSON.stringify(error));

			app.debug.info("plugin_RestClient - FAILED: " + error.id);

			dfd.reject(error);
		});

		return dfd.promise();
	},

	getMultipleJson : function(service, parameter, async) {
		app.debug.debug("plugin_RestClient.getMultipleJson() - get multible json objects; async = false");

		var jsonObject = {};

		app.debug.debug("plugin_RestClient.getMultipleJson() - generate ajax call for each webservice");

		$.each(service, function(key, call) {

			var serviceName = call[0], parameter = call[1], server, path, json, splittedService, wsd;

			app.debug.info("plugin_RestClient - CALL: " + serviceName);

			app.debug.debug("plugin_RestClient.getMultipleJson() - get server name");
			if (serviceName.indexOf('.') != -1) {
				splittedService = serviceName.split(".");
				server = splittedService[0];
				serviceName = splittedService[1];
			} else {
				server = app.wsc.getDefaultServerName();
			}
			// set async to false (in each case)
			async = false;

			app.debug.debug("plugin_RestClient.getMultipleJson() - get webservice path from wsd file");
			wsd = plugin_RestClient.config.webservices[serviceName]
			if (wsd) {
				path = wsd.url;
			}

			else {
				app.debug.error("plugin_RestClient.getMultipleJson() - service not defined: " + serviceName);
				return null;
			}

			app.debug.debug("plugin_RestClient.getMultipleJson() - replace parameters in path");
			path = plugin_RestClient.getPath(parameter, path);

			app.debug.debug("plugin_RestClient.getMultipleJson() -  ask for the json file");
			json = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[serviceName].method, plugin_RestClient.config.webservices[serviceName].timeout, async, plugin_RestClient.config.webservices[serviceName].local,
					server);

			app.debug.debug("plugin_RestClient.getMultipleJson() - add language wildcards wich could be defined in webservice response");

			if (plugins.functions.pluginLoaded("MultilanguageIso639_3")) {

				if (json.language != undefined) {
					$.each(json.language, function(key, value) {
						app.lang.addParameter(key, value);
					});
				}
			}

			app.debug.debug("plugin_RestClient.getMultipleJson() - add result to resultObject");
			jsonObject[serviceName] = json;
		});

		return jsonObject;
	},

	getMultipleJsonAsync : function(service, parameter, async) {
		app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get multible json objects; async = true");
		// the deferred object for the caller
		async = true;

		var dfd = $.Deferred(), promiseArray = [], webserviceNamesArray = [], splittedService;

		app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - generate a ajax call for each webservice");

		$.each(service, function(key, call) {

			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - generate single async ajax call");

			var serviceName = call[0], parameter = call[1], server, path, promise, wsd;

			app.debug.info("plugin_RestClient - CALL: " + serviceName);

			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get server name");
			if (serviceName.indexOf('.') != -1) {
				splittedService = serviceName.split(".");
				server = splittedService[0];
				serviceName = splittedService[1];
			} else {
				server = app.wsc.getDefaultServerName();
			}

			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get webservice path from wsd file");

			wsd = plugin_RestClient.config.webservices[serviceName]
			if (wsd) {
				path = wsd.url;
			}

			else {
				app.debug.error("plugin_RestClient.getMultipleJsonAsync() - service not defined: " + serviceName);
				return dfd.reject();
			}

			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - replace parameters in path");
			path = plugin_RestClient.getPath(parameter, path);

			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - ask for the deferred promise object");

			promise = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[serviceName].method, plugin_RestClient.config.webservices[serviceName].timeout, async, plugin_RestClient.config.webservices[serviceName].local,
					server);

			promiseArray.push(promise);

			webserviceNamesArray.push(serviceName);
		});
		// alert("promiseArray: " + JSON.stringify(promiseArray));
		// http://stackoverflow.com/questions/4878887/how-do-you-work-with-an-array-of-jquery-deferreds
		// http://stackoverflow.com/questions/5627284/pass-in-an-array-of-deferreds-to-when
		$.when.apply($, promiseArray).then(function() {
			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - all async webservices are done");
			// alert(JSON.stringify([].slice.apply(arguments)));
			var argumentsArray = [].slice.apply(arguments), resultObject = {};
			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - add each result to resultObject");
			$.each(webserviceNamesArray, function(key, value) {

				if (plugins.functions.pluginLoaded("MultilanguageIso639_3")) {
					if (argumentsArray[key].language != undefined) {
						$.each(argumentsArray[key].language, function(key, value) {
							app.lang.addParameter(key, value);
						});
					}
				}

				resultObject[value] = argumentsArray[key];
			});
			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - async webservice call done: " + JSON.stringify(resultObject));
			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - resolve deferred object");
			dfd.resolve(resultObject);
		}, function(error) {
			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - error on or or more async webservices");
			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - async webservice call failed: " + JSON.stringify(error));
			app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - reject deferred object");

			app.debug.info("plugin_RestClient - FAILED: " + error.id);
			dfd.reject(error);
		});

		app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - return: deferred promise");
		return dfd.promise();
	},

	functions : {
		getWsd : function(serviceName) {
			app.debug.trace("plugin_RestClient.functions.getWsd()");
			return plugin_RestClient.config.webservices[serviceName] || null;
		},

		addWsd : function(name, url, method, timeout, cacheable, cacheInMs, local) {
			app.debug.trace("plugin.RestClient.js plugin_RestClient.functions.addWebserviceDefinition()");

			if (typeof url == "object") {
				plugin_RestClient.config.webservices[name] = url;
			}

			else {
				plugin_RestClient.config.webservices[name] = {
					"url" : url,
					"method" : method,
					"timeout" : timeout,
					"cacheable" : cacheable,
					"cacheInMs" : cacheInMs,
					"local" : local
				};
			}

			return true;
		},

		deleteWsd : function(name) {
			delete plugin_RestClient.config.webservices[name];
			return true;
		},

		addWebserviceDefinition : function(name, url, method, timeout, cacheable, cacheInMs, local) {
			console.error("Depecated function!! use app.rc.addWsd(name, url, method, timeout, cacheable, cacheInMs, local)")

		},

		addWebserviceDefinitionFile : function(path) {
			app.debug.debug("plugin_RestClient.functions.addWebserviceDefinitionFile(" + path + ")");
			plugin_RestClient.loadDefinitionFile(path);
		},

		cacheJson : function(serviceName, parameter, data) {
			app.debug.debug("plugin_RestClient.functions.cacheJson()");
			var cachedWs, wsd;

			wsd = app.rc.getWsd(serviceName);

			// store into local storage
			if ($.isPlainObject(data)) {
				app.debug.debug("plugin_RestClient.functions.cacheJson() - store to local storage");

				cachedWs = {
					servicename : serviceName,
					parameter : parameter,
					cachetimestamp : Date.now(),
					data : JSON.stringify(data)
				};

				app.store.localStorage.setObject("_t_ws_" + serviceName, cachedWs);

				return true;
			}

			// restore from local storage
			else {
				app.debug.debug("plugin_RestClient.functions.cacheJson() - restore from local storage");

				cachedWs = app.store.localStorage.getObject("_t_ws_" + serviceName);

				if (JSON.stringify(parameter) !== JSON.stringify(cachedWs.parameter)) {
					app.debug.debug("plugin_RestClient.functions.cacheJson() - case: parameter not equal");
					return false;
				}

				else if ((cachedWs.cachetimestamp + wsd.cacheInMs) < Date.now()) {
					app.debug.debug("plugin_RestClient.functions.cacheJson() - case: cash time timed out");
					return false;
				}

				else {
					return JSON.parse(cachedWs.data);
				}
			}

			return null;
		},

		getJson : function(service, parameter, async, attempts, dfd) {
			app.debug.debug("plugin_RestClient.functions.getJson(" + service + ", " + parameter + ", " + async + ")");
			var json, i, promise;

			if (plugins.config.KeepAlive === true && app.alive.isAlive() === true) {
				app.debug.debug("plugin_RestClient.functions.getJson() - case: keepAlive && isAlive");

				// get multible json objects
				if (typeof service == "object") {
					app.debug.debug("plugin_RestClient.functions.getJson() - case: get multible json objects");

					// async = false
					if (parameter == false || parameter == undefined) {
						app.debug.debug("plugin_RestClient.functions.getJson() case: async = false");

						if (!async)
							async = 1;

						for (i = 0; i < async; i++) {
							app.debug.debug("plugin_RestClient.functions.getJson() - AJAX attempt " + i + " of " + attempts);

							json = plugin_RestClient.getMultipleJson(service, parameter, async);
							if (json != null)
								return json;
						}
					}

					// async = true
					else if (typeof service == "object" && parameter == true) {
						app.debug.debug("plugin_RestClient.functions.getJson() - case: async = true");

						promise = plugin_RestClient.getMultipleJsonAsync(service, parameter, async);

						if (dfd == null || dfd == undefined)
							dfd = $.Deferred();

						promise.done(function(json) {
							dfd.resolve(json);
						});

						promise.fail(function(errorObject) {
							app.debug.debug("plugin_RestClient.functions.getJson() - multible json object; case: webservice failed: " + JSON.stringify(errorObject));

							if (async > 1) {
								async--;
								plugin_RestClient.functions.getJson(service, parameter, async, null, dfd);
							} else {
								app.debug.debug("plugin_RestClient.functions.getJson() - multiple json object; reject deferred object");

								dfd.reject(errorObject);
							}
						});

						return dfd.promise();

					}
				}

				// get a single json object
				else if (typeof service == "string") {
					app.debug.debug("plugin_RestClient.functions.getJson() - case: get a single json object");

					// async = false
					if ((parameter == undefined || typeof parameter == "object") && (async == undefined || async == false)) {
						app.debug.debug("plugin_RestClient.functions.getJson() - case: async = false");

						if (!attempts)
							attempts = 1;

						for (i = 0; i < attempts; i++) {
							app.debug.debug("plugin_RestClient.functions.getJson() - AJAX attempt " + i + " of " + attempts);

							json = plugin_RestClient.getSingleJson(service, parameter, async);
							if (json != null)
								return json;
						}
					}

					// async = true
					else if ((parameter == undefined || typeof parameter == "object") && async == true) {
						app.debug.debug("plugin_RestClient.functions.getJson() - case: async = true");

						promise = plugin_RestClient.getSingleJsonAsync(service, parameter, async);

						if (dfd == null || dfd == undefined)
							dfd = $.Deferred();

						promise.done(function(json) {
							dfd.resolve(json);
						});

						promise.fail(function(errorObject) {
							app.debug.debug("plugin_RestClient.functions.getJson() - single json object; case: webservice failed: " + JSON.stringify(errorObject));

							if (attempts > 1) {
								attempts--;
								plugin_RestClient.functions.getJson(service, parameter, async, attempts, dfd);
							} else {
								app.debug.debug("plugin_RestClient.functions.getJson() - single json object; reject deferred object");
								dfd.reject(errorObject);
							}
						});

						return dfd.promise();
					}
				}
			}

			else {
				app.alive.badConnectionHandler();
			}

			// return error
			return null;
		}
	}
};
