// # sourceURL=plugin.Unit.sameQuantiy.js
/**
 * Copyright (c) 2018 martin.kattner@stygs.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// METER, {value:13.12, unit:CENTIMETER}
app.func("quantity.getList", function(quantity) {
  app.debug.validate(quantity, "string");
  var units;

  units = {};

  switch (quantity) {
    // VELOCITY = LENGTH / TIME
    case "VELOCITY":
      $.each(app.unit.config.e, function(unitName, unit) {
        if (app.unit.isSiUnit(unit) === true || unit.quanity != null) {
          return
        };

        if (unit.numerators.length === 1 && unit.denominators.length === 1) {
          if (app.unit.config.e[unit.numerators[0]].quantity === "LENGTH" && app.unit.config.e[unit.denominators[0]].quantity === "TIME") {
            units[unitName] = $.extend(true, {}, unit);
          }
        };
      })

      break;

    case "ANGLE":
      $.each(app.unit.config.e, function(unitName, unit) {
        if (unit.quantity === quantity) {
          units[unitName] = $.extend(true, {}, unit);
        }
      })
      break;
    default:
      throw "NotImplementedException " + quantity

  }

  return units;
}, plugin_Unit.functions);