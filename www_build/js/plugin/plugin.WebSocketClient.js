// Input 0
'use strict';
var plugin_WebSocketClient = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_WebSocketClient.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_WebSocketClient.pagesLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_WebSocketClient.definePluginEvents(" + app.debug.arguments(arguments) + ")");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_WebSocketClient.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_WebSocketClient.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");
}, functions:{getWebSocket:function(a) {
  if (window.WebSocket) {
    var b = $.Deferred();
    a.serverObject = plugin_WebServiceClient.getPreferedServer(a.server);
    a.url = (a.serverObject.scheme + a.serverObject.scheme_specific_part + a.serverObject.host + ":" + a.serverObject.port + a.serverObject.path).pathCombine(a.url);
    app.debug.validate(app.wsoc.config.demoMode, "boolean");
    if (!0 === app.wsoc.config.demoMode) {
      b = app.demo.socket(Object.assign({}, a));
    } else {
      var c = new WebSocket(a.url);
      c.onopen = function() {
        b.sendMessage = function(a) {
          c.send(a);
        };
      };
      c.onerror = function(a) {
        b.reject(a);
      };
      c.onmessage = function(a) {
        b.notify(JSON.parse(a.data));
      };
      c.onclose = function(a) {
        b.reject(a);
      };
      b.sendMessage = function(a) {
        console.log("not open");
      };
      b.fail(function() {
        try {
          c.close();
        } catch (d) {
          console.log(d);
        }
      });
    }
    return b;
  }
  return null;
}}};
