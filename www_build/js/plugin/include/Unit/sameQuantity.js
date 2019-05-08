// Input 0
'use strict';
app.func("hasSameQuantities", function(b, a) {
  app.debug.validate(b);
  app.debug.validate(a);
  b = app.unit.config.e[b] || b;
  a = app.unit.config.e[a] || a;
  app.debug.validate(b, "object");
  app.debug.validate(a, "object");
  var c = a.numerators.slice(0), d = a.denominators.slice(0);
  b.numerators.forEach(function(b) {
    a.numerators.forEach(function(a) {
      b = app.unit.config.e[b];
      a = app.unit.config.e[a];
      b.quantity == a.quantity && (a = c.indexOf(a), c.splice(a, 1));
    });
  });
  b.denominators.forEach(function(b) {
    a.denominators.forEach(function(a) {
      b = app.unit.config.e[b];
      a = app.unit.config.e[a];
      b.quantity == a.quantity && (a = d.indexOf(a), d.splice(a, 1));
    });
  });
  return 0 === c.length && 0 === d.length ? !0 : !1;
}, plugin_Unit.functions);
app.func("isSameQuantity", function(b, a) {
  app.debug.validate(b);
  app.debug.validate(a);
  b = app.unit.config.e[b] || b;
  a = app.unit.config.e[a] || a;
  app.debug.validate(b, "object");
  app.debug.validate(a, "object");
  return null !== b.quantity && b.quantity === a.quantity ? !0 : !1;
}, plugin_Unit.functions);
