// Input 0
'use strict';
(function(g, B) {
  "object" === typeof exports && "undefined" !== typeof module ? module.exports = B() : "function" === typeof define && define.amd ? define(B) : g.moment = B();
})(this, function() {
  function g() {
    return hc.apply(null, arguments);
  }
  function B(a) {
    return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a);
  }
  function na(a) {
    return null != a && "[object Object]" === Object.prototype.toString.call(a);
  }
  function C(a) {
    return void 0 === a;
  }
  function fa(a) {
    return "number" === typeof a || "[object Number]" === Object.prototype.toString.call(a);
  }
  function xa(a) {
    return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a);
  }
  function ob(a, b) {
    var c = [], d;
    for (d = 0; d < a.length; ++d) {
      c.push(b(a[d], d));
    }
    return c;
  }
  function v(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function U(a, b) {
    for (var c in b) {
      v(b, c) && (a[c] = b[c]);
    }
    v(b, "toString") && (a.toString = b.toString);
    v(b, "valueOf") && (a.valueOf = b.valueOf);
    return a;
  }
  function K(a, b, c, d) {
    return pb(a, b, c, d, !0).utc();
  }
  function n(a) {
    null == a._pf && (a._pf = {empty:!1, unusedTokens:[], unusedInput:[], overflow:-2, charsLeftOver:0, nullInput:!1, invalidMonth:null, invalidFormat:!1, userInvalidated:!1, iso:!1, parsedDateParts:[], meridiem:null, rfc2822:!1, weekdayMismatch:!1});
    return a._pf;
  }
  function Pa(a) {
    if (null == a._isValid) {
      var b = n(a), c = ic.call(b.parsedDateParts, function(a) {
        return null != a;
      });
      c = !isNaN(a._d.getTime()) && 0 > b.overflow && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.weekdayMismatch && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c);
      a._strict && (c = c && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour);
      if (null != Object.isFrozen && Object.isFrozen(a)) {
        return c;
      }
      a._isValid = c;
    }
    return a._isValid;
  }
  function ya(a) {
    var b = K(NaN);
    null != a ? U(n(b), a) : n(b).userInvalidated = !0;
    return b;
  }
  function Qa(a, b) {
    var c;
    C(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject);
    C(b._i) || (a._i = b._i);
    C(b._f) || (a._f = b._f);
    C(b._l) || (a._l = b._l);
    C(b._strict) || (a._strict = b._strict);
    C(b._tzm) || (a._tzm = b._tzm);
    C(b._isUTC) || (a._isUTC = b._isUTC);
    C(b._offset) || (a._offset = b._offset);
    C(b._pf) || (a._pf = n(b));
    C(b._locale) || (a._locale = b._locale);
    if (0 < Ra.length) {
      for (c = 0; c < Ra.length; c++) {
        var d = Ra[c];
        var f = b[d];
        C(f) || (a[d] = f);
      }
    }
    return a;
  }
  function oa(a) {
    Qa(this, a);
    this._d = new Date(null != a._d ? a._d.getTime() : NaN);
    this.isValid() || (this._d = new Date(NaN));
    !1 === Sa && (Sa = !0, g.updateOffset(this), Sa = !1);
  }
  function L(a) {
    return a instanceof oa || null != a && null != a._isAMomentObject;
  }
  function E(a) {
    return 0 > a ? Math.ceil(a) || 0 : Math.floor(a);
  }
  function l(a) {
    a = +a;
    var b = 0;
    0 !== a && isFinite(a) && (b = E(a));
    return b;
  }
  function qb(a, b, c) {
    var d = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), V = 0, h;
    for (h = 0; h < d; h++) {
      (c && a[h] !== b[h] || !c && l(a[h]) !== l(b[h])) && V++;
    }
    return V + f;
  }
  function rb(a) {
    !1 === g.suppressDeprecationWarnings && "undefined" !== typeof console && console.warn && console.warn("Deprecation warning: " + a);
  }
  function F(a, b) {
    var c = !0;
    return U(function() {
      null != g.deprecationHandler && g.deprecationHandler(null, a);
      if (c) {
        for (var d = [], f, V = 0; V < arguments.length; V++) {
          f = "";
          if ("object" === typeof arguments[V]) {
            f += "\n[" + V + "] ";
            for (var h in arguments[0]) {
              f += h + ": " + arguments[0][h] + ", ";
            }
            f = f.slice(0, -2);
          } else {
            f = arguments[V];
          }
          d.push(f);
        }
        rb(a + "\nArguments: " + Array.prototype.slice.call(d).join("") + "\n" + Error().stack);
        c = !1;
      }
      return b.apply(this, arguments);
    }, b);
  }
  function sb(a, b) {
    null != g.deprecationHandler && g.deprecationHandler(a, b);
    tb[a] || (rb(b), tb[a] = !0);
  }
  function M(a) {
    return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a);
  }
  function ub(a, b) {
    var c = U({}, a), d;
    for (d in b) {
      v(b, d) && (na(a[d]) && na(b[d]) ? (c[d] = {}, U(c[d], a[d]), U(c[d], b[d])) : null != b[d] ? c[d] = b[d] : delete c[d]);
    }
    for (d in a) {
      v(a, d) && !v(b, d) && na(a[d]) && (c[d] = U({}, c[d]));
    }
    return c;
  }
  function Ta(a) {
    null != a && this.set(a);
  }
  function A(a, b) {
    var c = a.toLowerCase();
    pa[c] = pa[c + "s"] = pa[b] = a;
  }
  function G(a) {
    return "string" === typeof a ? pa[a] || pa[a.toLowerCase()] : void 0;
  }
  function Ua(a) {
    var b = {}, c, d;
    for (d in a) {
      v(a, d) && (c = G(d)) && (b[c] = a[d]);
    }
    return b;
  }
  function jc(a) {
    var b = [], c;
    for (c in a) {
      b.push({unit:c, priority:z[c]});
    }
    b.sort(function(a, b) {
      return a.priority - b.priority;
    });
    return b;
  }
  function P(a, b, c) {
    var d = "" + Math.abs(a);
    return (0 <= a ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, b - d.length)).toString().substr(1) + d;
  }
  function m(a, b, c, d) {
    var f = d;
    "string" === typeof d && (f = function() {
      return this[d]();
    });
    a && (ha[a] = f);
    b && (ha[b[0]] = function() {
      return P(f.apply(this, arguments), b[1], b[2]);
    });
    c && (ha[c] = function() {
      return this.localeData().ordinal(f.apply(this, arguments), a);
    });
  }
  function kc(a) {
    return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
  }
  function lc(a) {
    var b = a.match(vb), c;
    var d = 0;
    for (c = b.length; d < c; d++) {
      b[d] = ha[b[d]] ? ha[b[d]] : kc(b[d]);
    }
    return function(d) {
      var f = "", h;
      for (h = 0; h < c; h++) {
        f += M(b[h]) ? b[h].call(d, a) : b[h];
      }
      return f;
    };
  }
  function za(a, b) {
    if (!a.isValid()) {
      return a.localeData().invalidDate();
    }
    b = wb(b, a.localeData());
    Va[b] = Va[b] || lc(b);
    return Va[b](a);
  }
  function wb(a, b) {
    function c(a) {
      return b.longDateFormat(a) || a;
    }
    var d = 5;
    for (Aa.lastIndex = 0; 0 <= d && Aa.test(a);) {
      a = a.replace(Aa, c), Aa.lastIndex = 0, --d;
    }
    return a;
  }
  function k(a, b, c) {
    Wa[a] = M(b) ? b : function(a, f) {
      return a && c ? c : b;
    };
  }
  function mc(a, b) {
    return v(Wa, a) ? Wa[a](b._strict, b._locale) : new RegExp(nc(a));
  }
  function nc(a) {
    return aa(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, c, d, f, e) {
      return c || d || f || e;
    }));
  }
  function aa(a) {
    return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$\x26");
  }
  function r(a, b) {
    var c, d = b;
    "string" === typeof a && (a = [a]);
    fa(b) && (d = function(a, c) {
      c[b] = l(a);
    });
    for (c = 0; c < a.length; c++) {
      Xa[a[c]] = d;
    }
  }
  function qa(a, b) {
    r(a, function(a, d, f, e) {
      f._w = f._w || {};
      b(a, f._w, f, e);
    });
  }
  function W(a) {
    return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400;
  }
  function ia(a, b) {
    return function(c) {
      return null != c ? (xb(this, a, c), g.updateOffset(this, b), this) : Ba(this, a);
    };
  }
  function Ba(a, b) {
    return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN;
  }
  function xb(a, b, c) {
    if (a.isValid() && !isNaN(c)) {
      if ("FullYear" === b && W(a.year()) && 1 === a.month() && 29 === a.date()) {
        a._d["set" + (a._isUTC ? "UTC" : "") + b](c, a.month(), Ca(c, a.month()));
      } else {
        a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
      }
    }
  }
  function Ca(a, b) {
    if (isNaN(a) || isNaN(b)) {
      return NaN;
    }
    var c = (b % 12 + 12) % 12;
    return 1 === c ? W(a + (b - c) / 12) ? 29 : 28 : 31 - c % 7 % 2;
  }
  function yb(a, b) {
    if (!a.isValid()) {
      return a;
    }
    if ("string" === typeof b) {
      if (/^\d+$/.test(b)) {
        b = l(b);
      } else {
        if (b = a.localeData().monthsParse(b), !fa(b)) {
          return a;
        }
      }
    }
    var c = Math.min(a.date(), Ca(a.year(), b));
    a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c);
    return a;
  }
  function zb(a) {
    return null != a ? (yb(this, a), g.updateOffset(this, !0), this) : Ba(this, "Month");
  }
  function Ab() {
    function a(a, b) {
      return b.length - a.length;
    }
    var b = [], c = [], d = [], f;
    for (f = 0; 12 > f; f++) {
      var e = K([2000, f]);
      b.push(this.monthsShort(e, ""));
      c.push(this.months(e, ""));
      d.push(this.months(e, ""));
      d.push(this.monthsShort(e, ""));
    }
    b.sort(a);
    c.sort(a);
    d.sort(a);
    for (f = 0; 12 > f; f++) {
      b[f] = aa(b[f]), c[f] = aa(c[f]);
    }
    for (f = 0; 24 > f; f++) {
      d[f] = aa(d[f]);
    }
    this._monthsShortRegex = this._monthsRegex = new RegExp("^(" + d.join("|") + ")", "i");
    this._monthsStrictRegex = new RegExp("^(" + c.join("|") + ")", "i");
    this._monthsShortStrictRegex = new RegExp("^(" + b.join("|") + ")", "i");
  }
  function oc(a, b, c, d, f, e, h) {
    100 > a && 0 <= a ? (b = new Date(a + 400, b, c, d, f, e, h), isFinite(b.getFullYear()) && b.setFullYear(a)) : b = new Date(a, b, c, d, f, e, h);
    return b;
  }
  function ra(a) {
    if (100 > a && 0 <= a) {
      var b = Array.prototype.slice.call(arguments);
      b[0] = a + 400;
      b = new Date(Date.UTC.apply(null, b));
      isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a);
    } else {
      b = new Date(Date.UTC.apply(null, arguments));
    }
    return b;
  }
  function Da(a, b, c) {
    c = 7 + b - c;
    return -((7 + ra(a, 0, c).getUTCDay() - b) % 7) + c - 1;
  }
  function Bb(a, b, c, d, f) {
    c = (7 + c - d) % 7;
    d = Da(a, d, f);
    d = 1 + 7 * (b - 1) + c + d;
    0 >= d ? (b = a - 1, a = (W(b) ? 366 : 365) + d) : d > (W(a) ? 366 : 365) ? (b = a + 1, a = d - (W(a) ? 366 : 365)) : (b = a, a = d);
    return {year:b, dayOfYear:a};
  }
  function sa(a, b, c) {
    var d = Da(a.year(), b, c);
    d = Math.floor((a.dayOfYear() - d - 1) / 7) + 1;
    1 > d ? (a = a.year() - 1, b = d + ba(a, b, c)) : d > ba(a.year(), b, c) ? (b = d - ba(a.year(), b, c), a = a.year() + 1) : (a = a.year(), b = d);
    return {week:b, year:a};
  }
  function ba(a, b, c) {
    var d = Da(a, b, c);
    b = Da(a + 1, b, c);
    return ((W(a) ? 366 : 365) - d + b) / 7;
  }
  function Ya(a, b) {
    return a.slice(b, 7).concat(a.slice(0, b));
  }
  function pc(a, b, c) {
    var d;
    a = a.toLocaleLowerCase();
    if (!this._weekdaysParse) {
      for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; 7 > d; ++d) {
        var f = K([2000, 1]).day(d);
        this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase();
        this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase();
        this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
      }
    }
    if (c) {
      b = "dddd" === b ? w.call(this._weekdaysParse, a) : "ddd" === b ? w.call(this._shortWeekdaysParse, a) : w.call(this._minWeekdaysParse, a);
    } else {
      if ("dddd" === b) {
        b = w.call(this._weekdaysParse, a);
        if (-1 !== b) {
          return b;
        }
        b = w.call(this._shortWeekdaysParse, a);
        if (-1 !== b) {
          return b;
        }
        b = w.call(this._minWeekdaysParse, a);
      } else {
        if ("ddd" === b) {
          b = w.call(this._shortWeekdaysParse, a);
          if (-1 !== b) {
            return b;
          }
          b = w.call(this._weekdaysParse, a);
          if (-1 !== b) {
            return b;
          }
          b = w.call(this._minWeekdaysParse, a);
        } else {
          b = w.call(this._minWeekdaysParse, a);
          if (-1 !== b) {
            return b;
          }
          b = w.call(this._weekdaysParse, a);
          if (-1 !== b) {
            return b;
          }
          b = w.call(this._shortWeekdaysParse, a);
        }
      }
    }
    return -1 !== b ? b : null;
  }
  function Za() {
    function a(a, b) {
      return b.length - a.length;
    }
    var b = [], c = [], d = [], f = [], e;
    for (e = 0; 7 > e; e++) {
      var h = K([2000, 1]).day(e);
      var g = this.weekdaysMin(h, "");
      var k = this.weekdaysShort(h, "");
      h = this.weekdays(h, "");
      b.push(g);
      c.push(k);
      d.push(h);
      f.push(g);
      f.push(k);
      f.push(h);
    }
    b.sort(a);
    c.sort(a);
    d.sort(a);
    f.sort(a);
    for (e = 0; 7 > e; e++) {
      c[e] = aa(c[e]), d[e] = aa(d[e]), f[e] = aa(f[e]);
    }
    this._weekdaysMinRegex = this._weekdaysShortRegex = this._weekdaysRegex = new RegExp("^(" + f.join("|") + ")", "i");
    this._weekdaysStrictRegex = new RegExp("^(" + d.join("|") + ")", "i");
    this._weekdaysShortStrictRegex = new RegExp("^(" + c.join("|") + ")", "i");
    this._weekdaysMinStrictRegex = new RegExp("^(" + b.join("|") + ")", "i");
  }
  function $a() {
    return this.hours() % 12 || 12;
  }
  function Cb(a, b) {
    m(a, 0, 0, function() {
      return this.localeData().meridiem(this.hours(), this.minutes(), b);
    });
  }
  function Db(a, b) {
    return b._meridiemParse;
  }
  function Eb(a) {
    return a ? a.toLowerCase().replace("_", "-") : a;
  }
  function Ea(a) {
    var b = null;
    if (!x[a] && "undefined" !== typeof module && module && module.exports) {
      try {
        b = ta._abbr, require("./locale/" + a), ja(b);
      } catch (c) {
      }
    }
    return x[a];
  }
  function ja(a, b) {
    a && ((b = C(b) ? X(a) : ab(a, b)) ? ta = b : "undefined" !== typeof console && console.warn && console.warn("Locale " + a + " not found. Did you forget to load it?"));
    return ta._abbr;
  }
  function ab(a, b) {
    if (null !== b) {
      var c = Fb;
      b.abbr = a;
      if (null != x[a]) {
        sb("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = x[a]._config;
      } else {
        if (null != b.parentLocale) {
          if (null != x[b.parentLocale]) {
            c = x[b.parentLocale]._config;
          } else {
            if (c = Ea(b.parentLocale), null != c) {
              c = c._config;
            } else {
              return ua[b.parentLocale] || (ua[b.parentLocale] = []), ua[b.parentLocale].push({name:a, config:b}), null;
            }
          }
        }
      }
      x[a] = new Ta(ub(c, b));
      ua[a] && ua[a].forEach(function(a) {
        ab(a.name, a.config);
      });
      ja(a);
      return x[a];
    }
    delete x[a];
    return null;
  }
  function X(a) {
    var b;
    a && a._locale && a._locale._abbr && (a = a._locale._abbr);
    if (!a) {
      return ta;
    }
    if (!B(a)) {
      if (b = Ea(a)) {
        return b;
      }
      a = [a];
    }
    a: {
      b = 0;
      for (var c, d, f, e; b < a.length;) {
        e = Eb(a[b]).split("-");
        c = e.length;
        for (d = (d = Eb(a[b + 1])) ? d.split("-") : null; 0 < c;) {
          if (f = Ea(e.slice(0, c).join("-"))) {
            a = f;
            break a;
          }
          if (d && d.length >= c && qb(e, d, !0) >= c - 1) {
            break;
          }
          c--;
        }
        b++;
      }
      a = ta;
    }
    return a;
  }
  function bb(a) {
    var b;
    (b = a._a) && -2 === n(a).overflow && (b = 0 > b[Q] || 11 < b[Q] ? Q : 1 > b[N] || b[N] > Ca(b[H], b[Q]) ? N : 0 > b[y] || 24 < b[y] || 24 === b[y] && (0 !== b[I] || 0 !== b[R] || 0 !== b[ca]) ? y : 0 > b[I] || 59 < b[I] ? I : 0 > b[R] || 59 < b[R] ? R : 0 > b[ca] || 999 < b[ca] ? ca : -1, n(a)._overflowDayOfYear && (b < H || b > N) && (b = N), n(a)._overflowWeeks && -1 === b && (b = qc), n(a)._overflowWeekday && -1 === b && (b = rc), n(a).overflow = b);
    return a;
  }
  function ka(a, b, c) {
    return null != a ? a : null != b ? b : c;
  }
  function cb(a) {
    var b = [];
    if (!a._d) {
      var c = new Date(g.now());
      c = a._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()];
      if (a._w && null == a._a[N] && null == a._a[Q]) {
        var d = a._w;
        if (null != d.GG || null != d.W || null != d.E) {
          var f = 1;
          var e = 4;
          var h = ka(d.GG, a._a[H], sa(t(), 1, 4).year);
          var k = ka(d.W, 1);
          var m = ka(d.E, 1);
          if (1 > m || 7 < m) {
            var l = !0;
          }
        } else {
          if (f = a._locale._week.dow, e = a._locale._week.doy, k = sa(t(), f, e), h = ka(d.gg, a._a[H], k.year), k = ka(d.w, k.week), null != d.d) {
            if (m = d.d, 0 > m || 6 < m) {
              l = !0;
            }
          } else {
            if (null != d.e) {
              if (m = d.e + f, 0 > d.e || 6 < d.e) {
                l = !0;
              }
            } else {
              m = f;
            }
          }
        }
        1 > k || k > ba(h, f, e) ? n(a)._overflowWeeks = !0 : null != l ? n(a)._overflowWeekday = !0 : (l = Bb(h, k, m, f, e), a._a[H] = l.year, a._dayOfYear = l.dayOfYear);
      }
      if (null != a._dayOfYear) {
        l = ka(a._a[H], c[H]);
        if (a._dayOfYear > (W(l) ? 366 : 365) || 0 === a._dayOfYear) {
          n(a)._overflowDayOfYear = !0;
        }
        l = ra(l, 0, a._dayOfYear);
        a._a[Q] = l.getUTCMonth();
        a._a[N] = l.getUTCDate();
      }
      for (l = 0; 3 > l && null == a._a[l]; ++l) {
        a._a[l] = b[l] = c[l];
      }
      for (; 7 > l; l++) {
        a._a[l] = b[l] = null == a._a[l] ? 2 === l ? 1 : 0 : a._a[l];
      }
      24 === a._a[y] && 0 === a._a[I] && 0 === a._a[R] && 0 === a._a[ca] && (a._nextDay = !0, a._a[y] = 0);
      a._d = (a._useUTC ? ra : oc).apply(null, b);
      b = a._useUTC ? a._d.getUTCDay() : a._d.getDay();
      null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm);
      a._nextDay && (a._a[y] = 24);
      a._w && "undefined" !== typeof a._w.d && a._w.d !== b && (n(a).weekdayMismatch = !0);
    }
  }
  function Gb(a) {
    var b;
    var c = a._i;
    var d = sc.exec(c) || tc.exec(c);
    if (d) {
      n(a).iso = !0;
      c = 0;
      for (b = Fa.length; c < b; c++) {
        if (Fa[c][1].exec(d[1])) {
          var f = Fa[c][0];
          var e = !1 !== Fa[c][2];
          break;
        }
      }
      if (null == f) {
        a._isValid = !1;
      } else {
        if (d[3]) {
          c = 0;
          for (b = db.length; c < b; c++) {
            if (db[c][1].exec(d[3])) {
              var h = (d[2] || " ") + db[c][0];
              break;
            }
          }
          if (null == h) {
            a._isValid = !1;
            return;
          }
        }
        if (e || null == h) {
          if (d[4]) {
            if (uc.exec(d[4])) {
              var g = "Z";
            } else {
              a._isValid = !1;
              return;
            }
          }
          a._f = f + (h || "") + (g || "");
          eb(a);
        } else {
          a._isValid = !1;
        }
      }
    } else {
      a._isValid = !1;
    }
  }
  function Hb(a) {
    var b = vc.exec(a._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
    if (b) {
      var c = b[3], d = b[2], f = b[5], e = b[6], h = b[7], g = parseInt(b[4], 10);
      c = [49 >= g ? 2000 + g : 999 >= g ? 1900 + g : g, Ib.indexOf(c), parseInt(d, 10), parseInt(f, 10), parseInt(e, 10)];
      h && c.push(parseInt(h, 10));
      a: {
        if (h = b[1]) {
          if (h = Jb.indexOf(h), d = (new Date(c[0], c[1], c[2])).getDay(), h !== d) {
            n(a).weekdayMismatch = !0;
            h = a._isValid = !1;
            break a;
          }
        }
        h = !0;
      }
      h && (a._a = c, (h = b[8]) ? b = wc[h] : b[9] ? b = 0 : (b = parseInt(b[10], 10), h = b % 100, b = (b - h) / 100 * 60 + h), a._tzm = b, a._d = ra.apply(null, a._a), a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), n(a).rfc2822 = !0);
    } else {
      a._isValid = !1;
    }
  }
  function xc(a) {
    var b = yc.exec(a._i);
    null !== b ? a._d = new Date(+b[1]) : (Gb(a), !1 === a._isValid && (delete a._isValid, Hb(a), !1 === a._isValid && (delete a._isValid, g.createFromInputFallback(a))));
  }
  function eb(a) {
    if (a._f === g.ISO_8601) {
      Gb(a);
    } else {
      if (a._f === g.RFC_2822) {
        Hb(a);
      } else {
        a._a = [];
        n(a).empty = !0;
        var b = "" + a._i, c, d, f = b.length, e = 0;
        var h = wb(a._f, a._locale).match(vb) || [];
        for (c = 0; c < h.length; c++) {
          var k = h[c];
          if (d = (b.match(mc(k, a)) || [])[0]) {
            var l = b.substr(0, b.indexOf(d));
            0 < l.length && n(a).unusedInput.push(l);
            b = b.slice(b.indexOf(d) + d.length);
            e += d.length;
          }
          if (ha[k]) {
            if (d ? n(a).empty = !1 : n(a).unusedTokens.push(k), l = a, null != d && v(Xa, k)) {
              Xa[k](d, l._a, l, k);
            }
          } else {
            a._strict && !d && n(a).unusedTokens.push(k);
          }
        }
        n(a).charsLeftOver = f - e;
        0 < b.length && n(a).unusedInput.push(b);
        12 >= a._a[y] && !0 === n(a).bigHour && 0 < a._a[y] && (n(a).bigHour = void 0);
        n(a).parsedDateParts = a._a.slice(0);
        n(a).meridiem = a._meridiem;
        b = a._a;
        c = y;
        f = a._locale;
        h = a._a[y];
        e = a._meridiem;
        null != e && (null != f.meridiemHour ? h = f.meridiemHour(h, e) : null != f.isPM && ((f = f.isPM(e)) && 12 > h && (h += 12), f || 12 !== h || (h = 0)));
        b[c] = h;
        cb(a);
        bb(a);
      }
    }
  }
  function zc(a) {
    if (!a._d) {
      var b = Ua(a._i);
      a._a = ob([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function(a) {
        return a && parseInt(a, 10);
      });
      cb(a);
    }
  }
  function Kb(a) {
    var b = a._i, c = a._f;
    a._locale = a._locale || X(a._l);
    if (null === b || void 0 === c && "" === b) {
      return ya({nullInput:!0});
    }
    "string" === typeof b && (a._i = b = a._locale.preparse(b));
    if (L(b)) {
      return new oa(bb(b));
    }
    if (xa(b)) {
      a._d = b;
    } else {
      if (B(c)) {
        if (0 === a._f.length) {
          n(a).invalidFormat = !0, a._d = new Date(NaN);
        } else {
          for (b = 0; b < a._f.length; b++) {
            c = 0;
            var d = Qa({}, a);
            null != a._useUTC && (d._useUTC = a._useUTC);
            d._f = a._f[b];
            eb(d);
            if (Pa(d) && (c += n(d).charsLeftOver, c += 10 * n(d).unusedTokens.length, n(d).score = c, null == f || c < f)) {
              var f = c;
              var e = d;
            }
          }
          U(a, e || d);
        }
      } else {
        c ? eb(a) : Ac(a);
      }
    }
    Pa(a) || (a._d = null);
    return a;
  }
  function Ac(a) {
    var b = a._i;
    C(b) ? a._d = new Date(g.now()) : xa(b) ? a._d = new Date(b.valueOf()) : "string" === typeof b ? xc(a) : B(b) ? (a._a = ob(b.slice(0), function(a) {
      return parseInt(a, 10);
    }), cb(a)) : na(b) ? zc(a) : fa(b) ? a._d = new Date(b) : g.createFromInputFallback(a);
  }
  function pb(a, b, c, d, f) {
    var e = {};
    if (!0 === c || !1 === c) {
      d = c, c = void 0;
    }
    var h;
    if (h = na(a)) {
      a: {
        if (h = a, Object.getOwnPropertyNames) {
          h = 0 === Object.getOwnPropertyNames(h).length;
        } else {
          for (var g in h) {
            if (h.hasOwnProperty(g)) {
              h = !1;
              break a;
            }
          }
          h = !0;
        }
      }
    }
    if (h || B(a) && 0 === a.length) {
      a = void 0;
    }
    e._isAMomentObject = !0;
    e._useUTC = e._isUTC = f;
    e._l = c;
    e._i = a;
    e._f = b;
    e._strict = d;
    a = new oa(bb(Kb(e)));
    a._nextDay && (a.add(1, "d"), a._nextDay = void 0);
    return a;
  }
  function t(a, b, c, d) {
    return pb(a, b, c, d, !1);
  }
  function Lb(a, b) {
    var c;
    1 === b.length && B(b[0]) && (b = b[0]);
    if (!b.length) {
      return t();
    }
    var d = b[0];
    for (c = 1; c < b.length; ++c) {
      if (!b[c].isValid() || b[c][a](d)) {
        d = b[c];
      }
    }
    return d;
  }
  function Ga(a) {
    var b = Ua(a);
    a = b.year || 0;
    var c = b.quarter || 0, d = b.month || 0, f = b.week || b.isoWeek || 0, e = b.day || 0, h = b.hour || 0, g = b.minute || 0, k = b.second || 0, m = b.millisecond || 0;
    a: {
      for (var n in b) {
        if (-1 === w.call(va, n) || null != b[n] && isNaN(b[n])) {
          b = !1;
          break a;
        }
      }
      n = !1;
      for (var p = 0; p < va.length; ++p) {
        if (b[va[p]]) {
          if (n) {
            b = !1;
            break a;
          }
          parseFloat(b[va[p]]) !== l(b[va[p]]) && (n = !0);
        }
      }
      b = !0;
    }
    this._isValid = b;
    this._milliseconds = +m + 1e3 * k + 6e4 * g + 36E5 * h;
    this._days = +e + 7 * f;
    this._months = +d + 3 * c + 12 * a;
    this._data = {};
    this._locale = X();
    this._bubble();
  }
  function fb(a) {
    return a instanceof Ga;
  }
  function gb(a) {
    return 0 > a ? -1 * Math.round(-1 * a) : Math.round(a);
  }
  function Mb(a, b) {
    m(a, 0, 0, function() {
      var a = this.utcOffset(), d = "+";
      0 > a && (a = -a, d = "-");
      return d + P(~~(a / 60), 2) + b + P(~~a % 60, 2);
    });
  }
  function hb(a, b) {
    a = (b || "").match(a);
    if (null === a) {
      return null;
    }
    a = ((a[a.length - 1] || []) + "").match(Bc) || ["-", 0, 0];
    b = +(60 * a[1]) + l(a[2]);
    return 0 === b ? 0 : "+" === a[0] ? b : -b;
  }
  function ib(a, b) {
    return b._isUTC ? (b = b.clone(), a = (L(a) || xa(a) ? a.valueOf() : t(a).valueOf()) - b.valueOf(), b._d.setTime(b._d.valueOf() + a), g.updateOffset(b, !1), b) : t(a).local();
  }
  function Nb() {
    return this.isValid() ? this._isUTC && 0 === this._offset : !1;
  }
  function J(a, b) {
    var c = a;
    fb(a) ? c = {ms:a._milliseconds, d:a._days, M:a._months} : fa(a) ? (c = {}, b ? c[b] = a : c.milliseconds = a) : (b = Cc.exec(a)) ? (c = "-" === b[1] ? -1 : 1, c = {y:0, d:l(b[N]) * c, h:l(b[y]) * c, m:l(b[I]) * c, s:l(b[R]) * c, ms:l(gb(1000 * b[ca])) * c}) : (b = Dc.exec(a)) ? (c = "-" === b[1] ? -1 : 1, c = {y:da(b[2], c), M:da(b[3], c), w:da(b[4], c), d:da(b[5], c), h:da(b[6], c), m:da(b[7], c), s:da(b[8], c)}) : null == c ? c = {} : "object" === typeof c && ("from" in c || "to" in c) && 
    (b = t(c.from), c = t(c.to), b.isValid() && c.isValid() ? (c = ib(c, b), b.isBefore(c) ? c = Ob(b, c) : (c = Ob(c, b), c.milliseconds = -c.milliseconds, c.months = -c.months), b = c) : b = {milliseconds:0, months:0}, c = {}, c.ms = b.milliseconds, c.M = b.months);
    c = new Ga(c);
    fb(a) && v(a, "_locale") && (c._locale = a._locale);
    return c;
  }
  function da(a, b) {
    a = a && parseFloat(a.replace(",", "."));
    return (isNaN(a) ? 0 : a) * b;
  }
  function Ob(a, b) {
    var c = {};
    c.months = b.month() - a.month() + 12 * (b.year() - a.year());
    a.clone().add(c.months, "M").isAfter(b) && --c.months;
    c.milliseconds = +b - +a.clone().add(c.months, "M");
    return c;
  }
  function Pb(a, b) {
    return function(c, d) {
      if (null !== d && !isNaN(+d)) {
        sb(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
        var f = c;
        c = d;
        d = f;
      }
      c = J("string" === typeof c ? +c : c, d);
      Qb(this, c, a);
      return this;
    };
  }
  function Qb(a, b, c, d) {
    var f = b._milliseconds, e = gb(b._days);
    b = gb(b._months);
    a.isValid() && (d = null == d ? !0 : d, b && yb(a, Ba(a, "Month") + b * c), e && xb(a, "Date", Ba(a, "Date") + e * c), f && a._d.setTime(a._d.valueOf() + f * c), d && g.updateOffset(a, e || b));
  }
  function jb(a, b) {
    var c = 12 * (b.year() - a.year()) + (b.month() - a.month()), d = a.clone().add(c, "months");
    0 > b - d ? (a = a.clone().add(c - 1, "months"), b = (b - d) / (d - a)) : (a = a.clone().add(c + 1, "months"), b = (b - d) / (a - d));
    return -(c + b) || 0;
  }
  function Rb(a) {
    if (void 0 === a) {
      return this._locale._abbr;
    }
    a = X(a);
    null != a && (this._locale = a);
    return this;
  }
  function Sb() {
    return this._locale;
  }
  function la(a, b) {
    return (a % b + b) % b;
  }
  function Tb(a, b, c) {
    return 100 > a && 0 <= a ? new Date(a + 400, b, c) - 126227808E5 : (new Date(a, b, c)).valueOf();
  }
  function Ub(a, b, c) {
    return 100 > a && 0 <= a ? Date.UTC(a + 400, b, c) - 126227808E5 : Date.UTC(a, b, c);
  }
  function Ha(a, b) {
    m(0, [a, a.length], 0, b);
  }
  function Vb(a, b, c, d, f) {
    if (null == a) {
      return sa(this, d, f).year;
    }
    var e = ba(a, d, f);
    b > e && (b = e);
    a = Bb(a, b, c, d, f);
    a = ra(a.year, 0, a.dayOfYear);
    this.year(a.getUTCFullYear());
    this.month(a.getUTCMonth());
    this.date(a.getUTCDate());
    return this;
  }
  function Ec(a, b) {
    b[ca] = l(1000 * ("0." + a));
  }
  function Wb(a) {
    return a;
  }
  function Ia(a, b, c, d) {
    var f = X();
    b = K().set(d, b);
    return f[c](b, a);
  }
  function Xb(a, b, c) {
    fa(a) && (b = a, a = void 0);
    a = a || "";
    if (null != b) {
      return Ia(a, b, c, "month");
    }
    var d = [];
    for (b = 0; 12 > b; b++) {
      d[b] = Ia(a, b, c, "month");
    }
    return d;
  }
  function kb(a, b, c, d) {
    "boolean" !== typeof a && (c = b = a, a = !1);
    fa(b) && (c = b, b = void 0);
    b = b || "";
    var f = X();
    a = a ? f._week.dow : 0;
    if (null != c) {
      return Ia(b, (c + a) % 7, d, "day");
    }
    f = [];
    for (c = 0; 7 > c; c++) {
      f[c] = Ia(b, (c + a) % 7, d, "day");
    }
    return f;
  }
  function Yb(a, b, c, d) {
    b = J(b, c);
    a._milliseconds += d * b._milliseconds;
    a._days += d * b._days;
    a._months += d * b._months;
    return a._bubble();
  }
  function Zb(a) {
    return 0 > a ? Math.floor(a) : Math.ceil(a);
  }
  function S(a) {
    return function() {
      return this.as(a);
    };
  }
  function ea(a) {
    return function() {
      return this.isValid() ? this._data[a] : NaN;
    };
  }
  function Fc(a, b, c, d, f) {
    return f.relativeTime(b || 1, !!c, a, d);
  }
  function ma(a) {
    return (0 < a) - (0 > a) || +a;
  }
  function Ja() {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }
    var a = lb(this._milliseconds) / 1000, b = lb(this._days), c = lb(this._months);
    var d = E(a / 60);
    var f = E(d / 60);
    a %= 60;
    d %= 60;
    var e = E(c / 12);
    c %= 12;
    a = a ? a.toFixed(3).replace(/\.?0+$/, "") : "";
    var h = this.asSeconds();
    if (!h) {
      return "P0D";
    }
    var g = 0 > h ? "-" : "", k = ma(this._months) !== ma(h) ? "-" : "", l = ma(this._days) !== ma(h) ? "-" : "";
    h = ma(this._milliseconds) !== ma(h) ? "-" : "";
    return g + "P" + (e ? k + e + "Y" : "") + (c ? k + c + "M" : "") + (b ? l + b + "D" : "") + (f || d || a ? "T" : "") + (f ? h + f + "H" : "") + (d ? h + d + "M" : "") + (a ? h + a + "S" : "");
  }
  var ic = Array.prototype.some ? Array.prototype.some : function(a) {
    for (var b = Object(this), c = b.length >>> 0, d = 0; d < c; d++) {
      if (d in b && a.call(this, b[d], d, b)) {
        return !0;
      }
    }
    return !1;
  };
  var Ra = g.momentProperties = [], Sa = !1, tb = {};
  g.suppressDeprecationWarnings = !1;
  g.deprecationHandler = null;
  var Gc = Object.keys ? Object.keys : function(a) {
    var b, c = [];
    for (b in a) {
      v(a, b) && c.push(b);
    }
    return c;
  };
  var pa = {}, z = {}, vb = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Aa = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Va = {}, ha = {}, $b = /\d/, D = /\d\d/, ac = /\d{3}/, mb = /\d{4}/, Ka = /[+-]?\d{6}/, u = /\d\d?/, bc = /\d\d\d\d?/, cc = /\d\d\d\d\d\d?/, La = /\d{1,3}/, nb = /\d{1,4}/, Ma = /[+-]?\d{1,6}/, Hc = /\d+/, Na = /[+-]?\d+/, Ic = /Z|[+-]\d\d:?\d\d/gi, 
  Oa = /Z|[+-]\d\d(?::?\d\d)?/gi, wa = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Wa = {}, Xa = {}, H = 0, Q = 1, N = 2, y = 3, I = 4, R = 5, ca = 6, qc = 7, rc = 8;
  m("Y", 0, 0, function() {
    var a = this.year();
    return 9999 >= a ? "" + a : "+" + a;
  });
  m(0, ["YY", 2], 0, function() {
    return this.year() % 100;
  });
  m(0, ["YYYY", 4], 0, "year");
  m(0, ["YYYYY", 5], 0, "year");
  m(0, ["YYYYYY", 6, !0], 0, "year");
  A("year", "y");
  z.year = 1;
  k("Y", Na);
  k("YY", u, D);
  k("YYYY", nb, mb);
  k("YYYYY", Ma, Ka);
  k("YYYYYY", Ma, Ka);
  r(["YYYYY", "YYYYYY"], H);
  r("YYYY", function(a, b) {
    b[H] = 2 === a.length ? g.parseTwoDigitYear(a) : l(a);
  });
  r("YY", function(a, b) {
    b[H] = g.parseTwoDigitYear(a);
  });
  r("Y", function(a, b) {
    b[H] = parseInt(a, 10);
  });
  g.parseTwoDigitYear = function(a) {
    return l(a) + (68 < l(a) ? 1900 : 2000);
  };
  var dc = ia("FullYear", !0);
  var w = Array.prototype.indexOf ? Array.prototype.indexOf : function(a) {
    var b;
    for (b = 0; b < this.length; ++b) {
      if (this[b] === a) {
        return b;
      }
    }
    return -1;
  };
  m("M", ["MM", 2], "Mo", function() {
    return this.month() + 1;
  });
  m("MMM", 0, 0, function(a) {
    return this.localeData().monthsShort(this, a);
  });
  m("MMMM", 0, 0, function(a) {
    return this.localeData().months(this, a);
  });
  A("month", "M");
  z.month = 8;
  k("M", u);
  k("MM", u, D);
  k("MMM", function(a, b) {
    return b.monthsShortRegex(a);
  });
  k("MMMM", function(a, b) {
    return b.monthsRegex(a);
  });
  r(["M", "MM"], function(a, b) {
    b[Q] = l(a) - 1;
  });
  r(["MMM", "MMMM"], function(a, b, c, d) {
    d = c._locale.monthsParse(a, d, c._strict);
    null != d ? b[Q] = d : n(c).invalidMonth = a;
  });
  var ec = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Ib = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  m("w", ["ww", 2], "wo", "week");
  m("W", ["WW", 2], "Wo", "isoWeek");
  A("week", "w");
  A("isoWeek", "W");
  z.week = 5;
  z.isoWeek = 5;
  k("w", u);
  k("ww", u, D);
  k("W", u);
  k("WW", u, D);
  qa(["w", "ww", "W", "WW"], function(a, b, c, d) {
    b[d.substr(0, 1)] = l(a);
  });
  m("d", 0, "do", "day");
  m("dd", 0, 0, function(a) {
    return this.localeData().weekdaysMin(this, a);
  });
  m("ddd", 0, 0, function(a) {
    return this.localeData().weekdaysShort(this, a);
  });
  m("dddd", 0, 0, function(a) {
    return this.localeData().weekdays(this, a);
  });
  m("e", 0, 0, "weekday");
  m("E", 0, 0, "isoWeekday");
  A("day", "d");
  A("weekday", "e");
  A("isoWeekday", "E");
  z.day = 11;
  z.weekday = 11;
  z.isoWeekday = 11;
  k("d", u);
  k("e", u);
  k("E", u);
  k("dd", function(a, b) {
    return b.weekdaysMinRegex(a);
  });
  k("ddd", function(a, b) {
    return b.weekdaysShortRegex(a);
  });
  k("dddd", function(a, b) {
    return b.weekdaysRegex(a);
  });
  qa(["dd", "ddd", "dddd"], function(a, b, c, d) {
    d = c._locale.weekdaysParse(a, d, c._strict);
    null != d ? b.d = d : n(c).invalidWeekday = a;
  });
  qa(["d", "e", "E"], function(a, b, c, d) {
    b[d] = l(a);
  });
  var Jb = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
  m("H", ["HH", 2], 0, "hour");
  m("h", ["hh", 2], 0, $a);
  m("k", ["kk", 2], 0, function() {
    return this.hours() || 24;
  });
  m("hmm", 0, 0, function() {
    return "" + $a.apply(this) + P(this.minutes(), 2);
  });
  m("hmmss", 0, 0, function() {
    return "" + $a.apply(this) + P(this.minutes(), 2) + P(this.seconds(), 2);
  });
  m("Hmm", 0, 0, function() {
    return "" + this.hours() + P(this.minutes(), 2);
  });
  m("Hmmss", 0, 0, function() {
    return "" + this.hours() + P(this.minutes(), 2) + P(this.seconds(), 2);
  });
  Cb("a", !0);
  Cb("A", !1);
  A("hour", "h");
  z.hour = 13;
  k("a", Db);
  k("A", Db);
  k("H", u);
  k("h", u);
  k("k", u);
  k("HH", u, D);
  k("hh", u, D);
  k("kk", u, D);
  k("hmm", bc);
  k("hmmss", cc);
  k("Hmm", bc);
  k("Hmmss", cc);
  r(["H", "HH"], y);
  r(["k", "kk"], function(a, b, c) {
    a = l(a);
    b[y] = 24 === a ? 0 : a;
  });
  r(["a", "A"], function(a, b, c) {
    c._isPm = c._locale.isPM(a);
    c._meridiem = a;
  });
  r(["h", "hh"], function(a, b, c) {
    b[y] = l(a);
    n(c).bigHour = !0;
  });
  r("hmm", function(a, b, c) {
    var d = a.length - 2;
    b[y] = l(a.substr(0, d));
    b[I] = l(a.substr(d));
    n(c).bigHour = !0;
  });
  r("hmmss", function(a, b, c) {
    var d = a.length - 4, e = a.length - 2;
    b[y] = l(a.substr(0, d));
    b[I] = l(a.substr(d, 2));
    b[R] = l(a.substr(e));
    n(c).bigHour = !0;
  });
  r("Hmm", function(a, b, c) {
    c = a.length - 2;
    b[y] = l(a.substr(0, c));
    b[I] = l(a.substr(c));
  });
  r("Hmmss", function(a, b, c) {
    c = a.length - 4;
    var d = a.length - 2;
    b[y] = l(a.substr(0, c));
    b[I] = l(a.substr(c, 2));
    b[R] = l(a.substr(d));
  });
  var Jc = ia("Hours", !0), Fb = {calendar:{sameDay:"[Today at] LT", nextDay:"[Tomorrow at] LT", nextWeek:"dddd [at] LT", lastDay:"[Yesterday at] LT", lastWeek:"[Last] dddd [at] LT", sameElse:"L"}, longDateFormat:{LTS:"h:mm:ss A", LT:"h:mm A", L:"MM/DD/YYYY", LL:"MMMM D, YYYY", LLL:"MMMM D, YYYY h:mm A", LLLL:"dddd, MMMM D, YYYY h:mm A"}, invalidDate:"Invalid date", ordinal:"%d", dayOfMonthOrdinalParse:/\d{1,2}/, relativeTime:{future:"in %s", past:"%s ago", s:"a few seconds", ss:"%d seconds", m:"a minute", 
  mm:"%d minutes", h:"an hour", hh:"%d hours", d:"a day", dd:"%d days", M:"a month", MM:"%d months", y:"a year", yy:"%d years"}, months:"January February March April May June July August September October November December".split(" "), monthsShort:Ib, week:{dow:0, doy:6}, weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), weekdaysMin:"Su Mo Tu We Th Fr Sa".split(" "), weekdaysShort:Jb, meridiemParse:/[ap]\.?m?\.?/i}, x = {}, ua = {}, ta, sc = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, 
  tc = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, uc = /Z|[+-]\d\d(?::?\d\d)?/, Fa = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, 
  !1], ["YYYYDDD", /\d{7}/]], db = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], yc = /^\/?Date\((\-?\d+)/i, vc = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, 
  wc = {UT:0, GMT:0, EDT:-240, EST:-300, CDT:-300, CST:-360, MDT:-360, MST:-420, PDT:-420, PST:-480};
  g.createFromInputFallback = F("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(a) {
    a._d = new Date(a._i + (a._useUTC ? " UTC" : ""));
  });
  g.ISO_8601 = function() {
  };
  g.RFC_2822 = function() {
  };
  var Kc = F("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
    var a = t.apply(null, arguments);
    return this.isValid() && a.isValid() ? a < this ? this : a : ya();
  }), Lc = F("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
    var a = t.apply(null, arguments);
    return this.isValid() && a.isValid() ? a > this ? this : a : ya();
  }), va = "year quarter month week day hour minute second millisecond".split(" ");
  Mb("Z", ":");
  Mb("ZZ", "");
  k("Z", Oa);
  k("ZZ", Oa);
  r(["Z", "ZZ"], function(a, b, c) {
    c._useUTC = !0;
    c._tzm = hb(Oa, a);
  });
  var Bc = /([\+\-]|\d\d)/gi;
  g.updateOffset = function() {
  };
  var Cc = /^(\-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, Dc = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  J.fn = Ga.prototype;
  J.invalid = function() {
    return J(NaN);
  };
  var Mc = Pb(1, "add"), Nc = Pb(-1, "subtract");
  g.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
  g.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
  var fc = F("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(a) {
    return void 0 === a ? this.localeData() : this.locale(a);
  });
  m(0, ["gg", 2], 0, function() {
    return this.weekYear() % 100;
  });
  m(0, ["GG", 2], 0, function() {
    return this.isoWeekYear() % 100;
  });
  Ha("gggg", "weekYear");
  Ha("ggggg", "weekYear");
  Ha("GGGG", "isoWeekYear");
  Ha("GGGGG", "isoWeekYear");
  A("weekYear", "gg");
  A("isoWeekYear", "GG");
  z.weekYear = 1;
  z.isoWeekYear = 1;
  k("G", Na);
  k("g", Na);
  k("GG", u, D);
  k("gg", u, D);
  k("GGGG", nb, mb);
  k("gggg", nb, mb);
  k("GGGGG", Ma, Ka);
  k("ggggg", Ma, Ka);
  qa(["gggg", "ggggg", "GGGG", "GGGGG"], function(a, b, c, d) {
    b[d.substr(0, 2)] = l(a);
  });
  qa(["gg", "GG"], function(a, b, c, d) {
    b[d] = g.parseTwoDigitYear(a);
  });
  m("Q", 0, "Qo", "quarter");
  A("quarter", "Q");
  z.quarter = 7;
  k("Q", $b);
  r("Q", function(a, b) {
    b[Q] = 3 * (l(a) - 1);
  });
  m("D", ["DD", 2], "Do", "date");
  A("date", "D");
  z.date = 9;
  k("D", u);
  k("DD", u, D);
  k("Do", function(a, b) {
    return a ? b._dayOfMonthOrdinalParse || b._ordinalParse : b._dayOfMonthOrdinalParseLenient;
  });
  r(["D", "DD"], N);
  r("Do", function(a, b) {
    b[N] = l(a.match(u)[0]);
  });
  var gc = ia("Date", !0);
  m("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
  A("dayOfYear", "DDD");
  z.dayOfYear = 4;
  k("DDD", La);
  k("DDDD", ac);
  r(["DDD", "DDDD"], function(a, b, c) {
    c._dayOfYear = l(a);
  });
  m("m", ["mm", 2], 0, "minute");
  A("minute", "m");
  z.minute = 14;
  k("m", u);
  k("mm", u, D);
  r(["m", "mm"], I);
  var Oc = ia("Minutes", !1);
  m("s", ["ss", 2], 0, "second");
  A("second", "s");
  z.second = 15;
  k("s", u);
  k("ss", u, D);
  r(["s", "ss"], R);
  var Pc = ia("Seconds", !1);
  m("S", 0, 0, function() {
    return ~~(this.millisecond() / 100);
  });
  m(0, ["SS", 2], 0, function() {
    return ~~(this.millisecond() / 10);
  });
  m(0, ["SSS", 3], 0, "millisecond");
  m(0, ["SSSS", 4], 0, function() {
    return 10 * this.millisecond();
  });
  m(0, ["SSSSS", 5], 0, function() {
    return 100 * this.millisecond();
  });
  m(0, ["SSSSSS", 6], 0, function() {
    return 1000 * this.millisecond();
  });
  m(0, ["SSSSSSS", 7], 0, function() {
    return 10000 * this.millisecond();
  });
  m(0, ["SSSSSSSS", 8], 0, function() {
    return 100000 * this.millisecond();
  });
  m(0, ["SSSSSSSSS", 9], 0, function() {
    return 1000000 * this.millisecond();
  });
  A("millisecond", "ms");
  z.millisecond = 16;
  k("S", La, $b);
  k("SS", La, D);
  k("SSS", La, ac);
  var Y;
  for (Y = "SSSS"; 9 >= Y.length; Y += "S") {
    k(Y, Hc);
  }
  for (Y = "S"; 9 >= Y.length; Y += "S") {
    r(Y, Ec);
  }
  var Qc = ia("Milliseconds", !1);
  m("z", 0, 0, "zoneAbbr");
  m("zz", 0, 0, "zoneName");
  var e = oa.prototype;
  e.add = Mc;
  e.calendar = function(a, b) {
    a = a || t();
    var c = ib(a, this).startOf("day");
    c = g.calendarFormat(this, c) || "sameElse";
    b = b && (M(b[c]) ? b[c].call(this, a) : b[c]);
    return this.format(b || this.localeData().calendar(c, this, t(a)));
  };
  e.clone = function() {
    return new oa(this);
  };
  e.diff = function(a, b, c) {
    if (!this.isValid()) {
      return NaN;
    }
    a = ib(a, this);
    if (!a.isValid()) {
      return NaN;
    }
    var d = 6e4 * (a.utcOffset() - this.utcOffset());
    b = G(b);
    switch(b) {
      case "year":
        b = jb(this, a) / 12;
        break;
      case "month":
        b = jb(this, a);
        break;
      case "quarter":
        b = jb(this, a) / 3;
        break;
      case "second":
        b = (this - a) / 1e3;
        break;
      case "minute":
        b = (this - a) / 6e4;
        break;
      case "hour":
        b = (this - a) / 36e5;
        break;
      case "day":
        b = (this - a - d) / 864e5;
        break;
      case "week":
        b = (this - a - d) / 6048e5;
        break;
      default:
        b = this - a;
    }
    return c ? b : E(b);
  };
  e.endOf = function(a) {
    a = G(a);
    if (void 0 === a || "millisecond" === a || !this.isValid()) {
      return this;
    }
    var b = this._isUTC ? Ub : Tb;
    switch(a) {
      case "year":
        var c = b(this.year() + 1, 0, 1) - 1;
        break;
      case "quarter":
        c = b(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;
      case "month":
        c = b(this.year(), this.month() + 1, 1) - 1;
        break;
      case "week":
        c = b(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;
      case "isoWeek":
        c = b(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;
      case "day":
      case "date":
        c = b(this.year(), this.month(), this.date() + 1) - 1;
        break;
      case "hour":
        c = this._d.valueOf();
        c += 36E5 - la(c + (this._isUTC ? 0 : 6E4 * this.utcOffset()), 36E5) - 1;
        break;
      case "minute":
        c = this._d.valueOf();
        c += 6E4 - la(c, 6E4) - 1;
        break;
      case "second":
        c = this._d.valueOf(), c += 1000 - la(c, 1000) - 1;
    }
    this._d.setTime(c);
    g.updateOffset(this, !0);
    return this;
  };
  e.format = function(a) {
    a || (a = this.isUtc() ? g.defaultFormatUtc : g.defaultFormat);
    a = za(this, a);
    return this.localeData().postformat(a);
  };
  e.from = function(a, b) {
    return this.isValid() && (L(a) && a.isValid() || t(a).isValid()) ? J({to:this, from:a}).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  };
  e.fromNow = function(a) {
    return this.from(t(), a);
  };
  e.to = function(a, b) {
    return this.isValid() && (L(a) && a.isValid() || t(a).isValid()) ? J({from:this, to:a}).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  };
  e.toNow = function(a) {
    return this.to(t(), a);
  };
  e.get = function(a) {
    a = G(a);
    return M(this[a]) ? this[a]() : this;
  };
  e.invalidAt = function() {
    return n(this).overflow;
  };
  e.isAfter = function(a, b) {
    a = L(a) ? a : t(a);
    if (!this.isValid() || !a.isValid()) {
      return !1;
    }
    b = G(b) || "millisecond";
    return "millisecond" === b ? this.valueOf() > a.valueOf() : a.valueOf() < this.clone().startOf(b).valueOf();
  };
  e.isBefore = function(a, b) {
    a = L(a) ? a : t(a);
    if (!this.isValid() || !a.isValid()) {
      return !1;
    }
    b = G(b) || "millisecond";
    return "millisecond" === b ? this.valueOf() < a.valueOf() : this.clone().endOf(b).valueOf() < a.valueOf();
  };
  e.isBetween = function(a, b, c, d) {
    a = L(a) ? a : t(a);
    b = L(b) ? b : t(b);
    if (!(this.isValid() && a.isValid() && b.isValid())) {
      return !1;
    }
    d = d || "()";
    return ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c));
  };
  e.isSame = function(a, b) {
    a = L(a) ? a : t(a);
    if (!this.isValid() || !a.isValid()) {
      return !1;
    }
    b = G(b) || "millisecond";
    if ("millisecond" === b) {
      return this.valueOf() === a.valueOf();
    }
    a = a.valueOf();
    return this.clone().startOf(b).valueOf() <= a && a <= this.clone().endOf(b).valueOf();
  };
  e.isSameOrAfter = function(a, b) {
    return this.isSame(a, b) || this.isAfter(a, b);
  };
  e.isSameOrBefore = function(a, b) {
    return this.isSame(a, b) || this.isBefore(a, b);
  };
  e.isValid = function() {
    return Pa(this);
  };
  e.lang = fc;
  e.locale = Rb;
  e.localeData = Sb;
  e.max = Lc;
  e.min = Kc;
  e.parsingFlags = function() {
    return U({}, n(this));
  };
  e.set = function(a, b) {
    if ("object" === typeof a) {
      a = Ua(a);
      b = jc(a);
      for (var c = 0; c < b.length; c++) {
        this[b[c].unit](a[b[c].unit]);
      }
    } else {
      if (a = G(a), M(this[a])) {
        return this[a](b);
      }
    }
    return this;
  };
  e.startOf = function(a) {
    a = G(a);
    if (void 0 === a || "millisecond" === a || !this.isValid()) {
      return this;
    }
    var b = this._isUTC ? Ub : Tb;
    switch(a) {
      case "year":
        var c = b(this.year(), 0, 1);
        break;
      case "quarter":
        c = b(this.year(), this.month() - this.month() % 3, 1);
        break;
      case "month":
        c = b(this.year(), this.month(), 1);
        break;
      case "week":
        c = b(this.year(), this.month(), this.date() - this.weekday());
        break;
      case "isoWeek":
        c = b(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;
      case "day":
      case "date":
        c = b(this.year(), this.month(), this.date());
        break;
      case "hour":
        c = this._d.valueOf();
        c -= la(c + (this._isUTC ? 0 : 6E4 * this.utcOffset()), 36E5);
        break;
      case "minute":
        c = this._d.valueOf();
        c -= la(c, 6E4);
        break;
      case "second":
        c = this._d.valueOf(), c -= la(c, 1000);
    }
    this._d.setTime(c);
    g.updateOffset(this, !0);
    return this;
  };
  e.subtract = Nc;
  e.toArray = function() {
    return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()];
  };
  e.toObject = function() {
    return {years:this.year(), months:this.month(), date:this.date(), hours:this.hours(), minutes:this.minutes(), seconds:this.seconds(), milliseconds:this.milliseconds()};
  };
  e.toDate = function() {
    return new Date(this.valueOf());
  };
  e.toISOString = function(a) {
    if (!this.isValid()) {
      return null;
    }
    var b = (a = !0 !== a) ? this.clone().utc() : this;
    return 0 > b.year() || 9999 < b.year() ? za(b, a ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : M(Date.prototype.toISOString) ? a ? this.toDate().toISOString() : (new Date(this.valueOf() + 6E4 * this.utcOffset())).toISOString().replace("Z", za(b, "Z")) : za(b, a ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
  };
  e.inspect = function() {
    if (!this.isValid()) {
      return "moment.invalid(/* " + this._i + " */)";
    }
    var a = "moment", b = "";
    this.isLocal() || (a = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", b = "Z");
    a = "[" + a + '("]';
    var c = 0 <= this.year() && 9999 >= this.year() ? "YYYY" : "YYYYYY";
    return this.format(a + c + "-MM-DD[T]HH:mm:ss.SSS" + (b + '[")]'));
  };
  e.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  };
  e.toString = function() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  };
  e.unix = function() {
    return Math.floor(this.valueOf() / 1000);
  };
  e.valueOf = function() {
    return this._d.valueOf() - 60000 * (this._offset || 0);
  };
  e.creationData = function() {
    return {input:this._i, format:this._f, locale:this._locale, isUTC:this._isUTC, strict:this._strict};
  };
  e.year = dc;
  e.isLeapYear = function() {
    return W(this.year());
  };
  e.weekYear = function(a) {
    return Vb.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  };
  e.isoWeekYear = function(a) {
    return Vb.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4);
  };
  e.quarter = e.quarters = function(a) {
    return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3);
  };
  e.month = zb;
  e.daysInMonth = function() {
    return Ca(this.year(), this.month());
  };
  e.week = e.weeks = function(a) {
    var b = this.localeData().week(this);
    return null == a ? b : this.add(7 * (a - b), "d");
  };
  e.isoWeek = e.isoWeeks = function(a) {
    var b = sa(this, 1, 4).week;
    return null == a ? b : this.add(7 * (a - b), "d");
  };
  e.weeksInYear = function() {
    var a = this.localeData()._week;
    return ba(this.year(), a.dow, a.doy);
  };
  e.isoWeeksInYear = function() {
    return ba(this.year(), 1, 4);
  };
  e.date = gc;
  e.day = e.days = function(a) {
    if (!this.isValid()) {
      return null != a ? this : NaN;
    }
    var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (null != a) {
      var c = this.localeData();
      "string" === typeof a && (isNaN(a) ? (a = c.weekdaysParse(a), a = "number" === typeof a ? a : null) : a = parseInt(a, 10));
      return this.add(a - b, "d");
    }
    return b;
  };
  e.weekday = function(a) {
    if (!this.isValid()) {
      return null != a ? this : NaN;
    }
    var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return null == a ? b : this.add(a - b, "d");
  };
  e.isoWeekday = function(a) {
    if (!this.isValid()) {
      return null != a ? this : NaN;
    }
    if (null != a) {
      var b = this.localeData();
      a = "string" === typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a;
      return this.day(this.day() % 7 ? a : a - 7);
    }
    return this.day() || 7;
  };
  e.dayOfYear = function(a) {
    var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
    return null == a ? b : this.add(a - b, "d");
  };
  e.hour = e.hours = Jc;
  e.minute = e.minutes = Oc;
  e.second = e.seconds = Pc;
  e.millisecond = e.milliseconds = Qc;
  e.utcOffset = function(a, b, c) {
    var d = this._offset || 0, e;
    if (!this.isValid()) {
      return null != a ? this : NaN;
    }
    if (null != a) {
      if ("string" === typeof a) {
        if (a = hb(Oa, a), null === a) {
          return this;
        }
      } else {
        16 > Math.abs(a) && !c && (a *= 60);
      }
      !this._isUTC && b && (e = 15 * -Math.round(this._d.getTimezoneOffset() / 15));
      this._offset = a;
      this._isUTC = !0;
      null != e && this.add(e, "m");
      d !== a && (!b || this._changeInProgress ? Qb(this, J(a - d, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, g.updateOffset(this, !0), this._changeInProgress = null));
      return this;
    }
    return this._isUTC ? d : 15 * -Math.round(this._d.getTimezoneOffset() / 15);
  };
  e.utc = function(a) {
    return this.utcOffset(0, a);
  };
  e.local = function(a) {
    this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(15 * -Math.round(this._d.getTimezoneOffset() / 15), "m"));
    return this;
  };
  e.parseZone = function() {
    if (null != this._tzm) {
      this.utcOffset(this._tzm, !1, !0);
    } else {
      if ("string" === typeof this._i) {
        var a = hb(Ic, this._i);
        null != a ? this.utcOffset(a) : this.utcOffset(0, !0);
      }
    }
    return this;
  };
  e.hasAlignedHourOffset = function(a) {
    if (!this.isValid()) {
      return !1;
    }
    a = a ? t(a).utcOffset() : 0;
    return 0 === (this.utcOffset() - a) % 60;
  };
  e.isDST = function() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  };
  e.isLocal = function() {
    return this.isValid() ? !this._isUTC : !1;
  };
  e.isUtcOffset = function() {
    return this.isValid() ? this._isUTC : !1;
  };
  e.isUtc = Nb;
  e.isUTC = Nb;
  e.zoneAbbr = function() {
    return this._isUTC ? "UTC" : "";
  };
  e.zoneName = function() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  };
  e.dates = F("dates accessor is deprecated. Use date instead.", gc);
  e.months = F("months accessor is deprecated. Use month instead", zb);
  e.years = F("years accessor is deprecated. Use year instead", dc);
  e.zone = F("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(a, b) {
    return null != a ? ("string" !== typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset();
  });
  e.isDSTShifted = F("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
    if (!C(this._isDSTShifted)) {
      return this._isDSTShifted;
    }
    var a = {};
    Qa(a, this);
    a = Kb(a);
    if (a._a) {
      var b = a._isUTC ? K(a._a) : t(a._a);
      this._isDSTShifted = this.isValid() && 0 < qb(a._a, b.toArray());
    } else {
      this._isDSTShifted = !1;
    }
    return this._isDSTShifted;
  });
  var q = Ta.prototype;
  q.calendar = function(a, b, c) {
    a = this._calendar[a] || this._calendar.sameElse;
    return M(a) ? a.call(b, c) : a;
  };
  q.longDateFormat = function(a) {
    var b = this._longDateFormat[a], c = this._longDateFormat[a.toUpperCase()];
    if (b || !c) {
      return b;
    }
    this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function(a) {
      return a.slice(1);
    });
    return this._longDateFormat[a];
  };
  q.invalidDate = function() {
    return this._invalidDate;
  };
  q.ordinal = function(a) {
    return this._ordinal.replace("%d", a);
  };
  q.preparse = Wb;
  q.postformat = Wb;
  q.relativeTime = function(a, b, c, d) {
    var e = this._relativeTime[c];
    return M(e) ? e(a, b, c, d) : e.replace(/%d/i, a);
  };
  q.pastFuture = function(a, b) {
    a = this._relativeTime[0 < a ? "future" : "past"];
    return M(a) ? a(b) : a.replace(/%s/i, b);
  };
  q.set = function(a) {
    var b;
    for (b in a) {
      var c = a[b];
      M(c) ? this[b] = c : this["_" + b] = c;
    }
    this._config = a;
    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
  };
  q.months = function(a, b) {
    return a ? B(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || ec).test(b) ? "format" : "standalone"][a.month()] : B(this._months) ? this._months : this._months.standalone;
  };
  q.monthsShort = function(a, b) {
    return a ? B(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[ec.test(b) ? "format" : "standalone"][a.month()] : B(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
  };
  q.monthsParse = function(a, b, c) {
    var d;
    if (this._monthsParseExact) {
      a: {
        a = a.toLocaleLowerCase();
        if (!this._monthsParse) {
          for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; 12 > d; ++d) {
            var e = K([2000, d]);
            this._shortMonthsParse[d] = this.monthsShort(e, "").toLocaleLowerCase();
            this._longMonthsParse[d] = this.months(e, "").toLocaleLowerCase();
          }
        }
        if (c) {
          b = "MMM" === b ? w.call(this._shortMonthsParse, a) : w.call(this._longMonthsParse, a);
        } else {
          if ("MMM" === b) {
            b = w.call(this._shortMonthsParse, a);
            if (-1 !== b) {
              break a;
            }
            b = w.call(this._longMonthsParse, a);
          } else {
            b = w.call(this._longMonthsParse, a);
            if (-1 !== b) {
              break a;
            }
            b = w.call(this._shortMonthsParse, a);
          }
        }
        b = -1 !== b ? b : null;
      }
      return b;
    }
    this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []);
    for (d = 0; 12 > d; d++) {
      if (e = K([2000, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (e = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(e.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a) || c && "MMM" === b && this._shortMonthsParse[d].test(a) || 
      !c && this._monthsParse[d].test(a)) {
        return d;
      }
    }
  };
  q.monthsRegex = function(a) {
    if (this._monthsParseExact) {
      return v(this, "_monthsRegex") || Ab.call(this), a ? this._monthsStrictRegex : this._monthsRegex;
    }
    v(this, "_monthsRegex") || (this._monthsRegex = wa);
    return this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex;
  };
  q.monthsShortRegex = function(a) {
    if (this._monthsParseExact) {
      return v(this, "_monthsRegex") || Ab.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
    v(this, "_monthsShortRegex") || (this._monthsShortRegex = wa);
    return this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex;
  };
  q.week = function(a) {
    return sa(a, this._week.dow, this._week.doy).week;
  };
  q.firstDayOfYear = function() {
    return this._week.doy;
  };
  q.firstDayOfWeek = function() {
    return this._week.dow;
  };
  q.weekdays = function(a, b) {
    b = B(this._weekdays) ? this._weekdays : this._weekdays[a && !0 !== a && this._weekdays.isFormat.test(b) ? "format" : "standalone"];
    return !0 === a ? Ya(b, this._week.dow) : a ? b[a.day()] : b;
  };
  q.weekdaysMin = function(a) {
    return !0 === a ? Ya(this._weekdaysMin, this._week.dow) : a ? this._weekdaysMin[a.day()] : this._weekdaysMin;
  };
  q.weekdaysShort = function(a) {
    return !0 === a ? Ya(this._weekdaysShort, this._week.dow) : a ? this._weekdaysShort[a.day()] : this._weekdaysShort;
  };
  q.weekdaysParse = function(a, b, c) {
    var d;
    if (this._weekdaysParseExact) {
      return pc.call(this, a, b, c);
    }
    this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []);
    for (d = 0; 7 > d; d++) {
      var e = K([2000, 1]).day(d);
      c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", "\\.?") + "$", "i"));
      this._weekdaysParse[d] || (e = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(e.replace(".", ""), "i"));
      if (c && "dddd" === b && this._fullWeekdaysParse[d].test(a) || c && "ddd" === b && this._shortWeekdaysParse[d].test(a) || c && "dd" === b && this._minWeekdaysParse[d].test(a) || !c && this._weekdaysParse[d].test(a)) {
        return d;
      }
    }
  };
  q.weekdaysRegex = function(a) {
    if (this._weekdaysParseExact) {
      return v(this, "_weekdaysRegex") || Za.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
    v(this, "_weekdaysRegex") || (this._weekdaysRegex = wa);
    return this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex;
  };
  q.weekdaysShortRegex = function(a) {
    if (this._weekdaysParseExact) {
      return v(this, "_weekdaysRegex") || Za.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
    v(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = wa);
    return this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  };
  q.weekdaysMinRegex = function(a) {
    if (this._weekdaysParseExact) {
      return v(this, "_weekdaysRegex") || Za.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
    v(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = wa);
    return this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  };
  q.isPM = function(a) {
    return "p" === (a + "").toLowerCase().charAt(0);
  };
  q.meridiem = function(a, b, c) {
    return 11 < a ? c ? "pm" : "PM" : c ? "am" : "AM";
  };
  ja("en", {dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/, ordinal:function(a) {
    var b = a % 10;
    b = 1 === l(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
    return a + b;
  }});
  g.lang = F("moment.lang is deprecated. Use moment.locale instead.", ja);
  g.langData = F("moment.langData is deprecated. Use moment.localeData instead.", X);
  var T = Math.abs, Rc = S("ms"), Sc = S("s"), Tc = S("m"), Uc = S("h"), Vc = S("d"), Wc = S("w"), Xc = S("M"), Yc = S("Q"), Zc = S("y"), $c = ea("milliseconds"), ad = ea("seconds"), bd = ea("minutes"), cd = ea("hours"), dd = ea("days"), ed = ea("months"), fd = ea("years"), Z = Math.round, O = {ss:44, s:45, m:45, h:22, d:26, M:11}, lb = Math.abs, p = Ga.prototype;
  p.isValid = function() {
    return this._isValid;
  };
  p.abs = function() {
    var a = this._data;
    this._milliseconds = T(this._milliseconds);
    this._days = T(this._days);
    this._months = T(this._months);
    a.milliseconds = T(a.milliseconds);
    a.seconds = T(a.seconds);
    a.minutes = T(a.minutes);
    a.hours = T(a.hours);
    a.months = T(a.months);
    a.years = T(a.years);
    return this;
  };
  p.add = function(a, b) {
    return Yb(this, a, b, 1);
  };
  p.subtract = function(a, b) {
    return Yb(this, a, b, -1);
  };
  p.as = function(a) {
    if (!this.isValid()) {
      return NaN;
    }
    var b = this._milliseconds;
    a = G(a);
    if ("month" === a || "quarter" === a || "year" === a) {
      var c = this._days + b / 864e5;
      c = this._months + 4800 * c / 146097;
      switch(a) {
        case "month":
          return c;
        case "quarter":
          return c / 3;
        case "year":
          return c / 12;
      }
    } else {
      switch(c = this._days + Math.round(146097 * this._months / 4800), a) {
        case "week":
          return c / 7 + b / 6048e5;
        case "day":
          return c + b / 864e5;
        case "hour":
          return 24 * c + b / 36e5;
        case "minute":
          return 1440 * c + b / 6e4;
        case "second":
          return 86400 * c + b / 1000;
        case "millisecond":
          return Math.floor(864e5 * c) + b;
        default:
          throw Error("Unknown unit " + a);
      }
    }
  };
  p.asMilliseconds = Rc;
  p.asSeconds = Sc;
  p.asMinutes = Tc;
  p.asHours = Uc;
  p.asDays = Vc;
  p.asWeeks = Wc;
  p.asMonths = Xc;
  p.asQuarters = Yc;
  p.asYears = Zc;
  p.valueOf = function() {
    return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * l(this._months / 12) : NaN;
  };
  p._bubble = function() {
    var a = this._milliseconds, b = this._days, c = this._months, d = this._data;
    0 <= a && 0 <= b && 0 <= c || 0 >= a && 0 >= b && 0 >= c || (a += 864e5 * Zb(146097 * c / 4800 + b), c = b = 0);
    d.milliseconds = a % 1000;
    a = E(a / 1000);
    d.seconds = a % 60;
    a = E(a / 60);
    d.minutes = a % 60;
    a = E(a / 60);
    d.hours = a % 24;
    b += E(a / 24);
    a = E(4800 * b / 146097);
    c += a;
    b -= Zb(146097 * a / 4800);
    a = E(c / 12);
    d.days = b;
    d.months = c % 12;
    d.years = a;
    return this;
  };
  p.clone = function() {
    return J(this);
  };
  p.get = function(a) {
    a = G(a);
    return this.isValid() ? this[a + "s"]() : NaN;
  };
  p.milliseconds = $c;
  p.seconds = ad;
  p.minutes = bd;
  p.hours = cd;
  p.days = dd;
  p.weeks = function() {
    return E(this.days() / 7);
  };
  p.months = ed;
  p.years = fd;
  p.humanize = function(a) {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }
    var b = this.localeData();
    var c = !a;
    var d = J(this).abs(), e = Z(d.as("s")), g = Z(d.as("m")), h = Z(d.as("h")), k = Z(d.as("d")), l = Z(d.as("M"));
    d = Z(d.as("y"));
    e = e <= O.ss && ["s", e] || e < O.s && ["ss", e] || 1 >= g && ["m"] || g < O.m && ["mm", g] || 1 >= h && ["h"] || h < O.h && ["hh", h] || 1 >= k && ["d"] || k < O.d && ["dd", k] || 1 >= l && ["M"] || l < O.M && ["MM", l] || 1 >= d && ["y"] || ["yy", d];
    e[2] = c;
    e[3] = 0 < +this;
    e[4] = b;
    c = Fc.apply(null, e);
    a && (c = b.pastFuture(+this, c));
    return b.postformat(c);
  };
  p.toISOString = Ja;
  p.toString = Ja;
  p.toJSON = Ja;
  p.locale = Rb;
  p.localeData = Sb;
  p.toIsoString = F("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Ja);
  p.lang = fc;
  m("X", 0, 0, "unix");
  m("x", 0, 0, "valueOf");
  k("x", Na);
  k("X", /[+-]?\d+(\.\d{1,3})?/);
  r("X", function(a, b, c) {
    c._d = new Date(1000 * parseFloat(a, 10));
  });
  r("x", function(a, b, c) {
    c._d = new Date(l(a));
  });
  g.version = "2.24.0";
  var hc = t;
  g.fn = e;
  g.min = function() {
    var a = [].slice.call(arguments, 0);
    return Lb("isBefore", a);
  };
  g.max = function() {
    var a = [].slice.call(arguments, 0);
    return Lb("isAfter", a);
  };
  g.now = function() {
    return Date.now ? Date.now() : +new Date;
  };
  g.utc = K;
  g.unix = function(a) {
    return t(1000 * a);
  };
  g.months = function(a, b) {
    return Xb(a, b, "months");
  };
  g.isDate = xa;
  g.locale = ja;
  g.invalid = ya;
  g.duration = J;
  g.isMoment = L;
  g.weekdays = function(a, b, c) {
    return kb(a, b, c, "weekdays");
  };
  g.parseZone = function() {
    return t.apply(null, arguments).parseZone();
  };
  g.localeData = X;
  g.isDuration = fb;
  g.monthsShort = function(a, b) {
    return Xb(a, b, "monthsShort");
  };
  g.weekdaysMin = function(a, b, c) {
    return kb(a, b, c, "weekdaysMin");
  };
  g.defineLocale = ab;
  g.updateLocale = function(a, b) {
    if (null != b) {
      var c = Fb;
      var d = Ea(a);
      null != d && (c = d._config);
      b = ub(c, b);
      b = new Ta(b);
      b.parentLocale = x[a];
      x[a] = b;
      ja(a);
    } else {
      null != x[a] && (null != x[a].parentLocale ? x[a] = x[a].parentLocale : null != x[a] && delete x[a]);
    }
    return x[a];
  };
  g.locales = function() {
    return Gc(x);
  };
  g.weekdaysShort = function(a, b, c) {
    return kb(a, b, c, "weekdaysShort");
  };
  g.normalizeUnits = G;
  g.relativeTimeRounding = function(a) {
    return void 0 === a ? Z : "function" === typeof a ? (Z = a, !0) : !1;
  };
  g.relativeTimeThreshold = function(a, b) {
    if (void 0 === O[a]) {
      return !1;
    }
    if (void 0 === b) {
      return O[a];
    }
    O[a] = b;
    "s" === a && (O.ss = b - 1);
    return !0;
  };
  g.calendarFormat = function(a, b) {
    a = a.diff(b, "days", !0);
    return -6 > a ? "sameElse" : -1 > a ? "lastWeek" : 0 > a ? "lastDay" : 1 > a ? "sameDay" : 2 > a ? "nextDay" : 7 > a ? "nextWeek" : "sameElse";
  };
  g.prototype = e;
  g.HTML5_FMT = {DATETIME_LOCAL:"YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS", DATE:"YYYY-MM-DD", TIME:"HH:mm", TIME_SECONDS:"HH:mm:ss", TIME_MS:"HH:mm:ss.SSS", WEEK:"GGGG-[W]WW", MONTH:"YYYY-MM"};
  return g;
});
