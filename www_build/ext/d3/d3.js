// Input 0
'use strict';
(function(b, Oa) {
  "object" === typeof exports && "undefined" !== typeof module ? Oa(exports) : "function" === typeof define && define.amd ? define(["exports"], Oa) : Oa(b.d3 = b.d3 || {});
})(this, function(b) {
  function Oa(a, c) {
    return a < c ? -1 : a > c ? 1 : a >= c ? 0 : NaN;
  }
  function zf(a) {
    1 === a.length && (a = Tn(a));
    return {left:function(c, d, e, g) {
      null == e && (e = 0);
      null == g && (g = c.length);
      for (; e < g;) {
        var h = e + g >>> 1;
        0 > a(c[h], d) ? e = h + 1 : g = h;
      }
      return e;
    }, right:function(c, d, e, g) {
      null == e && (e = 0);
      null == g && (g = c.length);
      for (; e < g;) {
        var h = e + g >>> 1;
        0 < a(c[h], d) ? g = h : e = h + 1;
      }
      return e;
    }};
  }
  function Tn(a) {
    return function(c, d) {
      return Oa(a(c), d);
    };
  }
  function hi(a, c) {
    return [a, c];
  }
  function tb(a) {
    return null === a ? NaN : +a;
  }
  function ii(a, c) {
    var d = a.length, e = 0, g = -1, h = 0, k, p = 0;
    if (null == c) {
      for (; ++g < d;) {
        if (!isNaN(k = tb(a[g]))) {
          var t = k - h;
          h += t / ++e;
          p += t * (k - h);
        }
      }
    } else {
      for (; ++g < d;) {
        isNaN(k = tb(c(a[g], g, a))) || (t = k - h, h += t / ++e, p += t * (k - h));
      }
    }
    if (1 < e) {
      return p / (e - 1);
    }
  }
  function ji(a, c) {
    return (a = ii(a, c)) ? Math.sqrt(a) : a;
  }
  function Af(a, c) {
    var d = a.length, e = -1, g, h, k;
    if (null == c) {
      for (; ++e < d;) {
        if (null != (g = a[e]) && g >= g) {
          for (h = k = g; ++e < d;) {
            null != (g = a[e]) && (h > g && (h = g), k < g && (k = g));
          }
        }
      }
    } else {
      for (; ++e < d;) {
        if (null != (g = c(a[e], e, a)) && g >= g) {
          for (h = k = g; ++e < d;) {
            null != (g = c(a[e], e, a)) && (h > g && (h = g), k < g && (k = g));
          }
        }
      }
    }
    return [h, k];
  }
  function Kd(a) {
    return function() {
      return a;
    };
  }
  function Un(a) {
    return a;
  }
  function Ka(a, c, d) {
    a = +a;
    c = +c;
    d = 2 > (g = arguments.length) ? (c = a, a = 0, 1) : 3 > g ? 1 : +d;
    for (var e = -1, g = Math.max(0, Math.ceil((c - a) / d)) | 0, h = Array(g); ++e < g;) {
      h[e] = a + e * d;
    }
    return h;
  }
  function Bf(a, c, d) {
    var e, g = -1, h;
    c = +c;
    a = +a;
    d = +d;
    if (a === c && 0 < d) {
      return [a];
    }
    if (e = c < a) {
      var k = a;
      a = c;
      c = k;
    }
    if (0 === (h = Fc(a, c, d)) || !isFinite(h)) {
      return [];
    }
    if (0 < h) {
      for (a = Math.ceil(a / h), c = Math.floor(c / h), c = Array(k = Math.ceil(c - a + 1)); ++g < k;) {
        c[g] = (a + g) * h;
      }
    } else {
      for (a = Math.floor(a * h), c = Math.ceil(c * h), c = Array(k = Math.ceil(a - c + 1)); ++g < k;) {
        c[g] = (a - g) / h;
      }
    }
    e && c.reverse();
    return c;
  }
  function Fc(a, c, d) {
    c = (c - a) / Math.max(0, d);
    a = Math.floor(Math.log(c) / Math.LN10);
    c /= Math.pow(10, a);
    return 0 <= a ? (c >= Cf ? 10 : c >= Df ? 5 : c >= Ef ? 2 : 1) * Math.pow(10, a) : -Math.pow(10, -a) / (c >= Cf ? 10 : c >= Df ? 5 : c >= Ef ? 2 : 1);
  }
  function Gb(a, c, d) {
    var e = Math.abs(c - a) / Math.max(0, d);
    d = Math.pow(10, Math.floor(Math.log(e) / Math.LN10));
    e /= d;
    e >= Cf ? d *= 10 : e >= Df ? d *= 5 : e >= Ef && (d *= 2);
    return c < a ? -d : d;
  }
  function Ff(a) {
    return Math.ceil(Math.log(a.length) / Math.LN2) + 1;
  }
  function Gc(a, c, d) {
    null == d && (d = tb);
    if (e = a.length) {
      if (0 >= (c = +c) || 2 > e) {
        return +d(a[0], 0, a);
      }
      if (1 <= c) {
        return +d(a[e - 1], e - 1, a);
      }
      var e;
      c *= e - 1;
      e = Math.floor(c);
      var g = +d(a[e], e, a);
      a = +d(a[e + 1], e + 1, a);
      return g + (a - g) * (c - e);
    }
  }
  function ki(a, c) {
    var d = a.length, e = -1, g, h;
    if (null == c) {
      for (; ++e < d;) {
        if (null != (g = a[e]) && g >= g) {
          for (h = g; ++e < d;) {
            null != (g = a[e]) && g > h && (h = g);
          }
        }
      }
    } else {
      for (; ++e < d;) {
        if (null != (g = c(a[e], e, a)) && g >= g) {
          for (h = g; ++e < d;) {
            null != (g = c(a[e], e, a)) && g > h && (h = g);
          }
        }
      }
    }
    return h;
  }
  function Gf(a) {
    var c = a.length;
    var d = -1;
    for (var e = 0, g, h; ++d < c;) {
      e += a[d].length;
    }
    for (g = Array(e); 0 <= --c;) {
      for (h = a[c], d = h.length; 0 <= --d;) {
        g[--e] = h[d];
      }
    }
    return g;
  }
  function li(a, c) {
    var d = a.length, e = -1, g, h;
    if (null == c) {
      for (; ++e < d;) {
        if (null != (g = a[e]) && g >= g) {
          for (h = g; ++e < d;) {
            null != (g = a[e]) && h > g && (h = g);
          }
        }
      }
    } else {
      for (; ++e < d;) {
        if (null != (g = c(a[e], e, a)) && g >= g) {
          for (h = g; ++e < d;) {
            null != (g = c(a[e], e, a)) && h > g && (h = g);
          }
        }
      }
    }
    return h;
  }
  function mi(a) {
    if (!(h = a.length)) {
      return [];
    }
    for (var c = -1, d = li(a, Vn), e = Array(d); ++c < d;) {
      for (var g = -1, h, k = e[c] = Array(h); ++g < h;) {
        k[g] = a[g][c];
      }
    }
    return e;
  }
  function Vn(a) {
    return a.length;
  }
  function Wn(a) {
    return a;
  }
  function Xn(a) {
    return "translate(" + (a + 0.5) + ",0)";
  }
  function Yn(a) {
    return "translate(0," + (a + 0.5) + ")";
  }
  function Zn(a) {
    return function(c) {
      return +a(c);
    };
  }
  function $n(a) {
    var c = Math.max(0, a.bandwidth() - 1) / 2;
    a.round() && (c = Math.round(c));
    return function(d) {
      return +a(d) + c;
    };
  }
  function ao() {
    return !this.__axis;
  }
  function Ld(a, c) {
    function d(d) {
      var v = null == g ? c.ticks ? c.ticks.apply(c, e) : c.domain() : g, y = null == h ? c.tickFormat ? c.tickFormat.apply(c, e) : Wn : h, F = Math.max(k, 0) + t, I = c.range(), P = +I[0] + 0.5;
      I = +I[I.length - 1] + 0.5;
      var C = (c.bandwidth ? $n : Zn)(c.copy()), x = d.selection ? d.selection() : d, J = x.selectAll(".domain").data([null]);
      v = x.selectAll(".tick").data(v, c).order();
      var K = v.exit(), N = v.enter().append("g").attr("class", "tick"), S = v.select("line"), X = v.select("text");
      J = J.merge(J.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
      v = v.merge(N);
      S = S.merge(N.append("line").attr("stroke", "currentColor").attr(l + "2", b * k));
      X = X.merge(N.append("text").attr("fill", "currentColor").attr(l, b * F).attr("dy", 1 === a ? "0em" : 3 === a ? "0.71em" : "0.32em"));
      d !== x && (J = J.transition(d), v = v.transition(d), S = S.transition(d), X = X.transition(d), K = K.transition(d).attr("opacity", 1e-6).attr("transform", function(a) {
        return isFinite(a = C(a)) ? r(a) : this.getAttribute("transform");
      }), N.attr("opacity", 1e-6).attr("transform", function(a) {
        var c = this.parentNode.__axis;
        return r(c && isFinite(c = c(a)) ? c : C(a));
      }));
      K.remove();
      J.attr("d", 4 === a || 2 == a ? p ? "M" + b * p + "," + P + "H0.5V" + I + "H" + b * p : "M0.5," + P + "V" + I : p ? "M" + P + "," + b * p + "V0.5H" + I + "V" + b * p : "M" + P + ",0.5H" + I);
      v.attr("opacity", 1).attr("transform", function(a) {
        return r(C(a));
      });
      S.attr(l + "2", b * k);
      X.attr(l, b * F).text(y);
      x.filter(ao).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", 2 === a ? "start" : 4 === a ? "end" : "middle");
      x.each(function() {
        this.__axis = C;
      });
    }
    var e = [], g = null, h = null, k = 6, p = 6, t = 3, b = 1 === a || 4 === a ? -1 : 1, l = 4 === a || 2 === a ? "x" : "y", r = 1 === a || 3 === a ? Xn : Yn;
    d.scale = function(a) {
      return arguments.length ? (c = a, d) : c;
    };
    d.ticks = function() {
      return e = Hf.call(arguments), d;
    };
    d.tickArguments = function(a) {
      return arguments.length ? (e = null == a ? [] : Hf.call(a), d) : e.slice();
    };
    d.tickValues = function(a) {
      return arguments.length ? (g = null == a ? null : Hf.call(a), d) : g && g.slice();
    };
    d.tickFormat = function(a) {
      return arguments.length ? (h = a, d) : h;
    };
    d.tickSize = function(a) {
      return arguments.length ? (k = p = +a, d) : k;
    };
    d.tickSizeInner = function(a) {
      return arguments.length ? (k = +a, d) : k;
    };
    d.tickSizeOuter = function(a) {
      return arguments.length ? (p = +a, d) : p;
    };
    d.tickPadding = function(a) {
      return arguments.length ? (t = +a, d) : t;
    };
    return d;
  }
  function Hb() {
    for (var a = 0, c = arguments.length, d = {}, e; a < c; ++a) {
      if (!(e = arguments[a] + "") || e in d) {
        throw Error("illegal type: " + e);
      }
      d[e] = [];
    }
    return new Md(d);
  }
  function Md(a) {
    this._ = a;
  }
  function bo(a, c) {
    return a.trim().split(/^|\s+/).map(function(a) {
      var d = "", g = a.indexOf(".");
      0 <= g && (d = a.slice(g + 1), a = a.slice(0, g));
      if (a && !c.hasOwnProperty(a)) {
        throw Error("unknown type: " + a);
      }
      return {type:a, name:d};
    });
  }
  function ni(a, c, d) {
    for (var e = 0, g = a.length; e < g; ++e) {
      if (a[e].name === c) {
        a[e] = co;
        a = a.slice(0, e).concat(a.slice(e + 1));
        break;
      }
    }
    null != d && a.push({name:c, value:d});
    return a;
  }
  function Hc(a) {
    var c = a += "", d = c.indexOf(":");
    0 <= d && "xmlns" !== (c = a.slice(0, d)) && (a = a.slice(d + 1));
    return If.hasOwnProperty(c) ? {space:If[c], local:a} : a;
  }
  function eo(a) {
    return function() {
      var c = this.ownerDocument, d = this.namespaceURI;
      return "http://www.w3.org/1999/xhtml" === d && "http://www.w3.org/1999/xhtml" === c.documentElement.namespaceURI ? c.createElement(a) : c.createElementNS(d, a);
    };
  }
  function fo(a) {
    return function() {
      return this.ownerDocument.createElementNS(a.space, a.local);
    };
  }
  function Nd(a) {
    a = Hc(a);
    return (a.local ? fo : eo)(a);
  }
  function go() {
  }
  function Od(a) {
    return null == a ? go : function() {
      return this.querySelector(a);
    };
  }
  function ho() {
    return [];
  }
  function Jf(a) {
    return null == a ? ho : function() {
      return this.querySelectorAll(a);
    };
  }
  function Kf(a) {
    return function() {
      return this.matches(a);
    };
  }
  function oi(a) {
    return Array(a.length);
  }
  function Pd(a, c) {
    this.ownerDocument = a.ownerDocument;
    this.namespaceURI = a.namespaceURI;
    this._next = null;
    this._parent = a;
    this.__data__ = c;
  }
  function io(a) {
    return function() {
      return a;
    };
  }
  function jo(a, c, d, e, g, h) {
    for (var k = 0, p, t = c.length, b = h.length; k < b; ++k) {
      (p = c[k]) ? (p.__data__ = h[k], e[k] = p) : d[k] = new Pd(a, h[k]);
    }
    for (; k < t; ++k) {
      if (p = c[k]) {
        g[k] = p;
      }
    }
  }
  function ko(a, c, d, e, g, h, k) {
    var p, t, b = {}, l = c.length, r = h.length, v = Array(l), z;
    for (p = 0; p < l; ++p) {
      if (t = c[p]) {
        v[p] = z = "$" + k.call(t, t.__data__, p, c), z in b ? g[p] = t : b[z] = t;
      }
    }
    for (p = 0; p < r; ++p) {
      z = "$" + k.call(a, h[p], p, h), (t = b[z]) ? (e[p] = t, t.__data__ = h[p], b[z] = null) : d[p] = new Pd(a, h[p]);
    }
    for (p = 0; p < l; ++p) {
      (t = c[p]) && b[v[p]] === t && (g[p] = t);
    }
  }
  function lo(a, c) {
    return a < c ? -1 : a > c ? 1 : a >= c ? 0 : NaN;
  }
  function mo(a) {
    return function() {
      this.removeAttribute(a);
    };
  }
  function no(a) {
    return function() {
      this.removeAttributeNS(a.space, a.local);
    };
  }
  function oo(a, c) {
    return function() {
      this.setAttribute(a, c);
    };
  }
  function po(a, c) {
    return function() {
      this.setAttributeNS(a.space, a.local, c);
    };
  }
  function qo(a, c) {
    return function() {
      var d = c.apply(this, arguments);
      null == d ? this.removeAttribute(a) : this.setAttribute(a, d);
    };
  }
  function ro(a, c) {
    return function() {
      var d = c.apply(this, arguments);
      null == d ? this.removeAttributeNS(a.space, a.local) : this.setAttributeNS(a.space, a.local, d);
    };
  }
  function Lf(a) {
    return a.ownerDocument && a.ownerDocument.defaultView || a.document && a || a.defaultView;
  }
  function so(a) {
    return function() {
      this.style.removeProperty(a);
    };
  }
  function to(a, c, d) {
    return function() {
      this.style.setProperty(a, c, d);
    };
  }
  function uo(a, c, d) {
    return function() {
      var e = c.apply(this, arguments);
      null == e ? this.style.removeProperty(a) : this.style.setProperty(a, e, d);
    };
  }
  function Ib(a, c) {
    return a.style.getPropertyValue(c) || Lf(a).getComputedStyle(a, null).getPropertyValue(c);
  }
  function vo(a) {
    return function() {
      delete this[a];
    };
  }
  function wo(a, c) {
    return function() {
      this[a] = c;
    };
  }
  function xo(a, c) {
    return function() {
      var d = c.apply(this, arguments);
      null == d ? delete this[a] : this[a] = d;
    };
  }
  function Mf(a) {
    return a.classList || new pi(a);
  }
  function pi(a) {
    this._node = a;
    this._names = (a.getAttribute("class") || "").trim().split(/^|\s+/);
  }
  function qi(a, c) {
    a = Mf(a);
    for (var d = -1, e = c.length; ++d < e;) {
      a.add(c[d]);
    }
  }
  function ri(a, c) {
    a = Mf(a);
    for (var d = -1, e = c.length; ++d < e;) {
      a.remove(c[d]);
    }
  }
  function yo(a) {
    return function() {
      qi(this, a);
    };
  }
  function zo(a) {
    return function() {
      ri(this, a);
    };
  }
  function Ao(a, c) {
    return function() {
      (c.apply(this, arguments) ? qi : ri)(this, a);
    };
  }
  function Bo() {
    this.textContent = "";
  }
  function Co(a) {
    return function() {
      this.textContent = a;
    };
  }
  function Do(a) {
    return function() {
      var c = a.apply(this, arguments);
      this.textContent = null == c ? "" : c;
    };
  }
  function Eo() {
    this.innerHTML = "";
  }
  function Fo(a) {
    return function() {
      this.innerHTML = a;
    };
  }
  function Go(a) {
    return function() {
      var c = a.apply(this, arguments);
      this.innerHTML = null == c ? "" : c;
    };
  }
  function Ho() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function Io() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function Jo() {
    return null;
  }
  function Ko() {
    var a = this.parentNode;
    a && a.removeChild(this);
  }
  function Lo() {
    return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling);
  }
  function Mo() {
    return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling);
  }
  function No(a, c, d) {
    a = si(a, c, d);
    return function(c) {
      var d = c.relatedTarget;
      d && (d === this || d.compareDocumentPosition(this) & 8) || a.call(this, c);
    };
  }
  function si(a, c, d) {
    return function(e) {
      var g = b.event;
      b.event = e;
      try {
        a.call(this, this.__data__, c, d);
      } finally {
        b.event = g;
      }
    };
  }
  function Oo(a) {
    return a.trim().split(/^|\s+/).map(function(a) {
      var c = "", e = a.indexOf(".");
      0 <= e && (c = a.slice(e + 1), a = a.slice(0, e));
      return {type:a, name:c};
    });
  }
  function Po(a) {
    return function() {
      var c = this.__on;
      if (c) {
        for (var d = 0, e = -1, g = c.length, h; d < g; ++d) {
          (h = c[d], a.type && h.type !== a.type || h.name !== a.name) ? c[++e] = h : this.removeEventListener(h.type, h.listener, h.capture);
        }
        ++e ? c.length = e : delete this.__on;
      }
    };
  }
  function Qo(a, c, d) {
    var e = ti.hasOwnProperty(a.type) ? No : si;
    return function(g, h, k) {
      g = this.__on;
      var p;
      h = e(c, h, k);
      if (g) {
        k = 0;
        for (var t = g.length; k < t; ++k) {
          if ((p = g[k]).type === a.type && p.name === a.name) {
            this.removeEventListener(p.type, p.listener, p.capture);
            this.addEventListener(p.type, p.listener = h, p.capture = d);
            p.value = c;
            return;
          }
        }
      }
      this.addEventListener(a.type, h, d);
      p = {type:a.type, name:a.name, value:c, listener:h, capture:d};
      g ? g.push(p) : this.__on = [p];
    };
  }
  function Ic(a, c, d, e) {
    var g = b.event;
    a.sourceEvent = b.event;
    b.event = a;
    try {
      return c.apply(d, e);
    } finally {
      b.event = g;
    }
  }
  function ui(a, c, d) {
    var e = Lf(a), g = e.CustomEvent;
    "function" === typeof g ? g = new g(c, d) : (g = e.document.createEvent("Event"), d ? (g.initEvent(c, d.bubbles, d.cancelable), g.detail = d.detail) : g.initEvent(c, !1, !1));
    a.dispatchEvent(g);
  }
  function Ro(a, c) {
    return function() {
      return ui(this, a, c);
    };
  }
  function So(a, c) {
    return function() {
      return ui(this, a, c.apply(this, arguments));
    };
  }
  function za(a, c) {
    this._groups = a;
    this._parents = c;
  }
  function Jb() {
    return new za([[document.documentElement]], Nf);
  }
  function Ha(a) {
    return "string" === typeof a ? new za([[document.querySelector(a)]], [document.documentElement]) : new za([[a]], Nf);
  }
  function vi() {
    return new Of;
  }
  function Of() {
    this._ = "@" + (++To).toString(36);
  }
  function Pf() {
    for (var a = b.event, c; c = a.sourceEvent;) {
      a = c;
    }
    return a;
  }
  function Qd(a, c) {
    var d = a.ownerSVGElement || a;
    if (d.createSVGPoint) {
      return d = d.createSVGPoint(), d.x = c.clientX, d.y = c.clientY, d = d.matrixTransform(a.getScreenCTM().inverse()), [d.x, d.y];
    }
    d = a.getBoundingClientRect();
    return [c.clientX - d.left - a.clientLeft, c.clientY - d.top - a.clientTop];
  }
  function ub(a) {
    var c = Pf();
    c.changedTouches && (c = c.changedTouches[0]);
    return Qd(a, c);
  }
  function Rd(a, c, d) {
    3 > arguments.length && (d = c, c = Pf().changedTouches);
    for (var e = 0, g = c ? c.length : 0, h; e < g; ++e) {
      if ((h = c[e]).identifier === d) {
        return Qd(a, h);
      }
    }
    return null;
  }
  function $b() {
    b.event.preventDefault();
    b.event.stopImmediatePropagation();
  }
  function Sd(a) {
    var c = a.document.documentElement;
    a = Ha(a).on("dragstart.drag", $b, !0);
    if ("onselectstart" in c) {
      a.on("selectstart.drag", $b, !0);
    } else {
      c.__noselect = c.style.MozUserSelect, c.style.MozUserSelect = "none";
    }
  }
  function Td(a, c) {
    var d = a.document.documentElement, e = Ha(a).on("dragstart.drag", null);
    c && (e.on("click.drag", $b, !0), setTimeout(function() {
      e.on("click.drag", null);
    }, 0));
    if ("onselectstart" in d) {
      e.on("selectstart.drag", null);
    } else {
      d.style.MozUserSelect = d.__noselect, delete d.__noselect;
    }
  }
  function Ud(a) {
    return function() {
      return a;
    };
  }
  function Qf(a, c, d, e, g, h, k, p, t, b) {
    this.target = a;
    this.type = c;
    this.subject = d;
    this.identifier = e;
    this.active = g;
    this.x = h;
    this.y = k;
    this.dx = p;
    this.dy = t;
    this._ = b;
  }
  function Uo() {
    return !b.event.button;
  }
  function Vo() {
    return this.parentNode;
  }
  function Wo(a) {
    return null == a ? {x:b.event.x, y:b.event.y} : a;
  }
  function Xo() {
    return "ontouchstart" in this;
  }
  function ac(a, c, d) {
    a.prototype = c.prototype = d;
    d.constructor = a;
  }
  function Jc(a, c) {
    a = Object.create(a.prototype);
    for (var d in c) {
      a[d] = c[d];
    }
    return a;
  }
  function vb() {
  }
  function wb(a) {
    var c;
    a = (a + "").trim().toLowerCase();
    return (c = Yo.exec(a)) ? (c = parseInt(c[1], 16), new ua(c >> 8 & 15 | c >> 4 & 240, c >> 4 & 15 | c & 240, (c & 15) << 4 | c & 15, 1)) : (c = Zo.exec(a)) ? wi(parseInt(c[1], 16)) : (c = $o.exec(a)) ? new ua(c[1], c[2], c[3], 1) : (c = ap.exec(a)) ? new ua(255 * c[1] / 100, 255 * c[2] / 100, 255 * c[3] / 100, 1) : (c = bp.exec(a)) ? xi(c[1], c[2], c[3], c[4]) : (c = cp.exec(a)) ? xi(255 * c[1] / 100, 255 * c[2] / 100, 255 * c[3] / 100, c[4]) : (c = dp.exec(a)) ? yi(c[1], c[2] / 100, c[3] / 100, 
    1) : (c = ep.exec(a)) ? yi(c[1], c[2] / 100, c[3] / 100, c[4]) : zi.hasOwnProperty(a) ? wi(zi[a]) : "transparent" === a ? new ua(NaN, NaN, NaN, 0) : null;
  }
  function wi(a) {
    return new ua(a >> 16 & 255, a >> 8 & 255, a & 255, 1);
  }
  function xi(a, c, d, e) {
    0 >= e && (a = c = d = NaN);
    return new ua(a, c, d, e);
  }
  function Rf(a) {
    a instanceof vb || (a = wb(a));
    if (!a) {
      return new ua;
    }
    a = a.rgb();
    return new ua(a.r, a.g, a.b, a.opacity);
  }
  function bc(a, c, d, e) {
    return 1 === arguments.length ? Rf(a) : new ua(a, c, d, null == e ? 1 : e);
  }
  function ua(a, c, d, e) {
    this.r = +a;
    this.g = +c;
    this.b = +d;
    this.opacity = +e;
  }
  function Sf(a) {
    a = Math.max(0, Math.min(255, Math.round(a) || 0));
    return (16 > a ? "0" : "") + a.toString(16);
  }
  function yi(a, c, d, e) {
    0 >= e ? a = c = d = NaN : 0 >= d || 1 <= d ? a = c = NaN : 0 >= c && (a = NaN);
    return new ab(a, c, d, e);
  }
  function fp(a) {
    if (a instanceof ab) {
      return new ab(a.h, a.s, a.l, a.opacity);
    }
    a instanceof vb || (a = wb(a));
    if (!a) {
      return new ab;
    }
    if (a instanceof ab) {
      return a;
    }
    a = a.rgb();
    var c = a.r / 255, d = a.g / 255, e = a.b / 255, g = Math.min(c, d, e), h = Math.max(c, d, e), k = NaN, p = h - g, t = (h + g) / 2;
    p ? (k = c === h ? (d - e) / p + 6 * (d < e) : d === h ? (e - c) / p + 2 : (c - d) / p + 4, p /= 0.5 > t ? h + g : 2 - h - g, k *= 60) : p = 0 < t && 1 > t ? 0 : k;
    return new ab(k, p, t, a.opacity);
  }
  function Vd(a, c, d, e) {
    return 1 === arguments.length ? fp(a) : new ab(a, c, d, null == e ? 1 : e);
  }
  function ab(a, c, d, e) {
    this.h = +a;
    this.s = +c;
    this.l = +d;
    this.opacity = +e;
  }
  function Tf(a, c, d) {
    return 255 * (60 > a ? c + (d - c) * a / 60 : 180 > a ? d : 240 > a ? c + (d - c) * (240 - a) / 60 : c);
  }
  function Uf(a) {
    if (a instanceof Ta) {
      return new Ta(a.l, a.a, a.b, a.opacity);
    }
    if (a instanceof bb) {
      if (isNaN(a.h)) {
        return new Ta(a.l, 0, 0, a.opacity);
      }
      var c = a.h * Ai;
      return new Ta(a.l, Math.cos(c) * a.c, Math.sin(c) * a.c, a.opacity);
    }
    a instanceof ua || (a = Rf(a));
    var d = Vf(a.r), e = Vf(a.g), g = Vf(a.b);
    c = Wf(0.2225045 * d + 0.7168786 * e + 0.0606169 * g);
    if (d === e && e === g) {
      var h = d = c;
    } else {
      h = Wf((0.4360747 * d + 0.3850649 * e + 0.1430804 * g) / 0.96422), d = Wf((0.0139322 * d + 0.0971045 * e + 0.7141733 * g) / 0.82521);
    }
    return new Ta(116 * c - 16, 500 * (h - c), 200 * (c - d), a.opacity);
  }
  function Wd(a, c, d, e) {
    return 1 === arguments.length ? Uf(a) : new Ta(a, c, d, null == e ? 1 : e);
  }
  function Ta(a, c, d, e) {
    this.l = +a;
    this.a = +c;
    this.b = +d;
    this.opacity = +e;
  }
  function Wf(a) {
    return a > gp ? Math.pow(a, 1 / 3) : a / Bi + Ci;
  }
  function Xf(a) {
    return a > cc ? a * a * a : Bi * (a - Ci);
  }
  function Yf(a) {
    return 255 * (0.0031308 >= a ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - 0.055);
  }
  function Vf(a) {
    return 0.04045 >= (a /= 255) ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  }
  function Di(a) {
    if (a instanceof bb) {
      return new bb(a.h, a.c, a.l, a.opacity);
    }
    a instanceof Ta || (a = Uf(a));
    if (0 === a.a && 0 === a.b) {
      return new bb(NaN, 0, a.l, a.opacity);
    }
    var c = Math.atan2(a.b, a.a) * Ei;
    return new bb(0 > c ? c + 360 : c, Math.sqrt(a.a * a.a + a.b * a.b), a.l, a.opacity);
  }
  function Xd(a, c, d, e) {
    return 1 === arguments.length ? Di(a) : new bb(a, c, d, null == e ? 1 : e);
  }
  function bb(a, c, d, e) {
    this.h = +a;
    this.c = +c;
    this.l = +d;
    this.opacity = +e;
  }
  function Ua(a, c, d, e) {
    if (1 === arguments.length) {
      var g = a;
      if (g instanceof Kb) {
        g = new Kb(g.h, g.s, g.l, g.opacity);
      } else {
        g instanceof ua || (g = Rf(g));
        var h = g.g / 255, k = g.b / 255, p = (Fi * k + g.r / 255 * -1.7884503806 - 3.5172982438 * h) / (Fi + -1.7884503806 - 3.5172982438);
        k -= p;
        var t = (1.97294 * (h - p) - -0.29227 * k) / -0.90649;
        k = (h = Math.sqrt(t * t + k * k) / (1.97294 * p * (1 - p))) ? Math.atan2(t, k) * Ei - 120 : NaN;
        g = new Kb(0 > k ? k + 360 : k, h, p, g.opacity);
      }
    } else {
      g = new Kb(a, c, d, null == e ? 1 : e);
    }
    return g;
  }
  function Kb(a, c, d, e) {
    this.h = +a;
    this.s = +c;
    this.l = +d;
    this.opacity = +e;
  }
  function Gi(a, c, d, e, g) {
    var h = a * a, k = h * a;
    return ((1 - 3 * a + 3 * h - k) * c + (4 - 6 * h + 3 * k) * d + (1 + 3 * a + 3 * h - 3 * k) * e + k * g) / 6;
  }
  function Hi(a) {
    var c = a.length - 1;
    return function(d) {
      var e = 0 >= d ? d = 0 : 1 <= d ? (d = 1, c - 1) : Math.floor(d * c), g = a[e], h = a[e + 1];
      return Gi((d - e / c) * c, 0 < e ? a[e - 1] : 2 * g - h, g, h, e < c - 1 ? a[e + 2] : 2 * h - g);
    };
  }
  function Ii(a) {
    var c = a.length;
    return function(d) {
      var e = Math.floor((0 > (d %= 1) ? ++d : d) * c);
      return Gi((d - e / c) * c, a[(e + c - 1) % c], a[e % c], a[(e + 1) % c], a[(e + 2) % c]);
    };
  }
  function Yd(a) {
    return function() {
      return a;
    };
  }
  function Ji(a, c) {
    return function(d) {
      return a + d * c;
    };
  }
  function hp(a, c, d) {
    return a = Math.pow(a, d), c = Math.pow(c, d) - a, d = 1 / d, function(e) {
      return Math.pow(a + e * c, d);
    };
  }
  function Zd(a, c) {
    var d = c - a;
    return d ? Ji(a, 180 < d || -180 > d ? d - 360 * Math.round(d / 360) : d) : Yd(isNaN(a) ? c : a);
  }
  function ip(a) {
    return 1 === (a = +a) ? sa : function(c, d) {
      return d - c ? hp(c, d, a) : Yd(isNaN(c) ? d : c);
    };
  }
  function sa(a, c) {
    var d = c - a;
    return d ? Ji(a, d) : Yd(isNaN(a) ? c : a);
  }
  function Ki(a) {
    return function(c) {
      var d = c.length, e = Array(d), g = Array(d), h = Array(d), k;
      for (k = 0; k < d; ++k) {
        var p = bc(c[k]);
        e[k] = p.r || 0;
        g[k] = p.g || 0;
        h[k] = p.b || 0;
      }
      e = a(e);
      g = a(g);
      h = a(h);
      p.opacity = 1;
      return function(a) {
        p.r = e(a);
        p.g = g(a);
        p.b = h(a);
        return p + "";
      };
    };
  }
  function Li(a, c) {
    var d = c ? c.length : 0, e = a ? Math.min(d, a.length) : 0, g = Array(e), h = Array(d), k;
    for (k = 0; k < e; ++k) {
      g[k] = Kc(a[k], c[k]);
    }
    for (; k < d; ++k) {
      h[k] = c[k];
    }
    return function(a) {
      for (k = 0; k < e; ++k) {
        h[k] = g[k](a);
      }
      return h;
    };
  }
  function Mi(a, c) {
    var d = new Date;
    return a = +a, c -= a, function(e) {
      return d.setTime(a + c * e), d;
    };
  }
  function Pa(a, c) {
    return a = +a, c -= a, function(d) {
      return a + c * d;
    };
  }
  function Ni(a, c) {
    var d = {}, e = {}, g;
    if (null === a || "object" !== typeof a) {
      a = {};
    }
    if (null === c || "object" !== typeof c) {
      c = {};
    }
    for (g in c) {
      g in a ? d[g] = Kc(a[g], c[g]) : e[g] = c[g];
    }
    return function(a) {
      for (g in d) {
        e[g] = d[g](a);
      }
      return e;
    };
  }
  function jp(a) {
    return function() {
      return a;
    };
  }
  function kp(a) {
    return function(c) {
      return a(c) + "";
    };
  }
  function Zf(a, c) {
    var d = $f.lastIndex = ag.lastIndex = 0, e, g, h, k = -1, p = [], t = [];
    a += "";
    for (c += ""; (e = $f.exec(a)) && (g = ag.exec(c));) {
      (h = g.index) > d && (h = c.slice(d, h), p[k] ? p[k] += h : p[++k] = h), (e = e[0]) === (g = g[0]) ? p[k] ? p[k] += g : p[++k] = g : (p[++k] = null, t.push({i:k, x:Pa(e, g)})), d = ag.lastIndex;
    }
    d < c.length && (h = c.slice(d), p[k] ? p[k] += h : p[++k] = h);
    return 2 > p.length ? t[0] ? kp(t[0].x) : jp(c) : (c = t.length, function(a) {
      for (var d = 0, e; d < c; ++d) {
        p[(e = t[d]).i] = e.x(a);
      }
      return p.join("");
    });
  }
  function Kc(a, c) {
    var d = typeof c, e;
    return null == c || "boolean" === d ? Yd(c) : ("number" === d ? Pa : "string" === d ? (e = wb(c)) ? (c = e, Lc) : Zf : c instanceof wb ? Lc : c instanceof Date ? Mi : Array.isArray(c) ? Li : "function" !== typeof c.valueOf && "function" !== typeof c.toString || isNaN(c) ? Ni : Pa)(a, c);
  }
  function Oi(a, c) {
    return a = +a, c -= a, function(d) {
      return Math.round(a + c * d);
    };
  }
  function Pi(a, c, d, e, g, h) {
    var k, p, t;
    if (k = Math.sqrt(a * a + c * c)) {
      a /= k, c /= k;
    }
    if (t = a * d + c * e) {
      d -= a * t, e -= c * t;
    }
    if (p = Math.sqrt(d * d + e * e)) {
      d /= p, e /= p, t /= p;
    }
    a * e < c * d && (a = -a, c = -c, t = -t, k = -k);
    return {translateX:g, translateY:h, rotate:Math.atan2(c, a) * Qi, skewX:Math.atan(t) * Qi, scaleX:k, scaleY:p};
  }
  function Ri(a, c, d, e) {
    function g(a) {
      return a.length ? a.pop() + " " : "";
    }
    function h(a, e, g, h, k, p) {
      a !== g || e !== h ? (k = k.push("translate(", null, c, null, d), p.push({i:k - 4, x:Pa(a, g)}, {i:k - 2, x:Pa(e, h)})) : (g || h) && k.push("translate(" + g + c + h + d);
    }
    function k(a, c, d, h) {
      a !== c ? (180 < a - c ? c += 360 : 180 < c - a && (a += 360), h.push({i:d.push(g(d) + "rotate(", null, e) - 2, x:Pa(a, c)})) : c && d.push(g(d) + "rotate(" + c + e);
    }
    function p(a, c, d, h) {
      a !== c ? h.push({i:d.push(g(d) + "skewX(", null, e) - 2, x:Pa(a, c)}) : c && d.push(g(d) + "skewX(" + c + e);
    }
    function t(a, c, d, e, h, k) {
      a !== d || c !== e ? (h = h.push(g(h) + "scale(", null, ",", null, ")"), k.push({i:h - 4, x:Pa(a, d)}, {i:h - 2, x:Pa(c, e)})) : 1 === d && 1 === e || h.push(g(h) + "scale(" + d + "," + e + ")");
    }
    return function(c, d) {
      var e = [], g = [];
      c = a(c);
      d = a(d);
      h(c.translateX, c.translateY, d.translateX, d.translateY, e, g);
      k(c.rotate, d.rotate, e, g);
      p(c.skewX, d.skewX, e, g);
      t(c.scaleX, c.scaleY, d.scaleX, d.scaleY, e, g);
      c = d = null;
      return function(a) {
        for (var c = -1, d = g.length, h; ++c < d;) {
          e[(h = g[c]).i] = h.x(a);
        }
        return e.join("");
      };
    };
  }
  function Si(a) {
    return ((a = Math.exp(a)) + 1 / a) / 2;
  }
  function Ti(a, c) {
    var d = a[0], e = a[1], g = a[2];
    a = c[2];
    var h = c[0] - d, k = c[1] - e, p = h * h + k * k;
    if (1e-12 > p) {
      var t = Math.log(a / g) / Mc;
      a = function(a) {
        return [d + a * h, e + a * k, g * Math.exp(Mc * a * t)];
      };
    } else {
      var b = Math.sqrt(p);
      c = (a * a - g * g + 4 * p) / (4 * g * b);
      a = (a * a - g * g - 4 * p) / (4 * a * b);
      var l = Math.log(Math.sqrt(c * c + 1) - c);
      t = (Math.log(Math.sqrt(a * a + 1) - a) - l) / Mc;
      a = function(a) {
        a *= t;
        var c = Si(l), p = Mc * a + l;
        var r = ((p = Math.exp(2 * p)) - 1) / (p + 1);
        var y = l;
        p = ((y = Math.exp(y)) - 1 / y) / 2;
        r = g / (2 * b) * (c * r - p);
        return [d + r * h, e + r * k, g * c / Si(Mc * a + l)];
      };
    }
    a.duration = 1000 * t;
    return a;
  }
  function Ui(a) {
    return function(c, d) {
      var e = a((c = Vd(c)).h, (d = Vd(d)).h), g = sa(c.s, d.s), h = sa(c.l, d.l), k = sa(c.opacity, d.opacity);
      return function(a) {
        c.h = e(a);
        c.s = g(a);
        c.l = h(a);
        c.opacity = k(a);
        return c + "";
      };
    };
  }
  function Vi(a) {
    return function(c, d) {
      var e = a((c = Xd(c)).h, (d = Xd(d)).h), g = sa(c.c, d.c), h = sa(c.l, d.l), k = sa(c.opacity, d.opacity);
      return function(a) {
        c.h = e(a);
        c.c = g(a);
        c.l = h(a);
        c.opacity = k(a);
        return c + "";
      };
    };
  }
  function Wi(a) {
    return function e(d) {
      function g(e, g) {
        var h = a((e = Ua(e)).h, (g = Ua(g)).h), k = sa(e.s, g.s), b = sa(e.l, g.l), l = sa(e.opacity, g.opacity);
        return function(a) {
          e.h = h(a);
          e.s = k(a);
          e.l = b(Math.pow(a, d));
          e.opacity = l(a);
          return e + "";
        };
      }
      d = +d;
      g.gamma = e;
      return g;
    }(1);
  }
  function dc() {
    return Lb || (Xi(lp), Lb = Nc.now() + $d);
  }
  function lp() {
    Lb = 0;
  }
  function Oc() {
    this._call = this._time = this._next = null;
  }
  function ae(a, c, d) {
    var e = new Oc;
    e.restart(a, c, d);
    return e;
  }
  function Yi() {
    dc();
    ++ec;
    for (var a = be, c; a;) {
      0 <= (c = Lb - a._time) && a._call.call(null, c), a = a._next;
    }
    --ec;
  }
  function Zi() {
    Lb = (ce = Nc.now()) + $d;
    ec = Pc = 0;
    try {
      Yi();
    } finally {
      ec = 0;
      for (var a, c = be, d, e = Infinity; c;) {
        c._call ? (e > c._time && (e = c._time), a = c, c = c._next) : (d = c._next, c._next = null, c = a ? a._next = d : be = d);
      }
      Qc = a;
      bg(e);
      Lb = 0;
    }
  }
  function mp() {
    var a = Nc.now(), c = a - ce;
    1000 < c && ($d -= c, ce = a);
  }
  function bg(a) {
    ec || (Pc && (Pc = clearTimeout(Pc)), 24 < a - Lb ? (Infinity > a && (Pc = setTimeout(Zi, a - Nc.now() - $d)), Rc && (Rc = clearInterval(Rc))) : (Rc || (ce = Nc.now(), Rc = setInterval(mp, 1000)), ec = 1, Xi(Zi)));
  }
  function cg(a, c, d) {
    var e = new Oc;
    c = null == c ? 0 : +c;
    e.restart(function(d) {
      e.stop();
      a(d + c);
    }, c, d);
    return e;
  }
  function de(a, c, d, e, g, h) {
    var k = a.__transition;
    if (!k) {
      a.__transition = {};
    } else {
      if (d in k) {
        return;
      }
    }
    np(a, d, {name:c, index:e, group:g, on:op, tween:pp, time:h.time, delay:h.delay, duration:h.duration, ease:h.ease, timer:null, state:0});
  }
  function dg(a, c) {
    a = Va(a, c);
    if (0 < a.state) {
      throw Error("too late; already scheduled");
    }
    return a;
  }
  function ib(a, c) {
    a = Va(a, c);
    if (3 < a.state) {
      throw Error("too late; already running");
    }
    return a;
  }
  function Va(a, c) {
    a = a.__transition;
    if (!a || !(a = a[c])) {
      throw Error("transition not found");
    }
    return a;
  }
  function np(a, c, d) {
    function e(t) {
      var b, l;
      if (1 !== d.state) {
        return h();
      }
      for (v in k) {
        var r = k[v];
        if (r.name === d.name) {
          if (3 === r.state) {
            return cg(e);
          }
          4 === r.state ? (r.state = 6, r.timer.stop(), r.on.call("interrupt", a, a.__data__, r.index, r.group), delete k[v]) : +v < c && (r.state = 6, r.timer.stop(), r.on.call("cancel", a, a.__data__, r.index, r.group), delete k[v]);
        }
      }
      cg(function() {
        3 === d.state && (d.state = 4, d.timer.restart(g, d.delay, d.time), g(t));
      });
      d.state = 2;
      d.on.call("start", a, a.__data__, d.index, d.group);
      if (2 === d.state) {
        d.state = 3;
        p = Array(l = d.tween.length);
        var v = 0;
        for (b = -1; v < l; ++v) {
          if (r = d.tween[v].value.call(a, a.__data__, d.index, d.group)) {
            p[++b] = r;
          }
        }
        p.length = b + 1;
      }
    }
    function g(c) {
      c = c < d.duration ? d.ease.call(null, c / d.duration) : (d.timer.restart(h), d.state = 5, 1);
      for (var e = -1, g = p.length; ++e < g;) {
        p[e].call(a, c);
      }
      5 === d.state && (d.on.call("end", a, a.__data__, d.index, d.group), h());
    }
    function h() {
      d.state = 6;
      d.timer.stop();
      delete k[c];
      for (var e in k) {
        return;
      }
      delete a.__transition;
    }
    var k = a.__transition, p;
    k[c] = d;
    d.timer = ae(function(a) {
      d.state = 1;
      d.timer.restart(e, d.delay, d.time);
      d.delay <= a && e(a - d.delay);
    }, 0, d.time);
  }
  function Mb(a, c) {
    var d = a.__transition, e, g = !0, h;
    if (d) {
      c = null == c ? null : c + "";
      for (h in d) {
        if ((e = d[h]).name !== c) {
          g = !1;
        } else {
          var k = 2 < e.state && 5 > e.state;
          e.state = 6;
          e.timer.stop();
          e.on.call(k ? "interrupt" : "cancel", a, a.__data__, e.index, e.group);
          delete d[h];
        }
      }
      g && delete a.__transition;
    }
  }
  function qp(a, c) {
    var d, e;
    return function() {
      var g = ib(this, a), h = g.tween;
      if (h !== d) {
        e = d = h;
        h = 0;
        for (var k = e.length; h < k; ++h) {
          if (e[h].name === c) {
            e = e.slice();
            e.splice(h, 1);
            break;
          }
        }
      }
      g.tween = e;
    };
  }
  function rp(a, c, d) {
    var e, g;
    if ("function" !== typeof d) {
      throw Error();
    }
    return function() {
      var h = ib(this, a), k = h.tween;
      if (k !== e) {
        g = (e = k).slice();
        k = {name:c, value:d};
        for (var p = 0, t = g.length; p < t; ++p) {
          if (g[p].name === c) {
            g[p] = k;
            break;
          }
        }
        p === t && g.push(k);
      }
      h.tween = g;
    };
  }
  function eg(a, c, d) {
    var e = a._id;
    a.each(function() {
      var a = ib(this, e);
      (a.value || (a.value = {}))[c] = d.apply(this, arguments);
    });
    return function(a) {
      return Va(a, e).value[c];
    };
  }
  function $i(a, c) {
    var d;
    return ("number" === typeof c ? Pa : c instanceof wb ? Lc : (d = wb(c)) ? (c = d, Lc) : Zf)(a, c);
  }
  function sp(a) {
    return function() {
      this.removeAttribute(a);
    };
  }
  function tp(a) {
    return function() {
      this.removeAttributeNS(a.space, a.local);
    };
  }
  function up(a, c, d) {
    var e, g = d + "", h;
    return function() {
      var k = this.getAttribute(a);
      return k === g ? null : k === e ? h : h = c(e = k, d);
    };
  }
  function vp(a, c, d) {
    var e, g = d + "", h;
    return function() {
      var k = this.getAttributeNS(a.space, a.local);
      return k === g ? null : k === e ? h : h = c(e = k, d);
    };
  }
  function wp(a, c, d) {
    var e, g, h;
    return function() {
      var k = d(this);
      if (null == k) {
        return void this.removeAttribute(a);
      }
      var p = this.getAttribute(a);
      var t = k + "";
      return p === t ? null : p === e && t === g ? h : (g = t, h = c(e = p, k));
    };
  }
  function xp(a, c, d) {
    var e, g, h;
    return function() {
      var k = d(this);
      if (null == k) {
        return void this.removeAttributeNS(a.space, a.local);
      }
      var p = this.getAttributeNS(a.space, a.local);
      var t = k + "";
      return p === t ? null : p === e && t === g ? h : (g = t, h = c(e = p, k));
    };
  }
  function yp(a, c) {
    return function(d) {
      this.setAttribute(a, c(d));
    };
  }
  function zp(a, c) {
    return function(d) {
      this.setAttributeNS(a.space, a.local, c(d));
    };
  }
  function Ap(a, c) {
    function d() {
      var d = c.apply(this, arguments);
      d !== g && (e = (g = d) && zp(a, d));
      return e;
    }
    var e, g;
    d._value = c;
    return d;
  }
  function Bp(a, c) {
    function d() {
      var d = c.apply(this, arguments);
      d !== g && (e = (g = d) && yp(a, d));
      return e;
    }
    var e, g;
    d._value = c;
    return d;
  }
  function Cp(a, c) {
    return function() {
      dg(this, a).delay = +c.apply(this, arguments);
    };
  }
  function Dp(a, c) {
    return c = +c, function() {
      dg(this, a).delay = c;
    };
  }
  function Ep(a, c) {
    return function() {
      ib(this, a).duration = +c.apply(this, arguments);
    };
  }
  function Fp(a, c) {
    return c = +c, function() {
      ib(this, a).duration = c;
    };
  }
  function Gp(a, c) {
    if ("function" !== typeof c) {
      throw Error();
    }
    return function() {
      ib(this, a).ease = c;
    };
  }
  function Hp(a) {
    return (a + "").trim().split(/^|\s+/).every(function(a) {
      var c = a.indexOf(".");
      0 <= c && (a = a.slice(0, c));
      return !a || "start" === a;
    });
  }
  function Ip(a, c, d) {
    var e, g, h = Hp(c) ? dg : ib;
    return function() {
      var k = h(this, a), p = k.on;
      if (p !== e) {
        (g = (e = p).copy()).on(c, d);
      }
      k.on = g;
    };
  }
  function Jp(a) {
    return function() {
      var c = this.parentNode, d;
      for (d in this.__transition) {
        if (+d !== a) {
          return;
        }
      }
      c && c.removeChild(this);
    };
  }
  function Kp(a, c) {
    var d, e, g;
    return function() {
      var h = Ib(this, a), k = (this.style.removeProperty(a), Ib(this, a));
      return h === k ? null : h === d && k === e ? g : g = c(d = h, e = k);
    };
  }
  function aj(a) {
    return function() {
      this.style.removeProperty(a);
    };
  }
  function Lp(a, c, d) {
    var e, g = d + "", h;
    return function() {
      var k = Ib(this, a);
      return k === g ? null : k === e ? h : h = c(e = k, d);
    };
  }
  function Mp(a, c, d) {
    var e, g, h;
    return function() {
      var k = Ib(this, a), p = d(this), t = p + "";
      null == p && (t = p = (this.style.removeProperty(a), Ib(this, a)));
      return k === t ? null : k === e && t === g ? h : (g = t, h = c(e = k, p));
    };
  }
  function Np(a, c) {
    var d, e, g, h = "style." + c, k = "end." + h, p;
    return function() {
      var t = ib(this, a), b = t.on, l = null == t.value[h] ? p || (p = aj(c)) : void 0;
      if (b !== d || g !== l) {
        (e = (d = b).copy()).on(k, g = l);
      }
      t.on = e;
    };
  }
  function Op(a, c, d) {
    return function(e) {
      this.style.setProperty(a, c(e), d);
    };
  }
  function Pp(a, c, d) {
    function e() {
      var e = c.apply(this, arguments);
      e !== h && (g = (h = e) && Op(a, e, d));
      return g;
    }
    var g, h;
    e._value = c;
    return e;
  }
  function Qp(a) {
    return function() {
      this.textContent = a;
    };
  }
  function Rp(a) {
    return function() {
      var c = a(this);
      this.textContent = null == c ? "" : c;
    };
  }
  function cb(a, c, d, e) {
    this._groups = a;
    this._parents = c;
    this._name = d;
    this._id = e;
  }
  function bj(a) {
    return Jb().transition(a);
  }
  function cj(a) {
    return (1 >= (a *= 2) ? a * a : --a * (2 - a) + 1) / 2;
  }
  function fg(a) {
    return (1 >= (a *= 2) ? a * a * a : (a -= 2) * a * a + 2) / 2;
  }
  function dj(a) {
    return (1 - Math.cos(ej * a)) / 2;
  }
  function fj(a) {
    return (1 >= (a *= 2) ? Math.pow(2, 10 * a - 10) : 2 - Math.pow(2, 10 - 10 * a)) / 2;
  }
  function gj(a) {
    return (1 >= (a *= 2) ? 1 - Math.sqrt(1 - a * a) : Math.sqrt(1 - (a -= 2) * a) + 1) / 2;
  }
  function Sc(a) {
    return (a = +a) < gg ? ee * a * a : a < Sp ? ee * (a -= Tp) * a + .75 : a < Up ? ee * (a -= Vp) * a + .9375 : ee * (a -= Wp) * a + .984375;
  }
  function hj(a) {
    return function() {
      return a;
    };
  }
  function Xp(a, c, d) {
    this.target = a;
    this.type = c;
    this.selection = d;
  }
  function fe() {
    b.event.preventDefault();
    b.event.stopImmediatePropagation();
  }
  function Tc(a) {
    return {type:a};
  }
  function Yp() {
    return !b.event.button;
  }
  function Zp() {
    var a = this.ownerSVGElement || this;
    return [[0, 0], [a.width.baseVal.value, a.height.baseVal.value]];
  }
  function hg(a) {
    for (; !a.__brush;) {
      if (!(a = a.parentNode)) {
        return;
      }
    }
    return a.__brush;
  }
  function ig(a) {
    return a[0][0] === a[1][0] || a[0][1] === a[1][1];
  }
  function jg(a) {
    function c(c) {
      var e = c.property("__brush", k).selectAll(".overlay").data([Tc("overlay")]);
      e.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", jb.overlay).merge(e).each(function() {
        var a = hg(this).extent;
        Ha(this).attr("x", a[0][0]).attr("y", a[0][1]).attr("width", a[1][0] - a[0][0]).attr("height", a[1][1] - a[0][1]);
      });
      c.selectAll(".selection").data([Tc("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", jb.selection).attr("fill", "#777").attr("fill-opacity", 0.3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
      e = c.selectAll(".handle").data(a.handles, function(a) {
        return a.type;
      });
      e.exit().remove();
      e.enter().append("rect").attr("class", function(a) {
        return "handle handle--" + a.type;
      }).attr("cursor", function(a) {
        return jb[a.type];
      });
      c.each(d).attr("fill", "none").attr("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush touchstart.brush", h);
    }
    function d() {
      var a = Ha(this), c = hg(this).selection;
      c ? (a.selectAll(".selection").style("display", null).attr("x", c[0][0]).attr("y", c[0][1]).attr("width", c[1][0] - c[0][0]).attr("height", c[1][1] - c[0][1]), a.selectAll(".handle").style("display", null).attr("x", function(a) {
        return "e" === a.type[a.type.length - 1] ? c[1][0] - l / 2 : c[0][0] - l / 2;
      }).attr("y", function(a) {
        return "s" === a.type[0] ? c[1][1] - l / 2 : c[0][1] - l / 2;
      }).attr("width", function(a) {
        return "n" === a.type || "s" === a.type ? c[1][0] - c[0][0] + l : l;
      }).attr("height", function(a) {
        return "e" === a.type || "w" === a.type ? c[1][1] - c[0][1] + l : l;
      })) : a.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
    }
    function e(a, c) {
      return a.__brush.emitter || new g(a, c);
    }
    function g(a, c) {
      this.that = a;
      this.args = c;
      this.state = a.__brush;
      this.active = 0;
    }
    function h() {
      function c() {
        var a = ub(p);
        !H || M || O || (Math.abs(a[0] - V[0]) > Math.abs(a[1] - V[1]) ? O = !0 : M = !0);
        V = a;
        L = !0;
        fe();
        g();
      }
      function g() {
        A = V[0] - Q[0];
        G = V[1] - Q[1];
        switch(x) {
          case kg:
          case ij:
            J && (A = Math.max(f - m, Math.min(q - w, A)), T = m + A, ia = w + A);
            K && (G = Math.max(u - n, Math.min(B - E, G)), Y = n + G, pa = E + G);
            break;
          case fc:
            0 > J ? (A = Math.max(f - m, Math.min(q - m, A)), T = m + A, ia = w) : 0 < J && (A = Math.max(f - w, Math.min(q - w, A)), T = m, ia = w + A);
            0 > K ? (G = Math.max(u - n, Math.min(B - n, G)), Y = n + G, pa = E) : 0 < K && (G = Math.max(u - E, Math.min(B - E, G)), Y = n, pa = E + G);
            break;
          case gc:
            J && (T = Math.max(f, Math.min(q, m - A * J)), ia = Math.max(f, Math.min(q, w + A * J))), K && (Y = Math.max(u, Math.min(B, n - G * K)), pa = Math.max(u, Math.min(B, E + G * K)));
        }
        if (ia < T) {
          J *= -1;
          var a = m;
          m = w;
          w = a;
          a = T;
          T = ia;
          ia = a;
          y in jj && Nb.attr("cursor", jb[y = jj[y]]);
        }
        pa < Y && (K *= -1, a = n, n = E, E = a, a = Y, Y = pa, pa = a, y in kj && Nb.attr("cursor", jb[y = kj[y]]));
        N.selection && (X = N.selection);
        M && (T = X[0][0], ia = X[1][0]);
        O && (Y = X[0][1], pa = X[1][1]);
        if (X[0][0] !== T || X[0][1] !== Y || X[1][0] !== ia || X[1][1] !== pa) {
          N.selection = [[T, Y], [ia, pa]], d.call(p), ka.brush();
        }
      }
      function h() {
        b.event.stopImmediatePropagation();
        if (b.event.touches) {
          if (b.event.touches.length) {
            return;
          }
          r && clearTimeout(r);
          r = setTimeout(function() {
            r = null;
          }, 500);
          ge.on("touchmove.brush touchend.brush touchcancel.brush", null);
        } else {
          Td(b.event.view, L), R.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
        }
        ge.attr("pointer-events", "all");
        Nb.attr("cursor", jb.overlay);
        N.selection && (X = N.selection);
        ig(X) && (N.selection = null, d.call(p));
        ka.end();
      }
      function l() {
        switch(b.event.keyCode) {
          case 16:
            H = J && K;
            break;
          case 18:
            x === fc && (J && (w = ia - A * J, m = T + A * J), K && (E = pa - G * K, n = Y + G * K), x = gc, g());
            break;
          case 32:
            if (x === fc || x === gc) {
              0 > J ? w = ia - A : 0 < J && (m = T - A), 0 > K ? E = pa - G : 0 < K && (n = Y - G), x = kg, Nb.attr("cursor", jb.selection), g();
            }
            break;
          default:
            return;
        }
        fe();
      }
      function k() {
        switch(b.event.keyCode) {
          case 16:
            H && (M = O = H = !1, g());
            break;
          case 18:
            x === gc && (0 > J ? w = ia : 0 < J && (m = T), 0 > K ? E = pa : 0 < K && (n = Y), x = fc, g());
            break;
          case 32:
            x === kg && (b.event.altKey ? (J && (w = ia - A * J, m = T + A * J), K && (E = pa - G * K, n = Y + G * K), x = gc) : (0 > J ? w = ia : 0 < J && (m = T), 0 > K ? E = pa : 0 < K && (n = Y), x = fc), Nb.attr("cursor", jb[y]), g());
            break;
          default:
            return;
        }
        fe();
      }
      if (b.event.touches) {
        if (b.event.changedTouches.length < b.event.touches.length) {
          return fe();
        }
      } else {
        if (r) {
          return;
        }
      }
      if (t.apply(this, arguments)) {
        var p = this, y = b.event.target.__data__.type, x = "selection" === (b.event.metaKey ? y = "overlay" : y) ? ij : b.event.altKey ? gc : fc, J = a === he ? null : $p[y], K = a === ie ? null : aq[y], N = hg(p), S = N.extent, X = N.selection, f = S[0][0], m, u = S[0][1], n, q = S[1][0], w, B = S[1][1], E, A, G, L, H = J && K && b.event.shiftKey, M, O, Q = ub(p), V = Q, ka = e(p, arguments).beforestart();
        "overlay" === y ? N.selection = X = [[m = a === he ? f : Q[0], n = a === ie ? u : Q[1]], [w = a === he ? q : m, E = a === ie ? B : n]] : (m = X[0][0], n = X[0][1], w = X[1][0], E = X[1][1]);
        var T = m;
        var Y = n;
        var ia = w;
        var pa = E;
        var ge = Ha(p).attr("pointer-events", "none"), Nb = ge.selectAll(".overlay").attr("cursor", jb[y]);
        if (b.event.touches) {
          ge.on("touchmove.brush", c, !0).on("touchend.brush touchcancel.brush", h, !0);
        } else {
          var R = Ha(b.event.view).on("keydown.brush", l, !0).on("keyup.brush", k, !0).on("mousemove.brush", c, !0).on("mouseup.brush", h, !0);
          Sd(b.event.view);
        }
        b.event.stopImmediatePropagation();
        Mb(p);
        d.call(p);
        ka.start();
      }
    }
    function k() {
      var c = this.__brush || {selection:null};
      c.extent = p.apply(this, arguments);
      c.dim = a;
      return c;
    }
    var p = Zp, t = Yp, y = Hb(c, "start", "brush", "end"), l = 6, r;
    c.move = function(c, g) {
      c.selection ? c.on("start.brush", function() {
        e(this, arguments).beforestart().start();
      }).on("interrupt.brush end.brush", function() {
        e(this, arguments).end();
      }).tween("brush", function() {
        function c(a) {
          l.selection = 1 === a && ig(r) ? null : t(a);
          d.call(h);
          k.brush();
        }
        var h = this, l = h.__brush, k = e(h, arguments), p = l.selection, r = a.input("function" === typeof g ? g.apply(this, arguments) : g, l.extent), t = Kc(p, r);
        return p && r ? c : c(1);
      }) : c.each(function() {
        var c = arguments, h = this.__brush, l = a.input("function" === typeof g ? g.apply(this, c) : g, h.extent);
        c = e(this, c).beforestart();
        Mb(this);
        h.selection = null == l || ig(l) ? null : l;
        d.call(this);
        c.start().brush().end();
      });
    };
    g.prototype = {beforestart:function() {
      1 === ++this.active && (this.state.emitter = this, this.starting = !0);
      return this;
    }, start:function() {
      this.starting && (this.starting = !1, this.emit("start"));
      return this;
    }, brush:function() {
      this.emit("brush");
      return this;
    }, end:function() {
      0 === --this.active && (delete this.state.emitter, this.emit("end"));
      return this;
    }, emit:function(d) {
      Ic(new Xp(c, d, a.output(this.state.selection)), y.apply, y, [d, this.that, this.args]);
    }};
    c.extent = function(a) {
      return arguments.length ? (p = "function" === typeof a ? a : hj([[+a[0][0], +a[0][1]], [+a[1][0], +a[1][1]]]), c) : p;
    };
    c.filter = function(a) {
      return arguments.length ? (t = "function" === typeof a ? a : hj(!!a), c) : t;
    };
    c.handleSize = function(a) {
      return arguments.length ? (l = +a, c) : l;
    };
    c.on = function() {
      var a = y.on.apply(y, arguments);
      return a === y ? c : a;
    };
    return c;
  }
  function bq(a) {
    return function(c, d) {
      return a(c.source.value + c.target.value, d.source.value + d.target.value);
    };
  }
  function lg(a) {
    return function() {
      return a;
    };
  }
  function mg() {
    this._x0 = this._y0 = this._x1 = this._y1 = null;
    this._ = "";
  }
  function xb() {
    return new mg;
  }
  function cq(a) {
    return a.source;
  }
  function dq(a) {
    return a.target;
  }
  function eq(a) {
    return a.radius;
  }
  function fq(a) {
    return a.startAngle;
  }
  function gq(a) {
    return a.endAngle;
  }
  function je() {
  }
  function kb(a, c) {
    var d = new je;
    if (a instanceof je) {
      a.each(function(a, c) {
        d.set(c, a);
      });
    } else {
      if (Array.isArray(a)) {
        var e = -1, g = a.length, h;
        if (null == c) {
          for (; ++e < g;) {
            d.set(e, a[e]);
          }
        } else {
          for (; ++e < g;) {
            d.set(c(h = a[e], e, a), h);
          }
        }
      } else {
        if (a) {
          for (e in a) {
            d.set(e, a[e]);
          }
        }
      }
    }
    return d;
  }
  function hq() {
    return {};
  }
  function iq(a, c, d) {
    a[c] = d;
  }
  function lj() {
    return kb();
  }
  function mj(a, c, d) {
    a.set(c, d);
  }
  function ke() {
  }
  function nj(a, c) {
    var d = new ke;
    if (a instanceof ke) {
      a.each(function(a) {
        d.add(a);
      });
    } else {
      if (a) {
        var e = -1, g = a.length;
        if (null == c) {
          for (; ++e < g;) {
            d.add(a[e]);
          }
        } else {
          for (; ++e < g;) {
            d.add(c(a[e], e, a));
          }
        }
      }
    }
    return d;
  }
  function jq(a, c) {
    return a - c;
  }
  function yb(a) {
    return function() {
      return a;
    };
  }
  function kq() {
  }
  function oj() {
    function a(a) {
      var d = k(a);
      if (Array.isArray(d)) {
        d = d.slice().sort(jq);
      } else {
        var e = Af(a), g = e[0];
        e = e[1];
        d = Gb(g, e, d);
        d = Ka(Math.floor(g / d) * d, Math.floor(e / d) * d, d);
      }
      return d.map(function(d) {
        return c(a, d);
      });
    }
    function c(a, c) {
      var e = [], g = [];
      d(a, c, function(d) {
        p(d, a, c);
        for (var h = 0, l = d.length, k = d[l - 1][1] * d[0][0] - d[l - 1][0] * d[0][1]; ++h < l;) {
          k += d[h - 1][1] * d[h][0] - d[h - 1][0] * d[h][1];
        }
        0 < k ? e.push([d]) : g.push(d);
      });
      g.forEach(function(a) {
        for (var c = 0, d = e.length, g; c < d; ++c) {
          a: {
            var h = (g = e[c])[0];
            for (var l = a, k = -1, p = l.length; ++k < p;) {
              b: {
                var r = h;
                for (var t = l[k], b = t[0], v = t[1], y = -1, f = 0, m = r.length, u = m - 1; f < m; u = f++) {
                  var n = r[f], q = n[0], w = n[1], B = r[u];
                  u = B[0];
                  var E = B[1], A, G = n;
                  n = B;
                  B = t;
                  if (A = (n[0] - G[0]) * (B[1] - G[1]) === (B[0] - G[0]) * (n[1] - G[1])) {
                    G = G[A = +(G[0] === n[0])], B = B[A], n = n[A], A = G <= B && B <= n || n <= B && B <= G;
                  }
                  if (A) {
                    r = 0;
                    break b;
                  }
                  w > v !== E > v && b < (u - q) * (v - w) / (E - w) + q && (y = -y);
                }
                r = y;
              }
              if (r) {
                h = r;
                break a;
              }
            }
            h = 0;
          }
          if (-1 !== h) {
            g.push(a);
            break;
          }
        }
      });
      return {type:"MultiPolygon", value:c, coordinates:e};
    }
    function d(a, c, d) {
      function e(a) {
        var c = [a[0][0] + t, a[0][1] + p];
        a = [a[1][0] + t, a[1][1] + p];
        var e = 2 * c[0] + c[1] * (g + 1) * 4, h = 2 * a[0] + a[1] * (g + 1) * 4, r, f;
        (r = k[e]) ? (f = l[h]) ? (delete k[r.end], delete l[f.start], r === f ? (r.ring.push(a), d(r.ring)) : l[r.start] = k[f.end] = {start:r.start, end:f.end, ring:r.ring.concat(f.ring)}) : (delete k[r.end], r.ring.push(a), k[r.end = h] = r) : (r = l[h]) ? (f = k[e]) ? (delete l[r.start], delete k[f.end], r === f ? (r.ring.push(a), d(r.ring)) : l[f.start] = k[r.end] = {start:f.start, end:r.end, ring:f.ring.concat(r.ring)}) : (delete l[r.start], r.ring.unshift(c), l[r.start = e] = r) : l[e] = k[h] = 
        {start:e, end:h, ring:[c, a]};
      }
      var l = [], k = [], p;
      var t = p = -1;
      var b = a[0] >= c;
      for (lb[b << 1].forEach(e); ++t < g - 1;) {
        var y = b;
        b = a[t + 1] >= c;
        lb[y | b << 1].forEach(e);
      }
      for (lb[b << 0].forEach(e); ++p < h - 1;) {
        t = -1;
        b = a[p * g + g] >= c;
        var C = a[p * g] >= c;
        for (lb[b << 1 | C << 2].forEach(e); ++t < g - 1;) {
          y = b;
          b = a[p * g + g + t + 1] >= c;
          var x = C;
          C = a[p * g + t + 1] >= c;
          lb[y | b << 1 | C << 2 | x << 3].forEach(e);
        }
        lb[b | C << 3].forEach(e);
      }
      t = -1;
      C = a[p * g] >= c;
      for (lb[C << 2].forEach(e); ++t < g - 1;) {
        x = C, C = a[p * g + t + 1] >= c, lb[C << 2 | x << 3].forEach(e);
      }
      lb[C << 3].forEach(e);
    }
    function e(a, c, d) {
      a.forEach(function(a) {
        var e = a[0], l = a[1], k = e | 0, p = l | 0, r = c[p * g + k];
        if (0 < e && e < g && k === e) {
          var t = c[p * g + k - 1];
          a[0] = e + (d - t) / (r - t) - 0.5;
        }
        0 < l && l < h && p === l && (t = c[(p - 1) * g + k], a[1] = l + (d - t) / (r - t) - 0.5);
      });
    }
    var g = 1, h = 1, k = Ff, p = e;
    a.contour = c;
    a.size = function(c) {
      if (!arguments.length) {
        return [g, h];
      }
      var d = Math.ceil(c[0]), e = Math.ceil(c[1]);
      if (!(0 < d && 0 < e)) {
        throw Error("invalid size");
      }
      return g = d, h = e, a;
    };
    a.thresholds = function(c) {
      return arguments.length ? (k = "function" === typeof c ? c : Array.isArray(c) ? yb(pj.call(c)) : yb(c), a) : k;
    };
    a.smooth = function(c) {
      return arguments.length ? (p = c ? e : kq, a) : p === e;
    };
    return a;
  }
  function ng(a, c, d) {
    for (var e = a.width, g = a.height, h = (d << 1) + 1, k = 0; k < g; ++k) {
      for (var p = 0, t = 0; p < e + d; ++p) {
        p < e && (t += a.data[p + k * e]), p >= d && (p >= h && (t -= a.data[p - h + k * e]), c.data[p - d + k * e] = t / Math.min(p + 1, e - 1 + h - p, h));
      }
    }
  }
  function og(a, c, d) {
    for (var e = a.width, g = a.height, h = (d << 1) + 1, k = 0; k < e; ++k) {
      for (var p = 0, t = 0; p < g + d; ++p) {
        p < g && (t += a.data[k + p * e]), p >= d && (p >= h && (t -= a.data[k + (p - h) * e]), c.data[k + (p - d) * e] = t / Math.min(p + 1, g - 1 + h - p, h));
      }
    }
  }
  function lq(a) {
    return a[0];
  }
  function mq(a) {
    return a[1];
  }
  function nq() {
    return 1;
  }
  function qj(a) {
    return new Function("d", "return {" + a.map(function(a, d) {
      return JSON.stringify(a) + ": d[" + d + "]";
    }).join(",") + "}");
  }
  function oq(a, c) {
    var d = qj(a);
    return function(e, g) {
      return c(d(e), g, a);
    };
  }
  function rj(a) {
    var c = Object.create(null), d = [];
    a.forEach(function(a) {
      for (var e in a) {
        e in c || d.push(c[e] = e);
      }
    });
    return d;
  }
  function Ia(a, c) {
    a += "";
    var d = a.length;
    return d < c ? Array(c - d + 1).join(0) + a : a;
  }
  function le(a) {
    function c(a, c) {
      function d() {
        if (b) {
          return pg;
        }
        if (I) {
          return I = !1, sj;
        }
        var c, d = h, e;
        if (34 === a.charCodeAt(d)) {
          for (; h++ < g && 34 !== a.charCodeAt(h) || 34 === a.charCodeAt(++h);) {
          }
          (c = h) >= g ? b = !0 : 10 === (e = a.charCodeAt(h++)) ? I = !0 : 13 === e && (I = !0, 10 === a.charCodeAt(h) && ++h);
          return a.slice(d + 1, c - 1).replace(/""/g, '"');
        }
        for (; h < g;) {
          if (10 === (e = a.charCodeAt(c = h++))) {
            I = !0;
          } else {
            if (13 === e) {
              I = !0, 10 === a.charCodeAt(h) && ++h;
            } else {
              if (e !== k) {
                continue;
              }
            }
          }
          return a.slice(d, c);
        }
        return b = !0, a.slice(d, g);
      }
      var e = [], g = a.length, h = 0, p = 0, t, b = 0 >= g, I = !1;
      10 === a.charCodeAt(g - 1) && --g;
      for (13 === a.charCodeAt(g - 1) && --g; (t = d()) !== pg;) {
        for (var P = []; t !== sj && t !== pg;) {
          P.push(t), t = d();
        }
        c && null == (P = c(P, p++)) || e.push(P);
      }
      return e;
    }
    function d(c, d) {
      return c.map(function(c) {
        return d.map(function(a) {
          return g(c[a]);
        }).join(a);
      });
    }
    function e(c) {
      return c.map(g).join(a);
    }
    function g(a) {
      if (null == a) {
        a = "";
      } else {
        if (a instanceof Date) {
          var c = a.getUTCHours();
          var d = a.getUTCMinutes(), e = a.getUTCSeconds(), g = a.getUTCMilliseconds();
          if (isNaN(a)) {
            a = "Invalid Date";
          } else {
            var k = a.getUTCFullYear();
            a = (0 > k ? "-" + Ia(-k, 6) : 9999 < k ? "+" + Ia(k, 6) : Ia(k, 4)) + "-" + Ia(a.getUTCMonth() + 1, 2) + "-" + Ia(a.getUTCDate(), 2) + (g ? "T" + Ia(c, 2) + ":" + Ia(d, 2) + ":" + Ia(e, 2) + "." + Ia(g, 3) + "Z" : e ? "T" + Ia(c, 2) + ":" + Ia(d, 2) + ":" + Ia(e, 2) + "Z" : d || c ? "T" + Ia(c, 2) + ":" + Ia(d, 2) + "Z" : "");
          }
          c = a;
        } else {
          c = h.test(a += "") ? '"' + a.replace(/"/g, '""') + '"' : a;
        }
        a = c;
      }
      return a;
    }
    var h = new RegExp('["' + a + "\n\r]"), k = a.charCodeAt(0);
    return {parse:function(a, d) {
      var e, g;
      a = c(a, function(a, c) {
        if (e) {
          return e(a, c - 1);
        }
        g = a;
        e = d ? oq(a, d) : qj(a);
      });
      a.columns = g || [];
      return a;
    }, parseRows:c, format:function(c, e) {
      null == e && (e = rj(c));
      return [e.map(g).join(a)].concat(d(c, e)).join("\n");
    }, formatBody:function(a, c) {
      null == c && (c = rj(a));
      return d(a, c).join("\n");
    }, formatRows:function(a) {
      return a.map(e).join("\n");
    }};
  }
  function pq(a) {
    if (!a.ok) {
      throw Error(a.status + " " + a.statusText);
    }
    return a.blob();
  }
  function qq(a) {
    if (!a.ok) {
      throw Error(a.status + " " + a.statusText);
    }
    return a.arrayBuffer();
  }
  function rq(a) {
    if (!a.ok) {
      throw Error(a.status + " " + a.statusText);
    }
    return a.text();
  }
  function me(a, c) {
    return fetch(a, c).then(rq);
  }
  function tj(a) {
    return function(c, d, e) {
      2 === arguments.length && "function" === typeof d && (e = d, d = void 0);
      return me(c, d).then(function(c) {
        return a(c, e);
      });
    };
  }
  function sq(a) {
    if (!a.ok) {
      throw Error(a.status + " " + a.statusText);
    }
    return a.json();
  }
  function qg(a) {
    return function(c, d) {
      return me(c, d).then(function(c) {
        return (new DOMParser).parseFromString(c, a);
      });
    };
  }
  function qa(a) {
    return function() {
      return a;
    };
  }
  function zb() {
    return 1e-6 * (Math.random() - 0.5);
  }
  function uj(a, c, d, e) {
    if (isNaN(c) || isNaN(d)) {
      return a;
    }
    var g, h = a._root;
    e = {data:e};
    var k = a._x0, p = a._y0, b = a._x1, y = a._y1, l, r, v, z;
    if (!h) {
      return a._root = e, a;
    }
    for (; h.length;) {
      if ((v = c >= (l = (k + b) / 2)) ? k = l : b = l, (z = d >= (r = (p + y) / 2)) ? p = r : y = r, g = h, !(h = h[v |= z << 1])) {
        return g[v] = e, a;
      }
    }
    var D = +a._x.call(null, h.data);
    var F = +a._y.call(null, h.data);
    if (c === D && d === F) {
      return e.next = h, g ? g[v] = e : a._root = e, a;
    }
    do {
      g = g ? g[v] = Array(4) : a._root = Array(4), (v = c >= (l = (k + b) / 2)) ? k = l : b = l, (z = d >= (r = (p + y) / 2)) ? p = r : y = r;
    } while ((v |= z << 1) === (z = (F >= r) << 1 | D >= l));
    return g[z] = h, g[v] = e, a;
  }
  function Aa(a, c, d, e, g) {
    this.node = a;
    this.x0 = c;
    this.y0 = d;
    this.x1 = e;
    this.y1 = g;
  }
  function tq(a) {
    return a[0];
  }
  function uq(a) {
    return a[1];
  }
  function ne(a, c, d) {
    c = new rg(null == c ? tq : c, null == d ? uq : d, NaN, NaN, NaN, NaN);
    return null == a ? c : c.addAll(a);
  }
  function rg(a, c, d, e, g, h) {
    this._x = a;
    this._y = c;
    this._x0 = d;
    this._y0 = e;
    this._x1 = g;
    this._y1 = h;
    this._root = void 0;
  }
  function vj(a) {
    for (var c = {data:a.data}, d = c; a = a.next;) {
      d = d.next = {data:a.data};
    }
    return c;
  }
  function vq(a) {
    return a.x + a.vx;
  }
  function wq(a) {
    return a.y + a.vy;
  }
  function xq(a) {
    return a.index;
  }
  function wj(a, c) {
    a = a.get(c);
    if (!a) {
      throw Error("missing: " + c);
    }
    return a;
  }
  function yq(a) {
    return a.x;
  }
  function zq(a) {
    return a.y;
  }
  function oe(a, c) {
    if (0 > (c = (a = c ? a.toExponential(c - 1) : a.toExponential()).indexOf("e"))) {
      return null;
    }
    var d = a.slice(0, c);
    return [1 < d.length ? d[0] + d.slice(2) : d, +a.slice(c + 1)];
  }
  function hc(a) {
    return a = oe(Math.abs(a)), a ? a[1] : NaN;
  }
  function Aq(a, c) {
    return function(d, e) {
      for (var g = d.length, h = [], k = 0, p = a[0], b = 0; 0 < g && 0 < p;) {
        b + p + 1 > e && (p = Math.max(1, e - b));
        h.push(d.substring(g -= p, g + p));
        if ((b += p + 1) > e) {
          break;
        }
        p = a[k = (k + 1) % a.length];
      }
      return h.reverse().join(c);
    };
  }
  function Bq(a) {
    return function(c) {
      return c.replace(/[0-9]/g, function(c) {
        return a[+c];
      });
    };
  }
  function Uc(a) {
    return new sg(a);
  }
  function sg(a) {
    if (!(c = Cq.exec(a))) {
      throw Error("invalid format: " + a);
    }
    var c;
    this.fill = c[1] || " ";
    this.align = c[2] || "\x3e";
    this.sign = c[3] || "-";
    this.symbol = c[4] || "";
    this.zero = !!c[5];
    this.width = c[6] && +c[6];
    this.comma = !!c[7];
    this.precision = c[8] && +c[8].slice(1);
    this.trim = !!c[9];
    this.type = c[10] || "";
  }
  function xj(a, c) {
    c = oe(a, c);
    if (!c) {
      return a + "";
    }
    a = c[0];
    c = c[1];
    return 0 > c ? "0." + Array(-c).join("0") + a : a.length > c + 1 ? a.slice(0, c + 1) + "." + a.slice(c + 1) : a + Array(c - a.length + 2).join("0");
  }
  function yj(a) {
    return a;
  }
  function zj(a) {
    function c(a) {
      function c(a) {
        var c = x, e = J, k, b;
        if ("c" === C) {
          e = K(a) + e, a = "";
        } else {
          a = +a;
          var t = 0 > a;
          a = K(Math.abs(a), I);
          if (P) {
            var q = a.length, v = 1, y = -1;
            a: for (; v < q; ++v) {
              switch(a[v]) {
                case ".":
                  y = k = v;
                  break;
                case "0":
                  0 === y && (y = v);
                  k = v;
                  break;
                default:
                  if (0 < y) {
                    if (!+a[v]) {
                      break a;
                    }
                    y = 0;
                  }
              }
            }
            a = 0 < y ? a.slice(0, y) + a.slice(k + 1) : a;
          }
          t && 0 === +a && (t = !1);
          c = (t ? "(" === r ? r : "-" : "-" === r || "(" === r ? "" : r) + c;
          e = ("s" === C ? Aj[8 + Bj / 3] : "") + e + (t && "(" === r ? ")" : "");
          if (N) {
            for (t = -1, k = a.length; ++t < k;) {
              if (b = a.charCodeAt(t), 48 > b || 57 < b) {
                e = (46 === b ? g + a.slice(t + 1) : a.slice(t)) + e;
                a = a.slice(0, t);
                break;
              }
            }
          }
        }
        F && !z && (a = d(a, Infinity));
        b = c.length + a.length + e.length;
        t = b < D ? Array(D - b + 1).join(p) : "";
        F && z && (a = d(t + a, t.length ? D - e.length : Infinity), t = "");
        switch(l) {
          case "\x3c":
            a = c + a + e + t;
            break;
          case "\x3d":
            a = c + t + a + e;
            break;
          case "^":
            a = t.slice(0, b = t.length >> 1) + c + a + e + t.slice(b);
            break;
          default:
            a = t + c + a + e;
        }
        return h(a);
      }
      a = Uc(a);
      var p = a.fill, l = a.align, r = a.sign, b = a.symbol, z = a.zero, D = a.width, F = a.comma, I = a.precision, P = a.trim, C = a.type;
      "n" === C ? (F = !0, C = "g") : Cj[C] || (null == I && (I = 12), P = !0, C = "g");
      if (z || "0" === p && "\x3d" === l) {
        z = !0, p = "0", l = "\x3d";
      }
      var x = "$" === b ? e[0] : "#" === b && /[boxX]/.test(C) ? "0" + C.toLowerCase() : "", J = "$" === b ? e[1] : /[%p]/.test(C) ? k : "", K = Cj[C], N = /[defgprs%]/.test(C);
      I = null == I ? 6 : /[gprs]/.test(C) ? Math.max(1, Math.min(21, I)) : Math.max(0, Math.min(20, I));
      c.toString = function() {
        return a + "";
      };
      return c;
    }
    var d = a.grouping && a.thousands ? Aq(a.grouping, a.thousands) : yj, e = a.currency, g = a.decimal, h = a.numerals ? Bq(a.numerals) : yj, k = a.percent || "%";
    return {format:c, formatPrefix:function(a, d) {
      var e = c((a = Uc(a), a.type = "f", a));
      a = 3 * Math.max(-8, Math.min(8, Math.floor(hc(d) / 3)));
      var g = Math.pow(10, -a), h = Aj[8 + a / 3];
      return function(a) {
        return e(g * a) + h;
      };
    }};
  }
  function Dj(a) {
    pe = zj(a);
    b.format = pe.format;
    b.formatPrefix = pe.formatPrefix;
    return pe;
  }
  function Ej(a) {
    return Math.max(0, -hc(Math.abs(a)));
  }
  function Fj(a, c) {
    return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(hc(c) / 3))) - hc(Math.abs(a)));
  }
  function Gj(a, c) {
    a = Math.abs(a);
    c = Math.abs(c) - a;
    return Math.max(0, hc(c) - hc(a)) + 1;
  }
  function Wa() {
    this.reset();
  }
  function Hj(a, c, d) {
    var e = a.s = c + d, g = e - c;
    a.t = c - (e - g) + (d - g);
  }
  function Ij(a) {
    return 1 < a ? 0 : -1 > a ? ca : Math.acos(a);
  }
  function Ba(a) {
    return 1 < a ? ja : -1 > a ? -ja : Math.asin(a);
  }
  function Jj(a) {
    return (a = R(a / 2)) * a;
  }
  function la() {
  }
  function qe(a, c) {
    if (a && Kj.hasOwnProperty(a.type)) {
      Kj[a.type](a, c);
    }
  }
  function tg(a, c, d) {
    var e = -1;
    d = a.length - d;
    for (c.lineStart(); ++e < d;) {
      var g = a[e];
      c.point(g[0], g[1], g[2]);
    }
    c.lineEnd();
  }
  function Lj(a, c) {
    var d = -1, e = a.length;
    for (c.polygonStart(); ++d < e;) {
      tg(a[d], c, 1);
    }
    c.polygonEnd();
  }
  function Xa(a, c) {
    if (a && Mj.hasOwnProperty(a.type)) {
      Mj[a.type](a, c);
    } else {
      qe(a, c);
    }
  }
  function Dq() {
    db.point = Eq;
  }
  function Fq() {
    Nj(Oj, Pj);
  }
  function Eq(a, c) {
    db.point = Nj;
    Oj = a;
    Pj = c;
    a *= U;
    c *= U;
    ug = a;
    vg = W(c = c / 2 + re);
    wg = R(c);
  }
  function Nj(a, c) {
    a *= U;
    c *= U;
    c = c / 2 + re;
    var d = a - ug, e = 0 <= d ? 1 : -1, g = e * d;
    d = W(c);
    c = R(c);
    var h = wg * c, k = vg * d + h * W(g);
    e = h * e * R(g);
    se.add(Ca(e, k));
    ug = a;
    vg = d;
    wg = c;
  }
  function te(a) {
    return [Ca(a[1], a[0]), Ba(a[2])];
  }
  function Ob(a) {
    var c = a[0];
    a = a[1];
    var d = W(a);
    return [d * W(c), d * R(c), R(a)];
  }
  function ue(a, c) {
    return a[0] * c[0] + a[1] * c[1] + a[2] * c[2];
  }
  function ic(a, c) {
    return [a[1] * c[2] - a[2] * c[1], a[2] * c[0] - a[0] * c[2], a[0] * c[1] - a[1] * c[0]];
  }
  function xg(a, c) {
    a[0] += c[0];
    a[1] += c[1];
    a[2] += c[2];
  }
  function ve(a, c) {
    return [a[0] * c, a[1] * c, a[2] * c];
  }
  function we(a) {
    var c = oa(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    a[0] /= c;
    a[1] /= c;
    a[2] /= c;
  }
  function yg(a, c) {
    Ab.push(mb = [ma = a, na = a]);
    c < La && (La = c);
    c > Qa && (Qa = c);
  }
  function Qj(a, c) {
    var d = Ob([a * U, c * U]);
    if (jc) {
      var e = ic(jc, d);
      e = ic([e[1], -e[0], 0], e);
      we(e);
      e = te(e);
      var g = a - Pb, h = 0 < g ? 1 : -1, k = e[0] * fa * h;
      g = 180 < ea(g);
      g ^ (h * Pb < k && k < h * a) ? (e = e[1] * fa, e > Qa && (Qa = e)) : (k = (k + 360) % 360 - 180, g ^ (h * Pb < k && k < h * a)) ? (e = -e[1] * fa, e < La && (La = e)) : (c < La && (La = c), c > Qa && (Qa = c));
      g ? a < Pb ? Ma(ma, a) > Ma(ma, na) && (na = a) : Ma(a, na) > Ma(ma, na) && (ma = a) : na >= ma ? (a < ma && (ma = a), a > na && (na = a)) : a > Pb ? Ma(ma, a) > Ma(ma, na) && (na = a) : Ma(a, na) > Ma(ma, na) && (ma = a);
    } else {
      Ab.push(mb = [ma = a, na = a]);
    }
    c < La && (La = c);
    c > Qa && (Qa = c);
    jc = d;
    Pb = a;
  }
  function Rj() {
    nb.point = Qj;
  }
  function Sj() {
    mb[0] = ma;
    mb[1] = na;
    nb.point = yg;
    jc = null;
  }
  function Tj(a, c) {
    if (jc) {
      var d = a - Pb;
      Vc.add(180 < ea(d) ? d + (0 < d ? 360 : -360) : d);
    } else {
      Uj = a, Vj = c;
    }
    db.point(a, c);
    Qj(a, c);
  }
  function Gq() {
    db.lineStart();
  }
  function Hq() {
    Tj(Uj, Vj);
    db.lineEnd();
    1e-6 < ea(Vc) && (ma = -(na = 180));
    mb[0] = ma;
    mb[1] = na;
    jc = null;
  }
  function Ma(a, c) {
    return 0 > (c -= a) ? c + 360 : c;
  }
  function Iq(a, c) {
    return a[0] - c[0];
  }
  function Wj(a, c) {
    return a[0] <= a[1] ? a[0] <= c && c <= a[1] : c < a[0] || a[1] < c;
  }
  function zg(a, c) {
    a *= U;
    c *= U;
    var d = W(c);
    Wc(d * W(a), d * R(a), R(c));
  }
  function Wc(a, c, d) {
    ++Xc;
    xe += (a - xe) / Xc;
    ye += (c - ye) / Xc;
    ze += (d - ze) / Xc;
  }
  function Xj() {
    Ya.point = Jq;
  }
  function Jq(a, c) {
    a *= U;
    c *= U;
    var d = W(c);
    Da = d * W(a);
    Ea = d * R(a);
    Fa = R(c);
    Ya.point = Kq;
    Wc(Da, Ea, Fa);
  }
  function Kq(a, c) {
    a *= U;
    c *= U;
    var d = W(c), e = d * W(a);
    a = d * R(a);
    c = R(c);
    var g = Ca(oa((g = Ea * c - Fa * a) * g + (g = Fa * e - Da * c) * g + (g = Da * a - Ea * e) * g), Da * e + Ea * a + Fa * c);
    Ae += g;
    Be += g * (Da + (Da = e));
    Ce += g * (Ea + (Ea = a));
    De += g * (Fa + (Fa = c));
    Wc(Da, Ea, Fa);
  }
  function Yj() {
    Ya.point = zg;
  }
  function Lq() {
    Ya.point = Mq;
  }
  function Nq() {
    Zj(ak, bk);
    Ya.point = zg;
  }
  function Mq(a, c) {
    ak = a;
    bk = c;
    a *= U;
    c *= U;
    Ya.point = Zj;
    var d = W(c);
    Da = d * W(a);
    Ea = d * R(a);
    Fa = R(c);
    Wc(Da, Ea, Fa);
  }
  function Zj(a, c) {
    a *= U;
    c *= U;
    var d = W(c), e = d * W(a);
    a = d * R(a);
    c = R(c);
    d = Ea * c - Fa * a;
    var g = Fa * e - Da * c, h = Da * a - Ea * e, k = oa(d * d + g * g + h * h), p = Ba(k);
    k = k && -p / k;
    Ag += k * d;
    Bg += k * g;
    Cg += k * h;
    Ae += p;
    Be += p * (Da + (Da = e));
    Ce += p * (Ea + (Ea = a));
    De += p * (Fa + (Fa = c));
    Wc(Da, Ea, Fa);
  }
  function kc(a) {
    return function() {
      return a;
    };
  }
  function Dg(a, c) {
    function d(d, g) {
      return d = a(d, g), c(d[0], d[1]);
    }
    a.invert && c.invert && (d.invert = function(d, g) {
      return d = c.invert(d, g), d && a.invert(d[0], d[1]);
    });
    return d;
  }
  function Eg(a, c) {
    return [ea(a) > ca ? a + Math.round(-a / Ja) * Ja : a, c];
  }
  function Fg(a, c, d) {
    return (a %= Ja) ? c || d ? Dg(ck(a), dk(c, d)) : ck(a) : c || d ? dk(c, d) : Eg;
  }
  function ek(a) {
    return function(c, d) {
      return c += a, [c > ca ? c - Ja : c < -ca ? c + Ja : c, d];
    };
  }
  function ck(a) {
    var c = ek(a);
    c.invert = ek(-a);
    return c;
  }
  function dk(a, c) {
    function d(a, c) {
      var d = W(c), l = W(a) * d;
      a = R(a) * d;
      c = R(c);
      d = c * e + l * g;
      return [Ca(a * h - d * k, l * e - c * g), Ba(d * h + a * k)];
    }
    var e = W(a), g = R(a), h = W(c), k = R(c);
    d.invert = function(a, c) {
      var d = W(c), l = W(a) * d;
      a = R(a) * d;
      c = R(c);
      d = c * h - a * k;
      return [Ca(a * h + c * k, l * e + d * g), Ba(d * e - l * g)];
    };
    return d;
  }
  function fk(a) {
    function c(c) {
      c = a(c[0] * U, c[1] * U);
      return c[0] *= fa, c[1] *= fa, c;
    }
    a = Fg(a[0] * U, a[1] * U, 2 < a.length ? a[2] * U : 0);
    c.invert = function(c) {
      c = a.invert(c[0] * U, c[1] * U);
      return c[0] *= fa, c[1] *= fa, c;
    };
    return c;
  }
  function gk(a, c, d, e, g, h) {
    if (d) {
      var k = W(c), p = R(c);
      d *= e;
      if (null == g) {
        g = c + e * Ja, h = c - d / 2;
      } else {
        if (g = hk(k, g), h = hk(k, h), 0 < e ? g < h : g > h) {
          g += e * Ja;
        }
      }
      for (; 0 < e ? g > h : g < h; g -= d) {
        c = te([k, -p * W(g), -p * R(g)]), a.point(c[0], c[1]);
      }
    }
  }
  function hk(a, c) {
    c = Ob(c);
    c[0] -= a;
    we(c);
    a = Ij(-c[1]);
    return ((0 > -c[2] ? -a : a) + Ja - 1e-6) % Ja;
  }
  function ik() {
    var a = [], c;
    return {point:function(a, e) {
      c.push([a, e]);
    }, lineStart:function() {
      a.push(c = []);
    }, lineEnd:la, rejoin:function() {
      1 < a.length && a.push(a.pop().concat(a.shift()));
    }, result:function() {
      var d = a;
      a = [];
      c = null;
      return d;
    }};
  }
  function Ee(a, c) {
    return 1e-6 > ea(a[0] - c[0]) && 1e-6 > ea(a[1] - c[1]);
  }
  function Fe(a, c, d, e) {
    this.x = a;
    this.z = c;
    this.o = d;
    this.e = e;
    this.v = !1;
    this.n = this.p = null;
  }
  function jk(a, c, d, e, g) {
    var h = [], k = [];
    a.forEach(function(a) {
      if (!(0 >= (c = a.length - 1))) {
        var c, d = a[0], e = a[c];
        if (Ee(d, e)) {
          g.lineStart();
          for (p = 0; p < c; ++p) {
            g.point((d = a[p])[0], d[1]);
          }
          g.lineEnd();
        } else {
          h.push(c = new Fe(d, a, null, !0)), k.push(c.o = new Fe(d, null, c, !1)), h.push(c = new Fe(e, a, null, !1)), k.push(c.o = new Fe(e, null, c, !0));
        }
      }
    });
    if (h.length) {
      k.sort(c);
      kk(h);
      kk(k);
      var p = 0;
      for (a = k.length; p < a; ++p) {
        k[p].e = d = !d;
      }
      d = h[0];
      for (var b;;) {
        for (var y = d, l = !0; y.v;) {
          if ((y = y.n) === d) {
            return;
          }
        }
        c = y.z;
        g.lineStart();
        do {
          y.v = y.o.v = !0;
          if (y.e) {
            if (l) {
              for (p = 0, a = c.length; p < a; ++p) {
                g.point((b = c[p])[0], b[1]);
              }
            } else {
              e(y.x, y.n.x, 1, g);
            }
            y = y.n;
          } else {
            if (l) {
              for (c = y.p.z, p = c.length - 1; 0 <= p; --p) {
                g.point((b = c[p])[0], b[1]);
              }
            } else {
              e(y.x, y.p.x, -1, g);
            }
            y = y.p;
          }
          y = y.o;
          c = y.z;
          l = !l;
        } while (!y.v);
        g.lineEnd();
      }
    }
  }
  function kk(a) {
    if (c = a.length) {
      for (var c, d = 0, e = a[0], g; ++d < c;) {
        e.n = g = a[d], g.p = e, e = g;
      }
      e.n = g = a[0];
      g.p = e;
    }
  }
  function lk(a, c) {
    var d = c[0];
    c = c[1];
    var e = R(c), g = [R(d), -W(d), 0], h = 0, k = 0;
    Gg.reset();
    1 === e ? c = ja + 1e-6 : -1 === e && (c = -ja - 1e-6);
    e = 0;
    for (var p = a.length; e < p; ++e) {
      if (y = (b = a[e]).length) {
        var b, y, l = b[y - 1], r = l[0], v = l[1] / 2 + re, z = R(v), D = W(v);
        for (v = 0; v < y; ++v, r = I, z = P, D = C, l = F) {
          var F = b[v], I = F[0];
          C = F[1] / 2 + re;
          var P = R(C), C = W(C), x = I - r, J = 0 <= x ? 1 : -1, K = J * x, N = K > ca;
          z *= P;
          Gg.add(Ca(z * J * R(K), D * C + z * W(K)));
          h += N ? x + J * Ja : x;
          N ^ r >= d ^ I >= d && (l = ic(Ob(l), Ob(F)), we(l), r = ic(g, l), we(r), r = (N ^ 0 <= x ? -1 : 1) * Ba(r[2]), c > r || c === r && (l[0] || l[1])) && (k += N ^ 0 <= x ? 1 : -1);
        }
      }
    }
    return (-1E-6 > h || 1e-6 > h && -1E-6 > Gg) ^ k & 1;
  }
  function mk(a, c, d, e) {
    return function(g) {
      function h(c, d) {
        a(c, d) && g.point(c, d);
      }
      function k(a, c) {
        v.point(a, c);
      }
      function p() {
        x.point = k;
        v.lineStart();
      }
      function b() {
        x.point = h;
        v.lineEnd();
      }
      function y(a, c) {
        C.push([a, c]);
        D.point(a, c);
      }
      function l() {
        D.lineStart();
        C = [];
      }
      function r() {
        y(C[0][0], C[0][1]);
        D.lineEnd();
        var a = D.clean(), c = z.result(), d = c.length, e;
        C.pop();
        I.push(C);
        C = null;
        if (d) {
          if (a & 1) {
            if (d = c[0], 0 < (c = d.length - 1)) {
              F || (g.polygonStart(), F = !0);
              g.lineStart();
              for (a = 0; a < c; ++a) {
                g.point((e = d[a])[0], e[1]);
              }
              g.lineEnd();
            }
          } else {
            1 < d && a & 2 && c.push(c.pop().concat(c.shift())), P.push(c.filter(Oq));
          }
        }
      }
      var v = c(g), z = ik(), D = c(z), F = !1, I, P, C, x = {point:h, lineStart:p, lineEnd:b, polygonStart:function() {
        x.point = y;
        x.lineStart = l;
        x.lineEnd = r;
        P = [];
        I = [];
      }, polygonEnd:function() {
        x.point = h;
        x.lineStart = p;
        x.lineEnd = b;
        P = Gf(P);
        var a = lk(I, e);
        P.length ? (F || (g.polygonStart(), F = !0), jk(P, Pq, a, d, g)) : a && (F || (g.polygonStart(), F = !0), g.lineStart(), d(null, null, 1, g), g.lineEnd());
        F && (g.polygonEnd(), F = !1);
        P = I = null;
      }, sphere:function() {
        g.polygonStart();
        g.lineStart();
        d(null, null, 1, g);
        g.lineEnd();
        g.polygonEnd();
      }};
      return x;
    };
  }
  function Oq(a) {
    return 1 < a.length;
  }
  function Pq(a, c) {
    return (0 > (a = a.x)[0] ? a[1] - ja - 1e-6 : ja - a[1]) - (0 > (c = c.x)[0] ? c[1] - ja - 1e-6 : ja - c[1]);
  }
  function nk(a) {
    function c(a, c) {
      return W(a) * W(c) > g;
    }
    function d(a, c, d) {
      var e = Ob(a), h = Ob(c), l = [1, 0, 0];
      h = ic(e, h);
      var k = ue(h, h);
      e = h[0];
      var p = k - e * e;
      if (!p) {
        return !d && a;
      }
      k = g * k / p;
      p = -g * e / p;
      e = ic(l, h);
      l = ve(l, k);
      h = ve(h, p);
      xg(l, h);
      h = ue(l, e);
      k = ue(e, e);
      p = h * h - k * (ue(l, l) - 1);
      if (!(0 > p)) {
        var b = oa(p);
        p = ve(e, (-h - b) / k);
        xg(p, l);
        p = te(p);
        if (!d) {
          return p;
        }
        d = a[0];
        var t = c[0];
        a = a[1];
        c = c[1];
        if (t < d) {
          var C = d;
          d = t;
          t = C;
        }
        var y = t - d, J = 1e-6 > ea(y - ca);
        !J && c < a && (C = a, a = c, c = C);
        if (J || 1e-6 > y ? J ? 0 < a + c ^ p[1] < (1e-6 > ea(p[0] - d) ? a : c) : a <= p[1] && p[1] <= c : y > ca ^ (d <= p[0] && p[0] <= t)) {
          return c = ve(e, (-h + b) / k), xg(c, l), [p, te(c)];
        }
      }
    }
    function e(c, d) {
      var e = k ? a : ca - a, g = 0;
      c < -e ? g |= 1 : c > e && (g |= 2);
      d < -e ? g |= 4 : d > e && (g |= 8);
      return g;
    }
    var g = W(a), h = 6 * U, k = 0 < g, p = 1e-6 < ea(g);
    return mk(c, function(a) {
      var g, h, r, b, t;
      return {lineStart:function() {
        b = r = !1;
        t = 1;
      }, point:function(l, v) {
        var y = [l, v], z = c(l, v);
        v = k ? z ? 0 : e(l, v) : z ? e(l + (0 > l ? ca : -ca), v) : 0;
        !g && (b = r = z) && a.lineStart();
        z !== r && (l = d(g, y), !l || Ee(g, l) || Ee(y, l)) && (y[0] += 1e-6, y[1] += 1e-6, z = c(y[0], y[1]));
        if (z !== r) {
          t = 0, z ? (a.lineStart(), l = d(y, g), a.point(l[0], l[1])) : (l = d(g, y), a.point(l[0], l[1]), a.lineEnd()), g = l;
        } else {
          if (p && g && k ^ z) {
            var C;
            v & h || !(C = d(y, g, !0)) || (t = 0, k ? (a.lineStart(), a.point(C[0][0], C[0][1]), a.point(C[1][0], C[1][1]), a.lineEnd()) : (a.point(C[1][0], C[1][1]), a.lineEnd(), a.lineStart(), a.point(C[0][0], C[0][1])));
          }
        }
        !z || g && Ee(g, y) || a.point(y[0], y[1]);
        g = y;
        r = z;
        h = v;
      }, lineEnd:function() {
        r && a.lineEnd();
        g = null;
      }, clean:function() {
        return t | (b && r) << 1;
      }};
    }, function(c, d, e, g) {
      gk(g, a, h, e, c, d);
    }, k ? [0, -a] : [-ca, a - ca]);
  }
  function Qq(a, c, d, e, g, h) {
    var k = a[0], p = a[1], b = 0, y = 1, l = c[0] - k, r = c[1] - p;
    d -= k;
    if (l || !(0 < d)) {
      d /= l;
      if (0 > l) {
        if (d < b) {
          return;
        }
        d < y && (y = d);
      } else {
        if (0 < l) {
          if (d > y) {
            return;
          }
          d > b && (b = d);
        }
      }
      d = g - k;
      if (l || !(0 > d)) {
        d /= l;
        if (0 > l) {
          if (d > y) {
            return;
          }
          d > b && (b = d);
        } else {
          if (0 < l) {
            if (d < b) {
              return;
            }
            d < y && (y = d);
          }
        }
        d = e - p;
        if (r || !(0 < d)) {
          d /= r;
          if (0 > r) {
            if (d < b) {
              return;
            }
            d < y && (y = d);
          } else {
            if (0 < r) {
              if (d > y) {
                return;
              }
              d > b && (b = d);
            }
          }
          d = h - p;
          if (r || !(0 > d)) {
            d /= r;
            if (0 > r) {
              if (d > y) {
                return;
              }
              d > b && (b = d);
            } else {
              if (0 < r) {
                if (d < b) {
                  return;
                }
                d < y && (y = d);
              }
            }
            0 < b && (a[0] = k + b * l, a[1] = p + b * r);
            1 > y && (c[0] = k + y * l, c[1] = p + y * r);
            return !0;
          }
        }
      }
    }
  }
  function Ge(a, c, d, e) {
    function g(g, k, l, b) {
      var r = 0, t = 0;
      if (null == g || (r = h(g, l)) !== (t = h(k, l)) || 0 > p(g, k) ^ 0 < l) {
        do {
          b.point(0 === r || 3 === r ? a : d, 1 < r ? e : c);
        } while ((r = (r + l + 4) % 4) !== t);
      } else {
        b.point(k[0], k[1]);
      }
    }
    function h(e, g) {
      return 1e-6 > ea(e[0] - a) ? 0 < g ? 0 : 3 : 1e-6 > ea(e[0] - d) ? 0 < g ? 2 : 1 : 1e-6 > ea(e[1] - c) ? 0 < g ? 1 : 0 : 0 < g ? 3 : 2;
    }
    function k(a, c) {
      return p(a.x, c.x);
    }
    function p(a, c) {
      var d = h(a, 1), e = h(c, 1);
      return d !== e ? d - e : 0 === d ? c[1] - a[1] : 1 === d ? a[0] - c[0] : 2 === d ? a[1] - c[1] : c[0] - a[0];
    }
    return function(h) {
      function p(g, h) {
        a <= g && g <= d && c <= h && h <= e && b.point(g, h);
      }
      function l(g, h) {
        var f = a <= g && g <= d && c <= h && h <= e;
        D && F.push([g, h]);
        if (N) {
          I = g, P = h, C = f, N = !1, f && (b.lineStart(), b.point(g, h));
        } else {
          if (f && K) {
            b.point(g, h);
          } else {
            var l = [x = Math.max(-1E9, Math.min(1e9, x)), J = Math.max(-1E9, Math.min(1e9, J))], k = [g = Math.max(-1E9, Math.min(1e9, g)), h = Math.max(-1E9, Math.min(1e9, h))];
            Qq(l, k, a, c, d, e) ? (K || (b.lineStart(), b.point(l[0], l[1])), b.point(k[0], k[1]), f || b.lineEnd(), S = !1) : f && (b.lineStart(), b.point(g, h), S = !1);
          }
        }
        x = g;
        J = h;
        K = f;
      }
      var b = h, t = ik(), z, D, F, I, P, C, x, J, K, N, S, X = {point:p, lineStart:function() {
        X.point = l;
        D && D.push(F = []);
        N = !0;
        K = !1;
        x = J = NaN;
      }, lineEnd:function() {
        z && (l(I, P), C && K && t.rejoin(), z.push(t.result()));
        X.point = p;
        K && b.lineEnd();
      }, polygonStart:function() {
        b = t;
        z = [];
        D = [];
        S = !0;
      }, polygonEnd:function() {
        for (var c, d = c = 0, l = D.length; d < l; ++d) {
          var p = D[d], r = 1, t = p.length, v = p[0], C = v[0];
          for (v = v[1]; r < t; ++r) {
            var x = C;
            var y = v;
            v = p[r];
            C = v[0];
            v = v[1];
            y <= e ? v > e && (C - x) * (e - y) > (v - y) * (a - x) && ++c : v <= e && (C - x) * (e - y) < (v - y) * (a - x) && --c;
          }
        }
        d = S && c;
        l = (z = Gf(z)).length;
        if (d || l) {
          h.polygonStart(), d && (h.lineStart(), g(null, null, 1, h), h.lineEnd()), l && jk(z, k, c, g, h), h.polygonEnd();
        }
        b = h;
        z = D = F = null;
      }};
      return X;
    };
  }
  function Rq() {
    lc.point = lc.lineEnd = la;
  }
  function Sq(a, c) {
    a *= U;
    c *= U;
    Hg = a;
    He = R(c);
    Ie = W(c);
    lc.point = Tq;
  }
  function Tq(a, c) {
    a *= U;
    c *= U;
    var d = R(c);
    c = W(c);
    var e = ea(a - Hg), g = W(e);
    e = R(e);
    e *= c;
    var h = Ie * d - He * c * g;
    g = He * d + Ie * c * g;
    Ig.add(Ca(oa(e * e + h * h), g));
    Hg = a;
    He = d;
    Ie = c;
  }
  function ok(a) {
    Ig.reset();
    Xa(a, lc);
    return +Ig;
  }
  function mc(a, c) {
    Jg[0] = a;
    Jg[1] = c;
    return ok(Uq);
  }
  function Je(a, c) {
    return a && pk.hasOwnProperty(a.type) ? pk[a.type](a, c) : !1;
  }
  function qk(a, c) {
    var d = mc(a[0], a[1]), e = mc(a[0], c);
    a = mc(c, a[1]);
    return e + a <= d + 1e-6;
  }
  function rk(a, c) {
    return !!lk(a.map(Vq), sk(c));
  }
  function Vq(a) {
    return a = a.map(sk), a.pop(), a;
  }
  function sk(a) {
    return [a[0] * U, a[1] * U];
  }
  function tk(a, c, d) {
    var e = Ka(a, c - 1e-6, d).concat(c);
    return function(a) {
      return e.map(function(c) {
        return [a, c];
      });
    };
  }
  function uk(a, c, d) {
    var e = Ka(a, c - 1e-6, d).concat(c);
    return function(a) {
      return e.map(function(c) {
        return [c, a];
      });
    };
  }
  function vk() {
    function a() {
      return {type:"MultiLineString", coordinates:c()};
    }
    function c() {
      return Ka(Ke(h / v) * v, g, v).map(I).concat(Ka(Ke(y / z) * z, b, z).map(P)).concat(Ka(Ke(e / l) * l, d, l).filter(function(a) {
        return 1e-6 < ea(a % v);
      }).map(D)).concat(Ka(Ke(p / r) * r, k, r).filter(function(a) {
        return 1e-6 < ea(a % z);
      }).map(F));
    }
    var d, e, g, h, k, p, b, y, l = 10, r = l, v = 90, z = 360, D, F, I, P, C = 2.5;
    a.lines = function() {
      return c().map(function(a) {
        return {type:"LineString", coordinates:a};
      });
    };
    a.outline = function() {
      return {type:"Polygon", coordinates:[I(h).concat(P(b).slice(1), I(g).reverse().slice(1), P(y).reverse().slice(1))]};
    };
    a.extent = function(c) {
      return arguments.length ? a.extentMajor(c).extentMinor(c) : a.extentMinor();
    };
    a.extentMajor = function(c) {
      if (!arguments.length) {
        return [[h, y], [g, b]];
      }
      h = +c[0][0];
      g = +c[1][0];
      y = +c[0][1];
      b = +c[1][1];
      h > g && (c = h, h = g, g = c);
      y > b && (c = y, y = b, b = c);
      return a.precision(C);
    };
    a.extentMinor = function(c) {
      if (!arguments.length) {
        return [[e, p], [d, k]];
      }
      e = +c[0][0];
      d = +c[1][0];
      p = +c[0][1];
      k = +c[1][1];
      e > d && (c = e, e = d, d = c);
      p > k && (c = p, p = k, k = c);
      return a.precision(C);
    };
    a.step = function(c) {
      return arguments.length ? a.stepMajor(c).stepMinor(c) : a.stepMinor();
    };
    a.stepMajor = function(c) {
      if (!arguments.length) {
        return [v, z];
      }
      v = +c[0];
      z = +c[1];
      return a;
    };
    a.stepMinor = function(c) {
      if (!arguments.length) {
        return [l, r];
      }
      l = +c[0];
      r = +c[1];
      return a;
    };
    a.precision = function(c) {
      if (!arguments.length) {
        return C;
      }
      C = +c;
      D = tk(p, k, 90);
      F = uk(e, d, C);
      I = tk(y, b, 90);
      P = uk(h, g, C);
      return a;
    };
    return a.extentMajor([[-180, -89.999999], [180, 89.999999]]).extentMinor([[-180, -80.000001], [180, 80.000001]]);
  }
  function Qb(a) {
    return a;
  }
  function Wq() {
    ob.point = Xq;
  }
  function Xq(a, c) {
    ob.point = wk;
    xk = Kg = a;
    yk = Lg = c;
  }
  function wk(a, c) {
    Mg.add(Lg * a - Kg * c);
    Kg = a;
    Lg = c;
  }
  function Yq() {
    wk(xk, yk);
  }
  function Rb(a, c) {
    Ng += a;
    Og += c;
    ++Yc;
  }
  function zk() {
    Ra.point = Zq;
  }
  function Zq(a, c) {
    Ra.point = $q;
    Rb(eb = a, fb = c);
  }
  function $q(a, c) {
    var d = a - eb, e = c - fb;
    d = oa(d * d + e * e);
    Le += d * (eb + a) / 2;
    Me += d * (fb + c) / 2;
    nc += d;
    Rb(eb = a, fb = c);
  }
  function Ak() {
    Ra.point = Rb;
  }
  function ar() {
    Ra.point = br;
  }
  function cr() {
    Bk(Ck, Dk);
  }
  function br(a, c) {
    Ra.point = Bk;
    Rb(Ck = eb = a, Dk = fb = c);
  }
  function Bk(a, c) {
    var d = a - eb, e = c - fb;
    d = oa(d * d + e * e);
    Le += d * (eb + a) / 2;
    Me += d * (fb + c) / 2;
    nc += d;
    d = fb * a - eb * c;
    Pg += d * (eb + a);
    Qg += d * (fb + c);
    Zc += 3 * d;
    Rb(eb = a, fb = c);
  }
  function Ek(a) {
    this._context = a;
  }
  function dr(a, c) {
    $c.point = Fk;
    Gk = ad = a;
    Hk = bd = c;
  }
  function Fk(a, c) {
    ad -= a;
    bd -= c;
    Rg.add(oa(ad * ad + bd * bd));
    ad = a;
    bd = c;
  }
  function Ik() {
    this._string = [];
  }
  function Jk(a) {
    return "m0," + a + "a" + a + "," + a + " 0 1,1 0," + -2 * a + "a" + a + "," + a + " 0 1,1 0," + 2 * a + "z";
  }
  function cd(a) {
    return function(c) {
      var d = new Sg, e;
      for (e in a) {
        d[e] = a[e];
      }
      d.stream = c;
      return d;
    };
  }
  function Sg() {
  }
  function Tg(a, c, d) {
    var e = a.clipExtent && a.clipExtent();
    a.scale(150).translate([0, 0]);
    null != e && a.clipExtent(null);
    Xa(d, a.stream(Ne));
    c(Ne.result());
    null != e && a.clipExtent(e);
    return a;
  }
  function oc(a, c, d) {
    return Tg(a, function(d) {
      var e = c[1][0] - c[0][0], h = c[1][1] - c[0][1], k = Math.min(e / (d[1][0] - d[0][0]), h / (d[1][1] - d[0][1]));
      e = +c[0][0] + (e - k * (d[1][0] + d[0][0])) / 2;
      d = +c[0][1] + (h - k * (d[1][1] + d[0][1])) / 2;
      a.scale(150 * k).translate([e, d]);
    }, d);
  }
  function Ug(a, c, d) {
    return Tg(a, function(d) {
      var e = +c, h = e / (d[1][0] - d[0][0]);
      e = (e - h * (d[1][0] + d[0][0])) / 2;
      d = -h * d[0][1];
      a.scale(150 * h).translate([e, d]);
    }, d);
  }
  function Vg(a, c, d) {
    return Tg(a, function(d) {
      var e = +c, h = e / (d[1][1] - d[0][1]), k = -h * d[0][0];
      d = (e - h * (d[1][1] + d[0][1])) / 2;
      a.scale(150 * h).translate([k, d]);
    }, d);
  }
  function Kk(a) {
    return cd({point:function(c, d) {
      c = a(c, d);
      this.stream.point(c[0], c[1]);
    }});
  }
  function Lk(a, c) {
    function d(e, g, h, k, p, b, y, l, r, v, z, D, F, I) {
      var t = y - e, C = l - g, x = t * t + C * C;
      if (x > 4 * c && F--) {
        var J = k + v, K = p + z, N = b + D, S = oa(J * J + K * K + N * N), X = Ba(N /= S), f = 1e-6 > ea(ea(N) - 1) || 1e-6 > ea(h - r) ? (h + r) / 2 : Ca(K, J), m = a(f, X);
        X = m[0];
        m = m[1];
        var u = X - e, n = m - g, q = C * u - t * n;
        if (q * q / x > c || 0.3 < ea((t * u + C * n) / x - 0.5) || k * v + p * z + b * D < er) {
          d(e, g, h, k, p, b, X, m, f, J /= S, K /= S, N, F, I), I.point(X, m), d(X, m, f, J, K, N, y, l, r, v, z, D, F, I);
        }
      }
    }
    return function(c) {
      function e(d, e) {
        d = a(d, e);
        c.point(d[0], d[1]);
      }
      function h() {
        C = NaN;
        S.point = k;
        c.lineStart();
      }
      function k(e, g) {
        var f = Ob([e, g]);
        g = a(e, g);
        d(C, x, P, J, K, N, C = g[0], x = g[1], P = e, J = f[0], K = f[1], N = f[2], 16, c);
        c.point(C, x);
      }
      function p() {
        S.point = e;
        c.lineEnd();
      }
      function b() {
        h();
        S.point = y;
        S.lineEnd = l;
      }
      function y(a, c) {
        k(r = a, c);
        v = C;
        z = x;
        D = J;
        F = K;
        I = N;
        S.point = k;
      }
      function l() {
        d(C, x, P, J, K, N, v, z, r, D, F, I, 16, c);
        S.lineEnd = p;
        p();
      }
      var r, v, z, D, F, I, P, C, x, J, K, N, S = {point:e, lineStart:h, lineEnd:p, polygonStart:function() {
        c.polygonStart();
        S.lineStart = b;
      }, polygonEnd:function() {
        c.polygonEnd();
        S.lineStart = h;
      }};
      return S;
    };
  }
  function fr(a) {
    return cd({point:function(c, d) {
      c = a(c, d);
      return this.stream.point(c[0], c[1]);
    }});
  }
  function gr(a, c, d) {
    function e(e, h) {
      return [c + a * e, d - a * h];
    }
    e.invert = function(e, h) {
      return [(e - c) / a, (d - h) / a];
    };
    return e;
  }
  function Mk(a, c, d, e) {
    function g(a, e) {
      return [k * a - b * e + c, d - b * a - k * e];
    }
    var h = W(e);
    e = R(e);
    var k = h * a, b = e * a, t = h / a, y = e / a, l = (e * d - h * c) / a, r = (e * c + h * d) / a;
    g.invert = function(a, c) {
      return [t * a - y * c + l, r - y * a - t * c];
    };
    return g;
  }
  function gb(a) {
    return Wg(function() {
      return a;
    })();
  }
  function Wg(a) {
    function c(a) {
      return m(a[0] * U, a[1] * U);
    }
    function d(a) {
      return (a = m.invert(a[0], a[1])) && [a[0] * fa, a[1] * fa];
    }
    function e() {
      var a = Mk(k, 0, 0, F).apply(null, h(y, l));
      a = (F ? Mk : gr)(k, b - a[0], t - a[1], F);
      D = Fg(r, v, z);
      f = Dg(h, a);
      m = Dg(D, f);
      a = f;
      X = +S ? Lk(a, S) : Kk(a);
      return g();
    }
    function g() {
      u = n = null;
      return c;
    }
    var h, k = 150, b = 480, t = 250, y = 0, l = 0, r = 0, v = 0, z = 0, D, F = 0, I = null, P = Xg, C = null, x, J, K, N = Qb, S = 0.5, X, f, m, u, n;
    c.stream = function(a) {
      return u && n === a ? u : u = hr(fr(D)(P(X(N(n = a)))));
    };
    c.preclip = function(a) {
      return arguments.length ? (P = a, I = void 0, g()) : P;
    };
    c.postclip = function(a) {
      return arguments.length ? (N = a, C = x = J = K = null, g()) : N;
    };
    c.clipAngle = function(a) {
      return arguments.length ? (P = +a ? nk(I = a * U) : (I = null, Xg), g()) : I * fa;
    };
    c.clipExtent = function(a) {
      return arguments.length ? (N = null == a ? (C = x = J = K = null, Qb) : Ge(C = +a[0][0], x = +a[0][1], J = +a[1][0], K = +a[1][1]), g()) : null == C ? null : [[C, x], [J, K]];
    };
    c.scale = function(a) {
      return arguments.length ? (k = +a, e()) : k;
    };
    c.translate = function(a) {
      return arguments.length ? (b = +a[0], t = +a[1], e()) : [b, t];
    };
    c.center = function(a) {
      return arguments.length ? (y = a[0] % 360 * U, l = a[1] % 360 * U, e()) : [y * fa, l * fa];
    };
    c.rotate = function(a) {
      return arguments.length ? (r = a[0] % 360 * U, v = a[1] % 360 * U, z = 2 < a.length ? a[2] % 360 * U : 0, e()) : [r * fa, v * fa, z * fa];
    };
    c.angle = function(a) {
      return arguments.length ? (F = a % 360 * U, e()) : F * fa;
    };
    c.precision = function(a) {
      if (arguments.length) {
        var c = f;
        var d = S = a * a;
        c = (X = +d ? Lk(c, d) : Kk(c), g());
      } else {
        c = oa(S);
      }
      return c;
    };
    c.fitExtent = function(a, d) {
      return oc(c, a, d);
    };
    c.fitSize = function(a, d) {
      return oc(c, [[0, 0], a], d);
    };
    c.fitWidth = function(a, d) {
      return Ug(c, a, d);
    };
    c.fitHeight = function(a, d) {
      return Vg(c, a, d);
    };
    return function() {
      h = a.apply(this, arguments);
      c.invert = h.invert && d;
      return e();
    };
  }
  function Yg(a) {
    var c = 0, d = ca / 3, e = Wg(a);
    a = e(c, d);
    a.parallels = function(a) {
      return arguments.length ? e(c = a[0] * U, d = a[1] * U) : [c * fa, d * fa];
    };
    return a;
  }
  function ir(a) {
    function c(a, c) {
      return [a * d, R(c) / d];
    }
    var d = W(a);
    c.invert = function(a, c) {
      return [a / d, Ba(c * d)];
    };
    return c;
  }
  function Nk(a, c) {
    function d(a, c) {
      c = oa(h - 2 * g * R(c)) / g;
      return [c * R(a *= g), k - c * W(a)];
    }
    var e = R(a), g = (e + R(c)) / 2;
    if (1e-6 > ea(g)) {
      return ir(a);
    }
    var h = 1 + e * (2 * g - e), k = oa(h) / g;
    d.invert = function(a, c) {
      c = k - c;
      return [Ca(a, ea(c)) / g * dd(c), Ba((h - (a * a + c * c) * g * g) / (2 * g))];
    };
    return d;
  }
  function Oe() {
    return Yg(Nk).scale(155.424).center([0, 33.6442]);
  }
  function Ok() {
    return Oe().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
  }
  function jr(a) {
    var c = a.length;
    return {point:function(d, e) {
      for (var g = -1; ++g < c;) {
        a[g].point(d, e);
      }
    }, sphere:function() {
      for (var d = -1; ++d < c;) {
        a[d].sphere();
      }
    }, lineStart:function() {
      for (var d = -1; ++d < c;) {
        a[d].lineStart();
      }
    }, lineEnd:function() {
      for (var d = -1; ++d < c;) {
        a[d].lineEnd();
      }
    }, polygonStart:function() {
      for (var d = -1; ++d < c;) {
        a[d].polygonStart();
      }
    }, polygonEnd:function() {
      for (var d = -1; ++d < c;) {
        a[d].polygonEnd();
      }
    }};
  }
  function Pk(a) {
    return function(c, d) {
      var e = W(c), g = W(d);
      e = a(e * g);
      return [e * g * R(c), e * R(d)];
    };
  }
  function ed(a) {
    return function(c, d) {
      var e = oa(c * c + d * d), g = a(e), h = R(g);
      g = W(g);
      return [Ca(c * h, e * g), Ba(e && d * h / e)];
    };
  }
  function fd(a, c) {
    return [a, Pe(pc((ja + c) / 2))];
  }
  function Qk(a) {
    function c() {
      var c = ca * g(), e = d(fk(d.rotate()).invert([0, 0]));
      return k(null == b ? [[e[0] - c, e[1] - c], [e[0] + c, e[1] + c]] : a === fd ? [[Math.max(e[0] - c, b), t], [Math.min(e[0] + c, y), l]] : [[b, Math.max(e[1] - c, t)], [y, Math.min(e[1] + c, l)]]);
    }
    var d = gb(a), e = d.center, g = d.scale, h = d.translate, k = d.clipExtent, b = null, t, y, l;
    d.scale = function(a) {
      return arguments.length ? (g(a), c()) : g();
    };
    d.translate = function(a) {
      return arguments.length ? (h(a), c()) : h();
    };
    d.center = function(a) {
      return arguments.length ? (e(a), c()) : e();
    };
    d.clipExtent = function(a) {
      return arguments.length ? (null == a ? b = t = y = l = null : (b = +a[0][0], t = +a[0][1], y = +a[1][0], l = +a[1][1]), c()) : null == b ? null : [[b, t], [y, l]];
    };
    return c();
  }
  function Rk(a, c) {
    function d(a, c) {
      0 < h ? c < -ja + 1e-6 && (c = -ja + 1e-6) : c > ja - 1e-6 && (c = ja - 1e-6);
      c = h / Zg(pc((ja + c) / 2), g);
      return [c * R(g * a), h - c * W(g * a)];
    }
    var e = W(a), g = a === c ? R(a) : Pe(e / W(c)) / Pe(pc((ja + c) / 2) / pc((ja + a) / 2)), h = e * Zg(pc((ja + a) / 2), g) / g;
    if (!g) {
      return fd;
    }
    d.invert = function(a, c) {
      c = h - c;
      var d = dd(g) * oa(a * a + c * c);
      return [Ca(a, ea(c)) / g * dd(c), 2 * qc(Zg(h / d, 1 / g)) - ja];
    };
    return d;
  }
  function gd(a, c) {
    return [a, c];
  }
  function Sk(a, c) {
    function d(a, c) {
      c = h - c;
      a *= g;
      return [c * R(a), h - c * W(a)];
    }
    var e = W(a), g = a === c ? R(a) : (e - W(c)) / (c - a), h = e / g + a;
    if (1e-6 > ea(g)) {
      return gd;
    }
    d.invert = function(a, c) {
      c = h - c;
      return [Ca(a, ea(c)) / g * dd(c), h - dd(g) * oa(a * a + c * c)];
    };
    return d;
  }
  function $g(a, c) {
    c = Ba(Qe * R(c));
    var d = c * c, e = d * d * d;
    return [a * W(c) / (Qe * (1.340264 + 3 * -0.081106 * d + e * (7 * 0.000893 + .034164 * d))), c * (1.340264 + -0.081106 * d + e * (0.000893 + 0.003796 * d))];
  }
  function ah(a, c) {
    var d = W(c), e = W(a) * d;
    return [d * R(a) / e, R(c) / e];
  }
  function Re(a, c, d, e) {
    return 1 === a && 1 === c && 0 === d && 0 === e ? Qb : cd({point:function(g, h) {
      this.stream.point(g * a + d, h * c + e);
    }});
  }
  function bh(a, c) {
    var d = c * c, e = d * d;
    return [a * (0.8707 - 0.131979 * d + e * (-0.013791 + e * (0.003971 * d - 0.001529 * e))), c * (1.007226 + d * (0.015085 + e * (-0.044475 + 0.028874 * d - 0.005916 * e)))];
  }
  function ch(a, c) {
    return [W(c) * R(a), R(c)];
  }
  function dh(a, c) {
    var d = W(c), e = 1 + W(a) * d;
    return [d * R(a) / e, R(c) / e];
  }
  function eh(a, c) {
    return [Pe(pc((ja + c) / 2)), -a];
  }
  function kr(a, c) {
    return a.parent === c.parent ? 1 : 2;
  }
  function lr(a, c) {
    return a + c.x;
  }
  function mr(a, c) {
    return Math.max(a, c.y);
  }
  function nr(a) {
    for (var c; c = a.children;) {
      a = c[0];
    }
    return a;
  }
  function or(a) {
    for (var c; c = a.children;) {
      a = c[c.length - 1];
    }
    return a;
  }
  function pr(a) {
    var c = 0, d = a.children, e = d && d.length;
    if (e) {
      for (; 0 <= --e;) {
        c += d[e].value;
      }
    } else {
      c = 1;
    }
    a.value = c;
  }
  function fh(a, c) {
    var d = new rc(a);
    a = +a.value && (d.value = a.value);
    var e, g = [d], h, k, b, t;
    for (null == c && (c = qr); e = g.pop();) {
      if (a && (e.value = +e.data.value), (k = c(e.data)) && (t = k.length)) {
        for (e.children = Array(t), b = t - 1; 0 <= b; --b) {
          g.push(h = e.children[b] = new rc(k[b])), h.parent = e, h.depth = e.depth + 1;
        }
      }
    }
    return d.eachBefore(Tk);
  }
  function qr(a) {
    return a.children;
  }
  function rr(a) {
    a.data = a.data.data;
  }
  function Tk(a) {
    var c = 0;
    do {
      a.height = c;
    } while ((a = a.parent) && a.height < ++c);
  }
  function rc(a) {
    this.data = a;
    this.depth = this.height = 0;
    this.parent = null;
  }
  function Uk(a) {
    var c = 0;
    a = sr.call(a);
    for (var d = a.length, e, g; d;) {
      g = Math.random() * d-- | 0, e = a[d], a[d] = a[g], a[g] = e;
    }
    d = a.length;
    e = [];
    for (var h; c < d;) {
      if (g = a[c], h && Vk(h, g)) {
        ++c;
      } else {
        a: {
          if (c = e, gh(g, c)) {
            c = [g];
          } else {
            for (e = 0; e < c.length; ++e) {
              if (Se(g, c[e]) && gh(hd(c[e], g), c)) {
                c = [c[e], g];
                break a;
              }
            }
            for (e = 0; e < c.length - 1; ++e) {
              for (h = e + 1; h < c.length; ++h) {
                if (Se(hd(c[e], c[h]), g) && Se(hd(c[e], g), c[h]) && Se(hd(c[h], g), c[e]) && gh(Wk(c[e], c[h], g), c)) {
                  c = [c[e], c[h], g];
                  break a;
                }
              }
            }
            throw Error();
          }
        }
        a: {
          c = e = c;
          switch(c.length) {
            case 1:
              c = c[0];
              c = {x:c.x, y:c.y, r:c.r};
              break a;
            case 2:
              c = hd(c[0], c[1]);
              break a;
            case 3:
              c = Wk(c[0], c[1], c[2]);
              break a;
          }
          c = void 0;
        }
        h = c;
        c = 0;
      }
    }
    return h;
  }
  function Se(a, c) {
    var d = a.r - c.r, e = c.x - a.x;
    a = c.y - a.y;
    return 0 > d || d * d < e * e + a * a;
  }
  function Vk(a, c) {
    var d = a.r - c.r + 1e-6, e = c.x - a.x;
    a = c.y - a.y;
    return 0 < d && d * d > e * e + a * a;
  }
  function gh(a, c) {
    for (var d = 0; d < c.length; ++d) {
      if (!Vk(a, c[d])) {
        return !1;
      }
    }
    return !0;
  }
  function hd(a, c) {
    var d = a.x, e = a.y;
    a = a.r;
    var g = c.x, h = c.y;
    c = c.r;
    var k = g - d, b = h - e, t = c - a, y = Math.sqrt(k * k + b * b);
    return {x:(d + g + k / y * t) / 2, y:(e + h + b / y * t) / 2, r:(y + a + c) / 2};
  }
  function Wk(a, c, d) {
    var e = a.x, g = a.y;
    a = a.r;
    var h = c.x, k = c.y, b = c.r, t = d.x, y = d.y, l = d.r;
    d = e - h;
    c = e - t;
    var r = g - k, v = g - y, z = b - a, D = l - a, F = e * e + g * g - a * a;
    k = F - h * h - k * k + b * b;
    y = F - t * t - y * y + l * l;
    t = c * r - d * v;
    h = (r * y - v * k) / (2 * t) - e;
    r = (v * z - r * D) / t;
    v = (c * k - d * y) / (2 * t) - g;
    d = (d * D - c * z) / t;
    c = r * r + d * d - 1;
    z = 2 * (a + h * r + v * d);
    a = h * h + v * v - a * a;
    a = -(c ? (z + Math.sqrt(z * z - 4 * c * a)) / (2 * c) : a / z);
    return {x:e + h + r * a, y:g + v + d * a, r:a};
  }
  function Xk(a, c, d) {
    var e = a.x - c.x, g = a.y - c.y, h = e * e + g * g;
    if (h) {
      var k = c.r + d.r;
      k *= k;
      var b = a.r + d.r;
      b *= b;
      if (k > b) {
        var t = (h + b - k) / (2 * h);
        k = Math.sqrt(Math.max(0, b / h - t * t));
        d.x = a.x - t * e - k * g;
        d.y = a.y - t * g + k * e;
      } else {
        t = (h + k - b) / (2 * h), k = Math.sqrt(Math.max(0, k / h - t * t)), d.x = c.x + t * e - k * g, d.y = c.y + t * g + k * e;
      }
    } else {
      d.x = c.x + d.r, d.y = c.y;
    }
  }
  function Yk(a, c) {
    var d = a.r + c.r - 1e-6, e = c.x - a.x;
    a = c.y - a.y;
    return 0 < d && d * d > e * e + a * a;
  }
  function Zk(a) {
    var c = a._, d = a.next._, e = c.r + d.r;
    a = (c.x * d.r + d.x * c.r) / e;
    c = (c.y * d.r + d.y * c.r) / e;
    return a * a + c * c;
  }
  function Te(a) {
    this._ = a;
    this.previous = this.next = null;
  }
  function $k(a) {
    if (!(d = a.length)) {
      return 0;
    }
    var c, d;
    var e = a[0];
    e.x = 0;
    e.y = 0;
    if (!(1 < d)) {
      return e.r;
    }
    var g = a[1];
    e.x = -g.r;
    g.x = e.r;
    g.y = 0;
    if (!(2 < d)) {
      return e.r + g.r;
    }
    Xk(g, e, c = a[2]);
    e = new Te(e);
    g = new Te(g);
    c = new Te(c);
    e.next = c.previous = g;
    g.next = e.previous = c;
    c.next = g.previous = e;
    var h = 3;
    a: for (; h < d; ++h) {
      Xk(e._, g._, c = a[h]);
      c = new Te(c);
      var k = g.next;
      var b = e.previous;
      var t = g._.r;
      var y = e._.r;
      do {
        if (t <= y) {
          if (Yk(k._, c._)) {
            g = k;
            e.next = g;
            g.previous = e;
            --h;
            continue a;
          }
          t += k._.r;
          k = k.next;
        } else {
          if (Yk(b._, c._)) {
            e = b;
            e.next = g;
            g.previous = e;
            --h;
            continue a;
          }
          y += b._.r;
          b = b.previous;
        }
      } while (k !== b.next);
      c.previous = e;
      c.next = g;
      e.next = g.previous = g = c;
      for (k = Zk(e); (c = c.next) !== g;) {
        (b = Zk(c)) < k && (e = c, k = b);
      }
      g = e.next;
    }
    e = [g._];
    for (c = g; (c = c.next) !== g;) {
      e.push(c._);
    }
    c = Uk(e);
    for (h = 0; h < d; ++h) {
      e = a[h], e.x -= c.x, e.y -= c.y;
    }
    return c.r;
  }
  function Ue(a) {
    if ("function" !== typeof a) {
      throw Error();
    }
    return a;
  }
  function Sb() {
    return 0;
  }
  function sc(a) {
    return function() {
      return a;
    };
  }
  function tr(a) {
    return Math.sqrt(a.value);
  }
  function al(a) {
    return function(c) {
      c.children || (c.r = Math.max(0, +a(c) || 0));
    };
  }
  function hh(a, c) {
    return function(d) {
      if (e = d.children) {
        var e, g, h = e.length, k = a(d) * c || 0;
        if (k) {
          for (g = 0; g < h; ++g) {
            e[g].r += k;
          }
        }
        var b = $k(e);
        if (k) {
          for (g = 0; g < h; ++g) {
            e[g].r -= k;
          }
        }
        d.r = b + k;
      }
    };
  }
  function bl(a) {
    return function(c) {
      var d = c.parent;
      c.r *= a;
      d && (c.x = d.x + a * c.x, c.y = d.y + a * c.y);
    };
  }
  function cl(a) {
    a.x0 = Math.round(a.x0);
    a.y0 = Math.round(a.y0);
    a.x1 = Math.round(a.x1);
    a.y1 = Math.round(a.y1);
  }
  function id(a, c, d, e, g) {
    var h = a.children, k = -1, b = h.length;
    for (e = a.value && (e - c) / a.value; ++k < b;) {
      a = h[k], a.y0 = d, a.y1 = g, a.x0 = c, a.x1 = c += a.value * e;
    }
  }
  function ur(a) {
    return a.id;
  }
  function vr(a) {
    return a.parentId;
  }
  function wr(a, c) {
    return a.parent === c.parent ? 1 : 2;
  }
  function ih(a) {
    var c = a.children;
    return c ? c[0] : a.t;
  }
  function jh(a) {
    var c = a.children;
    return c ? c[c.length - 1] : a.t;
  }
  function Ve(a, c) {
    this._ = a;
    this.A = this.children = this.parent = null;
    this.a = this;
    this.s = this.c = this.m = this.z = 0;
    this.t = null;
    this.i = c;
  }
  function xr(a) {
    a = new Ve(a, 0);
    for (var c, d = [a], e, g, h; c = d.pop();) {
      if (g = c._.children) {
        for (c.children = Array(e = g.length), h = e - 1; 0 <= h; --h) {
          d.push(e = c.children[h] = new Ve(g[h], h)), e.parent = c;
        }
      }
    }
    (a.parent = new Ve(null, 0)).children = [a];
    return a;
  }
  function We(a, c, d, e, g) {
    var h = a.children, k = -1, b = h.length;
    for (g = a.value && (g - d) / a.value; ++k < b;) {
      a = h[k], a.x0 = c, a.x1 = e, a.y0 = d, a.y1 = d += a.value * g;
    }
  }
  function dl(a, c, d, e, g, h) {
    for (var k = [], b = c.children, t, y, l = t = 0, r = b.length, v, z = c.value, D, F, I, P, C, x; t < r;) {
      c = g - d;
      v = h - e;
      do {
        D = b[l++].value;
      } while (!D && l < r);
      F = I = D;
      x = Math.max(v / c, c / v) / (z * a);
      P = D * D * x;
      for (C = Math.max(I / P, P / F); l < r; ++l) {
        D += y = b[l].value;
        y < F && (F = y);
        y > I && (I = y);
        P = D * D * x;
        P = Math.max(I / P, P / F);
        if (P > C) {
          D -= y;
          break;
        }
        C = P;
      }
      k.push(t = {value:D, dice:c < v, children:b.slice(t, l)});
      t.dice ? id(t, d, e, g, z ? e += v * D / z : h) : We(t, d, e, z ? d += c * D / z : g, h);
      z -= D;
      t = l;
    }
    return k;
  }
  function yr(a, c, d) {
    return (c[0] - a[0]) * (d[1] - a[1]) - (c[1] - a[1]) * (d[0] - a[0]);
  }
  function zr(a, c) {
    return a[0] - c[0] || a[1] - c[1];
  }
  function el(a) {
    for (var c = a.length, d = [0, 1], e = 2, g = 2; g < c; ++g) {
      for (; 1 < e && 0 >= yr(a[d[e - 2]], a[d[e - 1]], a[g]);) {
        --e;
      }
      d[e++] = g;
    }
    return d.slice(0, e);
  }
  function tc() {
    return Math.random();
  }
  function Za(a, c) {
    switch(arguments.length) {
      case 0:
        break;
      case 1:
        this.range(a);
        break;
      default:
        this.range(c).domain(a);
    }
    return this;
  }
  function pb(a, c) {
    switch(arguments.length) {
      case 0:
        break;
      case 1:
        this.interpolator(a);
        break;
      default:
        this.interpolator(c).domain(a);
    }
    return this;
  }
  function kh() {
    function a(a) {
      var h = a + "", b = c.get(h);
      if (!b) {
        if (g !== lh) {
          return g;
        }
        c.set(h, b = d.push(a));
      }
      return e[(b - 1) % e.length];
    }
    var c = kb(), d = [], e = [], g = lh;
    a.domain = function(e) {
      if (!arguments.length) {
        return d.slice();
      }
      d = [];
      c = kb();
      for (var g = -1, h = e.length, b, y; ++g < h;) {
        c.has(y = (b = e[g]) + "") || c.set(y, d.push(b));
      }
      return a;
    };
    a.range = function(c) {
      return arguments.length ? (e = Tb.call(c), a) : e.slice();
    };
    a.unknown = function(c) {
      return arguments.length ? (g = c, a) : g;
    };
    a.copy = function() {
      return kh(d, e).unknown(g);
    };
    Za.apply(a, arguments);
    return a;
  }
  function mh() {
    function a() {
      var a = d().length, c = g[1] < g[0], p = g[c - 0], D = g[1 - c];
      h = (D - p) / Math.max(1, a - t + 2 * y);
      b && (h = Math.floor(h));
      p += (D - p - h * (a - t)) * l;
      k = h * (1 - t);
      b && (p = Math.round(p), k = Math.round(k));
      a = Ka(a).map(function(a) {
        return p + h * a;
      });
      return e(c ? a.reverse() : a);
    }
    var c = kh().unknown(void 0), d = c.domain, e = c.range, g = [0, 1], h, k, b = !1, t = 0, y = 0, l = 0.5;
    delete c.unknown;
    c.domain = function(c) {
      return arguments.length ? (d(c), a()) : d();
    };
    c.range = function(c) {
      return arguments.length ? (g = [+c[0], +c[1]], a()) : g.slice();
    };
    c.rangeRound = function(c) {
      return g = [+c[0], +c[1]], b = !0, a();
    };
    c.bandwidth = function() {
      return k;
    };
    c.step = function() {
      return h;
    };
    c.round = function(c) {
      return arguments.length ? (b = !!c, a()) : b;
    };
    c.padding = function(c) {
      return arguments.length ? (t = Math.min(1, y = +c), a()) : t;
    };
    c.paddingInner = function(c) {
      return arguments.length ? (t = Math.min(1, c), a()) : t;
    };
    c.paddingOuter = function(c) {
      return arguments.length ? (y = +c, a()) : y;
    };
    c.align = function(c) {
      return arguments.length ? (l = Math.max(0, Math.min(1, c)), a()) : l;
    };
    c.copy = function() {
      return mh(d(), g).round(b).paddingInner(t).paddingOuter(y).align(l);
    };
    return Za.apply(a(), arguments);
  }
  function fl(a) {
    var c = a.copy;
    a.padding = a.paddingOuter;
    delete a.paddingInner;
    delete a.paddingOuter;
    a.copy = function() {
      return fl(c());
    };
    return a;
  }
  function Ar(a) {
    return function() {
      return a;
    };
  }
  function nh(a) {
    return +a;
  }
  function va(a) {
    return a;
  }
  function oh(a, c) {
    return (c -= a = +a) ? function(d) {
      return (d - a) / c;
    } : Ar(isNaN(c) ? NaN : 0.5);
  }
  function gl(a) {
    var c = a[0], d = a[a.length - 1];
    c > d && (a = c, c = d, d = a);
    return function(a) {
      return Math.max(c, Math.min(d, a));
    };
  }
  function Br(a, c, d) {
    var e = a[0];
    a = a[1];
    var g = c[0];
    c = c[1];
    a < e ? (e = oh(a, e), g = d(c, g)) : (e = oh(e, a), g = d(g, c));
    return function(a) {
      return g(e(a));
    };
  }
  function Cr(a, c, d) {
    var e = Math.min(a.length, c.length) - 1, g = Array(e), h = Array(e), b = -1;
    a[e] < a[0] && (a = a.slice().reverse(), c = c.slice().reverse());
    for (; ++b < e;) {
      g[b] = oh(a[b], a[b + 1]), h[b] = d(c[b], c[b + 1]);
    }
    return function(c) {
      var d = Bb(a, c, 1, e) - 1;
      return h[d](g[d](c));
    };
  }
  function jd(a, c) {
    return c.domain(a.domain()).range(a.range()).interpolate(a.interpolate()).clamp(a.clamp()).unknown(a.unknown());
  }
  function Xe() {
    function a() {
      y = 2 < Math.min(d.length, e.length) ? Cr : Br;
      l = r = null;
      return c;
    }
    function c(a) {
      return isNaN(a = +a) ? p : (l || (l = y(d.map(h), e, g)))(h(t(a)));
    }
    var d = hl, e = hl, g = Kc, h, b, p, t = va, y, l, r;
    c.invert = function(a) {
      return t(b((r || (r = y(e, d.map(h), Pa)))(a)));
    };
    c.domain = function(c) {
      return arguments.length ? (d = Ye.call(c, nh), t === va || (t = gl(d)), a()) : d.slice();
    };
    c.range = function(c) {
      return arguments.length ? (e = Tb.call(c), a()) : e.slice();
    };
    c.rangeRound = function(c) {
      return e = Tb.call(c), g = Oi, a();
    };
    c.clamp = function(a) {
      return arguments.length ? (t = a ? gl(d) : va, c) : t !== va;
    };
    c.interpolate = function(c) {
      return arguments.length ? (g = c, a()) : g;
    };
    c.unknown = function(a) {
      return arguments.length ? (p = a, c) : p;
    };
    return function(c, d) {
      h = c;
      b = d;
      return a();
    };
  }
  function il(a, c) {
    return Xe()(a, c);
  }
  function jl(a, c, d, e) {
    d = Gb(a, c, d);
    var g;
    e = Uc(null == e ? ",f" : e);
    switch(e.type) {
      case "s":
        return a = Math.max(Math.abs(a), Math.abs(c)), null != e.precision || isNaN(g = Fj(d, a)) || (e.precision = g), b.formatPrefix(e, a);
      case "":
      case "e":
      case "g":
      case "p":
      case "r":
        null != e.precision || isNaN(g = Gj(d, Math.max(Math.abs(a), Math.abs(c)))) || (e.precision = g - ("e" === e.type));
        break;
      case "f":
      case "%":
        null != e.precision || isNaN(g = Ej(d)) || (e.precision = g - 2 * ("%" === e.type));
    }
    return b.format(e);
  }
  function Ub(a) {
    var c = a.domain;
    a.ticks = function(a) {
      var d = c();
      return Bf(d[0], d[d.length - 1], null == a ? 10 : a);
    };
    a.tickFormat = function(a, e) {
      var d = c();
      return jl(d[0], d[d.length - 1], null == a ? 10 : a, e);
    };
    a.nice = function(d) {
      null == d && (d = 10);
      var e = c(), g = 0, h = e.length - 1, b = e[g], p = e[h];
      if (p < b) {
        var t = b;
        b = p;
        p = t;
        t = g;
        g = h;
        h = t;
      }
      t = Fc(b, p, d);
      0 < t ? (b = Math.floor(b / t) * t, p = Math.ceil(p / t) * t, t = Fc(b, p, d)) : 0 > t && (b = Math.ceil(b * t) / t, p = Math.floor(p * t) / t, t = Fc(b, p, d));
      0 < t ? (e[g] = Math.floor(b / t) * t, e[h] = Math.ceil(p / t) * t, c(e)) : 0 > t && (e[g] = Math.ceil(b * t) / t, e[h] = Math.floor(p * t) / t, c(e));
      return a;
    };
    return a;
  }
  function kl() {
    var a = il(va, va);
    a.copy = function() {
      return jd(a, kl());
    };
    Za.apply(a, arguments);
    return Ub(a);
  }
  function ll(a) {
    function c(a) {
      return isNaN(a = +a) ? d : a;
    }
    var d;
    c.invert = c;
    c.domain = c.range = function(d) {
      return arguments.length ? (a = Ye.call(d, nh), c) : a.slice();
    };
    c.unknown = function(a) {
      return arguments.length ? (d = a, c) : d;
    };
    c.copy = function() {
      return ll(a).unknown(d);
    };
    a = arguments.length ? Ye.call(a, nh) : [0, 1];
    return Ub(c);
  }
  function ml(a, c) {
    a = a.slice();
    var d = 0, e = a.length - 1, g = a[d], h = a[e];
    if (h < g) {
      var b = d;
      d = e;
      e = b;
      b = g;
      g = h;
      h = b;
    }
    a[d] = c.floor(g);
    a[e] = c.ceil(h);
    return a;
  }
  function nl(a) {
    return Math.log(a);
  }
  function ol(a) {
    return Math.exp(a);
  }
  function Dr(a) {
    return -Math.log(-a);
  }
  function Er(a) {
    return -Math.exp(-a);
  }
  function Fr(a) {
    return isFinite(a) ? +("1e" + a) : 0 > a ? 0 : a;
  }
  function Gr(a) {
    return 10 === a ? Fr : a === Math.E ? Math.exp : function(c) {
      return Math.pow(a, c);
    };
  }
  function Hr(a) {
    return a === Math.E ? Math.log : 10 === a && Math.log10 || 2 === a && Math.log2 || (a = Math.log(a), function(c) {
      return Math.log(c) / a;
    });
  }
  function pl(a) {
    return function(c) {
      return -a(-c);
    };
  }
  function ph(a) {
    function c() {
      h = Hr(g);
      k = Gr(g);
      0 > e()[0] ? (h = pl(h), k = pl(k), a(Dr, Er)) : a(nl, ol);
      return d;
    }
    var d = a(nl, ol), e = d.domain, g = 10, h, k;
    d.base = function(a) {
      return arguments.length ? (g = +a, c()) : g;
    };
    d.domain = function(a) {
      return arguments.length ? (e(a), c()) : e();
    };
    d.ticks = function(a) {
      var c = e(), d = c[0];
      c = c[c.length - 1];
      var l;
      if (l = c < d) {
        b = d, d = c, c = b;
      }
      var b = h(d), p = h(c);
      var z = null == a ? 10 : +a;
      a = [];
      if (!(g % 1) && p - b < z) {
        if (b = Math.round(b) - 1, p = Math.round(p) + 1, 0 < d) {
          for (; b < p; ++b) {
            var D = 1;
            for (z = k(b); D < g; ++D) {
              var F = z * D;
              if (!(F < d)) {
                if (F > c) {
                  break;
                }
                a.push(F);
              }
            }
          }
        } else {
          for (; b < p; ++b) {
            for (D = g - 1, z = k(b); 1 <= D; --D) {
              if (F = z * D, !(F < d)) {
                if (F > c) {
                  break;
                }
                a.push(F);
              }
            }
          }
        }
      } else {
        a = Bf(b, p, Math.min(p - b, z)).map(k);
      }
      return l ? a.reverse() : a;
    };
    d.tickFormat = function(a, c) {
      null == c && (c = 10 === g ? ".0e" : ",");
      "function" !== typeof c && (c = b.format(c));
      if (Infinity === a) {
        return c;
      }
      null == a && (a = 10);
      var e = Math.max(1, g * a / d.ticks().length);
      return function(a) {
        var d = a / k(Math.round(h(a)));
        d * g < g - 0.5 && (d *= g);
        return d <= e ? c(a) : "";
      };
    };
    d.nice = function() {
      return e(ml(e(), {floor:function(a) {
        return k(Math.floor(h(a)));
      }, ceil:function(a) {
        return k(Math.ceil(h(a)));
      }}));
    };
    return d;
  }
  function ql() {
    var a = ph(Xe()).domain([1, 10]);
    a.copy = function() {
      return jd(a, ql()).base(a.base());
    };
    Za.apply(a, arguments);
    return a;
  }
  function rl(a) {
    return function(c) {
      return Math.sign(c) * Math.log1p(Math.abs(c / a));
    };
  }
  function sl(a) {
    return function(c) {
      return Math.sign(c) * Math.expm1(Math.abs(c)) * a;
    };
  }
  function qh(a) {
    var c = 1, d = a(rl(c), sl(c));
    d.constant = function(d) {
      return arguments.length ? a(rl(c = +d), sl(c)) : c;
    };
    return Ub(d);
  }
  function tl() {
    var a = qh(Xe());
    a.copy = function() {
      return jd(a, tl()).constant(a.constant());
    };
    return Za.apply(a, arguments);
  }
  function ul(a) {
    return function(c) {
      return 0 > c ? -Math.pow(-c, a) : Math.pow(c, a);
    };
  }
  function Ir(a) {
    return 0 > a ? -Math.sqrt(-a) : Math.sqrt(a);
  }
  function Jr(a) {
    return 0 > a ? -a * a : a * a;
  }
  function rh(a) {
    var c = a(va, va), d = 1;
    c.exponent = function(c) {
      return arguments.length ? (d = +c, 1 === d ? a(va, va) : 0.5 === d ? a(Ir, Jr) : a(ul(d), ul(1 / d))) : d;
    };
    return Ub(c);
  }
  function sh() {
    var a = rh(Xe());
    a.copy = function() {
      return jd(a, sh()).exponent(a.exponent());
    };
    Za.apply(a, arguments);
    return a;
  }
  function vl() {
    function a() {
      var a = 0, h = Math.max(1, e.length);
      for (g = Array(h - 1); ++a < h;) {
        g[a - 1] = Gc(d, a / h);
      }
      return c;
    }
    function c(a) {
      return isNaN(a = +a) ? h : e[Bb(g, a)];
    }
    var d = [], e = [], g = [], h;
    c.invertExtent = function(a) {
      a = e.indexOf(a);
      return 0 > a ? [NaN, NaN] : [0 < a ? g[a - 1] : d[0], a < g.length ? g[a] : d[d.length - 1]];
    };
    c.domain = function(c) {
      if (!arguments.length) {
        return d.slice();
      }
      d = [];
      for (var e = 0, g = c.length, h; e < g; ++e) {
        (h = c[e], null == h || isNaN(h = +h)) || d.push(h);
      }
      d.sort(Oa);
      return a();
    };
    c.range = function(c) {
      return arguments.length ? (e = Tb.call(c), a()) : e.slice();
    };
    c.unknown = function(a) {
      return arguments.length ? (h = a, c) : h;
    };
    c.quantiles = function() {
      return g.slice();
    };
    c.copy = function() {
      return vl().domain(d).range(e).unknown(h);
    };
    return Za.apply(c, arguments);
  }
  function wl() {
    function a(a) {
      return a <= a ? b[Bb(h, a, 0, g)] : p;
    }
    function c() {
      var c = -1;
      for (h = Array(g); ++c < g;) {
        h[c] = ((c + 1) * e - (c - g) * d) / (g + 1);
      }
      return a;
    }
    var d = 0, e = 1, g = 1, h = [0.5], b = [0, 1], p;
    a.domain = function(a) {
      return arguments.length ? (d = +a[0], e = +a[1], c()) : [d, e];
    };
    a.range = function(a) {
      return arguments.length ? (g = (b = Tb.call(a)).length - 1, c()) : b.slice();
    };
    a.invertExtent = function(a) {
      a = b.indexOf(a);
      return 0 > a ? [NaN, NaN] : 1 > a ? [d, h[0]] : a >= g ? [h[g - 1], e] : [h[a - 1], h[a]];
    };
    a.unknown = function(c) {
      return arguments.length ? (p = c, a) : a;
    };
    a.thresholds = function() {
      return h.slice();
    };
    a.copy = function() {
      return wl().domain([d, e]).range(b).unknown(p);
    };
    return Za.apply(Ub(a), arguments);
  }
  function xl() {
    function a(a) {
      return a <= a ? d[Bb(c, a, 0, g)] : e;
    }
    var c = [0.5], d = [0, 1], e, g = 1;
    a.domain = function(e) {
      return arguments.length ? (c = Tb.call(e), g = Math.min(c.length, d.length - 1), a) : c.slice();
    };
    a.range = function(e) {
      return arguments.length ? (d = Tb.call(e), g = Math.min(c.length, d.length - 1), a) : d.slice();
    };
    a.invertExtent = function(a) {
      a = d.indexOf(a);
      return [c[a - 1], c[a]];
    };
    a.unknown = function(c) {
      return arguments.length ? (e = c, a) : e;
    };
    a.copy = function() {
      return xl().domain(c).range(d).unknown(e);
    };
    return Za.apply(a, arguments);
  }
  function ra(a, c, d, e) {
    function g(c) {
      return a(c = new Date(+c)), c;
    }
    g.floor = g;
    g.ceil = function(d) {
      return a(d = new Date(d - 1)), c(d, 1), a(d), d;
    };
    g.round = function(a) {
      var c = g(a), d = g.ceil(a);
      return a - c < d - a ? c : d;
    };
    g.offset = function(a, d) {
      return c(a = new Date(+a), null == d ? 1 : Math.floor(d)), a;
    };
    g.range = function(d, e, b) {
      var h = [], k;
      d = g.ceil(d);
      b = null == b ? 1 : Math.floor(b);
      if (!(d < e && 0 < b)) {
        return h;
      }
      do {
        h.push(k = new Date(+d)), c(d, b), a(d);
      } while (k < d && d < e);
      return h;
    };
    g.filter = function(d) {
      return ra(function(c) {
        if (c >= c) {
          for (; a(c), !d(c);) {
            c.setTime(c - 1);
          }
        }
      }, function(a, e) {
        if (a >= a) {
          if (0 > e) {
            for (; 0 >= ++e;) {
              for (; c(a, -1), !d(a);) {
              }
            }
          } else {
            for (; 0 <= --e;) {
              for (; c(a, 1), !d(a);) {
              }
            }
          }
        }
      });
    };
    d && (g.count = function(c, e) {
      th.setTime(+c);
      uh.setTime(+e);
      a(th);
      a(uh);
      return Math.floor(d(th, uh));
    }, g.every = function(a) {
      a = Math.floor(a);
      return isFinite(a) && 0 < a ? 1 < a ? g.filter(e ? function(c) {
        return 0 === e(c) % a;
      } : function(c) {
        return 0 === g.count(0, c) % a;
      }) : g : null;
    });
    return g;
  }
  function Vb(a) {
    return ra(function(c) {
      c.setDate(c.getDate() - (c.getDay() + 7 - a) % 7);
      c.setHours(0, 0, 0, 0);
    }, function(a, d) {
      a.setDate(a.getDate() + 7 * d);
    }, function(a, d) {
      return (d - a - 6e4 * (d.getTimezoneOffset() - a.getTimezoneOffset())) / 6048e5;
    });
  }
  function Wb(a) {
    return ra(function(c) {
      c.setUTCDate(c.getUTCDate() - (c.getUTCDay() + 7 - a) % 7);
      c.setUTCHours(0, 0, 0, 0);
    }, function(a, d) {
      a.setUTCDate(a.getUTCDate() + 7 * d);
    }, function(a, d) {
      return (d - a) / 6048e5;
    });
  }
  function Kr(a) {
    if (0 <= a.y && 100 > a.y) {
      var c = new Date(-1, a.m, a.d, a.H, a.M, a.S, a.L);
      c.setFullYear(a.y);
      return c;
    }
    return new Date(a.y, a.m, a.d, a.H, a.M, a.S, a.L);
  }
  function Ze(a) {
    if (0 <= a.y && 100 > a.y) {
      var c = new Date(Date.UTC(-1, a.m, a.d, a.H, a.M, a.S, a.L));
      c.setUTCFullYear(a.y);
      return c;
    }
    return new Date(Date.UTC(a.y, a.m, a.d, a.H, a.M, a.S, a.L));
  }
  function kd(a) {
    return {y:a, m:0, d:1, H:0, M:0, S:0, L:0};
  }
  function yl(a) {
    function c(a, c) {
      return function(d) {
        var e = [], g = -1, f = 0, h = a.length, b, l;
        for (d instanceof Date || (d = new Date(+d)); ++g < h;) {
          if (37 === a.charCodeAt(g)) {
            e.push(a.slice(f, g));
            null != (f = zl[b = a.charAt(++g)]) ? b = a.charAt(++g) : f = "e" === b ? " " : "0";
            if (l = c[b]) {
              b = l(d, f);
            }
            e.push(b);
            f = g + 1;
          }
        }
        e.push(a.slice(f, g));
        return e.join("");
      };
    }
    function d(a, c) {
      return function(d) {
        var g = kd(1900);
        if (e(g, a, d += "", 0) != d.length) {
          return null;
        }
        if ("Q" in g) {
          return new Date(g.Q);
        }
        "p" in g && (g.H = g.H % 12 + 12 * g.p);
        if ("V" in g) {
          if (1 > g.V || 53 < g.V) {
            return null;
          }
          "w" in g || (g.w = 1);
          if ("Z" in g) {
            d = Ze(kd(g.y));
            var f = d.getUTCDay();
            d = 4 < f || 0 === f ? ld.ceil(d) : ld(d);
            d = md.offset(d, 7 * (g.V - 1));
            g.y = d.getUTCFullYear();
            g.m = d.getUTCMonth();
            g.d = d.getUTCDate() + (g.w + 6) % 7;
          } else {
            d = c(kd(g.y)), f = d.getDay(), d = 4 < f || 0 === f ? nd.ceil(d) : nd(d), d = od.offset(d, 7 * (g.V - 1)), g.y = d.getFullYear(), g.m = d.getMonth(), g.d = d.getDate() + (g.w + 6) % 7;
          }
        } else {
          if ("W" in g || "U" in g) {
            "w" in g || (g.w = "u" in g ? g.u % 7 : "W" in g ? 1 : 0), f = "Z" in g ? Ze(kd(g.y)).getUTCDay() : c(kd(g.y)).getDay(), g.m = 0, g.d = "W" in g ? (g.w + 6) % 7 + 7 * g.W - (f + 5) % 7 : g.w + 7 * g.U - (f + 6) % 7;
          }
        }
        return "Z" in g ? (g.H += g.Z / 100 | 0, g.M += g.Z % 100, Ze(g)) : c(g);
      };
    }
    function e(a, c, d, e) {
      for (var g = 0, f = c.length, h = d.length, b; g < f;) {
        if (e >= h) {
          return -1;
        }
        b = c.charCodeAt(g++);
        if (37 === b) {
          if (b = c.charAt(g++), b = X[b in zl ? c.charAt(g++) : b], !b || 0 > (e = b(a, d, e))) {
            return -1;
          }
        } else {
          if (b != d.charCodeAt(e++)) {
            return -1;
          }
        }
      }
      return e;
    }
    var g = a.dateTime, h = a.date, b = a.time, p = a.periods, t = a.days, y = a.shortDays, l = a.months, r = a.shortMonths, v = pd(p), z = qd(p), D = pd(t), F = qd(t), I = pd(y), P = qd(y), C = pd(l), x = qd(l), J = pd(r), K = qd(r), N = {a:function(a) {
      return y[a.getDay()];
    }, A:function(a) {
      return t[a.getDay()];
    }, b:function(a) {
      return r[a.getMonth()];
    }, B:function(a) {
      return l[a.getMonth()];
    }, c:null, d:Al, e:Al, f:Lr, H:Mr, I:Nr, j:Or, L:Bl, m:Pr, M:Qr, p:function(a) {
      return p[+(12 <= a.getHours())];
    }, Q:Cl, s:Dl, S:Rr, u:Sr, U:Tr, V:Ur, w:Vr, W:Wr, x:null, X:null, y:Xr, Y:Yr, Z:Zr, "%":El}, S = {a:function(a) {
      return y[a.getUTCDay()];
    }, A:function(a) {
      return t[a.getUTCDay()];
    }, b:function(a) {
      return r[a.getUTCMonth()];
    }, B:function(a) {
      return l[a.getUTCMonth()];
    }, c:null, d:Fl, e:Fl, f:$r, H:as, I:bs, j:cs, L:Gl, m:ds, M:es, p:function(a) {
      return p[+(12 <= a.getUTCHours())];
    }, Q:Cl, s:Dl, S:fs, u:gs, U:hs, V:is, w:js, W:ks, x:null, X:null, y:ls, Y:ms, Z:ns, "%":El}, X = {a:function(a, c, d) {
      return (c = I.exec(c.slice(d))) ? (a.w = P[c[0].toLowerCase()], d + c[0].length) : -1;
    }, A:function(a, c, d) {
      return (c = D.exec(c.slice(d))) ? (a.w = F[c[0].toLowerCase()], d + c[0].length) : -1;
    }, b:function(a, c, d) {
      return (c = J.exec(c.slice(d))) ? (a.m = K[c[0].toLowerCase()], d + c[0].length) : -1;
    }, B:function(a, c, d) {
      return (c = C.exec(c.slice(d))) ? (a.m = x[c[0].toLowerCase()], d + c[0].length) : -1;
    }, c:function(a, c, d) {
      return e(a, g, c, d);
    }, d:Hl, e:Hl, f:os, H:Il, I:Il, j:ps, L:qs, m:rs, M:ss, p:function(a, c, d) {
      return (c = v.exec(c.slice(d))) ? (a.p = z[c[0].toLowerCase()], d + c[0].length) : -1;
    }, Q:ts, s:us, S:vs, u:ws, U:xs, V:ys, w:zs, W:As, x:function(a, c, d) {
      return e(a, h, c, d);
    }, X:function(a, c, d) {
      return e(a, b, c, d);
    }, y:Bs, Y:Cs, Z:Ds, "%":Es};
    N.x = c(h, N);
    N.X = c(b, N);
    N.c = c(g, N);
    S.x = c(h, S);
    S.X = c(b, S);
    S.c = c(g, S);
    return {format:function(a) {
      var d = c(a += "", N);
      d.toString = function() {
        return a;
      };
      return d;
    }, parse:function(a) {
      var c = d(a += "", Kr);
      c.toString = function() {
        return a;
      };
      return c;
    }, utcFormat:function(a) {
      var d = c(a += "", S);
      d.toString = function() {
        return a;
      };
      return d;
    }, utcParse:function(a) {
      var c = d(a, Ze);
      c.toString = function() {
        return a;
      };
      return c;
    }};
  }
  function da(a, c, d) {
    var e = 0 > a ? "-" : "";
    a = (e ? -a : a) + "";
    var g = a.length;
    return e + (g < d ? Array(d - g + 1).join(c) + a : a);
  }
  function Fs(a) {
    return a.replace(Gs, "\\$\x26");
  }
  function pd(a) {
    return new RegExp("^(?:" + a.map(Fs).join("|") + ")", "i");
  }
  function qd(a) {
    for (var c = {}, d = -1, e = a.length; ++d < e;) {
      c[a[d].toLowerCase()] = d;
    }
    return c;
  }
  function zs(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 1))) ? (a.w = +c[0], d + c[0].length) : -1;
  }
  function ws(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 1))) ? (a.u = +c[0], d + c[0].length) : -1;
  }
  function xs(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 2))) ? (a.U = +c[0], d + c[0].length) : -1;
  }
  function ys(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 2))) ? (a.V = +c[0], d + c[0].length) : -1;
  }
  function As(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 2))) ? (a.W = +c[0], d + c[0].length) : -1;
  }
  function Cs(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 4))) ? (a.y = +c[0], d + c[0].length) : -1;
  }
  function Bs(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 2))) ? (a.y = +c[0] + (68 < +c[0] ? 1900 : 2000), d + c[0].length) : -1;
  }
  function Ds(a, c, d) {
    return (c = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(c.slice(d, d + 6))) ? (a.Z = c[1] ? 0 : -(c[2] + (c[3] || "00")), d + c[0].length) : -1;
  }
  function rs(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 2))) ? (a.m = c[0] - 1, d + c[0].length) : -1;
  }
  function Hl(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 2))) ? (a.d = +c[0], d + c[0].length) : -1;
  }
  function ps(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 3))) ? (a.m = 0, a.d = +c[0], d + c[0].length) : -1;
  }
  function Il(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 2))) ? (a.H = +c[0], d + c[0].length) : -1;
  }
  function ss(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 2))) ? (a.M = +c[0], d + c[0].length) : -1;
  }
  function vs(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 2))) ? (a.S = +c[0], d + c[0].length) : -1;
  }
  function qs(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 3))) ? (a.L = +c[0], d + c[0].length) : -1;
  }
  function os(a, c, d) {
    return (c = wa.exec(c.slice(d, d + 6))) ? (a.L = Math.floor(c[0] / 1000), d + c[0].length) : -1;
  }
  function Es(a, c, d) {
    return (a = Hs.exec(c.slice(d, d + 1))) ? d + a[0].length : -1;
  }
  function ts(a, c, d) {
    return (c = wa.exec(c.slice(d))) ? (a.Q = +c[0], d + c[0].length) : -1;
  }
  function us(a, c, d) {
    return (c = wa.exec(c.slice(d))) ? (a.Q = 1000 * +c[0], d + c[0].length) : -1;
  }
  function Al(a, c) {
    return da(a.getDate(), c, 2);
  }
  function Mr(a, c) {
    return da(a.getHours(), c, 2);
  }
  function Nr(a, c) {
    return da(a.getHours() % 12 || 12, c, 2);
  }
  function Or(a, c) {
    return da(1 + od.count(qb(a), a), c, 3);
  }
  function Bl(a, c) {
    return da(a.getMilliseconds(), c, 3);
  }
  function Lr(a, c) {
    return Bl(a, c) + "000";
  }
  function Pr(a, c) {
    return da(a.getMonth() + 1, c, 2);
  }
  function Qr(a, c) {
    return da(a.getMinutes(), c, 2);
  }
  function Rr(a, c) {
    return da(a.getSeconds(), c, 2);
  }
  function Sr(a) {
    a = a.getDay();
    return 0 === a ? 7 : a;
  }
  function Tr(a, c) {
    return da(rd.count(qb(a), a), c, 2);
  }
  function Ur(a, c) {
    var d = a.getDay();
    a = 4 <= d || 0 === d ? sd(a) : sd.ceil(a);
    return da(sd.count(qb(a), a) + (4 === qb(a).getDay()), c, 2);
  }
  function Vr(a) {
    return a.getDay();
  }
  function Wr(a, c) {
    return da(nd.count(qb(a), a), c, 2);
  }
  function Xr(a, c) {
    return da(a.getFullYear() % 100, c, 2);
  }
  function Yr(a, c) {
    return da(a.getFullYear() % 10000, c, 4);
  }
  function Zr(a) {
    a = a.getTimezoneOffset();
    return (0 < a ? "-" : (a *= -1, "+")) + da(a / 60 | 0, "0", 2) + da(a % 60, "0", 2);
  }
  function Fl(a, c) {
    return da(a.getUTCDate(), c, 2);
  }
  function as(a, c) {
    return da(a.getUTCHours(), c, 2);
  }
  function bs(a, c) {
    return da(a.getUTCHours() % 12 || 12, c, 2);
  }
  function cs(a, c) {
    return da(1 + md.count(rb(a), a), c, 3);
  }
  function Gl(a, c) {
    return da(a.getUTCMilliseconds(), c, 3);
  }
  function $r(a, c) {
    return Gl(a, c) + "000";
  }
  function ds(a, c) {
    return da(a.getUTCMonth() + 1, c, 2);
  }
  function es(a, c) {
    return da(a.getUTCMinutes(), c, 2);
  }
  function fs(a, c) {
    return da(a.getUTCSeconds(), c, 2);
  }
  function gs(a) {
    a = a.getUTCDay();
    return 0 === a ? 7 : a;
  }
  function hs(a, c) {
    return da(td.count(rb(a), a), c, 2);
  }
  function is(a, c) {
    var d = a.getUTCDay();
    a = 4 <= d || 0 === d ? ud(a) : ud.ceil(a);
    return da(ud.count(rb(a), a) + (4 === rb(a).getUTCDay()), c, 2);
  }
  function js(a) {
    return a.getUTCDay();
  }
  function ks(a, c) {
    return da(ld.count(rb(a), a), c, 2);
  }
  function ls(a, c) {
    return da(a.getUTCFullYear() % 100, c, 2);
  }
  function ms(a, c) {
    return da(a.getUTCFullYear() % 10000, c, 4);
  }
  function ns() {
    return "+0000";
  }
  function El() {
    return "%";
  }
  function Cl(a) {
    return +a;
  }
  function Dl(a) {
    return Math.floor(+a / 1000);
  }
  function Jl(a) {
    uc = yl(a);
    b.timeFormat = uc.format;
    b.timeParse = uc.parse;
    b.utcFormat = uc.utcFormat;
    b.utcParse = uc.utcParse;
    return uc;
  }
  function Is(a) {
    return a.toISOString();
  }
  function Js(a) {
    a = new Date(a);
    return isNaN(a) ? null : a;
  }
  function Ks(a) {
    return new Date(a);
  }
  function Ls(a) {
    return a instanceof Date ? +a : +new Date(+a);
  }
  function vh(a, c, d, e, g, h, b, p, t) {
    function k(l) {
      return (b(l) < l ? D : h(l) < l ? F : g(l) < l ? I : e(l) < l ? P : c(l) < l ? d(l) < l ? C : x : a(l) < l ? J : K)(l);
    }
    function l(c, d, e, g) {
      null == c && (c = 10);
      if ("number" === typeof c) {
        g = Math.abs(e - d) / c;
        var f = zf(function(a) {
          return a[2];
        }).right(N, g);
        f === N.length ? (g = Gb(d / wh, e / wh, c), c = a) : f ? (f = N[g / N[f - 1][2] < N[f][2] / g ? f - 1 : f], g = f[1], c = f[0]) : (g = Math.max(Gb(d, e, c), 1), c = p);
      }
      return null == g ? c : c.every(g);
    }
    var r = il(va, va), v = r.invert, z = r.domain, D = t(".%L"), F = t(":%S"), I = t("%I:%M"), P = t("%I %p"), C = t("%a %d"), x = t("%b %d"), J = t("%B"), K = t("%Y"), N = [[b, 1, 1000], [b, 5, 5E3], [b, 15, 15E3], [b, 30, 3E4], [h, 1, 6E4], [h, 5, 3E5], [h, 15, 9E5], [h, 30, 18E5], [g, 1, 36E5], [g, 3, 108E5], [g, 6, 216E5], [g, 12, 432E5], [e, 1, 864E5], [e, 2, 1728E5], [d, 1, Ms], [c, 1, Kl], [c, 3, 3 * Kl], [a, 1, wh]];
    r.invert = function(a) {
      return new Date(v(a));
    };
    r.domain = function(a) {
      return arguments.length ? z(Ye.call(a, Ls)) : z().map(Ks);
    };
    r.ticks = function(a, c) {
      var d = z(), e = d[0];
      d = d[d.length - 1];
      var g = d < e;
      if (g) {
        var h = e;
        e = d;
        d = h;
      }
      h = (h = l(a, e, d, c)) ? h.range(e, d + 1) : [];
      return g ? h.reverse() : h;
    };
    r.tickFormat = function(a, c) {
      return null == c ? k : t(c);
    };
    r.nice = function(a, c) {
      var d = z();
      return (a = l(a, d[0], d[d.length - 1], c)) ? z(ml(d, a)) : r;
    };
    r.copy = function() {
      return jd(r, vh(a, c, d, e, g, h, b, p, t));
    };
    return r;
  }
  function $e() {
    function a(a) {
      return isNaN(a = +a) ? y : p(0 === h ? 0.5 : (a = (b(a) - e) * h, t ? Math.max(0, Math.min(1, a)) : a));
    }
    var c = 0, d = 1, e, g, h, b, p = va, t = !1, y;
    a.domain = function(l) {
      return arguments.length ? (e = b(c = +l[0]), g = b(d = +l[1]), h = e === g ? 0 : 1 / (g - e), a) : [c, d];
    };
    a.clamp = function(c) {
      return arguments.length ? (t = !!c, a) : t;
    };
    a.interpolator = function(c) {
      return arguments.length ? (p = c, a) : p;
    };
    a.unknown = function(c) {
      return arguments.length ? (y = c, a) : y;
    };
    return function(l) {
      b = l;
      e = l(c);
      g = l(d);
      h = e === g ? 0 : 1 / (g - e);
      return a;
    };
  }
  function Cb(a, c) {
    return c.domain(a.domain()).interpolator(a.interpolator()).clamp(a.clamp()).unknown(a.unknown());
  }
  function Ll() {
    var a = Ub($e()(va));
    a.copy = function() {
      return Cb(a, Ll());
    };
    return pb.apply(a, arguments);
  }
  function Ml() {
    var a = ph($e()).domain([1, 10]);
    a.copy = function() {
      return Cb(a, Ml()).base(a.base());
    };
    return pb.apply(a, arguments);
  }
  function Nl() {
    var a = qh($e());
    a.copy = function() {
      return Cb(a, Nl()).constant(a.constant());
    };
    return pb.apply(a, arguments);
  }
  function xh() {
    var a = rh($e());
    a.copy = function() {
      return Cb(a, xh()).exponent(a.exponent());
    };
    return pb.apply(a, arguments);
  }
  function Ol() {
    function a(a) {
      if (!isNaN(a = +a)) {
        return d((Bb(c, a) - 1) / (c.length - 1));
      }
    }
    var c = [], d = va;
    a.domain = function(d) {
      if (!arguments.length) {
        return c.slice();
      }
      c = [];
      for (var e = 0, h = d.length, b; e < h; ++e) {
        (b = d[e], null == b || isNaN(b = +b)) || c.push(b);
      }
      c.sort(Oa);
      return a;
    };
    a.interpolator = function(c) {
      return arguments.length ? (d = c, a) : d;
    };
    a.copy = function() {
      return Ol(d).domain(c);
    };
    return pb.apply(a, arguments);
  }
  function af() {
    function a(a) {
      return isNaN(a = +a) ? v : (a = 0.5 + ((a = +l(a)) - h) * (a < h ? p : t), y(r ? Math.max(0, Math.min(1, a)) : a));
    }
    var c = 0, d = 0.5, e = 1, g, h, b, p, t, y = va, l, r = !1, v;
    a.domain = function(k) {
      return arguments.length ? (g = l(c = +k[0]), h = l(d = +k[1]), b = l(e = +k[2]), p = g === h ? 0 : 0.5 / (h - g), t = h === b ? 0 : 0.5 / (b - h), a) : [c, d, e];
    };
    a.clamp = function(c) {
      return arguments.length ? (r = !!c, a) : r;
    };
    a.interpolator = function(c) {
      return arguments.length ? (y = c, a) : y;
    };
    a.unknown = function(c) {
      return arguments.length ? (v = c, a) : v;
    };
    return function(k) {
      l = k;
      g = k(c);
      h = k(d);
      b = k(e);
      p = g === h ? 0 : 0.5 / (h - g);
      t = h === b ? 0 : 0.5 / (b - h);
      return a;
    };
  }
  function Pl() {
    var a = Ub(af()(va));
    a.copy = function() {
      return Cb(a, Pl());
    };
    return pb.apply(a, arguments);
  }
  function Ql() {
    var a = ph(af()).domain([0.1, 1, 10]);
    a.copy = function() {
      return Cb(a, Ql()).base(a.base());
    };
    return pb.apply(a, arguments);
  }
  function Rl() {
    var a = qh(af());
    a.copy = function() {
      return Cb(a, Rl()).constant(a.constant());
    };
    return pb.apply(a, arguments);
  }
  function yh() {
    var a = rh(af());
    a.copy = function() {
      return Cb(a, yh()).exponent(a.exponent());
    };
    return pb.apply(a, arguments);
  }
  function aa(a) {
    for (var c = a.length / 6 | 0, d = Array(c), e = 0; e < c;) {
      d[e] = "#" + a.slice(6 * e, 6 * ++e);
    }
    return d;
  }
  function ha(a) {
    return Sl(a[a.length - 1]);
  }
  function bf(a) {
    var c = a.length;
    return function(d) {
      return a[Math.max(0, Math.min(c - 1, Math.floor(d * c)))];
    };
  }
  function Z(a) {
    return function() {
      return a;
    };
  }
  function Tl(a) {
    return 1 <= a ? cf : -1 >= a ? -cf : Math.asin(a);
  }
  function Ns(a) {
    return a.innerRadius;
  }
  function Os(a) {
    return a.outerRadius;
  }
  function Ps(a) {
    return a.startAngle;
  }
  function Qs(a) {
    return a.endAngle;
  }
  function Rs(a) {
    return a && a.padAngle;
  }
  function df(a, c, d, e, g, b, k) {
    var h = a - d, t = c - e;
    k = (k ? b : -b) / vc(h * h + t * t);
    t *= k;
    h *= -k;
    var y = a + t, l = c + h, r = d + t, v = e + h;
    d = (y + r) / 2;
    e = (l + v) / 2;
    c = r - y;
    a = v - l;
    k = c * c + a * a;
    b = g - b;
    v = y * v - r * l;
    var z = (0 > a ? -1 : 1) * vc(Ss(0, b * b * k - v * v));
    y = (v * a - c * z) / k;
    l = (-v * c - a * z) / k;
    r = (v * a + c * z) / k;
    c = (-v * c + a * z) / k;
    a = y - d;
    k = l - e;
    d = r - d;
    e = c - e;
    a * a + k * k > d * d + e * e && (y = r, l = c);
    return {cx:y, cy:l, x01:-t, y01:-h, x11:y * (g / b - 1), y11:l * (g / b - 1)};
  }
  function Ul(a) {
    this._context = a;
  }
  function ef(a) {
    return new Ul(a);
  }
  function zh(a) {
    return a[0];
  }
  function Ah(a) {
    return a[1];
  }
  function Bh() {
    function a(a) {
      var h, p = a.length, l, r = !1, v;
      null == g && (k = b(v = xb()));
      for (h = 0; h <= p; ++h) {
        !(h < p && e(l = a[h], h, a)) === r && ((r = !r) ? k.lineStart() : k.lineEnd()), r && k.point(+c(l, h, a), +d(l, h, a));
      }
      if (v) {
        return k = null, v + "" || null;
      }
    }
    var c = zh, d = Ah, e = Z(!0), g = null, b = ef, k = null;
    a.x = function(d) {
      return arguments.length ? (c = "function" === typeof d ? d : Z(+d), a) : c;
    };
    a.y = function(c) {
      return arguments.length ? (d = "function" === typeof c ? c : Z(+c), a) : d;
    };
    a.defined = function(c) {
      return arguments.length ? (e = "function" === typeof c ? c : Z(!!c), a) : e;
    };
    a.curve = function(c) {
      return arguments.length ? (b = c, null != g && (k = b(g)), a) : b;
    };
    a.context = function(c) {
      return arguments.length ? (null == c ? g = k = null : k = b(g = c), a) : g;
    };
    return a;
  }
  function Vl() {
    function a(a) {
      var c, h, l = a.length, D, F = !1, I, P = Array(l), C = Array(l);
      null == p && (y = t(I = xb()));
      for (c = 0; c <= l; ++c) {
        if (!(c < l && k(D = a[c], c, a)) === F) {
          if (F = !F) {
            var x = c;
            y.areaStart();
            y.lineStart();
          } else {
            y.lineEnd();
            y.lineStart();
            for (h = c - 1; h >= x; --h) {
              y.point(P[h], C[h]);
            }
            y.lineEnd();
            y.areaEnd();
          }
        }
        F && (P[c] = +d(D, c, a), C[c] = +g(D, c, a), y.point(e ? +e(D, c, a) : P[c], b ? +b(D, c, a) : C[c]));
      }
      if (I) {
        return y = null, I + "" || null;
      }
    }
    function c() {
      return Bh().defined(k).curve(t).context(p);
    }
    var d = zh, e = null, g = Z(0), b = Ah, k = Z(!0), p = null, t = ef, y = null;
    a.x = function(c) {
      return arguments.length ? (d = "function" === typeof c ? c : Z(+c), e = null, a) : d;
    };
    a.x0 = function(c) {
      return arguments.length ? (d = "function" === typeof c ? c : Z(+c), a) : d;
    };
    a.x1 = function(c) {
      return arguments.length ? (e = null == c ? null : "function" === typeof c ? c : Z(+c), a) : e;
    };
    a.y = function(c) {
      return arguments.length ? (g = "function" === typeof c ? c : Z(+c), b = null, a) : g;
    };
    a.y0 = function(c) {
      return arguments.length ? (g = "function" === typeof c ? c : Z(+c), a) : g;
    };
    a.y1 = function(c) {
      return arguments.length ? (b = null == c ? null : "function" === typeof c ? c : Z(+c), a) : b;
    };
    a.lineX0 = a.lineY0 = function() {
      return c().x(d).y(g);
    };
    a.lineY1 = function() {
      return c().x(d).y(b);
    };
    a.lineX1 = function() {
      return c().x(e).y(g);
    };
    a.defined = function(c) {
      return arguments.length ? (k = "function" === typeof c ? c : Z(!!c), a) : k;
    };
    a.curve = function(c) {
      return arguments.length ? (t = c, null != p && (y = t(p)), a) : t;
    };
    a.context = function(c) {
      return arguments.length ? (null == c ? p = y = null : y = t(p = c), a) : p;
    };
    return a;
  }
  function Ts(a, c) {
    return c < a ? -1 : c > a ? 1 : c >= a ? 0 : NaN;
  }
  function Us(a) {
    return a;
  }
  function Wl(a) {
    this._curve = a;
  }
  function Ch(a) {
    function c(c) {
      return new Wl(a(c));
    }
    c._curve = a;
    return c;
  }
  function vd(a) {
    var c = a.curve;
    a.angle = a.x;
    delete a.x;
    a.radius = a.y;
    delete a.y;
    a.curve = function(a) {
      return arguments.length ? c(Ch(a)) : c()._curve;
    };
    return a;
  }
  function Xl() {
    return vd(Bh().curve(Yl));
  }
  function Zl() {
    var a = Vl().curve(Yl), c = a.curve, d = a.lineX0, e = a.lineX1, g = a.lineY0, b = a.lineY1;
    a.angle = a.x;
    delete a.x;
    a.startAngle = a.x0;
    delete a.x0;
    a.endAngle = a.x1;
    delete a.x1;
    a.radius = a.y;
    delete a.y;
    a.innerRadius = a.y0;
    delete a.y0;
    a.outerRadius = a.y1;
    delete a.y1;
    a.lineStartAngle = function() {
      return vd(d());
    };
    delete a.lineX0;
    a.lineEndAngle = function() {
      return vd(e());
    };
    delete a.lineX1;
    a.lineInnerRadius = function() {
      return vd(g());
    };
    delete a.lineY0;
    a.lineOuterRadius = function() {
      return vd(b());
    };
    delete a.lineY1;
    a.curve = function(a) {
      return arguments.length ? c(Ch(a)) : c()._curve;
    };
    return a;
  }
  function wd(a, c) {
    return [(c = +c) * Math.cos(a -= Math.PI / 2), c * Math.sin(a)];
  }
  function Vs(a) {
    return a.source;
  }
  function Ws(a) {
    return a.target;
  }
  function Dh(a) {
    function c() {
      var c, h = Eh.call(arguments), y = d.apply(this, h), l = e.apply(this, h);
      k || (k = c = xb());
      a(k, +g.apply(this, (h[0] = y, h)), +b.apply(this, h), +g.apply(this, (h[0] = l, h)), +b.apply(this, h));
      if (c) {
        return k = null, c + "" || null;
      }
    }
    var d = Vs, e = Ws, g = zh, b = Ah, k = null;
    c.source = function(a) {
      return arguments.length ? (d = a, c) : d;
    };
    c.target = function(a) {
      return arguments.length ? (e = a, c) : e;
    };
    c.x = function(a) {
      return arguments.length ? (g = "function" === typeof a ? a : Z(+a), c) : g;
    };
    c.y = function(a) {
      return arguments.length ? (b = "function" === typeof a ? a : Z(+a), c) : b;
    };
    c.context = function(a) {
      return arguments.length ? (k = null == a ? null : a, c) : k;
    };
    return c;
  }
  function Xs(a, c, d, e, g) {
    a.moveTo(c, d);
    a.bezierCurveTo(c = (c + e) / 2, d, c, g, e, g);
  }
  function Ys(a, c, d, e, g) {
    a.moveTo(c, d);
    a.bezierCurveTo(c, d = (d + g) / 2, e, d, e, g);
  }
  function Zs(a, c, d, e, g) {
    var b = wd(c, d);
    c = wd(c, d = (d + g) / 2);
    d = wd(e, d);
    e = wd(e, g);
    a.moveTo(b[0], b[1]);
    a.bezierCurveTo(c[0], c[1], d[0], d[1], e[0], e[1]);
  }
  function Db() {
  }
  function ff(a, c, d) {
    a._context.bezierCurveTo((2 * a._x0 + a._x1) / 3, (2 * a._y0 + a._y1) / 3, (a._x0 + 2 * a._x1) / 3, (a._y0 + 2 * a._y1) / 3, (a._x0 + 4 * a._x1 + c) / 6, (a._y0 + 4 * a._y1 + d) / 6);
  }
  function gf(a) {
    this._context = a;
  }
  function $l(a) {
    this._context = a;
  }
  function am(a) {
    this._context = a;
  }
  function bm(a, c) {
    this._basis = new gf(a);
    this._beta = c;
  }
  function hf(a, c, d) {
    a._context.bezierCurveTo(a._x1 + a._k * (a._x2 - a._x0), a._y1 + a._k * (a._y2 - a._y0), a._x2 + a._k * (a._x1 - c), a._y2 + a._k * (a._y1 - d), a._x2, a._y2);
  }
  function Fh(a, c) {
    this._context = a;
    this._k = (1 - c) / 6;
  }
  function Gh(a, c) {
    this._context = a;
    this._k = (1 - c) / 6;
  }
  function Hh(a, c) {
    this._context = a;
    this._k = (1 - c) / 6;
  }
  function Ih(a, c, d) {
    var e = a._x1, g = a._y1, b = a._x2, k = a._y2;
    if (1e-12 < a._l01_a) {
      var p = 2 * a._l01_2a + 3 * a._l01_a * a._l12_a + a._l12_2a, t = 3 * a._l01_a * (a._l01_a + a._l12_a);
      e = (e * p - a._x0 * a._l12_2a + a._x2 * a._l01_2a) / t;
      g = (g * p - a._y0 * a._l12_2a + a._y2 * a._l01_2a) / t;
    }
    1e-12 < a._l23_a && (p = 2 * a._l23_2a + 3 * a._l23_a * a._l12_a + a._l12_2a, t = 3 * a._l23_a * (a._l23_a + a._l12_a), b = (b * p + a._x1 * a._l23_2a - c * a._l12_2a) / t, k = (k * p + a._y1 * a._l23_2a - d * a._l12_2a) / t);
    a._context.bezierCurveTo(e, g, b, k, a._x2, a._y2);
  }
  function cm(a, c) {
    this._context = a;
    this._alpha = c;
  }
  function dm(a, c) {
    this._context = a;
    this._alpha = c;
  }
  function em(a, c) {
    this._context = a;
    this._alpha = c;
  }
  function fm(a) {
    this._context = a;
  }
  function gm(a, c, d) {
    var e = a._x1 - a._x0;
    c -= a._x1;
    var g = (a._y1 - a._y0) / (e || 0 > c && -0);
    a = (d - a._y1) / (c || 0 > e && -0);
    return ((0 > g ? -1 : 1) + (0 > a ? -1 : 1)) * Math.min(Math.abs(g), Math.abs(a), 0.5 * Math.abs((g * c + a * e) / (e + c))) || 0;
  }
  function hm(a, c) {
    var d = a._x1 - a._x0;
    return d ? (3 * (a._y1 - a._y0) / d - c) / 2 : c;
  }
  function Jh(a, c, d) {
    var e = a._x0, g = a._x1, b = a._y1, k = (g - e) / 3;
    a._context.bezierCurveTo(e + k, a._y0 + k * c, g - k, b - k * d, g, b);
  }
  function jf(a) {
    this._context = a;
  }
  function im(a) {
    this._context = new jm(a);
  }
  function jm(a) {
    this._context = a;
  }
  function km(a) {
    this._context = a;
  }
  function lm(a) {
    var c, d = a.length - 1, e = Array(d), g = Array(d), b = Array(d);
    e[0] = 0;
    g[0] = 2;
    b[0] = a[0] + 2 * a[1];
    for (c = 1; c < d - 1; ++c) {
      e[c] = 1, g[c] = 4, b[c] = 4 * a[c] + 2 * a[c + 1];
    }
    e[d - 1] = 2;
    g[d - 1] = 7;
    b[d - 1] = 8 * a[d - 1] + a[d];
    for (c = 1; c < d; ++c) {
      var k = e[c] / g[c - 1];
      g[c] -= k;
      b[c] -= k * b[c - 1];
    }
    e[d - 1] = b[d - 1] / g[d - 1];
    for (c = d - 2; 0 <= c; --c) {
      e[c] = (b[c] - e[c + 1]) / g[c];
    }
    g[d - 1] = (a[d] + e[d - 1]) / 2;
    for (c = 0; c < d - 1; ++c) {
      g[c] = 2 * a[c + 1] - e[c + 1];
    }
    return [e, g];
  }
  function kf(a, c) {
    this._context = a;
    this._t = c;
  }
  function wc(a, c) {
    if (1 < (k = a.length)) {
      for (var d = 1, e, g, b = a[c[0]], k, p = b.length; d < k; ++d) {
        for (g = b, b = a[c[d]], e = 0; e < p; ++e) {
          b[e][1] += b[e][0] = isNaN(g[e][1]) ? g[e][0] : g[e][1];
        }
      }
    }
  }
  function xc(a) {
    a = a.length;
    for (var c = Array(a); 0 <= --a;) {
      c[a] = a;
    }
    return c;
  }
  function $s(a, c) {
    return a[c];
  }
  function mm(a) {
    var c = a.map(at);
    return xc(a).sort(function(a, e) {
      return c[a] - c[e];
    });
  }
  function at(a) {
    for (var c = -1, d = 0, e = a.length, g, b = -Infinity; ++c < e;) {
      (g = +a[c][1]) > b && (b = g, d = c);
    }
    return d;
  }
  function nm(a) {
    var c = a.map(om);
    return xc(a).sort(function(a, e) {
      return c[a] - c[e];
    });
  }
  function om(a) {
    for (var c = 0, d = -1, e = a.length, g; ++d < e;) {
      if (g = +a[d][1]) {
        c += g;
      }
    }
    return c;
  }
  function pm(a) {
    return function() {
      return a;
    };
  }
  function bt(a) {
    return a[0];
  }
  function ct(a) {
    return a[1];
  }
  function lf() {
    this._ = null;
  }
  function mf(a) {
    a.U = a.C = a.L = a.R = a.P = a.N = null;
  }
  function xd(a, c) {
    var d = c.R, e = c.U;
    e ? e.L === c ? e.L = d : e.R = d : a._ = d;
    d.U = e;
    c.U = d;
    c.R = d.L;
    c.R && (c.R.U = c);
    d.L = c;
  }
  function yd(a, c) {
    var d = c.L, e = c.U;
    e ? e.L === c ? e.L = d : e.R = d : a._ = d;
    d.U = e;
    c.U = d;
    c.L = d.R;
    c.L && (c.L.U = c);
    d.R = c;
  }
  function qm(a) {
    for (; a.L;) {
      a = a.L;
    }
    return a;
  }
  function zd(a, c, d, e) {
    var g = [null, null], b = xa.push(g) - 1;
    g.left = a;
    g.right = c;
    d && nf(g, a, c, d);
    e && nf(g, c, a, e);
    Na[a.index].halfedges.push(b);
    Na[c.index].halfedges.push(b);
    return g;
  }
  function Ad(a, c, d) {
    c = [c, d];
    c.left = a;
    return c;
  }
  function nf(a, c, d, e) {
    a[0] || a[1] ? a.left === d ? a[1] = e : a[0] = e : (a[0] = e, a.left = c, a.right = d);
  }
  function dt(a, c, d, e, g) {
    var b = a[0], k = a[1], p = b[0];
    b = b[1];
    var t = 0, y = 1, l = k[0] - p;
    k = k[1] - b;
    c -= p;
    if (l || !(0 < c)) {
      c /= l;
      if (0 > l) {
        if (c < t) {
          return;
        }
        c < y && (y = c);
      } else {
        if (0 < l) {
          if (c > y) {
            return;
          }
          c > t && (t = c);
        }
      }
      c = e - p;
      if (l || !(0 > c)) {
        c /= l;
        if (0 > l) {
          if (c > y) {
            return;
          }
          c > t && (t = c);
        } else {
          if (0 < l) {
            if (c < t) {
              return;
            }
            c < y && (y = c);
          }
        }
        c = d - b;
        if (k || !(0 < c)) {
          c /= k;
          if (0 > k) {
            if (c < t) {
              return;
            }
            c < y && (y = c);
          } else {
            if (0 < k) {
              if (c > y) {
                return;
              }
              c > t && (t = c);
            }
          }
          c = g - b;
          if (k || !(0 > c)) {
            c /= k;
            if (0 > k) {
              if (c > y) {
                return;
              }
              c > t && (t = c);
            } else {
              if (0 < k) {
                if (c < t) {
                  return;
                }
                c < y && (y = c);
              }
            }
            if (!(0 < t || 1 > y)) {
              return !0;
            }
            0 < t && (a[0] = [p + t * l, b + t * k]);
            1 > y && (a[1] = [p + y * l, b + y * k]);
            return !0;
          }
        }
      }
    }
  }
  function et(a, c, d, e, g) {
    var b = a[1];
    if (b) {
      return !0;
    }
    var k = a[0], p = a.left, t = a.right;
    b = p[0];
    p = p[1];
    var y = t[0];
    t = t[1];
    var l = (b + y) / 2;
    if (t === p) {
      if (l < c || l >= e) {
        return;
      }
      if (b > y) {
        if (!k) {
          k = [l, d];
        } else {
          if (k[1] >= g) {
            return;
          }
        }
        b = [l, g];
      } else {
        if (!k) {
          k = [l, g];
        } else {
          if (k[1] < d) {
            return;
          }
        }
        b = [l, d];
      }
    } else {
      var r = (b - y) / (t - p);
      l = (p + t) / 2 - r * l;
      if (-1 > r || 1 < r) {
        if (b > y) {
          if (!k) {
            k = [(d - l) / r, d];
          } else {
            if (k[1] >= g) {
              return;
            }
          }
          b = [(g - l) / r, g];
        } else {
          if (!k) {
            k = [(g - l) / r, g];
          } else {
            if (k[1] < d) {
              return;
            }
          }
          b = [(d - l) / r, d];
        }
      } else {
        if (p < t) {
          if (!k) {
            k = [c, r * c + l];
          } else {
            if (k[0] >= e) {
              return;
            }
          }
          b = [e, r * e + l];
        } else {
          if (!k) {
            k = [e, r * e + l];
          } else {
            if (k[0] < c) {
              return;
            }
          }
          b = [c, r * c + l];
        }
      }
    }
    a[0] = k;
    a[1] = b;
    return !0;
  }
  function ft(a, c) {
    a = a.site;
    var d = c.left, e = c.right;
    a === e && (e = d, d = a);
    if (e) {
      return Math.atan2(e[1] - d[1], e[0] - d[0]);
    }
    a === d ? (d = c[1], e = c[0]) : (d = c[0], e = c[1]);
    return Math.atan2(d[0] - e[0], e[1] - d[1]);
  }
  function rm(a, c) {
    return c[+(c.left !== a.site)];
  }
  function gt() {
    for (var a = 0, c = Na.length, d, e, g, b; a < c; ++a) {
      if ((d = Na[a]) && (b = (e = d.halfedges).length)) {
        var k = Array(b), p = Array(b);
        for (g = 0; g < b; ++g) {
          k[g] = g, p[g] = ft(d, xa[e[g]]);
        }
        k.sort(function(a, c) {
          return p[c] - p[a];
        });
        for (g = 0; g < b; ++g) {
          p[g] = e[k[g]];
        }
        for (g = 0; g < b; ++g) {
          e[g] = p[g];
        }
      }
    }
  }
  function ht() {
    mf(this);
    this.x = this.y = this.arc = this.site = this.cy = null;
  }
  function yc(a) {
    var c = a.P, d = a.N;
    if (c && d) {
      var e = c.site;
      c = a.site;
      var g = d.site;
      if (e !== g) {
        d = c[0];
        var b = c[1], k = e[0] - d, p = e[1] - b;
        e = g[0] - d;
        var t = g[1] - b;
        g = 2 * (k * t - p * e);
        if (!(g >= -it)) {
          var y = k * k + p * p, l = e * e + t * t;
          p = (t * y - p * l) / g;
          e = (k * l - e * y) / g;
          k = sm.pop() || new ht;
          k.arc = a;
          k.site = c;
          k.x = p + d;
          k.y = (k.cy = e + b) + Math.sqrt(p * p + e * e);
          a.circle = k;
          a = null;
          for (c = Bd._; c;) {
            if (k.y < c.y || k.y === c.y && k.x <= c.x) {
              if (c.L) {
                c = c.L;
              } else {
                a = c.P;
                break;
              }
            } else {
              if (c.R) {
                c = c.R;
              } else {
                a = c;
                break;
              }
            }
          }
          Bd.insert(a, k);
          a || (Kh = k);
        }
      }
    }
  }
  function zc(a) {
    var c = a.circle;
    c && (c.P || (Kh = c.N), Bd.remove(c), sm.push(c), mf(c), a.circle = null);
  }
  function jt() {
    mf(this);
    this.edge = this.site = this.circle = null;
  }
  function tm(a) {
    var c = um.pop() || new jt;
    c.site = a;
    return c;
  }
  function Lh(a) {
    zc(a);
    Ac.remove(a);
    um.push(a);
    mf(a);
  }
  function vm(a, c) {
    var d = a.site, e = d[0], g = d[1], b = g - c;
    if (!b) {
      return e;
    }
    a = a.P;
    if (!a) {
      return -Infinity;
    }
    d = a.site;
    a = d[0];
    d = d[1];
    c = d - c;
    if (!c) {
      return a;
    }
    var k = a - e, p = 1 / b - 1 / c, t = k / c;
    return p ? (-t + Math.sqrt(t * t - 2 * p * (k * k / (-2 * c) - d + c / 2 + g - b / 2))) / p + e : (e + a) / 2;
  }
  function kt(a, c) {
    return c[1] - a[1] || c[0] - a[0];
  }
  function Mh(a, c) {
    var d = a.sort(kt).pop(), e;
    xa = [];
    Na = Array(a.length);
    Ac = new lf;
    for (Bd = new lf;;) {
      var g = Kh;
      if (d && (!g || d[1] < g.y || d[1] === g.y && d[0] < g.x)) {
        if (d[0] !== e || d[1] !== b) {
          var b = e = void 0;
          g = d;
          for (var k = g[0], p = g[1], t = Ac._; t;) {
            var y = vm(t, p) - k;
            if (y > ba) {
              t = t.L;
            } else {
              var l = t;
              var r = p;
              var v = l.N;
              v ? r = vm(v, r) : (l = l.site, r = l[1] === r ? l[0] : Infinity);
              r = k - r;
              if (r > ba) {
                if (!t.R) {
                  b = t;
                  break;
                }
                t = t.R;
              } else {
                y > -ba ? (b = t.P, e = t) : r > -ba ? (b = t, e = t.N) : b = e = t;
                break;
              }
            }
          }
          Na[g.index] = {site:g, halfedges:[]};
          y = tm(g);
          Ac.insert(b, y);
          if (b || e) {
            if (b === e) {
              zc(b), e = tm(b.site), Ac.insert(y, e), y.edge = e.edge = zd(b.site, y.site), yc(b), yc(e);
            } else {
              if (e) {
                zc(b);
                zc(e);
                k = b.site;
                t = k[0];
                r = k[1];
                l = g[0] - t;
                v = g[1] - r;
                p = e.site;
                var z = p[0] - t, D = p[1] - r, F = 2 * (l * D - v * z), I = l * l + v * v, P = z * z + D * D;
                t = [(D * I - v * P) / F + t, (l * P - z * I) / F + r];
                nf(e.edge, k, p, t);
                y.edge = zd(k, g, null, t);
                e.edge = zd(g, p, null, t);
                yc(b);
                yc(e);
              } else {
                y.edge = zd(b.site, y.site);
              }
            }
          }
          e = d[0];
          b = d[1];
        }
        d = a.pop();
      } else {
        if (g) {
          p = g.arc;
          g = p.circle;
          k = g.x;
          t = g.cy;
          g = [k, t];
          l = p.P;
          r = p.N;
          y = [p];
          Lh(p);
          for (p = l; p.circle && Math.abs(k - p.circle.x) < ba && Math.abs(t - p.circle.cy) < ba;) {
            l = p.P, y.unshift(p), Lh(p), p = l;
          }
          y.unshift(p);
          zc(p);
          for (l = r; l.circle && Math.abs(k - l.circle.x) < ba && Math.abs(t - l.circle.cy) < ba;) {
            r = l.N, y.push(l), Lh(l), l = r;
          }
          y.push(l);
          zc(l);
          t = y.length;
          for (k = 1; k < t; ++k) {
            l = y[k], p = y[k - 1], nf(l.edge, p.site, l.site, g);
          }
          p = y[0];
          l = y[t - 1];
          l.edge = zd(p.site, l.site, null, g);
          yc(p);
          yc(l);
        } else {
          break;
        }
      }
    }
    gt();
    if (c) {
      e = +c[0][0];
      a = +c[0][1];
      d = +c[1][0];
      c = +c[1][1];
      b = xa.length;
      for (var C; b--;) {
        et(C = xa[b], e, a, d, c) && dt(C, e, a, d, c) && (Math.abs(C[0][0] - C[1][0]) > ba || Math.abs(C[0][1] - C[1][1]) > ba) || delete xa[b];
      }
      C = Na.length;
      b = !0;
      for (g = 0; g < C; ++g) {
        if (y = Na[g]) {
          var x = y.site;
          p = y.halfedges;
          for (k = p.length; k--;) {
            xa[p[k]] || p.splice(k, 1);
          }
          k = 0;
          for (t = p.length; k < t;) {
            if (r = xa[p[k]], l = r[+(r.left === y.site)], v = l[0], z = l[1], D = rm(y, xa[p[++k % t]]), r = D[0], D = D[1], Math.abs(v - r) > ba || Math.abs(z - D) > ba) {
              p.splice(k, 0, xa.push(Ad(x, l, Math.abs(v - e) < ba && c - z > ba ? [e, Math.abs(r - e) < ba ? D : c] : Math.abs(z - c) < ba && d - v > ba ? [Math.abs(D - c) < ba ? r : d, c] : Math.abs(v - d) < ba && z - a > ba ? [d, Math.abs(r - d) < ba ? D : a] : Math.abs(z - a) < ba && v - e > ba ? [Math.abs(D - a) < ba ? r : e, a] : null)) - 1), ++t;
            }
          }
          t && (b = !1);
        }
      }
      if (b) {
        k = Infinity;
        g = 0;
        for (b = null; g < C; ++g) {
          if (y = Na[g]) {
            x = y.site, p = x[0] - e, t = x[1] - a, p = p * p + t * t, p < k && (k = p, b = y);
          }
        }
        b && (g = [e, a], e = [e, c], c = [d, c], a = [d, a], b.halfedges.push(xa.push(Ad(x = b.site, g, e)) - 1, xa.push(Ad(x, e, c)) - 1, xa.push(Ad(x, c, a)) - 1, xa.push(Ad(x, a, g)) - 1));
      }
      for (g = 0; g < C; ++g) {
        if (y = Na[g]) {
          y.halfedges.length || delete Na[g];
        }
      }
    }
    this.edges = xa;
    this.cells = Na;
    Ac = Bd = xa = Na = null;
  }
  function of(a) {
    return function() {
      return a;
    };
  }
  function lt(a, c, d) {
    this.target = a;
    this.type = c;
    this.transform = d;
  }
  function sb(a, c, d) {
    this.k = a;
    this.x = c;
    this.y = d;
  }
  function wm(a) {
    return a.__zoom || pf;
  }
  function Cd() {
    b.event.preventDefault();
    b.event.stopImmediatePropagation();
  }
  function mt() {
    return !b.event.button;
  }
  function nt() {
    var a = this;
    if (a instanceof SVGElement) {
      a = a.ownerSVGElement || a;
      var c = a.width.baseVal.value;
      a = a.height.baseVal.value;
    } else {
      c = a.clientWidth, a = a.clientHeight;
    }
    return [[0, 0], [c, a]];
  }
  function xm() {
    return this.__zoom || pf;
  }
  function ot() {
    return -b.event.deltaY * (b.event.deltaMode ? 120 : 1) / 500;
  }
  function pt() {
    return "ontouchstart" in this;
  }
  function qt(a, c, d) {
    var e = a.invertX(c[0][0]) - d[0][0], g = a.invertX(c[1][0]) - d[1][0], b = a.invertY(c[0][1]) - d[0][1];
    c = a.invertY(c[1][1]) - d[1][1];
    return a.translate(g > e ? (e + g) / 2 : Math.min(0, e) || Math.max(0, g), c > b ? (b + c) / 2 : Math.min(0, b) || Math.max(0, c));
  }
  var ym = zf(Oa), Bb = ym.right, rt = ym.left, zm = Array.prototype, st = zm.slice, tt = zm.map, Cf = Math.sqrt(50), Df = Math.sqrt(10), Ef = Math.sqrt(2), Hf = Array.prototype.slice, co = {value:function() {
  }};
  Md.prototype = Hb.prototype = {constructor:Md, on:function(a, c) {
    var d = this._, e = bo(a + "", d), g, b = -1, k = e.length;
    if (2 > arguments.length) {
      for (; ++b < k;) {
        var p;
        if (p = g = (a = e[b]).type) {
          a: {
            p = d[g];
            for (var t = 0, y = p.length; t < y; ++t) {
              if ((g = p[t]).name === a.name) {
                g = g.value;
                break a;
              }
            }
            g = void 0;
          }
          p = g;
        }
        if (p) {
          return g;
        }
      }
    } else {
      if (null != c && "function" !== typeof c) {
        throw Error("invalid callback: " + c);
      }
      for (; ++b < k;) {
        if (g = (a = e[b]).type) {
          d[g] = ni(d[g], a.name, c);
        } else {
          if (null == c) {
            for (g in d) {
              d[g] = ni(d[g], a.name, null);
            }
          }
        }
      }
      return this;
    }
  }, copy:function() {
    var a = {}, c = this._, d;
    for (d in c) {
      a[d] = c[d].slice();
    }
    return new Md(a);
  }, call:function(a, c) {
    if (0 < (g = arguments.length - 2)) {
      for (var d = Array(g), e = 0, g, b; e < g; ++e) {
        d[e] = arguments[e + 2];
      }
    }
    if (!this._.hasOwnProperty(a)) {
      throw Error("unknown type: " + a);
    }
    b = this._[a];
    e = 0;
    for (g = b.length; e < g; ++e) {
      b[e].value.apply(c, d);
    }
  }, apply:function(a, c, d) {
    if (!this._.hasOwnProperty(a)) {
      throw Error("unknown type: " + a);
    }
    a = this._[a];
    for (var e = 0, g = a.length; e < g; ++e) {
      a[e].value.apply(c, d);
    }
  }};
  var If = {svg:"http://www.w3.org/2000/svg", xhtml:"http://www.w3.org/1999/xhtml", xlink:"http://www.w3.org/1999/xlink", xml:"http://www.w3.org/XML/1998/namespace", xmlns:"http://www.w3.org/2000/xmlns/"};
  Pd.prototype = {constructor:Pd, appendChild:function(a) {
    return this._parent.insertBefore(a, this._next);
  }, insertBefore:function(a, c) {
    return this._parent.insertBefore(a, c);
  }, querySelector:function(a) {
    return this._parent.querySelector(a);
  }, querySelectorAll:function(a) {
    return this._parent.querySelectorAll(a);
  }};
  pi.prototype = {add:function(a) {
    0 > this._names.indexOf(a) && (this._names.push(a), this._node.setAttribute("class", this._names.join(" ")));
  }, remove:function(a) {
    a = this._names.indexOf(a);
    0 <= a && (this._names.splice(a, 1), this._node.setAttribute("class", this._names.join(" ")));
  }, contains:function(a) {
    return 0 <= this._names.indexOf(a);
  }};
  var ti = {};
  b.event = null;
  "undefined" !== typeof document && ("onmouseenter" in document.documentElement || (ti = {mouseenter:"mouseover", mouseleave:"mouseout"}));
  var Nf = [null];
  za.prototype = Jb.prototype = {constructor:za, select:function(a) {
    "function" !== typeof a && (a = Od(a));
    for (var c = this._groups, d = c.length, e = Array(d), g = 0; g < d; ++g) {
      for (var b = c[g], k = b.length, p = e[g] = Array(k), t, y, l = 0; l < k; ++l) {
        (t = b[l]) && (y = a.call(t, t.__data__, l, b)) && ("__data__" in t && (y.__data__ = t.__data__), p[l] = y);
      }
    }
    return new za(e, this._parents);
  }, selectAll:function(a) {
    "function" !== typeof a && (a = Jf(a));
    for (var c = this._groups, d = c.length, e = [], g = [], b = 0; b < d; ++b) {
      for (var k = c[b], p = k.length, t, y = 0; y < p; ++y) {
        if (t = k[y]) {
          e.push(a.call(t, t.__data__, y, k)), g.push(t);
        }
      }
    }
    return new za(e, g);
  }, filter:function(a) {
    "function" !== typeof a && (a = Kf(a));
    for (var c = this._groups, d = c.length, e = Array(d), g = 0; g < d; ++g) {
      for (var b = c[g], k = b.length, p = e[g] = [], t, y = 0; y < k; ++y) {
        (t = b[y]) && a.call(t, t.__data__, y, b) && p.push(t);
      }
    }
    return new za(e, this._parents);
  }, data:function(a, c) {
    if (!a) {
      return z = Array(this.size()), y = -1, this.each(function(a) {
        z[++y] = a;
      }), z;
    }
    var d = c ? ko : jo, e = this._parents, g = this._groups;
    "function" !== typeof a && (a = io(a));
    for (var b = g.length, k = Array(b), p = Array(b), t = Array(b), y = 0; y < b; ++y) {
      var l = e[y], r = g[y], v = r.length, z = a.call(l, l && l.__data__, y, e), D = z.length, F = p[y] = Array(D), I = k[y] = Array(D);
      v = t[y] = Array(v);
      d(l, r, F, I, v, z, c);
      r = l = 0;
      for (var P; l < D; ++l) {
        if (v = F[l]) {
          for (l >= r && (r = l + 1); !(P = I[r]) && ++r < D;) {
          }
          v._next = P || null;
        }
      }
    }
    k = new za(k, e);
    k._enter = p;
    k._exit = t;
    return k;
  }, enter:function() {
    return new za(this._enter || this._groups.map(oi), this._parents);
  }, exit:function() {
    return new za(this._exit || this._groups.map(oi), this._parents);
  }, join:function(a, c, d) {
    var e = this.enter(), g = this, b = this.exit();
    e = "function" === typeof a ? a(e) : e.append(a + "");
    null != c && (g = c(g));
    null == d ? b.remove() : d(b);
    return e && g ? e.merge(g).order() : g;
  }, merge:function(a) {
    var c = this._groups;
    a = a._groups;
    for (var d = c.length, e = Math.min(d, a.length), g = Array(d), b = 0; b < e; ++b) {
      for (var k = c[b], p = a[b], t = k.length, y = g[b] = Array(t), l, r = 0; r < t; ++r) {
        if (l = k[r] || p[r]) {
          y[r] = l;
        }
      }
    }
    for (; b < d; ++b) {
      g[b] = c[b];
    }
    return new za(g, this._parents);
  }, order:function() {
    for (var a = this._groups, c = -1, d = a.length; ++c < d;) {
      for (var e = a[c], g = e.length - 1, b = e[g], k; 0 <= --g;) {
        if (k = e[g]) {
          b && k.compareDocumentPosition(b) ^ 4 && b.parentNode.insertBefore(k, b), b = k;
        }
      }
    }
    return this;
  }, sort:function(a) {
    function c(c, d) {
      return c && d ? a(c.__data__, d.__data__) : !c - !d;
    }
    a || (a = lo);
    for (var d = this._groups, e = d.length, g = Array(e), b = 0; b < e; ++b) {
      for (var k = d[b], p = k.length, t = g[b] = Array(p), y, l = 0; l < p; ++l) {
        if (y = k[l]) {
          t[l] = y;
        }
      }
      t.sort(c);
    }
    return (new za(g, this._parents)).order();
  }, call:function() {
    var a = arguments[0];
    arguments[0] = this;
    a.apply(null, arguments);
    return this;
  }, nodes:function() {
    var a = Array(this.size()), c = -1;
    this.each(function() {
      a[++c] = this;
    });
    return a;
  }, node:function() {
    for (var a = this._groups, c = 0, d = a.length; c < d; ++c) {
      for (var e = a[c], g = 0, b = e.length; g < b; ++g) {
        var k = e[g];
        if (k) {
          return k;
        }
      }
    }
    return null;
  }, size:function() {
    var a = 0;
    this.each(function() {
      ++a;
    });
    return a;
  }, empty:function() {
    return !this.node();
  }, each:function(a) {
    for (var c = this._groups, d = 0, e = c.length; d < e; ++d) {
      for (var g = c[d], b = 0, k = g.length, p; b < k; ++b) {
        (p = g[b]) && a.call(p, p.__data__, b, g);
      }
    }
    return this;
  }, attr:function(a, c) {
    var d = Hc(a);
    if (2 > arguments.length) {
      var e = this.node();
      return d.local ? e.getAttributeNS(d.space, d.local) : e.getAttribute(d);
    }
    return this.each((null == c ? d.local ? no : mo : "function" === typeof c ? d.local ? ro : qo : d.local ? po : oo)(d, c));
  }, style:function(a, c, d) {
    return 1 < arguments.length ? this.each((null == c ? so : "function" === typeof c ? uo : to)(a, c, null == d ? "" : d)) : Ib(this.node(), a);
  }, property:function(a, c) {
    return 1 < arguments.length ? this.each((null == c ? vo : "function" === typeof c ? xo : wo)(a, c)) : this.node()[a];
  }, classed:function(a, c) {
    var d = (a + "").trim().split(/^|\s+/);
    if (2 > arguments.length) {
      for (var e = Mf(this.node()), g = -1, b = d.length; ++g < b;) {
        if (!e.contains(d[g])) {
          return !1;
        }
      }
      return !0;
    }
    return this.each(("function" === typeof c ? Ao : c ? yo : zo)(d, c));
  }, text:function(a) {
    return arguments.length ? this.each(null == a ? Bo : ("function" === typeof a ? Do : Co)(a)) : this.node().textContent;
  }, html:function(a) {
    return arguments.length ? this.each(null == a ? Eo : ("function" === typeof a ? Go : Fo)(a)) : this.node().innerHTML;
  }, raise:function() {
    return this.each(Ho);
  }, lower:function() {
    return this.each(Io);
  }, append:function(a) {
    var c = "function" === typeof a ? a : Nd(a);
    return this.select(function() {
      return this.appendChild(c.apply(this, arguments));
    });
  }, insert:function(a, c) {
    var d = "function" === typeof a ? a : Nd(a), e = null == c ? Jo : "function" === typeof c ? c : Od(c);
    return this.select(function() {
      return this.insertBefore(d.apply(this, arguments), e.apply(this, arguments) || null);
    });
  }, remove:function() {
    return this.each(Ko);
  }, clone:function(a) {
    return this.select(a ? Mo : Lo);
  }, datum:function(a) {
    return arguments.length ? this.property("__data__", a) : this.node().__data__;
  }, on:function(a, c, d) {
    var e = Oo(a + ""), g = e.length, b;
    if (2 > arguments.length) {
      var k = this.node().__on;
      if (k) {
        for (var p = 0, t = k.length, y; p < t; ++p) {
          var l = 0;
          for (y = k[p]; l < g; ++l) {
            if ((b = e[l]).type === y.type && b.name === y.name) {
              return y.value;
            }
          }
        }
      }
    } else {
      k = c ? Qo : Po;
      null == d && (d = !1);
      for (l = 0; l < g; ++l) {
        this.each(k(e[l], c, d));
      }
      return this;
    }
  }, dispatch:function(a, c) {
    return this.each(("function" === typeof c ? So : Ro)(a, c));
  }};
  var To = 0;
  Of.prototype = vi.prototype = {constructor:Of, get:function(a) {
    for (var c = this._; !(c in a);) {
      if (!(a = a.parentNode)) {
        return;
      }
    }
    return a[c];
  }, set:function(a, c) {
    return a[this._] = c;
  }, remove:function(a) {
    return this._ in a && delete a[this._];
  }, toString:function() {
    return this._;
  }};
  Qf.prototype.on = function() {
    var a = this._.on.apply(this._, arguments);
    return a === this._ ? this : a;
  };
  var Bc = 1 / 0.7, Yo = /^#([0-9a-f]{3})$/, Zo = /^#([0-9a-f]{6})$/, $o = /^rgb\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*\)$/, ap = /^rgb\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/, bp = /^rgba\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/, cp = /^rgba\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/, 
  dp = /^hsl\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/, ep = /^hsla\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/, zi = {aliceblue:15792383, antiquewhite:16444375, aqua:65535, aquamarine:8388564, azure:15794175, beige:16119260, bisque:16770244, black:0, blanchedalmond:16772045, blue:255, blueviolet:9055202, 
  brown:10824234, burlywood:14596231, cadetblue:6266528, chartreuse:8388352, chocolate:13789470, coral:16744272, cornflowerblue:6591981, cornsilk:16775388, crimson:14423100, cyan:65535, darkblue:139, darkcyan:35723, darkgoldenrod:12092939, darkgray:11119017, darkgreen:25600, darkgrey:11119017, darkkhaki:12433259, darkmagenta:9109643, darkolivegreen:5597999, darkorange:16747520, darkorchid:10040012, darkred:9109504, darksalmon:15308410, darkseagreen:9419919, darkslateblue:4734347, darkslategray:3100495, 
  darkslategrey:3100495, darkturquoise:52945, darkviolet:9699539, deeppink:16716947, deepskyblue:49151, dimgray:6908265, dimgrey:6908265, dodgerblue:2003199, firebrick:11674146, floralwhite:16775920, forestgreen:2263842, fuchsia:16711935, gainsboro:14474460, ghostwhite:16316671, gold:16766720, goldenrod:14329120, gray:8421504, green:32768, greenyellow:11403055, grey:8421504, honeydew:15794160, hotpink:16738740, indianred:13458524, indigo:4915330, ivory:16777200, khaki:15787660, lavender:15132410, 
  lavenderblush:16773365, lawngreen:8190976, lemonchiffon:16775885, lightblue:11393254, lightcoral:15761536, lightcyan:14745599, lightgoldenrodyellow:16448210, lightgray:13882323, lightgreen:9498256, lightgrey:13882323, lightpink:16758465, lightsalmon:16752762, lightseagreen:2142890, lightskyblue:8900346, lightslategray:7833753, lightslategrey:7833753, lightsteelblue:11584734, lightyellow:16777184, lime:65280, limegreen:3329330, linen:16445670, magenta:16711935, maroon:8388608, mediumaquamarine:6737322, 
  mediumblue:205, mediumorchid:12211667, mediumpurple:9662683, mediumseagreen:3978097, mediumslateblue:8087790, mediumspringgreen:64154, mediumturquoise:4772300, mediumvioletred:13047173, midnightblue:1644912, mintcream:16121850, mistyrose:16770273, moccasin:16770229, navajowhite:16768685, navy:128, oldlace:16643558, olive:8421376, olivedrab:7048739, orange:16753920, orangered:16729344, orchid:14315734, palegoldenrod:15657130, palegreen:10025880, paleturquoise:11529966, palevioletred:14381203, papayawhip:16773077, 
  peachpuff:16767673, peru:13468991, pink:16761035, plum:14524637, powderblue:11591910, purple:8388736, rebeccapurple:6697881, red:16711680, rosybrown:12357519, royalblue:4286945, saddlebrown:9127187, salmon:16416882, sandybrown:16032864, seagreen:3050327, seashell:16774638, sienna:10506797, silver:12632256, skyblue:8900331, slateblue:6970061, slategray:7372944, slategrey:7372944, snow:16775930, springgreen:65407, steelblue:4620980, tan:13808780, teal:32896, thistle:14204888, tomato:16737095, turquoise:4251856, 
  violet:15631086, wheat:16113331, white:16777215, whitesmoke:16119285, yellow:16776960, yellowgreen:10145074};
  ac(vb, wb, {displayable:function() {
    return this.rgb().displayable();
  }, hex:function() {
    return this.rgb().hex();
  }, toString:function() {
    return this.rgb() + "";
  }});
  ac(ua, bc, Jc(vb, {brighter:function(a) {
    a = null == a ? Bc : Math.pow(Bc, a);
    return new ua(this.r * a, this.g * a, this.b * a, this.opacity);
  }, darker:function(a) {
    a = null == a ? 0.7 : Math.pow(0.7, a);
    return new ua(this.r * a, this.g * a, this.b * a, this.opacity);
  }, rgb:function() {
    return this;
  }, displayable:function() {
    return 0 <= this.r && 255 >= this.r && 0 <= this.g && 255 >= this.g && 0 <= this.b && 255 >= this.b && 0 <= this.opacity && 1 >= this.opacity;
  }, hex:function() {
    return "#" + Sf(this.r) + Sf(this.g) + Sf(this.b);
  }, toString:function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (1 === a ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === a ? ")" : ", " + a + ")");
  }}));
  ac(ab, Vd, Jc(vb, {brighter:function(a) {
    a = null == a ? Bc : Math.pow(Bc, a);
    return new ab(this.h, this.s, this.l * a, this.opacity);
  }, darker:function(a) {
    a = null == a ? 0.7 : Math.pow(0.7, a);
    return new ab(this.h, this.s, this.l * a, this.opacity);
  }, rgb:function() {
    var a = this.h % 360 + 360 * (0 > this.h), c = isNaN(a) || isNaN(this.s) ? 0 : this.s, d = this.l;
    c = d + (0.5 > d ? d : 1 - d) * c;
    d = 2 * d - c;
    return new ua(Tf(240 <= a ? a - 240 : a + 120, d, c), Tf(a, d, c), Tf(120 > a ? a + 240 : a - 120, d, c), this.opacity);
  }, displayable:function() {
    return (0 <= this.s && 1 >= this.s || isNaN(this.s)) && 0 <= this.l && 1 >= this.l && 0 <= this.opacity && 1 >= this.opacity;
  }}));
  var Ai = Math.PI / 180, Ei = 180 / Math.PI, Ci = 4 / 29, cc = 6 / 29, Bi = 3 * cc * cc, gp = cc * cc * cc;
  ac(Ta, Wd, Jc(vb, {brighter:function(a) {
    return new Ta(this.l + 18 * (null == a ? 1 : a), this.a, this.b, this.opacity);
  }, darker:function(a) {
    return new Ta(this.l - 18 * (null == a ? 1 : a), this.a, this.b, this.opacity);
  }, rgb:function() {
    var a = (this.l + 16) / 116, c = isNaN(this.a) ? a : a + this.a / 500, d = isNaN(this.b) ? a : a - this.b / 200;
    c = 0.96422 * Xf(c);
    a = 1 * Xf(a);
    d = 0.82521 * Xf(d);
    return new ua(Yf(3.1338561 * c - 1.6168667 * a - 0.4906146 * d), Yf(-0.9787684 * c + 1.9161415 * a + 0.0334540 * d), Yf(0.0719453 * c - 0.2289914 * a + 1.4052427 * d), this.opacity);
  }}));
  ac(bb, Xd, Jc(vb, {brighter:function(a) {
    return new bb(this.h, this.c, this.l + 18 * (null == a ? 1 : a), this.opacity);
  }, darker:function(a) {
    return new bb(this.h, this.c, this.l - 18 * (null == a ? 1 : a), this.opacity);
  }, rgb:function() {
    return Uf(this).rgb();
  }}));
  var Fi = 1.78277 * -0.29227 - .1347134789;
  ac(Kb, Ua, Jc(vb, {brighter:function(a) {
    a = null == a ? Bc : Math.pow(Bc, a);
    return new Kb(this.h, this.s, this.l * a, this.opacity);
  }, darker:function(a) {
    a = null == a ? 0.7 : Math.pow(0.7, a);
    return new Kb(this.h, this.s, this.l * a, this.opacity);
  }, rgb:function() {
    var a = isNaN(this.h) ? 0 : (this.h + 120) * Ai, c = +this.l, d = isNaN(this.s) ? 0 : this.s * c * (1 - c), e = Math.cos(a);
    a = Math.sin(a);
    return new ua(255 * (c + d * (-0.14861 * e + 1.78277 * a)), 255 * (c + d * (-0.29227 * e + -0.90649 * a)), 255 * (c + 1.97294 * d * e), this.opacity);
  }}));
  var Lc = function d(c) {
    function e(c, d) {
      var e = g((c = bc(c)).r, (d = bc(d)).r), b = g(c.g, d.g), h = g(c.b, d.b), l = sa(c.opacity, d.opacity);
      return function(d) {
        c.r = e(d);
        c.g = b(d);
        c.b = h(d);
        c.opacity = l(d);
        return c + "";
      };
    }
    var g = ip(c);
    e.gamma = d;
    return e;
  }(1), Sl = Ki(Hi), ut = Ki(Ii), $f = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ag = new RegExp($f.source, "g"), Qi = 180 / Math.PI, Nh = {translateX:0, translateY:0, rotate:0, skewX:0, scaleX:1, scaleY:1}, Dd, Oh, Am, qf, Bm = Ri(function(c) {
    if ("none" === c) {
      return Nh;
    }
    Dd || (Dd = document.createElement("DIV"), Oh = document.documentElement, Am = document.defaultView);
    Dd.style.transform = c;
    c = Am.getComputedStyle(Oh.appendChild(Dd), null).getPropertyValue("transform");
    Oh.removeChild(Dd);
    c = c.slice(7, -1).split(",");
    return Pi(+c[0], +c[1], +c[2], +c[3], +c[4], +c[5]);
  }, "px, ", "px)", "deg)"), Cm = Ri(function(c) {
    if (null == c) {
      return Nh;
    }
    qf || (qf = document.createElementNS("http://www.w3.org/2000/svg", "g"));
    qf.setAttribute("transform", c);
    if (!(c = qf.transform.baseVal.consolidate())) {
      return Nh;
    }
    c = c.matrix;
    return Pi(c.a, c.b, c.c, c.d, c.e, c.f);
  }, ", ", ")", ")"), Mc = Math.SQRT2, vt = Ui(Zd), wt = Ui(sa), xt = Vi(Zd), yt = Vi(sa), zt = Wi(Zd), rf = Wi(sa), ec = 0, Pc = 0, Rc = 0, be, Qc, ce = 0, Lb = 0, $d = 0, Nc = "object" === typeof performance && performance.now ? performance : Date, Xi = "object" === typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(c) {
    setTimeout(c, 17);
  };
  Oc.prototype = ae.prototype = {constructor:Oc, restart:function(c, d, e) {
    if ("function" !== typeof c) {
      throw new TypeError("callback is not a function");
    }
    e = (null == e ? dc() : +e) + (null == d ? 0 : +d);
    this._next || Qc === this || (Qc ? Qc._next = this : be = this, Qc = this);
    this._call = c;
    this._time = e;
    bg();
  }, stop:function() {
    this._call && (this._call = null, this._time = Infinity, bg());
  }};
  var op = Hb("start", "end", "cancel", "interrupt"), pp = [], At = Jb.prototype.constructor, Dm = 0, Cc = Jb.prototype;
  cb.prototype = bj.prototype = {constructor:cb, select:function(c) {
    var d = this._name, e = this._id;
    "function" !== typeof c && (c = Od(c));
    for (var g = this._groups, b = g.length, k = Array(b), p = 0; p < b; ++p) {
      for (var t = g[p], y = t.length, l = k[p] = Array(y), r, v, z = 0; z < y; ++z) {
        (r = t[z]) && (v = c.call(r, r.__data__, z, t)) && ("__data__" in r && (v.__data__ = r.__data__), l[z] = v, de(l[z], d, e, z, l, Va(r, e)));
      }
    }
    return new cb(k, this._parents, d, e);
  }, selectAll:function(c) {
    var d = this._name, e = this._id;
    "function" !== typeof c && (c = Jf(c));
    for (var g = this._groups, b = g.length, k = [], p = [], t = 0; t < b; ++t) {
      for (var y = g[t], l = y.length, r, v = 0; v < l; ++v) {
        if (r = y[v]) {
          for (var z = c.call(r, r.__data__, v, y), D, F = Va(r, e), I = 0, P = z.length; I < P; ++I) {
            (D = z[I]) && de(D, d, e, I, z, F);
          }
          k.push(z);
          p.push(r);
        }
      }
    }
    return new cb(k, p, d, e);
  }, filter:function(c) {
    "function" !== typeof c && (c = Kf(c));
    for (var d = this._groups, e = d.length, g = Array(e), b = 0; b < e; ++b) {
      for (var k = d[b], p = k.length, t = g[b] = [], y, l = 0; l < p; ++l) {
        (y = k[l]) && c.call(y, y.__data__, l, k) && t.push(y);
      }
    }
    return new cb(g, this._parents, this._name, this._id);
  }, merge:function(c) {
    if (c._id !== this._id) {
      throw Error();
    }
    var d = this._groups;
    c = c._groups;
    for (var e = d.length, g = Math.min(e, c.length), b = Array(e), k = 0; k < g; ++k) {
      for (var p = d[k], t = c[k], y = p.length, l = b[k] = Array(y), r, v = 0; v < y; ++v) {
        if (r = p[v] || t[v]) {
          l[v] = r;
        }
      }
    }
    for (; k < e; ++k) {
      b[k] = d[k];
    }
    return new cb(b, this._parents, this._name, this._id);
  }, selection:function() {
    return new At(this._groups, this._parents);
  }, transition:function() {
    for (var c = this._name, d = this._id, e = ++Dm, g = this._groups, b = g.length, k = 0; k < b; ++k) {
      for (var p = g[k], t = p.length, y, l = 0; l < t; ++l) {
        if (y = p[l]) {
          var r = Va(y, d);
          de(y, c, e, l, p, {time:r.time + r.delay + r.duration, delay:0, duration:r.duration, ease:r.ease});
        }
      }
    }
    return new cb(g, this._parents, c, e);
  }, call:Cc.call, nodes:Cc.nodes, node:Cc.node, size:Cc.size, empty:Cc.empty, each:Cc.each, on:function(c, d) {
    var e = this._id;
    return 2 > arguments.length ? Va(this.node(), e).on.on(c) : this.each(Ip(e, c, d));
  }, attr:function(c, d) {
    var e = Hc(c), g = "transform" === e ? Cm : $i;
    return this.attrTween(c, "function" === typeof d ? (e.local ? xp : wp)(e, g, eg(this, "attr." + c, d)) : null == d ? (e.local ? tp : sp)(e) : (e.local ? vp : up)(e, g, d));
  }, attrTween:function(c, d) {
    var e = "attr." + c;
    if (2 > arguments.length) {
      return (e = this.tween(e)) && e._value;
    }
    if (null == d) {
      return this.tween(e, null);
    }
    if ("function" !== typeof d) {
      throw Error();
    }
    var g = Hc(c);
    return this.tween(e, (g.local ? Ap : Bp)(g, d));
  }, style:function(c, d, e) {
    var g = "transform" === (c += "") ? Bm : $i;
    return null == d ? this.styleTween(c, Kp(c, g)).on("end.style." + c, aj(c)) : "function" === typeof d ? this.styleTween(c, Mp(c, g, eg(this, "style." + c, d))).each(Np(this._id, c)) : this.styleTween(c, Lp(c, g, d), e).on("end.style." + c, null);
  }, styleTween:function(c, d, e) {
    var g = "style." + (c += "");
    if (2 > arguments.length) {
      return (g = this.tween(g)) && g._value;
    }
    if (null == d) {
      return this.tween(g, null);
    }
    if ("function" !== typeof d) {
      throw Error();
    }
    return this.tween(g, Pp(c, d, null == e ? "" : e));
  }, text:function(c) {
    return this.tween("text", "function" === typeof c ? Rp(eg(this, "text", c)) : Qp(null == c ? "" : c + ""));
  }, remove:function() {
    return this.on("end.remove", Jp(this._id));
  }, tween:function(c, d) {
    var e = this._id;
    c += "";
    if (2 > arguments.length) {
      e = Va(this.node(), e).tween;
      for (var g = 0, b = e.length, k; g < b; ++g) {
        if ((k = e[g]).name === c) {
          return k.value;
        }
      }
      return null;
    }
    return this.each((null == d ? qp : rp)(e, c, d));
  }, delay:function(c) {
    var d = this._id;
    return arguments.length ? this.each(("function" === typeof c ? Cp : Dp)(d, c)) : Va(this.node(), d).delay;
  }, duration:function(c) {
    var d = this._id;
    return arguments.length ? this.each(("function" === typeof c ? Ep : Fp)(d, c)) : Va(this.node(), d).duration;
  }, ease:function(c) {
    var d = this._id;
    return arguments.length ? this.each(Gp(d, c)) : Va(this.node(), d).ease;
  }, end:function() {
    var c, d, e = this, g = e._id, b = e.size();
    return new Promise(function(h, p) {
      var k = {value:p}, y = {value:function() {
        0 === --b && h();
      }};
      e.each(function() {
        var e = ib(this, g), b = e.on;
        b !== c && (d = (c = b).copy(), d._.cancel.push(k), d._.interrupt.push(k), d._.end.push(y));
        e.on = d;
      });
    });
  }};
  var Bt = function e(d) {
    function g(e) {
      return Math.pow(e, d);
    }
    d = +d;
    g.exponent = e;
    return g;
  }(3), Ct = function g(e) {
    function b(g) {
      return 1 - Math.pow(1 - g, e);
    }
    e = +e;
    b.exponent = g;
    return b;
  }(3), Em = function h(g) {
    function b(b) {
      return (1 >= (b *= 2) ? Math.pow(b, g) : 2 - Math.pow(2 - b, g)) / 2;
    }
    g = +g;
    b.exponent = h;
    return b;
  }(3), ej = Math.PI, Fm = ej / 2, gg = 4 / 11, Tp = 6 / 11, Sp = 8 / 11, Vp = 9 / 11, Up = 10 / 11, Wp = 21 / 22, ee = 1 / gg / gg, Dt = function k(b) {
    function h(h) {
      return h * h * ((b + 1) * h - b);
    }
    b = +b;
    h.overshoot = k;
    return h;
  }(1.70158), Et = function p(b) {
    function k(k) {
      return --k * k * ((b + 1) * k + b) + 1;
    }
    b = +b;
    k.overshoot = p;
    return k;
  }(1.70158), Gm = function t(b) {
    function p(l) {
      return (1 > (l *= 2) ? l * l * ((b + 1) * l - b) : (l -= 2) * l * ((b + 1) * l + b) + 2) / 2;
    }
    b = +b;
    p.overshoot = t;
    return p;
  }(1.70158), Dc = 2 * Math.PI, Ft = function l(b, y) {
    function r(l) {
      return b * Math.pow(2, 10 * --l) * Math.sin((t - l) / y);
    }
    var t = Math.asin(1 / (b = Math.max(1, b))) * (y /= Dc);
    r.amplitude = function(b) {
      return l(b, y * Dc);
    };
    r.period = function(r) {
      return l(b, r);
    };
    return r;
  }(1, 0.3), Hm = function r(b, l) {
    function v(r) {
      return 1 - b * Math.pow(2, -10 * (r = +r)) * Math.sin((r + y) / l);
    }
    var y = Math.asin(1 / (b = Math.max(1, b))) * (l /= Dc);
    v.amplitude = function(b) {
      return r(b, l * Dc);
    };
    v.period = function(l) {
      return r(b, l);
    };
    return v;
  }(1, 0.3), Gt = function v(b, r) {
    function l(l) {
      return (0 > (l = 2 * l - 1) ? b * Math.pow(2, 10 * l) * Math.sin((D - l) / r) : 2 - b * Math.pow(2, -10 * l) * Math.sin((D + l) / r)) / 2;
    }
    var D = Math.asin(1 / (b = Math.max(1, b))) * (r /= Dc);
    l.amplitude = function(b) {
      return v(b, r * Dc);
    };
    l.period = function(l) {
      return v(b, l);
    };
    return l;
  }(1, 0.3), Ph = {time:null, delay:0, duration:250, ease:fg};
  Jb.prototype.interrupt = function(b) {
    return this.each(function() {
      Mb(this, b);
    });
  };
  Jb.prototype.transition = function(b) {
    var l;
    if (b instanceof cb) {
      var v = b._id;
      b = b._name;
    } else {
      v = ++Dm, (l = Ph).time = dc(), b = null == b ? null : b + "";
    }
    for (var z = this._groups, D = z.length, F = 0; F < D; ++F) {
      for (var I = z[F], P = I.length, C, x = 0; x < P; ++x) {
        if (C = I[x]) {
          var J = C, K = b, N = v, S = x, X = I, f;
          if (!(f = l)) {
            a: {
              f = void 0;
              for (var m = v; !(f = C.__transition) || !(f = f[m]);) {
                if (!(C = C.parentNode)) {
                  f = (Ph.time = dc(), Ph);
                  break a;
                }
              }
            }
          }
          de(J, K, N, S, X, f);
        }
      }
    }
    return new cb(z, this._parents, b, v);
  };
  var Ht = [null], ij = {name:"drag"}, kg = {name:"space"}, fc = {name:"handle"}, gc = {name:"center"}, ie = {name:"x", handles:["e", "w"].map(Tc), input:function(b, r) {
    return b && [[b[0], r[0][1]], [b[1], r[1][1]]];
  }, output:function(b) {
    return b && [b[0][0], b[1][0]];
  }}, he = {name:"y", handles:["n", "s"].map(Tc), input:function(b, r) {
    return b && [[r[0][0], b[0]], [r[1][0], b[1]]];
  }, output:function(b) {
    return b && [b[0][1], b[1][1]];
  }}, It = {name:"xy", handles:"n e s w nw ne se sw".split(" ").map(Tc), input:function(b) {
    return b;
  }, output:function(b) {
    return b;
  }}, jb = {overlay:"crosshair", selection:"move", n:"ns-resize", e:"ew-resize", s:"ns-resize", w:"ew-resize", nw:"nwse-resize", ne:"nesw-resize", se:"nwse-resize", sw:"nesw-resize"}, jj = {e:"w", w:"e", nw:"ne", ne:"nw", se:"sw", sw:"se"}, kj = {n:"s", s:"n", nw:"sw", ne:"se", se:"ne", sw:"nw"}, $p = {overlay:1, selection:1, n:null, e:1, s:null, w:-1, nw:-1, ne:1, se:1, sw:-1}, aq = {overlay:1, selection:1, n:-1, e:null, s:1, w:null, nw:-1, ne:-1, se:1, sw:1}, Im = Math.cos, Jm = Math.sin, Km = 
  Math.PI, sf = Km / 2, Lm = 2 * Km, Mm = Math.max, Jt = Array.prototype.slice, Qh = Math.PI, Rh = 2 * Qh, Kt = Rh - 1e-6;
  mg.prototype = xb.prototype = {constructor:mg, moveTo:function(b, r) {
    this._ += "M" + (this._x0 = this._x1 = +b) + "," + (this._y0 = this._y1 = +r);
  }, closePath:function() {
    null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  }, lineTo:function(b, r) {
    this._ += "L" + (this._x1 = +b) + "," + (this._y1 = +r);
  }, quadraticCurveTo:function(b, r, v, z) {
    this._ += "Q" + +b + "," + +r + "," + (this._x1 = +v) + "," + (this._y1 = +z);
  }, bezierCurveTo:function(b, r, v, z, D, F) {
    this._ += "C" + +b + "," + +r + "," + +v + "," + +z + "," + (this._x1 = +D) + "," + (this._y1 = +F);
  }, arcTo:function(b, r, v, z, D) {
    b = +b;
    r = +r;
    v = +v;
    z = +z;
    D = +D;
    var l = this._x1, I = this._y1, P = v - b, C = z - r, x = l - b, J = I - r, K = x * x + J * J;
    if (0 > D) {
      throw Error("negative radius: " + D);
    }
    if (null === this._x1) {
      this._ += "M" + (this._x1 = b) + "," + (this._y1 = r);
    } else {
      if (1e-6 < K) {
        if (1e-6 < Math.abs(J * P - C * x) && D) {
          v -= l;
          z -= I;
          var N = P * P + C * C;
          I = Math.sqrt(N);
          l = Math.sqrt(K);
          K = D * Math.tan((Qh - Math.acos((N + K - (v * v + z * z)) / (2 * I * l))) / 2);
          l = K / l;
          K /= I;
          1e-6 < Math.abs(l - 1) && (this._ += "L" + (b + l * x) + "," + (r + l * J));
          this._ += "A" + D + "," + D + ",0,0," + +(J * v > x * z) + "," + (this._x1 = b + K * P) + "," + (this._y1 = r + K * C);
        } else {
          this._ += "L" + (this._x1 = b) + "," + (this._y1 = r);
        }
      }
    }
  }, arc:function(b, r, v, z, D, F) {
    b = +b;
    r = +r;
    v = +v;
    var l = v * Math.cos(z), P = v * Math.sin(z), C = b + l, x = r + P, J = 1 ^ F;
    z = F ? z - D : D - z;
    if (0 > v) {
      throw Error("negative radius: " + v);
    }
    if (null === this._x1) {
      this._ += "M" + C + "," + x;
    } else {
      if (1e-6 < Math.abs(this._x1 - C) || 1e-6 < Math.abs(this._y1 - x)) {
        this._ += "L" + C + "," + x;
      }
    }
    v && (0 > z && (z = z % Rh + Rh), z > Kt ? this._ += "A" + v + "," + v + ",0,1," + J + "," + (b - l) + "," + (r - P) + "A" + v + "," + v + ",0,1," + J + "," + (this._x1 = C) + "," + (this._y1 = x) : 1e-6 < z && (this._ += "A" + v + "," + v + ",0," + +(z >= Qh) + "," + J + "," + (this._x1 = b + v * Math.cos(D)) + "," + (this._y1 = r + v * Math.sin(D))));
  }, rect:function(b, r, v, z) {
    this._ += "M" + (this._x0 = this._x1 = +b) + "," + (this._y0 = this._y1 = +r) + "h" + +v + "v" + +z + "h" + -v + "Z";
  }, toString:function() {
    return this._;
  }};
  je.prototype = kb.prototype = {constructor:je, has:function(b) {
    return "$" + b in this;
  }, get:function(b) {
    return this["$" + b];
  }, set:function(b, r) {
    this["$" + b] = r;
    return this;
  }, remove:function(b) {
    b = "$" + b;
    return b in this && delete this[b];
  }, clear:function() {
    for (var b in this) {
      "$" === b[0] && delete this[b];
    }
  }, keys:function() {
    var b = [], r;
    for (r in this) {
      "$" === r[0] && b.push(r.slice(1));
    }
    return b;
  }, values:function() {
    var b = [], r;
    for (r in this) {
      "$" === r[0] && b.push(this[r]);
    }
    return b;
  }, entries:function() {
    var b = [], r;
    for (r in this) {
      "$" === r[0] && b.push({key:r.slice(1), value:this[r]});
    }
    return b;
  }, size:function() {
    var b = 0, r;
    for (r in this) {
      "$" === r[0] && ++b;
    }
    return b;
  }, empty:function() {
    for (var b in this) {
      if ("$" === b[0]) {
        return !1;
      }
    }
    return !0;
  }, each:function(b) {
    for (var l in this) {
      "$" === l[0] && b(this[l], l.slice(1), this);
    }
  }};
  var Xb = kb.prototype;
  ke.prototype = nj.prototype = {constructor:ke, has:Xb.has, add:function(b) {
    b += "";
    this["$" + b] = b;
    return this;
  }, remove:Xb.remove, clear:Xb.clear, values:Xb.keys, size:Xb.size, empty:Xb.empty, each:Xb.each};
  var pj = Array.prototype.slice, lb = [[], [[[1.0, 1.5], [0.5, 1.0]]], [[[1.5, 1.0], [1.0, 1.5]]], [[[1.5, 1.0], [0.5, 1.0]]], [[[1.0, 0.5], [1.5, 1.0]]], [[[1.0, 1.5], [0.5, 1.0]], [[1.0, 0.5], [1.5, 1.0]]], [[[1.0, 0.5], [1.0, 1.5]]], [[[1.0, 0.5], [0.5, 1.0]]], [[[0.5, 1.0], [1.0, 0.5]]], [[[1.0, 1.5], [1.0, 0.5]]], [[[0.5, 1.0], [1.0, 0.5]], [[1.5, 1.0], [1.0, 1.5]]], [[[1.5, 1.0], [1.0, 0.5]]], [[[0.5, 1.0], [1.5, 1.0]]], [[[1.0, 1.5], [1.5, 1.0]]], [[[0.5, 1.0], [1.0, 1.5]]], []], sj = {}, 
  pg = {}, Ed = le(","), Nm = Ed.parse, Lt = Ed.parseRows, Mt = Ed.format, Nt = Ed.formatBody, Ot = Ed.formatRows, Fd = le("\t"), Om = Fd.parse, Pt = Fd.parseRows, Qt = Fd.format, Rt = Fd.formatBody, St = Fd.formatRows, Tt = tj(Nm), Ut = tj(Om), Vt = qg("application/xml"), Wt = qg("text/html"), Xt = qg("image/svg+xml"), Ga = ne.prototype = rg.prototype;
  Ga.copy = function() {
    var b = new rg(this._x, this._y, this._x0, this._y0, this._x1, this._y1), r = this._root, v, z;
    if (!r) {
      return b;
    }
    if (!r.length) {
      return b._root = vj(r), b;
    }
    for (v = [{source:r, target:b._root = Array(4)}]; r = v.pop();) {
      for (var D = 0; 4 > D; ++D) {
        if (z = r.source[D]) {
          z.length ? v.push({source:z, target:r.target[D] = Array(4)}) : r.target[D] = vj(z);
        }
      }
    }
    return b;
  };
  Ga.add = function(b) {
    var l = +this._x.call(null, b), v = +this._y.call(null, b);
    return uj(this.cover(l, v), l, v, b);
  };
  Ga.addAll = function(b) {
    var l, v, z = b.length, D, F, I = Array(z), P = Array(z), C = Infinity, x = Infinity, J = -Infinity, K = -Infinity;
    for (v = 0; v < z; ++v) {
      isNaN(D = +this._x.call(null, l = b[v])) || isNaN(F = +this._y.call(null, l)) || (I[v] = D, P[v] = F, D < C && (C = D), D > J && (J = D), F < x && (x = F), F > K && (K = F));
    }
    if (C > J || x > K) {
      return this;
    }
    this.cover(C, x).cover(J, K);
    for (v = 0; v < z; ++v) {
      uj(this, I[v], P[v], b[v]);
    }
    return this;
  };
  Ga.cover = function(b, r) {
    if (isNaN(b = +b) || isNaN(r = +r)) {
      return this;
    }
    var l = this._x0, z = this._y0, D = this._x1, F = this._y1;
    if (isNaN(l)) {
      D = (l = Math.floor(b)) + 1, F = (z = Math.floor(r)) + 1;
    } else {
      for (var I = D - l, P = this._root, C, x; l > b || b >= D || z > r || r >= F;) {
        switch(x = (r < z) << 1 | b < l, C = Array(4), C[x] = P, P = C, I *= 2, x) {
          case 0:
            D = l + I;
            F = z + I;
            break;
          case 1:
            l = D - I;
            F = z + I;
            break;
          case 2:
            D = l + I;
            z = F - I;
            break;
          case 3:
            l = D - I, z = F - I;
        }
      }
      this._root && this._root.length && (this._root = P);
    }
    this._x0 = l;
    this._y0 = z;
    this._x1 = D;
    this._y1 = F;
    return this;
  };
  Ga.data = function() {
    var b = [];
    this.visit(function(l) {
      if (!l.length) {
        do {
          b.push(l.data);
        } while (l = l.next);
      }
    });
    return b;
  };
  Ga.extent = function(b) {
    return arguments.length ? this.cover(+b[0][0], +b[0][1]).cover(+b[1][0], +b[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
  };
  Ga.find = function(b, r, v) {
    var l = this._x0, D = this._y0, F, I, P, C, x = this._x1, J = this._y1, K = [], N = this._root, S;
    N && K.push(new Aa(N, l, D, x, J));
    null == v ? v = Infinity : (l = b - v, D = r - v, x = b + v, J = r + v, v *= v);
    for (; S = K.pop();) {
      if (!(!(N = S.node) || (F = S.x0) > x || (I = S.y0) > J || (P = S.x1) < l || (C = S.y1) < D)) {
        if (N.length) {
          S = (F + P) / 2;
          var X = (I + C) / 2;
          K.push(new Aa(N[3], S, X, P, C), new Aa(N[2], F, X, S, C), new Aa(N[1], S, I, P, X), new Aa(N[0], F, I, S, X));
          if (N = (r >= X) << 1 | b >= S) {
            S = K[K.length - 1], K[K.length - 1] = K[K.length - 1 - N], K[K.length - 1 - N] = S;
          }
        } else {
          if (S = b - +this._x.call(null, N.data), X = r - +this._y.call(null, N.data), S = S * S + X * X, S < v) {
            var f = Math.sqrt(v = S);
            l = b - f;
            D = r - f;
            x = b + f;
            J = r + f;
            f = N.data;
          }
        }
      }
    }
    return f;
  };
  Ga.remove = function(b) {
    if (isNaN(C = +this._x.call(null, b)) || isNaN(x = +this._y.call(null, b))) {
      return this;
    }
    var l, v = this._root, z, D = this._x0, F = this._y0, I = this._x1, P = this._y1, C, x, J, K, N, S;
    if (!v) {
      return this;
    }
    if (v.length) {
      for (;;) {
        (N = C >= (J = (D + I) / 2)) ? D = J : I = J;
        (S = x >= (K = (F + P) / 2)) ? F = K : P = K;
        if (!(l = v, v = v[N |= S << 1])) {
          return this;
        }
        if (!v.length) {
          break;
        }
        if (l[N + 1 & 3] || l[N + 2 & 3] || l[N + 3 & 3]) {
          var X = l;
          var f = N;
        }
      }
    }
    for (; v.data !== b;) {
      if (!(z = v, v = v.next)) {
        return this;
      }
    }
    (b = v.next) && delete v.next;
    if (z) {
      return b ? z.next = b : delete z.next, this;
    }
    if (!l) {
      return this._root = b, this;
    }
    b ? l[N] = b : delete l[N];
    (v = l[0] || l[1] || l[2] || l[3]) && v === (l[3] || l[2] || l[1] || l[0]) && !v.length && (X ? X[f] = v : this._root = v);
    return this;
  };
  Ga.removeAll = function(b) {
    for (var l = 0, v = b.length; l < v; ++l) {
      this.remove(b[l]);
    }
    return this;
  };
  Ga.root = function() {
    return this._root;
  };
  Ga.size = function() {
    var b = 0;
    this.visit(function(l) {
      if (!l.length) {
        do {
          ++b;
        } while (l = l.next);
      }
    });
    return b;
  };
  Ga.visit = function(b) {
    var l = [], v, z = this._root, D, F, I, P;
    for (z && l.push(new Aa(z, this._x0, this._y0, this._x1, this._y1)); v = l.pop();) {
      if (!b(z = v.node, F = v.x0, I = v.y0, P = v.x1, v = v.y1) && z.length) {
        var C = (F + P) / 2, x = (I + v) / 2;
        (D = z[3]) && l.push(new Aa(D, C, x, P, v));
        (D = z[2]) && l.push(new Aa(D, F, x, C, v));
        (D = z[1]) && l.push(new Aa(D, C, I, P, x));
        (D = z[0]) && l.push(new Aa(D, F, I, C, x));
      }
    }
    return this;
  };
  Ga.visitAfter = function(b) {
    var l = [], v = [], z;
    for (this._root && l.push(new Aa(this._root, this._x0, this._y0, this._x1, this._y1)); z = l.pop();) {
      var D = z.node;
      if (D.length) {
        var F, I = z.x0, P = z.y0, C = z.x1, x = z.y1, J = (I + C) / 2, K = (P + x) / 2;
        (F = D[0]) && l.push(new Aa(F, I, P, J, K));
        (F = D[1]) && l.push(new Aa(F, J, P, C, K));
        (F = D[2]) && l.push(new Aa(F, I, K, J, x));
        (F = D[3]) && l.push(new Aa(F, J, K, C, x));
      }
      v.push(z);
    }
    for (; z = v.pop();) {
      b(z.node, z.x0, z.y0, z.x1, z.y1);
    }
    return this;
  };
  Ga.x = function(b) {
    return arguments.length ? (this._x = b, this) : this._x;
  };
  Ga.y = function(b) {
    return arguments.length ? (this._y = b, this) : this._y;
  };
  var Yt = Math.PI * (3 - Math.sqrt(5)), Cq = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  Uc.prototype = sg.prototype;
  sg.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };
  var Bj, Cj = {"%":function(b, r) {
    return (100 * b).toFixed(r);
  }, b:function(b) {
    return Math.round(b).toString(2);
  }, c:function(b) {
    return b + "";
  }, d:function(b) {
    return Math.round(b).toString(10);
  }, e:function(b, r) {
    return b.toExponential(r);
  }, f:function(b, r) {
    return b.toFixed(r);
  }, g:function(b, r) {
    return b.toPrecision(r);
  }, o:function(b) {
    return Math.round(b).toString(8);
  }, p:function(b, r) {
    return xj(100 * b, r);
  }, r:xj, s:function(b, r) {
    var l = oe(b, r);
    if (!l) {
      return b + "";
    }
    var z = l[0];
    l = l[1];
    l = l - (Bj = 3 * Math.max(-8, Math.min(8, Math.floor(l / 3)))) + 1;
    var D = z.length;
    return l === D ? z : l > D ? z + Array(l - D + 1).join("0") : 0 < l ? z.slice(0, l) + "." + z.slice(l) : "0." + Array(1 - l).join("0") + oe(b, Math.max(0, r + l - 1))[0];
  }, X:function(b) {
    return Math.round(b).toString(16).toUpperCase();
  }, x:function(b) {
    return Math.round(b).toString(16);
  }}, Aj = "y z a f p n \u00b5 m  k M G T P E Z Y".split(" "), pe;
  Dj({decimal:".", thousands:",", grouping:[3], currency:["$", ""]});
  Wa.prototype = {constructor:Wa, reset:function() {
    this.s = this.t = 0;
  }, add:function(b) {
    Hj(tf, b, this.t);
    Hj(this, tf.s, this.s);
    this.s ? this.t += tf.t : this.s = tf.t;
  }, valueOf:function() {
    return this.s;
  }};
  var tf = new Wa, ca = Math.PI, ja = ca / 2, re = ca / 4, Ja = 2 * ca, fa = 180 / ca, U = ca / 180, ea = Math.abs, qc = Math.atan, Ca = Math.atan2, W = Math.cos, Ke = Math.ceil, Pm = Math.exp, Pe = Math.log, Zg = Math.pow, R = Math.sin, dd = Math.sign || function(b) {
    return 0 < b ? 1 : 0 > b ? -1 : 0;
  }, oa = Math.sqrt, pc = Math.tan, Mj = {Feature:function(b, r) {
    qe(b.geometry, r);
  }, FeatureCollection:function(b, r) {
    b = b.features;
    for (var l = -1, z = b.length; ++l < z;) {
      qe(b[l].geometry, r);
    }
  }}, Kj = {Sphere:function(b, r) {
    r.sphere();
  }, Point:function(b, r) {
    b = b.coordinates;
    r.point(b[0], b[1], b[2]);
  }, MultiPoint:function(b, r) {
    for (var l = b.coordinates, z = -1, D = l.length; ++z < D;) {
      b = l[z], r.point(b[0], b[1], b[2]);
    }
  }, LineString:function(b, r) {
    tg(b.coordinates, r, 0);
  }, MultiLineString:function(b, r) {
    b = b.coordinates;
    for (var l = -1, z = b.length; ++l < z;) {
      tg(b[l], r, 0);
    }
  }, Polygon:function(b, r) {
    Lj(b.coordinates, r);
  }, MultiPolygon:function(b, r) {
    b = b.coordinates;
    for (var l = -1, z = b.length; ++l < z;) {
      Lj(b[l], r);
    }
  }, GeometryCollection:function(b, r) {
    b = b.geometries;
    for (var l = -1, z = b.length; ++l < z;) {
      qe(b[l], r);
    }
  }}, se = new Wa, uf = new Wa, Oj, Pj, ug, vg, wg, db = {point:la, lineStart:la, lineEnd:la, polygonStart:function() {
    se.reset();
    db.lineStart = Dq;
    db.lineEnd = Fq;
  }, polygonEnd:function() {
    var b = +se;
    uf.add(0 > b ? Ja + b : b);
    this.lineStart = this.lineEnd = this.point = la;
  }, sphere:function() {
    uf.add(Ja);
  }}, ma, La, na, Qa, Pb, Uj, Vj, jc, Vc = new Wa, Ab, mb, nb = {point:yg, lineStart:Rj, lineEnd:Sj, polygonStart:function() {
    nb.point = Tj;
    nb.lineStart = Gq;
    nb.lineEnd = Hq;
    Vc.reset();
    db.polygonStart();
  }, polygonEnd:function() {
    db.polygonEnd();
    nb.point = yg;
    nb.lineStart = Rj;
    nb.lineEnd = Sj;
    0 > se ? (ma = -(na = 180), La = -(Qa = 90)) : 1e-6 < Vc ? Qa = 90 : -1E-6 > Vc && (La = -90);
    mb[0] = ma;
    mb[1] = na;
  }}, Xc, Ae, xe, ye, ze, Be, Ce, De, Ag, Bg, Cg, ak, bk, Da, Ea, Fa, Ya = {sphere:la, point:zg, lineStart:Xj, lineEnd:Yj, polygonStart:function() {
    Ya.lineStart = Lq;
    Ya.lineEnd = Nq;
  }, polygonEnd:function() {
    Ya.lineStart = Xj;
    Ya.lineEnd = Yj;
  }};
  Eg.invert = Eg;
  var Gg = new Wa, Xg = mk(function() {
    return !0;
  }, function(b) {
    var l = NaN, v = NaN, z = NaN, D;
    return {lineStart:function() {
      b.lineStart();
      D = 1;
    }, point:function(r, I) {
      var F = 0 < r ? ca : -ca, C = ea(r - l);
      if (1e-6 > ea(C - ca)) {
        b.point(l, v = 0 < (v + I) / 2 ? ja : -ja), b.point(z, v), b.lineEnd(), b.lineStart(), b.point(F, v), b.point(r, v), D = 0;
      } else {
        if (z !== F && C >= ca) {
          1e-6 > ea(l - z) && (l -= 1e-6 * z);
          1e-6 > ea(r - F) && (r -= 1e-6 * F);
          C = l;
          var x = v, J = r, K, N, S = R(C - J);
          v = 1e-6 < ea(S) ? qc((R(x) * (N = W(I)) * R(J) - R(I) * (K = W(x)) * R(C)) / (K * N * S)) : (x + I) / 2;
          b.point(z, v);
          b.lineEnd();
          b.lineStart();
          b.point(F, v);
          D = 0;
        }
      }
      b.point(l = r, v = I);
      z = F;
    }, lineEnd:function() {
      b.lineEnd();
      l = v = NaN;
    }, clean:function() {
      return 2 - D;
    }};
  }, function(b, r, v, z) {
    null == b ? (v *= ja, z.point(-ca, v), z.point(0, v), z.point(ca, v), z.point(ca, 0), z.point(ca, -v), z.point(0, -v), z.point(-ca, -v), z.point(-ca, 0), z.point(-ca, v)) : 1e-6 < ea(b[0] - r[0]) ? (b = b[0] < r[0] ? ca : -ca, v = v * b / 2, z.point(-b, v), z.point(0, v), z.point(b, v)) : z.point(r[0], r[1]);
  }, [-ca, -ja]), Ig = new Wa, Hg, He, Ie, lc = {sphere:la, point:la, lineStart:function() {
    lc.point = Sq;
    lc.lineEnd = Rq;
  }, lineEnd:la, polygonStart:la, polygonEnd:la}, Jg = [null, null], Uq = {type:"LineString", coordinates:Jg}, Qm = {Feature:function(b, r) {
    return Je(b.geometry, r);
  }, FeatureCollection:function(b, r) {
    b = b.features;
    for (var l = -1, z = b.length; ++l < z;) {
      if (Je(b[l].geometry, r)) {
        return !0;
      }
    }
    return !1;
  }}, pk = {Sphere:function() {
    return !0;
  }, Point:function(b, r) {
    return 0 === mc(b.coordinates, r);
  }, MultiPoint:function(b, r) {
    b = b.coordinates;
    for (var l = -1, z = b.length; ++l < z;) {
      if (0 === mc(b[l], r)) {
        return !0;
      }
    }
    return !1;
  }, LineString:function(b, r) {
    return qk(b.coordinates, r);
  }, MultiLineString:function(b, r) {
    b = b.coordinates;
    for (var l = -1, z = b.length; ++l < z;) {
      if (qk(b[l], r)) {
        return !0;
      }
    }
    return !1;
  }, Polygon:function(b, r) {
    return rk(b.coordinates, r);
  }, MultiPolygon:function(b, r) {
    b = b.coordinates;
    for (var l = -1, z = b.length; ++l < z;) {
      if (rk(b[l], r)) {
        return !0;
      }
    }
    return !1;
  }, GeometryCollection:function(b, r) {
    b = b.geometries;
    for (var l = -1, z = b.length; ++l < z;) {
      if (Je(b[l], r)) {
        return !0;
      }
    }
    return !1;
  }}, Sh = new Wa, Mg = new Wa, xk, yk, Kg, Lg, ob = {point:la, lineStart:la, lineEnd:la, polygonStart:function() {
    ob.lineStart = Wq;
    ob.lineEnd = Yq;
  }, polygonEnd:function() {
    ob.lineStart = ob.lineEnd = ob.point = la;
    Sh.add(ea(Mg));
    Mg.reset();
  }, result:function() {
    var b = Sh / 2;
    Sh.reset();
    return b;
  }}, Ec = Infinity, vf = Ec, Gd = -Ec, wf = Gd, Ne = {point:function(b, r) {
    b < Ec && (Ec = b);
    b > Gd && (Gd = b);
    r < vf && (vf = r);
    r > wf && (wf = r);
  }, lineStart:la, lineEnd:la, polygonStart:la, polygonEnd:la, result:function() {
    var b = [[Ec, vf], [Gd, wf]];
    Gd = wf = -(vf = Ec = Infinity);
    return b;
  }}, Ng = 0, Og = 0, Yc = 0, Le = 0, Me = 0, nc = 0, Pg = 0, Qg = 0, Zc = 0, Ck, Dk, eb, fb, Ra = {point:Rb, lineStart:zk, lineEnd:Ak, polygonStart:function() {
    Ra.lineStart = ar;
    Ra.lineEnd = cr;
  }, polygonEnd:function() {
    Ra.point = Rb;
    Ra.lineStart = zk;
    Ra.lineEnd = Ak;
  }, result:function() {
    var b = Zc ? [Pg / Zc, Qg / Zc] : nc ? [Le / nc, Me / nc] : Yc ? [Ng / Yc, Og / Yc] : [NaN, NaN];
    Ng = Og = Yc = Le = Me = nc = Pg = Qg = Zc = 0;
    return b;
  }};
  Ek.prototype = {_radius:4.5, pointRadius:function(b) {
    return this._radius = b, this;
  }, polygonStart:function() {
    this._line = 0;
  }, polygonEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._point = 0;
  }, lineEnd:function() {
    0 === this._line && this._context.closePath();
    this._point = NaN;
  }, point:function(b, r) {
    switch(this._point) {
      case 0:
        this._context.moveTo(b, r);
        this._point = 1;
        break;
      case 1:
        this._context.lineTo(b, r);
        break;
      default:
        this._context.moveTo(b + this._radius, r), this._context.arc(b, r, this._radius, 0, Ja);
    }
  }, result:la};
  var Rg = new Wa, Th, Gk, Hk, ad, bd, $c = {point:la, lineStart:function() {
    $c.point = dr;
  }, lineEnd:function() {
    Th && Fk(Gk, Hk);
    $c.point = la;
  }, polygonStart:function() {
    Th = !0;
  }, polygonEnd:function() {
    Th = null;
  }, result:function() {
    var b = +Rg;
    Rg.reset();
    return b;
  }};
  Ik.prototype = {_radius:4.5, _circle:Jk(4.5), pointRadius:function(b) {
    (b = +b) !== this._radius && (this._radius = b, this._circle = null);
    return this;
  }, polygonStart:function() {
    this._line = 0;
  }, polygonEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._point = 0;
  }, lineEnd:function() {
    0 === this._line && this._string.push("Z");
    this._point = NaN;
  }, point:function(b, r) {
    switch(this._point) {
      case 0:
        this._string.push("M", b, ",", r);
        this._point = 1;
        break;
      case 1:
        this._string.push("L", b, ",", r);
        break;
      default:
        null == this._circle && (this._circle = Jk(this._radius)), this._string.push("M", b, ",", r, this._circle);
    }
  }, result:function() {
    if (this._string.length) {
      var b = this._string.join("");
      this._string = [];
      return b;
    }
    return null;
  }};
  Sg.prototype = {constructor:Sg, point:function(b, r) {
    this.stream.point(b, r);
  }, sphere:function() {
    this.stream.sphere();
  }, lineStart:function() {
    this.stream.lineStart();
  }, lineEnd:function() {
    this.stream.lineEnd();
  }, polygonStart:function() {
    this.stream.polygonStart();
  }, polygonEnd:function() {
    this.stream.polygonEnd();
  }};
  var er = W(30 * U), hr = cd({point:function(b, r) {
    this.stream.point(b * U, r * U);
  }}), Uh = Pk(function(b) {
    return oa(2 / (1 + b));
  });
  Uh.invert = ed(function(b) {
    return 2 * Ba(b / 2);
  });
  var Vh = Pk(function(b) {
    return (b = Ij(b)) && b / R(b);
  });
  Vh.invert = ed(function(b) {
    return b;
  });
  fd.invert = function(b, r) {
    return [b, 2 * qc(Pm(r)) - ja];
  };
  gd.invert = gd;
  var Qe = oa(3) / 2;
  $g.invert = function(b, r) {
    for (var l = r, z = l * l, D = z * z * z, F = 0, I; 12 > F && !(I = l * (1.340264 + -0.081106 * z + D * (0.000893 + 0.003796 * z)) - r, z = 1.340264 + 3 * -0.081106 * z + D * (7 * 0.000893 + .034164 * z), l -= I /= z, z = l * l, D = z * z * z, 1e-12 > ea(I)); ++F) {
    }
    return [Qe * b * (1.340264 + 3 * -0.081106 * z + D * (7 * 0.000893 + .034164 * z)) / W(l), Ba(R(l) / Qe)];
  };
  ah.invert = ed(qc);
  bh.invert = function(b, r) {
    var l = r, z = 25;
    do {
      var D = l * l;
      var F = D * D;
      l -= F = (l * (1.007226 + D * (0.015085 + F * (-0.044475 + 0.028874 * D - 0.005916 * F))) - r) / (1.007226 + D * (.045255 + F * (-.311325 + .259866 * D - 0.005916 * 11 * F)));
    } while (1e-6 < ea(F) && 0 < --z);
    return [b / (0.8707 + (D = l * l) * (-0.131979 + D * (-0.013791 + D * D * D * (0.003971 - 0.001529 * D)))), l];
  };
  ch.invert = ed(Ba);
  dh.invert = ed(function(b) {
    return 2 * qc(b);
  });
  eh.invert = function(b, r) {
    return [-r, 2 * qc(Pm(b)) - ja];
  };
  rc.prototype = fh.prototype = {constructor:rc, count:function() {
    return this.eachAfter(pr);
  }, each:function(b) {
    var l, v = [this], z;
    do {
      var D = v.reverse();
      for (v = []; l = D.pop();) {
        if (b(l), l = l.children) {
          var F = 0;
          for (z = l.length; F < z; ++F) {
            v.push(l[F]);
          }
        }
      }
    } while (v.length);
    return this;
  }, eachAfter:function(b) {
    for (var l, v = [this], z = [], D, F; l = v.pop();) {
      if (z.push(l), l = l.children) {
        for (D = 0, F = l.length; D < F; ++D) {
          v.push(l[D]);
        }
      }
    }
    for (; l = z.pop();) {
      b(l);
    }
    return this;
  }, eachBefore:function(b) {
    for (var l, v = [this], z; l = v.pop();) {
      if (b(l), l = l.children) {
        for (z = l.length - 1; 0 <= z; --z) {
          v.push(l[z]);
        }
      }
    }
    return this;
  }, sum:function(b) {
    return this.eachAfter(function(l) {
      for (var r = +b(l.data) || 0, z = l.children, D = z && z.length; 0 <= --D;) {
        r += z[D].value;
      }
      l.value = r;
    });
  }, sort:function(b) {
    return this.eachBefore(function(l) {
      l.children && l.children.sort(b);
    });
  }, path:function(b) {
    var l = this;
    var v = l;
    var z = b;
    if (v !== z) {
      var D = v.ancestors(), F = z.ancestors(), I = null;
      v = D.pop();
      for (z = F.pop(); v === z;) {
        I = v, v = D.pop(), z = F.pop();
      }
      v = I;
    }
    for (z = [l]; l !== v;) {
      l = l.parent, z.push(l);
    }
    for (l = z.length; b !== v;) {
      z.splice(l, 0, b), b = b.parent;
    }
    return z;
  }, ancestors:function() {
    for (var b = this, r = [b]; b = b.parent;) {
      r.push(b);
    }
    return r;
  }, descendants:function() {
    var b = [];
    this.each(function(l) {
      b.push(l);
    });
    return b;
  }, leaves:function() {
    var b = [];
    this.eachBefore(function(l) {
      l.children || b.push(l);
    });
    return b;
  }, links:function() {
    var b = this, r = [];
    b.each(function(l) {
      l !== b && r.push({source:l.parent, target:l});
    });
    return r;
  }, copy:function() {
    return fh(this).eachBefore(rr);
  }};
  var sr = Array.prototype.slice, Zt = {depth:-1}, Rm = {};
  Ve.prototype = Object.create(rc.prototype);
  var Sm = (1 + Math.sqrt(5)) / 2, Tm = function v(b) {
    function r(r, v, z, P, C) {
      dl(b, r, v, z, P, C);
    }
    r.ratio = function(b) {
      return v(1 < (b = +b) ? b : 1);
    };
    return r;
  }(Sm), $t = function z(b) {
    function v(v, z, D, C, x) {
      if ((J = v._squarify) && J.ratio === b) {
        for (var J, F, I, P = -1, X, f = J.length, m = v.value; ++P < f;) {
          v = J[P];
          F = v.children;
          I = v.value = 0;
          for (X = F.length; I < X; ++I) {
            v.value += F[I].value;
          }
          v.dice ? id(v, z, D, C, D += (x - D) * v.value / m) : We(v, z, D, z += (C - z) * v.value / m, x);
          m -= v.value;
        }
      } else {
        v._squarify = J = dl(b, v, z, D, C, x), J.ratio = b;
      }
    }
    v.ratio = function(b) {
      return z(1 < (b = +b) ? b : 1);
    };
    return v;
  }(Sm), au = function D(b) {
    function z(z, D) {
      z = null == z ? 0 : +z;
      D = null == D ? 1 : +D;
      1 === arguments.length ? (D = z, z = 0) : D -= z;
      return function() {
        return b() * D + z;
      };
    }
    z.source = D;
    return z;
  }(tc), Um = function F(b) {
    function D(D, C) {
      var x, J;
      D = null == D ? 0 : +D;
      C = null == C ? 1 : +C;
      return function() {
        if (null != x) {
          var F = x;
          x = null;
        } else {
          do {
            x = 2 * b() - 1, F = 2 * b() - 1, J = x * x + F * F;
          } while (!J || 1 < J);
        }
        return D + C * F * Math.sqrt(-2 * Math.log(J) / J);
      };
    }
    D.source = F;
    return D;
  }(tc), bu = function I(b) {
    function F() {
      var C = Um.source(b).apply(this, arguments);
      return function() {
        return Math.exp(C());
      };
    }
    F.source = I;
    return F;
  }(tc), Vm = function P(b) {
    function C(C) {
      return function() {
        for (var x = 0, K = 0; K < C; ++K) {
          x += b();
        }
        return x;
      };
    }
    C.source = P;
    return C;
  }(tc), cu = function C(b) {
    function x(C) {
      var x = Vm.source(b)(C);
      return function() {
        return x() / C;
      };
    }
    x.source = C;
    return x;
  }(tc), du = function x(b) {
    function C(C) {
      return function() {
        return -Math.log(1 - b()) / C;
      };
    }
    C.source = x;
    return C;
  }(tc), Wm = Array.prototype, Ye = Wm.map, Tb = Wm.slice, lh = {name:"implicit"}, hl = [0, 1], th = new Date, uh = new Date, Yb = ra(function() {
  }, function(b, x) {
    b.setTime(+b + x);
  }, function(b, x) {
    return x - b;
  });
  Yb.every = function(b) {
    b = Math.floor(b);
    return isFinite(b) && 0 < b ? 1 < b ? ra(function(C) {
      C.setTime(Math.floor(C / b) * b);
    }, function(C, J) {
      C.setTime(+C + J * b);
    }, function(C, J) {
      return (J - C) / b;
    }) : Yb : null;
  };
  var Xm = Yb.range, Hd = ra(function(b) {
    b.setTime(b - b.getMilliseconds());
  }, function(b, x) {
    b.setTime(+b + 1e3 * x);
  }, function(b, x) {
    return (x - b) / 1e3;
  }, function(b) {
    return b.getUTCSeconds();
  }), Ym = Hd.range, Wh = ra(function(b) {
    b.setTime(b - b.getMilliseconds() - 1e3 * b.getSeconds());
  }, function(b, x) {
    b.setTime(+b + 6e4 * x);
  }, function(b, x) {
    return (x - b) / 6e4;
  }, function(b) {
    return b.getMinutes();
  }), eu = Wh.range, Xh = ra(function(b) {
    b.setTime(b - b.getMilliseconds() - 1e3 * b.getSeconds() - 6e4 * b.getMinutes());
  }, function(b, x) {
    b.setTime(+b + 36e5 * x);
  }, function(b, x) {
    return (x - b) / 36e5;
  }, function(b) {
    return b.getHours();
  }), fu = Xh.range, od = ra(function(b) {
    b.setHours(0, 0, 0, 0);
  }, function(b, x) {
    b.setDate(b.getDate() + x);
  }, function(b, x) {
    return (x - b - 6e4 * (x.getTimezoneOffset() - b.getTimezoneOffset())) / 864e5;
  }, function(b) {
    return b.getDate() - 1;
  }), gu = od.range, rd = Vb(0), nd = Vb(1), Zm = Vb(2), $m = Vb(3), sd = Vb(4), an = Vb(5), bn = Vb(6), cn = rd.range, hu = nd.range, iu = Zm.range, ju = $m.range, ku = sd.range, lu = an.range, mu = bn.range, Yh = ra(function(b) {
    b.setDate(1);
    b.setHours(0, 0, 0, 0);
  }, function(b, x) {
    b.setMonth(b.getMonth() + x);
  }, function(b, x) {
    return x.getMonth() - b.getMonth() + 12 * (x.getFullYear() - b.getFullYear());
  }, function(b) {
    return b.getMonth();
  }), nu = Yh.range, qb = ra(function(b) {
    b.setMonth(0, 1);
    b.setHours(0, 0, 0, 0);
  }, function(b, x) {
    b.setFullYear(b.getFullYear() + x);
  }, function(b, x) {
    return x.getFullYear() - b.getFullYear();
  }, function(b) {
    return b.getFullYear();
  });
  qb.every = function(b) {
    return isFinite(b = Math.floor(b)) && 0 < b ? ra(function(x) {
      x.setFullYear(Math.floor(x.getFullYear() / b) * b);
      x.setMonth(0, 1);
      x.setHours(0, 0, 0, 0);
    }, function(x, C) {
      x.setFullYear(x.getFullYear() + C * b);
    }) : null;
  };
  var ou = qb.range, Zh = ra(function(b) {
    b.setUTCSeconds(0, 0);
  }, function(b, x) {
    b.setTime(+b + 6e4 * x);
  }, function(b, x) {
    return (x - b) / 6e4;
  }, function(b) {
    return b.getUTCMinutes();
  }), pu = Zh.range, $h = ra(function(b) {
    b.setUTCMinutes(0, 0, 0);
  }, function(b, x) {
    b.setTime(+b + 36e5 * x);
  }, function(b, x) {
    return (x - b) / 36e5;
  }, function(b) {
    return b.getUTCHours();
  }), qu = $h.range, md = ra(function(b) {
    b.setUTCHours(0, 0, 0, 0);
  }, function(b, x) {
    b.setUTCDate(b.getUTCDate() + x);
  }, function(b, x) {
    return (x - b) / 864e5;
  }, function(b) {
    return b.getUTCDate() - 1;
  }), ru = md.range, td = Wb(0), ld = Wb(1), dn = Wb(2), en = Wb(3), ud = Wb(4), fn = Wb(5), gn = Wb(6), hn = td.range, su = ld.range, tu = dn.range, uu = en.range, vu = ud.range, wu = fn.range, xu = gn.range, ai = ra(function(b) {
    b.setUTCDate(1);
    b.setUTCHours(0, 0, 0, 0);
  }, function(b, x) {
    b.setUTCMonth(b.getUTCMonth() + x);
  }, function(b, x) {
    return x.getUTCMonth() - b.getUTCMonth() + 12 * (x.getUTCFullYear() - b.getUTCFullYear());
  }, function(b) {
    return b.getUTCMonth();
  }), yu = ai.range, rb = ra(function(b) {
    b.setUTCMonth(0, 1);
    b.setUTCHours(0, 0, 0, 0);
  }, function(b, x) {
    b.setUTCFullYear(b.getUTCFullYear() + x);
  }, function(b, x) {
    return x.getUTCFullYear() - b.getUTCFullYear();
  }, function(b) {
    return b.getUTCFullYear();
  });
  rb.every = function(b) {
    return isFinite(b = Math.floor(b)) && 0 < b ? ra(function(x) {
      x.setUTCFullYear(Math.floor(x.getUTCFullYear() / b) * b);
      x.setUTCMonth(0, 1);
      x.setUTCHours(0, 0, 0, 0);
    }, function(x, C) {
      x.setUTCFullYear(x.getUTCFullYear() + C * b);
    }) : null;
  };
  var zu = rb.range, zl = {"-":"", _:" ", 0:"0"}, wa = /^\s*\d+/, Hs = /^%/, Gs = /[\\^$*+?|[\]().{}]/g, uc;
  Jl({dateTime:"%x, %X", date:"%-m/%-d/%Y", time:"%-I:%M:%S %p", periods:["AM", "PM"], days:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), shortDays:"Sun Mon Tue Wed Thu Fri Sat".split(" "), months:"January February March April May June July August September October November December".split(" "), shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")});
  var Au = Date.prototype.toISOString ? Is : b.utcFormat("%Y-%m-%dT%H:%M:%S.%LZ"), Bu = +new Date("2000-01-01T00:00:00.000Z") ? Js : b.utcParse("%Y-%m-%dT%H:%M:%S.%LZ"), Ms = 6048E5, Kl = 2592E6, wh = 31536E6, Cu = aa("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), Du = aa("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"), Eu = aa("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"), Fu = aa("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"), Gu = aa("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"), 
  Hu = aa("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"), Iu = aa("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"), Ju = aa("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"), Ku = aa("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"), jn = Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", 
  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(aa), Lu = ha(jn), kn = Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", 
  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(aa), Mu = ha(kn), ln = Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", 
  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(aa), Nu = ha(ln), mn = Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(aa), 
  Ou = ha(mn), nn = Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(aa), Pu = ha(nn), on = Array(3).concat("ef8a62ffffff999999", 
  "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(aa), Qu = ha(on), pn = Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", 
  "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(aa), Ru = ha(pn), qn = Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", 
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(aa), Su = ha(qn), rn = Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", 
  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(aa), Tu = ha(rn), sn = Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(aa), 
  Uu = ha(sn), tn = Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(aa), Vu = ha(tn), un = Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", 
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(aa), Wu = ha(un), vn = Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(aa), Xu = ha(vn), wn = Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", 
  "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(aa), Yu = ha(wn), xn = Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(aa), 
  Zu = ha(xn), yn = Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(aa), $u = ha(yn), zn = Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", 
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(aa), av = ha(zn), An = Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(aa), bv = ha(An), Bn = Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", 
  "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(aa), cv = ha(Bn), Cn = Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(aa), 
  dv = ha(Cn), Dn = Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(aa), ev = ha(Dn), En = Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", 
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(aa), fv = ha(En), Fn = Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(aa), gv = ha(Fn), Gn = Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", 
  "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(aa), hv = ha(Gn), Hn = Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(aa), 
  iv = ha(Hn), In = Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(aa), jv = ha(In), Jn = Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", 
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(aa), kv = ha(Jn), lv = rf(Ua(300, 0.5, 0.0), Ua(-240, 0.5, 1.0)), mv = rf(Ua(-100, 0.75, 0.35), Ua(80, 1.50, 0.8)), nv = rf(Ua(260, 0.75, 0.35), Ua(80, 1.50, 0.8)), xf = Ua(), yf = bc(), ov = Math.PI / 3, pv = 2 * Math.PI / 3, qv = bf(aa("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")), 
  rv = bf(aa("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")), 
  sv = bf(aa("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), 
  tv = bf(aa("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")), 
  Kn = Math.abs, ya = Math.atan2, Zb = Math.cos, Ss = Math.max, bi = Math.min, hb = Math.sin, vc = Math.sqrt, Eb = Math.PI, cf = Eb / 2, Fb = 2 * Eb;
  Ul.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._point = 0;
  }, lineEnd:function() {
    (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath();
    this._line = 1 - this._line;
  }, point:function(b, x) {
    b = +b;
    x = +x;
    switch(this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(b, x) : this._context.moveTo(b, x);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(b, x);
    }
  }};
  var Yl = Ch(ef);
  Wl.prototype = {areaStart:function() {
    this._curve.areaStart();
  }, areaEnd:function() {
    this._curve.areaEnd();
  }, lineStart:function() {
    this._curve.lineStart();
  }, lineEnd:function() {
    this._curve.lineEnd();
  }, point:function(b, x) {
    this._curve.point(x * Math.sin(b), x * -Math.cos(b));
  }};
  var Eh = Array.prototype.slice, ci = {draw:function(b, x) {
    x = Math.sqrt(x / Eb);
    b.moveTo(x, 0);
    b.arc(0, 0, x, 0, Fb);
  }}, Ln = {draw:function(b, x) {
    x = Math.sqrt(x / 5) / 2;
    b.moveTo(-3 * x, -x);
    b.lineTo(-x, -x);
    b.lineTo(-x, -3 * x);
    b.lineTo(x, -3 * x);
    b.lineTo(x, -x);
    b.lineTo(3 * x, -x);
    b.lineTo(3 * x, x);
    b.lineTo(x, x);
    b.lineTo(x, 3 * x);
    b.lineTo(-x, 3 * x);
    b.lineTo(-x, x);
    b.lineTo(-3 * x, x);
    b.closePath();
  }}, Mn = Math.sqrt(1 / 3), uv = 2 * Mn, Nn = {draw:function(b, x) {
    x = Math.sqrt(x / uv);
    var C = x * Mn;
    b.moveTo(0, -x);
    b.lineTo(C, 0);
    b.lineTo(0, x);
    b.lineTo(-C, 0);
    b.closePath();
  }}, On = Math.sin(Eb / 10) / Math.sin(7 * Eb / 10), vv = Math.sin(Fb / 10) * On, wv = -Math.cos(Fb / 10) * On, Pn = {draw:function(b, x) {
    x = Math.sqrt(0.89081309152928522810 * x);
    var C = vv * x, K = wv * x;
    b.moveTo(0, -x);
    b.lineTo(C, K);
    for (var N = 1; 5 > N; ++N) {
      var S = Fb * N / 5, X = Math.cos(S);
      S = Math.sin(S);
      b.lineTo(S * x, -X * x);
      b.lineTo(X * C - S * K, S * C + X * K);
    }
    b.closePath();
  }}, Qn = {draw:function(b, x) {
    x = Math.sqrt(x);
    var C = -x / 2;
    b.rect(C, C, x, x);
  }}, di = Math.sqrt(3), Rn = {draw:function(b, x) {
    x = -Math.sqrt(x / (3 * di));
    b.moveTo(0, 2 * x);
    b.lineTo(-di * x, -x);
    b.lineTo(di * x, -x);
    b.closePath();
  }}, Sa = Math.sqrt(3) / 2, ei = 1 / Math.sqrt(12), xv = 3 * (ei / 2 + 1), Sn = {draw:function(b, x) {
    var C = Math.sqrt(x / xv);
    x = C / 2;
    var K = C * ei;
    C = C * ei + C;
    var N = -x;
    b.moveTo(x, K);
    b.lineTo(x, C);
    b.lineTo(N, C);
    b.lineTo(-0.5 * x - Sa * K, Sa * x + -0.5 * K);
    b.lineTo(-0.5 * x - Sa * C, Sa * x + -0.5 * C);
    b.lineTo(-0.5 * N - Sa * C, Sa * N + -0.5 * C);
    b.lineTo(-0.5 * x + Sa * K, -0.5 * K - Sa * x);
    b.lineTo(-0.5 * x + Sa * C, -0.5 * C - Sa * x);
    b.lineTo(-0.5 * N + Sa * C, -0.5 * C - Sa * N);
    b.closePath();
  }}, yv = [ci, Ln, Nn, Qn, Pn, Rn, Sn];
  gf.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  }, lineEnd:function() {
    switch(this._point) {
      case 3:
        ff(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
    }
    (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath();
    this._line = 1 - this._line;
  }, point:function(b, x) {
    b = +b;
    x = +x;
    switch(this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(b, x) : this._context.moveTo(b, x);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        ff(this, b, x);
    }
    this._x0 = this._x1;
    this._x1 = b;
    this._y0 = this._y1;
    this._y1 = x;
  }};
  $l.prototype = {areaStart:Db, areaEnd:Db, lineStart:function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  }, lineEnd:function() {
    switch(this._point) {
      case 1:
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      case 2:
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      case 3:
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
    }
  }, point:function(b, x) {
    b = +b;
    x = +x;
    switch(this._point) {
      case 0:
        this._point = 1;
        this._x2 = b;
        this._y2 = x;
        break;
      case 1:
        this._point = 2;
        this._x3 = b;
        this._y3 = x;
        break;
      case 2:
        this._point = 3;
        this._x4 = b;
        this._y4 = x;
        this._context.moveTo((this._x0 + 4 * this._x1 + b) / 6, (this._y0 + 4 * this._y1 + x) / 6);
        break;
      default:
        ff(this, b, x);
    }
    this._x0 = this._x1;
    this._x1 = b;
    this._y0 = this._y1;
    this._y1 = x;
  }};
  am.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  }, lineEnd:function() {
    (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath();
    this._line = 1 - this._line;
  }, point:function(b, x) {
    b = +b;
    x = +x;
    switch(this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var C = (this._x0 + 4 * this._x1 + b) / 6, K = (this._y0 + 4 * this._y1 + x) / 6;
        this._line ? this._context.lineTo(C, K) : this._context.moveTo(C, K);
        break;
      case 3:
        this._point = 4;
      default:
        ff(this, b, x);
    }
    this._x0 = this._x1;
    this._x1 = b;
    this._y0 = this._y1;
    this._y1 = x;
  }};
  bm.prototype = {lineStart:function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  }, lineEnd:function() {
    var b = this._x, x = this._y, J = b.length - 1;
    if (0 < J) {
      for (var K = b[0], N = x[0], S = b[J] - K, X = x[J] - N, f = -1, m; ++f <= J;) {
        m = f / J, this._basis.point(this._beta * b[f] + (1 - this._beta) * (K + m * S), this._beta * x[f] + (1 - this._beta) * (N + m * X));
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  }, point:function(b, x) {
    this._x.push(+b);
    this._y.push(+x);
  }};
  var zv = function J(b) {
    function x(x) {
      return 1 === b ? new gf(x) : new bm(x, b);
    }
    x.beta = function(b) {
      return J(+b);
    };
    return x;
  }(0.85);
  Fh.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  }, lineEnd:function() {
    switch(this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        hf(this, this._x1, this._y1);
    }
    (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath();
    this._line = 1 - this._line;
  }, point:function(b, J) {
    b = +b;
    J = +J;
    switch(this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(b, J) : this._context.moveTo(b, J);
        break;
      case 1:
        this._point = 2;
        this._x1 = b;
        this._y1 = J;
        break;
      case 2:
        this._point = 3;
      default:
        hf(this, b, J);
    }
    this._x0 = this._x1;
    this._x1 = this._x2;
    this._x2 = b;
    this._y0 = this._y1;
    this._y1 = this._y2;
    this._y2 = J;
  }};
  var Av = function K(b) {
    function J(J) {
      return new Fh(J, b);
    }
    J.tension = function(b) {
      return K(+b);
    };
    return J;
  }(0);
  Gh.prototype = {areaStart:Db, areaEnd:Db, lineStart:function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  }, lineEnd:function() {
    switch(this._point) {
      case 1:
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      case 2:
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      case 3:
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
    }
  }, point:function(b, K) {
    b = +b;
    K = +K;
    switch(this._point) {
      case 0:
        this._point = 1;
        this._x3 = b;
        this._y3 = K;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = b, this._y4 = K);
        break;
      case 2:
        this._point = 3;
        this._x5 = b;
        this._y5 = K;
        break;
      default:
        hf(this, b, K);
    }
    this._x0 = this._x1;
    this._x1 = this._x2;
    this._x2 = b;
    this._y0 = this._y1;
    this._y1 = this._y2;
    this._y2 = K;
  }};
  var Bv = function N(b) {
    function K(K) {
      return new Gh(K, b);
    }
    K.tension = function(b) {
      return N(+b);
    };
    return K;
  }(0);
  Hh.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  }, lineEnd:function() {
    (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath();
    this._line = 1 - this._line;
  }, point:function(b, N) {
    b = +b;
    N = +N;
    switch(this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        hf(this, b, N);
    }
    this._x0 = this._x1;
    this._x1 = this._x2;
    this._x2 = b;
    this._y0 = this._y1;
    this._y1 = this._y2;
    this._y2 = N;
  }};
  var Cv = function S(b) {
    function N(f) {
      return new Hh(f, b);
    }
    N.tension = function(b) {
      return S(+b);
    };
    return N;
  }(0);
  cm.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  }, lineEnd:function() {
    switch(this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
    }
    (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath();
    this._line = 1 - this._line;
  }, point:function(b, S) {
    b = +b;
    S = +S;
    if (this._point) {
      var N = this._x2 - b, f = this._y2 - S;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(N * N + f * f, this._alpha));
    }
    switch(this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(b, S) : this._context.moveTo(b, S);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        Ih(this, b, S);
    }
    this._l01_a = this._l12_a;
    this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a;
    this._l12_2a = this._l23_2a;
    this._x0 = this._x1;
    this._x1 = this._x2;
    this._x2 = b;
    this._y0 = this._y1;
    this._y1 = this._y2;
    this._y2 = S;
  }};
  var Dv = function X(b) {
    function f(f) {
      return b ? new cm(f, b) : new Fh(f, 0);
    }
    f.alpha = function(b) {
      return X(+b);
    };
    return f;
  }(0.5);
  dm.prototype = {areaStart:Db, areaEnd:Db, lineStart:function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  }, lineEnd:function() {
    switch(this._point) {
      case 1:
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      case 2:
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      case 3:
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
    }
  }, point:function(b, X) {
    b = +b;
    X = +X;
    if (this._point) {
      var f = this._x2 - b, m = this._y2 - X;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(f * f + m * m, this._alpha));
    }
    switch(this._point) {
      case 0:
        this._point = 1;
        this._x3 = b;
        this._y3 = X;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = b, this._y4 = X);
        break;
      case 2:
        this._point = 3;
        this._x5 = b;
        this._y5 = X;
        break;
      default:
        Ih(this, b, X);
    }
    this._l01_a = this._l12_a;
    this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a;
    this._l12_2a = this._l23_2a;
    this._x0 = this._x1;
    this._x1 = this._x2;
    this._x2 = b;
    this._y0 = this._y1;
    this._y1 = this._y2;
    this._y2 = X;
  }};
  var Ev = function f(b) {
    function m(f) {
      return b ? new dm(f, b) : new Gh(f, 0);
    }
    m.alpha = function(b) {
      return f(+b);
    };
    return m;
  }(0.5);
  em.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  }, lineEnd:function() {
    (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath();
    this._line = 1 - this._line;
  }, point:function(b, f) {
    b = +b;
    f = +f;
    if (this._point) {
      var m = this._x2 - b, u = this._y2 - f;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(m * m + u * u, this._alpha));
    }
    switch(this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        Ih(this, b, f);
    }
    this._l01_a = this._l12_a;
    this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a;
    this._l12_2a = this._l23_2a;
    this._x0 = this._x1;
    this._x1 = this._x2;
    this._x2 = b;
    this._y0 = this._y1;
    this._y1 = this._y2;
    this._y2 = f;
  }};
  var Fv = function m(b) {
    function f(f) {
      return b ? new em(f, b) : new Hh(f, 0);
    }
    f.alpha = function(b) {
      return m(+b);
    };
    return f;
  }(0.5);
  fm.prototype = {areaStart:Db, areaEnd:Db, lineStart:function() {
    this._point = 0;
  }, lineEnd:function() {
    this._point && this._context.closePath();
  }, point:function(b, m) {
    b = +b;
    m = +m;
    this._point ? this._context.lineTo(b, m) : (this._point = 1, this._context.moveTo(b, m));
  }};
  jf.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  }, lineEnd:function() {
    switch(this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Jh(this, this._t0, hm(this, this._t0));
    }
    (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath();
    this._line = 1 - this._line;
  }, point:function(b, m) {
    var f = NaN;
    b = +b;
    m = +m;
    if (b !== this._x1 || m !== this._y1) {
      switch(this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(b, m) : this._context.moveTo(b, m);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3;
          Jh(this, hm(this, f = gm(this, b, m)), f);
          break;
        default:
          Jh(this, this._t0, f = gm(this, b, m));
      }
      this._x0 = this._x1;
      this._x1 = b;
      this._y0 = this._y1;
      this._y1 = m;
      this._t0 = f;
    }
  }};
  (im.prototype = Object.create(jf.prototype)).point = function(b, m) {
    jf.prototype.point.call(this, m, b);
  };
  jm.prototype = {moveTo:function(b, m) {
    this._context.moveTo(m, b);
  }, closePath:function() {
    this._context.closePath();
  }, lineTo:function(b, m) {
    this._context.lineTo(m, b);
  }, bezierCurveTo:function(b, m, u, n, q, w) {
    this._context.bezierCurveTo(m, b, n, u, w, q);
  }};
  km.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._x = [];
    this._y = [];
  }, lineEnd:function() {
    var b = this._x, m = this._y, u = b.length;
    if (u) {
      if (this._line ? this._context.lineTo(b[0], m[0]) : this._context.moveTo(b[0], m[0]), 2 === u) {
        this._context.lineTo(b[1], m[1]);
      } else {
        for (var n = lm(b), q = lm(m), w = 0, B = 1; B < u; ++w, ++B) {
          this._context.bezierCurveTo(n[0][w], q[0][w], n[1][w], q[1][w], b[B], m[B]);
        }
      }
    }
    (this._line || 0 !== this._line && 1 === u) && this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  }, point:function(b, m) {
    this._x.push(+b);
    this._y.push(+m);
  }};
  kf.prototype = {areaStart:function() {
    this._line = 0;
  }, areaEnd:function() {
    this._line = NaN;
  }, lineStart:function() {
    this._x = this._y = NaN;
    this._point = 0;
  }, lineEnd:function() {
    0 < this._t && 1 > this._t && 2 === this._point && this._context.lineTo(this._x, this._y);
    (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath();
    0 <= this._line && (this._t = 1 - this._t, this._line = 1 - this._line);
  }, point:function(b, m) {
    b = +b;
    m = +m;
    switch(this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(b, m) : this._context.moveTo(b, m);
        break;
      case 1:
        this._point = 2;
      default:
        if (0 >= this._t) {
          this._context.lineTo(this._x, m), this._context.lineTo(b, m);
        } else {
          var f = this._x * (1 - this._t) + b * this._t;
          this._context.lineTo(f, this._y);
          this._context.lineTo(f, m);
        }
    }
    this._x = b;
    this._y = m;
  }};
  lf.prototype = {constructor:lf, insert:function(b, m) {
    var f;
    if (b) {
      m.P = b;
      if (m.N = b.N) {
        b.N.P = m;
      }
      b.N = m;
      if (b.R) {
        for (b = b.R; b.L;) {
          b = b.L;
        }
        b.L = m;
      } else {
        b.R = m;
      }
      var n = b;
    } else {
      this._ ? (b = qm(this._), m.P = null, m.N = b, b.P = b.L = m, n = b) : (m.P = m.N = null, this._ = m, n = null);
    }
    m.L = m.R = null;
    m.U = n;
    m.C = !0;
    for (b = m; n && n.C;) {
      m = n.U, n === m.L ? (f = m.R) && f.C ? (n.C = f.C = !1, m.C = !0, b = m) : (b === n.R && (xd(this, n), b = n, n = b.U), n.C = !1, m.C = !0, yd(this, m)) : (f = m.L) && f.C ? (n.C = f.C = !1, m.C = !0, b = m) : (b === n.L && (yd(this, n), b = n, n = b.U), n.C = !1, m.C = !0, xd(this, m)), n = b.U;
    }
    this._.C = !1;
  }, remove:function(b) {
    b.N && (b.N.P = b.P);
    b.P && (b.P.N = b.N);
    b.N = b.P = null;
    var f = b.U, u = b.L, n = b.R;
    var q = u ? n ? qm(n) : u : n;
    f ? f.L === b ? f.L = q : f.R = q : this._ = q;
    if (u && n) {
      var w = q.C;
      q.C = b.C;
      q.L = u;
      u.U = q;
      q !== n ? (f = q.U, q.U = b.U, b = q.R, f.L = b, q.R = n, n.U = q) : (q.U = f, f = q, b = q.R);
    } else {
      w = b.C, b = q;
    }
    b && (b.U = f);
    if (!w) {
      if (b && b.C) {
        b.C = !1;
      } else {
        do {
          if (b === this._) {
            break;
          }
          if (b === f.L) {
            if (b = f.R, b.C && (b.C = !1, f.C = !0, xd(this, f), b = f.R), b.L && b.L.C || b.R && b.R.C) {
              b.R && b.R.C || (b.L.C = !1, b.C = !0, yd(this, b), b = f.R);
              b.C = f.C;
              f.C = b.R.C = !1;
              xd(this, f);
              b = this._;
              break;
            }
          } else {
            if (b = f.L, b.C && (b.C = !1, f.C = !0, yd(this, f), b = f.L), b.L && b.L.C || b.R && b.R.C) {
              b.L && b.L.C || (b.R.C = !1, b.C = !0, xd(this, b), b = f.L);
              b.C = f.C;
              f.C = b.L.C = !1;
              yd(this, f);
              b = this._;
              break;
            }
          }
          b.C = !0;
          b = f;
          f = f.U;
        } while (!b.C);
        b && (b.C = !1);
      }
    }
  }};
  var sm = [], Kh, um = [], ba = 1e-6, it = 1e-12, Ac, Na, Bd, xa;
  Mh.prototype = {constructor:Mh, polygons:function() {
    var b = this.edges;
    return this.cells.map(function(f) {
      var m = f.halfedges.map(function(m) {
        return rm(f, b[m]);
      });
      m.data = f.site.data;
      return m;
    });
  }, triangles:function() {
    var b = [], m = this.edges;
    this.cells.forEach(function(f, n) {
      if (u = (q = f.halfedges).length) {
        f = f.site;
        var q, w = -1, u, E = m[q[u - 1]];
        for (E = E.left === f ? E.right : E.left; ++w < u;) {
          var A = E;
          E = m[q[w]];
          E = E.left === f ? E.right : E.left;
          A && E && n < A.index && n < E.index && 0 > (f[0] - E[0]) * (A[1] - f[1]) - (f[0] - A[0]) * (E[1] - f[1]) && b.push([f.data, A.data, E.data]);
        }
      }
    });
    return b;
  }, links:function() {
    return this.edges.filter(function(b) {
      return b.right;
    }).map(function(b) {
      return {source:b.left.data, target:b.right.data};
    });
  }, find:function(b, m, u) {
    var f = this, q = f._found || 0;
    var w = f.cells.length;
    for (var B; !(B = f.cells[q]);) {
      if (++q >= w) {
        return null;
      }
    }
    w = b - B.site[0];
    var E = m - B.site[1], A = w * w + E * E;
    do {
      B = f.cells[w = q], q = null, B.halfedges.forEach(function(n) {
        var w = f.edges[n];
        n = w.left;
        if (n !== B.site && n || (n = w.right)) {
          w = b - n[0];
          var u = m - n[1];
          w = w * w + u * u;
          w < A && (A = w, q = n.index);
        }
      });
    } while (null !== q);
    f._found = w;
    return null == u || A <= u * u ? B.site : null;
  }};
  sb.prototype = {constructor:sb, scale:function(b) {
    return 1 === b ? this : new sb(this.k * b, this.x, this.y);
  }, translate:function(b, m) {
    return 0 === b & 0 === m ? this : new sb(this.k, this.x + this.k * b, this.y + this.k * m);
  }, apply:function(b) {
    return [b[0] * this.k + this.x, b[1] * this.k + this.y];
  }, applyX:function(b) {
    return b * this.k + this.x;
  }, applyY:function(b) {
    return b * this.k + this.y;
  }, invert:function(b) {
    return [(b[0] - this.x) / this.k, (b[1] - this.y) / this.k];
  }, invertX:function(b) {
    return (b - this.x) / this.k;
  }, invertY:function(b) {
    return (b - this.y) / this.k;
  }, rescaleX:function(b) {
    return b.copy().domain(b.range().map(this.invertX, this).map(b.invert, b));
  }, rescaleY:function(b) {
    return b.copy().domain(b.range().map(this.invertY, this).map(b.invert, b));
  }, toString:function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }};
  var pf = new sb(1, 0, 0);
  wm.prototype = sb.prototype;
  b.version = "5.9.2";
  b.bisect = Bb;
  b.bisectRight = Bb;
  b.bisectLeft = rt;
  b.ascending = Oa;
  b.bisector = zf;
  b.cross = function(b, m, u) {
    var f = b.length, q = m.length, w = Array(f * q), B, E, A;
    null == u && (u = hi);
    for (B = A = 0; B < f; ++B) {
      var G = b[B];
      for (E = 0; E < q; ++E, ++A) {
        w[A] = u(G, m[E]);
      }
    }
    return w;
  };
  b.descending = function(b, m) {
    return m < b ? -1 : m > b ? 1 : m >= b ? 0 : NaN;
  };
  b.deviation = ji;
  b.extent = Af;
  b.histogram = function() {
    function b(b) {
      var f, q = b.length, E = Array(q);
      for (f = 0; f < q; ++f) {
        E[f] = m(b[f], f, b);
      }
      f = u(E);
      var A = f[0], G = f[1], L = n(E, A, G);
      Array.isArray(L) || (L = Gb(A, G, L), L = Ka(Math.ceil(A / L) * L, G, L));
      for (var H = L.length; L[0] <= A;) {
        L.shift(), --H;
      }
      for (; L[H - 1] > G;) {
        L.pop(), --H;
      }
      var M = Array(H + 1);
      for (f = 0; f <= H; ++f) {
        var O = M[f] = [];
        O.x0 = 0 < f ? L[f - 1] : A;
        O.x1 = f < H ? L[f] : G;
      }
      for (f = 0; f < q; ++f) {
        O = E[f], A <= O && O <= G && M[Bb(L, O, 0, H)].push(b[f]);
      }
      return M;
    }
    var m = Un, u = Af, n = Ff;
    b.value = function(f) {
      return arguments.length ? (m = "function" === typeof f ? f : Kd(f), b) : m;
    };
    b.domain = function(f) {
      return arguments.length ? (u = "function" === typeof f ? f : Kd([f[0], f[1]]), b) : u;
    };
    b.thresholds = function(f) {
      return arguments.length ? (n = "function" === typeof f ? f : Array.isArray(f) ? Kd(st.call(f)) : Kd(f), b) : n;
    };
    return b;
  };
  b.thresholdFreedmanDiaconis = function(b, m, u) {
    b = tt.call(b, tb).sort(Oa);
    return Math.ceil((u - m) / (2 * (Gc(b, 0.75) - Gc(b, 0.25)) * Math.pow(b.length, -1 / 3)));
  };
  b.thresholdScott = function(b, m, u) {
    return Math.ceil((u - m) / (3.5 * ji(b) * Math.pow(b.length, -1 / 3)));
  };
  b.thresholdSturges = Ff;
  b.max = ki;
  b.mean = function(b, m) {
    var f = b.length, n = f, q = -1, w, B = 0;
    if (null == m) {
      for (; ++q < f;) {
        isNaN(w = tb(b[q])) ? --n : B += w;
      }
    } else {
      for (; ++q < f;) {
        isNaN(w = tb(m(b[q], q, b))) ? --n : B += w;
      }
    }
    if (n) {
      return B / n;
    }
  };
  b.median = function(b, m) {
    var f = b.length, n = -1, q, w = [];
    if (null == m) {
      for (; ++n < f;) {
        isNaN(q = tb(b[n])) || w.push(q);
      }
    } else {
      for (; ++n < f;) {
        isNaN(q = tb(m(b[n], n, b))) || w.push(q);
      }
    }
    return Gc(w.sort(Oa), 0.5);
  };
  b.merge = Gf;
  b.min = li;
  b.pairs = function(b, m) {
    null == m && (m = hi);
    for (var f = 0, n = b.length - 1, q = b[0], w = Array(0 > n ? 0 : n); f < n;) {
      w[f] = m(q, q = b[++f]);
    }
    return w;
  };
  b.permute = function(b, m) {
    for (var f = m.length, n = Array(f); f--;) {
      n[f] = b[m[f]];
    }
    return n;
  };
  b.quantile = Gc;
  b.range = Ka;
  b.scan = function(b, m) {
    if (f = b.length) {
      var f, n = 0, q = 0, w, B = b[q];
      for (null == m && (m = Oa); ++n < f;) {
        if (0 > m(w = b[n], B) || 0 !== m(B, B)) {
          B = w, q = n;
        }
      }
      if (0 === m(B, B)) {
        return q;
      }
    }
  };
  b.shuffle = function(b, m, u) {
    u = (null == u ? b.length : u) - (m = null == m ? 0 : +m);
    for (var f, q; u;) {
      q = Math.random() * u-- | 0, f = b[u + m], b[u + m] = b[q + m], b[q + m] = f;
    }
    return b;
  };
  b.sum = function(b, m) {
    var f = b.length, n = -1, q, w = 0;
    if (null == m) {
      for (; ++n < f;) {
        if (q = +b[n]) {
          w += q;
        }
      }
    } else {
      for (; ++n < f;) {
        if (q = +m(b[n], n, b)) {
          w += q;
        }
      }
    }
    return w;
  };
  b.ticks = Bf;
  b.tickIncrement = Fc;
  b.tickStep = Gb;
  b.transpose = mi;
  b.variance = ii;
  b.zip = function() {
    return mi(arguments);
  };
  b.axisTop = function(b) {
    return Ld(1, b);
  };
  b.axisRight = function(b) {
    return Ld(2, b);
  };
  b.axisBottom = function(b) {
    return Ld(3, b);
  };
  b.axisLeft = function(b) {
    return Ld(4, b);
  };
  b.brush = function() {
    return jg(It);
  };
  b.brushX = function() {
    return jg(ie);
  };
  b.brushY = function() {
    return jg(he);
  };
  b.brushSelection = function(b) {
    return (b = b.__brush) ? b.dim.output(b.selection) : null;
  };
  b.chord = function() {
    function b(b) {
      var f = b.length, w = [], A = Ka(f), G = [], L = [], H = L.groups = Array(f), M = Array(f * f), O, Q;
      var V = 0;
      for (O = -1; ++O < f;) {
        var ka = 0;
        for (Q = -1; ++Q < f;) {
          ka += b[O][Q];
        }
        w.push(ka);
        G.push(Ka(f));
        V += ka;
      }
      u && A.sort(function(b, f) {
        return u(w[b], w[f]);
      });
      n && G.forEach(function(f, m) {
        f.sort(function(f, q) {
          return n(b[m][f], b[m][q]);
        });
      });
      var T = (V = Mm(0, Lm - m * f) / V) ? m : Lm / f;
      ka = 0;
      for (O = -1; ++O < f;) {
        var Y = ka;
        for (Q = -1; ++Q < f;) {
          var ia = A[O], pa = G[ia][Q], R = b[ia][pa], Nb = ka, W = ka += R * V;
          M[pa * f + ia] = {index:ia, subindex:pa, startAngle:Nb, endAngle:W, value:R};
        }
        H[ia] = {index:ia, startAngle:Y, endAngle:ka, value:w[ia]};
        ka += T;
      }
      for (O = -1; ++O < f;) {
        for (Q = O - 1; ++Q < f;) {
          A = M[Q * f + O], G = M[O * f + Q], (A.value || G.value) && L.push(A.value < G.value ? {source:G, target:A} : {source:A, target:G});
        }
      }
      return q ? L.sort(q) : L;
    }
    var m = 0, u = null, n = null, q = null;
    b.padAngle = function(f) {
      return arguments.length ? (m = Mm(0, f), b) : m;
    };
    b.sortGroups = function(f) {
      return arguments.length ? (u = f, b) : u;
    };
    b.sortSubgroups = function(f) {
      return arguments.length ? (n = f, b) : n;
    };
    b.sortChords = function(f) {
      return arguments.length ? (null == f ? q = null : (q = bq(f))._ = f, b) : q && q._;
    };
    return b;
  };
  b.ribbon = function() {
    function b() {
      var b, f = Jt.call(arguments), G = m.apply(this, f), L = u.apply(this, f);
      G = +n.apply(this, (f[0] = G, f));
      var H = q.apply(this, f) - sf, M = w.apply(this, f) - sf, O = G * Im(H), Q = G * Jm(H);
      L = +n.apply(this, (f[0] = L, f));
      var V = q.apply(this, f) - sf;
      f = w.apply(this, f) - sf;
      B || (B = b = xb());
      B.moveTo(O, Q);
      B.arc(0, 0, G, H, M);
      if (H !== V || M !== f) {
        B.quadraticCurveTo(0, 0, L * Im(V), L * Jm(V)), B.arc(0, 0, L, V, f);
      }
      B.quadraticCurveTo(0, 0, O, Q);
      B.closePath();
      if (b) {
        return B = null, b + "" || null;
      }
    }
    var m = cq, u = dq, n = eq, q = fq, w = gq, B = null;
    b.radius = function(f) {
      return arguments.length ? (n = "function" === typeof f ? f : lg(+f), b) : n;
    };
    b.startAngle = function(f) {
      return arguments.length ? (q = "function" === typeof f ? f : lg(+f), b) : q;
    };
    b.endAngle = function(f) {
      return arguments.length ? (w = "function" === typeof f ? f : lg(+f), b) : w;
    };
    b.source = function(f) {
      return arguments.length ? (m = f, b) : m;
    };
    b.target = function(f) {
      return arguments.length ? (u = f, b) : u;
    };
    b.context = function(f) {
      return arguments.length ? (B = null == f ? null : f, b) : B;
    };
    return b;
  };
  b.nest = function() {
    function b(f, m, n, B) {
      if (m >= u.length) {
        return null != q && f.sort(q), null != w ? w(f) : f;
      }
      for (var E = -1, M = f.length, A = u[m++], Q, G, L = kb(), T, Y = n(); ++E < M;) {
        (T = L.get(Q = A(G = f[E]) + "")) ? T.push(G) : L.set(Q, [G]);
      }
      L.each(function(f, q) {
        B(Y, q, b(f, m, n, B));
      });
      return Y;
    }
    function m(b, f) {
      if (++f > u.length) {
        return b;
      }
      var q = n[f - 1];
      if (null != w && f >= u.length) {
        var E = b.entries();
      } else {
        E = [], b.each(function(b, q) {
          E.push({key:q, values:m(b, f)});
        });
      }
      return null != q ? E.sort(function(b, f) {
        return q(b.key, f.key);
      }) : E;
    }
    var u = [], n = [], q, w, B;
    return B = {object:function(f) {
      return b(f, 0, hq, iq);
    }, map:function(f) {
      return b(f, 0, lj, mj);
    }, entries:function(f) {
      return m(b(f, 0, lj, mj), 0);
    }, key:function(b) {
      u.push(b);
      return B;
    }, sortKeys:function(b) {
      n[u.length - 1] = b;
      return B;
    }, sortValues:function(b) {
      q = b;
      return B;
    }, rollup:function(b) {
      w = b;
      return B;
    }};
  };
  b.set = nj;
  b.map = kb;
  b.keys = function(b) {
    var f = [], u;
    for (u in b) {
      f.push(u);
    }
    return f;
  };
  b.values = function(b) {
    var f = [], u;
    for (u in b) {
      f.push(b[u]);
    }
    return f;
  };
  b.entries = function(b) {
    var f = [], u;
    for (u in b) {
      f.push({key:u, value:b[u]});
    }
    return f;
  };
  b.color = wb;
  b.rgb = bc;
  b.hsl = Vd;
  b.lab = Wd;
  b.hcl = Xd;
  b.lch = function(b, m, u, n) {
    return 1 === arguments.length ? Di(b) : new bb(u, m, b, null == n ? 1 : n);
  };
  b.gray = function(b, m) {
    return new Ta(b, 0, 0, null == m ? 1 : m);
  };
  b.cubehelix = Ua;
  b.contours = oj;
  b.contourDensity = function() {
    function b(b) {
      var f = new Float32Array(Q * V), q = new Float32Array(Q * V);
      b.forEach(function(b, m, q) {
        var n = +B(b, m, q) + O >> M, u = +E(b, m, q) + O >> M;
        b = +A(b, m, q);
        0 <= n && n < Q && 0 <= u && u < V && (f[n + u * Q] += b);
      });
      ng({width:Q, height:V, data:f}, {width:Q, height:V, data:q}, H >> M);
      og({width:Q, height:V, data:q}, {width:Q, height:V, data:f}, H >> M);
      ng({width:Q, height:V, data:f}, {width:Q, height:V, data:q}, H >> M);
      og({width:Q, height:V, data:q}, {width:Q, height:V, data:f}, H >> M);
      ng({width:Q, height:V, data:f}, {width:Q, height:V, data:q}, H >> M);
      og({width:Q, height:V, data:q}, {width:Q, height:V, data:f}, H >> M);
      b = ka(f);
      Array.isArray(b) || (q = ki(f), b = Gb(0, q, b), b = Ka(0, Math.floor(q / b) * b, b), b.shift());
      return oj().thresholds(b).size([Q, V])(f).map(m);
    }
    function m(b) {
      b.value *= Math.pow(2, -2 * M);
      b.coordinates.forEach(u);
      return b;
    }
    function u(b) {
      b.forEach(n);
    }
    function n(b) {
      b.forEach(q);
    }
    function q(b) {
      b[0] = b[0] * Math.pow(2, M) - O;
      b[1] = b[1] * Math.pow(2, M) - O;
    }
    function w() {
      O = 3 * H;
      Q = G + 2 * O >> M;
      V = L + 2 * O >> M;
      return b;
    }
    var B = lq, E = mq, A = nq, G = 960, L = 500, H = 20, M = 2, O = 3 * H, Q = G + 2 * O >> M, V = L + 2 * O >> M, ka = yb(20);
    b.x = function(f) {
      return arguments.length ? (B = "function" === typeof f ? f : yb(+f), b) : B;
    };
    b.y = function(f) {
      return arguments.length ? (E = "function" === typeof f ? f : yb(+f), b) : E;
    };
    b.weight = function(f) {
      return arguments.length ? (A = "function" === typeof f ? f : yb(+f), b) : A;
    };
    b.size = function(b) {
      if (!arguments.length) {
        return [G, L];
      }
      var f = Math.ceil(b[0]), m = Math.ceil(b[1]);
      if (!(0 <= f || 0 <= f)) {
        throw Error("invalid size");
      }
      return G = f, L = m, w();
    };
    b.cellSize = function(b) {
      if (!arguments.length) {
        return 1 << M;
      }
      if (!(1 <= (b = +b))) {
        throw Error("invalid cell size");
      }
      return M = Math.floor(Math.log(b) / Math.LN2), w();
    };
    b.thresholds = function(f) {
      return arguments.length ? (ka = "function" === typeof f ? f : Array.isArray(f) ? yb(pj.call(f)) : yb(f), b) : ka;
    };
    b.bandwidth = function(b) {
      if (!arguments.length) {
        return Math.sqrt(H * (H + 1));
      }
      if (!(0 <= (b = +b))) {
        throw Error("invalid bandwidth");
      }
      return H = Math.round((Math.sqrt(4 * b * b + 1) - 1) / 2), w();
    };
    return b;
  };
  b.dispatch = Hb;
  b.drag = function() {
    function f(b) {
      b.on("mousedown.drag", m).filter(H).on("touchstart.drag", q).on("touchmove.drag", w).on("touchend.drag touchcancel.drag", B).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function m() {
      if (!Y && A.apply(this, arguments)) {
        var f = E("mouse", G.apply(this, arguments), ub, this, arguments);
        f && (Ha(b.event.view).on("mousemove.drag", u, !0).on("mouseup.drag", n, !0), Sd(b.event.view), b.event.stopImmediatePropagation(), T = !1, V = b.event.clientX, ka = b.event.clientY, f("start"));
      }
    }
    function u() {
      $b();
      if (!T) {
        var f = b.event.clientX - V, m = b.event.clientY - ka;
        T = f * f + m * m > ia;
      }
      M.mouse("drag");
    }
    function n() {
      Ha(b.event.view).on("mousemove.drag mouseup.drag", null);
      Td(b.event.view, T);
      $b();
      M.mouse("end");
    }
    function q() {
      if (A.apply(this, arguments)) {
        var f = b.event.changedTouches, m = G.apply(this, arguments), q = f.length, n, u;
        for (n = 0; n < q; ++n) {
          if (u = E(f[n].identifier, m, Rd, this, arguments)) {
            b.event.stopImmediatePropagation(), u("start");
          }
        }
      }
    }
    function w() {
      var f = b.event.changedTouches, m = f.length, q, n;
      for (q = 0; q < m; ++q) {
        if (n = M[f[q].identifier]) {
          $b(), n("drag");
        }
      }
    }
    function B() {
      var f = b.event.changedTouches, m = f.length, q, n;
      Y && clearTimeout(Y);
      Y = setTimeout(function() {
        Y = null;
      }, 500);
      for (q = 0; q < m; ++q) {
        if (n = M[f[q].identifier]) {
          b.event.stopImmediatePropagation(), n("end");
        }
      }
    }
    function E(m, q, n, u, w) {
      var A = n(q, m), E, B, G, V = O.copy();
      if (Ic(new Qf(f, "beforestart", E, m, Q, A[0], A[1], 0, 0, V), function() {
        if (null == (b.event.subject = E = L.apply(u, w))) {
          return !1;
        }
        B = E.x - A[0] || 0;
        G = E.y - A[1] || 0;
        return !0;
      })) {
        return function ta(b) {
          var O = A;
          switch(b) {
            case "start":
              M[m] = ta;
              var L = Q++;
              break;
            case "end":
              delete M[m], --Q;
            case "drag":
              A = n(q, m), L = Q;
          }
          Ic(new Qf(f, b, E, m, L, A[0] + B, A[1] + G, A[0] - O[0], A[1] - O[1], V), V.apply, V, [b, u, w]);
        };
      }
    }
    var A = Uo, G = Vo, L = Wo, H = Xo, M = {}, O = Hb("start", "drag", "end"), Q = 0, V, ka, T, Y, ia = 0;
    f.filter = function(b) {
      return arguments.length ? (A = "function" === typeof b ? b : Ud(!!b), f) : A;
    };
    f.container = function(b) {
      return arguments.length ? (G = "function" === typeof b ? b : Ud(b), f) : G;
    };
    f.subject = function(b) {
      return arguments.length ? (L = "function" === typeof b ? b : Ud(b), f) : L;
    };
    f.touchable = function(b) {
      return arguments.length ? (H = "function" === typeof b ? b : Ud(!!b), f) : H;
    };
    f.on = function() {
      var b = O.on.apply(O, arguments);
      return b === O ? f : b;
    };
    f.clickDistance = function(b) {
      return arguments.length ? (ia = (b = +b) * b, f) : Math.sqrt(ia);
    };
    return f;
  };
  b.dragDisable = Sd;
  b.dragEnable = Td;
  b.dsvFormat = le;
  b.csvParse = Nm;
  b.csvParseRows = Lt;
  b.csvFormat = Mt;
  b.csvFormatBody = Nt;
  b.csvFormatRows = Ot;
  b.tsvParse = Om;
  b.tsvParseRows = Pt;
  b.tsvFormat = Qt;
  b.tsvFormatBody = Rt;
  b.tsvFormatRows = St;
  b.autoType = function(b) {
    for (var f in b) {
      var u = b[f].trim(), n;
      if (u) {
        if ("true" === u) {
          u = !0;
        } else {
          if ("false" === u) {
            u = !1;
          } else {
            if ("NaN" === u) {
              u = NaN;
            } else {
              if (isNaN(n = +u)) {
                if (/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/.test(u)) {
                  u = new Date(u);
                } else {
                  continue;
                }
              } else {
                u = n;
              }
            }
          }
        }
      } else {
        u = null;
      }
      b[f] = u;
    }
    return b;
  };
  b.easeLinear = function(b) {
    return +b;
  };
  b.easeQuad = cj;
  b.easeQuadIn = function(b) {
    return b * b;
  };
  b.easeQuadOut = function(b) {
    return b * (2 - b);
  };
  b.easeQuadInOut = cj;
  b.easeCubic = fg;
  b.easeCubicIn = function(b) {
    return b * b * b;
  };
  b.easeCubicOut = function(b) {
    return --b * b * b + 1;
  };
  b.easeCubicInOut = fg;
  b.easePoly = Em;
  b.easePolyIn = Bt;
  b.easePolyOut = Ct;
  b.easePolyInOut = Em;
  b.easeSin = dj;
  b.easeSinIn = function(b) {
    return 1 - Math.cos(b * Fm);
  };
  b.easeSinOut = function(b) {
    return Math.sin(b * Fm);
  };
  b.easeSinInOut = dj;
  b.easeExp = fj;
  b.easeExpIn = function(b) {
    return Math.pow(2, 10 * b - 10);
  };
  b.easeExpOut = function(b) {
    return 1 - Math.pow(2, -10 * b);
  };
  b.easeExpInOut = fj;
  b.easeCircle = gj;
  b.easeCircleIn = function(b) {
    return 1 - Math.sqrt(1 - b * b);
  };
  b.easeCircleOut = function(b) {
    return Math.sqrt(1 - --b * b);
  };
  b.easeCircleInOut = gj;
  b.easeBounce = Sc;
  b.easeBounceIn = function(b) {
    return 1 - Sc(1 - b);
  };
  b.easeBounceOut = Sc;
  b.easeBounceInOut = function(b) {
    return (1 >= (b *= 2) ? 1 - Sc(1 - b) : Sc(b - 1) + 1) / 2;
  };
  b.easeBack = Gm;
  b.easeBackIn = Dt;
  b.easeBackOut = Et;
  b.easeBackInOut = Gm;
  b.easeElastic = Hm;
  b.easeElasticIn = Ft;
  b.easeElasticOut = Hm;
  b.easeElasticInOut = Gt;
  b.blob = function(b, m) {
    return fetch(b, m).then(pq);
  };
  b.buffer = function(b, m) {
    return fetch(b, m).then(qq);
  };
  b.dsv = function(b, m, u, n) {
    3 === arguments.length && "function" === typeof u && (n = u, u = void 0);
    var f = le(b);
    return me(m, u).then(function(b) {
      return f.parse(b, n);
    });
  };
  b.csv = Tt;
  b.tsv = Ut;
  b.image = function(b, m) {
    return new Promise(function(f, n) {
      var q = new Image, u;
      for (u in m) {
        q[u] = m[u];
      }
      q.onerror = n;
      q.onload = function() {
        f(q);
      };
      q.src = b;
    });
  };
  b.json = function(b, m) {
    return fetch(b, m).then(sq);
  };
  b.text = me;
  b.xml = Vt;
  b.html = Wt;
  b.svg = Xt;
  b.forceCenter = function(b, m) {
    function f() {
      var f, u = n.length, B = 0, E = 0;
      for (f = 0; f < u; ++f) {
        var A = n[f];
        B += A.x;
        E += A.y;
      }
      B = B / u - b;
      E = E / u - m;
      for (f = 0; f < u; ++f) {
        A = n[f], A.x -= B, A.y -= E;
      }
    }
    var n;
    null == b && (b = 0);
    null == m && (m = 0);
    f.initialize = function(b) {
      n = b;
    };
    f.x = function(m) {
      return arguments.length ? (b = +m, f) : b;
    };
    f.y = function(b) {
      return arguments.length ? (m = +b, f) : m;
    };
    return f;
  };
  b.forceCollide = function(b) {
    function f() {
      function b(b, f, m, n, q) {
        var u = b.data;
        b = b.r;
        var w = V + b;
        if (u) {
          u.index > M.index && (f = O - u.x - u.vx, m = Q - u.y - u.vy, n = f * f + m * m, n < w * w && (0 === f && (f = zb(), n += f * f), 0 === m && (m = zb(), n += m * m), n = (w - (n = Math.sqrt(n))) / n * B, M.vx += (f *= n) * (w = (b *= b) / (ka + b)), M.vy += (m *= n) * w, u.vx -= f * (w = 1 - w), u.vy -= m * w));
        } else {
          return f > O + w || n < O - w || m > Q + w || q < Q - w;
        }
      }
      for (var f, m = q.length, n, M, O, Q, V, ka, T = 0; T < E; ++T) {
        for (n = ne(q, vq, wq).visitAfter(u), f = 0; f < m; ++f) {
          M = q[f], V = w[M.index], ka = V * V, O = M.x + M.vx, Q = M.y + M.vy, n.visit(b);
        }
      }
    }
    function u(b) {
      if (b.data) {
        return b.r = w[b.data.index];
      }
      for (var f = b.r = 0; 4 > f; ++f) {
        b[f] && b[f].r > b.r && (b.r = b[f].r);
      }
    }
    function n() {
      if (q) {
        var f, m = q.length;
        w = Array(m);
        for (f = 0; f < m; ++f) {
          var n = q[f];
          w[n.index] = +b(n, f, q);
        }
      }
    }
    var q, w, B = 1, E = 1;
    "function" !== typeof b && (b = qa(null == b ? 1 : +b));
    f.initialize = function(b) {
      q = b;
      n();
    };
    f.iterations = function(b) {
      return arguments.length ? (E = +b, f) : E;
    };
    f.strength = function(b) {
      return arguments.length ? (B = +b, f) : B;
    };
    f.radius = function(m) {
      return arguments.length ? (b = "function" === typeof m ? m : qa(+m), n(), f) : b;
    };
    return f;
  };
  b.forceLink = function(b) {
    function f(f) {
      for (var m = 0, n = b.length; m < O; ++m) {
        for (var q = 0, u, w, A, B, Q; q < n; ++q) {
          u = b[q], w = u.source, u = u.target, A = u.x + u.vx - w.x - w.vx || zb(), B = u.y + u.vy - w.y - w.vy || zb(), Q = Math.sqrt(A * A + B * B), Q = (Q - G[q]) / Q * f * E[q], A *= Q, B *= Q, u.vx -= A * (Q = M[q]), u.vy -= B * Q, w.vx += A * (Q = 1 - Q), w.vy += B * Q;
        }
      }
    }
    function u() {
      if (L) {
        var f = L.length, m = b.length, u = kb(L, w);
        var A = 0;
        for (H = Array(f); A < m; ++A) {
          f = b[A], f.index = A, "object" !== typeof f.source && (f.source = wj(u, f.source)), "object" !== typeof f.target && (f.target = wj(u, f.target)), H[f.source.index] = (H[f.source.index] || 0) + 1, H[f.target.index] = (H[f.target.index] || 0) + 1;
        }
        A = 0;
        for (M = Array(m); A < m; ++A) {
          f = b[A], M[A] = H[f.source.index] / (H[f.source.index] + H[f.target.index]);
        }
        E = Array(m);
        n();
        G = Array(m);
        q();
      }
    }
    function n() {
      if (L) {
        for (var f = 0, m = b.length; f < m; ++f) {
          E[f] = +B(b[f], f, b);
        }
      }
    }
    function q() {
      if (L) {
        for (var f = 0, m = b.length; f < m; ++f) {
          G[f] = +A(b[f], f, b);
        }
      }
    }
    var w = xq, B = function(b) {
      return 1 / Math.min(H[b.source.index], H[b.target.index]);
    }, E, A = qa(30), G, L, H, M, O = 1;
    null == b && (b = []);
    f.initialize = function(b) {
      L = b;
      u();
    };
    f.links = function(m) {
      return arguments.length ? (b = m, u(), f) : b;
    };
    f.id = function(b) {
      return arguments.length ? (w = b, f) : w;
    };
    f.iterations = function(b) {
      return arguments.length ? (O = +b, f) : O;
    };
    f.strength = function(b) {
      return arguments.length ? (B = "function" === typeof b ? b : qa(+b), n(), f) : B;
    };
    f.distance = function(b) {
      return arguments.length ? (A = "function" === typeof b ? b : qa(+b), q(), f) : A;
    };
    return f;
  };
  b.forceManyBody = function() {
    function b(b) {
      var f = q.length, m = ne(q, yq, zq).visitAfter(u);
      B = b;
      for (b = 0; b < f; ++b) {
        w = q[b], m.visit(n);
      }
    }
    function m() {
      if (q) {
        var b, f = q.length;
        A = Array(f);
        for (b = 0; b < f; ++b) {
          var m = q[b];
          A[m.index] = +E(m, b, q);
        }
      }
    }
    function u(b) {
      var f = 0, m, n, q = 0, u, w, E;
      if (b.length) {
        for (u = w = E = 0; 4 > E; ++E) {
          (m = b[E]) && (n = Math.abs(m.value)) && (f += m.value, q += n, u += n * m.x, w += n * m.y);
        }
        b.x = u / q;
        b.y = w / q;
      } else {
        m = b;
        m.x = m.data.x;
        m.y = m.data.y;
        do {
          f += A[m.data.index];
        } while (m = m.next);
      }
      b.value = f;
    }
    function n(b, f, m, n) {
      if (!b.value) {
        return !0;
      }
      m = b.x - w.x;
      var q = b.y - w.y;
      f = n - f;
      n = m * m + q * q;
      if (f * f / H < n) {
        return n < L && (0 === m && (m = zb(), n += m * m), 0 === q && (q = zb(), n += q * q), n < G && (n = Math.sqrt(G * n)), w.vx += m * b.value * B / n, w.vy += q * b.value * B / n), !0;
      }
      if (!(b.length || n >= L)) {
        if (b.data !== w || b.next) {
          0 === m && (m = zb(), n += m * m), 0 === q && (q = zb(), n += q * q), n < G && (n = Math.sqrt(G * n));
        }
        do {
          b.data !== w && (f = A[b.data.index] * B / n, w.vx += m * f, w.vy += q * f);
        } while (b = b.next);
      }
    }
    var q, w, B, E = qa(-30), A, G = 1, L = Infinity, H = 0.81;
    b.initialize = function(b) {
      q = b;
      m();
    };
    b.strength = function(f) {
      return arguments.length ? (E = "function" === typeof f ? f : qa(+f), m(), b) : E;
    };
    b.distanceMin = function(f) {
      return arguments.length ? (G = f * f, b) : Math.sqrt(G);
    };
    b.distanceMax = function(f) {
      return arguments.length ? (L = f * f, b) : Math.sqrt(L);
    };
    b.theta = function(f) {
      return arguments.length ? (H = f * f, b) : Math.sqrt(H);
    };
    return b;
  };
  b.forceRadial = function(b, m, u) {
    function f(b) {
      for (var f = 0, n = w.length; f < n; ++f) {
        var q = w[f], B = q.x - m || 1e-6, G = q.y - u || 1e-6, V = Math.sqrt(B * B + G * G);
        V = (A[f] - V) * E[f] * b / V;
        q.vx += B * V;
        q.vy += G * V;
      }
    }
    function q() {
      if (w) {
        var f, m = w.length;
        E = Array(m);
        A = Array(m);
        for (f = 0; f < m; ++f) {
          A[f] = +b(w[f], f, w), E[f] = isNaN(A[f]) ? 0 : +B(w[f], f, w);
        }
      }
    }
    var w, B = qa(0.1), E, A;
    "function" !== typeof b && (b = qa(+b));
    null == m && (m = 0);
    null == u && (u = 0);
    f.initialize = function(b) {
      w = b;
      q();
    };
    f.strength = function(b) {
      return arguments.length ? (B = "function" === typeof b ? b : qa(+b), q(), f) : B;
    };
    f.radius = function(m) {
      return arguments.length ? (b = "function" === typeof m ? m : qa(+m), q(), f) : b;
    };
    f.x = function(b) {
      return arguments.length ? (m = +b, f) : m;
    };
    f.y = function(b) {
      return arguments.length ? (u = +b, f) : u;
    };
    return f;
  };
  b.forceSimulation = function(b) {
    function f() {
      u();
      O.call("tick", w);
      B < E && (M.stop(), O.call("end", w));
    }
    function u(f) {
      var m, n = b.length;
      void 0 === f && (f = 1);
      for (var q = 0; q < f; ++q) {
        for (B += (G - B) * A, H.each(function(b) {
          b(B);
        }), m = 0; m < n; ++m) {
          var u = b[m];
          null == u.fx ? u.x += u.vx *= L : (u.x = u.fx, u.vx = 0);
          null == u.fy ? u.y += u.vy *= L : (u.y = u.fy, u.vy = 0);
        }
      }
      return w;
    }
    function n() {
      for (var f = 0, m = b.length, n; f < m; ++f) {
        n = b[f];
        n.index = f;
        null != n.fx && (n.x = n.fx);
        null != n.fy && (n.y = n.fy);
        if (isNaN(n.x) || isNaN(n.y)) {
          var q = 10 * Math.sqrt(f), u = f * Yt;
          n.x = q * Math.cos(u);
          n.y = q * Math.sin(u);
        }
        if (isNaN(n.vx) || isNaN(n.vy)) {
          n.vx = n.vy = 0;
        }
      }
    }
    function q(f) {
      f.initialize && f.initialize(b);
      return f;
    }
    var w, B = 1, E = 0.001, A = 1 - Math.pow(E, 1 / 300), G = 0, L = 0.6, H = kb(), M = ae(f), O = Hb("tick", "end");
    null == b && (b = []);
    n();
    return w = {tick:u, restart:function() {
      return M.restart(f), w;
    }, stop:function() {
      return M.stop(), w;
    }, nodes:function(f) {
      return arguments.length ? (b = f, n(), H.each(q), w) : b;
    }, alpha:function(b) {
      return arguments.length ? (B = +b, w) : B;
    }, alphaMin:function(b) {
      return arguments.length ? (E = +b, w) : E;
    }, alphaDecay:function(b) {
      return arguments.length ? (A = +b, w) : +A;
    }, alphaTarget:function(b) {
      return arguments.length ? (G = +b, w) : G;
    }, velocityDecay:function(b) {
      return arguments.length ? (L = 1 - b, w) : 1 - L;
    }, force:function(b, f) {
      return 1 < arguments.length ? (null == f ? H.remove(b) : H.set(b, q(f)), w) : H.get(b);
    }, find:function(f, m, n) {
      var q, u = b.length;
      n = null == n ? Infinity : n * n;
      for (q = 0; q < u; ++q) {
        var w = b[q];
        var E = f - w.x;
        var A = m - w.y;
        E = E * E + A * A;
        if (E < n) {
          var B = w;
          n = E;
        }
      }
      return B;
    }, on:function(b, f) {
      return 1 < arguments.length ? (O.on(b, f), w) : O.on(b);
    }};
  };
  b.forceX = function(b) {
    function f(b) {
      for (var f = 0, m = q.length, n; f < m; ++f) {
        n = q[f], n.vx += (B[f] - n.x) * w[f] * b;
      }
    }
    function u() {
      if (q) {
        var f, m = q.length;
        w = Array(m);
        B = Array(m);
        for (f = 0; f < m; ++f) {
          w[f] = isNaN(B[f] = +b(q[f], f, q)) ? 0 : +n(q[f], f, q);
        }
      }
    }
    var n = qa(0.1), q, w, B;
    "function" !== typeof b && (b = qa(null == b ? 0 : +b));
    f.initialize = function(b) {
      q = b;
      u();
    };
    f.strength = function(b) {
      return arguments.length ? (n = "function" === typeof b ? b : qa(+b), u(), f) : n;
    };
    f.x = function(m) {
      return arguments.length ? (b = "function" === typeof m ? m : qa(+m), u(), f) : b;
    };
    return f;
  };
  b.forceY = function(b) {
    function f(b) {
      for (var f = 0, m = q.length, n; f < m; ++f) {
        n = q[f], n.vy += (B[f] - n.y) * w[f] * b;
      }
    }
    function u() {
      if (q) {
        var f, m = q.length;
        w = Array(m);
        B = Array(m);
        for (f = 0; f < m; ++f) {
          w[f] = isNaN(B[f] = +b(q[f], f, q)) ? 0 : +n(q[f], f, q);
        }
      }
    }
    var n = qa(0.1), q, w, B;
    "function" !== typeof b && (b = qa(null == b ? 0 : +b));
    f.initialize = function(b) {
      q = b;
      u();
    };
    f.strength = function(b) {
      return arguments.length ? (n = "function" === typeof b ? b : qa(+b), u(), f) : n;
    };
    f.y = function(m) {
      return arguments.length ? (b = "function" === typeof m ? m : qa(+m), u(), f) : b;
    };
    return f;
  };
  b.formatDefaultLocale = Dj;
  b.formatLocale = zj;
  b.formatSpecifier = Uc;
  b.precisionFixed = Ej;
  b.precisionPrefix = Fj;
  b.precisionRound = Gj;
  b.geoArea = function(b) {
    uf.reset();
    Xa(b, db);
    return 2 * uf;
  };
  b.geoBounds = function(b) {
    var f, u, n;
    Qa = na = -(ma = La = Infinity);
    Ab = [];
    Xa(b, nb);
    if (f = Ab.length) {
      Ab.sort(Iq);
      b = 1;
      var q = Ab[0];
      for (u = [q]; b < f; ++b) {
        var w = Ab[b];
        Wj(q, w[0]) || Wj(q, w[1]) ? (Ma(q[0], w[1]) > Ma(q[0], q[1]) && (q[1] = w[1]), Ma(w[0], q[1]) > Ma(q[0], q[1]) && (q[0] = w[0])) : u.push(q = w);
      }
      var B = -Infinity;
      f = u.length - 1;
      b = 0;
      for (q = u[f]; b <= f; q = w, ++b) {
        w = u[b], (n = Ma(q[1], w[0])) > B && (B = n, ma = w[0], na = q[1]);
      }
    }
    Ab = mb = null;
    return Infinity === ma || Infinity === La ? [[NaN, NaN], [NaN, NaN]] : [[ma, La], [na, Qa]];
  };
  b.geoCentroid = function(b) {
    Xc = Ae = xe = ye = ze = Be = Ce = De = Ag = Bg = Cg = 0;
    Xa(b, Ya);
    b = Ag;
    var f = Bg, u = Cg, n = b * b + f * f + u * u;
    return 1e-12 > n && (b = Be, f = Ce, u = De, 1e-6 > Ae && (b = xe, f = ye, u = ze), n = b * b + f * f + u * u, 1e-12 > n) ? [NaN, NaN] : [Ca(f, b) * fa, Ba(u / oa(n)) * fa];
  };
  b.geoCircle = function() {
    function b() {
      var b = m.apply(this, arguments), f = u.apply(this, arguments) * U, G = n.apply(this, arguments) * U;
      q = [];
      w = Fg(-b[0] * U, -b[1] * U, 0).invert;
      gk(B, f, G, 1);
      b = {type:"Polygon", coordinates:[q]};
      q = w = null;
      return b;
    }
    var m = kc([0, 0]), u = kc(90), n = kc(6), q, w, B = {point:function(b, f) {
      q.push(b = w(b, f));
      b[0] *= fa;
      b[1] *= fa;
    }};
    b.center = function(f) {
      return arguments.length ? (m = "function" === typeof f ? f : kc([+f[0], +f[1]]), b) : m;
    };
    b.radius = function(f) {
      return arguments.length ? (u = "function" === typeof f ? f : kc(+f), b) : u;
    };
    b.precision = function(f) {
      return arguments.length ? (n = "function" === typeof f ? f : kc(+f), b) : n;
    };
    return b;
  };
  b.geoClipAntimeridian = Xg;
  b.geoClipCircle = nk;
  b.geoClipExtent = function() {
    var b = 0, m = 0, u = 960, n = 500, q, w, B;
    return B = {stream:function(f) {
      return q && w === f ? q : q = Ge(b, m, u, n)(w = f);
    }, extent:function(f) {
      return arguments.length ? (b = +f[0][0], m = +f[0][1], u = +f[1][0], n = +f[1][1], q = w = null, B) : [[b, m], [u, n]];
    }};
  };
  b.geoClipRectangle = Ge;
  b.geoContains = function(b, m) {
    return (b && Qm.hasOwnProperty(b.type) ? Qm[b.type] : Je)(b, m);
  };
  b.geoDistance = mc;
  b.geoGraticule = vk;
  b.geoGraticule10 = function() {
    return vk()();
  };
  b.geoInterpolate = function(b, m) {
    var f = b[0] * U, n = b[1] * U;
    b = m[0] * U;
    m = m[1] * U;
    var q = W(n), w = R(n), B = W(m), E = R(m), A = q * W(f), G = q * R(f), L = B * W(b), H = B * R(b), M = 2 * Ba(oa(Jj(m - n) + q * B * Jj(b - f))), O = R(M);
    b = M ? function(b) {
      var f = R(b *= M) / O, m = R(M - b) / O;
      b = m * A + f * L;
      var n = m * G + f * H;
      f = m * w + f * E;
      return [Ca(n, b) * fa, Ca(f, oa(b * b + n * n)) * fa];
    } : function() {
      return [f * fa, n * fa];
    };
    b.distance = M;
    return b;
  };
  b.geoLength = ok;
  b.geoPath = function(b, m) {
    function f(b) {
      b && ("function" === typeof n && w.pointRadius(+n.apply(this, arguments)), Xa(b, q(w)));
      return w.result();
    }
    var n = 4.5, q, w;
    f.area = function(b) {
      Xa(b, q(ob));
      return ob.result();
    };
    f.measure = function(b) {
      Xa(b, q($c));
      return $c.result();
    };
    f.bounds = function(b) {
      Xa(b, q(Ne));
      return Ne.result();
    };
    f.centroid = function(b) {
      Xa(b, q(Ra));
      return Ra.result();
    };
    f.projection = function(m) {
      return arguments.length ? (q = null == m ? (b = null, Qb) : (b = m).stream, f) : b;
    };
    f.context = function(b) {
      if (!arguments.length) {
        return m;
      }
      w = null == b ? (m = null, new Ik) : new Ek(m = b);
      "function" !== typeof n && w.pointRadius(n);
      return f;
    };
    f.pointRadius = function(b) {
      if (!arguments.length) {
        return n;
      }
      n = "function" === typeof b ? b : (w.pointRadius(+b), +b);
      return f;
    };
    return f.projection(b).context(m);
  };
  b.geoAlbers = Ok;
  b.geoAlbersUsa = function() {
    function b(b) {
      var f = b[0];
      b = b[1];
      return L = null, (w.point(f, b), L) || (E.point(f, b), L) || (G.point(f, b), L);
    }
    function m() {
      u = n = null;
      return b;
    }
    var u, n, q = Ok(), w, B = Oe().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), E, A = Oe().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), G, L, H = {point:function(b, f) {
      L = [b, f];
    }};
    b.invert = function(b) {
      var f = q.scale(), m = q.translate(), n = (b[0] - m[0]) / f;
      f = (b[1] - m[1]) / f;
      return (0.120 <= f && 0.234 > f && -0.425 <= n && -0.214 > n ? B : 0.166 <= f && 0.234 > f && -0.214 <= n && -0.115 > n ? A : q).invert(b);
    };
    b.stream = function(b) {
      return u && n === b ? u : u = jr([q.stream(n = b), B.stream(b), A.stream(b)]);
    };
    b.precision = function(b) {
      if (!arguments.length) {
        return q.precision();
      }
      q.precision(b);
      B.precision(b);
      A.precision(b);
      return m();
    };
    b.scale = function(f) {
      if (!arguments.length) {
        return q.scale();
      }
      q.scale(f);
      B.scale(0.35 * f);
      A.scale(f);
      return b.translate(q.translate());
    };
    b.translate = function(b) {
      if (!arguments.length) {
        return q.translate();
      }
      var f = q.scale(), n = +b[0], u = +b[1];
      w = q.translate(b).clipExtent([[n - 0.455 * f, u - 0.238 * f], [n + 0.455 * f, u + 0.238 * f]]).stream(H);
      E = B.translate([n - 0.307 * f, u + 0.201 * f]).clipExtent([[n - 0.425 * f + 1e-6, u + 0.120 * f + 1e-6], [n - 0.214 * f - 1e-6, u + 0.234 * f - 1e-6]]).stream(H);
      G = A.translate([n - 0.205 * f, u + 0.212 * f]).clipExtent([[n - 0.214 * f + 1e-6, u + 0.166 * f + 1e-6], [n - 0.115 * f - 1e-6, u + 0.234 * f - 1e-6]]).stream(H);
      return m();
    };
    b.fitExtent = function(f, m) {
      return oc(b, f, m);
    };
    b.fitSize = function(f, m) {
      return oc(b, [[0, 0], f], m);
    };
    b.fitWidth = function(f, m) {
      return Ug(b, f, m);
    };
    b.fitHeight = function(f, m) {
      return Vg(b, f, m);
    };
    return b.scale(1070);
  };
  b.geoAzimuthalEqualArea = function() {
    return gb(Uh).scale(124.75).clipAngle(179.999);
  };
  b.geoAzimuthalEqualAreaRaw = Uh;
  b.geoAzimuthalEquidistant = function() {
    return gb(Vh).scale(79.4188).clipAngle(179.999);
  };
  b.geoAzimuthalEquidistantRaw = Vh;
  b.geoConicConformal = function() {
    return Yg(Rk).scale(109.5).parallels([30, 30]);
  };
  b.geoConicConformalRaw = Rk;
  b.geoConicEqualArea = Oe;
  b.geoConicEqualAreaRaw = Nk;
  b.geoConicEquidistant = function() {
    return Yg(Sk).scale(131.154).center([0, 13.9389]);
  };
  b.geoConicEquidistantRaw = Sk;
  b.geoEqualEarth = function() {
    return gb($g).scale(177.158);
  };
  b.geoEqualEarthRaw = $g;
  b.geoEquirectangular = function() {
    return gb(gd).scale(152.63);
  };
  b.geoEquirectangularRaw = gd;
  b.geoGnomonic = function() {
    return gb(ah).scale(144.049).clipAngle(60);
  };
  b.geoGnomonicRaw = ah;
  b.geoIdentity = function() {
    function b() {
      M = O = null;
      return Q;
    }
    var m = 1, u = 0, n = 0, q = 1, w = 1, B = Qb, E = null, A, G, L, H = Qb, M, O, Q;
    return Q = {stream:function(b) {
      return M && O === b ? M : M = B(H(O = b));
    }, postclip:function(f) {
      return arguments.length ? (H = f, E = A = G = L = null, b()) : H;
    }, clipExtent:function(f) {
      return arguments.length ? (H = null == f ? (E = A = G = L = null, Qb) : Ge(E = +f[0][0], A = +f[0][1], G = +f[1][0], L = +f[1][1]), b()) : null == E ? null : [[E, A], [G, L]];
    }, scale:function(f) {
      return arguments.length ? (B = Re((m = +f) * q, m * w, u, n), b()) : m;
    }, translate:function(f) {
      return arguments.length ? (B = Re(m * q, m * w, u = +f[0], n = +f[1]), b()) : [u, n];
    }, reflectX:function(f) {
      return arguments.length ? (B = Re(m * (q = f ? -1 : 1), m * w, u, n), b()) : 0 > q;
    }, reflectY:function(f) {
      return arguments.length ? (B = Re(m * q, m * (w = f ? -1 : 1), u, n), b()) : 0 > w;
    }, fitExtent:function(b, f) {
      return oc(Q, b, f);
    }, fitSize:function(b, f) {
      return oc(Q, [[0, 0], b], f);
    }, fitWidth:function(b, f) {
      return Ug(Q, b, f);
    }, fitHeight:function(b, f) {
      return Vg(Q, b, f);
    }};
  };
  b.geoProjection = gb;
  b.geoProjectionMutator = Wg;
  b.geoMercator = function() {
    return Qk(fd).scale(961 / Ja);
  };
  b.geoMercatorRaw = fd;
  b.geoNaturalEarth1 = function() {
    return gb(bh).scale(175.295);
  };
  b.geoNaturalEarth1Raw = bh;
  b.geoOrthographic = function() {
    return gb(ch).scale(249.5).clipAngle(90.000001);
  };
  b.geoOrthographicRaw = ch;
  b.geoStereographic = function() {
    return gb(dh).scale(250).clipAngle(142);
  };
  b.geoStereographicRaw = dh;
  b.geoTransverseMercator = function() {
    var b = Qk(eh), m = b.center, u = b.rotate;
    b.center = function(b) {
      return arguments.length ? m([-b[1], b[0]]) : (b = m(), [b[1], -b[0]]);
    };
    b.rotate = function(b) {
      return arguments.length ? u([b[0], b[1], 2 < b.length ? b[2] + 90 : 90]) : (b = u(), [b[0], b[1], b[2] - 90]);
    };
    return u([0, 0, 90]).scale(159.155);
  };
  b.geoTransverseMercatorRaw = eh;
  b.geoRotation = fk;
  b.geoStream = Xa;
  b.geoTransform = function(b) {
    return {stream:cd(b)};
  };
  b.cluster = function() {
    function b(b) {
      var f, w = 0;
      b.eachAfter(function(b) {
        var n = b.children;
        if (n) {
          var q = n.reduce(lr, 0) / n.length;
          b.x = q;
          b.y = 1 + n.reduce(mr, 0);
        } else {
          b.x = f ? w += m(b, f) : 0, b.y = 0, f = b;
        }
      });
      var A = nr(b), G = or(b), L = A.x - m(A, G) / 2, H = G.x + m(G, A) / 2;
      return b.eachAfter(q ? function(f) {
        f.x = (f.x - b.x) * u;
        f.y = (b.y - f.y) * n;
      } : function(f) {
        f.x = (f.x - L) / (H - L) * u;
        f.y = (1 - (b.y ? f.y / b.y : 1)) * n;
      });
    }
    var m = kr, u = 1, n = 1, q = !1;
    b.separation = function(f) {
      return arguments.length ? (m = f, b) : m;
    };
    b.size = function(f) {
      return arguments.length ? (q = !1, u = +f[0], n = +f[1], b) : q ? null : [u, n];
    };
    b.nodeSize = function(f) {
      return arguments.length ? (q = !0, u = +f[0], n = +f[1], b) : q ? [u, n] : null;
    };
    return b;
  };
  b.hierarchy = fh;
  b.pack = function() {
    function b(b) {
      b.x = u / 2;
      b.y = n / 2;
      m ? b.eachBefore(al(m)).eachAfter(hh(q, 0.5)).eachBefore(bl(1)) : b.eachBefore(al(tr)).eachAfter(hh(Sb, 1)).eachAfter(hh(q, b.r / Math.min(u, n))).eachBefore(bl(Math.min(u, n) / (2 * b.r)));
      return b;
    }
    var m = null, u = 1, n = 1, q = Sb;
    b.radius = function(f) {
      return arguments.length ? (m = null == f ? null : Ue(f), b) : m;
    };
    b.size = function(f) {
      return arguments.length ? (u = +f[0], n = +f[1], b) : [u, n];
    };
    b.padding = function(f) {
      return arguments.length ? (q = "function" === typeof f ? f : sc(+f), b) : q;
    };
    return b;
  };
  b.packSiblings = function(b) {
    $k(b);
    return b;
  };
  b.packEnclose = Uk;
  b.partition = function() {
    function b(b) {
      var f = b.height + 1;
      b.x0 = b.y0 = q;
      b.x1 = u;
      b.y1 = n / f;
      b.eachBefore(m(n, f));
      w && b.eachBefore(cl);
      return b;
    }
    function m(b, f) {
      return function(m) {
        m.children && id(m, m.x0, b * (m.depth + 1) / f, m.x1, b * (m.depth + 2) / f);
        var n = m.x0, u = m.y0, w = m.x1 - q, A = m.y1 - q;
        w < n && (n = w = (n + w) / 2);
        A < u && (u = A = (u + A) / 2);
        m.x0 = n;
        m.y0 = u;
        m.x1 = w;
        m.y1 = A;
      };
    }
    var u = 1, n = 1, q = 0, w = !1;
    b.round = function(f) {
      return arguments.length ? (w = !!f, b) : w;
    };
    b.size = function(f) {
      return arguments.length ? (u = +f[0], n = +f[1], b) : [u, n];
    };
    b.padding = function(f) {
      return arguments.length ? (q = +f, b) : q;
    };
    return b;
  };
  b.stratify = function() {
    function b(b) {
      var f, n = b.length, B = Array(n), E, A = {};
      for (f = 0; f < n; ++f) {
        var G = b[f];
        var L = B[f] = new rc(G);
        null != (E = m(G, f, b)) && (E += "") && (G = "$" + (L.id = E), A[G] = G in A ? Rm : L);
      }
      for (f = 0; f < n; ++f) {
        if (L = B[f], E = u(b[f], f, b), null != E && (E += "")) {
          G = A["$" + E];
          if (!G) {
            throw Error("missing: " + E);
          }
          if (G === Rm) {
            throw Error("ambiguous: " + E);
          }
          G.children ? G.children.push(L) : G.children = [L];
          L.parent = G;
        } else {
          if (H) {
            throw Error("multiple roots");
          }
          var H = L;
        }
      }
      if (!H) {
        throw Error("no root");
      }
      H.parent = Zt;
      H.eachBefore(function(b) {
        b.depth = b.parent.depth + 1;
        --n;
      }).eachBefore(Tk);
      H.parent = null;
      if (0 < n) {
        throw Error("cycle");
      }
      return H;
    }
    var m = ur, u = vr;
    b.id = function(f) {
      return arguments.length ? (m = Ue(f), b) : m;
    };
    b.parentId = function(f) {
      return arguments.length ? (u = Ue(f), b) : u;
    };
    return b;
  };
  b.tree = function() {
    function b(b) {
      var f = xr(b);
      f.eachAfter(m);
      f.parent.m = -f.z;
      f.eachBefore(u);
      if (E) {
        b.eachBefore(n);
      } else {
        var A = b, H = b, M = b;
        b.eachBefore(function(b) {
          b.x < A.x && (A = b);
          b.x > H.x && (H = b);
          b.depth > M.depth && (M = b);
        });
        f = A === H ? 1 : q(A, H) / 2;
        var O = f - A.x, Q = w / (H.x + f + O), V = B / (M.depth || 1);
        b.eachBefore(function(b) {
          b.x = (b.x + O) * Q;
          b.y = b.depth * V;
        });
      }
      return b;
    }
    function m(b) {
      var f = b.children, m = b.parent.children, n = b.i ? m[b.i - 1] : null;
      if (f) {
        for (var u = 0, w = 0, A = b.children, B = A.length, E; 0 <= --B;) {
          E = A[B], E.z += u, E.m += u, u += E.s + (w += E.c);
        }
        f = (f[0].z + f[f.length - 1].z) / 2;
        n ? (b.z = n.z + q(b._, n._), b.m = b.z - f) : b.z = f;
      } else {
        n && (b.z = n.z + q(b._, n._));
      }
      f = b.parent;
      m = b.parent.A || m[0];
      if (n) {
        w = u = b;
        A = u.parent.children[0];
        B = u.m;
        E = w.m;
        for (var T = n.m, Y = A.m, R; n = jh(n), u = ih(u), n && u;) {
          A = ih(A);
          w = jh(w);
          w.a = b;
          R = n.z + T - u.z - B + q(n._, u._);
          if (0 < R) {
            var W = n.a.parent === b.parent ? n.a : m, U = b, aa = R, Z = aa / (U.i - W.i);
            U.c -= Z;
            U.s += aa;
            W.c += Z;
            U.z += aa;
            U.m += aa;
            B += R;
            E += R;
          }
          T += n.m;
          B += u.m;
          Y += A.m;
          E += w.m;
        }
        n && !jh(w) && (w.t = n, w.m += T - E);
        u && !ih(A) && (A.t = u, A.m += B - Y, m = b);
      }
      f.A = m;
    }
    function u(b) {
      b._.x = b.z + b.parent.m;
      b.m += b.parent.m;
    }
    function n(b) {
      b.x *= w;
      b.y = b.depth * B;
    }
    var q = wr, w = 1, B = 1, E = null;
    b.separation = function(f) {
      return arguments.length ? (q = f, b) : q;
    };
    b.size = function(f) {
      return arguments.length ? (E = !1, w = +f[0], B = +f[1], b) : E ? null : [w, B];
    };
    b.nodeSize = function(f) {
      return arguments.length ? (E = !0, w = +f[0], B = +f[1], b) : E ? [w, B] : null;
    };
    return b;
  };
  b.treemap = function() {
    function b(b) {
      b.x0 = b.y0 = 0;
      b.x1 = q;
      b.y1 = w;
      b.eachBefore(m);
      B = [0];
      n && b.eachBefore(cl);
      return b;
    }
    function m(b) {
      var f = B[b.depth], m = b.x0 + f, n = b.y0 + f, q = b.x1 - f, w = b.y1 - f;
      q < m && (m = q = (m + q) / 2);
      w < n && (n = w = (n + w) / 2);
      b.x0 = m;
      b.y0 = n;
      b.x1 = q;
      b.y1 = w;
      b.children && (f = B[b.depth + 1] = E(b) / 2, m += H(b) - f, n += A(b) - f, q -= G(b) - f, w -= L(b) - f, q < m && (m = q = (m + q) / 2), w < n && (n = w = (n + w) / 2), u(b, m, n, q, w));
    }
    var u = Tm, n = !1, q = 1, w = 1, B = [0], E = Sb, A = Sb, G = Sb, L = Sb, H = Sb;
    b.round = function(f) {
      return arguments.length ? (n = !!f, b) : n;
    };
    b.size = function(f) {
      return arguments.length ? (q = +f[0], w = +f[1], b) : [q, w];
    };
    b.tile = function(f) {
      return arguments.length ? (u = Ue(f), b) : u;
    };
    b.padding = function(f) {
      return arguments.length ? b.paddingInner(f).paddingOuter(f) : b.paddingInner();
    };
    b.paddingInner = function(f) {
      return arguments.length ? (E = "function" === typeof f ? f : sc(+f), b) : E;
    };
    b.paddingOuter = function(f) {
      return arguments.length ? b.paddingTop(f).paddingRight(f).paddingBottom(f).paddingLeft(f) : b.paddingTop();
    };
    b.paddingTop = function(f) {
      return arguments.length ? (A = "function" === typeof f ? f : sc(+f), b) : A;
    };
    b.paddingRight = function(f) {
      return arguments.length ? (G = "function" === typeof f ? f : sc(+f), b) : G;
    };
    b.paddingBottom = function(f) {
      return arguments.length ? (L = "function" === typeof f ? f : sc(+f), b) : L;
    };
    b.paddingLeft = function(f) {
      return arguments.length ? (H = "function" === typeof f ? f : sc(+f), b) : H;
    };
    return b;
  };
  b.treemapBinary = function(b, m, u, n, q) {
    function f(b, m, n, q, u, w, A) {
      if (b >= m - 1) {
        b = B[b], b.x0 = q, b.y0 = u, b.x1 = w, b.y1 = A;
      } else {
        for (var E = L[b], G = n / 2 + E, H = b + 1, M = m - 1; H < M;) {
          var O = H + M >>> 1;
          L[O] < G ? H = O + 1 : M = O;
        }
        G - L[H - 1] < L[H] - G && b + 1 < H && --H;
        E = L[H] - E;
        G = n - E;
        w - q > A - u ? (n = (q * G + w * E) / n, f(b, H, E, q, u, n, A), f(H, m, G, n, u, w, A)) : (n = (u * G + A * E) / n, f(b, H, E, q, u, w, n), f(H, m, G, q, n, w, A));
      }
    }
    var B = b.children, E, A = B.length, G, L = Array(A + 1);
    for (L[0] = G = E = 0; E < A; ++E) {
      L[E + 1] = G += B[E].value;
    }
    f(0, A, b.value, m, u, n, q);
  };
  b.treemapDice = id;
  b.treemapSlice = We;
  b.treemapSliceDice = function(b, m, u, n, q) {
    (b.depth & 1 ? We : id)(b, m, u, n, q);
  };
  b.treemapSquarify = Tm;
  b.treemapResquarify = $t;
  b.interpolate = Kc;
  b.interpolateArray = Li;
  b.interpolateBasis = Hi;
  b.interpolateBasisClosed = Ii;
  b.interpolateDate = Mi;
  b.interpolateDiscrete = function(b) {
    var f = b.length;
    return function(m) {
      return b[Math.max(0, Math.min(f - 1, Math.floor(m * f)))];
    };
  };
  b.interpolateHue = function(b, m) {
    var f = Zd(+b, +m);
    return function(b) {
      b = f(b);
      return b - 360 * Math.floor(b / 360);
    };
  };
  b.interpolateNumber = Pa;
  b.interpolateObject = Ni;
  b.interpolateRound = Oi;
  b.interpolateString = Zf;
  b.interpolateTransformCss = Bm;
  b.interpolateTransformSvg = Cm;
  b.interpolateZoom = Ti;
  b.interpolateRgb = Lc;
  b.interpolateRgbBasis = Sl;
  b.interpolateRgbBasisClosed = ut;
  b.interpolateHsl = vt;
  b.interpolateHslLong = wt;
  b.interpolateLab = function(b, m) {
    var f = sa((b = Wd(b)).l, (m = Wd(m)).l), n = sa(b.a, m.a), q = sa(b.b, m.b), w = sa(b.opacity, m.opacity);
    return function(m) {
      b.l = f(m);
      b.a = n(m);
      b.b = q(m);
      b.opacity = w(m);
      return b + "";
    };
  };
  b.interpolateHcl = xt;
  b.interpolateHclLong = yt;
  b.interpolateCubehelix = zt;
  b.interpolateCubehelixLong = rf;
  b.piecewise = function(b, m) {
    for (var f = 0, n = m.length - 1, q = m[0], w = Array(0 > n ? 0 : n); f < n;) {
      w[f] = b(q, q = m[++f]);
    }
    return function(b) {
      var f = Math.max(0, Math.min(n - 1, Math.floor(b *= n)));
      return w[f](b - f);
    };
  };
  b.quantize = function(b, m) {
    for (var f = Array(m), n = 0; n < m; ++n) {
      f[n] = b(n / (m - 1));
    }
    return f;
  };
  b.path = xb;
  b.polygonArea = function(b) {
    for (var f = -1, u = b.length, n, q = b[u - 1], w = 0; ++f < u;) {
      n = q, q = b[f], w += n[1] * q[0] - n[0] * q[1];
    }
    return w / 2;
  };
  b.polygonCentroid = function(b) {
    for (var f = -1, u = b.length, n = 0, q = 0, w, B = b[u - 1], E, A = 0; ++f < u;) {
      w = B, B = b[f], A += E = w[0] * B[1] - B[0] * w[1], n += (w[0] + B[0]) * E, q += (w[1] + B[1]) * E;
    }
    return A *= 3, [n / A, q / A];
  };
  b.polygonHull = function(b) {
    if (3 > (u = b.length)) {
      return null;
    }
    var f, u, n = Array(u), q = Array(u);
    for (f = 0; f < u; ++f) {
      n[f] = [+b[f][0], +b[f][1], f];
    }
    n.sort(zr);
    for (f = 0; f < u; ++f) {
      q[f] = [n[f][0], -n[f][1]];
    }
    u = el(n);
    q = el(q);
    var w = q[0] === u[0], B = q[q.length - 1] === u[u.length - 1], E = [];
    for (f = u.length - 1; 0 <= f; --f) {
      E.push(b[n[u[f]][2]]);
    }
    for (f = +w; f < q.length - B; ++f) {
      E.push(b[n[q[f]][2]]);
    }
    return E;
  };
  b.polygonContains = function(b, m) {
    var f = b.length, n = b[f - 1], q = m[0];
    m = m[1];
    for (var w = n[0], B = n[1], E, A = !1, G = 0; G < f; ++G) {
      n = b[G], E = n[0], n = n[1], n > m !== B > m && q < (w - E) * (m - n) / (B - n) + E && (A = !A), w = E, B = n;
    }
    return A;
  };
  b.polygonLength = function(b) {
    var f = -1, u = b.length, n = b[u - 1], q = n[0];
    n = n[1];
    for (var w = 0; ++f < u;) {
      var B = q;
      var E = n;
      n = b[f];
      q = n[0];
      n = n[1];
      B -= q;
      E -= n;
      w += Math.sqrt(B * B + E * E);
    }
    return w;
  };
  b.quadtree = ne;
  b.randomUniform = au;
  b.randomNormal = Um;
  b.randomLogNormal = bu;
  b.randomBates = cu;
  b.randomIrwinHall = Vm;
  b.randomExponential = du;
  b.scaleBand = mh;
  b.scalePoint = function() {
    return fl(mh.apply(null, arguments).paddingInner(1));
  };
  b.scaleIdentity = ll;
  b.scaleLinear = kl;
  b.scaleLog = ql;
  b.scaleSymlog = tl;
  b.scaleOrdinal = kh;
  b.scaleImplicit = lh;
  b.scalePow = sh;
  b.scaleSqrt = function() {
    return sh.apply(null, arguments).exponent(0.5);
  };
  b.scaleQuantile = vl;
  b.scaleQuantize = wl;
  b.scaleThreshold = xl;
  b.scaleTime = function() {
    return Za.apply(vh(qb, Yh, rd, od, Xh, Wh, Hd, Yb, b.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
  };
  b.scaleUtc = function() {
    return Za.apply(vh(rb, ai, td, md, $h, Zh, Hd, Yb, b.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
  };
  b.scaleSequential = Ll;
  b.scaleSequentialLog = Ml;
  b.scaleSequentialPow = xh;
  b.scaleSequentialSqrt = function() {
    return xh.apply(null, arguments).exponent(0.5);
  };
  b.scaleSequentialSymlog = Nl;
  b.scaleSequentialQuantile = Ol;
  b.scaleDiverging = Pl;
  b.scaleDivergingLog = Ql;
  b.scaleDivergingPow = yh;
  b.scaleDivergingSqrt = function() {
    return yh.apply(null, arguments).exponent(0.5);
  };
  b.scaleDivergingSymlog = Rl;
  b.tickFormat = jl;
  b.schemeCategory10 = Cu;
  b.schemeAccent = Du;
  b.schemeDark2 = Eu;
  b.schemePaired = Fu;
  b.schemePastel1 = Gu;
  b.schemePastel2 = Hu;
  b.schemeSet1 = Iu;
  b.schemeSet2 = Ju;
  b.schemeSet3 = Ku;
  b.interpolateBrBG = Lu;
  b.schemeBrBG = jn;
  b.interpolatePRGn = Mu;
  b.schemePRGn = kn;
  b.interpolatePiYG = Nu;
  b.schemePiYG = ln;
  b.interpolatePuOr = Ou;
  b.schemePuOr = mn;
  b.interpolateRdBu = Pu;
  b.schemeRdBu = nn;
  b.interpolateRdGy = Qu;
  b.schemeRdGy = on;
  b.interpolateRdYlBu = Ru;
  b.schemeRdYlBu = pn;
  b.interpolateRdYlGn = Su;
  b.schemeRdYlGn = qn;
  b.interpolateSpectral = Tu;
  b.schemeSpectral = rn;
  b.interpolateBuGn = Uu;
  b.schemeBuGn = sn;
  b.interpolateBuPu = Vu;
  b.schemeBuPu = tn;
  b.interpolateGnBu = Wu;
  b.schemeGnBu = un;
  b.interpolateOrRd = Xu;
  b.schemeOrRd = vn;
  b.interpolatePuBuGn = Yu;
  b.schemePuBuGn = wn;
  b.interpolatePuBu = Zu;
  b.schemePuBu = xn;
  b.interpolatePuRd = $u;
  b.schemePuRd = yn;
  b.interpolateRdPu = av;
  b.schemeRdPu = zn;
  b.interpolateYlGnBu = bv;
  b.schemeYlGnBu = An;
  b.interpolateYlGn = cv;
  b.schemeYlGn = Bn;
  b.interpolateYlOrBr = dv;
  b.schemeYlOrBr = Cn;
  b.interpolateYlOrRd = ev;
  b.schemeYlOrRd = Dn;
  b.interpolateBlues = fv;
  b.schemeBlues = En;
  b.interpolateGreens = gv;
  b.schemeGreens = Fn;
  b.interpolateGreys = hv;
  b.schemeGreys = Gn;
  b.interpolatePurples = iv;
  b.schemePurples = Hn;
  b.interpolateReds = jv;
  b.schemeReds = In;
  b.interpolateOranges = kv;
  b.schemeOranges = Jn;
  b.interpolateCubehelixDefault = lv;
  b.interpolateRainbow = function(b) {
    if (0 > b || 1 < b) {
      b -= Math.floor(b);
    }
    var f = Math.abs(b - 0.5);
    xf.h = 360 * b - 100;
    xf.s = 1.5 - 1.5 * f;
    xf.l = 0.8 - 0.9 * f;
    return xf + "";
  };
  b.interpolateWarm = mv;
  b.interpolateCool = nv;
  b.interpolateSinebow = function(b) {
    var f;
    b = (0.5 - b) * Math.PI;
    yf.r = 255 * (f = Math.sin(b)) * f;
    yf.g = 255 * (f = Math.sin(b + ov)) * f;
    yf.b = 255 * (f = Math.sin(b + pv)) * f;
    return yf + "";
  };
  b.interpolateViridis = qv;
  b.interpolateMagma = rv;
  b.interpolateInferno = sv;
  b.interpolatePlasma = tv;
  b.create = function(b) {
    return Ha(Nd(b).call(document.documentElement));
  };
  b.creator = Nd;
  b.local = vi;
  b.matcher = Kf;
  b.mouse = ub;
  b.namespace = Hc;
  b.namespaces = If;
  b.clientPoint = Qd;
  b.select = Ha;
  b.selectAll = function(b) {
    return "string" === typeof b ? new za([document.querySelectorAll(b)], [document.documentElement]) : new za([null == b ? [] : b], Nf);
  };
  b.selection = Jb;
  b.selector = Od;
  b.selectorAll = Jf;
  b.style = Ib;
  b.touch = Rd;
  b.touches = function(b, m) {
    null == m && (m = Pf().touches);
    for (var f = 0, n = m ? m.length : 0, q = Array(n); f < n; ++f) {
      q[f] = Qd(b, m[f]);
    }
    return q;
  };
  b.window = Lf;
  b.customEvent = Ic;
  b.arc = function() {
    function b() {
      var b, f = +m.apply(this, arguments), H = +u.apply(this, arguments), M = w.apply(this, arguments) - cf, O = B.apply(this, arguments) - cf, Q = Kn(O - M), V = O > M;
      A || (A = b = xb());
      if (H < f) {
        var R = H;
        H = f;
        f = R;
      }
      if (1e-12 < H) {
        if (Q > Fb - 1e-12) {
          A.moveTo(H * Zb(M), H * hb(M)), A.arc(0, 0, H, M, O, !V), 1e-12 < f && (A.moveTo(f * Zb(O), f * hb(O)), A.arc(0, 0, f, O, M, V));
        } else {
          var T = M, Y = O;
          R = M;
          var W = O, U = Q, aa = Q, Z = E.apply(this, arguments) / 2, ca = 1e-12 < Z && (q ? +q.apply(this, arguments) : vc(f * f + H * H)), ea = bi(Kn(H - f) / 2, +n.apply(this, arguments)), da = ea, ba = ea;
          if (1e-12 < ca) {
            var $a = Tl(ca / f * hb(Z));
            Z = Tl(ca / H * hb(Z));
            1e-12 < (U -= 2 * $a) ? ($a *= V ? 1 : -1, R += $a, W -= $a) : (U = 0, R = W = (M + O) / 2);
            1e-12 < (aa -= 2 * Z) ? (Z *= V ? 1 : -1, T += Z, Y -= Z) : (aa = 0, T = Y = (M + O) / 2);
          }
          M = H * Zb(T);
          O = H * hb(T);
          $a = f * Zb(W);
          Z = f * hb(W);
          if (1e-12 < ea) {
            var Id = H * Zb(Y), Jd = H * hb(Y), gi = f * Zb(R), fi = f * hb(R);
            if (Q = Q < Eb) {
              var ta = gi - M;
              Q = fi - O;
              ca = $a - Id;
              var ha = Z - Jd, fa = ha * ta - ca * Q;
              1e-12 > fa * fa ? ta = void 0 : (fa = (ca * (O - Jd) - ha * (M - Id)) / fa, ta = [M + fa * ta, O + fa * Q]);
              Q = ta;
            }
            Q && (da = M - ta[0], ba = O - ta[1], Q = Id - ta[0], ca = Jd - ta[1], da = (da * Q + ba * ca) / (vc(da * da + ba * ba) * vc(Q * Q + ca * ca)), ba = 1 / hb((1 < da ? 0 : -1 > da ? Eb : Math.acos(da)) / 2), ta = vc(ta[0] * ta[0] + ta[1] * ta[1]), da = bi(ea, (f - ta) / (ba - 1)), ba = bi(ea, (H - ta) / (ba + 1)));
          }
          1e-12 < aa ? 1e-12 < ba ? (T = df(gi, fi, M, O, H, ba, V), Y = df(Id, Jd, $a, Z, H, ba, V), A.moveTo(T.cx + T.x01, T.cy + T.y01), ba < ea ? A.arc(T.cx, T.cy, ba, ya(T.y01, T.x01), ya(Y.y01, Y.x01), !V) : (A.arc(T.cx, T.cy, ba, ya(T.y01, T.x01), ya(T.y11, T.x11), !V), A.arc(0, 0, H, ya(T.cy + T.y11, T.cx + T.x11), ya(Y.cy + Y.y11, Y.cx + Y.x11), !V), A.arc(Y.cx, Y.cy, ba, ya(Y.y11, Y.x11), ya(Y.y01, Y.x01), !V))) : (A.moveTo(M, O), A.arc(0, 0, H, T, Y, !V)) : A.moveTo(M, O);
          1e-12 < f && 1e-12 < U ? 1e-12 < da ? (T = df($a, Z, Id, Jd, f, -da, V), Y = df(M, O, gi, fi, f, -da, V), A.lineTo(T.cx + T.x01, T.cy + T.y01), da < ea ? A.arc(T.cx, T.cy, da, ya(T.y01, T.x01), ya(Y.y01, Y.x01), !V) : (A.arc(T.cx, T.cy, da, ya(T.y01, T.x01), ya(T.y11, T.x11), !V), A.arc(0, 0, f, ya(T.cy + T.y11, T.cx + T.x11), ya(Y.cy + Y.y11, Y.cx + Y.x11), V), A.arc(Y.cx, Y.cy, da, ya(Y.y11, Y.x11), ya(Y.y01, Y.x01), !V))) : A.arc(0, 0, f, W, R, V) : A.lineTo($a, Z);
        }
      } else {
        A.moveTo(0, 0);
      }
      A.closePath();
      if (b) {
        return A = null, b + "" || null;
      }
    }
    var m = Ns, u = Os, n = Z(0), q = null, w = Ps, B = Qs, E = Rs, A = null;
    b.centroid = function() {
      var b = (+m.apply(this, arguments) + +u.apply(this, arguments)) / 2, f = (+w.apply(this, arguments) + +B.apply(this, arguments)) / 2 - Eb / 2;
      return [Zb(f) * b, hb(f) * b];
    };
    b.innerRadius = function(f) {
      return arguments.length ? (m = "function" === typeof f ? f : Z(+f), b) : m;
    };
    b.outerRadius = function(f) {
      return arguments.length ? (u = "function" === typeof f ? f : Z(+f), b) : u;
    };
    b.cornerRadius = function(f) {
      return arguments.length ? (n = "function" === typeof f ? f : Z(+f), b) : n;
    };
    b.padRadius = function(f) {
      return arguments.length ? (q = null == f ? null : "function" === typeof f ? f : Z(+f), b) : q;
    };
    b.startAngle = function(f) {
      return arguments.length ? (w = "function" === typeof f ? f : Z(+f), b) : w;
    };
    b.endAngle = function(f) {
      return arguments.length ? (B = "function" === typeof f ? f : Z(+f), b) : B;
    };
    b.padAngle = function(f) {
      return arguments.length ? (E = "function" === typeof f ? f : Z(+f), b) : E;
    };
    b.context = function(f) {
      return arguments.length ? (A = null == f ? null : f, b) : A;
    };
    return b;
  };
  b.area = Vl;
  b.line = Bh;
  b.pie = function() {
    function b(b) {
      var f, E = b.length;
      var L = 0;
      var H = Array(E), M = Array(E), O = +q.apply(this, arguments);
      var Q = Math.min(Fb, Math.max(-Fb, w.apply(this, arguments) - O));
      var V = Math.min(Math.abs(Q) / E, B.apply(this, arguments)), R = V * (0 > Q ? -1 : 1), T;
      for (f = 0; f < E; ++f) {
        0 < (T = M[H[f] = f] = +m(b[f], f, b)) && (L += T);
      }
      null != u ? H.sort(function(b, f) {
        return u(M[b], M[f]);
      }) : null != n && H.sort(function(f, m) {
        return n(b[f], b[m]);
      });
      f = 0;
      for (Q = L ? (Q - E * R) / L : 0; f < E; ++f, O = Y) {
        L = H[f];
        T = M[L];
        var Y = O + (0 < T ? T * Q : 0) + R;
        M[L] = {data:b[L], index:f, value:T, startAngle:O, endAngle:Y, padAngle:V};
      }
      return M;
    }
    var m = Us, u = Ts, n = null, q = Z(0), w = Z(Fb), B = Z(0);
    b.value = function(f) {
      return arguments.length ? (m = "function" === typeof f ? f : Z(+f), b) : m;
    };
    b.sortValues = function(f) {
      return arguments.length ? (u = f, n = null, b) : u;
    };
    b.sort = function(f) {
      return arguments.length ? (n = f, u = null, b) : n;
    };
    b.startAngle = function(f) {
      return arguments.length ? (q = "function" === typeof f ? f : Z(+f), b) : q;
    };
    b.endAngle = function(f) {
      return arguments.length ? (w = "function" === typeof f ? f : Z(+f), b) : w;
    };
    b.padAngle = function(f) {
      return arguments.length ? (B = "function" === typeof f ? f : Z(+f), b) : B;
    };
    return b;
  };
  b.areaRadial = Zl;
  b.radialArea = Zl;
  b.lineRadial = Xl;
  b.radialLine = Xl;
  b.pointRadial = wd;
  b.linkHorizontal = function() {
    return Dh(Xs);
  };
  b.linkVertical = function() {
    return Dh(Ys);
  };
  b.linkRadial = function() {
    var b = Dh(Zs);
    b.angle = b.x;
    delete b.x;
    b.radius = b.y;
    delete b.y;
    return b;
  };
  b.symbol = function() {
    function b() {
      var b;
      n || (n = b = xb());
      m.apply(this, arguments).draw(n, +u.apply(this, arguments));
      if (b) {
        return n = null, b + "" || null;
      }
    }
    var m = Z(ci), u = Z(64), n = null;
    b.type = function(f) {
      return arguments.length ? (m = "function" === typeof f ? f : Z(f), b) : m;
    };
    b.size = function(f) {
      return arguments.length ? (u = "function" === typeof f ? f : Z(+f), b) : u;
    };
    b.context = function(f) {
      return arguments.length ? (n = null == f ? null : f, b) : n;
    };
    return b;
  };
  b.symbols = yv;
  b.symbolCircle = ci;
  b.symbolCross = Ln;
  b.symbolDiamond = Nn;
  b.symbolSquare = Qn;
  b.symbolStar = Pn;
  b.symbolTriangle = Rn;
  b.symbolWye = Sn;
  b.curveBasisClosed = function(b) {
    return new $l(b);
  };
  b.curveBasisOpen = function(b) {
    return new am(b);
  };
  b.curveBasis = function(b) {
    return new gf(b);
  };
  b.curveBundle = zv;
  b.curveCardinalClosed = Bv;
  b.curveCardinalOpen = Cv;
  b.curveCardinal = Av;
  b.curveCatmullRomClosed = Ev;
  b.curveCatmullRomOpen = Fv;
  b.curveCatmullRom = Dv;
  b.curveLinearClosed = function(b) {
    return new fm(b);
  };
  b.curveLinear = ef;
  b.curveMonotoneX = function(b) {
    return new jf(b);
  };
  b.curveMonotoneY = function(b) {
    return new im(b);
  };
  b.curveNatural = function(b) {
    return new km(b);
  };
  b.curveStep = function(b) {
    return new kf(b, 0.5);
  };
  b.curveStepAfter = function(b) {
    return new kf(b, 1);
  };
  b.curveStepBefore = function(b) {
    return new kf(b, 0);
  };
  b.stack = function() {
    function b(b) {
      var f = m.apply(this, arguments), w, A = b.length, G = f.length, L = Array(G);
      for (w = 0; w < G; ++w) {
        for (var H = f[w], M = L[w] = Array(A), O = 0, Q; O < A; ++O) {
          M[O] = Q = [0, +q(b[O], H, O, b)], Q.data = b[O];
        }
        M.key = H;
      }
      w = 0;
      for (f = u(L); w < G; ++w) {
        L[f[w]].index = w;
      }
      n(L, f);
      return L;
    }
    var m = Z([]), u = xc, n = wc, q = $s;
    b.keys = function(f) {
      return arguments.length ? (m = "function" === typeof f ? f : Z(Eh.call(f)), b) : m;
    };
    b.value = function(f) {
      return arguments.length ? (q = "function" === typeof f ? f : Z(+f), b) : q;
    };
    b.order = function(f) {
      return arguments.length ? (u = null == f ? xc : "function" === typeof f ? f : Z(Eh.call(f)), b) : u;
    };
    b.offset = function(f) {
      return arguments.length ? (n = null == f ? wc : f, b) : n;
    };
    return b;
  };
  b.stackOffsetExpand = function(b, m) {
    if (0 < (n = b.length)) {
      for (var f, n, q = 0, w = b[0].length, B; q < w; ++q) {
        for (B = f = 0; f < n; ++f) {
          B += b[f][q][1] || 0;
        }
        if (B) {
          for (f = 0; f < n; ++f) {
            b[f][q][1] /= B;
          }
        }
      }
      wc(b, m);
    }
  };
  b.stackOffsetDiverging = function(b, m) {
    if (1 < (A = b.length)) {
      for (var f, n = 0, q, w, B, E, A, G = b[m[0]].length; n < G; ++n) {
        for (f = B = E = 0; f < A; ++f) {
          0 <= (w = (q = b[m[f]][n])[1] - q[0]) ? (q[0] = B, q[1] = B += w) : 0 > w ? (q[1] = E, q[0] = E += w) : q[0] = B;
        }
      }
    }
  };
  b.stackOffsetNone = wc;
  b.stackOffsetSilhouette = function(b, m) {
    if (0 < (q = b.length)) {
      for (var f = 0, n = b[m[0]], q, w = n.length; f < w; ++f) {
        for (var B = 0, E = 0; B < q; ++B) {
          E += b[B][f][1] || 0;
        }
        n[f][1] += n[f][0] = -E / 2;
      }
      wc(b, m);
    }
  };
  b.stackOffsetWiggle = function(b, m) {
    if (0 < (B = b.length) && 0 < (w = (q = b[m[0]]).length)) {
      for (var f = 0, n = 1, q, w, B; n < w; ++n) {
        for (var E = 0, A = 0, G = 0; E < B; ++E) {
          var L = b[m[E]], H = L[n][1] || 0;
          L = (H - (L[n - 1][1] || 0)) / 2;
          for (var M = 0; M < E; ++M) {
            var O = b[m[M]];
            L += (O[n][1] || 0) - (O[n - 1][1] || 0);
          }
          A += H;
          G += L * H;
        }
        q[n - 1][1] += q[n - 1][0] = f;
        A && (f -= G / A);
      }
      q[n - 1][1] += q[n - 1][0] = f;
      wc(b, m);
    }
  };
  b.stackOrderAppearance = mm;
  b.stackOrderAscending = nm;
  b.stackOrderDescending = function(b) {
    return nm(b).reverse();
  };
  b.stackOrderInsideOut = function(b) {
    var f = b.length, u = b.map(om), n = mm(b), q = 0, w = 0, B = [], E = [];
    for (b = 0; b < f; ++b) {
      var A = n[b];
      q < w ? (q += u[A], B.push(A)) : (w += u[A], E.push(A));
    }
    return E.reverse().concat(B);
  };
  b.stackOrderNone = xc;
  b.stackOrderReverse = function(b) {
    return xc(b).reverse();
  };
  b.timeInterval = ra;
  b.timeMillisecond = Yb;
  b.timeMilliseconds = Xm;
  b.utcMillisecond = Yb;
  b.utcMilliseconds = Xm;
  b.timeSecond = Hd;
  b.timeSeconds = Ym;
  b.utcSecond = Hd;
  b.utcSeconds = Ym;
  b.timeMinute = Wh;
  b.timeMinutes = eu;
  b.timeHour = Xh;
  b.timeHours = fu;
  b.timeDay = od;
  b.timeDays = gu;
  b.timeWeek = rd;
  b.timeWeeks = cn;
  b.timeSunday = rd;
  b.timeSundays = cn;
  b.timeMonday = nd;
  b.timeMondays = hu;
  b.timeTuesday = Zm;
  b.timeTuesdays = iu;
  b.timeWednesday = $m;
  b.timeWednesdays = ju;
  b.timeThursday = sd;
  b.timeThursdays = ku;
  b.timeFriday = an;
  b.timeFridays = lu;
  b.timeSaturday = bn;
  b.timeSaturdays = mu;
  b.timeMonth = Yh;
  b.timeMonths = nu;
  b.timeYear = qb;
  b.timeYears = ou;
  b.utcMinute = Zh;
  b.utcMinutes = pu;
  b.utcHour = $h;
  b.utcHours = qu;
  b.utcDay = md;
  b.utcDays = ru;
  b.utcWeek = td;
  b.utcWeeks = hn;
  b.utcSunday = td;
  b.utcSundays = hn;
  b.utcMonday = ld;
  b.utcMondays = su;
  b.utcTuesday = dn;
  b.utcTuesdays = tu;
  b.utcWednesday = en;
  b.utcWednesdays = uu;
  b.utcThursday = ud;
  b.utcThursdays = vu;
  b.utcFriday = fn;
  b.utcFridays = wu;
  b.utcSaturday = gn;
  b.utcSaturdays = xu;
  b.utcMonth = ai;
  b.utcMonths = yu;
  b.utcYear = rb;
  b.utcYears = zu;
  b.timeFormatDefaultLocale = Jl;
  b.timeFormatLocale = yl;
  b.isoFormat = Au;
  b.isoParse = Bu;
  b.now = dc;
  b.timer = ae;
  b.timerFlush = Yi;
  b.timeout = cg;
  b.interval = function(b, m, u) {
    var f = new Oc, q = m;
    if (null == m) {
      return f.restart(b, m, u), f;
    }
    m = +m;
    u = null == u ? dc() : +u;
    f.restart(function E(n) {
      n += q;
      f.restart(E, q += m, u);
      b(n);
    }, m, u);
    return f;
  };
  b.transition = bj;
  b.active = function(b, m) {
    var f = b.__transition, n, q;
    if (f) {
      for (q in m = null == m ? null : m + "", f) {
        if (1 < (n = f[q]).state && n.name === m) {
          return new cb([[b]], Ht, m, +q);
        }
      }
    }
    return null;
  };
  b.interrupt = Mb;
  b.voronoi = function() {
    function b(b) {
      return new Mh(b.map(function(f, n) {
        var q = [Math.round(m(f, n, b) / ba) * ba, Math.round(u(f, n, b) / ba) * ba];
        q.index = n;
        q.data = f;
        return q;
      }), n);
    }
    var m = bt, u = ct, n = null;
    b.polygons = function(f) {
      return b(f).polygons();
    };
    b.links = function(f) {
      return b(f).links();
    };
    b.triangles = function(f) {
      return b(f).triangles();
    };
    b.x = function(f) {
      return arguments.length ? (m = "function" === typeof f ? f : pm(+f), b) : m;
    };
    b.y = function(f) {
      return arguments.length ? (u = "function" === typeof f ? f : pm(+f), b) : u;
    };
    b.extent = function(f) {
      return arguments.length ? (n = null == f ? null : [[+f[0][0], +f[0][1]], [+f[1][0], +f[1][1]]], b) : n && [[n[0][0], n[0][1]], [n[1][0], n[1][1]]];
    };
    b.size = function(f) {
      return arguments.length ? (n = null == f ? null : [[0, 0], [+f[0], +f[1]]], b) : n && [n[1][0] - n[0][0], n[1][1] - n[0][1]];
    };
    return b;
  };
  b.zoom = function() {
    function f(b) {
      b.property("__zoom", xm).on("wheel.zoom", E).on("mousedown.zoom", A).on("dblclick.zoom", G).filter(T).on("touchstart.zoom", L).on("touchmove.zoom", H).on("touchend.zoom touchcancel.zoom", M).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function m(b, f) {
      f = Math.max(Y[0], Math.min(Y[1], f));
      return f === b.k ? b : new sb(f, b.x, b.y);
    }
    function u(b, f, m) {
      var n = f[0] - m[0] * b.k;
      f = f[1] - m[1] * b.k;
      return n === b.x && f === b.y ? b : new sb(b.k, n, f);
    }
    function n(b) {
      return [(+b[0][0] + +b[1][0]) / 2, (+b[0][1] + +b[1][1]) / 2];
    }
    function q(b, f, m) {
      b.on("start.zoom", function() {
        w(this, arguments).start();
      }).on("interrupt.zoom end.zoom", function() {
        w(this, arguments).end();
      }).tween("zoom", function() {
        var b = arguments, q = w(this, b), u = Q.apply(this, b), A = m || n(u), B = Math.max(u[1][0] - u[0][0], u[1][1] - u[0][1]);
        u = this.__zoom;
        var E = "function" === typeof f ? f.apply(this, b) : f, $a = aa(u.invert(A).concat(B / u.k), E.invert(A).concat(B / E.k));
        return function(b) {
          if (1 === b) {
            b = E;
          } else {
            b = $a(b);
            var f = B / b[2];
            b = new sb(f, A[0] - b[0] * f, A[1] - b[1] * f);
          }
          q.zoom(null, b);
        };
      });
    }
    function w(b, f) {
      for (var m = 0, n = da.length, q; m < n; ++m) {
        if ((q = da[m]).that === b) {
          return q;
        }
      }
      return new B(b, f);
    }
    function B(b, f) {
      this.that = b;
      this.args = f;
      this.index = -1;
      this.active = 0;
      this.extent = Q.apply(b, f);
    }
    function E() {
      if (O.apply(this, arguments)) {
        var b = w(this, arguments), f = this.__zoom, n = Math.max(Y[0], Math.min(Y[1], f.k * Math.pow(2, W.apply(this, arguments)))), q = ub(this);
        if (b.wheel) {
          if (b.mouse[0][0] !== q[0] || b.mouse[0][1] !== q[1]) {
            b.mouse[1] = f.invert(b.mouse[0] = q);
          }
          clearTimeout(b.wheel);
        } else {
          if (f.k === n) {
            return;
          }
          b.mouse = [q, f.invert(q)];
          Mb(this);
          b.start();
        }
        Cd();
        b.wheel = setTimeout(function() {
          b.wheel = null;
          b.end();
        }, 150);
        b.zoom("mouse", R(u(m(f, n), b.mouse[0], b.mouse[1]), b.extent, U));
      }
    }
    function A() {
      if (!ea && O.apply(this, arguments)) {
        var f = w(this, arguments), m = Ha(b.event.view).on("mousemove.zoom", function() {
          Cd();
          if (!f.moved) {
            var m = b.event.clientX - q, n = b.event.clientY - A;
            f.moved = m * m + n * n > fa;
          }
          f.zoom("mouse", R(u(f.that.__zoom, f.mouse[0] = ub(f.that), f.mouse[1]), f.extent, U));
        }, !0).on("mouseup.zoom", function() {
          m.on("mousemove.zoom mouseup.zoom", null);
          Td(b.event.view, f.moved);
          Cd();
          f.end();
        }, !0), n = ub(this), q = b.event.clientX, A = b.event.clientY;
        Sd(b.event.view);
        b.event.stopImmediatePropagation();
        f.mouse = [n, this.__zoom.invert(n)];
        Mb(this);
        f.start();
      }
    }
    function G() {
      if (O.apply(this, arguments)) {
        var n = this.__zoom, w = ub(this), A = n.invert(w);
        n = R(u(m(n, n.k * (b.event.shiftKey ? 0.5 : 2)), w, A), Q.apply(this, arguments), U);
        Cd();
        0 < Z ? Ha(this).transition().duration(Z).call(q, n, w) : Ha(this).call(f.transform, n);
      }
    }
    function L() {
      if (O.apply(this, arguments)) {
        var f = w(this, arguments), m = b.event.changedTouches, n = m.length, q;
        b.event.stopImmediatePropagation();
        for (q = 0; q < n; ++q) {
          var u = m[q];
          var A = Rd(this, m, u.identifier);
          A = [A, this.__zoom.invert(A), u.identifier];
          if (f.touch0) {
            f.touch1 || (f.touch1 = A);
          } else {
            f.touch0 = A;
            var B = !0;
          }
        }
        if (ba && (ba = clearTimeout(ba), !f.touch1)) {
          f.end();
          (A = Ha(this).on("dblclick.zoom")) && A.apply(this, arguments);
          return;
        }
        B && (ba = setTimeout(function() {
          ba = null;
        }, 500), Mb(this), f.start());
      }
    }
    function H() {
      var f = w(this, arguments), n = b.event.changedTouches, q = n.length, A;
      Cd();
      ba && (ba = clearTimeout(ba));
      for (A = 0; A < q; ++A) {
        var B = n[A];
        var E = Rd(this, n, B.identifier);
        f.touch0 && f.touch0[2] === B.identifier ? f.touch0[0] = E : f.touch1 && f.touch1[2] === B.identifier && (f.touch1[0] = E);
      }
      B = f.that.__zoom;
      if (f.touch1) {
        E = f.touch0[0];
        n = f.touch0[1];
        A = f.touch1[0];
        q = f.touch1[1];
        var G = (G = A[0] - E[0]) * G + (G = A[1] - E[1]) * G;
        var H = (H = q[0] - n[0]) * H + (H = q[1] - n[1]) * H;
        B = m(B, Math.sqrt(G / H));
        E = [(E[0] + A[0]) / 2, (E[1] + A[1]) / 2];
        G = [(n[0] + q[0]) / 2, (n[1] + q[1]) / 2];
      } else {
        if (f.touch0) {
          E = f.touch0[0], G = f.touch0[1];
        } else {
          return;
        }
      }
      f.zoom("touch", R(u(B, E, G), f.extent, U));
    }
    function M() {
      var f = w(this, arguments), m = b.event.changedTouches, n = m.length, q;
      b.event.stopImmediatePropagation();
      ea && clearTimeout(ea);
      ea = setTimeout(function() {
        ea = null;
      }, 500);
      for (q = 0; q < n; ++q) {
        var u = m[q];
        f.touch0 && f.touch0[2] === u.identifier ? delete f.touch0 : f.touch1 && f.touch1[2] === u.identifier && delete f.touch1;
      }
      f.touch1 && !f.touch0 && (f.touch0 = f.touch1, delete f.touch1);
      f.touch0 ? f.touch0[1] = this.__zoom.invert(f.touch0[0]) : f.end();
    }
    var O = mt, Q = nt, R = qt, W = ot, T = pt, Y = [0, Infinity], U = [[-Infinity, -Infinity], [Infinity, Infinity]], Z = 250, aa = Ti, da = [], ca = Hb("start", "zoom", "end"), ba, ea, fa = 0;
    f.transform = function(b, f) {
      var m = b.selection ? b.selection() : b;
      m.property("__zoom", xm);
      b !== m ? q(b, f) : m.interrupt().each(function() {
        w(this, arguments).start().zoom(null, "function" === typeof f ? f.apply(this, arguments) : f).end();
      });
    };
    f.scaleBy = function(b, m) {
      f.scaleTo(b, function() {
        var b = this.__zoom.k, f = "function" === typeof m ? m.apply(this, arguments) : m;
        return b * f;
      });
    };
    f.scaleTo = function(b, q) {
      f.transform(b, function() {
        var b = Q.apply(this, arguments), f = this.__zoom, w = n(b), A = f.invert(w), B = "function" === typeof q ? q.apply(this, arguments) : q;
        return R(u(m(f, B), w, A), b, U);
      });
    };
    f.translateBy = function(b, m, n) {
      f.transform(b, function() {
        return R(this.__zoom.translate("function" === typeof m ? m.apply(this, arguments) : m, "function" === typeof n ? n.apply(this, arguments) : n), Q.apply(this, arguments), U);
      });
    };
    f.translateTo = function(b, m, q) {
      f.transform(b, function() {
        var b = Q.apply(this, arguments), f = this.__zoom, u = n(b);
        return R(pf.translate(u[0], u[1]).scale(f.k).translate("function" === typeof m ? -m.apply(this, arguments) : -m, "function" === typeof q ? -q.apply(this, arguments) : -q), b, U);
      });
    };
    B.prototype = {start:function() {
      1 === ++this.active && (this.index = da.push(this) - 1, this.emit("start"));
      return this;
    }, zoom:function(b, f) {
      this.mouse && "mouse" !== b && (this.mouse[1] = f.invert(this.mouse[0]));
      this.touch0 && "touch" !== b && (this.touch0[1] = f.invert(this.touch0[0]));
      this.touch1 && "touch" !== b && (this.touch1[1] = f.invert(this.touch1[0]));
      this.that.__zoom = f;
      this.emit("zoom");
      return this;
    }, end:function() {
      0 === --this.active && (da.splice(this.index, 1), this.index = -1, this.emit("end"));
      return this;
    }, emit:function(b) {
      Ic(new lt(f, b, this.that.__zoom), ca.apply, ca, [b, this.that, this.args]);
    }};
    f.wheelDelta = function(b) {
      return arguments.length ? (W = "function" === typeof b ? b : of(+b), f) : W;
    };
    f.filter = function(b) {
      return arguments.length ? (O = "function" === typeof b ? b : of(!!b), f) : O;
    };
    f.touchable = function(b) {
      return arguments.length ? (T = "function" === typeof b ? b : of(!!b), f) : T;
    };
    f.extent = function(b) {
      return arguments.length ? (Q = "function" === typeof b ? b : of([[+b[0][0], +b[0][1]], [+b[1][0], +b[1][1]]]), f) : Q;
    };
    f.scaleExtent = function(b) {
      return arguments.length ? (Y[0] = +b[0], Y[1] = +b[1], f) : [Y[0], Y[1]];
    };
    f.translateExtent = function(b) {
      return arguments.length ? (U[0][0] = +b[0][0], U[1][0] = +b[1][0], U[0][1] = +b[0][1], U[1][1] = +b[1][1], f) : [[U[0][0], U[0][1]], [U[1][0], U[1][1]]];
    };
    f.constrain = function(b) {
      return arguments.length ? (R = b, f) : R;
    };
    f.duration = function(b) {
      return arguments.length ? (Z = +b, f) : Z;
    };
    f.interpolate = function(b) {
      return arguments.length ? (aa = b, f) : aa;
    };
    f.on = function() {
      var b = ca.on.apply(ca, arguments);
      return b === ca ? f : b;
    };
    f.clickDistance = function(b) {
      return arguments.length ? (fa = (b = +b) * b, f) : Math.sqrt(fa);
    };
    return f;
  };
  b.zoomTransform = wm;
  b.zoomIdentity = pf;
  Object.defineProperty(b, "__esModule", {value:!0});
});
