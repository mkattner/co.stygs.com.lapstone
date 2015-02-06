// app.store.localStorage.clear();
var app = {
	config : {
		name : "app",
		min : false,
		useJQueryMobile : true,
		apacheCordova : null,
		jQueryMobile : null
	},
	addObject : function(name, object) {
		// alert("Add object to app: " + name);
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
		app.config.name = configuration.appname;
		app.config['startPage'] = configuration.startPage;
		app.config['startPage_loggedIn'] = configuration.startPage_loggedIn;
		dfd.resolve();
	});

	promise.fail(function() {
		dfd.reject();
	});

	return dfd.promise();
}

function enchantPages() {
	var dfd = $.Deferred(), promise;

	promise = globalLoader.AsyncScriptLoader("../ext/jquery.mobile-1.4.5.min.js");

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
	AsyncJsonLoader : function(url) {
		var dfd = $.Deferred();
		$.ajax({
			url : url,
			async : true,
			dataType : "json",
			timeout : 5000,
			success : function(data) {
				dfd.resolve(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				initialisationPanel.changeStatus("Fatal Error: Can't load JSON. Url: " + url + " Status: " + textStatus + " Thrown:" + JSON.stringify(jqXHR));
				dfd.reject(textStatus);
			}
		});
		return dfd.promise();
	},
	JsonLoader : function(url) {
		var json = null;
		$.ajax({
			url : url,
			async : false,
			dataType : "json",
			success : function(data) {
				// alert(JSON.stringify(data));
				json = data;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				initialisationPanel.changeStatus("Fatal Error: Can't load JSON. Url: " + url + " Status: " + textStatus + " Thrown:" + JSON.stringify(jqXHR));
			}
		});
		return json;
	},
	AsyncScriptLoader : function(url) {
		var dfd = $.Deferred();
		$
				.ajax({
					url : url,
					async : true,
					dataType : "script",
					timeout : 5000,
					success : function(data) {
						window.setTimeout(function() {
							dfd.resolve(data);
						}, 200);

					},
					error : function(jqXHR, textStatus, errorThrown) {
						initialisationPanel.changeStatus("Fatal Error: Can't load Script. Url: " + url + " Status: " + textStatus + " Thrown:"
								+ JSON.stringify(jqXHR));

						dfd.reject(textStatus);
					}
				});
		return dfd.promise();
	},
	ScriptLoader : function(url) {
		$.ajax({
			url : url,
			async : false,
			dataType : "script",
			timeout : 5000,
			success : function(data) {

			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Fatal Error: Can't load Script. Url: " + url + " Status: " + textStatus + " Thrown:" + JSON.stringify(jqXHR));

			}
		});
	},
	AsyncTextLoader : function(url) {
		var dfd = $.Deferred();
		$.ajax({
			url : url,
			async : false,
			dataType : "text",
			success : function(data) {
				dfd.resolve(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				initialisationPanel.changeStatus("Fatal Error: Can't load Text. Url: " + url + " Status: " + textStatus);
				dfd.reject(textStatus);
			}
		});
		return dfd.promise();
	},
	TextLoader : function(url) {
		var text = null;
		$.ajax({
			url : url,
			async : false,
			dataType : "text",
			success : function(data) {
				// alert(JSON.stringify(data));
				text = data;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Fatal Error: Can't load TEXT. Url: " + url + " Status: " + textStatus);
			}
		});
		return text;
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
	//alert("cordova initialized", 30);
	app.config.apacheCordova = true;
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
		dfd.resolve();
	}

	return dfd.promise();
}

var initialisationPanel = {
	start : function() {
		var dfd = $.Deferred(), promise;

		promise = globalLoader.AsyncTextLoader('../js/lapstone.html');
		promise.done(function(data) {
			$('body').append(data);
			dfd.resolve();
		});
		promise.fail(function(e) {
			dfd.reject();
		});
		return dfd.promise();
	},
	changeStatus : function(status) {
		$("#LAPSTONE .lapstone-status").text(status);
	},
	finish : function() {
		$("#LAPSTONE").remove();
	}
}

var startupDefinition = [ {
	"status" : "start initialisation",
	"function" : initialisationPanel.start,
	"parameter" : "",
	"result" : ""
}, {
	"status" : "load configuration",
	"function" : loadConfiguration,
	"parameter" : "",
	"result" : ""
}, {
	"status" : "load plugins",
	"function" : loadPlugins,
	"parameter" : "",
	"result" : ""
}, {
	"status" : "load pages",
	"function" : loadPages,
	"parameter" : "",
	"result" : ""
}, {
	"status" : "enchant pages",
	"function" : enchantPages,
	"parameter" : "",
	"result" : ""
}, {
	"status" : "wait for mobileinit",
	"function" : waitForMobileinit,
	"parameter" : "",
	"result" : ""
}, {
	"status" : "wait for deviceready",
	"function" : waitForDeviceready,
	"parameter" : "",
	"result" : ""
} ]

var startup = {
	currentPosition : 0,
	dfd : $.Deferred(),
	promise : null,

	addFunction : function(status, func, parameter) {
		startupDefinition.splice(startup.currentPosition + 1, 0, {
			"status" : status,
			"function" : func,
			"parameter" : parameter,
			"result" : ""
		});
	},

	functionDone : function(data) {
		var promise;
		// console.log(startup.currentPosition + ": " +
		// startupDefinition[startup.currentPosition]['status'] + "
		// SUCCESSFUL");
		startup.currentPosition++;

		if (startupDefinition.length > startup.currentPosition) {
			console.log(startup.currentPosition + ": " + startupDefinition[startup.currentPosition]['status']);
			initialisationPanel.changeStatus(startupDefinition[startup.currentPosition]['status']);
			promise = startupDefinition[startup.currentPosition]['function'](startupDefinition[startup.currentPosition]['parameter']);
			promise.done(startup.functionDone);
			promise.fail(startup.functionFail);
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

			initialisationPanel.finish()
		}, 200);
	});

	inititalisationPromise.fail(function() {
		alert("framework fail");
	});
});
