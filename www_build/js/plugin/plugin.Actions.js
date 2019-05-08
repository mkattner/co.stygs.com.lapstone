// Input 0
'use strict';
var plugin_Actions = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_Actions.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
  app.debug.validate(app.actions.config.actions.includes("alert.js"));
  app.debug.validate(app.actions.config.actions.includes("confirm.js"));
  app.debug.validate(app.actions.config.actions.includes("login.js"));
  app.debug.validate(app.actions.config.actions.includes("logout.js"));
  app.debug.validate(app.actions.config.actions.includes("loginObligate.js"));
  var a = $.Deferred();
  var b = [];
  if (app.config.min) {
    a.resolve();
  } else {
    $.each(plugin_Actions.config.actions, function(a, c) {
      b.push(globalLoader.AsyncScriptLoader("../files/actions/" + c));
    });
    var c = $.when.apply($, b);
    c.done(function() {
      a.resolve();
    });
    c.fail(function() {
      a.reject();
    });
  }
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_Actions.pagesLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_Actions.definePluginEvents(" + app.debug.arguments(arguments) + ")");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_Actions.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_Actions.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");
}, functions:{registerAction:function(a, b) {
  plugin_Actions.functions[a] = b;
}}};
