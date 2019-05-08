// Input 0
'use strict';
var plugin_HtmlTemplates = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_HtmlTemplates.pluginsLoaded()");
  app.debug.validate(plugin_HtmlTemplates.config.useSkinPlugin, "boolean");
  var a = $.Deferred(), b = [];
  if (app.config.min) {
    $.each(plugin_HtmlTemplates.config.templates, function(a, b) {
      !0 === b.useSkin && (plugin_HtmlTemplates.config.templates[a].style = b.styles[app.skin.getCurrentSkin()]);
    }), a.resolve();
  } else {
    $.each(plugin_HtmlTemplates.config.templates, function(a, e) {
      a = e.content;
      var c = e.style;
      app.debug.validate(a, "string");
      app.debug.validate(c, "string");
      app.debug.validate(e.useSkin, "boolean");
      !0 === e.useSkin && (app.debug.validate(c.contains("skin")), c = c.replace("skin", app.skin.getCurrentSkin()));
      app.debug.operation(function() {
        app.debug.validate(!c.contains("skin"));
      });
      b.push(lapstone.globalLoader.AsyncTextLoader(a));
      b.push(lapstone.globalLoader.AsyncTextLoader(c));
    });
    var c = $.when.apply($, b);
    c.done(function() {
      var b = arguments, c = 0;
      $.each(plugin_HtmlTemplates.config.templates, function(a, e) {
        plugin_HtmlTemplates.config.templates[a].content = b[c];
        c++;
        plugin_HtmlTemplates.config.templates[a].style = b[c];
        c++;
      });
      a.resolve();
    });
    c.fail(function() {
      a.reject();
    });
  }
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_HtmlTemplates.pagesLoaded()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_HtmlTemplates.afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_HtmlTemplates.pageSpecificEvents()");
}, parseLess:function(a, b) {
  b = b || 0;
  if (3 > b) {
    try {
      less.render(a, {filename:"../files/template/xxx.less"}, function(a, b) {
        c = b.css;
      });
    } catch (d) {
      app.debug.error("Less Error:");
      app.debug.object(d);
      b++;
      var c = plugin_HtmlTemplates.parseLess(a, b);
    }
  } else {
    return app.debug.error("Less Error!"), null;
  }
  return c;
}, getText:function(a) {
  app.debug.trace("plugin_HtmlTemplates.getText()");
  var b = null, c = null;
  app.debug.validate(app.template.config.templates[a]);
  app.debug.validate(app.template.config.templates[a].content);
  app.debug.validate(app.template.config.templates[a].style);
  b = plugin_HtmlTemplates.config.templates[a].content;
  c = plugin_HtmlTemplates.config.templates[a].style;
  app.config.min || (c = plugin_HtmlTemplates.parseLess(c));
  var d = plugin_HtmlTemplates.config.templates[a].styleIsActive;
  void 0 == d && (d = plugin_HtmlTemplates.config.templates[a].styleIsActive = !1);
  void 0 == $("style#lapstoneStyles")[0] && $("head").append(function() {
    return $("\x3cstyle\x3e").attr("id", "lapstoneStyles");
  });
  !1 === d && ($("style#lapstoneStyles").append(c), plugin_HtmlTemplates.config.templates[a].styleIsActive = !0);
  app.debug.debug("plugin_HtmlTemplates.getText() - text: " + b);
  return b;
}, getElements:function(a) {
  app.debug.trace("plugin_HtmlTemplates.getElements()");
  a = plugin_HtmlTemplates.config.templates[a].elements;
  void 0 == a && (a = {});
  app.debug.debug("plugin_HtmlTemplates.getElements() - elements: " + JSON.stringify(a));
  return a;
}, functions:{get:function(a, b) {
  app.debug.trace("plugin_HtmlTemplates.functions.get()");
  app.debug.debug("plugin_HtmlTemplates.functions.get() - templateId: " + a);
  b = b || $(plugin_HtmlTemplates.getText(a));
  var c = {};
  b.hasClass("template" + a) || b.addClass("template" + a);
  app.debug.validate(app.template.config.templates[a]);
  plugin_HtmlTemplates.config.templates[a].elements && $.each(plugin_HtmlTemplates.config.templates[a].elements, function(a, b) {
    c["_" + a] = function(a) {
      return a ? this.find(b).append(a) : this.find(b);
    };
  });
  b.extend(c);
  return b;
}, append:function(a, b) {
  app.debug.trace("plugin_HtmlTemplates.functions.append()");
  $(a).append(plugin_HtmlTemplates.functions.get(b));
}, prepend:function(a, b) {
  app.debug.trace("plugin_HtmlTemplates.functions.prepend()");
  $(a).prepend(plugin_HtmlTemplates.functions.get(b));
}, overwrite:function(a, b) {
  app.debug.trace("plugin_HtmlTemplates.functions.overwrite()");
  app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - selector: " + a);
  app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - templateId: " + b);
  $(a).empty();
  $(a).attr("data-context", b);
  $(a).prepend(plugin_HtmlTemplates.functions.get(b));
  app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - new html code: " + $(a)[0].outerHTML);
}, elements:function(a) {
  app.debug.trace("plugin_HtmlTemplates.functions.elements()");
  return plugin_HtmlTemplates.getElements(a);
}}};
