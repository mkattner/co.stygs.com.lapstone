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

var pages = {
	config : null,
	pageNames : [],
	refreshInterval : null,

	// history of pages
	history : [],

	constructor : function() {
		var dfd = $.Deferred();

		// reverse order

		startup.addFunction("lapstone is calling the plugins' pages loaded function", pages.callPluginsPagesLoaded, "");
		startup.addFunction("lapstone is calling the pages' setEvents() function", pages.setEvents, "");
		startup.addFunction("lapstone is verifying the pages' properties", pages.verifyPages, "");
		startup.addFunction("lapstone is including external scripts for pages", pages.include, "");
		startup.addFunction("lapstone is loading the pages", pages.loadPages, "");
		startup.addFunction("lapstone is verifying the pages' names", pages.verifyPageNames, "");
		startup.addFunction("lapstone is loading the pages' configuration", pages.loadPageConfig, "");
		startup.addFunction("lapstone is loading the script for global pages", globalLoader.AsyncScriptLoader, "../files/globalPage.js");

		dfd.resolve();
		return dfd.promise();
	},

	include : function() {
		var dfd = $.Deferred(), currentPage, promises = Array(), promiseOfPromises, resolve = true;

		$.each(pages.pageNames, function(key, pageName) {
			app.debug.debug("pages.include() - processing page: " + pageName);
			currentPage = window['page_' + pageName];
			if (currentPage.include_once != undefined) {
				if (Array.isArray(currentPage.include_once)) {
					resolve = false;
					$.each(currentPage.include_once, function(index, includeName) {
						var url = "../js/page/include/" + includeName;
						app.debug.debug("pages.include() - including: " + url);
						promises.push(globalLoader.AsyncScriptLoader(url));
					});

					promiseOfPromises = $.when.apply($, promises);

					promiseOfPromises.done(function() {
						app.debug.debug("pages.include() - including done");
						dfd.resolve();
					}).fail(function() {
						app.debug.debug("pages.include() - including: fails");
						dfd.reject();
					});
				}
			}
		});

		if (resolve)
			dfd.resolve();

		return dfd.promise();

	},

	callPluginsPagesLoaded : function() {
		var dfd = $.Deferred();

		$.each(plugins.pluginNames, function(key, value) {
			window['plugin_' + value].pagesLoaded();
		});

		dfd.resolve();
		return dfd.promise();

	},

	loadPageConfig : function() {
		var dfd = $.Deferred(), promise;

		if (app.config.min) {
			pages.config = config_json;
			dfd.resolve();
		} else {
			promise = globalLoader.AsyncJsonLoader("../js/page/pages.json");
			promise.done(function(json) {
				pages.config = json;
				dfd.resolve();
			});
			promise.fail(function() {
				dfd.reject();
			});
		}

		return dfd.promise();
	},

	verifyPageNames : function() {
		var dfd = $.Deferred();

		dfd.resolve();
		return dfd.promise();

	},

	verifyPages : function() {
		var dfd = $.Deferred(), currentPage;
		// alert(JSON.stringify(pages.pageNames));
		$.each(pages.pageNames, function(key, pageName) {
			currentPage = window['page_' + pageName];

			if (currentPage.config === undefined) {
				console.warn("The page: " + pageName + " has no 'config' property.");
			} else {
				if (currentPage.config.name === undefined)
					console.warn("The page: " + pageName + " has no 'config.name' property.");

				if (currentPage.config.shortname === undefined)
					console.warn("The page: " + pageName + " has no 'config.shortname' property.");

				if (currentPage.config.template === undefined)
					console.warn("The page: " + pageName + " has no 'config.template' property.");

				if (currentPage.config.useKeepAlive === undefined)
					console.warn("The page: " + pageName + " has no 'config.useKeepAlive' property.");

				if (currentPage.config.loginObligate === undefined)
					console.warn("The page: " + pageName + " has no 'config.loginObligate' property.");

				if (currentPage.config.isGlobalPage === undefined)
					console.warn("The page: " + pageName + " has no 'config.isGlobalPage' property.");

				if (currentPage.config.contentRefresh === undefined)
					console.warn("The page: " + pageName + " has no 'config.contentRefresh' property.");

				if (currentPage.config.contentRefreshInterval === undefined)
					console.warn("The page: " + pageName + " has no 'config.contentRefreshInterval' property.");

				if (currentPage.config.asyncLoading === undefined)
					console.warn("The page: " + pageName + " has no 'config.asyncLoading' property.");
			}

			if (currentPage.elements === undefined)
				console.warn("The page: " + pageName + " has no 'elements' property.");

			if (currentPage.constructor === undefined)
				console.warn("The page: " + pageName + " has no 'constructor' property.");

			if (currentPage.creator === undefined)
				console.warn("The page: " + pageName + " has no 'creator' property.");

			if (currentPage.async === undefined) {
				console.warn("The page: " + pageName + " has no 'async' property.");

			} else {
				if (currentPage.async.promise === undefined)
					console.warn("The page: " + pageName + " has no 'async.promise' property.");

				if (currentPage.async.result === undefined)
					console.warn("The page: " + pageName + " has no 'async.result' property.");

				if (currentPage.async.elements === undefined)
					console.warn("The page: " + pageName + " has no 'async.elements' property.");

				if (currentPage.async.creator === undefined)
					console.warn("The page: " + pageName + " has no 'async.creator' property.");

				if (currentPage.async.call === undefined)
					console.warn("The page: " + pageName + " has no 'async.call' property.");

				if (currentPage.async.done === undefined)
					console.warn("The page: " + pageName + " has no 'async.done' property.");

				if (currentPage.async.fail === undefined)
					console.warn("The page: " + pageName + " has no 'async.fail' property.");

				if (currentPage.async.always === undefined)
					console.warn("The page: " + pageName + " has no 'async.always' property.");

				if (currentPage.async.abort === undefined)
					console.warn("The page: " + pageName + " has no 'async.abort' property.");
			}

			if (currentPage.setEvents === undefined)
				console.warn("The page: " + pageName + " has no 'setEvents' property.");

			if (currentPage.functions === undefined)
				console.warn("The page: " + pageName + " has no 'functions' property.");
		});

		dfd.resolve();
		return dfd.promise();

	},

	loadPageConfiguration : function(key) {
		var dfd = $.Deferred(), promise;
		if (app.config.min) {
			window['page_' + key].config = window['config_' + key];
			dfd.resolve();
		} else {
			promise = globalLoader.AsyncJsonLoader("../js/page/page." + key + ".json");
			promise.done(function(json) {
				window['page_' + key].config = json;
				dfd.resolve();
			});
			promise.fail(function() {
				dfd.reject();
			});
		}
		// 
		return dfd.promise();
	},

	onPageLoaded : function(key) {
		var dfd = $.Deferred(), promise, promiseConfiguration;

		if (window['page_' + key] == undefined) {
			alert("Fatal error: Page class is not defined: page_" + key);
			return;
		}

		promiseConfiguration = pages.loadPageConfiguration(key);

		promiseConfiguration.done(function() {
			if (window['page_' + key].config.name == undefined) {
				alert("Fatal error: The property 'name' is not defined in JSON file: ../js/page." + key + ".json")
				return false;
			}
			if (window['page_' + key].config.shortname == undefined) {
				alert("Fatal error: The property 'shortname' is not defined in JSON file: ../js/page." + key + ".json")
				return false;
			}

			// insert promise
			promise = window['page_' + key].constructor();
			promise.done(function() {
				window['page_' + key]['config']['page'] = key;
				window['page_' + key]['config']['pageId'] = '#' + key;

				app[window['page_' + key].config.shortname] = window['page_' + key].functions;

				pages.pageNames.push(key);

				dfd.resolve();
			});
			promise.fail(function() {
				dfd.reject();
			});

		});

		promiseConfiguration.fail(function() {
			dfd.reject();
		});

		return dfd.promise();

	},

	loadPages : function() {
		var dfd = $.Deferred(), promises_js = Array(), promiseOfPromises_js, promises_func = Array(), promiseOfPromises_func;

		$.each(pages.config, function(key, value) {
			if (app.config.min) {
				promises_js.push(pages.onPageLoaded(key));
			} else {
				promises_js.push(globalLoader.AsyncScriptLoader("../js/page/page." + key + ".js"));
			}
		});
		promiseOfPromises_js = $.when.apply($, promises_js);

		if (app.config.min) {
			promiseOfPromises_js.done(function() {
				pages.callPluginPageEventFunctions();
				dfd.resolve();
			});
			promiseOfPromises_js.fail(function() {
				dfd.reject();
			});
		} else {

			promiseOfPromises_js.done(function() {
				$.each(pages.config, function(key, value) {
					promises_func.push(pages.onPageLoaded(key));
				});

				promiseOfPromises_func = $.when.apply($, promises_func);

				promiseOfPromises_func.done(function() {
					pages.callPluginPageEventFunctions();
					dfd.resolve();
				});
				promiseOfPromises_func.fail(function() {
					dfd.reject()
				});
			});
			promiseOfPromises_js.fail(function() {
				dfd.reject();
			});
		}
		return dfd.promise();

	},

	// call plugins' page functions
	// is called only once
	// use delegates in plugins
	callPluginPageEventFunctions : function() {
		var dfd = $.Deferred();

		$.each(plugins.pluginNames, function(key, value) {
			app.debug.alert("try to call: plugin_" + value + ".pageSpecificEvents()", 6);
			window['plugin_' + value].pageSpecificEvents();
		});

		dfd.resolve();
		return dfd.promise();

	},

	// call plugins' page functions
	// by pagebeforecreate
	callPluginsPageFunctions : function(container) {
		var dfd = $.Deferred();

		var success = true;
		// alert("plugin page functin");
		$.each(plugins.pluginNames, function(key, value) {
			window['plugin_' + value].afterHtmlInjectedBeforePageComputing(container);
		});

		dfd.resolve();
		return dfd.promise();

	},
	setEvents : function() {
		var dfd = $.Deferred();

		// jQM 1.4.5+
		// pagecontainer
		// $(document).on("pagecontainerbeforechange", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerbeforehide", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerbeforeload", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerbeforeshow", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerbeforetransition", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerchange", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerchangefailed", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainercreate", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerhide", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerhide", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerload", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pageloadfailed", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerloadfailed", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainerremove", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainershow", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecontainertransition", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// // page
		// $(document).on("pagebeforecreate", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });
		//
		// $(document).on("pagecreate", function(event, ui) {
		// var prev, to;
		// app.debug.alert("pages.setEvents() - Event: " + event.type
		// + " on: " + event.target);
		// app.debug.alert("pages.setEvents() - properties of ui
		// object: " + Object.keys(ui).toString());
		// prev = (typeof ui.prevPage == 'object') ? ((ui.prevPage.jquery) ?
		// ui.prevPage.attr("id") : ui.prevPage) : ui.prevPage;
		// app.debug.alert("pages.setEvents() - prevPage: " + prev);
		// to = (typeof ui.toPage == 'object') ? ((ui.toPage.jquery) ?
		// ui.toPage.attr("id") : ui.toPage) : ui.toPage;
		// app.debug.alert("pages.setEvents() - toPage: " + to);
		// });

		// old

		// jQuery Mobile Events

		// jquery Mobile Events for specific pages

		/*
		 * 
		 */
		$(document).on('pagebeforechange', '.app-page', function(event) {
			app.debug.alert("pages.js jQuery mobile event: pagebeforechange for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforechange");
		});

		/*
		 * 
		 */
		$(document).on('pagebeforecreate', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pagebeforecreate for: " + $(this).attr('id'));

			pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforecreate");
			// ---
			//
			// alert($(this).attr('data-type'));
			if ($(this).attr('data-type') == "static" || $(this).attr('data-type') == "static-inline") {

			} else if (window['page_' + $(this).attr('id')] == undefined) {
				alert("-Fatal error: Can't find the page object: page_" + $(this).attr('id') + "; Please have a look to your pages.json file. You'll be redirected to the index.html page.");
				app.help.navigation.redirect("index.html");
			} else {
				// case 3: page is a common lapstone page

			}

		});

		/*
		 * 
		 */
		$(document).on('pagebeforehide', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pagebeforehide for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforehide");
		});

		/*
		 * 
		 */
		$(document).on('pagebeforeload', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pagebeforeload for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforeload");
		});

		/*
		 * 
		 */
		$(document).on('pagebeforeshow', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pagebeforeshow for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforeshow");
		});

		/*
		 * 
		 */
		$(document).on('pagechange', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pagechange for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagechange");
		});

		/*
		 * 
		 */
		$(document).on('pagechangefailed', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pagechangefailed for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagechangefailed");
		});

		/*
		 * 
		 */
		$(document).on('pagecreate', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pagecreate for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagecreate");
		});

		/*
		 * 
		 */
		$(document).on('pagehide', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pagehide for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagehide");
		});

		/*
		 * 
		 */
		$(document).on('pageinit', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pageinit for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pageinit");
		});

		/*
		 * 
		 */
		$(document).on('pageload', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pageload for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pageload");
		});

		/*
		 * 
		 */
		$(document).on('pageloadfailed', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pageloadfailed for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pageloadfailed");
		});

		/*
		 * 
		 */
		$(document).on('pageremove', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pageremove for: " + $(this).attr('id'));
			pages.eventFunctions.pageTypeSelector(event, $(this), "pageremove");
		});

		/*
		 * 
		 */
		$(document).on('pageshow', '.app-page', function(event) {
			app.debug.alert("jQuery mobile event: pageshow for: " + $(this).attr('id'));

			pages.history.push($(this).attr('id'));

			pages.eventFunctions.pageTypeSelector(event, $(this), "pageshow");
		});

		dfd.resolve();
		return dfd.promise();

	},

	// a function for each event
	eventFunctions : {
		pageTypeSelector : function(event, container, eventName) {
			app.debug.alert("plugin.eventFunctions.pageTypeSelector(" + event + ", " + container + ", " + eventName + ")");
			app.debug.alert("PageId: " + container.attr('id'));

			// alert(container.attr('data-type'));
			if (container.attr('data-type') == "static") {
				// case 1: page is static
				app.debug.alert("case: page type is static");
				pages.eventFunctions.everyPage[eventName](event, container);
				pages.eventFunctions.staticPage[eventName](event, container);
			} else if (container.attr('data-type') == "static-inline") {
				// case 2: page is inline-static
				app.debug.alert("case: page type is inline-static");
				var staticContainer = container.clone();

				if (container.attr('data-global') === "true") {
					globalPage[eventName](event, container);
				}

				pages.eventFunctions.everyPage[eventName](event, container);
				pages.eventFunctions.staticInlinePage[eventName](event, container, staticContainer);
			} else if (window['page_' + container.attr('id')] == undefined) {
				// case 3: page ist not defined in pages.json
				app.debug.alert("case: page ist not defined in pages.json");
				alert("plugin.eventFunctions.pageTypeSelector() - Fatal error: Can't find the page object: page_" + container.attr('id') + "; Please have a look to your pages.json file.");
				app.help.navigation.redirect("index.html");
			} else {
				// case 4: page is a common lapstone page
				app.debug.alert("case: page is a common lapstone page");
				if (window["page_" + container.attr('id')].config.isGlobalPage == true)
					globalPage[eventName](event, container);
				else if (window["page_" + container.attr('id')].config.isGlobalPage == undefined)
					globalPage[eventName](event, container);
				pages.eventFunctions.everyPage[eventName](event, container);
				pages.eventFunctions.lapstonePage[eventName](event, container);
			}

		},

		everyPage : {
			pagebeforechange : function(event, container) {
				// <!--
				app.debug.alert("plugin.eventFunctions.everyPage.pagebeforechange(" + event + ", " + container + ")");
				// -->
			},
			pagebeforecreate : function(event, container) {
				// <!--
				app.debug.alert("plugin.eventFunctions.everyPage.pagebeforecreate(" + event + ", " + container + ")");
				// -->
			},
			pagebeforehide : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pagebeforehide(" + event + ", " + container + ")");

				app.debug.alert("plugin.eventFunctions.everyPage.pagehide: clear refresh interval");
				/*
				 */
			},
			pagebeforeload : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pagebeforeload(" + event + ", " + container + ")");
			},
			pagebeforeshow : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pagebeforeshow(" + event + ", " + container + ")");

				app.debug.alert("plugin.eventFunctions.everyPage.pagebeforeshow: check refresh interval");

			},
			pagechange : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pagechange(" + event + ", " + container + ")");
			},
			pagechangefailed : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pagechangefailed(" + event + ", " + container + ")");
			},
			pagecreate : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pagecreate(" + event + ", " + container + ")");
			},
			pagehide : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pagehide(" + event + ", " + container + ")");

				app.debug.alert("plugin.eventFunctions.everyPage.pagehide: clear page specific event delegates");
				$("#" + container.attr("id")).off();
				$(document).off("#" + container.attr("id"));

				app.debug.alert("remove page from DOM: " + container.attr('id'));
				container.remove();

			},
			pageinit : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pageinit(" + event + ", " + container + ")");
			},
			pageload : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pageload(" + event + ", " + container + ")");
			},
			pageloadfailed : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pageloadfailed(" + event + ", " + container + ")");
			},
			pageremove : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pageremove(" + event + ", " + container + ")");
			},
			pageshow : function(event, container) {
				app.debug.alert("plugin.eventFunctions.everyPage.pageshow(" + event + ", " + container + ")");
			}
		},

		staticPage : {
			pagebeforechange : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pagebeforechange(" + event + ", " + container + ")");
			},
			pagebeforecreate : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pagebeforecreate(" + event + ", " + container + ")");

				app.debug.alert("do language string replacement");
				container.find("[data-language]").each(function(index, element) {
					var languageArray = $(this).attr('data-language').split(".");
					$(this).html(app.lang.string(languageArray[1], languageArray[0]));
				});
			},
			pagebeforehide : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pagebeforehide(" + event + ", " + container + ")");
			},
			pagebeforeload : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pagebeforeload(" + event + ", " + container + ")");
			},
			pagebeforeshow : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pagechange(" + event + ", " + container + ")");
			},
			pagechange : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pagechange(" + event + ", " + container + ")");
			},
			pagechangefailed : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pagechangefailed(" + event + ", " + container + ")");
			},
			pagecreate : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pagecreate(" + event + ", " + container + ")");
			},
			pagehide : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pagehide(" + event + ", " + container + ")");
			},
			pageinit : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pageinit(" + event + ", " + container + ")");
			},
			pageload : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pageload(" + event + ", " + container + ")");
			},
			pageloadfailed : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pageloadfailed(" + event + ", " + container + ")");
			},
			pageremove : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pageremove(" + event + ", " + container + ")");
			},
			pageshow : function(event, container) {
				app.debug.alert("plugin.eventFunctions.staticPage.pageshow(" + event + ", " + container + ")");
			}
		},
		staticInlinePage : {
			pagebeforechange : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pagebeforechange(" + event + ", " + container + ")");
			},
			pagebeforecreate : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pagebeforecreate(" + event + ", " + container + ")");
				app.debug.alert("do language string replacement");

				staticContainer.find("[data-language]").each(function(index, element) {
					var languageArray = $(this).attr('data-language').split(".");
					$(this).html(app.lang.string(languageArray[1], languageArray[0]));
				});
				var html = staticContainer.html();
				container.find('div[data-role=content]').replaceWith(html);
				// wichtig, dass macht irgend eine sache mit den dialog feldern.
				pages.callPluginsPageFunctions(container);
			},
			pagebeforehide : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pagebeforehide(" + event + ", " + container + ")");
			},
			pagebeforeload : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pagebeforeload(" + event + ", " + container + ")");
			},
			pagebeforeshow : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pagechange(" + event + ", " + container + ")");

			},
			pagechange : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pagechange(" + event + ", " + container + ")");
			},
			pagechangefailed : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pagechangefailed(" + event + ", " + container + ")");
			},
			pagecreate : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pagecreate(" + event + ", " + container + ")");
			},
			pagehide : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pagehide(" + event + ", " + container + ")");
			},
			pageinit : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pageinit(" + event + ", " + container + ")");
			},
			pageload : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pageload(" + event + ", " + container + ")");
			},
			pageloadfailed : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pageloadfailed(" + event + ", " + container + ")");
			},
			pageremove : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pageremove(" + event + ", " + container + ")");
			},
			pageshow : function(event, container, staticContainer) {
				app.debug.alert("plugin.eventFunctions.staticInlinePage.pageshow(" + event + ", " + container + ")");
			}
		},
		lapstonePage : {
			pagebeforechange : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforechange(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pagebeforechange(event, container);
			},
			pagebeforecreate : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforecreate(" + event + ", " + container + ")");

				if (window['page_' + container.attr('id')].config.loginObligate && !app.sess.loggedIn()) {
					app.notify.add.alert(app.lang.string("login obligate text", "lapstone"), false, app.lang.string("login obligate headline", "lapstone"), app.lang.string("login obligate confirm", "lapstone"));
					app.sess.destroyAll();
					app.help.navigation.redirect(app.config.startPage, "slidefade");

				} else if (plugins.config.KeepAlive === true) {
					app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: : WebServiceClient requires keepAlive");

					if (window['page_' + container.attr('id')].config.useKeepAlive != undefined) {
						app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has keepAlive configuration in page.json");

						if (window['page_' + container.attr('id')].config.useKeepAlive) {
							app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: global keepAlive is TRUE");
							if (app.alive.isAlive() === true) {
								app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: server isAlive");

								pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, container);
							} else {
								app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: no connection to server");
								app.debug.alert("Can't load page because keepAlive failed. Check your connection. You'll be redirected to the index.html page.", 60);
								app.alive.badConnectionHandler();
							}
						} else {
							app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has NO keepAlive entry in page.json file");
							pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, container);
						}
					} else {
						app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page does not require keepAlive");
						app.debug.alert("No useKeepAlive entry in your page_" + container.attr('id') + ".json. Please add it.", 60);
						pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, container);
					}
				} else {
					app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: WebServiceClient does not require keepAlive");
					pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, container);
				}
			},
			pagebeforecreate_createPage : function(event, container) {
				app.debug.trace("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage()");
				app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - pageId: " + container.attr('id'));

				var promise, elements = null, timeout;

				window['page_' + container.attr('id')].events.pagebeforecreate(event, container);

				// rquire
				if (window['page_' + container.attr('id')].include != undefined) {
					app.debug.trace("pages.js - page has an include array");

				}

				else {
					app.debug.trace("pages.js - page has no include array");
				}

				// require once
				if (window['page_' + container.attr('id')].include_once != undefined) {
					app.debug.trace("pages.js - page has an include_once array");
				}

				else {
					app.debug.trace("pages.js - page has no include_once array");
				}

				// preload template
				if (window['page_' + container.attr('id')].config.template != undefined) {
					app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - case: template != undefined");

					if (typeof window['page_' + container.attr('id')].config.template == "string" && window['page_' + container.attr('id')].config.template.length > 1) {
						app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - case: typeof template == string");
						app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - overwrite template");

						app.template.overwrite("#" + container.attr("id"), window['page_' + container.attr('id')].config.template);

						elements = app.template.elements(window['page_' + container.attr('id')].config.template);
						window['page_' + container.attr('id')].elements = {};

						app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set elements");
						app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - html code of page: " + container[0].outerHTML);

						$.each(elements, function(name, selector) {
							app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set content from template to: " + "page_" + container.attr('id'));
							app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set: " + name, 20);
							// alert(window['page_' +
							// container.attr('id')].elements[name]);
							window['page_' + container.attr('id')].elements[name] = container.find(selector);
						});

						// alert('page_' + container.attr('id'));
						// window['page_' +
						// container.attr('id')].elements =
						// elements;

					}
				}

				// async or not async
				if (window['page_' + container.attr('id')].config.asyncLoading === true) {
					app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - page IS async");

					window['page_' + container.attr('id')].async.elements = window['page_' + container.attr('id')].elements;

					app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.creator()");
					promise = window['page_' + container.attr('id')].async.creator(container);

					timeout = window.setTimeout(function() {
						app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - show loader");
						app.notify.loader.bubbleDiv(true, app.lang.string("text", "pageloading"), app.lang.string("headline", "pageloading"));
					}, 1200);

					promise.done(function(result) {
						if (result) {
							app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: " + JSON.stringify(result));
							window['page_' + container.attr('id')].async.result = result;
						}

						else {
							app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: []");
							window['page_' + container.attr('id')].async.result = Array();
						}

						app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.done()");
						window['page_' + container.attr('id')].async.done(container);
						app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - enchant page");
						app.help.jQM.enhance(container);

					});

					promise.fail(function(error) {
						app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: " + JSON.stringify(error));
						window['page_' + container.attr('id')].async.result = error;
						app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.fail()");
						window['page_' + container.attr('id')].async.fail(container);
					});

					promise.always(function() {
						window.clearTimeout(timeout);
						app.notify.loader.remove();
						app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.always()");
						window['page_' + container.attr('id')].async.always(container);
					});

				} else {
					app.debug.alert("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - page IS NOT async");

					window['page_' + container.attr('id')].creator(container);
				}

				window['page_' + container.attr('id')].setEvents(container);
				// call plugins' page functions
				app.debug.alert('Call: pages.callPluginsPageFunctions()');
				pages.callPluginsPageFunctions(container);
				app.debug.alert('add data- HTML Attributes');
				$.each(window['page_' + container.attr('id')].config, function(key, value) {
					container.attr("data-" + key, value);
				});
			},
			pagebeforehide : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforehide(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pagebeforehide(event, container);

				if (pages.refreshInterval != null) {
					clearInterval(pages.refreshInterval);
					pages.refreshInterval = null;
				}
			},
			pagebeforeload : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pagebeforeload(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pagebeforeload(event, container);
			},
			pagebeforeshow : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pagechange(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pagebeforeshow(event, container);

				if (window['page_' + container.attr('id')].config.contentRefresh == true) {
					app.debug.alert("plugin.eventFunctions.everyPage.pagebeforeshow: set refresh interval every " + window['page_' + container.attr('id')].config.contentRefreshInterval + " ms");

					pages.refreshInterval = window.setInterval(function() {
						// $().empty();

						$('div[data-role=content]').children().fadeOut(500).promise().then(function() {
							$('div[data-role=content]').empty();
							window['page_' + container.attr('id')].creator(container);
						});

					}, window['page_' + container.attr('id')].config.contentRefreshInterval);
				}
			},
			pagechange : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pagechange(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pagechange(event, container);
			},
			pagechangefailed : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pagechangefailed(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pagechangefailed(event, container);
			},
			pagecreate : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pagecreate(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pagecreate(event, container);
			},
			pagehide : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pagehide(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pagehide(event, container);
			},
			pageinit : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pageinit(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pageinit(event, container);
			},
			pageload : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pageload(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pageload(event, container);
			},
			pageloadfailed : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pageloadfailed(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pageloadfailed(event, container);
			},
			pageremove : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pageremove(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pageremove(event, container);
			},
			pageshow : function(event, container) {
				app.debug.alert("plugin.eventFunctions.lapstonePage.pageshow(" + event + ", " + container + ")");
				window['page_' + container.attr('id')].events.pageshow(event, container);
				if (navigator.splashscreen != undefined)
					navigator.splashscreen.hide();
			}
		}
	}
};
