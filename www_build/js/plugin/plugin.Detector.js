// Input 0
'use strict';
var plugin_Detector = {config:null, cssClasses:{}, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_Detector.pluginsLoaded()");
  var a = $.Deferred();
  plugin_Detector.functions.classes.generate();
  app.debug.debug("Css Classes in body Tag: " + plugin_Detector.functions.classes.classNames(), 60);
  app.debug.debug(navigator.userAgent, 60);
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_Detector.pagesLoaded()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_Detector.definePluginEvents()");
  var a = $.Deferred(), c = $.Deferred();
  document.addEventListener("deviceready", function() {
    a.resolve();
  }, !1);
  $(document).bind("mobileinit", function() {
    c.resolve();
  });
  $.when(a, c).then(plugin_Detector.jQueryMobileAndCordovaLoaded);
  $.when(a).then(plugin_Detector.cordovaLoaded);
  $.when(c).then(plugin_Detector.jQueryMobileLoaded);
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_Detector.afterHtmlInjectedBeforePageComputing()");
  console.log("TODO - clean up \x26 do not use pagebeforecreate");
  plugin_Detector.config.addCssClassesToBodyTag && $.each(app.detect.classes.array(), function(a, b) {
    $("body").hasClass(a) || $("body").addClass(a);
  });
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_Detector.pageSpecificEvents()");
}, jQueryMobileAndCordovaLoaded:function() {
  app.debug.trace("plugin_Detector.jQueryMobileAndCordovaLoaded()");
  plugin_Detector.cssClasses["app-jQueryMobile-and-Cordova"] = null;
}, jQueryMobileLoaded:function() {
  app.debug.trace("plugin_Detector.jQueryMobileLoaded()");
  plugin_Detector.cssClasses["app-jQueryMobile"] = null;
}, cordovaLoaded:function() {
  app.debug.trace("plugin_Detector.cordovaLoaded()");
  plugin_Detector.cssClasses["app-Cordova"] = null;
}, functions:{classes:{classNames:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.classes.classNames()");
  var a = "";
  $.each(plugin_Detector.cssClasses, function(c, b) {
    a += c + " ";
  });
  return a;
}, generate:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.classes.generate()");
  var a;
  if (a = plugin_Detector.functions.isMobile()) {
    plugin_Detector.cssClasses[a] = null;
  }
  if (a = plugin_Detector.functions.isDesktop()) {
    plugin_Detector.cssClasses[a] = null;
  }
  $.each(plugin_Detector.functions.mobile, function(c, b) {
    if ("function" == typeof b) {
      if (a = plugin_Detector.functions.mobile[c]()) {
        plugin_Detector.cssClasses[a] = null;
      }
    } else {
      "object" == typeof b && $.each(plugin_Detector.functions.mobile[c], function(e, b) {
        if ("function" == typeof b) {
          if (a = plugin_Detector.functions.mobile[c][e]()) {
            plugin_Detector.cssClasses[a] = null;
          }
        } else {
          "object" == typeof b && $.each(plugin_Detector.functions.mobile[c][e], function(b, d) {
            "function" == typeof d && (a = plugin_Detector.functions.mobile[c][e][b]()) && (plugin_Detector.cssClasses[a] = null);
          });
        }
      });
    }
  });
  $.each(plugin_Detector.functions.desktop, function(c, b) {
    if ("function" == typeof b) {
      if (a = plugin_Detector.functions.desktop[c]()) {
        plugin_Detector.cssClasses[a] = null;
      }
    } else {
      "object" == typeof b && $.each(plugin_Detector.functions.desktop[c], function(b, d) {
        if ("function" == typeof d) {
          if (a = plugin_Detector.functions.desktop[c][b]()) {
            plugin_Detector.cssClasses[a] = null;
          }
        } else {
          "object" == typeof d && $.each(plugin_Detector.functions.desktop[c][b], function(e, d) {
            "function" == typeof d && (a = plugin_Detector.functions.desktop[c][b][e]()) && (plugin_Detector.cssClasses[a] = null);
          });
        }
      });
    }
  });
  $.each(plugin_Detector.functions.media, function(c, b) {
    if ("function" == typeof b) {
      if (a = plugin_Detector.functions.media[c]()) {
        plugin_Detector.cssClasses[a] = null;
      }
    } else {
      "object" == typeof b && $.each(plugin_Detector.functions.media[c], function(b, d) {
        if ("function" == typeof d) {
          if (a = plugin_Detector.functions.media[c][b]()) {
            plugin_Detector.cssClasses[a] = null;
          }
        } else {
          "object" == typeof d && $.each(plugin_Detector.functions.media[c][b], function(d, e) {
            "function" == typeof e && (a = plugin_Detector.functions.media[c][b][d]()) && (plugin_Detector.cssClasses[a] = null);
          });
        }
      });
    }
  });
  $.each(plugin_Detector.functions.browser, function(c, b) {
    if ("function" == typeof b) {
      if (a = plugin_Detector.functions.browser[c]()) {
        plugin_Detector.cssClasses[a] = null;
      }
    } else {
      "object" == typeof b && $.each(plugin_Detector.functions.browser[c], function(b, d) {
        if ("function" == typeof d) {
          if (a = plugin_Detector.functions.browser[c][b]()) {
            plugin_Detector.cssClasses[a] = null;
          }
        } else {
          "object" == typeof d && $.each(plugin_Detector.functions.browser[c][b], function(d, e) {
            "function" == typeof e && (a = plugin_Detector.functions.browser[c][b][d]()) && (plugin_Detector.cssClasses[a] = null);
          });
        }
      });
    }
  });
}, array:function() {
  app.debug.trace("plugin_Detector.functions.classes.array()");
  return plugin_Detector.cssClasses;
}}, isMobile:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.isMobile()");
  return plugin_Detector.functions.mobile.isApple() || plugin_Detector.functions.mobile.isBlackberry() || plugin_Detector.functions.mobile.isCannonical() || plugin_Detector.functions.mobile.isGoogle() || plugin_Detector.functions.mobile.isMicrosoft() || plugin_Detector.functions.mobile.isMozilla() ? "app-mobile" : !1;
}, mobile:{isApple:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.isApple()");
  return plugin_Detector.functions.mobile.apple.iOS() ? "app-mobile-apple" : !1;
}, apple:{iOS:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.apple.iOS()");
  return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? "app-ios" : !1;
}, iPhone:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.apple.iPhone()");
  return navigator.userAgent.match(/iPhone/i) ? "app-ios" : !1;
}, iPad:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.apple.iPad()");
  return navigator.userAgent.match(/iPad/i) ? "app-ios" : !1;
}, iPod:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.apple.iPod()");
  return navigator.userAgent.match(/iPod/i) ? "app-ios" : !1;
}, version:{iOS3:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS3()");
  return navigator.userAgent.match(/OS 3_/i) ? "app-ios-version-3" : !1;
}, iOS4:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS4()");
  return navigator.userAgent.match(/OS 4_/i) ? "app-ios-version-4" : !1;
}, iOS5:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS5()");
  return navigator.userAgent.match(/OS 5_/i) ? "app-ios-version-5" : !1;
}, iOS6:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS6()");
  return navigator.userAgent.match(/OS 6_/i) ? "app-ios-version-6" : !1;
}, iOS7:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS7()");
  return navigator.userAgent.match(/OS 7_/i) ? "app-ios-version-7" : !1;
}}}, isGoogle:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.isGoogle()");
  return plugin_Detector.functions.mobile.google.Android() ? "app-mobile-android" : !1;
}, google:{Android:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.google.Android()");
  return navigator.userAgent.match(/Android/i) ? "app-android" : !1;
}, version:{}}, isMicrosoft:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.isMicrosoft()");
  if (plugin_Detector.functions.mobile.microsoft.Windows()) {
    return "app-mobile-microsoft";
  }
}, microsoft:{Windows:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.microsoft.Windows()");
  return navigator.userAgent.match(/IEMobile/i) ? "app-windows-mobile" : !1;
}, version:{}}, isBlackberry:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.isBlackberry()");
  return plugin_Detector.functions.mobile.blackberry.blackberry() ? "app-mobile-blackberry" : !1;
}, blackberry:{blackberry:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.blackberry.blackberry()");
  return navigator.userAgent.match(/BlackBerry/i) ? "app-blackberry" : !1;
}, version:{}}, isMozilla:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.isMozilla()");
  return plugin_Detector.functions.mobile.mozilla.firefoxOS() ? "app-mobile-mozilla" : !1;
}, mozilla:{firefoxOS:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.mozilla.firefoxOS()");
}}, isCannonical:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.isCannonical()");
  return plugin_Detector.functions.mobile.canonical.ubuntu() ? "app-mobile-cannonical" : !1;
}, canonical:{ubuntu:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.mobile.cannonical.ubuntu()");
}}}, isDesktop:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.isDesktop()");
  return plugin_Detector.functions.desktop.isApple() || plugin_Detector.functions.desktop.isCannonical() || plugin_Detector.functions.desktop.isMicrosoft() || plugin_Detector.functions.desktop.isDebian() ? "app-desktop" : !1;
}, desktop:{isApple:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.desktop.isApple()");
  return plugin_Detector.functions.desktop.apple.Macintosh() ? "app-desktop-apple" : !1;
}, apple:{Macintosh:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.desktop.apple.Macintosh()");
  return navigator.userAgent.match(/Macintosh/i) ? "app-desktop-apple-macintish" : !1;
}, version:{}}, isMicrosoft:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.desktop.isMicrosoft()");
  return plugin_Detector.functions.desktop.microsoft.Windows() ? "app-desktop-microsoft" : !1;
}, microsoft:{Windows:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.microsoft.Windows()");
  return navigator.userAgent.match(/Windows/i);
}, version:{}}, isCannonical:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.desktop.isCannonical()");
  return plugin_Detector.functions.desktop.cannonical.Ubuntu() ? "app-desktop-cannonical" : !1;
}, cannonical:{Ubuntu:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.desktop.cannonical.Ubuntu()");
  return navigator.userAgent.match(/Ubuntu/i);
}, version:{}}, isDebian:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.desktop.isDebian()");
  return plugin_Detector.functions.desktop.debian.Debian() ? "app-desktop-debian" : !1;
}, debian:{Debian:function() {
  app.debug.deprecated();
  app.debug.trace("plugin_Detector.functions.desktop.debian.debian()");
  return navigator.userAgent.match(/X11; Linux/i);
}, version:{}}}, browser:{microsoft:{version:{}}, apple:{version:{}}, cannonical:{version:{}}, mozilla:{version:{}}, google:{version:{}}}, media:{sony:{version:{}}, microsoft:{version:{}}, nintendo:{version:{}}}}};
