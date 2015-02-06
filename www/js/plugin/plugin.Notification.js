// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_Notification
 * 
 * @version 1.0
 * @namespace plugin_Notification
 */
var plugin_Notification = {
	config : null,
	notifications : null,
	callbackFunction : null,
	callbackFunctionBtnLeft : null,
	callbackFunctionBtnRight : null,

	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
		var dfd = $.Deferred();
		window.setTimeout(function() {
			if (plugin_Notification.config.enablePushNotifications && app.config.apacheCordova && app.sess.loggedIn() == true) {
				app.debug.alert("plugin_Notification.pagesLoaded() register device on licence and push server", 20);
				// alert("its time to register the device")
				// alert("device uuid: " + device.uuid);
				if (window.device) {
					var promise = app.rc.getJson("notifyme.registerDevice", {
						"deviceId" : device.uuid,
						"contextToken" : app.sess.getValue("userToken")
					}, true);

					promise.done(function(resultObject) {
						if (window.push != undefined) {
							app.debug.alert("plugin_Notification.pagesLoaded() register device on aerogear push server", 20);
							plugin_Notification.config.pushConfig.alias = device.uuid;
							push.register(plugin_Notification.functions.push_onNotification, function() {
								app.debug.alert("plugin_Notification.pagesLoaded() success: device is registered on push server", 20);
							}, function(error) {
								app.debug.alert("plugin_Notification.pagesLoaded() error: device is not registered on push server", 20);
								app.debug.alert("plugin_Notification.pagesLoaded() error: " + error, 20);
							}, plugin_Notification.config.pushConfig);
						} else {
							app.debug.alert("plugin_Notification.pagesLoaded() cordova push plugin not installed", 20);
						}
					});

					promise.fail(function(errorObject) {
						app.debug.alert("plugin_Notification.pagesLoaded() not able to register device on licence server", 20);
					});
				} else {
					app.debug.alert("plugin_Notification.pagesLoaded() cordova device plugin not installed", 20);
				}
			} else {
				app.debug.alert("plugin_Notification.pagesLoaded() do not register device on licence and push server", 20);
			}
		}, 5000);

		dfd.resolve();
		return dfd.promise();
	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.alert("plugin_" + this.config.name + ".definePluginEvents()", 11);

		$(document).on('pageshow', '.app-page', function(event) {
			if (!plugin_Notification.notifications) {
				plugin_Notification.notifications = app.store.localStorage.getObject("popup_notifications");
			}
			// alert(JSON.stringify(plugin_Notification.notifications));
			app.store.localStorage.removeObject("popup_notifications");
			plugin_Notification.popupShow();
		});
		$(document).on("click", "#btn-alert", function() {
			$("#popupAlert").popup("close");
			if (plugin_Notification.callbackFunction) {
				plugin_Notification.callbackFunction($("#popupAlert"));
				plugin_Notification.callbackFunction == null;
			}
			plugin_Notification.cleanupPopup($("#popupAlert"));
			plugin_Notification.popupShow();
		});

		$(document).on("click", "#btn-dialog-left", function() {
			$("#popupDialog").popup("close");
			if (plugin_Notification.callbackFunctionBtnLeft) {
				plugin_Notification.callbackFunctionBtnLeft($("#popupDialog"));
				plugin_Notification.callbackFunctionBtnLeft == null;
			}
			plugin_Notification.cleanupPopup($("#popupDialog"));
			plugin_Notification.popupShow();
		});

		$(document).on("click", "#btn-dialog-right", function() {
			$("#popupDialog").popup("close");
			if (plugin_Notification.callbackFunctionBtnRight) {
				plugin_Notification.callbackFunctionBtnRight($("#popupDialog"));
				plugin_Notification.callbackFunctionBtnRight == null;
			}
			plugin_Notification.cleanupPopup($("#popupDialog"));
			plugin_Notification.popupShow();
		});

		$(document).on("popupbeforeposition", "div[data-role=popup]", function(event, ui) {
			$(this).popup().trigger("create");
		});
	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 11);

		// alert('insert popups');
		// alert($("body #popupDialog").length);
		$("body #popupDialog").remove();
		$("body #popupAlert").remove();
		// if (($("body #popupDialog").length == 0))
		app.template.append("#" + $(container).attr("id"), "JQueryMobilePopupDialog");
		// if (($("body #popupAlert").length == 0))
		app.template.append("#" + $(container).attr("id"), "JQueryMobilePopupAlert");

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".pageSpecificEvents()", 11);

	},
	cleanupPopup : function(popup) {
		popup.find("div[role=main].ui-content").find(":nth-child(2)").replaceWith("<p></p>");
	},

	// private functions
	popupShow : function(notification, delay) {
		// alert(JSON.stringify(plugin_Notification.notifications));
		if (delay == undefined || delay == null)
			delay = 300;
		if (notification != undefined) {
			switch (notification.type) {
			case "alert":
				setTimeout(function() {
					if (notification.title) {
						$("#popupAlert div[data-role=header] h1").text(notification.title);
						$("#popupAlert div[data-role=header] h1").css("display", "block");
					} else {
						$("#popupAlert div[data-role=header] h1").css("display", "none");
					}

					if (notification.headline) {
						$("#popupAlert div.ui-content h3.ui-title").text(notification.headline);
						$("#popupAlert div.ui-content h3.ui-title").css("display", "block");
					} else {
						$("#popupAlert div.ui-content h3.ui-title").css("display", "none");
					}

					$("#popupAlert #btn-alert").text(notification.button);

					if (typeof notification.text == "object") {
						$("#popupAlert div.ui-content p").replaceWith(notification.text);
					} else {
						$("#popupAlert div.ui-content p").html(notification.text);
					}

					$("#popupAlert").popup("open");
				}, delay);
				plugin_Notification.callbackFunction = notification.callback;
				break;
			case "dialog":
				setTimeout(function() {

					if (notification.title) {
						$("#popupDialog div[data-role=header] h1").text(notification.title);
						$("#popupDialog div[data-role=header] h1").css("display", "block");
					} else {
						$("#popupDialog div[data-role=header] h1").css("display", "none");
					}

					if (notification.headline) {
						$("#popupDialog div.ui-content h3.ui-title").text(notification.headline);
						$("#popupDialog div.ui-content h3.ui-title").css("display", "block");
					} else {
						$("#popupDialog div.ui-content h3.ui-title").css("display", "none");
					}

					$("#popupDialog #btn-dialog-left").text(notification.buttonLeft);
					$("#popupDialog #btn-dialog-right").text(notification.buttonRight);

					if (typeof notification.text == "object") {
						$("#popupDialog div.ui-content p").html(notification.text);
					} else {
						$("#popupDialog div.ui-content p").html(notification.text);
					}
					$("#popupDialog").popup("open");
					// $("#popupDialog").popup("reposition");
				}, delay);
				plugin_Notification.callbackFunctionBtnLeft = notification.callbackButtonLeft;
				plugin_Notification.callbackFunctionBtnRight = notification.callbackButtonRight;
				break;
			default:
				alert("error in popupShow();");
				break;
			}

		}
		// display popups from array
		else {
			if (plugin_Notification.notifications != null) {
				if (Object.keys(plugin_Notification.notifications).length == 0)
					plugin_Notification.notifications = null;
				else {
					// todo more popups
					notification = plugin_Notification.notifications['1'];
					// alert(JSON.stringify(notification));
					delete plugin_Notification.notifications['1'];
					setTimeout(function() {
						$("#popupAlert div[data-role=header] h1").text(notification.title);
						$("#popupAlert div.ui-content h3.ui-title").text(notification.headline);
						$("#popupAlert #btn-alert").text(notification.button);
						$("#popupAlert div.ui-content p").html(notification.text);
						$("#popupAlert").popup("open");
						// $("#popupAlert").popup("reposition");
					}, delay);
				}
			}
		}
	},

	// public functions
	// called by user
	/**
	 * Public functions for plugin_Notification
	 * 
	 * @namespace plugin_Notification.functions
	 * 
	 */
	functions : {
		push_successHandler : function() {
			console.log('succesfull registered');
		},

		push_errorHandler : function(error) {
			console.error('error registering ' + error);
		},

		push_onNotification : function(event) {
			alert(event.alert);
		},
		alert : function(text, title, headline, button, callbackButton, delayInMs) {
			if (text == undefined)
				text = false;
			if (headline == undefined)
				headline = false;
			if (title == undefined)
				title = false;
			if (button == undefined)
				button = false;
			if (callbackButton == undefined)
				callbackButton = false;
			if (delayInMs == undefined || delayInMs == null)
				delayInMs = 100;
			notification = {
				"type" : "alert",
				"text" : text,
				"title" : title,
				"headline" : headline,
				"button" : button,
				"callback" : callbackButton
			};
			plugin_Notification.popupShow(notification, delayInMs);
		},
		dialog : function(text, title, headline, buttonLeft, buttonRight, callbackButtonLeft, callbackButtonRight, delayInMs) {
			if (text == undefined || text == null)
				text = false;
			if (headline == undefined || headline == null)
				headline = false;
			if (title == undefined || title == null)
				title = false;
			if (buttonLeft == undefined || buttonLeft == null)
				buttonLeft = false;
			if (buttonRight == undefined || buttonRight == null)
				buttonRight = false;
			if (callbackButtonLeft == undefined || callbackButtonLeft == null)
				callbackButtonLeft = false;
			if (callbackButtonRight == undefined || callbackButtonRight == null)
				callbackButtonRight = false;
			if (delayInMs == undefined || delayInMs == null)
				delayInMs = 100;
			// alert(text.html());
			notification = {
				"type" : "dialog",
				"text" : text,
				"title" : title,
				"headline" : headline,
				"buttonLeft" : buttonLeft,
				"buttonRight" : buttonRight,
				"callbackButtonLeft" : callbackButtonLeft,
				"callbackButtonRight" : callbackButtonRight
			};
			plugin_Notification.popupShow(notification, delayInMs);
		},
		close : function() {
			$("#popupAlert").popup("close");
			$("#popupDialog").popup("close");
		},
		add : {
			alert : function(text, title, headline, button, callbackButton, delayInMs) {
				if (text == undefined)
					text = false;
				if (headline == undefined)
					headline = false;
				if (title == undefined)
					title = false;
				if (button == undefined)
					button = false;
				if (callbackButton == undefined)
					callbackButton = false;
				if (!plugin_Notification.notifications)
					plugin_Notification.notifications = app.store.localStorage.getObject("popup_notifications");
				if (!plugin_Notification.notifications)
					plugin_Notification.notifications = {};
				if (delayInMs == undefined || delayInMs == null)
					delayInMs = 100;
				var nextKey = Object.keys(plugin_Notification.notifications).length + 1;
				plugin_Notification.notifications[nextKey] = {
					"type" : "alert",
					"text" : text,
					"title" : title,
					"headline" : headline,
					"button" : button,
					"callback" : callbackButton
				};
				app.store.localStorage.setObject("popup_notifications", plugin_Notification.notifications);
			}
		},
		push_onNotification : function() {
		},
		loader : {
			bubble : function(show) {
				if (show) {
					app.template.append("div[data-role=content]", "app-loader-bubble");
				} else {
					plugin_Notification.functions.loader.remove();
				}
			},
			bubbleDiv : function(show, text, headline) {
				if (show) {
					var loader = app.template.get("app-loader-bubbleDiv");
					if (text != undefined) {
						loader.find("p").text(text);
					}
					if (headline != undefined) {
						loader.find("h1").text(headline)
					}
					$("div[data-role=content]").append(loader);
				} else {
					plugin_Notification.functions.loader.remove();
				}
			},
			remove : function() {
				$(".app-loader").remove();
			}
		}

	}
};