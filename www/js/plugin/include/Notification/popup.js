app.func("popup.open", function(templateId, templateElementsObject, buttonArray, callbackArray, $appendTo) {
	var $popup;
	$popup = app.template.get(templateId);

	// append the loader to DOM
	if ($appendTo !== undefined) {
		$appendTo.append($popup);
	} else {
		$("div[data-role=content]").append($popup);
	}

	$popup.addClass("app-popup");

	// REPLACE TEMPLATE ELEMENTS IN $popup
	$.each(templateElementsObject, function(elementKey, elementValue) {
		// REPLACE TEXT
		if (typeof elementValue === "string")
			$popup["_" + elementKey]().empty().text(elementValue);
		// REPLACE OBJECT
		else
			$popup["_" + elementKey]().empty().append(elementValue);
	});

}, app.notify);

app.func("popup.close", function() {
	$(".app-popup").remove();
}, app.notify)