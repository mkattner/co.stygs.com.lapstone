plugin_RestClient.getMultipleJsonAsync = function(paramService, parameter, async) {
  app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get multible json objects; async = true");
  // the deferred object for the caller
  async = true;

  var dfd = $.Deferred(), promiseArray = [], webwebServiceNamesArray = [], webserviceParameterArray = [], splittedService, resultObject = {};

  app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - generate a ajax call for each webservice");

  $.each(paramService, function(key, call) {

    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - generate single async ajax call");

    var webServiceName = call[0], parameter = call[1], server, path, promise, wsd, cachedJson, wsEventTrigger;

    wsEventTrigger = $.Deferred();

    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get server name");
    // app.debug.todo("use getServer() and getService()");
    // if (webServiceName.indexOf('.') != -1) {
    // splittedService = webServiceName.split(".");
    // server = splittedService[0];
    // webServiceName = splittedService[1];
    // } else {
    // server = app.wsc.getDefaultServerName();
    // }
    //  

    server = plugin_RestClient.getServer(webServiceName);
    webServiceName = plugin_RestClient.getService(webServiceName);

    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get webservice path from wsd file");

    wsd = plugin_RestClient.config.webservices[webServiceName];
    if (wsd) {
      path = wsd.url;
    }

    else {
      app.debug.error("plugin_RestClient.getMultipleJsonAsync() - service not defined: " + webServiceName);
      return dfd.reject();
    }

    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - replace parameters in path");
    path = plugin_RestClient.getPath(parameter, path);

    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - ask for the deferred promise object");

    /**
     * generate request or use the cached data
     */

    // event triggering
    app.debug.info("plugin_RestClient - TRIGGER EVENT: " + webServiceName);
    $(document).trigger(webServiceName, [wsEventTrigger.promise(), parameter]);
    $(document).trigger("webserviceCall", [wsEventTrigger.promise(), webServiceName, parameter]);
    app.debug.webservice(webServiceName);

    // case: webesrvice is cacheable && webservice is cached
    if ((cachedJson = plugin_RestClient.functions.cacheJson(webServiceName, parameter)) && plugin_RestClient.config.webservices[webServiceName].cacheable) {
      app.debug.info("plugin_RestClient - CACHED: " + webServiceName);

      resultObject[webServiceName] = cachedJson;

      promiseArray.push($.Deferred().resolve());
      webwebServiceNamesArray.push(plugin_RestClient.cachedWebserviceIndentifyer);
      webserviceParameterArray.push(parameter);

      // resolve webservice event
      app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + webServiceName);
      wsEventTrigger.resolve(cachedJson, parameter);
    }

    // case: webservice request
    else {
      app.debug.info("plugin_RestClient - CALL: " + webServiceName);
      promise = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[webServiceName].method, plugin_RestClient.config.webservices[webServiceName].timeout, async, plugin_RestClient.config.webservices[webServiceName].local, server);

      promiseArray.push(promise);
      webwebServiceNamesArray.push(webServiceName);
      webserviceParameterArray.push(parameter);

      promise.done(function() {
        app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + webServiceName);
        wsEventTrigger.resolve(arguments);
      }).fail(function() {
        app.debug.info("plugin_RestClient - REJECT TRIGGER EVENT: " + webServiceName);
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

    $.each(webwebServiceNamesArray, function(arrayIndex, value) {
      // alert(key + JSON.stringify(value));

      // case: do not for cached webservices
      if (value !== plugin_RestClient.cachedWebserviceIndentifyer) {

        app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - cache webservice");
        plugin_RestClient.functions.cacheJson(value, webserviceParameterArray[arrayIndex], argumentsArray[arrayIndex]);

        resultObject[value] = argumentsArray[arrayIndex];
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
};