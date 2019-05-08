// Input 0
/*
 URI.js v1.14.2 http://medialize.github.io/URI.js/ */
'use strict';
(function(n, t) {
  "object" === typeof exports ? module.exports = t(require("./punycode"), require("./IPv6"), require("./SecondLevelDomains")) : "function" === typeof define && define.amd ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], t) : n.URI = t(n.punycode, n.IPv6, n.SecondLevelDomains, n);
})(this, function(n, t, r, h) {
  function d(a, b) {
    if (!(this instanceof d)) {
      return new d(a, b);
    }
    void 0 === a && (a = "undefined" !== typeof location ? location.href + "" : "");
    this.href(a);
    return void 0 !== b ? this.absoluteTo(b) : this;
  }
  function q(a) {
    return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
  }
  function w(a) {
    return void 0 === a ? "Undefined" : String(Object.prototype.toString.call(a)).slice(8, -1);
  }
  function k(a) {
    return "Array" === w(a);
  }
  function v(a, b) {
    var c;
    if (k(b)) {
      var d = 0;
      for (c = b.length; d < c; d++) {
        if (!v(a, b[d])) {
          return !1;
        }
      }
      return !0;
    }
    var f = w(b);
    d = 0;
    for (c = a.length; d < c; d++) {
      if ("RegExp" === f) {
        if ("string" === typeof a[d] && a[d].match(b)) {
          return !0;
        }
      } else {
        if (a[d] === b) {
          return !0;
        }
      }
    }
    return !1;
  }
  function z(a, b) {
    if (!k(a) || !k(b) || a.length !== b.length) {
      return !1;
    }
    a.sort();
    b.sort();
    for (var c = 0, d = a.length; c < d; c++) {
      if (a[c] !== b[c]) {
        return !1;
      }
    }
    return !0;
  }
  function D(a) {
    return escape(a);
  }
  function x(a) {
    return encodeURIComponent(a).replace(/[!'()*]/g, D).replace(/\*/g, "%2A");
  }
  function u(a) {
    return function(b, c) {
      if (void 0 === b) {
        return this._parts[a] || "";
      }
      this._parts[a] = b || null;
      this.build(!c);
      return this;
    };
  }
  function A(a, b) {
    return function(c, d) {
      if (void 0 === c) {
        return this._parts[a] || "";
      }
      null !== c && (c += "", c.charAt(0) === b && (c = c.substring(1)));
      this._parts[a] = c;
      this.build(!d);
      return this;
    };
  }
  var E = h && h.URI;
  d.version = "1.14.2";
  var e = d.prototype, p = Object.prototype.hasOwnProperty;
  d._parts = function() {
    return {protocol:null, username:null, password:null, hostname:null, urn:null, port:null, path:null, query:null, fragment:null, duplicateQueryParameters:d.duplicateQueryParameters, escapeQuerySpace:d.escapeQuerySpace};
  };
  d.duplicateQueryParameters = !1;
  d.escapeQuerySpace = !0;
  d.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  d.idn_expression = /[^a-z0-9\.-]/i;
  d.punycode_expression = /(xn--)/i;
  d.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  d.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  d.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;
  d.findUri = {start:/\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi, end:/[\s\r\n]|$/, trim:/[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/};
  d.defaultPorts = {http:"80", https:"443", ftp:"21", gopher:"70", ws:"80", wss:"443"};
  d.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  d.domAttributes = {a:"href", blockquote:"cite", link:"href", base:"href", script:"src", form:"action", img:"src", area:"href", iframe:"src", embed:"src", source:"src", track:"src", input:"src", audio:"src", video:"src"};
  d.getDomAttribute = function(a) {
    if (a && a.nodeName) {
      var b = a.nodeName.toLowerCase();
      return "input" === b && "image" !== a.type ? void 0 : d.domAttributes[b];
    }
  };
  d.encode = x;
  d.decode = decodeURIComponent;
  d.iso8859 = function() {
    d.encode = escape;
    d.decode = unescape;
  };
  d.unicode = function() {
    d.encode = x;
    d.decode = decodeURIComponent;
  };
  d.characters = {pathname:{encode:{expression:/%(24|26|2B|2C|3B|3D|3A|40)/ig, map:{"%24":"$", "%26":"\x26", "%2B":"+", "%2C":",", "%3B":";", "%3D":"\x3d", "%3A":":", "%40":"@"}}, decode:{expression:/[\/\?#]/g, map:{"/":"%2F", "?":"%3F", "#":"%23"}}}, reserved:{encode:{expression:/%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig, map:{"%3A":":", "%2F":"/", "%3F":"?", "%23":"#", "%5B":"[", "%5D":"]", "%40":"@", "%21":"!", "%24":"$", "%26":"\x26", "%27":"'", "%28":"(", "%29":")", "%2A":"*", 
  "%2B":"+", "%2C":",", "%3B":";", "%3D":"\x3d"}}}};
  d.encodeQuery = function(a, b) {
    a = d.encode(a + "");
    void 0 === b && (b = d.escapeQuerySpace);
    return b ? a.replace(/%20/g, "+") : a;
  };
  d.decodeQuery = function(a, b) {
    a += "";
    void 0 === b && (b = d.escapeQuerySpace);
    try {
      return d.decode(b ? a.replace(/\+/g, "%20") : a);
    } catch (c) {
      return a;
    }
  };
  d.recodePath = function(a) {
    a = (a + "").split("/");
    for (var b = 0, c = a.length; b < c; b++) {
      a[b] = d.encodePathSegment(d.decode(a[b]));
    }
    return a.join("/");
  };
  d.decodePath = function(a) {
    a = (a + "").split("/");
    for (var b = 0, c = a.length; b < c; b++) {
      a[b] = d.decodePathSegment(a[b]);
    }
    return a.join("/");
  };
  var B = {encode:"encode", decode:"decode"}, y, C = function(a, b) {
    return function(c) {
      try {
        return d[b](c + "").replace(d.characters[a][b].expression, function(c) {
          return d.characters[a][b].map[c];
        });
      } catch (g) {
        return c;
      }
    };
  };
  for (y in B) {
    d[y + "PathSegment"] = C("pathname", B[y]);
  }
  d.encodeReserved = C("reserved", "encode");
  d.parse = function(a, b) {
    b || (b = {});
    var c = a.indexOf("#");
    -1 < c && (b.fragment = a.substring(c + 1) || null, a = a.substring(0, c));
    c = a.indexOf("?");
    -1 < c && (b.query = a.substring(c + 1) || null, a = a.substring(0, c));
    "//" === a.substring(0, 2) ? (b.protocol = null, a = a.substring(2), a = d.parseAuthority(a, b)) : (c = a.indexOf(":"), -1 < c && (b.protocol = a.substring(0, c) || null, b.protocol && !b.protocol.match(d.protocol_expression) ? b.protocol = void 0 : "//" === a.substring(c + 1, c + 3) ? (a = a.substring(c + 3), a = d.parseAuthority(a, b)) : (a = a.substring(c + 1), b.urn = !0)));
    b.path = a;
    return b;
  };
  d.parseHost = function(a, b) {
    var c = a.indexOf("/");
    -1 === c && (c = a.length);
    if ("[" === a.charAt(0)) {
      var d = a.indexOf("]");
      b.hostname = a.substring(1, d) || null;
      b.port = a.substring(d + 2, c) || null;
      "/" === b.port && (b.port = null);
    } else {
      var f = a.indexOf(":");
      d = a.indexOf("/");
      f = a.indexOf(":", f + 1);
      -1 !== f && (-1 === d || f < d) ? (b.hostname = a.substring(0, c) || null, b.port = null) : (d = a.substring(0, c).split(":"), b.hostname = d[0] || null, b.port = d[1] || null);
    }
    b.hostname && "/" !== a.substring(c).charAt(0) && (c++, a = "/" + a);
    return a.substring(c) || "/";
  };
  d.parseAuthority = function(a, b) {
    a = d.parseUserinfo(a, b);
    return d.parseHost(a, b);
  };
  d.parseUserinfo = function(a, b) {
    var c = a.indexOf("/"), g = a.lastIndexOf("@", -1 < c ? c : a.length - 1);
    -1 < g && (-1 === c || g < c) ? (c = a.substring(0, g).split(":"), b.username = c[0] ? d.decode(c[0]) : null, c.shift(), b.password = c[0] ? d.decode(c.join(":")) : null, a = a.substring(g + 1)) : (b.username = null, b.password = null);
    return a;
  };
  d.parseQuery = function(a, b) {
    if (!a) {
      return {};
    }
    a = a.replace(/&+/g, "\x26").replace(/^\?*&*|&+$/g, "");
    if (!a) {
      return {};
    }
    var c = {};
    a = a.split("\x26");
    for (var g = a.length, f, e, l = 0; l < g; l++) {
      f = a[l].split("\x3d"), e = d.decodeQuery(f.shift(), b), f = f.length ? d.decodeQuery(f.join("\x3d"), b) : null, p.call(c, e) ? ("string" === typeof c[e] && (c[e] = [c[e]]), c[e].push(f)) : c[e] = f;
    }
    return c;
  };
  d.build = function(a) {
    var b = "";
    a.protocol && (b += a.protocol + ":");
    a.urn || !b && !a.hostname || (b += "//");
    b += d.buildAuthority(a) || "";
    "string" === typeof a.path && ("/" !== a.path.charAt(0) && "string" === typeof a.hostname && (b += "/"), b += a.path);
    "string" === typeof a.query && a.query && (b += "?" + a.query);
    "string" === typeof a.fragment && a.fragment && (b += "#" + a.fragment);
    return b;
  };
  d.buildHost = function(a) {
    var b = "";
    if (a.hostname) {
      b = d.ip6_expression.test(a.hostname) ? b + ("[" + a.hostname + "]") : b + a.hostname;
    } else {
      return "";
    }
    a.port && (b += ":" + a.port);
    return b;
  };
  d.buildAuthority = function(a) {
    return d.buildUserinfo(a) + d.buildHost(a);
  };
  d.buildUserinfo = function(a) {
    var b = "";
    a.username && (b += d.encode(a.username), a.password && (b += ":" + d.encode(a.password)), b += "@");
    return b;
  };
  d.buildQuery = function(a, b, c) {
    var g = "", f, e;
    for (f in a) {
      if (p.call(a, f) && f) {
        if (k(a[f])) {
          var l = {};
          var m = 0;
          for (e = a[f].length; m < e; m++) {
            void 0 !== a[f][m] && void 0 === l[a[f][m] + ""] && (g += "\x26" + d.buildQueryParameter(f, a[f][m], c), !0 !== b && (l[a[f][m] + ""] = !0));
          }
        } else {
          void 0 !== a[f] && (g += "\x26" + d.buildQueryParameter(f, a[f], c));
        }
      }
    }
    return g.substring(1);
  };
  d.buildQueryParameter = function(a, b, c) {
    return d.encodeQuery(a, c) + (null !== b ? "\x3d" + d.encodeQuery(b, c) : "");
  };
  d.addQuery = function(a, b, c) {
    if ("object" === typeof b) {
      for (var g in b) {
        p.call(b, g) && d.addQuery(a, g, b[g]);
      }
    } else {
      if ("string" === typeof b) {
        void 0 === a[b] ? a[b] = c : ("string" === typeof a[b] && (a[b] = [a[b]]), k(c) || (c = [c]), a[b] = (a[b] || []).concat(c));
      } else {
        throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
      }
    }
  };
  d.removeQuery = function(a, b, c) {
    var g;
    if (k(b)) {
      for (c = 0, g = b.length; c < g; c++) {
        a[b[c]] = void 0;
      }
    } else {
      if ("object" === typeof b) {
        for (g in b) {
          p.call(b, g) && d.removeQuery(a, g, b[g]);
        }
      } else {
        if ("string" === typeof b) {
          if (void 0 !== c) {
            if (a[b] === c) {
              a[b] = void 0;
            } else {
              if (k(a[b])) {
                g = a[b];
                var f = {}, e;
                if (k(c)) {
                  var l = 0;
                  for (e = c.length; l < e; l++) {
                    f[c[l]] = !0;
                  }
                } else {
                  f[c] = !0;
                }
                l = 0;
                for (e = g.length; l < e; l++) {
                  void 0 !== f[g[l]] && (g.splice(l, 1), e--, l--);
                }
                a[b] = g;
              }
            }
          } else {
            a[b] = void 0;
          }
        } else {
          throw new TypeError("URI.removeQuery() accepts an object, string as the first parameter");
        }
      }
    }
  };
  d.hasQuery = function(a, b, c, g) {
    if ("object" === typeof b) {
      for (var f in b) {
        if (p.call(b, f) && !d.hasQuery(a, f, b[f])) {
          return !1;
        }
      }
      return !0;
    }
    if ("string" !== typeof b) {
      throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter");
    }
    switch(w(c)) {
      case "Undefined":
        return b in a;
      case "Boolean":
        return a = !(k(a[b]) ? !a[b].length : !a[b]), c === a;
      case "Function":
        return !!c(a[b], b, a);
      case "Array":
        return k(a[b]) ? (g ? v : z)(a[b], c) : !1;
      case "RegExp":
        return k(a[b]) ? g ? v(a[b], c) : !1 : !(!a[b] || !a[b].match(c));
      case "Number":
        c = String(c);
      case "String":
        return k(a[b]) ? g ? v(a[b], c) : !1 : a[b] === c;
      default:
        throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");
    }
  };
  d.commonPath = function(a, b) {
    var c = Math.min(a.length, b.length), d;
    for (d = 0; d < c; d++) {
      if (a.charAt(d) !== b.charAt(d)) {
        d--;
        break;
      }
    }
    if (1 > d) {
      return a.charAt(0) === b.charAt(0) && "/" === a.charAt(0) ? "/" : "";
    }
    if ("/" !== a.charAt(d) || "/" !== b.charAt(d)) {
      d = a.substring(0, d).lastIndexOf("/");
    }
    return a.substring(0, d + 1);
  };
  d.withinString = function(a, b, c) {
    c || (c = {});
    var g = c.start || d.findUri.start, f = c.end || d.findUri.end, e = c.trim || d.findUri.trim, l = /[a-z0-9-]=["']?$/i;
    for (g.lastIndex = 0;;) {
      var m = g.exec(a);
      if (!m) {
        break;
      }
      m = m.index;
      if (c.ignoreHtml) {
        var k = a.slice(Math.max(m - 3, 0), m);
        if (k && l.test(k)) {
          continue;
        }
      }
      k = m + a.slice(m).search(f);
      var h = a.slice(m, k).replace(e, "");
      c.ignore && c.ignore.test(h) || (k = m + h.length, h = b(h, m, k, a), a = a.slice(0, m) + h + a.slice(k), g.lastIndex = m + h.length);
    }
    g.lastIndex = 0;
    return a;
  };
  d.ensureValidHostname = function(a) {
    if (a.match(d.invalid_hostname_characters)) {
      if (!n) {
        throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
      }
      if (n.toASCII(a).match(d.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + a + '" contains characters other than [A-Z0-9.-]');
      }
    }
  };
  d.noConflict = function(a) {
    if (a) {
      return a = {URI:this.noConflict()}, h.URITemplate && "function" === typeof h.URITemplate.noConflict && (a.URITemplate = h.URITemplate.noConflict()), h.IPv6 && "function" === typeof h.IPv6.noConflict && (a.IPv6 = h.IPv6.noConflict()), h.SecondLevelDomains && "function" === typeof h.SecondLevelDomains.noConflict && (a.SecondLevelDomains = h.SecondLevelDomains.noConflict()), a;
    }
    h.URI === this && (h.URI = E);
    return this;
  };
  e.build = function(a) {
    if (!0 === a) {
      this._deferred_build = !0;
    } else {
      if (void 0 === a || this._deferred_build) {
        this._string = d.build(this._parts), this._deferred_build = !1;
      }
    }
    return this;
  };
  e.clone = function() {
    return new d(this);
  };
  e.valueOf = e.toString = function() {
    return this.build(!1)._string;
  };
  e.protocol = u("protocol");
  e.username = u("username");
  e.password = u("password");
  e.hostname = u("hostname");
  e.port = u("port");
  e.query = A("query", "?");
  e.fragment = A("fragment", "#");
  e.search = function(a, b) {
    a = this.query(a, b);
    return "string" === typeof a && a.length ? "?" + a : a;
  };
  e.hash = function(a, b) {
    a = this.fragment(a, b);
    return "string" === typeof a && a.length ? "#" + a : a;
  };
  e.pathname = function(a, b) {
    if (void 0 === a || !0 === a) {
      return b = this._parts.path || (this._parts.hostname ? "/" : ""), a ? d.decodePath(b) : b;
    }
    this._parts.path = a ? d.recodePath(a) : "/";
    this.build(!b);
    return this;
  };
  e.path = e.pathname;
  e.href = function(a, b) {
    var c;
    if (void 0 === a) {
      return this.toString();
    }
    this._string = "";
    this._parts = d._parts();
    var g = a instanceof d, f = "object" === typeof a && (a.hostname || a.path || a.pathname);
    a.nodeName && (f = d.getDomAttribute(a), a = a[f] || "", f = !1);
    !g && f && void 0 !== a.pathname && (a = a.toString());
    if ("string" === typeof a || a instanceof String) {
      this._parts = d.parse(String(a), this._parts);
    } else {
      if (g || f) {
        for (c in g = g ? a._parts : a, g) {
          p.call(this._parts, c) && (this._parts[c] = g[c]);
        }
      } else {
        throw new TypeError("invalid input");
      }
    }
    this.build(!b);
    return this;
  };
  e.is = function(a) {
    var b = !1, c = !1, g = !1, f = !1, e = !1, l = !1, k = !1, h = !this._parts.urn;
    this._parts.hostname && (h = !1, c = d.ip4_expression.test(this._parts.hostname), g = d.ip6_expression.test(this._parts.hostname), b = c || g, e = (f = !b) && r && r.has(this._parts.hostname), l = f && d.idn_expression.test(this._parts.hostname), k = f && d.punycode_expression.test(this._parts.hostname));
    switch(a.toLowerCase()) {
      case "relative":
        return h;
      case "absolute":
        return !h;
      case "domain":
      case "name":
        return f;
      case "sld":
        return e;
      case "ip":
        return b;
      case "ip4":
      case "ipv4":
      case "inet4":
        return c;
      case "ip6":
      case "ipv6":
      case "inet6":
        return g;
      case "idn":
        return l;
      case "url":
        return !this._parts.urn;
      case "urn":
        return !!this._parts.urn;
      case "punycode":
        return k;
    }
    return null;
  };
  var F = e.protocol, G = e.port, H = e.hostname;
  e.protocol = function(a, b) {
    if (void 0 !== a && a && (a = a.replace(/:(\/\/)?$/, ""), !a.match(d.protocol_expression))) {
      throw new TypeError('Protocol "' + a + "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]");
    }
    return F.call(this, a, b);
  };
  e.scheme = e.protocol;
  e.port = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    if (void 0 !== a && (0 === a && (a = null), a && (a += "", ":" === a.charAt(0) && (a = a.substring(1)), a.match(/[^0-9]/)))) {
      throw new TypeError('Port "' + a + '" contains characters other than [0-9]');
    }
    return G.call(this, a, b);
  };
  e.hostname = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    if (void 0 !== a) {
      var c = {};
      d.parseHost(a, c);
      a = c.hostname;
    }
    return H.call(this, a, b);
  };
  e.host = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    if (void 0 === a) {
      return this._parts.hostname ? d.buildHost(this._parts) : "";
    }
    d.parseHost(a, this._parts);
    this.build(!b);
    return this;
  };
  e.authority = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    if (void 0 === a) {
      return this._parts.hostname ? d.buildAuthority(this._parts) : "";
    }
    d.parseAuthority(a, this._parts);
    this.build(!b);
    return this;
  };
  e.userinfo = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    if (void 0 === a) {
      if (!this._parts.username) {
        return "";
      }
      a = d.buildUserinfo(this._parts);
      return a.substring(0, a.length - 1);
    }
    "@" !== a[a.length - 1] && (a += "@");
    d.parseUserinfo(a, this._parts);
    this.build(!b);
    return this;
  };
  e.resource = function(a, b) {
    if (void 0 === a) {
      return this.path() + this.search() + this.hash();
    }
    a = d.parse(a);
    this._parts.path = a.path;
    this._parts.query = a.query;
    this._parts.fragment = a.fragment;
    this.build(!b);
    return this;
  };
  e.subdomain = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    if (void 0 === a) {
      if (!this._parts.hostname || this.is("IP")) {
        return "";
      }
      var c = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, c) || "";
    }
    c = this._parts.hostname.length - this.domain().length;
    c = this._parts.hostname.substring(0, c);
    c = new RegExp("^" + q(c));
    a && "." !== a.charAt(a.length - 1) && (a += ".");
    a && d.ensureValidHostname(a);
    this._parts.hostname = this._parts.hostname.replace(c, a);
    this.build(!b);
    return this;
  };
  e.domain = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    "boolean" === typeof a && (b = a, a = void 0);
    if (void 0 === a) {
      if (!this._parts.hostname || this.is("IP")) {
        return "";
      }
      var c = this._parts.hostname.match(/\./g);
      if (c && 2 > c.length) {
        return this._parts.hostname;
      }
      c = this._parts.hostname.length - this.tld(b).length - 1;
      c = this._parts.hostname.lastIndexOf(".", c - 1) + 1;
      return this._parts.hostname.substring(c) || "";
    }
    if (!a) {
      throw new TypeError("cannot set domain empty");
    }
    d.ensureValidHostname(a);
    !this._parts.hostname || this.is("IP") ? this._parts.hostname = a : (c = new RegExp(q(this.domain()) + "$"), this._parts.hostname = this._parts.hostname.replace(c, a));
    this.build(!b);
    return this;
  };
  e.tld = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    "boolean" === typeof a && (b = a, a = void 0);
    if (void 0 === a) {
      if (!this._parts.hostname || this.is("IP")) {
        return "";
      }
      var c = this._parts.hostname.lastIndexOf(".");
      c = this._parts.hostname.substring(c + 1);
      return !0 !== b && r && r.list[c.toLowerCase()] ? r.get(this._parts.hostname) || c : c;
    }
    if (a) {
      if (a.match(/[^a-zA-Z0-9-]/)) {
        if (r && r.is(a)) {
          c = new RegExp(q(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(c, a);
        } else {
          throw new TypeError('TLD "' + a + '" contains characters other than [A-Z0-9]');
        }
      } else {
        if (!this._parts.hostname || this.is("IP")) {
          throw new ReferenceError("cannot set TLD on non-domain host");
        }
        c = new RegExp(q(this.tld()) + "$");
        this._parts.hostname = this._parts.hostname.replace(c, a);
      }
    } else {
      throw new TypeError("cannot set TLD empty");
    }
    this.build(!b);
    return this;
  };
  e.directory = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    if (void 0 === a || !0 === a) {
      if (!this._parts.path && !this._parts.hostname) {
        return "";
      }
      if ("/" === this._parts.path) {
        return "/";
      }
      var c = this._parts.path.length - this.filename().length - 1;
      c = this._parts.path.substring(0, c) || (this._parts.hostname ? "/" : "");
      return a ? d.decodePath(c) : c;
    }
    c = this._parts.path.length - this.filename().length;
    c = this._parts.path.substring(0, c);
    c = new RegExp("^" + q(c));
    this.is("relative") || (a || (a = "/"), "/" !== a.charAt(0) && (a = "/" + a));
    a && "/" !== a.charAt(a.length - 1) && (a += "/");
    a = d.recodePath(a);
    this._parts.path = this._parts.path.replace(c, a);
    this.build(!b);
    return this;
  };
  e.filename = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    if (void 0 === a || !0 === a) {
      if (!this._parts.path || "/" === this._parts.path) {
        return "";
      }
      var c = this._parts.path.lastIndexOf("/");
      c = this._parts.path.substring(c + 1);
      return a ? d.decodePathSegment(c) : c;
    }
    c = !1;
    "/" === a.charAt(0) && (a = a.substring(1));
    a.match(/\.?\//) && (c = !0);
    var g = new RegExp(q(this.filename()) + "$");
    a = d.recodePath(a);
    this._parts.path = this._parts.path.replace(g, a);
    c ? this.normalizePath(b) : this.build(!b);
    return this;
  };
  e.suffix = function(a, b) {
    if (this._parts.urn) {
      return void 0 === a ? "" : this;
    }
    if (void 0 === a || !0 === a) {
      if (!this._parts.path || "/" === this._parts.path) {
        return "";
      }
      var c = this.filename(), g = c.lastIndexOf(".");
      if (-1 === g) {
        return "";
      }
      c = c.substring(g + 1);
      c = /^[a-z0-9%]+$/i.test(c) ? c : "";
      return a ? d.decodePathSegment(c) : c;
    }
    "." === a.charAt(0) && (a = a.substring(1));
    if (c = this.suffix()) {
      g = a ? new RegExp(q(c) + "$") : new RegExp(q("." + c) + "$");
    } else {
      if (!a) {
        return this;
      }
      this._parts.path += "." + d.recodePath(a);
    }
    g && (a = d.recodePath(a), this._parts.path = this._parts.path.replace(g, a));
    this.build(!b);
    return this;
  };
  e.segment = function(a, b, c) {
    var d = this._parts.urn ? ":" : "/", f = this.path(), e = "/" === f.substring(0, 1);
    f = f.split(d);
    void 0 !== a && "number" !== typeof a && (c = b, b = a, a = void 0);
    if (void 0 !== a && "number" !== typeof a) {
      throw Error('Bad segment "' + a + '", must be 0-based integer');
    }
    e && f.shift();
    0 > a && (a = Math.max(f.length + a, 0));
    if (void 0 === b) {
      return void 0 === a ? f : f[a];
    }
    if (null === a || void 0 === f[a]) {
      if (k(b)) {
        f = [];
        a = 0;
        for (var l = b.length; a < l; a++) {
          if (b[a].length || f.length && f[f.length - 1].length) {
            f.length && !f[f.length - 1].length && f.pop(), f.push(b[a]);
          }
        }
      } else {
        if (b || "string" === typeof b) {
          "" === f[f.length - 1] ? f[f.length - 1] = b : f.push(b);
        }
      }
    } else {
      b ? f[a] = b : f.splice(a, 1);
    }
    e && f.unshift("");
    return this.path(f.join(d), c);
  };
  e.segmentCoded = function(a, b, c) {
    var g;
    "number" !== typeof a && (c = b, b = a, a = void 0);
    if (void 0 === b) {
      a = this.segment(a, b, c);
      if (k(a)) {
        var f = 0;
        for (g = a.length; f < g; f++) {
          a[f] = d.decode(a[f]);
        }
      } else {
        a = void 0 !== a ? d.decode(a) : void 0;
      }
      return a;
    }
    if (k(b)) {
      for (f = 0, g = b.length; f < g; f++) {
        b[f] = d.decode(b[f]);
      }
    } else {
      b = "string" === typeof b || b instanceof String ? d.encode(b) : b;
    }
    return this.segment(a, b, c);
  };
  var I = e.query;
  e.query = function(a, b) {
    if (!0 === a) {
      return d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    }
    if ("function" === typeof a) {
      var c = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      a = a.call(this, c);
      this._parts.query = d.buildQuery(a || c, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!b);
      return this;
    }
    return void 0 !== a && "string" !== typeof a ? (this._parts.query = d.buildQuery(a, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!b), this) : I.call(this, a, b);
  };
  e.setQuery = function(a, b, c) {
    var g = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    if ("string" === typeof a || a instanceof String) {
      g[a] = void 0 !== b ? b : null;
    } else {
      if ("object" === typeof a) {
        for (var f in a) {
          p.call(a, f) && (g[f] = a[f]);
        }
      } else {
        throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
      }
    }
    this._parts.query = d.buildQuery(g, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    "string" !== typeof a && (c = b);
    this.build(!c);
    return this;
  };
  e.addQuery = function(a, b, c) {
    var g = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    d.addQuery(g, a, void 0 === b ? null : b);
    this._parts.query = d.buildQuery(g, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    "string" !== typeof a && (c = b);
    this.build(!c);
    return this;
  };
  e.removeQuery = function(a, b, c) {
    var g = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    d.removeQuery(g, a, b);
    this._parts.query = d.buildQuery(g, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    "string" !== typeof a && (c = b);
    this.build(!c);
    return this;
  };
  e.hasQuery = function(a, b, c) {
    var g = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return d.hasQuery(g, a, b, c);
  };
  e.setSearch = e.setQuery;
  e.addSearch = e.addQuery;
  e.removeSearch = e.removeQuery;
  e.hasSearch = e.hasQuery;
  e.normalize = function() {
    return this._parts.urn ? this.normalizeProtocol(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build();
  };
  e.normalizeProtocol = function(a) {
    "string" === typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!a));
    return this;
  };
  e.normalizeHostname = function(a) {
    this._parts.hostname && (this.is("IDN") && n ? this._parts.hostname = n.toASCII(this._parts.hostname) : this.is("IPv6") && t && (this._parts.hostname = t.best(this._parts.hostname)), this._parts.hostname = this._parts.hostname.toLowerCase(), this.build(!a));
    return this;
  };
  e.normalizePort = function(a) {
    "string" === typeof this._parts.protocol && this._parts.port === d.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!a));
    return this;
  };
  e.normalizePath = function(a) {
    if (this._parts.urn || !this._parts.path || "/" === this._parts.path) {
      return this;
    }
    var b, c = this._parts.path, g = "";
    "/" !== c.charAt(0) && (b = !0, c = "/" + c);
    c = c.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/");
    for (b && (g = c.substring(1).match(/^(\.\.\/)+/) || "") && (g = g[0]);;) {
      var f = c.indexOf("/..");
      if (-1 === f) {
        break;
      } else {
        if (0 === f) {
          c = c.substring(3);
          continue;
        }
      }
      var e = c.substring(0, f).lastIndexOf("/");
      -1 === e && (e = f);
      c = c.substring(0, e) + c.substring(f + 3);
    }
    b && this.is("relative") && (c = g + c.substring(1));
    c = d.recodePath(c);
    this._parts.path = c;
    this.build(!a);
    return this;
  };
  e.normalizePathname = e.normalizePath;
  e.normalizeQuery = function(a) {
    "string" === typeof this._parts.query && (this._parts.query.length ? this.query(d.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query = null, this.build(!a));
    return this;
  };
  e.normalizeFragment = function(a) {
    this._parts.fragment || (this._parts.fragment = null, this.build(!a));
    return this;
  };
  e.normalizeSearch = e.normalizeQuery;
  e.normalizeHash = e.normalizeFragment;
  e.iso8859 = function() {
    var a = d.encode, b = d.decode;
    d.encode = escape;
    d.decode = decodeURIComponent;
    this.normalize();
    d.encode = a;
    d.decode = b;
    return this;
  };
  e.unicode = function() {
    var a = d.encode, b = d.decode;
    d.encode = x;
    d.decode = unescape;
    this.normalize();
    d.encode = a;
    d.decode = b;
    return this;
  };
  e.readable = function() {
    var a = this.clone();
    a.username("").password("").normalize();
    var b = "";
    a._parts.protocol && (b += a._parts.protocol + "://");
    a._parts.hostname && (a.is("punycode") && n ? (b += n.toUnicode(a._parts.hostname), a._parts.port && (b += ":" + a._parts.port)) : b += a.host());
    a._parts.hostname && a._parts.path && "/" !== a._parts.path.charAt(0) && (b += "/");
    b += a.path(!0);
    if (a._parts.query) {
      for (var c = "", g = 0, f = a._parts.query.split("\x26"), e = f.length; g < e; g++) {
        var k = (f[g] || "").split("\x3d");
        c += "\x26" + d.decodeQuery(k[0], this._parts.escapeQuerySpace).replace(/&/g, "%26");
        void 0 !== k[1] && (c += "\x3d" + d.decodeQuery(k[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"));
      }
      b += "?" + c.substring(1);
    }
    return b + d.decodeQuery(a.hash(), !0);
  };
  e.absoluteTo = function(a) {
    var b = this.clone(), c = ["protocol", "username", "password", "hostname", "port"], g, f;
    if (this._parts.urn) {
      throw Error("URNs do not have any generally defined hierarchical components");
    }
    a instanceof d || (a = new d(a));
    b._parts.protocol || (b._parts.protocol = a._parts.protocol);
    if (this._parts.hostname) {
      return b;
    }
    for (g = 0; f = c[g]; g++) {
      b._parts[f] = a._parts[f];
    }
    b._parts.path ? ".." === b._parts.path.substring(-2) && (b._parts.path += "/") : (b._parts.path = a._parts.path, b._parts.query || (b._parts.query = a._parts.query));
    "/" !== b.path().charAt(0) && (a = a.directory(), b._parts.path = (a ? a + "/" : "") + b._parts.path, b.normalizePath());
    b.build();
    return b;
  };
  e.relativeTo = function(a) {
    var b = this.clone().normalize();
    if (b._parts.urn) {
      throw Error("URNs do not have any generally defined hierarchical components");
    }
    a = (new d(a)).normalize();
    var c = b._parts;
    var g = a._parts;
    var f = b.path();
    var e = a.path();
    if ("/" !== f.charAt(0)) {
      throw Error("URI is already relative");
    }
    if ("/" !== e.charAt(0)) {
      throw Error("Cannot calculate a URI relative to another relative URI");
    }
    c.protocol === g.protocol && (c.protocol = null);
    if (c.username === g.username && c.password === g.password && null === c.protocol && null === c.username && null === c.password && c.hostname === g.hostname && c.port === g.port) {
      c.hostname = null, c.port = null;
    } else {
      return b.build();
    }
    if (f === e) {
      return c.path = "", b.build();
    }
    a = d.commonPath(b.path(), a.path());
    if (!a) {
      return b.build();
    }
    g = g.path.substring(a.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../");
    c.path = g + c.path.substring(a.length);
    return b.build();
  };
  e.equals = function(a) {
    var b = this.clone();
    a = new d(a);
    var c = {}, e;
    b.normalize();
    a.normalize();
    if (b.toString() === a.toString()) {
      return !0;
    }
    var f = b.query();
    var h = a.query();
    b.query("");
    a.query("");
    if (b.toString() !== a.toString() || f.length !== h.length) {
      return !1;
    }
    f = d.parseQuery(f, this._parts.escapeQuerySpace);
    h = d.parseQuery(h, this._parts.escapeQuerySpace);
    for (e in f) {
      if (p.call(f, e)) {
        if (!k(f[e])) {
          if (f[e] !== h[e]) {
            return !1;
          }
        } else {
          if (!z(f[e], h[e])) {
            return !1;
          }
        }
        c[e] = !0;
      }
    }
    for (e in h) {
      if (p.call(h, e) && !c[e]) {
        return !1;
      }
    }
    return !0;
  };
  e.duplicateQueryParameters = function(a) {
    this._parts.duplicateQueryParameters = !!a;
    return this;
  };
  e.escapeQuerySpace = function(a) {
    this._parts.escapeQuerySpace = !!a;
    return this;
  };
  return d;
});
