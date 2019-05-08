// Input 0
'use strict';
var plugin_OAuth = {config:null, constructor:function() {
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
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()");
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_" + this.config.name + ".pageSpecificEvents()");
}, desktopOAuth:function(a) {
  return null === app.config.apacheCordova || !1 === app.config.apacheCordova ? (app.nav.redirect(a), !0) : !1;
}, functions:{parameterFromUrl:function(a, b) {
  b = b || window.location.href;
  -1 !== b.lastIndexOf("#") && (b = b.substr(0, b.lastIndexOf("#") - 1));
  if (a = (new RegExp("" + a + "\x3d(.+)$")).exec(b)) {
    a = (a[0] + "").split("\x3d"), a = a[1] + "", a = a.split("\x26"), a = a[0];
  } else {
    return !1;
  }
  return a;
}, getQueryString:function() {
  try {
    return window.location.href.split("?")[1];
  } catch (a) {
    return "";
  }
}, generic:function(a) {
  if (-1 < a.indexOf("dropbox")) {
    return app.oa.dropbox(a);
  }
  if (-1 < a.indexOf("facebook")) {
    return app.oa.facebook(a);
  }
  var b = $.Deferred();
  window.setTimeout(function() {
    b.resolve("Unkonwn URL: " + a);
  }, 1000);
  return b.promise();
}, dropbox:function(a) {
  if (plugin_OAuth.desktopOAuth(a)) {
    return null;
  }
  var b = $.Deferred();
  cordova.InAppBrowser.open(a, "_blank", "location\x3dyes");
  return b.promise();
}, facebook:function(a) {
  var b = URI(a).query(!0).redirect_uri;
  if (plugin_OAuth.desktopOAuth(a)) {
    return null;
  }
  var c = $.Deferred();
  var d = cordova.InAppBrowser.open(a, "_blank", "location\x3dno,clearcache\x3dyes,clearsessioncache\x3dyes");
  var e = 0;
  d.addEventListener("loadstart", function(f) {
    e++;
    a = f.url;
    console.log(a);
    2 < e && a.contains(b) && (a.contains("code") ? (d.close(), c.resolve(a)) : a.contains("error") && (d.close(), c.reject(a)));
  });
  return c.promise();
}, google:function(a) {
  URI(a).query(!0);
  if (plugin_OAuth.desktopOAuth(a)) {
    return null;
  }
  var b = $.Deferred();
  window.plugins.googleplus.login({}, function(a) {
    b.resolve(a);
  }, function(a) {
    b.reject(a);
  });
  return b.promise();
}, facebookToken:function(a, b, c, d) {
  $.post("https://accounts.google.com/o/oauth2/token", {code:a, client_id:b, client_secret:c, redirect_uri:d, grant_type:"authorization_code"}).done(function(a) {
  }).fail(function(a) {
  });
}}};
