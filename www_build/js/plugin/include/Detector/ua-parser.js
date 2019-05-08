// Input 0
'use strict';
(function(l, m) {
  var g = {extend:function(a, c) {
    var e = {}, d;
    for (d in a) {
      e[d] = c[d] && 0 === c[d].length % 2 ? c[d].concat(a[d]) : a[d];
    }
    return e;
  }, has:function(a, c) {
    return "string" === typeof a ? -1 !== c.toLowerCase().indexOf(a.toLowerCase()) : !1;
  }, lowerize:function(a) {
    return a.toLowerCase();
  }, major:function(a) {
    return "string" === typeof a ? a.replace(/[^\d\.]/g, "").split(".")[0] : m;
  }, trim:function(a) {
    return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }}, p = function() {
    var a = {}, c = 0, e, d, n, f, g = arguments;
    for (n = 0; n < g[1].length; n++) {
      var b = g[1][n];
      a["object" === typeof b ? b[0] : b] = m;
    }
    for (; c < g.length && !f;) {
      var k = g[c], l = g[c + 1];
      for (e = d = 0; e < k.length && !f;) {
        if (f = k[e++].exec(this.getUA())) {
          for (n = 0; n < l.length; n++) {
            var h = f[++d];
            b = l[n];
            "object" === typeof b && 0 < b.length ? 2 == b.length ? a[b[0]] = "function" == typeof b[1] ? b[1].call(this, h) : b[1] : 3 == b.length ? a[b[0]] = "function" !== typeof b[1] || b[1].exec && b[1].test ? h ? h.replace(b[1], b[2]) : m : h ? b[1].call(this, h, b[2]) : m : 4 == b.length && (a[b[0]] = h ? b[3].call(this, h.replace(b[1], b[2])) : m) : a[b] = h ? h : m;
          }
        }
      }
      c += 2;
    }
    return a;
  }, k = function(a, c) {
    for (var e in c) {
      if ("object" === typeof c[e] && 0 < c[e].length) {
        for (var d = 0; d < c[e].length; d++) {
          if (g.has(c[e][d], a)) {
            return "?" === e ? m : e;
          }
        }
      } else {
        if (g.has(c[e], a)) {
          return "?" === e ? m : e;
        }
      }
    }
    return a;
  }, q = {ME:"4.90", "NT 3.11":"NT3.51", "NT 4.0":"NT4.0", 2E3:"NT 5.0", XP:["NT 5.1", "NT 5.2"], Vista:"NT 6.0", 7:"NT 6.1", 8:"NT 6.2", "8.1":"NT 6.3", 10:["NT 6.4", "NT 10.0"], RT:"ARM"}, r = {browser:[[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], ["name", "version"], [/(opios)[\/\s]+([\w\.]+)/i], [["name", "Opera Mini"], "version"], [/\s(opr)\/([\w\.]+)/i], [["name", "Opera"], "version"], [/(kindle)\/([\w\.]+)/i, 
  /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i], ["name", "version"], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [["name", "IE"], "version"], [/(edge)\/((\d+)?[\w\.]+)/i], ["name", "version"], [/(yabrowser)\/([\w\.]+)/i], [["name", "Yandex"], "version"], 
  [/(comodo_dragon)\/([\w\.]+)/i], [["name", /_/g, " "], "version"], [/(micromessenger)\/([\w\.]+)/i], [["name", "WeChat"], "version"], [/xiaomi\/miuibrowser\/([\w\.]+)/i], ["version", ["name", "MIUI Browser"]], [/\swv\).+(chrome)\/([\w\.]+)/i], [["name", /(.+)/, "$1 WebView"], "version"], [/android.+samsungbrowser\/([\w\.]+)/i, /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i], ["version", ["name", "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, 
  /(qqbrowser)[\/\s]?([\w\.]+)/i], ["name", "version"], [/(uc\s?browser)[\/\s]?([\w\.]+)/i, /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i, /juc.+(ucweb)[\/\s]?([\w\.]+)/i], [["name", "UCBrowser"], "version"], [/(dolfin)\/([\w\.]+)/i], [["name", "Dolphin"], "version"], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [["name", "Chrome"], "version"], [/;fbav\/([\w\.]+);/i], ["version", ["name", "Facebook"]], [/fxios\/([\w\.-]+)/i], ["version", ["name", "Firefox"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], 
  ["version", ["name", "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], ["version", "name"], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], ["name", ["version", k, {"1.0":"/8", "1.2":"/1", "1.3":"/3", "2.0":"/412", "2.0.2":"/416", "2.0.3":"/417", "2.0.4":"/419", "?":"/"}]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], ["name", "version"], [/(navigator|netscape)\/([\w\.-]+)/i], [["name", "Netscape"], "version"], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, 
  /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], ["name", "version"]], cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [["architecture", "amd64"]], [/(ia32(?=;))/i], [["architecture", g.lowerize]], [/((?:i[346]|x)86)[;\)]/i], 
  [["architecture", "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [["architecture", "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [["architecture", /ower/, "", g.lowerize]], [/(sun4\w)[;\)]/i], [["architecture", "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [["architecture", g.lowerize]]], device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], ["model", "vendor", ["type", "tablet"]], [/applecoremedia\/[\w\.]+ \((ipad)/], 
  ["model", ["vendor", "Apple"], ["type", "tablet"]], [/(apple\s{0,1}tv)/i], [["model", "Apple TV"], ["vendor", "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], ["vendor", "model", ["type", "tablet"]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i], ["model", ["vendor", "Amazon"], ["type", "tablet"]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i], [["model", k, {"Fire Phone":["SD", 
  "KF"]}], ["vendor", "Amazon"], ["type", "mobile"]], [/\((ip[honed|\s\w*]+);.+(apple)/i], ["model", "vendor", ["type", "mobile"]], [/\((ip[honed|\s\w*]+);/i], ["model", ["vendor", "Apple"], ["type", "mobile"]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], ["vendor", "model", ["type", "mobile"]], [/\(bb10;\s(\w+)/i], ["model", ["vendor", "BlackBerry"], ["type", "mobile"]], 
  [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i], ["model", ["vendor", "Asus"], ["type", "tablet"]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [["vendor", "Sony"], ["model", "Xperia Tablet"], ["type", "tablet"]], [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i], [["vendor", "Sony"], ["model", "Xperia Phone"], ["type", "mobile"]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], ["vendor", "model", ["type", "console"]], [/android.+;\s(shield)\sbuild/i], 
  ["model", ["vendor", "Nvidia"], ["type", "console"]], [/(playstation\s[34portablevi]+)/i], ["model", ["vendor", "Sony"], ["type", "console"]], [/(sprint\s(\w+))/i], [["vendor", k, {HTC:"APA", Sprint:"Sprint"}], ["model", k, {"Evo Shift 4G":"7373KT"}], ["type", "mobile"]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], ["vendor", "model", ["type", "tablet"]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], 
  ["vendor", ["model", /_/g, " "], ["type", "mobile"]], [/(nexus\s9)/i], ["model", ["vendor", "HTC"], ["type", "tablet"]], [/(nexus\s6p)/i], ["model", ["vendor", "Huawei"], ["type", "mobile"]], [/(microsoft);\s(lumia[\s\w]+)/i], ["vendor", "model", ["type", "mobile"]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], ["model", ["vendor", "Microsoft"], ["type", "console"]], [/(kin\.[onetw]{3})/i], [["model", /\./g, " "], ["vendor", "Microsoft"], ["type", "mobile"]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, 
  /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], ["model", ["vendor", "Motorola"], ["type", "mobile"]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], ["model", ["vendor", "Motorola"], ["type", "tablet"]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [["vendor", g.trim], ["model", g.trim], ["type", "smarttv"]], [/hbbtv.+maple;(\d+)/i], [["model", /^/, "SmartTV"], ["vendor", "Samsung"], ["type", "smarttv"]], [/\(dtv[\);].+(aquos)/i], ["model", ["vendor", "Sharp"], ["type", 
  "smarttv"]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [["vendor", "Samsung"], "model", ["type", "tablet"]], [/smart-tv.+(samsung)/i], ["vendor", ["type", "smarttv"], "model"], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [["vendor", "Samsung"], "model", ["type", "mobile"]], [/sie-(\w+)*/i], ["model", ["vendor", "Siemens"], ["type", "mobile"]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, 
  /(nokia)[\s_-]?([\w-]+)*/i], [["vendor", "Nokia"], "model", ["type", "mobile"]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], ["model", ["vendor", "Acer"], ["type", "tablet"]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [["vendor", "LG"], "model", ["type", "tablet"]], [/(lg) netcast\.tv/i], ["vendor", "model", ["type", "smarttv"]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i], ["model", ["vendor", "LG"], ["type", "mobile"]], [/android.+(ideatab[a-z0-9\-\s]+)/i], ["model", ["vendor", "Lenovo"], ["type", 
  "tablet"]], [/linux;.+((jolla));/i], ["vendor", "model", ["type", "mobile"]], [/((pebble))app\/[\d\.]+\s/i], ["vendor", "model", ["type", "wearable"]], [/android.+;\s(glass)\s\d/i], ["model", ["vendor", "Google"], ["type", "wearable"]], [/android.+;\s(pixel c)\s/i], ["model", ["vendor", "Google"], ["type", "tablet"]], [/android.+;\s(pixel xl|pixel)\s/i], ["model", ["vendor", "Google"], ["type", "mobile"]], [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i], 
  [["model", /_/g, " "], ["vendor", "Xiaomi"], ["type", "mobile"]], [/android.+a000(1)\s+build/i], ["model", ["vendor", "OnePlus"], ["type", "mobile"]], [/\s(tablet)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [["type", g.lowerize], "vendor", "model"]], engine:[[/windows.+\sedge\/([\w\.]+)/i], ["version", ["name", "EdgeHTML"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], ["name", 
  "version"], [/rv:([\w\.]+).*(gecko)/i], ["version", "name"]], os:[[/microsoft\s(windows)\s(vista|xp)/i], ["name", "version"], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], ["name", ["version", k, q]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [["name", "Windows"], ["version", k, q]], [/\((bb)(10);/i], [["name", "BlackBerry"], "version"], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, 
  /linux;.+(sailfish);/i], ["name", "version"], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [["name", "Symbian"], "version"], [/\((series40);/i], ["name"], [/mozilla.+\(mobile;.+gecko.+firefox/i], [["name", "Firefox OS"], "version"], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i, 
  /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], ["name", "version"], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [["name", "Chromium OS"], "version"], [/(sunos)\s?([\w\.]+\d)*/i], [["name", "Solaris"], "version"], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], ["name", "version"], [/(haiku)\s(\w+)/i], ["name", "version"], [/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i], [["name", "iOS"], ["version", /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i], [["name", 
  "Mac OS"], ["version", /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i], ["name", "version"]]}, f = function(a, c) {
    if (!(this instanceof f)) {
      return (new f(a, c)).getResult();
    }
    var e = a || (l && l.navigator && l.navigator.userAgent ? l.navigator.userAgent : ""), d = c ? g.extend(r, c) : r;
    this.getBrowser = function() {
      var a = p.apply(this, d.browser);
      a.major = g.major(a.version);
      return a;
    };
    this.getCPU = function() {
      return p.apply(this, d.cpu);
    };
    this.getDevice = function() {
      return p.apply(this, d.device);
    };
    this.getEngine = function() {
      return p.apply(this, d.engine);
    };
    this.getOS = function() {
      return p.apply(this, d.os);
    };
    this.getResult = function() {
      return {ua:this.getUA(), browser:this.getBrowser(), engine:this.getEngine(), os:this.getOS(), device:this.getDevice(), cpu:this.getCPU()};
    };
    this.getUA = function() {
      return e;
    };
    this.setUA = function(a) {
      e = a;
      return this;
    };
    return this;
  };
  f.VERSION = "0.7.12";
  f.BROWSER = {NAME:"name", MAJOR:"major", VERSION:"version"};
  f.CPU = {ARCHITECTURE:"architecture"};
  f.DEVICE = {MODEL:"model", VENDOR:"vendor", TYPE:"type", CONSOLE:"console", MOBILE:"mobile", SMARTTV:"smarttv", TABLET:"tablet", WEARABLE:"wearable", EMBEDDED:"embedded"};
  f.ENGINE = {NAME:"name", VERSION:"version"};
  f.OS = {NAME:"name", VERSION:"version"};
  "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = f), exports.UAParser = f) : "function" === typeof define && define.amd ? define(function() {
    return f;
  }) : l.UAParser = f;
})("object" === typeof window ? window : this);
plugin_Detector.functions.parser = new UAParser;
