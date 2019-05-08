// Input 0
'use strict';
var plugin_LoadExternalScripts = {config:null, loadedScripts:{}, constructor:function() {
  var b = $.Deferred();
  b.resolve();
  return b.promise();
}, pluginsLoaded:function() {
  app.debug.trace(this.config.name + ".pluginsLoaded()", 11);
  var b = $.Deferred();
  var a = [];
  if (app.config.min) {
    a.push(globalLoader.AsyncStyleLoader("../files/all.style." + app.config.version.app + ".css")), a.push(globalLoader.AsyncScriptLoader("../files/all.javascript." + app.config.version.app + ".js"));
  } else {
    try {
      plugin_LoadExternalScripts.config.scripts.style && app.debug.fatal("plugin_LoadExternalScripts.config.scripts.style no longer exists!"), plugin_LoadExternalScripts.config.scripts.javascript && app.debug.fatal("plugin_LoadExternalScripts.config.scripts.javascript no longer exists!");
    } catch (d) {
    }
    var c = [];
    app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - case: load ordered styles");
    app.debug.validate(plugin_LoadExternalScripts.config.styleOrdered, "array");
    $.each(plugin_LoadExternalScripts.config.styleOrdered, function(b, a) {
      a in plugin_LoadExternalScripts.loadedScripts || (a.endsWith(".css") ? (app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - process css: " + a), c.push(a), plugin_LoadExternalScripts.loadedScripts[a] = !0) : a.endsWith(".less") && (app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - process less: " + a), c.push(a), plugin_LoadExternalScripts.loadedScripts[a] = !0));
    });
    a.push(plugin_LoadExternalScripts.loadStyleAsync(c));
    app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - case: load ordered scripts");
    app.debug.validate(plugin_LoadExternalScripts.config.javascriptOrdered, "array");
    a.push(plugin_LoadExternalScripts.loadScriptsAsync(plugin_LoadExternalScripts.config.javascriptOrdered.slice()));
  }
  a = $.when.apply($, a);
  a.done(function() {
    b.resolve();
  });
  a.fail(function() {
    b.reject();
  });
  return b.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()", 11);
  var b = $.Deferred();
  app.config.min ? b.resolve() : globalLoader.AsyncScriptLoader("../ext/less/less.min.js").done(function() {
    less.logger.addListener({debug:function(a) {
      app.debug.debug(a);
    }, info:function(a) {
      app.debug.info(a);
    }, warn:function(a) {
      app.debug.warn(a);
    }, error:function(a) {
      app.debug.error(a);
    }});
    b.resolve();
  }).fail(function() {
    b.reject();
  });
  return b.promise();
}, definePluginEvents:function() {
}, afterHtmlInjectedBeforePageComputing:function(b) {
  app.debug.trace("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
}, pageSpecificEvents:function() {
  app.debug.trace("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
}, loadScriptsAsync:function(b) {
  app.debug.trace("plugin_LoadExternalScripts.loadScriptsAsync()");
  var a = $.Deferred(), c;
  if (0 < b.length) {
    var d = b.shift();
    app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - LOAD url: " + d);
    globalLoader.AsyncScriptLoader(d).done(function() {
      plugin_LoadExternalScripts.loadedScripts[d] = !0;
      app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - DONE url: " + d);
      app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - call recursive");
      c = plugin_LoadExternalScripts.loadScriptsAsync(b);
      c.done(function() {
        a.resolve();
      });
      c.fail(function() {
        a.reject();
      });
    }).fail(function() {
      app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - FAIL url: " + d);
      a.reject();
    });
  } else {
    app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - case: script array empty; resolve"), a.resolve();
  }
  return a.promise();
}, loadStyleAsync:function(b) {
  app.debug.trace("plugin_LoadExternalScripts.loadStyleAsync()");
  var a = $.Deferred(), c, d;
  if (0 < b.length) {
    var e = b.shift();
    app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - LOAD url: " + e);
    e.endsWith(".less") ? c = globalLoader.AsyncLessLoader(e) : e.endsWith(".css") && (c = globalLoader.AsyncStyleLoader(e));
    c.done(function() {
      plugin_LoadExternalScripts.loadedScripts[e] = !0;
      app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - DONE url: " + e);
      app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - call recursive");
      d = plugin_LoadExternalScripts.loadStyleAsync(b);
      d.done(function() {
        a.resolve();
      });
      d.fail(function() {
        a.reject();
      });
    });
    c.fail(function() {
      app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - FAIL url: " + e);
      a.reject();
    });
  } else {
    app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - case: css array empty; resolve"), a.resolve();
  }
  return a.promise();
}, functions:{css:function(b) {
  app.debug.trace("plugin_LoadExternalScripts.functions.css()");
  if (b in plugin_LoadExternalScripts.loadedScripts) {
    return app.debug.debug("plugin_LoadExternalScripts.functions.css() - css already loaded: " + b), $.Deferred().resolve();
  }
  app.debug.debug("plugin_LoadExternalScripts.functions.css() - load css: " + b);
  var a = globalLoader.AsyncStyleLoader(b);
  a.done(function() {
    app.debug.debug("plugin_LoadExternalScripts.functions.css() - css loading done: " + b);
    app.debug.debug("plugin_LoadExternalScripts.functions.css() - add url to loadedScripts array");
    plugin_LoadExternalScripts.loadedScripts[b] = !0;
  });
  return a;
}, less:function(b) {
  app.debug.trace("plugin_LoadExternalScripts.functions.less()");
  if (b in plugin_LoadExternalScripts.loadedScripts) {
    return app.debug.debug("plugin_LoadExternalScripts.functions.less() - less already loaded: " + b), $.Deferred().resolve();
  }
  app.debug.debug("plugin_LoadExternalScripts.functions.less() - load css: " + b);
  var a = globalLoader.AsyncLessLoader(b);
  a.done(function() {
    app.debug.debug("plugin_LoadExternalScripts.functions.less() - css loading done: " + b);
    app.debug.debug("plugin_LoadExternalScripts.functions.less() - add url to loadedScripts array");
    plugin_LoadExternalScripts.loadedScripts[b] = !0;
  });
  return a;
}, javascript:function(b) {
  app.debug.trace("plugin_LoadExternalScripts.functions.javascript()");
  if (b in plugin_LoadExternalScripts.loadedScripts) {
    return app.debug.debug("plugin_LoadExternalScripts.functions.javascript() - javascript already loaded: " + b), $.Deferred().resolve();
  }
  var a = globalLoader.AsyncScriptLoader(b);
  a.done(function() {
    app.debug.debug("plugin_LoadExternalScripts.functions.javascript() - javascript loading done: " + b);
    app.debug.debug("plugin_LoadExternalScripts.functions.javascript() - add url to loadedScripts array");
    plugin_LoadExternalScripts.loadedScripts[b] = !0;
  });
  return a;
}}};
