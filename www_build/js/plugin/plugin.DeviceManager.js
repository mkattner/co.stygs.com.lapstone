// Input 0
'use strict';
var plugin_DeviceManager = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_DeviceManager.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
  var a = [];
  app.debug.validate(plugin_DeviceManager.config.viewport);
  if (app.detect.isMobile()) {
    if (app.detect.mobile.google.Android()) {
      if ($("head").append(plugin_DeviceManager.config.viewport.android), app.config.min) {
        var b = plugin_DeviceManager.config.files.android + ".js";
        var c = plugin_DeviceManager.config.files.android + "." + app.config.version.app + ".css";
      } else {
        b = plugin_DeviceManager.config.files.android + ".js", c = plugin_DeviceManager.config.files.android + ".css";
      }
    } else {
      app.detect.mobile.apple.iOS() ? ($("head").append(plugin_DeviceManager.config.viewport.ios), app.config.min ? (b = plugin_DeviceManager.config.files.ios + ".js", c = plugin_DeviceManager.config.files.ios + "." + app.config.version.app + ".css") : (b = plugin_DeviceManager.config.files.ios + ".js", c = plugin_DeviceManager.config.files.ios + ".css")) : app.detect.mobile.microsoft.Windows() ? ($("head").append(plugin_DeviceManager.config.viewport.windows), app.config.min ? (b = plugin_DeviceManager.config.files.windows + 
      ".js", c = plugin_DeviceManager.config.files.windows + "." + app.config.version.app + ".css") : (b = plugin_DeviceManager.config.files.windows + ".js", c = plugin_DeviceManager.config.files.windows + ".css")) : console.error("Unknown device!");
    }
    b = globalLoader.AsyncScriptLoader(b);
    b.done(function() {
      void 0 == app[plugin_DeviceManager.config.shortname].current ? console.log("app." + plugin_DeviceManager.config.shortname + ".current is undefined") : (void 0 == app[plugin_DeviceManager.config.shortname].current.constructor && console.log("app." + plugin_DeviceManager.config.shortname + ".current.constructor is undefined"), void 0 == app[plugin_DeviceManager.config.shortname].current.afterHtmlInjectedBeforePageComputing && console.log("app." + plugin_DeviceManager.config.shortname + ".current.afterHtmlInjectedBeforePageComputing is undefined"));
      app[plugin_DeviceManager.config.shortname].current.constructor();
    });
    a.push(b);
    a.push(globalLoader.AsyncStyleLoader(c));
    return $.when.apply($, a);
  }
  c = $.Deferred();
  c.resolve();
  return c.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_DeviceManager.pagesLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_DeviceManager.definePluginEvents(" + app.debug.arguments(arguments) + ")");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_DeviceManager.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");
  app.dm.hasOwnProperty("current") && app.dm.current.afterHtmlInjectedBeforePageComputing();
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_DeviceManager.pageSpecificEvents()");
}, functions:{}};
