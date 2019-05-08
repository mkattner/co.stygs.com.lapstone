// Input 0
'use strict';
var page_badConnection = {config:null, parameter:{}, elements:null, constructor:function() {
  app.debug.trace("page_badConnection.constructor()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, creator:function(a) {
  app.debug.trace("page_" + this.config.name + ".creator()");
  $.each(app.detect.classes.array(), function(a, c) {
    $("body").hasClass(a) || $("body").addClass(a);
  });
  this.elements.content.append(function() {
    return $("\x3cdiv\x3e").addClass("configuration").append(function() {
      return $("\x3ch1\x3e").text("Bad Connection");
    }).append(function() {
      return $("\x3cp\x3e").text("Check your internet badConnection. You will be redirected after your badConnection is back again.");
    });
  });
}, async:{promise:null, result:null, elements:null, creator:function(a) {
  app.debug.trace("page_badConnection.async.creator()");
  a = $.Deferred();
  a.resolve();
  return a.promise();
}, call:function(a) {
  app.debug.trace("page_badConnection.async.call()");
  return app.rc.getJson();
}, done:function(a) {
  app.debug.trace("page_badConnection.async.done()");
}, fail:function(a) {
  app.debug.trace("page_badConnection.async.fail()");
  alert("WS fails: " + JSON.stringify(this.result));
}, always:function(a) {
  app.debug.trace("page_badConnection.async.always()");
}, abort:function(a) {
  app.debug.trace("page_badConnection.async.abort()");
}}, setEvents:function(a) {
  app.debug.trace("page_badConnection.setEvents()");
}, functions:{}, events:{pagebeforechange:function(a, b) {
  app.debug.trace("page_badConnection.pagebeforechange()");
}, pagebeforecreate:function(a, b) {
  app.debug.trace("page_badConnection.pagebeforecreate()");
}, pagebeforehide:function(a, b) {
  app.debug.trace("page_badConnection.pagebeforehide()");
}, pagebeforeload:function(a, b) {
  app.debug.trace("page_badConnection.pagebeforeload()");
}, pagebeforeshow:function(a, b) {
  app.debug.trace("page_badConnection.pagebeforeshow()");
}, pagechange:function(a, b) {
  app.debug.trace("page_badConnection.pagechange()");
}, pagechangefailed:function(a, b) {
  app.debug.trace("page_badConnection.pagechangefailed()");
}, pagecreate:function(a, b) {
  app.debug.trace("page_badConnection.pagecreate()");
}, pagehide:function(a, b) {
  app.debug.trace("page_badConnection.pagehide()");
}, pageinit:function(a, b) {
  app.debug.trace("page_badConnection.pageinit()");
}, pageload:function(a, b) {
  app.debug.trace("page_badConnection.pageload()");
}, pageloadfailed:function(a, b) {
  app.debug.trace("page_badConnection.pageloadfailed()");
}, pageremove:function(a, b) {
  app.debug.trace("page_badConnection.pageremove()");
}, pageshow:function(a, b) {
  app.debug.trace("page_badConnection.pageshow()");
}}};
