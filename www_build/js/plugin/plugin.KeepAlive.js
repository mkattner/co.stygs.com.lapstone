// Input 0
'use strict';
var plugin_KeepAlive = {config:null, interval:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace(this.config.name + ".pluginsLoaded()");
  app.debug.debug("plugin_KeepAlive.pluginsLoaded() - try first keep alive");
  var a = $.Deferred();
  plugin_KeepAlive.config.useKeepAlive && (app.debug.debug("plugin_KeepAlive.pluginsLoaded() case: plugin_KeepAlive.config.useKeepAlive \x3d\x3d true"), app.debug.debug("plugin_KeepAlive.pluginsLoaded() call: plugin_KeepAlive.keepAliveRequest() to make a first keepAlive request"), plugin_KeepAlive.keepAliveRequest(), app.debug.debug("plugin_KeepAlive.pluginsLoaded() initialize the keepAlive interval: plugin_KeepAlive.interval "), plugin_KeepAlive.interval = window.setInterval("plugin_KeepAlive.keepAliveRequest()", 
  1000 * plugin_KeepAlive.config.intervalInS));
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".pageSpecificEvents()");
}, eventTriggering:function() {
  app.debug.trace("plugin_KeepAlive.eventTriggering()");
  plugin_KeepAlive.config.isAlive ? plugin_KeepAlive.config.isAlive && ($("[data-role\x3dpage]").trigger("connectionisalive"), $(window).trigger("connectionisalive")) : ($("[data-role\x3dpage]").trigger("connectionisdead"), $(window).trigger("connectionisdead"));
}, ajaxSuccess:function(a, c, b) {
  app.debug.trace("plugin_KeepAlive.ajaxSuccess()");
  a = Date.now() - plugin_KeepAlive.startTime;
  a >= plugin_KeepAlive.config.maximumResponseTime ? (app.persist.setPluginConfiguration("KeepAlive", "lastDuration", a), app.persist.setPluginConfiguration("KeepAlive", "isAlive", !1), app.persist.setPluginConfiguration("KeepAlive", "error.code", 2), app.persist.setPluginConfiguration("KeepAlive", "error.text", "Timeout error")) : (app.persist.setPluginConfiguration("KeepAlive", "lastDuration", a), app.persist.setPluginConfiguration("KeepAlive", "isAlive", !0), app.persist.setPluginConfiguration("KeepAlive", 
  "error.code", 0), app.persist.setPluginConfiguration("KeepAlive", "error.text", "No error"));
  app.debug.warn(JSON.stringify(app.persist.getPluginConfiguration("KeepAlive")));
  plugin_KeepAlive.eventTriggering();
}, ajaxError:function(a, c, b) {
  app.debug.trace("plugin_KeepAlive.ajaxError()");
  a = Date.now() - plugin_KeepAlive.startTime;
  app.persist.setPluginConfiguration("KeepAlive", "lastDuration", a);
  app.persist.setPluginConfiguration("KeepAlive", "isAlive", !1);
  app.persist.setPluginConfiguration("KeepAlive", "error.code", 1);
  app.persist.setPluginConfiguration("KeepAlive", "error.text", "Webservice Error");
  app.debug.debug("plugin_KeepAlive.ajaxSuccess() - KeepAlive request failed: " + plugin_KeepAlive.config.error.text + "\nTime: " + a + "\n\n" + JSON.stringify(b, null, 4), 60);
  plugin_KeepAlive.eventTriggering();
}, ajax:function(a, c, b, d, e) {
  app.debug.trace("plugin.KeepAlive.js plugin_KeepAlive.ajax(" + a + ", " + c + ", " + b + ", " + d + ", " + e + ")");
  try {
    return $.ajax({cache:!1, url:a, data:c, dataType:b, async:!0, method:d, timeout:e, success:plugin_KeepAlive.ajaxSuccess, error:plugin_KeepAlive.ajaxError});
  } catch (f) {
    alert("Fatal exception!\n\n" + JSON.stringify(f, null, 4)), app.debug.log(JSON.stringify(f, null, 4));
  }
}, keepAliveRequest:function() {
  app.debug.trace("plugin_KeepAlive.keepAliveRequest()");
  var a = plugin_KeepAlive.config.path;
  var c = plugin_KeepAlive.config.method;
  var b = plugin_KeepAlive.config.timeout;
  try {
    var d = plugin_WebServiceClient.functions.getServer(plugin_KeepAlive.config.server, !1);
  } catch (e) {
    return;
  }
  a = d.pathCombine(a);
  switch(plugin_KeepAlive.config.type) {
    case "json":
      return plugin_KeepAlive.startTime = Date.now(), plugin_KeepAlive.ajax(a, "", "json", c, b);
    case "xml":
      alert("still not implemented");
      break;
    case "text":
      alert("still not implemented");
      break;
    case "html":
      alert("still not implemented");
      break;
    default:
      alert("keepAliveRequest: no such type: " + plugin_KeepAlive.config.type);
  }
}, functions:{request:function() {
  return plugin_KeepAlive.keepAliveRequest();
}, isAlive:function() {
  return !1 === plugin_KeepAlive.config.useKeepAlive ? !0 : plugin_KeepAlive.config.isAlive;
}, badConnectionHandler:function() {
  app.nav.redirect(app.config.badConnectionPage, "none");
}}};
