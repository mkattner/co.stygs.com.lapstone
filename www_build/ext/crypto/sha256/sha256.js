// Input 0
/*
 Chen, Yi-Cyuan 2014-2017
 @license MIT
*/
'use strict';
(function() {
  function h(a, c) {
    c ? (g[0] = g[16] = g[1] = g[2] = g[3] = g[4] = g[5] = g[6] = g[7] = g[8] = g[9] = g[10] = g[11] = g[12] = g[13] = g[14] = g[15] = 0, this.blocks = g) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    a ? (this.h0 = 3238371032, this.h1 = 914150663, this.h2 = 812702999, this.h3 = 4144912697, this.h4 = 4290775857, this.h5 = 1750603025, this.h6 = 1694076839, this.h7 = 3204075428) : (this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225);
    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = !1;
    this.first = !0;
    this.is224 = a;
  }
  function w(a, c, b) {
    var f = typeof a;
    if ("string" === f) {
      var d = [], l = a.length, e = 0;
      for (f = 0; f < l; ++f) {
        var u = a.charCodeAt(f);
        128 > u ? d[e++] = u : (2048 > u ? d[e++] = 192 | u >> 6 : (55296 > u || 57344 <= u ? d[e++] = 224 | u >> 12 : (u = 65536 + ((u & 1023) << 10 | a.charCodeAt(++f) & 1023), d[e++] = 240 | u >> 18, d[e++] = 128 | u >> 12 & 63), d[e++] = 128 | u >> 6 & 63), d[e++] = 128 | u & 63);
      }
      a = d;
    } else {
      if ("object" === f) {
        if (null === a) {
          throw Error("input is invalid type");
        }
        if (v && a.constructor === ArrayBuffer) {
          a = new Uint8Array(a);
        } else {
          if (!(Array.isArray(a) || v && ArrayBuffer.isView(a))) {
            throw Error("input is invalid type");
          }
        }
      } else {
        throw Error("input is invalid type");
      }
    }
    64 < a.length && (a = (new h(c, !0)).update(a).array());
    d = [];
    l = [];
    for (f = 0; 64 > f; ++f) {
      e = a[f] || 0, d[f] = 92 ^ e, l[f] = 54 ^ e;
    }
    h.call(this, c, b);
    this.update(l);
    this.oKeyPad = d;
    this.inner = !0;
    this.sharedMemory = b;
  }
  var t = "object" === typeof window, p = t ? window : {};
  p.JS_SHA256_NO_WINDOW && (t = !1);
  t = !t && "object" === typeof self;
  var z = !p.JS_SHA256_NO_NODE_JS && "object" === typeof process && process.versions && process.versions.node;
  z ? p = global : t && (p = self);
  t = !p.JS_SHA256_NO_COMMON_JS && "object" === typeof module && module.exports;
  var E = "function" === typeof define && define.amd, v = !p.JS_SHA256_NO_ARRAY_BUFFER && "undefined" !== typeof ArrayBuffer, b = "0123456789abcdef".split(""), F = [-2147483648, 8388608, 32768, 128], r = [24, 16, 8, 0], x = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 
  2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], y = ["hex", "array", "digest", 
  "arrayBuffer"], g = [];
  if (p.JS_SHA256_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function(a) {
      return "[object Array]" === Object.prototype.toString.call(a);
    };
  }
  !v || !p.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(a) {
    return "object" === typeof a && a.buffer && a.buffer.constructor === ArrayBuffer;
  });
  var A = function(a, c) {
    return function(b) {
      return (new h(c, !0)).update(b)[a]();
    };
  }, B = function(a) {
    var c = A("hex", a);
    z && (c = G(c, a));
    c.create = function() {
      return new h(a);
    };
    c.update = function(a) {
      return c.create().update(a);
    };
    for (var b = 0; b < y.length; ++b) {
      var f = y[b];
      c[f] = A(f, a);
    }
    return c;
  }, G = function(a, c) {
    var b = eval("require('crypto')"), f = eval("require('buffer').Buffer"), d = c ? "sha224" : "sha256";
    return function(c) {
      if ("string" === typeof c) {
        return b.createHash(d).update(c, "utf8").digest("hex");
      }
      if (null === c || void 0 === c) {
        throw Error("input is invalid type");
      }
      c.constructor === ArrayBuffer && (c = new Uint8Array(c));
      return Array.isArray(c) || ArrayBuffer.isView(c) || c.constructor === f ? b.createHash(d).update(new f(c)).digest("hex") : a(c);
    };
  }, C = function(a, c) {
    return function(b, f) {
      return (new w(b, c, !0)).update(f)[a]();
    };
  }, D = function(a) {
    var c = C("hex", a);
    c.create = function(c) {
      return new w(c, a);
    };
    c.update = function(a, b) {
      return c.create(a).update(b);
    };
    for (var b = 0; b < y.length; ++b) {
      var f = y[b];
      c[f] = C(f, a);
    }
    return c;
  };
  h.prototype.update = function(a) {
    if (!this.finalized) {
      var c = typeof a;
      if ("string" !== c) {
        if ("object" === c) {
          if (null === a) {
            throw Error("input is invalid type");
          }
          if (v && a.constructor === ArrayBuffer) {
            a = new Uint8Array(a);
          } else {
            if (!(Array.isArray(a) || v && ArrayBuffer.isView(a))) {
              throw Error("input is invalid type");
            }
          }
        } else {
          throw Error("input is invalid type");
        }
        var b = !0;
      }
      for (var f = 0, d, l = a.length, e = this.blocks; f < l;) {
        this.hashed && (this.hashed = !1, e[0] = this.block, e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0);
        if (b) {
          for (d = this.start; f < l && 64 > d; ++f) {
            e[d >> 2] |= a[f] << r[d++ & 3];
          }
        } else {
          for (d = this.start; f < l && 64 > d; ++f) {
            c = a.charCodeAt(f), 128 > c ? e[d >> 2] |= c << r[d++ & 3] : (2048 > c ? e[d >> 2] |= (192 | c >> 6) << r[d++ & 3] : (55296 > c || 57344 <= c ? e[d >> 2] |= (224 | c >> 12) << r[d++ & 3] : (c = 65536 + ((c & 1023) << 10 | a.charCodeAt(++f) & 1023), e[d >> 2] |= (240 | c >> 18) << r[d++ & 3], e[d >> 2] |= (128 | c >> 12 & 63) << r[d++ & 3]), e[d >> 2] |= (128 | c >> 6 & 63) << r[d++ & 3]), e[d >> 2] |= (128 | c & 63) << r[d++ & 3]);
          }
        }
        this.lastByteIndex = d;
        this.bytes += d - this.start;
        64 <= d ? (this.block = e[16], this.start = d - 64, this.hash(), this.hashed = !0) : this.start = d;
      }
      4294967295 < this.bytes && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes %= 4294967296);
      return this;
    }
  };
  h.prototype.finalize = function() {
    if (!this.finalized) {
      this.finalized = !0;
      var a = this.blocks, c = this.lastByteIndex;
      a[16] = this.block;
      a[c >> 2] |= F[c & 3];
      this.block = a[16];
      56 <= c && (this.hashed || this.hash(), a[0] = this.block, a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0);
      a[14] = this.hBytes << 3 | this.bytes >>> 29;
      a[15] = this.bytes << 3;
      this.hash();
    }
  };
  h.prototype.hash = function() {
    var a = this.h0, c = this.h1, b = this.h2, f = this.h3, d = this.h4, l = this.h5, e = this.h6, m = this.h7, h = this.blocks, n;
    for (n = 16; 64 > n; ++n) {
      var k = h[n - 15];
      var g = (k >>> 7 | k << 25) ^ (k >>> 18 | k << 14) ^ k >>> 3;
      k = h[n - 2];
      k = (k >>> 17 | k << 15) ^ (k >>> 19 | k << 13) ^ k >>> 10;
      h[n] = h[n - 16] + g + h[n - 7] + k << 0;
    }
    var p = c & b;
    for (n = 0; 64 > n; n += 4) {
      if (this.first) {
        if (this.is224) {
          var q = 300032;
          k = h[0] - 1413257819;
          m = k - 150054599 << 0;
          f = k + 24177077 << 0;
        } else {
          q = 704751109, k = h[0] - 210244248, m = k - 1521486534 << 0, f = k + 143694565 << 0;
        }
        this.first = !1;
      } else {
        g = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
        k = (d >>> 6 | d << 26) ^ (d >>> 11 | d << 21) ^ (d >>> 25 | d << 7);
        q = a & c;
        var r = q ^ a & b ^ p;
        var t = d & l ^ ~d & e;
        k = m + k + t + x[n] + h[n];
        g += r;
        m = f + k << 0;
        f = k + g << 0;
      }
      g = (f >>> 2 | f << 30) ^ (f >>> 13 | f << 19) ^ (f >>> 22 | f << 10);
      k = (m >>> 6 | m << 26) ^ (m >>> 11 | m << 21) ^ (m >>> 25 | m << 7);
      p = f & a;
      r = p ^ f & c ^ q;
      t = m & d ^ ~m & l;
      k = e + k + t + x[n + 1] + h[n + 1];
      g += r;
      e = b + k << 0;
      b = k + g << 0;
      g = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
      k = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
      q = b & f;
      r = q ^ b & a ^ p;
      t = e & m ^ ~e & d;
      k = l + k + t + x[n + 2] + h[n + 2];
      g += r;
      l = c + k << 0;
      c = k + g << 0;
      g = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
      k = (l >>> 6 | l << 26) ^ (l >>> 11 | l << 21) ^ (l >>> 25 | l << 7);
      p = c & b;
      r = p ^ c & f ^ q;
      t = l & e ^ ~l & m;
      k = d + k + t + x[n + 3] + h[n + 3];
      g += r;
      d = a + k << 0;
      a = k + g << 0;
    }
    this.h0 = this.h0 + a << 0;
    this.h1 = this.h1 + c << 0;
    this.h2 = this.h2 + b << 0;
    this.h3 = this.h3 + f << 0;
    this.h4 = this.h4 + d << 0;
    this.h5 = this.h5 + l << 0;
    this.h6 = this.h6 + e << 0;
    this.h7 = this.h7 + m << 0;
  };
  h.prototype.hex = function() {
    this.finalize();
    var a = this.h0, c = this.h1, g = this.h2, f = this.h3, d = this.h4, l = this.h5, e = this.h6, h = this.h7;
    a = b[a >> 28 & 15] + b[a >> 24 & 15] + b[a >> 20 & 15] + b[a >> 16 & 15] + b[a >> 12 & 15] + b[a >> 8 & 15] + b[a >> 4 & 15] + b[a & 15] + b[c >> 28 & 15] + b[c >> 24 & 15] + b[c >> 20 & 15] + b[c >> 16 & 15] + b[c >> 12 & 15] + b[c >> 8 & 15] + b[c >> 4 & 15] + b[c & 15] + b[g >> 28 & 15] + b[g >> 24 & 15] + b[g >> 20 & 15] + b[g >> 16 & 15] + b[g >> 12 & 15] + b[g >> 8 & 15] + b[g >> 4 & 15] + b[g & 15] + b[f >> 28 & 15] + b[f >> 24 & 15] + b[f >> 20 & 15] + b[f >> 16 & 15] + b[f >> 12 & 15] + 
    b[f >> 8 & 15] + b[f >> 4 & 15] + b[f & 15] + b[d >> 28 & 15] + b[d >> 24 & 15] + b[d >> 20 & 15] + b[d >> 16 & 15] + b[d >> 12 & 15] + b[d >> 8 & 15] + b[d >> 4 & 15] + b[d & 15] + b[l >> 28 & 15] + b[l >> 24 & 15] + b[l >> 20 & 15] + b[l >> 16 & 15] + b[l >> 12 & 15] + b[l >> 8 & 15] + b[l >> 4 & 15] + b[l & 15] + b[e >> 28 & 15] + b[e >> 24 & 15] + b[e >> 20 & 15] + b[e >> 16 & 15] + b[e >> 12 & 15] + b[e >> 8 & 15] + b[e >> 4 & 15] + b[e & 15];
    this.is224 || (a += b[h >> 28 & 15] + b[h >> 24 & 15] + b[h >> 20 & 15] + b[h >> 16 & 15] + b[h >> 12 & 15] + b[h >> 8 & 15] + b[h >> 4 & 15] + b[h & 15]);
    return a;
  };
  h.prototype.toString = h.prototype.hex;
  h.prototype.digest = function() {
    this.finalize();
    var a = this.h0, b = this.h1, g = this.h2, f = this.h3, d = this.h4, h = this.h5, e = this.h6, m = this.h7;
    a = [a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, a & 255, b >> 24 & 255, b >> 16 & 255, b >> 8 & 255, b & 255, g >> 24 & 255, g >> 16 & 255, g >> 8 & 255, g & 255, f >> 24 & 255, f >> 16 & 255, f >> 8 & 255, f & 255, d >> 24 & 255, d >> 16 & 255, d >> 8 & 255, d & 255, h >> 24 & 255, h >> 16 & 255, h >> 8 & 255, h & 255, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, e & 255];
    this.is224 || a.push(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, m & 255);
    return a;
  };
  h.prototype.array = h.prototype.digest;
  h.prototype.arrayBuffer = function() {
    this.finalize();
    var a = new ArrayBuffer(this.is224 ? 28 : 32), b = new DataView(a);
    b.setUint32(0, this.h0);
    b.setUint32(4, this.h1);
    b.setUint32(8, this.h2);
    b.setUint32(12, this.h3);
    b.setUint32(16, this.h4);
    b.setUint32(20, this.h5);
    b.setUint32(24, this.h6);
    this.is224 || b.setUint32(28, this.h7);
    return a;
  };
  w.prototype = new h;
  w.prototype.finalize = function() {
    h.prototype.finalize.call(this);
    if (this.inner) {
      this.inner = !1;
      var a = this.array();
      h.call(this, this.is224, this.sharedMemory);
      this.update(this.oKeyPad);
      this.update(a);
      h.prototype.finalize.call(this);
    }
  };
  var q = B();
  q.sha256 = q;
  q.sha224 = B(!0);
  q.sha256.hmac = D();
  q.sha224.hmac = D(!0);
  t ? module.exports = q : (p.sha256 = q.sha256, p.sha224 = q.sha224, E && define(function() {
    return q;
  }));
})();
