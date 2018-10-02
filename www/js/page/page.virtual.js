/**
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted,
 * free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions: The above copyright notice and this
 * permission notice shall be included in all copies or substantial portions of
 * the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
 * EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var page_virtual = {
	config : null,
	
	include: null,
	
	include_once: null,
	
	parameter: {},

	elements : null,

	constructor : function() {
		app.debug.trace("page_virtual.constructor()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	creator : function(container) {
		app.debug.trace("page_virtual.creator()");
		this.elements.content.append("<h1>Hello World</h1>");
	},

	async : {
		promise : null,

		result : null,

		elements : null,

		creator : function(container) {
			app.debug.trace("page_virtual.async.creator()");
			var dfd = $.Deferred();
			dfd.resolve();
			return dfd.promise();
		},

		call : function(container) {
			app.debug.trace("page_virtual.async.call()");
			return app.rc.getJson();
		},

		done : function(container) {
			app.debug.trace("page_virtual.async.done()");
		},

		fail : function(container) {
			app.debug.trace("page_virtual.async.fail()");
			alert("WS fails: " + JSON.stringify(this.result));
		},

		always : function(container) {
			app.debug.trace("page_virtual.async.always()");
		},

		abort : function(container) {
			app.debug.trace("page_virtual.async.abort()");
		}
	},

// set the jquery events

	setEvents : function(container) {
		app.debug.trace("page_virtual.setEvents()");

	},

	functions : {},

	events : {

		pagebeforechange : function(event, container) {
			app.debug.trace("page_virtual.pagebeforechange()");

		},

		pagebeforecreate : function(event, container) {
			app.debug.trace("page_virtual.pagebeforecreate()");
		},

		pagebeforehide : function(event, container) {
			app.debug.trace("page_virtual.pagebeforehide()");
		},

		pagebeforeload : function(event, container) {
			app.debug.trace("page_virtual.pagebeforeload()");
		},

		pagebeforeshow : function(event, container) {
			app.debug.trace("page_virtual.pagebeforeshow()");
		},

		pagechange : function(event, container) {
			app.debug.trace("page_virtual.pagechange()");
		},

		pagechangefailed : function(event, container) {
			app.debug.trace("page_virtual.pagechangefailed()");
		},

		pagecreate : function(event, container) {
			app.debug.trace("page_virtual.pagecreate()");
		},

		pagehide : function(event, container) {
			app.debug.trace("page_virtual.pagehide()");
		},

		pageinit : function(event, container) {
			app.debug.trace("page_virtual.pageinit()");
		},

		pageload : function(event, container) {
			app.debug.trace("page_virtual.pageload()");
		},

		pageloadfailed : function(event, container) {
			app.debug.trace("page_virtual.pageloadfailed()");
		},

		pageremove : function(event, container) {
			app.debug.trace("page_virtual.pageremove()");
		},

		pageshow : function(event, container) {
			app.debug.trace("page_virtual.pageshow()");
		}
	}
};