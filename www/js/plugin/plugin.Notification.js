/**
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted,
 * free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions: The above copyright notice and this
 * permission notice shall be included in all copies or substantial portions of
 * the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
 * EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var plugin_Notification = {
  config: null,
  notifications: null,
  callbackFunction: null,
  callbackFunctionBtnLeft: null,
  callbackFunctionBtnRight: null,

  // called by plugins.js
  constructor: function() {
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();

  },

  // called after all plugins are loaded
  pluginsLoaded: function() {
    app.debug.trace(this.config.name + ".pluginsLoaded()");
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();

  },

  // called after all pages are loaded
  // caller pages.js
  pagesLoaded: function() {
    app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()");
    var dfd = $.Deferred();
    window.setTimeout(function() {
      if (plugin_Notification.config.enablePushNotifications && app.config.apacheCordova && app.sess.loggedIn() == true) {
        app.debug.debug("plugin_Notification.pagesLoaded() register device on licence and push server");
        // alert("its time to register the device")
        // alert("device uuid: " + device.uuid);
        if (window.device) {
          var promise = app.rc.getJson("notifyme.registerDevice", {
            "deviceId": device.uuid,
            "contextToken": app.sess.getValue("userToken")
          }, true);

          promise.done(function(resultObject) {
            if (window.push != undefined) {
              app.debug.debug("plugin_Notification.pagesLoaded() register device on aerogear push server");
              plugin_Notification.config.pushConfig.alias = device.uuid;
              push.register(plugin_Notification.functions.push_onNotification, function() {
                app.debug.debug("plugin_Notification.pagesLoaded() success: device is registered on push server");
              }, function(error) {
                app.debug.debug("plugin_Notification.pagesLoaded() error: device is not registered on push server");
                app.debug.debug("plugin_Notification.pagesLoaded() error: " + error);
              }, plugin_Notification.config.pushConfig);
            } else {
              app.debug.debug("plugin_Notification.pagesLoaded() cordova push plugin not installed");
            }
          });

          promise.fail(function(errorObject) {
            app.debug.debug("plugin_Notification.pagesLoaded() not able to register device on licence server");
          });
        } else {
          app.debug.debug("plugin_Notification.pagesLoaded() cordova device plugin not installed");
        }
      } else {
        app.debug.debug("plugin_Notification.pagesLoaded() do not register device on licence and push server");
      }
    }, 5000);

    dfd.resolve();
    return dfd.promise();
  },

  // called after pluginsLoaded()
  // caller: plugins.js
  definePluginEvents: function() {
    app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()");

    /**
     * 
     */
    $(document).on('pageshow', function(event) {
      if (!plugin_Notification.notifications) {
        plugin_Notification.notifications = app.store.localStorage.getObject("popup_notifications");
      }
      // alert(JSON.stringify(plugin_Notification.notifications));
      app.store.localStorage.removeObject("popup_notifications");
      plugin_Notification.popupShow();
    });

    /**
     * @listens click on #btn-alert
     */
    $(document).on("click", "#btn-alert", function() {

      $("#popupAlert").one("popupafterclose", function(event, ui) {

        if (plugin_Notification.callbackFunction) {
          plugin_Notification.callbackFunction($("#popupAlert"));
          plugin_Notification.callbackFunction = null;
        }

        plugin_Notification.functions.close.all().done(plugin_Notification.popupShow);
      });

      $("#popupAlert").popup("close");

    });

    /**
     * @listens click on #btn-dialog-left
     */
    $(document).on("click", "#btn-dialog-left", function() {

      $("#popupDialog").one("popupafterclose", function(event, ui) {

        if (plugin_Notification.callbackFunctionBtnLeft) {
          plugin_Notification.callbackFunctionBtnLeft($("#popupDialog"));
          plugin_Notification.callbackFunctionBtnLeft = null;
        }

        plugin_Notification.functions.close.all().done(plugin_Notification.popupShow);
      });

      $("#popupDialog").popup("close");
    });

    /**
     * @listens click on #btn-dialog-right
     */
    $(document).on("click", "#btn-dialog-right", function() {

      $("#popupDialog").one("popupafterclose", function(event, ui) {

        if (plugin_Notification.callbackFunctionBtnRight) {
          plugin_Notification.callbackFunctionBtnRight($("#popupDialog"));
          plugin_Notification.callbackFunctionBtnRight = null;
        }

        plugin_Notification.functions.close.all().done(plugin_Notification.popupShow);
      });

      $("#popupDialog").popup("close");

    });

    $(document).on("popupbeforeposition", "div[data-role=popup]", function(event, ui) {
      $(this).popup().trigger("create");
    });
  },
  // called by pages.js
  // called for each page after createPage();
  afterHtmlInjectedBeforePageComputing: function(container) {
    app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()");

    // alert('insert popups');
    // alert($("body #popupDialog").length);
    // $("body #popupDialog").remove();
    // $("body #popupAlert").remove();
    // if (($("body #popupDialog").length == 0))
    // app.template.append("#" + $(container).attr("id"),
    // "JQueryMobilePopupDialog");
    // if (($("body #popupAlert").length == 0))
    // app.template.append("#" + $(container).attr("id"),
    // "JQueryMobilePopupAlert");

  },
  // called once
  // set the jQuery delegates
  // caller: pages.js
  pageSpecificEvents: function(container) {
    app.debug.trace("plugin_" + this.config.name + ".pageSpecificEvents()");

  },

  // private functions
  popupShow: function(notification) {
    // alert(JSON.stringify(plugin_Notification.notifications));
    if (notification != undefined) {
      switch (notification.type) {

      case "alert":
        setTimeout(function() {
          app.template.append("[data-role=page]", "JQueryMobilePopupAlert");

          $("#popupAlert").popup();

          if (notification.width) $("#popupAlert-popup").css("width", notification.width);

          if (notification.title) {
            $("#popupAlert div[data-role=header] h1").text(notification.title);
            $("#popupAlert div[data-role=header] h1").css("display", "block");
          }

          else {
            $("#popupAlert div[data-role=header] h1").css("display", "none");
          }

          if (notification.headline) {
            $("#popupAlert div.ui-content h3.ui-title").text(notification.headline);
            $("#popupAlert div.ui-content h3.ui-title").css("display", "block");
          }

          else {
            $("#popupAlert div.ui-content h3.ui-title").css("display", "none");
          }

          $("#popupAlert #btn-alert").text(notification.button);

          if (typeof notification.text == "object") {
            $("#popupAlert div.ui-content p").replaceWith(notification.text);

          }

          else {
            $("#popupAlert div.ui-content p").html(notification.text);
          }

          $("#popupAlert").popup("open");
        }, notification.delayInMs);
        plugin_Notification.callbackFunction = notification.callback;
        break;

      case "dialog":

        setTimeout(function() {
          app.template.append("[data-role=page]", "JQueryMobilePopupDialog");

          $("#popupDialog").popup();

          if (notification.width) $("#popupDialog-popup").css("width", notification.width);

          if (notification.title) {
            $("#popupDialog div[data-role=header] h1").text(notification.title);
            $("#popupDialog div[data-role=header] h1").css("display", "block");
          }

          else {
            $("#popupDialog div[data-role=header] h1").css("display", "none");
          }

          if (notification.headline) {
            $("#popupDialog div.ui-content h3.ui-title").text(notification.headline);
            $("#popupDialog div.ui-content h3.ui-title").css("display", "block");
          }

          else {
            $("#popupDialog div.ui-content h3.ui-title").css("display", "none");
          }

          $("#popupDialog #btn-dialog-left").text(notification.buttonLeft);
          $("#popupDialog #btn-dialog-right").text(notification.buttonRight);

          if (typeof notification.text == "object") {
            $("#popupDialog div.ui-content p").replaceWith(notification.text);
          }

          else {
            $("#popupDialog div.ui-content p").html(notification.text);
          }
          $("#popupDialog").popup("open");
          // $("#popupDialog").popup("reposition");
        }, notification.delayInMs);
        plugin_Notification.callbackFunctionBtnLeft = notification.callbackButtonLeft;
        plugin_Notification.callbackFunctionBtnRight = notification.callbackButtonRight;
        break;
      default:
        alert("error in popupShow();");
        break;
      }

    }
    // display popups from array
    else {
      if (plugin_Notification.notifications != null) {
        if (Object.keys(plugin_Notification.notifications).length == 0)
          plugin_Notification.notifications = null;
        else {
          // todo more popups
          notification = plugin_Notification.notifications['1'];
          // alert(JSON.stringify(notification));
          delete plugin_Notification.notifications['1'];
          setTimeout(function() {
            app.template.append("[data-role=page]", "JQueryMobilePopupAlert");

            $("#popupAlert").popup();

            if (notification.width) $("#popupAlert-popup").css("width", notification.width);

            if (notification.title) {
              $("#popupAlert div[data-role=header] h1").text(notification.title);
              $("#popupAlert div[data-role=header] h1").css("display", "block");
            } else {
              $("#popupAlert div[data-role=header] h1").css("display", "none");
            }

            if (notification.headline) {
              $("#popupAlert div.ui-content h3.ui-title").text(notification.headline);
              $("#popupAlert div.ui-content h3.ui-title").css("display", "block");
            } else {
              $("#popupAlert div.ui-content h3.ui-title").css("display", "none");
            }

            $("#popupAlert #btn-alert").text(notification.button);

            if (typeof notification.text == "object") {
              $("#popupAlert div.ui-content p").replaceWith(notification.text);
            } else {
              $("#popupAlert div.ui-content p").html(notification.text);
            }

            $("#popupAlert").popup("open");
          }, notification.delayInMs);
        }
      }
    }
  },

  // public functions
  // called by user
  /**
   * Public functions for plugin_Notification
   * 
   * @namespace plugin_Notification.functions
   */
  functions: {
    push_successHandler: function() {
      console.log('succesfull registered');
    },

    push_errorHandler: function(error) {
      console.error('error registering ' + error);
    },

    push_onNotification: function(event) {
      alert(event.alert);
    },

    /**
     * 
     */
    alert: function(text, title, headline, button, callbackButton, delayInMs) {
      var notification;

      if ($.isPlainObject(text)) {
        notification = text;
      }

      else {
        notification = {
          "text": text,
          "title": title,
          "headline": headline,
          "button": button,
          "callback": callbackButton,
          "delayInMs": delayInMs
        };
      }

      notification.type = "alert";

      plugin_Notification.functions.show(notification);
    },

    /**
     * 
     */
    dialog: function(text, title, headline, buttonLeft, buttonRight, callbackButtonLeft, callbackButtonRight, delayInMs) {
      var notification;
      if ($.isPlainObject(text)) {
        notification = text;
      }

      else {
        notification = {
          "text": text,
          "title": title,
          "headline": headline,
          "buttonLeft": buttonLeft,
          "buttonRight": buttonRight,
          "callbackButtonLeft": callbackButtonLeft,
          "callbackButtonRight": callbackButtonRight,
          "delayInMs": delayInMs
        };
      }

      notification.type = "dialog"

      plugin_Notification.functions.show(notification);
    },

    show: function(notification) {
      plugin_Notification.functions.close.all().done(function() {

        if (notification.delayInMs == undefined || notification.delayInMs == null) notification.delayInMs = 100;
        // alert(text.html());

        plugin_Notification.popupShow(notification);
      });
    },

    /**
     * 
     */
    close: {

      /**
       * 
       */
      alert: function() {
        var dfd = $.Deferred();
        if ($("#popupAlert").parent().hasClass("ui-popup-active")) {

          $("#popupAlert").on("popupafterclose", function(event, ui) {
            $("#popupAlert").off("popupafterclose");
            $('#popupAlert').popup("destroy");
            $('#popupAlert').remove();
            dfd.resolve();
          });

          $("#popupAlert").popup("close");

        }

        else {
          $('#popupAlert').popup("destroy");
          $('#popupAlert').remove();
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * 
       */
      dialog: function() {
        var dfd = $.Deferred();
        if ($("#popupDialog").parent().hasClass("ui-popup-active")) {

          $("#popupDialog").on("popupafterclose", function(event, ui) {
            $("#popupDialog").off("popupafterclose");
            $('#popupDialog').popup("destroy");
            $('#popupDialog').remove();
            dfd.resolve();
          });

          $("#popupDialog").popup("close");

        }

        else {
          $('#popupDialog').popup("destroy");
          $('#popupDialog').remove();
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * 
       */
      all: function() {
        var dfd = $.Deferred();
        $.when(app.notify.close.alert(), app.notify.close.dialog()).done(function() {
          dfd.resolve()
        });
        return dfd.promise();
      }
    },

    /**
     * 
     */
    add: {

      /**
       * 
       */
      alert: function(text, title, headline, button, callbackButton, delayInMs) {

        if (!plugin_Notification.notifications) plugin_Notification.notifications = app.store.localStorage.getObject("popup_notifications");
        if (!plugin_Notification.notifications) plugin_Notification.notifications = {};
        if (delayInMs == undefined || delayInMs == null) delayInMs = 100;
        var nextKey = Object.keys(plugin_Notification.notifications).length + 1;
        plugin_Notification.notifications[nextKey] = {
          "type": "alert",
          "text": text,
          "title": title,
          "headline": headline,
          "button": button,
          "callback": callbackButton
        };
        app.store.localStorage.setObject("popup_notifications", plugin_Notification.notifications);
      }
    },

    /**
     * 
     */
    push_onNotification: function() {
    },

    /**
     * 
     */
    loader: {

      /**
       * 
       */
      bubble: function(show) {
        if (show) {
          app.template.append("div[data-role=content]", "app-loader-bubble");
        } else {
          plugin_Notification.functions.loader.remove();
        }
      },

      /**
       * 
       */
      bubbleDiv: function(show, text, headline, appendTo) {
        var object, loader;

        object = show;

        if ($.isPlainObject(show)) {
          appendTo = object.appendTo;
          headline = object.headline;
          text = object.text;
          show = object.show;
        }
        if (show) {
          loader = app.template.get("app-loader-bubbleDiv");
          if (text != undefined) {
            loader.find("p").text(text);
          }
          if (headline != undefined) {
            loader.find("h1").text(headline)
          }
          if (appendTo)
            appendTo.append(loader);
          else
            $("div[data-role=content]").append(loader);
        } else {
          plugin_Notification.functions.loader.remove();
        }
      },

      /**
       * 
       */
      remove: function() {
        $(".app-loader").remove();
      }
    }

  }
};