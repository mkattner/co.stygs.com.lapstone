// Input 0
'use strict';
app.func("quantity.getList", function(b) {
  app.debug.validate(b, "string");
  var c = {};
  switch(b) {
    case "VELOCITY":
      $.each(app.unit.config.e, function(b, a) {
        !0 !== app.unit.isSiUnit(a) && null == a.quanity && 1 === a.numerators.length && 1 === a.denominators.length && "LENGTH" === app.unit.config.e[a.numerators[0]].quantity && "TIME" === app.unit.config.e[a.denominators[0]].quantity && (c[b] = $.extend(!0, {}, a));
      });
      break;
    case "ANGLE":
      $.each(app.unit.config.e, function(d, a) {
        a.quantity === b && (c[d] = $.extend(!0, {}, a));
      });
      break;
    default:
      throw "NotImplementedException " + b;
  }
  return c;
}, plugin_Unit.functions);
