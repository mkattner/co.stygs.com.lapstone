// # sourceURL=plugin.Unit.to.js
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
app.func("to", function(thisUnit, toUnit) {
  app.debug.validate(thisUnit);
  app.debug.validate(toUnit);

  thisUnit = app.unit.config.e[thisUnit] || thisUnit;
  toUnit = app.unit.config.e[toUnit] || toUnit;

  app.debug.validate(thisUnit, "object");
  app.debug.validate(toUnit, "object");

  // if it's a combined unit
  if (!app.unit.isSiUnit(thisUnit) && !app.unit.isSiUnit(toUnit)) {
    // if unit has the same quantities
    if (app.unit.hasSameQuantities(thisUnit, toUnit)) {

      var toNumerators = toUnit.numerators.slice(0);
      var toDenominators = toUnit.denominators.slice(0);

      var numeratorFactor = 1.0,
        denominatorFactor = 1.0;

      thisUnit.numerators.forEach(function(thisNumerator) {
        toUnit.numerators.forEach(function(toNumerator) {
          thisNumerator = app.unit.config.e[thisNumerator];
          toNumerator = app.unit.config.e[toNumerator];

          if (thisNumerator.quantity == toNumerator.quantity) {

            numeratorFactor *= app.unit.to(Object.assign({}, thisNumerator), Object.assign({}, toNumerator));
            var index = toNumerators.indexOf(toNumerator)
            toNumerators.splice(index, 1);
            return;
          }

        });
      });

      thisUnit.denominators.forEach(function(thisDenominator) {
        toUnit.denominators.forEach(function(toDenominator) {
          thisDenominator = app.unit.config.e[thisDenominator];
          toDenominator = app.unit.config.e[toDenominator];

          if (thisDenominator.quantity == toDenominator.quantity) {

            denominatorFactor *= app.unit.to(Object.assign({}, thisDenominator), Object.assign({}, toDenominator));
            var index = toDenominators.indexOf(toDenominator)
            toDenominators.splice(index, 1);
            return;
          }

        });
      });

      return numeratorFactor / denominatorFactor;

    }
  } else if (!app.unit.isSameQuantity(thisUnit, toUnit))
    throw "";

  //
  else if (thisUnit.siFactor != null && toUnit.siFactor != null) return thisUnit.siFactor / toUnit.siFactor;

  throw "";

}, plugin_Unit.functions);