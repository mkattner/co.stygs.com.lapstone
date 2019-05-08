// Input 0
'use strict';
var page_start = {config:null, include:null, include_once:null, parameter:{}, elements:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, creator:function(a) {
  app.debug.alert("page_" + this.config.name + ".creator()", 10);
}, async:{promise:null, result:null, elements:null, creator:function(a) {
  a = $.Deferred();
  a.resolve();
  return a.promise();
}, call:function(a) {
  return app.rc.getJson();
}, done:function(a) {
}, fail:function(a) {
  alert("WS fails: " + JSON.stringify(this.result));
}, always:function(a) {
}, abort:function(a) {
}}, setEvents:function(a) {
  app.debug.alert("page_" + this.config.name + ".setEvents()", 10);
}, functions:{}, events:{pagebeforechange:function(a, b) {
}, pagebeforecreate:function(a, b) {
}, pagebeforehide:function(a, b) {
}, pagebeforeload:function(a, b) {
}, pagebeforeshow:function(a, b) {
}, pagechange:function(a, b) {
}, pagechangefailed:function(a, b) {
}, pagecreate:function(a, b) {
}, pagehide:function(a, b) {
  initialisationPanel.hide();
}, pageinit:function(a, b) {
}, pageload:function(a, b) {
}, pageloadfailed:function(a, b) {
}, pageremove:function(a, b) {
}, pageshow:function(a, b) {
  app.nav.start();
}}};
