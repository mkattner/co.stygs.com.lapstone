// Input 0
'use strict';
app.func("request", function(a) {
  var b = $.Deferred();
  a.url = a.url.replace(app.wsc.getServer(a.server), "").substring(1).replaceAll("/", "_") + ".json";
  switch(a.method.toLowerCase()) {
    case "get":
      app.debug.info("DemoServer - load demo web service: " + a.url);
      lapstone.globalLoader.AsyncJsonLoader("../files/demo/ws/" + a.url).done(function(a) {
        b.resolve(a);
      }).fail(function(a) {
        b.reject($.extend(!0, {error:"demoServerError"}, a));
      });
      break;
    case "post":
      app.debug.info("DemoServer - load demo web service: " + a.url);
      lapstone.globalLoader.AsyncJsonLoader("../files/demo/ws/" + a.url).done(function(a) {
        b.resolve(a);
      }).fail(function(a) {
        b.reject($.extend(!0, {error:"demoServerError"}, a));
      });
      break;
    default:
      b.reject({error:"unimplemented: " + a.method});
  }
  return b.promise();
}, plugin_DemoServer.functions);
