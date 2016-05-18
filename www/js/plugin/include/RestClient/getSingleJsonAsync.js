/**
 * 
 */
plugin_RestClient.getSingleJsonAsync = function(paramService, parameter, async) {
  app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get a single json object; async = true;");

  // the deferred object for the caller
  var dfd = $.Deferred(), server, service, path, promise, splittedService, wsd, cachedJson, wsEventTrigger;

  wsEventTrigger = $.Deferred();

  app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get server name");
  // app.debug.todo("use getServer() and getService()");
  // if (paramService.indexOf('.') != -1) {
  // splittedService = paramService.split(".");
  // server = splittedService[0];
  // paramService = splittedService[1];
  // } else {
  // server = app.wsc.getDefaultServerName();
  // }

  server = plugin_RestClient.getServer(paramService);
  service = plugin_RestClient.getService(paramService);

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

  // event triggering
  app.debug.info("plugin_RestClient - TRIGGER EVENT: " + service);
  $(document).trigger(service, [wsEventTrigger.promise(), parameter]);
  $(document).trigger("webserviceCall", [wsEventTrigger.promise(), service, parameter]);
  app.debug.webservice(service);

  // case: webesrvice is cacheable && webservice is cached
  if ((cachedJson = plugin_RestClient.functions.cacheJson(service, parameter)) && plugin_RestClient.config.webservices[service].cacheable) {
    app.debug.info("plugin_RestClient - CACHED: " + service);

    app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + service);
    wsEventTrigger.resolve(cachedJson);

    return dfd.resolve(cachedJson);
  }

  // case: webservice request
  else {
    app.debug.info("plugin_RestClient - CALL: " + service);
    promise = app.wsc.getJson(path[0], path[1], parameter, plugin_RestClient.config.webservices[service].method, plugin_RestClient.config.webservices[service].timeout, async, plugin_RestClient.config.webservices[service].local, server);

    promise.done(function(json) {

      app.debug.debug("plugin_RestClient.getSingleJsonAsync()- Webservice call done: " + JSON.stringify(json));
      plugin_RestClient.functions.cacheJson(paramService, parameter, json);

      app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
      wsEventTrigger.resolve(json);

      dfd.resolve(json);
    });

    promise.fail(function(error, jqXHR) {
      app.debug.debug("plugin_RestClient.getSingleJsonAsync() - Webservice call failed: " + JSON.stringify(error));

      app.debug.info("plugin_RestClient - FAILED: " + error.id);

      dfd.reject(error, jqXHR);

      app.debug.info("plugin_RestClient - REJECT TRIGGER EVENT: " + paramService);
      wsEventTrigger.reject(error, jqXHR);
    });

    return dfd.promise();
  }

  // ask for the json file
  // add language wildcards wich could be defined in webservice
  // response

};