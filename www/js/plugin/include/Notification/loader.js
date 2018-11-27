//# sourceURL=plugin.Notification.loader.js
/**
 * Copyright (c) 2018 martin.kattner@stygs.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

app.func("loader.show", function(templateId, templateElementsObject, $appendTo) {
	var $loader;
	$loader = $(".template" + templateId);

	// pick a new loader, or get the existing one
	if ($loader.length !== 1) {
		$loader.remove();

		$loader = app.template.get(templateId);

		// append the loader to DOM
		if ($appendTo !== undefined) {
			$appendTo.append($loader);
		} else {
			$("div[data-role=content]").append($loader);
		}
	} else {
		$loader = app.template.get(templateId, $loader);
	}

	$loader.addClass("app-loader");

	// REPLACE TEMPLATE ELEMENTS IN $loader
	$.each(templateElementsObject, function(elementKey, elementValue) {
		// REPLACE TEXT
		if (typeof elementValue === "string")
			$loader["_" + elementKey]().empty().text(elementValue);
		// REPLACE OBJECT
		else
			$loader["_" + elementKey]().empty().append(elementValue);
	});

	return $loader;
}, plugin_Notification.functions);

app.func("loader.remove", function() {
	$(".app-loader").remove();
}, plugin_Notification.functions);

app.func("loader.isActive", function() {
	return ($(".app-loader").length > 0) ? true : false;
}, plugin_Notification.functions)