QUnit.module("plugin_HTML5Storage");

QUnit.test("Simple mixed objects in localStorage", function() {
	var testObject = {
		"string" : "string",
		"int" : 10,
		"null" : null,
		"boolean true" : true,
		"boolean false" : false,
		"double" : 12.51
	};
	equal(app.store.localStorage.setObject("object-name", testObject), true, "app.store.localStorage.setObject()");
	deepEqual(app.store.localStorage.getObject("object-name"), testObject, "app.store.localStorage.getObject()");
	equal(app.store.localStorage.removeObject("object-name"), true, "app.store.localStorage.removeObject()");
	equal(app.store.localStorage.getObject("object-name"), null, "app.store.localStorage.getObject()");
	ok(true, JSON.stringify(testObject));
});

QUnit.test("Simple integer arrays in localStorage", function() {
	var testArray = [ 1, 2, 3, 4, 5, 6 ];
	equal(app.store.localStorage.setObject("object-name", testArray), true, "app.store.localStorage.setObject()");
	deepEqual(app.store.localStorage.getObject("object-name"), testArray, "app.store.localStorage.getObject()");
	equal(app.store.localStorage.removeObject("object-name"), true, "app.store.localStorage.removeObject()");
	equal(app.store.localStorage.getObject("object-name"), null, "app.store.localStorage.getObject()");
	ok(true, JSON.stringify(testArray));
});

QUnit.test("Simple float arrays in localStorage", function() {
	var testArray = [ 1.1, 2.1, 3.1, 4.1, 5.1, 6.1 ];
	equal(app.store.localStorage.setObject("object-name", testArray), true, "app.store.localStorage.setObject()");
	deepEqual(app.store.localStorage.getObject("object-name"), testArray, "app.store.localStorage.getObject()");
	equal(app.store.localStorage.removeObject("object-name"), true, "app.store.localStorage.removeObject()");
	equal(app.store.localStorage.getObject("object-name"), null, "app.store.localStorage.getObject()");
	ok(true, JSON.stringify(testArray));
});

QUnit.test("Simple mixed arrays in localStorage", function() {
	var testArray = [ "string", 10, null, true, false, 6.1 ];
	equal(app.store.localStorage.setObject("object-name", testArray), true, "app.store.localStorage.setObject()");
	deepEqual(app.store.localStorage.getObject("object-name"), testArray, "app.store.localStorage.getObject()");
	equal(app.store.localStorage.removeObject("object-name"), true, "app.store.localStorage.removeObject()");
	equal(app.store.localStorage.getObject("object-name"), null, "app.store.localStorage.getObject()");
	ok(true, JSON.stringify(testArray));
});

QUnit.test("Nested mixed objects in localStorage", function() {
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
	equal(app.store.localStorage.setObject("object-name", testObject), true, "app.store.localStorage.setObject()");
	deepEqual(app.store.localStorage.getObject("object-name"), testObject, "app.store.localStorage.getObject()");
	equal(app.store.localStorage.removeObject("object-name"), true, "app.store.localStorage.removeObject()");
	equal(app.store.localStorage.getObject("object-name"), null, "app.store.localStorage.getObject()");
	ok(true, JSON.stringify(testObject));
});

QUnit.test("Nested integer arrays in localStorage", function() {
	var testArray = [ [ 11, 12 ], [ 21, 22 ], [ 31, 32 ], [ 41, 42 ], [ 51, 52 ], [ 61, 62 ] ];
	equal(app.store.localStorage.setObject("object-name", testArray), true, "app.store.localStorage.setObject()");
	deepEqual(app.store.localStorage.getObject("object-name"), testArray, "app.store.localStorage.getObject()");
	equal(app.store.localStorage.removeObject("object-name"), true, "app.store.localStorage.removeObject()");
	equal(app.store.localStorage.getObject("object-name"), null, "app.store.localStorage.getObject()");
	ok(true, JSON.stringify(testArray));
});

QUnit.test("Nested mixed arrays in localStorage", function() {
	var testArray = [ [ "string1", "string2" ], [ true, false ], [ null ], [ 1.1, 1.2 ], [ [ [ "string", true, null ], [ 4711 ] ] ], [ 61, 62 ] ];
	equal(app.store.localStorage.setObject("object-name", testArray), true, "app.store.localStorage.setObject()");
	deepEqual(app.store.localStorage.getObject("object-name"), testArray, "app.store.localStorage.getObject()");
	equal(app.store.localStorage.removeObject("object-name"), true, "app.store.localStorage.removeObject()");
	equal(app.store.localStorage.getObject("object-name"), null, "app.store.localStorage.getObject()");
	ok(true, JSON.stringify(testArray));
});

QUnit.skip("Empty array in localStorage", function() {
	var testArray = [];
	equal(app.store.localStorage.setObject("object-name", testArray), true, "app.store.localStorage.setObject()");
	deepEqual(app.store.localStorage.getObject("object-name"), testArray, "app.store.localStorage.getObject()");
	equal(app.store.localStorage.removeObject("object-name"), true, "app.store.localStorage.removeObject()");
	equal(app.store.localStorage.getObject("object-name"), null, "app.store.localStorage.getObject()");
	ok(true, JSON.stringify(testArray));
});

QUnit.skip("Nested empty arrays in localStorage", function() {
	var testArray = [ [ [ [ [] ] ] ], [ [ [], [] ], [] ], [ [], [ [], [] ] ], [ [] ] ];
	equal(app.store.localStorage.setObject("object-name", testArray), true, "app.store.localStorage.setObject()");
	deepEqual(app.store.localStorage.getObject("object-name"), testArray, "app.store.localStorage.getObject()");
	equal(app.store.localStorage.removeObject("object-name"), true, "app.store.localStorage.removeObject()");
	equal(app.store.localStorage.getObject("object-name"), null, "app.store.localStorage.getObject()");
	ok(true, JSON.stringify(testArray));
});

QUnit.test("Nested objects with arrays in localStorage", function() {
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
	ok(true, JSON.stringify(testObject));
});

QUnit.test("Objects in arrays in localStorage", function() {
	var testArray = [ {
		"element" : "element"
	} ];

	equal(app.store.localStorage.setObject("object-name", testArray), true, "Set Object to Html5's localStorage");
	deepEqual(app.store.localStorage.getObject("object-name"), testArray, "Get the Object");
	equal(app.store.localStorage.removeObject("object-name"), true, "Remove the Object");
	equal(app.store.localStorage.getObject("object-name"), null, "Get the Object");
	ok(true, JSON.stringify(testArray));
});

QUnit.test("Nested object/array structures in localStorage", function() {
	var testObject = {
		"array" : [ {
			"string" : "string",
			"int" : 10,
			"null" : null,
			"boolean" : true
		} ]
	};
	equal(app.store.localStorage.setObject("object-name", testObject), true, "Set Object to Html5's localStorage");
	deepEqual(app.store.localStorage.getObject("object-name"), testObject, "Get the Object");
	equal(app.store.localStorage.removeObject("object-name"), true, "Remove the Object");
	equal(app.store.localStorage.getObject("object-name"), null, "Get the Object");
	ok(true, JSON.stringify(testObject));
});

QUnit.test("Nested object/array structures in localStorage", function() {
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
		}, [ "string", 10, null, true, 12.51 ] ],
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
			}, [ "string", 10, null, true, 12.51 ] ],
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
				}, [ "string", 10, null, true, 12.51 ] ]
			}
		}
	};
	equal(app.store.localStorage.setObject("object-name", testObject), true, "Set Object to Html5's localStorage");
	deepEqual(app.store.localStorage.getObject("object-name"), testObject, "Get the Object");
	equal(app.store.localStorage.removeObject("object-name"), true, "Remove the Object");
	equal(app.store.localStorage.getObject("object-name"), null, "Get the Object");
	ok(true, JSON.stringify(testObject));
});

QUnit.test("Datatypes in HTML5's localStorage", function() {
	ok(app.store.localStorage.set("int", 7), "Set an integer to localStorage");
	ok(app.store.localStorage.set("bool", true), "Set a boolean to localStorage");
	ok(app.store.localStorage.set("string", "string"), "Set a string to localStorage");
	ok(app.store.localStorage.set("double", 12.51), "Set a double to localStorage");
	equal(app.store.localStorage.get("int"), 7, "Get the integer");
	equal(app.store.localStorage.get("bool"), true, "Get the boolean");
	equal(app.store.localStorage.get("string"), "string", "Get the string");
	equal(app.store.localStorage.get("double"), 12.51, "Get the integer");
});

