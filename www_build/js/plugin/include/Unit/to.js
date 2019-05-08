// Input 0
'use strict';
app.func("to", function(a, c) {
  app.debug.validate(a);
  app.debug.validate(c);
  a = app.unit.config.e[a] || a;
  c = app.unit.config.e[c] || c;
  app.debug.validate(a, "object");
  app.debug.validate(c, "object");
  if (!app.unit.isSiUnit(a) && !app.unit.isSiUnit(c)) {
    if (app.unit.hasSameQuantities(a, c)) {
      var d = c.numerators.slice(0), e = c.denominators.slice(0), f = 1.0, g = 1.0;
      a.numerators.forEach(function(a) {
        c.numerators.forEach(function(b) {
          a = app.unit.config.e[a];
          b = app.unit.config.e[b];
          a.quantity == b.quantity && (f *= app.unit.to(Object.assign({}, a), Object.assign({}, b)), b = d.indexOf(b), d.splice(b, 1));
        });
      });
      a.denominators.forEach(function(a) {
        c.denominators.forEach(function(b) {
          a = app.unit.config.e[a];
          b = app.unit.config.e[b];
          a.quantity == b.quantity && (g *= app.unit.to(Object.assign({}, a), Object.assign({}, b)), b = e.indexOf(b), e.splice(b, 1));
        });
      });
      return f / g;
    }
  } else {
    if (app.unit.isSameQuantity(a, c) && null != a.siFactor && null != c.siFactor) {
      return a.siFactor / c.siFactor;
    }
  }
  throw "";
}, plugin_Unit.functions);
