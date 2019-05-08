// Input 0
'use strict';
var plugin_MultilanguageIso639_3 = {config:null, dictionary:null, parameter:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace(this.config.name + ".pluginsLoaded()", 11);
  app.debug.validate(plugin_MultilanguageIso639_3.config.availableLanguages, "object");
  app.debug.operation(function() {
    plugin_MultilanguageIso639_3.config.availableLanguages.dev = ["dev"];
  });
  return plugin_MultilanguageIso639_3.loadLanguageIntoDict(plugin_MultilanguageIso639_3.config.defaultLanguage);
}, pagesLoaded:function() {
  app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()", 11);
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
}, pageSpecificEvents:function(a) {
  app.debug.trace("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
}, loadLanguageIntoDict:function(a) {
  var b = "../files/language/" + a + ".json";
  var d = lapstone.globalLoader.AsyncJsonLoader(b);
  d.done(function(b) {
    plugin_MultilanguageIso639_3.dictionary = b;
    $("html").attr({lang:plugin_MultilanguageIso639_3.config.availableLanguages[a][0]});
  }).fail(function(a) {
    alert("Fatal error: Can't load language: " + b + " Error: " + JSON.stringify(a));
  });
  return d;
}, functions:{get:function() {
  return plugin_MultilanguageIso639_3.config.defaultLanguage;
}, getAvailableLanguages:function() {
  return plugin_MultilanguageIso639_3.config.availableLanguages;
}, getCurrentLanguage:function() {
  return plugin_MultilanguageIso639_3.config.defaultLanguage;
}, languageAvailable:function(a) {
  return this.getAvailableLanguages().hasOwnProperty(a);
}, changeLanguage:function(a) {
  return plugin_MultilanguageIso639_3.loadLanguageIntoDict(a).done(function() {
    app.info.set("plugin_MultilanguageIso639_3.config.defaultLanguage", a);
  });
}, addParameter:function(a, b) {
  plugin_MultilanguageIso639_3.parameter || (plugin_MultilanguageIso639_3.parameter = {}, void 0 != plugin_HTML5Storage && app.store.localStorage.getList("language-"));
  plugin_MultilanguageIso639_3.parameter[a] = b;
  void 0 != plugin_HTML5Storage && app.store.localStorage.set("language-" + a, b);
}, extendDictionary:function(a, b) {
  void 0 !== b ? $.extend(!0, plugin_MultilanguageIso639_3.dictionary[b], a) : $.extend(!0, plugin_MultilanguageIso639_3.dictionary, a);
}, string:function(a, b, d) {
  var c = null;
  plugin_MultilanguageIso639_3.dictionary || plugin_MultilanguageIso639_3.loadLanguageIntoDict(plugin_MultilanguageIso639_3.config.defaultLanguage);
  if (void 0 == b) {
    c = plugin_MultilanguageIso639_3.dictionary[a];
  } else {
    if (void 0 == plugin_MultilanguageIso639_3.dictionary[b]) {
      var e = '{"' + b + '" : {}}';
      app.debug.feedback.language(JSON.parse(e));
      app.fb.send("plugin.MultilanguageIso_639_3: " + e);
      c = a;
    } else {
      c = plugin_MultilanguageIso639_3.dictionary[b][a];
    }
  }
  if (void 0 != c) {
    return null != plugin_MultilanguageIso639_3.parameter && $.each(plugin_MultilanguageIso639_3.parameter, function(a, b) {
      c = c.replace("%" + a + "%", b);
    }), void 0 != d && $.each(d, function(a, b) {
      c = c.replace("%" + a + "%", b);
    }), c;
  }
  e = '{"' + b + '" : {"' + a + '" : "TRANSLATION"}}';
  app.debug.feedback.language(JSON.parse(e));
  app.fb.send("plugin.MultilanguageIso_639_3: " + e);
  return a;
}, list:function(a) {
  var b = "";
  plugin_MultilanguageIso639_3.dictionary || plugin_MultilanguageIso639_3.loadLanguageIntoDict(plugin_MultilanguageIso639_3.config.defaultLanguage);
  $.each(plugin_MultilanguageIso639_3.dictionary, function(a, c) {
    "object" == typeof c ? $.each(c, function(a, c) {
      b += c + "\n";
    }) : b += c + "\n";
  });
  return b;
}, set:function(a) {
  plugin_MultilanguageIso639_3.loadLanguageIntoDict(a);
  app.info.set("plugin_MultilanguageIso639_3.config.defaultLanguage", a);
}}};
