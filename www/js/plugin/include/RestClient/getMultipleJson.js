//# sourceURL=plugin_RestClient.getMultipleJson.js
plugin_RestClient.getMultipleJson = function(paramService, parameter, async) {
  app.debug.debug("plugin_RestClient.getMultipleJson() - get multible json objects; async = false");

  var jsonObject = {};

  app.debug.debug("plugin_RestClient.getMultipleJson() - generate ajax call for each webservice");

  $.each(paramService, function(key, call) {

    var webServiceName = call[0], parameter = call[1], server, path, json, splittedService, wsd, cachedJson, wsEventTrigger;

    wsEventTrigger = $.Deferred();

    app.debug.debug("plugin_RestClient.getMultipleJson() - get server name");
    // app.debug.todo("use getServer() and getService()");
    // if (webServiceName.indexOf('.') != -1) {
    // splittedService = webServiceName.split(".");
    // server = splittedService[0];
    // webServiceName = splittedService[1];
    // } else {
    // server = app.wsc.getDefaultServerName();
    // }

//    server = plugin_RestClient.getServer(webServiceName);
//    webServiceName = plugin_RestClient.getService(webServiceName);

    // set async to false (in each case)
    async = false;

    app.debug.debug("plugin_RestClient.getMultipleJson() - get webservice path from wsd file");
    wsd = app.rc.getWsd(webServiceName);
    app.rc.mergeWsdWithParameters(wsd, parameter);

    // app.debug.debug("plugin_RestClient.getMultipleJson() - replace parameters in path");
    // path = plugin_RestClient.getPath(parameter, path);

    // event triggering
    app.debug.info("plugin_RestClient - TRIGGER EVENT: " + webServiceName);
    $(document).trigger(webServiceName, [wsEventTrigger.promise(), wsd.parameters]);
    $(document).trigger("webserviceCall", [wsEventTrigger.promise(), webServiceName, wsd]);
    app.debug.webservice(webServiceName);

    
    if ((json = plugin_RestClient.functions.cacheJson(webServiceName, parameter)) && plugin_RestClient.config.webservices[webServiceName].cacheable) {
      app.debug.info("plugin_RestClient - CACHED: " + webServiceName);

      app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + webServiceName);
      wsEventTrigger.resolve(json);
    }

    // case: webservice request
    else {
      app.debug.debug("plugin_RestClient.getMultipleJson() -  ask for the json file");
      app.debug.info("plugin_RestClient - CALL: " + webServiceName);
      json = app.wsc.getJson(wsd, wsd.parameters, async);

      app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + webServiceName);
      wsEventTrigger.resolve(json);

    }

    app.debug.debug("plugin_RestClient.getMultipleJson() - add language wildcards wich could be defined in webservice response");

    plugin_RestClient.functions.cacheJson(webServiceName, parameter, json);
    app.debug.debug("plugin_RestClient.getMultipleJson() - add result to resultObject");
    jsonObject[webServiceName] = json;
  });

  return jsonObject;
};