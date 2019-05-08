// Input 0
'use strict';
(function() {
  function I(a) {
    return function(c, d, e, f) {
      d = u(d, f, 4);
      var g = !n(c) && b.keys(c), h = (g || c).length, k = 0 < a ? 0 : h - 1;
      3 > arguments.length && (e = c[g ? g[k] : k], k += a);
      for (var p = d, m = e; 0 <= k && h > k; k += a) {
        var l = g ? g[k] : k;
        m = p(m, c[l], l, c);
      }
      return m;
    };
  }
  function J(a) {
    return function(c, b, e) {
      b = l(b, e);
      e = r(c);
      for (var d = 0 < a ? 0 : e - 1; 0 <= d && e > d; d += a) {
        if (b(c[d], d, c)) {
          return d;
        }
      }
      return -1;
    };
  }
  function K(a, c, d) {
    return function(e, f, g) {
      var h = 0, k = r(e);
      if ("number" == typeof g) {
        0 < a ? h = 0 <= g ? g : Math.max(g + k, h) : k = 0 <= g ? Math.min(g + 1, k) : g + k + 1;
      } else {
        if (d && g && k) {
          return g = d(e, f), e[g] === f ? g : -1;
        }
      }
      if (f !== f) {
        return g = c(q.call(e, h, k), b.isNaN), 0 <= g ? g + h : -1;
      }
      for (g = 0 < a ? h : k - 1; 0 <= g && k > g; g += a) {
        if (e[g] === f) {
          return g;
        }
      }
      return -1;
    };
  }
  function L(a, c) {
    var d = M.length, e = a.constructor;
    e = b.isFunction(e) && e.prototype || A;
    var f = "constructor";
    for (b.has(a, f) && !b.contains(c, f) && c.push(f); d--;) {
      f = M[d], f in a && a[f] !== e[f] && !b.contains(c, f) && c.push(f);
    }
  }
  var B = this, S = B._, y = Array.prototype, A = Object.prototype, T = y.push, q = y.slice, v = A.toString, U = A.hasOwnProperty, z = Array.isArray, N = Object.keys, C = Function.prototype.bind, O = Object.create, D = function() {
  }, b = function(a) {
    return a instanceof b ? a : this instanceof b ? void(this._wrapped = a) : new b(a);
  };
  "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = b), exports._ = b) : B._ = b;
  b.VERSION = "1.8.3";
  var u = function(a, c, b) {
    if (void 0 === c) {
      return a;
    }
    switch(null == b ? 3 : b) {
      case 1:
        return function(b) {
          return a.call(c, b);
        };
      case 2:
        return function(b, d) {
          return a.call(c, b, d);
        };
      case 3:
        return function(b, d, g) {
          return a.call(c, b, d, g);
        };
      case 4:
        return function(b, d, g, h) {
          return a.call(c, b, d, g, h);
        };
    }
    return function() {
      return a.apply(c, arguments);
    };
  }, l = function(a, c, d) {
    return null == a ? b.identity : b.isFunction(a) ? u(a, c, d) : b.isObject(a) ? b.matcher(a) : b.property(a);
  };
  b.iteratee = function(a, c) {
    return l(a, c, 1 / 0);
  };
  var w = function(a, c) {
    return function(b) {
      var d = arguments.length;
      if (2 > d || null == b) {
        return b;
      }
      for (var f = 1; d > f; f++) {
        for (var g = arguments[f], h = a(g), k = h.length, p = 0; k > p; p++) {
          var m = h[p];
          c && void 0 !== b[m] || (b[m] = g[m]);
        }
      }
      return b;
    };
  }, P = function(a) {
    if (!b.isObject(a)) {
      return {};
    }
    if (O) {
      return O(a);
    }
    D.prototype = a;
    a = new D;
    return D.prototype = null, a;
  }, x = function(a) {
    return function(c) {
      return null == c ? void 0 : c[a];
    };
  }, V = Math.pow(2, 53) - 1, r = x("length"), n = function(a) {
    a = r(a);
    return "number" == typeof a && 0 <= a && V >= a;
  };
  b.each = b.forEach = function(a, c, d) {
    c = u(c, d);
    var e;
    if (n(a)) {
      for (d = 0, e = a.length; e > d; d++) {
        c(a[d], d, a);
      }
    } else {
      var f = b.keys(a);
      d = 0;
      for (e = f.length; e > d; d++) {
        c(a[f[d]], f[d], a);
      }
    }
    return a;
  };
  b.map = b.collect = function(a, c, d) {
    c = l(c, d);
    d = !n(a) && b.keys(a);
    for (var e = (d || a).length, f = Array(e), g = 0; e > g; g++) {
      var h = d ? d[g] : g;
      f[g] = c(a[h], h, a);
    }
    return f;
  };
  b.reduce = b.foldl = b.inject = I(1);
  b.reduceRight = b.foldr = I(-1);
  b.find = b.detect = function(a, c, d) {
    var e;
    return e = n(a) ? b.findIndex(a, c, d) : b.findKey(a, c, d), void 0 !== e && -1 !== e ? a[e] : void 0;
  };
  b.filter = b.select = function(a, c, d) {
    var e = [];
    return c = l(c, d), b.each(a, function(a, b, d) {
      c(a, b, d) && e.push(a);
    }), e;
  };
  b.reject = function(a, c, d) {
    return b.filter(a, b.negate(l(c)), d);
  };
  b.every = b.all = function(a, c, d) {
    c = l(c, d);
    d = !n(a) && b.keys(a);
    for (var e = (d || a).length, f = 0; e > f; f++) {
      var g = d ? d[f] : f;
      if (!c(a[g], g, a)) {
        return !1;
      }
    }
    return !0;
  };
  b.some = b.any = function(a, c, d) {
    c = l(c, d);
    d = !n(a) && b.keys(a);
    for (var e = (d || a).length, f = 0; e > f; f++) {
      var g = d ? d[f] : f;
      if (c(a[g], g, a)) {
        return !0;
      }
    }
    return !1;
  };
  b.contains = b.includes = b.include = function(a, c, d, e) {
    return n(a) || (a = b.values(a)), ("number" != typeof d || e) && (d = 0), 0 <= b.indexOf(a, c, d);
  };
  b.invoke = function(a, c) {
    var d = q.call(arguments, 2), e = b.isFunction(c);
    return b.map(a, function(a) {
      var b = e ? c : a[c];
      return null == b ? b : b.apply(a, d);
    });
  };
  b.pluck = function(a, c) {
    return b.map(a, b.property(c));
  };
  b.where = function(a, c) {
    return b.filter(a, b.matcher(c));
  };
  b.findWhere = function(a, c) {
    return b.find(a, b.matcher(c));
  };
  b.max = function(a, c, d) {
    var e, f = -1 / 0, g = -1 / 0;
    if (null == c && null != a) {
      a = n(a) ? a : b.values(a);
      for (var h = 0, k = a.length; k > h; h++) {
        d = a[h], d > f && (f = d);
      }
    } else {
      c = l(c, d), b.each(a, function(a, b, d) {
        e = c(a, b, d);
        (e > g || e === -1 / 0 && f === -1 / 0) && (f = a, g = e);
      });
    }
    return f;
  };
  b.min = function(a, c, d) {
    var e, f = 1 / 0, g = 1 / 0;
    if (null == c && null != a) {
      a = n(a) ? a : b.values(a);
      for (var h = 0, k = a.length; k > h; h++) {
        d = a[h], f > d && (f = d);
      }
    } else {
      c = l(c, d), b.each(a, function(a, b, d) {
        e = c(a, b, d);
        (g > e || 1 / 0 === e && 1 / 0 === f) && (f = a, g = e);
      });
    }
    return f;
  };
  b.shuffle = function(a) {
    for (var c = n(a) ? a : b.values(a), d = c.length, e = Array(d), f = 0; d > f; f++) {
      a = b.random(0, f), a !== f && (e[f] = e[a]), e[a] = c[f];
    }
    return e;
  };
  b.sample = function(a, c, d) {
    return null == c || d ? (n(a) || (a = b.values(a)), a[b.random(a.length - 1)]) : b.shuffle(a).slice(0, Math.max(0, c));
  };
  b.sortBy = function(a, c, d) {
    return c = l(c, d), b.pluck(b.map(a, function(a, b, d) {
      return {value:a, index:b, criteria:c(a, b, d)};
    }).sort(function(a, b) {
      var c = a.criteria, d = b.criteria;
      if (c !== d) {
        if (c > d || void 0 === c) {
          return 1;
        }
        if (d > c || void 0 === d) {
          return -1;
        }
      }
      return a.index - b.index;
    }), "value");
  };
  var E = function(a) {
    return function(c, d, e) {
      var f = {};
      return d = l(d, e), b.each(c, function(b, e) {
        e = d(b, e, c);
        a(f, b, e);
      }), f;
    };
  };
  b.groupBy = E(function(a, c, d) {
    b.has(a, d) ? a[d].push(c) : a[d] = [c];
  });
  b.indexBy = E(function(a, b, d) {
    a[d] = b;
  });
  b.countBy = E(function(a, c, d) {
    b.has(a, d) ? a[d]++ : a[d] = 1;
  });
  b.toArray = function(a) {
    return a ? b.isArray(a) ? q.call(a) : n(a) ? b.map(a, b.identity) : b.values(a) : [];
  };
  b.size = function(a) {
    return null == a ? 0 : n(a) ? a.length : b.keys(a).length;
  };
  b.partition = function(a, c, d) {
    c = l(c, d);
    var e = [], f = [];
    return b.each(a, function(a, b, d) {
      (c(a, b, d) ? e : f).push(a);
    }), [e, f];
  };
  b.first = b.head = b.take = function(a, c, d) {
    return null == a ? void 0 : null == c || d ? a[0] : b.initial(a, a.length - c);
  };
  b.initial = function(a, b, d) {
    return q.call(a, 0, Math.max(0, a.length - (null == b || d ? 1 : b)));
  };
  b.last = function(a, c, d) {
    return null == a ? void 0 : null == c || d ? a[a.length - 1] : b.rest(a, Math.max(0, a.length - c));
  };
  b.rest = b.tail = b.drop = function(a, b, d) {
    return q.call(a, null == b || d ? 1 : b);
  };
  b.compact = function(a) {
    return b.filter(a, b.identity);
  };
  var t = function(a, c, d, e) {
    var f = [], g = 0;
    e = e || 0;
    for (var h = r(a); h > e; e++) {
      var k = a[e];
      if (n(k) && (b.isArray(k) || b.isArguments(k))) {
        c || (k = t(k, c, d));
        var p = 0, m = k.length;
        for (f.length += m; m > p;) {
          f[g++] = k[p++];
        }
      } else {
        d || (f[g++] = k);
      }
    }
    return f;
  };
  b.flatten = function(a, b) {
    return t(a, b, !1);
  };
  b.without = function(a) {
    return b.difference(a, q.call(arguments, 1));
  };
  b.uniq = b.unique = function(a, c, d, e) {
    b.isBoolean(c) || (e = d, d = c, c = !1);
    null != d && (d = l(d, e));
    e = [];
    for (var f = [], g = 0, h = r(a); h > g; g++) {
      var k = a[g], p = d ? d(k, g, a) : k;
      c ? (g && f === p || e.push(k), f = p) : d ? b.contains(f, p) || (f.push(p), e.push(k)) : b.contains(e, k) || e.push(k);
    }
    return e;
  };
  b.union = function() {
    return b.uniq(t(arguments, !0, !0));
  };
  b.intersection = function(a) {
    for (var c = [], d = arguments.length, e = 0, f = r(a); f > e; e++) {
      var g = a[e];
      if (!b.contains(c, g)) {
        for (var h = 1; d > h && b.contains(arguments[h], g); h++) {
        }
        h === d && c.push(g);
      }
    }
    return c;
  };
  b.difference = function(a) {
    var c = t(arguments, !0, !0, 1);
    return b.filter(a, function(a) {
      return !b.contains(c, a);
    });
  };
  b.zip = function() {
    return b.unzip(arguments);
  };
  b.unzip = function(a) {
    for (var c = a && b.max(a, r).length || 0, d = Array(c), e = 0; c > e; e++) {
      d[e] = b.pluck(a, e);
    }
    return d;
  };
  b.object = function(a, b) {
    for (var c = {}, e = 0, f = r(a); f > e; e++) {
      b ? c[a[e]] = b[e] : c[a[e][0]] = a[e][1];
    }
    return c;
  };
  b.findIndex = J(1);
  b.findLastIndex = J(-1);
  b.sortedIndex = function(a, b, d, e) {
    d = l(d, e, 1);
    b = d(b);
    e = 0;
    for (var c = r(a); c > e;) {
      var g = Math.floor((e + c) / 2);
      d(a[g]) < b ? e = g + 1 : c = g;
    }
    return e;
  };
  b.indexOf = K(1, b.findIndex, b.sortedIndex);
  b.lastIndexOf = K(-1, b.findLastIndex);
  b.range = function(a, b, d) {
    null == b && (b = a || 0, a = 0);
    d = d || 1;
    b = Math.max(Math.ceil((b - a) / d), 0);
    for (var c = Array(b), f = 0; b > f; f++, a += d) {
      c[f] = a;
    }
    return c;
  };
  var Q = function(a, c, d, e, f) {
    if (!(e instanceof c)) {
      return a.apply(d, f);
    }
    c = P(a.prototype);
    a = a.apply(c, f);
    return b.isObject(a) ? a : c;
  };
  b.bind = function(a, c) {
    if (C && a.bind === C) {
      return C.apply(a, q.call(arguments, 1));
    }
    if (!b.isFunction(a)) {
      throw new TypeError("Bind must be called on a function");
    }
    var d = q.call(arguments, 2), e = function() {
      return Q(a, e, c, this, d.concat(q.call(arguments)));
    };
    return e;
  };
  b.partial = function(a) {
    var c = q.call(arguments, 1), d = function() {
      for (var e = 0, f = c.length, g = Array(f), h = 0; f > h; h++) {
        g[h] = c[h] === b ? arguments[e++] : c[h];
      }
      for (; e < arguments.length;) {
        g.push(arguments[e++]);
      }
      return Q(a, d, this, this, g);
    };
    return d;
  };
  b.bindAll = function(a) {
    var c, d = arguments.length;
    if (1 >= d) {
      throw Error("bindAll must be passed function names");
    }
    for (c = 1; d > c; c++) {
      var e = arguments[c];
      a[e] = b.bind(a[e], a);
    }
    return a;
  };
  b.memoize = function(a, c) {
    var d = function(e) {
      var f = d.cache, g = "" + (c ? c.apply(this, arguments) : e);
      return b.has(f, g) || (f[g] = a.apply(this, arguments)), f[g];
    };
    return d.cache = {}, d;
  };
  b.delay = function(a, b) {
    var c = q.call(arguments, 2);
    return setTimeout(function() {
      return a.apply(null, c);
    }, b);
  };
  b.defer = b.partial(b.delay, b, 1);
  b.throttle = function(a, c, d) {
    var e, f, g, h = null, k = 0;
    d || (d = {});
    var p = function() {
      k = !1 === d.leading ? 0 : b.now();
      h = null;
      g = a.apply(e, f);
      h || (e = f = null);
    };
    return function() {
      var m = b.now();
      k || !1 !== d.leading || (k = m);
      var l = c - (m - k);
      return e = this, f = arguments, 0 >= l || l > c ? (h && (clearTimeout(h), h = null), k = m, g = a.apply(e, f), h || (e = f = null)) : h || !1 === d.trailing || (h = setTimeout(p, l)), g;
    };
  };
  b.debounce = function(a, c, d) {
    var e, f, g, h, k, l = function() {
      var m = b.now() - h;
      c > m && 0 <= m ? e = setTimeout(l, c - m) : (e = null, d || (k = a.apply(g, f), e || (g = f = null)));
    };
    return function() {
      g = this;
      f = arguments;
      h = b.now();
      var m = d && !e;
      return e || (e = setTimeout(l, c)), m && (k = a.apply(g, f), g = f = null), k;
    };
  };
  b.wrap = function(a, c) {
    return b.partial(c, a);
  };
  b.negate = function(a) {
    return function() {
      return !a.apply(this, arguments);
    };
  };
  b.compose = function() {
    var a = arguments, b = a.length - 1;
    return function() {
      for (var c = b, e = a[b].apply(this, arguments); c--;) {
        e = a[c].call(this, e);
      }
      return e;
    };
  };
  b.after = function(a, b) {
    return function() {
      return 1 > --a ? b.apply(this, arguments) : void 0;
    };
  };
  b.before = function(a, b) {
    var c;
    return function() {
      return 0 < --a && (c = b.apply(this, arguments)), 1 >= a && (b = null), c;
    };
  };
  b.once = b.partial(b.before, 2);
  var R = !{toString:null}.propertyIsEnumerable("toString"), M = "valueOf isPrototypeOf toString propertyIsEnumerable hasOwnProperty toLocaleString".split(" ");
  b.keys = function(a) {
    if (!b.isObject(a)) {
      return [];
    }
    if (N) {
      return N(a);
    }
    var c = [], d;
    for (d in a) {
      b.has(a, d) && c.push(d);
    }
    return R && L(a, c), c;
  };
  b.allKeys = function(a) {
    if (!b.isObject(a)) {
      return [];
    }
    var c = [], d;
    for (d in a) {
      c.push(d);
    }
    return R && L(a, c), c;
  };
  b.values = function(a) {
    for (var c = b.keys(a), d = c.length, e = Array(d), f = 0; d > f; f++) {
      e[f] = a[c[f]];
    }
    return e;
  };
  b.mapObject = function(a, c, d) {
    c = l(c, d);
    for (var e = b.keys(a), f = e.length, g = {}, h = 0; f > h; h++) {
      d = e[h], g[d] = c(a[d], d, a);
    }
    return g;
  };
  b.pairs = function(a) {
    for (var c = b.keys(a), d = c.length, e = Array(d), f = 0; d > f; f++) {
      e[f] = [c[f], a[c[f]]];
    }
    return e;
  };
  b.invert = function(a) {
    for (var c = {}, d = b.keys(a), e = 0, f = d.length; f > e; e++) {
      c[a[d[e]]] = d[e];
    }
    return c;
  };
  b.functions = b.methods = function(a) {
    var c = [], d;
    for (d in a) {
      b.isFunction(a[d]) && c.push(d);
    }
    return c.sort();
  };
  b.extend = w(b.allKeys);
  b.extendOwn = b.assign = w(b.keys);
  b.findKey = function(a, c, d) {
    c = l(c, d);
    var e;
    d = b.keys(a);
    for (var f = 0, g = d.length; g > f; f++) {
      if (e = d[f], c(a[e], e, a)) {
        return e;
      }
    }
  };
  b.pick = function(a, c, d) {
    var e, f, g = {}, h = a;
    if (null == h) {
      return g;
    }
    b.isFunction(c) ? (f = b.allKeys(h), e = u(c, d)) : (f = t(arguments, !1, !1, 1), e = function(a, b, c) {
      return b in c;
    }, h = Object(h));
    for (var k = 0, l = f.length; l > k; k++) {
      var m = f[k], n = h[m];
      e(n, m, h) && (g[m] = n);
    }
    return g;
  };
  b.omit = function(a, c, d) {
    if (b.isFunction(c)) {
      c = b.negate(c);
    } else {
      var e = b.map(t(arguments, !1, !1, 1), String);
      c = function(a, c) {
        return !b.contains(e, c);
      };
    }
    return b.pick(a, c, d);
  };
  b.defaults = w(b.allKeys, !0);
  b.create = function(a, c) {
    a = P(a);
    return c && b.extendOwn(a, c), a;
  };
  b.clone = function(a) {
    return b.isObject(a) ? b.isArray(a) ? a.slice() : b.extend({}, a) : a;
  };
  b.tap = function(a, b) {
    return b(a), a;
  };
  b.isMatch = function(a, c) {
    var d = b.keys(c), e = d.length;
    if (null == a) {
      return !e;
    }
    a = Object(a);
    for (var f = 0; e > f; f++) {
      var g = d[f];
      if (c[g] !== a[g] || !(g in a)) {
        return !1;
      }
    }
    return !0;
  };
  var F = function(a, c, d, e) {
    if (a === c) {
      return 0 !== a || 1 / a === 1 / c;
    }
    if (null == a || null == c) {
      return a === c;
    }
    a instanceof b && (a = a._wrapped);
    c instanceof b && (c = c._wrapped);
    var f = v.call(a);
    if (f !== v.call(c)) {
      return !1;
    }
    switch(f) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a == "" + c;
      case "[object Number]":
        return +a !== +a ? +c !== +c : 0 === +a ? 1 / +a === 1 / c : +a === +c;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +c;
    }
    f = "[object Array]" === f;
    if (!f) {
      if ("object" != typeof a || "object" != typeof c) {
        return !1;
      }
      var g = a.constructor, h = c.constructor;
      if (g !== h && !(b.isFunction(g) && g instanceof g && b.isFunction(h) && h instanceof h) && "constructor" in a && "constructor" in c) {
        return !1;
      }
    }
    d = d || [];
    e = e || [];
    for (g = d.length; g--;) {
      if (d[g] === a) {
        return e[g] === c;
      }
    }
    if (d.push(a), e.push(c), f) {
      if (g = a.length, g !== c.length) {
        return !1;
      }
      for (; g--;) {
        if (!F(a[g], c[g], d, e)) {
          return !1;
        }
      }
    } else {
      var k;
      f = b.keys(a);
      if (g = f.length, b.keys(c).length !== g) {
        return !1;
      }
      for (; g--;) {
        if (k = f[g], !b.has(c, k) || !F(a[k], c[k], d, e)) {
          return !1;
        }
      }
    }
    return d.pop(), e.pop(), !0;
  };
  b.isEqual = function(a, b) {
    return F(a, b);
  };
  b.isEmpty = function(a) {
    return null == a ? !0 : n(a) && (b.isArray(a) || b.isString(a) || b.isArguments(a)) ? 0 === a.length : 0 === b.keys(a).length;
  };
  b.isElement = function(a) {
    return !(!a || 1 !== a.nodeType);
  };
  b.isArray = z || function(a) {
    return "[object Array]" === v.call(a);
  };
  b.isObject = function(a) {
    var b = typeof a;
    return "function" === b || "object" === b && !!a;
  };
  b.each("Arguments Function String Number Date RegExp Error".split(" "), function(a) {
    b["is" + a] = function(b) {
      return v.call(b) === "[object " + a + "]";
    };
  });
  b.isArguments(arguments) || (b.isArguments = function(a) {
    return b.has(a, "callee");
  });
  "function" != typeof/./ && "object" != typeof Int8Array && (b.isFunction = function(a) {
    return "function" == typeof a || !1;
  });
  b.isFinite = function(a) {
    return isFinite(a) && !isNaN(parseFloat(a));
  };
  b.isNaN = function(a) {
    return b.isNumber(a) && a !== +a;
  };
  b.isBoolean = function(a) {
    return !0 === a || !1 === a || "[object Boolean]" === v.call(a);
  };
  b.isNull = function(a) {
    return null === a;
  };
  b.isUndefined = function(a) {
    return void 0 === a;
  };
  b.has = function(a, b) {
    return null != a && U.call(a, b);
  };
  b.noConflict = function() {
    return B._ = S, this;
  };
  b.identity = function(a) {
    return a;
  };
  b.constant = function(a) {
    return function() {
      return a;
    };
  };
  b.noop = function() {
  };
  b.property = x;
  b.propertyOf = function(a) {
    return null == a ? function() {
    } : function(b) {
      return a[b];
    };
  };
  b.matcher = b.matches = function(a) {
    return a = b.extendOwn({}, a), function(c) {
      return b.isMatch(c, a);
    };
  };
  b.times = function(a, b, d) {
    var c = Array(Math.max(0, a));
    b = u(b, d, 1);
    for (d = 0; a > d; d++) {
      c[d] = b(d);
    }
    return c;
  };
  b.random = function(a, b) {
    return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1));
  };
  b.now = Date.now || function() {
    return (new Date).getTime();
  };
  z = {"\x26":"\x26amp;", "\x3c":"\x26lt;", "\x3e":"\x26gt;", '"':"\x26quot;", "'":"\x26#x27;", "`":"\x26#x60;"};
  w = b.invert(z);
  x = function(a) {
    var c = function(b) {
      return a[b];
    }, d = "(?:" + b.keys(a).join("|") + ")", e = RegExp(d), f = RegExp(d, "g");
    return function(a) {
      return a = null == a ? "" : "" + a, e.test(a) ? a.replace(f, c) : a;
    };
  };
  b.escape = x(z);
  b.unescape = x(w);
  b.result = function(a, c, d) {
    c = null == a ? void 0 : a[c];
    return void 0 === c && (c = d), b.isFunction(c) ? c.call(a) : c;
  };
  var W = 0;
  b.uniqueId = function(a) {
    var b = ++W + "";
    return a ? a + b : b;
  };
  b.templateSettings = {evaluate:/<%([\s\S]+?)%>/g, interpolate:/<%=([\s\S]+?)%>/g, escape:/<%-([\s\S]+?)%>/g};
  var G = /(.)^/, X = {"'":"'", "\\":"\\", "\r":"r", "\n":"n", "\u2028":"u2028", "\u2029":"u2029"}, Y = /\\|'|\r|\n|\u2028|\u2029/g, Z = function(a) {
    return "\\" + X[a];
  };
  b.template = function(a, c, d) {
    !c && d && (c = d);
    c = b.defaults({}, c, b.templateSettings);
    d = RegExp([(c.escape || G).source, (c.interpolate || G).source, (c.evaluate || G).source].join("|") + "|$", "g");
    var e = 0, f = "__p+\x3d'";
    a.replace(d, function(b, c, d, g, l) {
      return f += a.slice(e, l).replace(Y, Z), e = l + b.length, c ? f += "'+\n((__t\x3d(" + c + "))\x3d\x3dnull?'':_.escape(__t))+\n'" : d ? f += "'+\n((__t\x3d(" + d + "))\x3d\x3dnull?'':__t)+\n'" : g && (f += "';\n" + g + "\n__p+\x3d'"), b;
    });
    f += "';\n";
    c.variable || (f = "with(obj||{}){\n" + f + "}\n");
    f = "var __t,__p\x3d'',__j\x3dArray.prototype.join,print\x3dfunction(){__p+\x3d__j.call(arguments,'');};\n" + f + "return __p;\n";
    try {
      var g = new Function(c.variable || "obj", "_", f);
    } catch (h) {
      throw h.source = f, h;
    }
    d = function(a) {
      return g.call(this, a, b);
    };
    return d.source = "function(" + (c.variable || "obj") + "){\n" + f + "}", d;
  };
  b.chain = function(a) {
    a = b(a);
    return a._chain = !0, a;
  };
  var H = function(a, c) {
    return a._chain ? b(c).chain() : c;
  };
  b.mixin = function(a) {
    b.each(b.functions(a), function(c) {
      var d = b[c] = a[c];
      b.prototype[c] = function() {
        var a = [this._wrapped];
        return T.apply(a, arguments), H(this, d.apply(b, a));
      };
    });
  };
  b.mixin(b);
  b.each("pop push reverse shift sort splice unshift".split(" "), function(a) {
    var c = y[a];
    b.prototype[a] = function() {
      var b = this._wrapped;
      return c.apply(b, arguments), "shift" !== a && "splice" !== a || 0 !== b.length || delete b[0], H(this, b);
    };
  });
  b.each(["concat", "join", "slice"], function(a) {
    var c = y[a];
    b.prototype[a] = function() {
      return H(this, c.apply(this._wrapped, arguments));
    };
  });
  b.prototype.value = function() {
    return this._wrapped;
  };
  b.prototype.valueOf = b.prototype.toJSON = b.prototype.value;
  b.prototype.toString = function() {
    return "" + this._wrapped;
  };
  "function" == typeof define && define.amd && define("underscore", [], function() {
    return b;
  });
}).call(this);
