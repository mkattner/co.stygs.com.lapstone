// Input 0
'use strict';
var plugin_Feedback = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_Feedback.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  app.rc.addWebservice(plugin_Feedback.config.webserviceName, plugin_Feedback.config.webserviceDefinition);
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_Feedback.pagesLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_Feedback.definePluginEvents(" + app.debug.arguments(arguments) + ")");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_Feedback.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_Feedback.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");
}, functions:{send:function(a) {
  window.setTimeout(function() {
    !0 === plugin_Feedback.config.allowAnonymousFeedback && app.rc.getJson(plugin_Feedback.config.webserviceName, {feedback:a}, !0, 1);
  }, 10);
}}};
