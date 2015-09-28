/**
 * Copyright (c) 2015 martin.kattner@stygs.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

QUnit.module("plugin_RestClient");

QUnit.test("Add a webservice definition file with parameter.", function(assert) {
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
	equal(app.rc.getWsd("myLocalWebservice"), null, "app.rc.getWsd()")
});

QUnit.test("Add a webservice definition file as object.", function(assert) {
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
	equal(app.rc.getWsd("myLocalWebservice"), null, "app.rc.getWsd()")

});

// single JSON
QUnit.test("Get single local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject"), data.simpleObject, 'app.rc.getJson("simpleObject")');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

QUnit.test("Get single local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject", null), data.simpleObject, 'app.rc.getJson("simpleObject", null)');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

QUnit.test("Get single local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject", {}), data.simpleObject, 'app.rc.getJson("simpleObject", {})');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

QUnit.test("Get single local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject", {}, false), data.simpleObject, 'app.rc.getJson("simpleObject", {}, false)');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

QUnit.test("Get single local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject", {}, false, 0), data.simpleObject, 'app.rc.getJson("simpleObject", {}, false, 0)');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

QUnit.test("Get single local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject", {}, false, 1), data.simpleObject, 'app.rc.getJson("simpleObject", {}, false, 1)');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

// multiple JSON
QUnit.test("Get multiple local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject" ], [ "simpleArray" ] ]), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject" ], [ "simpleArray" ] ])');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", null ], [ "simpleArray", null ] ]), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", null ], [ "simpleArray", null ] ])');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ]), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ])');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 0), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 0)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 1), app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false), 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 1)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multible local json objects; async = false", function(assert) {

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("nestedObject", data.nestedObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("nestedArray", data.nestedArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ], [ "nestedObject", {} ], [ "nestedArray", {} ] ], false), {
		"nestedArray" : data.nestedArray,
		"nestedObject" : data.nestedObject,
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ], [ "nestedObject", {} ], [ "nestedArray", {} ] ], false)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("nestedObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("nestedArray"), "app.rc.deleteWsd()");

});

// single JSON async
QUnit.test("Get single local json object; async = true", function(assert) {
	var done = assert.async();

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");

	app.rc.getJson("simpleObject", {}, true).done(function(result) {
		deepEqual(result, data.simpleObject, 'app.rc.getJson("simpleObject", {}, true)');
		ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
		done();
	});

});

QUnit.test("Get single local json object; async = true", function(assert) {
	var done = assert.async();

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");

	app.rc.getJson("simpleObject", {}, true, 0).done(function(result) {
		deepEqual(result, data.simpleObject, 'app.rc.getJson("simpleObject", {}, true, 0)');
		ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
		done();
	});

});

QUnit.test("Get single local json object; async = true", function(assert) {
	var done = assert.async();

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");

	app.rc.getJson("simpleObject", {}, true, 1).done(function(result) {
		deepEqual(result, data.simpleObject, 'app.rc.getJson("simpleObject", {}, true, 1)');
		ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
		done();
	});

});

// multiple JSON async
QUnit.test("Get multiple local json object; async = true", function(assert) {
	var done = assert.async();

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], true).done(function(result) {

		deepEqual(result, {
			"simpleArray" : data.simpleArray,
			"simpleObject" : data.simpleObject
		}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false)');

		ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
		done();
	});

});

QUnit.test("Get multiple local json object; async = true", function(assert) {
	var done = assert.async();

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], true, 0).done(function(result) {

		deepEqual(result, {
			"simpleArray" : data.simpleArray,
			"simpleObject" : data.simpleObject
		}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 0)');

		ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
		done();
	});

});

QUnit.test("Get multiple local json object; async = true", function(assert) {
	var done = assert.async();

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], true, 1).done(function(result) {

		deepEqual(result, {
			"simpleArray" : data.simpleArray,
			"simpleObject" : data.simpleObject
		}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 1)');

		ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
		done();
	});

});

QUnit.test("Get multiple local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject" ], [ "simpleArray" ] ], false), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject" ], [ "simpleArray" ] ], false)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json object; async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", null ], [ "simpleArray", null ] ], false), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", null ], [ "simpleArray", null ] ], false)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});
