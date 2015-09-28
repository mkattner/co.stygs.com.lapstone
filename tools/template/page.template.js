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

var page_##template = {
	config : null,
	include: null,
	include_once: null,

	elements : null,

	constructor : function() {
		app.debug.trace("page_##template.constructor()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	creator : function(container) {
		app.debug.trace("page_##template.creator()");
		this.elements.content.append("<h1>Hello World</h1>");
	},

	async : {
		promise : null,

		result : null,

		elements : null,

		creator : function(container) {
			app.debug.trace("page_##template.async.creator()");
			var dfd = $.Deferred();
			dfd.resolve();
			return dfd.promise();
		},

		call : function(container) {
			app.debug.trace("page_##template.async.call()");
			return app.rc.getJson();
		},

		done : function(container) {
			app.debug.trace("page_##template.async.done()");
		},

		fail : function(container) {
			app.debug.trace("page_##template.async.fail()");
			alert("WS fails: " + JSON.stringify(this.result));
		},

		always : function(container) {
			app.debug.trace("page_##template.async.always()");
		},

		abort : function(container) {
			app.debug.trace("page_##template.async.abort()");
		}
	},

	// set the jquery events
	setEvents : function(container) {
		app.debug.trace("page_##template.setEvents()");

	},

	functions : {},

	events : {

		pagebeforechange : function(event, container) {
			app.debug.trace("page_##template.pagebeforechange()");

		},

		pagebeforecreate : function(event, container) {
			app.debug.trace("page_##template.pagebeforecreate()");
		},

		pagebeforehide : function(event, container) {
			app.debug.trace("page_##template.pagebeforehide()");
		},

		pagebeforeload : function(event, container) {
			app.debug.trace("page_##template.pagebeforeload()");
		},

		pagebeforeshow : function(event, container) {
			app.debug.trace("page_##template.pagebeforeshow()");
		},

		pagechange : function(event, container) {
			app.debug.trace("page_##template.pagechange()");
		},

		pagechangefailed : function(event, container) {
			app.debug.trace("page_##template.pagechangefailed()");
		},

		pagecreate : function(event, container) {
			app.debug.trace("page_##template.pagecreate()");
		},

		pagehide : function(event, container) {
			app.debug.trace("page_##template.pagehide()");
		},

		pageinit : function(event, container) {
			app.debug.trace("page_##template.pageinit()");
		},

		pageload : function(event, container) {
			app.debug.trace("page_##template.pageload()");
		},

		pageloadfailed : function(event, container) {
			app.debug.trace("page_##template.pageloadfailed()");
		},

		pageremove : function(event, container) {
			app.debug.trace("page_##template.pageremove()");
		},

		pageshow : function(event, container) {
			app.debug.trace("page_##template.pageshow()");
		}
	}
};