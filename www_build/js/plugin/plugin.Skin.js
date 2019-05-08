// Input 0
'use strict';
var plugin_Skin = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_Skin.pluginsLoaded()");
  var a = $.Deferred(), b = [];
  if (plugin_Skin.config.useSkinPlugin) {
    app.config.min ? b.push(app.load.css("../css/skin/" + plugin_Skin.config.defaultSkin + "/all.skin." + plugin_Skin.config.defaultSkin + "." + app.config.version.app + ".css")) : $.each(plugin_Skin.config.skins[plugin_Skin.config.defaultSkin], function(a, c) {
      app.debug.debug("plugin_Skin.pluginsLoaded() - Load less: " + c);
      b.push(app.load.less(c));
    });
    var d = $.when.apply($, b);
    d.done(function() {
      app.debug.debug("plugin_Skin.pluginsLoaded() - loading css files done");
      a.resolve();
    }).fail(function() {
      app.debug.debug("plugin_Skin.pluginsLoaded() - loading css files failes");
      a.reject();
    });
    return a.promise();
  }
  return a.resolve();
}, pagesLoaded:function() {
  app.debug.trace("plugin_Skin.pagesLoaded()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_Skin.definePluginEvents()");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_Skin.afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_Skin.pageSpecificEvents()");
}, functions:{changeSkin:function(a) {
  app.debug.trace("plugin_Skin.functions.change()");
  return this.skinAvailable(a) ? (app.persist.setPluginConfiguration("Skin", "defaultSkin", a), !0) : !1;
}, skinAvailable:function(a) {
  app.debug.trace("plugin_Skin.functions.skinAvailable()");
  if (-1 != this.getAvailableSkins().indexOf(a)) {
    return app.debug.debug("plugin_Skin.functions.skinAvailable() - skin available: " + a), !0;
  }
  app.debug.trace("plugin_Skin.functions.skinAvailable() - skin not available: " + a);
  return !1;
}, getAvailableSkins:function() {
  app.debug.trace("plugin_Skin.functions.getAvailableSkins()");
  return Object.keys(plugin_Skin.config.skins);
}, getCurrentSkin:function() {
  app.debug.trace("plugin_Skin.functions.gatAvailableSkins()");
  return plugin_Skin.config.defaultSkin;
}}};
