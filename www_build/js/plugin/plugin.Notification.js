// Input 0
'use strict';
var plugin_Notification = {config:null, notifications:[], callbackFunction:null, callbackFunctionBtnLeft:null, callbackFunctionBtnRight:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace(this.config.name + ".pluginsLoaded()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()");
  var a = $.Deferred();
  window.setTimeout(function() {
    if (plugin_Notification.config.enablePushNotifications && app.config.apacheCordova && 1 == app.sess.loggedIn()) {
      if (app.debug.debug("plugin_Notification.pagesLoaded() register device on licence and push server"), window.device) {
        var a = app.rc.getJson("notifyme.registerDevice", {deviceId:device.uuid, contextToken:app.sess.getValue("userToken")}, !0);
        a.done(function(a) {
          void 0 != window.push ? (app.debug.debug("plugin_Notification.pagesLoaded() register device on aerogear push server"), plugin_Notification.config.pushConfig.alias = device.uuid, push.register(plugin_Notification.functions.push_onNotification, function() {
            app.debug.debug("plugin_Notification.pagesLoaded() success: device is registered on push server");
          }, function(a) {
            app.debug.debug("plugin_Notification.pagesLoaded() error: device is not registered on push server");
            app.debug.debug("plugin_Notification.pagesLoaded() error: " + a);
          }, plugin_Notification.config.pushConfig)) : app.debug.debug("plugin_Notification.pagesLoaded() cordova push plugin not installed");
        });
        a.fail(function(a) {
          app.debug.debug("plugin_Notification.pagesLoaded() not able to register device on licence server");
        });
      } else {
        app.debug.debug("plugin_Notification.pagesLoaded() cordova device plugin not installed");
      }
    } else {
      app.debug.debug("plugin_Notification.pagesLoaded() do not register device on licence and push server");
    }
  }, 5000);
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()");
  $(document).on("pageshow", function(a) {
    app.debug.event(a);
    "start" !== app.pages.getCurrent().config.name && plugin_Notification.popupShow();
  });
  $(document).on("storagefilled", "#popupSimple #btn-simple-close", function(a) {
    app.debug.event(a);
    $("#popupSimple").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-simple-close").data("callback")) && a($("#popupSimple"));
      plugin_Notification.functions.destroy.simple().done(plugin_Notification.popupShow);
    });
    $("#popupSimple").popup("close");
  });
  $(document).on("storagefilled", "#popupAlert #btn-alert", function(a) {
    app.debug.event(a);
    $("#popupAlert").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-alert").data("callback")) && a($("#popupAlert"));
      plugin_Notification.functions.destroy.alert().done(plugin_Notification.popupShow);
    });
    $("#popupAlert").popup("close");
  });
  $(document).on("storagefilled", "#popupAlert #btn-alert-close", function(a) {
    app.debug.event(a);
    $("#popupAlert").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-alert-close").data("callback")) && a($("#popupAlert"));
      plugin_Notification.functions.destroy.alert().done(plugin_Notification.popupShow);
    });
    $("#popupAlert").popup("close");
  });
  $(document).on("storagefilled", "#popupDialog #btn-dialog-left", function(a) {
    app.debug.event(a);
    $("#popupDialog").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-dialog-left").data("callback")) && a($("#popupDialog"));
      plugin_Notification.functions.destroy.dialog().done(plugin_Notification.popupShow);
    });
    $("#popupDialog").popup("close");
  });
  $(document).on("storagefilled", "#popupDialog #btn-dialog-right", function(a) {
    app.debug.event(a);
    $("#popupDialog").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-dialog-right").data("callback")) && a($("#popupDialog"));
      plugin_Notification.functions.destroy.dialog().done(plugin_Notification.popupShow);
    });
    $("#popupDialog").popup("close");
  });
  $(document).on("storagefilled", "#popupDialog #btn-dialog-close", function(a) {
    app.debug.event(a);
    $("#popupDialog").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-dialog-close").data("callback")) && a($("#popupDialog"));
      plugin_Notification.functions.destroy.alert().done(plugin_Notification.popupShow);
    });
    $("#popupDialog").popup("close");
  });
  $(document).on("storagefilled", "#popupTrialog #btn-trialog-left", function(a) {
    app.debug.event(a);
    $("#popupTrialog").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-trialog-left").data("callback")) && a($("#popupTrialog"));
      plugin_Notification.functions.destroy.trialog().done(plugin_Notification.popupShow);
    });
    $("#popupTrialog").popup("close");
  });
  $(document).on("storagefilled", "#popupTrialog #btn-trialog-center", function(a) {
    app.debug.event(a);
    $("#popupTrialog").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-trialog-center").data("callback")) && a($("#popupTrialog"));
      plugin_Notification.functions.destroy.trialog().done(plugin_Notification.popupShow);
    });
    $("#popupTrialog").popup("close");
  });
  $(document).on("storagefilled", "#popupTrialog #btn-trialog-right", function(a) {
    app.debug.event(a);
    $("#popupTrialog").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-trialog-right").data("callback")) && a($("#popupTrialog"));
      plugin_Notification.functions.destroy.trialog().done(plugin_Notification.popupShow);
    });
    $("#popupTrialog").popup("close");
  });
  $(document).on("storagefilled", "#popupTrialog #btn-trialog-close", function(a) {
    app.debug.event(a);
    $("#popupTrialog").one("popupafterclose", function(a, c) {
      app.debug.event(a);
      (a = $(this).find("#btn-trialog-close").data("callback")) && a($("#popupTrialog"));
      plugin_Notification.functions.destroy.trialog().done(plugin_Notification.popupShow);
    });
    $("#popupTrialog").popup("close");
  });
  $(document).on("popupbeforeposition", "div[data-role\x3dpopup]", function(a, b) {
    $(this).popup().trigger("create");
  });
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".pageSpecificEvents()");
}, popupShow:function(a) {
  if (void 0 === a) {
    if (a = plugin_Notification.notifications.pop()) {
      void 0 === a.pageDelay ? plugin_Notification.popupShow(a) : "number" === typeof a.pageDelay && 0 === a.pageDelay ? plugin_Notification.popupShow(a) : (a.pageDelay--, plugin_Notification.notifications.push(a));
    }
  } else {
    switch(a.type) {
      case "simple":
        plugin_Notification.functions.destroy.simple().done(function() {
          setTimeout(function() {
            app.template.append("[data-role\x3dpage]", "JQueryMobilePopupSimple");
            $("#popupSimple").data("notification", a);
            $("#popupSimple").one("popupafteropen", function(b, c) {
              app.debug.event(b);
              $("#popupSimple #btn-simple-close").data("callback", a.callbackButtonClose);
            });
            $("#popupSimple").one("popupcreate", function(b, c) {
              a.id && $("#popupSimple").addClass("app-popup-id-" + a.id.trim());
              a.width && $("#popupSimple-popup").css({width:a.width});
              a.height && $("#popupSimple-popup").css({height:a.height});
              a.title && $("#popupSimple div[data-role\x3dheader] h1").text(a.title);
              "object" == typeof a.text ? $("#popupSimple .popupContent").replaceWith(a.text.clone()) : $("#popupSimple .popupContent").html(a.text);
              $("#popupSimple").popup("open");
            });
            $("#popupSimple").popup({beforeposition:function() {
              $(this).closest(".ui-popup-container").css({"max-height":"95%", "overflow-y":"auto"});
            }});
          }, a.delayInMs);
        });
      case "alert":
        plugin_Notification.functions.destroy.alert().done(function() {
          setTimeout(function() {
            app.template.append("[data-role\x3dpage]", "JQueryMobilePopupAlert");
            $("#popupAlert").data("notification", a);
            $("#popupAlert").one("popupafteropen", function(b, c) {
              app.debug.event(b);
              $("#popupAlert #btn-alert-close").data("callback", a.callbackButtonClose);
              $("#popupAlert #btn-alert").data("callback", a.callbackButton);
            });
            $("#popupAlert").one("popupcreate", function(b, c) {
              a.id && $("#popupAlert").addClass("app-popup-id-" + a.id.trim());
              a.width && $("#popupAlert-popup").css({width:a.width});
              a.height && $("#popupAlert-popup").css({height:a.height});
              a.title && $("#popupAlert div[data-role\x3dheader] h1").text(a.title);
              $("#popupAlert #btn-alert").find(".buttonContent").text(a.button);
              "object" == typeof a.text ? $("#popupAlert .popupContent").replaceWith(a.text) : $("#popupAlert .popupContent").html(a.text);
              $("#popupAlert").popup("open");
            });
            $("#popupAlert").popup({beforeposition:function() {
              $(this).closest(".ui-popup-container").css({"max-height":"95%", "overflow-y":"auto"});
            }});
          }, a.delayInMs);
        });
        break;
      case "dialog":
        plugin_Notification.functions.destroy.dialog().done(function() {
          setTimeout(function() {
            app.template.append("[data-role\x3dpage]", "JQueryMobilePopupDialog");
            $("#popupDialog").data("notification", a);
            $("#popupDialog").one("popupafteropen", function(b, c) {
              app.debug.event(b);
              $("#popupDialog #btn-dialog-close").data("callback", a.callbackButtonClose);
              $("#popupDialog #btn-dialog-left").data("callback", a.callbackButtonLeft);
              $("#popupDialog #btn-dialog-right").data("callback", a.callbackButtonRight);
            });
            $("#popupDialog").one("popupcreate", function(b, c) {
              a.id && $("#popupDialog").addClass("app-popup-id-" + a.id.trim());
              a.width && $("#popupDialog-popup").css({width:a.width});
              a.height && $("#popupDialog-popup").css({height:a.height});
              a.title && $("#popupDialog div[data-role\x3dheader] h1").text(a.title);
              $("#popupDialog #btn-dialog-left").find(".buttonContent").text(a.buttonLeft);
              $("#popupDialog #btn-dialog-right").find(".buttonContent").text(a.buttonRight);
              "object" == typeof a.text ? $("#popupDialog .popupContent").replaceWith(a.text) : $("#popupDialog .popupContent").html(a.text);
              $("#popupDialog").popup("open");
            });
            $("#popupDialog").popup({beforeposition:function() {
              $(this).closest(".ui-popup-container").css({"max-height":"95%", "overflow-y":"auto"});
            }});
          }, a.delayInMs);
        });
        break;
      case "trialog":
        plugin_Notification.functions.destroy.trialog().done(function() {
          setTimeout(function() {
            app.template.append("[data-role\x3dpage]", "JQueryMobilePopupTrialog");
            $("#popupTrialog").data("notification", a);
            $("#popupTrialog").one("popupafteropen", function(b, c) {
              app.debug.event(b);
              $("#popupTrialog #btn-trialog-close").data("callback", a.callbackButtonClose);
              $("#popupTrialog #btn-trialog-left").data("callback", a.callbackButtonLeft);
              $("#popupTrialog #btn-trialog-center").data("callback", a.callbackButtonCenter);
              $("#popupTrialog #btn-trialog-right").data("callback", a.callbackButtonRight);
            });
            $("#popupTrialog").one("popupcreate", function(b, c) {
              a.id && $("#popupTrialog").addClass("app-popup-id-" + a.id.trim());
              a.width && $("#popupTrialog-popup").css({width:a.width});
              a.height && $("#popupTrialog-popup").css({height:a.height});
              a.title && $("#popupTrialog div[data-role\x3dheader] h1").text(a.title);
              $("#popupTrialog #btn-trialog-left").find(".buttonContent").text(a.buttonLeft);
              $("#popupTrialog #btn-trialog-center").find(".buttonContent").text(a.buttonCenter);
              $("#popupTrialog #btn-trialog-right").find(".buttonContent").text(a.buttonRight);
              "object" == typeof a.text ? $("#popupTrialog .popupContent").replaceWith(a.text) : $("#popupTrialog .popupContent").html(a.text);
              $("#popupTrialog").popup("open");
            });
            $("#popupTrialog").popup({beforeposition:function() {
              $(this).closest(".ui-popup-container").css({"max-height":"95%", "overflow-y":"auto"});
            }});
          }, a.delayInMs);
        });
        break;
      default:
        app.debug.error("error in popupShow();");
    }
  }
}, functions:{push_successHandler:function() {
  console.log("succesfull registered");
}, push_errorHandler:function(a) {
  console.error("error registering " + a);
}, push_onNotification:function(a) {
  alert(a.alert);
}, simple:function(a) {
  a.type = "simple";
  plugin_Notification.functions.show(a);
}, alert:function(a, b, c, d, f, g) {
  $.isPlainObject(a) || (app.debug.deprecated("Please use an object as argument."), a = {text:a, title:b, headline:c, button:d, callback:f, delayInMs:g});
  a.type = "alert";
  plugin_Notification.functions.show(a);
}, dialog:function(a, b, c, d, f, g, e, k) {
  $.isPlainObject(a) || (app.debug.deprecated("Please use an object as argument."), a = {text:a, title:b, headline:c, buttonLeft:d, buttonRight:f, callbackButtonLeft:g, callbackButtonRight:e, delayInMs:k});
  a.type = "dialog";
  plugin_Notification.functions.show(a);
}, trialog:function(a) {
  if (!$.isPlainObject(a)) {
    return app.debug.deprecated("Please use an object as argument."), null;
  }
  a.type = "trialog";
  plugin_Notification.functions.show(a);
}, show:function(a) {
  app.debug.info("plugin_Notification.functions.show() - open popup: " + JSON.stringify(a));
  plugin_Notification.functions.close.all().done(function() {
    if (void 0 == a.delayInMs || null == a.delayInMs) {
      a.delayInMs = 100;
    }
    plugin_Notification.popupShow(a);
  });
}, destroy:{simple:function() {
  var a = $.Deferred();
  if ($("#popupSimple").parent().hasClass("ui-popup-active")) {
    $("#popupSimple").on("popupafterclose", function(b, c) {
      app.debug.event(b);
      $("#popupSimple").off("popupafterclose");
      $("#popupSimple").popup("destroy");
      $("#popupSimple").remove();
      a.resolve();
    }), $("#popupSimple").popup("close");
  } else {
    try {
      $("#popupSimple").popup("destroy");
    } catch (b) {
      a.resolve();
    }
    $("#popupSimple").remove();
    a.resolve();
  }
  return a.promise();
}, alert:function() {
  var a = $.Deferred();
  if ($("#popupAlert").parent().hasClass("ui-popup-active")) {
    $("#popupAlert").on("popupafterclose", function(b, c) {
      app.debug.event(b);
      $("#popupAlert").off("popupafterclose");
      $("#popupAlert").popup("destroy");
      $("#popupAlert").remove();
      a.resolve();
    }), $("#popupAlert").popup("close");
  } else {
    try {
      $("#popupAlert").popup("destroy");
    } catch (b) {
      a.resolve();
    }
    $("#popupAlert").remove();
    a.resolve();
  }
  return a.promise();
}, dialog:function() {
  var a = $.Deferred();
  if ($("#popupDialog").parent().hasClass("ui-popup-active")) {
    $("#popupDialog").on("popupafterclose", function(b, c) {
      app.debug.event(b);
      $("#popupDialog").off("popupafterclose");
      $("#popupDialog").popup("destroy");
      $("#popupDialog").remove();
      a.resolve();
    }), $("#popupDialog").popup("close");
  } else {
    try {
      $("#popupDialog").popup("destroy");
    } catch (b) {
      a.resolve();
    }
    $("#popupDialog").remove();
    a.resolve();
  }
  return a.promise();
}, trialog:function() {
  var a = $.Deferred();
  if ($("#popupTrialog").parent().hasClass("ui-popup-active")) {
    $("#popupTrialog").on("popupafterclose", function(b, c) {
      app.debug.event(b);
      $("#popupTrialog").off("popupafterclose");
      $("#popupTrialog").popup("destroy");
      $("#popupTrialog").remove();
      a.resolve();
    }), $("#popupTrialog").popup("close");
  } else {
    try {
      $("#popupTrialog").popup("destroy");
    } catch (b) {
      a.resolve();
    }
    $("#popupTrialog").remove();
    a.resolve();
  }
  return a.promise();
}, all:function() {
  var a = $.Deferred();
  $.when(app.notify.destroy.simple(), app.notify.destroy.alert(), app.notify.destroy.dialog(), app.notify.destroy.trialog()).done(function() {
    a.resolve();
  });
  return a.promise();
}}, close:{simple:function() {
  var a = $.Deferred();
  $("#popupSimple").parent().hasClass("ui-popup-active") ? ($("#popupSimple").on("popupafterclose", function(b, c) {
    app.debug.event(b);
    $("#popupSimple").off("popupafterclose");
    a.resolve();
  }), $("#popupSimple").popup("close")) : a.resolve();
  return a.promise();
}, alert:function() {
  var a = $.Deferred();
  $("#popupAlert").parent().hasClass("ui-popup-active") ? ($("#popupAlert").on("popupafterclose", function(b, c) {
    app.debug.event(b);
    $("#popupAlert").off("popupafterclose");
    a.resolve();
  }), $("#popupAlert").popup("close")) : a.resolve();
  return a.promise();
}, dialog:function() {
  var a = $.Deferred();
  $("#popupDialog").parent().hasClass("ui-popup-active") ? ($("#popupDialog").on("popupafterclose", function(b, c) {
    app.debug.event(b);
    $("#popupDialog").off("popupafterclose");
    a.resolve();
  }), $("#popupDialog").popup("close")) : a.resolve();
  return a.promise();
}, trialog:function() {
  var a = $.Deferred();
  $("#popupTrialog").parent().hasClass("ui-popup-active") ? ($("#popupTrialog").on("popupafterclose", function(b, c) {
    app.debug.event(b);
    $("#popupTrialog").off("popupafterclose");
    a.resolve();
  }), $("#popupTrialog").popup("close")) : a.resolve();
  return a.promise();
}, all:function() {
  var a = $.Deferred();
  $.when(app.notify.close.simple(), app.notify.close.alert(), app.notify.close.dialog(), app.notify.close.trialog()).done(function() {
    a.resolve();
  });
  return a.promise();
}}, open:{simple:function() {
  var a = $.Deferred(), b = $("#popupSimple").data("notification");
  $("#popupSimple").one("popupafteropen", function(c, d) {
    app.debug.event(c);
    b.width && $("#popupSimple-popup").css({width:b.width});
    b.height && $("#popupSimple-popup").css({height:b.height});
    $("#popupSimple").popup("reposition", {});
    a.resolve();
  });
  $("#popupSimple").popup("open");
  return a.promise();
}, alert:function() {
  var a = $.Deferred(), b = $("#popupAlert").data("notification");
  $("#popupAlert").one("popupafteropen", function(c, d) {
    app.debug.event(c);
    b.width && $("#popupAlert-popup").css({width:b.width});
    b.height && $("#popupAlert-popup").css({height:b.height});
    $("#popupAlert").popup("reposition", {});
    a.resolve();
  });
  $("#popupAlert").popup("open");
  return a.promise();
}, dialog:function() {
  var a = $.Deferred(), b = $("#popupDialog").data("notification");
  $("#popupDialog").one("popupafteropen", function(c, d) {
    app.debug.event(c);
    b.width && $("#popupDialog-popup").css({width:b.width});
    b.height && $("#popupDialog-popup").css({height:b.height});
    $("#popupDialog").popup("reposition", {});
    a.resolve();
  });
  $("#popupDialog").popup("open");
  return a.promise();
}, trialog:function() {
  var a = $.Deferred(), b = $("#popupTrialog").data("notification");
  $("#popupTrialog").one("popupafteropen", function(c, d) {
    app.debug.event(c);
    b.width && $("#popupTrialog-popup").css({width:b.width});
    b.height && $("#popupTrialog-popup").css({height:b.height});
    $("#popupTrialog").popup("reposition", {});
    a.resolve();
  });
  $("#popupTrialog").popup("open");
  return a.promise();
}}, add:{simple:function(a) {
  app.debug.operation(function() {
    void 0 === a.id && app.debug.error("Missing property 'id' in popup.");
  });
  a.type = "simple";
  plugin_Notification.notifications.push(a);
}, alert:function(a, b, c, d, f, g) {
  if ($.isPlainObject(a)) {
    var e = a;
  } else {
    app.debug.deprecated("Please use an object as argument."), e = {text:a, title:b, headline:c, button:d, callback:f, delayInMs:g};
  }
  app.debug.operation(function() {
    void 0 === e.id && app.debug.error("Missing property 'id' in popup.");
  });
  e.type = "alert";
  plugin_Notification.notifications.push(e);
}, dialog:function(a, b, c, d, f, g, e, k) {
  if ($.isPlainObject(a)) {
    var h = a;
  } else {
    app.debug.deprecated("Please use an object as argument."), h = {text:a, title:b, headline:c, buttonLeft:d, buttonRight:f, callbackButtonLeft:g, callbackButtonRight:e, delayInMs:k};
  }
  app.debug.operation(function() {
    void 0 === h.id && app.debug.error("Missing property 'id' in popup.");
  });
  h.type = "alert";
  h.type = "dialog";
  plugin_Notification.notifications.push(h);
}, trialog:function() {
  if (!$.isPlainObject(notification)) {
    return app.debug.deprecated("Please use an object as argument."), null;
  }
  app.debug.operation(function() {
    void 0 === notification.id && app.debug.error("Missing property 'id' in popup.");
  });
  notification.type = "alert";
  notification.type = "trialog";
  plugin_Notification.notifications.push(notification);
}}, loader:{}}};
