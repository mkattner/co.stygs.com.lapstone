// Input 0
'use strict';
(function() {
  if (window.MSApp && MSApp.execUnsafeLocalFunction) {
    var k = function(a, c) {
      var e = Object.getOwnPropertyDescriptor(HTMLElement.prototype, a), b = e.set;
      Object.defineProperty(HTMLElement.prototype, a, {get:e.get, set:function(a) {
        if (window.WinJS && window.WinJS._execUnsafe && m()) {
          b.call(this, a);
        } else {
          var g = this, d = n(a, g);
          MSApp.execUnsafeLocalFunction(function() {
            c(e, g, d);
          });
        }
      }, enumerable:e.enumerable, configurable:e.configurable});
    }, n = function(a, c) {
      function e(a) {
        var b = p.call(a);
        if (b && b.length) {
          for (var c, f = 0, d = b.length; f < d; f++) {
            var g = b[f], h = g.name;
            "o" !== h[0] && "O" !== h[0] || "n" !== h[1] && "N" !== h[1] || (c = c || [], c.push({name:g.name, value:g.value}));
          }
          if (c) {
            for (f = 0, d = c.length; f < d; f++) {
              g = c[f];
              q.call(a, g.name);
              try {
                r.call(a, "x-" + g.name, g.value);
              } catch (w) {
              }
            }
          }
        }
        a = t.call(a);
        f = 0;
        for (d = a.length; f < d; f++) {
          e(a[f]);
        }
      }
      var b = document.implementation.createHTMLDocument("cleaner");
      l(b.documentElement);
      MSApp.execUnsafeLocalFunction(function() {
        u.value.call(b.documentElement, "afterbegin", a);
      });
      var d = b.documentElement.querySelectorAll("script");
      Array.prototype.forEach.call(d, function(a) {
        switch(a.type.toLowerCase()) {
          case "":
            a.type = "text/inert";
            break;
          case "text/javascript":
          case "text/ecmascript":
          case "text/x-javascript":
          case "text/jscript":
          case "text/livescript":
          case "text/javascript1.1":
          case "text/javascript1.2":
          case "text/javascript1.3":
            a.type = "text/inert-" + a.type.slice(5);
            break;
          case "application/javascript":
          case "application/ecmascript":
          case "application/x-javascript":
            a.type = "application/inert-" + a.type.slice(12);
        }
      });
      e(b.documentElement);
      d = [];
      "HTML" === c.tagName ? d = Array.prototype.slice.call(document.adoptNode(b.documentElement).childNodes) : (b.head && (d = d.concat(Array.prototype.slice.call(document.adoptNode(b.head).childNodes))), b.body && (d = d.concat(Array.prototype.slice.call(document.adoptNode(b.body).childNodes))));
      return d;
    }, m = function() {
      var a = !0;
      try {
        v.innerHTML = "\x3ctest/\x3e";
      } catch (c) {
        a = !1;
      }
      return a;
    }, l = function(a) {
      for (; a.childNodes.length;) {
        a.removeChild(a.lastChild);
      }
    }, r = Object.getOwnPropertyDescriptor(Element.prototype, "setAttribute").value, q = Object.getOwnPropertyDescriptor(Element.prototype, "removeAttribute").value, u = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "insertAdjacentHTML"), p = Object.getOwnPropertyDescriptor(Node.prototype, "attributes").get, t = Object.getOwnPropertyDescriptor(Node.prototype, "childNodes").get, v = document.createElement("div");
    k("innerHTML", function(a, c, e) {
      l(c);
      a = 0;
      for (var b = e.length; a < b; a++) {
        c.appendChild(e[a]);
      }
    });
    k("outerHTML", function(a, c, e) {
      a = 0;
      for (var b = e.length; a < b; a++) {
        c.insertAdjacentElement("afterend", e[a]);
      }
      c.parentNode.removeChild(c);
    });
  }
})();
