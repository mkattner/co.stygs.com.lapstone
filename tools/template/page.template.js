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