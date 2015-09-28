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

var data = {
	nestedObject : {
		"string" : "string",
		"int" : 10,
		"null" : null,
		"boolean" : true,
		"array" : [ "string", 10, null, true, 12.51, {
			"string" : "string",
			"int" : 10,
			"null" : null,
			"boolean" : true
		},

		[ "string", 10, null, true, 12.51 ] ],

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
			},

			[ "string", 10, null, true, 12.51 ] ],

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
				},

				[ "string", 10, null, true, 12.51 ] ]
			}
		}
	},
	
	nestedArray : [ 1, 2, 3, [ 4.1, 4.2, 4.3, true, false, null ], 5, [ 6.1, 6.2, 6.3, 6.4 ], 7, 8, [ 9.1, 9.2, [ "9.3.1", "9.3.2" ] ], 10, [ 10.1, 10.2 ], [ 11.1, 11.2, 11.3 ] ],

	simpleObject : {
		"string" : "string",
		"int" : 10,
		"null" : null,
		"boolean" : true,
		"double" : 12.51
	},
	
	simpleArray : [ 1, 2, true, false, null, "string" ],

	simpleObjectWs : {
		url : "files/ws.simpleObject.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	},
	simpleArrayWs : {
		url : "files/ws.simpleArray.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	},
	nestedObjectWs : {
		url : "files/ws.nestedObject.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	},
	nestedArrayWs : {
		url : "files/ws.nestedArray.json",
		method : "get",
		timeout : 500,
		cashable : false,
		cashInS : null,
		local : true
	}
}