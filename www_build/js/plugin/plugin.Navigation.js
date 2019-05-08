// Input 0
'use strict';
var plugin_Navigation = {config:null, history:[], lastTransition:"none", constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace(this.config.name + ".pluginsLoaded()");
  var a = $.Deferred();
  app.debug.debug("plugin_Navigation.pluginsLoaded() - add current pageid to config (fist load)");
  plugin_Navigation.config.currentPageId = "#" + $("div[data-role\x3dpage]").attr("id");
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()");
  $("body").on("pagecontainerload", function(a, b) {
    app.debug.event(a);
    app.debug.debug("plugin_Navigation.definePluginEvents() - change current pageid in config");
    plugin_Navigation.config.currentPageId = "#" + b.toPage.attr("id");
  });
  $("body").on("pagecontainerbeforetransition", function(a, b) {
    app.debug.event(a);
    0 < plugin_Navigation.history.length ? plugin_Navigation.history[plugin_Navigation.history.length - 1].page != b.toPage.attr("id") && plugin_Navigation.history.push({page:b.toPage.attr("id"), transition:b.options.transition}) : plugin_Navigation.history.push({page:b.toPage.attr("id"), transition:b.options.transition});
  });
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".pageSpecificEvents()");
}, functions:{redirect:function(a, b, c) {
  app.debug.trace("plugin_Navigation.functions.redirect()");
  void 0 != b && !0 === app.config.jQueryMobile && !0 === app.config.lapstone ? setTimeout(function() {
    $("body").pagecontainer("change", a, {transition:b, reverse:void 0 == c ? !1 : c});
  }, 50) : $(location).attr("href", a);
}, virtual:function(a) {
  app.debug.validate(pages.config.virtual);
}, back:function(a) {
  app.debug.trace("plugin_Navigation.functions.back()");
  if (1 < plugin_Navigation.history.length) {
    app.debug.debug("plugin_Navigation.functions.back() - application has history");
    var b = plugin_Navigation.history.pop();
    app.debug.debug("plugin_Navigation.functions.back() - current page: " + JSON.stringify(b));
    a = plugin_Navigation.history[plugin_Navigation.history.length - 1];
    app.debug.debug("plugin_Navigation.functions.back() - last page: " + JSON.stringify(a));
    this.redirect(a.page + ".html", b.transition, !0);
  } else {
    window.history.back();
  }
}, start:function(a) {
  a = a || "none";
  !0 === app.info.firstUse() ? app.nav.redirect(app.config.startPage_firstStart, a) : app.sess.loggedIn() ? app.nav.redirect(app.config.startPage_loggedIn, a) : app.nav.redirect(app.config.startPage, a);
}, forward:function() {
  app.debug.trace("plugin_Navigation.functions.forward()");
  window.history.forward();
}, reload:function() {
  app.debug.trace("plugin_Navigation.functions.reload()");
}, refresh:function() {
  app.debug.trace("plugin_Navigation.functions.refresh()");
  $("div[data-role\x3dpage]").remove();
  jQuery.mobile.changePage(window.location.href, {allowSamePageTransition:!0, transition:"none", reloadPage:!0});
}, redirectAndReload:function(a) {
  app.debug.trace("plugin_Navigation.functions.redirectAndReload()");
  $.mobile.ajaxEnabled = !1;
  window.location.replace(a);
}, normalizeUrl:function(a) {
  app.debug.trace("plugin_Navigation.functions.normalizeUrl()");
  a = URI(a);
  "" === a.protocol() && a.protocol("http");
  return a.toString();
}, openWindow:function(a, b, c, d) {
  return window.cordova && window.cordova.InAppBrowser ? window.cordova.InAppBrowser.open(a, traget) : window.open(a, "material" + Math.floor(1000 * Math.random() + 1), d);
}}};
