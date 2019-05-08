// Input 0
'use strict';
var plugin_Persistance = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_Persist.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  $.each(app.plugins.pluginNames, function(a, c) {
    null !== (a = app.sess.getObject(c, plugin_Persistance.config.sessionKey)) && (a = $.extend(!0, app.plugins.getConfigByName(c), a), app.plugins.setConfigByName(c, a));
  });
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_Persist.pagesLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_Persist.definePluginEvents(" + app.debug.arguments(arguments) + ")");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_Persist.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_Persist.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");
}, setDeep:function(a, d, c) {
  a = a || {};
  var b = d.shift();
  0 === d.length ? a[b] = c : (a[b] = a[b] || {}, a[b] = plugin_Persistance.setDeep(a[b], d, c));
  return a;
}, functions:{setPluginConfiguration:function(a, d, c) {
  var b;
  d = d.split(".");
  null === (b = app.sess.getObject(a, plugin_Persistance.config.sessionKey)) && (b = {});
  b = plugin_Persistance.setDeep(b, d, c);
  app.sess.setObject(a, b, plugin_Persistance.config.sessionKey);
  c = $.extend(!0, app.plugins.getConfigByName(a), b);
  app.plugins.setConfigByName(a, c);
}, getPluginConfiguration:function(a) {
  return app.sess.getObject(a, plugin_Persistance.config.sessionKey);
}}};
