// Input 0
'use strict';
plugin_RestClient.getSingleJson = function(a, b, e) {
  app.debug.debug("plugin_RestClient.getSingleJson() - get a single json object; async \x3d false");
  var d = $.Deferred();
  app.debug.debug("plugin_RestClient.getSingleJson() - get server name");
  var c = app.rc.getWsd(a);
  app.rc.mergeWsdWithParameters(c, b);
  e = !1;
  app.debug.info("plugin_RestClient - TRIGGER EVENT: " + a);
  $(document).trigger(a, [d.promise(), c.parameters]);
  $(document).trigger("webserviceCall", [d.promise(), a, c]);
  app.debug.webservice(a);
  (b = plugin_RestClient.functions.cacheJson(a, c.parameters)) && plugin_RestClient.config.webservices[a].cacheable ? (app.debug.info("plugin_RestClient - CACHED: " + a), app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + a), d.resolve(b)) : (app.debug.info("plugin_RestClient - CALL: " + a), b = app.wsc.getJson(c, c.parameters, e));
  plugin_RestClient.functions.cacheJson(a, c.parameters, b);
  app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + a);
  d.resolve(b);
  return b;
};
