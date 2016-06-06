/**
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

/**
 * global error handling
 */
window.onerror = function(message, fileURL, lineNumber, columnNumber, errorObject) {

  console.log("Global ERROR:");
  console.log("Message: " + message);
  console.log("File: " + fileURL);
  console.log("Line: " + lineNumber + " Column: " + columnNumber);

};

/**
 * App namespace
 * 
 * @namespace app
 */
var app = {
  config: {
    // name : "app",
    useJQueryMobile: true,
    apacheCordova: null,
    jQueryMobile: null
  },

  addObject: function(name, object) {
    console.error("Deprecated Function!");
    app[name] = object;
  }

};

function initialisation() {
  var dfd, promise;

  dfd = $.Deferred();

  extendJsAndJquery();

  dfd.resolve();

  return dfd.promise();
}

function loadPlugins() {
  var dfd = $.Deferred(), url, promise;

  if (app.config.min) {
    url = "../js/plugin/all.plugin.min." + app.config.version.app + ".js";
  } else {
    url = "../js/plugin/plugins.js";
  }

  // load the plugins file
  promise = globalLoader.AsyncScriptLoader(url);
  promise.done(function() {
    startup.addFunction("                  plugin constructor", plugins.constructor, "");
    // plugins.constructor();
    dfd.resolve();
  });
  promise.fail(function() {
    dfd.reject();
  });

  return dfd.promise();
}

function loadPages() {
  var dfd = $.Deferred(), url, promise;

  if (app.config.min) {
    url = "../js/page/all.page.min." + app.config.version.app + ".js";
  } else {
    url = "../js/page/pages.js";
  }

  // load pages file
  promise = globalLoader.AsyncScriptLoader(url);
  promise.done(function() {
    startup.addFunction("                  page constructor", pages.constructor, "");
    // pages.constructor();
    dfd.resolve();
  });
  promise.fail(function() {
    dfd.reject();
  });

  return dfd.promise();
}

function loadConfiguration() {
  var dfd = $.Deferred(), promise;

  promise = globalLoader.AsyncJsonLoader("../js/lapstone.json");

  promise.done(function(configuration) {
    //
    // $.each(configuration, function(k, v) {
    // app.config[k] = v
    // });

    $.extend(true, app.config, configuration);

    initialisationPanel.start().done(function() {
      // show version
      $('.lapstone-version').text(app.config.version.lapstone);
      $('.app-version').text(app.config.version.app);

      if (configuration.name === undefined) console.warn("lapstone.json has no 'name' property.");

      if (configuration.title === undefined) console.warn("lapstone.json has no 'title' property.");

      if (configuration.version === undefined) {
        console.warn("lapstone.json has no 'version' property.");
      } else {
        if (configuration.version.app === undefined) console.warn("lapstone.json has no 'version.app' property.");

        if (configuration.version.lapstone === undefined) console.warn("lapstone.json has no 'version.lapstone' property.");

        if (configuration.version.update === undefined) console.warn("lapstone.json has no 'version.update' property.");
      }

      if (configuration.min === undefined) console.warn("lapstone.json has no 'min' property.");

      if (configuration.startPage === undefined) console.warn("lapstone.json has no 'startPage' property.");

      if (configuration.startPage_firstStart === undefined) console.warn("lapstone.json has no 'startPage_firstStart' property.");

      if (configuration.startPage_loggedIn === undefined) console.warn("lapstone.json has no 'startPage_loggedIn' property.");

      if (configuration.badConnectionPage === undefined) console.warn("lapstone.json has no 'badConnectionPage' property.");

      // transform app/lapstone version to an integer value
      // app.config.version['lapstone_int'] = app.config.version.lapstone.toIntegerVersion();
      // app.config.version['app_int'] = app.config.version.app.toIntegerVersion();

      // preset the title of the app
      $('title').text(app.config.title);

      dfd.resolve();
    }).fail(function() {
      dfd.reject();
    });

  });

  promise.fail(function() {
    dfd.reject();
  });

  return dfd.promise();
}

function updateFramework() {
  var dfd = $.Deferred();

  if (window.plugin_Informator) {

    var currentLapstoneVersion, oldLapstoneVersion, currentAppVersion, oldAppVersion;// currentAppVersion_int,
    // currentLapstoneVersion_int;

    currentAppVersion = app.config.version.app;
    currentLapstoneVersion = app.config.version.lapstone;

    // currentAppVersion_int = app.config.version.app.toIntegerVersion();
    // currentLapstoneVersion_int = app.config.version.lapstone.toIntegerVersion();

    plugin_Informator.loadConfigurationIntoHtml5Storage({
      "app": {
        "config": {
          "version": app.config.version
        }
      }
    });

    oldLapstoneVersion = app.config.version.lapstone;
    oldAppVersion = app.config.version.app;

    if (app.config.version.update === true) {
      console.warn("update done");
    }
    // alert(currentAppVersion + oldAppVersion + currentLapstoneVersion +
    // oldLapstoneVersion);
    if (currentLapstoneVersion != oldLapstoneVersion || currentAppVersion != oldAppVersion) {
      console.warn("TODO Lastone || App Version Update");
      // alert("do update")
      app.info.set("app.config.version.update", true);

      app.info.set("app.config.version.app", currentAppVersion);
      app.info.set("app.config.version.lapstone", currentLapstoneVersion);
      // app.info.set("app.config.version.app_int", currentAppVersion_int);
      // app.info.set("app.config.version.lapstone_int", currentLapstoneVersion_int);

      // do the update before reloading
      globalLoader.AsyncJsonLoader("../files/update/registry.json", 3).done(function(response) {
        var updateScriptPromisses;

        updateScriptPromisses = [];

        $.each(response.updateRegistry, function(index, updateObject) {
          console.log(JSON.stringify(updateObject))

          if (updateObject.startWithAppVersion && updateObject.stopWithAppVersion) {
            if (currentAppVersion.toIntegerVersion() >= updateObject.startWithAppVersion.toIntegerVersion() && currentAppVersion.toIntegerVersion() < updateObject.stopWithAppVersion.toIntegerVersion()) {
              // App Update
              console.warn("App Update: " + updateObject.description);
              updateScriptPromisses.push(globalLoader.AsyncScriptLoader("../files/update/scripts/" + updateObject.updateScript, 1));
            }
          }

          if (updateObject.startWithLapstoneVersion && updateObject.stopWithLapstoneVersion) {
            if (currentLapstoneVersion.toIntegerVersion() >= updateObject.startWithLapstoneVersion.toIntegerVersion() && currentLapstoneVersion.toIntegerVersion() < updateObject.stopWithLapstoneVersion.toIntegerVersion()) {
              // Lapstone Update
              console.warn("Lapstone Update: " + updateObject.description);
              updateScriptPromisses.push(globalLoader.AsyncScriptLoader("../files/update/scripts/" + updateObject.updateScript, 1));
            }
          }

        });

        $.when.apply($, updateScriptPromisses).done(function() {
          location.reload();
        }).fail(function() {
          dfd.reject();
        });

      }).fail(function() {
        dfd.reject();
      });

      // reload

    }

    else {
      dfd.resolve();
    }
  }

  else {
    console.log("Update mechanism doesn't works without Informator plugin.")
    dfd.resolve();
  }

  return dfd.promise();
}

function cacheAjax() {
  var cache, update;
  if (JSON.parse(window.localStorage.getItem(app.config.name + ".informator-config.app.config.version.update")) !== null) {
    update = JSON.parse(window.localStorage.getItem(app.config.name + ".informator-config.app.config.version.update"));
    // console.warn("update: " + update)
    cache = !update;
  } else {
    cache = false;
  }
  // true;
  // console.warn("cache: " + cache);
  return cache;
}

function enchantPages() {
  var dfd = $.Deferred(), promise;

  promise = globalLoader.AsyncScriptLoader("../ext/jQueryMobile/jquery.mobile.min.js");

  promise.done(function() {

    dfd.resolve();

  });

  promise.fail(function() {
    dfd.reject();
  });

  return dfd.promise();
}

var globalLoader = {
  globalTimeout: 10000,
  globalAttempts: 3,

  AsyncJsonLoader: function(url, attempts, attempt, dfd) {

    if (dfd == undefined) dfd = $.Deferred();

    if (attempt == undefined) attempt = 1;

    if (attempts == undefined) attempts = globalLoader.globalAttempts;

    $.ajax({
      cache: cacheAjax(),
      url: url,
      async: true,
      dataType: "json",
      timeout: globalLoader.globalTimeout
    }).done(function(data, textStatus, jqXHR) {
      if (textStatus === "timeout") {
        startup.log("Timeout while loading: " + url);
        startup.log("It was attempt " + attempt + " of " + attempts + ".");
        if (attempt < attempts) {
          startup.log("So we try again.");
          globalLoader.AsyncJsonLoader(url, attempts, attempt + 1, dfd);
        } else {
          startup.log("So the framework loading fails.");
          dfd.reject(textStatus);
        }
      } else {
        dfd.resolve(data);
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      if (attempt < attempts) {
        globalLoader.AsyncJsonLoader(url, attempts, attempt + 1, dfd);
      } else {
        console.log("Fatal Error: Can't load JSON. Url: " + url + " Status: " + textStatus);
        dfd.reject(arguments);
      }
    });

    return dfd.promise();
  },

  JsonLoader: function(url, attempts, attempt) {
    console.warn("Lapstone: Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + url);
    var json = null;
    $.ajax({
      cache: cacheAjax(),
      url: url,
      async: false,
      dataType: "json",
      timeout: globalLoader.globalTimeout,
      success: function(data) {
        // alert(JSON.stringify(data));
        json = data;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Fatal Error: Can't load JSON. Url: " + url + " Status: " + textStatus);
      }
    });
    return json;
  },

  AsyncScriptLoader: function(url, attempts, attempt, dfd) {

    if (dfd == undefined) dfd = $.Deferred();

    if (attempt == undefined) attempt = 1;

    if (attempts == undefined) attempts = globalLoader.globalAttempts;

    $.ajax({
      cache: cacheAjax(),
      url: url,
      async: true,
      dataType: "script",
      timeout: globalLoader.globalTimeout
    }).done(function(data, textStatus, jqXHR) {
      if (textStatus === "timeout") {
        startup.log("Timeout while loading: " + url);
        startup.log("It was attempt " + attempt + " of " + attempts + ".");
        if (attempt < attempts) {
          startup.log("So we try again.");
          globalLoader.AsyncScriptLoader(url, attempts, attempt + 1, dfd);
        } else {
          startup.log("So the framework loading fails.");
          dfd.reject(textStatus);
        }
      } else {
        // i dont know why
        // window.setTimeout(function() {
        dfd.resolve(data);
        // }, 200);
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      if (attempt < attempts) {
        globalLoader.AsyncScriptLoader(url, attempts, attempt + 1, dfd);
      } else {
        console.log("Fatal Error: Can't load Script. Url: " + url + " Status: " + textStatus);
        dfd.reject(arguments);
      }
    });
    return dfd.promise();
  },

  ScriptLoader: function(url, attempts, attempt) {
    console.warn("Lapstone: Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + url);
    $.ajax({
      cache: cacheAjax(),
      url: url,
      async: false,
      dataType: "script",
      timeout: globalLoader.globalTimeout,
      success: function(data) {

      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Fatal Error: Can't load Script. Url: " + url + " Status: " + textStatus);

      }
    });
  },

  AsyncTextLoader: function(url, attempts, attempt, dfd) {

    if (dfd == undefined) dfd = $.Deferred();

    if (attempt == undefined) attempt = 1;

    if (attempts == undefined) attempts = globalLoader.globalAttempts;

    $.ajax({
      cache: cacheAjax(),
      url: url,
      async: true,
      dataType: "text",
      timeout: globalLoader.globalTimeout
    }).done(function(data, textStatus, jqXHR) {
      if (textStatus === "timeout") {
        startup.log("Timeout while loading: " + url);
        startup.log("It was attempt " + attempt + " of " + attempts + ".");
        if (attempt < attempts) {
          startup.log("So we try again.");
          globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
        } else {
          startup.log("So the framework loading fails.");
          dfd.reject(textStatus);
        }
      } else {
        dfd.resolve(data);
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      if (attempt < attempts) {
        globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
      } else {
        console.log("Fatal Error: Can't load Text. Url: " + url + " Status: " + textStatus);
        dfd.reject(arguments);
      }
    });
    return dfd.promise();
  },

  TextLoader: function(url, attempts, attempt) {
    console.warn("Lapstone: Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + url);
    var text = null;
    $.ajax({
      cache: cacheAjax(),
      url: url,
      async: false,
      dataType: "text",
      timeout: globalLoader.globalTimeout,
      success: function(data) {
        // alert(JSON.stringify(data));
        text = data;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Fatal Error: Can't load TEXT. Url: " + url + " Status: " + textStatus);
      }
    });
    return text;
  },

  AsyncStyleLoader: function(url, attempts, attempt) {
    var dfd = $.Deferred();
    globalLoader.AsyncTextLoader(url).done(function(styleString) {

      styleString = styleString.replaceAll("url(\"", "url(\"" + url.substring(0, url.lastIndexOf("/") + 1));
      styleString = styleString.replaceAll("url('", "url('" + url.substring(0, url.lastIndexOf("/") + 1));

      //console.log(styleString)

      $('head').append($("<style>").text(styleString));
      dfd.resolve(styleString);
    }).fail(function() {
      dfd.reject(arguments);
    })

    return dfd.promise();
  },

  StyleLoader: function(url, attempts, attempt) {
    var css, cssLink;

    if (!cacheAjax())
      cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '?_=' + new Date().getTime() + '">';
    else
      cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '">';

    $("head").append(cssLink);
  },

  StyleLoader: function(url, attempts, attempt) {
    var css, cssLink;

    if (!cacheAjax())
      cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '?_=' + new Date().getTime() + '">';
    else
      cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '">';

    $("head").append(cssLink);
  },

  AsyncLessLoader: function(url, attempts, attempt, dfd) {

    if (dfd == undefined) dfd = $.Deferred();

    if (attempt == undefined) attempt = 1;

    if (attempts == undefined) attempts = globalLoader.globalAttempts;

    $.ajax({
      cache: cacheAjax(),
      url: url,
      async: true,
      dataType: "text",
      timeout: globalLoader.globalTimeout
    }).done(function(data, textStatus, jqXHR) {
      // console.log("+++++++ " + JSON.stringify(jqXHR));
      if (textStatus === "timeout") {
        startup.log("Timeout while loading: " + url);
        startup.log("It was attempt " + attempt + " of " + attempts + ".");
        if (attempt < attempts) {
          startup.log("So we try again.");
          globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
        } else {
          startup.log("So the framework loading fails.");
          dfd.reject(arguments);
        }
      } else {
        if ($("style#lapstoneStyles")[0] == undefined) $('head').append($("<style>").attr("id", "lapstoneStyles"));

        $("style#lapstoneStyles").before('<link rel="stylesheet/less" type="text/css" href="' + url + '">');
        dfd.resolve(data);
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      if (attempt < attempts) {
        globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
      } else {
        console.log("Fatal Error: Can't load Text. Url: " + url + " Status: " + textStatus);
        dfd.reject(arguments);
      }
    });
    return dfd.promise();
  },

  LessLoader: function(url, attempts, attempt) {
    var css, cssLink;

    if (!cacheAjax())
      cssLink = '<link rel="stylesheet/less" type="text/css" href="' + url + '?_=' + new Date().getTime() + '">';
    else
      cssLink = '<link rel="stylesheet/less" type="text/css" href="' + url + '">';

    $("head").append(cssLink);
  }
}

$(document).bind("mobileinit", function() {
  app.debug.debug("jQuery mobile initialized", 30);
  $.mobile.ajaxEnabled = true;
  $.support.cors = true;
  $.mobile.allowCrossDomainPages = true;
  $.mobile.page.prototype.options.domCache = false;

  $.mobile.loader.prototype.options.text = "loading";
  $.mobile.loader.prototype.options.textVisible = false;
  $.mobile.loader.prototype.options.theme = "a";
  $.mobile.loader.prototype.options.html = "";

  $.mobile.defaultPageTransition = 'slide';
  app.config.jQueryMobile = true;
});

/* on cordova initialisation */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // alert("cordova initialized", 30);
  app.config.apacheCordova = true;
  $('body').addClass("app-apache-cordova");
}

function waitForMobileinit() {
  var dfd = $.Deferred(), interval;

  if (app.config.jQueryMobile == true) {
    dfd.resolve();
  } else {
    interval = setInterval(function() {
      if (app.config.jQueryMobile == true) {
        dfd.resolve();
        clearInterval(interval);
      }
    }, 50);
  }

  return dfd.promise();
}

function waitForDeviceready() {
  var dfd = $.Deferred(), interval;
  // alert(window.cordova);
  if (window.cordova) {
    interval = setInterval(function() {
      clearInterval(interval);
      if (app.config.apacheCordova == true) {
        dfd.resolve();

      }
    }, 50);
  } else {
    app.config.apacheCordova = false;
    dfd.resolve();
  }

  return dfd.promise();
}

var initialisationPanel = {
  start: function() {
    var dfd = $.Deferred(), doneFunction, failFunction;

    $('head').append("<title>");
    $('title').text("...");

    if (app.config.min) {
      $("head").append($("<style>").append(app.config.startupStyle));
      $('body').append(app.config.startupContent);
      dfd.resolve();
    }

    else {
      globalLoader.StyleLoader("../js/lapstone.css");
      globalLoader.AsyncTextLoader('../js/lapstone.html').done(function(data) {

        $('body').append(data);
        dfd.resolve();
      }).fail(function() {
        dfd.reject();
      });
    }
    return dfd.promise();
  },

  hide: function() {
    $("#LAPSTONE").remove();
  },

  updateProgress: function() {
    var current = parseInt($("progress").attr("value"));

    $("progress").attr("value", current + 5)

  },

  changeStatus: function() {
    $("#LAPSTONE .lapstone-status").text(startup.currentDefinition['status']);
  },

  finish: function() {
    initialisationPanel.hide();
  }
}

var startupDefinition = [{
  "status": "Lapstone startup: loading configuration",
  "function": loadConfiguration,
  "parameter": "",
  "result": "",
  "image": "configuration"
}, {
  "status": "Lapstone startup: initialisation",
  "function": initialisation,
  "parameter": "",
  "result": "",
  "image": "start"
}, {
  "status": "Lapstone startup: load plugins",
  "function": loadPlugins,
  "parameter": "",
  "result": "",
  "image": "plugins"
}, {
  "status": "Lapstone startup: load pages",
  "function": loadPages,
  "parameter": "",
  "result": "",
  "image": "pages"
}, {
  "status": "Lapstone startup: checking for updates",
  "function": updateFramework,
  "parameter": "",
  "result": "",
  "image": "updates"
}, {
  "status": "Lapstone startup: load jQueryMobile",
  "function": enchantPages,
  "parameter": "",
  "result": "",
  "image": "enchantment"
}, {
  "status": "Lapstone startup: wait for apache cordova deviceready event",
  "function": waitForDeviceready,
  "parameter": "",
  "result": "",
  "image": "deviceready"
}, {
  "status": "Lapstone startup: wait for jQuerysmobile mobileinit event",
  "function": waitForMobileinit,
  "parameter": "",
  "result": "",
  "image": "mobileinit"
}]

var startup = {
  currentDefinition: {
    "status": "----------------- Starting the Lapstone Framework",
  // "function": waitForDeviceready,
  // "parameter": "",
  // "result": "",
  // "image": "deviceready"
  },
  dfd: $.Deferred(),
  timestamp: Date.now() / 1000,
  startupTimestamp: Date.now() / 1000,
  promise: null,
  images: {},

  addFunction: function(status, func, parameter) {
    startupDefinition.unshift({
      "status": status,
      "function": func,
      "parameter": parameter,
      "result": ""
    });
  },
  log: function() {
    var timestamp = Date.now() / 1000;
    console.log((timestamp - startup.timestamp).toFixed(3) + "s: " + startup.currentDefinition['status']);
    startup.timestamp = timestamp;
  },

  functionDone: function(data) {
    var promise;

    // remove that shit, it costs 1000ms
    // delay startup for a smoother user experience
    // window.setTimeout(function() {
    startup.log();
    startup.currentDefinition = startupDefinition.shift();
    if (startup.currentDefinition) {

      initialisationPanel.changeStatus();
      initialisationPanel.updateProgress();
      promise = startup.currentDefinition['function'](startup.currentDefinition['parameter']);

      promise.done(startup.functionDone);
      promise.fail(startup.functionFail);

      // }, 50);

      // alert('next')
    } else {
      startup.dfd.resolve();
    }
  },

  functionFail: function(error) {
    var serializedError;

    console.log(" FAILED");
    startup.log();
    try {
      serializedError = JSON.stringify(error);
      console.log("ERROR: " + serializedError);
    } catch (e) {
    }

    startup.dfd.reject();
  },

  initFramework: function() {
    startup.functionDone();

    return startup.dfd.promise();
  }
}

// jquery loaded
$(document).ready(function() {
  var inititalisationPromise, startupDuration;

  inititalisationPromise = startup.initFramework();

  inititalisationPromise.done(function() {
    // alert("init done");
    // setTimeout(function() {

    initialisationPanel.finish();
    

    // trigger the lapstone initialisation event
    $(document).trigger("lapstone");

    app.config['startup'] = ((Date.now()) / 1000) - startup.startupTimestamp;

    console.log("Lapstone started in " + app.config.startup + "seconds");

    // }, 200);
  });

  inititalisationPromise.fail(function() {

    throw new Error("Initialisation problem. Please look at the stacktrace.");

    if (confirm("App initialisation failed. Confirm to reload the app.")) {
      location.reload();
    }

    else {
      alert("App initialisation failed. Close the app and restart again");
    }
  });

  inititalisationPromise.always(function() {
    // alert();
    if (window.plugin_Informator) {
      app.info.set("app.config.version.update", false);
    }

    else {
      console.log("Update mechanism doesn't works without Informator plugin.")
    }
  });

});

function handleOpenURL(url) {
  // TODO: parse the url, and do something
  setTimeout(function() {
    alert(url);
  }, 0);
}

/**
 * some functions
 */
function extendJsAndJquery() {

  Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {
      s = "0" + s;
    }
    return s;
  }

  // useful hashCode function
  String.prototype.hashCode = function() {
    var hash, length, _char;
    hash = 0;
    length = this.length;

    if (length == 0) return hash;
    for (i = 0; i < length; i++) {
      _char = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + _char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // some android versions don't support startsWith
  if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function(str) {
      return this.indexOf(str) === 0;
    };
  }

  if (typeof String.prototype.replaceAll != 'function') {
    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
    };
  }

  if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }

  if (typeof String.prototype.contains != 'function') {
    String.prototype.contains = function(it) {
      return this.indexOf(it) != -1;
    };
  }

  String.prototype.toIntegerVersion = function(delimiter) {
    var splittedString, integerVersion;

    integerVersion = 0;
    if (delimiter) {
      splittedString = this.split(delimiter).reverse();
    }

    else {
      splittedString = this.split(".").reverse();
    }

    $.each(splittedString, function(index, value) {
      integerVersion += Math.pow(10000, index) * parseInt(value);
    });

    return integerVersion;
  }
}