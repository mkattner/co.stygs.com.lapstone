// Input 0
'use strict';
plugin_RestClient.getMultipleJsonAsync = function(m, n, l) {
  app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get multible json objects; async \x3d true");
  l = !0;
  var f = $.Deferred(), g = [], h = [], k = [], e = {};
  app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - generate a ajax call for each webservice");
  $.each(m, function(b, c) {
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - generate single async ajax call");
    var a = c[0];
    c = c[1];
    var d = $.Deferred();
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get server name");
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - get webservice path from wsd file");
    b = app.rc.getWsd(a);
    app.rc.mergeWsdWithParameters(b, c);
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - ask for the deferred promise object");
    app.debug.info("plugin_RestClient - TRIGGER EVENT: " + a);
    $(document).trigger(a, [d.promise(), b.parameters]);
    $(document).trigger("webserviceCall", [d.promise(), a, b]);
    app.debug.webservice(a);
    (c = plugin_RestClient.functions.cacheJson(a, b.parameters)) && plugin_RestClient.config.webservices[a].cacheable ? (app.debug.info("plugin_RestClient - CACHED: " + a), e[a] = c, g.push($.Deferred().resolve()), h.push(plugin_RestClient.cachedWebserviceIndentifyer), k.push(b.parameters), app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + a), d.resolve(c, b.parameters)) : (app.debug.info("plugin_RestClient - CALL: " + a), c = app.wsc.getJson(b, b.parameters, l), g.push(c), h.push(a), 
    k.push(b.parameters), c.done(function() {
      app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + a);
      d.resolve(arguments);
    }).fail(function() {
      app.debug.info("plugin_RestClient - REJECT TRIGGER EVENT: " + a);
      d.reject(arguments);
    }));
  });
  $.when.apply($, g).then(function() {
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - all async webservices are done");
    var b = [].slice.apply(arguments);
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - add each result to resultObject");
    $.each(h, function(c, a) {
      a !== plugin_RestClient.cachedWebserviceIndentifyer && (app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - cache webservice"), plugin_RestClient.functions.cacheJson(a, k[c], b[c]), e[a] = b[c]);
    });
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - async webservice call done: " + JSON.stringify(e));
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - resolve deferred object");
    f.resolve(e);
  }, function(b, c) {
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - error on or or more async webservices");
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - async webservice call failed: " + JSON.stringify(b));
    app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - reject deferred object");
    app.debug.info("plugin_RestClient - FAILED: " + b.id);
    f.reject(b, c);
  });
  app.debug.debug("plugin_RestClient.getMultipleJsonAsync() - return: deferred promise");
  return f.promise();
};
