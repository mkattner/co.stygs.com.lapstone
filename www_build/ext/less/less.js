// Input 0
/*
 
 Less - Leaner CSS v2.5.3
 http://lesscss.org

 Copyright (c) 2009-2015, Alexis Sellier <self@cloudhead.net>
 Licensed under the  License.

*/
'use strict';
(function(B) {
  "object" === typeof exports && "undefined" !== typeof module ? module.exports = B() : "function" === typeof define && define.amd ? define([], B) : ("undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : this).less = B();
})(function() {
  return function f(c, g, l) {
    function d(a, k) {
      if (!g[a]) {
        if (!c[a]) {
          var e = "function" == typeof require && require;
          if (!k && e) {
            return e(a, !0);
          }
          if (b) {
            return b(a, !0);
          }
          k = Error("Cannot find module '" + a + "'");
          throw k.code = "MODULE_NOT_FOUND", k;
        }
        k = g[a] = {exports:{}};
        c[a][0].call(k.exports, function(b) {
          var e = c[a][1][b];
          return d(e ? e : b);
        }, k, k.exports, f, c, g, l);
      }
      return g[a].exports;
    }
    for (var b = "function" == typeof require && require, a = 0; a < l.length; a++) {
      d(l[a]);
    }
    return d;
  }({1:[function(c, g, l) {
    var f = c("./utils").addDataAttr, d = c("./browser");
    g.exports = function(b, a) {
      f(a, d.currentScript(b));
      void 0 === a.isFileProtocol && (a.isFileProtocol = /^(file|(chrome|safari)(-extension)?|resource|qrc|app):/.test(b.location.protocol));
      a.async = a.async || !1;
      a.fileAsync = a.fileAsync || !1;
      a.poll = a.poll || (a.isFileProtocol ? 1000 : 1500);
      a.env = a.env || ("127.0.0.1" == b.location.hostname || "0.0.0.0" == b.location.hostname || "localhost" == b.location.hostname || b.location.port && 0 < b.location.port.length || a.isFileProtocol ? "development" : "production");
      if (b = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(b.location.hash)) {
        a.dumpLineNumbers = b[1];
      }
      void 0 === a.useFileCache && (a.useFileCache = !0);
      void 0 === a.onReady && (a.onReady = !0);
    };
  }, {"./browser":3, "./utils":9}], 2:[function(c, g, l) {
    c("promise/polyfill.js");
    l = window.less || {};
    c("./add-default-options")(window, l);
    c = g.exports = c("./index")(window, l);
    window.less = c;
    l.onReady && (/!watch/.test(window.location.hash) && c.watch(), c.registerStylesheetsImmediately(), c.pageLoadFinished = c.refresh("development" === c.env));
  }, {"./add-default-options":1, "./index":7, "promise/polyfill.js":95}], 3:[function(c, g, l) {
    var f = c("./utils");
    g.exports = {createCSS:function(d, b, a) {
      var e = a.href || "", k = "less:" + (a.title || f.extractId(e));
      e = d.getElementById(k);
      var c = !1, p = d.createElement("style");
      p.setAttribute("type", "text/css");
      a.media && p.setAttribute("media", a.media);
      p.id = k;
      p.styleSheet || (p.appendChild(d.createTextNode(b)), c = null !== e && 0 < e.childNodes.length && 0 < p.childNodes.length && e.firstChild.nodeValue === p.firstChild.nodeValue);
      d = d.getElementsByTagName("head")[0];
      if (null === e || !1 === c) {
        (a = a && a.nextSibling || null) ? a.parentNode.insertBefore(p, a) : d.appendChild(p);
      }
      e && !1 === c && e.parentNode.removeChild(e);
      if (p.styleSheet) {
        try {
          p.styleSheet.cssText = b;
        } catch (q) {
          throw Error("Couldn't reassign styleSheet.cssText.");
        }
      }
    }, currentScript:function(d) {
      d = d.document;
      var b;
      (b = d.currentScript) || (d = d.getElementsByTagName("script"), b = d[d.length - 1]);
      return b;
    }};
  }, {"./utils":9}], 4:[function(c, g, l) {
    g.exports = function(c, d, b) {
      var a = null;
      if ("development" !== d.env) {
        try {
          a = "undefined" === typeof c.localStorage ? null : c.localStorage;
        } catch (e) {
        }
      }
      return {setCSS:function(e, d, c) {
        if (a) {
          b.info("saving " + e + " to cache.");
          try {
            a.setItem(e, c), a.setItem(e + ":timestamp", d);
          } catch (p) {
            b.error('failed to save "' + e + '" to local storage for caching.');
          }
        }
      }, getCSS:function(b, d) {
        var e = a && a.getItem(b);
        if ((b = a && a.getItem(b + ":timestamp")) && d.lastModified && (new Date(d.lastModified)).valueOf() === (new Date(b)).valueOf()) {
          return e;
        }
      }};
    };
  }, {}], 5:[function(c, g, l) {
    var f = c("./utils"), d = c("./browser");
    g.exports = function(b, a, e) {
      function k(a, k) {
        var h = "less-error-message:" + f.extractId(k || ""), q = b.document.createElement("div"), c, n = [];
        k = a.filename || k;
        var p = k.match(/([^\/]+(\?.*)?)$/)[1];
        q.id = h;
        q.className = "less-error-message";
        k = "\x3ch3\x3e" + (a.type || "Syntax") + "Error: " + (a.message || "There is an error in your .less file") + '\x3c/h3\x3e\x3cp\x3ein \x3ca href\x3d"' + k + '"\x3e' + p + "\x3c/a\x3e ";
        p = function(a, b, e) {
          void 0 !== a.extract[b] && n.push('\x3cli\x3e\x3clabel\x3e{line}\x3c/label\x3e\x3cpre class\x3d"{class}"\x3e{content}\x3c/pre\x3e\x3c/li\x3e'.replace(/\{line\}/, (parseInt(a.line, 10) || 0) + (b - 1)).replace(/\{class\}/, e).replace(/\{content\}/, a.extract[b]));
        };
        a.extract && (p(a, 0, ""), p(a, 1, "line"), p(a, 2, ""), k += "on line " + a.line + ", column " + (a.column + 1) + ":\x3c/p\x3e\x3cul\x3e" + n.join("") + "\x3c/ul\x3e");
        a.stack && (a.extract || 4 <= e.logLevel) && (k += "\x3cbr/\x3eStack Trace\x3c/br /\x3e" + a.stack.split("\n").slice(1).join("\x3cbr/\x3e"));
        q.innerHTML = k;
        d.createCSS(b.document, ".less-error-message ul, .less-error-message li {\nlist-style-type: none;\nmargin-right: 15px;\npadding: 4px 0;\nmargin: 0;\n}\n.less-error-message label {\nfont-size: 12px;\nmargin-right: 15px;\npadding: 4px 0;\ncolor: #cc7777;\n}\n.less-error-message pre {\ncolor: #dd6666;\npadding: 4px 0;\nmargin: 0;\ndisplay: inline-block;\n}\n.less-error-message pre.line {\ncolor: #ff0000;\n}\n.less-error-message h3 {\nfont-size: 20px;\nfont-weight: bold;\npadding: 15px 0 5px 0;\nmargin: 0;\n}\n.less-error-message a {\ncolor: #10a\n}\n.less-error-message .error {\ncolor: red;\nfont-weight: bold;\npadding-bottom: 2px;\nborder-bottom: 1px dashed red;\n}", 
        {title:"error-message"});
        q.style.cssText = "font-family: Arial, sans-serif;border: 1px solid #e00;background-color: #eee;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;color: #e00;padding: 15px;margin-bottom: 15px";
        "development" === e.env && (c = setInterval(function() {
          var a = b.document, e = a.body;
          e && (a.getElementById(h) ? e.replaceChild(q, a.getElementById(h)) : e.insertBefore(q, e.firstChild), clearInterval(c));
        }, 10));
      }
      function c(b, d) {
        var k = [];
        d = (b.type || "Syntax") + "Error: " + (b.message || "There is an error in your .less file") + " in " + (b.filename || d) + " ";
        var q = function(a, b, e) {
          void 0 !== a.extract[b] && k.push("{line} {content}".replace(/\{line\}/, (parseInt(a.line, 10) || 0) + (b - 1)).replace(/\{class\}/, e).replace(/\{content\}/, a.extract[b]));
        };
        b.extract && (q(b, 0, ""), q(b, 1, "line"), q(b, 2, ""), d += "on line " + b.line + ", column " + (b.column + 1) + ":\n" + k.join("\n"));
        b.stack && (b.extract || 4 <= e.logLevel) && (d += "\nStack Trace\n" + b.stack);
        a.logger.error(d);
      }
      return {add:function(a, b) {
        e.errorReporting && "html" !== e.errorReporting ? "console" === e.errorReporting ? c(a, b) : "function" === typeof e.errorReporting && e.errorReporting("add", a, b) : k(a, b);
      }, remove:function(a) {
        e.errorReporting && "html" !== e.errorReporting ? "console" !== e.errorReporting && "function" === typeof e.errorReporting && e.errorReporting("remove", a) : (a = b.document.getElementById("less-error-message:" + f.extractId(a))) && a.parentNode.removeChild(a);
      }};
    };
  }, {"./browser":3, "./utils":9}], 6:[function(c, g, l) {
    g.exports = function(f, d) {
      function b() {
        if (!window.XMLHttpRequest || "file:" === window.location.protocol && "ActiveXObject" in window) {
          try {
            return new ActiveXObject("Microsoft.XMLHTTP");
          } catch (n) {
            return d.error("browser doesn't support AJAX."), null;
          }
        } else {
          return new XMLHttpRequest;
        }
      }
      var a = c("../less/environment/abstract-file-manager.js"), e = {}, k = function() {
      };
      k.prototype = new a;
      k.prototype.alwaysMakePathsAbsolute = function() {
        return !0;
      };
      k.prototype.join = function(a, b) {
        return a ? this.extractUrlParts(b, a).path : b;
      };
      k.prototype.doXHR = function(a, e, k, h) {
        function q(b, e, d) {
          200 <= b.status && 300 > b.status ? e(b.responseText, b.getResponseHeader("Last-Modified")) : "function" === typeof d && d(b.status, a);
        }
        var c = b(), n = f.isFileProtocol ? f.fileAsync : f.async;
        "function" === typeof c.overrideMimeType && c.overrideMimeType("text/css");
        d.debug("XHR: Getting '" + a + "'");
        c.open("GET", a, n);
        c.setRequestHeader("Accept", e || "text/x-less, text/css; q\x3d0.9, */*; q\x3d0.5");
        c.send(null);
        f.isFileProtocol && !f.fileAsync ? 0 === c.status || 200 <= c.status && 300 > c.status ? k(c.responseText) : h(c.status, a) : n ? c.onreadystatechange = function() {
          4 == c.readyState && q(c, k, h);
        } : q(c, k, h);
      };
      k.prototype.supports = function(a, b, e, d) {
        return !0;
      };
      k.prototype.clearFileCache = function() {
        e = {};
      };
      k.prototype.loadFile = function(a, b, d, k, c) {
        b && !this.isPathAbsolute(a) && (a = b + a);
        d = d || {};
        var h = this.extractUrlParts(a, window.location.href).url;
        if (d.useFileCache && e[h]) {
          try {
            c(null, {contents:e[h], filename:h, webInfo:{lastModified:new Date}});
          } catch (t) {
            c({filename:h, message:"Error loading file " + h + " error was " + t.message});
          }
        } else {
          this.doXHR(h, d.mime, function(a, b) {
            e[h] = a;
            c(null, {contents:a, filename:h, webInfo:{lastModified:b}});
          }, function(a, b) {
            c({type:"File", message:"'" + b + "' wasn't found (" + a + ")", href:h});
          });
        }
      };
      return k;
    };
  }, {"../less/environment/abstract-file-manager.js":14}], 7:[function(c, g, l) {
    var f = c("./utils").addDataAttr, d = c("./browser");
    g.exports = function(b, a) {
      function e(a) {
        var b = {}, e;
        for (e in a) {
          a.hasOwnProperty(e) && (b[e] = a[e]);
        }
        return b;
      }
      function k(a, b) {
        var e = Array.prototype.slice.call(arguments, 2);
        return function() {
          var d = e.concat(Array.prototype.slice.call(arguments, 0));
          return a.apply(b, d);
        };
      }
      function n(b) {
        for (var d = u.getElementsByTagName("style"), h, c = 0; c < d.length; c++) {
          if (h = d[c], h.type.match(y)) {
            var q = e(a);
            q.modifyVars = b;
            var n = h.innerHTML || "";
            q.filename = u.location.href.replace(/#.*$/, "");
            r.render(n, q, k(function(a, b, e) {
              b ? m.add(b, "inline") : (a.type = "text/css", a.styleSheet ? a.styleSheet.cssText = e.css : a.innerHTML = e.css);
            }, null, h));
          }
        }
      }
      function p(b, d, k, h, c) {
        function q(e) {
          var c = e.contents, q = e.filename, p = e.webInfo;
          e = {currentDirectory:g.getPath(q), filename:q, rootFilename:q, relativeUrls:n.relativeUrls};
          e.entryPath = e.currentDirectory;
          e.rootpath = n.rootpath || e.currentDirectory;
          if (p && (p.remaining = h, !n.modifyVars)) {
            var f = w.getCSS(q, p);
            if (!k && f) {
              p.local = !0;
              d(null, f, c, b, p, q);
              return;
            }
          }
          m.remove(q);
          n.rootFileInfo = e;
          r.render(c, n, function(e, k) {
            e ? (e.href = q, d(e)) : (e = k.css, a.postProcessor && "function" === typeof a.postProcessor && (e = a.postProcessor.call(e, e) || e), k.css = e, n.modifyVars || w.setCSS(b.href, p.lastModified, k.css), d(null, k.css, c, b, p, q));
          });
        }
        var n = e(a);
        f(n, b);
        n.mime = b.type;
        c && (n.modifyVars = c);
        g.loadFile(b.href, null, n, t, function(a, b) {
          a ? d(a) : q(b);
        });
      }
      function q(a, b, e) {
        for (var d = 0; d < r.sheets.length; d++) {
          p(r.sheets[d], a, b, r.sheets.length - (d + 1), e);
        }
      }
      function h() {
        "development" === r.env && (r.watchTimer = setInterval(function() {
          r.watchMode && (g.clearFileCache(), q(function(a, e, k, h, c) {
            a ? m.add(a, a.href || h.href) : e && d.createCSS(b.document, e, h);
          }));
        }, a.poll));
      }
      var u = b.document, r = c("../less")();
      r.options = a;
      var t = r.environment, l = c("./file-manager")(a, r.logger), g = new l;
      t.addFileManager(g);
      r.FileManager = l;
      c("./log-listener")(r, a);
      var m = c("./error-reporting")(b, r, a), w = r.cache = a.cache || c("./cache")(b, a, r.logger);
      a.functions && r.functions.functionRegistry.addMultiple(a.functions);
      var y = /^text\/(x-)?less$/;
      r.watch = function() {
        r.watchMode || (r.env = "development", h());
        return this.watchMode = !0;
      };
      r.unwatch = function() {
        clearInterval(r.watchTimer);
        return this.watchMode = !1;
      };
      r.registerStylesheetsImmediately = function() {
        var a = u.getElementsByTagName("link");
        r.sheets = [];
        for (var b = 0; b < a.length; b++) {
          ("stylesheet/less" === a[b].rel || a[b].rel.match(/stylesheet/) && a[b].type.match(y)) && r.sheets.push(a[b]);
        }
      };
      r.registerStylesheets = function() {
        return new Promise(function(a, b) {
          r.registerStylesheetsImmediately();
          a();
        });
      };
      r.modifyVars = function(a) {
        return r.refresh(!0, a, !1);
      };
      r.refresh = function(a, e, k) {
        (a || k) && !1 !== k && g.clearFileCache();
        return new Promise(function(k, h) {
          var c, p;
          var f = c = new Date;
          q(function(a, e, q, n, w) {
            a ? (m.add(a, a.href || n.href), h(a)) : (w.local ? r.logger.info("loading " + n.href + " from cache.") : r.logger.info("rendered " + n.href + " successfully."), d.createCSS(b.document, e, n), r.logger.info("css for " + n.href + " generated in " + (new Date - c) + "ms"), 0 === w.remaining && (p = new Date - f, r.logger.info("less has finished. css generated in " + p + "ms"), k({startTime:f, endTime:c, totalMilliseconds:p, sheets:r.sheets.length})), c = new Date);
          }, a, e);
          n(e);
        });
      };
      r.refreshStyles = n;
      return r;
    };
  }, {"../less":30, "./browser":3, "./cache":4, "./error-reporting":5, "./file-manager":6, "./log-listener":8, "./utils":9}], 8:[function(c, g, l) {
    g.exports = function(c, d) {
      d.logLevel = "undefined" !== typeof d.logLevel ? d.logLevel : "development" === d.env ? 3 : 1;
      d.loggers || (d.loggers = [{debug:function(a) {
        4 <= d.logLevel && console.log(a);
      }, info:function(a) {
        3 <= d.logLevel && console.log(a);
      }, warn:function(a) {
        2 <= d.logLevel && console.warn(a);
      }, error:function(a) {
        1 <= d.logLevel && console.error(a);
      }}]);
      for (var b = 0; b < d.loggers.length; b++) {
        c.logger.addListener(d.loggers[b]);
      }
    };
  }, {}], 9:[function(c, g, l) {
    g.exports = {extractId:function(c) {
      return c.replace(/^[a-z-]+:\/+?[^\/]+/, "").replace(/[\?&]livereload=\w+/, "").replace(/^\//, "").replace(/\.[a-zA-Z]+$/, "").replace(/[^\.\w-]+/g, "-").replace(/\./g, ":");
    }, addDataAttr:function(c, d) {
      for (var b in d.dataset) {
        if (d.dataset.hasOwnProperty(b)) {
          if ("env" === b || "dumpLineNumbers" === b || "rootpath" === b || "errorReporting" === b) {
            c[b] = d.dataset[b];
          } else {
            try {
              c[b] = JSON.parse(d.dataset[b]);
            } catch (a) {
            }
          }
        }
      }
    }};
  }, {}], 10:[function(c, g, l) {
    c = {};
    g.exports = c;
    var f = function(a, b, d) {
      if (a) {
        for (var e = 0; e < d.length; e++) {
          a.hasOwnProperty(d[e]) && (b[d[e]] = a[d[e]]);
        }
      }
    }, d = "paths relativeUrls rootpath strictImports insecure dumpLineNumbers compress syncImport chunkInput mime useFileCache processImports reference pluginManager".split(" ");
    c.Parse = function(a) {
      f(a, this, d);
      "string" === typeof this.paths && (this.paths = [this.paths]);
    };
    var b = "paths compress ieCompat strictMath strictUnits sourceMap importMultiple urlArgs javascriptEnabled pluginManager importantScope".split(" ");
    c.Eval = function(a, e) {
      f(a, this, b);
      "string" === typeof this.paths && (this.paths = [this.paths]);
      this.frames = e || [];
      this.importantScope = this.importantScope || [];
    };
    c.Eval.prototype.inParenthesis = function() {
      this.parensStack || (this.parensStack = []);
      this.parensStack.push(!0);
    };
    c.Eval.prototype.outOfParenthesis = function() {
      this.parensStack.pop();
    };
    c.Eval.prototype.isMathOn = function() {
      return this.strictMath ? this.parensStack && this.parensStack.length : !0;
    };
    c.Eval.prototype.isPathRelative = function(a) {
      return !/^(?:[a-z-]+:|\/|#)/i.test(a);
    };
    c.Eval.prototype.normalizePath = function(a) {
      var b = a.split("/").reverse();
      for (a = []; 0 !== b.length;) {
        var d = b.pop();
        switch(d) {
          case ".":
            break;
          case "..":
            0 === a.length || ".." === a[a.length - 1] ? a.push(d) : a.pop();
            break;
          default:
            a.push(d);
        }
      }
      return a.join("/");
    };
  }, {}], 11:[function(c, g, l) {
    g.exports = {aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", darkgray:"#a9a9a9", 
    darkgrey:"#a9a9a9", darkgreen:"#006400", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", forestgreen:"#228b22", 
    fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", grey:"#808080", green:"#008000", greenyellow:"#adff2f", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", lightgrey:"#d3d3d3", 
    lightgreen:"#90ee90", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370d8", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", mediumturquoise:"#48d1cc", 
    mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#d87093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", purple:"#800080", rebeccapurple:"#663399", 
    red:"#ff0000", rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", 
    yellow:"#ffff00", yellowgreen:"#9acd32"};
  }, {}], 12:[function(c, g, l) {
    g.exports = {colors:c("./colors"), unitConversions:c("./unit-conversions")};
  }, {"./colors":11, "./unit-conversions":13}], 13:[function(c, g, l) {
    g.exports = {length:{m:1, cm:0.01, mm:0.001, "in":0.0254, px:0.0254 / 96, pt:0.0254 / 72, pc:0.0254 / 72 * 12}, duration:{s:1, ms:0.001}, angle:{rad:1 / (2 * Math.PI), deg:1 / 360, grad:.0025, turn:1}};
  }, {}], 14:[function(c, g, l) {
    c = function() {
    };
    c.prototype.getPath = function(c) {
      var d = c.lastIndexOf("?");
      0 < d && (c = c.slice(0, d));
      d = c.lastIndexOf("/");
      0 > d && (d = c.lastIndexOf("\\"));
      return 0 > d ? "" : c.slice(0, d + 1);
    };
    c.prototype.tryAppendExtension = function(c, d) {
      return /(\.[a-z]*$)|([\?;].*)$/.test(c) ? c : c + d;
    };
    c.prototype.tryAppendLessExtension = function(c) {
      return this.tryAppendExtension(c, ".less");
    };
    c.prototype.supportsSync = function() {
      return !1;
    };
    c.prototype.alwaysMakePathsAbsolute = function() {
      return !1;
    };
    c.prototype.isPathAbsolute = function(c) {
      return /^(?:[a-z-]+:|\/|\\|#)/i.test(c);
    };
    c.prototype.join = function(c, d) {
      return c ? c + d : d;
    };
    c.prototype.pathDiff = function(c, d) {
      c = this.extractUrlParts(c);
      var b = this.extractUrlParts(d), a = "";
      if (c.hostPart !== b.hostPart) {
        return "";
      }
      var e = Math.max(b.directories.length, c.directories.length);
      for (d = 0; d < e && b.directories[d] === c.directories[d]; d++) {
      }
      b = b.directories.slice(d);
      c = c.directories.slice(d);
      for (d = 0; d < b.length - 1; d++) {
        a += "../";
      }
      for (d = 0; d < c.length - 1; d++) {
        a += c[d] + "/";
      }
      return a;
    };
    c.prototype.extractUrlParts = function(c, d) {
      var b = /^((?:[a-z-]+:)?\/+?(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i, a = c.match(b), e = {}, k = [];
      if (!a) {
        throw Error("Could not parse sheet href - '" + c + "'");
      }
      if (d && (!a[1] || a[2])) {
        c = d.match(b);
        if (!c) {
          throw Error("Could not parse page url - '" + d + "'");
        }
        a[1] = a[1] || c[1] || "";
        a[2] || (a[3] = c[3] + a[3]);
      }
      if (a[3]) {
        k = a[3].replace(/\\/g, "/").split("/");
        for (d = 0; d < k.length; d++) {
          "." === k[d] && (k.splice(d, 1), --d);
        }
        for (d = 0; d < k.length; d++) {
          ".." === k[d] && 0 < d && (k.splice(d - 1, 2), d -= 2);
        }
      }
      e.hostPart = a[1];
      e.directories = k;
      e.path = (a[1] || "") + k.join("/");
      e.fileUrl = e.path + (a[4] || "");
      e.url = e.fileUrl + (a[5] || "");
      return e;
    };
    g.exports = c;
  }, {}], 15:[function(c, g, l) {
    var f = c("../logger");
    c = function(d, b) {
      this.fileManagers = b || [];
      d = d || {};
      b = [];
      for (var a = b.concat(["encodeBase64", "mimeLookup", "charsetLookup", "getSourceMapGenerator"]), e = 0; e < a.length; e++) {
        var c = a[e], n = d[c];
        n ? this[c] = n.bind(d) : e < b.length && this.warn("missing required function in environment - " + c);
      }
    };
    c.prototype.getFileManager = function(d, b, a, e, c) {
      d || f.warn("getFileManager called with no filename.. Please report this issue. continuing.");
      null == b && f.warn("getFileManager called with null directory.. Please report this issue. continuing.");
      var k = this.fileManagers;
      a.pluginManager && (k = [].concat(k).concat(a.pluginManager.getFileManagers()));
      for (var p = k.length - 1; 0 <= p; p--) {
        var q = k[p];
        if (q[c ? "supportsSync" : "supports"](d, b, a, e)) {
          return q;
        }
      }
      return null;
    };
    c.prototype.addFileManager = function(d) {
      this.fileManagers.push(d);
    };
    c.prototype.clearFileManagers = function() {
      this.fileManagers = [];
    };
    g.exports = c;
  }, {"../logger":32}], 16:[function(c, g, l) {
    function f(a, b, c) {
      var e = b.alpha, k = c.alpha, h = [];
      var n = k + e * (1 - k);
      for (var f = 0; 3 > f; f++) {
        var t = b.rgb[f] / 255;
        var g = c.rgb[f] / 255;
        var l = a(t, g);
        n && (l = (k * g + e * (t - k * (t + g - l))) / n);
        h[f] = 255 * l;
      }
      return new d(h, n);
    }
    var d = c("../tree/color");
    c = c("./function-registry");
    var b = {multiply:function(a, b) {
      return a * b;
    }, screen:function(a, b) {
      return a + b - a * b;
    }, overlay:function(a, d) {
      a *= 2;
      return 1 >= a ? b.multiply(a, d) : b.screen(a - 1, d);
    }, softlight:function(a, b) {
      var e = 1, d = a;
      0.5 < b && (d = 1, e = 0.25 < a ? Math.sqrt(a) : ((16 * a - 12) * a + 4) * a);
      return a - (1 - 2 * b) * d * (e - a);
    }, hardlight:function(a, d) {
      return b.overlay(d, a);
    }, difference:function(a, b) {
      return Math.abs(a - b);
    }, exclusion:function(a, b) {
      return a + b - 2 * a * b;
    }, average:function(a, b) {
      return (a + b) / 2;
    }, negation:function(a, b) {
      return 1 - Math.abs(a + b - 1);
    }}, a;
    for (a in b) {
      b.hasOwnProperty(a) && (f[a] = f.bind(null, b[a]));
    }
    c.addMultiple(f);
  }, {"../tree/color":49, "./function-registry":21}], 17:[function(c, g, l) {
    function f(a) {
      return Math.min(1, Math.max(0, a));
    }
    function d(a) {
      return p.hsla(a.h, a.s, a.l, a.a);
    }
    function b(b) {
      if (b instanceof a) {
        return parseFloat(b.unit.is("%") ? b.value / 100 : b.value);
      }
      if ("number" === typeof b) {
        return b;
      }
      throw {type:"Argument", message:"color functions take numbers as parameters"};
    }
    var a = c("../tree/dimension"), e = c("../tree/color"), k = c("../tree/quoted"), n = c("../tree/anonymous");
    c = c("./function-registry");
    var p = {rgb:function(a, b, e) {
      return p.rgba(a, b, e, 1.0);
    }, rgba:function(d, c, k, n) {
      d = [d, c, k].map(function(e) {
        e = e instanceof a && e.unit.is("%") ? parseFloat(255 * e.value / 100) : b(e);
        return e;
      });
      n = b(n);
      return new e(d, n);
    }, hsl:function(a, b, e) {
      return p.hsla(a, b, e, 1.0);
    }, hsla:function(a, e, d, c) {
      function k(a) {
        a = 0 > a ? a + 1 : 1 < a ? a - 1 : a;
        return 1 > 6 * a ? q + (h - q) * a * 6 : 1 > 2 * a ? h : 2 > 3 * a ? q + (h - q) * (2 / 3 - a) * 6 : q;
      }
      a = b(a) % 360 / 360;
      e = f(b(e));
      d = f(b(d));
      c = f(b(c));
      var h = 0.5 >= d ? d * (e + 1) : d + e - d * e, q = 2 * d - h;
      return p.rgba(255 * k(a + 1 / 3), 255 * k(a), 255 * k(a - 1 / 3), c);
    }, hsv:function(a, b, e) {
      return p.hsva(a, b, e, 1.0);
    }, hsva:function(a, e, d, c) {
      a = b(a) % 360 / 360 * 360;
      e = b(e);
      d = b(d);
      c = b(c);
      var k = Math.floor(a / 60 % 6);
      a = a / 60 - k;
      e = [d, d * (1 - e), d * (1 - a * e), d * (1 - (1 - a) * e)];
      d = [[0, 3, 1], [2, 0, 1], [1, 0, 3], [1, 2, 0], [3, 1, 0], [0, 1, 2]];
      return p.rgba(255 * e[d[k][0]], 255 * e[d[k][1]], 255 * e[d[k][2]], c);
    }, hue:function(b) {
      return new a(b.toHSL().h);
    }, saturation:function(b) {
      return new a(100 * b.toHSL().s, "%");
    }, lightness:function(b) {
      return new a(100 * b.toHSL().l, "%");
    }, hsvhue:function(b) {
      return new a(b.toHSV().h);
    }, hsvsaturation:function(b) {
      return new a(100 * b.toHSV().s, "%");
    }, hsvvalue:function(b) {
      return new a(100 * b.toHSV().v, "%");
    }, red:function(b) {
      return new a(b.rgb[0]);
    }, green:function(b) {
      return new a(b.rgb[1]);
    }, blue:function(b) {
      return new a(b.rgb[2]);
    }, alpha:function(b) {
      return new a(b.toHSL().a);
    }, luma:function(b) {
      return new a(b.luma() * b.alpha * 100, "%");
    }, luminance:function(b) {
      return new a((0.2126 * b.rgb[0] / 255 + 0.7152 * b.rgb[1] / 255 + 0.0722 * b.rgb[2] / 255) * b.alpha * 100, "%");
    }, saturate:function(a, b, e) {
      if (!a.rgb) {
        return null;
      }
      a = a.toHSL();
      a.s = "undefined" !== typeof e && "relative" === e.value ? a.s + a.s * b.value / 100 : a.s + b.value / 100;
      a.s = f(a.s);
      return d(a);
    }, desaturate:function(a, b, e) {
      a = a.toHSL();
      a.s = "undefined" !== typeof e && "relative" === e.value ? a.s - a.s * b.value / 100 : a.s - b.value / 100;
      a.s = f(a.s);
      return d(a);
    }, lighten:function(a, b, e) {
      a = a.toHSL();
      a.l = "undefined" !== typeof e && "relative" === e.value ? a.l + a.l * b.value / 100 : a.l + b.value / 100;
      a.l = f(a.l);
      return d(a);
    }, darken:function(a, b, e) {
      a = a.toHSL();
      a.l = "undefined" !== typeof e && "relative" === e.value ? a.l - a.l * b.value / 100 : a.l - b.value / 100;
      a.l = f(a.l);
      return d(a);
    }, fadein:function(a, b, e) {
      a = a.toHSL();
      a.a = "undefined" !== typeof e && "relative" === e.value ? a.a + a.a * b.value / 100 : a.a + b.value / 100;
      a.a = f(a.a);
      return d(a);
    }, fadeout:function(a, b, e) {
      a = a.toHSL();
      a.a = "undefined" !== typeof e && "relative" === e.value ? a.a - a.a * b.value / 100 : a.a - b.value / 100;
      a.a = f(a.a);
      return d(a);
    }, fade:function(a, b) {
      a = a.toHSL();
      a.a = b.value / 100;
      a.a = f(a.a);
      return d(a);
    }, spin:function(a, b) {
      a = a.toHSL();
      b = (a.h + b.value) % 360;
      a.h = 0 > b ? 360 + b : b;
      return d(a);
    }, mix:function(b, d, c) {
      b.toHSL && d.toHSL || (console.log(d.type), console.dir(d));
      c || (c = new a(50));
      c = c.value / 100.0;
      var k = 2 * c - 1, h = b.toHSL().a - d.toHSL().a;
      k = ((-1 == k * h ? k : (k + h) / (1 + k * h)) + 1) / 2.0;
      h = 1 - k;
      return new e([b.rgb[0] * k + d.rgb[0] * h, b.rgb[1] * k + d.rgb[1] * h, b.rgb[2] * k + d.rgb[2] * h], b.alpha * c + d.alpha * (1 - c));
    }, greyscale:function(b) {
      return p.desaturate(b, new a(100));
    }, contrast:function(a, e, d, c) {
      if (!a.rgb) {
        return null;
      }
      "undefined" === typeof d && (d = p.rgba(255, 255, 255, 1.0));
      "undefined" === typeof e && (e = p.rgba(0, 0, 0, 1.0));
      if (e.luma() > d.luma()) {
        var k = d;
        d = e;
        e = k;
      }
      c = "undefined" === typeof c ? 0.43 : b(c);
      return a.luma() < c ? d : e;
    }, argb:function(a) {
      return new n(a.toARGB());
    }, color:function(a) {
      if (a instanceof k && /^#([a-f0-9]{6}|[a-f0-9]{3})$/i.test(a.value)) {
        return new e(a.value.slice(1));
      }
      if (a instanceof e || (a = e.fromKeyword(a.value))) {
        return a.value = void 0, a;
      }
      throw {type:"Argument", message:"argument must be a color keyword or 3/6 digit hex e.g. #FFF"};
    }, tint:function(a, b) {
      return p.mix(p.rgb(255, 255, 255), a, b);
    }, shade:function(a, b) {
      return p.mix(p.rgb(0, 0, 0), a, b);
    }};
    c.addMultiple(p);
  }, {"../tree/anonymous":45, "../tree/color":49, "../tree/dimension":55, "../tree/quoted":72, "./function-registry":21}], 18:[function(c, g, l) {
    g.exports = function(f) {
      var d = c("../tree/quoted"), b = c("../tree/url"), a = c("./function-registry"), e = function(a, e) {
        return (new b(e, a.index, a.currentFileInfo)).eval(a.context);
      }, k = c("../logger");
      a.add("data-uri", function(a, c) {
        c || (c = a, a = null);
        var n = a && a.value, h = c.value, p = this.currentFileInfo, r = p.relativeUrls ? p.currentDirectory : p.entryPath, t = h.indexOf("#");
        p = "";
        -1 !== t && (p = h.slice(t), h = h.slice(0, t));
        var g = f.getFileManager(h, r, this.context, f, !0);
        if (!g) {
          return e(this, c);
        }
        a ? t = /;base64$/.test(n) : (n = f.mimeLookup(h), "image/svg+xml" === n ? t = !1 : (t = f.charsetLookup(n), t = 0 > ["US-ASCII", "UTF-8"].indexOf(t)), t && (n += ";base64"));
        r = g.loadFileSync(h, r, this.context, f);
        if (!r.contents) {
          return k.warn("Skipped data-uri embedding of " + h + " because file not found"), e(this, c || a);
        }
        r = r.contents;
        if (t && !f.encodeBase64) {
          return e(this, c);
        }
        r = t ? f.encodeBase64(r) : encodeURIComponent(r);
        n = "data:" + n + "," + r + p;
        return 32768 <= n.length && !1 !== this.context.ieCompat ? (k.warn("Skipped data-uri embedding of " + h + " because its size (" + n.length + " characters) exceeds IE8-safe 32768 characters!"), e(this, c || a)) : new b(new d('"' + n + '"', n, !1, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
      });
    };
  }, {"../logger":32, "../tree/quoted":72, "../tree/url":79, "./function-registry":21}], 19:[function(c, g, l) {
    var f = c("../tree/keyword");
    l = {eval:function() {
      var d = this.value_, b = this.error_;
      if (b) {
        throw b;
      }
      if (null != d) {
        return d ? f.True : f.False;
      }
    }, value:function(d) {
      this.value_ = d;
    }, error:function(d) {
      this.error_ = d;
    }, reset:function() {
      this.value_ = this.error_ = null;
    }};
    c("./function-registry").add("default", l.eval.bind(l));
    g.exports = l;
  }, {"../tree/keyword":64, "./function-registry":21}], 20:[function(c, g, l) {
    var f = c("../tree/expression");
    c = function(d, b, a, e) {
      this.name = d.toLowerCase();
      this.index = a;
      this.context = b;
      this.currentFileInfo = e;
      this.func = b.frames[0].functionRegistry.get(this.name);
    };
    c.prototype.isValid = function() {
      return !!this.func;
    };
    c.prototype.call = function(d) {
      Array.isArray(d) && (d = d.filter(function(b) {
        return "Comment" === b.type ? !1 : !0;
      }).map(function(b) {
        return "Expression" === b.type ? (b = b.value.filter(function(a) {
          return "Comment" === a.type ? !1 : !0;
        }), 1 === b.length ? b[0] : new f(b)) : b;
      }));
      return this.func.apply(this, d);
    };
    g.exports = c;
  }, {"../tree/expression":58}], 21:[function(c, g, l) {
    function f(d) {
      return {_data:{}, add:function(b, a) {
        b = b.toLowerCase();
        this._data.hasOwnProperty(b);
        this._data[b] = a;
      }, addMultiple:function(b) {
        Object.keys(b).forEach(function(a) {
          this.add(a, b[a]);
        }.bind(this));
      }, get:function(b) {
        return this._data[b] || d && d.get(b);
      }, inherit:function() {
        return f(this);
      }};
    }
    g.exports = f(null);
  }, {}], 22:[function(c, g, l) {
    g.exports = function(f) {
      var d = {functionRegistry:c("./function-registry"), functionCaller:c("./function-caller")};
      c("./default");
      c("./color");
      c("./color-blending");
      c("./data-uri")(f);
      c("./math");
      c("./number");
      c("./string");
      c("./svg")(f);
      c("./types");
      return d;
    };
  }, {"./color":17, "./color-blending":16, "./data-uri":18, "./default":19, "./function-caller":20, "./function-registry":21, "./math":24, "./number":25, "./string":26, "./svg":27, "./types":28}], 23:[function(c, g, l) {
    var f = c("../tree/dimension");
    c = function() {
    };
    c._math = function(d, b, a) {
      if (!(a instanceof f)) {
        throw {type:"Argument", message:"argument must be a number"};
      }
      null == b ? b = a.unit : a = a.unify();
      return new f(d(parseFloat(a.value)), b);
    };
    g.exports = c;
  }, {"../tree/dimension":55}], 24:[function(c, g, l) {
    g = c("./function-registry");
    var f = c("./math-helper.js");
    c = {ceil:null, floor:null, sqrt:null, abs:null, tan:"", sin:"", cos:"", atan:"rad", asin:"rad", acos:"rad"};
    for (var d in c) {
      c.hasOwnProperty(d) && (c[d] = f._math.bind(null, Math[d], c[d]));
    }
    c.round = function(b, a) {
      var e = "undefined" === typeof a ? 0 : a.value;
      return f._math(function(a) {
        return a.toFixed(e);
      }, null, b);
    };
    g.addMultiple(c);
  }, {"./function-registry":21, "./math-helper.js":23}], 25:[function(c, g, l) {
    var f = c("../tree/dimension"), d = c("../tree/anonymous");
    g = c("./function-registry");
    var b = c("./math-helper.js"), a = function(a, b) {
      b = Array.prototype.slice.call(b);
      switch(b.length) {
        case 0:
          throw {type:"Argument", message:"one or more arguments required"};
      }
      var e, c = [], k = {};
      for (e = 0; e < b.length; e++) {
        var h = b[e];
        if (h instanceof f) {
          var u = "" === h.unit.toString() && void 0 !== g ? (new f(h.value, g)).unify() : h.unify();
          var r = "" === u.unit.toString() && void 0 !== t ? t : u.unit.toString();
          var t = "" !== r && void 0 === t || "" !== r && "" === c[0].unify().unit.toString() ? r : t;
          var g = "" !== r && void 0 === g ? h.unit.toString() : g;
          var l = void 0 !== k[""] && "" !== r && r === t ? k[""] : k[r];
          if (void 0 === l) {
            if (void 0 !== t && r !== t) {
              throw {type:"Argument", message:"incompatible types"};
            }
            k[r] = c.length;
            c.push(h);
          } else {
            if (r = "" === c[l].unit.toString() && void 0 !== g ? (new f(c[l].value, g)).unify() : c[l].unify(), a && u.value < r.value || !a && u.value > r.value) {
              c[l] = h;
            }
          }
        } else {
          Array.isArray(b[e].value) && Array.prototype.push.apply(b, Array.prototype.slice.call(b[e].value));
        }
      }
      if (1 == c.length) {
        return c[0];
      }
      b = c.map(function(a) {
        return a.toCSS(this.context);
      }).join(this.context.compress ? "," : ", ");
      return new d((a ? "min" : "max") + "(" + b + ")");
    };
    g.addMultiple({min:function() {
      return a(!0, arguments);
    }, max:function() {
      return a(!1, arguments);
    }, convert:function(a, b) {
      return a.convertTo(b.value);
    }, pi:function() {
      return new f(Math.PI);
    }, mod:function(a, b) {
      return new f(a.value % b.value, a.unit);
    }, pow:function(a, b) {
      if ("number" === typeof a && "number" === typeof b) {
        a = new f(a), b = new f(b);
      } else {
        if (!(a instanceof f && b instanceof f)) {
          throw {type:"Argument", message:"arguments must be numbers"};
        }
      }
      return new f(Math.pow(a.value, b.value), a.unit);
    }, percentage:function(a) {
      return b._math(function(a) {
        return 100 * a;
      }, "%", a);
    }});
  }, {"../tree/anonymous":45, "../tree/dimension":55, "./function-registry":21, "./math-helper.js":23}], 26:[function(c, g, l) {
    var f = c("../tree/quoted"), d = c("../tree/anonymous"), b = c("../tree/javascript");
    c("./function-registry").addMultiple({e:function(a) {
      return new d(a instanceof b ? a.evaluated : a.value);
    }, escape:function(a) {
      return new d(encodeURI(a.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B").replace(/\(/g, "%28").replace(/\)/g, "%29"));
    }, replace:function(a, b, d, c) {
      var e = a.value;
      d = "Quoted" === d.type ? d.value : d.toCSS();
      e = e.replace(new RegExp(b.value, c ? c.value : ""), d);
      return new f(a.quote || "", e, a.escaped);
    }, "%":function(a) {
      for (var b = Array.prototype.slice.call(arguments, 1), d = a.value, c = 0; c < b.length; c++) {
        d = d.replace(/%[sda]/i, function(a) {
          var e = "Quoted" === b[c].type && a.match(/s/i) ? b[c].value : b[c].toCSS();
          return a.match(/[A-Z]$/) ? encodeURIComponent(e) : e;
        });
      }
      d = d.replace(/%%/g, "%");
      return new f(a.quote || "", d, a.escaped);
    }});
  }, {"../tree/anonymous":45, "../tree/javascript":62, "../tree/quoted":72, "./function-registry":21}], 27:[function(c, g, l) {
    g.exports = function(f) {
      var d = c("../tree/dimension"), b = c("../tree/color"), a = c("../tree/expression"), e = c("../tree/quoted"), k = c("../tree/url");
      c("./function-registry").add("svg-gradient", function(c) {
        function n() {
          throw {type:"Argument", message:"svg-gradient expects direction, start_color [start_position], [color position,]..., end_color [end_position] or direction, color list"};
        }
        var f = "linear", h = 'x\x3d"0" y\x3d"0" width\x3d"1" height\x3d"1"', u = {compress:!1};
        var r = c.toCSS(u);
        var t;
        if (2 == arguments.length) {
          2 > arguments[1].value.length && n();
          var g = arguments[1].value;
        } else {
          3 > arguments.length ? n() : g = Array.prototype.slice.call(arguments, 1);
        }
        switch(r) {
          case "to bottom":
            r = 'x1\x3d"0%" y1\x3d"0%" x2\x3d"0%" y2\x3d"100%"';
            break;
          case "to right":
            r = 'x1\x3d"0%" y1\x3d"0%" x2\x3d"100%" y2\x3d"0%"';
            break;
          case "to bottom right":
            r = 'x1\x3d"0%" y1\x3d"0%" x2\x3d"100%" y2\x3d"100%"';
            break;
          case "to top right":
            r = 'x1\x3d"0%" y1\x3d"100%" x2\x3d"100%" y2\x3d"0%"';
            break;
          case "ellipse":
          case "ellipse at center":
            f = "radial";
            r = 'cx\x3d"50%" cy\x3d"50%" r\x3d"75%"';
            h = 'x\x3d"-50" y\x3d"-50" width\x3d"101" height\x3d"101"';
            break;
          default:
            throw {type:"Argument", message:"svg-gradient direction must be 'to bottom', 'to right', 'to bottom right', 'to top right' or 'ellipse at center'"};
        }
        r = '\x3c?xml version\x3d"1.0" ?\x3e\x3csvg xmlns\x3d"http://www.w3.org/2000/svg" version\x3d"1.1" width\x3d"100%" height\x3d"100%" viewBox\x3d"0 0 1 1" preserveAspectRatio\x3d"none"\x3e\x3c' + f + 'Gradient id\x3d"gradient" gradientUnits\x3d"userSpaceOnUse" ' + r + "\x3e";
        for (t = 0; t < g.length; t += 1) {
          if (g[t] instanceof a) {
            var l = g[t].value[0];
            var m = g[t].value[1];
          } else {
            l = g[t], m = void 0;
          }
          l instanceof b && ((0 === t || t + 1 === g.length) && void 0 === m || m instanceof d) || n();
          m = m ? m.toCSS(u) : 0 === t ? "0%" : "100%";
          var w = l.alpha;
          r += '\x3cstop offset\x3d"' + m + '" stop-color\x3d"' + l.toRGB() + '"' + (1 > w ? ' stop-opacity\x3d"' + w + '"' : "") + "/\x3e";
        }
        r = encodeURIComponent(r + ("\x3c/" + f + "Gradient\x3e\x3crect " + h + ' fill\x3d"url(#gradient)" /\x3e\x3c/svg\x3e'));
        r = "data:image/svg+xml," + r;
        return new k(new e("'" + r + "'", r, !1, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
      });
    };
  }, {"../tree/color":49, "../tree/dimension":55, "../tree/expression":58, "../tree/quoted":72, "../tree/url":79, "./function-registry":21}], 28:[function(c, g, l) {
    var f = c("../tree/keyword"), d = c("../tree/detached-ruleset"), b = c("../tree/dimension"), a = c("../tree/color"), e = c("../tree/quoted"), k = c("../tree/anonymous"), n = c("../tree/url"), p = c("../tree/operation"), q = function(a, b) {
      return a instanceof b ? f.True : f.False;
    }, h = function(a, e) {
      if (void 0 === e) {
        throw {type:"Argument", message:"missing the required second argument to isunit."};
      }
      e = "string" === typeof e.value ? e.value : e;
      if ("string" !== typeof e) {
        throw {type:"Argument", message:"Second argument to isunit should be a unit or a string."};
      }
      return a instanceof b && a.unit.is(e) ? f.True : f.False;
    }, u = function(a) {
      return Array.isArray(a.value) ? a.value : Array(a);
    };
    c("./function-registry").addMultiple({isruleset:function(a) {
      return q(a, d);
    }, iscolor:function(b) {
      return q(b, a);
    }, isnumber:function(a) {
      return q(a, b);
    }, isstring:function(a) {
      return q(a, e);
    }, iskeyword:function(a) {
      return q(a, f);
    }, isurl:function(a) {
      return q(a, n);
    }, ispixel:function(a) {
      return h(a, "px");
    }, ispercentage:function(a) {
      return h(a, "%");
    }, isem:function(a) {
      return h(a, "em");
    }, isunit:h, unit:function(a, e) {
      if (!(a instanceof b)) {
        throw {type:"Argument", message:"the first argument to unit must be a number" + (a instanceof p ? ". Have you forgotten parenthesis?" : "")};
      }
      e = e ? e instanceof f ? e.value : e.toCSS() : "";
      return new b(a.value, e);
    }, "get-unit":function(a) {
      return new k(a.unit);
    }, extract:function(a, b) {
      b = b.value - 1;
      return u(a)[b];
    }, length:function(a) {
      return new b(u(a).length);
    }});
  }, {"../tree/anonymous":45, "../tree/color":49, "../tree/detached-ruleset":54, "../tree/dimension":55, "../tree/keyword":64, "../tree/operation":70, "../tree/quoted":72, "../tree/url":79, "./function-registry":21}], 29:[function(c, g, l) {
    var f = c("./contexts"), d = c("./parser/parser"), b = c("./plugins/function-importer");
    g.exports = function(a) {
      var e = function(a, b) {
        this.rootFilename = b.filename;
        this.paths = a.paths || [];
        this.contents = {};
        this.contentsIgnoredChars = {};
        this.mime = a.mime;
        this.error = null;
        this.context = a;
        this.queue = [];
        this.files = {};
      };
      e.prototype.push = function(e, c, p, q, h) {
        var k = this;
        this.queue.push(e);
        var n = function(a, b, d) {
          k.queue.splice(k.queue.indexOf(e), 1);
          var c = d === k.rootFilename;
          q.optional && a ? h(null, {rules:[]}, !1, null) : (k.files[d] = b, a && !k.error && (k.error = a), h(a, b, c, d));
        }, t = {relativeUrls:this.context.relativeUrls, entryPath:p.entryPath, rootpath:p.rootpath, rootFilename:p.rootFilename}, g = a.getFileManager(e, p.currentDirectory, this.context, a);
        if (g) {
          c && (e = g.tryAppendExtension(e, q.plugin ? ".js" : ".less"));
          var l = function(a) {
            var e = a.filename;
            a = a.contents.replace(/^\uFEFF/, "");
            t.currentDirectory = g.getPath(e);
            t.relativeUrls && (t.rootpath = g.join(k.context.rootpath || "", g.pathDiff(t.currentDirectory, t.entryPath)), !g.isPathAbsolute(t.rootpath) && g.alwaysMakePathsAbsolute() && (t.rootpath = g.join(t.entryPath, t.rootpath)));
            t.filename = e;
            var c = new f.Parse(k.context);
            c.processImports = !1;
            k.contents[e] = a;
            if (p.reference || q.reference) {
              t.reference = !0;
            }
            q.plugin ? (new b(c, t)).eval(a, function(a, b) {
              n(a, b, e);
            }) : q.inline ? n(null, a, e) : (new d(c, k, t)).parse(a, function(a, b) {
              n(a, b, e);
            });
          };
          (c = g.loadFile(e, p.currentDirectory, this.context, a, function(a, b) {
            a ? n(a) : l(b);
          })) && c.then(l, n);
        } else {
          n({message:"Could not find a file-manager for " + e});
        }
      };
      return e;
    };
  }, {"./contexts":10, "./parser/parser":37, "./plugins/function-importer":39}], 30:[function(c, g, l) {
    g.exports = function(f, d) {
      var b, a, e, k, n;
      return {version:[2, 5, 3], data:c("./data"), tree:c("./tree"), Environment:n = c("./environment/environment"), AbstractFileManager:c("./environment/abstract-file-manager"), environment:f = new n(f, d), visitors:c("./visitors"), Parser:c("./parser/parser"), functions:c("./functions")(f), contexts:c("./contexts"), SourceMapOutput:b = c("./source-map-output")(f), SourceMapBuilder:a = c("./source-map-builder")(b, f), ParseTree:e = c("./parse-tree")(a), ImportManager:k = c("./import-manager")(f), 
      render:c("./render")(f, e, k), parse:c("./parse")(f, e, k), LessError:c("./less-error"), transformTree:c("./transform-tree"), utils:c("./utils"), PluginManager:c("./plugin-manager"), logger:c("./logger")};
    };
  }, {"./contexts":10, "./data":12, "./environment/abstract-file-manager":14, "./environment/environment":15, "./functions":22, "./import-manager":29, "./less-error":31, "./logger":32, "./parse":34, "./parse-tree":33, "./parser/parser":37, "./plugin-manager":38, "./render":40, "./source-map-builder":41, "./source-map-output":42, "./transform-tree":43, "./tree":61, "./utils":82, "./visitors":86}], 31:[function(c, g, l) {
    var f = c("./utils");
    c = g.exports = function(d, b, a) {
      Error.call(this);
      a = d.filename || a;
      if (b && a) {
        var e = b.contents[a], c = f.getLocation(d.index, e);
        b = c.line;
        c = c.column;
        var n = d.call && f.getLocation(d.call, e).line;
        e = e.split("\n");
        this.type = d.type || "Syntax";
        this.filename = a;
        this.index = d.index;
        this.line = "number" === typeof b ? b + 1 : null;
        this.callLine = n + 1;
        this.callExtract = e[n];
        this.column = c;
        this.extract = [e[b - 1], e[b], e[b + 1]];
      }
      this.message = d.message;
      this.stack = d.stack;
    };
    "undefined" === typeof Object.create ? (g = function() {
    }, g.prototype = Error.prototype, c.prototype = new g) : c.prototype = Object.create(Error.prototype);
    c.prototype.constructor = c;
  }, {"./utils":82}], 32:[function(c, g, l) {
    g.exports = {error:function(c) {
      this._fireEvent("error", c);
    }, warn:function(c) {
      this._fireEvent("warn", c);
    }, info:function(c) {
      this._fireEvent("info", c);
    }, debug:function(c) {
      this._fireEvent("debug", c);
    }, addListener:function(c) {
      this._listeners.push(c);
    }, removeListener:function(c) {
      for (var d = 0; d < this._listeners.length; d++) {
        if (this._listeners[d] === c) {
          this._listeners.splice(d, 1);
          break;
        }
      }
    }, _fireEvent:function(c, d) {
      for (var b = 0; b < this._listeners.length; b++) {
        var a = this._listeners[b][c];
        a && a(d);
      }
    }, _listeners:[]};
  }, {}], 33:[function(c, g, l) {
    var f = c("./less-error"), d = c("./transform-tree"), b = c("./logger");
    g.exports = function(a) {
      var e = function(a, b) {
        this.root = a;
        this.imports = b;
      };
      e.prototype.toCSS = function(e) {
        var c = {};
        try {
          var k = d(this.root, e);
        } catch (t) {
          throw new f(t, this.imports);
        }
        try {
          var q = !!e.compress;
          q && b.warn("The compress option has been deprecated. We recommend you use a dedicated css minifier, for instance see less-plugin-clean-css.");
          var h = {compress:q, dumpLineNumbers:e.dumpLineNumbers, strictUnits:!!e.strictUnits, numPrecision:8};
          if (e.sourceMap) {
            var u = new a(e.sourceMap);
            c.css = u.toCSS(k, h, this.imports);
          } else {
            c.css = k.toCSS(h);
          }
        } catch (t) {
          throw new f(t, this.imports);
        }
        if (e.pluginManager) {
          for (k = e.pluginManager.getPostProcessors(), q = 0; q < k.length; q++) {
            c.css = k[q].process(c.css, {sourceMap:u, options:e, imports:this.imports});
          }
        }
        e.sourceMap && (c.map = u.getExternalSourceMap());
        c.imports = [];
        for (var r in this.imports.files) {
          this.imports.files.hasOwnProperty(r) && r !== this.imports.rootFilename && c.imports.push(r);
        }
        return c;
      };
      return e;
    };
  }, {"./less-error":31, "./logger":32, "./transform-tree":43}], 34:[function(c, g, l) {
    var f, d = c("./contexts"), b = c("./parser/parser"), a = c("./plugin-manager");
    g.exports = function(e, k, n) {
      var p = function(e, k, u) {
        k = k || {};
        "function" === typeof k && (u = k, k = {});
        if (u) {
          var h = new a(this);
          h.addPlugins(k.plugins);
          k.pluginManager = h;
          h = new d.Parse(k);
          if (k.rootFileInfo) {
            var q = k.rootFileInfo;
          } else {
            q = k.filename || "input";
            var g = q.replace(/[^\/\\]*$/, "");
            q = {filename:q, relativeUrls:h.relativeUrls, rootpath:h.rootpath || "", currentDirectory:g, entryPath:g, rootFilename:q};
            q.rootpath && "/" !== q.rootpath.slice(-1) && (q.rootpath += "/");
          }
          var l = new n(h, q);
          (new b(h, l, q)).parse(e, function(a, b) {
            if (a) {
              return u(a);
            }
            u(null, b, l, k);
          }, k);
        } else {
          f || (f = "undefined" === typeof Promise ? c("promise") : Promise);
          var m = this;
          return new f(function(a, b) {
            p.call(m, e, k, function(e, d) {
              e ? b(e) : a(d);
            });
          });
        }
      };
      return p;
    };
  }, {"./contexts":10, "./parser/parser":37, "./plugin-manager":38, promise:void 0}], 35:[function(c, g, l) {
    g.exports = function(c, d) {
      function b(a) {
        var b = h - f;
        512 > b && !a || !b || (p.push(c.slice(f, h + 1)), f = h + 1);
      }
      var a = c.length, e = 0, k = 0, n, p = [], f = 0, h;
      for (h = 0; h < a; h++) {
        var u = c.charCodeAt(h);
        if (!(97 <= u && 122 >= u || 34 > u)) {
          switch(u) {
            case 40:
              k++;
              var r = h;
              continue;
            case 41:
              if (0 > --k) {
                return d("missing opening `(`", h);
              }
              continue;
            case 59:
              k || b();
              continue;
            case 123:
              e++;
              var t = h;
              continue;
            case 125:
              if (0 > --e) {
                return d("missing opening `{`", h);
              }
              e || k || b();
              continue;
            case 92:
              if (h < a - 1) {
                h++;
                continue;
              }
              return d("unescaped `\\`", h);
            case 34:
            case 39:
            case 96:
              var g = 0;
              var l = h;
              for (h += 1; h < a; h++) {
                var m = c.charCodeAt(h);
                if (!(96 < m)) {
                  if (m == u) {
                    g = 1;
                    break;
                  }
                  if (92 == m) {
                    if (h == a - 1) {
                      return d("unescaped `\\`", h);
                    }
                    h++;
                  }
                }
              }
              if (g) {
                continue;
              }
              return d("unmatched `" + String.fromCharCode(u) + "`", l);
            case 47:
              if (k || h == a - 1) {
                continue;
              }
              m = c.charCodeAt(h + 1);
              if (47 == m) {
                for (h += 2; h < a && (m = c.charCodeAt(h), !(13 >= m) || 10 != m && 13 != m); h++) {
                }
              } else {
                if (42 == m) {
                  var w = l = h;
                  for (h += 2; h < a - 1 && (m = c.charCodeAt(h), 125 == m && (n = h), 42 != m || 47 != c.charCodeAt(h + 1)); h++) {
                  }
                  if (h == a - 1) {
                    return d("missing closing `*/`", l);
                  }
                  h++;
                }
              }
              continue;
            case 42:
              if (h < a - 1 && 47 == c.charCodeAt(h + 1)) {
                return d("unmatched `/*`", h);
              }
          }
        }
      }
      if (0 !== e) {
        return w > t && n > w ? d("missing closing `}` or `*/`", t) : d("missing closing `}`", t);
      }
      if (0 !== k) {
        return d("missing closing `)`", r);
      }
      b(!0);
      return p;
    };
  }, {}], 36:[function(c, g, l) {
    var f = c("./chunker");
    g.exports = function() {
      var d, b, a = [], e, c, n, p, q, h = {save:function() {
        q = h.i;
        a.push({current:p, i:h.i, j:b});
      }, restore:function(d) {
        if (h.i > e || h.i === e && d && !c) {
          e = h.i, c = d;
        }
        d = a.pop();
        p = d.current;
        q = h.i = d.i;
        b = d.j;
      }, forget:function() {
        a.pop();
      }, isWhitespace:function(a) {
        a = d.charCodeAt(h.i + (a || 0));
        return a === u || a === g || a === r || a === t;
      }, $re:function(a) {
        h.i > q && (p = p.slice(h.i - q), q = h.i);
        a = a.exec(p);
        if (!a) {
          return null;
        }
        l(a[0].length);
        return "string" === typeof a ? a : 1 === a.length ? a[0] : a;
      }, $char:function(a) {
        if (d.charAt(h.i) !== a) {
          return null;
        }
        l(1);
        return a;
      }, $str:function(a) {
        for (var b = a.length, e = 0; e < b; e++) {
          if (d.charAt(h.i + e) !== a.charAt(e)) {
            return null;
          }
        }
        l(b);
        return a;
      }, $quoted:function() {
        var a = d.charAt(h.i);
        if ("'" === a || '"' === a) {
          for (var b = d.length, e = h.i, c = 1; c + e < b; c++) {
            switch(d.charAt(c + e)) {
              case "\\":
                c++;
                continue;
              case a:
                return a = d.substr(e, c + 1), l(c + 1), a;
            }
          }
          return null;
        }
      }}, u = 32, r = 9, t = 10, g = 13;
      h.autoCommentAbsorb = !0;
      h.commentStore = [];
      h.finished = !1;
      var l = function(a) {
        for (var e = h.i, c = b, k = h.i - q, f = h.i + p.length - k, m = h.i += a, x = d, v; h.i < f; h.i++) {
          v = x.charCodeAt(h.i);
          if (h.autoCommentAbsorb && 47 === v) {
            v = x.charAt(h.i + 1);
            if ("/" === v) {
              v = {index:h.i, isLineComment:!0};
              var C = x.indexOf("\n", h.i + 2);
              0 > C && (C = f);
              h.i = C;
              v.text = x.substr(v.i, h.i - v.i);
              h.commentStore.push(v);
              continue;
            } else {
              if ("*" === v && (v = x.indexOf("*/", h.i + 2), 0 <= v)) {
                v = {index:h.i, text:x.substr(h.i, v + 2 - h.i), isLineComment:!1};
                h.i += v.text.length - 1;
                h.commentStore.push(v);
                continue;
              }
            }
            break;
          }
          if (v !== u && v !== t && v !== r && v !== g) {
            break;
          }
        }
        p = p.slice(a + h.i - m + k);
        q = h.i;
        if (!p.length) {
          if (b < n.length - 1) {
            return p = n[++b], l(0), !0;
          }
          h.finished = !0;
        }
        return e !== h.i || c !== b;
      };
      h.peek = function(a) {
        if ("string" === typeof a) {
          for (var b = 0; b < a.length; b++) {
            if (d.charAt(h.i + b) !== a.charAt(b)) {
              return !1;
            }
          }
          return !0;
        }
        return a.test(p);
      };
      h.peekChar = function(a) {
        return d.charAt(h.i) === a;
      };
      h.currentChar = function() {
        return d.charAt(h.i);
      };
      h.getInput = function() {
        return d;
      };
      h.peekNotNumeric = function() {
        var a = d.charCodeAt(h.i);
        return 57 < a || 43 > a || 47 === a || 44 === a;
      };
      h.start = function(a, c, k) {
        d = a;
        h.i = b = q = e = 0;
        n = c ? f(a, k) : [a];
        p = n[0];
        l(0);
      };
      h.end = function() {
        var a = h.i >= d.length;
        if (h.i < e) {
          var b = c;
          h.i = e;
        }
        return {isFinished:a, furthest:h.i, furthestPossibleErrorMessage:b, furthestReachedEnd:h.i >= d.length - 1, furthestChar:d[h.i]};
      };
      return h;
    };
  }, {"./chunker":35}], 37:[function(c, g, l) {
    var f = c("../less-error"), d = c("../tree"), b = c("../visitors"), a = c("./parser-input"), e = c("../utils");
    c = function h(c, p, q) {
      function n(a, b, e) {
        if (e = "[object Function]" === Object.prototype.toString.call(a) ? a.call(l) : m.$re(a)) {
          return e;
        }
        t(b || ("string" === typeof a ? "expected '" + a + "' got '" + m.currentChar() + "'" : "unexpected token"));
      }
      function r(a, b) {
        if (m.$char(a)) {
          return a;
        }
        t(b || "expected '" + a + "' got '" + m.currentChar() + "'");
      }
      function t(a, b) {
        throw new f({index:m.i, filename:q.filename, type:b || "Syntax", message:a}, p);
      }
      function g(a) {
        var b = q.filename;
        return {lineNumber:e.getLocation(a, m.getInput()).line + 1, fileName:b};
      }
      var l, m = a();
      return {parse:function(a, e, n) {
        var w = null, r = "";
        var t = n && n.globalVars ? h.serializeVars(n.globalVars) + "\n" : "";
        var u = n && n.modifyVars ? "\n" + h.serializeVars(n.modifyVars) : "";
        if (c.pluginManager) {
          for (var y = c.pluginManager.getPreProcessors(), l = 0; l < y.length; l++) {
            a = y[l].process(a, {context:c, imports:p, fileInfo:q});
          }
        }
        if (t || n && n.banner) {
          r = (n && n.banner ? n.banner : "") + t, n = p.contentsIgnoredChars, n[q.filename] = n[q.filename] || 0, n[q.filename] += r.length;
        }
        a = a.replace(/\r\n?/g, "\n");
        a = r + a.replace(/^\uFEFF/, "") + u;
        p.contents[q.filename] = a;
        try {
          m.start(a, c.chunkInput, function(a, b) {
            throw new f({index:b, type:"Parse", message:a, filename:q.filename}, p);
          });
          var g = new d.Ruleset(null, this.parsers.primary());
          g.root = !0;
          g.firstRoot = !0;
        } catch (E) {
          return e(new f(E, p, q.filename));
        }
        a = m.end();
        a.isFinished || (u = a.furthestPossibleErrorMessage, u || (u = "Unrecognised input", "}" === a.furthestChar ? u += ". Possibly missing opening '{'" : ")" === a.furthestChar ? u += ". Possibly missing opening '('" : a.furthestReachedEnd && (u += ". Possibly missing something")), w = new f({type:"Parse", message:u, index:a.furthest, filename:q.filename}, p));
        a = function(a) {
          return (a = w || a || p.error) ? (a instanceof f || (a = new f(a, p, q.filename)), e(a)) : e(null, g);
        };
        if (!1 !== c.processImports) {
          (new b.ImportVisitor(p, a)).run(g);
        } else {
          return a();
        }
      }, parsers:l = {primary:function() {
        for (var a = this.mixin, b = [], e;;) {
          for (;;) {
            e = this.comment();
            if (!e) {
              break;
            }
            b.push(e);
          }
          if (m.finished) {
            break;
          }
          if (m.peek("}")) {
            break;
          }
          if (e = this.extendRule()) {
            b = b.concat(e);
          } else {
            if (e = a.definition() || this.rule() || this.ruleset() || a.call() || this.rulesetCall() || this.directive()) {
              b.push(e);
            } else {
              for (e = !1; m.$char(";");) {
                e = !0;
              }
              if (!e) {
                break;
              }
            }
          }
        }
        return b;
      }, comment:function() {
        if (m.commentStore.length) {
          var a = m.commentStore.shift();
          return new d.Comment(a.text, a.isLineComment, a.index, q);
        }
      }, entities:{quoted:function() {
        var a, b = m.i, e = !1;
        m.save();
        m.$char("~") && (e = !0);
        if (a = m.$quoted()) {
          return m.forget(), new d.Quoted(a.charAt(0), a.substr(1, a.length - 2), e, b, q);
        }
        m.restore();
      }, keyword:function() {
        var a = m.$char("%") || m.$re(/^[_A-Za-z-][_A-Za-z0-9-]*/);
        if (a) {
          return d.Color.fromKeyword(a) || new d.Keyword(a);
        }
      }, call:function() {
        var a, b, e = m.i;
        if (!m.peek(/^url\(/i)) {
          if (m.save(), a = m.$re(/^([\w-]+|%|progid:[\w\.]+)\(/)) {
            a = a[1];
            if ("alpha" === a.toLowerCase() && (b = l.alpha())) {
              return m.forget(), b;
            }
            b = this.arguments();
            if (m.$char(")")) {
              return m.forget(), new d.Call(a, b, e, q);
            }
            m.restore("Could not parse call arguments or missing ')'");
          } else {
            m.forget();
          }
        }
      }, arguments:function() {
        for (var a = [], b;;) {
          b = this.assignment() || l.expression();
          if (!b) {
            break;
          }
          a.push(b);
          if (!m.$char(",")) {
            break;
          }
        }
        return a;
      }, literal:function() {
        return this.dimension() || this.color() || this.quoted() || this.unicodeDescriptor();
      }, assignment:function() {
        var a, b;
        m.save();
        if ((a = m.$re(/^\w+(?=\s?=)/i)) && m.$char("\x3d") && (b = l.entity())) {
          return m.forget(), new d.Assignment(a, b);
        }
        m.restore();
      }, url:function() {
        var a = m.i;
        m.autoCommentAbsorb = !1;
        if (m.$str("url(")) {
          var b = this.quoted() || this.variable() || m.$re(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) || "";
          m.autoCommentAbsorb = !0;
          r(")");
          return new d.URL(null != b.value || b instanceof d.Variable ? b : new d.Anonymous(b), a, q);
        }
        m.autoCommentAbsorb = !0;
      }, variable:function() {
        var a, b = m.i;
        if ("@" === m.currentChar() && (a = m.$re(/^@@?[\w-]+/))) {
          return new d.Variable(a, b, q);
        }
      }, variableCurly:function() {
        var a, b = m.i;
        if ("@" === m.currentChar() && (a = m.$re(/^@\{([\w-]+)\}/))) {
          return new d.Variable("@" + a[1], b, q);
        }
      }, color:function() {
        var a;
        if ("#" === m.currentChar() && (a = m.$re(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/))) {
          var b = a.input.match(/^#([\w]+).*/);
          b = b[1];
          b.match(/^[A-Fa-f0-9]+$/) || t("Invalid HEX color code");
          return new d.Color(a[1], void 0, "#" + b);
        }
      }, dimension:function() {
        if (!m.peekNotNumeric()) {
          var a = m.$re(/^([+-]?\d*\.?\d+)(%|[a-z]+)?/i);
          if (a) {
            return new d.Dimension(a[1], a[2]);
          }
        }
      }, unicodeDescriptor:function() {
        var a;
        if (a = m.$re(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/)) {
          return new d.UnicodeDescriptor(a[0]);
        }
      }, javascript:function() {
        var a, b = m.i;
        m.save();
        var e = m.$char("~");
        if (m.$char("`")) {
          if (a = m.$re(/^[^`]*`/)) {
            return m.forget(), new d.JavaScript(a.substr(0, a.length - 1), !!e, b, q);
          }
          m.restore("invalid javascript definition");
        } else {
          m.restore();
        }
      }}, variable:function() {
        var a;
        if ("@" === m.currentChar() && (a = m.$re(/^(@[\w-]+)\s*:/))) {
          return a[1];
        }
      }, rulesetCall:function() {
        var a;
        if ("@" === m.currentChar() && (a = m.$re(/^(@[\w-]+)\s*\(\s*\)\s*;/))) {
          return new d.RulesetCall(a[1]);
        }
      }, extend:function(a) {
        var b, e = m.i, c, h;
        if (m.$str(a ? "\x26:extend(" : ":extend(")) {
          do {
            for (b = null; !(c = m.$re(/^(all)(?=\s*(\)|,))/));) {
              var p = this.element();
              if (!p) {
                break;
              }
              b ? b.push(p) : b = [p];
            }
            c = c && c[1];
            b || t("Missing target selector for :extend().");
            b = new d.Extend(new d.Selector(b), c, e);
            h ? h.push(b) : h = [b];
          } while (m.$char(","));
          n(/^\)/);
          a && n(/^;/);
          return h;
        }
      }, extendRule:function() {
        return this.extend(!0);
      }, mixin:{call:function() {
        var a = m.currentChar(), b = !1, e = m.i, c;
        if ("." === a || "#" === a) {
          for (m.save();;) {
            a = m.i;
            var h = m.$re(/^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/);
            if (!h) {
              break;
            }
            var n = new d.Element(n, h, a, q);
            c ? c.push(n) : c = [n];
            n = m.$char("\x3e");
          }
          if (c) {
            if (m.$char("(")) {
              var p = this.args(!0).args;
              r(")");
            }
            l.important() && (b = !0);
            if (l.end()) {
              return m.forget(), new d.mixin.Call(c, p, e, q, b);
            }
          }
          m.restore();
        }
      }, args:function(a) {
        var b = l.entities, e = {args:null, variadic:!1}, c = [], h = [], n = [], p, f;
        for (m.save();;) {
          if (a) {
            var q = l.detachedRuleset() || l.expression();
          } else {
            m.commentStore.length = 0;
            if (m.$str("...")) {
              e.variadic = !0;
              m.$char(";") && !p && (p = !0);
              (p ? h : n).push({variadic:!0});
              break;
            }
            q = b.variable() || b.literal() || b.keyword();
          }
          if (!q) {
            break;
          }
          var r = null;
          q.throwAwayComments && q.throwAwayComments();
          var u = q;
          var g = null;
          a ? q.value && 1 == q.value.length && (g = q.value[0]) : g = q;
          if (g && g instanceof d.Variable) {
            if (m.$char(":")) {
              if (0 < c.length) {
                p && t("Cannot mix ; and , as delimiter types");
                var w = !0;
              }
              u = l.detachedRuleset() || l.expression();
              if (!u) {
                if (a) {
                  t("could not understand value for named argument");
                } else {
                  return m.restore(), e.args = [], e;
                }
              }
              r = f = g.name;
            } else {
              if (m.$str("...")) {
                if (a) {
                  var x = !0;
                } else {
                  e.variadic = !0;
                  m.$char(";") && !p && (p = !0);
                  (p ? h : n).push({name:q.name, variadic:!0});
                  break;
                }
              } else {
                a || (f = r = g.name, u = null);
              }
            }
          }
          u && c.push(u);
          n.push({name:r, value:u, expand:x});
          m.$char(",") || !m.$char(";") && !p || (w && t("Cannot mix ; and , as delimiter types"), p = !0, 1 < c.length && (u = new d.Value(c)), h.push({name:f, value:u, expand:x}), f = null, c = [], w = !1);
        }
        m.forget();
        e.args = p ? h : n;
        return e;
      }, definition:function() {
        var a, b;
        if (!("." !== m.currentChar() && "#" !== m.currentChar() || m.peek(/^[^{]*\}/))) {
          if (m.save(), a = m.$re(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/)) {
            a = a[1];
            var e = this.args(!1);
            var c = e.args;
            var h = e.variadic;
            if (m.$char(")")) {
              m.commentStore.length = 0;
              m.$str("when") && (b = n(l.conditions, "expected condition"));
              if (e = l.block()) {
                return m.forget(), new d.mixin.Definition(a, c, e, b, h);
              }
              m.restore();
            } else {
              m.restore("Missing closing ')'");
            }
          } else {
            m.forget();
          }
        }
      }}, entity:function() {
        var a = this.entities;
        return this.comment() || a.literal() || a.variable() || a.url() || a.call() || a.keyword() || a.javascript();
      }, end:function() {
        return m.$char(";") || m.peek("}");
      }, alpha:function() {
        var a;
        if (m.$re(/^opacity=/i)) {
          return (a = m.$re(/^\d+/)) || (a = n(this.entities.variable, "Could not parse alpha")), r(")"), new d.Alpha(a);
        }
      }, element:function() {
        var a, b = m.i;
        var e = this.combinator();
        var c = m.$re(/^(?:\d+\.\d+|\d+)%/) || m.$re(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/) || m.$char("*") || m.$char("\x26") || this.attribute() || m.$re(/^\([^&()@]+\)/) || m.$re(/^[\.#:](?=@)/) || this.entities.variableCurly();
        c || (m.save(), m.$char("(") ? (a = this.selector()) && m.$char(")") ? (c = new d.Paren(a), m.forget()) : m.restore("Missing closing ')'") : m.forget());
        if (c) {
          return new d.Element(e, c, b, q);
        }
      }, combinator:function() {
        var a = m.currentChar();
        if ("/" === a) {
          m.save();
          var b = m.$re(/^\/[a-z]+\//i);
          if (b) {
            return m.forget(), new d.Combinator(b);
          }
          m.restore();
        }
        if ("\x3e" === a || "+" === a || "~" === a || "|" === a || "^" === a) {
          m.i++;
          "^" === a && "^" === m.currentChar() && (a = "^^", m.i++);
          for (; m.isWhitespace();) {
            m.i++;
          }
          return new d.Combinator(a);
        }
        return m.isWhitespace(-1) ? new d.Combinator(" ") : new d.Combinator(null);
      }, lessSelector:function() {
        return this.selector(!0);
      }, selector:function(a) {
        for (var b = m.i, e, c, h, p, f, r, u; (a && (c = this.extend()) || a && (r = m.$str("when")) || (p = this.element())) && (r ? u = n(this.conditions, "expected condition") : u ? t("CSS guard can only be used at the end of selector") : c ? f = f ? f.concat(c) : c : (f && t("Extend can only be used at the end of selector"), h = m.currentChar(), e ? e.push(p) : e = [p], p = null), "{" !== h && "}" !== h && ";" !== h && "," !== h && ")" !== h);) {
        }
        if (e) {
          return new d.Selector(e, f, u, b, q);
        }
        f && t("Extend must be used to extend a selector, it cannot be used on its own");
      }, attribute:function() {
        if (m.$char("[")) {
          var a = this.entities, b, e, c;
          (b = a.variableCurly()) || (b = n(/^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/));
          (c = m.$re(/^[|~*$^]?=/)) && (e = a.quoted() || m.$re(/^[0-9]+%/) || m.$re(/^[\w-]+/) || a.variableCurly());
          r("]");
          return new d.Attribute(b, c, e);
        }
      }, block:function() {
        var a;
        if (m.$char("{") && (a = this.primary()) && m.$char("}")) {
          return a;
        }
      }, blockRuleset:function() {
        var a = this.block();
        a && (a = new d.Ruleset(null, a));
        return a;
      }, detachedRuleset:function() {
        var a = this.blockRuleset();
        if (a) {
          return new d.DetachedRuleset(a);
        }
      }, ruleset:function() {
        var a, b, e;
        m.save();
        for (c.dumpLineNumbers && (e = g(m.i));;) {
          var h = this.lessSelector();
          if (!h) {
            break;
          }
          a ? a.push(h) : a = [h];
          m.commentStore.length = 0;
          h.condition && 1 < a.length && t("Guards are only currently allowed on a single selector.");
          if (!m.$char(",")) {
            break;
          }
          h.condition && t("Guards are only currently allowed on a single selector.");
          m.commentStore.length = 0;
        }
        if (a && (b = this.block())) {
          return m.forget(), a = new d.Ruleset(a, b, c.strictImports), c.dumpLineNumbers && (a.debugInfo = e), a;
        }
        m.restore();
      }, rule:function(a) {
        var b, e = m.i;
        var h = m.currentChar();
        var n, p;
        if ("." !== h && "#" !== h && "\x26" !== h && ":" !== h) {
          if (m.save(), h = this.variable() || this.ruleProperty()) {
            (p = "string" === typeof h) && (b = this.detachedRuleset());
            m.commentStore.length = 0;
            if (!b) {
              var f = !p && 1 < h.length && h.pop().value;
              (n = !a && (c.compress || p)) && (b = this.value());
              if (!b && (b = this.anonymousValue())) {
                return m.forget(), new d.Rule(h, b, !1, f, e, q);
              }
              n || b || (b = this.value());
              n = this.important();
            }
            if (b && this.end()) {
              return m.forget(), new d.Rule(h, b, n, f, e, q);
            }
            m.restore();
            if (b && !a) {
              return this.rule(!0);
            }
          } else {
            m.forget();
          }
        }
      }, anonymousValue:function() {
        var a = m.$re(/^([^@+\/'"*`(;{}-]*);/);
        if (a) {
          return new d.Anonymous(a[1]);
        }
      }, "import":function() {
        var a, b = m.i;
        if (a = m.$re(/^@import?\s+/)) {
          var e = (a ? this.importOptions() : null) || {};
          if (a = this.entities.quoted() || this.entities.url()) {
            var c = this.mediaFeatures();
            m.$char(";") || (m.i = b, t("missing semi-colon or unrecognised media features on import"));
            c = c && new d.Value(c);
            return new d.Import(a, c, e, b, q);
          }
          m.i = b;
          t("malformed import statement");
        }
      }, importOptions:function() {
        var a, b = {};
        if (!m.$char("(")) {
          return null;
        }
        do {
          if (a = this.importOption()) {
            var e = a;
            var c = !0;
            switch(e) {
              case "css":
                e = "less";
                c = !1;
                break;
              case "once":
                e = "multiple", c = !1;
            }
            b[e] = c;
            if (!m.$char(",")) {
              break;
            }
          }
        } while (a);
        r(")");
        return b;
      }, importOption:function() {
        var a = m.$re(/^(less|css|multiple|once|inline|reference|optional)/);
        if (a) {
          return a[1];
        }
      }, mediaFeature:function() {
        var a = this.entities, b = [], e;
        m.save();
        do {
          if (e = a.keyword() || a.variable()) {
            b.push(e);
          } else {
            if (m.$char("(")) {
              var c = this.property();
              e = this.value();
              if (m.$char(")")) {
                if (c && e) {
                  b.push(new d.Paren(new d.Rule(c, e, null, null, m.i, q, !0)));
                } else {
                  if (e) {
                    b.push(new d.Paren(e));
                  } else {
                    return m.restore("badly formed media feature definition"), null;
                  }
                }
              } else {
                return m.restore("Missing closing ')'"), null;
              }
            }
          }
        } while (e);
        m.forget();
        if (0 < b.length) {
          return new d.Expression(b);
        }
      }, mediaFeatures:function() {
        var a = this.entities, b = [], e;
        do {
          if (e = this.mediaFeature()) {
            if (b.push(e), !m.$char(",")) {
              break;
            }
          } else {
            if (e = a.variable()) {
              if (b.push(e), !m.$char(",")) {
                break;
              }
            }
          }
        } while (e);
        return 0 < b.length ? b : null;
      }, media:function() {
        var a;
        c.dumpLineNumbers && (a = g(m.i));
        m.save();
        if (m.$str("@media")) {
          var b = this.mediaFeatures();
          var e = this.block();
          if (!e) {
            m.restore("media definitions require block statements after any features");
            return;
          }
          m.forget();
          b = new d.Media(e, b, m.i, q);
          c.dumpLineNumbers && (b.debugInfo = a);
          return b;
        }
        m.restore();
      }, plugin:function() {
        var a, b = m.i;
        if (m.$re(/^@plugin?\s+/)) {
          var e = {plugin:!0};
          if (a = this.entities.quoted() || this.entities.url()) {
            return m.$char(";") || (m.i = b, t("missing semi-colon on plugin")), new d.Import(a, null, e, b, q);
          }
          m.i = b;
          t("malformed plugin statement");
        }
      }, directive:function() {
        var a = m.i, b, e, h, n, p = !0, f = !0;
        if ("@" === m.currentChar()) {
          if (e = this["import"]() || this.plugin() || this.media()) {
            return e;
          }
          m.save();
          if (b = m.$re(/^@[a-z-]+/)) {
            var r = b;
            "-" == b.charAt(1) && 0 < b.indexOf("-", 2) && (r = "@" + b.slice(b.indexOf("-", 2) + 1));
            switch(r) {
              case "@counter-style":
                p = n = !0;
                break;
              case "@charset":
                n = !0;
                p = !1;
                break;
              case "@namespace":
                var u = !0;
                p = !1;
                break;
              case "@keyframes":
                n = !0;
                break;
              case "@host":
              case "@page":
                var l = !0;
                break;
              case "@document":
              case "@supports":
                l = !0, f = !1;
            }
            m.commentStore.length = 0;
            n ? (e = this.entity()) || t("expected " + b + " identifier") : u ? (e = this.expression()) || t("expected " + b + " expression") : l && (e = (m.$re(/^[^{;]+/) || "").trim()) && (e = new d.Anonymous(e));
            p && (h = this.blockRuleset());
            if (h || !p && e && m.$char(";")) {
              return m.forget(), new d.Directive(b, e, h, a, q, c.dumpLineNumbers ? g(a) : null, !1, f);
            }
            m.restore("directive options not recognised");
          }
        }
      }, value:function() {
        var a, b = [];
        do {
          if (a = this.expression()) {
            if (b.push(a), !m.$char(",")) {
              break;
            }
          }
        } while (a);
        if (0 < b.length) {
          return new d.Value(b);
        }
      }, important:function() {
        if ("!" === m.currentChar()) {
          return m.$re(/^! *important/);
        }
      }, sub:function() {
        var a;
        m.save();
        if (m.$char("(")) {
          if ((a = this.addition()) && m.$char(")")) {
            return m.forget(), a = new d.Expression([a]), a.parens = !0, a;
          }
          m.restore("Expected ')'");
        } else {
          m.restore();
        }
      }, multiplication:function() {
        var a, b;
        if (a = this.operand()) {
          for (b = m.isWhitespace(-1); !m.peek(/^\/[*\/]/);) {
            m.save();
            var e = m.$char("/") || m.$char("*");
            if (!e) {
              m.forget();
              break;
            }
            var c = this.operand();
            if (!c) {
              m.restore();
              break;
            }
            m.forget();
            a.parensInOp = !0;
            c.parensInOp = !0;
            var h = new d.Operation(e, [h || a, c], b);
            b = m.isWhitespace(-1);
          }
          return h || a;
        }
      }, addition:function() {
        var a, b;
        if (a = this.multiplication()) {
          for (b = m.isWhitespace(-1);;) {
            var e = m.$re(/^[-+]\s+/) || !b && (m.$char("+") || m.$char("-"));
            if (!e) {
              break;
            }
            var c = this.multiplication();
            if (!c) {
              break;
            }
            a.parensInOp = !0;
            c.parensInOp = !0;
            var h = new d.Operation(e, [h || a, c], b);
            b = m.isWhitespace(-1);
          }
          return h || a;
        }
      }, conditions:function() {
        var a, b = m.i;
        if (a = this.condition()) {
          for (; m.peek(/^,\s*(not\s*)?\(/) && m.$char(",");) {
            var e = this.condition();
            if (!e) {
              break;
            }
            var c = new d.Condition("or", c || a, e, b);
          }
          return c || a;
        }
      }, condition:function() {
        var a = this.entities, b = m.i, e = !1, c, h, n;
        m.$str("not") && (e = !0);
        r("(");
        if (c = this.addition() || a.keyword() || a.quoted()) {
          return m.$char("\x3e") ? n = m.$char("\x3d") ? "\x3e\x3d" : "\x3e" : m.$char("\x3c") ? n = m.$char("\x3d") ? "\x3c\x3d" : "\x3c" : m.$char("\x3d") && (n = m.$char("\x3e") ? "\x3d\x3e" : m.$char("\x3c") ? "\x3d\x3c" : "\x3d"), n ? (a = this.addition() || a.keyword() || a.quoted()) ? h = new d.Condition(n, c, a, b, e) : t("expected expression") : h = new d.Condition("\x3d", c, new d.Keyword("true"), b, e), r(")"), m.$str("and") ? new d.Condition("and", h, this.condition()) : h;
        }
      }, operand:function() {
        var a = this.entities, b;
        m.peek(/^-[@\(]/) && (b = m.$char("-"));
        a = this.sub() || a.dimension() || a.color() || a.variable() || a.call();
        b && (a.parensInOp = !0, a = new d.Negative(a));
        return a;
      }, expression:function() {
        var a = [], b, e;
        do {
          if (b = this.comment()) {
            a.push(b);
          } else {
            if (b = this.addition() || this.entity()) {
              a.push(b), m.peek(/^\/[\/*]/) || (e = m.$char("/")) && a.push(new d.Anonymous(e));
            }
          }
        } while (b);
        if (0 < a.length) {
          return new d.Expression(a);
        }
      }, property:function() {
        var a = m.$re(/^(\*?-?[_a-zA-Z0-9-]+)\s*:/);
        if (a) {
          return a[1];
        }
      }, ruleProperty:function() {
        function a(a) {
          var c = m.i;
          if (a = m.$re(a)) {
            return e.push(c), b.push(a[1]);
          }
        }
        var b = [], e = [], c, h;
        m.save();
        if (c = m.$re(/^([_a-zA-Z0-9-]+)\s*:/)) {
          return b = [new d.Keyword(c[1])], m.forget(), b;
        }
        for (a(/^(\*?)/); a(/^((?:[\w-]+)|(?:@\{[\w-]+\}))/);) {
        }
        if (1 < b.length && a(/^((?:\+_|\+)?)\s*:/)) {
          m.forget();
          "" === b[0] && (b.shift(), e.shift());
          for (h = 0; h < b.length; h++) {
            c = b[h], b[h] = "@" !== c.charAt(0) ? new d.Keyword(c) : new d.Variable("@" + c.slice(2, -1), e[h], q);
          }
          return b;
        }
        m.restore();
      }}};
    };
    c.serializeVars = function(a) {
      var b = "", e;
      for (e in a) {
        if (Object.hasOwnProperty.call(a, e)) {
          var c = a[e];
          b += ("@" === e[0] ? "" : "@") + e + ": " + c + (";" === String(c).slice(-1) ? "" : ";");
        }
      }
      return b;
    };
    g.exports = c;
  }, {"../less-error":31, "../tree":61, "../utils":82, "../visitors":86, "./parser-input":36}], 38:[function(c, g, l) {
    c = function(c) {
      this.less = c;
      this.visitors = [];
      this.preProcessors = [];
      this.postProcessors = [];
      this.installedPlugins = [];
      this.fileManagers = [];
    };
    c.prototype.addPlugins = function(c) {
      if (c) {
        for (var d = 0; d < c.length; d++) {
          this.addPlugin(c[d]);
        }
      }
    };
    c.prototype.addPlugin = function(c) {
      this.installedPlugins.push(c);
      c.install(this.less, this);
    };
    c.prototype.addVisitor = function(c) {
      this.visitors.push(c);
    };
    c.prototype.addPreProcessor = function(c, d) {
      var b;
      for (b = 0; b < this.preProcessors.length && !(this.preProcessors[b].priority >= d); b++) {
      }
      this.preProcessors.splice(b, 0, {preProcessor:c, priority:d});
    };
    c.prototype.addPostProcessor = function(c, d) {
      var b;
      for (b = 0; b < this.postProcessors.length && !(this.postProcessors[b].priority >= d); b++) {
      }
      this.postProcessors.splice(b, 0, {postProcessor:c, priority:d});
    };
    c.prototype.addFileManager = function(c) {
      this.fileManagers.push(c);
    };
    c.prototype.getPreProcessors = function() {
      for (var c = [], d = 0; d < this.preProcessors.length; d++) {
        c.push(this.preProcessors[d].preProcessor);
      }
      return c;
    };
    c.prototype.getPostProcessors = function() {
      for (var c = [], d = 0; d < this.postProcessors.length; d++) {
        c.push(this.postProcessors[d].postProcessor);
      }
      return c;
    };
    c.prototype.getVisitors = function() {
      return this.visitors;
    };
    c.prototype.getFileManagers = function() {
      return this.fileManagers;
    };
    g.exports = c;
  }, {}], 39:[function(c, g, l) {
    var f = c("../less-error"), d = c("../tree");
    (g.exports = function(b, a) {
      this.fileInfo = a;
    }).prototype.eval = function(b, a) {
      var e = {};
      var c = {add:function(a, b) {
        e[a] = b;
      }, addMultiple:function(a) {
        Object.keys(a).forEach(function(b) {
          e[b] = a[b];
        });
      }};
      try {
        var n = new Function("functions", "tree", "fileInfo", b);
        n(c, d, this.fileInfo);
      } catch (p) {
        a(new f({message:"Plugin evaluation error: '" + p.name + ": " + p.message.replace(/["]/g, "'") + "'", filename:this.fileInfo.filename}), null);
      }
      a(null, {functions:e});
    };
  }, {"../less-error":31, "../tree":61}], 40:[function(c, g, l) {
    var f;
    g.exports = function(d, b, a) {
      var e = function(a, d, p) {
        "function" === typeof d && (p = d, d = {});
        if (p) {
          this.parse(a, d, function(a, e, c, d) {
            if (a) {
              return p(a);
            }
            try {
              var k = (new b(e, c)).toCSS(d);
            } catch (v) {
              return p(v);
            }
            p(null, k);
          });
        } else {
          f || (f = "undefined" === typeof Promise ? c("promise") : Promise);
          var k = this;
          return new f(function(b, c) {
            e.call(k, a, d, function(a, e) {
              a ? c(a) : b(e);
            });
          });
        }
      };
      return e;
    };
  }, {promise:void 0}], 41:[function(c, g, l) {
    g.exports = function(c, d) {
      var b = function(a) {
        this.options = a;
      };
      b.prototype.toCSS = function(a, b, d) {
        a = new c({contentsIgnoredCharsMap:d.contentsIgnoredChars, rootNode:a, contentsMap:d.contents, sourceMapFilename:this.options.sourceMapFilename, sourceMapURL:this.options.sourceMapURL, outputFilename:this.options.sourceMapOutputFilename, sourceMapBasepath:this.options.sourceMapBasepath, sourceMapRootpath:this.options.sourceMapRootpath, outputSourceFiles:this.options.outputSourceFiles, sourceMapGenerator:this.options.sourceMapGenerator, sourceMapFileInline:this.options.sourceMapFileInline});
        b = a.toCSS(b);
        this.sourceMap = a.sourceMap;
        this.sourceMapURL = a.sourceMapURL;
        this.options.sourceMapInputFilename && (this.sourceMapInputFilename = a.normalizeFilename(this.options.sourceMapInputFilename));
        return b + this.getCSSAppendage();
      };
      b.prototype.getCSSAppendage = function() {
        var a = this.sourceMapURL;
        if (this.options.sourceMapFileInline) {
          if (void 0 === this.sourceMap) {
            return "";
          }
          a = "data:application/json;base64," + d.encodeBase64(this.sourceMap);
        }
        return a ? "/*# sourceMappingURL\x3d" + a + " */" : "";
      };
      b.prototype.getExternalSourceMap = function() {
        return this.sourceMap;
      };
      b.prototype.setExternalSourceMap = function(a) {
        this.sourceMap = a;
      };
      b.prototype.isInline = function() {
        return this.options.sourceMapFileInline;
      };
      b.prototype.getSourceMapURL = function() {
        return this.sourceMapURL;
      };
      b.prototype.getOutputFilename = function() {
        return this.options.sourceMapOutputFilename;
      };
      b.prototype.getInputFilename = function() {
        return this.sourceMapInputFilename;
      };
      return b;
    };
  }, {}], 42:[function(c, g, l) {
    g.exports = function(c) {
      var d = function(b) {
        this._css = [];
        this._rootNode = b.rootNode;
        this._contentsMap = b.contentsMap;
        this._contentsIgnoredCharsMap = b.contentsIgnoredCharsMap;
        b.sourceMapFilename && (this._sourceMapFilename = b.sourceMapFilename.replace(/\\/g, "/"));
        this._outputFilename = b.outputFilename;
        this.sourceMapURL = b.sourceMapURL;
        b.sourceMapBasepath && (this._sourceMapBasepath = b.sourceMapBasepath.replace(/\\/g, "/"));
        b.sourceMapRootpath ? (this._sourceMapRootpath = b.sourceMapRootpath.replace(/\\/g, "/"), "/" !== this._sourceMapRootpath.charAt(this._sourceMapRootpath.length - 1) && (this._sourceMapRootpath += "/")) : this._sourceMapRootpath = "";
        this._outputSourceFiles = b.outputSourceFiles;
        this._sourceMapGeneratorConstructor = c.getSourceMapGenerator();
        this._column = this._lineNumber = 0;
      };
      d.prototype.normalizeFilename = function(b) {
        b = b.replace(/\\/g, "/");
        this._sourceMapBasepath && 0 === b.indexOf(this._sourceMapBasepath) && (b = b.substring(this._sourceMapBasepath.length), "\\" === b.charAt(0) || "/" === b.charAt(0)) && (b = b.substring(1));
        return (this._sourceMapRootpath || "") + b;
      };
      d.prototype.add = function(b, a, e, c) {
        if (b) {
          if (a) {
            var d = this._contentsMap[a.filename];
            this._contentsIgnoredCharsMap[a.filename] && (e -= this._contentsIgnoredCharsMap[a.filename], 0 > e && (e = 0), d = d.slice(this._contentsIgnoredCharsMap[a.filename]));
            d = d.substring(0, e);
            d = d.split("\n");
            var k = d[d.length - 1];
          }
          e = b.split("\n");
          var f = e[e.length - 1];
          if (a) {
            if (c) {
              for (c = 0; c < e.length; c++) {
                this._sourceMapGenerator.addMapping({generated:{line:this._lineNumber + c + 1, column:0 === c ? this._column : 0}, original:{line:d.length + c, column:0 === c ? k.length : 0}, source:this.normalizeFilename(a.filename)});
              }
            } else {
              this._sourceMapGenerator.addMapping({generated:{line:this._lineNumber + 1, column:this._column}, original:{line:d.length, column:k.length}, source:this.normalizeFilename(a.filename)});
            }
          }
          1 === e.length ? this._column += f.length : (this._lineNumber += e.length - 1, this._column = f.length);
          this._css.push(b);
        }
      };
      d.prototype.isEmpty = function() {
        return 0 === this._css.length;
      };
      d.prototype.toCSS = function(b) {
        this._sourceMapGenerator = new this._sourceMapGeneratorConstructor({file:this._outputFilename, sourceRoot:null});
        if (this._outputSourceFiles) {
          for (var a in this._contentsMap) {
            if (this._contentsMap.hasOwnProperty(a)) {
              var e = this._contentsMap[a];
              this._contentsIgnoredCharsMap[a] && (e = e.slice(this._contentsIgnoredCharsMap[a]));
              this._sourceMapGenerator.setSourceContent(this.normalizeFilename(a), e);
            }
          }
        }
        this._rootNode.genCSS(b, this);
        if (0 < this._css.length) {
          b = JSON.stringify(this._sourceMapGenerator.toJSON());
          if (this.sourceMapURL) {
            var c = this.sourceMapURL;
          } else {
            this._sourceMapFilename && (c = this._sourceMapFilename);
          }
          this.sourceMapURL = c;
          this.sourceMap = b;
        }
        return this._css.join("");
      };
      return d;
    };
  }, {}], 43:[function(c, g, l) {
    var f = c("./contexts"), d = c("./visitors"), b = c("./tree");
    g.exports = function(a, e) {
      e = e || {};
      var c = e.variables, n = new f.Eval(e);
      "object" !== typeof c || Array.isArray(c) || (c = Object.keys(c).map(function(a) {
        var e = c[a];
        e instanceof b.Value || (e instanceof b.Expression || (e = new b.Expression([e])), e = new b.Value([e]));
        return new b.Rule("@" + a, e, !1, null, 0);
      }), n.frames = [new b.Ruleset(null, c)]);
      var p = [], q = [new d.JoinSelectorVisitor, new d.ExtendVisitor, new d.ToCSSVisitor({compress:!!e.compress})];
      if (e.pluginManager) {
        var h = e.pluginManager.getVisitors();
        for (e = 0; e < h.length; e++) {
          var u = h[e];
          u.isPreEvalVisitor ? p.push(u) : u.isPreVisitor ? q.splice(0, 0, u) : q.push(u);
        }
      }
      for (e = 0; e < p.length; e++) {
        p[e].run(a);
      }
      a = a.eval(n);
      for (e = 0; e < q.length; e++) {
        q[e].run(a);
      }
      return a;
    };
  }, {"./contexts":10, "./tree":61, "./visitors":86}], 44:[function(c, g, l) {
    c = c("./node");
    var f = function(c) {
      this.value = c;
    };
    f.prototype = new c;
    f.prototype.type = "Alpha";
    f.prototype.accept = function(c) {
      this.value = c.visit(this.value);
    };
    f.prototype.eval = function(c) {
      return this.value.eval ? new f(this.value.eval(c)) : this;
    };
    f.prototype.genCSS = function(c, b) {
      b.add("alpha(opacity\x3d");
      this.value.genCSS ? this.value.genCSS(c, b) : b.add(this.value);
      b.add(")");
    };
    g.exports = f;
  }, {"./node":69}], 45:[function(c, g, l) {
    c = c("./node");
    var f = function(c, b, a, e, k, n) {
      this.value = c;
      this.index = b;
      this.mapLines = e;
      this.currentFileInfo = a;
      this.rulesetLike = "undefined" === typeof k ? !1 : k;
      this.isReferenced = n || !1;
    };
    f.prototype = new c;
    f.prototype.type = "Anonymous";
    f.prototype.eval = function() {
      return new f(this.value, this.index, this.currentFileInfo, this.mapLines, this.rulesetLike, this.isReferenced);
    };
    f.prototype.compare = function(c) {
      return c.toCSS && this.toCSS() === c.toCSS() ? 0 : void 0;
    };
    f.prototype.isRulesetLike = function() {
      return this.rulesetLike;
    };
    f.prototype.genCSS = function(c, b) {
      b.add(this.value, this.currentFileInfo, this.index, this.mapLines);
    };
    f.prototype.markReferenced = function() {
      this.isReferenced = !0;
    };
    f.prototype.getIsReferenced = function() {
      return !this.currentFileInfo || !this.currentFileInfo.reference || this.isReferenced;
    };
    g.exports = f;
  }, {"./node":69}], 46:[function(c, g, l) {
    c = c("./node");
    var f = function(c, b) {
      this.key = c;
      this.value = b;
    };
    f.prototype = new c;
    f.prototype.type = "Assignment";
    f.prototype.accept = function(c) {
      this.value = c.visit(this.value);
    };
    f.prototype.eval = function(c) {
      return this.value.eval ? new f(this.key, this.value.eval(c)) : this;
    };
    f.prototype.genCSS = function(c, b) {
      b.add(this.key + "\x3d");
      this.value.genCSS ? this.value.genCSS(c, b) : b.add(this.value);
    };
    g.exports = f;
  }, {"./node":69}], 47:[function(c, g, l) {
    c = c("./node");
    var f = function(c, b, a) {
      this.key = c;
      this.op = b;
      this.value = a;
    };
    f.prototype = new c;
    f.prototype.type = "Attribute";
    f.prototype.eval = function(c) {
      return new f(this.key.eval ? this.key.eval(c) : this.key, this.op, this.value && this.value.eval ? this.value.eval(c) : this.value);
    };
    f.prototype.genCSS = function(c, b) {
      b.add(this.toCSS(c));
    };
    f.prototype.toCSS = function(c) {
      var b = this.key.toCSS ? this.key.toCSS(c) : this.key;
      this.op && (b += this.op, b += this.value.toCSS ? this.value.toCSS(c) : this.value);
      return "[" + b + "]";
    };
    g.exports = f;
  }, {"./node":69}], 48:[function(c, g, l) {
    l = c("./node");
    var f = c("../functions/function-caller"), d = function(b, a, e, c) {
      this.name = b;
      this.args = a;
      this.index = e;
      this.currentFileInfo = c;
    };
    d.prototype = new l;
    d.prototype.type = "Call";
    d.prototype.accept = function(b) {
      this.args && (this.args = b.visitArray(this.args));
    };
    d.prototype.eval = function(b) {
      var a = this.args.map(function(a) {
        return a.eval(b);
      }), e = new f(this.name, b, this.index, this.currentFileInfo);
      if (e.isValid()) {
        try {
          var c = e.call(a);
          if (null != c) {
            return c;
          }
        } catch (n) {
          throw {type:n.type || "Runtime", message:"error evaluating function `" + this.name + "`" + (n.message ? ": " + n.message : ""), index:this.index, filename:this.currentFileInfo.filename};
        }
      }
      return new d(this.name, a, this.index, this.currentFileInfo);
    };
    d.prototype.genCSS = function(b, a) {
      a.add(this.name + "(", this.currentFileInfo, this.index);
      for (var e = 0; e < this.args.length; e++) {
        this.args[e].genCSS(b, a), e + 1 < this.args.length && a.add(", ");
      }
      a.add(")");
    };
    g.exports = d;
  }, {"../functions/function-caller":20, "./node":69}], 49:[function(c, g, l) {
    function f(a) {
      return "#" + a.map(function(a) {
        a = Math.min(Math.max(Math.round(a), 0), 255);
        return (16 > a ? "0" : "") + a.toString(16);
      }).join("");
    }
    l = c("./node");
    var d = c("../data/colors"), b = function(a, b, c) {
      Array.isArray(a) ? this.rgb = a : this.rgb = 6 == a.length ? a.match(/.{2}/g).map(function(a) {
        return parseInt(a, 16);
      }) : a.split("").map(function(a) {
        return parseInt(a + a, 16);
      });
      this.alpha = "number" === typeof b ? b : 1;
      "undefined" !== typeof c && (this.value = c);
    };
    b.prototype = new l;
    b.prototype.type = "Color";
    b.prototype.luma = function() {
      var a = this.rgb[0] / 255, b = this.rgb[1] / 255, c = this.rgb[2] / 255;
      a = 0.03928 >= a ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
      b = 0.03928 >= b ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
      c = 0.03928 >= c ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      return 0.2126 * a + 0.7152 * b + 0.0722 * c;
    };
    b.prototype.genCSS = function(a, b) {
      b.add(this.toCSS(a));
    };
    b.prototype.toCSS = function(a, b) {
      b = a && a.compress && !b;
      if (this.value) {
        return this.value;
      }
      a = this.fround(a, this.alpha);
      if (1 > a) {
        return "rgba(" + this.rgb.map(function(a) {
          return Math.min(Math.max(Math.round(a), 0), 255);
        }).concat(Math.min(Math.max(a, 0), 1)).join("," + (b ? "" : " ")) + ")";
      }
      a = this.toRGB();
      b && (b = a.split(""), b[1] === b[2] && b[3] === b[4] && b[5] === b[6] && (a = "#" + b[1] + b[3] + b[5]));
      return a;
    };
    b.prototype.operate = function(a, c, d) {
      for (var e = [], k = this.alpha * (1 - d.alpha) + d.alpha, f = 0; 3 > f; f++) {
        e[f] = this._operate(a, c, this.rgb[f], d.rgb[f]);
      }
      return new b(e, k);
    };
    b.prototype.toRGB = function() {
      return f(this.rgb);
    };
    b.prototype.toHSL = function() {
      var a = this.rgb[0] / 255, b = this.rgb[1] / 255, c = this.rgb[2] / 255, d = this.alpha, p = Math.max(a, b, c), f = Math.min(a, b, c), h = (p + f) / 2, u = p - f;
      if (p === f) {
        var r = f = 0;
      } else {
        f = 0.5 < h ? u / (2 - p - f) : u / (p + f);
        switch(p) {
          case a:
            r = (b - c) / u + (b < c ? 6 : 0);
            break;
          case b:
            r = (c - a) / u + 2;
            break;
          case c:
            r = (a - b) / u + 4;
        }
        r /= 6;
      }
      return {h:360 * r, s:f, l:h, a:d};
    };
    b.prototype.toHSV = function() {
      var a = this.rgb[0] / 255, b = this.rgb[1] / 255, c = this.rgb[2] / 255, d = this.alpha, p = Math.max(a, b, c), f = Math.min(a, b, c), h = p - f;
      if (p === f) {
        var u = 0;
      } else {
        switch(p) {
          case a:
            u = (b - c) / h + (b < c ? 6 : 0);
            break;
          case b:
            u = (c - a) / h + 2;
            break;
          case c:
            u = (a - b) / h + 4;
        }
        u /= 6;
      }
      return {h:360 * u, s:0 === p ? 0 : h / p, v:p, a:d};
    };
    b.prototype.toARGB = function() {
      return f([255 * this.alpha].concat(this.rgb));
    };
    b.prototype.compare = function(a) {
      return a.rgb && a.rgb[0] === this.rgb[0] && a.rgb[1] === this.rgb[1] && a.rgb[2] === this.rgb[2] && a.alpha === this.alpha ? 0 : void 0;
    };
    b.fromKeyword = function(a) {
      var c, k = a.toLowerCase();
      d.hasOwnProperty(k) ? c = new b(d[k].slice(1)) : "transparent" === k && (c = new b([0, 0, 0], 0));
      if (c) {
        return c.value = a, c;
      }
    };
    g.exports = b;
  }, {"../data/colors":11, "./node":69}], 50:[function(c, g, l) {
    c = c("./node");
    l = function(c) {
      " " === c ? (this.value = " ", this.emptyOrWhitespace = !0) : (this.value = c ? c.trim() : "", this.emptyOrWhitespace = "" === this.value);
    };
    l.prototype = new c;
    l.prototype.type = "Combinator";
    var f = {"":!0, " ":!0, "|":!0};
    l.prototype.genCSS = function(c, b) {
      c = c.compress || f[this.value] ? "" : " ";
      b.add(c + this.value + c);
    };
    g.exports = l;
  }, {"./node":69}], 51:[function(c, g, l) {
    l = c("./node");
    var f = c("./debug-info");
    c = function(c, b, a, e) {
      this.value = c;
      this.isLineComment = b;
      this.currentFileInfo = e;
    };
    c.prototype = new l;
    c.prototype.type = "Comment";
    c.prototype.genCSS = function(c, b) {
      this.debugInfo && b.add(f(c, this), this.currentFileInfo, this.index);
      b.add(this.value);
    };
    c.prototype.isSilent = function(c) {
      var b = this.currentFileInfo && this.currentFileInfo.reference && !this.isReferenced;
      c = c.compress && "!" !== this.value[2];
      return this.isLineComment || b || c;
    };
    c.prototype.markReferenced = function() {
      this.isReferenced = !0;
    };
    g.exports = c;
  }, {"./debug-info":53, "./node":69}], 52:[function(c, g, l) {
    var f = c("./node");
    c = function(c, b, a, e, k) {
      this.op = c.trim();
      this.lvalue = b;
      this.rvalue = a;
      this.index = e;
      this.negate = k;
    };
    c.prototype = new f;
    c.prototype.type = "Condition";
    c.prototype.accept = function(c) {
      this.lvalue = c.visit(this.lvalue);
      this.rvalue = c.visit(this.rvalue);
    };
    c.prototype.eval = function(c) {
      c = function(b, a, c) {
        switch(b) {
          case "and":
            return a && c;
          case "or":
            return a || c;
          default:
            switch(f.compare(a, c)) {
              case -1:
                return "\x3c" === b || "\x3d\x3c" === b || "\x3c\x3d" === b;
              case 0:
                return "\x3d" === b || "\x3e\x3d" === b || "\x3d\x3c" === b || "\x3c\x3d" === b;
              case 1:
                return "\x3e" === b || "\x3e\x3d" === b;
              default:
                return !1;
            }
        }
      }(this.op, this.lvalue.eval(c), this.rvalue.eval(c));
      return this.negate ? !c : c;
    };
    g.exports = c;
  }, {"./node":69}], 53:[function(c, g, l) {
    var f = function(c, b, a) {
      var e = "";
      if (c.dumpLineNumbers && !c.compress) {
        switch(c.dumpLineNumbers) {
          case "comments":
            e = f.asComment(b);
            break;
          case "mediaquery":
            e = f.asMediaQuery(b);
            break;
          case "all":
            e = f.asComment(b) + (a || "") + f.asMediaQuery(b);
        }
      }
      return e;
    };
    f.asComment = function(c) {
      return "/* line " + c.debugInfo.lineNumber + ", " + c.debugInfo.fileName + " */\n";
    };
    f.asMediaQuery = function(c) {
      var b = c.debugInfo.fileName;
      /^[a-z]+:\/\//i.test(b) || (b = "file://" + b);
      return "@media -sass-debug-info{filename{font-family:" + b.replace(/([.:\/\\])/g, function(a) {
        "\\" == a && (a = "/");
        return "\\" + a;
      }) + "}line{font-family:\\00003" + c.debugInfo.lineNumber + "}}\n";
    };
    g.exports = f;
  }, {}], 54:[function(c, g, l) {
    l = c("./node");
    var f = c("../contexts"), d = function(b, a) {
      this.ruleset = b;
      this.frames = a;
    };
    d.prototype = new l;
    d.prototype.type = "DetachedRuleset";
    d.prototype.evalFirst = !0;
    d.prototype.accept = function(b) {
      this.ruleset = b.visit(this.ruleset);
    };
    d.prototype.eval = function(b) {
      b = this.frames || b.frames.slice(0);
      return new d(this.ruleset, b);
    };
    d.prototype.callEval = function(b) {
      return this.ruleset.eval(this.frames ? new f.Eval(b, this.frames.concat(b.frames)) : b);
    };
    g.exports = d;
  }, {"../contexts":10, "./node":69}], 55:[function(c, g, l) {
    var f = c("./node"), d = c("../data/unit-conversions"), b = c("./unit"), a = c("./color"), e = function(a, c) {
      this.value = parseFloat(a);
      this.unit = c && c instanceof b ? c : new b(c ? [c] : void 0);
    };
    e.prototype = new f;
    e.prototype.type = "Dimension";
    e.prototype.accept = function(a) {
      this.unit = a.visit(this.unit);
    };
    e.prototype.eval = function(a) {
      return this;
    };
    e.prototype.toColor = function() {
      return new a([this.value, this.value, this.value]);
    };
    e.prototype.genCSS = function(a, b) {
      if (a && a.strictUnits && !this.unit.isSingular()) {
        throw Error("Multiple units in dimension. Correct the units or use the unit function. Bad unit: " + this.unit.toString());
      }
      var c = this.fround(a, this.value), e = String(c);
      0 !== c && 0.000001 > c && -0.000001 < c && (e = c.toFixed(20).replace(/0+$/, ""));
      if (a && a.compress) {
        if (0 === c && this.unit.isLength()) {
          b.add(e);
          return;
        }
        0 < c && 1 > c && (e = e.substr(1));
      }
      b.add(e);
      this.unit.genCSS(a, b);
    };
    e.prototype.operate = function(a, b, c) {
      var d = this._operate(a, b, this.value, c.value), h = this.unit.clone();
      if ("+" === b || "-" === b) {
        if (0 === h.numerator.length && 0 === h.denominator.length) {
          h = c.unit.clone(), this.unit.backupUnit && (h.backupUnit = this.unit.backupUnit);
        } else {
          if (0 !== c.unit.numerator.length || 0 !== h.denominator.length) {
            c = c.convertTo(this.unit.usedUnits());
            if (a.strictUnits && c.unit.toString() !== h.toString()) {
              throw Error("Incompatible units. Change the units or use the unit function. Bad units: '" + h.toString() + "' and '" + c.unit.toString() + "'.");
            }
            d = this._operate(a, b, this.value, c.value);
          }
        }
      } else {
        "*" === b ? (h.numerator = h.numerator.concat(c.unit.numerator).sort(), h.denominator = h.denominator.concat(c.unit.denominator).sort(), h.cancel()) : "/" === b && (h.numerator = h.numerator.concat(c.unit.denominator).sort(), h.denominator = h.denominator.concat(c.unit.numerator).sort(), h.cancel());
      }
      return new e(d, h);
    };
    e.prototype.compare = function(a) {
      if (a instanceof e) {
        if (this.unit.isEmpty() || a.unit.isEmpty()) {
          var b = this;
        } else {
          if (b = this.unify(), a = a.unify(), 0 !== b.unit.compare(a.unit)) {
            return;
          }
        }
        return f.numericCompare(b.value, a.value);
      }
    };
    e.prototype.unify = function() {
      return this.convertTo({length:"px", duration:"s", angle:"rad"});
    };
    e.prototype.convertTo = function(a) {
      var b = this.value, c = this.unit.clone(), k, h = {};
      if ("string" === typeof a) {
        for (f in d) {
          d[f].hasOwnProperty(a) && (h = {}, h[f] = a);
        }
        a = h;
      }
      var f = function(a, c) {
        return t.hasOwnProperty(a) ? (b = c ? b / (t[a] / t[r]) : t[a] / t[r] * b, r) : a;
      };
      for (k in a) {
        if (a.hasOwnProperty(k)) {
          var r = a[k];
          var t = d[k];
          c.map(f);
        }
      }
      c.cancel();
      return new e(b, c);
    };
    g.exports = e;
  }, {"../data/unit-conversions":13, "./color":49, "./node":69, "./unit":78}], 56:[function(c, g, l) {
    l = c("./node");
    var f = c("./selector"), d = c("./ruleset"), b = function(a, b, c, d, p, q, h, u) {
      this.name = a;
      this.value = b;
      if (c) {
        for (Array.isArray(c) ? this.rules = c : (this.rules = [c], this.rules[0].selectors = (new f([], null, null, this.index, p)).createEmptySelectors()), a = 0; a < this.rules.length; a++) {
          this.rules[a].allowImports = !0;
        }
      }
      this.index = d;
      this.currentFileInfo = p;
      this.debugInfo = q;
      this.isReferenced = h;
      this.isRooted = u || !1;
    };
    b.prototype = new l;
    b.prototype.type = "Directive";
    b.prototype.accept = function(a) {
      var b = this.value, c = this.rules;
      c && (this.rules = a.visitArray(c));
      b && (this.value = a.visit(b));
    };
    b.prototype.isRulesetLike = function() {
      return this.rules || !this.isCharset();
    };
    b.prototype.isCharset = function() {
      return "@charset" === this.name;
    };
    b.prototype.genCSS = function(a, b) {
      var c = this.value, e = this.rules;
      b.add(this.name, this.currentFileInfo, this.index);
      c && (b.add(" "), c.genCSS(a, b));
      e ? this.outputRuleset(a, b, e) : b.add(";");
    };
    b.prototype.eval = function(a) {
      var c = this.value, d = this.rules;
      var n = a.mediaPath;
      var f = a.mediaBlocks;
      a.mediaPath = [];
      a.mediaBlocks = [];
      c && (c = c.eval(a));
      d && (d = [d[0].eval(a)], d[0].root = !0);
      a.mediaPath = n;
      a.mediaBlocks = f;
      return new b(this.name, c, d, this.index, this.currentFileInfo, this.debugInfo, this.isReferenced, this.isRooted);
    };
    b.prototype.variable = function(a) {
      if (this.rules) {
        return d.prototype.variable.call(this.rules[0], a);
      }
    };
    b.prototype.find = function() {
      if (this.rules) {
        return d.prototype.find.apply(this.rules[0], arguments);
      }
    };
    b.prototype.rulesets = function() {
      if (this.rules) {
        return d.prototype.rulesets.apply(this.rules[0]);
      }
    };
    b.prototype.markReferenced = function() {
      var a;
      this.isReferenced = !0;
      if (this.rules) {
        var b = this.rules;
        for (a = 0; a < b.length; a++) {
          b[a].markReferenced && b[a].markReferenced();
        }
      }
    };
    b.prototype.getIsReferenced = function() {
      return !this.currentFileInfo || !this.currentFileInfo.reference || this.isReferenced;
    };
    b.prototype.outputRuleset = function(a, b, c) {
      var e = c.length, d;
      a.tabLevel = (a.tabLevel | 0) + 1;
      if (a.compress) {
        b.add("{");
        for (d = 0; d < e; d++) {
          c[d].genCSS(a, b);
        }
        b.add("}");
      } else {
        var k = "\n" + Array(a.tabLevel).join("  "), h = k + "  ";
        if (e) {
          b.add(" {" + h);
          c[0].genCSS(a, b);
          for (d = 1; d < e; d++) {
            b.add(h), c[d].genCSS(a, b);
          }
          b.add(k + "}");
        } else {
          b.add(" {" + k + "}");
        }
      }
      a.tabLevel--;
    };
    g.exports = b;
  }, {"./node":69, "./ruleset":75, "./selector":76}], 57:[function(c, g, l) {
    l = c("./node");
    var f = c("./paren"), d = c("./combinator"), b = function(a, b, c, n) {
      this.combinator = a instanceof d ? a : new d(a);
      this.value = "string" === typeof b ? b.trim() : b ? b : "";
      this.index = c;
      this.currentFileInfo = n;
    };
    b.prototype = new l;
    b.prototype.type = "Element";
    b.prototype.accept = function(a) {
      var b = this.value;
      this.combinator = a.visit(this.combinator);
      "object" === typeof b && (this.value = a.visit(b));
    };
    b.prototype.eval = function(a) {
      return new b(this.combinator, this.value.eval ? this.value.eval(a) : this.value, this.index, this.currentFileInfo);
    };
    b.prototype.genCSS = function(a, b) {
      b.add(this.toCSS(a), this.currentFileInfo, this.index);
    };
    b.prototype.toCSS = function(a) {
      a = a || {};
      var b = this.value, c = a.firstSelector;
      b instanceof f && (a.firstSelector = !0);
      b = b.toCSS ? b.toCSS(a) : b;
      a.firstSelector = c;
      return "" === b && "\x26" === this.combinator.value.charAt(0) ? "" : this.combinator.toCSS(a) + b;
    };
    g.exports = b;
  }, {"./combinator":50, "./node":69, "./paren":71}], 58:[function(c, g, l) {
    l = c("./node");
    var f = c("./paren"), d = c("./comment"), b = function(a) {
      this.value = a;
      if (!a) {
        throw Error("Expression requires an array parameter");
      }
    };
    b.prototype = new l;
    b.prototype.type = "Expression";
    b.prototype.accept = function(a) {
      this.value = a.visitArray(this.value);
    };
    b.prototype.eval = function(a) {
      var c = this.parens && !this.parensInOp, d = !1;
      c && a.inParenthesis();
      if (1 < this.value.length) {
        var n = new b(this.value.map(function(b) {
          return b.eval(a);
        }));
      } else {
        1 === this.value.length ? (this.value[0].parens && !this.value[0].parensInOp && (d = !0), n = this.value[0].eval(a)) : n = this;
      }
      c && a.outOfParenthesis();
      this.parens && this.parensInOp && !a.isMathOn() && !d && (n = new f(n));
      return n;
    };
    b.prototype.genCSS = function(a, b) {
      for (var c = 0; c < this.value.length; c++) {
        this.value[c].genCSS(a, b), c + 1 < this.value.length && b.add(" ");
      }
    };
    b.prototype.throwAwayComments = function() {
      this.value = this.value.filter(function(a) {
        return !(a instanceof d);
      });
    };
    b.prototype.markReferenced = function() {
      this.value.forEach(function(a) {
        a.markReferenced && a.markReferenced();
      });
    };
    g.exports = b;
  }, {"./comment":51, "./node":69, "./paren":71}], 59:[function(c, g, l) {
    c = c("./node");
    var f = function k(b, a, c) {
      this.selector = b;
      this.option = a;
      this.index = c;
      this.object_id = k.next_id++;
      this.parent_ids = [this.object_id];
      switch(a) {
        case "all":
          this.allowAfter = this.allowBefore = !0;
          break;
        default:
          this.allowAfter = this.allowBefore = !1;
      }
    };
    f.next_id = 0;
    f.prototype = new c;
    f.prototype.type = "Extend";
    f.prototype.accept = function(b) {
      this.selector = b.visit(this.selector);
    };
    f.prototype.eval = function(b) {
      return new f(this.selector.eval(b), this.option, this.index);
    };
    f.prototype.clone = function(b) {
      return new f(this.selector, this.option, this.index);
    };
    f.prototype.findSelfSelectors = function(b) {
      var a = [], c;
      for (c = 0; c < b.length; c++) {
        var k = b[c].elements;
        0 < c && k.length && "" === k[0].combinator.value && (k[0].combinator.value = " ");
        a = a.concat(b[c].elements);
      }
      this.selfSelectors = [{elements:a}];
    };
    g.exports = f;
  }, {"./node":69}], 60:[function(c, g, l) {
    l = c("./node");
    var f = c("./media"), d = c("./url"), b = c("./quoted"), a = c("./ruleset"), e = c("./anonymous"), k = function(a, b, c, e, d) {
      this.options = c;
      this.index = e;
      this.path = a;
      this.features = b;
      this.currentFileInfo = d;
      void 0 !== this.options.less || this.options.inline ? this.css = !this.options.less || this.options.inline : (a = this.getPath()) && /[#\.&\?\/]css([\?;].*)?$/.test(a) && (this.css = !0);
    };
    k.prototype = new l;
    k.prototype.type = "Import";
    k.prototype.accept = function(a) {
      this.features && (this.features = a.visit(this.features));
      this.path = a.visit(this.path);
      this.options.plugin || this.options.inline || !this.root || (this.root = a.visit(this.root));
    };
    k.prototype.genCSS = function(a, b) {
      this.css && void 0 === this.path.currentFileInfo.reference && (b.add("@import ", this.currentFileInfo, this.index), this.path.genCSS(a, b), this.features && (b.add(" "), this.features.genCSS(a, b)), b.add(";"));
    };
    k.prototype.getPath = function() {
      return this.path instanceof d ? this.path.value.value : this.path.value;
    };
    k.prototype.isVariableImport = function() {
      var a = this.path;
      a instanceof d && (a = a.value);
      return a instanceof b ? a.containsVariables() : !0;
    };
    k.prototype.evalForImport = function(a) {
      var b = this.path;
      b instanceof d && (b = b.value);
      return new k(b.eval(a), this.features, this.options, this.index, this.currentFileInfo);
    };
    k.prototype.evalPath = function(a) {
      var b = this.path.eval(a), c = this.currentFileInfo && this.currentFileInfo.rootpath;
      if (!(b instanceof d)) {
        if (c) {
          var e = b.value;
          e && a.isPathRelative(e) && (b.value = c + e);
        }
        b.value = a.normalizePath(b.value);
      }
      return b;
    };
    k.prototype.eval = function(b) {
      var c = this.features && this.features.eval(b);
      if (this.options.plugin) {
        return (b = b.frames[0] && b.frames[0].functionRegistry) && this.root && this.root.functions && b.addMultiple(this.root.functions), [];
      }
      if (this.skip && ("function" === typeof this.skip && (this.skip = this.skip()), this.skip)) {
        return [];
      }
      if (this.options.inline) {
        return b = new e(this.root, 0, {filename:this.importedFilename, reference:this.path.currentFileInfo && this.path.currentFileInfo.reference}, !0, !0, !1), this.features ? new f([b], this.features.value) : [b];
      }
      if (this.css) {
        b = new k(this.evalPath(b), c, this.options, this.index);
        if (!b.css && this.error) {
          throw this.error;
        }
        return b;
      }
      c = new a(null, this.root.rules.slice(0));
      c.evalImports(b);
      return this.features ? new f(c.rules, this.features.value) : c.rules;
    };
    g.exports = k;
  }, {"./anonymous":45, "./media":65, "./node":69, "./quoted":72, "./ruleset":75, "./url":79}], 61:[function(c, g, l) {
    l = {};
    l.Node = c("./node");
    l.Alpha = c("./alpha");
    l.Color = c("./color");
    l.Directive = c("./directive");
    l.DetachedRuleset = c("./detached-ruleset");
    l.Operation = c("./operation");
    l.Dimension = c("./dimension");
    l.Unit = c("./unit");
    l.Keyword = c("./keyword");
    l.Variable = c("./variable");
    l.Ruleset = c("./ruleset");
    l.Element = c("./element");
    l.Attribute = c("./attribute");
    l.Combinator = c("./combinator");
    l.Selector = c("./selector");
    l.Quoted = c("./quoted");
    l.Expression = c("./expression");
    l.Rule = c("./rule");
    l.Call = c("./call");
    l.URL = c("./url");
    l.Import = c("./import");
    l.mixin = {Call:c("./mixin-call"), Definition:c("./mixin-definition")};
    l.Comment = c("./comment");
    l.Anonymous = c("./anonymous");
    l.Value = c("./value");
    l.JavaScript = c("./javascript");
    l.Assignment = c("./assignment");
    l.Condition = c("./condition");
    l.Paren = c("./paren");
    l.Media = c("./media");
    l.UnicodeDescriptor = c("./unicode-descriptor");
    l.Negative = c("./negative");
    l.Extend = c("./extend");
    l.RulesetCall = c("./ruleset-call");
    g.exports = l;
  }, {"./alpha":44, "./anonymous":45, "./assignment":46, "./attribute":47, "./call":48, "./color":49, "./combinator":50, "./comment":51, "./condition":52, "./detached-ruleset":54, "./dimension":55, "./directive":56, "./element":57, "./expression":58, "./extend":59, "./import":60, "./javascript":62, "./keyword":64, "./media":65, "./mixin-call":66, "./mixin-definition":67, "./negative":68, "./node":69, "./operation":70, "./paren":71, "./quoted":72, "./rule":73, "./ruleset":75, "./ruleset-call":74, 
  "./selector":76, "./unicode-descriptor":77, "./unit":78, "./url":79, "./value":80, "./variable":81}], 62:[function(c, g, l) {
    l = c("./js-eval-node");
    var f = c("./dimension"), d = c("./quoted"), b = c("./anonymous");
    c = function(a, b, c, d) {
      this.escaped = b;
      this.expression = a;
      this.index = c;
      this.currentFileInfo = d;
    };
    c.prototype = new l;
    c.prototype.type = "JavaScript";
    c.prototype.eval = function(a) {
      a = this.evaluateJavaScript(this.expression, a);
      return "number" === typeof a ? new f(a) : "string" === typeof a ? new d('"' + a + '"', a, this.escaped, this.index) : Array.isArray(a) ? new b(a.join(", ")) : new b(a);
    };
    g.exports = c;
  }, {"./anonymous":45, "./dimension":55, "./js-eval-node":63, "./quoted":72}], 63:[function(c, g, l) {
    l = c("./node");
    var f = c("./variable");
    c = function() {
    };
    c.prototype = new l;
    c.prototype.evaluateJavaScript = function(c, b) {
      var a = this, e = {};
      if (void 0 !== b.javascriptEnabled && !b.javascriptEnabled) {
        throw {message:"You are using JavaScript, which has been disabled.", filename:this.currentFileInfo.filename, index:this.index};
      }
      c = c.replace(/@\{([\w-]+)\}/g, function(c, e) {
        return a.jsify((new f("@" + e, a.index, a.currentFileInfo)).eval(b));
      });
      try {
        c = new Function("return (" + c + ")");
      } catch (q) {
        throw {message:"JavaScript evaluation error: " + q.message + " from `" + c + "`", filename:this.currentFileInfo.filename, index:this.index};
      }
      var d = b.frames[0].variables(), n;
      for (n in d) {
        d.hasOwnProperty(n) && (e[n.slice(1)] = {value:d[n].value, toJS:function() {
          return this.value.eval(b).toCSS();
        }});
      }
      try {
        var p = c.call(e);
      } catch (q) {
        throw {message:"JavaScript evaluation error: '" + q.name + ": " + q.message.replace(/["]/g, "'") + "'", filename:this.currentFileInfo.filename, index:this.index};
      }
      return p;
    };
    c.prototype.jsify = function(c) {
      return Array.isArray(c.value) && 1 < c.value.length ? "[" + c.value.map(function(b) {
        return b.toCSS();
      }).join(", ") + "]" : c.toCSS();
    };
    g.exports = c;
  }, {"./node":69, "./variable":81}], 64:[function(c, g, l) {
    c = c("./node");
    l = function(c) {
      this.value = c;
    };
    l.prototype = new c;
    l.prototype.type = "Keyword";
    l.prototype.genCSS = function(c, d) {
      if ("%" === this.value) {
        throw {type:"Syntax", message:"Invalid % without number"};
      }
      d.add(this.value);
    };
    l.True = new l("true");
    l.False = new l("false");
    g.exports = l;
  }, {"./node":69}], 65:[function(c, g, l) {
    var f = c("./ruleset"), d = c("./value"), b = c("./selector"), a = c("./anonymous"), e = c("./expression");
    c = c("./directive");
    var k = function(a, c, e, h) {
      this.index = e;
      this.currentFileInfo = h;
      e = (new b([], null, null, this.index, this.currentFileInfo)).createEmptySelectors();
      this.features = new d(c);
      this.rules = [new f(e, a)];
      this.rules[0].allowImports = !0;
    };
    k.prototype = new c;
    k.prototype.type = "Media";
    k.prototype.isRulesetLike = !0;
    k.prototype.accept = function(a) {
      this.features && (this.features = a.visit(this.features));
      this.rules && (this.rules = a.visitArray(this.rules));
    };
    k.prototype.genCSS = function(a, b) {
      b.add("@media ", this.currentFileInfo, this.index);
      this.features.genCSS(a, b);
      this.outputRuleset(a, b, this.rules);
    };
    k.prototype.eval = function(a) {
      a.mediaBlocks || (a.mediaBlocks = [], a.mediaPath = []);
      var b = new k(null, [], this.index, this.currentFileInfo);
      this.debugInfo && (this.rules[0].debugInfo = this.debugInfo, b.debugInfo = this.debugInfo);
      var c = !1;
      a.strictMath || (c = !0, a.strictMath = !0);
      try {
        b.features = this.features.eval(a);
      } finally {
        c && (a.strictMath = !1);
      }
      a.mediaPath.push(b);
      a.mediaBlocks.push(b);
      this.rules[0].functionRegistry = a.frames[0].functionRegistry.inherit();
      a.frames.unshift(this.rules[0]);
      b.rules = [this.rules[0].eval(a)];
      a.frames.shift();
      a.mediaPath.pop();
      return 0 === a.mediaPath.length ? b.evalTop(a) : b.evalNested(a);
    };
    k.prototype.evalTop = function(a) {
      var c = this;
      1 < a.mediaBlocks.length && (c = (new b([], null, null, this.index, this.currentFileInfo)).createEmptySelectors(), c = new f(c, a.mediaBlocks), c.multiMedia = !0);
      delete a.mediaBlocks;
      delete a.mediaPath;
      return c;
    };
    k.prototype.evalNested = function(b) {
      var c, k = b.mediaPath.concat([this]);
      for (c = 0; c < k.length; c++) {
        b = k[c].features instanceof d ? k[c].features.value : k[c].features, k[c] = Array.isArray(b) ? b : [b];
      }
      this.features = new d(this.permute(k).map(function(b) {
        b = b.map(function(b) {
          return b.toCSS ? b : new a(b);
        });
        for (c = b.length - 1; 0 < c; c--) {
          b.splice(c, 0, new a("and"));
        }
        return new e(b);
      }));
      return new f([], []);
    };
    k.prototype.permute = function(a) {
      if (0 === a.length) {
        return [];
      }
      if (1 === a.length) {
        return a[0];
      }
      for (var b = [], c = this.permute(a.slice(1)), e = 0; e < c.length; e++) {
        for (var d = 0; d < a[0].length; d++) {
          b.push([a[0][d]].concat(c[e]));
        }
      }
      return b;
    };
    k.prototype.bubbleSelectors = function(a) {
      a && (this.rules = [new f(a.slice(0), [this.rules[0]])]);
    };
    g.exports = k;
  }, {"./anonymous":45, "./directive":56, "./expression":58, "./ruleset":75, "./selector":76, "./value":80}], 66:[function(c, g, l) {
    l = c("./node");
    var f = c("./selector"), d = c("./mixin-definition"), b = c("../functions/default");
    c = function(a, b, c, d, p) {
      this.selector = new f(a);
      this.arguments = b || [];
      this.index = c;
      this.currentFileInfo = d;
      this.important = p;
    };
    c.prototype = new l;
    c.prototype.type = "MixinCall";
    c.prototype.accept = function(a) {
      this.selector && (this.selector = a.visit(this.selector));
      this.arguments.length && (this.arguments = a.visitArray(this.arguments));
    };
    c.prototype.eval = function(a) {
      function c(c, e) {
        var d, h;
        for (d = 0; 2 > d; d++) {
          t[d] = !0;
          b.value(d);
          for (h = 0; h < e.length && t[d]; h++) {
            var k = e[h];
            k.matchCondition && (t[d] = t[d] && k.matchCondition(null, a));
          }
          c.matchCondition && (t[d] = t[d] && c.matchCondition(f, a));
        }
        return t[0] || t[1] ? t[0] != t[1] ? t[1] ? 1 : 2 : 0 : -1;
      }
      var k, f = [], p = [], q = !1, h, u, r = [], t = [];
      for (h = 0; h < this.arguments.length; h++) {
        var g = this.arguments[h];
        var l = g.value.eval(a);
        if (g.expand && Array.isArray(l.value)) {
          for (l = l.value, g = 0; g < l.length; g++) {
            f.push({value:l[g]});
          }
        } else {
          f.push({name:g.name, value:l});
        }
      }
      l = function(b) {
        return b.matchArgs(null, a);
      };
      for (h = 0; h < a.frames.length; h++) {
        if (0 < (k = a.frames[h].find(this.selector, null, l)).length) {
          var m = !0;
          for (g = 0; g < k.length; g++) {
            var w = k[g].rule;
            var y = k[g].path;
            var z = !1;
            for (u = 0; u < a.frames.length; u++) {
              if (!(w instanceof d) && w === (a.frames[u].originalRuleset || a.frames[u])) {
                z = !0;
                break;
              }
            }
            !z && w.matchArgs(f, a) && (y = {mixin:w, group:c(w, y)}, -1 !== y.group && r.push(y), q = !0);
          }
          b.reset();
          y = [0, 0, 0];
          for (g = 0; g < r.length; g++) {
            y[r[g].group]++;
          }
          if (0 < y[0]) {
            k = 2;
          } else {
            if (k = 1, 1 < y[1] + y[2]) {
              throw {type:"Runtime", message:"Ambiguous use of `default()` found when matching for `" + this.format(f) + "`", index:this.index, filename:this.currentFileInfo.filename};
            }
          }
          for (g = 0; g < r.length; g++) {
            if (y = r[g].group, 0 === y || y === k) {
              try {
                w = r[g].mixin;
                if (!(w instanceof d)) {
                  var A = w.originalRuleset || w;
                  w = new d("", [], w.rules, null, !1);
                  w.originalRuleset = A;
                }
                Array.prototype.push.apply(p, w.evalCall(a, f, this.important).rules);
              } catch (D) {
                throw {message:D.message, index:this.index, filename:this.currentFileInfo.filename, stack:D.stack};
              }
            }
          }
          if (q) {
            if (!this.currentFileInfo || !this.currentFileInfo.reference) {
              for (h = 0; h < p.length; h++) {
                w = p[h], w.markReferenced && w.markReferenced();
              }
            }
            return p;
          }
        }
      }
      if (m) {
        throw {type:"Runtime", message:"No matching definition was found for `" + this.format(f) + "`", index:this.index, filename:this.currentFileInfo.filename};
      }
      throw {type:"Name", message:this.selector.toCSS().trim() + " is undefined", index:this.index, filename:this.currentFileInfo.filename};
    };
    c.prototype.format = function(a) {
      return this.selector.toCSS().trim() + "(" + (a ? a.map(function(a) {
        var b = "";
        a.name && (b += a.name + ":");
        return b = a.value.toCSS ? b + a.value.toCSS() : b + "???";
      }).join(", ") : "") + ")";
    };
    g.exports = c;
  }, {"../functions/default":19, "./mixin-definition":67, "./node":69, "./selector":76}], 67:[function(c, g, l) {
    var f = c("./selector"), d = c("./element"), b = c("./ruleset"), a = c("./rule"), e = c("./expression"), k = c("../contexts"), n = function(a, b, c, e, k, n) {
      this.name = a;
      this.selectors = [new f([new d(null, a, this.index, this.currentFileInfo)])];
      this.params = b;
      this.condition = e;
      this.variadic = k;
      this.arity = b.length;
      this.rules = c;
      this._lookups = {};
      var h = [];
      this.required = b.reduce(function(a, b) {
        if (!b.name || b.name && !b.value) {
          return a + 1;
        }
        h.push(b.name);
        return a;
      }, 0);
      this.optionalParameters = h;
      this.frames = n;
    };
    n.prototype = new b;
    n.prototype.type = "MixinDefinition";
    n.prototype.evalFirst = !0;
    n.prototype.accept = function(a) {
      this.params && this.params.length && (this.params = a.visitArray(this.params));
      this.rules = a.visitArray(this.rules);
      this.condition && (this.condition = a.visit(this.condition));
    };
    n.prototype.evalParams = function(c, d, h, f) {
      var n = new b(null, null), p, q = this.params.slice(0), g, m, l, u = 0;
      d.frames && d.frames[0] && d.frames[0].functionRegistry && (n.functionRegistry = d.frames[0].functionRegistry.inherit());
      d = new k.Eval(d, [n].concat(d.frames));
      if (h) {
        for (h = h.slice(0), u = h.length, g = 0; g < u; g++) {
          if (l = (p = h[g]) && p.name) {
            var z = !1;
            for (m = 0; m < q.length; m++) {
              if (!f[m] && l === q[m].name) {
                f[m] = p.value.eval(c);
                n.prependRule(new a(l, p.value.eval(c)));
                z = !0;
                break;
              }
            }
            if (z) {
              h.splice(g, 1), g--;
            } else {
              throw {type:"Runtime", message:"Named argument for " + this.name + " " + h[g].name + " not found"};
            }
          }
        }
      }
      for (g = z = 0; g < q.length; g++) {
        if (!f[g]) {
          p = h && h[z];
          if (l = q[g].name) {
            if (q[g].variadic) {
              p = [];
              for (m = z; m < u; m++) {
                p.push(h[m].value.eval(c));
              }
              n.prependRule(new a(l, (new e(p)).eval(c)));
            } else {
              if (m = p && p.value) {
                m = m.eval(c);
              } else {
                if (q[g].value) {
                  m = q[g].value.eval(d), n.resetCache();
                } else {
                  throw {type:"Runtime", message:"wrong number of arguments for " + this.name + " (" + u + " for " + this.arity + ")"};
                }
              }
              n.prependRule(new a(l, m));
              f[g] = m;
            }
          }
          if (q[g].variadic && h) {
            for (m = z; m < u; m++) {
              f[m] = h[m].value.eval(c);
            }
          }
          z++;
        }
      }
      return n;
    };
    n.prototype.makeImportant = function() {
      var a = this.rules ? this.rules.map(function(a) {
        return a.makeImportant ? a.makeImportant(!0) : a;
      }) : this.rules;
      return new n(this.name, this.params, a, this.condition, this.variadic, this.frames);
    };
    n.prototype.eval = function(a) {
      return new n(this.name, this.params, this.rules, this.condition, this.variadic, this.frames || a.frames.slice(0));
    };
    n.prototype.evalCall = function(c, d, h) {
      var f = [], n = this.frames ? this.frames.concat(c.frames) : c.frames;
      d = this.evalParams(c, new k.Eval(c, n), d, f);
      d.prependRule(new a("@arguments", (new e(f)).eval(c)));
      f = this.rules.slice(0);
      f = new b(null, f);
      f.originalRuleset = this;
      f = f.eval(new k.Eval(c, [this, d].concat(n)));
      h && (f = f.makeImportant());
      return f;
    };
    n.prototype.matchCondition = function(a, b) {
      return this.condition && !this.condition.eval(new k.Eval(b, [this.evalParams(b, new k.Eval(b, this.frames ? this.frames.concat(b.frames) : b.frames), a, [])].concat(this.frames || []).concat(b.frames))) ? !1 : !0;
    };
    n.prototype.matchArgs = function(a, b) {
      var c = a && a.length || 0, e = this.optionalParameters, d = a ? a.reduce(function(a, b) {
        return 0 > e.indexOf(b.name) ? a + 1 : a;
      }, 0) : 0;
      if (!this.variadic) {
        if (d < this.required || c > this.params.length) {
          return !1;
        }
      } else {
        if (d < this.required - 1) {
          return !1;
        }
      }
      c = Math.min(d, this.arity);
      for (d = 0; d < c; d++) {
        if (!this.params[d].name && !this.params[d].variadic && a[d].value.eval(b).toCSS() != this.params[d].value.eval(b).toCSS()) {
          return !1;
        }
      }
      return !0;
    };
    g.exports = n;
  }, {"../contexts":10, "./element":57, "./expression":58, "./rule":73, "./ruleset":75, "./selector":76}], 68:[function(c, g, l) {
    l = c("./node");
    var f = c("./operation"), d = c("./dimension"), b = function(a) {
      this.value = a;
    };
    b.prototype = new l;
    b.prototype.type = "Negative";
    b.prototype.genCSS = function(a, b) {
      b.add("-");
      this.value.genCSS(a, b);
    };
    b.prototype.eval = function(a) {
      return a.isMathOn() ? (new f("*", [new d(-1), this.value])).eval(a) : new b(this.value.eval(a));
    };
    g.exports = b;
  }, {"./dimension":55, "./node":69, "./operation":70}], 69:[function(c, g, l) {
    var f = function() {
    };
    f.prototype.toCSS = function(c) {
      var b = [];
      this.genCSS(c, {add:function(a, c, d) {
        b.push(a);
      }, isEmpty:function() {
        return 0 === b.length;
      }});
      return b.join("");
    };
    f.prototype.genCSS = function(c, b) {
      b.add(this.value);
    };
    f.prototype.accept = function(c) {
      this.value = c.visit(this.value);
    };
    f.prototype.eval = function() {
      return this;
    };
    f.prototype._operate = function(c, b, a, e) {
      switch(b) {
        case "+":
          return a + e;
        case "-":
          return a - e;
        case "*":
          return a * e;
        case "/":
          return a / e;
      }
    };
    f.prototype.fround = function(c, b) {
      c = c && c.numPrecision;
      return null == c ? b : Number((b + 2e-16).toFixed(c));
    };
    f.compare = function(c, b) {
      if (c.compare && "Quoted" !== b.type && "Anonymous" !== b.type) {
        return c.compare(b);
      }
      if (b.compare) {
        return -b.compare(c);
      }
      if (c.type === b.type) {
        c = c.value;
        b = b.value;
        if (!Array.isArray(c)) {
          return c === b ? 0 : void 0;
        }
        if (c.length === b.length) {
          for (var a = 0; a < c.length; a++) {
            if (0 !== f.compare(c[a], b[a])) {
              return;
            }
          }
          return 0;
        }
      }
    };
    f.numericCompare = function(c, b) {
      return c < b ? -1 : c === b ? 0 : c > b ? 1 : void 0;
    };
    g.exports = f;
  }, {}], 70:[function(c, g, l) {
    l = c("./node");
    var f = c("./color"), d = c("./dimension"), b = function(a, b, c) {
      this.op = a.trim();
      this.operands = b;
      this.isSpaced = c;
    };
    b.prototype = new l;
    b.prototype.type = "Operation";
    b.prototype.accept = function(a) {
      this.operands = a.visit(this.operands);
    };
    b.prototype.eval = function(a) {
      var c = this.operands[0].eval(a), k = this.operands[1].eval(a);
      if (a.isMathOn()) {
        c instanceof d && k instanceof f && (c = c.toColor());
        k instanceof d && c instanceof f && (k = k.toColor());
        if (!c.operate) {
          throw {type:"Operation", message:"Operation on an invalid type"};
        }
        return c.operate(a, this.op, k);
      }
      return new b(this.op, [c, k], this.isSpaced);
    };
    b.prototype.genCSS = function(a, b) {
      this.operands[0].genCSS(a, b);
      this.isSpaced && b.add(" ");
      b.add(this.op);
      this.isSpaced && b.add(" ");
      this.operands[1].genCSS(a, b);
    };
    g.exports = b;
  }, {"./color":49, "./dimension":55, "./node":69}], 71:[function(c, g, l) {
    c = c("./node");
    var f = function(c) {
      this.value = c;
    };
    f.prototype = new c;
    f.prototype.type = "Paren";
    f.prototype.genCSS = function(c, b) {
      b.add("(");
      this.value.genCSS(c, b);
      b.add(")");
    };
    f.prototype.eval = function(c) {
      return new f(this.value.eval(c));
    };
    g.exports = f;
  }, {"./node":69}], 72:[function(c, g, l) {
    var f = c("./node");
    l = c("./js-eval-node");
    var d = c("./variable"), b = function(a, b, c, d, f) {
      this.escaped = null == c ? !0 : c;
      this.value = b || "";
      this.quote = a.charAt(0);
      this.index = d;
      this.currentFileInfo = f;
    };
    b.prototype = new l;
    b.prototype.type = "Quoted";
    b.prototype.genCSS = function(a, b) {
      this.escaped || b.add(this.quote, this.currentFileInfo, this.index);
      b.add(this.value);
      this.escaped || b.add(this.quote);
    };
    b.prototype.containsVariables = function() {
      return this.value.match(/(`([^`]+)`)|@\{([\w-]+)\}/);
    };
    b.prototype.eval = function(a) {
      function c(a, b, c) {
        var e = a;
        do {
          a = e, e = a.replace(b, c);
        } while (a !== e);
        return e;
      }
      var k = this, f = this.value;
      f = c(f, /`([^`]+)`/g, function(b, c) {
        return String(k.evaluateJavaScript(c, a));
      });
      f = c(f, /@\{([\w-]+)\}/g, function(c, e) {
        c = (new d("@" + e, k.index, k.currentFileInfo)).eval(a, !0);
        return c instanceof b ? c.value : c.toCSS();
      });
      return new b(this.quote + f + this.quote, f, this.escaped, this.index, this.currentFileInfo);
    };
    b.prototype.compare = function(a) {
      return "Quoted" !== a.type || this.escaped || a.escaped ? a.toCSS && this.toCSS() === a.toCSS() ? 0 : void 0 : f.numericCompare(this.value, a.value);
    };
    g.exports = b;
  }, {"./js-eval-node":63, "./node":69, "./variable":81}], 73:[function(c, g, l) {
    function f(a, b) {
      var c = "", e, d = b.length, k = {add:function(a) {
        c += a;
      }};
      for (e = 0; e < d; e++) {
        b[e].eval(a).genCSS(a, k);
      }
      return c;
    }
    var d = c("./node"), b = c("./value"), a = c("./keyword"), e = function(a, c, e, h, k, f, g, l) {
      this.name = a;
      this.value = c instanceof d ? c : new b([c]);
      this.important = e ? " " + e.trim() : "";
      this.merge = h;
      this.index = k;
      this.currentFileInfo = f;
      this.inline = g || !1;
      this.variable = void 0 !== l ? l : a.charAt && "@" === a.charAt(0);
    };
    e.prototype = new d;
    e.prototype.type = "Rule";
    e.prototype.genCSS = function(a, b) {
      b.add(this.name + (a.compress ? ":" : ": "), this.currentFileInfo, this.index);
      try {
        this.value.genCSS(a, b);
      } catch (q) {
        throw q.index = this.index, q.filename = this.currentFileInfo.filename, q;
      }
      b.add(this.important + (this.inline || a.lastRule && a.compress ? "" : ";"), this.currentFileInfo, this.index);
    };
    e.prototype.eval = function(b) {
      var c = !1, d = this.name, h = this.variable;
      "string" !== typeof d && (d = 1 === d.length && d[0] instanceof a ? d[0].value : f(b, d), h = !1);
      "font" !== d || b.strictMath || (c = !0, b.strictMath = !0);
      try {
        b.importantScope.push({});
        var k = this.value.eval(b);
        if (!this.variable && "DetachedRuleset" === k.type) {
          throw {message:"Rulesets cannot be evaluated on a property.", index:this.index, filename:this.currentFileInfo.filename};
        }
        var n = this.important, g = b.importantScope.pop();
        !n && g.important && (n = g.important);
        return new e(d, k, n, this.merge, this.index, this.currentFileInfo, this.inline, h);
      } catch (x) {
        throw "number" !== typeof x.index && (x.index = this.index, x.filename = this.currentFileInfo.filename), x;
      } finally {
        c && (b.strictMath = !1);
      }
    };
    e.prototype.makeImportant = function() {
      return new e(this.name, this.value, "!important", this.merge, this.index, this.currentFileInfo, this.inline);
    };
    var k = function(a) {
      Array.isArray(a) ? a.forEach(function(a) {
        k(a);
      }) : a.markReferenced && a.markReferenced();
    };
    e.prototype.markReferenced = function() {
      this.value && k(this.value);
    };
    g.exports = e;
  }, {"./keyword":64, "./node":69, "./value":80}], 74:[function(c, g, l) {
    l = c("./node");
    var f = c("./variable");
    c = function(c) {
      this.variable = c;
    };
    c.prototype = new l;
    c.prototype.type = "RulesetCall";
    c.prototype.eval = function(c) {
      return (new f(this.variable)).eval(c).callEval(c);
    };
    g.exports = c;
  }, {"./node":69, "./variable":81}], 75:[function(c, g, l) {
    l = c("./node");
    var f = c("./rule"), d = c("./selector"), b = c("./element"), a = c("./paren"), e = c("../contexts"), k = c("../functions/function-registry"), n = c("../functions/default"), p = c("./debug-info"), q = function(a, b, c) {
      this.selectors = a;
      this.rules = b;
      this._lookups = {};
      this.strictImports = c;
    };
    q.prototype = new l;
    q.prototype.type = "Ruleset";
    q.prototype.isRuleset = !0;
    q.prototype.isRulesetLike = !0;
    q.prototype.accept = function(a) {
      this.paths ? a.visitArray(this.paths, !0) : this.selectors && (this.selectors = a.visitArray(this.selectors));
      this.rules && this.rules.length && (this.rules = a.visitArray(this.rules));
    };
    q.prototype.eval = function(a) {
      var b = this.selectors, c, e, d = !1;
      if (b && (c = b.length)) {
        var h = [];
        n.error({type:"Syntax", message:"it is currently only allowed in parametric mixin guards,"});
        for (e = 0; e < c; e++) {
          var m = b[e].eval(a);
          h.push(m);
          m.evaldCondition && (d = !0);
        }
        n.reset();
      } else {
        d = !0;
      }
      var g = this.rules ? this.rules.slice(0) : null, p = new q(h, g, this.strictImports);
      p.originalRuleset = this;
      p.root = this.root;
      p.firstRoot = this.firstRoot;
      p.allowImports = this.allowImports;
      this.debugInfo && (p.debugInfo = this.debugInfo);
      d || (g.length = 0);
      p.functionRegistry = function(a) {
        for (var b = 0, c = a.length, e; b !== c; ++b) {
          if (e = a[b].functionRegistry) {
            return e;
          }
        }
        return k;
      }(a.frames).inherit();
      d = a.frames;
      d.unshift(p);
      b = a.selectors;
      b || (a.selectors = b = []);
      b.unshift(this.selectors);
      (p.root || p.allowImports || !p.strictImports) && p.evalImports(a);
      var l = (c = p.rules) ? c.length : 0;
      for (e = 0; e < l; e++) {
        c[e].evalFirst && (c[e] = c[e].eval(a));
      }
      m = a.mediaBlocks && a.mediaBlocks.length || 0;
      for (e = 0; e < l; e++) {
        "MixinCall" === c[e].type ? (g = c[e].eval(a).filter(function(a) {
          return a instanceof f && a.variable ? !p.variable(a.name) : !0;
        }), c.splice.apply(c, [e, 1].concat(g)), l += g.length - 1, e += g.length - 1, p.resetCache()) : "RulesetCall" === c[e].type && (g = c[e].eval(a).rules.filter(function(a) {
          return a instanceof f && a.variable ? !1 : !0;
        }), c.splice.apply(c, [e, 1].concat(g)), l += g.length - 1, e += g.length - 1, p.resetCache());
      }
      for (e = 0; e < c.length; e++) {
        g = c[e], g.evalFirst || (c[e] = g = g.eval ? g.eval(a) : g);
      }
      for (e = 0; e < c.length; e++) {
        if (g = c[e], g instanceof q && g.selectors && 1 === g.selectors.length && g.selectors[0].isJustParentSelector()) {
          c.splice(e--, 1);
          for (var A = 0; A < g.rules.length; A++) {
            l = g.rules[A], l instanceof f && l.variable || c.splice(++e, 0, l);
          }
        }
      }
      d.shift();
      b.shift();
      if (a.mediaBlocks) {
        for (e = m; e < a.mediaBlocks.length; e++) {
          a.mediaBlocks[e].bubbleSelectors(h);
        }
      }
      return p;
    };
    q.prototype.evalImports = function(a) {
      var b = this.rules, c, e;
      if (b) {
        for (c = 0; c < b.length; c++) {
          "Import" === b[c].type && ((e = b[c].eval(a)) && e.length ? (b.splice.apply(b, [c, 1].concat(e)), c += e.length - 1) : b.splice(c, 1, e), this.resetCache());
        }
      }
    };
    q.prototype.makeImportant = function() {
      return new q(this.selectors, this.rules.map(function(a) {
        return a.makeImportant ? a.makeImportant() : a;
      }), this.strictImports);
    };
    q.prototype.matchArgs = function(a) {
      return !a || 0 === a.length;
    };
    q.prototype.matchCondition = function(a, b) {
      a = this.selectors[this.selectors.length - 1];
      return !a.evaldCondition || a.condition && !a.condition.eval(new e.Eval(b, b.frames)) ? !1 : !0;
    };
    q.prototype.resetCache = function() {
      this._variables = this._rulesets = null;
      this._lookups = {};
    };
    q.prototype.variables = function() {
      this._variables || (this._variables = this.rules ? this.rules.reduce(function(a, b) {
        b instanceof f && !0 === b.variable && (a[b.name] = b);
        if ("Import" === b.type && b.root && b.root.variables) {
          b = b.root.variables();
          for (var c in b) {
            b.hasOwnProperty(c) && (a[c] = b[c]);
          }
        }
        return a;
      }, {}) : {});
      return this._variables;
    };
    q.prototype.variable = function(a) {
      return this.variables()[a];
    };
    q.prototype.rulesets = function() {
      if (!this.rules) {
        return [];
      }
      var a = [], b = this.rules, c = b.length, e;
      for (e = 0; e < c; e++) {
        var d = b[e];
        d.isRuleset && a.push(d);
      }
      return a;
    };
    q.prototype.prependRule = function(a) {
      var b = this.rules;
      b ? b.unshift(a) : this.rules = [a];
    };
    q.prototype.find = function(a, b, c) {
      b = b || this;
      var e = [], h, k, f = a.toCSS();
      if (f in this._lookups) {
        return this._lookups[f];
      }
      this.rulesets().forEach(function(f) {
        if (f !== b) {
          for (var n = 0; n < f.selectors.length; n++) {
            if (h = a.match(f.selectors[n])) {
              if (a.elements.length > h) {
                if (!c || c(f)) {
                  k = f.find(new d(a.elements.slice(h)), b, c);
                  for (n = 0; n < k.length; ++n) {
                    k[n].path.push(f);
                  }
                  Array.prototype.push.apply(e, k);
                }
              } else {
                e.push({rule:f, path:[]});
              }
              break;
            }
          }
        }
      });
      return this._lookups[f] = e;
    };
    q.prototype.genCSS = function(a, b) {
      var c, e = [], d;
      a.tabLevel = a.tabLevel || 0;
      this.root || a.tabLevel++;
      var k = a.compress ? "" : Array(a.tabLevel + 1).join("  "), h = a.compress ? "" : Array(a.tabLevel).join("  "), f;
      for (c = f = d = 0; c < this.rules.length; c++) {
        var n = this.rules[c];
        "Comment" === n.type ? (f === c && f++, e.push(n)) : n.isCharset && n.isCharset() ? (e.splice(d, 0, n), d++, f++) : "Import" === n.type ? (e.splice(f, 0, n), f++) : e.push(n);
      }
      e = [].concat(e);
      if (!this.root) {
        if (c = p(a, this, h)) {
          b.add(c), b.add(h);
        }
        var g = this.paths, l = g.length, q;
        f = a.compress ? "," : ",\n" + h;
        for (c = 0; c < l; c++) {
          if (d = g[c], q = d.length) {
            for (0 < c && b.add(f), a.firstSelector = !0, d[0].genCSS(a, b), a.firstSelector = !1, n = 1; n < q; n++) {
              d[n].genCSS(a, b);
            }
          }
        }
        b.add((a.compress ? "{" : " {\n") + k);
      }
      for (c = 0; c < e.length; c++) {
        n = e[c], c + 1 === e.length && (a.lastRule = !0), d = a.lastRule, f = "boolean" === typeof n.isRulesetLike ? n.isRulesetLike : "function" === typeof n.isRulesetLike ? n.isRulesetLike() : !1, f && (a.lastRule = !1), n.genCSS ? n.genCSS(a, b) : n.value && b.add(n.value.toString()), a.lastRule = d, a.lastRule ? a.lastRule = !1 : b.add(a.compress ? "" : "\n" + k);
      }
      this.root || (b.add(a.compress ? "}" : "\n" + h + "}"), a.tabLevel--);
      b.isEmpty() || a.compress || !this.firstRoot || b.add("\n");
    };
    q.prototype.markReferenced = function() {
      var a;
      if (this.selectors) {
        for (a = 0; a < this.selectors.length; a++) {
          this.selectors[a].markReferenced();
        }
      }
      if (this.rules) {
        for (a = 0; a < this.rules.length; a++) {
          this.rules[a].markReferenced && this.rules[a].markReferenced();
        }
      }
    };
    q.prototype.getIsReferenced = function() {
      var a, b;
      if (this.paths) {
        for (a = 0; a < this.paths.length; a++) {
          var c = this.paths[a];
          for (b = 0; b < c.length; b++) {
            if (c[b].getIsReferenced && c[b].getIsReferenced()) {
              return !0;
            }
          }
        }
      }
      if (this.selectors) {
        for (a = 0; a < this.selectors.length; a++) {
          if (b = this.selectors[a], b.getIsReferenced && b.getIsReferenced()) {
            return !0;
          }
        }
      }
      return !1;
    };
    q.prototype.joinSelectors = function(a, b, c) {
      for (var e = 0; e < c.length; e++) {
        this.joinSelector(a, b, c[e]);
      }
    };
    q.prototype.joinSelector = function(c, e, k) {
      function f(c, e, k) {
        var g, m = !1;
        var p = [];
        var l = [[]];
        for (g = 0; g < k.elements.length; g++) {
          var q = k.elements[g];
          if ("\x26" !== q.value) {
            if ("Paren" !== q.value.type) {
              var r = null;
            } else {
              var t = q.value.value;
              r = "Selector" !== t.type ? null : t;
            }
            if (null != r) {
              n(p, l);
              t = [];
              var u = [];
              p = f(t, e, r);
              m = m || p;
              for (p = 0; p < t.length; p++) {
                var v = t[p], x = q;
                if (0 === v.length) {
                  r = new a(v[0]);
                } else {
                  var y = [];
                  for (r = 0; r < v.length; r++) {
                    y.push(new b(null, v[r], x.index, x.currentFileInfo));
                  }
                  r = new a(new d(y));
                }
                r = new b(null, r, q.index, q.currentFileInfo);
                v = new d([r]);
                r = l;
                x = [v];
                y = q;
                var w = k, z = u;
                for (v = 0; v < r.length; v++) {
                  var A = h(r[v], x, y, w);
                  z.push(A);
                }
              }
              l = u;
              p = [];
            } else {
              p.push(q);
            }
          } else {
            m = !0;
            t = [];
            n(p, l);
            for (u = 0; u < l.length; u++) {
              if (r = l[u], 0 === e.length) {
                0 < r.length && r[0].elements.push(new b(q.combinator, "", q.index, q.currentFileInfo)), t.push(r);
              } else {
                for (p = 0; p < e.length; p++) {
                  v = h(r, e[p], q, k), t.push(v);
                }
              }
            }
            l = t;
            p = [];
          }
        }
        n(p, l);
        for (g = 0; g < l.length; g++) {
          e = l[g].length, 0 < e && (c.push(l[g]), q = l[g][e - 1], l[g][e - 1] = q.createDerived(q.elements, k.extendList));
        }
        return m;
      }
      function h(a, c, e, d) {
        var k = [];
        0 < a.length ? (k = a.slice(0), a = k.pop(), d = d.createDerived(a.elements.slice(0))) : d = d.createDerived([]);
        if (0 < c.length) {
          a = e.combinator;
          var f = c[0].elements[0];
          a.emptyOrWhitespace && !f.combinator.emptyOrWhitespace && (a = f.combinator);
          d.elements.push(new b(a, f.value, e.index, e.currentFileInfo));
          d.elements = d.elements.concat(c[0].elements.slice(1));
        }
        0 !== d.elements.length && k.push(d);
        1 < c.length && (k = k.concat(c.slice(1)));
        return k;
      }
      function n(a, b) {
        var c;
        if (0 !== a.length) {
          if (0 === b.length) {
            b.push([new d(a)]);
          } else {
            for (c = 0; c < b.length; c++) {
              var e = b[c];
              0 < e.length ? e[e.length - 1] = e[e.length - 1].createDerived(e[e.length - 1].elements.concat(a)) : e.push(new d(a));
            }
          }
        }
      }
      var g;
      var p = [];
      if (!f(p, e, k)) {
        if (0 < e.length) {
          for (p = [], g = 0; g < e.length; g++) {
            p.push(e[g].concat(k));
          }
        } else {
          p = [[k]];
        }
      }
      for (g = 0; g < p.length; g++) {
        c.push(p[g]);
      }
    };
    g.exports = q;
  }, {"../contexts":10, "../functions/default":19, "../functions/function-registry":21, "./debug-info":53, "./element":57, "./node":69, "./paren":71, "./rule":73, "./selector":76}], 76:[function(c, g, l) {
    l = c("./node");
    var f = c("./element"), d = function(b, a, c, d, f, g) {
      this.elements = b;
      this.extendList = a;
      this.condition = c;
      this.currentFileInfo = f || {};
      this.isReferenced = g;
      c || (this.evaldCondition = !0);
    };
    d.prototype = new l;
    d.prototype.type = "Selector";
    d.prototype.accept = function(b) {
      this.elements && (this.elements = b.visitArray(this.elements));
      this.extendList && (this.extendList = b.visitArray(this.extendList));
      this.condition && (this.condition = b.visit(this.condition));
    };
    d.prototype.createDerived = function(b, a, c) {
      c = null != c ? c : this.evaldCondition;
      b = new d(b, a || this.extendList, null, this.index, this.currentFileInfo, this.isReferenced);
      b.evaldCondition = c;
      b.mediaEmpty = this.mediaEmpty;
      return b;
    };
    d.prototype.createEmptySelectors = function() {
      var b = new f("", "\x26", this.index, this.currentFileInfo);
      b = [new d([b], null, null, this.index, this.currentFileInfo)];
      b[0].mediaEmpty = !0;
      return b;
    };
    d.prototype.match = function(b) {
      var a = this.elements, c = a.length;
      b.CacheElements();
      var d = b._elements.length;
      if (0 === d || c < d) {
        return 0;
      }
      for (c = 0; c < d; c++) {
        if (a[c].value !== b._elements[c]) {
          return 0;
        }
      }
      return d;
    };
    d.prototype.CacheElements = function() {
      if (!this._elements) {
        var b = this.elements.map(function(a) {
          return a.combinator.value + (a.value.value || a.value);
        }).join("").match(/[,&#\*\.\w-]([\w-]|(\\.))*/g);
        b ? "\x26" === b[0] && b.shift() : b = [];
        this._elements = b;
      }
    };
    d.prototype.isJustParentSelector = function() {
      return !this.mediaEmpty && 1 === this.elements.length && "\x26" === this.elements[0].value && (" " === this.elements[0].combinator.value || "" === this.elements[0].combinator.value);
    };
    d.prototype.eval = function(b) {
      var a = this.condition && this.condition.eval(b), c = this.elements, d = this.extendList;
      c = c && c.map(function(a) {
        return a.eval(b);
      });
      d = d && d.map(function(a) {
        return a.eval(b);
      });
      return this.createDerived(c, d, a);
    };
    d.prototype.genCSS = function(b, a) {
      var c;
      b && b.firstSelector || "" !== this.elements[0].combinator.value || a.add(" ", this.currentFileInfo, this.index);
      if (!this._css) {
        for (c = 0; c < this.elements.length; c++) {
          var d = this.elements[c];
          d.genCSS(b, a);
        }
      }
    };
    d.prototype.markReferenced = function() {
      this.isReferenced = !0;
    };
    d.prototype.getIsReferenced = function() {
      return !this.currentFileInfo.reference || this.isReferenced;
    };
    d.prototype.getIsOutput = function() {
      return this.evaldCondition;
    };
    g.exports = d;
  }, {"./element":57, "./node":69}], 77:[function(c, g, l) {
    c = c("./node");
    l = function(c) {
      this.value = c;
    };
    l.prototype = new c;
    l.prototype.type = "UnicodeDescriptor";
    g.exports = l;
  }, {"./node":69}], 78:[function(c, g, l) {
    l = c("./node");
    var f = c("../data/unit-conversions"), d = function(b, a, c) {
      this.numerator = b ? b.slice(0).sort() : [];
      this.denominator = a ? a.slice(0).sort() : [];
      c ? this.backupUnit = c : b && b.length && (this.backupUnit = b[0]);
    };
    d.prototype = new l;
    d.prototype.type = "Unit";
    d.prototype.clone = function() {
      return new d(this.numerator.slice(0), this.denominator.slice(0), this.backupUnit);
    };
    d.prototype.genCSS = function(b, a) {
      b = b && b.strictUnits;
      1 === this.numerator.length ? a.add(this.numerator[0]) : !b && this.backupUnit ? a.add(this.backupUnit) : !b && this.denominator.length && a.add(this.denominator[0]);
    };
    d.prototype.toString = function() {
      var b, a = this.numerator.join("*");
      for (b = 0; b < this.denominator.length; b++) {
        a += "/" + this.denominator[b];
      }
      return a;
    };
    d.prototype.compare = function(b) {
      return this.is(b.toString()) ? 0 : void 0;
    };
    d.prototype.is = function(b) {
      return this.toString().toUpperCase() === b.toUpperCase();
    };
    d.prototype.isLength = function() {
      return !!this.toCSS().match(/px|em|%|in|cm|mm|pc|pt|ex/);
    };
    d.prototype.isEmpty = function() {
      return 0 === this.numerator.length && 0 === this.denominator.length;
    };
    d.prototype.isSingular = function() {
      return 1 >= this.numerator.length && 0 === this.denominator.length;
    };
    d.prototype.map = function(b) {
      var a;
      for (a = 0; a < this.numerator.length; a++) {
        this.numerator[a] = b(this.numerator[a], !1);
      }
      for (a = 0; a < this.denominator.length; a++) {
        this.denominator[a] = b(this.denominator[a], !0);
      }
    };
    d.prototype.usedUnits = function() {
      var b = {};
      var a = function(a) {
        d.hasOwnProperty(a) && !b[c] && (b[c] = a);
        return a;
      };
      for (var c in f) {
        if (f.hasOwnProperty(c)) {
          var d = f[c];
          this.map(a);
        }
      }
      return b;
    };
    d.prototype.cancel = function() {
      var b = {}, a;
      for (a = 0; a < this.numerator.length; a++) {
        var c = this.numerator[a];
        b[c] = (b[c] || 0) + 1;
      }
      for (a = 0; a < this.denominator.length; a++) {
        c = this.denominator[a], b[c] = (b[c] || 0) - 1;
      }
      this.numerator = [];
      this.denominator = [];
      for (c in b) {
        if (b.hasOwnProperty(c)) {
          var d = b[c];
          if (0 < d) {
            for (a = 0; a < d; a++) {
              this.numerator.push(c);
            }
          } else {
            if (0 > d) {
              for (a = 0; a < -d; a++) {
                this.denominator.push(c);
              }
            }
          }
        }
      }
      this.numerator.sort();
      this.denominator.sort();
    };
    g.exports = d;
  }, {"../data/unit-conversions":13, "./node":69}], 79:[function(c, g, l) {
    c = c("./node");
    var f = function(c, b, a, e) {
      this.value = c;
      this.currentFileInfo = a;
      this.index = b;
      this.isEvald = e;
    };
    f.prototype = new c;
    f.prototype.type = "Url";
    f.prototype.accept = function(c) {
      this.value = c.visit(this.value);
    };
    f.prototype.genCSS = function(c, b) {
      b.add("url(");
      this.value.genCSS(c, b);
      b.add(")");
    };
    f.prototype.eval = function(c) {
      var b = this.value.eval(c), a;
      this.isEvald || ((a = this.currentFileInfo && this.currentFileInfo.rootpath) && "string" === typeof b.value && c.isPathRelative(b.value) && (b.quote || (a = a.replace(/[\(\)'"\s]/g, function(a) {
        return "\\" + a;
      })), b.value = a + b.value), b.value = c.normalizePath(b.value), c.urlArgs && !b.value.match(/^\s*data:/) && (c = (-1 === b.value.indexOf("?") ? "?" : "\x26") + c.urlArgs, -1 !== b.value.indexOf("#") ? b.value = b.value.replace("#", c + "#") : b.value += c));
      return new f(b, this.index, this.currentFileInfo, !0);
    };
    g.exports = f;
  }, {"./node":69}], 80:[function(c, g, l) {
    c = c("./node");
    var f = function(c) {
      this.value = c;
      if (!c) {
        throw Error("Value requires an array argument");
      }
    };
    f.prototype = new c;
    f.prototype.type = "Value";
    f.prototype.accept = function(c) {
      this.value && (this.value = c.visitArray(this.value));
    };
    f.prototype.eval = function(c) {
      return 1 === this.value.length ? this.value[0].eval(c) : new f(this.value.map(function(b) {
        return b.eval(c);
      }));
    };
    f.prototype.genCSS = function(c, b) {
      var a;
      for (a = 0; a < this.value.length; a++) {
        this.value[a].genCSS(c, b), a + 1 < this.value.length && b.add(c && c.compress ? "," : ", ");
      }
    };
    g.exports = f;
  }, {"./node":69}], 81:[function(c, g, l) {
    c = c("./node");
    var f = function(c, b, a) {
      this.name = c;
      this.index = b;
      this.currentFileInfo = a || {};
    };
    f.prototype = new c;
    f.prototype.type = "Variable";
    f.prototype.eval = function(c) {
      var b, a = this.name;
      0 === a.indexOf("@@") && (a = "@" + (new f(a.slice(1), this.index, this.currentFileInfo)).eval(c).value);
      if (this.evaluating) {
        throw {type:"Name", message:"Recursive variable definition for " + a, filename:this.currentFileInfo.filename, index:this.index};
      }
      this.evaluating = !0;
      if (b = this.find(c.frames, function(b) {
        if (b = b.variable(a)) {
          return b.important && (c.importantScope[c.importantScope.length - 1].important = b.important), b.value.eval(c);
        }
      })) {
        return this.evaluating = !1, b;
      }
      throw {type:"Name", message:"variable " + a + " is undefined", filename:this.currentFileInfo.filename, index:this.index};
    };
    f.prototype.find = function(c, b) {
      for (var a = 0, e; a < c.length; a++) {
        if (e = b.call(c, c[a])) {
          return e;
        }
      }
      return null;
    };
    g.exports = f;
  }, {"./node":69}], 82:[function(c, g, l) {
    g.exports = {getLocation:function(c, d) {
      for (var b = c + 1, a = null, e = -1; 0 <= --b && "\n" !== d.charAt(b);) {
        e++;
      }
      "number" === typeof c && (a = (d.slice(0, c).match(/\n/g) || "").length);
      return {line:a, column:e};
    }};
  }, {}], 83:[function(c, g, l) {
    var f = c("../tree"), d = c("./visitor"), b = c("../logger"), a = function() {
      this._visitor = new d(this);
      this.contexts = [];
      this.allExtendsStack = [[]];
    };
    a.prototype = {run:function(a) {
      a = this._visitor.visit(a);
      a.allExtends = this.allExtendsStack[0];
      return a;
    }, visitRule:function(a, b) {
      b.visitDeeper = !1;
    }, visitMixinDefinition:function(a, b) {
      b.visitDeeper = !1;
    }, visitRuleset:function(a, b) {
      if (!a.root) {
        var c, e = [], d, k = a.rules, g = k ? k.length : 0;
        for (b = 0; b < g; b++) {
          a.rules[b] instanceof f.Extend && (e.push(k[b]), a.extendOnEveryPath = !0);
        }
        k = a.paths;
        for (b = 0; b < k.length; b++) {
          for (g = k[b], (d = (c = g[g.length - 1].extendList) ? c.slice(0).concat(e) : e) && (d = d.map(function(a) {
            return a.clone();
          })), c = 0; c < d.length; c++) {
            this.foundExtends = !0;
            var l = d[c];
            l.findSelfSelectors(g);
            l.ruleset = a;
            0 === c && (l.firstExtendOnThisSelectorPath = !0);
            this.allExtendsStack[this.allExtendsStack.length - 1].push(l);
          }
        }
        this.contexts.push(a.selectors);
      }
    }, visitRulesetOut:function(a) {
      a.root || --this.contexts.length;
    }, visitMedia:function(a, b) {
      a.allExtends = [];
      this.allExtendsStack.push(a.allExtends);
    }, visitMediaOut:function(a) {
      --this.allExtendsStack.length;
    }, visitDirective:function(a, b) {
      a.allExtends = [];
      this.allExtendsStack.push(a.allExtends);
    }, visitDirectiveOut:function(a) {
      --this.allExtendsStack.length;
    }};
    c = function() {
      this._visitor = new d(this);
    };
    c.prototype = {run:function(b) {
      var c = new a;
      this.extendIndicies = {};
      c.run(b);
      if (!c.foundExtends) {
        return b;
      }
      b.allExtends = b.allExtends.concat(this.doExtendChaining(b.allExtends, b.allExtends));
      this.allExtendsStack = [b.allExtends];
      c = this._visitor.visit(b);
      this.checkExtendsForNonMatched(b.allExtends);
      return c;
    }, checkExtendsForNonMatched:function(a) {
      var c = this.extendIndicies;
      a.filter(function(a) {
        return !a.hasFoundMatches && 1 == a.parent_ids.length;
      }).forEach(function(a) {
        var e = "_unknown_";
        try {
          e = a.selector.toCSS({});
        } catch (q) {
        }
        c[a.index + " " + e] || (c[a.index + " " + e] = !0, b.warn("extend '" + e + "' has no matches"));
      });
    }, doExtendChaining:function(a, b, c) {
      var e, d, h = [], k, g = this, n;
      c = c || 0;
      for (e = 0; e < a.length; e++) {
        for (d = 0; d < b.length; d++) {
          var l = a[e];
          var v = b[d];
          if (!(0 <= l.parent_ids.indexOf(v.object_id))) {
            var m = [v.selfSelectors[0]];
            var w = g.findMatch(l, m);
            w.length && (l.hasFoundMatches = !0, l.selfSelectors.forEach(function(a) {
              k = g.extendSelector(w, m, a);
              n = new f.Extend(v.selector, v.option, 0);
              n.selfSelectors = k;
              k[k.length - 1].extendList = [n];
              h.push(n);
              n.ruleset = v.ruleset;
              n.parent_ids = n.parent_ids.concat(v.parent_ids, l.parent_ids);
              v.firstExtendOnThisSelectorPath && (n.firstExtendOnThisSelectorPath = !0, v.ruleset.paths.push(k));
            }));
          }
        }
      }
      if (h.length) {
        this.extendChainCount++;
        if (100 < c) {
          b = a = "{unable to calculate}";
          try {
            a = h[0].selfSelectors[0].toCSS(), b = h[0].selector.toCSS();
          } catch (y) {
          }
          throw {message:"extend circular reference detected. One of the circular extends is currently:" + a + ":extend(" + b + ")"};
        }
        return h.concat(g.doExtendChaining(h, b, c + 1));
      }
      return h;
    }, visitRule:function(a, b) {
      b.visitDeeper = !1;
    }, visitMixinDefinition:function(a, b) {
      b.visitDeeper = !1;
    }, visitSelector:function(a, b) {
      b.visitDeeper = !1;
    }, visitRuleset:function(a, b) {
      if (!a.root) {
        var c, e = this.allExtendsStack[this.allExtendsStack.length - 1], d = [], f = this;
        for (c = 0; c < e.length; c++) {
          for (b = 0; b < a.paths.length; b++) {
            var k = a.paths[b];
            if (!a.extendOnEveryPath) {
              var g = k[k.length - 1].extendList;
              if (!g || !g.length) {
                var l = this.findMatch(e[c], k);
                l.length && (e[c].hasFoundMatches = !0, e[c].selfSelectors.forEach(function(a) {
                  d.push(f.extendSelector(l, k, a));
                }));
              }
            }
          }
        }
        a.paths = a.paths.concat(d);
      }
    }, findMatch:function(a, b) {
      var c, e, d, f = a.selector.elements, k = [], g = [];
      for (c = 0; c < b.length; c++) {
        var l = b[c];
        for (e = 0; e < l.elements.length; e++) {
          var x = l.elements[e];
          (a.allowBefore || 0 === c && 0 === e) && k.push({pathIndex:c, index:e, matched:0, initialCombinator:x.combinator});
          for (d = 0; d < k.length; d++) {
            var v = k[d];
            var m = x.combinator.value;
            "" === m && 0 === e && (m = " ");
            !this.isElementValuesEqual(f[v.matched].value, x.value) || 0 < v.matched && f[v.matched].combinator.value !== m ? v = null : v.matched++;
            v && (v.finished = v.matched === f.length, v.finished && !a.allowAfter && (e + 1 < l.elements.length || c + 1 < b.length) && (v = null));
            v ? v.finished && (v.length = f.length, v.endPathIndex = c, v.endPathElementIndex = e + 1, k.length = 0, g.push(v)) : (k.splice(d, 1), d--);
          }
        }
      }
      return g;
    }, isElementValuesEqual:function(a, b) {
      if ("string" === typeof a || "string" === typeof b) {
        return a === b;
      }
      if (a instanceof f.Attribute) {
        if (a.op !== b.op || a.key !== b.key) {
          return !1;
        }
        if (!a.value || !b.value) {
          return a.value || b.value ? !1 : !0;
        }
        a = a.value.value || a.value;
        b = b.value.value || b.value;
        return a === b;
      }
      a = a.value;
      b = b.value;
      if (a instanceof f.Selector) {
        if (!(b instanceof f.Selector) || a.elements.length !== b.elements.length) {
          return !1;
        }
        for (var c = 0; c < a.elements.length; c++) {
          if (a.elements[c].combinator.value !== b.elements[c].combinator.value && (0 !== c || (a.elements[c].combinator.value || " ") !== (b.elements[c].combinator.value || " ")) || !this.isElementValuesEqual(a.elements[c].value, b.elements[c].value)) {
            return !1;
          }
        }
        return !0;
      }
      return !1;
    }, extendSelector:function(a, b, c) {
      var e = 0, d = 0, h = [], k;
      for (k = 0; k < a.length; k++) {
        var g = a[k];
        var n = b[g.pathIndex];
        var l = new f.Element(g.initialCombinator, c.elements[0].value, c.elements[0].index, c.elements[0].currentFileInfo);
        g.pathIndex > e && 0 < d && (h[h.length - 1].elements = h[h.length - 1].elements.concat(b[e].elements.slice(d)), d = 0, e++);
        d = n.elements.slice(d, g.index).concat([l]).concat(c.elements.slice(1));
        e === g.pathIndex && 0 < k ? h[h.length - 1].elements = h[h.length - 1].elements.concat(d) : (h = h.concat(b.slice(e, g.pathIndex)), h.push(new f.Selector(d)));
        e = g.endPathIndex;
        d = g.endPathElementIndex;
        d >= b[e].elements.length && (d = 0, e++);
      }
      e < b.length && 0 < d && (h[h.length - 1].elements = h[h.length - 1].elements.concat(b[e].elements.slice(d)), e++);
      return h = h.concat(b.slice(e, b.length));
    }, visitRulesetOut:function(a) {
    }, visitMedia:function(a, b) {
      b = a.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
      b = b.concat(this.doExtendChaining(b, a.allExtends));
      this.allExtendsStack.push(b);
    }, visitMediaOut:function(a) {
      --this.allExtendsStack.length;
    }, visitDirective:function(a, b) {
      b = a.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
      b = b.concat(this.doExtendChaining(b, a.allExtends));
      this.allExtendsStack.push(b);
    }, visitDirectiveOut:function(a) {
      --this.allExtendsStack.length;
    }};
    g.exports = c;
  }, {"../logger":32, "../tree":61, "./visitor":89}], 84:[function(c, g, l) {
    function f(c) {
      this.imports = [];
      this.variableImports = [];
      this._onSequencerEmpty = c;
      this._currentDepth = 0;
    }
    f.prototype.addImport = function(c) {
      var b = this, a = {callback:c, args:null, isReady:!1};
      this.imports.push(a);
      return function() {
        a.args = Array.prototype.slice.call(arguments, 0);
        a.isReady = !0;
        b.tryRun();
      };
    };
    f.prototype.addVariableImport = function(c) {
      this.variableImports.push(c);
    };
    f.prototype.tryRun = function() {
      this._currentDepth++;
      try {
        for (;;) {
          for (; 0 < this.imports.length;) {
            var c = this.imports[0];
            if (!c.isReady) {
              return;
            }
            this.imports = this.imports.slice(1);
            c.callback.apply(null, c.args);
          }
          if (0 === this.variableImports.length) {
            break;
          }
          var b = this.variableImports[0];
          this.variableImports = this.variableImports.slice(1);
          b();
        }
      } finally {
        this._currentDepth--;
      }
      0 === this._currentDepth && this._onSequencerEmpty && this._onSequencerEmpty();
    };
    g.exports = f;
  }, {}], 85:[function(c, g, l) {
    var f = c("../contexts"), d = c("./visitor"), b = c("./import-sequencer");
    c = function(a, c) {
      this._visitor = new d(this);
      this._importer = a;
      this._finish = c;
      this.context = new f.Eval;
      this.importCount = 0;
      this.onceFileDetectionMap = {};
      this.recursionDetector = {};
      this._sequencer = new b(this._onSequencerEmpty.bind(this));
    };
    c.prototype = {isReplacing:!1, run:function(a) {
      try {
        this._visitor.visit(a);
      } catch (e) {
        this.error = e;
      }
      this.isFinished = !0;
      this._sequencer.tryRun();
    }, _onSequencerEmpty:function() {
      this.isFinished && this._finish(this.error);
    }, visitImport:function(a, b) {
      var c = a.options.inline;
      if (!a.css || c) {
        c = new f.Eval(this.context, this.context.frames.slice(0));
        var e = c.frames[0];
        this.importCount++;
        a.isVariableImport() ? this._sequencer.addVariableImport(this.processImportNode.bind(this, a, c, e)) : this.processImportNode(a, c, e);
      }
      b.visitDeeper = !1;
    }, processImportNode:function(a, b, c) {
      var e = a.options.inline;
      try {
        var d = a.evalForImport(b);
      } catch (h) {
        h.filename || (h.index = a.index, h.filename = a.currentFileInfo.filename), a.css = !0, a.error = h;
      }
      if (!d || d.css && !e) {
        this.importCount--, this.isFinished && this._sequencer.tryRun();
      } else {
        d.options.multiple && (b.importMultiple = !0);
        e = void 0 === d.css;
        for (var f = 0; f < c.rules.length; f++) {
          if (c.rules[f] === a) {
            c.rules[f] = d;
            break;
          }
        }
        a = this.onImported.bind(this, d, b);
        a = this._sequencer.addImport(a);
        this._importer.push(d.getPath(), e, d.currentFileInfo, d.options, a);
      }
    }, onImported:function(a, b, c, d, f, g) {
      c && (c.filename || (c.index = a.index, c.filename = a.currentFileInfo.filename), this.error = c);
      var e = this;
      c = a.options.inline;
      var k = a.options.plugin, l = a.options.optional;
      f = f || g in e.recursionDetector;
      b.importMultiple || (a.skip = f ? !0 : function() {
        if (g in e.onceFileDetectionMap) {
          return !0;
        }
        e.onceFileDetectionMap[g] = !0;
        return !1;
      });
      !g && l && (a.skip = !0);
      if (d && (a.root = d, a.importedFilename = g, !(c || k || !b.importMultiple && f))) {
        e.recursionDetector[g] = !0;
        a = this.context;
        this.context = b;
        try {
          this._visitor.visit(d);
        } catch (t) {
          this.error = t;
        }
        this.context = a;
      }
      e.importCount--;
      e.isFinished && e._sequencer.tryRun();
    }, visitRule:function(a, b) {
      "DetachedRuleset" === a.value.type ? this.context.frames.unshift(a) : b.visitDeeper = !1;
    }, visitRuleOut:function(a) {
      "DetachedRuleset" === a.value.type && this.context.frames.shift();
    }, visitDirective:function(a, b) {
      this.context.frames.unshift(a);
    }, visitDirectiveOut:function(a) {
      this.context.frames.shift();
    }, visitMixinDefinition:function(a, b) {
      this.context.frames.unshift(a);
    }, visitMixinDefinitionOut:function(a) {
      this.context.frames.shift();
    }, visitRuleset:function(a, b) {
      this.context.frames.unshift(a);
    }, visitRulesetOut:function(a) {
      this.context.frames.shift();
    }, visitMedia:function(a, b) {
      this.context.frames.unshift(a.rules[0]);
    }, visitMediaOut:function(a) {
      this.context.frames.shift();
    }};
    g.exports = c;
  }, {"../contexts":10, "./import-sequencer":84, "./visitor":89}], 86:[function(c, g, l) {
    c = {Visitor:c("./visitor"), ImportVisitor:c("./import-visitor"), ExtendVisitor:c("./extend-visitor"), JoinSelectorVisitor:c("./join-selector-visitor"), ToCSSVisitor:c("./to-css-visitor")};
    g.exports = c;
  }, {"./extend-visitor":83, "./import-visitor":85, "./join-selector-visitor":87, "./to-css-visitor":88, "./visitor":89}], 87:[function(c, g, l) {
    var f = c("./visitor");
    c = function() {
      this.contexts = [[]];
      this._visitor = new f(this);
    };
    c.prototype = {run:function(c) {
      return this._visitor.visit(c);
    }, visitRule:function(c, b) {
      b.visitDeeper = !1;
    }, visitMixinDefinition:function(c, b) {
      b.visitDeeper = !1;
    }, visitRuleset:function(c, b) {
      b = this.contexts[this.contexts.length - 1];
      var a = [], e;
      this.contexts.push(a);
      if (!c.root) {
        if (e = c.selectors) {
          e = e.filter(function(a) {
            return a.getIsOutput();
          }), c.selectors = e.length ? e : e = null, e && c.joinSelectors(a, b, e);
        }
        e || (c.rules = null);
        c.paths = a;
      }
    }, visitRulesetOut:function(c) {
      --this.contexts.length;
    }, visitMedia:function(c, b) {
      b = this.contexts[this.contexts.length - 1];
      c.rules[0].root = 0 === b.length || b[0].multiMedia;
    }, visitDirective:function(c, b) {
      b = this.contexts[this.contexts.length - 1];
      c.rules && c.rules.length && (c.rules[0].root = c.isRooted || 0 === b.length || null);
    }};
    g.exports = c;
  }, {"./visitor":89}], 88:[function(c, g, l) {
    var f = c("../tree"), d = c("./visitor");
    c = function(b) {
      this._visitor = new d(this);
      this._context = b;
    };
    c.prototype = {isReplacing:!0, run:function(b) {
      return this._visitor.visit(b);
    }, visitRule:function(b, a) {
      if (!b.variable) {
        return b;
      }
    }, visitMixinDefinition:function(b, a) {
      b.frames = [];
    }, visitExtend:function(b, a) {
    }, visitComment:function(b, a) {
      if (!b.isSilent(this._context)) {
        return b;
      }
    }, visitMedia:function(b, a) {
      b.accept(this._visitor);
      a.visitDeeper = !1;
      if (b.rules.length) {
        return b;
      }
    }, visitImport:function(b, a) {
      if (void 0 === b.path.currentFileInfo.reference || !b.css) {
        return b;
      }
    }, visitDirective:function(b, a) {
      if ("@charset" === b.name) {
        if (!b.getIsReferenced()) {
          return;
        }
        if (this.charset) {
          if (b.debugInfo) {
            return a = new f.Comment("/* " + b.toCSS(this._context).replace(/\n/g, "") + " */\n"), a.debugInfo = b.debugInfo, this._visitor.visit(a);
          }
          return;
        }
        this.charset = !0;
      }
      if (b.rules && b.rules.length) {
        this._mergeRules(b.rules[0].rules);
        b.accept(this._visitor);
        a.visitDeeper = !1;
        if (b.getIsReferenced()) {
          return b;
        }
        if (b.rules && b.rules.length) {
          a: {
            var c = b.rules;
            1 !== c.length || c[0].paths && 0 !== c[0].paths.length || (c = c[0].rules);
            for (var d = 0; d < c.length; d++) {
              if (a = c[d], a.getIsReferenced && a.getIsReferenced()) {
                a = !0;
                break a;
              }
            }
            a = !1;
          }
          if (a) {
            return b.markReferenced(), b;
          }
        }
      } else {
        if (b.getIsReferenced()) {
          return b;
        }
      }
    }, checkPropertiesInRoot:function(b) {
      for (var a, c = 0; c < b.length; c++) {
        if (a = b[c], a instanceof f.Rule && !a.variable) {
          throw {message:"properties must be inside selector blocks, they cannot be in the root.", index:a.index, filename:a.currentFileInfo ? a.currentFileInfo.filename : null};
        }
      }
    }, visitRuleset:function(b, a) {
      var c, d = [];
      b.firstRoot && this.checkPropertiesInRoot(b.rules);
      if (b.root) {
        b.accept(this._visitor), a.visitDeeper = !1, (b.firstRoot || b.rules && 0 < b.rules.length) && d.splice(0, 0, b);
      } else {
        b.paths && (b.paths = b.paths.filter(function(a) {
          var b;
          " " === a[0].elements[0].combinator.value && (a[0].elements[0].combinator = new f.Combinator(""));
          for (b = 0; b < a.length; b++) {
            if (a[b].getIsReferenced() && a[b].getIsOutput()) {
              return !0;
            }
          }
          return !1;
        }));
        for (var g = b.rules, l = g ? g.length : 0, q = 0; q < l;) {
          (c = g[q]) && c.rules ? (d.push(this._visitor.visit(c)), g.splice(q, 1), l--) : q++;
        }
        0 < l ? b.accept(this._visitor) : b.rules = null;
        a.visitDeeper = !1;
        if (g = b.rules) {
          this._mergeRules(g), g = b.rules;
        }
        g && (this._removeDuplicateRules(g), g = b.rules);
        g && 0 < g.length && 0 < b.paths.length && d.splice(0, 0, b);
      }
      return 1 === d.length ? d[0] : d;
    }, _removeDuplicateRules:function(b) {
      if (b) {
        var a = {}, c;
        for (c = b.length - 1; 0 <= c; c--) {
          var d = b[c];
          if (d instanceof f.Rule) {
            if (a[d.name]) {
              var g = a[d.name];
              g instanceof f.Rule && (g = a[d.name] = [a[d.name].toCSS(this._context)]);
              d = d.toCSS(this._context);
              -1 !== g.indexOf(d) ? b.splice(c, 1) : g.push(d);
            } else {
              a[d.name] = d;
            }
          }
        }
      }
    }, _mergeRules:function(b) {
      if (b) {
        for (var a = {}, c, d, g, l = 0; l < b.length; l++) {
          d = b[l], d instanceof f.Rule && d.merge && (g = [d.name, d.important ? "!" : ""].join(), a[g] ? b.splice(l--, 1) : a[g] = [], a[g].push(d));
        }
        Object.keys(a).map(function(b) {
          function e(a) {
            return new f.Expression(a.map(function(a) {
              return a.value;
            }));
          }
          function g(a) {
            return new f.Value(a.map(function(a) {
              return a;
            }));
          }
          c = a[b];
          if (1 < c.length) {
            d = c[0];
            var k = [], l = [];
            c.map(function(a) {
              "+" === a.merge && (0 < l.length && k.push(e(l)), l = []);
              l.push(a);
            });
            k.push(e(l));
            d.value = g(k);
          }
        });
      }
    }, visitAnonymous:function(b, a) {
      if (b.getIsReferenced()) {
        return b.accept(this._visitor), b;
      }
    }};
    g.exports = c;
  }, {"../tree":61, "./visitor":89}], 89:[function(c, g, l) {
    function f(a) {
      return a;
    }
    function d(a, b) {
      var c;
      for (c in a) {
        if (a.hasOwnProperty(c)) {
          var e = a[c];
          switch(typeof e) {
            case "function":
              e.prototype && e.prototype.type && (e.prototype.typeIndex = b++);
              break;
            case "object":
              b = d(e, b);
          }
        }
      }
      return b;
    }
    var b = c("../tree"), a = {visitDeeper:!0}, e = !1;
    c = function(a) {
      this._implementation = a;
      this._visitFnCache = [];
      e || (d(b, 1), e = !0);
    };
    c.prototype = {visit:function(b) {
      if (!b) {
        return b;
      }
      var c = b.typeIndex;
      if (!c) {
        return b;
      }
      var d = this._visitFnCache, e = this._implementation;
      c <<= 1;
      var h = c | 1, g = d[c], k = d[h];
      a.visitDeeper = !0;
      g || (k = "visit" + b.type, g = e[k] || f, k = e[k + "Out"] || f, d[c] = g, d[h] = k);
      g !== f && (d = g.call(e, b, a), e.isReplacing && (b = d));
      a.visitDeeper && b && b.accept && b.accept(this);
      k != f && k.call(e, b);
      return b;
    }, visitArray:function(a, b) {
      if (!a) {
        return a;
      }
      var c = a.length;
      if (b || !this._implementation.isReplacing) {
        for (b = 0; b < c; b++) {
          this.visit(a[b]);
        }
        return a;
      }
      var d = [];
      for (b = 0; b < c; b++) {
        var e = this.visit(a[b]);
        void 0 !== e && (e.splice ? e.length && this.flatten(e, d) : d.push(e));
      }
      return d;
    }, flatten:function(a, b) {
      b || (b = []);
      var c, d;
      var e = 0;
      for (c = a.length; e < c; e++) {
        var f = a[e];
        if (void 0 !== f) {
          if (f.splice) {
            var g = 0;
            for (d = f.length; g < d; g++) {
              var k = f[g];
              void 0 !== k && (k.splice ? k.length && this.flatten(k, b) : b.push(k));
            }
          } else {
            b.push(f);
          }
        }
      }
      return b;
    }};
    g.exports = c;
  }, {"../tree":61}], 90:[function(c, g, l) {
    function f() {
      if (!a) {
        a = !0;
        for (var c, d = b.length; d;) {
          c = b;
          b = [];
          for (var f = -1; ++f < d;) {
            c[f]();
          }
          d = b.length;
        }
        a = !1;
      }
    }
    function d() {
    }
    c = g.exports = {};
    var b = [], a = !1;
    c.nextTick = function(c) {
      b.push(c);
      a || setTimeout(f, 0);
    };
    c.title = "browser";
    c.browser = !0;
    c.env = {};
    c.argv = [];
    c.version = "";
    c.versions = {};
    c.on = d;
    c.addListener = d;
    c.once = d;
    c.off = d;
    c.removeListener = d;
    c.removeAllListeners = d;
    c.emit = d;
    c.binding = function(a) {
      throw Error("process.binding is not supported");
    };
    c.cwd = function() {
      return "/";
    };
    c.chdir = function(a) {
      throw Error("process.chdir is not supported");
    };
    c.umask = function() {
      return 0;
    };
  }, {}], 91:[function(c, g, l) {
    function f(a, b, c, d) {
      this.onFulfilled = "function" === typeof a ? a : null;
      this.onRejected = "function" === typeof b ? b : null;
      this.resolve = c;
      this.reject = d;
    }
    function d(a, b, c) {
      var d = !1;
      try {
        a(function(a) {
          d || (d = !0, b(a));
        }, function(a) {
          d || (d = !0, c(a));
        });
      } catch (p) {
        d || (d = !0, c(p));
      }
    }
    var b = c("asap");
    g.exports = function(a) {
      function c(a) {
        null === q ? u.push(a) : b(function() {
          var b = q ? a.onFulfilled : a.onRejected;
          if (null === b) {
            (q ? a.resolve : a.reject)(h);
          } else {
            try {
              var c = b(h);
            } catch (m) {
              a.reject(m);
              return;
            }
            a.resolve(c);
          }
        });
      }
      function g(a) {
        try {
          if (a === r) {
            throw new TypeError("A promise cannot be resolved with itself.");
          }
          if (a && ("object" === typeof a || "function" === typeof a)) {
            var b = a.then;
            if ("function" === typeof b) {
              d(b.bind(a), g, l);
              return;
            }
          }
          q = !0;
          h = a;
          p();
        } catch (v) {
          l(v);
        }
      }
      function l(a) {
        q = !1;
        h = a;
        p();
      }
      function p() {
        for (var a = 0, b = u.length; a < b; a++) {
          c(u[a]);
        }
        u = null;
      }
      if ("object" !== typeof this) {
        throw new TypeError("Promises must be constructed via new");
      }
      if ("function" !== typeof a) {
        throw new TypeError("not a function");
      }
      var q = null, h = null, u = [], r = this;
      this.then = function(a, b) {
        return new r.constructor(function(d, e) {
          c(new f(a, b, d, e));
        });
      };
      d(a, g, l);
    };
  }, {asap:93}], 92:[function(c, g, l) {
    function f(a) {
      this.then = function(c) {
        return "function" !== typeof c ? this : new d(function(d, e) {
          b(function() {
            try {
              d(c(a));
            } catch (x) {
              e(x);
            }
          });
        });
      };
    }
    var d = c("./core.js"), b = c("asap");
    g.exports = d;
    f.prototype = d.prototype;
    var a = new f(!0), e = new f(!1), k = new f(null), n = new f(void 0), p = new f(0), q = new f("");
    d.resolve = function(b) {
      if (b instanceof d) {
        return b;
      }
      if (null === b) {
        return k;
      }
      if (void 0 === b) {
        return n;
      }
      if (!0 === b) {
        return a;
      }
      if (!1 === b) {
        return e;
      }
      if (0 === b) {
        return p;
      }
      if ("" === b) {
        return q;
      }
      if ("object" === typeof b || "function" === typeof b) {
        try {
          var c = b.then;
          if ("function" === typeof c) {
            return new d(c.bind(b));
          }
        } catch (r) {
          return new d(function(a, b) {
            b(r);
          });
        }
      }
      return new f(b);
    };
    d.all = function(a) {
      var b = Array.prototype.slice.call(a);
      return new d(function(a, c) {
        function d(f, g) {
          try {
            if (g && ("object" === typeof g || "function" === typeof g)) {
              var h = g.then;
              if ("function" === typeof h) {
                h.call(g, function(a) {
                  d(f, a);
                }, c);
                return;
              }
            }
            b[f] = g;
            0 === --e && a(b);
          } catch (A) {
            c(A);
          }
        }
        if (0 === b.length) {
          return a([]);
        }
        for (var e = b.length, f = 0; f < b.length; f++) {
          d(f, b[f]);
        }
      });
    };
    d.reject = function(a) {
      return new d(function(b, c) {
        c(a);
      });
    };
    d.race = function(a) {
      return new d(function(b, c) {
        a.forEach(function(a) {
          d.resolve(a).then(b, c);
        });
      });
    };
    d.prototype["catch"] = function(a) {
      return this.then(null, a);
    };
  }, {"./core.js":91, asap:93}], 93:[function(c, g, l) {
    (function(c) {
      function d() {
        for (; b.next;) {
          b = b.next;
          var a = b.task;
          b.task = void 0;
          var c = b.domain;
          c && (b.domain = void 0, c.enter());
          try {
            a();
          } catch (u) {
            if (l) {
              throw c && c.exit(), setTimeout(d, 0), c && c.enter(), u;
            }
            setTimeout(function() {
              throw u;
            }, 0);
          }
          c && c.exit();
        }
        e = !1;
      }
      var b = {task:void 0, next:null}, a = b, e = !1, f = void 0, l = !1;
      if ("undefined" !== typeof c && c.nextTick) {
        l = !0, f = function() {
          c.nextTick(d);
        };
      } else {
        if ("function" === typeof setImmediate) {
          f = "undefined" !== typeof window ? setImmediate.bind(window, d) : function() {
            setImmediate(d);
          };
        } else {
          if ("undefined" !== typeof MessageChannel) {
            var p = new MessageChannel;
            p.port1.onmessage = d;
            f = function() {
              p.port2.postMessage(0);
            };
          } else {
            f = function() {
              setTimeout(d, 0);
            };
          }
        }
      }
      g.exports = function(b) {
        a = a.next = {task:b, domain:l && c.domain, next:null};
        e || (e = !0, f());
      };
    }).call(this, c("_process"));
  }, {_process:90}], 94:[function(c, g, l) {
    "function" !== typeof Promise.prototype.done && (Promise.prototype.done = function(c, d) {
      (arguments.length ? this.then.apply(this, arguments) : this).then(null, function(b) {
        setTimeout(function() {
          throw b;
        }, 0);
      });
    });
  }, {}], 95:[function(c, g, l) {
    c("asap");
    "undefined" === typeof Promise && (Promise = c("./lib/core.js"), c("./lib/es6-extensions.js"));
    c("./polyfill-done.js");
  }, {"./lib/core.js":91, "./lib/es6-extensions.js":92, "./polyfill-done.js":94, asap:93}]}, {}, [2])(2);
});
