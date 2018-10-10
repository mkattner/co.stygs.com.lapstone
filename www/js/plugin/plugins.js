/**
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// TODO add try catch to every function that is called in plugins or pages
app["plugins"] = {
  config: null,
  pluginNames: [],
  constructor: function() {
    var dfd = $.Deferred();

    // reverse order

    // 7
    startup.addFunction("                  cleanup plugins", app.plugins.cleanup);
    // 6
    startup.addFunction("                  defining the plugins' events", app.plugins.callPluginEvents);
    // 5
    startup.addFunction("                  calling the plugins' loaded event", app.plugins.callPluginsLoadedEvent);
    // 4
    startup.addFunction("                  loading the plugins' include scripts", app.plugins.includeFiles);
    // 3.5
    startup.addFunction("                  loading the plugins' include dependencies", app.plugins.includeDependencies);
    // 3
    startup.addFunction("                  loading the plugins", app.plugins.loadPlugins);
    // 2
    startup.addFunction("                  verifying the plugins' configuration", app.plugins.verifyPluginNames);
    // 1
    startup.addFunction("                  loading the plugins' configuration", app.plugins.loadPluginConfig);

    dfd.resolve();
    return dfd.promise();
  },

  /**
   * 7
   */
  cleanup: function() {
    var dfd;

    dfd = $.Deferred();

    dfd.resolve();

    return dfd.promise();
  },

  /**
   * 1
   */
  loadPluginConfig: function() {
    var dfd, promise;

    dfd = $.Deferred()

    if (app.config.min) {
      // ?? What I'm doing here?
      app.plugins.config = config_json;
      dfd.resolve();
    }

    else {
      promise = globalLoader.AsyncJsonLoader("../js/plugin/plugins.json");

      promise.done(function(data) {
        app.plugins.config = data;
        // remove unused plugins
        $.each(app.plugins.config, function(pluginName, loadPlugin) {
          if (!loadPlugin) delete app.plugins.config[pluginName];
        });
        dfd.resolve();
      });

      promise.fail(function() {
        dfd.reject();
      });
    }

    return dfd.promise();
  },

  /**
   * 2
   */
  verifyPluginNames: function() {
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();
  },

  includeDependencies: function() {
    var dfd;

    $.each(app.plugins.config, function(pluginName, loaded) {
      var currentPlugin;

      currentPlugin = window["plugin_" + pluginName];
    });

    dfd = $.Deferred()

    dfd.resolve();

    return dfd.promise();
  },

  includeFiles: function() {
    var dfd = $.Deferred(), pluginIncludePromises;

    // PRODUCTION
    if (app.config.min) {
      dfd.resolve();
    }

    // DEVELOPMENT
    else {
      pluginIncludePromises = [];
      $.each(app.plugins.config, function(pluginName, loadPlugin) {
        var currentPlugin;

        currentPlugin = window["plugin_" + pluginName];

        if (loadPlugin) {
          // TODO validation could be in include. Do not use it at that point.
          app.debug.validate(currentPlugin.config.include);

          $.each(currentPlugin.config.include, function(index, includeFile) {
            pluginIncludePromises.push(globalLoader.AsyncScriptLoader("../js/plugin/include/" + pluginName + "/" + includeFile))
          });

        }
      });

      $.when.apply($, pluginIncludePromises).done(function() {
        dfd.resolve();
      }).fail(function(error) {
        dfd.reject(error);
      });
    }
    return dfd.promise();
  },

  loadPluginConfiguration: function(pluginName) {
    var dfd = $.Deferred(), promise, currentPlugin;

    currentPlugin = window["plugin_" + pluginName];

    // PRODUCTION
    if (app.config.min) {
      currentPlugin.config = window['config_' + pluginName];
      dfd.resolve();
    }

    // DEVELOPMENT
    else {

      promise = globalLoader.AsyncJsonLoader("../js/plugin/plugin." + pluginName + ".json");
      promise.done(function(json) {
        currentPlugin.config = json;
        dfd.resolve();
      });
      promise.fail(function() {
        dfd.reject();
      });
    }

    return dfd.promise();
  },

  onPluginLoaded: function(pluginName) {
    var dfd = $.Deferred(), promise, promiseConfiguration, currentPlugin;

    currentPlugin = window["plugin_" + pluginName];

    if (currentPlugin == undefined) {
      alert("Fatal error: Plugin class is not defined: plugin_" + pluginName);
      return;
    }

    promiseConfiguration = app.plugins.loadPluginConfiguration(pluginName);

    promiseConfiguration.done(function() { // check the config:
      // name
      if (currentPlugin.config.name == undefined) {
        alert("Fatal error: The property 'name' is not defined in JSON file: ../js/plugin." + pluginName + ".json")
        return false;
      }
      // check the config: shortname
      if (currentPlugin.config.shortname == undefined) {
        alert("Fatal error: The property 'shortname' is not defined in JSON file: ../js/plugin." + pluginName + ".json")
        return false;
      }

      // call the plugin's contructor
      // console.log("plugin_" + pluginName);
      promise = currentPlugin.constructor();

      promise.done(function() {
        // attach plugin's public functions to app object
        app[currentPlugin.config.shortname] = window["plugin_" + pluginName].functions;

        // attach plugin's configuration to the app object
        app[currentPlugin.config.shortname]["config"] = currentPlugin.config;

        // plugin succesfully loaded
        // attach plugin's name to array
        app.plugins.pluginNames.push(pluginName);

        dfd.resolve();
      });

      promise.fail(function() {
        dfd.reject()
      });
    });

    promiseConfiguration.fail(function() {
      dfd.reject();
    });

    return dfd.promise();
  },

  loadPlugins: function() {
    var dfd = $.Deferred(), promises_js = Array(), promiseOfPromises_js, promises_func = Array(), promiseOfPromises_func;
    $.each(app.plugins.config, function(pluginName, loadPlugin) {
      if (loadPlugin == true) {

        // PRODUCTION
        if (app.config.min) {
          promises_js.push(app.plugins.onPluginLoaded(pluginName));
        }

        // DEVELOPMENT
        else {
          promises_js.push(globalLoader.AsyncScriptLoader("../js/plugin/plugin." + pluginName + ".js"));
        }
      }
    });

    promiseOfPromises_js = $.when.apply($, promises_js);

    // PRODUCTION
    if (app.config.min) {
      promiseOfPromises_js.done(function() {
        dfd.resolve();
      });
      promiseOfPromises_js.fail(function() {
        dfd.reject();
      });

    }

    // DEVELOPMENT
    else {

      promiseOfPromises_js.done(function() {
        $.each(app.plugins.config, function(pluginName, loadPlugin) {
          promises_func.push(app.plugins.onPluginLoaded(pluginName));
        });

        promiseOfPromises_func = $.when.apply($, promises_func);

        promiseOfPromises_func.done(function() {
          dfd.resolve();
        });
        promiseOfPromises_func.fail(function() {
          dfd.reject()
        });
      });

      promiseOfPromises_js.fail(function() {
        dfd.reject();
      });
    }

    return dfd.promise();
  },

  callPluginsLoadedEvent: function() {
    var dfd = $.Deferred(), promises = Array(), promiseOfPromises;

    $.each(app.plugins.pluginNames, function(pluginIndex, pluginName) {
      var currentPlugin;

      currentPlugin = window["plugin_" + pluginName];

      promises.push(currentPlugin.pluginsLoaded());
    });

    promiseOfPromises = $.when.apply($, promises);

    promiseOfPromises.done(function(success) {
      dfd.resolve(success);
    });

    promiseOfPromises.fail(function(error) {
      dfd.reject(error);
    });

    return dfd.promise();
  },

  callPluginEvents: function() {
    var dfd = $.Deferred();
    $.each(app.plugins.pluginNames, function(pluginIndex, pluginName) {
      var currentPlugin;

      currentPlugin = window["plugin_" + pluginName];

      currentPlugin.definePluginEvents();

    });
    dfd.resolve();
    return dfd.promise();
  },

  functions: {
    pluginLoaded: function(pluginName) {
      app.debug.trace("app.plugins.functions.pluginLoaded()");
      if (app.plugins.config.hasOwnProperty(pluginName)) {
        app.debug.debug("app.plugins.functions.pluginLoaded() - true: " + pluginName);
        return true;
      }

      else {
        app.debug.debug("app.plugins.functions.pluginLoaded() - false: " + pluginName);
        return false;
      }
    },

  }
};

// constructor
