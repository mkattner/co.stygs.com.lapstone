app.func("popup.add", function(templateId, templateElementsObject, buttonArray, callbackArray) {
	app.debug.validate(templateId);
	app.debug.validate(templateElementsObject);
	app.debug.validate(buttonArray);
	app.debug.validate(callbackArray);

	var popup;

	popup = {
		"templateId" : templateId,
		"templateElementsObject" : templateElementsObject,
		"buttonArray" : buttonArray,
		"callbackArray" : callbackArray
	}

	app.notify.popup.popupQueue = app.notify.popup.popupQueue || [];
	app.notify.popup.popupQueue.push(popup);

}, plugin_Notification.functions);

app.func("popup.show", function() {
	var popup;

	app.notify.popup.popupQueue = app.notify.popup.popupQueue || [];
	popup = app.notify.popup.popupQueue.pop();

	if (popup)
		app.notify.popup.open(popup.templateId, popup.templateElementsObject, popup.buttonArray, popup.callbackArray);

}, plugin_Notification.functions);

app.func("popup.open", function(templateId, templateElementsObject, buttonArray, callbackArray, $appendTo) {
	app.debug.validate(templateId);
	app.debug.validate(templateElementsObject);
	app.debug.validate(buttonArray);
	app.debug.validate(callbackArray);

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

	// CLOSE POPUP
	$popup._close().addClass("click").on("storagefilled", function() {
		app.notify.popup.close($popup);
	});

	// ADD THE BUTTONS
	app.debug.validate(callbackArray.length === buttonArray.length, "boolean");
	$popup._buttons().empty();
	$.each(buttonArray, function(buttonIndex, button) {
		$popup._buttons().append(function() {
			return button.addClass("click").on("storagefilled", function() {
				var promise;

				if (typeof callbackArray[buttonIndex] === "function") {

					promise = callbackArray[buttonIndex]($(this), $popup);

					if (typeof promise === "object") {
						promise.done(function() {
							app.notify.popup.close($popup);
						});

						app.debug.operation(function() {
							promise.fail(function() {
								app.debug.app("Callback promise of popup button failed. Popup won't be closed. Close it manually.");
							});
						});
					} else if (promise === false) {
						; // do not close popup
					} else {
						app.notify.popup.close($popup);
					}
				}

				else {
					app.notify.popup.close($popup);
				}
			});
		});
	})

	return $popup;
}, plugin_Notification.functions);

app.func("popup.close", function($popup) {
	if ($popup !== undefined)
		$popup.remove();

	else
		$(".app-popup").remove();

	app.notify.popup.show();
}, plugin_Notification.functions);

/**
 * 
 */
// app.debug.operation(function() {
// app.func("popup.help", function() {
//
// // SHWO EXAMPLE POPUP
// app.notify.popup.open("DefaultPopup", {
// "title" : "app.notify.popup.show()",
// "content" : $("<div>").append(function() {
// return $("<h1>").text("How to use app.notify.poup:")
// }).append(function() {
// return $("<p>").text("It uses a html template of the HtmlTemplate plugin. You
// can use the builtin html template: DefaultPopup")
// }).append(function() {
// return $("<p>").text("To change html and style of the popup use the *.html
// antd the *.css.lss files.")
// }).append(function() {
// return $("<p>").text("For adding content and texts to the popup use the
// elements of the html template and the templateElementsObject argument of the
// popup() function.");
// }).append(function() {
// return $("<p>").text("To add a button to the popup use the buttonArray and
// callbackArray parameter of the popup() function.")
// }).append(function() {
// return $("<p>").text("If you have a close element in you html template, then
// a storagefilled handler will be attached to spimply close the popup.")
// })
// }, [ $("<a>").attr({
// "href" : "#"
// }).text("No callback and close"), $("<a>").attr({
// "href" : "#"
// }).text("Callback and close"), $("<a>").attr({
// "href" : "#"
// }).text("Asynchronous callback and close") ], [ null, function() {
// // do nothing
// ;
// }, function() {
// var dfd = $.Deferred();
//
// app.notify.loader.show("DefaultLoader", {
// "headline" : "Waiting",
// "text" : "Close in one second."
// });
//
// window.setTimeout(function() {
// app.notify.loader.remove();
//
// dfd.resolve();
// }, 1000);
//
// return dfd.promise();
// } ])
// }, plugin_Notification.functions);
// });
/**
 * app.notify.popup.open("DefaultPopup", {"title":"My Pupup Title","content":"My
 * Content"}, [ $("<a>").attr({"href":"#"}).text("button1"), $("<a>").attr({"href":"#"}).text("button2") ], [
 * function(){alert("button1")}, function(){alert("button2")} ] )
 */
