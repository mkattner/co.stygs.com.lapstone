// app.store.localStorage.clear();
var app = {
	config : {
		name : "app",
		min : false,
		useJQueryMobile : true,
		apacheCordova : null
	},
	addObject : function(name, object) {
		// alert("Add object to app: " + name);
		app[name] = object;
	}
};

function loadPlugins() {
	var success = true;

	// load plugins
	var url;
	if (app.config.min) {
		url = "../js/plugin/all.plugin.min.js";
	} else {
		url = "../js/plugin/plugins.js";
	}

	$.ajax({
		url : url,
		dataType : "script",
		async : false,
		success : function(data, textStatus, jqXHR) {
			;
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Fatal error in javascriptLoader.js: Can't load file. Url: " + url + " Error: " + textStatus);
			alert(errorThrown);
			success = false;
		}
	});
	plugins.constructor();

	return success;
}

function loadPages() {
	var success = true;
	// load pages
	var url;
	if (app.config.min) {
		url = "../js/page/all.page.min.js";
	} else {
		url = "../js/page/pages.js";
	}

	$.ajax({
		url : url,
		dataType : "script",
		async : false,
		success : function(data, textStatus, jqXHR) {
			;
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Fatal error in javascriptLoader.js: Can't load the pages. Url: " + url + " Error: " + textStatus);
			alert(errorThrown);
			success = false;
		}
	});

	pages.constructor();

	return success;
}

function JsonLoader(url) {
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
			alert("Fatal Error: Can't load JSON. Url: " + url + " Status: " + textStatus + " Thrown:" + JSON.stringify(jqXHR));
		}
	});
	return json;
}

function TextLoader(url) {
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

/* on cordova initialisation */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	app.debug.alert("cordova initialized", 30);
	app.config.apacheCordova = true;
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

	$.mobile.defaultPageTransition = 'none';
});

$(document).ready(function() {

	//$('body').append(TextLoader('../js/lapstone.html'));

	var configuration = JsonLoader("../js/lapstone.json");
	app.config.name = configuration.appname;
	app.config['startPage'] = configuration.startPage;
	app.config['startPage_loggedIn'] = configuration.startPage_loggedIn;

	var success = true;
	success = loadPlugins();
	success = loadPages();

	// load jQuery mobile
	if (app.config.useJQueryMobile) {
		var url = "../ext/jquery.mobile-1.4.4.min.js";
		$.ajax({
			url : url,
			dataType : "script",
			async : false,
			success : function(data, textStatus, jqXHR) {
				;
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Fatal error in javascriptLoader.js: Can't load jQuery mobile. Url: " + url + " Error: " + textStatus);
				alert(errorThrown);
				success = false;
			}
		});
	}

	app.debug.alert("app framework initialized", 30);
	// $('#LAPSTONE').remove();
	// app.store.localStorage.clear();
	// app.store.localStorage.show();
	// app.notify.add.alert("dasd", "sadsad", "asdsad");

});
