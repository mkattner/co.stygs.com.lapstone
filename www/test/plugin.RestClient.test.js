QUnit.module("plugin_RestClient");

QUnit.test("Add a webservice definition file with parameter.", function() {
	var testObject = {
		url : "files/ws.simpleObject.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	};

	ok(app.rc.addWsd("myLocalWebservice", testObject.url, testObject.method, testObject.timeout, testObject.cashable, testObject.cashInS, testObject.local), "app.rc.addWsd()");
	deepEqual(app.rc.getWsd("myLocalWebservice"), testObject, "app.rc.getWsd()");
	ok(app.rc.deleteWsd("myLocalWebservice"), "app.rc.deleteWsd()");
	equal(app.rc.getWsd("myLocalWebservice"), null, "app.rc.deleteWsd()")
});

QUnit.test("Add a webservice definition file as object.", function() {
	var testObject = {
		url : "files/ws.simpleObject.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	};

	ok(app.rc.addWsd("myLocalWebservice", testObject), "Add webservice definition as object.");
	deepEqual(app.rc.getWsd("myLocalWebservice"), testObject, "app.rc.getWsd()");
	ok(app.rc.deleteWsd("myLocalWebservice"), "app.rc.deleteWsd()");
	equal(app.rc.getWsd("myLocalWebservice"), null, "app.rc.deleteWsd()")

});

QUnit.skip("Get multible local json objects; async = false", function() {
	var simpleObjectWs = {
		url : "files/ws.simpleObject.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	}, simpleArrayWs = {
		url : "files/ws.simpleArray.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	}, nestedObjectWs = {
		url : "files/ws.simpleObject.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	}, nestedArrayWs = {
		url : "files/ws.simpleArray.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	};

	ok(app.rc.addWsd("simpleObject", simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", simpleArrayWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("nestedObject", nestedObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("nestedArray", nestedArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson(), "");

});

QUnit.skip("Get multible local json objects; async = true", function() {
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

QUnit.skip("Test fail: Get multible local json objects; async = true", function() {
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

QUnit.skip("Get a single local json object; async = false", function() {
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

QUnit.skip("Get a single local json object; async = true", function() {
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

QUnit.skip("Test fail: Get a single local json object; async = true", function() {
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
