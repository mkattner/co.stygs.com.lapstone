/**
 * Copyright (c) 2018 martin.kattner@gmail.com Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * global error handling
 */
window.onerror = function(message, fileURL, lineNumber, columnNumber, errorObject) {
	try {

		console.log("Global ERROR:");
		console.log("Message: " + message);
		console.log("File: " + fileURL);
		console.log("Line: " + lineNumber + " Column: " + columnNumber);
		app.fb.send("lapstone -> global ERROR: " + message);
	} catch (e) {
		console.log("Error at window.onerror function.")
	}
};

/**
 * App namespace
 * 
 * @namespace app
 */
var app = {
	config: {
		// name : "app",
		useJQueryMobile: true,
		apacheCordova: null,
		jQueryMobile: null,
		lapstone: null
	},

	// addObject: function(name, object) {
	// console.error("Deprecated Function!");
	// app[name] = object;
	// }

	// ,
	func: function(qualifyer, func, currentObject) {
		// console.log(qualifyer)
		var qualifyers, currentQualifyer;

		if (currentObject === undefined) {
			throw new Error("Can't append " + qualifyer + " function to undefined object.");
		} else {
			qualifyers = qualifyer.split('.');
			currentQualifyer = qualifyers.shift();

			if (qualifyers.length === 0) {

				app.debug.operation(function() {
					if (currentObject[currentQualifyer] !== undefined) {
						app.debug.error(qualifyer);
					}
				});

				currentObject[currentQualifyer] = func;
			}

			else {
				currentObject[currentQualifyer] = currentObject[currentQualifyer] || {};
				app.func(qualifyers.join('.'), func, currentObject[currentQualifyer]);
			}
		}
	}

};

function initialisation() {
	var dfd;

	dfd = $.Deferred();

	extendJsAndJquery();

	dfd.resolve();

	return dfd.promise();
}

function loadPlugins() {
	var dfd = $.Deferred(), url, promise;

	if (app.config.min) {
		url = "../js/plugin/all.plugin.min." + app.config.version.app + ".js";
	} else {
		url = "../js/plugin/plugins.js";
	}

	// load the plugins file
	promise = lapstone.globalLoader.AsyncScriptLoader(url);
	promise.done(function() {
		lapstone.startup.addFunction("                  plugin constructor", app.plugins.constructor);
		dfd.resolve();
	});
	promise.fail(function() {
		dfd.reject();
	});

	return dfd.promise();
}

function loadPages() {
	var dfd = $.Deferred(), url, promise;

	if (app.config.min) {
		url = "../js/page/all.page.min." + app.config.version.app + ".js";
	} else {
		url = "../js/page/pages.js";
	}

	// load pages file
	promise = lapstone.globalLoader.AsyncScriptLoader(url);
	promise.done(function() {
		lapstone.startup.addFunction("                  page constructor", app.pages.constructor);
		dfd.resolve();
	});
	promise.fail(function() {
		dfd.reject();
	});

	return dfd.promise();
}

function loadConfiguration() {
	var dfd = $.Deferred(), promise;

	promise = lapstone.globalLoader.AsyncJsonLoader("../js/lapstone.json");

	promise.done(function(configuration) {
		//
		// $.each(configuration, function(k, v) {
		// app.config[k] = v
		// });

		$.extend(true, app.config, configuration);

		lapstone.initialisationPanel.start().done(function() {
			// show version
			$('.lapstone-version').text(app.config.version.lapstone);
			$('.app-version').text(app.config.version.app);

			if (configuration.name === undefined)
				console.warn("lapstone.json has no 'name' property.");

			if (configuration.title === undefined)
				console.warn("lapstone.json has no 'title' property.");

			if (configuration.version === undefined) {
				console.warn("lapstone.json has no 'version' property.");
			} else {
				if (configuration.version.app === undefined)
					console.warn("lapstone.json has no 'version.app' property.");

				if (configuration.version.lapstone === undefined)
					console.warn("lapstone.json has no 'version.lapstone' property.");

				if (configuration.version.update === undefined)
					console.warn("lapstone.json has no 'version.update' property.");
			}

			if (configuration.min === undefined)
				console.warn("lapstone.json has no 'min' property.");

			if (configuration.startPage === undefined)
				console.warn("lapstone.json has no 'startPage' property.");

			if (configuration.startPage_firstStart === undefined)
				console.warn("lapstone.json has no 'startPage_firstStart' property.");

			if (configuration.startPage_loggedIn === undefined)
				console.warn("lapstone.json has no 'startPage_loggedIn' property.");

			if (configuration.badConnectionPage === undefined)
				console.warn("lapstone.json has no 'badConnectionPage' property.");

			// transform app/lapstone version to an integer value
			// app.config.version['lapstone_int'] =
			// app.config.version.lapstone.toIntegerVersion();
			// app.config.version['app_int'] =
			// app.config.version.app.toIntegerVersion();

			// preset the title of the app
			$('title').text(app.config.title);

			dfd.resolve();
		}).fail(function() {
			dfd.reject();
		});

	});

	promise.fail(function() {
		dfd.reject();
	});

	return dfd.promise();
}

function updateFramework() {
	var dfd = $.Deferred(), currentLapstoneVersion, oldLapstoneVersion, currentAppVersion, oldAppVersion;

	if (window.plugin_Informator) {

		currentLapstoneVersion = app.config.version.lapstone;
		currentAppVersion = app.config.version.app;

		plugin_Informator.syncObjectWithHtml5Storage({
			"app": {
				"config": {
					"version": app.config.version
				}
			}
		});

		oldLapstoneVersion = app.config.version.lapstone;
		oldAppVersion = app.config.version.app;

		if (app.config.version.update === true) {
			console.warn("update done");

			if (window.plugin_Informator) {
				app.info.set("app.config.version.update", false);
			}

			else {
				console.log("Update mechanism doesn't works without Informator plugin.")
			}

			app.notify.add.alert({
				"id": "updateDone",
				"title": app.lang.string("update done - title", "lapstone", {
					version: app.config.version.app
				}),
				"text": app.lang.string("update done - text", "lapstone", {
					version: app.config.version.app
				}),
				"button": app.lang.string("update done - button", "lapstone")
			});
		}
		// alert(currentAppVersion + oldAppVersion + currentLapstoneVersion +
		// oldLapstoneVersion);
		if (currentLapstoneVersion != oldLapstoneVersion || currentAppVersion != oldAppVersion) {
			console.warn("TODO Lastone || App Version Update");
			// alert("do update")

			app.info.set("app.config.version.app", currentAppVersion);
			app.info.set("app.config.version.lapstone", currentLapstoneVersion);
			// app.info.set("app.config.version.app_int",
			// currentAppVersion_int);
			// app.info.set("app.config.version.lapstone_int",
			// currentLapstoneVersion_int);

			// RUN UPDATE SCRIPTS
			lapstone.globalLoader.AsyncJsonLoader("../files/update/registry.json", 3).done(function(response) {
				var updateScriptPromisses;

				updateScriptPromisses = [];

				$.each(response.updateRegistry, function(index, updateObject) {
					console.log(JSON.stringify(updateObject))

					// APP version update
					if (updateObject.startWithAppVersion && updateObject.stopWithAppVersion) {
						if (currentAppVersion.toIntegerVersion() >= updateObject.startWithAppVersion.toIntegerVersion() && currentAppVersion.toIntegerVersion() < updateObject.stopWithAppVersion.toIntegerVersion()) {
							// App Update
							console.warn("App Update: " + updateObject.description);
							updateScriptPromisses.push(lapstone.globalLoader.AsyncScriptLoader("../files/update/scripts/" + updateObject.updateScript, 1));
						}
					}

					// LAPSTONE version update
					if (updateObject.startWithLapstoneVersion && updateObject.stopWithLapstoneVersion) {
						if (currentLapstoneVersion.toIntegerVersion() >= updateObject.startWithLapstoneVersion.toIntegerVersion() && currentLapstoneVersion.toIntegerVersion() < updateObject.stopWithLapstoneVersion.toIntegerVersion()) {
							// Lapstone Update
							console.warn("Lapstone Update: " + updateObject.description);
							updateScriptPromisses.push(lapstone.globalLoader.AsyncScriptLoader("../files/update/scripts/" + updateObject.updateScript, 1));
						}
					}

				});

				// UPDATE SCRIPTS DONE
				$.when.apply($, updateScriptPromisses).done(function() {
					app.info.set("app.config.version.update", true);

					console.log("All update scripts did run.");

					if (app.config.reloadLapstoneAfterUpdate === true)
						location.reload();
					else
						console.log("Lapstone stopped after update. Please reload.")
					// dfd.resolve();
				}).fail(function() {
					dfd.reject();
				});

			}).fail(function() {
				dfd.reject();
			});

			// reload

		}

		else {
			dfd.resolve();
		}
	}

	else {
		console.log("Update mechanism doesn't works without Informator plugin.")
		dfd.resolve();
	}

	return dfd.promise();
}

function cacheAjax() {
	var cache, update;
	if (JSON.parse(window.localStorage.getItem(app.config.name + ".informator-config.app.config.version.update")) !== null) {
		update = JSON.parse(window.localStorage.getItem(app.config.name + ".informator-config.app.config.version.update"));
		// console.warn("update: " + update)
		cache = !update;
	} else {
		cache = false;
	}
	// true;
	// console.warn("cache: " + cache);
	return cache;
}

function loadJQueryMobile() {
	var dfd = $.Deferred(), promise;

	promise = lapstone.globalLoader.AsyncScriptLoader("../ext/jQueryMobile/jquery.mobile.min.js");

	promise.done(function() {

		dfd.resolve();

	});

	promise.fail(function() {
		dfd.reject();
	});

	return dfd.promise();
}
// create lapstone namespace
var lapstone = {};
// var globalLoader, startupDefinition, initialisationPanel, startup;

lapstone.globalLoader = {
	globalTimeout: 10000,
	globalAttempts: 3,

	AsyncJsonLoader: function(url, attempts, attempt, dfd) {

		if (dfd == undefined)
			dfd = $.Deferred();

		if (attempt == undefined)
			attempt = 1;

		if (attempts == undefined)
			attempts = lapstone.globalLoader.globalAttempts;

		$.ajax({
			cache: cacheAjax(),
			url: url,
			async: true,
			dataType: "json",
			timeout: lapstone.globalLoader.globalTimeout
		}).done(function(data, textStatus, jqXHR) {
			if (textStatus === "timeout") {
				lapstone.startup.log("Timeout while loading: " + url);
				lapstone.startup.log("It was attempt " + attempt + " of " + attempts + ".");
				if (attempt < attempts) {
					lapstone.startup.log("So we try again.");
					lapstone.globalLoader.AsyncJsonLoader(url, attempts, attempt + 1, dfd);
				} else {
					lapstone.startup.log("So the framework loading fails.");
					dfd.reject(textStatus);
				}
			} else {
				dfd.resolve(data);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (attempt < attempts) {
				lapstone.globalLoader.AsyncJsonLoader(url, attempts, attempt + 1, dfd);
			} else {
				console.log("Fatal Error: Can't load JSON. Url: " + url + " Status: " + textStatus);
				console.log("             Message: " + errorThrown.message);
				console.log("             Stack: " + errorThrown.stack);
				dfd.reject(arguments);
			}
		});

		return dfd.promise();
	},

	JsonLoader: function(url, attempts, attempt) {
		console.warn("Lapstone: Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + url);
		var json = null;
		$.ajax({
			cache: cacheAjax(),
			url: url,
			async: false,
			dataType: "json",
			timeout: lapstone.globalLoader.globalTimeout,
			success: function(data) {
				// alert(JSON.stringify(data));
				json = data;
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Fatal Error: Can't load JSON. Url: " + url + " Status: " + textStatus);
				console.log("             Message: " + errorThrown.message);
				console.log("             Stack: " + errorThrown.stack);
			}
		});
		return json;
	},

	AsyncScriptLoader: function(url, attempts, attempt, dfd) {

		if (dfd == undefined)
			dfd = $.Deferred();

		if (attempt == undefined)
			attempt = 1;

		if (attempts == undefined)
			attempts = lapstone.globalLoader.globalAttempts;

		$.ajax({
			cache: cacheAjax(),
			url: url,
			async: true,
			dataType: "script",
			timeout: lapstone.globalLoader.globalTimeout
		}).done(function(data, textStatus, jqXHR) {
			if (textStatus === "timeout") {
				lapstone.startup.log("Timeout while loading: " + url);
				lapstone.startup.log("It was attempt " + attempt + " of " + attempts + ".");
				if (attempt < attempts) {
					lapstone.startup.log("So we try again.");
					lapstone.globalLoader.AsyncScriptLoader(url, attempts, attempt + 1, dfd);
				} else {
					lapstone.startup.log("So the framework loading fails.");
					dfd.reject(textStatus);
				}
			} else {
				// i dont know why
				// window.setTimeout(function() {
				dfd.resolve(data);
				// }, 200);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (attempt < attempts) {
				lapstone.globalLoader.AsyncScriptLoader(url, attempts, attempt + 1, dfd);
			} else {
				console.log("Fatal Error: Can't load Script. Url: " + url + " Status: " + textStatus);
				console.log("             Message: " + errorThrown.message);
				console.log("             Stack: " + errorThrown.stack);
				dfd.reject(arguments);
			}
		});
		return dfd.promise();
	},

	ScriptLoader: function(url, attempts, attempt) {
		console.warn("Lapstone: Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + url);
		$.ajax({
			cache: cacheAjax(),
			url: url,
			async: false,
			dataType: "script",
			timeout: lapstone.globalLoader.globalTimeout,
			success: function(data) {

			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Fatal Error: Can't load Script. Url: " + url + " Status: " + textStatus);
				console.log("             Message: " + errorThrown.message);
				console.log("             Stack: " + errorThrown.stack);

			}
		});
	},

	AsyncTextLoader: function(url, attempts, attempt, dfd) {

		if (dfd == undefined)
			dfd = $.Deferred();

		if (attempt == undefined)
			attempt = 1;

		if (attempts == undefined)
			attempts = lapstone.globalLoader.globalAttempts;

		$.ajax({
			cache: cacheAjax(),
			url: url,
			async: true,
			dataType: "text",
			timeout: lapstone.globalLoader.globalTimeout
		}).done(function(data, textStatus, jqXHR) {
			if (textStatus === "timeout") {
				lapstone.startup.log("Timeout while loading: " + url);
				lapstone.startup.log("It was attempt " + attempt + " of " + attempts + ".");
				if (attempt < attempts) {
					lapstone.startup.log("So we try again.");
					lapstone.globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
				} else {
					lapstone.startup.log("So the framework loading fails.");
					dfd.reject(textStatus);
				}
			} else {
				dfd.resolve(data);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (attempt < attempts) {
				lapstone.globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
			} else {
				console.log("Fatal Error: Can't load Text. Url: " + url + " Status: " + textStatus);
				console.log("             Message: " + errorThrown.message);
				console.log("             Stack: " + errorThrown.stack);
				dfd.reject(arguments);
			}
		});
		return dfd.promise();
	},

	TextLoader: function(url, attempts, attempt) {
		console.warn("Lapstone: Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + url);
		var text = null;
		$.ajax({
			cache: cacheAjax(),
			url: url,
			async: false,
			dataType: "text",
			timeout: lapstone.globalLoader.globalTimeout,
			success: function(data) {
				// alert(JSON.stringify(data));
				text = data;
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Fatal Error: Can't load TEXT. Url: " + url + " Status: " + textStatus);
				console.log("             Message: " + errorThrown.message);
				console.log("             Stack: " + errorThrown.stack);
			}
		});
		return text;
	},

	AsyncStyleLoader: function(url, attempts, attempt) {
		var dfd = $.Deferred();
		lapstone.globalLoader.AsyncTextLoader(url).done(function(styleString) {

			styleString = styleString.replaceAll("url(\"", "url(\"" + url.substring(0, url.lastIndexOf("/") + 1));
			styleString = styleString.replaceAll("url('", "url('" + url.substring(0, url.lastIndexOf("/") + 1));

			// console.log(styleString)

			$('head').append(function() {
				return $("<style>").text(styleString)
			});
			dfd.resolve(styleString);
		}).fail(function() {
			dfd.reject(arguments);
		})

		return dfd.promise();
	},

	// StyleLoader : function(url, attempts, attempt) {
	// var cssLink;
	//
	// if (!cacheAjax())
	// cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '?_=' +
	// new Date().getTime() + '">';
	// else
	// cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '">';
	//
	// $("head").append(cssLink);
	// },

	// TODO ??? double function
	StyleLoader: function(url, attempts, attempt) {
		var cssLink;

		if (!cacheAjax())
			cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '?_=' + new Date().getTime() + '">';
		else
			cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '">';

		$("head").append(cssLink);
	},

	AsyncLessLoader: function(url, attempts, attempt, dfd) {

		if (dfd == undefined)
			dfd = $.Deferred();

		if (attempt == undefined)
			attempt = 1;

		if (attempts == undefined)
			attempts = lapstone.globalLoader.globalAttempts;

		$.ajax({
			cache: cacheAjax(),
			url: url,
			async: true,
			dataType: "text",
			timeout: lapstone.globalLoader.globalTimeout
		}).done(function(data, textStatus, jqXHR) {
			// console.log("+++++++ " + JSON.stringify(jqXHR));
			if (textStatus === "timeout") {
				lapstone.startup.log("Timeout while loading: " + url);
				lapstone.startup.log("It was attempt " + attempt + " of " + attempts + ".");
				if (attempt < attempts) {
					lapstone.startup.log("So we try again.");
					lapstone.globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
				} else {
					lapstone.startup.log("So the framework loading fails.");
					dfd.reject(arguments);
				}
			} else {
				if ($("style#lapstoneStyles")[0] == undefined)
					$('head').append(function() {
						return $("<style>").attr("id", "lapstoneStyles")
					});

				$("style#lapstoneStyles").before('<link rel="stylesheet/less" type="text/css" href="' + url + '">');
				dfd.resolve(data);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (attempt < attempts) {
				lapstone.globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
			} else {
				console.log("Fatal Error: Can't load Text. Url: " + url + " Status: " + textStatus);
				console.log("             Message: " + errorThrown.message);
				console.log("             Stack: " + errorThrown.stack);
				dfd.reject(arguments);
			}
		});
		return dfd.promise();
	},

	LessLoader: function(url, attempts, attempt) {
		var lessLink;

		if (!cacheAjax())
			lessLink = '<link rel="stylesheet/less" type="text/css" href="' + url + '?_=' + new Date().getTime() + '">';
		else
			lessLink = '<link rel="stylesheet/less" type="text/css" href="' + url + '">';

		$("head").append(lessLink);
	}
}

$(document).bind("mobileinit", function() {
	app.debug.debug("jQuery mobile initialized", 30);
	$.mobile.ajaxEnabled = true;
	$.mobile.autoInitializePage = false;
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.page.prototype.options.domCache = false;
	$.mobile.ignoreContentEnabled = true;

	$.mobile.loader.prototype.options.disabled = true;
	$.mobile.loadingMessage = false;
	$.mobile.loading('hide')
	// $.mobile.loader.prototype.options.text = "loading";
	// $.mobile.loader.prototype.options.textVisible = false;
	// $.mobile.loader.prototype.options.theme = "a";
	// $.mobile.loader.prototype.options.html = "";

	$.mobile.defaultPageTransition = 'none';
	// TODO keep everything native and remvoe that enhance shit from jqm
	$.mobile.page.prototype.options.keepNative = "*";
	$.mobile.keepNative = "*";
	app.config.jQueryMobile = true;
});

/* on cordova initialisation */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	// alert("cordova initialized");
	app.config.apacheCordova = true;
	$('body').addClass("app-apache-cordova");
}

function waitForMobileinit() {
	var dfd = $.Deferred(), interval;

	// mobileinit event already received
	if (app.config.jQueryMobile === true) {
		dfd.resolve();
	}

	// check every 50 milliseconds if mobileinit event was thrown
	else {
		interval = setInterval(function() {
			if (app.config.jQueryMobile === true) {
				dfd.resolve();
				clearInterval(interval);
			}
		}, 50);
	}

	return dfd.promise();
}

function waitForDeviceready() {
	var dfd = $.Deferred(), interval;

	// if device is a cordova device
	if (window.cordova) {

		// deviceready event already received
		if (app.config.apacheCordova === true) {
			dfd.resolve();
		}

		// check every 50 milliseconds if deviceready event was thrown
		else {
			interval = setInterval(function() {
				if (app.config.apacheCordova === true) {
					clearInterval(interval);
					dfd.resolve();
				}
			}, 50);
		}
	} else {
		app.config.apacheCordova = false;
		dfd.resolve();
	}

	return dfd.promise();
}

lapstone.initialisationPanel = {
	start: function() {
		var dfd = $.Deferred();

		$('head').append("<title>");
		$('title').text("...");

		if (app.config.min) {
			$("head").append(function() {
				return $("<style>").append(app.config.startupStyle)
			});
			$('body').append(app.config.startupContent);
			dfd.resolve();
		}

		else {
			lapstone.globalLoader.StyleLoader("../js/lapstone.css");
			lapstone.globalLoader.AsyncTextLoader('../js/lapstone.html').done(function(data) {

				$('body').append(data);
				dfd.resolve();
			}).fail(function() {
				dfd.reject();
			});
		}
		return dfd.promise();
	},

	hide: function() {

		window.setTimeout(function() {
			$("#LAPSTONE").remove();

			if (app.config.apacheCordova) {
				navigator.splashscreen.hide();
			}
		}, 100);

	},

	updateProgress: function() {
		var current = parseInt($("progress").attr("value"));

		$("progress").attr("value", current + 5)

	},

	changeStatus: function() {
		$("#LAPSTONE .lapstone-status").text(lapstone.startup.currentDefinition['status']);
	},

	finish: function() {
		lapstone.initialisationPanel.hide();
	}
}

lapstone.startupDefinition = [{
	"status": "Lapstone startup: loading configuration",
	"function": loadConfiguration
}, {
	"status": "Lapstone startup: initialisation",
	"function": initialisation
}, {
	"status": "Lapstone startup: load plugins",
	"function": loadPlugins
}, {
	"status": "Lapstone startup: load pages",
	"function": loadPages
}, {
	"status": "Lapstone startup: checking for updates",
	"function": updateFramework
}, {
	"status": "Lapstone startup: load jQueryMobile",
	"function": loadJQueryMobile
}, {
	"status": "Lapstone startup: wait for apache cordova deviceready event",
	"function": waitForDeviceready
}, {
	"status": "Lapstone startup: wait for jQuerysmobile mobileinit event",
	"function": waitForMobileinit
}]

lapstone.startup = {
	currentDefinition: {
		"status": "----------------- Starting the Lapstone Framework",
		// "function": waitForDeviceready,
		// "parameter": "",
		// "result": "",
		// "image": "deviceready"
	},
	dfd: $.Deferred(),
	timestamp: Date.now() / 1000,
	startupTimestamp: Date.now() / 1000,
	promise: null,
	images: {},

	addFunction: function(status, func) {
		lapstone.startupDefinition.unshift({
			"status": status,
			"function": func
		});
	},
	log: function() {
		var timestamp = Date.now() / 1000;
		console.log("LST " + (timestamp - lapstone.startup.timestamp).toFixed(3) + "s: " + lapstone.startup.currentDefinition['status']);
		lapstone.startup.timestamp = timestamp;
	},

	functionDone: function(data) {
		var promise;

		// remove that shit, it costs 1000ms
		// delay startup for a smoother user experience
		// window.setTimeout(function() {

		lapstone.startup.currentDefinition = lapstone.startupDefinition.shift();
		if (lapstone.startup.currentDefinition) {

			lapstone.initialisationPanel.changeStatus();
			lapstone.initialisationPanel.updateProgress();

			lapstone.startup.log();
			promise = lapstone.startup.currentDefinition['function']();

			promise.done(function() {
				lapstone.startup.functionDone(arguments);
			});

			promise.fail(function() {
				lapstone.startup.functionFail(arguments);
			});

			// }, 50);

			// alert('next')
		} else {
			lapstone.startup.dfd.resolve();
		}
	},

	functionFail: function() {
		var serializedError;

		console.log(" FAILED");
		lapstone.startup.log();
		try {
			serializedError = JSON.stringify(arguments);
			console.log("ERROR: " + serializedError);
			console.log(arguments);
		} catch (e) {
		}

		lapstone.startup.dfd.reject(arguments);
	},

	initFramework: function() {
		lapstone.startup.log();
		lapstone.startup.functionDone();

		return lapstone.startup.dfd.promise();
	}
}

// jquery loaded
$(document).ready(function() {
	var inititalisationPromise;

	inititalisationPromise = lapstone.startup.initFramework();

	inititalisationPromise.done(function() {
		// alert("init done");
		// setTimeout(function() {

		lapstone.initialisationPanel.finish();

		// lapstone is now loaded
		app.config.lapstone = true;

		// trigger the lapstone initialisation event
		var event = new Event('lapstone');
		document.dispatchEvent(event);
		//$(document).trigger("lapstone");

		app.config['startup'] = ((Date.now()) / 1000) - lapstone.startup.startupTimestamp;

		// cleanup
		// delete initialisation;
		// delete loadPlugins;
		// delete loadPages;
		// delete loadConfiguration;
		// delete updateFramework;
		// delete loadJQueryMobile;
		// delete waitForMobileInit;
		// delete waitForDeviceready;
		// delete startupDefinition;
		// delete startup;

		console.log("Lapstone started in " + app.config.startup + "seconds");
		console.log("      Versions:");
		console.log("           app: " + app.config.version.app);
		console.log("      lapstone: " + app.config.version.lapstone);
		console.log("        jquery: " + $.fn.jquery);
		console.log(" jquery mobile: " + $.mobile.version);

		// }, 200);
	});

	inititalisationPromise.fail(function() {

		throw new Error("Initialisation problem. Please look at the stacktrace.");

	});

	inititalisationPromise.always(function() {
		// alert();

	});

});

function handleOpenURL(url) {
	// TODO: parse the url, and do something
	// TODO triggers when inappbrowese -> system browser is closed
	// setTimeout(function() {
	// alert(url);
	// }, 0);
}

/**
 * some functions
 */
function extendJsAndJquery() {

	Number.prototype.pad = function(size) {
		var s = String(this);
		while (s.length < (size || 2)) {
			s = "0" + s;
		}
		return s;
	}

	// useful hashCode function
	String.prototype.hashCode = function() {
		var hash, length, _char;
		hash = 0;
		length = this.length;

		if (length == 0)
			return hash;
		for (var i = 0; i < length; i++) {
			_char = this.charCodeAt(i);
			hash = ((hash << 5) - hash) + _char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return Math.abs(hash);
	}

	// some android versions don't support startsWith
	if (typeof String.prototype.startsWith != 'function') {
		// see below for better implementation!
		String.prototype.startsWith = function(str) {
			return this.indexOf(str) === 0;
		};
	}

	if (typeof String.prototype.replaceAll != 'function') {
		String.prototype.replaceAll = function(search, replacement) {
			var target = this;
			return target.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
		};
	}

	if (typeof String.prototype.endsWith != 'function') {
		String.prototype.endsWith = function(suffix) {
			return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	}

	if (typeof String.prototype.contains != 'function') {
		String.prototype.contains = function(it) {
			return this.indexOf(it) != -1;
		};
	}

	if (typeof String.prototype.capitalizeFirstLetter != 'function') {
		String.prototype.capitalizeFirstLetter = function() {
			return this.charAt(0).toUpperCase() + this.slice(1);
		};
	}

	String.prototype.pathCombine = function(path) {
		var url, set, replace_with;
		url = this + "/" + (path);
		set = url.match(/([^:]\/{2,})/g); // Match (NOT ":") followed by (2 OR
		// 3 "/")

		for (var str in set) {
			// Modify the data you have
			replace_with = set[str].substr(0, 1) + '/';

			// Replace the match
			url = url.replace(set[str], replace_with);
		}
		return url;
	}

	String.prototype.toIntegerVersion = function(delimiter) {
		var splittedString, integerVersion;

		integerVersion = 0;
		if (delimiter) {
			splittedString = this.split(delimiter).reverse();
		}

		else {
			splittedString = this.split(".").reverse();
		}

		$.each(splittedString, function(index, value) {
			integerVersion += Math.pow(10000, index) * parseInt(value);
		});

		return integerVersion;
	}

	/**
	 * "1.2.3" returns 1
	 */
	String.prototype.majorVersion = function() {
		return parseInt(this.split(".")[0])
	}

	/**
	 * "1.2.3" returns 2
	 */
	String.prototype.minorVersion = function() {
		return parseInt(this.split(".")[1])
	}

	/**
	 * "1.2.3" returns 3
	 */
	String.prototype.buildVersion = function() {
		return parseInt(this.split(".")[2])
	}

	String.prototype.occurences = function(subString, allowOverlapping) {

		var string;
		string = this;
		subString += "";
		if (subString.length <= 0)
			return (string.length + 1);

		var n = 0, pos = 0, step = allowOverlapping ? 1 : subString.length;

		while (true) {
			pos = string.indexOf(subString, pos);
			if (pos >= 0) {
				++n;
				pos += step;
			} else
				break;
		}
		return n;
	}
}
