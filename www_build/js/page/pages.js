// Input 0
'use strict';
app.page = {};
app.pages = {config:null, pageNames:[], includeOnce:[], history:[], constructor:function() {
  var b = $.Deferred();
  lapstone.startup.addFunction("                  cleanup pages", app.pages.cleanup);
  lapstone.startup.addFunction("                  calling the plugins' pages loaded function", app.pages.callPluginsPagesLoaded);
  lapstone.startup.addFunction("                  calling the pages' setEvents() function", app.pages.setEvents);
  lapstone.startup.addFunction("                  load pages' globalPages", app.pages.globalPages);
  lapstone.startup.addFunction("                  verifying the pages' properties", app.pages.verifyPages);
  lapstone.startup.addFunction("                  including external scripts for pages", app.pages.include);
  lapstone.startup.addFunction("                  loading the pages", app.pages.loadPages);
  lapstone.startup.addFunction("                  verifying the pages' names", app.pages.verifyPageNames);
  lapstone.startup.addFunction("                  loading the pages' configuration", app.pages.loadPageConfig);
  b.resolve();
  return b.promise();
}, cleanup:function() {
  var b = $.Deferred();
  b.resolve();
  return b.promise();
}, include:function() {
  var b = $.Deferred(), a = [];
  app.config.min ? b.resolve() : ($.each(app.pages.config, function(b, d) {
    d && (app.debug.validate(window["page_" + b].config.include_once), app.debug.validate(window["page_" + b].config.include), $.each(window["page_" + b].config.include_once, function(b, c) {
      -1 === app.pages.includeOnce.indexOf(c) && (a.push(lapstone.globalLoader.AsyncScriptLoader("../js/page/include/" + c)), app.pages.includeOnce.push(c));
    }));
  }), $.when.apply($, a).done(function() {
    b.resolve();
  }).fail(function(a) {
    b.reject(a);
  }));
  return b.promise();
}, callPluginsPagesLoaded:function() {
  var b = $.Deferred();
  $.each(app.plugins.pluginNames, function(a, b) {
    window["plugin_" + b].pagesLoaded();
  });
  b.resolve();
  return b.promise();
}, loadPageConfig:function() {
  var b = $.Deferred();
  if (app.config.min) {
    app.pages.config = config_json, b.resolve();
  } else {
    var a = lapstone.globalLoader.AsyncJsonLoader("../js/page/pages.json");
    a.done(function(a) {
      app.pages.config = a;
      b.resolve();
    });
    a.fail(function() {
      b.reject();
    });
  }
  return b.promise();
}, verifyPageNames:function() {
  var b = $.Deferred();
  b.resolve();
  return b.promise();
}, verifyPages:function() {
  var b = $.Deferred();
  $.each(app.pages.pageNames, function(a, b) {
    a = window["page_" + b];
    void 0 === a.config ? console.warn("The page: " + b + " has no 'config' property.") : (void 0 === a.config.name && console.warn("The page: " + b + " has no 'config.name' property."), void 0 === a.config.template && console.warn("The page: " + b + " has no 'config.template' property."), void 0 === a.config.useKeepAlive && console.warn("The page: " + b + " has no 'config.useKeepAlive' property."), void 0 === a.config.loginObligate && console.warn("The page: " + b + " has no 'config.loginObligate' property."), 
    "boolean" === typeof a.config.isGlobalPage && console.warn("The page: " + b + " has 'config.isGlobalPage' property. This mechanism is deprecated. Use globalPage[''] property"), void 0 == a.config.globalPage && console.warn("The page: " + b + " has no 'config.globalPage : []' property."), void 0 === a.config.asyncLoading && console.warn("The page: " + b + " has no 'config.asyncLoading' property."));
    void 0 === a.elements && console.warn("The page: " + b + " has no 'elements' property.");
    void 0 === a.parameter && console.warn("The page: " + b + " has no 'parameter' property.");
    void 0 === a.constructor && console.warn("The page: " + b + " has no 'constructor' property.");
    void 0 === a.creator && console.warn("The page: " + b + " has no 'creator' property.");
    void 0 === a.async ? console.warn("The page: " + b + " has no 'async' property.") : (void 0 === a.async.promise && console.warn("The page: " + b + " has no 'async.promise' property."), void 0 === a.async.result && console.warn("The page: " + b + " has no 'async.result' property."), void 0 === a.async.elements && console.warn("The page: " + b + " has no 'async.elements' property."), void 0 === a.async.creator && console.warn("The page: " + b + " has no 'async.creator' property."), void 0 === a.async.call && 
    console.warn("The page: " + b + " has no 'async.call' property."), void 0 === a.async.done && console.warn("The page: " + b + " has no 'async.done' property."), void 0 === a.async.fail && console.warn("The page: " + b + " has no 'async.fail' property."), void 0 === a.async.always && console.warn("The page: " + b + " has no 'async.always' property."), void 0 === a.async.abort && console.warn("The page: " + b + " has no 'async.abort' property."));
    void 0 === a.setEvents && console.warn("The page: " + b + " has no 'setEvents' property.");
    void 0 === a.functions && console.warn("The page: " + b + " has no 'functions' property.");
  });
  b.resolve();
  return b.promise();
}, loadPageConfiguration:function(b) {
  var a = $.Deferred();
  if (app.config.min) {
    window["page_" + b].config = window["config_" + b], a.resolve();
  } else {
    var c = lapstone.globalLoader.AsyncJsonLoader("../js/page/page." + b + ".json");
    c.done(function(c) {
      window["page_" + b].config = c;
      a.resolve();
    });
    c.fail(function() {
      a.reject();
    });
  }
  return a.promise();
}, onPageLoaded:function(b) {
  var a = $.Deferred(), c;
  if (void 0 == window["page_" + b]) {
    alert("Fatal error: Page class is not defined: page_" + b);
  } else {
    var d = app.pages.loadPageConfiguration(b);
    d.done(function() {
      if (void 0 == window["page_" + b].config.name) {
        return alert("Fatal error: The property 'name' is not defined in JSON file: ../js/page." + b + ".json"), !1;
      }
      c = window["page_" + b].constructor();
      c.done(function() {
        window["page_" + b].config.page = b;
        window["page_" + b].config.pageId = "#" + b;
        app.pages.pageNames.push(b);
        a.resolve();
      });
      c.fail(function() {
        a.reject();
      });
    });
    d.fail(function() {
      a.reject();
    });
    return a.promise();
  }
}, loadPages:function() {
  var b = $.Deferred(), a = [], c = [], d;
  $.each(app.pages.config, function(b, c) {
    app.config.min ? a.push(app.pages.onPageLoaded(b)) : a.push(lapstone.globalLoader.AsyncScriptLoader("../js/page/page." + b + ".js"));
  });
  var e = $.when.apply($, a);
  app.config.min ? e.done(function() {
    app.pages.callPluginPageEventFunctions();
    $.each(app.pages.pageNames, function(a, b) {
      window.app.page[b] = window["page_" + b].functions;
    });
    b.resolve();
  }) : e.done(function() {
    $.each(app.pages.config, function(a, b) {
      c.push(app.pages.onPageLoaded(a));
    });
    d = $.when.apply($, c);
    d.done(function() {
      app.pages.callPluginPageEventFunctions();
      $.each(app.pages.pageNames, function(a, b) {
        window.app.page[b] = window["page_" + b].functions;
      });
      b.resolve();
    });
    d.fail(function() {
      b.reject();
    });
  });
  e.fail(function() {
    b.reject();
  });
  return b.promise();
}, callPluginPageEventFunctions:function() {
  var b = $.Deferred();
  $.each(app.plugins.pluginNames, function(a, b) {
    app.debug.debug("try to call: plugin_" + b + ".pageSpecificEvents()", 6);
    window["plugin_" + b].pageSpecificEvents();
  });
  b.resolve();
  return b.promise();
}, callPluginsPageFunctions:function(b) {
  var a = $.Deferred();
  $.each(app.plugins.pluginNames, function(a, d) {
    window["plugin_" + d].afterHtmlInjectedBeforePageComputing(b);
  });
  a.resolve();
  return a.promise();
}, globalPages:function() {
  var b = $.Deferred(), a = [], c = [];
  $.each(app.pages.config, function(b, c) {
    !0 === c && $.each(window["page_" + b].config.globalPage, function(b, c) {
      -1 === a.indexOf(c) && a.push(c);
    });
  });
  $.each(a, function(a, b) {
    c.push(lapstone.globalLoader.AsyncScriptLoader("../files/globalPages/" + b + ".js"));
  });
  var d = $.when.apply($, c);
  d.done(function() {
    app.debug.operation(function() {
      window.setTimeout(function() {
        $.each(a, function(a, b) {
          a = window["globalPage_" + b];
          app.debug.validate(a.async, "jsobject", "A globalPage must contain a async: {} object: " + b);
          app.debug.validate(a.async.done, "jsobject", "A globalPage must contain a async.done() function: " + b);
          app.debug.validate(a.async.fail, "jsobject", "A globalPage must contain a async.fail() function: " + b);
          app.debug.validate(a.async.always, "jsobject", "A globalPage must contain a async.always() function: " + b);
        });
      }, 0);
    });
    b.resolve();
  });
  d.fail(function() {
    b.reject();
  });
  return b.promise();
}, setEvents:function() {
  var b = $.Deferred();
  $(document).on("pagebeforechange", ".app-page", function(a) {
    app.debug.lapstone("pages.js jqm hook: pagebeforechange for: " + $(this).attr("id"));
    app.debug.deprecated("Will be removed.");
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pagebeforechange")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pagebeforecreate", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pagebeforecreate for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pagebeforecreate")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
    "static" != $(this).attr("data-type") && "static-inline" != $(this).attr("data-type") && void 0 == window["page_" + $(this).attr("id")] && (alert("-Fatal error: Can't find the page object: page_" + $(this).attr("id") + "; Please have a look to your pages.json file. You'll be redirected to the index.html page."), app.nav.redirect("index.html", "none"));
  });
  $(document).on("pagebeforehide", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pagebeforehide for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pagebeforehide")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pagebeforeload", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pagebeforeload for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pagebeforeload")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pagebeforeshow", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pagebeforeshow for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pagebeforeshow")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pagechange", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pagechange for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pagechange")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pagechangefailed", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pagechangefailed for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pagechangefailed")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pagecreate", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pagecreate for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pagecreate")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pagehide", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pagehide for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pagehide")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pageinit", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pageinit for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pageinit")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pageload", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pageload for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pageload")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pageloadfailed", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pageloadfailed for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pageloadfailed")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pageremove", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pageremove for: " + $(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pageremove")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  $(document).on("pageshow", ".app-page", function(a) {
    app.debug.lapstone("jqm hook: pageshow for: " + $(this).attr("id"));
    app.pages.history.push($(this).attr("id"));
    if (!app.pages.eventFunctions.pageTypeSelector(a, $(this), "pageshow")) {
      return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  b.resolve();
  return b.promise();
}, eventPromises:{}, eventFunctions:{pageTypeSelector:function(b, a, c) {
  app.debug.trace("plugin.eventFunctions.pageTypeSelector(" + b + ", " + a + ", " + c + ")");
  app.debug.debug("PageId: " + a.attr("id"));
  var d;
  var e = window["page_" + a.attr("id")];
  if (void 0 === e) {
    app.debug.debug("case: page ist not defined in pages.json"), alert("plugin.eventFunctions.pageTypeSelector() - Fatal error: Can't find the page object: page_" + a.attr("id") + "; Please have a look to your pages.json file."), app.nav.redirect("index.html", "none");
  } else {
    return app.debug.debug("case: page is a common lapstone page"), app.pages.eventPromises[c] = [], (d = app.pages.eventFunctions.lapstonePage[c](b, a)) && $.isFunction(d.promise) && app.pages.eventPromises[c].push(d), !1 !== d ? $.each(e.config.globalPage, function(d, e) {
      d = window["globalPage_" + e];
      app.debug.validate(d[c], "function", "Unknown event function: " + e + "." + c);
      (e = d[c](b, a)) && $.isFunction(e.promise) && app.pages.eventPromises[c].push(e);
    }) : console.log($(a[0]).attr("id") + " " + c), $.when.apply($, app.pages.eventPromises[c]).always(function() {
    }), d;
  }
}, lapstonePage:{pagebeforechange:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforechange(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pagebeforechange(b, a);
}, pagebeforecreate:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforecreate(" + b + ", " + a + ")");
  if (!0 === window["page_" + a.attr("id")].config.loginObligate && !1 === app.sess.loggedIn()) {
    return app.debug.validate(app.plugins.functions.pluginLoaded("Actions"), "boolean"), app.actions.loginObligate(), !1;
  }
  if (!0 === app.plugins.config.KeepAlive) {
    app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: : WebServiceClient requires keepAlive");
    if (void 0 != window["page_" + a.attr("id")].config.useKeepAlive) {
      app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has keepAlive configuration in page.json");
      if (window["page_" + a.attr("id")].config.useKeepAlive) {
        app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: global keepAlive is TRUE");
        if (!0 === app.alive.isAlive()) {
          return app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: server isAlive"), app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(b, a);
        }
        app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: no connection to server");
        app.debug.debug("Can't load page because keepAlive failed. Check your connection. You'll be redirected to the index.html page.", 60);
        app.alive.badConnectionHandler();
        return !1;
      }
      app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has NO keepAlive entry in page.json file");
      return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(b, a);
    }
    app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page does not require keepAlive");
    app.debug.debug("No useKeepAlive entry in your page_" + a.attr("id") + ".json. Please add it.", 60);
    return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(b, a);
  }
  app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: WebServiceClient does not require keepAlive");
  return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(b, a);
}, pagebeforecreate_createPage:function(b, a) {
  app.debug.trace("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage()");
  app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - pageId: " + a.attr("id"));
  var c = null;
  var d = $.Deferred();
  var e = window["page_" + a.attr("id")];
  e.events.pagebeforecreate(b, a);
  void 0 != e.include ? app.debug.trace("pages.js - page has an include array") : app.debug.trace("pages.js - page has no include array");
  void 0 != e.config.template && (app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - case: template !\x3d undefined"), "string" == typeof e.config.template && 1 < e.config.template.length && (app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - case: typeof template \x3d\x3d string"), app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - overwrite template"), app.template.overwrite("#" + a.attr("id"), 
  window["page_" + a.attr("id")].config.template), c = app.template.elements(e.config.template), e.elements = {}, app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set elements"), app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - html code of page: " + a[0].outerHTML), $.each(c, function(b, c) {
    app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set content from template to: page_" + a.attr("id"));
    app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set: " + b, 20);
    e.elements[b] = a.find(c);
  }), $.each(e.config.globalPage, function(a, b) {
    a = window["globalPage_" + b];
    app.debug.validate(a.elements, "object");
    a.elements = e.elements;
  })));
  app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - create the page");
  !0 === window["page_" + a.attr("id")].config.asyncLoading ? (app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - page IS async"), window["page_" + a.attr("id")].async.elements = window["page_" + a.attr("id")].elements, app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.creator()"), b = window["page_" + a.attr("id")].async.creator(a), window["page_" + a.attr("id")].async.result = null, b.done(function(b) {
    b ? (app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: " + JSON.stringify(b)), window["page_" + a.attr("id")].async.result = b) : (app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: []"), window["page_" + a.attr("id")].async.result = []);
    window["page_" + a.attr("id")].setEvents(a);
    window.setTimeout(function() {
      window["page_" + a.attr("id")].config.name === app.pages.getCurrent().config.name ? (app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.done()"), window["page_" + a.attr("id")].async.done(a), d.resolve(a)) : d.reject(a);
    }, 5);
  }), b.fail(function(b) {
    app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: " + JSON.stringify(b));
    window["page_" + a.attr("id")].async.result = b;
    window["page_" + a.attr("id")].config.name === app.pages.getCurrent().config.name && (app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.fail()"), window["page_" + a.attr("id")].async.fail(a));
    d.reject(a);
  }), b.always(function() {
    window["page_" + a.attr("id")].config.name === app.pages.getCurrent().config.name && (app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.always()"), window["page_" + a.attr("id")].async.always(a));
  }), b.progress(function() {
  })) : (app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - page IS NOT async"), window["page_" + a.attr("id")].setEvents(a), window["page_" + a.attr("id")].creator(a), d.resolve(a));
  d.done(function(a) {
  });
  app.debug.debug("Call: app.pages.callPluginsPageFunctions()");
  app.pages.callPluginsPageFunctions(a);
  app.debug.debug("add data- HTML Attributes");
  $.each(window["page_" + a.attr("id")].config, function(b, c) {
    a.attr("data-" + b, c);
  });
  return d.promise();
}, pagebeforehide:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforehide(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pagebeforehide(b, a);
}, pagebeforeload:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforeload(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pagebeforeload(b, a);
}, pagebeforeshow:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pagechange(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pagebeforeshow(b, a);
}, pagechange:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pagechange(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pagechange(b, a);
}, pagechangefailed:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pagechangefailed(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pagechangefailed(b, a);
}, pagecreate:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pagecreate(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pagecreate(b, a);
}, pagehide:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pagehide(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  app.debug.debug("plugin.eventFunctions.lapstonePage.pagehide: clear page specific event delegates");
  $("#" + a.attr("id")).off();
  $(document).off("#" + a.attr("id"));
  app.debug.debug("remove page from DOM: " + a.attr("id"));
  a.remove();
  c.events.pagehide(b, a);
}, pageinit:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pageinit(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pageinit(b, a);
}, pageload:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pageload(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pageload(b, a);
}, pageloadfailed:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pageloadfailed(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pageloadfailed(b, a);
}, pageremove:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pageremove(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pageremove(b, a);
}, pageshow:function(b, a) {
  app.debug.trace("plugin.eventFunctions.lapstonePage.pageshow(" + b + ", " + a + ")");
  var c = window["page_" + a.attr("id")];
  if (!0 === c.config.loginObligate && !1 === app.sess.loggedIn()) {
    return !1;
  }
  c.events.pageshow(b, a);
  void 0 != navigator.splashscreen && navigator.splashscreen.hide();
  !0 === app.plugins.functions.pluginLoaded("Notification") && app.notify.popup.show();
}}}, getCurrent:function() {
  return window["page_" + $("[data-role\x3dpage]").attr("id")];
}};
$(document).on("lapstone", function() {
  $.mobile.initializePage();
});
