//# sourceURL=plugin.RestClient.js
/**
 * Copyright (c) 2018 martin.kattner@gmail.com Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Plugin to call an cache pre defined websevices.
 * 
 * @namespace plugin_RestClient
 */
var plugin_RestClient = {
	config : null,
	cachedWebserviceIndentifyer : "_t_cachedWebservice_",

	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	pluginsLoaded : function() {
		app.debug.trace("plugin_RestClient.pluginsLoaded()");
		var dfd = $.Deferred(), promises = Array();
		// load the webservice definitions

		if (app.config.min) {
			dfd.resolve();
		}

		else {
			$.each(plugin_RestClient.config.wsdFiles, function(index, path) {
				promises.push(plugin_RestClient.loadDefinitionFileAsync(path));
			});

			$.when.apply($, promises).done(function() {
				dfd.resolve(arguments);
			}).fail(function() {
				dfd.reject(arguments);
			});
		}

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

	/**
	 * 
	 */
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

		promise.fail(function() {
			dfd.reject(arguments);
		});

		return dfd.promise();
	},

	/**
	 * 
	 */
	loadDefinitionFile : function(path) {
		app.debug.trace("plugin_RestClient.loadDefinitionFile()");
		app.debug.deprecated();
		var json = globalLoader.JsonLoader(path);
		app.debug.debug("plugin_RestClient.loadDefinitionFile() - add each webservice definition");
		$.each(json, function(name, values) {
			app.debug.debug("plugin_RestClient.loadDefinitionFile() - add: " + name);
			plugin_RestClient.config.webservices[name] = values;
		});
	},

	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// JSON functions
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	/**
	 * The public functions used by the API *
	 * 
	 * @memberof plugin_RestClient
	 * @namespace plugin_RestClient.functions
	 */
	functions : {

		/**
		 * Retruns a specific webservice definition (wsd).
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function getWsd
		 * @param {String}
		 *            webServiceName - The name of the webservice.
		 * @returns {null|String} - The webservice definition object or NULL if
		 *          the object doesn't exist.
		 */
		getWsd : function(webServiceName) {
			app.debug.trace("plugin_RestClient.functions.getWsd(" + app.debug.arguments(arguments) + ")");
			var wsd, tmpWsd;
			wsd = $.extend(true, {}, plugin_RestClient.config.webservices[webServiceName]);

			if (Object.keys(wsd).length === 0) {
				app.debug.error("Service not defined: " + webServiceName);
				return null;
			} else if (Object.keys(wsd).indexOf("extend") !== -1) {
				// webservice is extension
				// TODO multiple inheritances
				tmpWsd = plugin_RestClient.functions.getWsd(wsd.extend);
				delete wsd.extend;
				wsd = $.extend(true, tmpWsd, wsd);
			}
			return wsd;
		},

		/**
		 * Retruns a specific webservice definition (wsd).
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function addWsd
		 * @param {String}
		 *            name - The name of the webservice.
		 * @param {String}
		 *            url - The relative URL of the webservice.
		 * @param {String}
		 *            method - The HTTP method (post|get|delete|put) of the
		 *            webservice.
		 * @param {int}
		 *            timeout - Timeout in milliseconds until the webservice is
		 *            rejected.
		 * @param {boolean}
		 *            cacheable - Allow lapstone to cache the webservice result.
		 * @param {int}
		 *            cacheInMs - How long should lapstone cache the webservice
		 *            result.
		 * @param {boolean}
		 *            local - Ist the webservice a local file.
		 * @returns {boolean} Success or fail adding a the webservice.
		 */

		/**
		 * Retruns a specific webservice definition (wsd).
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function addWsd
		 * @param {Object}
		 *            webServiceDefinition - An object containing the webservice
		 *            definition.
		 * @returns {boolean} Success or fail adding a the webservice.
		 */
		// addWsd: function(name, url, method, timeout, cacheable, cacheInMs,
		// local) {
		// app.debug.trace("plugin.RestClient.js
		// plugin_RestClient.functions.addWebserviceDefinition(" +
		// app.debug.arguments(arguments) + ")");
		//
		// if (typeof url == "object") {
		// plugin_RestClient.config.webservices[name] = url;
		// }
		//
		// else {
		// plugin_RestClient.config.webservices[name] = {
		// "url": url,
		// "method": method,
		// "timeout": timeout,
		// "cacheable": cacheable,
		// "cacheInMs": cacheInMs,
		// "local": local
		// };
		// }
		//
		// return true;
		// },
		/**
		 * Deletes a webservice definition (wsd).
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function deleteWsd
		 * @param {String}
		 *            webServiceName - The name of the webservice.
		 * @returns {boolean} - Success or fail deleting a the webservice
		 */
		deleteWsd : function(webServiceName) {
			app.debug.trace("plugin_RestClient.functions.deleteWsd(" + app.debug.arguments(arguments) + ")");
			delete plugin_RestClient.config.webservices[webServiceName];
			return true;
		},

		/**
		 * @deprecated removed in version 1.0
		 */
		// addWebserviceDefinition: function(name, url, method, timeout,
		// cacheable, cacheInMs, local) {
		// console.error("Depecated function!! use app.rc.addWsd(name, url,
		// method, timeout, cacheable, cacheInMs, local)")
		//
		// },
		/**
		 * @deprecated removed in version 1.0
		 */
		addWebserviceDefinitionFile : function(path) {
			app.debug.debug("plugin_RestClient.functions.addWebserviceDefinitionFile(" + app.debug.arguments(arguments) + ")");
			plugin_RestClient.loadDefinitionFile(path);
		},

		addWebservice : function(name, wsd) {
			if (plugin_RestClient.config.webservices[name] === undefined) {
				plugin_RestClient.config.webservices[name] = wsd;
			} else {
				app.debug.error("Webservice already exists: " + name);
			}
		},

		/**
		 * Removes a specific webservice call from cache.
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function removeCache
		 * @param {String}
		 *            webServiceName - The name of the webservice.
		 * @param {String}
		 *            parameter - The parameter of the call.
		 * @returns {boolean} - Success or fail deleting a webservice from
		 *          cache.
		 */
		removeCache : function(webServiceName, parameter) {
			app.debug.trace("plugin_RestClient.functions.removeCache(" + app.debug.arguments(arguments) + ")");
			app.store.localStorage.removeObject(plugin_RestClient.cachedWebserviceIndentifyer + webServiceName);
			return true;
		},

		/**
		 * Removes the eintire webservice cache.
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function clearCache
		 * @returns {boolean} - Success or fail removing the cache.
		 */
		clearCache : function(webServiceName, parameter) {
			app.debug.trace("plugin_RestClient.functions.removeCache(" + app.debug.arguments(arguments) + ")");
			app.store.localStorage.removeItem(plugin_RestClient.cachedWebserviceIndentifyer + "*");
			return true;
		},

		/**
		 * Caches a webservice. Uses the name of the webservice an the calling
		 * parameter as identifyer.
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function cacheJson
		 * @param {String}
		 *            webServiceName - The name of the webservice.
		 * @param {Object}
		 *            parameter - The parameter of the call.
		 * @param {Object}
		 *            data - The data to cache.
		 * @returns {boolean} - Success or fail caching a the webservice. No
		 *          reason is returned.
		 */
		cacheJson : function(webServiceName, parameter, data) {
			app.debug.trace("plugin_RestClient.functions.cacheJson(" + app.debug.arguments(arguments) + ")");
			app.debug.validate(_);
			var cachedWs, wsd, uniqueWsIdentifyer;

			wsd = app.rc.getWsd(webServiceName);
			uniqueWsIdentifyer = (webServiceName + JSON.stringify(parameter)).hashCode();

			if (wsd.cacheable === true) {
				app.debug.debug("plugin_RestClient.functions.cacheJson() - case: webservice is cacheable");
				// store into local storage
				if (data) {
					app.debug.debug("plugin_RestClient.functions.cacheJson() - case: store to local storage");

					cachedWs = {
						servicename : webServiceName,
						parameter : parameter,
						cachetimestamp : Date.now(),
						data : JSON.stringify(data)
					};

					app.store.localStorage.setObject(plugin_RestClient.cachedWebserviceIndentifyer + uniqueWsIdentifyer, cachedWs);

					return true;
				}

				// restore from local storage
				else if ((cachedWs = app.store.localStorage.getObject(plugin_RestClient.cachedWebserviceIndentifyer + uniqueWsIdentifyer))) {
					app.debug.debug("plugin_RestClient.functions.cacheJson() - case: restore from local storage");

					app.debug.debug("plugin_RestClient.functions.cacheJson() - parameter:        " + JSON.stringify(parameter));
					app.debug.debug("plugin_RestClient.functions.cacheJson() - cached parameter: " + JSON.stringify(cachedWs.parameter));

					app.debug.debug("plugin_RestClient.functions.cacheJson() - valid until: " + (cachedWs.cachetimestamp + wsd.cacheInMs));
					app.debug.debug("plugin_RestClient.functions.cacheJson() - now:         " + Date.now());

					if (!_.isEqual(parameter, cachedWs.parameter)) {
						app.debug.debug("plugin_RestClient.functions.cacheJson() - case: parameter not equal");
						return false;
					}

					else if ((cachedWs.cachetimestamp + wsd.cacheInMs) < Date.now()) {
						app.debug.debug("plugin_RestClient.functions.cacheJson() - case: cache time timed out");
						return false;
					}

					else {

						app.debug.debug("plugin_RestClient.functions.cacheJson() - case: return data");
						app.debug.debug("plugin_RestClient.functions.cacheJson() - data: " + cachedWs.data);
						return JSON.parse(cachedWs.data);
					}
				}

				else {
					app.debug.debug("plugin_RestClient.functions.cacheJson() - case: not stored");
					return false;
				}
			}

			else {
				app.debug.debug("plugin_RestClient.functions.cacheJson() - case: not cacheable");
				return false;
			}
			return null;
		},

		/**
		 * Returns the full URL of a webservice call
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function getFullUrl
		 * @param {String}
		 *            webServiceName - The name of the webservice.
		 * @param {String}
		 *            parameter - The parameter of the call.
		 * @returns {String} - The full URL of the webservice call.
		 */
		getFullUrl : function(wsd, parameters) {
			app.debug.trace("plugin_RestClient.functions.getFullUrl(" + app.debug.arguments(arguments) + ")");
			var url;

			wsd = plugin_RestClient.functions.getWsd(wsd);
			url = app.wsc.getServer(wsd.server).pathCombine(wsd.url);
			url += "?";
			plugin_RestClient.functions.mergeWsdWithParameters(wsd, parameters);

			$.each(wsd.parameters, function(name, value) {
				url += name + "=" + value + "&";
			});
			return url;
		},

		getJsonWithLoader_overrun : null,
		getJsonWithLoader_Delay : null,
		getJsonWithLoader_Queue : 0,
		getJsonWithLoader : function(service, parameter, async, attempts) {
			app.debug.trace("plugin_RestClient.functions.getJsonWithLoader(" + app.debug.arguments(arguments) + ")");
			app.debug.validate(plugin_RestClient.config.global_getJsonWithLoader_uniqueLoader);
			// keep alive is Activated and connection is down
			// if (plugin_RestClient.config.useKeepAlive &&
			// !app.alive.isAlive()) {
			//
			// }

			var result, loaderHeadline, loaderText;

			result = plugin_RestClient.functions.getJson(service, parameter, async, attempts);
			loaderHeadline = "";
			loaderText = "";

			app.debug.validate(plugin_RestClient.config.global_getJsonWithLoader_timeout);
			app.debug.validate(plugin_RestClient.config.global_getJsonWithLoader_overrun);

			timeoutInMs = plugin_RestClient.config.global_getJsonWithLoader_timeout;
			overrunInMs = plugin_RestClient.config.global_getJsonWithLoader_overrun;
			app.debug.info("plugin_RestClient - LOADER: timeout = " + timeoutInMs + "; overrun = " + overrunInMs);

			window.clearTimeout(plugin_RestClient.functions.getJsonWithLoader_overrun);
			// alert(async + " - " + result);
			// an error occured
			if (parameter === true && result === null) {
				var dfd = $.Deferred();
				dfd.reject("ERROR");
				return dfd.promise();
			}

			// TODO ???? kontrollieren
			else if (async === true && result === null) {
				var dfd = $.Deferred();
				dfd.reject("ERROR");
				return dfd.promise();
			}

			// result is a deferred object
			else if ($.isFunction(result.promise)) {

				plugin_RestClient.functions.getJsonWithLoader_Queue++;

				app.debug.validate(app.rc.config.global_getJsonWithLoader_multilanguageContext);
				app.debug.validate(app.rc.config.global_getJsonWithLoader_uniqueLoaderPageScoped, "boolean");
				app.debug.validate(app.rc.config.global_getJsonWithLoader_uniqueLoader, "boolean");
				app.debug.validate(app.rc.config.global_getJsonWithLoader_loaderTemplate);

				// GENERATE UNIQUE LOADER TEXT and HEADLINE FOR EACH PAGE
				// unique text for page and webservice(s)
				if (app.rc.config.global_getJsonWithLoader_uniqueLoaderPageScoped === true) {
					loaderHeadline += "page: " + $("[data-role=page]").attr("id") + " - ";
					loaderText += "page: " + $("[data-role=page]").attr("id") + " - ";

					// case: SINGLE ASYNC CALL
					if (typeof service === "string") {
						loaderHeadline += service + " ";
						loaderText += service + " ";
					}

					// case: MULTIPLE ASYNC CALL
					else {
						$.each(service, function(index, serviceDefinition) {

							loaderHeadline += serviceDefinition[0] + " ";
							loaderText += serviceDefinition[0] + " ";

						});
					}

					loaderHeadline += "- headline";
					loaderText += "- text";
				}

				// GENERATE UNIQUE LOADER TEXT and HEADLINE
				else if (app.rc.config.global_getJsonWithLoader_uniqueLoader === true) {

					// case: SINGLE ASYNC CALL
					if (typeof service === "string") {
						loaderHeadline = service;
						loaderText = service;
					}

					// case: MULTIPLE ASYNC CALL
					else {
						$.each(service, function(index, serviceDefinition) {

							loaderHeadline += serviceDefinition[0] + " ";
							loaderText += serviceDefinition[0] + " ";

						});
					}

					loaderHeadline += "- headline";
					loaderText += "- text";
				}

				// GENERATE GLOBAL LOADER TEXT
				else {
					loaderHeadline = "global webservice loader headline";
					loaderText = "global webservice loader text";
				}

				// ADD THE STRINGS TO MULTILANGUAGE DICTIONARY
				app.debug.flat(app.lang.string(loaderHeadline, app.rc.config.global_getJsonWithLoader_multilanguageContext));
				app.debug.flat(app.lang.string(loaderText, app.rc.config.global_getJsonWithLoader_multilanguageContext));

				// IF there is no other WS call in queue

				// SET timeout for showing the loader
				if (plugin_RestClient.functions.getJsonWithLoader_Delay == null) {
					plugin_RestClient.functions.getJsonWithLoader_Delay = window.setTimeout(function() {
						plugin_RestClient.functions.getJsonWithLoader_Delay = null;

						//
						// if (!app.notify.loader.isLoaderActive()) { //
						// REMOVED, because new loader won't be added twice
						app.debug.debug("plugin_RestClient.functions.getJsonWithLoader() - show loader after timeout");
						app.debug.info("plugin_RestClient - LOADER SHOW");

						app.notify.loader.show(app.rc.config.global_getJsonWithLoader_loaderTemplate, {
							"headline" : app.lang.string(loaderHeadline, app.rc.config.global_getJsonWithLoader_multilanguageContext),
							"text" : app.lang.string(loaderText, app.rc.config.global_getJsonWithLoader_multilanguageContext)
						});

						// }

					}, timeoutInMs);
				}

				result.always(function() {
					app.debug.debug("plugin_RestClient.functions.getJsonWithLoader() - webservice call was fast enough; do not show loader;");

					plugin_RestClient.functions.getJsonWithLoader_Queue--;

					if (plugin_RestClient.functions.getJsonWithLoader_Queue === 0) {

						window.clearTimeout(plugin_RestClient.functions.getJsonWithLoader_Delay);
						plugin_RestClient.functions.getJsonWithLoader_Delay = null;

						plugin_RestClient.functions.getJsonWithLoader_overrun = window.setTimeout(function() {
							app.debug.info("plugin_RestClient - LOADER HIDE");
							app.notify.loader.remove();
						}, 30);
					}

				});

			} else {
				// alert(error);
				result = result;
			}

			return result;
		},

		/**
		 * Call a webservice synchronous which returns a JSON text.
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function getJson
		 * @example app.rc.getJson("createBlockingEventForStudent", { wstoken:
		 *          token, courseId: courseId, title: title, userId: userId },
		 *          false, 1);
		 * @param {String}
		 *            webServiceName - The name of the webservice.
		 * @param {Object}
		 *            parameter - The parameter of the call.
		 * @param {false}
		 *            false - Call the webservice synchronous.
		 * @param {int}
		 *            attempts - The amount how often a you call a webservice
		 *            before rejecting it.
		 * @returns {null|Object} - The received JSON object or null in case of
		 *          an error.
		 */

		/**
		 * Call a webservice asynchronous which returns a JSON text.
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function getJson
		 * @example app.rc.getJson("createBlockingEventForStudent", { wstoken:
		 *          token, courseId: courseId, title: title, userId: userId },
		 *          true, 1);
		 * @param {String}
		 *            webServiceName - The name of the webservice.
		 * @param {Object}
		 *            parameter - The parameter of the call.
		 * @param {true}
		 *            true - Call the webservice asynchronous.
		 * @param {int}
		 *            attempts - The amount how often a you call a webservice
		 *            before rejecting it.
		 * @returns {null|Object<jQuery.Deferred>} A jQuery.Deferrd Object or
		 *          null in case of an error.
		 */

		/**
		 * Call multiple webservices synchronous which returning a JSON text.
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function getJson
		 * @example app.rc.getJson([["dakoraGetCourses", { wstoken: token,
		 *          userid: 0 }], ["getExamplePool", { wstoken: token, courseid:
		 *          courseId, userid: 0 }], ["getExampleTrash", { wstoken:
		 *          token, courseid: courseId, userid: userId }],
		 *          ["getScheduleConfig", { wstoken: token }]], false, 3);
		 * @param {Array
		 *            <Array<String, Object>>} webserviceCalls - An array
		 *            containing arrays with two elements (webServiceName,
		 *            parameter) webServiceName - The name of the webservice.
		 * @param {false}
		 *            false - Call the webservice synchronous.
		 * @param {int}
		 *            attempts - The amount how often a you call a webservice
		 *            before rejecting it.
		 * @returns {null|Object} - The received JSON object or null in case of
		 *          an error.
		 */

		/**
		 * Call multiple webservices asynchronous which returning a JSON text.
		 * 
		 * @memberof plugin_RestClient.functions
		 * @function getJson
		 * @example app.rc.getJson([["dakoraGetCourses", { wstoken: token,
		 *          userid: 0 }], ["getExamplePool", { wstoken: token, courseid:
		 *          courseId, userid: 0 }], ["getExampleTrash", { wstoken:
		 *          token, courseid: courseId, userid: userId }],
		 *          ["getScheduleConfig", { wstoken: token }]], true, 3);
		 * @param {Array
		 *            <Array<String, Object>>} webserviceCalls - An array
		 *            containing arrays with two elements (webServiceName,
		 *            parameter) webServiceName - The name of the webservice.
		 * @param {true}
		 *            true - Call the webservice asynchronous.
		 * @param {int}
		 *            attempts - The amount how often a you call a webservice
		 *            before rejecting it.
		 * @returns {null|Object<jQuery.Deferred>} A jQuery.Deferrd object or
		 *          null in case of an error.
		 */
		getJson : function(service, parameter, async, attempts, dfd) {
			app.debug.trace("plugin_RestClient.functions.getJson(" + app.debug.arguments(arguments) + ")");
			var json, i, promise;

			if (app.plugins.functions.pluginLoaded("KeepAlive") === true && app.alive.isAlive() === true) {
				app.debug.debug("plugin_RestClient.functions.getJson() - case: keepAlive && isAlive");

				// get multible json objects
				if (typeof service === "object") {
					app.debug.debug("plugin_RestClient.functions.getJson() - case: get multible json objects");

					// async = false
					if (parameter === false || parameter === undefined) {
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

						if (dfd === null || dfd === undefined)
							dfd = $.Deferred();

						promise.done(function(json) {
							dfd.resolve(json);
						});

						promise.fail(function(errorObject, jqXHR) {
							app.debug.debug("plugin_RestClient.functions.getJson() - multible json object; case: webservice failed: " + JSON.stringify(errorObject));

							if (async > 1) {
								async--;
								plugin_RestClient.functions.getJson(service, parameter, async, null, dfd);
							} else {
								app.debug.debug("plugin_RestClient.functions.getJson() - multiple json object; reject deferred object");

								dfd.reject(errorObject, jqXHR);
							}
						});

						return dfd.promise();

					}
				}

				// get a single json object
				else if (typeof service === "string") {
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

						promise.fail(function(errorObject, jqXHR) {
							app.debug.debug("plugin_RestClient.functions.getJson() - single json object; case: webservice failed: " + JSON.stringify(errorObject));

							if (attempts > 1) {
								attempts--;
								plugin_RestClient.functions.getJson(service, parameter, async, attempts, dfd);
							} else {
								app.debug.debug("plugin_RestClient.functions.getJson() - single json object; reject deferred object");
								dfd.reject(errorObject, jqXHR);
							}
						});

						return dfd.promise();
					}
				}
			}

			// not alive
			else {
				app.debug.debug("plugin_RestClient.functions.getJson() - server is not alive");
				// call is async
				if (parameter === true || async === true) {
					if (dfd === null || dfd === undefined)
						dfd = $.Deferred();
					dfd.reject({
						id : Math.abs("not alive".hashCode()),
						error : "not alive"
					}, null);

					$(document).trigger("webserviceCall", [ dfd.promise(), "server is not alive", {} ]);
					return dfd.promise();
				}

				else {
					return null;
				}
			}

			// return error
			return null;
		},

		mergeWsdWithParameters : function(wsd, parameters) {

			var map;

			map = function(definitionObject, parameterObject) {
				$.each(definitionObject, function(parameterKey, parameterValue) {

					var mappedParameterKey, defaultValue;

					// simple parameter with default value {parameter name}||0
					// test if string -> could be number | object | boolean too
					if (typeof parameterValue === "string"

					&& parameterValue.contains("||")) {

						defaultValue = parameterValue.substr(parameterValue.indexOf("||") + 2);
						// TODO create a generic string parser
						defaultValue = plugin_HTML5Storage.parseValue(defaultValue);

						parameterValue = parameterValue.substr(0, parameterValue.indexOf("||"));
					}

					// simple parameter {parameter name}
					if ((parameterValue[0] === '{') && (parameterValue[parameterValue.length - 1] === '}')) {

						mappedParameterKey = parameterValue.substr(1, parameterValue.length - 2);

						if (parameters[mappedParameterKey] !== undefined) {

							definitionObject[parameterKey] = parameters[mappedParameterKey];
						}

						else if (defaultValue !== undefined) {
							definitionObject[parameterKey] = defaultValue;
						}

						else {
							app.debug.error("Undefined parameter in parameter object: " + mappedParameterKey);
						}
					}

				});
			};

			// if (Object.keys(parameters).length > 0) {

			// map path
			$.each(parameters, function(parameterKey, parameterValue) {
				wsd.url = wsd.url.replace("{" + parameterKey + "}", parameterValue);
			});

			// map parameters
			if (Object.keys(wsd.parameters).length > 0) {
				map(wsd.parameters, parameters);
			}

			// map headers
			if (Object.keys(wsd.headers).length > 0) {
				map(wsd.headers, parameters);
			}
			// }
		},
	}
};
