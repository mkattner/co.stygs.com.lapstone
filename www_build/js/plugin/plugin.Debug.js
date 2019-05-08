// Input 0
'use strict';
var plugin_Debug = {config:null, logObject:[], feedback:{language:{}, image:{}}, constructor:function() {
  var a = $.Deferred();
  plugin_Debug.functions.validate(plugin_Debug.config.debugLevels.LAPSTONE, "number");
  plugin_Debug.functions.validate(plugin_Debug.config.logLevel, "array");
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_Debug.pluginsLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  plugin_Debug.config.logLevel = app.sess.getObject("logLevel", "debug") || plugin_Debug.config.logLevel;
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_Debug.pagesLoaded(" + app.debug.arguments(arguments) + ")");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_Debug.definePluginEvents(" + app.debug.arguments(arguments) + ")");
  $(document).on("vclick", function(a) {
    plugin_Debug.aboutListener(a, $(this));
  });
  if (!app.config.min) {
    $(document).on("webserviceCall", function(a, b, c, e) {
      b.fail(function(a) {
        var b = "?";
        void 0 !== e.parameters && $.each(e.parameters, function(a, c) {
          b += a + "\x3d" + c + "\x26";
        });
        alert(c + ": \nURL:\n" + e.url + b + "\n\nWsd:\n" + JSON.stringify(e) + "\n\nWebservice returns:\n" + JSON.stringify(a));
      });
    });
  }
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_Debug.pagesLoaded(" + app.debug.arguments(arguments) + ")");
  if (plugin_Debug.config.debugDevice && 0 == app.config.min) {
    var b = $("\x3cdiv\x3e").attr({id:"divDebug", "data-enhance":"false"}).css({position:"fixed", display:"none", "z-index":"1050", top:"0px", left:"0px", padding:"5px", "min-width":"250px", "min-height":"50px", "background-color":"rgba(200, 200, 200, 0.7)"});
    var c = $("\x3cdiv\x3e").addClass("ui-field-contain").append(function() {
      return $("\x3clabel\x3e").attr({"for":"selConsoleLevel"}).text("console level");
    }).append(function() {
      return $("\x3cselect\x3e").attr({id:"selConsoleLevel", multiple:"multiple", "data-native-menu":"false"});
    });
    c = $("\x3cdiv\x3e").addClass("ui-field-contain").append(function() {
      return $("\x3clabel\x3e").attr({"for":"selLogLevel"}).text("log level");
    }).append(function() {
      return $("\x3cselect\x3e").attr({id:"selLogLevel", multiple:"multiple", "data-native-menu":"false"});
    });
    $.each(plugin_Debug.config.debugLevels, function(a, b) {
      c.find("select").append(function() {
        return $("\x3coption\x3e").attr({value:a}).prop({selected:-1 < plugin_Debug.config.logLevel.indexOf(a) ? !0 : !1}).text(a);
      });
    });
    b.append(c);
    b.append(function() {
      return $("\x3cbutton\x3e").attr({id:"btnClose"}).text("Close");
    });
    a.append(b);
    b.css({display:"none"});
    a.append(function() {
      return $("\x3cdiv\x3e").attr("id", "divDebugButton").css({position:"fixed", display:"block", "z-index":"1050", top:"0px", left:"0px", height:"10px", width:"20px", "background-color":"red"}).on("click", function() {
        $(this).hide();
        $("#divDebug").show();
      });
    });
  }
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_Debug.pageSpecificEvents(" + app.debug.arguments(arguments) + ")");
  plugin_Debug.config.debugDevice && 0 == app.config.min && ($(document).on("change", "#selLogLevel", function() {
    app.debug.event(event);
    var a = $("#selLogLevel").val() || ["OFF"];
    plugin_Debug.config.logLevel = a;
    app.sess.setObject("logLevel", a, "debug");
  }), $(document).on("click", "#btnClose", function() {
    app.debug.event(event);
    $("#divDebug").hide();
    $("#divDebugButton").show();
  }));
}, aboutListener:function(a, b) {
  b.data("clicks") || b.data("clicks", []);
  a = b.data("clicks");
  a.unshift(Date.now());
  1500 > a[0] - a[6] && (a = [], plugin_Debug.about());
  a.slice(0, 7);
}, about:function() {
  app.debug.validate(plugin_Notification);
  $("html").off("vclick");
  var a = $("\x3cul\x3e");
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("App version: ").append(function() {
        return $("\x3cstrong\x3e").text(app.config.version.app);
      });
    });
  });
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("Lapstone version: ").append(function() {
        return $("\x3cstrong\x3e").text(app.config.version.lapstone);
      });
    });
  });
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("Lapstone release version: ").append(function() {
        return $("\x3cstrong\x3e").text(app.config.min);
      });
    });
  });
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("jQuery version: ").append(function() {
        return $("\x3cstrong\x3e").text($.fn.jquery);
      });
    });
  });
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("jQuery mobile version: ").append(function() {
        return $("\x3cstrong\x3e").text($.mobile.version);
      });
    });
  });
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("Use apache cordova: ").append(function() {
        return $("\x3cstrong\x3e").text(app.config.apacheCordova);
      });
    });
  });
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("User Agent: ").append(function() {
        return $("\x3cstrong\x3e").text(navigator.userAgent);
      });
    });
  });
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("HTML Viewport: ").append(function() {
        return $("\x3cstrong\x3e").text($("meta[name\x3dviewport]").attr("content"));
      });
    });
  });
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("Current Page: ").append(function() {
        return $("\x3cstrong\x3e").text($("div[data-role\x3dpage]").attr("id"));
      });
    });
  });
  a.append(function() {
    return $("\x3cli\x3e").append(function() {
      return $("\x3cp\x3e").text("Startup Time: ").append(function() {
        return $("\x3cstrong\x3e").text(app.config.startup + " seconds");
      });
    });
  });
  app.notify.dialog({text:a, title:"About the app.", headline:"Use this data when you report a bug.", buttonLeft:"Report a Bug", buttonRight:"Close", callbackButtonLeft:function(a) {
    $("html").on("vclick", function(a) {
      plugin_Debug.aboutListener(a, $(this));
    });
  }, callbackButtonRight:function(a) {
    $("html").on("vclick", function(a) {
      plugin_Debug.aboutListener(a, $(this));
    });
  }, delayInMs:0, width:"80%"});
}, functions:{arguments:function(a) {
  var b = "";
  $.each(a, function(a, e) {
    b = $.isPlainObject(e) ? b + (JSON.stringify(e) + ", ") : b + (e + ", ");
  });
  return b.substring(0, b.length - 2);
}, webservice:function(a) {
  "string" === typeof a && (plugin_RestClient.config.webservices[a].calls = plugin_RestClient.config.webservices[a].calls || 0, plugin_RestClient.config.webservices[a].calls++);
}, lapstone:function(a) {
  this.log(a, "LAPSTONE");
}, trace:function(a) {
  this.log(a, "TRACE");
}, debug:function(a) {
  this.log(a, "DEBUG");
}, todo:function(a) {
  this.log(a, "TODO", !0);
}, info:function(a) {
  this.log(a, "INFO");
}, event:function(a) {
  this.log("            Type: " + a.type, "EVENT");
  $(a.target).attr("class") && this.log("   Event classes: ." + $(a.target).attr("class").split(" ").join("."), "EVENT");
  $(a.target).attr("id") && this.log("        Event id: #" + $(a.target).attr("id"), "EVENT");
  $(a.delegateTarget).attr("class") && this.log("Delegate classes: ." + $(a.delegateTarget).attr("class").split(" ").join("."), "EVENT");
  $(a.delegateTarget).attr("id") && this.log("     Delegate id: #" + $(a.delegateTarget).attr("id"), "EVENT");
}, app:function(a) {
  this.log(a, "APP");
}, warn:function(a) {
  this.log(a, "WARN");
}, error:function(a) {
  this.log(a, "ERROR", !0);
}, operation:function(a) {
  a();
}, object:function(a) {
  console.log(a);
}, fatal:function(a) {
  this.log(a, "FATAL", !0);
}, deprecated:function(a) {
  if (plugin_Debug.config.debugDevice) {
    try {
      console.error("Deprecated: " + a);
    } catch (b) {
    }
  }
}, flat:function() {
}, validate:function(a, b, c) {
  c = c || "No specific message.";
  if (b) {
    if ("boolean" == typeof b) {
      if (a === b) {
        return !0;
      }
      throw Error("Validation problem. Please look at the stacktrace; " + c);
    }
    if ("boolean" === b) {
      if (!1 === a || !0 === a) {
        return !0;
      }
      throw Error("Validation problem. Please look at the stacktrace; " + c);
    }
    if ("array" === b) {
      if (!Array.isArray(a)) {
        throw plugin_Debug.functions.fatal(), Error("Validation problem. Please look at the stacktrace; " + c);
      }
    } else {
      if ("function" === b) {
        if (!$.isFunction(a)) {
          throw Error("Validation problem. Please look at the stacktrace; " + c);
        }
      } else {
        if ("jsobject" === b) {
          if ("object" !== b || $.isPlainObject(a) || $.isFunction(a)) {
            throw Error("Validation problem: Your object is not a javacript object {}; " + c);
          }
        } else {
          if ("undefined" === b) {
            if (void 0 !== a) {
              throw console.log(a), Error("Validation problem: Your object is not undefined; " + c);
            }
          } else {
            if (typeof a === b) {
              if ("object" === b && !$.isPlainObject(a)) {
                throw Error("Validation problem: Your object is an Array but not a Plain Object; " + c);
              }
              return !0;
            }
            plugin_Debug.functions.fatal();
            throw Error("Validation problem: " + typeof a + " !\x3d " + b + ". Please look at the stacktrace; " + c);
          }
        }
      }
    }
  } else {
    if ("boolean" === typeof a) {
      if (!0 === a) {
        return !0;
      }
      throw Error("Validation problem. Boolean variable \x3d\x3d\x3d false. Please look at the stacktrace; ");
    }
    if ("number" === typeof a || "string" === typeof a) {
      return !0;
    }
    if (!a) {
      throw plugin_Debug.functions.fatal(), Error("Validation problem. Please look at the stacktrace; " + c);
    }
  }
}, alert:function(a, b) {
  console.warn("Dep. " + a);
}, log:function(a, b, c) {
  var e = new Date;
  e = e.getUTCHours().pad() + ":" + e.getUTCMinutes().pad() + ":" + e.getUTCSeconds().pad() + "." + e.getUTCMilliseconds().pad(3);
  if (plugin_Debug.config.debugDevice && -1 < plugin_Debug.config.logLevel.indexOf(b) && (console.log((b + ":       ").slice(0, 7) + e + ": " + a), c)) {
    try {
      console.error("Trace:");
    } catch (d) {
    }
  }
}, showLog:function() {
  console.warn("Deprecated function!!");
  alert(JSON.stringify(plugin_Debug.logObject));
}, ls:{cleanupWsd:function() {
  $.each(plugin_RestClient.config.wsdFiles, function(a, b) {
    lapstone.globalLoader.AsyncJsonLoader(b, 3).done(function(a) {
      var c = function(a) {
        return Object.keys(a).sort(function(a, b) {
          return a[0].hashCode() - b[0].hashCode();
        }).reduce(function(b, c) {
          b[c] = a[c];
          return b;
        }, {});
      };
      var d = {};
      $.each(a, function(a, b) {
        if ("object" !== typeof b.headers) {
          d[a] = b;
          d[a].parameters = {};
          d[a].headers = {};
          var e = b.url.split("?")[0];
          var f = b.url.split("?")[1].split("$")[0];
          b = b.url.split("?")[1].split("$")[1];
          f && $.each(f.split("\x26"), function(b, c) {
            d[a].parameters[c.split("\x3d")[0]] = c.split("\x3d")[1];
          });
          b && $.each(b.split("\x26"), function(b, c) {
            d[a].headers[c.split("\x3d")[0]] = c.split("\x3d")[1];
          });
          "/" !== e[0] && (e = "/" + e);
          d[a].url = e;
          d[a].info = d[a].info || "Add description or info here.";
          d[a].method = d[a].method || "POST";
          d[a].timeout = d[a].timeout || 5000;
          d[a].cacheable = d[a].cacheable || !1;
          d[a].cacheInMs = d[a].cacheInMs || 0;
          e = {info:d[a].info, url:d[a].url, parameters:d[a].parameters, headers:d[a].headers, method:d[a].method, timeout:d[a].timeout, cacheable:d[a].cacheable, cacheInMs:d[a].cacheInMs};
          e.parameters = c(e.parameters);
          e.headers = c(e.headers);
          d[a] = e;
        } else {
          d[a] = b;
        }
      });
      $.each(d, function(a, b) {
        b.server = "";
        b.dataType = "";
        b.contentType = "";
        c(b);
      });
      d = c(d);
      console.log(b);
      console.log(JSON.stringify(d));
    });
  });
}, wsd:function(a) {
  app.debug.trace("plugin_Debug.functions.ls.wsd(" + app.debug.arguments(arguments) + ")");
  $.each(plugin_RestClient.config.webservices, function(b, c) {
    "string" === typeof a && b.contains(a) && (console.log("Name: " + b), c.hasOwnProperty("url") ? (b = c.url.split("?")[0], c = c.url.split("?")[1], console.log("\tPath: " + b), console.log("\tQuery parameter:"), c && $.each(c.split("\x26"), function(a, b) {
      console.log("\t\t" + b.replace("\x3d", " : "));
    }), console.log(" ")) : console.error("Webservice has no url property."));
  });
}}, functionTree:function(a, b) {
  a && $.each(a, function(a, e) {
    "function" === typeof e ? console.log(b + "." + a + "()") : "object" === typeof e && app.debug.functionTree(e, b + "." + a);
  });
}, feedback:{language:function(a) {
  app.debug.trace("plugin_Debug.functions.feedback.language(" + app.debug.arguments(arguments) + ")");
  app.debug.warn("Unimplemented language: " + JSON.stringify(a));
  $.extend(!0, plugin_Debug.feedback.language, a);
}, languageGetJson:function() {
  app.debug.trace("plugin_Debug.functions.feedback.languageGetJson(" + app.debug.arguments(arguments) + ")");
  return JSON.stringify($.extend(!0, plugin_Debug.feedback.language, plugin_MultilanguageIso639_3.dictionary));
}, image:function(a) {
  app.debug.trace("plugin_Debug.functions.feedback.image(" + app.debug.arguments(arguments) + ")");
  app.debug.warn("Unimplemented image: " + JSON.stringify(a));
  $.extend(!0, plugin_Debug.feedback.image, a);
}, imageGetJson:function() {
  app.debug.trace("plugin_Debug.functions.feedback.languageGetJson(" + app.debug.arguments(arguments) + ")");
  return JSON.stringify($.extend(!0, plugin_Debug.feedback.image, plugin_ImageProvider.config.images));
}, wsdGetJson:function() {
  app.debug.trace("plugin_Debug.functions.feedback.wsdGetJson(" + app.debug.arguments(arguments) + ")");
  return JSON.stringify(plugin_RestClient.config.webservices);
}, wsdGetCalls:function() {
  $.each(plugin_RestClient.config.webservices, function(a, b) {
    console.log((b.calls || 0) + " - " + a + " - " + b.url);
  });
}}}};
