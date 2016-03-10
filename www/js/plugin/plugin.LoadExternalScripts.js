/*
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions: The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var plugin_LoadExternalScripts = {
  config: null,
  loadedScripts: {},
  // called by plugins.js
  constructor: function() {
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();
  },

  pluginsLoaded: function() {
    app.debug.trace(this.config.name + ".pluginsLoaded()", 11);

    var dfd, promises, promiseOfPromises, promisesOfUnorderedScripts, promisesOfUnorderedStyles, orderedStyleArray;

    dfd = $.Deferred();
    promises = Array();

    promisesOfUnorderedStyles = Array();
    promisesOfUnorderedScripts = Array();

    orderedStyleArray = Array();

    /**
     * styles unordered
     */
    app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - case: load unordered styles");
    app.debug.validate(plugin_LoadExternalScripts.config.scripts.style, "array");

    $.each(plugin_LoadExternalScripts.config.scripts.style, function(index, url) {
      if (url in plugin_LoadExternalScripts.loadedScripts) {
        ;// do nothing already loaded
      }

      else if (url.endsWith(".css")) {
        app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - process css: " + url);

        if (app.config.min) {
          url = url.substring(0, url.lastIndexOf(".")) + "." + app.config.version.app + ".css";
        }

        promisesOfUnorderedStyles.push(globalLoader.AsyncStyleLoader(url));
        plugin_LoadExternalScripts.loadedScripts[url] = true;
      }

      else if (url.endsWith(".less")) {
        app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - process less: " + url);

        if (app.config.min) {
          // remove .less
          url = url.substring(0, url.lastIndexOf("."));
          url = url.substring(0, url.lastIndexOf(".")) + "." + app.config.version.app + ".css";
        }

        else {
          url = url;
        }
        promisesOfUnorderedStyles.push(globalLoader.AsyncLessLoader(url));
        plugin_LoadExternalScripts.loadedScripts[url] = true;

      }
    });

    /**
     * styles ordered
     */
    $.when.apply($, promisesOfUnorderedStyles).done(function() {
      app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - case: load ordered styles");
      app.debug.validate(plugin_LoadExternalScripts.config.scripts.styleOrdered, "array");

      $.each(plugin_LoadExternalScripts.config.scripts.styleOrdered, function(index, url) {
        if (url in plugin_LoadExternalScripts.loadedScripts) {
          ;// do nothing already loaded
        }

        else if (url.endsWith(".css")) {
          app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - process css: " + url);
          if (app.config.min) {
            url = url.substring(0, url.lastIndexOf(".")) + "." + app.config.version.app + ".css";
          }

          else {
            url = url;
          }
          orderedStyleArray.push(url);
          plugin_LoadExternalScripts.loadedScripts[url] = true;
        }

        else if (url.endsWith(".less")) {
          app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - process less: " + url);
          if (app.config.min) {
            // remove .less
            url = url.substring(0, url.lastIndexOf("."));
            url = url.substring(0, url.lastIndexOf(".")) + "." + app.config.version.app + ".css";
          }

          orderedStyleArray.push(url);
          plugin_LoadExternalScripts.loadedScripts[url] = true;
        }

      });
      promises.push(plugin_LoadExternalScripts.loadStyleAsync(orderedStyleArray));
    }).fail(function() {
      dfd.reject();
    });

    /**
     * scripts unordered
     */
    app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - case: load unordered scripts");
    app.debug.validate(plugin_LoadExternalScripts.config.scripts.javascript, "array");

    $.each(plugin_LoadExternalScripts.config.scripts.javascript, function(index, url) {
      promisesOfUnorderedScripts.push(globalLoader.AsyncScriptLoader(url));
      plugin_LoadExternalScripts.loadedScripts[url] = true;
    });

    /**
     * scripts ordered
     */
    $.when.apply($, promises).done(function() {
      app.debug.debug("plugin_LoadExternalScripts.pluginsLoaded() - case: load ordered scripts");
      app.debug.validate(plugin_LoadExternalScripts.config.scripts.javascriptOrdered, "array");

      promises.push(plugin_LoadExternalScripts.loadScriptsAsync(plugin_LoadExternalScripts.config.scripts.javascriptOrdered.slice()));
    }).fail(function() {
      dfd.reject();
    });

    /**
     * apply promises
     */
    promiseOfPromises = $.when.apply($, promises);

    promiseOfPromises.done(function() {
      dfd.resolve();
    });

    promiseOfPromises.fail(function() {
      dfd.reject();
    });

    return dfd.promise();
  },

  // called after all pages are loaded
  pagesLoaded: function() {
    app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()", 11);
    var dfd = $.Deferred();

    if (!app.config.min) { return app.load.javascript("../ext/less/less.min.js"); }

    dfd.resolve();
    return dfd.promise();
  },

  definePluginEvents: function() {
  },
  // called by pages.js
  // called for each page
  afterHtmlInjectedBeforePageComputing: function(container) {
    app.debug.trace("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
  },
  // called once
  pageSpecificEvents: function() {
    app.debug.trace("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
  },

  loadScriptsAsync: function(scriptArray) {
    app.debug.trace("plugin_LoadExternalScripts.loadScriptsAsync()");

    var dfd = $.Deferred(), url, promise;

    if (scriptArray.length > 0) {
      url = scriptArray.pop();

      app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - LOAD url: " + url);

      globalLoader.AsyncScriptLoader(url).done(function() {
        plugin_LoadExternalScripts.loadedScripts[url] = true;

        app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - DONE url: " + url);

        app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - call recursive");
        promise = plugin_LoadExternalScripts.loadScriptsAsync(scriptArray);

        promise.done(function() {
          dfd.resolve();
        });

        promise.fail(function() {
          dfd.reject();
        });

      }).fail(function() {
        app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - FAIL url: " + url);
        dfd.reject();
      });
    }

    else {
      app.debug.debug("plugin_LoadExternalScripts.loadScriptsAsync() - case: script array empty; resolve");
      dfd.resolve();
    }

    return dfd.promise();
  },

  loadStyleAsync: function(styleArray) {
    app.debug.trace("plugin_LoadExternalScripts.loadStyleAsync()");

    var dfd = $.Deferred(), url, promise, subPromise;

    if (styleArray.length > 0) {
      url = styleArray.pop();

      app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - LOAD url: " + url);

      if (url.endsWith(".less")) {
        promise = globalLoader.AsyncLessLoader(url)
      }

      else if (url.endsWith(".css")) {
        promise = globalLoader.AsyncStyleLoader(url)
      }

      promise.done(function() {
        plugin_LoadExternalScripts.loadedScripts[url] = true;

        app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - DONE url: " + url);

        app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - call recursive");
        subPromise = plugin_LoadExternalScripts.loadStyleAsync(styleArray);

        subPromise.done(function() {
          dfd.resolve();
        });

        subPromise.fail(function() {
          dfd.reject();
        });

      })

      promise.fail(function() {
        app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - FAIL url: " + url);
        dfd.reject();
      });
    }

    else {
      app.debug.debug("plugin_LoadExternalScripts.loadStyleAsync() - case: css array empty; resolve");
      dfd.resolve();
    }

    return dfd.promise();
  },

  // public
  // called by user
  functions: {
    css: function(url) {
      app.debug.trace("plugin_LoadExternalScripts.functions.css()");
      var promise;
      if (url in plugin_LoadExternalScripts.loadedScripts) {
        app.debug.debug("plugin_LoadExternalScripts.functions.css() - css already loaded: " + url);

        return $.Deferred().resolve();
      }

      else {
        app.debug.debug("plugin_LoadExternalScripts.functions.css() - load css: " + url);
        promise = globalLoader.AsyncStyleLoader(url);

        promise.done(function() {
          app.debug.debug("plugin_LoadExternalScripts.functions.css() - css loading done: " + url);
          app.debug.debug("plugin_LoadExternalScripts.functions.css() - add url to loadedScripts array");
          plugin_LoadExternalScripts.loadedScripts[url] = true;
        });

        return promise;
      }

    },

    less: function(url) {
      app.debug.trace("plugin_LoadExternalScripts.functions.less()");
      var promise;
      if (url in plugin_LoadExternalScripts.loadedScripts) {
        app.debug.debug("plugin_LoadExternalScripts.functions.less() - less already loaded: " + url);

        return $.Deferred().resolve();
      }

      else {
        app.debug.debug("plugin_LoadExternalScripts.functions.less() - load css: " + url);
        promise = globalLoader.AsyncLessLoader(url);

        promise.done(function() {
          app.debug.debug("plugin_LoadExternalScripts.functions.less() - css loading done: " + url);
          app.debug.debug("plugin_LoadExternalScripts.functions.less() - add url to loadedScripts array");
          plugin_LoadExternalScripts.loadedScripts[url] = true;
        });

        return promise;
      }
    },

    javascript: function(url) {
      app.debug.trace("plugin_LoadExternalScripts.functions.javascript()");
      var promise;
      if (url in plugin_LoadExternalScripts.loadedScripts) {
        app.debug.debug("plugin_LoadExternalScripts.functions.javascript() - javascript already loaded: " + url);

        return $.Deferred().resolve();
      } else {
        promise = globalLoader.AsyncScriptLoader(url);

        promise.done(function() {
          app.debug.debug("plugin_LoadExternalScripts.functions.javascript() - javascript loading done: " + url);
          app.debug.debug("plugin_LoadExternalScripts.functions.javascript() - add url to loadedScripts array");
          plugin_LoadExternalScripts.loadedScripts[url] = true;
        });

        return promise;
      }
    }
  }
};