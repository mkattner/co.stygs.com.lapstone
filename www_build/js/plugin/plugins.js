// Input 0
'use strict';
app.plugins = {config:null, pluginNames:[], constructor:function() {
  var a = $.Deferred();
  startup.addFunction("                  cleanup plugins", app.plugins.cleanup);
  startup.addFunction("                  defining the plugins' events", app.plugins.callPluginEvents);
  startup.addFunction("                  calling the plugins' loaded event", app.plugins.callPluginsLoadedEvent);
  startup.addFunction("                  loading the plugins' include scripts", app.plugins.includeFiles);
  startup.addFunction("                  loading the plugins' include dependencies", app.plugins.includeDependencies);
  startup.addFunction("                  loading the plugins", app.plugins.loadPlugins);
  startup.addFunction("                  verifying the plugins' configuration", app.plugins.verifyPluginNames);
  startup.addFunction("                  loading the plugins' configuration", app.plugins.loadPluginConfig);
  a.resolve();
  return a.promise();
}, cleanup:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, loadPluginConfig:function() {
  var a = $.Deferred();
  if (app.config.min) {
    app.plugins.config = config_json, a.resolve();
  } else {
    var b = globalLoader.AsyncJsonLoader("../js/plugin/plugins.json");
    b.done(function(b) {
      app.plugins.config = b;
      $.each(app.plugins.config, function(a, b) {
        b || delete app.plugins.config[a];
      });
      a.resolve();
    });
    b.fail(function() {
      a.reject();
    });
  }
  return a.promise();
}, verifyPluginNames:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, includeDependencies:function() {
  $.each(app.plugins.config, function(a, d) {
    if (void 0 === window["plugin_" + a].config.dependency) {
      throw console.error("Plugin " + a + " has no dependency array in it's configuration."), "Initialization error";
    }
  });
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, includeFiles:function() {
  var a = $.Deferred();
  if (app.config.min) {
    a.resolve();
  } else {
    var b = [];
    $.each(app.plugins.config, function(a, c) {
      if (c) {
        c = window["plugin_" + a];
        if (void 0 === c.config.include) {
          throw console.error("Plugin " + a + " has no include array in it's configuration."), "Initialization error";
        }
        $.each(c.config.include, function(c, d) {
          b.push(globalLoader.AsyncScriptLoader("../js/plugin/include/" + a + "/" + d));
        });
      }
    });
    $.when.apply($, b).done(function() {
      a.resolve();
    }).fail(function(b) {
      a.reject(b);
    });
  }
  return a.promise();
}, loadPluginConfiguration:function(a) {
  var b = $.Deferred();
  var d = window["plugin_" + a];
  app.config.min ? (d.config = window["config_" + a], b.resolve()) : (a = globalLoader.AsyncJsonLoader("../js/plugin/plugin." + a + ".json"), a.done(function(a) {
    d.config = a;
    b.resolve();
  }), a.fail(function() {
    b.reject();
  }));
  return b.promise();
}, onPluginLoaded:function(a) {
  var b = $.Deferred(), d;
  var c = window["plugin_" + a];
  if (void 0 == c) {
    throw console.error("Fatal error: Plugin class is not defined: plugin_" + a), "Initialization error";
  }
  var e = app.plugins.loadPluginConfiguration(a);
  e.done(function() {
    if (void 0 == c.config.name) {
      throw console.error("Fatal error: The property 'name' is not defined in JSON file: ../js/plugin." + a + ".json"), "Initialization error";
    }
    if (void 0 == c.config.shortname) {
      throw console.error("Fatal error: The property 'shortname' is not defined in JSON file: ../js/plugin." + a + ".json"), "Initialization error";
    }
    d = c.constructor();
    d.done(function() {
      app[c.config.shortname] = c.functions;
      app[c.config.shortname].config = c.config;
      app.plugins.pluginNames.push(a);
      b.resolve();
    });
    d.fail(function() {
      b.reject();
    });
  });
  e.fail(function() {
    b.reject();
  });
  return b.promise();
}, loadPlugins:function() {
  var a = $.Deferred(), b = [], d = [], c;
  $.each(app.plugins.config, function(a, c) {
    1 == c && (app.config.min ? b.push(app.plugins.onPluginLoaded(a)) : b.push(globalLoader.AsyncScriptLoader("../js/plugin/plugin." + a + ".js")));
  });
  var e = $.when.apply($, b);
  app.config.min ? e.done(function() {
    a.resolve();
  }) : e.done(function() {
    $.each(app.plugins.config, function(a, b) {
      d.push(app.plugins.onPluginLoaded(a));
    });
    c = $.when.apply($, d);
    c.done(function() {
      a.resolve();
    });
    c.fail(function() {
      a.reject();
    });
  });
  e.fail(function() {
    a.reject();
  });
  return a.promise();
}, callPluginsLoadedEvent:function() {
  var a = $.Deferred(), b = [];
  $.each(app.plugins.pluginNames, function(a, d) {
    b.push(window["plugin_" + d].pluginsLoaded());
  });
  var d = $.when.apply($, b);
  d.done(function(b) {
    a.resolve(b);
  });
  d.fail(function(b) {
    a.reject(b);
  });
  return a.promise();
}, callPluginEvents:function() {
  var a = $.Deferred();
  $.each(app.plugins.pluginNames, function(a, d) {
    window["plugin_" + d].definePluginEvents();
  });
  a.resolve();
  return a.promise();
}, functions:{pluginLoaded:function(a) {
  app.debug.trace("app.plugins.functions.pluginLoaded()");
  if (app.plugins.config.hasOwnProperty(a)) {
    return app.debug.debug("app.plugins.functions.pluginLoaded() - true: " + a), !0;
  }
  app.debug.debug("app.plugins.functions.pluginLoaded() - false: " + a);
  return !1;
}}, getConfigByName:function(a) {
  return window["plugin_" + a].config;
}, setConfigByName:function(a, b) {
  window["plugin_" + a].config = b;
}};
