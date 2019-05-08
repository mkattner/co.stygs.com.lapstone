// Input 0
'use strict';
var plugin_WebServiceError = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_WebServiceError.pluginsLoaded()");
  var a = $.Deferred(), b = [];
  void 0 == plugin_WebServiceError.config.errorKeys && (app.debug.error("No errorKeys Array in plugin.WebServiceError.json"), a.reject());
  if (app.config.min) {
    a.resolve();
  } else {
    $.each(plugin_WebServiceError.config.wseFiles, function(a, c) {
      b.push(plugin_WebServiceError.loadDefinitionFileAsync(c));
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
  app.debug.trace("plugin_WebServiceError.pagesLoaded()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_WebServiceError.definePluginEvents()");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_WebServiceError.afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_WebServiceError.pageSpecificEvents()");
}, loadDefinitionFileAsync:function(a) {
  app.debug.trace("plugin_WebServiceError.loadDefinitionFileAsync(" + a + ")", 20);
  var b = $.Deferred();
  a = globalLoader.AsyncJsonLoader(a);
  a.done(function(a) {
    $.each(a, function(a, b) {
      app.debug.debug("pugin.WebServiceError.js ~ plugin_WebServiceError.loadDefinitionFileAsync() - add: " + a, 20);
      plugin_WebServiceError.config.wse[a] = b;
    });
    b.resolve();
  });
  a.done(function() {
    b.reject();
  });
  return b.promise();
}, loadDefinitionFile:function(a) {
  app.debug.trace("plugin_WebServiceError.loadDefinitionFile()");
  app.debug.debug("Load definition file: " + a);
  a = globalLoader.JsonLoader(a);
  $.each(a, function(a, c) {
    app.debug.debug("Add definition: " + a, 20);
    plugin_WebServiceError.config.wse[a] = c;
  });
}, functions:{action:function(a) {
  app.debug.trace("plugin_WebServiceError.functions.action()");
}, getErrorName:function(a) {
  app.debug.trace("plugin_WebServiceError.functions.getErrorName()");
  var b = !1;
  "error" === a.statusText && 0 === a.readyState && 0 === a.status ? (app.debug.debug("plugin_WebServiceError.functions.getErrorName() - case: webservice timed out"), b = "timeout") : $.each(plugin_WebServiceError.config.errorKeys, function(c, d) {
    app.debug.debug("plugin_WebServiceError.functions.getErrorName() - look for error key in webservice result: " + d);
    if (a.hasOwnProperty(d) && null !== a[d]) {
      return app.debug.debug("plugin_WebServiceError.functions.getErrorName() - case: webservice result has error key: " + d), b = a[d].toString(), !1;
    }
  });
  return b;
}, getExceptionConfig:function(a) {
  app.debug.trace("plugin_WebServiceError.functions.getExceptionConfig()");
  var b = plugin_WebServiceError.functions.getErrorName(a);
  app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - error name: " + b + " type: " + typeof b);
  if ("string" === typeof b) {
    for (key in app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - errors"), plugin_WebServiceError.config.wse) {
      if (app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - condition: " + key + " \x3d\x3d " + b), key == b) {
        return app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - case: error found"), {id:Math.abs(key.hashCode()), result:a, wse:plugin_WebServiceError.config.wse[key]};
      }
    }
  }
  if ($.isPlainObject(a)) {
    for (key in app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - case: isPlainObject \x3d\x3d true"), app.debug.validate(plugin_WebServiceError.config.strictErrorKeys), plugin_WebServiceError.config.strictErrorKeys) {
      if (errorKey = plugin_WebServiceError.config.strictErrorKeys[key], !0 === a.hasOwnProperty(errorKey)) {
        return app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - case: strict error found: " + errorKey), {id:Math.abs(errorKey.hashCode()), result:a};
      }
    }
  }
  return !1;
}}};
