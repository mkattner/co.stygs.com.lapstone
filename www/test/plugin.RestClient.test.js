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
		cacheable : false,
		cacheInMs : null,
		local : true
	};

	ok(app.rc.addWsd("myLocalWebservice", testObject.url, testObject.method, testObject.timeout, testObject.cacheable, testObject.cacheInMs, testObject.local), "app.rc.addWsd()");
	deepEqual(app.rc.getWsd("myLocalWebservice"), testObject, "app.rc.getWsd()");
	ok(app.rc.deleteWsd("myLocalWebservice"), "app.rc.deleteWsd()");
	equal(app.rc.getWsd("myLocalWebservice"), null, "app.rc.getWsd()")
});

QUnit.test("Add a webservice definition file as object.", function(assert) {
	var testObject = {
		url : "files/ws.simpleObject.json",
		method : "get",
		timeout : 500,
		cacheable : false,
		cacheInMs : null,
		local : true
	};

	ok(app.rc.addWsd("myLocalWebservice", testObject), "Add webservice definition as object.");
	deepEqual(app.rc.getWsd("myLocalWebservice"), testObject, "app.rc.getWsd()");
	ok(app.rc.deleteWsd("myLocalWebservice"), "app.rc.deleteWsd()");
	equal(app.rc.getWsd("myLocalWebservice"), null, "app.rc.getWsd()")

});

// single JSON
QUnit.test("Get single local json object. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject"), data.simpleObject, 'app.rc.getJson("simpleObject")');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

QUnit.test("Get single local json object. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject", null), data.simpleObject, 'app.rc.getJson("simpleObject", null)');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

QUnit.test("Get single local json object. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject", {}), data.simpleObject, 'app.rc.getJson("simpleObject", {})');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

QUnit.test("Get single local json object. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	deepEqual(app.rc.getJson("simpleObject", {}, false), data.simpleObject, 'app.rc.getJson("simpleObject", {}, false)');
	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
});

QUnit.test("Get single local json object. async = false", function(assert) {
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
QUnit.test("Get multiple local json objects. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject" ], [ "simpleArray" ] ]), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject" ], [ "simpleArray" ] ])');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json objects. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", null ], [ "simpleArray", null ] ]), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", null ], [ "simpleArray", null ] ])');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json objects. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ]), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ])');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json objects. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json objects. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 0), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 0)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json objects. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 1), app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false), 'app.rc.getJson([ [ "simpleObject", {} ], [ "simpleArray", {} ] ], false, 1)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multible local json objects. async = false", function(assert) {

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
QUnit.test("Get single local json object. async = true", function(assert) {
	var done = assert.async();

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");

	app.rc.getJson("simpleObject", {}, true).done(function(result) {
		deepEqual(result, data.simpleObject, 'app.rc.getJson("simpleObject", {}, true)');
		ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
		done();
	});

});

QUnit.test("Get single local json object. async = true", function(assert) {
	var done = assert.async();

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");

	app.rc.getJson("simpleObject", {}, true, 0).done(function(result) {
		deepEqual(result, data.simpleObject, 'app.rc.getJson("simpleObject", {}, true, 0)');
		ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
		done();
	});

});

QUnit.test("Get single local json object. async = true", function(assert) {
	var done = assert.async();

	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");

	app.rc.getJson("simpleObject", {}, true, 1).done(function(result) {
		deepEqual(result, data.simpleObject, 'app.rc.getJson("simpleObject", {}, true, 1)');
		ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
		done();
	});

});

// multiple JSON async
QUnit.test("Get multiple local json objects. async = true", function(assert) {
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

QUnit.test("Get multiple local json objects. async = true", function(assert) {
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

QUnit.test("Get multiple local json objects. async = true", function(assert) {
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

QUnit.test("Get multiple local json objects. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject" ], [ "simpleArray" ] ], false), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject" ], [ "simpleArray" ] ], false)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

QUnit.test("Get multiple local json objects. async = false", function(assert) {
	ok(app.rc.addWsd("simpleObject", data.simpleObjectWs), "app.rc.addWsd()");
	ok(app.rc.addWsd("simpleArray", data.simpleArrayWs), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "simpleObject", null ], [ "simpleArray", null ] ], false), {
		"simpleArray" : data.simpleArray,
		"simpleObject" : data.simpleObject
	}, 'app.rc.getJson([ [ "simpleObject", null ], [ "simpleArray", null ] ], false)');

	ok(app.rc.deleteWsd("simpleObject"), "app.rc.deleteWsd()");
	ok(app.rc.deleteWsd("simpleArray"), "app.rc.deleteWsd()");

});

// caching
QUnit.test("Cache a webservice manually.", function(assert) {
	var result, webservice, done;

	webservice = {
		url : "files/ws.nestedObject.json",
		method : "get",
		timeout : 500,
		cacheable : true,
		cacheInMs : 500,
		local : true
	}

	done = assert.async();

	app.rc.addWsd("myLocalWebservice", webservice);

	result = app.rc.getJson("myLocalWebservice");
	assert.ok(app.rc.cacheJson("myLocalWebservice", null, result), 'app.rc.cacheJson("myLocalWebservice", null, result)');
	assert.deepEqual(app.rc.cacheJson("myLocalWebservice", null), data.nestedObject, 'app.rc.cacheJson("myLocalWebservice", null)');

	setTimeout(function() {
		assert.notOk(app.rc.cacheJson("myLocalWebservice", null), 'app.rc.cacheJson("myLocalWebservice", null)');

		app.rc.deleteWsd("myLocalWebservice");

		done();
	}, 500);

});

QUnit.test("Get multiple local cached json objects. async = false", function(assert) {
	var done;

	done = assert.async();

	ok(app.rc.addWsd("cacheableWs250", data.cacheableWs250), "app.rc.addWsd()");
	ok(app.rc.addWsd("cacheableWs500", data.cacheableWs500), "app.rc.addWsd()");

	deepEqual(app.rc.getJson([ [ "cacheableWs250", null ], [ "cacheableWs500", null ] ], false), {
		"cacheableWs250" : data.nestedObject,
		"cacheableWs500" : data.nestedObject
	}, 'app.rc.getJson([ [ "cacheableWs250", null ], [ "cacheableWs500", null ] ], false)');

	deepEqual(app.rc.getJson([ [ "cacheableWs250", null ], [ "cacheableWs500", null ] ], false), {
		"cacheableWs250" : data.nestedObject,
		"cacheableWs500" : data.nestedObject
	}, 'app.rc.getJson([ [ "cacheableWs250", null ], [ "cacheableWs500", null ] ], false)');

	assert.deepEqual(app.rc.cacheJson("cacheableWs250", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs250", null)');
	assert.deepEqual(app.rc.cacheJson("cacheableWs500", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs500", null)');

	setTimeout(function() {
		assert.notDeepEqual(app.rc.cacheJson("cacheableWs250", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs250", null)');
		assert.deepEqual(app.rc.cacheJson("cacheableWs500", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs500", null)');

		ok(app.rc.deleteWsd("cacheableWs250"), "app.rc.deleteWsd()");
		ok(app.rc.deleteWsd("cacheableWs500"), "app.rc.deleteWsd()");

		app.rc.removeCache("cacheableWs250");
		app.rc.removeCache("cacheableWs500");

		done();
	}, 250);

});

QUnit.test("Get multiple local cached json objects. async = true", function(assert) {
	var done;

	done = assert.async();

	ok(app.rc.addWsd("cacheableWs250", data.cacheableWs250), "app.rc.addWsd()");
	ok(app.rc.addWsd("cacheableWs500", data.cacheableWs500), "app.rc.addWsd()");

	app.rc.getJson([ [ "cacheableWs250", null ], [ "cacheableWs500", null ] ], true).done(function(result) {

		assert.deepEqual(result['cacheableWs250'], data.nestedObject, 'validate result');
		assert.deepEqual(result['cacheableWs500'], data.nestedObject, 'validate result');

		assert.deepEqual(app.rc.cacheJson("cacheableWs250", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs250", null)');
		assert.deepEqual(app.rc.cacheJson("cacheableWs500", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs500", null)');

		setTimeout(function() {
			assert.notDeepEqual(app.rc.cacheJson("cacheableWs250", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs250", null)');
			assert.deepEqual(app.rc.cacheJson("cacheableWs500", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs500", null)');

			ok(app.rc.deleteWsd("cacheableWs250"), "app.rc.deleteWsd()");
			ok(app.rc.deleteWsd("cacheableWs500"), "app.rc.deleteWsd()");

			app.rc.removeCache("cacheableWs250");
			app.rc.removeCache("cacheableWs500");

			done();
		}, 250);
	});

});

QUnit.test("Get a single local cached json object. async = true", function(assert) {
	var done;

	done = assert.async();

	ok(app.rc.addWsd("cacheableWs250", data.cacheableWs250), "app.rc.addWsd()");

	app.rc.getJson("cacheableWs250", null, true).done(function(result) {

		assert.deepEqual(result, data.nestedObject, 'validate result');

		assert.deepEqual(app.rc.cacheJson("cacheableWs250", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs250", null)');

		setTimeout(function() {
			assert.notDeepEqual(app.rc.cacheJson("cacheableWs250", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs250", null)');

			ok(app.rc.deleteWsd("cacheableWs250"), "app.rc.deleteWsd()");

			app.rc.removeCache("cacheableWs250");
			done();
		}, 250);
	});

});

QUnit.test("Get a single local cached json object. async = false", function(assert) {
	var done;

	done = assert.async();

	ok(app.rc.addWsd("cacheableWs250", data.cacheableWs250), "app.rc.addWsd()");

	deepEqual(app.rc.getJson("cacheableWs250", null, false), data.nestedObject, 'app.rc.getJson("cacheableWs250", null, false)');

	setTimeout(function() {
		assert.deepEqual(app.rc.cacheJson("cacheableWs250", null), data.nestedObject, 'app.rc.cacheJson("cacheableWs250", null)');

		ok(app.rc.deleteWsd("cacheableWs250"), "app.rc.deleteWsd()");

		app.rc.removeCache("cacheableWs250");
		done();
	}, 100);

});
