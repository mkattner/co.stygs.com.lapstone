// Input 0
'use strict';
plugin_RestClient.getSingleJsonAsync = function(a, e, f) {
  app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get a single json object; async \x3d true;");
  var g = $.Deferred();
  var d = $.Deferred();
  app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get server name");
  app.debug.debug("plugin_RestClient.getSingleJsonAsync() server: undefined; service: " + a);
  var b = app.rc.getWsd(a);
  app.rc.mergeWsdWithParameters(b, e);
  app.debug.info("plugin_RestClient - TRIGGER EVENT: " + a);
  $(document).trigger(a, [d.promise(), b.parameters]);
  $(document).trigger("webserviceCall", [d.promise(), a, b]);
  app.debug.webservice(a);
  if ((e = plugin_RestClient.functions.cacheJson(a, b.parameters)) && plugin_RestClient.config.webservices[a].cacheable) {
    return app.debug.info("plugin_RestClient - CACHED: " + a), app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + a), d.resolve(e), g.resolve(e);
  }
  app.debug.info("plugin_RestClient - CALL: " + a);
  f = app.wsc.getJson(b, b.parameters, f);
  f.done(function(c) {
    app.debug.debug("plugin_RestClient.getSingleJsonAsync()- Webservice call done: " + JSON.stringify(c));
    plugin_RestClient.functions.cacheJson(a, b.parameters, c);
    app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + a);
    d.resolve(c);
    g.resolve(c);
  });
  f.fail(function(c, b) {
    app.debug.debug("plugin_RestClient.getSingleJsonAsync() - Webservice call failed: " + JSON.stringify(c));
    app.debug.info("plugin_RestClient - FAILED: " + c.id);
    g.reject(c, b);
    app.debug.info("plugin_RestClient - REJECT TRIGGER EVENT: " + a);
    d.reject(c, b);
  });
  return g.promise();
};
