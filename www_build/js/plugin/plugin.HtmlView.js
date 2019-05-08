// Input 0
'use strict';
var plugin_HtmlView = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace(this.config.name + ".pluginsLoaded()");
  var a = $.Deferred();
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
  $(document).on("pagecontainerbeforetransition", function(a, b) {
    app.debug.event(a);
    a = b.toPage.attr("id");
    var c = plugin_HtmlView.config.multilanguageContext;
    a = app.lang.string(app.config.title, c) + " - " + app.lang.string(a, c);
    b.toPage.attr("data-title", a);
  });
}, functions:{page:{width:function(a, c) {
  var b = parseInt($("div[data-role\x3dpage]").css("width"));
  return b > c ? c : b < a ? a : b;
}, height:function(a, c) {
  a = parseInt($("div[data-role\x3dpage]").css("height"));
  return a > c ? c : a;
}}, content:{width:function(a, c) {
  var b = parseInt($("div[data-role\x3dcontent]").css("width"));
  return b > c ? c : b < a ? a : b;
}, height:function(a, c) {
  var b = parseInt($("div[data-role\x3dcontent]").css("height"));
  return b > c ? c : b < a ? a : b;
}}, window:{width:function(a, c) {
  var b = parseInt($(window).width());
  return b > c ? c : b < a ? a : b;
}, height:function(a, c) {
  var b = parseInt($(window).height());
  return b > c ? c : b < a ? a : b;
}}}};
