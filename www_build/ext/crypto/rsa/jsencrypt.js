// Input 0
/*
 *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
**************************************************************************** Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
 <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
*/
'use strict';
(function(D, E) {
  "object" === typeof exports && "undefined" !== typeof module ? E(exports) : "function" === typeof define && define.amd ? define(["exports"], E) : E(D.JSEncrypt = {});
})(this, function(D) {
  function E(b, a) {
    return b & a;
  }
  function H(b, a) {
    return b | a;
  }
  function Q(b, a) {
    return b ^ a;
  }
  function R(b, a) {
    return b & ~a;
  }
  function M(b) {
    var a, c = "";
    for (a = 0; a + 3 <= b.length; a += 3) {
      var d = parseInt(b.substring(a, a + 3), 16);
      c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 6) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d & 63);
    }
    a + 1 == b.length ? (d = parseInt(b.substring(a, a + 1), 16), c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d << 2)) : a + 2 == b.length && (d = parseInt(b.substring(a, a + 2), 16), c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 2) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((d & 3) << 4));
    for (; 0 < (c.length & 3);) {
      c += "\x3d";
    }
    return c;
  }
  function X(b) {
    var a = "", c, d = 0, g = 0;
    for (c = 0; c < b.length && "\x3d" != b.charAt(c); ++c) {
      var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(c));
      0 > f || (0 == d ? (a += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(f >> 2), g = f & 3, d = 1) : 1 == d ? (a += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(g << 2 | f >> 4), g = f & 15, d = 2) : 2 == d ? (a += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(g), a += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(f >> 2), g = f & 3, d = 3) : (a += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(g << 2 | f >> 4), a += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(f & 15), d = 0));
    }
    1 == d && (a += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(g << 2));
    return a;
  }
  function Y(b, a) {
    function c() {
      this.constructor = b;
    }
    Z(b, a);
    b.prototype = null === a ? Object.create(a) : (c.prototype = a.prototype, new c);
  }
  function B(b, a) {
    b.length > a && (b = b.substring(0, a) + "\u2026");
    return b;
  }
  function n() {
    return new l(null);
  }
  function t(b, a) {
    return new l(b, a);
  }
  function aa(b, a, c, d, g, f) {
    for (; 0 <= --f;) {
      var k = a * this[b++] + c[d] + g;
      g = Math.floor(k / 67108864);
      c[d++] = k & 67108863;
    }
    return g;
  }
  function ba(b, a, c, d, g, f) {
    var k = a & 32767;
    for (a >>= 15; 0 <= --f;) {
      var h = this[b] & 32767, e = this[b++] >> 15, w = a * h + e * k;
      h = k * h + ((w & 32767) << 15) + c[d] + (g & 1073741823);
      g = (h >>> 30) + (w >>> 15) + a * e + (g >>> 30);
      c[d++] = h & 1073741823;
    }
    return g;
  }
  function ca(b, a, c, d, g, f) {
    var k = a & 16383;
    for (a >>= 14; 0 <= --f;) {
      var h = this[b] & 16383, e = this[b++] >> 14, w = a * h + e * k;
      h = k * h + ((w & 16383) << 14) + c[d] + g;
      g = (h >> 28) + (w >> 14) + a * e;
      c[d++] = h & 268435455;
    }
    return g;
  }
  function S(b, a) {
    b = I[b.charCodeAt(a)];
    return null == b ? -1 : b;
  }
  function z(b) {
    var a = n();
    a.fromInt(b);
    return a;
  }
  function J(b) {
    var a = 1, c;
    0 != (c = b >>> 16) && (b = c, a += 16);
    0 != (c = b >> 8) && (b = c, a += 8);
    0 != (c = b >> 4) && (b = c, a += 4);
    0 != (c = b >> 2) && (b = c, a += 2);
    0 != b >> 1 && (a += 1);
    return a;
  }
  var Z = Object.setPrototypeOf || {__proto__:[]} instanceof Array && function(b, a) {
    b.__proto__ = a;
  } || function(b, a) {
    for (var c in a) {
      a.hasOwnProperty(c) && (b[c] = a[c]);
    }
  }, C, da = {decode:function(b) {
    var a;
    if (void 0 === C) {
      var c = "0123456789ABCDEF";
      C = {};
      for (a = 0; 16 > a; ++a) {
        C[c.charAt(a)] = a;
      }
      c = c.toLowerCase();
      for (a = 10; 16 > a; ++a) {
        C[c.charAt(a)] = a;
      }
      for (a = 0; 8 > a; ++a) {
        C[" \f\n\r\t\u00a0\u2028\u2029".charAt(a)] = -1;
      }
    }
    c = [];
    var d = 0, g = 0;
    for (a = 0; a < b.length; ++a) {
      var f = b.charAt(a);
      if ("\x3d" == f) {
        break;
      }
      f = C[f];
      if (-1 != f) {
        if (void 0 === f) {
          throw Error("Illegal character at offset " + a);
        }
        d |= f;
        2 <= ++g ? (c[c.length] = d, g = d = 0) : d <<= 4;
      }
    }
    if (g) {
      throw Error("Hex encoding incomplete: 4 bits missing");
    }
    return c;
  }}, F, N = {decode:function(b) {
    var a;
    if (void 0 === F) {
      F = Object.create(null);
      for (a = 0; 64 > a; ++a) {
        F["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a)] = a;
      }
      for (a = 0; 9 > a; ++a) {
        F["\x3d \f\n\r\t\u00a0\u2028\u2029".charAt(a)] = -1;
      }
    }
    var c = [], d = 0, g = 0;
    for (a = 0; a < b.length; ++a) {
      var f = b.charAt(a);
      if ("\x3d" == f) {
        break;
      }
      f = F[f];
      if (-1 != f) {
        if (void 0 === f) {
          throw Error("Illegal character at offset " + a);
        }
        d |= f;
        4 <= ++g ? (c[c.length] = d >> 16, c[c.length] = d >> 8 & 255, c[c.length] = d & 255, g = d = 0) : d <<= 6;
      }
    }
    switch(g) {
      case 1:
        throw Error("Base64 encoding incomplete: at least 2 bits missing");
      case 2:
        c[c.length] = d >> 10;
        break;
      case 3:
        c[c.length] = d >> 16, c[c.length] = d >> 8 & 255;
    }
    return c;
  }, re:/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, unarmor:function(b) {
    var a = N.re.exec(b);
    if (a) {
      if (a[1]) {
        b = a[1];
      } else {
        if (a[2]) {
          b = a[2];
        } else {
          throw Error("RegExp out of sync");
        }
      }
    }
    return N.decode(b);
  }}, G = function() {
    function b(a) {
      this.buf = [+a || 0];
    }
    b.prototype.mulAdd = function(a, c) {
      var d = this.buf, b = d.length, f;
      for (f = 0; f < b; ++f) {
        var k = d[f] * a + c;
        10000000000000 > k ? c = 0 : (c = 0 | k / 10000000000000, k -= 10000000000000 * c);
        d[f] = k;
      }
      0 < c && (d[f] = c);
    };
    b.prototype.sub = function(a) {
      var c = this.buf, d = c.length, b;
      for (b = 0; b < d; ++b) {
        var f = c[b] - a;
        0 > f ? (f += 10000000000000, a = 1) : a = 0;
        c[b] = f;
      }
      for (; 0 === c[c.length - 1];) {
        c.pop();
      }
    };
    b.prototype.toString = function(a) {
      if (10 != (a || 10)) {
        throw Error("only base 10 is supported");
      }
      a = this.buf;
      for (var c = a[a.length - 1].toString(), d = a.length - 2; 0 <= d; --d) {
        c += (10000000000000 + a[d]).toString().substring(1);
      }
      return c;
    };
    b.prototype.valueOf = function() {
      for (var a = this.buf, c = 0, d = a.length - 1; 0 <= d; --d) {
        c = 10000000000000 * c + a[d];
      }
      return c;
    };
    b.prototype.simplify = function() {
      var a = this.buf;
      return 1 == a.length ? a[0] : this;
    };
    return b;
  }(), ea = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, fa = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, O = function() {
    function b(a, c) {
      this.hexDigits = "0123456789ABCDEF";
      a instanceof b ? (this.enc = a.enc, this.pos = a.pos) : (this.enc = a, this.pos = c);
    }
    b.prototype.get = function(a) {
      void 0 === a && (a = this.pos++);
      if (a >= this.enc.length) {
        throw Error("Requesting byte offset " + a + " on a stream of length " + this.enc.length);
      }
      return "string" === typeof this.enc ? this.enc.charCodeAt(a) : this.enc[a];
    };
    b.prototype.hexByte = function(a) {
      return this.hexDigits.charAt(a >> 4 & 15) + this.hexDigits.charAt(a & 15);
    };
    b.prototype.hexDump = function(a, c, d) {
      for (var b = ""; a < c; ++a) {
        if (b += this.hexByte(this.get(a)), !0 !== d) {
          switch(a & 15) {
            case 7:
              b += "  ";
              break;
            case 15:
              b += "\n";
              break;
            default:
              b += " ";
          }
        }
      }
      return b;
    };
    b.prototype.isASCII = function(a, c) {
      for (; a < c; ++a) {
        var d = this.get(a);
        if (32 > d || 176 < d) {
          return !1;
        }
      }
      return !0;
    };
    b.prototype.parseStringISO = function(a, c) {
      for (var d = ""; a < c; ++a) {
        d += String.fromCharCode(this.get(a));
      }
      return d;
    };
    b.prototype.parseStringUTF = function(a, c) {
      for (var d = ""; a < c;) {
        var b = this.get(a++);
        d = 128 > b ? d + String.fromCharCode(b) : 191 < b && 224 > b ? d + String.fromCharCode((b & 31) << 6 | this.get(a++) & 63) : d + String.fromCharCode((b & 15) << 12 | (this.get(a++) & 63) << 6 | this.get(a++) & 63);
      }
      return d;
    };
    b.prototype.parseStringBMP = function(a, c) {
      for (var d = "", b, f = a; f < c;) {
        a = this.get(f++), b = this.get(f++), d += String.fromCharCode(a << 8 | b);
      }
      return d;
    };
    b.prototype.parseTime = function(a, c, d) {
      a = this.parseStringISO(a, c);
      c = (d ? ea : fa).exec(a);
      if (!c) {
        return "Unrecognized time: " + a;
      }
      d && (c[1] = +c[1], c[1] += 70 > +c[1] ? 2000 : 1900);
      a = c[1] + "-" + c[2] + "-" + c[3] + " " + c[4];
      c[5] && (a += ":" + c[5], c[6] && (a += ":" + c[6], c[7] && (a += "." + c[7])));
      c[8] && (a += " UTC", "Z" != c[8] && (a += c[8], c[9] && (a += ":" + c[9])));
      return a;
    };
    b.prototype.parseInteger = function(a, c) {
      for (var d = this.get(a), b = 127 < d, f = b ? 255 : 0, k, h = ""; d == f && ++a < c;) {
        d = this.get(a);
      }
      k = c - a;
      if (0 === k) {
        return b ? -1 : 0;
      }
      if (4 < k) {
        h = d;
        for (k <<= 3; 0 == ((+h ^ f) & 128);) {
          h = +h << 1, --k;
        }
        h = "(" + k + " bit)\n";
      }
      b && (d -= 256);
      d = new G(d);
      for (a += 1; a < c; ++a) {
        d.mulAdd(256, this.get(a));
      }
      return h + d.toString();
    };
    b.prototype.parseBitString = function(a, c, d) {
      var b = this.get(a), f = "(" + ((c - a - 1 << 3) - b) + " bit)\n", k = "";
      for (a += 1; a < c; ++a) {
        for (var h = this.get(a), e = a == c - 1 ? b : 0, w = 7; w >= e; --w) {
          k += h >> w & 1 ? "1" : "0";
        }
        if (k.length > d) {
          return f + B(k, d);
        }
      }
      return f + k;
    };
    b.prototype.parseOctetString = function(a, c, d) {
      if (this.isASCII(a, c)) {
        return B(this.parseStringISO(a, c), d);
      }
      var b = c - a, f = "(" + b + " byte)\n";
      d /= 2;
      for (b > d && (c = a + d); a < c; ++a) {
        f += this.hexByte(this.get(a));
      }
      b > d && (f += "\u2026");
      return f;
    };
    b.prototype.parseOID = function(a, c, d) {
      for (var b = "", f = new G, k = 0; a < c; ++a) {
        var h = this.get(a);
        f.mulAdd(128, h & 127);
        k += 7;
        if (!(h & 128)) {
          "" === b ? (f = f.simplify(), f instanceof G ? (f.sub(80), b = "2." + f.toString()) : (b = 80 > f ? 40 > f ? 0 : 1 : 2, b = b + "." + (f - 40 * b))) : b += "." + f.toString();
          if (b.length > d) {
            return B(b, d);
          }
          f = new G;
          k = 0;
        }
      }
      0 < k && (b += ".incomplete");
      return b;
    };
    return b;
  }(), ia = function() {
    function b(a, c, d, b, f) {
      if (!(b instanceof T)) {
        throw Error("Invalid tag value.");
      }
      this.stream = a;
      this.header = c;
      this.length = d;
      this.tag = b;
      this.sub = f;
    }
    b.prototype.typeName = function() {
      switch(this.tag.tagClass) {
        case 0:
          switch(this.tag.tagNumber) {
            case 0:
              return "EOC";
            case 1:
              return "BOOLEAN";
            case 2:
              return "INTEGER";
            case 3:
              return "BIT_STRING";
            case 4:
              return "OCTET_STRING";
            case 5:
              return "NULL";
            case 6:
              return "OBJECT_IDENTIFIER";
            case 7:
              return "ObjectDescriptor";
            case 8:
              return "EXTERNAL";
            case 9:
              return "REAL";
            case 10:
              return "ENUMERATED";
            case 11:
              return "EMBEDDED_PDV";
            case 12:
              return "UTF8String";
            case 16:
              return "SEQUENCE";
            case 17:
              return "SET";
            case 18:
              return "NumericString";
            case 19:
              return "PrintableString";
            case 20:
              return "TeletexString";
            case 21:
              return "VideotexString";
            case 22:
              return "IA5String";
            case 23:
              return "UTCTime";
            case 24:
              return "GeneralizedTime";
            case 25:
              return "GraphicString";
            case 26:
              return "VisibleString";
            case 27:
              return "GeneralString";
            case 28:
              return "UniversalString";
            case 30:
              return "BMPString";
          }return "Universal_" + this.tag.tagNumber.toString();
        case 1:
          return "Application_" + this.tag.tagNumber.toString();
        case 2:
          return "[" + this.tag.tagNumber.toString() + "]";
        case 3:
          return "Private_" + this.tag.tagNumber.toString();
      }
    };
    b.prototype.content = function(a) {
      if (void 0 === this.tag) {
        return null;
      }
      void 0 === a && (a = Infinity);
      var c = this.posContent(), d = Math.abs(this.length);
      if (!this.tag.isUniversal()) {
        return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(c, c + d, a);
      }
      switch(this.tag.tagNumber) {
        case 1:
          return 0 === this.stream.get(c) ? "false" : "true";
        case 2:
          return this.stream.parseInteger(c, c + d);
        case 3:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(c, c + d, a);
        case 4:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(c, c + d, a);
        case 6:
          return this.stream.parseOID(c, c + d, a);
        case 16:
        case 17:
          return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
        case 12:
          return B(this.stream.parseStringUTF(c, c + d), a);
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 26:
          return B(this.stream.parseStringISO(c, c + d), a);
        case 30:
          return B(this.stream.parseStringBMP(c, c + d), a);
        case 23:
        case 24:
          return this.stream.parseTime(c, c + d, 23 == this.tag.tagNumber);
      }
      return null;
    };
    b.prototype.toString = function() {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]";
    };
    b.prototype.toPrettyString = function(a) {
      void 0 === a && (a = "");
      var c = a + this.typeName() + " @" + this.stream.pos;
      0 <= this.length && (c += "+");
      c += this.length;
      this.tag.tagConstructed ? c += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (c += " (encapsulates)");
      c += "\n";
      if (null !== this.sub) {
        a += "  ";
        for (var d = 0, b = this.sub.length; d < b; ++d) {
          c += this.sub[d].toPrettyString(a);
        }
      }
      return c;
    };
    b.prototype.posStart = function() {
      return this.stream.pos;
    };
    b.prototype.posContent = function() {
      return this.stream.pos + this.header;
    };
    b.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length);
    };
    b.prototype.toHexString = function() {
      return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
    };
    b.decodeLength = function(a) {
      var c = a.get(), d = c & 127;
      if (d == c) {
        return d;
      }
      if (6 < d) {
        throw Error("Length over 48 bits not supported at position " + (a.pos - 1));
      }
      if (0 === d) {
        return null;
      }
      for (var b = c = 0; b < d; ++b) {
        c = 256 * c + a.get();
      }
      return c;
    };
    b.prototype.getHexStringValue = function() {
      return this.toHexString().substr(2 * this.header, 2 * this.length);
    };
    b.decode = function(a) {
      var c = a instanceof O ? a : new O(a, 0);
      a = new O(c);
      var d = new T(c), g = b.decodeLength(c), f = c.pos, k = f - a.pos, h = null, e = function() {
        var a = [];
        if (null !== g) {
          for (var d = f + g; c.pos < d;) {
            a[a.length] = b.decode(c);
          }
          if (c.pos != d) {
            throw Error("Content size is not correct for container starting at offset " + f);
          }
        } else {
          try {
            for (;;) {
              d = b.decode(c);
              if (d.tag.isEOC()) {
                break;
              }
              a[a.length] = d;
            }
            g = f - c.pos;
          } catch (ha) {
            throw Error("Exception while decoding undefined length content: " + ha);
          }
        }
        return a;
      };
      if (d.tagConstructed) {
        h = e();
      } else {
        if (d.isUniversal() && (3 == d.tagNumber || 4 == d.tagNumber)) {
          try {
            if (3 == d.tagNumber && 0 != c.get()) {
              throw Error("BIT STRINGs with unused bits cannot encapsulate.");
            }
            h = e();
            for (e = 0; e < h.length; ++e) {
              if (h[e].tag.isEOC()) {
                throw Error("EOC is not supposed to be actual content.");
              }
            }
          } catch (w) {
            h = null;
          }
        }
      }
      if (null === h) {
        if (null === g) {
          throw Error("We can't skip over an invalid tag with undefined length at offset " + f);
        }
        c.pos = f + Math.abs(g);
      }
      return new b(a, k, g, d, h);
    };
    return b;
  }(), T = function() {
    function b(a) {
      var c = a.get();
      this.tagClass = c >> 6;
      this.tagConstructed = 0 !== (c & 32);
      this.tagNumber = c & 31;
      if (31 == this.tagNumber) {
        var d = new G;
        do {
          c = a.get(), d.mulAdd(128, c & 127);
        } while (c & 128);
        this.tagNumber = d.simplify();
      }
    }
    b.prototype.isUniversal = function() {
      return 0 === this.tagClass;
    };
    b.prototype.isEOC = function() {
      return 0 === this.tagClass && 0 === this.tagNumber;
    };
    return b;
  }(), r = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 
  571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], ja = 67108864 / r[r.length - 1], l = function() {
    function b(a, c, d) {
      null != a && ("number" == typeof a ? this.fromNumber(a, c, d) : null == c && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, c));
    }
    b.prototype.toString = function(a) {
      if (0 > this.s) {
        return "-" + this.negate().toString(a);
      }
      if (16 == a) {
        a = 4;
      } else {
        if (8 == a) {
          a = 3;
        } else {
          if (2 == a) {
            a = 1;
          } else {
            if (32 == a) {
              a = 5;
            } else {
              if (4 == a) {
                a = 2;
              } else {
                return this.toRadix(a);
              }
            }
          }
        }
      }
      var c = (1 << a) - 1, d, b = !1, f = "", k = this.t, h = this.DB - k * this.DB % a;
      if (0 < k--) {
        for (h < this.DB && 0 < (d = this[k] >> h) && (b = !0, f = "0123456789abcdefghijklmnopqrstuvwxyz".charAt(d)); 0 <= k;) {
          h < a ? (d = (this[k] & (1 << h) - 1) << a - h, d |= this[--k] >> (h += this.DB - a)) : (d = this[k] >> (h -= a) & c, 0 >= h && (h += this.DB, --k)), 0 < d && (b = !0), b && (f += "0123456789abcdefghijklmnopqrstuvwxyz".charAt(d));
        }
      }
      return b ? f : "0";
    };
    b.prototype.negate = function() {
      var a = n();
      b.ZERO.subTo(this, a);
      return a;
    };
    b.prototype.abs = function() {
      return 0 > this.s ? this.negate() : this;
    };
    b.prototype.compareTo = function(a) {
      var c = this.s - a.s;
      if (0 != c) {
        return c;
      }
      var d = this.t;
      c = d - a.t;
      if (0 != c) {
        return 0 > this.s ? -c : c;
      }
      for (; 0 <= --d;) {
        if (0 != (c = this[d] - a[d])) {
          return c;
        }
      }
      return 0;
    };
    b.prototype.bitLength = function() {
      return 0 >= this.t ? 0 : this.DB * (this.t - 1) + J(this[this.t - 1] ^ this.s & this.DM);
    };
    b.prototype.mod = function(a) {
      var c = n();
      this.abs().divRemTo(a, null, c);
      0 > this.s && 0 < c.compareTo(b.ZERO) && a.subTo(c, c);
      return c;
    };
    b.prototype.modPowInt = function(a, c) {
      c = 256 > a || c.isEven() ? new U(c) : new V(c);
      return this.exp(a, c);
    };
    b.prototype.clone = function() {
      var a = n();
      this.copyTo(a);
      return a;
    };
    b.prototype.intValue = function() {
      if (0 > this.s) {
        if (1 == this.t) {
          return this[0] - this.DV;
        }
        if (0 == this.t) {
          return -1;
        }
      } else {
        if (1 == this.t) {
          return this[0];
        }
        if (0 == this.t) {
          return 0;
        }
      }
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    };
    b.prototype.byteValue = function() {
      return 0 == this.t ? this.s : this[0] << 24 >> 24;
    };
    b.prototype.shortValue = function() {
      return 0 == this.t ? this.s : this[0] << 16 >> 16;
    };
    b.prototype.signum = function() {
      return 0 > this.s ? -1 : 0 >= this.t || 1 == this.t && 0 >= this[0] ? 0 : 1;
    };
    b.prototype.toByteArray = function() {
      var a = this.t, c = [];
      c[0] = this.s;
      var d = this.DB - a * this.DB % 8, b, f = 0;
      if (0 < a--) {
        for (d < this.DB && (b = this[a] >> d) != (this.s & this.DM) >> d && (c[f++] = b | this.s << this.DB - d); 0 <= a;) {
          if (8 > d ? (b = (this[a] & (1 << d) - 1) << 8 - d, b |= this[--a] >> (d += this.DB - 8)) : (b = this[a] >> (d -= 8) & 255, 0 >= d && (d += this.DB, --a)), 0 != (b & 128) && (b |= -256), 0 == f && (this.s & 128) != (b & 128) && ++f, 0 < f || b != this.s) {
            c[f++] = b;
          }
        }
      }
      return c;
    };
    b.prototype.equals = function(a) {
      return 0 == this.compareTo(a);
    };
    b.prototype.min = function(a) {
      return 0 > this.compareTo(a) ? this : a;
    };
    b.prototype.max = function(a) {
      return 0 < this.compareTo(a) ? this : a;
    };
    b.prototype.and = function(a) {
      var c = n();
      this.bitwiseTo(a, E, c);
      return c;
    };
    b.prototype.or = function(a) {
      var c = n();
      this.bitwiseTo(a, H, c);
      return c;
    };
    b.prototype.xor = function(a) {
      var c = n();
      this.bitwiseTo(a, Q, c);
      return c;
    };
    b.prototype.andNot = function(a) {
      var c = n();
      this.bitwiseTo(a, R, c);
      return c;
    };
    b.prototype.not = function() {
      for (var a = n(), c = 0; c < this.t; ++c) {
        a[c] = this.DM & ~this[c];
      }
      a.t = this.t;
      a.s = ~this.s;
      return a;
    };
    b.prototype.shiftLeft = function(a) {
      var c = n();
      0 > a ? this.rShiftTo(-a, c) : this.lShiftTo(a, c);
      return c;
    };
    b.prototype.shiftRight = function(a) {
      var c = n();
      0 > a ? this.lShiftTo(-a, c) : this.rShiftTo(a, c);
      return c;
    };
    b.prototype.getLowestSetBit = function() {
      for (var a = 0; a < this.t; ++a) {
        if (0 != this[a]) {
          var c = a * this.DB;
          a = this[a];
          if (0 == a) {
            a = -1;
          } else {
            var d = 0;
            0 == (a & 65535) && (a >>= 16, d += 16);
            0 == (a & 255) && (a >>= 8, d += 8);
            0 == (a & 15) && (a >>= 4, d += 4);
            0 == (a & 3) && (a >>= 2, d += 2);
            0 == (a & 1) && ++d;
            a = d;
          }
          return c + a;
        }
      }
      return 0 > this.s ? this.t * this.DB : -1;
    };
    b.prototype.bitCount = function() {
      for (var a = 0, c = this.s & this.DM, d = 0; d < this.t; ++d) {
        for (var b = this[d] ^ c, f = 0; 0 != b;) {
          b &= b - 1, ++f;
        }
        a += f;
      }
      return a;
    };
    b.prototype.testBit = function(a) {
      var c = Math.floor(a / this.DB);
      return c >= this.t ? 0 != this.s : 0 != (this[c] & 1 << a % this.DB);
    };
    b.prototype.setBit = function(a) {
      return this.changeBit(a, H);
    };
    b.prototype.clearBit = function(a) {
      return this.changeBit(a, R);
    };
    b.prototype.flipBit = function(a) {
      return this.changeBit(a, Q);
    };
    b.prototype.add = function(a) {
      var c = n();
      this.addTo(a, c);
      return c;
    };
    b.prototype.subtract = function(a) {
      var c = n();
      this.subTo(a, c);
      return c;
    };
    b.prototype.multiply = function(a) {
      var c = n();
      this.multiplyTo(a, c);
      return c;
    };
    b.prototype.divide = function(a) {
      var c = n();
      this.divRemTo(a, c, null);
      return c;
    };
    b.prototype.remainder = function(a) {
      var c = n();
      this.divRemTo(a, null, c);
      return c;
    };
    b.prototype.divideAndRemainder = function(a) {
      var c = n(), d = n();
      this.divRemTo(a, c, d);
      return [c, d];
    };
    b.prototype.modPow = function(a, c) {
      var d = a.bitLength(), b = z(1);
      if (0 >= d) {
        return b;
      }
      var f = 18 > d ? 1 : 48 > d ? 3 : 144 > d ? 4 : 768 > d ? 5 : 6;
      c = 8 > d ? new U(c) : c.isEven() ? new ka(c) : new V(c);
      var k = [], h = 3, e = f - 1, w = (1 << f) - 1;
      k[1] = c.convert(this);
      if (1 < f) {
        for (d = n(), c.sqrTo(k[1], d); h <= w;) {
          k[h] = n(), c.mulTo(d, k[h - 2], k[h]), h += 2;
        }
      }
      var l = a.t - 1, m = !0, v = n();
      for (d = J(a[l]) - 1; 0 <= l;) {
        if (d >= e) {
          var q = a[l] >> d - e & w;
        } else {
          q = (a[l] & (1 << d + 1) - 1) << e - d, 0 < l && (q |= a[l - 1] >> this.DB + d - e);
        }
        for (h = f; 0 == (q & 1);) {
          q >>= 1, --h;
        }
        0 > (d -= h) && (d += this.DB, --l);
        if (m) {
          k[q].copyTo(b), m = !1;
        } else {
          for (; 1 < h;) {
            c.sqrTo(b, v), c.sqrTo(v, b), h -= 2;
          }
          0 < h ? c.sqrTo(b, v) : (h = b, b = v, v = h);
          c.mulTo(v, k[q], b);
        }
        for (; 0 <= l && 0 == (a[l] & 1 << d);) {
          c.sqrTo(b, v), h = b, b = v, v = h, 0 > --d && (d = this.DB - 1, --l);
        }
      }
      return c.revert(b);
    };
    b.prototype.modInverse = function(a) {
      var c = a.isEven();
      if (this.isEven() && c || 0 == a.signum()) {
        return b.ZERO;
      }
      for (var d = a.clone(), g = this.clone(), f = z(1), k = z(0), h = z(0), e = z(1); 0 != d.signum();) {
        for (; d.isEven();) {
          d.rShiftTo(1, d), c ? (f.isEven() && k.isEven() || (f.addTo(this, f), k.subTo(a, k)), f.rShiftTo(1, f)) : k.isEven() || k.subTo(a, k), k.rShiftTo(1, k);
        }
        for (; g.isEven();) {
          g.rShiftTo(1, g), c ? (h.isEven() && e.isEven() || (h.addTo(this, h), e.subTo(a, e)), h.rShiftTo(1, h)) : e.isEven() || e.subTo(a, e), e.rShiftTo(1, e);
        }
        0 <= d.compareTo(g) ? (d.subTo(g, d), c && f.subTo(h, f), k.subTo(e, k)) : (g.subTo(d, g), c && h.subTo(f, h), e.subTo(k, e));
      }
      if (0 != g.compareTo(b.ONE)) {
        return b.ZERO;
      }
      if (0 <= e.compareTo(a)) {
        return e.subtract(a);
      }
      if (0 > e.signum()) {
        e.addTo(a, e);
      } else {
        return e;
      }
      return 0 > e.signum() ? e.add(a) : e;
    };
    b.prototype.pow = function(a) {
      return this.exp(a, new la);
    };
    b.prototype.gcd = function(a) {
      var c = 0 > this.s ? this.negate() : this.clone();
      a = 0 > a.s ? a.negate() : a.clone();
      if (0 > c.compareTo(a)) {
        var d = c;
        c = a;
        a = d;
      }
      d = c.getLowestSetBit();
      var b = a.getLowestSetBit();
      if (0 > b) {
        return c;
      }
      d < b && (b = d);
      0 < b && (c.rShiftTo(b, c), a.rShiftTo(b, a));
      for (; 0 < c.signum();) {
        0 < (d = c.getLowestSetBit()) && c.rShiftTo(d, c), 0 < (d = a.getLowestSetBit()) && a.rShiftTo(d, a), 0 <= c.compareTo(a) ? (c.subTo(a, c), c.rShiftTo(1, c)) : (a.subTo(c, a), a.rShiftTo(1, a));
      }
      0 < b && a.lShiftTo(b, a);
      return a;
    };
    b.prototype.isProbablePrime = function(a) {
      var c, d = this.abs();
      if (1 == d.t && d[0] <= r[r.length - 1]) {
        for (c = 0; c < r.length; ++c) {
          if (d[0] == r[c]) {
            return !0;
          }
        }
        return !1;
      }
      if (d.isEven()) {
        return !1;
      }
      for (c = 1; c < r.length;) {
        for (var b = r[c], f = c + 1; f < r.length && b < ja;) {
          b *= r[f++];
        }
        for (b = d.modInt(b); c < f;) {
          if (0 == b % r[c++]) {
            return !1;
          }
        }
      }
      return d.millerRabin(a);
    };
    b.prototype.copyTo = function(a) {
      for (var c = this.t - 1; 0 <= c; --c) {
        a[c] = this[c];
      }
      a.t = this.t;
      a.s = this.s;
    };
    b.prototype.fromInt = function(a) {
      this.t = 1;
      this.s = 0 > a ? -1 : 0;
      0 < a ? this[0] = a : -1 > a ? this[0] = a + this.DV : this.t = 0;
    };
    b.prototype.fromString = function(a, c) {
      if (16 == c) {
        c = 4;
      } else {
        if (8 == c) {
          c = 3;
        } else {
          if (256 == c) {
            c = 8;
          } else {
            if (2 == c) {
              c = 1;
            } else {
              if (32 == c) {
                c = 5;
              } else {
                if (4 == c) {
                  c = 2;
                } else {
                  this.fromRadix(a, c);
                  return;
                }
              }
            }
          }
        }
      }
      this.s = this.t = 0;
      for (var d = a.length, g = !1, f = 0; 0 <= --d;) {
        var k = 8 == c ? +a[d] & 255 : S(a, d);
        0 > k ? "-" == a.charAt(d) && (g = !0) : (g = !1, 0 == f ? this[this.t++] = k : f + c > this.DB ? (this[this.t - 1] |= (k & (1 << this.DB - f) - 1) << f, this[this.t++] = k >> this.DB - f) : this[this.t - 1] |= k << f, f += c, f >= this.DB && (f -= this.DB));
      }
      8 == c && 0 != (+a[0] & 128) && (this.s = -1, 0 < f && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f));
      this.clamp();
      g && b.ZERO.subTo(this, this);
    };
    b.prototype.clamp = function() {
      for (var a = this.s & this.DM; 0 < this.t && this[this.t - 1] == a;) {
        --this.t;
      }
    };
    b.prototype.dlShiftTo = function(a, c) {
      var d;
      for (d = this.t - 1; 0 <= d; --d) {
        c[d + a] = this[d];
      }
      for (d = a - 1; 0 <= d; --d) {
        c[d] = 0;
      }
      c.t = this.t + a;
      c.s = this.s;
    };
    b.prototype.drShiftTo = function(a, c) {
      for (var d = a; d < this.t; ++d) {
        c[d - a] = this[d];
      }
      c.t = Math.max(this.t - a, 0);
      c.s = this.s;
    };
    b.prototype.lShiftTo = function(a, c) {
      var d = a % this.DB, b = this.DB - d, f = (1 << b) - 1;
      a = Math.floor(a / this.DB);
      for (var k = this.s << d & this.DM, h = this.t - 1; 0 <= h; --h) {
        c[h + a + 1] = this[h] >> b | k, k = (this[h] & f) << d;
      }
      for (h = a - 1; 0 <= h; --h) {
        c[h] = 0;
      }
      c[a] = k;
      c.t = this.t + a + 1;
      c.s = this.s;
      c.clamp();
    };
    b.prototype.rShiftTo = function(a, c) {
      c.s = this.s;
      var d = Math.floor(a / this.DB);
      if (d >= this.t) {
        c.t = 0;
      } else {
        a %= this.DB;
        var b = this.DB - a, f = (1 << a) - 1;
        c[0] = this[d] >> a;
        for (var k = d + 1; k < this.t; ++k) {
          c[k - d - 1] |= (this[k] & f) << b, c[k - d] = this[k] >> a;
        }
        0 < a && (c[this.t - d - 1] |= (this.s & f) << b);
        c.t = this.t - d;
        c.clamp();
      }
    };
    b.prototype.subTo = function(a, c) {
      for (var d = 0, b = 0, f = Math.min(a.t, this.t); d < f;) {
        b += this[d] - a[d], c[d++] = b & this.DM, b >>= this.DB;
      }
      if (a.t < this.t) {
        for (b -= a.s; d < this.t;) {
          b += this[d], c[d++] = b & this.DM, b >>= this.DB;
        }
        b += this.s;
      } else {
        for (b += this.s; d < a.t;) {
          b -= a[d], c[d++] = b & this.DM, b >>= this.DB;
        }
        b -= a.s;
      }
      c.s = 0 > b ? -1 : 0;
      -1 > b ? c[d++] = this.DV + b : 0 < b && (c[d++] = b);
      c.t = d;
      c.clamp();
    };
    b.prototype.multiplyTo = function(a, c) {
      var d = this.abs(), g = a.abs(), f = d.t;
      for (c.t = f + g.t; 0 <= --f;) {
        c[f] = 0;
      }
      for (f = 0; f < g.t; ++f) {
        c[f + d.t] = d.am(0, g[f], c, f, 0, d.t);
      }
      c.s = 0;
      c.clamp();
      this.s != a.s && b.ZERO.subTo(c, c);
    };
    b.prototype.squareTo = function(a) {
      for (var c = this.abs(), b = a.t = 2 * c.t; 0 <= --b;) {
        a[b] = 0;
      }
      for (b = 0; b < c.t - 1; ++b) {
        var g = c.am(b, c[b], a, 2 * b, 0, 1);
        (a[b + c.t] += c.am(b + 1, 2 * c[b], a, 2 * b + 1, g, c.t - b - 1)) >= c.DV && (a[b + c.t] -= c.DV, a[b + c.t + 1] = 1);
      }
      0 < a.t && (a[a.t - 1] += c.am(b, c[b], a, 2 * b, 0, 1));
      a.s = 0;
      a.clamp();
    };
    b.prototype.divRemTo = function(a, c, d) {
      var g = a.abs();
      if (!(0 >= g.t)) {
        var f = this.abs();
        if (f.t < g.t) {
          null != c && c.fromInt(0), null != d && this.copyTo(d);
        } else {
          null == d && (d = n());
          var k = n(), h = this.s;
          a = a.s;
          var e = this.DB - J(g[g.t - 1]);
          0 < e ? (g.lShiftTo(e, k), f.lShiftTo(e, d)) : (g.copyTo(k), f.copyTo(d));
          g = k.t;
          f = k[g - 1];
          if (0 != f) {
            var l = f * (1 << this.F1) + (1 < g ? k[g - 2] >> this.F2 : 0), m = this.FV / l;
            l = (1 << this.F1) / l;
            var q = 1 << this.F2, v = d.t, t = v - g, r = null == c ? n() : c;
            k.dlShiftTo(t, r);
            0 <= d.compareTo(r) && (d[d.t++] = 1, d.subTo(r, d));
            b.ONE.dlShiftTo(g, r);
            for (r.subTo(k, k); k.t < g;) {
              k[k.t++] = 0;
            }
            for (; 0 <= --t;) {
              var u = d[--v] == f ? this.DM : Math.floor(d[v] * m + (d[v - 1] + q) * l);
              if ((d[v] += k.am(0, u, d, t, 0, g)) < u) {
                for (k.dlShiftTo(t, r), d.subTo(r, d); d[v] < --u;) {
                  d.subTo(r, d);
                }
              }
            }
            null != c && (d.drShiftTo(g, c), h != a && b.ZERO.subTo(c, c));
            d.t = g;
            d.clamp();
            0 < e && d.rShiftTo(e, d);
            0 > h && b.ZERO.subTo(d, d);
          }
        }
      }
    };
    b.prototype.invDigit = function() {
      if (1 > this.t) {
        return 0;
      }
      var a = this[0];
      if (0 == (a & 1)) {
        return 0;
      }
      var c = a & 3;
      c = c * (2 - (a & 15) * c) & 15;
      c = c * (2 - (a & 255) * c) & 255;
      c = c * (2 - ((a & 65535) * c & 65535)) & 65535;
      c = c * (2 - a * c % this.DV) % this.DV;
      return 0 < c ? this.DV - c : -c;
    };
    b.prototype.isEven = function() {
      return 0 == (0 < this.t ? this[0] & 1 : this.s);
    };
    b.prototype.exp = function(a, c) {
      if (4294967295 < a || 1 > a) {
        return b.ONE;
      }
      var d = n(), g = n(), f = c.convert(this), k = J(a) - 1;
      for (f.copyTo(d); 0 <= --k;) {
        if (c.sqrTo(d, g), 0 < (a & 1 << k)) {
          c.mulTo(g, f, d);
        } else {
          var e = d;
          d = g;
          g = e;
        }
      }
      return c.revert(d);
    };
    b.prototype.chunkSize = function(a) {
      return Math.floor(Math.LN2 * this.DB / Math.log(a));
    };
    b.prototype.toRadix = function(a) {
      null == a && (a = 10);
      if (0 == this.signum() || 2 > a || 36 < a) {
        return "0";
      }
      var c = this.chunkSize(a);
      c = Math.pow(a, c);
      var b = z(c), g = n(), f = n(), k = "";
      for (this.divRemTo(b, g, f); 0 < g.signum();) {
        k = (c + f.intValue()).toString(a).substr(1) + k, g.divRemTo(b, g, f);
      }
      return f.intValue().toString(a) + k;
    };
    b.prototype.fromRadix = function(a, c) {
      this.fromInt(0);
      null == c && (c = 10);
      for (var d = this.chunkSize(c), g = Math.pow(c, d), f = !1, k = 0, e = 0, l = 0; l < a.length; ++l) {
        var w = S(a, l);
        0 > w ? "-" == a.charAt(l) && 0 == this.signum() && (f = !0) : (e = c * e + w, ++k >= d && (this.dMultiply(g), this.dAddOffset(e, 0), e = k = 0));
      }
      0 < k && (this.dMultiply(Math.pow(c, k)), this.dAddOffset(e, 0));
      f && b.ZERO.subTo(this, this);
    };
    b.prototype.fromNumber = function(a, c, d) {
      if ("number" == typeof c) {
        if (2 > a) {
          this.fromInt(1);
        } else {
          for (this.fromNumber(a, d), this.testBit(a - 1) || this.bitwiseTo(b.ONE.shiftLeft(a - 1), H, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(c);) {
            this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(b.ONE.shiftLeft(a - 1), this);
          }
        }
      } else {
        d = [];
        var g = a & 7;
        d.length = (a >> 3) + 1;
        c.nextBytes(d);
        d[0] = 0 < g ? d[0] & (1 << g) - 1 : 0;
        this.fromString(d, 256);
      }
    };
    b.prototype.bitwiseTo = function(a, c, b) {
      var d, f = Math.min(a.t, this.t);
      for (d = 0; d < f; ++d) {
        b[d] = c(this[d], a[d]);
      }
      if (a.t < this.t) {
        var k = a.s & this.DM;
        for (d = f; d < this.t; ++d) {
          b[d] = c(this[d], k);
        }
        b.t = this.t;
      } else {
        k = this.s & this.DM;
        for (d = f; d < a.t; ++d) {
          b[d] = c(k, a[d]);
        }
        b.t = a.t;
      }
      b.s = c(this.s, a.s);
      b.clamp();
    };
    b.prototype.changeBit = function(a, c) {
      a = b.ONE.shiftLeft(a);
      this.bitwiseTo(a, c, a);
      return a;
    };
    b.prototype.addTo = function(a, c) {
      for (var b = 0, g = 0, f = Math.min(a.t, this.t); b < f;) {
        g += this[b] + a[b], c[b++] = g & this.DM, g >>= this.DB;
      }
      if (a.t < this.t) {
        for (g += a.s; b < this.t;) {
          g += this[b], c[b++] = g & this.DM, g >>= this.DB;
        }
        g += this.s;
      } else {
        for (g += this.s; b < a.t;) {
          g += a[b], c[b++] = g & this.DM, g >>= this.DB;
        }
        g += a.s;
      }
      c.s = 0 > g ? -1 : 0;
      0 < g ? c[b++] = g : -1 > g && (c[b++] = this.DV + g);
      c.t = b;
      c.clamp();
    };
    b.prototype.dMultiply = function(a) {
      this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    };
    b.prototype.dAddOffset = function(a, c) {
      if (0 != a) {
        for (; this.t <= c;) {
          this[this.t++] = 0;
        }
        for (this[c] += a; this[c] >= this.DV;) {
          this[c] -= this.DV, ++c >= this.t && (this[this.t++] = 0), ++this[c];
        }
      }
    };
    b.prototype.multiplyLowerTo = function(a, c, b) {
      var d = Math.min(this.t + a.t, c);
      b.s = 0;
      for (b.t = d; 0 < d;) {
        b[--d] = 0;
      }
      for (var f = b.t - this.t; d < f; ++d) {
        b[d + this.t] = this.am(0, a[d], b, d, 0, this.t);
      }
      for (f = Math.min(a.t, c); d < f; ++d) {
        this.am(0, a[d], b, d, 0, c - d);
      }
      b.clamp();
    };
    b.prototype.multiplyUpperTo = function(a, c, b) {
      --c;
      var d = b.t = this.t + a.t - c;
      for (b.s = 0; 0 <= --d;) {
        b[d] = 0;
      }
      for (d = Math.max(c - this.t, 0); d < a.t; ++d) {
        b[this.t + d - c] = this.am(c - d, a[d], b, 0, 0, this.t + d - c);
      }
      b.clamp();
      b.drShiftTo(1, b);
    };
    b.prototype.modInt = function(a) {
      if (0 >= a) {
        return 0;
      }
      var c = this.DV % a, b = 0 > this.s ? a - 1 : 0;
      if (0 < this.t) {
        if (0 == c) {
          b = this[0] % a;
        } else {
          for (var g = this.t - 1; 0 <= g; --g) {
            b = (c * b + this[g]) % a;
          }
        }
      }
      return b;
    };
    b.prototype.millerRabin = function(a) {
      var c = this.subtract(b.ONE), d = c.getLowestSetBit();
      if (0 >= d) {
        return !1;
      }
      var g = c.shiftRight(d);
      a = a + 1 >> 1;
      a > r.length && (a = r.length);
      for (var f = n(), k = 0; k < a; ++k) {
        f.fromInt(r[Math.floor(Math.random() * r.length)]);
        var e = f.modPow(g, this);
        if (0 != e.compareTo(b.ONE) && 0 != e.compareTo(c)) {
          for (var l = 1; l++ < d && 0 != e.compareTo(c);) {
            if (e = e.modPowInt(2, this), 0 == e.compareTo(b.ONE)) {
              return !1;
            }
          }
          if (0 != e.compareTo(c)) {
            return !1;
          }
        }
      }
      return !0;
    };
    b.prototype.square = function() {
      var a = n();
      this.squareTo(a);
      return a;
    };
    b.prototype.gcda = function(a, c) {
      var b = 0 > this.s ? this.negate() : this.clone(), g = 0 > a.s ? a.negate() : a.clone();
      0 > b.compareTo(g) && (a = b, b = g, g = a);
      var f = b.getLowestSetBit(), e = g.getLowestSetBit();
      if (0 > e) {
        c(b);
      } else {
        f < e && (e = f);
        0 < e && (b.rShiftTo(e, b), g.rShiftTo(e, g));
        var h = function() {
          0 < (f = b.getLowestSetBit()) && b.rShiftTo(f, b);
          0 < (f = g.getLowestSetBit()) && g.rShiftTo(f, g);
          0 <= b.compareTo(g) ? (b.subTo(g, b), b.rShiftTo(1, b)) : (g.subTo(b, g), g.rShiftTo(1, g));
          0 < b.signum() ? setTimeout(h, 0) : (0 < e && g.lShiftTo(e, g), setTimeout(function() {
            c(g);
          }, 0));
        };
        setTimeout(h, 10);
      }
    };
    b.prototype.fromNumberAsync = function(a, c, d, g) {
      if ("number" == typeof c) {
        if (2 > a) {
          this.fromInt(1);
        } else {
          this.fromNumber(a, d);
          this.testBit(a - 1) || this.bitwiseTo(b.ONE.shiftLeft(a - 1), H, this);
          this.isEven() && this.dAddOffset(1, 0);
          var f = this, e = function() {
            f.dAddOffset(2, 0);
            f.bitLength() > a && f.subTo(b.ONE.shiftLeft(a - 1), f);
            f.isProbablePrime(c) ? setTimeout(function() {
              g();
            }, 0) : setTimeout(e, 0);
          };
          setTimeout(e, 0);
        }
      } else {
        d = [];
        var h = a & 7;
        d.length = (a >> 3) + 1;
        c.nextBytes(d);
        d[0] = 0 < h ? d[0] & (1 << h) - 1 : 0;
        this.fromString(d, 256);
      }
    };
    return b;
  }(), la = function() {
    function b() {
    }
    b.prototype.convert = function(a) {
      return a;
    };
    b.prototype.revert = function(a) {
      return a;
    };
    b.prototype.mulTo = function(a, c, b) {
      a.multiplyTo(c, b);
    };
    b.prototype.sqrTo = function(a, c) {
      a.squareTo(c);
    };
    return b;
  }(), U = function() {
    function b(a) {
      this.m = a;
    }
    b.prototype.convert = function(a) {
      return 0 > a.s || 0 <= a.compareTo(this.m) ? a.mod(this.m) : a;
    };
    b.prototype.revert = function(a) {
      return a;
    };
    b.prototype.reduce = function(a) {
      a.divRemTo(this.m, null, a);
    };
    b.prototype.mulTo = function(a, c, b) {
      a.multiplyTo(c, b);
      this.reduce(b);
    };
    b.prototype.sqrTo = function(a, c) {
      a.squareTo(c);
      this.reduce(c);
    };
    return b;
  }(), V = function() {
    function b(a) {
      this.m = a;
      this.mp = a.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << a.DB - 15) - 1;
      this.mt2 = 2 * a.t;
    }
    b.prototype.convert = function(a) {
      var c = n();
      a.abs().dlShiftTo(this.m.t, c);
      c.divRemTo(this.m, null, c);
      0 > a.s && 0 < c.compareTo(l.ZERO) && this.m.subTo(c, c);
      return c;
    };
    b.prototype.revert = function(a) {
      var c = n();
      a.copyTo(c);
      this.reduce(c);
      return c;
    };
    b.prototype.reduce = function(a) {
      for (; a.t <= this.mt2;) {
        a[a.t++] = 0;
      }
      for (var c = 0; c < this.m.t; ++c) {
        var b = a[c] & 32767, g = b * this.mpl + ((b * this.mph + (a[c] >> 15) * this.mpl & this.um) << 15) & a.DM;
        b = c + this.m.t;
        for (a[b] += this.m.am(0, g, a, c, 0, this.m.t); a[b] >= a.DV;) {
          a[b] -= a.DV, a[++b]++;
        }
      }
      a.clamp();
      a.drShiftTo(this.m.t, a);
      0 <= a.compareTo(this.m) && a.subTo(this.m, a);
    };
    b.prototype.mulTo = function(a, c, b) {
      a.multiplyTo(c, b);
      this.reduce(b);
    };
    b.prototype.sqrTo = function(a, c) {
      a.squareTo(c);
      this.reduce(c);
    };
    return b;
  }(), ka = function() {
    function b(a) {
      this.m = a;
      this.r2 = n();
      this.q3 = n();
      l.ONE.dlShiftTo(2 * a.t, this.r2);
      this.mu = this.r2.divide(a);
    }
    b.prototype.convert = function(a) {
      if (0 > a.s || a.t > 2 * this.m.t) {
        return a.mod(this.m);
      }
      if (0 > a.compareTo(this.m)) {
        return a;
      }
      var c = n();
      a.copyTo(c);
      this.reduce(c);
      return c;
    };
    b.prototype.revert = function(a) {
      return a;
    };
    b.prototype.reduce = function(a) {
      a.drShiftTo(this.m.t - 1, this.r2);
      a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp());
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      for (this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); 0 > a.compareTo(this.r2);) {
        a.dAddOffset(1, this.m.t + 1);
      }
      for (a.subTo(this.r2, a); 0 <= a.compareTo(this.m);) {
        a.subTo(this.m, a);
      }
    };
    b.prototype.mulTo = function(a, c, b) {
      a.multiplyTo(c, b);
      this.reduce(b);
    };
    b.prototype.sqrTo = function(a, c) {
      a.squareTo(c);
      this.reduce(c);
    };
    return b;
  }();
  if ("Microsoft Internet Explorer" == navigator.appName) {
    l.prototype.am = ba;
    var q = 30;
  } else {
    "Netscape" != navigator.appName ? (l.prototype.am = aa, q = 26) : (l.prototype.am = ca, q = 28);
  }
  l.prototype.DB = q;
  l.prototype.DM = (1 << q) - 1;
  l.prototype.DV = 1 << q;
  l.prototype.FV = Math.pow(2, 52);
  l.prototype.F1 = 52 - q;
  l.prototype.F2 = 2 * q - 52;
  var I = [], m;
  q = 48;
  for (m = 0; 9 >= m; ++m) {
    I[q++] = m;
  }
  q = 97;
  for (m = 10; 36 > m; ++m) {
    I[q++] = m;
  }
  q = 65;
  for (m = 10; 36 > m; ++m) {
    I[q++] = m;
  }
  l.ZERO = z(0);
  l.ONE = z(1);
  var ma = function() {
    function b() {
      this.j = this.i = 0;
      this.S = [];
    }
    b.prototype.init = function(a) {
      var c, b;
      for (c = 0; 256 > c; ++c) {
        this.S[c] = c;
      }
      for (c = b = 0; 256 > c; ++c) {
        b = b + this.S[c] + a[c % a.length] & 255;
        var g = this.S[c];
        this.S[c] = this.S[b];
        this.S[b] = g;
      }
      this.j = this.i = 0;
    };
    b.prototype.next = function() {
      this.i = this.i + 1 & 255;
      this.j = this.j + this.S[this.i] & 255;
      var a = this.S[this.i];
      this.S[this.i] = this.S[this.j];
      this.S[this.j] = a;
      return this.S[a + this.S[this.i] & 255];
    };
    return b;
  }(), K, x = null;
  if (null == x) {
    x = [];
    var u = 0;
    q = void 0;
    if (window.crypto && window.crypto.getRandomValues) {
      for (m = new Uint32Array(256), window.crypto.getRandomValues(m), q = 0; q < m.length; ++q) {
        x[u++] = m[q] & 255;
      }
    }
    var L = function(b) {
      this.count = this.count || 0;
      if (256 <= this.count || 256 <= u) {
        window.removeEventListener ? window.removeEventListener("mousemove", L, !1) : window.detachEvent && window.detachEvent("onmousemove", L);
      } else {
        try {
          var a = b.x + b.y;
          x[u++] = a & 255;
          this.count += 1;
        } catch (c) {
        }
      }
    };
    window.addEventListener ? window.addEventListener("mousemove", L, !1) : window.attachEvent && window.attachEvent("onmousemove", L);
  }
  var P = function() {
    function b() {
    }
    b.prototype.nextBytes = function(a) {
      for (var c = 0; c < a.length; ++c) {
        var b = c;
        if (null == K) {
          for (K = new ma; 256 > u;) {
            var g = Math.floor(65536 * Math.random());
            x[u++] = g & 255;
          }
          K.init(x);
          for (u = 0; u < x.length; ++u) {
            x[u] = 0;
          }
          u = 0;
        }
        g = K.next();
        a[b] = g;
      }
    };
    return b;
  }();
  q = function() {
    function b() {
      this.n = null;
      this.e = 0;
      this.coeff = this.dmq1 = this.dmp1 = this.q = this.p = this.d = null;
    }
    b.prototype.doPublic = function(a) {
      return a.modPowInt(this.e, this.n);
    };
    b.prototype.doPrivate = function(a) {
      if (null == this.p || null == this.q) {
        return a.modPow(this.d, this.n);
      }
      var c = a.mod(this.p).modPow(this.dmp1, this.p);
      for (a = a.mod(this.q).modPow(this.dmq1, this.q); 0 > c.compareTo(a);) {
        c = c.add(this.p);
      }
      return c.subtract(a).multiply(this.coeff).mod(this.p).multiply(this.q).add(a);
    };
    b.prototype.setPublic = function(a, c) {
      null != a && null != c && 0 < a.length && 0 < c.length ? (this.n = t(a, 16), this.e = parseInt(c, 16)) : console.error("Invalid RSA public key");
    };
    b.prototype.encrypt = function(a) {
      var c = this.n.bitLength() + 7 >> 3;
      if (c < a.length + 11) {
        console.error("Message too long for RSA"), c = null;
      } else {
        for (var b = [], g = a.length - 1; 0 <= g && 0 < c;) {
          var f = a.charCodeAt(g--);
          128 > f ? b[--c] = f : 127 < f && 2048 > f ? (b[--c] = f & 63 | 128, b[--c] = f >> 6 | 192) : (b[--c] = f & 63 | 128, b[--c] = f >> 6 & 63 | 128, b[--c] = f >> 12 | 224);
        }
        b[--c] = 0;
        a = new P;
        for (g = []; 2 < c;) {
          for (g[0] = 0; 0 == g[0];) {
            a.nextBytes(g);
          }
          b[--c] = g[0];
        }
        b[--c] = 2;
        b[--c] = 0;
        c = new l(b);
      }
      if (null == c) {
        return null;
      }
      c = this.doPublic(c);
      if (null == c) {
        return null;
      }
      c = c.toString(16);
      return 0 == (c.length & 1) ? c : "0" + c;
    };
    b.prototype.setPrivate = function(a, c, b) {
      null != a && null != c && 0 < a.length && 0 < c.length ? (this.n = t(a, 16), this.e = parseInt(c, 16), this.d = t(b, 16)) : console.error("Invalid RSA private key");
    };
    b.prototype.setPrivateEx = function(a, c, b, g, f, e, h, l) {
      null != a && null != c && 0 < a.length && 0 < c.length ? (this.n = t(a, 16), this.e = parseInt(c, 16), this.d = t(b, 16), this.p = t(g, 16), this.q = t(f, 16), this.dmp1 = t(e, 16), this.dmq1 = t(h, 16), this.coeff = t(l, 16)) : console.error("Invalid RSA private key");
    };
    b.prototype.generate = function(a, c) {
      var b = new P, g = a >> 1;
      this.e = parseInt(c, 16);
      for (c = new l(c, 16);;) {
        for (; this.p = new l(a - g, 1, b), 0 != this.p.subtract(l.ONE).gcd(c).compareTo(l.ONE) || !this.p.isProbablePrime(10);) {
        }
        for (; this.q = new l(g, 1, b), 0 != this.q.subtract(l.ONE).gcd(c).compareTo(l.ONE) || !this.q.isProbablePrime(10);) {
        }
        if (0 >= this.p.compareTo(this.q)) {
          var f = this.p;
          this.p = this.q;
          this.q = f;
        }
        f = this.p.subtract(l.ONE);
        var e = this.q.subtract(l.ONE), h = f.multiply(e);
        if (0 == h.gcd(c).compareTo(l.ONE)) {
          this.n = this.p.multiply(this.q);
          this.d = c.modInverse(h);
          this.dmp1 = this.d.mod(f);
          this.dmq1 = this.d.mod(e);
          this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    };
    b.prototype.decrypt = function(a) {
      a = t(a, 16);
      a = this.doPrivate(a);
      if (null == a) {
        return null;
      }
      a: {
        var c = this.n.bitLength() + 7 >> 3;
        a = a.toByteArray();
        for (var b = 0; b < a.length && 0 == a[b];) {
          ++b;
        }
        if (a.length - b != c - 1 || 2 != a[b]) {
          a = null;
        } else {
          for (++b; 0 != a[b];) {
            if (++b >= a.length) {
              a = null;
              break a;
            }
          }
          for (c = ""; ++b < a.length;) {
            var g = a[b] & 255;
            128 > g ? c += String.fromCharCode(g) : 191 < g && 224 > g ? (c += String.fromCharCode((g & 31) << 6 | a[b + 1] & 63), ++b) : (c += String.fromCharCode((g & 15) << 12 | (a[b + 1] & 63) << 6 | a[b + 2] & 63), b += 2);
          }
          a = c;
        }
      }
      return a;
    };
    b.prototype.generateAsync = function(a, c, b) {
      var d = new P, f = a >> 1;
      this.e = parseInt(c, 16);
      var e = new l(c, 16), h = this, m = function() {
        var c = function() {
          if (0 >= h.p.compareTo(h.q)) {
            var a = h.p;
            h.p = h.q;
            h.q = a;
          }
          a = h.p.subtract(l.ONE);
          var c = h.q.subtract(l.ONE), d = a.multiply(c);
          0 == d.gcd(e).compareTo(l.ONE) ? (h.n = h.p.multiply(h.q), h.d = e.modInverse(d), h.dmp1 = h.d.mod(a), h.dmq1 = h.d.mod(c), h.coeff = h.q.modInverse(h.p), setTimeout(function() {
            b();
          }, 0)) : setTimeout(m, 0);
        }, g = function() {
          h.q = n();
          h.q.fromNumberAsync(f, 1, d, function() {
            h.q.subtract(l.ONE).gcda(e, function(a) {
              0 == a.compareTo(l.ONE) && h.q.isProbablePrime(10) ? setTimeout(c, 0) : setTimeout(g, 0);
            });
          });
        }, k = function() {
          h.p = n();
          h.p.fromNumberAsync(a - f, 1, d, function() {
            h.p.subtract(l.ONE).gcda(e, function(a) {
              0 == a.compareTo(l.ONE) && h.p.isProbablePrime(10) ? setTimeout(g, 0) : setTimeout(k, 0);
            });
          });
        };
        setTimeout(k, 0);
      };
      setTimeout(m, 0);
    };
    return b;
  }();
  m = {extend:function(b, a, c) {
    if (!a || !b) {
      throw Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
    }
    var d = function() {
    };
    d.prototype = a.prototype;
    b.prototype = new d;
    b.prototype.constructor = b;
    b.superclass = a.prototype;
    a.prototype.constructor == Object.prototype.constructor && (a.prototype.constructor = a);
    if (c) {
      for (var g in c) {
        b.prototype[g] = c[g];
      }
      a = function() {
      };
      var f = ["toString", "valueOf"];
      try {
        /MSIE/.test(navigator.userAgent) && (a = function(a, c) {
          for (g = 0; g < f.length; g += 1) {
            var b = f[g], d = c[b];
            "function" === typeof d && d != Object.prototype[b] && (a[b] = d);
          }
        });
      } catch (k) {
      }
      a(b.prototype, c);
    }
  }};
  var e = {};
  "undefined" != typeof e.asn1 && e.asn1 || (e.asn1 = {});
  e.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(b) {
      b = b.toString(16);
      1 == b.length % 2 && (b = "0" + b);
      return b;
    };
    this.bigIntToMinTwosComplementsHex = function(b) {
      var a = b.toString(16);
      if ("-" != a.substr(0, 1)) {
        1 == a.length % 2 ? a = "0" + a : a.match(/^[0-7]/) || (a = "00" + a);
      } else {
        var c = a.substr(1).length;
        1 == c % 2 ? c += 1 : a.match(/^[0-7]/) || (c += 2);
        a = "";
        for (var d = 0; d < c; d++) {
          a += "f";
        }
        a = (new l(a, 16)).xor(b).add(l.ONE).toString(16).replace(/^-/, "");
      }
      return a;
    };
    this.getPEMStringFromHex = function(b, a) {
      return hextopem(b, a);
    };
    this.newObject = function(b) {
      var a = e.asn1, c = a.DERBoolean, d = a.DERInteger, g = a.DERBitString, f = a.DEROctetString, k = a.DERNull, h = a.DERObjectIdentifier, l = a.DEREnumerated, m = a.DERUTF8String, n = a.DERNumericString, q = a.DERPrintableString, t = a.DERTeletexString, r = a.DERIA5String, u = a.DERUTCTime, z = a.DERGeneralizedTime, y = a.DERSequence, x = a.DERSet, A = a.DERTaggedObject;
      a = a.ASN1Util.newObject;
      var p = Object.keys(b);
      if (1 != p.length) {
        throw "key of param shall be only one.";
      }
      p = p[0];
      if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + p + ":")) {
        throw "undefined key: " + p;
      }
      if ("bool" == p) {
        return new c(b[p]);
      }
      if ("int" == p) {
        return new d(b[p]);
      }
      if ("bitstr" == p) {
        return new g(b[p]);
      }
      if ("octstr" == p) {
        return new f(b[p]);
      }
      if ("null" == p) {
        return new k(b[p]);
      }
      if ("oid" == p) {
        return new h(b[p]);
      }
      if ("enum" == p) {
        return new l(b[p]);
      }
      if ("utf8str" == p) {
        return new m(b[p]);
      }
      if ("numstr" == p) {
        return new n(b[p]);
      }
      if ("prnstr" == p) {
        return new q(b[p]);
      }
      if ("telstr" == p) {
        return new t(b[p]);
      }
      if ("ia5str" == p) {
        return new r(b[p]);
      }
      if ("utctime" == p) {
        return new u(b[p]);
      }
      if ("gentime" == p) {
        return new z(b[p]);
      }
      if ("seq" == p) {
        A = b[p];
        b = [];
        for (c = 0; c < A.length; c++) {
          d = a(A[c]), b.push(d);
        }
        return new y({array:b});
      }
      if ("set" == p) {
        A = b[p];
        b = [];
        for (c = 0; c < A.length; c++) {
          d = a(A[c]), b.push(d);
        }
        return new x({array:b});
      }
      if ("tag" == p) {
        y = b[p];
        if ("[object Array]" === Object.prototype.toString.call(y) && 3 == y.length) {
          return a = a(y[2]), new A({tag:y[0], explicit:y[1], obj:a});
        }
        x = {};
        void 0 !== y.explicit && (x.explicit = y.explicit);
        void 0 !== y.tag && (x.tag = y.tag);
        if (void 0 === y.obj) {
          throw "obj shall be specified for 'tag'.";
        }
        x.obj = a(y.obj);
        return new A(x);
      }
    };
    this.jsonToASN1HEX = function(b) {
      return this.newObject(b).getEncodedHex();
    };
  };
  e.asn1.ASN1Util.oidHexToInt = function(b) {
    var a = parseInt(b.substr(0, 2), 16);
    a = Math.floor(a / 40) + "." + a % 40;
    for (var c = "", d = 2; d < b.length; d += 2) {
      var g = ("00000000" + parseInt(b.substr(d, 2), 16).toString(2)).slice(-8);
      c += g.substr(1, 7);
      "0" == g.substr(0, 1) && (c = new l(c, 2), a = a + "." + c.toString(10), c = "");
    }
    return a;
  };
  e.asn1.ASN1Util.oidIntToHex = function(b) {
    var a = function(a) {
      a = a.toString(16);
      1 == a.length && (a = "0" + a);
      return a;
    }, c = function(c) {
      var b = "";
      c = (new l(c, 10)).toString(2);
      var d = 7 - c.length % 7;
      7 == d && (d = 0);
      for (var f = "", g = 0; g < d; g++) {
        f += "0";
      }
      c = f + c;
      for (g = 0; g < c.length - 1; g += 7) {
        d = c.substr(g, 7), g != c.length - 7 && (d = "1" + d), b += a(parseInt(d, 2));
      }
      return b;
    };
    if (!b.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + b;
    }
    var d = "";
    b = b.split(".");
    var g = 40 * parseInt(b[0]) + parseInt(b[1]);
    d += a(g);
    b.splice(0, 2);
    for (g = 0; g < b.length; g++) {
      d += c(b[g]);
    }
    return d;
  };
  e.asn1.ASN1Object = function() {
    this.getLengthHexFromValue = function() {
      if ("undefined" == typeof this.hV || null == this.hV) {
        throw "this.hV is null or undefined.";
      }
      if (1 == this.hV.length % 2) {
        throw "value hex must be even length: n\x3d0,v\x3d" + this.hV;
      }
      var b = this.hV.length / 2, a = b.toString(16);
      1 == a.length % 2 && (a = "0" + a);
      if (128 > b) {
        return a;
      }
      var c = a.length / 2;
      if (15 < c) {
        throw "ASN.1 length too long to represent by 8x: n \x3d " + b.toString(16);
      }
      return (128 + c).toString(16) + a;
    };
    this.getEncodedHex = function() {
      if (null == this.hTLV || this.isModified) {
        this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1;
      }
      return this.hTLV;
    };
    this.getValueHex = function() {
      this.getEncodedHex();
      return this.hV;
    };
    this.getFreshValueHex = function() {
      return "";
    };
  };
  e.asn1.DERAbstractString = function(b) {
    e.asn1.DERAbstractString.superclass.constructor.call(this);
    this.getString = function() {
      return this.s;
    };
    this.setString = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.s = a;
      this.hV = stohex(this.s);
    };
    this.setStringHex = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.s = null;
      this.hV = a;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    "undefined" != typeof b && ("string" == typeof b ? this.setString(b) : "undefined" != typeof b.str ? this.setString(b.str) : "undefined" != typeof b.hex && this.setStringHex(b.hex));
  };
  m.extend(e.asn1.DERAbstractString, e.asn1.ASN1Object);
  e.asn1.DERAbstractTime = function(b) {
    e.asn1.DERAbstractTime.superclass.constructor.call(this);
    this.localDateToUTC = function(a) {
      utc = a.getTime() + 60000 * a.getTimezoneOffset();
      return new Date(utc);
    };
    this.formatDate = function(a, c, b) {
      var d = this.zeroPadding;
      a = this.localDateToUTC(a);
      var f = String(a.getFullYear());
      "utc" == c && (f = f.substr(2, 2));
      c = d(String(a.getMonth() + 1), 2);
      var e = d(String(a.getDate()), 2), h = d(String(a.getHours()), 2), l = d(String(a.getMinutes()), 2), m = d(String(a.getSeconds()), 2);
      f = f + c + e + h + l + m;
      !0 === b && (b = a.getMilliseconds(), 0 != b && (d = d(String(b), 3), d = d.replace(/[0]+$/, ""), f = f + "." + d));
      return f + "Z";
    };
    this.zeroPadding = function(a, c) {
      return a.length >= c ? a : Array(c - a.length + 1).join("0") + a;
    };
    this.getString = function() {
      return this.s;
    };
    this.setString = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.s = a;
      this.hV = stohex(a);
    };
    this.setByDateValue = function(a, c, b, g, f, e) {
      a = new Date(Date.UTC(a, c - 1, b, g, f, e, 0));
      this.setByDate(a);
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
  };
  m.extend(e.asn1.DERAbstractTime, e.asn1.ASN1Object);
  e.asn1.DERAbstractStructured = function(b) {
    e.asn1.DERAbstractString.superclass.constructor.call(this);
    this.setByASN1ObjectArray = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.asn1Array = a;
    };
    this.appendASN1Object = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.asn1Array.push(a);
    };
    this.asn1Array = [];
    "undefined" != typeof b && "undefined" != typeof b.array && (this.asn1Array = b.array);
  };
  m.extend(e.asn1.DERAbstractStructured, e.asn1.ASN1Object);
  e.asn1.DERBoolean = function() {
    e.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
  };
  m.extend(e.asn1.DERBoolean, e.asn1.ASN1Object);
  e.asn1.DERInteger = function(b) {
    e.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";
    this.setByBigInteger = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.hV = e.asn1.ASN1Util.bigIntToMinTwosComplementsHex(a);
    };
    this.setByInteger = function(a) {
      a = new l(String(a), 10);
      this.setByBigInteger(a);
    };
    this.setValueHex = function(a) {
      this.hV = a;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    "undefined" != typeof b && ("undefined" != typeof b.bigint ? this.setByBigInteger(b.bigint) : "undefined" != typeof b["int"] ? this.setByInteger(b["int"]) : "number" == typeof b ? this.setByInteger(b) : "undefined" != typeof b.hex && this.setValueHex(b.hex));
  };
  m.extend(e.asn1.DERInteger, e.asn1.ASN1Object);
  e.asn1.DERBitString = function(b) {
    if (void 0 !== b && "undefined" !== typeof b.obj) {
      var a = e.asn1.ASN1Util.newObject(b.obj);
      b.hex = "00" + a.getEncodedHex();
    }
    e.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";
    this.setHexValueIncludingUnusedBits = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.hV = a;
    };
    this.setUnusedBitsAndHexValue = function(a, b) {
      if (0 > a || 7 < a) {
        throw "unused bits shall be from 0 to 7: u \x3d " + a;
      }
      this.hTLV = null;
      this.isModified = !0;
      this.hV = "0" + a + b;
    };
    this.setByBinaryString = function(a) {
      a = a.replace(/0+$/, "");
      var c = 8 - a.length % 8;
      8 == c && (c = 0);
      for (var b = 0; b <= c; b++) {
        a += "0";
      }
      var f = "";
      for (b = 0; b < a.length - 1; b += 8) {
        var e = a.substr(b, 8);
        e = parseInt(e, 2).toString(16);
        1 == e.length && (e = "0" + e);
        f += e;
      }
      this.hTLV = null;
      this.isModified = !0;
      this.hV = "0" + c + f;
    };
    this.setByBooleanArray = function(a) {
      for (var c = "", b = 0; b < a.length; b++) {
        c = 1 == a[b] ? c + "1" : c + "0";
      }
      this.setByBinaryString(c);
    };
    this.newFalseArray = function(a) {
      for (var c = Array(a), b = 0; b < a; b++) {
        c[b] = !1;
      }
      return c;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    "undefined" != typeof b && ("string" == typeof b && b.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(b) : "undefined" != typeof b.hex ? this.setHexValueIncludingUnusedBits(b.hex) : "undefined" != typeof b.bin ? this.setByBinaryString(b.bin) : "undefined" != typeof b.array && this.setByBooleanArray(b.array));
  };
  m.extend(e.asn1.DERBitString, e.asn1.ASN1Object);
  e.asn1.DEROctetString = function(b) {
    if (void 0 !== b && "undefined" !== typeof b.obj) {
      var a = e.asn1.ASN1Util.newObject(b.obj);
      b.hex = a.getEncodedHex();
    }
    e.asn1.DEROctetString.superclass.constructor.call(this, b);
    this.hT = "04";
  };
  m.extend(e.asn1.DEROctetString, e.asn1.DERAbstractString);
  e.asn1.DERNull = function() {
    e.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
  };
  m.extend(e.asn1.DERNull, e.asn1.ASN1Object);
  e.asn1.DERObjectIdentifier = function(b) {
    var a = function(a) {
      a = a.toString(16);
      1 == a.length && (a = "0" + a);
      return a;
    };
    e.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";
    this.setValueHex = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.s = null;
      this.hV = a;
    };
    this.setValueOidString = function(c) {
      if (!c.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + c;
      }
      var b = "";
      c = c.split(".");
      var e = 40 * parseInt(c[0]) + parseInt(c[1]);
      b += a(e);
      c.splice(0, 2);
      for (e = 0; e < c.length; e++) {
        var f = "", k = (new l(c[e], 10)).toString(2), h = 7 - k.length % 7;
        7 == h && (h = 0);
        for (var m = "", n = 0; n < h; n++) {
          m += "0";
        }
        k = m + k;
        for (n = 0; n < k.length - 1; n += 7) {
          h = k.substr(n, 7), n != k.length - 7 && (h = "1" + h), f += a(parseInt(h, 2));
        }
        b += f;
      }
      this.hTLV = null;
      this.isModified = !0;
      this.s = null;
      this.hV = b;
    };
    this.setValueName = function(a) {
      var b = e.asn1.x509.OID.name2oid(a);
      if ("" !== b) {
        this.setValueOidString(b);
      } else {
        throw "DERObjectIdentifier oidName undefined: " + a;
      }
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    void 0 !== b && ("string" === typeof b ? b.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(b) : this.setValueName(b) : void 0 !== b.oid ? this.setValueOidString(b.oid) : void 0 !== b.hex ? this.setValueHex(b.hex) : void 0 !== b.name && this.setValueName(b.name));
  };
  m.extend(e.asn1.DERObjectIdentifier, e.asn1.ASN1Object);
  e.asn1.DEREnumerated = function(b) {
    e.asn1.DEREnumerated.superclass.constructor.call(this);
    this.hT = "0a";
    this.setByBigInteger = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.hV = e.asn1.ASN1Util.bigIntToMinTwosComplementsHex(a);
    };
    this.setByInteger = function(a) {
      a = new l(String(a), 10);
      this.setByBigInteger(a);
    };
    this.setValueHex = function(a) {
      this.hV = a;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    "undefined" != typeof b && ("undefined" != typeof b["int"] ? this.setByInteger(b["int"]) : "number" == typeof b ? this.setByInteger(b) : "undefined" != typeof b.hex && this.setValueHex(b.hex));
  };
  m.extend(e.asn1.DEREnumerated, e.asn1.ASN1Object);
  e.asn1.DERUTF8String = function(b) {
    e.asn1.DERUTF8String.superclass.constructor.call(this, b);
    this.hT = "0c";
  };
  m.extend(e.asn1.DERUTF8String, e.asn1.DERAbstractString);
  e.asn1.DERNumericString = function(b) {
    e.asn1.DERNumericString.superclass.constructor.call(this, b);
    this.hT = "12";
  };
  m.extend(e.asn1.DERNumericString, e.asn1.DERAbstractString);
  e.asn1.DERPrintableString = function(b) {
    e.asn1.DERPrintableString.superclass.constructor.call(this, b);
    this.hT = "13";
  };
  m.extend(e.asn1.DERPrintableString, e.asn1.DERAbstractString);
  e.asn1.DERTeletexString = function(b) {
    e.asn1.DERTeletexString.superclass.constructor.call(this, b);
    this.hT = "14";
  };
  m.extend(e.asn1.DERTeletexString, e.asn1.DERAbstractString);
  e.asn1.DERIA5String = function(b) {
    e.asn1.DERIA5String.superclass.constructor.call(this, b);
    this.hT = "16";
  };
  m.extend(e.asn1.DERIA5String, e.asn1.DERAbstractString);
  e.asn1.DERUTCTime = function(b) {
    e.asn1.DERUTCTime.superclass.constructor.call(this, b);
    this.hT = "17";
    this.setByDate = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.date = a;
      this.s = this.formatDate(this.date, "utc");
      this.hV = stohex(this.s);
    };
    this.getFreshValueHex = function() {
      "undefined" == typeof this.date && "undefined" == typeof this.s && (this.date = new Date, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s));
      return this.hV;
    };
    void 0 !== b && (void 0 !== b.str ? this.setString(b.str) : "string" == typeof b && b.match(/^[0-9]{12}Z$/) ? this.setString(b) : void 0 !== b.hex ? this.setStringHex(b.hex) : void 0 !== b.date && this.setByDate(b.date));
  };
  m.extend(e.asn1.DERUTCTime, e.asn1.DERAbstractTime);
  e.asn1.DERGeneralizedTime = function(b) {
    e.asn1.DERGeneralizedTime.superclass.constructor.call(this, b);
    this.hT = "18";
    this.withMillis = !1;
    this.setByDate = function(a) {
      this.hTLV = null;
      this.isModified = !0;
      this.date = a;
      this.s = this.formatDate(this.date, "gen", this.withMillis);
      this.hV = stohex(this.s);
    };
    this.getFreshValueHex = function() {
      void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s));
      return this.hV;
    };
    void 0 !== b && (void 0 !== b.str ? this.setString(b.str) : "string" == typeof b && b.match(/^[0-9]{14}Z$/) ? this.setString(b) : void 0 !== b.hex ? this.setStringHex(b.hex) : void 0 !== b.date && this.setByDate(b.date), !0 === b.millis && (this.withMillis = !0));
  };
  m.extend(e.asn1.DERGeneralizedTime, e.asn1.DERAbstractTime);
  e.asn1.DERSequence = function(b) {
    e.asn1.DERSequence.superclass.constructor.call(this, b);
    this.hT = "30";
    this.getFreshValueHex = function() {
      for (var a = "", b = 0; b < this.asn1Array.length; b++) {
        a += this.asn1Array[b].getEncodedHex();
      }
      return this.hV = a;
    };
  };
  m.extend(e.asn1.DERSequence, e.asn1.DERAbstractStructured);
  e.asn1.DERSet = function(b) {
    e.asn1.DERSet.superclass.constructor.call(this, b);
    this.hT = "31";
    this.sortFlag = !0;
    this.getFreshValueHex = function() {
      for (var a = [], b = 0; b < this.asn1Array.length; b++) {
        a.push(this.asn1Array[b].getEncodedHex());
      }
      1 == this.sortFlag && a.sort();
      return this.hV = a.join("");
    };
    "undefined" != typeof b && "undefined" != typeof b.sortflag && 0 == b.sortflag && (this.sortFlag = !1);
  };
  m.extend(e.asn1.DERSet, e.asn1.DERAbstractStructured);
  e.asn1.DERTaggedObject = function(b) {
    e.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = "";
    this.isExplicit = !0;
    this.asn1Object = null;
    this.setASN1Object = function(a, b, d) {
      this.hT = b;
      this.isExplicit = a;
      this.asn1Object = d;
      this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = d.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, b), this.isModified = !1);
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    "undefined" != typeof b && ("undefined" != typeof b.tag && (this.hT = b.tag), "undefined" != typeof b.explicit && (this.isExplicit = b.explicit), "undefined" != typeof b.obj && (this.asn1Object = b.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)));
  };
  m.extend(e.asn1.DERTaggedObject, e.asn1.ASN1Object);
  var W = function(b) {
    function a(c) {
      var d = b.call(this) || this;
      c && ("string" === typeof c ? d.parseKey(c) : (a.hasPrivateKeyProperty(c) || a.hasPublicKeyProperty(c)) && d.parsePropertiesFrom(c));
      return d;
    }
    Y(a, b);
    a.prototype.parseKey = function(a) {
      try {
        var b = 0, c = 0, f = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(a) ? da.decode(a) : N.unarmor(a), e = ia.decode(f);
        3 === e.sub.length && (e = e.sub[2].sub[0]);
        if (9 === e.sub.length) {
          b = e.sub[1].getHexStringValue();
          this.n = t(b, 16);
          c = e.sub[2].getHexStringValue();
          this.e = parseInt(c, 16);
          var h = e.sub[3].getHexStringValue();
          this.d = t(h, 16);
          var l = e.sub[4].getHexStringValue();
          this.p = t(l, 16);
          var m = e.sub[5].getHexStringValue();
          this.q = t(m, 16);
          var n = e.sub[6].getHexStringValue();
          this.dmp1 = t(n, 16);
          var q = e.sub[7].getHexStringValue();
          this.dmq1 = t(q, 16);
          var r = e.sub[8].getHexStringValue();
          this.coeff = t(r, 16);
        } else {
          if (2 === e.sub.length) {
            var u = e.sub[1].sub[0];
            b = u.sub[0].getHexStringValue();
            this.n = t(b, 16);
            c = u.sub[1].getHexStringValue();
            this.e = parseInt(c, 16);
          } else {
            return !1;
          }
        }
        return !0;
      } catch (na) {
        return !1;
      }
    };
    a.prototype.getPrivateBaseKey = function() {
      var a = {array:[new e.asn1.DERInteger({int:0}), new e.asn1.DERInteger({bigint:this.n}), new e.asn1.DERInteger({int:this.e}), new e.asn1.DERInteger({bigint:this.d}), new e.asn1.DERInteger({bigint:this.p}), new e.asn1.DERInteger({bigint:this.q}), new e.asn1.DERInteger({bigint:this.dmp1}), new e.asn1.DERInteger({bigint:this.dmq1}), new e.asn1.DERInteger({bigint:this.coeff})]};
      return (new e.asn1.DERSequence(a)).getEncodedHex();
    };
    a.prototype.getPrivateBaseKeyB64 = function() {
      return M(this.getPrivateBaseKey());
    };
    a.prototype.getPublicBaseKey = function() {
      var a = new e.asn1.DERSequence({array:[new e.asn1.DERObjectIdentifier({oid:"1.2.840.113549.1.1.1"}), new e.asn1.DERNull]}), b = new e.asn1.DERSequence({array:[new e.asn1.DERInteger({bigint:this.n}), new e.asn1.DERInteger({int:this.e})]});
      b = new e.asn1.DERBitString({hex:"00" + b.getEncodedHex()});
      return (new e.asn1.DERSequence({array:[a, b]})).getEncodedHex();
    };
    a.prototype.getPublicBaseKeyB64 = function() {
      return M(this.getPublicBaseKey());
    };
    a.wordwrap = function(a, b) {
      b = b || 64;
      return a ? a.match(RegExp("(.{1," + b + "})( +|$\n?)|(.{1," + b + "})", "g")).join("\n") : a;
    };
    a.prototype.getPrivateKey = function() {
      return "-----BEGIN RSA PRIVATE KEY-----\n" + (a.wordwrap(this.getPrivateBaseKeyB64()) + "\n") + "-----END RSA PRIVATE KEY-----";
    };
    a.prototype.getPublicKey = function() {
      return "-----BEGIN PUBLIC KEY-----\n" + (a.wordwrap(this.getPublicBaseKeyB64()) + "\n") + "-----END PUBLIC KEY-----";
    };
    a.hasPublicKeyProperty = function(a) {
      a = a || {};
      return a.hasOwnProperty("n") && a.hasOwnProperty("e");
    };
    a.hasPrivateKeyProperty = function(a) {
      a = a || {};
      return a.hasOwnProperty("n") && a.hasOwnProperty("e") && a.hasOwnProperty("d") && a.hasOwnProperty("p") && a.hasOwnProperty("q") && a.hasOwnProperty("dmp1") && a.hasOwnProperty("dmq1") && a.hasOwnProperty("coeff");
    };
    a.prototype.parsePropertiesFrom = function(a) {
      this.n = a.n;
      this.e = a.e;
      a.hasOwnProperty("d") && (this.d = a.d, this.p = a.p, this.q = a.q, this.dmp1 = a.dmp1, this.dmq1 = a.dmq1, this.coeff = a.coeff);
    };
    return a;
  }(q);
  q = function() {
    function b(a) {
      a = a || {};
      this.default_key_size = parseInt(a.default_key_size, 10) || 1024;
      this.default_public_exponent = a.default_public_exponent || "010001";
      this.log = a.log || !1;
      this.key = null;
    }
    b.prototype.setKey = function(a) {
      this.log && this.key && console.warn("A key was already set, overriding existing.");
      this.key = new W(a);
    };
    b.prototype.setPrivateKey = function(a) {
      this.setKey(a);
    };
    b.prototype.setPublicKey = function(a) {
      this.setKey(a);
    };
    b.prototype.decrypt = function(a) {
      try {
        return this.getKey().decrypt(X(a));
      } catch (c) {
        return !1;
      }
    };
    b.prototype.encrypt = function(a) {
      try {
        return M(this.getKey().encrypt(a));
      } catch (c) {
        return !1;
      }
    };
    b.prototype.getKey = function(a) {
      if (!this.key) {
        this.key = new W;
        if (a && "[object Function]" === {}.toString.call(a)) {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, a);
          return;
        }
        this.key.generate(this.default_key_size, this.default_public_exponent);
      }
      return this.key;
    };
    b.prototype.getPrivateKey = function() {
      return this.getKey().getPrivateKey();
    };
    b.prototype.getPrivateKeyB64 = function() {
      return this.getKey().getPrivateBaseKeyB64();
    };
    b.prototype.getPublicKey = function() {
      return this.getKey().getPublicKey();
    };
    b.prototype.getPublicKeyB64 = function() {
      return this.getKey().getPublicBaseKeyB64();
    };
    b.version = "3.0.0-beta.1";
    return b;
  }();
  window.JSEncrypt = q;
  D.JSEncrypt = q;
  D.default = q;
  Object.defineProperty(D, "__esModule", {value:!0});
});
