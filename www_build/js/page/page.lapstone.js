// Input 0
'use strict';
var page_lapstone = {config:null, include:null, include_once:null, parameter:{}, elements:null, constructor:function() {
  app.debug.trace("page_lapstone.constructor()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, creator:function(a) {
  app.debug.trace("page_lapstone.creator()");
  page_lapstone.elements.content.append(function() {
    return $("\x3ch1\x3e").text(app.lang.string("Connect your app to a Server", "page.lapstone"));
  });
  page_lapstone.elements.content.append(function() {
    return $("\x3cp\x3e").text(app.lang.string('Open plugin.WebServceClient.json and edit the "defaultServer" and "server" property.', "page.lapstone"));
  });
  page_lapstone.elements.content.append(function() {
    return $("\x3cp\x3e").text(app.lang.string('Open plugin.KeepAlive.json and edit the "server" and "path" property.', "page.lapstone"));
  });
  page_lapstone.elements.content.append(function() {
    return $("\x3ch2\x3e").text(app.lang.string("If your Server Address differs in each App Installation then use the following functions.", "page.lapstone"));
  });
  page_lapstone.elements.content.append(function() {
    return $("\x3cp\x3e").text(app.lang.string("app.wsc.getServer(); app.wsc.setServer()", "page.lapstone"));
  });
  page_lapstone.elements.content.append(function() {
    return $("\x3ch1\x3e").text("plugin.Notification - popup");
  }).append(function() {
    return $("\x3ca\x3e").attr({href:"#"}).addClass("click").text(function() {
      return app.lang.string("show help for popup", "plugin.Notification - popup");
    }).on("storagefilled", function(a) {
      app.debug.event(a);
      app.notify.popup.help();
    });
  });
}, async:{promise:null, result:null, elements:null, creator:function(a) {
  app.debug.trace("page_lapstone.async.creator()");
  a = $.Deferred();
  a.resolve();
  return a.promise();
}, call:function(a) {
  app.debug.trace("page_lapstone.async.call()");
  return app.rc.getJson();
}, done:function(a) {
  app.debug.trace("page_lapstone.async.done()");
}, fail:function(a) {
  app.debug.trace("page_lapstone.async.fail()");
  alert("WS fails: " + JSON.stringify(this.result));
}, always:function(a) {
  app.debug.trace("page_lapstone.async.always()");
}, abort:function(a) {
  app.debug.trace("page_lapstone.async.abort()");
}}, setEvents:function(a) {
  app.debug.trace("page_lapstone.setEvents()");
}, functions:{}, events:{pagebeforechange:function(a, b) {
  app.debug.trace("page_lapstone.pagebeforechange()");
}, pagebeforecreate:function(a, b) {
  app.debug.trace("page_lapstone.pagebeforecreate()");
}, pagebeforehide:function(a, b) {
  app.debug.trace("page_lapstone.pagebeforehide()");
}, pagebeforeload:function(a, b) {
  app.debug.trace("page_lapstone.pagebeforeload()");
}, pagebeforeshow:function(a, b) {
  app.debug.trace("page_lapstone.pagebeforeshow()");
}, pagechange:function(a, b) {
  app.debug.trace("page_lapstone.pagechange()");
}, pagechangefailed:function(a, b) {
  app.debug.trace("page_lapstone.pagechangefailed()");
}, pagecreate:function(a, b) {
  app.debug.trace("page_lapstone.pagecreate()");
}, pagehide:function(a, b) {
  app.debug.trace("page_lapstone.pagehide()");
}, pageinit:function(a, b) {
  app.debug.trace("page_lapstone.pageinit()");
}, pageload:function(a, b) {
  app.debug.trace("page_lapstone.pageload()");
}, pageloadfailed:function(a, b) {
  app.debug.trace("page_lapstone.pageloadfailed()");
}, pageremove:function(a, b) {
  app.debug.trace("page_lapstone.pageremove()");
}, pageshow:function(a, b) {
  app.debug.trace("page_lapstone.pageshow()");
}}};
