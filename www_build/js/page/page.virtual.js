// Input 0
'use strict';
var page_virtual = {config:null, include:null, include_once:null, parameter:{}, elements:null, constructor:function() {
  app.debug.trace("page_virtual.constructor()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, creator:function(a) {
  app.debug.trace("page_virtual.creator()");
  this.elements.content.append("\x3ch1\x3eHello World\x3c/h1\x3e");
}, async:{promise:null, result:null, elements:null, creator:function(a) {
  app.debug.trace("page_virtual.async.creator()");
  a = $.Deferred();
  a.resolve();
  return a.promise();
}, call:function(a) {
  app.debug.trace("page_virtual.async.call()");
  return app.rc.getJson();
}, done:function(a) {
  app.debug.trace("page_virtual.async.done()");
}, fail:function(a) {
  app.debug.trace("page_virtual.async.fail()");
  alert("WS fails: " + JSON.stringify(this.result));
}, always:function(a) {
  app.debug.trace("page_virtual.async.always()");
}, abort:function(a) {
  app.debug.trace("page_virtual.async.abort()");
}}, setEvents:function(a) {
  app.debug.trace("page_virtual.setEvents()");
}, functions:{}, events:{pagebeforechange:function(a, b) {
  app.debug.trace("page_virtual.pagebeforechange()");
}, pagebeforecreate:function(a, b) {
  app.debug.trace("page_virtual.pagebeforecreate()");
}, pagebeforehide:function(a, b) {
  app.debug.trace("page_virtual.pagebeforehide()");
}, pagebeforeload:function(a, b) {
  app.debug.trace("page_virtual.pagebeforeload()");
}, pagebeforeshow:function(a, b) {
  app.debug.trace("page_virtual.pagebeforeshow()");
}, pagechange:function(a, b) {
  app.debug.trace("page_virtual.pagechange()");
}, pagechangefailed:function(a, b) {
  app.debug.trace("page_virtual.pagechangefailed()");
}, pagecreate:function(a, b) {
  app.debug.trace("page_virtual.pagecreate()");
}, pagehide:function(a, b) {
  app.debug.trace("page_virtual.pagehide()");
}, pageinit:function(a, b) {
  app.debug.trace("page_virtual.pageinit()");
}, pageload:function(a, b) {
  app.debug.trace("page_virtual.pageload()");
}, pageloadfailed:function(a, b) {
  app.debug.trace("page_virtual.pageloadfailed()");
}, pageremove:function(a, b) {
  app.debug.trace("page_virtual.pageremove()");
}, pageshow:function(a, b) {
  app.debug.trace("page_virtual.pageshow()");
}}};
