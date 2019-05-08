// Input 0
'use strict';
app.func("isSiUnit", function(a) {
  app.debug.validate(a);
  a = app.unit.config.e[a] || a;
  app.debug.validate(a);
  return null != a.numerators || null != a.denominators ? !1 : !0;
}, plugin_Unit.functions);
