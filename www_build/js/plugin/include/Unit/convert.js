// Input 0
'use strict';
app.func("convert", function(c, a) {
  app.debug.validate(c, "object");
  var b = c.unit;
  app.debug.validate(b);
  app.debug.validate(a);
  b = app.unit.config.e[b] || b;
  a = app.unit.config.e[a] || a;
  app.debug.validate(b, "object");
  app.debug.validate(a, "object");
  return app.unit.to(b, a) * c.value;
}, plugin_Unit.functions);
