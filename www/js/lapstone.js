/*
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

/**
 * @author Martin Kattner <martin.kattner@gmail.com>
 */

// app.store.localStorage.clear();
// window.localStorage.clear();
var app = {
	config : {
		// name : "app",
		useJQueryMobile : true,
		apacheCordova : null,
		jQueryMobile : null
	},

	addObject : function(name, object) {
		console.log("Deprecated Function!");
		app[name] = object;
	}
};

function loadPlugins() {
	var dfd = $.Deferred(), url, promise;

	if (app.config.min) {
		url = "../js/plugin/all.plugin.min.js";
	} else {
		url = "../js/plugin/plugins.js";
	}

	// load the plugins file
	promise = globalLoader.AsyncScriptLoader(url);
	promise.done(function() {
		startup.addFunction("plugin constructor", plugins.constructor, "");
		// plugins.constructor();
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
		url = "../js/page/all.page.min.js";
	} else {
		url = "../js/page/pages.js";
	}

	// load pages file
	promise = globalLoader.AsyncScriptLoader(url);
	promise.done(function() {
		startup.addFunction("page constructor", pages.constructor, "");
		// pages.constructor();
		dfd.resolve();
	});
	promise.fail(function() {
		dfd.reject();
	});

	return dfd.promise();
}

function loadConfiguration() {
	var dfd = $.Deferred(), promise;

	promise = globalLoader.AsyncJsonLoader("../js/lapstone.json");

	promise.done(function(configuration) {
		//
		// $.each(configuration, function(k, v) {
		// app.config[k] = v
		// });

		$.extend(true, app.config, configuration);

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
		var lapstone_split = app.config.version.lapstone.split('.', 3), lapstone_int = "", currentKey, currentInt;

		for (currentKey in lapstone_split) {
			currentInt = lapstone_split[currentKey];
			lapstone_int += Math.pow(10, parseInt(4 - currentInt.toString().length)).toString().substring(1).toString() + currentInt;
		}
		app.config.version['lapstone_int'] = parseInt(lapstone_int);

		var app_split = app.config.version.app.split('.', 3), app_int = "", currentKey, currentInt;
		for (currentKey in app_split) {
			currentInt = app_split[currentKey];
			app_int += Math.pow(10, parseInt(4 - currentInt.toString().length)).toString().substring(1).toString() + currentInt;
		}
		app.config.version['app_int'] = parseInt(app_int);

		$('title').text(app.config.title);

		dfd.resolve();
	});

	promise.fail(function() {
		dfd.reject();
	});

	return dfd.promise();
}

function updateFramework() {
	var dfd = $.Deferred();

	var currentLapstoneVersion, oldLapstoneVersion, currentAppVersion, oldAppVersion, currentAppVersion_int, currentLapstoneVersion_int;

	currentAppVersion = app.config.version.app;
	currentLapstoneVersion = app.config.version.lapstone;

	currentAppVersion_int = app.config.version.app_int;
	currentLapstoneVersion_int = app.config.version.lapstone_int;

	plugin_Informator.loadConfigurationIntoHtml5Storage({
		"app" : {
			"config" : {
				"version" : app.config.version
			}
		}
	});

	oldLapstoneVersion = app.config.version.lapstone;
	oldAppVersion = app.config.version.app;

	if (app.config.version.update === true) {
		console.warn("update done");
	}
	// alert(currentAppVersion + oldAppVersion + currentLapstoneVersion +
	// oldLapstoneVersion);
	if (currentLapstoneVersion != oldLapstoneVersion || currentAppVersion != oldAppVersion) {
		console.warn("TODO Lastone || App Version Update");
		// alert("do update")
		app.info.set("app.config.version.update", true);

		app.info.set("app.config.version.app", currentAppVersion);
		app.info.set("app.config.version.lapstone", currentLapstoneVersion);
		app.info.set("app.config.version.app_int", currentAppVersion_int);
		app.info.set("app.config.version.lapstone_int", currentLapstoneVersion_int);
		// reload

		location.reload();
	}

	dfd.resolve();
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

function enchantPages() {
	var dfd = $.Deferred(), promise;

	promise = globalLoader.AsyncScriptLoader("../ext/jQueryMobile/jquery.mobile.min.js");

	promise.done(function() {
		initialisationPanel.changeStatus("jquery mobile  loaded");

		dfd.resolve();

	});

	promise.fail(function() {
		dfd.reject();
	});

	return dfd.promise();
}

var globalLoader = {
	globalTimeout : 10000,
	globalAttempts : 3,

	AsyncJsonLoader : function(url, attempts, attempt, dfd) {

		if (dfd == undefined)
			dfd = $.Deferred();

		if (attempt == undefined)
			attempt = 1;

		if (attempts == undefined)
			attempts = globalLoader.globalAttempts;

		$.ajax({
			cache : cacheAjax(),
			url : url,
			async : true,
			dataType : "json",
			timeout : globalLoader.globalTimeout
		}).done(function(data, textStatus, jqXHR) {
			if (textStatus === "timeout") {
				startup.log("Timeout while loading: " + url);
				startup.log("It was attempt " + attempt + " of " + attempts + ".");
				if (attempt < attempts) {
					startup.log("So we try again.");
					globalLoader.AsyncJsonLoader(url, attempts, attempt + 1, dfd);
				} else {
					startup.log("So the framework loading fails.");
					dfd.reject(textStatus);
				}
			} else {
				dfd.resolve(data);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (attempt < attempts) {
				globalLoader.AsyncJsonLoader(url, attempts, attempt + 1, dfd);
			} else {
				initialisationPanel.changeStatus("Fatal Error: Can't load JSON. Url: " + url + " Status: " + textStatus);
				dfd.reject(textStatus);
			}
		});

		return dfd.promise();
	},

	JsonLoader : function(url, attempts, attempt) {
		console.warn("Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + url);
		var json = null;
		$.ajax({
			cache : cacheAjax(),
			url : url,
			async : false,
			dataType : "json",
			timeout : globalLoader.globalTimeout,
			success : function(data) {
				// alert(JSON.stringify(data));
				json = data;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				initialisationPanel.changeStatus("Fatal Error: Can't load JSON. Url: " + url + " Status: " + textStatus);
			}
		});
		return json;
	},

	AsyncScriptLoader : function(url, attempts, attempt, dfd) {

		if (dfd == undefined)
			dfd = $.Deferred();

		if (attempt == undefined)
			attempt = 1;

		if (attempts == undefined)
			attempts = globalLoader.globalAttempts;

		$.ajax({
			cache : cacheAjax(),
			url : url,
			async : true,
			dataType : "script",
			timeout : globalLoader.globalTimeout
		}).done(function(data, textStatus, jqXHR) {
			if (textStatus === "timeout") {
				startup.log("Timeout while loading: " + url);
				startup.log("It was attempt " + attempt + " of " + attempts + ".");
				if (attempt < attempts) {
					startup.log("So we try again.");
					globalLoader.AsyncScriptLoader(url, attempts, attempt + 1, dfd);
				} else {
					startup.log("So the framework loading fails.");
					dfd.reject(textStatus);
				}
			} else {
				window.setTimeout(function() {
					dfd.resolve(data);
				}, 200);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (attempt < attempts) {
				globalLoader.AsyncScriptLoader(url, attempts, attempt + 1, dfd);
			} else {
				initialisationPanel.changeStatus("Fatal Error: Can't load Script. Url: " + url + " Status: " + textStatus);
				dfd.reject(textStatus);
			}
		});
		return dfd.promise();
	},

	ScriptLoader : function(url, attempts, attempt) {
		console.warn("Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + url);
		$.ajax({
			cache : cacheAjax(),
			url : url,
			async : false,
			dataType : "script",
			timeout : globalLoader.globalTimeout,
			success : function(data) {

			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Fatal Error: Can't load Script. Url: " + url + " Status: " + textStatus);

			}
		});
	},

	AsyncTextLoader : function(url, attempts, attempt, dfd) {

		if (dfd == undefined)
			dfd = $.Deferred();

		if (attempt == undefined)
			attempt = 1;

		if (attempts == undefined)
			attempts = globalLoader.globalAttempts;

		$.ajax({
			cache : cacheAjax(),
			url : url,
			async : true,
			dataType : "text",
			timeout : globalLoader.globalTimeout
		}).done(function(data, textStatus, jqXHR) {
			if (textStatus === "timeout") {
				startup.log("Timeout while loading: " + url);
				startup.log("It was attempt " + attempt + " of " + attempts + ".");
				if (attempt < attempts) {
					startup.log("So we try again.");
					globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
				} else {
					startup.log("So the framework loading fails.");
					dfd.reject(textStatus);
				}
			} else {
				dfd.resolve(data);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (attempt < attempts) {
				globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
			} else {
				initialisationPanel.changeStatus("Fatal Error: Can't load Text. Url: " + url + " Status: " + textStatus);
				dfd.reject(textStatus);
			}
		});
		return dfd.promise();
	},

	TextLoader : function(url, attempts, attempt) {
		console.warn("Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. URL: " + url);
		var text = null;
		$.ajax({
			cache : cacheAjax(),
			url : url,
			async : false,
			dataType : "text",
			timeout : globalLoader.globalTimeout,
			success : function(data) {
				// alert(JSON.stringify(data));
				text = data;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Fatal Error: Can't load TEXT. Url: " + url + " Status: " + textStatus);
			}
		});
		return text;
	},

	AsyncStyleLoader : function(url, attempts, attempt, dfd) {

		if (dfd == undefined)
			dfd = $.Deferred();

		if (attempt == undefined)
			attempt = 1;

		if (attempts == undefined)
			attempts = globalLoader.globalAttempts;

		$.ajax({
			url : url,
			async : true,
			dataType : "text",
			timeout : globalLoader.globalTimeout
		}).done(function(data, textStatus, jqXHR) {
			// console.log("+++++++ " + JSON.stringify(jqXHR));
			if (textStatus === "timeout") {
				startup.log("Timeout while loading: " + url);
				startup.log("It was attempt " + attempt + " of " + attempts + ".");
				if (attempt < attempts) {
					startup.log("So we try again.");
					globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
				} else {
					startup.log("So the framework loading fails.");
					dfd.reject(textStatus);
				}
			} else {
				if ($("style")[0] == undefined)
					$('head').append("<style></style>");

				$("style").before('<link rel="stylesheet" type="text/css" href="' + url + '">');
				dfd.resolve(data);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (attempt < attempts) {
				globalLoader.AsyncTextLoader(url, attempts, attempt + 1, dfd);
			} else {
				initialisationPanel.changeStatus("Fatal Error: Can't load Text. Url: " + url + " Status: " + textStatus);
				dfd.reject(textStatus);
			}
		});
		return dfd.promise();
	},

	StyleLoader : function(url, attempts, attempt) {
		var css, cssLink;

		if (!cacheAjax())
			cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '?_=' + new Date().getTime() + '">';
		else
			cssLink = '<link rel="stylesheet" type="text/css" href="' + url + '">';

		$("head").append(cssLink);
	}
}

$(document).bind("mobileinit", function() {
	app.debug.alert("jQuery mobile initialized", 30);
	$.mobile.ajaxEnabled = true;
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.page.prototype.options.domCache = false;

	$.mobile.loader.prototype.options.text = "loading";
	$.mobile.loader.prototype.options.textVisible = false;
	$.mobile.loader.prototype.options.theme = "a";
	$.mobile.loader.prototype.options.html = "";

	$.mobile.defaultPageTransition = 'slide';
	app.config.jQueryMobile = true;
});

/* on cordova initialisation */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	// alert("cordova initialized", 30);
	app.config.apacheCordova = true;
	$('body').addClass("app-apache-cordova");
}

function waitForMobileinit() {
	var dfd = $.Deferred(), interval;

	interval = setInterval(function() {
		if (app.config.jQueryMobile == true) {
			dfd.resolve();
			clearInterval(interval);
		}
	}, 50);

	return dfd.promise();
}

function waitForDeviceready() {
	var dfd = $.Deferred(), interval;
	// alert(window.cordova);
	if (window.cordova) {
		interval = setInterval(function() {
			clearInterval(interval);
			if (app.config.apacheCordova == true) {
				dfd.resolve();

			}
		}, 50);
	} else {
		app.config.apacheCordova = false;
		dfd.resolve();
	}

	return dfd.promise();
}

var initialisationPanel = {
	panel : null,
	start : function() {
		var dfd = $.Deferred(), promise;

		$('head').append("<title>");
		$('title').text("...");

		promise = globalLoader.AsyncTextLoader('../js/lapstone.html');
		globalLoader.StyleLoader("../js/lapstone.css");
		promise.done(function(data) {
			var interval;
			initialisationPanel.panel = data;

			initialisationPanel.show();

			// preload images
			$.each(startupDefinition, function(index, object) {

				startup.images[object.image] = {};

				startup.images[object.image]['startup'] = new Image();
				startup.images[object.image]['startup'].src = "../images/lapstone/init_" + object.image + "_startup.png";

				startup.images[object.image]['success'] = new Image();
				startup.images[object.image]['success'].src = "../images/lapstone/init_" + object.image + "_success.png";
			});

			interval = setInterval(function() {
				var loaded = true;
				for (imgKey in startup.images) {
					if (startup.images[imgKey].startup.complete && startup.images[imgKey].success.complete) {
						;
					} else {
						loaded = false;
					}
				}

				if (loaded == true) {
					clearInterval(interval);
					for (imgKey in startup.images) {
						$("#lapstone-progress").append($('<img>', {
							id : 'imgInit-' + imgKey,
							src : startup.images[imgKey].startup.src,
							alt : imgKey
						}).addClass("lapstone-startup-image"));
					}
					dfd.resolve();
				}

			}, 10);

		});

		promise.fail(function(e) {
			dfd.reject();
		});
		return dfd.promise();
	},
	show : function(status) {
		$('body').append(initialisationPanel.panel);
		if (status !== undefined)
			initialisationPanel.changeStatus(status);
	},
	hide : function() {
		$("#LAPSTONE").remove();
	},
	changeStatus : function(status) {
		$("#LAPSTONE .lapstone-status").text(status);
	},
	alterImage : function(imgKey) {
		// console.log(imgKey)
		$("#imgInit-" + imgKey).replaceWith($('<img>', {
			id : 'imgInit-' + imgKey,
			src : startup.images[imgKey].success.src,
			alt : imgKey
		}).addClass("lapstone-startup-image"));
	},
	finish : function() {
		initialisationPanel.hide();
	}
}

var startupDefinition = [ {
	"status" : "lapstone starts initialisation",
	"function" : initialisationPanel.start,
	"parameter" : "",
	"result" : "",
	"image" : "start"
}, {
	"status" : "lapstone is loading the configuration",
	"function" : loadConfiguration,
	"parameter" : "",
	"result" : "",
	"image" : "configuration"
}, {
	"status" : "lapstone is loading the plugins",
	"function" : loadPlugins,
	"parameter" : "",
	"result" : "",
	"image" : "plugins"
}, {
	"status" : "lapstone is loading the pages",
	"function" : loadPages,
	"parameter" : "",
	"result" : "",
	"image" : "pages"
}, {
	"status" : "lapstone is checking for updates",
	"function" : updateFramework,
	"parameter" : "",
	"result" : "",
	"image" : "updates"
}, {
	"status" : "lapstone enchants the pages",
	"function" : enchantPages,
	"parameter" : "",
	"result" : "",
	"image" : "enchantment"
}, {
	"status" : "lapstone waits for jQuerys' mobileinit event",
	"function" : waitForMobileinit,
	"parameter" : "",
	"result" : "",
	"image" : "mobileinit"
}, {
	"status" : "lapstone waits for apache cordovas' deviceready event",
	"function" : waitForDeviceready,
	"parameter" : "",
	"result" : "",
	"image" : "deviceready"
} ]

var startup = {
	currentPosition : 0,
	dfd : $.Deferred(),
	promise : null,
	images : {},

	addFunction : function(status, func, parameter) {
		startupDefinition.splice(startup.currentPosition + 1, 0, {
			"status" : status,
			"function" : func,
			"parameter" : parameter,
			"result" : ""
		});
	},

	log : function(text) {
		console.log(text);
	},

	functionDone : function(data) {
		var promise;

		if (startupDefinition[startup.currentPosition]['image'] != undefined)
			initialisationPanel.alterImage(startupDefinition[startup.currentPosition]['image']);

		startup.currentPosition++;

		if (startupDefinition.length > startup.currentPosition) {
			startup.log(startup.currentPosition + ": " + startupDefinition[startup.currentPosition]['status']);
			initialisationPanel.changeStatus(startupDefinition[startup.currentPosition]['status']);

			// delay startup for a smoother user experience
			window.setTimeout(function() {
				promise = startupDefinition[startup.currentPosition]['function'](startupDefinition[startup.currentPosition]['parameter']);
				promise.done(startup.functionDone);
				promise.fail(startup.functionFail);
			}, 50);

			// alert('next')
		} else {
			startup.dfd.resolve();
		}
	},

	functionFail : function() {
		console.log(startup.currentPosition + ": " + startupDefinition[startup.currentPosition]['status'] + " FAILED");
		startup.dfd.reject();
	},

	initFramework : function() {
		var promise = startupDefinition[0]['function'](startupDefinition[0]['parameter']);

		promise.done(startup.functionDone);
		promise.fail(startup.functionFail);
		return startup.dfd.promise();
	}
}

// jquery loaded
$(document).ready(function() {
	var inititalisationPromise = startup.initFramework();

	inititalisationPromise.done(function() {
		// alert("init done");
		setTimeout(function() {
			initialisationPanel.finish();
			// console.clear();
		}, 200);
	}).fail(function() {
		if (confirm("App loading failed. Confirm to reload the app."))
			location.reload();
		else
			alert("App loading failed. Close the app and restart again");
	}).always(function() {
		// alert();
		app.info.set("app.config.version.update", false);
	});

});

function handleOpenURL(url) {
	// TODO: parse the url, and do something
	setTimeout(function() {
		alert(url);
	}, 0);
}
