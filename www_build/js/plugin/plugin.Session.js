// Input 0
'use strict';
var plugin_Session = {config:null, glabalSessionIdentifyer:"globalsession", sessionIndentifyer:"_t_lapstonesession_", constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace(this.config.name + ".pluginsLoaded()", 11);
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()", 11);
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()", 11);
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 11);
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".pageSpecificEvents()", 11);
}, getPrefix:function(a) {
  void 0 == a && (a = plugin_Session.glabalSessionIdentifyer);
  return a + "_";
}, functions:{loggedIn:function(a) {
  app.debug.trace("plugin_Session.functions.loggedIn(" + app.debug.arguments(arguments) + ")");
  app.debug.validate(app.sess.config.loggedIn, "boolean");
  var b = app.sess.config.loggedIn;
  if (void 0 == a) {
    return app.debug.debug("plugin_Session.functions.loggedIn(" + a + ") - case: value \x3d\x3d undefined"), app.debug.debug("plugin_Session.functions.loggedIn() - return: " + b), null === b || !1 === b ? !1 : !0;
  }
  if ("boolean" == typeof a) {
    return app.debug.debug("plugin_Session.functions.loggedIn(" + a + ") - case: typeof value \x3d\x3d boolean"), app.debug.debug("plugin_Session.functions.loggedIn() - set loged in to: " + a), app.persist.setPluginConfiguration("Session", "loggedIn", a), 0 == a && app.debug.trace("plugin_Session.functions.loggedIn() - case: value \x3d\x3d false"), app.debug.trace("plugin_Session.functions.loggedIn() - return: " + a), a;
  }
  app.debug.trace("plugin_Session.functions.loggedIn() - return: null");
  return null;
}, setValue:function(a, b, c) {
  app.debug.trace("plugin_Session.functions.setValue(" + app.debug.arguments(arguments) + ")");
  c = plugin_Session.getPrefix(c);
  app.debug.trace("plugin_Session.functions.setValue(" + a + ", " + b + ")");
  app.store.localStorage.set(plugin_Session.sessionIndentifyer + c + a, b);
}, getValue:function(a, b) {
  app.debug.trace("plugin_Session.functions.getValue(" + app.debug.arguments(arguments) + ")");
  b = plugin_Session.getPrefix(b);
  app.debug.trace("plugin_Session.functions.getValue(" + a + ")");
  return app.store.localStorage.get(plugin_Session.sessionIndentifyer + b + a);
}, destroy:function(a) {
  app.debug.trace("plugin_Session.functions.destroy(" + app.debug.arguments(arguments) + ")");
  a = plugin_Session.getPrefix(a);
  app.debug.trace("plugin_Session.functions.destroy()");
  app.store.localStorage.removeItem(plugin_Session.sessionIndentifyer + a + "*");
}, destroyAll:function() {
  app.debug.trace("plugin_Session.functions.destroyAll(" + app.debug.arguments(arguments) + ")");
  app.store.localStorage.removeItem(plugin_Session.sessionIndentifyer + "*");
  console.log("TODO - implement");
}, setObject:function(a, b, c) {
  app.debug.trace("plugin_Session.functions.setObject(" + app.debug.arguments(arguments) + ")");
  c = plugin_Session.getPrefix(c);
  a = (c + a).split(".").join("-");
  app.store.localStorage.removeObject(plugin_Session.sessionIndentifyer + c + a);
  app.store.localStorage.setObject(plugin_Session.sessionIndentifyer + c + a, b);
}, getObject:function(a, b) {
  app.debug.trace("plugin_Session.functions.getObject(" + app.debug.arguments(arguments) + ")");
  b = plugin_Session.getPrefix(b);
  a = (b + a).split(".").join("-");
  return app.store.localStorage.getObject(plugin_Session.sessionIndentifyer + b + a);
}}};
