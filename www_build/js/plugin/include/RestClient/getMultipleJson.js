// Input 0
'use strict';
plugin_RestClient.getMultipleJson = function(g, h, e) {
  app.debug.debug("plugin_RestClient.getMultipleJson() - get multible json objects; async \x3d false");
  var f = {};
  app.debug.debug("plugin_RestClient.getMultipleJson() - generate ajax call for each webservice");
  $.each(g, function(a, b) {
    a = b[0];
    var c = b[1];
    var d = $.Deferred();
    app.debug.debug("plugin_RestClient.getMultipleJson() - get server name");
    e = !1;
    app.debug.debug("plugin_RestClient.getMultipleJson() - get webservice path from wsd file");
    b = app.rc.getWsd(a);
    app.rc.mergeWsdWithParameters(b, c);
    app.debug.info("plugin_RestClient - TRIGGER EVENT: " + a);
    $(document).trigger(a, [d.promise(), b.parameters]);
    $(document).trigger("webserviceCall", [d.promise(), a, b]);
    app.debug.webservice(a);
    (c = plugin_RestClient.functions.cacheJson(a, b.parameters)) && plugin_RestClient.config.webservices[a].cacheable ? app.debug.info("plugin_RestClient - CACHED: " + a) : (app.debug.debug("plugin_RestClient.getMultipleJson() -  ask for the json file"), app.debug.info("plugin_RestClient - CALL: " + a), c = app.wsc.getJson(b, b.parameters, e));
    app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + a);
    d.resolve(c);
    app.debug.debug("plugin_RestClient.getMultipleJson() - add language wildcards wich could be defined in webservice response");
    plugin_RestClient.functions.cacheJson(a, b.parameters, c);
    app.debug.debug("plugin_RestClient.getMultipleJson() - add result to resultObject");
    f[a] = c;
  });
  return f;
};
