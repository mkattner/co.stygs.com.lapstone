/**
 * 
 */

plugin_RestClient.getSingleJson = function(paramService, parameter, async) {
  app.debug.debug("plugin_RestClient.getSingleJson() - get a single json object; async = false");

  var server, path, json, splittedService, wsd, cachedJson, wsEventTrigger;

  wsEventTrigger = $.Deferred();

  app.debug.debug("plugin_RestClient.getSingleJson() - get server name");

  server = plugin_RestClient.getServer(paramService);
  paramService = plugin_RestClient.getService(paramService);

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
  $(document).trigger("webserviceCall", [wsEventTrigger.promise(), paramService, parameter]);
  app.debug.webservice(paramService);

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

  plugin_RestClient.functions.cacheJson(paramService, parameter, json);

  app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
  wsEventTrigger.resolve(json);

  return json;
};