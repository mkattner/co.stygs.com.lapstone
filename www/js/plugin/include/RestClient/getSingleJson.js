//# sourceURL=plugin_RestClient.getSingleJson.js
/**
 * 
 */

plugin_RestClient.getSingleJson = function(paramService, parameter, async) {
  app.debug.debug("plugin_RestClient.getSingleJson() - get a single json object; async = false");

  var server, path, json, splittedService, wsd, cachedJson, wsEventTrigger;

  wsEventTrigger = $.Deferred();

  app.debug.debug("plugin_RestClient.getSingleJson() - get server name");

//  server = plugin_RestClient.getServer(paramService);
//  paramService = plugin_RestClient.getService(paramService);

  // get the path which is defined in wsd file
  wsd = app.rc.getWsd(paramService);
  app.rc.mergeWsdWithParameters(wsd, parameter);

  // set async to false (in each case)
  async = false;

//  // replace the parameters in path string
//  path = plugin_RestClient.getPath(parameter, path);

  // event triggering
  app.debug.info("plugin_RestClient - TRIGGER EVENT: " + paramService);
  $(document).trigger(paramService, [wsEventTrigger.promise(), wsd.parameters]);
  $(document).trigger("webserviceCall", [wsEventTrigger.promise(), paramService, wsd]);
  app.debug.webservice(paramService);

  if ((json = plugin_RestClient.functions.cacheJson(paramService, wsd.parameters)) && plugin_RestClient.config.webservices[paramService].cacheable) {
    app.debug.info("plugin_RestClient - CACHED: " + paramService);

    app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
    wsEventTrigger.resolve(json);
  }

  // case: webservice request
  else {
    // ask for the json file
    app.debug.info("plugin_RestClient - CALL: " + paramService);
    json = app.wsc.getJson(wsd, wsd.parameters, async);

  }

  plugin_RestClient.functions.cacheJson(paramService, wsd.parameters, json);

  app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
  wsEventTrigger.resolve(json);

  return json;
};