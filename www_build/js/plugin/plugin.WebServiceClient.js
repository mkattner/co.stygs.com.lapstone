// Input 0
'use strict';
var plugin_WebServiceClient = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("" + this.config.name + ".pluginsLoaded()");
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
  app.debug.trace("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("Plugin: " + this.config.name + ".pageSpecificEvents()");
}, getPreferedServer:function(a) {
  app.debug.validate(plugin_WebServiceClient.config.server[a].endpoints, "array", "The server endpoints are defined in an array. Please have a look to the configuration template: https://github.com/mkattner/co.stygs.com.lapstone/blob/master/www/js/plugin/plugin.WebServiceClient.json");
  return plugin_WebServiceClient.config.server[a].endpoints[0];
}, setPreferedServer:function(a) {
  app.debug.trace("plugin_WebServiceClient.setPreferedServer() ... mehrere server implementieren");
  $.each(plugin_WebServiceClient.config.server, function(a, c) {
    !0 === c.active && (void 0 == plugin_WebServiceClient.config.preferedServer && app.info.set("plugin_WebServiceClient.config.preferedServer", {}), app.info.set("plugin_WebServiceClient.config.preferedServer." + a, {}), app.info.set("plugin_WebServiceClient.config.preferedServer." + a + ".scheme", c.first.scheme), app.info.set("plugin_WebServiceClient.config.preferedServer." + a + ".scheme_specific_part", c.first.scheme_specific_part), app.info.set("plugin_WebServiceClient.config.preferedServer." + 
    a + ".host", c.first.host), app.info.set("plugin_WebServiceClient.config.preferedServer." + a + ".port", c.first.port), app.info.set("plugin_WebServiceClient.config.preferedServer." + a + ".path", c.first.path));
  });
}, getAjax:function(a, b, c) {
  var e = null, d = null;
  b = !0;
  c && (app.debug.debug("plugin_WebServiceClient.getAjax() - case: webservice is async - create deferred object"), d = $.Deferred(), e = d.promise());
  a.serverObject = plugin_WebServiceClient.getPreferedServer(a.server);
  app.debug.validate(a.serverObject, "object");
  $.each(a.parameters, function(b, c) {
    0 < a.url.occurences("{" + b + "}") && (a.url = a.url.replaceAll("{" + b + "}", c), delete a.parameters[b]);
  });
  a.url = (a.serverObject.scheme + a.serverObject.scheme_specific_part + a.serverObject.host + ":" + a.serverObject.port + a.serverObject.path).pathCombine(a.url);
  0 === a.dataType.length && (a.dataType = plugin_WebServiceClient.config.server[a.server].mappings[a.method.toLowerCase()]);
  switch(a.dataType.split(";")[0]) {
    case "application/json":
      app.debug.trace("plugin_WebServiceClient.getAjax() - dataType: application/json");
      a.dataType = "json";
      break;
    default:
      return app.debug.fatal("plugin_WebServiceClient.getAjax() - unknown dataType: " + a.dataType), null;
  }
  0 === a.contentType.length && (a.contentType = "application/x-www-form-urlencoded");
  switch(a.contentType.split(";")[0]) {
    case "text/plain":
      app.debug.trace("plugin_WebServiceClient.getAjax() - contentType: text/plain");
      a.data = a.parameters;
      break;
    case "application/json":
      app.debug.trace("plugin_WebServiceClient.getAjax() - contentType: application/json");
      a.data = JSON.stringify(a.parameters);
      break;
    case "multipart/form-data":
      app.debug.trace("plugin_WebServiceClient.getAjax() - contentType: multipart/form-data");
      if (void 0 === a.parameters.formData) {
        return app.debug.fatal("plugin_WebServiceClient.getAjax() - wsd.parameters.formData is undefined"), null;
      }
      b = a.contentType = !1;
      a.data = a.parameters.formData;
      break;
    case "application/x-www-form-urlencoded":
      app.debug.trace("plugin_WebServiceClient.getAjax() - contentType: application/x-www-form-urlencoded");
      a.data = a.parameters;
      break;
    default:
      return app.debug.fatal("plugin_WebServiceClient.getAjax() - unknown contentType: " + a.dataType), null;
  }
  app.debug.validate(app.wsc.config.demoMode, "boolean", "missing configuration: app.wsc.config.demoMode: boolean");
  if (!0 === app.wsc.config.demoMode) {
    e = app.demo.request(Object.assign({}, a));
  } else {
    try {
      app.debug.operation(function() {
        plugin_WebServiceClient.wsCallHistory = plugin_WebServiceClient.wsCallHistory || [];
        plugin_WebServiceClient.wsCallHistory.push($.extend(!0, {}, a));
      });
      var f = $.ajax({url:a.url, data:a.data, processData:b, dataType:a.dataType, contentType:a.contentType, async:c, method:a.method, timeout:a.timeout, crossDomain:!0, beforeSend:function(b, c) {
        app.debug.debug("plugin_WebServiceClient.getAjax() beforeSend: set http headers");
        app.debug.operation(function() {
          window.setTimeout(function() {
            app.debug.validate(plugin_WebServiceClient.config.useHeaderToken, "undefined", "WebServiceClient.config.useHeaderToken is outdated. use: WebServiceClient.config.\x3cserver\x3e.useHeaderToken");
            app.debug.validate(plugin_WebServiceClient.config.server[a.server].useHeaderToken, "boolean", "required: ");
            app.debug.validate(plugin_WebServiceClient.config.server[a.server].headerToken, "object", "required:");
            app.debug.validate(plugin_WebServiceClient.config.server[a.server].headerToken.key, "string", "required:");
            app.debug.validate(plugin_WebServiceClient.config.server[a.server].headerToken.value, "string", "required: ");
          }, 0);
        });
        plugin_WebServiceClient.config.server[a.server].useHeaderToken && b.setRequestHeader(plugin_WebServiceClient.config.server[a.server].headerToken.key, app.store.localStorage.get(plugin_WebServiceClient.config.server[a.server].headerToken.value));
        0 < Object.keys(a.headers).length && $.each(a.headers, function(a, c) {
          b.setRequestHeader(a, c);
        });
      }, success:function(a, b, c) {
        app.debug.debug("plugin.WebServiceClient.js plugin_WebServiceClient.getAjax() - Webservice done: " + JSON.stringify(a));
        e = a;
        app.debug.debug("plugin_WebServiceClient.getAjax() - start exception handling");
        !0 === app.plugins.functions.pluginLoaded("WebServiceError") ? (app.debug.debug("plugin_WebServiceClient.getAjax() - case: wse plugin is active"), !1 === (a = app.wse.getExceptionConfig(a)) ? void 0 != d && null != d && (app.debug.debug("plugin_WebServiceClient.getAjax() - case: no exception: " + JSON.stringify(e)), d.resolve(e)) : void 0 != d && null != d && (app.debug.debug("plugin_WebServiceClient.getAjax() - case: exception found: " + JSON.stringify(a)), d.reject(a, c))) : void 0 != d && 
        null != d && (console.warn("Webservice Success!: Please use the plugin.WebServiceError (wse) to compute your errors and exceptions"), d.resolve(e));
      }, error:function(b, c, f) {
        app.debug.debug("plugin_WebServiceClient.getAjax() - error: " + f);
        app.debug.debug("plugin_WebServiceClient.getAjax() - error: " + JSON.stringify(b));
        app.debug.debug("plugin_WebServiceClient.getAjax() - error: " + c);
        e = null;
        void 0 != d && null != d && (app.debug.debug("plugin_WebServiceClient.getAjax() - case: reject deferred object"), !0 === app.plugins.functions.pluginLoaded("WebServiceError") ? (app.debug.debug("plugin_WebServiceClient.getAjax() - case: wse plugin is active"), d.reject(app.wse.getExceptionConfig(b), b)) : (console.warn("Webservice Error!: Please use the plugin.WebServiceError (wse) to compute your errors and exceptions"), d.reject({call:a, jqXHR:JSON.parse(JSON.stringify(b))}, b)));
      }});
    } catch (g) {
      console.error(g), app.debug.error("plugin_WebServiceClient.getAjax() - catch block: " + JSON.stringify(g)), d.reject({call:a, jqXHR:JSON.parse(JSON.stringify(f)), "catch":JSON.parse(JSON.stringify(g))}, f);
    }
  }
  c && d.notify({jqXHR:f});
  app.debug.debug("plugin_WebServiceClient.getAjax() - Webservice returns: " + JSON.stringify(e));
  return e;
}, functions:{getJson:function(a, b, c) {
  app.debug.trace("plugin_WebServiceClient.functions.getJson()");
  return plugin_WebServiceClient.getAjax(a, b, c);
}, getWebSocket:function(a) {
  app.debug.deprecated("User new WebSocketClient plugin!");
  return app.wsoc.getWebSocket(a);
}, getServerSideEvent:function(a) {
  if (window.EventSource) {
    var b = $.Deferred();
    a.serverObject = plugin_WebServiceClient.getPreferedServer(a.server);
    $.each(a.parameters, function(b, c) {
      0 < a.url.occurences("{" + b + "}") && (a.url = a.url.replaceAll("{" + b + "}", c), delete a.parameters[b]);
    });
    a.url = (a.serverObject.scheme + a.serverObject.scheme_specific_part + a.serverObject.host + ":" + a.serverObject.port + a.serverObject.path).pathCombine(a.url);
    var c = new EventSource(a.url);
    c.addEventListener("message", function(a) {
      b.notify(JSON.parse(a.data));
    }, !1);
    c.addEventListener("open", function(a) {
    }, !1);
    c.addEventListener("error", function(a) {
      b.reject(a);
    }, !1);
    b.fail(function() {
      try {
        c.close();
      } catch (e) {
        console.log(e);
      }
    });
    return b;
  }
  return null;
}, askForPreferedServer:function() {
  app.debug.trace("plugin_WebServiceClient.functions.askForPreferedServer()");
  plugin_WebServiceClient.config.preferedServer = null;
  return !0;
}, getDefaultServerName:function() {
  app.debug.trace("plugin_WebServiceClient.functions.getDefaultServerName()");
  return plugin_WebServiceClient.config.defaultServer;
}, getServer:function(a, b) {
  app.debug.trace("plugin_WebServiceClient.functions.getServer()");
  a = plugin_WebServiceClient.getPreferedServer(a);
  void 0 == b && (b = !1);
  if (!0 === b) {
    return app.debug.debug("plugin_WebServiceClient.functions.getServer() - case: return server as object: " + JSON.stringify(a)), a;
  }
  if (0 == b) {
    return a = a.scheme + a.scheme_specific_part + a.host + ":" + a.port + a.path, app.debug.debug("plugin_WebServiceClient.functions.getServer() - case: return server as string"), a;
  }
  console.error("Error");
}, setServer:function(a, b, c) {
  app.debug.trace("plugin_WebServiceClient.functions.setServer()");
  app.debug.validate(b, "object");
  void 0 !== b.scheme && app.info.set("plugin_WebServiceClient.config.server." + a + ".endpoints.0.scheme", b.scheme);
  void 0 !== b.scheme_specific_part && app.info.set("plugin_WebServiceClient.config.server." + a + ".endpoints.0.scheme_specific_part", b.scheme_specific_part);
  void 0 !== b.host && app.info.set("plugin_WebServiceClient.config.server." + a + ".endpoints.0.host", b.host);
  void 0 !== b.port && app.info.set("plugin_WebServiceClient.config.server." + a + ".endpoints.0.port", b.port);
  void 0 !== b.path && app.info.set("plugin_WebServiceClient.config.server." + a + ".endpoints.0.path", b.path);
  return this.ping(a, c);
}, keepAliveRequest:function() {
  app.debug.trace("plugin_WebServiceClient.functions.keepAliveRequest()");
  console.error("Deprecated function!");
}, ping:function(a, b) {
  app.debug.trace("plugin_WebServiceClient.functions.ping()");
  var c = plugin_WebServiceClient.config.server[a].pingPath;
  a = plugin_WebServiceClient.getPreferedServer(a);
  c = a.scheme + a.scheme_specific_part + a.host + ":" + a.port + a.path + c;
  return !0 === b ? lapstone.globalLoader.AsyncJsonLoader(c) : lapstone.globalLoader.JsonLoader(c);
}}};
