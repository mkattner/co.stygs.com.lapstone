// # sourceURL=plugin.Notification.js
/**
 * Copyright (c) 2018 martin.kattner@gmail.com Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var plugin_Notification = {
  config: null,
  notifications: [],
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
            "deviceId": window.device.uuid,
            "contextToken": app.sess.getValue("userToken")
          }, true);

          promise.done(function(resultObject) {
            if (window.push != undefined) {
              app.debug.debug("plugin_Notification.pagesLoaded() register device on aerogear push server");
              plugin_Notification.config.pushConfig.alias = window.device.uuid;
              window.push.register(plugin_Notification.functions.push_onNotification, function() {
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
      app.debug.event(event);
      if (app.pages.getCurrent().config.name !== "start") {
        plugin_Notification.popupShow();
      }
    });

    /**
     * @event click on #popupTrialog #btn-simple-close
     */
    $(document).on("storagefilled", "#popupSimple #btn-simple-close", function(event) {
      app.debug.event(event);

      $("#popupSimple").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-simple-close").data("callback");

        if (callback) {
          callback($("#popupSimple"));
        }

        plugin_Notification.functions.destroy.simple().done(plugin_Notification.popupShow);
      });

      $("#popupSimple").popup("close");
    });

    /**
     * @event click on #popupAlert #btn-alert
     */
    $(document).on("storagefilled", "#popupAlert #btn-alert", function(event) {
      app.debug.event(event);

      $("#popupAlert").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-alert").data("callback");

        if (callback) {
          callback($("#popupAlert"));
        }

        plugin_Notification.functions.destroy.alert().done(plugin_Notification.popupShow);
      });

      $("#popupAlert").popup("close");

    });

    /**
     * @event click on #popupTrialog #btn-alert-close
     */
    $(document).on("storagefilled", "#popupAlert #btn-alert-close", function(event) {
      app.debug.event(event);

      $("#popupAlert").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-alert-close").data("callback");

        if (callback) {
          callback($("#popupAlert"));
        }

        plugin_Notification.functions.destroy.alert().done(plugin_Notification.popupShow);
      });

      $("#popupAlert").popup("close");
    });

    /**
     * @event click on #popupDialog #btn-dialog-left
     */
    $(document).on("storagefilled", "#popupDialog #btn-dialog-left", function(event) {
      app.debug.event(event);

      $("#popupDialog").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-dialog-left").data("callback");

        if (callback) {
          callback($("#popupDialog"));
        }

        plugin_Notification.functions.destroy.dialog().done(plugin_Notification.popupShow);
      });

      $("#popupDialog").popup("close");
    });

    /**
     * @event click on #popupDialog #btn-dialog-right
     */
    $(document).on("storagefilled", "#popupDialog #btn-dialog-right", function(event) {
      app.debug.event(event);

      $("#popupDialog").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-dialog-right").data("callback");

        if (callback) {
          callback($("#popupDialog"));
        }

        plugin_Notification.functions.destroy.dialog().done(plugin_Notification.popupShow);
      });

      $("#popupDialog").popup("close");

    });

    /**
     * @event click on #popupTrialog #btn-dialog-close
     */
    $(document).on("storagefilled", "#popupDialog #btn-dialog-close", function(event) {
      app.debug.event(event);

      $("#popupDialog").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-dialog-close").data("callback");

        if (callback) {
          callback($("#popupDialog"));
        }

        plugin_Notification.functions.destroy.alert().done(plugin_Notification.popupShow);
      });

      $("#popupDialog").popup("close");
    });

    /**
     * @event click on #popupTrialog #btn-trialog-right
     */
    $(document).on("storagefilled", "#popupTrialog #btn-trialog-left", function(event) {
      app.debug.event(event);

      $("#popupTrialog").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-trialog-left").data("callback");

        if (callback) {
          callback($("#popupTrialog"));
        }

        plugin_Notification.functions.destroy.trialog().done(plugin_Notification.popupShow);
      });

      $("#popupTrialog").popup("close");

    });

    /**
     * @event click on #popupTrialog #btn-trialog-right
     */
    $(document).on("storagefilled", "#popupTrialog #btn-trialog-center", function(event) {
      app.debug.event(event);

      $("#popupTrialog").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-trialog-center").data("callback");

        if (callback) {
          callback($("#popupTrialog"));
        }

        plugin_Notification.functions.destroy.trialog().done(plugin_Notification.popupShow);
      });

      $("#popupTrialog").popup("close");

    });

    /**
     * @event click on #popupTrialog #btn-trialog-right
     */
    $(document).on("storagefilled", "#popupTrialog #btn-trialog-right", function(event) {
      app.debug.event(event);

      $("#popupTrialog").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-trialog-right").data("callback");

        if (callback) {
          callback($("#popupTrialog"));
        }

        plugin_Notification.functions.destroy.trialog().done(plugin_Notification.popupShow);
      });

      $("#popupTrialog").popup("close");

    });

    /**
     * @event click on #popupTrialog #btn-trialog-close
     */
    $(document).on("storagefilled", "#popupTrialog #btn-trialog-close", function(event) {
      app.debug.event(event);

      $("#popupTrialog").one("popupafterclose", function(event, ui) {
        app.debug.event(event);

        var callback = $(this).find("#btn-trialog-close").data("callback");

        if (callback) {
          callback($("#popupTrialog"));
        }

        plugin_Notification.functions.destroy.trialog().done(plugin_Notification.popupShow);
      });

      $("#popupTrialog").popup("close");

    });

    $(document).on("popupbeforeposition", "div[data-role=popup]", function(event, ui) {
      $(this).popup().trigger("create");
    });

    // $(document).on("focusin", "#popupTrialog", function(event) {
    // console.log("focusin")
    // event.preventDefault();
    // event.stopPropagation();
    // event.stopImmediatePropagation()
    // });
  },
  // called by pages.js
  // called for each page after createPage();
  afterHtmlInjectedBeforePageComputing: function(container) {
    app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()");

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

    if (notification === undefined) {
      notification = plugin_Notification.notifications.pop();
      // alert(JSON.stringify(notification));
      if (notification) {
        if (notification.pageDelay === undefined) {
          plugin_Notification.popupShow(notification);
        } else if (typeof notification.pageDelay === "number" && notification.pageDelay === 0) {
          plugin_Notification.popupShow(notification);
        } else {
          notification.pageDelay--;
          plugin_Notification.notifications.push(notification)
        }
      }
    } else {
      switch (notification.type) {
      case "simple":
        plugin_Notification.functions.destroy.simple().done(function() {
          setTimeout(function() {
            app.template.append("[data-role=page]", "JQueryMobilePopupSimple");
            $("#popupSimple").data("notification", notification);

            // POPUPAFTEROPEN
            $("#popupSimple").one("popupafteropen", function(event, ui) {
              app.debug.event(event);

              $("#popupSimple #btn-simple-close").data("callback", notification.callbackButtonClose);
            });

            // POPUPCREATE
            $("#popupSimple").one("popupcreate", function(event, ui) {

              if (notification.id) $("#popupSimple").addClass("app-popup-id-" + notification.id.trim());

              if (notification.width) $("#popupSimple-popup").css({
                "width": notification.width,
              });

              if (notification.height) $("#popupSimple-popup").css({
                "height": notification.height
              });

              if (notification.title) {
                $("#popupSimple div[data-role=header] h1").text(notification.title);
              }

              if (typeof notification.text == "object") {
                $("#popupSimple .popupContent").replaceWith(notification.text.clone()); // TODO
                // why
                // clone()???
              }

              else {
                $("#popupSimple .popupContent").html(notification.text);
              }

              $("#popupSimple").popup("open");
            });

            // POPUP
            $("#popupSimple").popup({
              beforeposition: function() {
                $(this).closest(".ui-popup-container").css({
                  "max-height": "95%",
                  "overflow-y": "auto"
                });
              }
            });

          }, notification.delayInMs);
        });
      case "alert":
        plugin_Notification.functions.destroy.alert().done(function() {
          setTimeout(function() {
            app.template.append("[data-role=page]", "JQueryMobilePopupAlert");
            $("#popupAlert").data("notification", notification);

            // POPUPAFTEROPEN
            $("#popupAlert").one("popupafteropen", function(event, ui) {
              app.debug.event(event);

              $("#popupAlert #btn-alert-close").data("callback", notification.callbackButtonClose);
              $("#popupAlert #btn-alert").data("callback", notification.callbackButton);
            });

            // POPUPCREATE
            $("#popupAlert").one("popupcreate", function(event, ui) {

              if (notification.id) $("#popupAlert").addClass("app-popup-id-" + notification.id.trim());

              if (notification.width) $("#popupAlert-popup").css({
                "width": notification.width,
              });
              if (notification.height) $("#popupAlert-popup").css({
                "height": notification.height
              });

              if (notification.title) {
                $("#popupAlert div[data-role=header] h1").text(notification.title);
              }

              // BUTTON
              $("#popupAlert #btn-alert").find(".buttonContent").text(notification.button);

              if (typeof notification.text == "object") {
                $("#popupAlert .popupContent").replaceWith(notification.text);
              }

              else {
                $("#popupAlert .popupContent").html(notification.text);
              }

              $("#popupAlert").popup("open");
            });

            // POPUP
            $("#popupAlert").popup({
              beforeposition: function() {
                $(this).closest(".ui-popup-container").css({
                  "max-height": "95%",
                  "overflow-y": "auto"
                });
              }
            });

          }, notification.delayInMs);
        });

        break;

      case "dialog":
        plugin_Notification.functions.destroy.dialog().done(function() {
          setTimeout(function() {
            app.template.append("[data-role=page]", "JQueryMobilePopupDialog");
            $("#popupDialog").data("notification", notification);

            // POPUPAFTEROPEN
            $("#popupDialog").one("popupafteropen", function(event, ui) {
              app.debug.event(event);

              $("#popupDialog #btn-dialog-close").data("callback", notification.callbackButtonClose);
              $("#popupDialog #btn-dialog-left").data("callback", notification.callbackButtonLeft);
              $("#popupDialog #btn-dialog-right").data("callback", notification.callbackButtonRight);
            });

            // POPUPCREATE
            $("#popupDialog").one("popupcreate", function(event, ui) {

              if (notification.id) $("#popupDialog").addClass("app-popup-id-" + notification.id.trim());

              if (notification.width) $("#popupDialog-popup").css({
                "width": notification.width
              });
              if (notification.height) $("#popupDialog-popup").css({
                "height": notification.height
              });

              if (notification.title) {
                $("#popupDialog div[data-role=header] h1").text(notification.title);
              }

              // BUTTONS
              $("#popupDialog #btn-dialog-left").find(".buttonContent").text(notification.buttonLeft);
              $("#popupDialog #btn-dialog-right").find(".buttonContent").text(notification.buttonRight);

              if (typeof notification.text == "object") {
                $("#popupDialog .popupContent").replaceWith(notification.text);
              }

              else {
                $("#popupDialog .popupContent").html(notification.text);
              }

              $("#popupDialog").popup("open");
            });

            // POPUP
            $("#popupDialog").popup({
              beforeposition: function() {
                $(this).closest(".ui-popup-container").css({
                  "max-height": "95%",
                  "overflow-y": "auto"
                });
              }
            });

          }, notification.delayInMs);
        });

        break;

      case "trialog":
        plugin_Notification.functions.destroy.trialog().done(function() {
          setTimeout(function() {
            app.template.append("[data-role=page]", "JQueryMobilePopupTrialog");
            $("#popupTrialog").data("notification", notification);

            // POPUPAFTEROPEN
            $("#popupTrialog").one("popupafteropen", function(event, ui) {
              app.debug.event(event);

              $("#popupTrialog #btn-trialog-close").data("callback", notification.callbackButtonClose);
              $("#popupTrialog #btn-trialog-left").data("callback", notification.callbackButtonLeft);
              $("#popupTrialog #btn-trialog-center").data("callback", notification.callbackButtonCenter);
              $("#popupTrialog #btn-trialog-right").data("callback", notification.callbackButtonRight);
            });

            // POPUPCREATE
            $("#popupTrialog").one("popupcreate", function(event, ui) {

              if (notification.id) $("#popupTrialog").addClass("app-popup-id-" + notification.id.trim());

              if (notification.width) $("#popupTrialog-popup").css({
                "width": notification.width
              });
              if (notification.height) $("#popupTrialog-popup").css({
                "height": notification.height
              });

              if (notification.title) {
                $("#popupTrialog div[data-role=header] h1").text(notification.title);
              }

              // BUTTONS
              $("#popupTrialog #btn-trialog-left").find(".buttonContent").text(notification.buttonLeft);
              $("#popupTrialog #btn-trialog-center").find(".buttonContent").text(notification.buttonCenter);
              $("#popupTrialog #btn-trialog-right").find(".buttonContent").text(notification.buttonRight);

              if (typeof notification.text == "object") {
                $("#popupTrialog .popupContent").replaceWith(notification.text);
              }

              else {
                $("#popupTrialog .popupContent").html(notification.text);
              }

              $("#popupTrialog").popup("open");
            });

            // POPUP
            $("#popupTrialog").popup({
              beforeposition: function() {
                $(this).closest(".ui-popup-container").css({
                  "max-height": "95%",
                  "overflow-y": "auto"
                });
              }
            });

          }, notification.delayInMs);
        });

        break;

      default:
        app.debug.error("error in popupShow();");
        break;
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
    simple: function(text) {
      var notification;

      notification = text;

      notification.type = "simple";
      plugin_Notification.functions.show(notification);
    },

    /**
     * app.notify.alert({ id: "", text: "text", title: "title", headline: "headline", button: "button", callbackButton: function(popup) { }, delayInMs: 0, width: "50%" });
     */
    alert: function(text, title, headline, button, callbackButton, delayInMs) {
      var notification;

      if ($.isPlainObject(text)) {
        notification = text;
      }

      else {
        app.debug.deprecated("Please use an object as argument.");
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
     * app.notify.dialog({ id: "", text: "text", title: "title", headline: "headline", buttonLeft: "button left", buttonRight: "button right", callbackButtonLeft: function(popup) { }, callbackButtonRight: function(popup) { }, delayInMs: 0, width: "50%" });
     */
    dialog: function(text, title, headline, buttonLeft, buttonRight, callbackButtonLeft, callbackButtonRight, delayInMs) {
      var notification;
      if ($.isPlainObject(text)) {
        notification = text;
      }

      else {
        app.debug.deprecated("Please use an object as argument.")
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

    /**
     * app.notify.trialog({ id: "", text: "text", title: "title", headline: "headline", buttonLeft: "button left", buttonCenter: "button center", buttonRight: "button right", callbackButtonLeft: function(popup) { }, callbackButtonCenter: function(popup) { }, callbackButtonRight: function(popup) { },
     * delayInMs: 0, width: "50%" });
     */
    trialog: function(notification) {

      if (!$.isPlainObject(notification)) {
        app.debug.deprecated("Please use an object as argument.");
        return null;
      }

      notification.type = "trialog";

      plugin_Notification.functions.show(notification);
    },

    show: function(notification) {
      app.debug.info("plugin_Notification.functions.show() - open popup: " + JSON.stringify(notification));
      plugin_Notification.functions.close.all().done(function() {

        if (notification.delayInMs == undefined || notification.delayInMs == null) notification.delayInMs = 100;
        // alert(text.html());

        plugin_Notification.popupShow(notification);
      });
    },

    /**
     * popup destroy functions
     */
    destroy: {

      /**
       * destroy simple
       */
      simple: function() {
        var dfd = $.Deferred();
        if ($("#popupSimple").parent().hasClass("ui-popup-active")) {

          $("#popupSimple").on("popupafterclose", function(event, ui) {
            app.debug.event(event);

            $("#popupSimple").off("popupafterclose");
            $('#popupSimple').popup("destroy");
            $('#popupSimple').remove();
            dfd.resolve();
          });

          $("#popupSimple").popup("close");

        }

        else {
          try {
            $('#popupSimple').popup("destroy");
          } catch (e) {
            dfd.resolve();
          }
          $('#popupSimple').remove();
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * destroy alert
       */
      alert: function() {
        var dfd = $.Deferred();
        if ($("#popupAlert").parent().hasClass("ui-popup-active")) {

          $("#popupAlert").on("popupafterclose", function(event, ui) {
            app.debug.event(event);

            $("#popupAlert").off("popupafterclose");
            $('#popupAlert').popup("destroy");
            $('#popupAlert').remove();
            dfd.resolve();
          });

          $("#popupAlert").popup("close");

        }

        else {
          try {
            $('#popupAlert').popup("destroy");
          } catch (e) {
            dfd.resolve();
          }

          $('#popupAlert').remove();
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * destroy dialog
       */
      dialog: function() {
        var dfd = $.Deferred();
        if ($("#popupDialog").parent().hasClass("ui-popup-active")) {

          $("#popupDialog").on("popupafterclose", function(event, ui) {
            app.debug.event(event);

            $("#popupDialog").off("popupafterclose");
            $('#popupDialog').popup("destroy");
            $('#popupDialog').remove();
            dfd.resolve();
          });

          $("#popupDialog").popup("close");

        }

        else {
          try {
            $('#popupDialog').popup("destroy");
          } catch (e) {
            dfd.resolve();
          }
          $('#popupDialog').remove();
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * destroy trialog
       */
      trialog: function() {
        var dfd = $.Deferred();
        if ($("#popupTrialog").parent().hasClass("ui-popup-active")) {

          $("#popupTrialog").on("popupafterclose", function(event, ui) {
            app.debug.event(event);

            $("#popupTrialog").off("popupafterclose");
            $('#popupTrialog').popup("destroy");
            $('#popupTrialog').remove();
            dfd.resolve();
          });

          $("#popupTrialog").popup("close");

        }

        else {
          try {
            $('#popupTrialog').popup("destroy");
          } catch (e) {
            dfd.resolve();
          }
          $('#popupTrialog').remove();
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * 
       */
      all: function() {
        var dfd = $.Deferred();
        $.when(app.notify.destroy.simple(), app.notify.destroy.alert(), app.notify.destroy.dialog(), app.notify.destroy.trialog()).done(function() {
          dfd.resolve()
        });
        return dfd.promise();
      }
    },

    /**
     * popup close funtions
     */
    close: {
      /**
       * close simple
       */
      simple: function() {
        var dfd = $.Deferred();
        if ($("#popupSimple").parent().hasClass("ui-popup-active")) {

          $("#popupSimple").on("popupafterclose", function(event, ui) {
            app.debug.event(event);

            $("#popupSimple").off("popupafterclose");
            dfd.resolve();
          });

          $("#popupSimple").popup("close");

        }

        else {
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * close alert
       */
      alert: function() {
        var dfd = $.Deferred();
        if ($("#popupAlert").parent().hasClass("ui-popup-active")) {

          $("#popupAlert").on("popupafterclose", function(event, ui) {
            app.debug.event(event);

            $("#popupAlert").off("popupafterclose");
            dfd.resolve();
          });

          $("#popupAlert").popup("close");

        }

        else {
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * close dialog
       */
      dialog: function() {
        var dfd = $.Deferred();
        if ($("#popupDialog").parent().hasClass("ui-popup-active")) {

          $("#popupDialog").on("popupafterclose", function(event, ui) {
            app.debug.event(event);

            $("#popupDialog").off("popupafterclose");
            dfd.resolve();
          });

          $("#popupDialog").popup("close");

        }

        else {
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * close trialog
       */
      trialog: function() {
        var dfd = $.Deferred();
        if ($("#popupTrialog").parent().hasClass("ui-popup-active")) {

          $("#popupTrialog").on("popupafterclose", function(event, ui) {
            app.debug.event(event);

            $("#popupTrialog").off("popupafterclose");
            dfd.resolve();
          });

          $("#popupTrialog").popup("close");

        }

        else {
          dfd.resolve();
        }

        return dfd.promise();
      },

      /**
       * close all
       */
      all: function() {
        var dfd = $.Deferred();
        $.when(app.notify.close.simple(), app.notify.close.alert(), app.notify.close.dialog(), app.notify.close.trialog()).done(function() {
          dfd.resolve()
        });
        return dfd.promise();
      }
    },

    /**
     * popup open functions
     */
    open: {
      /**
       * open simple
       */
      simple: function() {
        var dfd = $.Deferred(), notification = $("#popupSimple").data("notification");

        // POPUPAFTEROPEN
        $("#popupSimple").one("popupafteropen", function(event, ui) {
          app.debug.event(event);

          if (notification.width) $("#popupSimple-popup").css({
            "width": notification.width,
          });

          if (notification.height) $("#popupSimple-popup").css({
            "height": notification.height
          });

          $("#popupSimple").popup("reposition", {})

          dfd.resolve();
        });

        $("#popupSimple").popup("open");

        return dfd.promise();
      },

      /**
       * open alert
       */
      alert: function() {
        var dfd = $.Deferred(), notification = $("#popupAlert").data("notification");

        $("#popupAlert").one("popupafteropen", function(event, ui) {
          app.debug.event(event);

          if (notification.width) $("#popupAlert-popup").css({
            "width": notification.width,
          });

          if (notification.height) $("#popupAlert-popup").css({
            "height": notification.height
          });

          $("#popupAlert").popup("reposition", {})

          dfd.resolve();
        });

        $("#popupAlert").popup("open");

        return dfd.promise();
      },

      /**
       * open dialog
       */
      dialog: function() {
        var dfd = $.Deferred(), notification = $("#popupDialog").data("notification");

        $("#popupDialog").one("popupafteropen", function(event, ui) {
          app.debug.event(event);

          if (notification.width) $("#popupDialog-popup").css({
            "width": notification.width,
          });

          if (notification.height) $("#popupDialog-popup").css({
            "height": notification.height
          });

          $("#popupDialog").popup("reposition", {})

          dfd.resolve();
        });

        $("#popupDialog").popup("open");

        return dfd.promise();
      },

      /**
       * open trialog
       */
      trialog: function() {
        var dfd = $.Deferred(), notification = $("#popupTrialog").data("notification");

        $("#popupTrialog").one("popupafteropen", function(event, ui) {
          app.debug.event(event);

          if (notification.width) $("#popupTrialog-popup").css({
            "width": notification.width,
          });

          if (notification.height) $("#popupTrialog-popup").css({
            "height": notification.height
          });

          $("#popupTrialog").popup("reposition", {})

          dfd.resolve();
        });

        $("#popupTrialog").popup("open");

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
      simple: function(notification) {
        // VALIDATE
        app.debug.operation(function() {
          if (notification.id === undefined) {
            app.debug.error("Missing property 'id' in popup.")
          }
        });

        notification.type = "simple";
        plugin_Notification.notifications.push(notification);
      },

      /**
       * app.notify.add.alert({ id: "", text: "text", title: "title", headline: "headline", button: "button", callbackButton: function(popup) { }, delayInMs: 0, width: "50%", pageDelay:0 });
       */
      alert: function(text, title, headline, button, callbackButton, delayInMs) {

        var notification;

        if ($.isPlainObject(text)) {
          notification = text;
        }

        else {
          app.debug.deprecated("Please use an object as argument.");
          notification = {
            "text": text,
            "title": title,
            "headline": headline,
            "button": button,
            "callback": callbackButton,
            "delayInMs": delayInMs
          };
        }

        // VALIDATE
        app.debug.operation(function() {
          if (notification.id === undefined) {
            app.debug.error("Missing property 'id' in popup.")
          }
        });

        notification.type = "alert";

        plugin_Notification.notifications.push(notification);
      },

      dialog: function(text, title, headline, buttonLeft, buttonRight, callbackButtonLeft, callbackButtonRight, delayInMs) {
        var notification;

        if ($.isPlainObject(text)) {
          notification = text;
        }

        else {
          app.debug.deprecated("Please use an object as argument.")
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

        // VALIDATE
        app.debug.operation(function() {
          if (notification.id === undefined) {
            app.debug.error("Missing property 'id' in popup.")
          }
        });

        notification.type = "alert";

        notification.type = "dialog";

        plugin_Notification.notifications.push(notification);
      },
      trialog: function() {
        app.debug.deprecated("removed");
      }
    },

    /**
     * 
     */
    loader: {}

  }
};