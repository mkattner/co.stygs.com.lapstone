// Input 0
'use strict';
var plugin_Informator = {config:null, configurationPrefix:"informator-config", constructor:function() {
  var a = $.Deferred();
  plugin_Informator.config.excludedPlugins.push("HtmlTemplates");
  plugin_Informator.config.excludedPlugins.push("RestClient");
  plugin_Informator.config.excludedPlugins.push("ImageProvider");
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_Informator.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  null === app.store.localStorage.get("informator-first-use") ? app.store.localStorage.set("informator-first-use", !0) : !0 === app.store.localStorage.get("informator-first-use") && app.store.localStorage.set("informator-first-use", !1);
  if (this.config.useHtml5Storage && this.config.savePluginConfig) {
    app.debug.debug("plugin_Informator.pluginsLoaded() - case: load plugin config from html5 storage");
    var b = {};
    $.each(app.plugins.pluginNames, function(a, c) {
      -1 == plugin_Informator.config.excludedPlugins.indexOf(c) && (void 0 == b["plugin_" + c] && (b["plugin_" + c] = {}), b["plugin_" + c].config = window["plugin_" + c].config);
    });
    this.syncObjectWithHtml5Storage(b);
  }
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_Informator.pagesLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  if (this.config.useHtml5Storage && this.config.savePageConfig) {
    var b = {};
    $.each(pages.pageNames, function(a, c) {
      void 0 == b["page_" + c] && (b["page_" + c] = {});
      b["page_" + c].config = globalLoader.JsonLoader("../js/page/page." + c + ".json");
    });
    this.syncObjectWithHtml5Storage(b);
  }
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_Informator.definePluginEvents(" + app.debug.arguments(arguments) + ")");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_Informator.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_Informator.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");
}, syncObjectWithHtml5Storage:function(a, b) {
  app.debug.trace("plugin_Informator.syncObjectWithHtml5Storage(" + app.debug.arguments(arguments) + ")");
  app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage()");
  app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - if property is in html5 storage then use this value");
  app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - else use property from json file");
  a && void 0 != a && (void 0 == b && (b = ""), $.each(a, function(a, c) {
    app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - compute  key/value pair");
    if ("object" != typeof c) {
      app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: value !\x3d object");
      var d = plugin_Informator.configurationPrefix + b + "." + a;
      null === app.store.localStorage.get(d) ? (app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: key '" + d + "' doesn't exists in html5 storage"), app.debug.validate(plugin_Informator.config.firstLevelReservedNames), -1 != plugin_Informator.config.firstLevelReservedNames.indexOf(a) ? app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: key '" + d + "' but it's in reserved list") : (app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: key '" + 
      d + "' write in html5 storage"), app.store.localStorage.set(d, c))) : (app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: key '" + d + "' exists in html5 storage"), plugin_Informator.loadValueIntoObject(d));
    } else {
      app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - case: value \x3d\x3d object"), app.debug.debug("plugin_Informator.syncObjectWithHtml5Storage() - go recursive into object"), plugin_Informator.syncObjectWithHtml5Storage(c, b + "." + a);
    }
  }));
}, loadValueIntoObject:function(a) {
  app.debug.trace("plugin_Informator.loadValueIntoObject(" + app.debug.arguments(arguments) + ")");
  var b = app.store.localStorage.get(a);
  a = a.substring(plugin_Informator.configurationPrefix.length + 1);
  0 > a.indexOf("..") ? plugin_HTML5Storage.setDeep(window, a, b) : app.debug.debug('plugin_Informator.loadValueIntoObject() - ".." detected');
}, functions:{set:function(a, b) {
  app.debug.deprecated("Informator will be removed in the future");
  app.debug.trace("plugin_Informator.functions.set(" + app.debug.arguments(arguments) + ")");
  plugin_Informator.config.useHtml5Storage && ("object" === typeof b ? app.store.localStorage.setObject(plugin_Informator.configurationPrefix + "." + a, b) : app.store.localStorage.set(plugin_Informator.configurationPrefix + "." + a, b));
  plugin_HTML5Storage.setDeep(window, a, b);
}, firstUse:function(a) {
  app.debug.deprecated("Informator will be removed in the future");
  app.debug.trace("plugin_Informator.functions.firstUse(" + app.debug.arguments(arguments) + ")");
  if (void 0 == a) {
    return app.debug.debug("plugin_Informator.functions.firstUse(" + a + ") - case: value \x3d\x3d undefined"), app.debug.debug("plugin_Informator.functions.firstUse() - return: " + app.store.localStorage.get("informator-first-use")), null === app.store.localStorage.get("informator-first-use") ? !0 : !0 === app.store.localStorage.get("informator-first-use") ? !0 : !1;
  }
  if ("boolean" == typeof a) {
    return app.debug.debug("plugin_Informator.functions.firstUse(" + a + ") - case: typeof value \x3d\x3d boolean"), app.debug.debug("plugin_Informator.functions.firstUse() - set firstUse to: " + a), app.store.localStorage.set("informator-first-use", a), 0 == a && app.debug.debug("plugin_Informator.functions.firstUse() - case: value \x3d\x3d false"), app.debug.debug("plugin_Informator.functions.firstUse() - return: " + a), a;
  }
  app.debug.debug("plugin_Informator.functions.firstUse() - return: null");
  return null;
}}};
