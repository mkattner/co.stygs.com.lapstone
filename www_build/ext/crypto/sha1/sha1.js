// Input 0
'use strict';
(function() {
  function m(a) {
    a ? (l[0] = l[16] = l[1] = l[2] = l[3] = l[4] = l[5] = l[6] = l[7] = l[8] = l[9] = l[10] = l[11] = l[12] = l[13] = l[14] = l[15] = 0, this.blocks = l) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.h0 = 1732584193;
    this.h1 = 4023233417;
    this.h2 = 2562383102;
    this.h3 = 271733878;
    this.h4 = 3285377520;
    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = !1;
    this.first = !0;
  }
  var p = "object" === typeof window ? window : {}, r = !p.JS_SHA1_NO_NODE_JS && "object" === typeof process && process.versions && process.versions.node;
  r && (p = global);
  var v = !p.JS_SHA1_NO_COMMON_JS && "object" === typeof module && module.exports, w = "function" === typeof define && define.amd, b = "0123456789abcdef".split(""), x = [-2147483648, 8388608, 32768, 128], n = [24, 16, 8, 0], t = ["hex", "array", "digest", "arrayBuffer"], l = [], u = function(a) {
    return function(f) {
      return (new m(!0)).update(f)[a]();
    };
  }, y = function(a) {
    var f = eval("require('crypto')"), e = eval("require('buffer').Buffer");
    return function(d) {
      if ("string" === typeof d) {
        return f.createHash("sha1").update(d, "utf8").digest("hex");
      }
      if (d.constructor === ArrayBuffer) {
        d = new Uint8Array(d);
      } else {
        if (void 0 === d.length) {
          return a(d);
        }
      }
      return f.createHash("sha1").update(new e(d)).digest("hex");
    };
  };
  m.prototype.update = function(a) {
    if (!this.finalized) {
      var f = "string" !== typeof a;
      f && a.constructor === p.ArrayBuffer && (a = new Uint8Array(a));
      for (var e, d = 0, c, k = a.length || 0, g = this.blocks; d < k;) {
        this.hashed && (this.hashed = !1, g[0] = this.block, g[16] = g[1] = g[2] = g[3] = g[4] = g[5] = g[6] = g[7] = g[8] = g[9] = g[10] = g[11] = g[12] = g[13] = g[14] = g[15] = 0);
        if (f) {
          for (c = this.start; d < k && 64 > c; ++d) {
            g[c >> 2] |= a[d] << n[c++ & 3];
          }
        } else {
          for (c = this.start; d < k && 64 > c; ++d) {
            e = a.charCodeAt(d), 128 > e ? g[c >> 2] |= e << n[c++ & 3] : (2048 > e ? g[c >> 2] |= (192 | e >> 6) << n[c++ & 3] : (55296 > e || 57344 <= e ? g[c >> 2] |= (224 | e >> 12) << n[c++ & 3] : (e = 65536 + ((e & 1023) << 10 | a.charCodeAt(++d) & 1023), g[c >> 2] |= (240 | e >> 18) << n[c++ & 3], g[c >> 2] |= (128 | e >> 12 & 63) << n[c++ & 3]), g[c >> 2] |= (128 | e >> 6 & 63) << n[c++ & 3]), g[c >> 2] |= (128 | e & 63) << n[c++ & 3]);
          }
        }
        this.lastByteIndex = c;
        this.bytes += c - this.start;
        64 <= c ? (this.block = g[16], this.start = c - 64, this.hash(), this.hashed = !0) : this.start = c;
      }
      4294967295 < this.bytes && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes %= 4294967296);
      return this;
    }
  };
  m.prototype.finalize = function() {
    if (!this.finalized) {
      this.finalized = !0;
      var a = this.blocks, f = this.lastByteIndex;
      a[16] = this.block;
      a[f >> 2] |= x[f & 3];
      this.block = a[16];
      56 <= f && (this.hashed || this.hash(), a[0] = this.block, a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0);
      a[14] = this.hBytes << 3 | this.bytes >>> 29;
      a[15] = this.bytes << 3;
      this.hash();
    }
  };
  m.prototype.hash = function() {
    var a = this.h0, f = this.h1, e = this.h2, d = this.h3, c = this.h4, k, g = this.blocks;
    for (k = 16; 80 > k; ++k) {
      var h = g[k - 3] ^ g[k - 8] ^ g[k - 14] ^ g[k - 16];
      g[k] = h << 1 | h >>> 31;
    }
    for (k = 0; 20 > k; k += 5) {
      var b = f & e | ~f & d;
      h = a << 5 | a >>> 27;
      c = h + b + c + 1518500249 + g[k] << 0;
      f = f << 30 | f >>> 2;
      b = a & f | ~a & e;
      h = c << 5 | c >>> 27;
      d = h + b + d + 1518500249 + g[k + 1] << 0;
      a = a << 30 | a >>> 2;
      b = c & a | ~c & f;
      h = d << 5 | d >>> 27;
      e = h + b + e + 1518500249 + g[k + 2] << 0;
      c = c << 30 | c >>> 2;
      b = d & c | ~d & a;
      h = e << 5 | e >>> 27;
      f = h + b + f + 1518500249 + g[k + 3] << 0;
      d = d << 30 | d >>> 2;
      b = e & d | ~e & c;
      h = f << 5 | f >>> 27;
      a = h + b + a + 1518500249 + g[k + 4] << 0;
      e = e << 30 | e >>> 2;
    }
    for (; 40 > k; k += 5) {
      b = f ^ e ^ d, h = a << 5 | a >>> 27, c = h + b + c + 1859775393 + g[k] << 0, f = f << 30 | f >>> 2, b = a ^ f ^ e, h = c << 5 | c >>> 27, d = h + b + d + 1859775393 + g[k + 1] << 0, a = a << 30 | a >>> 2, b = c ^ a ^ f, h = d << 5 | d >>> 27, e = h + b + e + 1859775393 + g[k + 2] << 0, c = c << 30 | c >>> 2, b = d ^ c ^ a, h = e << 5 | e >>> 27, f = h + b + f + 1859775393 + g[k + 3] << 0, d = d << 30 | d >>> 2, b = e ^ d ^ c, h = f << 5 | f >>> 27, a = h + b + a + 1859775393 + g[k + 4] << 
      0, e = e << 30 | e >>> 2;
    }
    for (; 60 > k; k += 5) {
      b = f & e | f & d | e & d, h = a << 5 | a >>> 27, c = h + b + c - 1894007588 + g[k] << 0, f = f << 30 | f >>> 2, b = a & f | a & e | f & e, h = c << 5 | c >>> 27, d = h + b + d - 1894007588 + g[k + 1] << 0, a = a << 30 | a >>> 2, b = c & a | c & f | a & f, h = d << 5 | d >>> 27, e = h + b + e - 1894007588 + g[k + 2] << 0, c = c << 30 | c >>> 2, b = d & c | d & a | c & a, h = e << 5 | e >>> 27, f = h + b + f - 1894007588 + g[k + 3] << 0, d = d << 30 | d >>> 2, b = e & d | e & c | d & c, h = 
      f << 5 | f >>> 27, a = h + b + a - 1894007588 + g[k + 4] << 0, e = e << 30 | e >>> 2;
    }
    for (; 80 > k; k += 5) {
      b = f ^ e ^ d, h = a << 5 | a >>> 27, c = h + b + c - 899497514 + g[k] << 0, f = f << 30 | f >>> 2, b = a ^ f ^ e, h = c << 5 | c >>> 27, d = h + b + d - 899497514 + g[k + 1] << 0, a = a << 30 | a >>> 2, b = c ^ a ^ f, h = d << 5 | d >>> 27, e = h + b + e - 899497514 + g[k + 2] << 0, c = c << 30 | c >>> 2, b = d ^ c ^ a, h = e << 5 | e >>> 27, f = h + b + f - 899497514 + g[k + 3] << 0, d = d << 30 | d >>> 2, b = e ^ d ^ c, h = f << 5 | f >>> 27, a = h + b + a - 899497514 + g[k + 4] << 0, e = 
      e << 30 | e >>> 2;
    }
    this.h0 = this.h0 + a << 0;
    this.h1 = this.h1 + f << 0;
    this.h2 = this.h2 + e << 0;
    this.h3 = this.h3 + d << 0;
    this.h4 = this.h4 + c << 0;
  };
  m.prototype.hex = function() {
    this.finalize();
    var a = this.h0, f = this.h1, e = this.h2, d = this.h3, c = this.h4;
    return b[a >> 28 & 15] + b[a >> 24 & 15] + b[a >> 20 & 15] + b[a >> 16 & 15] + b[a >> 12 & 15] + b[a >> 8 & 15] + b[a >> 4 & 15] + b[a & 15] + b[f >> 28 & 15] + b[f >> 24 & 15] + b[f >> 20 & 15] + b[f >> 16 & 15] + b[f >> 12 & 15] + b[f >> 8 & 15] + b[f >> 4 & 15] + b[f & 15] + b[e >> 28 & 15] + b[e >> 24 & 15] + b[e >> 20 & 15] + b[e >> 16 & 15] + b[e >> 12 & 15] + b[e >> 8 & 15] + b[e >> 4 & 15] + b[e & 15] + b[d >> 28 & 15] + b[d >> 24 & 15] + b[d >> 20 & 15] + b[d >> 16 & 15] + b[d >> 12 & 
    15] + b[d >> 8 & 15] + b[d >> 4 & 15] + b[d & 15] + b[c >> 28 & 15] + b[c >> 24 & 15] + b[c >> 20 & 15] + b[c >> 16 & 15] + b[c >> 12 & 15] + b[c >> 8 & 15] + b[c >> 4 & 15] + b[c & 15];
  };
  m.prototype.toString = m.prototype.hex;
  m.prototype.digest = function() {
    this.finalize();
    var a = this.h0, f = this.h1, b = this.h2, d = this.h3, c = this.h4;
    return [a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, a & 255, f >> 24 & 255, f >> 16 & 255, f >> 8 & 255, f & 255, b >> 24 & 255, b >> 16 & 255, b >> 8 & 255, b & 255, d >> 24 & 255, d >> 16 & 255, d >> 8 & 255, d & 255, c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, c & 255];
  };
  m.prototype.array = m.prototype.digest;
  m.prototype.arrayBuffer = function() {
    this.finalize();
    var a = new ArrayBuffer(20), b = new DataView(a);
    b.setUint32(0, this.h0);
    b.setUint32(4, this.h1);
    b.setUint32(8, this.h2);
    b.setUint32(12, this.h3);
    b.setUint32(16, this.h4);
    return a;
  };
  var q = function() {
    var a = u("hex");
    r && (a = y(a));
    a.create = function() {
      return new m;
    };
    a.update = function(b) {
      return a.create().update(b);
    };
    for (var b = 0; b < t.length; ++b) {
      var e = t[b];
      a[e] = u(e);
    }
    return a;
  }();
  v ? module.exports = q : (p.sha1 = q, w && define(function() {
    return q;
  }));
})();
