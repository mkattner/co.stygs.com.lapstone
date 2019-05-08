// Input 0
'use strict';
window.onerror = function(a, b, d, c, e) {
  try {
    console.log("Global ERROR:"), console.log("Message: " + a), console.log("File: " + b), console.log("Line: " + d + " Column: " + c), app.fb.send("lapstone -\x3e global ERROR: " + a);
  } catch (f) {
    console.log("Error at window.onerror function.");
  }
};
var app = {config:{useJQueryMobile:!0, apacheCordova:null, jQueryMobile:null, lapstone:null}, func:function(a, b, d) {
  if (void 0 === d) {
    throw Error("Can't append " + a + " function to undefined object.");
  }
  var c = a.split(".");
  var e = c.shift();
  0 === c.length ? (app.debug.operation(function() {
    void 0 !== d[e] && app.debug.error(a);
  }), d[e] = b) : (d[e] = d[e] || {}, app.func(c.join("."), b, d[e]));
}};
function initialisation() {
  var a = $.Deferred();
  extendJsAndJquery();
  a.resolve();
  return a.promise();
}
function loadPlugins() {
  var a = $.Deferred();
  var b = lapstone.globalLoader.AsyncScriptLoader(app.config.min ? "../js/plugin/all.plugin.min." + app.config.version.app + ".js" : "../js/plugin/plugins.js");
  b.done(function() {
    lapstone.startup.addFunction("                  plugin constructor", app.plugins.constructor);
    a.resolve();
  });
  b.fail(function() {
    a.reject();
  });
  return a.promise();
}
function loadPages() {
  var a = $.Deferred();
  var b = lapstone.globalLoader.AsyncScriptLoader(app.config.min ? "../js/page/all.page.min." + app.config.version.app + ".js" : "../js/page/pages.js");
  b.done(function() {
    lapstone.startup.addFunction("                  page constructor", app.pages.constructor);
    a.resolve();
  });
  b.fail(function() {
    a.reject();
  });
  return a.promise();
}
function loadConfiguration() {
  var a = $.Deferred();
  var b = lapstone.globalLoader.AsyncJsonLoader("../js/lapstone.json");
  b.done(function(b) {
    $.extend(!0, app.config, b);
    lapstone.initialisationPanel.start().done(function() {
      $(".lapstone-version").text(app.config.version.lapstone);
      $(".app-version").text(app.config.version.app);
      void 0 === b.name && console.warn("lapstone.json has no 'name' property.");
      void 0 === b.title && console.warn("lapstone.json has no 'title' property.");
      void 0 === b.version ? console.warn("lapstone.json has no 'version' property.") : (void 0 === b.version.app && console.warn("lapstone.json has no 'version.app' property."), void 0 === b.version.lapstone && console.warn("lapstone.json has no 'version.lapstone' property."), void 0 === b.version.update && console.warn("lapstone.json has no 'version.update' property."));
      void 0 === b.min && console.warn("lapstone.json has no 'min' property.");
      void 0 === b.startPage && console.warn("lapstone.json has no 'startPage' property.");
      void 0 === b.startPage_firstStart && console.warn("lapstone.json has no 'startPage_firstStart' property.");
      void 0 === b.startPage_loggedIn && console.warn("lapstone.json has no 'startPage_loggedIn' property.");
      void 0 === b.badConnectionPage && console.warn("lapstone.json has no 'badConnectionPage' property.");
      $("title").text(app.config.title);
      a.resolve();
    }).fail(function() {
      a.reject();
    });
  });
  b.fail(function() {
    a.reject();
  });
  return a.promise();
}
function updateFramework() {
  var a = $.Deferred();
  if (window.plugin_Informator) {
    var b = app.config.version.lapstone;
    var d = app.config.version.app;
    plugin_Informator.syncObjectWithHtml5Storage({app:{config:{version:app.config.version}}});
    var c = app.config.version.lapstone;
    var e = app.config.version.app;
    !0 === app.config.version.update && (console.warn("update done"), window.plugin_Informator ? app.info.set("app.config.version.update", !1) : console.log("Update mechanism doesn't works without Informator plugin."), app.notify.add.alert({id:"updateDone", title:app.lang.string("update done - title", "lapstone", {version:app.config.version.app}), text:app.lang.string("update done - text", "lapstone", {version:app.config.version.app}), button:app.lang.string("update done - button", "lapstone")}));
    b != c || d != e ? (console.warn("TODO Lastone || App Version Update"), app.info.set("app.config.version.app", d), app.info.set("app.config.version.lapstone", b), lapstone.globalLoader.AsyncJsonLoader("../files/update/registry.json", 3).done(function(c) {
      var e = [];
      $.each(c.updateRegistry, function(a, c) {
        console.log(JSON.stringify(c));
        c.startWithAppVersion && c.stopWithAppVersion && d.toIntegerVersion() >= c.startWithAppVersion.toIntegerVersion() && d.toIntegerVersion() < c.stopWithAppVersion.toIntegerVersion() && (console.warn("App Update: " + c.description), e.push(lapstone.globalLoader.AsyncScriptLoader("../files/update/scripts/" + c.updateScript, 1)));
        c.startWithLapstoneVersion && c.stopWithLapstoneVersion && b.toIntegerVersion() >= c.startWithLapstoneVersion.toIntegerVersion() && b.toIntegerVersion() < c.stopWithLapstoneVersion.toIntegerVersion() && (console.warn("Lapstone Update: " + c.description), e.push(lapstone.globalLoader.AsyncScriptLoader("../files/update/scripts/" + c.updateScript, 1)));
      });
      $.when.apply($, e).done(function() {
        app.info.set("app.config.version.update", !0);
        location.reload();
      }).fail(function() {
        a.reject();
      });
    }).fail(function() {
      a.reject();
    })) : a.resolve();
  } else {
    console.log("Update mechanism doesn't works without Informator plugin."), a.resolve();
  }
  return a.promise();
}
function cacheAjax() {
  if (null !== JSON.parse(window.localStorage.getItem(app.config.name + ".informator-config.app.config.version.update"))) {
    var a = JSON.parse(window.localStorage.getItem(app.config.name + ".informator-config.app.config.version.update"));
    a = !a;
  } else {
    a = !1;
  }
  return a;
}
function loadJQueryMobile() {
  var a = $.Deferred();
  var b = lapstone.globalLoader.AsyncScriptLoader("../ext/jQueryMobile/jquery.mobile.min.js");
  b.done(function() {
    a.resolve();
  });
  b.fail(function() {
    a.reject();
  });
  return a.promise();
}
var lapstone = {globalLoader:{globalTimeout:10000, globalAttempts:3, AsyncJsonLoader:function(a, b, d, c) {
  void 0 == c && (c = $.Deferred());
  void 0 == d && (d = 1);
  void 0 == b && (b = lapstone.globalLoader.globalAttempts);
  $.ajax({cache:cacheAjax(), url:a, async:!0, dataType:"json", timeout:lapstone.globalLoader.globalTimeout}).done(function(e, f, g) {
    "timeout" === f ? (lapstone.startup.log("Timeout while loading: " + a), lapstone.startup.log("It was attempt " + d + " of " + b + "."), d < b ? (lapstone.startup.log("So we try again."), lapstone.globalLoader.AsyncJsonLoader(a, b, d + 1, c)) : (lapstone.startup.log("So the framework loading fails."), c.reject(f))) : c.resolve(e);
  }).fail(function(e, f, g) {
    d < b ? lapstone.globalLoader.AsyncJsonLoader(a, b, d + 1, c) : (console.log("Fatal Error: Can't load JSON. Url: " + a + " Status: " + f), console.log("             Message: " + g.message), console.log("             Stack: " + g.stack), c.reject(arguments));
  });
  return c.promise();
}, JsonLoader:function(a, b, d) {
  console.warn("Lapstone: Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + a);
  var c = null;
  $.ajax({cache:cacheAjax(), url:a, async:!1, dataType:"json", timeout:lapstone.globalLoader.globalTimeout, success:function(a) {
    c = a;
  }, error:function(b, c, d) {
    console.log("Fatal Error: Can't load JSON. Url: " + a + " Status: " + c);
    console.log("             Message: " + d.message);
    console.log("             Stack: " + d.stack);
  }});
  return c;
}, AsyncScriptLoader:function(a, b, d, c) {
  void 0 == c && (c = $.Deferred());
  void 0 == d && (d = 1);
  void 0 == b && (b = lapstone.globalLoader.globalAttempts);
  $.ajax({cache:cacheAjax(), url:a, async:!0, dataType:"script", timeout:lapstone.globalLoader.globalTimeout}).done(function(e, f, g) {
    "timeout" === f ? (lapstone.startup.log("Timeout while loading: " + a), lapstone.startup.log("It was attempt " + d + " of " + b + "."), d < b ? (lapstone.startup.log("So we try again."), lapstone.globalLoader.AsyncScriptLoader(a, b, d + 1, c)) : (lapstone.startup.log("So the framework loading fails."), c.reject(f))) : c.resolve(e);
  }).fail(function(e, f, g) {
    d < b ? lapstone.globalLoader.AsyncScriptLoader(a, b, d + 1, c) : (console.log("Fatal Error: Can't load Script. Url: " + a + " Status: " + f), console.log("             Message: " + g.message), console.log("             Stack: " + g.stack), c.reject(arguments));
  });
  return c.promise();
}, ScriptLoader:function(a, b, d) {
  console.warn("Lapstone: Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + a);
  $.ajax({cache:cacheAjax(), url:a, async:!1, dataType:"script", timeout:lapstone.globalLoader.globalTimeout, success:function(a) {
  }, error:function(b, d, f) {
    alert("Fatal Error: Can't load Script. Url: " + a + " Status: " + d);
    console.log("             Message: " + f.message);
    console.log("             Stack: " + f.stack);
  }});
}, AsyncTextLoader:function(a, b, d, c) {
  void 0 == c && (c = $.Deferred());
  void 0 == d && (d = 1);
  void 0 == b && (b = lapstone.globalLoader.globalAttempts);
  $.ajax({cache:cacheAjax(), url:a, async:!0, dataType:"text", timeout:lapstone.globalLoader.globalTimeout}).done(function(e, f, g) {
    "timeout" === f ? (lapstone.startup.log("Timeout while loading: " + a), lapstone.startup.log("It was attempt " + d + " of " + b + "."), d < b ? (lapstone.startup.log("So we try again."), lapstone.globalLoader.AsyncTextLoader(a, b, d + 1, c)) : (lapstone.startup.log("So the framework loading fails."), c.reject(f))) : c.resolve(e);
  }).fail(function(e, f, g) {
    d < b ? lapstone.globalLoader.AsyncTextLoader(a, b, d + 1, c) : (console.log("Fatal Error: Can't load Text. Url: " + a + " Status: " + f), console.log("             Message: " + g.message), console.log("             Stack: " + g.stack), c.reject(arguments));
  });
  return c.promise();
}, TextLoader:function(a, b, d) {
  console.warn("Lapstone: Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + a);
  var c = null;
  $.ajax({cache:cacheAjax(), url:a, async:!1, dataType:"text", timeout:lapstone.globalLoader.globalTimeout, success:function(a) {
    c = a;
  }, error:function(b, c, d) {
    alert("Fatal Error: Can't load TEXT. Url: " + a + " Status: " + c);
    console.log("             Message: " + d.message);
    console.log("             Stack: " + d.stack);
  }});
  return c;
}, AsyncStyleLoader:function(a, b, d) {
  var c = $.Deferred();
  lapstone.globalLoader.AsyncTextLoader(a).done(function(b) {
    b = b.replaceAll('url("', 'url("' + a.substring(0, a.lastIndexOf("/") + 1));
    b = b.replaceAll("url('", "url('" + a.substring(0, a.lastIndexOf("/") + 1));
    $("head").append(function() {
      return $("\x3cstyle\x3e").text(b);
    });
    c.resolve(b);
  }).fail(function() {
    c.reject(arguments);
  });
  return c.promise();
}, StyleLoader:function(a, b, d) {
  a = cacheAjax() ? '\x3clink rel\x3d"stylesheet" type\x3d"text/css" href\x3d"' + a + '"\x3e' : '\x3clink rel\x3d"stylesheet" type\x3d"text/css" href\x3d"' + a + "?_\x3d" + (new Date).getTime() + '"\x3e';
  $("head").append(a);
}, AsyncLessLoader:function(a, b, d, c) {
  void 0 == c && (c = $.Deferred());
  void 0 == d && (d = 1);
  void 0 == b && (b = lapstone.globalLoader.globalAttempts);
  $.ajax({cache:cacheAjax(), url:a, async:!0, dataType:"text", timeout:lapstone.globalLoader.globalTimeout}).done(function(e, f, g) {
    "timeout" === f ? (lapstone.startup.log("Timeout while loading: " + a), lapstone.startup.log("It was attempt " + d + " of " + b + "."), d < b ? (lapstone.startup.log("So we try again."), lapstone.globalLoader.AsyncTextLoader(a, b, d + 1, c)) : (lapstone.startup.log("So the framework loading fails."), c.reject(arguments))) : (void 0 == $("style#lapstoneStyles")[0] && $("head").append(function() {
      return $("\x3cstyle\x3e").attr("id", "lapstoneStyles");
    }), $("style#lapstoneStyles").before('\x3clink rel\x3d"stylesheet/less" type\x3d"text/css" href\x3d"' + a + '"\x3e'), c.resolve(e));
  }).fail(function(e, f, g) {
    d < b ? lapstone.globalLoader.AsyncTextLoader(a, b, d + 1, c) : (console.log("Fatal Error: Can't load Text. Url: " + a + " Status: " + f), console.log("             Message: " + g.message), console.log("             Stack: " + g.stack), c.reject(arguments));
  });
  return c.promise();
}, LessLoader:function(a, b, d) {
  a = cacheAjax() ? '\x3clink rel\x3d"stylesheet/less" type\x3d"text/css" href\x3d"' + a + '"\x3e' : '\x3clink rel\x3d"stylesheet/less" type\x3d"text/css" href\x3d"' + a + "?_\x3d" + (new Date).getTime() + '"\x3e';
  $("head").append(a);
}}};
$(document).bind("mobileinit", function() {
  app.debug.debug("jQuery mobile initialized", 30);
  $.mobile.ajaxEnabled = !0;
  $.mobile.autoInitializePage = !1;
  $.support.cors = !0;
  $.mobile.allowCrossDomainPages = !0;
  $.mobile.page.prototype.options.domCache = !1;
  $.mobile.ignoreContentEnabled = !0;
  $.mobile.loader.prototype.options.text = "loading";
  $.mobile.loader.prototype.options.textVisible = !1;
  $.mobile.loader.prototype.options.theme = "a";
  $.mobile.loader.prototype.options.html = "";
  $.mobile.defaultPageTransition = "none";
  $.mobile.page.prototype.options.keepNative = "*";
  $.mobile.keepNative = "*";
  app.config.jQueryMobile = !0;
});
document.addEventListener("deviceready", onDeviceReady, !1);
function onDeviceReady() {
  app.config.apacheCordova = !0;
  $("body").addClass("app-apache-cordova");
}
function waitForMobileinit() {
  var a = $.Deferred(), b;
  !0 === app.config.jQueryMobile ? a.resolve() : b = setInterval(function() {
    !0 === app.config.jQueryMobile && (a.resolve(), clearInterval(b));
  }, 50);
  return a.promise();
}
function waitForDeviceready() {
  var a = $.Deferred(), b;
  window.cordova ? !0 === app.config.apacheCordova ? a.resolve() : b = setInterval(function() {
    !0 === app.config.apacheCordova && (clearInterval(b), a.resolve());
  }, 50) : (app.config.apacheCordova = !1, a.resolve());
  return a.promise();
}
lapstone.initialisationPanel = {start:function() {
  var a = $.Deferred();
  $("head").append("\x3ctitle\x3e");
  $("title").text("...");
  app.config.min ? ($("head").append(function() {
    return $("\x3cstyle\x3e").append(app.config.startupStyle);
  }), $("body").append(app.config.startupContent), a.resolve()) : (lapstone.globalLoader.StyleLoader("../js/lapstone.css"), lapstone.globalLoader.AsyncTextLoader("../js/lapstone.html").done(function(b) {
    $("body").append(b);
    a.resolve();
  }).fail(function() {
    a.reject();
  }));
  return a.promise();
}, hide:function() {
  window.setTimeout(function() {
    $("#LAPSTONE").remove();
    app.config.apacheCordova && navigator.splashscreen.hide();
  }, 100);
}, updateProgress:function() {
  var a = parseInt($("progress").attr("value"));
  $("progress").attr("value", a + 5);
}, changeStatus:function() {
  $("#LAPSTONE .lapstone-status").text(lapstone.startup.currentDefinition.status);
}, finish:function() {
  lapstone.initialisationPanel.hide();
}};
lapstone.startupDefinition = [{status:"Lapstone startup: loading configuration", "function":loadConfiguration}, {status:"Lapstone startup: initialisation", "function":initialisation}, {status:"Lapstone startup: load plugins", "function":loadPlugins}, {status:"Lapstone startup: load pages", "function":loadPages}, {status:"Lapstone startup: checking for updates", "function":updateFramework}, {status:"Lapstone startup: load jQueryMobile", "function":loadJQueryMobile}, {status:"Lapstone startup: wait for apache cordova deviceready event", 
"function":waitForDeviceready}, {status:"Lapstone startup: wait for jQuerysmobile mobileinit event", "function":waitForMobileinit}];
lapstone.startup = {currentDefinition:{status:"----------------- Starting the Lapstone Framework"}, dfd:$.Deferred(), timestamp:Date.now() / 1000, startupTimestamp:Date.now() / 1000, promise:null, images:{}, addFunction:function(a, b) {
  lapstone.startupDefinition.unshift({status:a, "function":b});
}, log:function() {
  var a = Date.now() / 1000;
  console.log("LST " + (a - lapstone.startup.timestamp).toFixed(3) + "s: " + lapstone.startup.currentDefinition.status);
  lapstone.startup.timestamp = a;
}, functionDone:function(a) {
  lapstone.startup.currentDefinition = lapstone.startupDefinition.shift();
  lapstone.startup.currentDefinition ? (lapstone.initialisationPanel.changeStatus(), lapstone.initialisationPanel.updateProgress(), lapstone.startup.log(), a = lapstone.startup.currentDefinition["function"](), a.done(function() {
    lapstone.startup.functionDone(arguments);
  }), a.fail(function() {
    lapstone.startup.functionFail(arguments);
  })) : lapstone.startup.dfd.resolve();
}, functionFail:function() {
  console.log(" FAILED");
  lapstone.startup.log();
  try {
    var a = JSON.stringify(arguments);
    console.log("ERROR: " + a);
    console.log(arguments);
  } catch (b) {
  }
  lapstone.startup.dfd.reject(arguments);
}, initFramework:function() {
  lapstone.startup.log();
  lapstone.startup.functionDone();
  return lapstone.startup.dfd.promise();
}};
$(document).ready(function() {
  var a = lapstone.startup.initFramework();
  a.done(function() {
    lapstone.initialisationPanel.finish();
    app.config.lapstone = !0;
    $(document).trigger("lapstone");
    app.config.startup = Date.now() / 1000 - lapstone.startup.startupTimestamp;
    console.log("Lapstone started in " + app.config.startup + "seconds");
    console.log("      Versions:");
    console.log("           app: " + app.config.version.app);
    console.log("      lapstone: " + app.config.version.lapstone);
    console.log("        jquery: " + $.fn.jquery);
    console.log(" jquery mobile: " + $.mobile.version);
  });
  a.fail(function() {
    throw Error("Initialisation problem. Please look at the stacktrace.");
  });
  a.always(function() {
  });
});
function handleOpenURL(a) {
}
function extendJsAndJquery() {
  Number.prototype.pad = function(a) {
    for (var b = String(this); b.length < (a || 2);) {
      b = "0" + b;
    }
    return b;
  };
  String.prototype.hashCode = function() {
    var a = 0;
    var b = this.length;
    if (0 == b) {
      return a;
    }
    for (var d = 0; d < b; d++) {
      var c = this.charCodeAt(d);
      a = (a << 5) - a + c;
      a &= a;
    }
    return Math.abs(a);
  };
  "function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function(a) {
    return 0 === this.indexOf(a);
  });
  "function" != typeof String.prototype.replaceAll && (String.prototype.replaceAll = function(a, b) {
    return this.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$\x26"), "g"), b);
  });
  "function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function(a) {
    return -1 !== this.indexOf(a, this.length - a.length);
  });
  "function" != typeof String.prototype.contains && (String.prototype.contains = function(a) {
    return -1 != this.indexOf(a);
  });
  "function" != typeof String.prototype.capitalizeFirstLetter && (String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  });
  String.prototype.pathCombine = function(a) {
    a = this + "/" + a;
    var b = a.match(/([^:]\/{2,})/g);
    for (var d in b) {
      var c = b[d].substr(0, 1) + "/";
      a = a.replace(b[d], c);
    }
    return a;
  };
  String.prototype.toIntegerVersion = function(a) {
    var b = 0;
    a = a ? this.split(a).reverse() : this.split(".").reverse();
    $.each(a, function(a, c) {
      b += Math.pow(10000, a) * parseInt(c);
    });
    return b;
  };
  String.prototype.majorVersion = function() {
    return parseInt(this.split(".")[0]);
  };
  String.prototype.minorVersion = function() {
    return parseInt(this.split(".")[1]);
  };
  String.prototype.buildVersion = function() {
    return parseInt(this.split(".")[2]);
  };
  String.prototype.occurences = function(a, b) {
    a += "";
    if (0 >= a.length) {
      return this.length + 1;
    }
    var d = 0, c = 0;
    for (b = b ? 1 : a.length;;) {
      if (c = this.indexOf(a, c), 0 <= c) {
        ++d, c += b;
      } else {
        break;
      }
    }
    return d;
  };
}
;