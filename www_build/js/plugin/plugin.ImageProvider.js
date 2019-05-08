// Input 0
'use strict';
var plugin_ImageProvider = {config:null, images:{}, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, loadDefinitionFile:function(a) {
  var b = $.Deferred();
  a = lapstone.globalLoader.AsyncJsonLoader(a);
  a.done(function(a) {
    $.each(a, function(a, b) {
      plugin_ImageProvider.config.images[a] = b;
    });
    b.resolve();
  });
  a.fail(function() {
    b.reject();
  });
  return b.promise();
}, pluginsLoaded:function() {
  app.debug.trace(this.config.name + ".pluginsLoaded()");
  var a = $.Deferred(), b = [];
  app.debug.validate(plugin_ImageProvider.config.imgdFiles);
  app.debug.validate(plugin_ImageProvider.config.images);
  if (app.config.min) {
    a.resolve();
  } else {
    $.each(plugin_ImageProvider.config.imgdFiles, function(a, c) {
      b.push(plugin_ImageProvider.loadDefinitionFile(c));
    });
    var c = $.when.apply($, b);
    c.done(function() {
      a.resolve();
    });
    c.done(function() {
      a.reject();
    });
  }
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
}, functions:{addDefinitionFile:function(a) {
  return plugin_ImageProvider.loadDefinitionFile(a);
}, addDefinition:function(a, b, c) {
  app.debug.validate(c);
  c ? ($.isPlainObject(plugin_ImageProvider.config.images[c]) || (plugin_ImageProvider.config.images[c] = {}), plugin_ImageProvider.config.images[c][a] = b) : plugin_ImageProvider.config.images[a] = b;
}, getUrlById:function(a, b) {
  app.debug.validate(b);
  void 0 == (b = plugin_ImageProvider.config.images[b][a]) && (console.warn("ImageProvider - Undefined image: " + a), app.debug.feedback.image(JSON.parse('{"' + a + '":"PATH"}')), b = a);
  return b;
}, getCssUrlByIdForSkin:function(a, b) {
  return "url(" + plugin_ImageProvider.functions.getUrlByIdForSkin(a, b) + ")";
}, getUrlByIdForSkin:function(a, b) {
  app.debug.validate(b);
  if (void 0 == b) {
    var c = plugin_ImageProvider.config.images[a];
  } else {
    void 0 == plugin_ImageProvider.config.images[b] ? (console.warn("Image - context doesn't exist: " + b), app.debug.feedback.image(JSON.parse('{"' + b + '" : {}}')), c = a) : c = plugin_ImageProvider.config.images[b][a];
  }
  if (void 0 != c) {
    return c.substring(0, c.lastIndexOf("/")) + "/" + plugin_Skin.config.defaultSkin + c.substring(c.lastIndexOf("/"), c.length);
  }
  console.warn("Image - " + b + "." + a + " \x3d\x3d undefined");
  app.debug.feedback.image(JSON.parse('{"' + b + '" : {"' + a + '" : "URL"}}'));
  return a;
}}};
