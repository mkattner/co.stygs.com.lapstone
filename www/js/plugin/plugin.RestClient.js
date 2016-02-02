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

var plugin_RestClient = {
  config: null,
  cachedWebserviceIndentifyer: "_t_cachedWebservice_",

  constructor: function() {
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();
  },

  pluginsLoaded: function() {
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
  pagesLoaded: function() {
    app.debug.trace("plugin_RestClient.pagesLoaded()");
    app.debug.debug("plugin_" + this.config.name + ".pagesLoaded()", 11);
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();
  },

  definePluginEvents: function() {
  },

  // called by pages.js
  afterHtmlInjectedBeforePageComputing: function(container) {
    app.debug.trace("plugin_RestClient.afterHtmlInjectedBeforePageComputing()");
  },
  pageSpecificEvents: function(container) {
    app.debug.trace("plugin_RestClient.pageSpecificEvents()");
  },

  /**
   * 
   */
  loadDefinitionFileAsync: function(path) {
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

  /**
   * 
   */
  loadDefinitionFile: function(path) {
    app.debug.trace("plugin_RestClient.loadDefinitionFile()");
    var json = globalLoader.JsonLoader(path);
    app.debug.debug("plugin_RestClient.loadDefinitionFile() - add each webservice definition");
    $.each(json, function(name, values) {
      app.debug.debug("plugin_RestClient.loadDefinitionFile() - add: " + name);
      plugin_RestClient.config.webservices[name] = values;
    });
  },

  /**
   * 
   */
  getData: function(parameter, path) {
    app.debug.trace("plugin_RestClient.getData(" + app.debug.arguments(arguments) + ")");

    var data;

    data = path.split('?')[1];
    path = path.split('?')[0];

    if (parameter != undefined) {
      $.each(parameter, function(key, value) {
        if (typeof value == "object") {
          value = JSON.stringify(value);
          data = data.replace('{' + key + '}', encodeURIComponent(value));
        } else {
          data = data.replace('{' + key + '}', encodeURIComponent(value));
        }
        app.debug.debug("plugin_RestClient.getData() - set in path: " + key + " = " + encodeURIComponent(value));

      });
    }

    if (data == undefined) {
      data = "";
    }

    app.debug.debug("plugin_RestClient.getData() - path: " + path);
    app.debug.debug("plugin_RestClient.getData() - data: " + data);
    app.debug.debug("plugin_RestClient.getData() - parameter: " + JSON.stringify(parameter));

    return [path, data];
  },

  /**
   * 
   */
  getPath: function(parameter, path) {
    app.debug.trace("plugin_RestClient.getPath(" + app.debug.arguments(arguments) + ")");

    var data;

    data = path.split('?')[1];
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

    if (data == undefined) {
      data = "";
    }

    app.debug.debug("plugin_RestClient.getPath() - path: " + path);
    app.debug.debug("plugin_RestClient.getPath() - data: " + data);
    app.debug.debug("plugin_RestClient.getPath() - parameter: " + JSON.stringify(parameter));

    return [path, data];
  },

  /**
   * 
   */
  getServer: function(service) {
    var splittedService, server;

    if (service.indexOf('.') != -1) {
      splittedService = service.split(".");
      server = splittedService[0];
    }

    else {
      server = app.wsc.getDefaultServerName();
    }

    return server;
  },

  /**
   * 
   */
  getService: function(service) {
    if (service.indexOf('.') != -1) {
      splittedService = service.split(".");
      service = splittedService[1];
    }

    return service;
  },

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // JSON functions
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  /**
   * 
   */
  getSingleJson: function(paramService, parameter, async) {
    app.debug.debug("plugin_RestClient.getSingleJson() - get a single json object; async = false");

    var server, path, json, splittedService, wsd, cachedJson, wsEventTrigger;

    wsEventTrigger = $.Deferred();

    app.debug.debug("plugin_RestClient.getSingleJson() - get server name");
    app.debug.todo("use getServer() and getService()");
    if (paramService.indexOf('.') != -1) {
      splittedService = paramService.split(".");
      server = splittedService[0];
      paramService = splittedService[1];
    } else {
      server = app.wsc.getDefaultServerName();
    }

    // get the path which is defined in wsd file
    wsd = plugin_RestClient.config.webservices[paramService]
    if (wsd) {
      path = wsd.url;
    }

    else {
      app.debug.error("plugin_RestClient.getSingleJson() - service not defined: " + paramService);
      return null;
    }

    // set async to false (in each case)
    async = false;

    // replace the parameters in path string
    path = plugin_RestClient.getPath(parameter, path);

    // event triggering
    app.debug.info("plugin_RestClient - TRIGGER EVENT: " + paramService);
    $(document).trigger(paramService, [wsEventTrigger.promise(), parameter]);

    if ((json = plugin_RestClient.functions.cacheJson(paramService, parameter)) && plugin_RestClient.config.webservices[paramService].cacheable) {
      app.debug.info("plugin_RestClient - CACHED: " + paramService);

      app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
      wsEventTrigger.resolve(json);
    }

    // case: webservice request
    else {
      // ask for the json file
      app.debug.info("plugin_RestClient - CALL: " + paramService);
      json = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[paramService].method, plugin_RestClient.config.webservices[paramService].timeout, async, plugin_RestClient.config.webservices[paramService].local, server);

    }

    // add language wildcards wich could be defined in webservice
    // response
    if (plugins.functions.pluginLoaded("MultilanguageIso639_3")) {
      if (json.language != undefined) {
        $.each(json.language, function(key, value) {
          app.lang.addParameter(key, value);
        });
      }
    }

    plugin_RestClient.functions.cacheJson(paramService, parameter, json);

    app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
    wsEventTrigger.resolve(json);

    return json;
  },

  /**
   * 
   */
  getSingleJsonAsync: function(paramService, parameter, async) {
    app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get a single json object; async = true;");

    // the deferred object for the caller
    var dfd = $.Deferred(), server, path, promise, splittedService, wsd, cachedJson, wsEventTrigger;

    wsEventTrigger = $.Deferred();

    app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get server name");
    app.debug.todo("use getServer() and getService()");
    if (paramService.indexOf('.') != -1) {
      splittedService = paramService.split(".");
      server = splittedService[0];
      paramService = splittedService[1];
    } else {
      server = app.wsc.getDefaultServerName();
    }

    app.debug.debug("plugin_RestClient.getSingleJsonAsync() server: " + server + "; service: " + paramService);

    // get the path which is defined in wsd file
    wsd = plugin_RestClient.config.webservices[paramService]
    if (wsd) {
      path = wsd.url;
    }

    else {
      app.debug.error("plugin_RestClient.getSingleJsonAsync() - service not defined: " + paramService);
      return dfd.reject();
    }

    // replace the parameters in path string
    path = plugin_RestClient.getPath(parameter, path);

    // event triggering
    app.debug.info("plugin_RestClient - TRIGGER EVENT: " + paramService);
    $(document).trigger(paramService, [wsEventTrigger.promise(), parameter]);

    // case: webesrvice is cacheable && webservice is cached
    if ((cachedJson = plugin_RestClient.functions.cacheJson(paramService, parameter)) && plugin_RestClient.config.webservices[paramService].cacheable) {
      app.debug.info("plugin_RestClient - CACHED: " + paramService);

      promise = $.Deferred().resolve(cachedJson);

      app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
      wsEventTrigger.resolve(cachedJson);
    }

    // case: webservice request
    else {
      app.debug.info("plugin_RestClient - CALL: " + paramService);
      promise = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[paramService].method, plugin_RestClient.config.webservices[paramService].timeout, async, plugin_RestClient.config.webservices[paramService].local, server);

    }

    // ask for the json file
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
      plugin_RestClient.functions.cacheJson(paramService, parameter, json);
      dfd.resolve(json);

      app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
      wsEventTrigger.resolve(json);
    });

    promise.fail(function(error, jqXHR) {
      app.debug.debug("plugin_RestClient.getSingleJsonAsync() - Webservice call failed: " + JSON.stringify(error));

      app.debug.info("plugin_RestClient - FAILED: " + error.id);

      dfd.reject(error, jqXHR);

      app.debug.info("plugin_RestClient - REJECT TRIGGER EVENT: " + paramService);
      wsEventTrigger.reject(error, jqXHR);
    });

    return dfd.promise();
  },

  getMultipleJson: function(paramService, parameter, async) {
    app.debug.debug("plugin_RestClient.getMultipleJson() - get multible json objects; async = false");

    var jsonObject = {};

    app.debug.debug("plugin_RestClient.getMultipleJson() - generate ajax call for each webservice");

    $.each(paramService, function(key, call) {

      var serviceName = call[0], parameter = call[1], server, path, json, splittedService, wsd, cachedJson, wsEventTrigger;

      wsEventTrigger = $.Deferred();

      app.debug.debug("plugin_RestClient.getMultipleJson() - get server name");
      app.debug.todo("use getServer() and getService()");
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

      // event triggering
      app.debug.info("plugin_RestClient - TRIGGER EVENT: " + serviceName);
      $(document).trigger(serviceName, [wsEventTrigger.promise(), parameter]);

      if ((json = plugin_RestClient.functions.cacheJson(serviceName, parameter)) && plugin_RestClient.config.webservices[serviceName].cacheable) {
        app.debug.info("plugin_RestClient - CACHED: " + serviceName);

      }

      // case: webservice request
      else {
        app.debug.debug("plugin_RestClient.getMultipleJson() -  ask for the json file");
        app.debug.info("plugin_RestClient - CALL: " + serviceName);
        json = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[serviceName].method, plugin_RestClient.config.webservices[serviceName].timeout, async, plugin_RestClient.config.webservices[serviceName].local, server);

        app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + serviceName);
        wsEventTrigger.resolve(json);

      }

      app.debug.debug("plugin_RestClient.getMultipleJson() - add language wildcards wich could be defined in webservice response");

      if (plugins.functions.pluginLoaded("MultilanguageIso639_3")) {

        if (json.language != undefined) {
          $.each(json.language, function(key, value) {
            app.lang.addParameter(key, value);
          });
        }
      }

      plugin_RestClient.functions.cacheJson(serviceName, parameter, json);
      app.debug.debug("plugin_RestClient.getMultipleJson() - add result to resultObject");
      jsonObject[serviceName] = json;
    });

    return jsonObject;
  },

  getMultipleJsonAsync: function(paramService, parameter, async) {
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get multible json objects; async = true");
    // the deferred object for the caller
    async = true;

    var dfd = $.Deferred(), promiseArray = [], webserviceNamesArray = [], webserviceParameterArray = [], splittedService, resultObject = {};

    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - generate a ajax call for each webservice");

    $.each(paramService, function(key, call) {

      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - generate single async ajax call");

      var serviceName = call[0], parameter = call[1], server, path, promise, wsd, cachedJson, wsEventTrigger;

      wsEventTrigger = $.Deferred();

      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get server name");
      app.debug.todo("use getServer() and getService()");
      if (serviceName.indexOf('.') != -1) {
        splittedService = serviceName.split(".");
        server = splittedService[0];
        serviceName = splittedService[1];
      } else {
        server = app.wsc.getDefaultServerName();
      }

      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get webservice path from wsd file");

      wsd = plugin_RestClient.config.webservices[serviceName];
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

      /**
       * generate request or use the cached data
       */

      // event triggering
      app.debug.info("plugin_RestClient - TRIGGER EVENT: " + serviceName);
      $(document).trigger(serviceName, [wsEventTrigger.promise(), parameter]);

      // case: webesrvice is cacheable && webservice is cached
      if ((cachedJson = plugin_RestClient.functions.cacheJson(serviceName, parameter)) && plugin_RestClient.config.webservices[serviceName].cacheable) {
        app.debug.info("plugin_RestClient - CACHED: " + serviceName);
        resultObject[serviceName] = cachedJson;
        promiseArray.push($.Deferred().resolve());
        webserviceNamesArray.push(plugin_RestClient.cachedWebserviceIndentifyer);

        // resolve webservice event
        wsEventTrigger.resolve(cachedJson, parameter);
      }

      // case: webservice request
      else {
        app.debug.info("plugin_RestClient - CALL: " + serviceName);
        promise = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[serviceName].method, plugin_RestClient.config.webservices[serviceName].timeout, async, plugin_RestClient.config.webservices[serviceName].local, server);

        promiseArray.push(promise);
        webserviceNamesArray.push(serviceName);
        webserviceParameterArray.push(parameter);

        promise.done(function() {
          app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + serviceName);
          wsEventTrigger.resolve(arguments);
        }).fail(function() {
          app.debug.info("plugin_RestClient - REJECT TRIGGER EVENT: " + serviceName);
          wsEventTrigger.reject(arguments);
        });
      }

    });
    // alert("promiseArray: " + JSON.stringify(promiseArray));
    // http://stackoverflow.com/questions/4878887/how-do-you-work-with-an-array-of-jquery-deferreds
    // http://stackoverflow.com/questions/5627284/pass-in-an-array-of-deferreds-to-when
    $.when.apply($, promiseArray).then(function() {
      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - all async webservices are done");
      // alert(JSON.stringify([].slice.apply(arguments)));

      var argumentsArray = [].slice.apply(arguments);
      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - add each result to resultObject");

      $.each(webserviceNamesArray, function(key, value) {
        // alert(key + JSON.stringify(value));

        // case: do not for cached webservices
        if (value !== plugin_RestClient.cachedWebserviceIndentifyer) {

          if (plugins.functions.pluginLoaded("MultilanguageIso639_3")) {
            if (argumentsArray[key].language != undefined) {
              $.each(argumentsArray[key].language, function(key, value) {
                app.lang.addParameter(key, value);
              });
            }
          }

          app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - cache webservice");
          plugin_RestClient.functions.cacheJson(value, webserviceParameterArray[key], argumentsArray[key]);

          resultObject[value] = argumentsArray[key];
        }
      });

      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - async webservice call done: " + JSON.stringify(resultObject));
      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - resolve deferred object");
      dfd.resolve(resultObject);
    }, function(error, jqXHR) {

      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - error on or or more async webservices");
      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - async webservice call failed: " + JSON.stringify(error));
      app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - reject deferred object");

      app.debug.info("plugin_RestClient - FAILED: " + error.id);
      dfd.reject(error, jqXHR);
    });

    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - return: deferred promise");
    return dfd.promise();
  },

  functions: {

    /**
     * 
     */
    getWsd: function(serviceName) {
      app.debug.trace("plugin_RestClient.functions.getWsd(" + app.debug.arguments(arguments) + ")");
      return plugin_RestClient.config.webservices[serviceName] || null;
    },

    /**
     * 
     */
    addWsd: function(name, url, method, timeout, cacheable, cacheInMs, local) {
      app.debug.trace("plugin.RestClient.js plugin_RestClient.functions.addWebserviceDefinition(" + app.debug.arguments(arguments) + ")");

      if (typeof url == "object") {
        plugin_RestClient.config.webservices[name] = url;
      }

      else {
        plugin_RestClient.config.webservices[name] = {
          "url": url,
          "method": method,
          "timeout": timeout,
          "cacheable": cacheable,
          "cacheInMs": cacheInMs,
          "local": local
        };
      }

      return true;
    },

    /**
     * 
     */
    deleteWsd: function(name) {
      app.debug.trace("plugin_RestClient.functions.deleteWsd(" + app.debug.arguments(arguments) + ")");
      delete plugin_RestClient.config.webservices[name];
      return true;
    },

    /**
     * 
     */
    addWebserviceDefinition: function(name, url, method, timeout, cacheable, cacheInMs, local) {
      console.error("Depecated function!! use app.rc.addWsd(name, url, method, timeout, cacheable, cacheInMs, local)")

    },

    /**
     * 
     */
    addWebserviceDefinitionFile: function(path) {
      app.debug.debug("plugin_RestClient.functions.addWebserviceDefinitionFile(" + app.debug.arguments(arguments) + ")");
      plugin_RestClient.loadDefinitionFile(path);
    },

    /**
     * 
     */
    removeCache: function(serviceName, parameter) {
      app.debug.trace("plugin_RestClient.functions.removeCache(" + app.debug.arguments(arguments) + ")");
      app.store.localStorage.removeObject(plugin_RestClient.cachedWebserviceIndentifyer + serviceName);
      return true;
    },

    /**
     * 
     */
    clearCache: function(serviceName, parameter) {
      app.debug.trace("plugin_RestClient.functions.removeCache(" + app.debug.arguments(arguments) + ")");
      app.store.localStorage.removeItem(plugin_RestClient.cachedWebserviceIndentifyer + "*");
      return true;
    },

    /**
     * 
     */
    cacheJson: function(serviceName, parameter, data) {
      app.debug.trace("plugin_RestClient.functions.cacheJson(" + app.debug.arguments(arguments) + ")");
      app.debug.validate(_);
      var cachedWs, wsd, uniqueWsIdentifyer;

      wsd = app.rc.getWsd(serviceName);
      uniqueWsIdentifyer = (serviceName + JSON.stringify(parameter)).hashCode();

      if (wsd.cacheable) {
        app.debug.debug("plugin_RestClient.functions.cacheJson() - case: webservice is cacheable");
        // store into local storage
        if (data) {
          app.debug.debug("plugin_RestClient.functions.cacheJson() - case: store to local storage");

          cachedWs = {
            servicename: serviceName,
            parameter: parameter,
            cachetimestamp: Date.now(),
            data: JSON.stringify(data)
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
            app.debug.debug("plugin_RestClient.functions.cacheJson() - case: cash time timed out");
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
     * 
     */
    getFullUrl: function(service, parameter) {
      app.debug.trace("plugin_RestClient.functions.getFullUrl(" + app.debug.arguments(arguments) + ")");

      var processedServerName, processedServiceName, processedPath, processedData, wsd, serverUrl, url;

      processedServerName = plugin_RestClient.getServer(service);
      processedServiceName = plugin_RestClient.getService(service);

      wsd = plugin_RestClient.config.webservices[processedServiceName];
      processedPath = plugin_RestClient.getPath(parameter, wsd.url);
      processedData = plugin_RestClient.getData(parameter, wsd.url);

      serverUrl = plugin_WebServiceClient.functions.getServer(processedServerName);

      return serverUrl + processedPath[0] + "?" + processedData[1];

    },

    getJsonWithLoader: function(service, parameter, async, attempts) {
      app.debug.trace("plugin_RestClient.functions.getJsonWithLoader(" + app.debug.arguments(arguments) + ")");
      var result, timeout;

      result = plugin_RestClient.functions.getJson(service, parameter, async, attempts);

      if ($.isFunction(result.promise)) {
        timeout = window.setTimeout(function() {
          var loaderHeadline, loaderText;

          loaderHeadline = "page: " + $("[data-role=page]").attr("id") + " - ";
          loaderText = "page: " + $("[data-role=page]").attr("id") + " - ";

          if (typeof service === "string") {
            loaderHeadline += service + " ";
            loaderText += service + " ";
          }

          else {
            $.each(service, function(index, serviceDefinition) {

              loaderHeadline += serviceDefinition[0] + " ";
              loaderText += serviceDefinition[0] + " ";

            });
          }

          loaderHeadline += "- headline";
          loaderText += "- text";

          app.debug.debug("plugin_RestClient.functions.getJsonWithLoader() - show loader after timeout");
          app.notify.loader.bubbleDiv({
            show: true,
            headline: app.lang.string(loaderHeadline, "webservice with loader"),
            text: app.lang.string(loaderText, "webservice with loader")
          });

          result.always(function() {

            app.debug.debug("plugin_RestClient.functions.getJsonWithLoader() - remove loader");
            app.notify.loader.bubbleDiv({
              show: false
            });

          });

        }, 200);

        result.always(function() {
          app.debug.debug("plugin_RestClient.functions.getJsonWithLoader() - webservice call was fast enough; do not show loader;");
          window.clearTimeout(timeout);
        });
      }

      return result;
    },

    /**
     * 
     */
    getJson: function(service, parameter, async, attempts, dfd) {
      app.debug.trace("plugin_RestClient.functions.getJson(" + app.debug.arguments(arguments) + ")");
      var json, i, promise;

      if (plugins.config.KeepAlive === true && app.alive.isAlive() === true) {
        app.debug.debug("plugin_RestClient.functions.getJson() - case: keepAlive && isAlive");

        // get multible json objects
        if (typeof service == "object") {
          app.debug.debug("plugin_RestClient.functions.getJson() - case: get multible json objects");

          // async = false
          if (parameter == false || parameter == undefined) {
            app.debug.debug("plugin_RestClient.functions.getJson() case: async = false");

            if (!async) async = 1;

            for (i = 0; i < async; i++) {
              app.debug.debug("plugin_RestClient.functions.getJson() - AJAX attempt " + i + " of " + attempts);

              json = plugin_RestClient.getMultipleJson(service, parameter, async);
              if (json != null) return json;
            }
          }

          // async = true
          else if (typeof service == "object" && parameter == true) {
            app.debug.debug("plugin_RestClient.functions.getJson() - case: async = true");

            promise = plugin_RestClient.getMultipleJsonAsync(service, parameter, async);

            if (dfd == null || dfd == undefined) dfd = $.Deferred();

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
        else if (typeof service == "string") {
          app.debug.debug("plugin_RestClient.functions.getJson() - case: get a single json object");

          // async = false
          if ((parameter == undefined || typeof parameter == "object") && (async == undefined || async == false)) {
            app.debug.debug("plugin_RestClient.functions.getJson() - case: async = false");

            if (!attempts) attempts = 1;

            for (i = 0; i < attempts; i++) {
              app.debug.debug("plugin_RestClient.functions.getJson() - AJAX attempt " + i + " of " + attempts);

              json = plugin_RestClient.getSingleJson(service, parameter, async);
              if (json != null) return json;
            }
          }

          // async = true
          else if ((parameter == undefined || typeof parameter == "object") && async == true) {
            app.debug.debug("plugin_RestClient.functions.getJson() - case: async = true");

            promise = plugin_RestClient.getSingleJsonAsync(service, parameter, async);

            if (dfd == null || dfd == undefined) dfd = $.Deferred();

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

      else {
        app.alive.badConnectionHandler();
      }

      // return error
      return null;
    }
  }
};
