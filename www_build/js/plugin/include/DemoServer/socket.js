// Input 0
'use strict';
app.func("socket", function(a) {
  var b = $.Deferred();
  a.url = a.url.replace(app.wsc.getServer(a.server), "").replaceAll("/", "_").substring(1);
  b = $.Deferred();
  var c = 0, d = function() {
    app.debug.info("DemoServer - load demo web socket: " + a.url);
    lapstone.globalLoader.AsyncJsonLoader("../files/demo/socket/" + a.url + "/" + c + ".json", 1).done(function(a) {
      b.notify(a);
      c++;
    }).fail(function() {
      c = 0;
    });
  };
  d();
  var e = window.setInterval(d, 1000);
  b.always(function() {
    app.debug.app("clear interval");
    window.clearInterval(e);
  });
  return b;
}, plugin_DemoServer.functions);
