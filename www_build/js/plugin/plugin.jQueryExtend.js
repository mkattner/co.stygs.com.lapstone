// Input 0
'use strict';
var plugin_jQueryExtend = {config:null, constructor:function() {
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, pluginsLoaded:function() {
  app.debug.trace(this.config.name + ".pluginsLoaded()");
  var a = $.Deferred();
  (function(a) {
    a.fn.attrs = function(d) {
      var b = a(this), f, e, g;
      if (d) {
        return b.each(function(b, c) {
          f = a(c);
          for (e in d) {
            f.attr(e, d[e]);
          }
        }), b;
      }
      var h = {};
      if (b = b.get(0)) {
        for (g in b = b.attributes, b) {
          var c = b[g];
          null != c && "undefined" !== typeof c.value && (h[c.nodeName] = c.value);
        }
      }
      return h;
    };
  })(jQuery);
  a.resolve();
  return a.promise();
}, pagesLoaded:function() {
  app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()");
  var a = $.Deferred();
  a.resolve();
  return a.promise();
}, definePluginEvents:function() {
}, afterHtmlInjectedBeforePageComputing:function(a) {
  app.debug.trace("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
}, pageSpecificEvents:function(a) {
  app.debug.trace("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
}, functions:{}};
