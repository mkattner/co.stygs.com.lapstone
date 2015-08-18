module("plugin.Actions.js");
module("plugin.Debug.js");
module("plugin.Detector.js");
module("plugin.FormInputDesigner.js");
module("plugin.GlobalPages.js");
module("plugin.GlobalSettings.js");
module("plugin.HelperFunctions.js");
module("plugin.HTML5Storage.js");
test("Simple objects in HTML5's localStorage", function() {
	var testObject = {
		"string" : "string",
		"int" : 10,
		"null" : null,
		"boolean" : true,
		"double" : 12.51
	};
	equal(app.store.localStorage.setObject("object-name", testObject), true, "Set Object to Html5's localStorage");
	deepEqual(app.store.localStorage.getObject("object-name"), testObject, "Get the Object");
	equal(app.store.localStorage.removeObject("object-name"), true, "Remove the Object");
	equal(app.store.localStorage.getObject("object-name"), null, "Get the Object");
});

test("Complex objects in HTML5's localStorage", function() {
	var testObject = {
		"string" : "string",
		"int" : 10,
		"null" : null,
		"boolean" : true,
		"double" : 12.51,
		"object" : {
			"string" : "string",
			"int" : 10,
			"null" : null,
			"boolean" : true,
			"double" : 12.51,
			"object" : {
				"string" : "string",
				"int" : 10,
				"null" : null,
				"boolean" : true,
				"double" : 12.51
			}
		}
	};
	equal(app.store.localStorage.setObject("object-name", testObject), true, "Set Object to Html5's localStorage");
	deepEqual(app.store.localStorage.getObject("object-name"), testObject, "Get the Object");
	equal(app.store.localStorage.removeObject("object-name"), true, "Remove the Object");
	equal(app.store.localStorage.getObject("object-name"), null, "Get the Object");
});

test("Complex objects with numeric arrays in HTML5's localStorage", function() {
	var testObject = {
		"string" : "string",
		"int" : 10,
		"null" : null,
		"boolean" : true,
		"array" : [ "string", 10, null, true, 12.51 ],
		"object" : {
			"string" : "string",
			"int" : 10,
			"null" : null,
			"boolean" : true,
			"array" : [ "string", 10, null, true, 12.51 ],
			"object" : {
				"string" : "string",
				"int" : 10,
				"null" : null,
				"boolean" : true,
				"array" : [ "string", 10, null, true, 12.51 ]
			}
		}
	};
	equal(app.store.localStorage.setObject("object-name", testObject), true, "Set Object to Html5's localStorage");
	deepEqual(app.store.localStorage.getObject("object-name"), testObject, "Get the Object");
	equal(app.store.localStorage.removeObject("object-name"), true, "Remove the Object");
	equal(app.store.localStorage.getObject("object-name"), null, "Get the Object");
});

test("Complex objects with complex numeric arrays in HTML5's localStorage", function() {
	var testObject = {
		"string" : "string",
		"int" : 10,
		"null" : null,
		"boolean" : true,
		"array" : [ "string", 10, null, true, 12.51, {
			"string" : "string",
			"int" : 10,
			"null" : null,
			"boolean" : true
		}, [ "string", 10, null, true, 12.51 ], {}, [] ],
		"object" : {
			"string" : "string",
			"int" : 10,
			"null" : null,
			"boolean" : true,
			"array" : [ "string", 10, null, true, 12.51, {
				"string" : "string",
				"int" : 10,
				"null" : null,
				"boolean" : true
			}, [ "string", 10, null, true, 12.51 ], {}, [] ],
			"object" : {
				"string" : "string",
				"int" : 10,
				"null" : null,
				"boolean" : true,
				"array" : [ "string", 10, null, true, 12.51, {
					"string" : "string",
					"int" : 10,
					"null" : null,
					"boolean" : true
				}, [ "string", 10, null, true, 12.51 ], {}, [] ]
			}
		}
	};
	equal(app.store.localStorage.setObject("object-name", testObject), true, "Set Object to Html5's localStorage");
	deepEqual(app.store.localStorage.getObject("object-name"), testObject, "Get the Object");
	equal(app.store.localStorage.removeObject("object-name"), true, "Remove the Object");
	equal(app.store.localStorage.getObject("object-name"), null, "Get the Object");
});

test("Datatypes in HTML5's localStorage", function() {
	ok(app.store.localStorage.set("int", 7), "Set an integer to localStorage");
	ok(app.store.localStorage.set("bool", true), "Set a boolean to localStorage");
	ok(app.store.localStorage.set("string", "string"), "Set a string to localStorage");
	ok(app.store.localStorage.set("double", 12.51), "Set a double to localStorage");
	equal(app.store.localStorage.get("int"), 7, "Get the integer");
	equal(app.store.localStorage.get("bool"), true, "Get the boolean");
	equal(app.store.localStorage.get("string"), "string", "Get the string");
	equal(app.store.localStorage.get("double"), 12.51, "Get the integer");
});

module("plugin.HtmlTemplates.js");
module("plugin.ImageProvider.js");
module("plugin.Informator.js");
module("plugin.jQueryExtend.js");
module("plugin.KeyValueStack.js");
module("plugin.LoadExternalScripts.js");
module("plugin.MultilanguageIso639_3.js");
module("plugin.native_batteryStatus.js");
module("plugin.native_camera.js");
module("plugin.native_console.js");
module("plugin.native_contacts.js");
module("plugin.native_cordova.js");
module("plugin.native_device.js");
module("plugin.native_deviceMotion.js");
module("plugin.native_deviceOrientation.js");
module("plugin.native_dialogs.js");
module("plugin.native_file.js");
module("plugin.native_fileTransfer.js");
module("plugin.native_geolocation.js");
module("plugin.native_globalization.js");
module("plugin.native_inappbrowser.js");
module("plugin.native_media.js");
module("plugin.native_mediaCapture.js");
module("plugin.native_networkInformation.js");
module("plugin.native_splashcreen.js");
module("plugin.native_statusbar.js");
module("plugin.native_vibration.js");
module("plugin.Notification.js");
module("plugin.RestClient.js");
test("Add a webservice definition", function() {
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice1", "files/webservice1.json", "get", 500, null, true), "Add a webservice definition");
});
test("Get multible local json objects; async = false", function() {
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice1", "files/webservice1.json", "get", 500, null, true), "Add a webservice definition (webservice1)");
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice2", "files/webservice2.json", "get", 500, null, true), "Add a webservice definition (webservice2)");
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice3", "files/webservice3.json", "get", 500, null, true), "Add a webservice definition (webservice3)");
	deepEqual(plugin_RestClient.functions.getJson([ [ 'webservice1' ], [ 'webservice2', {} ], [ 'webservice3', null ] ], false), {
		"webservice1" : {
			"name" : "webservice1",
			"success" : true
		},
		"webservice2" : {
			"name" : "webservice2",
			"success" : true
		},
		"webservice3" : {
			"name" : "webservice3",
			"success" : true
		}
	}, "plugin_RestClient.functions.getJson([['webservice', {parameter}], ['', {}], ...], async); async =  false");

});
test("Get multible local json objects; async = true", function() {
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice1", "files/webservice1.json", "get", 500, null, true), "Add a webservice definition (webservice1)");
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice2", "files/webservice2.json", "get", 500, null, true), "Add a webservice definition (webservice2)");
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice3", "files/webservice3.json", "get", 500, null, true), "Add a webservice definition (webservice3)");
	stop();
	var promise = plugin_RestClient.functions.getJson([ [ 'webservice1' ], [ 'webservice2', {} ], [ 'webservice3', null ] ], true);
	promise.done(function(jsonObject) {
		deepEqual(jsonObject, {
			"webservice1" : {
				"name" : "webservice1",
				"success" : true
			},
			"webservice2" : {
				"name" : "webservice2",
				"success" : true
			},
			"webservice3" : {
				"name" : "webservice3",
				"success" : true
			}
		}, "Success: plugin_RestClient.functions.getJson([['webservice', {parameter}], ['', {}], ...], async); async =  true");
	});
	promise.fail(function(failObject) {
		ok(false, "Failed: plugin_RestClient.functions.getJson([['webservice', {parameter}], ['', {}], ...], async); async =  true");
	});
	promise.always(function() {
		ok(true, "Finish: plugin_RestClient.functions.getJson([['webservice', {parameter}], ['', {}], ...], async); async =  true")
		start();
	});

});

test("Test fail: Get multible local json objects; async = true", function() {
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice1", "files/webservice1.json", "get", 500, null, true), "Add a webservice definition (webservice1)");
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice2", "files/webservice2.json", "get", 500, null, true), "Add a webservice definition (webservice2)");
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice4", "files/webservice4.json", "get", 500, null, true), "Add a webservice definition (webservice4)");
	stop();
	var promise = plugin_RestClient.functions.getJson([ [ 'webservice1' ], [ 'webservice2', {} ], [ 'webservice4', null ] ], true);
	promise.done(function(jsonObject) {
		ok(false, "Success: plugin_RestClient.functions.getJson([['webservice', {parameter}], ['', {}], ...], async); async =  true");
	});
	promise.fail(function(failObject) {
		deepEqual(failObject, {
			"call" : {
				"async" : true,
				"data" : "",
				"mehtod" : "get",
				"timeout" : 500,
				"type" : "json",
				"url" : "files/webservice4.json"
			},
			"jqXHR" : {
				"readyState" : 0,
				"status" : 0,
				"statusText" : "error"
			}
		}, "Failed: plugin_RestClient.functions.getJson([['webservice', {parameter}], ['', {}], ...], async); async =  true");
	});
	promise.always(function() {
		ok(true, "Finish: plugin_RestClient.functions.getJson([['webservice', {parameter}], ['', {}], ...], async); async =  true")
		start();
	});

});

test("Get a single local json object; async = false", function() {
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice1", "files/webservice1.json", "get", 500, null, true), "Add a webservice definition (webservice1)");
	deepEqual(plugin_RestClient.functions.getJson("webservice1"), {
		"name" : "webservice1",
		"success" : true
	}, "Call plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = undefined");
	deepEqual(plugin_RestClient.functions.getJson("webservice1", null), {
		"name" : "webservice1",
		"success" : true
	}, "Call plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = null");
	deepEqual(plugin_RestClient.functions.getJson("webservice1", {}), {
		"name" : "webservice1",
		"success" : true
	}, "Call plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = {}");
	deepEqual(plugin_RestClient.functions.getJson("webservice1", null, false), {
		"name" : "webservice1",
		"success" : true
	}, "Call plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = null & async = false");
	deepEqual(plugin_RestClient.functions.getJson("webservice1", null, null), {
		"name" : "webservice1",
		"success" : true
	}, "Call plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = null & async = null");
});

test("Get a single local json object; async = true", function() {
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice2", "files/webservice2.json", "get", 500, null, true), "Add a webservice definition (webservice2)");
	var promise = plugin_RestClient.functions.getJson("webservice2", null, true);
	stop();
	promise.done(function(json) {
		deepEqual(json, {
			"name" : "webservice2",
			"success" : true
		}, "Success: plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = null");
	});
	promise.fail(function(jqXHR) {
		ok(false, "Failed: plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = null");
	});
	promise.always(function() {
		ok(true, "Finish: plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = null")
		start();
	});
});

test("Test fail: Get a single local json object; async = true", function() {
	ok(plugin_RestClient.functions.addWebserviceDefinition("webservice4", "files/webservice4.json", "get", 500, null, true), "Add a webservice definition (webservice4)");
	var promise = plugin_RestClient.functions.getJson("webservice4", null, true);
	stop();
	promise.done(function(json) {
		ok(false, "Success: plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = null");

	});
	promise.fail(function(jqXHR) {
		deepEqual(jqXHR, {
			"call" : {
				"async" : true,
				"data" : "",
				"mehtod" : "get",
				"timeout" : 500,
				"type" : "json",
				"url" : "files/webservice4.json"
			},
			"jqXHR" : {
				"readyState" : 0,
				"status" : 0,
				"statusText" : "error"
			}
		}, "Failed: plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = null");

	});
	promise.always(function() {
		ok(true, "Finish: plugin_RestClient.functions.getJson(webservice, parameter, async): parameter object = null")
		start();
	});
});

module("plugin.WebServiceClient.js");
module("plugins.js");
