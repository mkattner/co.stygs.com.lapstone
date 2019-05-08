// Input 0
'use strict';
var plugin_RestClient = {config:null, cachedWebserviceIndentifyer:"_t_cachedWebservice_", constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_RestClient.pluginsLoaded()");
  var a = $.Deferred();
  var b = [];
  app.config.min ? a.resolve() : ($.each(plugin_RestClient.config.wsdFiles, function(a, g) {
    b.push(plugin_RestClient.loadDefinitionFileAsync(g));
  }), $.when.apply($, b).done(function() {
    a.resolve(arguments);
  }).fail(function() {
    a.reject(arguments);
  }));
  app.debug.operation(function() {
    $.each(plugin_RestClient.config.webservices, function(a, b) {
      void 0 !== b.url && app.debug.validate(0 === b.url.indexOf("/"), !0, a + ": webservice.url must start with a /");
    });
  });
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_RestClient.pagesLoaded()");
  app.debug.debug("plugin_" + this.config.name + ".pagesLoaded()", 11);
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_RestClient.afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_RestClient.pageSpecificEvents()");
}, loadDefinitionFileAsync:function(a) {
  app.debug.trace("plugin_RestClient.loadDefinitionFile()");
  var b = $.Deferred();
  a = lapstone.globalLoader.AsyncJsonLoader(a);
  a.done(function(a) {
    $.each(a, function(a, b) {
      app.debug.debug("plugin_RestClient.loadDefinitionFile() - add: " + a);
      plugin_RestClient.config.webservices[a] = b;
    });
    b.resolve();
  });
  a.fail(function() {
    b.reject(arguments);
  });
  return b.promise();
}, loadDefinitionFile:function(a) {
  app.debug.trace("plugin_RestClient.loadDefinitionFile()");
  app.debug.deprecated();
  a = lapstone.globalLoader.JsonLoader(a);
  app.debug.debug("plugin_RestClient.loadDefinitionFile() - add each webservice definition");
  $.each(a, function(a, f) {
    app.debug.debug("plugin_RestClient.loadDefinitionFile() - add: " + a);
    plugin_RestClient.config.webservices[a] = f;
  });
}, functions:{getWsd:function(a) {
  app.debug.trace("plugin_RestClient.functions.getWsd(" + app.debug.arguments(arguments) + ")");
  var b = $.extend(!0, {}, plugin_RestClient.config.webservices[a]);
  if (0 === Object.keys(b).length) {
    return app.debug.error("Service not defined: " + a), null;
  }
  if (-1 !== Object.keys(b).indexOf("extend")) {
    var f = plugin_RestClient.functions.getWsd(b.extend);
    delete b.extend;
    b = $.extend(!0, f, b);
  }
  return b;
}, deleteWsd:function(a) {
  app.debug.trace("plugin_RestClient.functions.deleteWsd(" + app.debug.arguments(arguments) + ")");
  delete plugin_RestClient.config.webservices[a];
  return !0;
}, addWebserviceDefinitionFile:function(a) {
  app.debug.debug("plugin_RestClient.functions.addWebserviceDefinitionFile(" + app.debug.arguments(arguments) + ")");
  plugin_RestClient.loadDefinitionFile(a);
}, addWebservice:function(a, b) {
  void 0 === plugin_RestClient.config.webservices[a] ? plugin_RestClient.config.webservices[a] = b : app.debug.error("Webservice already exists: " + a);
}, removeCache:function(a, b) {
  app.debug.trace("plugin_RestClient.functions.removeCache(" + app.debug.arguments(arguments) + ")");
  app.store.localStorage.removeObject(plugin_RestClient.cachedWebserviceIndentifyer + a);
  return !0;
}, clearCache:function(a, b) {
  app.debug.trace("plugin_RestClient.functions.removeCache(" + app.debug.arguments(arguments) + ")");
  app.store.localStorage.removeItem(plugin_RestClient.cachedWebserviceIndentifyer + "*");
  return !0;
}, cacheJson:function(a, b, f) {
  app.debug.trace("plugin_RestClient.functions.cacheJson(" + app.debug.arguments(arguments) + ")");
  app.debug.validate(_);
  var g = app.rc.getWsd(a);
  var d = (a + JSON.stringify(b)).hashCode();
  if (!0 === g.cacheable) {
    app.debug.debug("plugin_RestClient.functions.cacheJson() - case: webservice is cacheable");
    if (f) {
      app.debug.debug("plugin_RestClient.functions.cacheJson() - case: store to local storage");
      var e = {servicename:a, parameter:b, cachetimestamp:Date.now(), data:JSON.stringify(f)};
      app.store.localStorage.setObject(plugin_RestClient.cachedWebserviceIndentifyer + d, e);
      return !0;
    }
    if (e = app.store.localStorage.getObject(plugin_RestClient.cachedWebserviceIndentifyer + d)) {
      app.debug.debug("plugin_RestClient.functions.cacheJson() - case: restore from local storage");
      app.debug.debug("plugin_RestClient.functions.cacheJson() - parameter:        " + JSON.stringify(b));
      app.debug.debug("plugin_RestClient.functions.cacheJson() - cached parameter: " + JSON.stringify(e.parameter));
      app.debug.debug("plugin_RestClient.functions.cacheJson() - valid until: " + (e.cachetimestamp + g.cacheInMs));
      app.debug.debug("plugin_RestClient.functions.cacheJson() - now:         " + Date.now());
      if (_.isEqual(b, e.parameter)) {
        if (e.cachetimestamp + g.cacheInMs < Date.now()) {
          return app.debug.debug("plugin_RestClient.functions.cacheJson() - case: cache time timed out"), !1;
        }
        app.debug.debug("plugin_RestClient.functions.cacheJson() - case: return data");
        app.debug.debug("plugin_RestClient.functions.cacheJson() - data: " + e.data);
        return JSON.parse(e.data);
      }
      app.debug.debug("plugin_RestClient.functions.cacheJson() - case: parameter not equal");
      return !1;
    }
    app.debug.debug("plugin_RestClient.functions.cacheJson() - case: not stored");
    return !1;
  }
  app.debug.debug("plugin_RestClient.functions.cacheJson() - case: not cacheable");
  return !1;
}, getFullUrl:function(a, b) {
  app.debug.trace("plugin_RestClient.functions.getFullUrl(" + app.debug.arguments(arguments) + ")");
  a = plugin_RestClient.functions.getWsd(a);
  var f = app.wsc.getServer(a.server).pathCombine(a.url);
  f += "?";
  plugin_RestClient.functions.mergeWsdWithParameters(a, b);
  $.each(a.parameters, function(a, b) {
    f += a + "\x3d" + b + "\x26";
  });
  return f;
}, getJsonWithLoader_overrun:null, getJsonWithLoader_Delay:null, getJsonWithLoader_Queue:0, getJsonWithLoader:function(a, b, f, g) {
  app.debug.trace("plugin_RestClient.functions.getJsonWithLoader(" + app.debug.arguments(arguments) + ")");
  app.debug.validate(plugin_RestClient.config.global_getJsonWithLoader_uniqueLoader);
  var d;
  var e = plugin_RestClient.functions.getJson(a, b, f, g);
  var c = d = "";
  app.debug.validate(plugin_RestClient.config.global_getJsonWithLoader_timeout);
  app.debug.validate(plugin_RestClient.config.global_getJsonWithLoader_overrun);
  timeoutInMs = plugin_RestClient.config.global_getJsonWithLoader_timeout;
  overrunInMs = plugin_RestClient.config.global_getJsonWithLoader_overrun;
  app.debug.info("plugin_RestClient - LOADER: timeout \x3d " + timeoutInMs + "; overrun \x3d " + overrunInMs);
  window.clearTimeout(plugin_RestClient.functions.getJsonWithLoader_overrun);
  if (!0 === b && null === e || !0 === f && null === e) {
    return e = $.Deferred(), e.reject("ERROR"), e.promise();
  }
  $.isFunction(e.promise) && (plugin_RestClient.functions.getJsonWithLoader_Queue++, app.debug.validate(app.rc.config.global_getJsonWithLoader_multilanguageContext), app.debug.validate(app.rc.config.global_getJsonWithLoader_uniqueLoaderPageScoped, "boolean"), app.debug.validate(app.rc.config.global_getJsonWithLoader_uniqueLoader, "boolean"), app.debug.validate(app.rc.config.global_getJsonWithLoader_loaderTemplate), !0 === app.rc.config.global_getJsonWithLoader_uniqueLoaderPageScoped ? (d += "page: " + 
  $("[data-role\x3dpage]").attr("id") + " - ", c += "page: " + $("[data-role\x3dpage]").attr("id") + " - ", "string" === typeof a ? (d += a + " ", c += a + " ") : $.each(a, function(a, b) {
    d += b[0] + " ";
    c += b[0] + " ";
  }), d += "- headline", c += "- text") : !0 === app.rc.config.global_getJsonWithLoader_uniqueLoader ? ("string" === typeof a ? c = d = a : $.each(a, function(a, b) {
    d += b[0] + " ";
    c += b[0] + " ";
  }), d += "- headline", c += "- text") : (d = "global webservice loader headline", c = "global webservice loader text"), app.debug.flat(app.lang.string(d, app.rc.config.global_getJsonWithLoader_multilanguageContext)), app.debug.flat(app.lang.string(c, app.rc.config.global_getJsonWithLoader_multilanguageContext)), null == plugin_RestClient.functions.getJsonWithLoader_Delay && (plugin_RestClient.functions.getJsonWithLoader_Delay = window.setTimeout(function() {
    plugin_RestClient.functions.getJsonWithLoader_Delay = null;
    app.debug.debug("plugin_RestClient.functions.getJsonWithLoader() - show loader after timeout");
    app.debug.info("plugin_RestClient - LOADER SHOW");
    app.notify.loader.show(app.rc.config.global_getJsonWithLoader_loaderTemplate, {headline:app.lang.string(d, app.rc.config.global_getJsonWithLoader_multilanguageContext), text:app.lang.string(c, app.rc.config.global_getJsonWithLoader_multilanguageContext)});
  }, timeoutInMs)), e.always(function() {
    app.debug.debug("plugin_RestClient.functions.getJsonWithLoader() - webservice call was fast enough; do not show loader;");
    plugin_RestClient.functions.getJsonWithLoader_Queue--;
    0 === plugin_RestClient.functions.getJsonWithLoader_Queue && (window.clearTimeout(plugin_RestClient.functions.getJsonWithLoader_Delay), plugin_RestClient.functions.getJsonWithLoader_Delay = null, plugin_RestClient.functions.getJsonWithLoader_overrun = window.setTimeout(function() {
      app.debug.info("plugin_RestClient - LOADER HIDE");
      app.notify.loader.remove();
    }, 30));
  }));
  return e;
}, getJson:function(a, b, f, g, d) {
  app.debug.trace("plugin_RestClient.functions.getJson(" + app.debug.arguments(arguments) + ")");
  var e;
  if (!0 === app.plugins.functions.pluginLoaded("KeepAlive") && !0 === app.alive.isAlive()) {
    if (app.debug.debug("plugin_RestClient.functions.getJson() - case: keepAlive \x26\x26 isAlive"), "object" === typeof a) {
      if (app.debug.debug("plugin_RestClient.functions.getJson() - case: get multible json objects"), !1 === b || void 0 === b) {
        for (app.debug.debug("plugin_RestClient.functions.getJson() case: async \x3d false"), f || (f = 1), e = 0; e < f; e++) {
          app.debug.debug("plugin_RestClient.functions.getJson() - AJAX attempt " + e + " of " + g);
          var c = plugin_RestClient.getMultipleJson(a, b, f);
          if (null != c) {
            return c;
          }
        }
      } else {
        if ("object" == typeof a && 1 == b) {
          app.debug.debug("plugin_RestClient.functions.getJson() - case: async \x3d true");
          c = plugin_RestClient.getMultipleJsonAsync(a, b, f);
          if (null === d || void 0 === d) {
            d = $.Deferred();
          }
          c.done(function(a) {
            d.resolve(a);
          });
          c.fail(function(c, e) {
            app.debug.debug("plugin_RestClient.functions.getJson() - multible json object; case: webservice failed: " + JSON.stringify(c));
            1 < f ? (f--, plugin_RestClient.functions.getJson(a, b, f, null, d)) : (app.debug.debug("plugin_RestClient.functions.getJson() - multiple json object; reject deferred object"), d.reject(c, e));
          });
          return d.promise();
        }
      }
    } else {
      if ("string" === typeof a) {
        if (app.debug.debug("plugin_RestClient.functions.getJson() - case: get a single json object"), !(void 0 != b && "object" != typeof b || void 0 != f && 0 != f)) {
          for (app.debug.debug("plugin_RestClient.functions.getJson() - case: async \x3d false"), g || (g = 1), e = 0; e < g; e++) {
            if (app.debug.debug("plugin_RestClient.functions.getJson() - AJAX attempt " + e + " of " + g), c = plugin_RestClient.getSingleJson(a, b, f), null != c) {
              return c;
            }
          }
        } else {
          if ((void 0 == b || "object" == typeof b) && 1 == f) {
            app.debug.debug("plugin_RestClient.functions.getJson() - case: async \x3d true");
            c = plugin_RestClient.getSingleJsonAsync(a, b, f);
            if (null == d || void 0 == d) {
              d = $.Deferred();
            }
            c.done(function(a) {
              d.resolve(a);
            });
            c.fail(function(c, e) {
              app.debug.debug("plugin_RestClient.functions.getJson() - single json object; case: webservice failed: " + JSON.stringify(c));
              1 < g ? (g--, plugin_RestClient.functions.getJson(a, b, f, g, d)) : (app.debug.debug("plugin_RestClient.functions.getJson() - single json object; reject deferred object"), d.reject(c, e));
            });
            return d.promise();
          }
        }
      }
    }
  } else {
    if (app.debug.debug("plugin_RestClient.functions.getJson() - server is not alive"), !0 === b || !0 === f) {
      if (null === d || void 0 === d) {
        d = $.Deferred();
      }
      d.reject({id:Math.abs("not alive".hashCode()), error:"not alive", arguments}, null);
      $(document).trigger("webserviceCall", [d.promise(), "server is not alive", {}]);
      return d.promise();
    }
  }
  return null;
}, mergeWsdWithParameters:function(a, b) {
  var f = function(a, d) {
    $.each(a, function(d, c) {
      if ("string" === typeof c && c.contains("||")) {
        var e = c.substr(c.indexOf("||") + 2);
        e = plugin_HTML5Storage.parseValue(e);
        c = c.substr(0, c.indexOf("||"));
      }
      "{" === c[0] && "}" === c[c.length - 1] && (c = c.substr(1, c.length - 2), void 0 !== b[c] ? a[d] = b[c] : void 0 !== e ? a[d] = e : app.debug.error("Undefined parameter in parameter object: " + c));
    });
  };
  $.each(b, function(b, d) {
    a.url = a.url.replace("{" + b + "}", d);
  });
  0 < Object.keys(a.parameters).length && f(a.parameters, b);
  0 < Object.keys(a.headers).length && f(a.headers, b);
}}};
