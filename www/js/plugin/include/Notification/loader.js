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
}, app.notify);

app.func("loader.remove", function() {
	$(".app-loader").remove();
}, app.notify);

app.func("loader.isActive", function() {
	return ($(".app-loader").length > 0) ? true : false;
}, app.notify)