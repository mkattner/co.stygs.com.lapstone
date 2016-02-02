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
      app.debug.event(event);

      if (!plugin_Notification.notifications) {
        plugin_Notification.notifications = app.store.localStorage.getObject("popup_notifications");
      }
      // alert(JSON.stringify(plugin_Notification.notifications));
      app.store.localStorage.removeObject("popup_notifications");
      plugin_Notification.popupShow();
    });

    /**
     * @listens click on #popupAlert #btn-alert
     */
    $(document).on("click", "#popupAlert #btn-alert", function(event) {
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
     * @listens click on #popupDialog #btn-dialog-left
     */
    $(document).on("click", "#popupDialog #btn-dialog-left", function(event) {
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
     * @listens click on #popupDialog #btn-dialog-right
     */
    $(document).on("click", "#popupDialog #btn-dialog-right", function(event) {
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
     * @listens click on #popupTrialog #btn-trialog-right
     */
    $(document).on("click", "#popupTrialog #btn-trialog-left", function(event) {
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
     * @listens click on #popupTrialog #btn-trialog-right
     */
    $(document).on("click", "#popupTrialog #btn-trialog-center", function(event) {
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
     * @listens click on #popupTrialog #btn-trialog-right
     */
    $(document).on("click", "#popupTrialog #btn-trialog-right", function(event) {
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

    $(document).on("popupbeforeposition", "div[data-role=popup]", function(event, ui) {
      $(this).popup().trigger("create");
    });

//    $(document).on("focusin", "#popupTrialog", function(event) {
//      console.log("focusin")
//      event.preventDefault();
//      event.stopPropagation();
//      event.stopImmediatePropagation()
//    });
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
    if (notification != undefined) {
      switch (notification.type) {

      case "alert":
        plugin_Notification.functions.destroy.alert().done(function() {
          setTimeout(function() {
            app.template.append("[data-role=page]", "JQueryMobilePopupAlert");

            $("#popupAlert").one("popupafteropen", function(event, ui) {
              app.debug.event(event);

              $("#popupAlert #btn-alert").data("callback", notification.callbackButton);
            });

            $("#popupAlert").one("popupcreate", function(event, ui) {

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
            });

            $("#popupAlert").popup();

          }, notification.delayInMs);
        });

        break;

      case "dialog":
        plugin_Notification.functions.destroy.dialog().done(function() {
          setTimeout(function() {
            app.template.append("[data-role=page]", "JQueryMobilePopupDialog");

            $("#popupDialog").one("popupafteropen", function(event, ui) {
              app.debug.event(event);

              $("#popupDialog #btn-dialog-left").data("callback", notification.callbackButtonLeft);
              $("#popupDialog #btn-dialog-right").data("callback", notification.callbackButtonRight);
            });

            $("#popupDialog").one("popupcreate", function(event, ui) {
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
            });

            $("#popupDialog").popup();

          }, notification.delayInMs);
        });

        break;

      case "trialog":
        plugin_Notification.functions.destroy.trialog().done(function() {
          setTimeout(function() {
            app.template.append("[data-role=page]", "JQueryMobilePopupTrialog");

            $("#popupTrialog").one("popupafteropen", function(event, ui) {
              app.debug.event(event);

              $("#popupTrialog #btn-trialog-left").data("callback", notification.callbackButtonLeft);
              $("#popupTrialog #btn-trialog-center").data("callback", notification.callbackButtonCenter);
              $("#popupTrialog #btn-trialog-right").data("callback", notification.callbackButtonRight);
            });

            $("#popupTrialog").one("popupcreate", function(event, ui) {
              if (notification.width) $("#popupTrialog-popup").css("width", notification.width);

              if (notification.title) {
                $("#popupTrialog div[data-role=header] h1").text(notification.title);
                $("#popupTrialog div[data-role=header] h1").css("display", "block");
              }

              else {
                $("#popupTrialog div[data-role=header] h1").css("display", "none");
              }

              if (notification.headline) {
                $("#popupTrialog div.ui-content h3.ui-title").text(notification.headline);
                $("#popupTrialog div.ui-content h3.ui-title").css("display", "block");
              }

              else {
                $("#popupTrialog div.ui-content h3.ui-title").css("display", "none");
              }

              $("#popupTrialog #btn-trialog-left").text(notification.buttonLeft);
              $("#popupTrialog #btn-trialog-center").text(notification.buttonCenter);
              $("#popupTrialog #btn-trialog-right").text(notification.buttonRight);

              if (typeof notification.text == "object") {
                $("#popupTrialog div.ui-content p").replaceWith(notification.text);
              }

              else {
                $("#popupTrialog div.ui-content p").html(notification.text);
              }

              $("#popupTrialog").popup("open");
            });

            $("#popupTrialog").popup();

          }, notification.delayInMs);
        });

        break;

      default:
        app.debug.error("error in popupShow();");
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
     * alert({ text: "", title: "", headline: "", button: "", callbackButton:
     * function(popup) { }, delayInMs: 0, width: "50%" })
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
     * dialog( { text: "", title: "", headline: "", buttonLeft: "", buttonRight:
     * "", callbackButtonLeft: function(popup) { }, callbackButtonRight:
     * function(popup) { }, delayInMs: 0, width: "50%" });
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
     * trialog
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
          $('#popupAlert').popup("destroy");
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
          $('#popupDialog').popup("destroy");
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
          $('#popupTrialog').popup("destroy");
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
        $.when(app.notify.destroy.alert(), app.notify.destroy.dialog(), app.notify.destroy.trialog()).done(function() {
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
        $.when(app.notify.close.alert(), app.notify.close.dialog(), app.notify.close.trialog()).done(function() {
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
       * open alert
       */
      alert: function() {
        var dfd = $.Deferred();

        $("#popupAlert").on("popupafteropen", function(event, ui) {
          app.debug.event(event);

          $("#popupAlert").off("popupafteropen");
          dfd.resolve();
        });

        $("#popupAlert").popup("open");

        return dfd.promise();
      },

      /**
       * open dialog
       */
      dialog: function() {
        var dfd = $.Deferred();

        $("#popupDialog").on("popupafteropen", function(event, ui) {
          app.debug.event(event);

          $("#popupDialog").off("popupafteropen");
          dfd.resolve();
        });

        $("#popupDialog").popup("open");

        return dfd.promise();
      },

      /**
       * open trialog
       */
      trialog: function() {
        var dfd = $.Deferred();

        $("#popupTrialog").on("popupafteropen", function(event, ui) {
          app.debug.event(event);

          $("#popupTrialog").off("popupafteropen");
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
        var object, loader, timeout;

        if ($.isPlainObject(show)) {
          object = show;

        } else {
          app.debug.deprecated("Please use an object as argument.");
          object = {
            "appendTo": appendTo,
            "headline": headline,
            "text": text,
            "show": show
          };
        }

        if (object.show) {

          loader = app.template.get("app-loader-bubbleDiv");
          if (object.text != undefined) {
            loader.find("p").text(object.text);
          }

          if (object.headline != undefined) {
            loader.find("h1").text(object.headline)
          }

          if (object.timeout) {
            return timeout = window.setTimeout(function() {

              if (object.appendTo)
                object.appendTo.append(loader);
              else
                $("div[data-role=content]").append(loader);

            }, object.timeout);

          }

          else {
            if (object.appendTo)
              object.appendTo.append(loader);
            else
              $("div[data-role=content]").append(loader);
          }

        }

        else {
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