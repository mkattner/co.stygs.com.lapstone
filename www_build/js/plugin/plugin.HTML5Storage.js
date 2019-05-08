// Input 0
'use strict';
var plugin_HTML5Storage = {config:null, type:{object:"_t_pojo_", array:"_t_array_", empty:"_t_empty_"}, storage:{objectStorage:{}}, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace("plugin_HTML5Storage.pluginsLoaded()");
  var a = $.Deferred();
  app.debug.deprecated("app.store plugin is now case sensitive fo keys!!");
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_HTML5Storage.pagesLoaded()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
  app.debug.trace("plugin_HTML5Storage.definePluginEvents()");
  var a = function(a, c) {
    app.debug.debug("plugin.HTML5Storage.js plugin_HTML5Storage.definePluginEvents()");
    $("input").blur();
    $.each(c.attrs(), function(a, b) {
      "data-html5-" == a.substring(0, 11).trim() ? (app.debug.deprecated("data-html5- attribute to persist element attributes is deprecated. Use: data-app-"), app.debug.debug("plugin.HTML5Storage.js plugin_HTML5Storage.definePluginEvents() Set localStorage: " + a + " \x3d " + b), plugin_HTML5Storage.functions.localStorage.set(a, b), c.data(a, b)) : "data-app-" == a.substring(0, 9).trim() && (app.debug.debug("plugin.HTML5Storage.js plugin_HTML5Storage.definePluginEvents() Set localStorage: " + a + 
      " \x3d " + b), plugin_HTML5Storage.functions.localStorage.set(a, b), c.data(a, b));
    });
    app.debug.debug("plugin_HTML5Storage.definePluginEvents() - trigger: storagefilled");
    c.trigger("storagefilled");
  };
  $(document).on("touchstart", "a.click", function(a) {
    app.debug.event(a);
    $(this).data("fire", !0);
  });
  $(document).on("touchmove", "a.click", function(a) {
    app.debug.event(a);
    $(this).data("fire", !1);
  });
  $(document).on("touchend", "a.click", function(b) {
    app.debug.event(b);
    var c;
    var d = $(this);
    void 0 !== (c = d.attr("href")) && 1 < c.length ? app.nav.redirect(c, d.attr("data-transition") || "none") : (!0 === d.data("fire") && (d.data("fire", !1), b.preventDefault(), a(b, d)), window.setTimeout(function() {
      d.data("fire", !0);
    }, 300));
  });
  $(document).on("click", "a.click", function(b) {
    app.debug.event(b);
    b.stopPropagation();
    b.preventDefault();
    var c;
    var d = $(this);
    void 0 !== (c = d.attr("href")) && 1 < c.length ? app.nav.redirect(c, d.attr("data-transition") || "none") : (!1 !== d.data("fire") && (d.data("fire", !1), a(b, d)), window.setTimeout(function() {
      d.data("fire", !0);
    }, 300));
  });
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("plugin_HTML5Storage.afterHtmlInjectedBeforePageComputing()");
}, pageSpecificEvents:function(a) {
  app.debug.trace("plugin_HTML5Storage.pageSpecificEvents()");
}, setDeep:function(a, b, c) {
  app.debug.trace("plugin_HTML5Storage.setDeep(" + app.debug.arguments(arguments) + ")");
  b = b.split(".");
  for (var d = 0, e = b.length; d < e - 1; ++d) {
    a = a[b[d]];
  }
  a[b[d]] = c;
}, setDeepBase64Key:function(a, b, c) {
  app.debug.trace("plugin_HTML5Storage.setDeepBase64Key(" + app.debug.arguments(arguments) + ")");
  b = b.split(".");
  for (var d = 0, e = b.length; d < e - 1; ++d) {
    a = a[window.atob(b[d])];
  }
  app.debug.debug("plugin_HTML5Storage.setDeepBase64Key - " + a[window.atob(b[d])] + " \x3d " + c);
  a[window.atob(b[d])] = c;
}, getDeep:function(a, b) {
  app.debug.trace("plugin_HTML5Storage.getDeep(" + app.debug.arguments(arguments) + ")");
  b = b.split(".");
  for (var c = 0, d = b.length; c < d; ++c) {
    a = a[b[c]];
  }
  return a;
}, setDeepX:function(a, b, c) {
  app.debug.trace("plugin_HTML5Storage.setDeepX(" + app.debug.arguments(arguments) + ")");
  var d = b.split("."), e;
  if (e = d[0]) {
    if (app.debug.debug("plugin_HTML5Storage.setDeepX() - case: depth \x3e 0"), e === plugin_HTML5Storage.type.array) {
      a = [];
    } else {
      if (e.startsWith(plugin_HTML5Storage.type.array)) {
        app.debug.debug("plugin_HTML5Storage.setDeepX() - case: object is an array");
        var f = e.substring(plugin_HTML5Storage.type.array.length);
        app.debug.debug("plugin_HTML5Storage.setDeepX() - array index: " + f);
        Array.isArray(a) || (app.debug.debug("plugin_HTML5Storage.setDeepX() - array is not defined - define empty array"), a = []);
        1 == d.length ? (app.debug.debug("plugin_HTML5Storage.setDeepX() - case: depth 1; push value to array: " + c), a[f] = c) : (d[1].startsWith(plugin_HTML5Storage.type.object) ? (app.debug.debug("plugin_HTML5Storage.setDeepX() - next element is an object; so push empty object"), a[f] || (a[f] = {})) : d[1].startsWith(plugin_HTML5Storage.type.array) && (app.debug.debug("plugin_HTML5Storage.setDeepX() - next element is an array; so push empty array; next key: " + d[1]), a[f] || (a[f] = [])), app.debug.debug("plugin_HTML5Storage.setDeepX() - call recursively for nested array"), 
        a[f] = this.setDeepX(a[f], b.substr(e.length + 1), c));
      } else {
        e === plugin_HTML5Storage.type.object ? a = {} : e.startsWith(plugin_HTML5Storage.type.object) ? (app.debug.debug("plugin_HTML5Storage.setDeepX() - case: object is an object"), f = e.substring(plugin_HTML5Storage.type.object.length), 1 == d.length ? (app.debug.debug("plugin_HTML5Storage.setDeepX() - case: depth 1; so add the value: " + c + " to key: " + e), a[f] = c) : (a[f] || (app.debug.debug("plugin_HTML5Storage.setDeepX() - case: object key is not defined - define empty object: " + e), 
        a[f] = {}), app.debug.debug("plugin_HTML5Storage.setDeepX() - call recursively for nested object"), a[f] = this.setDeepX(a[f], b.substr(e.length + 1), c))) : 1 == d.length ? (app.debug.debug("plugin_HTML5Storage.setDeepX() - case: depth 1; so add the value: " + c + " to key: " + e), app.debug.debug("plugin_HTML5Storage.setDeepX() - value type \x3d\x3d value"), a[e] = c) : (app.debug.debug("plugin_HTML5Storage.setDeepX() - case: root element"), a[e] || (app.debug.debug("plugin_HTML5Storage.setDeepX() - case: object key is not defined - define empty object: " + 
        e), a[e] = {}), app.debug.debug("plugin_HTML5Storage.setDeepX() - call recursively for nested object"), a[e] = this.setDeepX(a[e], b.substr(e.length + 1), c));
      }
    }
  }
  return a;
}, parseValue:function(a) {
  app.debug.trace("plugin_HTML5Storage.parseValue()");
  switch(a) {
    case "true":
      app.debug.debug("plugin_HTML5Storage.parseValue() - case: value \x3d\x3d true");
      a = !0;
      break;
    case "false":
      app.debug.debug("plugin_HTML5Storage.parseValue() - case: value \x3d\x3d false");
      a = !1;
      break;
    case "null":
      app.debug.debug("plugin_HTML5Storage.parseValue() - case: value \x3d\x3d null");
      a = null;
      break;
    default:
      app.debug.debug("plugin_HTML5Storage.parseValue() - case: default"), /^(\+|\-){0,1}([0-9])+$/.test(a) ? (app.debug.debug("plugin_HTML5Storage.parseValue() - case: typeof value \x3d\x3d integer"), a = parseInt(a)) : /^(\+|\-){0,1}([0-9])+(\.){1}([0-9])+$/.test(a) ? (app.debug.debug("plugin_HTML5Storage.parseValue() - case: typeof value \x3d\x3d float"), a = parseFloat(a)) : app.debug.debug("plugin_HTML5Storage.parseValue() - case: value \x3d\x3d ???");
  }
  app.debug.debug("plugin_HTML5Storage.parseValue() - return: " + a);
  return a;
}, getSpace:function(a) {
  app.debug.trace("plugin_HTML5Storage.getSpace()");
  var b = "", c;
  for (c = 0; c < a; c++) {
    b += " ";
  }
  return b;
}, functions:{pufferedFormValuePrefix:"pufferedFormValue-", localStorage:{set:function(a, b) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.set(" + app.debug.arguments(arguments) + ")");
  window.localStorage.setItem(app.config.name + "." + a, b);
  return !0;
}, get:function(a) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.get(" + app.debug.arguments(arguments) + ")");
  return plugin_HTML5Storage.parseValue(window.localStorage.getItem(app.config.name + "." + a));
}, clear:function() {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.clear(" + app.debug.arguments(arguments) + ")");
  $.each(window.localStorage, function(a, b) {
    a.substring(0, app.config.name.length) == app.config.name && window.localStorage.removeItem(a);
  });
  return !0;
}, clearHtml5:function() {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.clearHtml5(" + app.debug.arguments(arguments) + ")");
  $.each(window.localStorage, function(a, b) {
    if ("data-html5" == a.substr(app.config.name.length + 1, 10)) {
      app.debug.deprecated("data-html5 functionality will be removed in future versions.");
      try {
        window.localStorage.removeItem(a.trim());
      } catch (c) {
        alert(c);
      }
    }
    if ("data-app" == a.substr(app.config.name.length + 1, 8)) {
      try {
        window.localStorage.removeItem(a.trim());
      } catch (c) {
        alert(c);
      }
    }
  });
  return !0;
}, pufferFormValues:function(a) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.pufferFormValues(" + app.debug.arguments(arguments) + ")");
  a.find("input[type\x3dtext], input[type\x3dpassword]").each(function(b, c) {
    plugin_HTML5Storage.functions.localStorage.set(plugin_HTML5Storage.functions.pufferedFormValuePrefix + a.attr("id") + "__" + $(c).attr("id"), $(c).val());
  });
}, getPufferedFormValue:function(a, b) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.getPufferedFormValue(" + app.debug.arguments(arguments) + ")");
  var c = "object" == typeof a ? a.attr("id") : a;
  return plugin_HTML5Storage.functions.localStorage.get(plugin_HTML5Storage.functions.pufferedFormValuePrefix + c + "__" + b);
}, restorePufferedFormValues:function(a) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.restorePufferedFormValues(" + app.debug.arguments(arguments) + ")");
  a.find("input[type\x3dtext]").each(function(b, c) {
    b = $(c).attr("id");
    b = plugin_HTML5Storage.functions.localStorage.getPufferedFormValue(a, b);
    $(c).val(b);
  });
}, clearPufferedFormValues:function() {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.clearPufferedFormValues(" + app.debug.arguments(arguments) + ")");
  var a;
  $.each(window.localStorage, function(b, c) {
    b.substring(0, app.config.name.length) == app.config.name && (a = b.substring(app.config.name.length + 1), a.substring(0, plugin_HTML5Storage.functions.pufferedFormValuePrefix.length) == plugin_HTML5Storage.functions.pufferedFormValuePrefix && window.localStorage.removeItem(b));
  });
}, removeItem:function(a) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.removeItem(" + app.debug.arguments(arguments) + ")");
  var b;
  if (-1 != a.indexOf("*")) {
    app.debug.debug("plugin_HTML5Storage.functions.localStorage.removeItem() - wildcard detected: *");
    var c = a.substring(0, a.indexOf("*"));
    $.each(window.localStorage, function(a, e) {
      b = a.substr(app.config.name.length + 1, c.length);
      app.debug.debug("plugin_HTML5Storage.functions.localStorage.removeItem() - " + b + " \x3d\x3d " + c);
      if (b == c) {
        app.debug.debug("plugin_HTML5Storage.functions.localStorage.removeItem() - case: " + b + " \x3d\x3d " + c);
        try {
          window.localStorage.removeItem(a.trim());
        } catch (f) {
          alert(f);
        }
      }
    });
  } else {
    window.localStorage.removeItem(app.config.name + "." + a);
  }
  return !0;
}, show:function() {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.show(" + app.debug.arguments(arguments) + ")");
  var a = "", b = 0;
  $.each(window.localStorage, function(c, d) {
    a = c.substring(0, app.config.name.length) == app.config.name ? a + (c + "\n" + plugin_HTML5Storage.getSpace(app.config.name.length + 1) + c.substring(app.config.name.length + 1) + " \x3d " + d + "\n") : a + (c + " \x3d " + d + "\n");
    b++;
  });
  return a;
}, log:function() {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.log(" + app.debug.arguments(arguments) + ")");
  $.each(window.localStorage, function(a, b) {
    a.substring(0, app.config.name.length) == app.config.name && app.debug.log(a.substring(app.config.name.length + 1) + " \x3d " + b);
  });
}, setObject:function(a, b) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.setObject(" + app.debug.arguments(arguments) + ")");
  $.each(b, function(c, d) {
    app.debug.debug("plugin_HTML5Storage.functions.localStorage.setObject() - element: " + c + " \x3d " + d);
    Array.isArray(b) ? c = plugin_HTML5Storage.type.array + c : $.isPlainObject(b) && (c = plugin_HTML5Storage.type.object + c);
    "object" === typeof d && null != d ? (app.debug.debug("plugin_HTML5Storage.functions.localStorage.setObject() - nested object"), plugin_HTML5Storage.functions.localStorage.setObject((a + "." + c).trim(), d)) : "function" === typeof d ? app.debug.debug("plugin_HTML5Storage.functions.localStorage.setObject() - function") : void 0 === d ? app.debug.debug("plugin_HTML5Storage.functions.localStorage.setObject() - undefined") : plugin_HTML5Storage.functions.localStorage.set((a + "." + c).trim(), d);
  });
  Array.isArray(b) && 0 === b.length ? plugin_HTML5Storage.functions.localStorage.set(a + "." + plugin_HTML5Storage.type.array, "") : $.isPlainObject(b) && 0 === Object.keys(b).length && plugin_HTML5Storage.functions.localStorage.set(a + "." + plugin_HTML5Storage.type.object, "");
  plugin_HTML5Storage.storage.objectStorage[a] = b;
  return !0;
}, getObject:function(a) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.getObject(" + app.debug.arguments(arguments) + ")");
  var b;
  if (void 0 !== (b = plugin_HTML5Storage.storage.objectStorage[a])) {
    return b;
  }
  b = {};
  $.each(window.localStorage, function(c, d) {
    app.debug.debug("plugin_HTML5Storage.functions.localStorage.getObject() - element: " + c + " \x3d " + d);
    d = c.substr(app.config.name.length + 1, a.length).trim();
    d == a.trim() && (app.debug.debug("plugin_HTML5Storage.functions.localStorage.getObject() - found part of object: " + d), d = c.substr(app.config.name.length + 1), app.debug.debug("plugin_HTML5Storage.functions.localStorage.getObject() - storage key: " + d), c = plugin_HTML5Storage.functions.localStorage.get(c.substr(app.config.name.length + 1)), app.debug.debug("plugin_HTML5Storage.functions.localStorage.getObject() - storage value: " + c), b = plugin_HTML5Storage.setDeepX(b, d, c));
  });
  return void 0 != b[a] ? (plugin_HTML5Storage.storage.objectStorage[a] = b[a], b[a]) : null;
}, removeObject:function(a) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.removeObject(" + app.debug.arguments(arguments) + ")");
  var b = !0;
  $.each(window.localStorage, function(c, d) {
    if (c.substr(app.config.name.length + 1, a.length) == a.trim()) {
      try {
        window.localStorage.removeItem(c.trim());
      } catch (e) {
        alert(e), b = !1;
      }
    }
  });
  return b;
}, getList:function(a) {
  app.debug.trace("plugin_HTML5Storage.functions.localStorage.getList(" + app.debug.arguments(arguments) + ")");
  var b = {};
  $.each(window.localStorage, function(c, d) {
    c.substr(app.config.name.length + 1, a.length) == a && (b[c.substr(app.config.name.length + 1)] = plugin_HTML5Storage.functions.localStorage.get(c.substr(app.config.name.length + 1)));
  });
  return b;
}}, sessionStorage:{set:function(a, b) {
  app.debug.trace("plugin_HTML5Storage.functions.sessionStorage.set(" + app.debug.arguments(arguments) + ")");
  window.sessionStorage.setItem(a, b);
}, get:function(a) {
  app.debug.trace("plugin_HTML5Storage.functions.sessionStorage.get(" + app.debug.arguments(arguments) + ")");
  window.sessionStorage.getItem(a);
}, clear:function() {
  window.sessionStorage.clear();
}, removeItem:function(a) {
  window.sessionStorage.removeItem(a);
}, show:function() {
}}, ss:this.sessionStorage}};
