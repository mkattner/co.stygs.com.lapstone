// Input 0
/*
 Fuse.js v3.3.0 - Lightweight fuzzy-search (http://fusejs.io)

 Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 All Rights Reserved. Apache Software License 2.0

 http://www.apache.org/licenses/LICENSE-2.0
*/
'use strict';
(function(k, f) {
  "object" === typeof exports && "object" === typeof module ? module.exports = f() : "function" === typeof define && define.amd ? define("Fuse", [], f) : "object" === typeof exports ? exports.Fuse = f() : k.Fuse = f();
})(this, function() {
  return function(k) {
    function f(e) {
      if (h[e]) {
        return h[e].exports;
      }
      var d = h[e] = {i:e, l:!1, exports:{}};
      k[e].call(d.exports, d, d.exports, f);
      d.l = !0;
      return d.exports;
    }
    var h = {};
    f.m = k;
    f.c = h;
    f.i = function(e) {
      return e;
    };
    f.d = function(e, d, A) {
      f.o(e, d) || Object.defineProperty(e, d, {configurable:!1, enumerable:!0, get:A});
    };
    f.n = function(e) {
      var d = e && e.__esModule ? function() {
        return e["default"];
      } : function() {
        return e;
      };
      f.d(d, "a", d);
      return d;
    };
    f.o = function(e, d) {
      return Object.prototype.hasOwnProperty.call(e, d);
    };
    f.p = "";
    return f(f.s = 8);
  }([function(k, f, h) {
    k.exports = function(e) {
      return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e);
    };
  }, function(k, f, h) {
    var e = function() {
      function c(b, a) {
        for (var m = 0; m < a.length; m++) {
          var g = a[m];
          g.enumerable = g.enumerable || !1;
          g.configurable = !0;
          "value" in g && (g.writable = !0);
          Object.defineProperty(b, g.key, g);
        }
      }
      return function(b, a, m) {
        a && c(b.prototype, a);
        m && c(b, m);
        return b;
      };
    }(), d = h(5), A = h(7), c = h(4);
    f = function() {
      function l(b, a) {
        var m = a.location;
        m = void 0 === m ? 0 : m;
        var g = a.distance;
        g = void 0 === g ? 100 : g;
        var e = a.threshold;
        e = void 0 === e ? 0.6 : e;
        var d = a.maxPatternLength;
        d = void 0 === d ? 32 : d;
        var u = a.isCaseSensitive;
        u = void 0 === u ? !1 : u;
        var n = a.tokenSeparator;
        n = void 0 === n ? / +/g : n;
        var B = a.findAllMatches;
        B = void 0 === B ? !1 : B;
        a = a.minMatchCharLength;
        a = void 0 === a ? 1 : a;
        if (!(this instanceof l)) {
          throw new TypeError("Cannot call a class as a function");
        }
        this.options = {location:m, distance:g, threshold:e, maxPatternLength:d, isCaseSensitive:u, tokenSeparator:n, findAllMatches:B, minMatchCharLength:a};
        this.pattern = this.options.isCaseSensitive ? b : b.toLowerCase();
        this.pattern.length <= d && (this.patternAlphabet = c(this.pattern));
      }
      e(l, [{key:"search", value:function(b) {
        this.options.isCaseSensitive || (b = b.toLowerCase());
        if (this.pattern === b) {
          return {isMatch:!0, score:0, matchedIndices:[[0, b.length - 1]]};
        }
        var a = this.options, m = a.tokenSeparator;
        if (this.pattern.length > a.maxPatternLength) {
          return d(b, this.pattern, m);
        }
        a = this.options;
        return A(b, this.pattern, this.patternAlphabet, {location:a.location, distance:a.distance, threshold:a.threshold, findAllMatches:a.findAllMatches, minMatchCharLength:a.minMatchCharLength});
      }}]);
      return l;
    }();
    k.exports = f;
  }, function(k, f, h) {
    var e = h(0), d = function a(c, d, b) {
      if (d) {
        var m = d.indexOf("."), g = d, z = null;
        -1 !== m && (g = d.slice(0, m), z = d.slice(m + 1));
        c = c[g];
        if (null !== c && void 0 !== c) {
          if (z || "string" !== typeof c && "number" !== typeof c) {
            if (e(c)) {
              for (d = 0, m = c.length; d < m; d += 1) {
                a(c[d], z, b);
              }
            } else {
              z && a(c, z, b);
            }
          } else {
            b.push(c.toString());
          }
        }
      } else {
        b.push(c);
      }
      return b;
    };
    k.exports = function(c, e) {
      return d(c, e, []);
    };
  }, function(k, f, h) {
    k.exports = function() {
      for (var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], d = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1, f = [], c = -1, l, b = 0, a = e.length; b < a; b += 1) {
        (l = e[b]) && -1 === c ? c = b : l || -1 === c || (l = b - 1, l - c + 1 >= d && f.push([c, l]), c = -1);
      }
      e[b - 1] && b - c >= d && f.push([c, b - 1]);
      return f;
    };
  }, function(k, f, h) {
    k.exports = function(e) {
      for (var d = {}, f = e.length, c = 0; c < f; c += 1) {
        d[e.charAt(c)] = 0;
      }
      for (c = 0; c < f; c += 1) {
        d[e.charAt(c)] |= 1 << f - c - 1;
      }
      return d;
    };
  }, function(k, f, h) {
    var e = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
    k.exports = function(d, f) {
      var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : / +/g;
      c = new RegExp(f.replace(e, "\\$\x26").replace(c, "|"));
      c = d.match(c);
      var l = !!c, b = [];
      if (l) {
        for (var a = 0, m = c.length; a < m; a += 1) {
          var g = c[a];
          b.push([d.indexOf(g), g.length - 1]);
        }
      }
      return {score:l ? 0.5 : 1, isMatch:l, matchedIndices:b};
    };
  }, function(k, f, h) {
    k.exports = function(e, d) {
      var f = d.errors, c = d.currentLocation, l = d.expectedLocation;
      d = d.distance;
      d = void 0 === d ? 100 : d;
      e = (void 0 === f ? 0 : f) / e.length;
      c = Math.abs((void 0 === l ? 0 : l) - (void 0 === c ? 0 : c));
      return d ? e + c / d : c ? 1.0 : e;
    };
  }, function(k, f, h) {
    var e = h(6), d = h(3);
    k.exports = function(f, c, l, b) {
      var a = b.location, m = b.distance;
      m = void 0 === m ? 100 : m;
      var g = b.threshold, z = b.findAllMatches;
      z = void 0 === z ? !1 : z;
      b = b.minMatchCharLength;
      b = void 0 === b ? 1 : b;
      a = void 0 === a ? 0 : a;
      var C = f.length;
      g = void 0 === g ? 0.6 : g;
      for (var u = f.indexOf(c, a), n = c.length, B = [], p = 0; p < C; p += 1) {
        B[p] = 0;
      }
      -1 !== u && (u = e(c, {errors:0, currentLocation:u, expectedLocation:a, distance:m}), g = Math.min(u, g), u = f.lastIndexOf(c, a + n), -1 !== u && (u = e(c, {errors:0, currentLocation:u, expectedLocation:a, distance:m}), g = Math.min(u, g)));
      u = -1;
      p = [];
      for (var q = 1, t = n + C, k = 1 << n - 1, v = 0; v < n; v += 1) {
        for (var w = 0, r = t; w < r;) {
          e(c, {errors:v, currentLocation:a + r, expectedLocation:a, distance:m}) <= g ? w = r : t = r, r = Math.floor((t - w) / 2 + w);
        }
        t = r;
        w = Math.max(1, a - r + 1);
        var h = z ? C : Math.min(a + r, C) + n;
        r = Array(h + 2);
        for (r[h + 1] = (1 << v) - 1; h >= w; --h) {
          var x = h - 1, y = l[f.charAt(x)];
          y && (B[x] = 1);
          r[h] = (r[h + 1] << 1 | 1) & y;
          0 !== v && (r[h] = r[h] | (p[h + 1] | p[h]) << 1 | 1 | p[h + 1]);
          if (r[h] & k && (q = e(c, {errors:v, currentLocation:x, expectedLocation:a, distance:m}), q <= g)) {
            g = q;
            u = x;
            if (u <= a) {
              break;
            }
            w = Math.max(1, 2 * a - u);
          }
        }
        if (e(c, {errors:v + 1, currentLocation:a, expectedLocation:a, distance:m}) > g) {
          break;
        }
        p = r;
      }
      return {isMatch:0 <= u, score:0 === q ? 0.001 : q, matchedIndices:d(B, b)};
    };
  }, function(k, f, h) {
    var e = function() {
      function c(b, a) {
        for (var m = 0; m < a.length; m++) {
          var g = a[m];
          g.enumerable = g.enumerable || !1;
          g.configurable = !0;
          "value" in g && (g.writable = !0);
          Object.defineProperty(b, g.key, g);
        }
      }
      return function(b, a, m) {
        a && c(b.prototype, a);
        m && c(b, m);
        return b;
      };
    }(), d = h(1), A = h(2), c = h(0);
    f = function() {
      function f(b, a) {
        var m = a.location;
        m = void 0 === m ? 0 : m;
        var g = a.distance;
        g = void 0 === g ? 100 : g;
        var c = a.threshold;
        c = void 0 === c ? 0.6 : c;
        var d = a.maxPatternLength;
        d = void 0 === d ? 32 : d;
        var e = a.caseSensitive;
        e = void 0 === e ? !1 : e;
        var n = a.tokenSeparator;
        n = void 0 === n ? / +/g : n;
        var h = a.findAllMatches;
        h = void 0 === h ? !1 : h;
        var p = a.minMatchCharLength;
        p = void 0 === p ? 1 : p;
        var q = a.id;
        q = void 0 === q ? null : q;
        var t = a.keys;
        t = void 0 === t ? [] : t;
        var k = a.shouldSort;
        k = void 0 === k ? !0 : k;
        var v = a.getFn;
        v = void 0 === v ? A : v;
        var w = a.sortFn;
        w = void 0 === w ? function(a, b) {
          return a.score - b.score;
        } : w;
        var r = a.tokenize;
        r = void 0 === r ? !1 : r;
        var l = a.matchAllTokens;
        l = void 0 === l ? !1 : l;
        var x = a.includeMatches;
        x = void 0 === x ? !1 : x;
        var y = a.includeScore;
        y = void 0 === y ? !1 : y;
        a = a.verbose;
        a = void 0 === a ? !1 : a;
        if (!(this instanceof f)) {
          throw new TypeError("Cannot call a class as a function");
        }
        this.options = {location:m, distance:g, threshold:c, maxPatternLength:d, isCaseSensitive:e, tokenSeparator:n, findAllMatches:h, minMatchCharLength:p, id:q, keys:t, includeMatches:x, includeScore:y, shouldSort:k, getFn:v, sortFn:w, verbose:a, tokenize:r, matchAllTokens:l};
        this.setCollection(b);
      }
      e(f, [{key:"setCollection", value:function(b) {
        return this.list = b;
      }}, {key:"search", value:function(b) {
        this._log('---------\nSearch pattern: "' + b + '"');
        b = this._prepareSearchers(b);
        b = this._search(b.tokenSearchers, b.fullSearcher);
        var a = b.results;
        this._computeScore(b.weights, a);
        this.options.shouldSort && this._sort(a);
        return this._format(a);
      }}, {key:"_prepareSearchers", value:function() {
        var b = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", a = [];
        if (this.options.tokenize) {
          for (var c = b.split(this.options.tokenSeparator), g = 0, e = c.length; g < e; g += 1) {
            a.push(new d(c[g], this.options));
          }
        }
        b = new d(b, this.options);
        return {tokenSearchers:a, fullSearcher:b};
      }}, {key:"_search", value:function() {
        var b = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], a = arguments[1], c = this.list, g = {}, d = [];
        if ("string" === typeof c[0]) {
          for (var e = 0, f = c.length; e < f; e += 1) {
            this._analyze({key:"", value:c[e], record:e, index:e}, {resultMap:g, results:d, tokenSearchers:b, fullSearcher:a});
          }
          return {weights:null, results:d};
        }
        e = {};
        f = 0;
        for (var h = c.length; f < h; f += 1) {
          for (var k = c[f], p = 0, q = this.options.keys.length; p < q; p += 1) {
            var t = this.options.keys[p];
            if ("string" !== typeof t) {
              e[t.name] = {weight:1 - t.weight || 1};
              if (0 >= t.weight || 1 < t.weight) {
                throw Error("Key weight has to be \x3e 0 and \x3c\x3d 1");
              }
              t = t.name;
            } else {
              e[t] = {weight:1};
            }
            this._analyze({key:t, value:this.options.getFn(k, t), record:k, index:f}, {resultMap:g, results:d, tokenSearchers:b, fullSearcher:a});
          }
        }
        return {weights:e, results:d};
      }}, {key:"_analyze", value:function(b, a) {
        var e = b.key, g = b.arrayIndex, d = void 0 === g ? -1 : g;
        g = b.value;
        var f = b.record;
        b = b.index;
        var h = a.tokenSearchers;
        h = void 0 === h ? [] : h;
        var n = a.fullSearcher, k = void 0 === n ? [] : n;
        n = a.resultMap;
        n = void 0 === n ? {} : n;
        a = a.results;
        a = void 0 === a ? [] : a;
        if (void 0 !== g && null !== g) {
          var p = !1, q = -1, t = 0;
          if ("string" === typeof g) {
            this._log("\nKey: " + ("" === e ? "-" : e));
            k = k.search(g);
            this._log('Full text: "' + g + '", score: ' + k.score);
            if (this.options.tokenize) {
              q = g.split(this.options.tokenSeparator);
              for (var l = [], v = 0; v < h.length; v += 1) {
                var w = h[v];
                this._log('\nPattern: "' + w.pattern + '"');
                for (var r = !1, A = 0; A < q.length; A += 1) {
                  var x = q[A], y = w.search(x), D = {};
                  y.isMatch ? (D[x] = y.score, r = p = !0, l.push(y.score)) : (D[x] = 1, this.options.matchAllTokens || l.push(1));
                  this._log('Token: "' + x + '", score: ' + D[x]);
                }
                r && (t += 1);
              }
              q = l[0];
              v = l.length;
              for (w = 1; w < v; w += 1) {
                q += l[w];
              }
              q /= v;
              this._log("Token score average:", q);
            }
            l = k.score;
            -1 < q && (l = (l + q) / 2);
            this._log("Score average:", l);
            h = this.options.tokenize && this.options.matchAllTokens ? t >= h.length : !0;
            this._log("\nCheck Matches: " + h);
            (p || k.isMatch) && h && ((h = n[b]) ? h.output.push({key:e, arrayIndex:d, value:g, score:l, matchedIndices:k.matchedIndices}) : (n[b] = {item:f, output:[{key:e, arrayIndex:d, value:g, score:l, matchedIndices:k.matchedIndices}]}, a.push(n[b])));
          } else {
            if (c(g)) {
              for (d = 0, p = g.length; d < p; d += 1) {
                this._analyze({key:e, arrayIndex:d, value:g[d], record:f, index:b}, {resultMap:n, results:a, tokenSearchers:h, fullSearcher:k});
              }
            }
          }
        }
      }}, {key:"_computeScore", value:function(b, a) {
        this._log("\n\nComputing score:\n");
        for (var c = 0, d = a.length; c < d; c += 1) {
          for (var e = a[c].output, f = e.length, h = 1, k = 1, l = 0; l < f; l += 1) {
            var p = b ? b[e[l].key].weight : 1, q = (1 === p ? e[l].score : e[l].score || 0.001) * p;
            1 !== p ? k = Math.min(k, q) : (e[l].nScore = q, h *= q);
          }
          a[c].score = 1 === k ? h : k;
          this._log(a[c]);
        }
      }}, {key:"_sort", value:function(b) {
        this._log("\n\nSorting....");
        b.sort(this.options.sortFn);
      }}, {key:"_format", value:function(b) {
        var a = [];
        this.options.verbose && this._log("\n\nOutput:\n\n", JSON.stringify(b));
        var c = [];
        this.options.includeMatches && c.push(function(a, b) {
          a = a.output;
          b.matches = [];
          for (var c = 0, e = a.length; c < e; c += 1) {
            var d = a[c];
            if (0 !== d.matchedIndices.length) {
              var f = {indices:d.matchedIndices, value:d.value};
              d.key && (f.key = d.key);
              d.hasOwnProperty("arrayIndex") && -1 < d.arrayIndex && (f.arrayIndex = d.arrayIndex);
              b.matches.push(f);
            }
          }
        });
        this.options.includeScore && c.push(function(a, b) {
          b.score = a.score;
        });
        for (var e = 0, d = b.length; e < d; e += 1) {
          var f = b[e];
          this.options.id && (f.item = this.options.getFn(f.item, this.options.id)[0]);
          if (c.length) {
            for (var h = {item:f.item}, k = 0, l = c.length; k < l; k += 1) {
              c[k](f, h);
            }
            a.push(h);
          } else {
            a.push(f.item);
          }
        }
        return a;
      }}, {key:"_log", value:function() {
        if (this.options.verbose) {
          var b;
          (b = console).log.apply(b, arguments);
        }
      }}]);
      return f;
    }();
    k.exports = f;
  }]);
});
