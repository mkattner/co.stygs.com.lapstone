// # sourceURL=plugin.Persist.js
/**
 * Copyright (c) 2015 martin.kattner@stygs.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var plugin_Persistance = {
  config: null,
  // called by plugins.js
  constructor: function() {
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();

  },

  // called after all plugins are loaded
  pluginsLoaded: function() {
    app.debug.trace("plugin_Persist.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
    var dfd = $.Deferred();

    $.each(app.plugins.pluginNames, function(index, pluginName) {
      var pluginConfig, persistantConfig;

      if ((persistantConfig = app.sess.getObject(pluginName, plugin_Persistance.config.sessionKey)) !== null) {

        pluginConfig = $.extend(true, app.plugins.getConfigByName(pluginName), persistantConfig);

        app.plugins.setConfigByName(pluginName, pluginConfig)
      }

    });

    dfd.resolve();
    return dfd.promise();

  },

  // called after all pages are loaded
  // caller pages.js
  pagesLoaded: function() {
    app.debug.trace("plugin_Persist.pagesLoaded(" + app.debug.arguments(arguments) + ")");
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();

  },

  // called after pluginsLoaded()
  // caller: plugins.js
  definePluginEvents: function() {
    app.debug.trace("plugin_Persist.definePluginEvents(" + app.debug.arguments(arguments) + ")");

  },
  // called by pages.js
  // called for each page after createPage();
  afterHtmlInjectedBeforePageComputing: function(container) {
    app.debug.trace("plugin_Persist.afterHtmlInjectedBeforePageComputing(" + app.debug.arguments(arguments) + ")");

  },
  // called once
  // set the jQuery delegates
  // caller: pages.js
  pageSpecificEvents: function(container) {
    app.debug.trace("plugin_Persist.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");

  },
  // private functions

  // public functions
  // called by user
  /**
   * Public functions for plugin_Persist
   * 
   * @namespace plugin_Persist.functions
   * 
   */

  setDeep: function(object, locatorArray, value) {
    var currentLocator;
    object = object || {};

    currentLocator = locatorArray.shift();

    if (locatorArray.length === 0) {
      object[currentLocator] = value;
    }

    else {
      object[currentLocator] = object[currentLocator] || {};
      object[currentLocator] = plugin_Persistance.setDeep(object[currentLocator], locatorArray, value);
    }

    return object;
  },

  functions: {
    setPluginConfiguration: function(pluginName, locator, value) {
      var pluginConfig, locatorArray, object;

      // pluginConfig = app.plugins.configByName(pluginName);

      locatorArray = locator.split(".");

      if ((object = app.sess.getObject(pluginName, plugin_Persistance.config.sessionKey)) === null) object = {};

      object = plugin_Persistance.setDeep(object, locatorArray, value);

      // in the local storage
      app.sess.setObject(pluginName, object, plugin_Persistance.config.sessionKey);
      
      // in the config
      pluginConfig = $.extend(true, app.plugins.getConfigByName(pluginName), object);

      app.plugins.setConfigByName(pluginName, pluginConfig)
    },

    getPluginConfiguration: function(pluginName) {
      return app.sess.getObject(pluginName, plugin_Persistance.config.sessionKey);
    }
  }
};