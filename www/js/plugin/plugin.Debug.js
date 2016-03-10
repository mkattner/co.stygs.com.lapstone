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
/**
 * Plugin to create debug output. It will be removed in release Versions.
 * 
 * @namespace plugin_Debug
 */
var plugin_Debug = {
  /**
   * Configuration loaded from json file or html5 storage. Use plugin_Informator to get access.
   * 
   * @private
   */
  config: null,

  /**
   * Log object
   * 
   * @private
   */
  logObject: [],
  feedback: {
    language: {},
    image: {}
  },
  // obligate functions

  /**
   * Constructor is called by plugins.js
   * 
   * @protected
   */
  constructor: function() {
    var dfd = $.Deferred();

    // validate config file
    plugin_Debug.functions.validate(plugin_Debug.config.consoleLevel, "object");
    plugin_Debug.functions.validate(plugin_Debug.config.logLevel, "object");

    dfd.resolve();
    return dfd.promise();
  },

  /**
   * PluginsLoaded event. Called by plugins.js after all plugins are loaded.
   * 
   * @protected
   */
  pluginsLoaded: function() {
    app.debug.trace("plugin_Debug.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
    var dfd = $.Deferred();

    // add dev language to language array
    plugin_MultilanguageIso639_3.config.availableLanguages.push("dev");

    dfd.resolve();
    return dfd.promise();
  },

  // called after all pages are loaded
  /**
   * PagesLoaded event. Called by pages.js after all pages are loaded.
   * 
   * @protected
   */
  pagesLoaded: function() {
    app.debug.trace("plugin_Debug.pagesLoaded(" + app.debug.arguments(arguments) + ")");
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();
  },
  /**
   * Define the jQuery event delegations for the plugin. Called by pages.js after ...
   * 
   * @protected
   * @returns {boolean} Succesfull or unsuccessful
   */
  definePluginEvents: function() {
    app.debug.trace("plugin_Debug.definePluginEvents(" + app.debug.arguments(arguments) + ")");

    /**
     * show app.about() when you click 7 times in 4 secconds
     */
    $("html").on("vclick", function(event) {
      plugin_Debug.aboutListener(event, $(this));

    });
  },

  // called by pages.js
  /**
   * AfterHtmlInjectedBeforePageComputing event. Called by pages.js after page.create().
   * 
   * @protected
   * @param container
   *          {object} jQuery page div
   */
  afterHtmlInjectedBeforePageComputing: function(container) {
    app.debug.trace("plugin_Debug.pagesLoaded(" + app.debug.arguments(arguments) + ")");
    if (plugin_Debug.config.debugDevice && (app.config.min == false)) {
      var debugDiv, select;

      debugDiv = app.ni.element.div({
        id: "divDebug",
        attributes: {
          "data-enhance": "false"
        },
        styles: {
          "position": "fixed",
          "display": "none",
          "z-index": "1050",
          "top": "0px",
          "left": "0px",
          "padding": "5px",
          "min-width": "150px",
          "min-height": "50px",
          "background-color": "rgba(200, 200, 200, 0.7)"
        }
      });

      /**
       * console level
       */
      select = $("<div>").addClass("ui-field-contain").append($("<label>").attr({
        "for": "selConsoleLevel"
      }).text("console level")).append($("<select>").attr({
        "id": "selConsoleLevel",
        "multiple": "multiple",
        "data-native-menu": "false"
      }));

      $.each(plugin_Debug.config.debugLevels, function(levelName, ratingValue) {

        select.find("select").append($("<option>").attr({
          value: levelName
        }).prop({
          "selected": (plugin_Debug.config.consoleLevel.indexOf(levelName) > -1) ? true : false
        }).text(levelName));

      });

      debugDiv.append(select);

      /**
       * log level
       */
      select = $("<div>").addClass("ui-field-contain").append($("<label>").attr({
        "for": "selLogLevel"
      }).text("log level")).append($("<select>").attr({
        "id": "selLogLevel",
        "multiple": "multiple",
        "data-native-menu": "false"
      }));

      $.each(plugin_Debug.config.debugLevels, function(levelName, ratingValue) {

        select.find("select").append($("<option>").attr({
          value: levelName
        }).prop({
          "selected": (plugin_Debug.config.logLevel.indexOf(levelName) > -1) ? true : false
        }).text(levelName));

      });

      debugDiv.append(select);

      /**
       * close button
       */
      debugDiv.append(app.ni.button.button({
        id: "btnClose",
        value: "close"
      }));

      container.append(debugDiv);

      debugDiv.css({
        "display": "none"
      });

      container.append($("<div>").attr("id", "divDebugButton").css({
        "position": "fixed",
        "display": "block",
        "z-index": "1050",
        "top": "0px",
        "left": "0px",
        "height": "10px",
        "width": "20px",
        "background-color": "red"
      }).on("click", function() {
        $(this).hide();
        $("#divDebug").show();
      }));
    }
  },
  /**
   * Called once by pages.js
   * 
   * @protected
   * @param container
   *          {object} jQuery page div
   */
  pageSpecificEvents: function(container) {
    app.debug.trace("plugin_Debug.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");

    if (plugin_Debug.config.debugDevice && (app.config.min == false)) {
      $(document).on('change', '#selConsoleLevel', function() {
        app.debug.event(event);

        app.info.set("plugin_Debug.config.consoleLevel", $("#selConsoleLevel").val() || ["OFF"]);
      });

      $(document).on('change', '#selLogLevel', function() {
        app.debug.event(event);

        app.info.set("plugin_Debug.config.logLevel", $("#selLogLevel").val() || ["OFF"]);
      });

      $(document).on('click', '#btnClose', function() {
        app.debug.event(event);

        $('#divDebug').hide();

        // $('#divDebug').animate({
        // "height": "0px"
        // }, {
        // "duration": 200
        // });

        $("#divDebugButton").show();
      })
    }
  },

  // private functions
  aboutListener: function(event, element) {
    var clicks;

    if (!element.data("clicks")) {
      element.data("clicks", []);
    }

    clicks = element.data("clicks");

    clicks.unshift(Date.now());

    if ((clicks[0] - clicks[6]) < 1500) {

      clicks = [];
      plugin_Debug.about();
    }

    clicks = clicks.slice(0, 7);

    // alert(clicks);
  },

  about: function() {
    app.debug.validate(plugin_Notification);

    var content;

    $("html").off("vclick");

    content = $("<ul>");

    content.append($("<li>").append($("<p>").text("App version: ").append($("<strong>").text(app.config.version.app))));
    content.append($("<li>").append($("<p>").text("Lapstone version: ").append($("<strong>").text(app.config.version.lapstone))));
    content.append($("<li>").append($("<p>").text("Lapstone release version: ").append($("<strong>").text(app.config.min))));

    content.append($("<li>").append($("<p>").text("jQuery version: ").append($("<strong>").text($.fn.jquery))));
    content.append($("<li>").append($("<p>").text("jQuery mobile version: ").append($("<strong>").text($.mobile.version))));
    content.append($("<li>").append($("<p>").text("Use apache cordova: ").append($("<strong>").text(app.config.apacheCordova))));

    // HTML Meta
    content.append($("<li>").append($("<p>").text("User Agent: ").append($("<strong>").text(navigator.userAgent))));
    content.append($("<li>").append($("<p>").text("HTML Viewport: ").append($("<strong>").text($("meta[name=viewport]").attr("content")))));
    // Page
    content.append($("<li>").append($("<p>").text("Current Page: ").append($("<strong>").text($("div[data-role=page]").attr("id")))));
    // App
    content.append($("<li>").append($("<p>").text("Startup Time: ").append($("<strong>").text(app.config.startup + " seconds"))));

    app.notify.dialog({
      text: content,
      title: "About the app.",
      headline: "Use this data when you report a bug.",
      buttonLeft: "Report a Bug",
      buttonRight: "Close",
      callbackButtonLeft: function(popup) {
        $("html").on("vclick", function(event) {
          plugin_Debug.aboutListener(event, $(this));
        });
      },
      callbackButtonRight: function(popup) {
        $("html").on("vclick", function(event) {
          plugin_Debug.aboutListener(event, $(this));
        });
      },
      delayInMs: 0,
      width: "80%"
    })
  },

  // public functions
  /**
   * The public functions used by the API *
   * 
   * @memberof plugin_Debug
   * @namespace plugin_Debug.functions
   */
  functions: {

    /**
     * Consumes an array with values of different types and returns it as a string.
     * 
     * @memberof plugin_Debug.functions
     * @function arguments
     * @param {Array}
     *          argumentsToPrint - An array with the arguments to print.
     * @returns {String} A string representation of the array.
     */
    arguments: function(argumentsToPrint) {
      var returnValue = "";

      $.each(argumentsToPrint, function(index, argument) {
        if ($.isPlainObject(argument))
          returnValue += JSON.stringify(argument) + ", ";
        else
          returnValue += argument + ", ";
      });

      return returnValue.substring(0, returnValue.length - 2);
    },

    // debug functions

    /**
     * Handles the debug output on level: TRACE
     * 
     * @memberof plugin_Debug.functions
     * @function trace
     * @param {String}
     *          output - The debug output.
     */
    trace: function(output) {
      // log debug output
      this.log(output, "TRACE");
    },

    /**
     * Handles the debug output on level: DEBUG
     * 
     * @memberof plugin_Debug.functions
     * @function debug
     * @param {String}
     *          output - The debug output.
     */
    debug: function(output) {
      // log debug output
      this.log(output, "DEBUG");
    },

    /**
     * Handles the debug output on level: TODO
     * 
     * @memberof plugin_Debug.functions
     * @function todo
     * @param {String}
     *          output - The debug output.
     */
    todo: function(output) {
      // log debug output
      this.log(output, "TODO", true);
    },

    /**
     * Handles the debug output on level: INFO
     * 
     * @memberof plugin_Debug.functions
     * @function info
     * @param {String}
     *          output - The debug output.
     */
    info: function(output) {
      // log debug output
      this.log(output, "INFO");
    },

    /**
     * Handles the debug output on level: EVENT
     * 
     * @memberof plugin_Debug.functions
     * @function event
     * @param {jQuery.Event}
     *          output - The debug output.
     */
    event: function(event) {
      // log debug output
      // eventinger = event;
      this.log("Type: " + event.type + " Target classes: " + $(event.target).attr("class"), "EVENT");
    },

    /**
     * Handles the debug output on level: APP
     * 
     * @memberof plugin_Debug.functions
     * @function app
     * @param {String}
     *          output - The debug output.
     */
    app: function(output) {
      // log debug output
      this.log(output, "APP");
    },

    /**
     * Handles the debug output on level: WARN
     * 
     * @memberof plugin_Debug.functions
     * @function warn
     * @param {String}
     *          output - The debug output.
     */
    warn: function(output) {
      // log debug output
      this.log(output, "WARN");
    },

    /**
     * Handles the debug output on level: ERROR
     * 
     * @memberof plugin_Debug.functions
     * @function error
     * @param {String}
     *          output - The debug output.
     */
    error: function(output) {
      // log debug output
      this.log(output, "ERROR", true);
    },

    /**
     * Handles the debug output on level: FATAL
     * 
     * @memberof plugin_Debug.functions
     * @function fatal
     * @param {String}
     *          output - The debug output.
     */
    fatal: function(output) {
      // log debug output
      this.log(output, "FATAL", true);
    },

    /**
     * Handles the debug output on level: DEPRECATED
     * 
     * @memberof plugin_Debug.functions
     * @function deprecated
     * @param {String}
     *          output - The debug output.
     */
    deprecated: function(text) {
      if (plugin_Debug.config.debugDevice) {
        try {
          console.error("Deprecated: " + text);
        }

        catch (e) {
          ;
        }

      }
    },

    flat: function() {

    },

    /**
     * Validates if an objects exists. You can use this function to validate that an object exists before you use it.
     * E.g.: Validate if a JSON configuration file has specific members.
     * 
     * @memberof plugin_Debug.functions
     * @function validate
     * @param {Object}
     *          object - The object to validate.
     */

    /**
     * Validates if an objects of a specific type exists. You can use this function to validate that an object of a
     * specific type exists before you use it. E.g.: Validate if a JSON configuration file has specific members with
     * specific types.
     * 
     * @memberof plugin_Debug.functions
     * @function validate
     * @param {Object}
     *          object - The object to validate.
     * @param {Type}
     *          type - Type to validate.
     */
    validate: function(object, type) {
      if (type) {
        if (type === "array") {
          if (!Array.isArray(object)) {
            plugin_Debug.functions.fatal();
            throw new Error("Validation problem. Please look at the stacktrace.");

          }
        }

        else if (!(typeof object === type)) {
          plugin_Debug.functions.fatal();
          throw new Error("Validation problem: " + typeof object + " != " + type + ". Please look at the stacktrace.");
        }
      }

      else {
        if (!object) {
          plugin_Debug.functions.fatal();
          throw new Error("Validation problem. Please look at the stacktrace.");
        }
      }
    },

    alert: function(text, level) {
      console.warn("Dep. " + text);
    },

    /**
     * Handles the debug output. Depending of the configuration the function is printing to console and/or to a log
     * object.
     * 
     * @memberof plugin_Debug.functions
     * @function log
     * @param {String}
     *          output - The debug output.
     * @param {String} -
     *          The debug level.
     */
    log: function(output, level, trace) {

      if (plugin_Debug.config.debugDevice) {

        // log to object
        if (plugin_Debug.config.logLevel.indexOf(level) > -1) {
          plugin_Debug.logObject.push(output);
        }

        // log to console
        if (plugin_Debug.config.consoleLevel.indexOf(level) > -1) {
          console.log(level + ": " + output);
          if (trace) {
            // print stack trace
            try {
              console.error("Trace:");
            }

            catch (e) {
              ;
            }
          }
        }

        // log to webservice
      }
    },

    showLog: function() {
      console.warn("Deprecated function!!");
      alert(JSON.stringify(plugin_Debug.logObject));
    },

    /**
     * List functions.
     * 
     * @memberof plugin_Debug.functions
     * @namespace plugin_Debug.functions.ls
     */
    ls: {

      /**
       * Lists all webservice definitions (wsd).
       * 
       * @memberof plugin_Debug.functions.ls
       * @function wsd
       */
      wsd: function() {
        app.debug.trace("plugin_Debug.functions.ls.wsd(" + app.debug.arguments(arguments) + ")");
        $.each(plugin_RestClient.config.webservices, function(wsName, singleWsd) {
          var path, query;

          console.log("Name: " + wsName);

          if (singleWsd.hasOwnProperty("url")) {
            path = singleWsd.url.split('?')[0];
            query = singleWsd.url.split('?')[1];

            console.log("\tPath: " + path);
            // console.log("\tQuery: " + query);

            // console.log("\tPath parameter: todo");

            console.log("\tQuery parameter:");
            if (query) $.each(query.split("&"), function(index, parameter) {
              console.log("\t\t" + parameter.replace("=", " = "));
            });
            console.log(" ");
          }

          else {
            console.error("Webservice has no url property.");
          }
        });

      }
    },

    /**
     * Feedback functions.
     * 
     * @memberof plugin_Debug.functions
     * @namespace plugin_Debug.functions.feedback
     */
    feedback: {

      /**
       * Collect untranslated language IDs
       * 
       * @memberof plugin_Debug.functions.feedback
       * @function language
       * @param {Object
       *          <String, String> - Untranslated
       */

      /**
       * Collect untranslated language IDs. And prints the untranslated IDs to console with debug level: WARN.
       * 
       * @memberof plugin_Debug.functions.feedback
       * @function language
       * @param {Object
       *          <String, Object> - Untranslated
       */
      language: function(object) {
        app.debug.trace("plugin_Debug.functions.feedback.language(" + app.debug.arguments(arguments) + ")");
        app.debug.warn("Unimplemented language: " + JSON.stringify(object));
        $.extend(true, plugin_Debug.feedback.language, object);
      },

      languageGetJson: function() {
        app.debug.trace("plugin_Debug.functions.feedback.languageGetJson(" + app.debug.arguments(arguments) + ")");
        return JSON.stringify($.extend(true, plugin_Debug.feedback.language, plugin_MultilanguageIso639_3.dictionary));
      },

      image: function(object) {
        app.debug.trace("plugin_Debug.functions.feedback.image(" + app.debug.arguments(arguments) + ")");
        app.debug.warn("Unimplemented image: " + JSON.stringify(object));
        $.extend(true, plugin_Debug.feedback.image, object);
      },
      imageGetJson: function() {
        app.debug.trace("plugin_Debug.functions.feedback.languageGetJson(" + app.debug.arguments(arguments) + ")");
        return JSON.stringify($.extend(true, plugin_Debug.feedback.image, plugin_ImageProvider.images));
      },
      wsdGetJson: function() {
        app.debug.trace("plugin_Debug.functions.feedback.wsdGetJson(" + app.debug.arguments(arguments) + ")");
        return JSON.stringify(plugin_RestClient.config.webservices);
      }
    }
  },

};