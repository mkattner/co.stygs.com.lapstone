//# sourceURL=pages.js
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

// TODO add try catch to every function that is called in plugins or pages
app.page = {};
app["pages"] = {
	config : null,
	pageNames : [],
	includeOnce : [],
	refreshInterval : null,

	// history of pages
	history : [],

	constructor : function() {
		var dfd = $.Deferred();

		// reverse order

		// 9
		startup.addFunction("                  cleanup pages", app.pages.cleanup);
		// 8
		startup.addFunction("                  calling the plugins' pages loaded function", app.pages.callPluginsPagesLoaded);
		// 7
		startup.addFunction("                  calling the pages' setEvents() function", app.pages.setEvents);
		// 6
		startup.addFunction("                  load pages' globalPages", app.pages.globalPages);
		// 5
		startup.addFunction("                  verifying the pages' properties", app.pages.verifyPages);
		// 4
		startup.addFunction("                  including external scripts for pages", app.pages.include);
		// 3
		startup.addFunction("                  loading the pages", app.pages.loadPages);
		// 2
		startup.addFunction("                  verifying the pages' names", app.pages.verifyPageNames);
		// 1
		startup.addFunction("                  loading the pages' configuration", app.pages.loadPageConfig);

		// startup.addFunction(" loading the script for global pages",
		// globalLoader.AsyncScriptLoader,
		// "../files/globalPage.js");

		dfd.resolve();
		return dfd.promise();
	},

	cleanup : function() {
		var dfd = $.Deferred();

		dfd.resolve();
		return dfd.promise();
	},

	include : function() {
		var dfd = $.Deferred(), pageIncludePromises = [];

		if (app.config.min) {
			includeEverything();
			dfd.resolve();
		}

		else {
			$.each(app.pages.config, function(pageName, loaded) {
				if (loaded) {

					app.debug.validate(window['page_' + pageName].config.include_once);
					app.debug.validate(window['page_' + pageName].config.include);
					$.each(window['page_' + pageName].config.include_once, function(index, includeFile) {
						if (app.pages.includeOnce.indexOf(includeFile) === -1) {
							pageIncludePromises.push(globalLoader.AsyncScriptLoader("../js/page/include/" + includeFile));
							app.pages.includeOnce.push(includeFile);
						}
					});

				}
			});

			$.when.apply($, pageIncludePromises).done(function() {
				dfd.resolve();
			}).fail(function(error) {
				dfd.reject(error);
			});
		}

		return dfd.promise();
	},

	callPluginsPagesLoaded : function() {
		var dfd = $.Deferred();

		$.each(app.plugins.pluginNames, function(key, value) {
			window['plugin_' + value].pagesLoaded();
		});

		dfd.resolve();
		return dfd.promise();

	},

	loadPageConfig : function() {
		var dfd = $.Deferred(), promise;

		if (app.config.min) {
			app.pages.config = config_json;
			dfd.resolve();
		} else {
			promise = globalLoader.AsyncJsonLoader("../js/page/pages.json");
			promise.done(function(json) {
				app.pages.config = json;

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
		// alert(JSON.stringify(app.pages.pageNames));
		$.each(app.pages.pageNames, function(key, pageName) {
			var currentPage = window['page_' + pageName];

			if (currentPage.config === undefined) {
				console.warn("The page: " + pageName + " has no 'config' property.");
			} else {
				if (currentPage.config.name === undefined)
					console.warn("The page: " + pageName + " has no 'config.name' property.");

				if (currentPage.config.template === undefined)
					console.warn("The page: " + pageName + " has no 'config.template' property.");

				if (currentPage.config.useKeepAlive === undefined)
					console.warn("The page: " + pageName + " has no 'config.useKeepAlive' property.");

				if (currentPage.config.loginObligate === undefined)
					console.warn("The page: " + pageName + " has no 'config.loginObligate' property.");

				if (typeof currentPage.config.isGlobalPage === "boolean")
					console.warn("The page: " + pageName + " has 'config.isGlobalPage' property. This mechanism is deprecated. Use globalPage[''] property");

				if (currentPage.config.globalPage == undefined)
					console.warn("The page: " + pageName + " has no 'config.globalPage : []' property.");

				if (currentPage.config.contentRefresh === undefined)
					console.warn("The page: " + pageName + " has no 'config.contentRefresh' property.");

				if (currentPage.config.contentRefreshInterval === undefined)
					console.warn("The page: " + pageName + " has no 'config.contentRefreshInterval' property.");

				if (currentPage.config.asyncLoading === undefined)
					console.warn("The page: " + pageName + " has no 'config.asyncLoading' property.");
			}

			if (currentPage.elements === undefined)
				console.warn("The page: " + pageName + " has no 'elements' property.");

			if (currentPage.parameter === undefined)
				console.warn("The page: " + pageName + " has no 'parameter' property.");

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

		promiseConfiguration = app.pages.loadPageConfiguration(key);

		promiseConfiguration.done(function() {
			if (window['page_' + key].config.name == undefined) {
				alert("Fatal error: The property 'name' is not defined in JSON file: ../js/page." + key + ".json")
				return false;
			}

			// insert promise
			promise = window['page_' + key].constructor();
			promise.done(function() {
				window['page_' + key]['config']['page'] = key;
				window['page_' + key]['config']['pageId'] = '#' + key;

				app.pages.pageNames.push(key);

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

		$.each(app.pages.config, function(key, value) {
			if (app.config.min) {
				promises_js.push(app.pages.onPageLoaded(key));
			} else {
				promises_js.push(globalLoader.AsyncScriptLoader("../js/page/page." + key + ".js"));
			}
		});
		promiseOfPromises_js = $.when.apply($, promises_js);

		if (app.config.min) {
			promiseOfPromises_js.done(function() {
				app.pages.callPluginPageEventFunctions();
				$.each(app.pages.pageNames, function(key, pageName) {
					var currentPage = window['page_' + pageName];

					// window["app"]["page"][pageName] =
					// window["app"]["page"][pageName] || {};
					window["app"]["page"][pageName] = currentPage.functions;

				});
				dfd.resolve();
			});
			promiseOfPromises_js.fail(function() {
				dfd.reject();
			});
		} else {

			promiseOfPromises_js.done(function() {
				$.each(app.pages.config, function(key, value) {
					promises_func.push(app.pages.onPageLoaded(key));
				});

				promiseOfPromises_func = $.when.apply($, promises_func);

				promiseOfPromises_func.done(function() {
					app.pages.callPluginPageEventFunctions();
					$.each(app.pages.pageNames, function(key, pageName) {
						var currentPage = window['page_' + pageName];

						// window["app"]["page"][pageName] =
						// window["app"]["page"][pageName] || {};
						window["app"]["page"][pageName] = currentPage.functions;

					});
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

		$.each(app.plugins.pluginNames, function(key, value) {
			app.debug.debug("try to call: plugin_" + value + ".pageSpecificEvents()", 6);
			window['plugin_' + value].pageSpecificEvents();
		});

		dfd.resolve();
		return dfd.promise();

	},

	// call plugins' page functions
	// by pagebeforecreate
	callPluginsPageFunctions : function($container) {
		var dfd = $.Deferred();

		var success = true;
		// alert("plugin page functin");
		$.each(app.plugins.pluginNames, function(key, value) {
			window['plugin_' + value].afterHtmlInjectedBeforePageComputing($container);
		});
		dfd.resolve();
		return dfd.promise();

	},

	globalPages : function() {

		var dfd = $.Deferred(), globalPageIncludes = Array(), promises = Array(), promiseOfPromises;

		$.each(app.pages.config, function(pageName, value) {
			if (value === true) {
				// alert(window["page_" + pageName].config.globalPage)
				$.each(window["page_" + pageName].config.globalPage, function(index, globalPageName) {
					if (globalPageIncludes.indexOf(globalPageName) === -1) {
						globalPageIncludes.push(globalPageName);
					}
				});
			}
		});

		$.each(globalPageIncludes, function(index, globalPageName) {
			promises.push(globalLoader.AsyncScriptLoader("../files/globalPages/" + globalPageName + ".js"))
		});

		promiseOfPromises = $.when.apply($, promises);

		promiseOfPromises.done(function() {
			dfd.resolve();
		});

		promiseOfPromises.fail(function() {
			dfd.reject();
		});

		return dfd.promise();
	},

	setEvents : function() {
		var dfd = $.Deferred();

		// jQuery Mobile Events

		// jquery Mobile Events for specific pages

		/*
		 * 
		 */
		$(document).on('pagebeforechange', '.app-page', function(event) {
			app.debug.trace("pages.js jQuery mobile event: pagebeforechange for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforechange");
		});

		/*
		 * 
		 */
		$(document).on('pagebeforecreate', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pagebeforecreate for: " + $(this).attr('id'));

			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforecreate");
			// ---
			//
			// alert($(this).attr('data-type'));
			if ($(this).attr('data-type') == "static" || $(this).attr('data-type') == "static-inline") {

			} else if (window['page_' + $(this).attr('id')] == undefined) {
				alert("-Fatal error: Can't find the page object: page_" + $(this).attr('id') + "; Please have a look to your pages.json file. You'll be redirected to the index.html page.");
				app.nav.redirect("index.html", "none");
			} else {
				// case 3: page is a common lapstone page

			}

		});

		/*
		 * 
		 */
		$(document).on('pagebeforehide', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pagebeforehide for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforehide");
		});

		/*
		 * 
		 */
		$(document).on('pagebeforeload', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pagebeforeload for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforeload");
		});

		/*
		 * 
		 */
		$(document).on('pagebeforeshow', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pagebeforeshow for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforeshow");
		});

		/*
		 * 
		 */
		$(document).on('pagechange', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pagechange for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagechange");
		});

		/*
		 * 
		 */
		$(document).on('pagechangefailed', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pagechangefailed for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagechangefailed");
		});

		/*
		 * 
		 */
		$(document).on('pagecreate', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pagecreate for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagecreate");
		});

		/*
		 * 
		 */
		$(document).on('pagehide', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pagehide for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagehide");
		});

		/*
		 * 
		 */
		$(document).on('pageinit', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pageinit for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageinit");
		});

		/*
		 * 
		 */
		$(document).on('pageload', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pageload for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageload");
		});

		/*
		 * 
		 */
		$(document).on('pageloadfailed', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pageloadfailed for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageloadfailed");
		});

		/*
		 * 
		 */
		$(document).on('pageremove', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pageremove for: " + $(this).attr('id'));
			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageremove");
		});

		/*
		 * 
		 */
		$(document).on('pageshow', '.app-page', function(event) {
			app.debug.trace("jQuery mobile event: pageshow for: " + $(this).attr('id'));

			app.pages.history.push($(this).attr('id'));

			app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageshow");
		});

		dfd.resolve();
		return dfd.promise();

	},

	// a function for each event
	eventPromises : {},
	// eventTimeouts: {},
	eventFunctions : {
		pageTypeSelector : function(event, $container, eventName) {
			app.debug.trace("plugin.eventFunctions.pageTypeSelector(" + event + ", " + $container + ", " + eventName + ")");
			app.debug.debug("PageId: " + $container.attr('id'));

			var eventFunctionResult;

			// alert($container.attr('data-type'));
			if (window['page_' + $container.attr('id')] == undefined) {
				// case 3: page ist not defined in pages.json
				app.debug.debug("case: page ist not defined in pages.json");
				alert("plugin.eventFunctions.pageTypeSelector() - Fatal error: Can't find the page object: page_" + $container.attr('id') + "; Please have a look to your pages.json file.");
				app.nav.redirect("index.html", "none");
			} else {
				// case 4: page is a common lapstone page
				app.debug.debug("case: page is a common lapstone page");

				app.pages.eventPromises[eventName] = Array();

				eventFunctionResult = app.pages.eventFunctions.lapstonePage[eventName](event, $container);
				// console.log(eventFunctionResult)
				if (eventFunctionResult && $.isFunction(eventFunctionResult.promise)) {
					app.pages.eventPromises[eventName].push(eventFunctionResult);
				}

				if (eventFunctionResult !== false) {
					// call the global pages
					$.each(window["page_" + $container.attr('id')].config.globalPage, function(index, globalPageName) {
						eventFunctionResult = window["globalPage_" + globalPageName][eventName](event, $container);
						if (eventFunctionResult && $.isFunction(eventFunctionResult.promise)) {
							app.pages.eventPromises[eventName].push(eventFunctionResult);
						}
					});
				}

				$.when.apply($, app.pages.eventPromises[eventName]).always(function() {
					// window.clearTimeout(app.pages.eventTimeouts[eventName]);
					// app.notify.loader.remove();
				});
			}

		},

		lapstonePage : {
			pagebeforechange : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforechange(" + event + ", " + $container + ")");
				window['page_' + $container.attr('id')].events.pagebeforechange(event, $container);
			},
			pagebeforecreate : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforecreate(" + event + ", " + $container + ")");
				if (window['page_' + $container.attr('id')].config.loginObligate && !app.sess.loggedIn()) {

					app.notify.add.alert({
						"id" : "loginRequired",
						"text" : app.lang.string("login obligate text", "lapstone", {
							"page" : app.lang.string($container.attr('id'), "view")
						}),
						"title" : app.lang.string("login obligate headline", "lapstone", {
							"page" : app.lang.string($container.attr('id'), "view")
						}),
						"button" : app.lang.string("login obligate confirm", "lapstone", {
							"page" : app.lang.string($container.attr('id'), "view")
						}),
						"pageDelay" : 1
					});

					app.actions.logout();
					return false;

				} else if (app.plugins.config.KeepAlive === true) {
					app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: : WebServiceClient requires keepAlive");

					if (window['page_' + $container.attr('id')].config.useKeepAlive != undefined) {
						app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has keepAlive configuration in page.json");

						if (window['page_' + $container.attr('id')].config.useKeepAlive) {
							app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: global keepAlive is TRUE");
							if (app.alive.isAlive() === true) {
								app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: server isAlive");

								return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, $container);
							} else {
								app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: no connection to server");
								app.debug.debug("Can't load page because keepAlive failed. Check your connection. You'll be redirected to the index.html page.", 60);
								app.alive.badConnectionHandler();
								return false;
							}
						} else {
							app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has NO keepAlive entry in page.json file");
							return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, $container);
						}
					} else {
						app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page does not require keepAlive");
						app.debug.debug("No useKeepAlive entry in your page_" + $container.attr('id') + ".json. Please add it.", 60);
						return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, $container);
					}
				} else {
					app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: WebServiceClient does not require keepAlive");
					return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, $container);
				}
			},
			pagebeforecreate_createPage : function(event, $container) {
				app.debug.trace("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage()");
				app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - pageId: " + $container.attr('id'));

				var promiseOfAsyncPageLoading, elements = null, dfdPageCreation;

				dfdPageCreation = $.Deferred();

				window['page_' + $container.attr('id')].events.pagebeforecreate(event, $container);

				/**
				 * Include files from the inlcude array. Every time when the
				 * page is called.
				 */
				if (window['page_' + $container.attr('id')].include != undefined) {
					app.debug.trace("pages.js - page has an include array");

				}

				else {
					app.debug.trace("pages.js - page has no include array");
				}

				/**
				 * Preload the page template.
				 */
				if (window['page_' + $container.attr('id')].config.template != undefined) {
					app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - case: template != undefined");

					if (typeof window['page_' + $container.attr('id')].config.template == "string" && window['page_' + $container.attr('id')].config.template.length > 1) {
						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - case: typeof template == string");
						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - overwrite template");

						app.template.overwrite("#" + $container.attr("id"), window['page_' + $container.attr('id')].config.template);

						elements = app.template.elements(window['page_' + $container.attr('id')].config.template);
						window['page_' + $container.attr('id')].elements = {};

						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set elements");
						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - html code of page: " + $container[0].outerHTML);

						$.each(elements, function(name, selector) {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set content from template to: " + "page_" + $container.attr('id'));
							app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set: " + name, 20);
							// alert(window['page_' +
							// $container.attr('id')].elements[name]);
							window['page_' + $container.attr('id')].elements[name] = $container.find(selector);
						});

						// elements for global page
						$.each(window['page_' + $container.attr('id')].config.globalPage, function(index, globalPageName) {
							app.debug.validate(window["globalPage_" + globalPageName].elements, "object");
							window["globalPage_" + globalPageName].elements = window['page_' + $container.attr('id')].elements;
						});

						// alert('page_' + $container.attr('id'));
						// window['page_' +
						// $container.attr('id')].elements =
						// elements;

					}
				}

				app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - create the page");
				if (window['page_' + $container.attr('id')].config.asyncLoading === true) {
					app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - page IS async");

					window['page_' + $container.attr('id')].async.elements = window['page_' + $container.attr('id')].elements;

					app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.creator()");
					promiseOfAsyncPageLoading = window['page_' + $container.attr('id')].async.creator($container);

					window['page_' + $container.attr('id')].async.result = null;

					promiseOfAsyncPageLoading.done(function(result) {
						if (result) {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: " + JSON.stringify(result));
							window['page_' + $container.attr('id')].async.result = result;
						}

						else {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: []");
							window['page_' + $container.attr('id')].async.result = Array();
						}

						window['page_' + $container.attr('id')].setEvents($container);

						// do this if user is still on page
						// because he could hava changed the page while ws
						// request
						// but maybe jqm is on the old page because the request
						// is to fast. So set a Timeout
						window.setTimeout(function() {
							if (window['page_' + $container.attr('id')].config.name === app.pages.getCurrent().config.name) {
								app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.done()");
								window['page_' + $container.attr('id')].async.done($container);
								dfdPageCreation.resolve($container);
							} else {
								dfdPageCreation.reject($container);
							}

						}, 5)
					});

					promiseOfAsyncPageLoading.fail(function(error) {
						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: " + JSON.stringify(error));
						window['page_' + $container.attr('id')].async.result = error;

						// do this if user is still on page
						if (window['page_' + $container.attr('id')].config.name === app.pages.getCurrent().config.name) {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.fail()");
							window['page_' + $container.attr('id')].async.fail($container);
						}

						dfdPageCreation.reject($container);
					});

					promiseOfAsyncPageLoading.always(function() {

						// do this if user is still on page
						if (window['page_' + $container.attr('id')].config.name === app.pages.getCurrent().config.name) {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.always()");
							window['page_' + $container.attr('id')].async.always($container);
						}
					});

					promiseOfAsyncPageLoading.progress(function() {
					});

				}

				else {
					app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - page IS NOT async");

					window['page_' + $container.attr('id')].setEvents($container);

					window['page_' + $container.attr('id')].creator($container);

					dfdPageCreation.resolve($container);
				}

				dfdPageCreation.done(function($container) {

					// app.help.jQM.enhance($container);
				});

				// call plugins' page functions
				app.debug.debug('Call: app.pages.callPluginsPageFunctions()');
				app.pages.callPluginsPageFunctions($container);
				app.debug.debug('add data- HTML Attributes');

				$.each(window['page_' + $container.attr('id')].config, function(key, value) {
					$container.attr("data-" + key, value);
				});

				return dfdPageCreation.promise();

			},
			pagebeforehide : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforehide(" + event + ", " + $container + ")");
				window['page_' + $container.attr('id')].events.pagebeforehide(event, $container);

				if (app.pages.refreshInterval != null) {
					clearInterval(app.pages.refreshInterval);
					app.pages.refreshInterval = null;
				}
			},
			pagebeforeload : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforeload(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pagebeforeload(event, $container);
			},
			pagebeforeshow : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagechange(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pagebeforeshow(event, $container);

				if (window['page_' + $container.attr('id')].config.contentRefresh == true) {
					app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforeshow: set refresh interval every " + window['page_' + $container.attr('id')].config.contentRefreshInterval + " ms");

					app.pages.refreshInterval = window.setInterval(function() {
						// $().empty();

						$('div[data-role=content]').children().fadeOut(500).promise().then(function() {
							$('div[data-role=content]').empty();
							window['page_' + $container.attr('id')].creator($container);
						});

					}, window['page_' + $container.attr('id')].config.contentRefreshInterval);
				}
			},
			pagechange : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagechange(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pagechange(event, $container);
			},
			pagechangefailed : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagechangefailed(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pagechangefailed(event, $container);
			},
			pagecreate : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagecreate(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pagecreate(event, $container);
			},
			pagehide : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagehide(" + event + ", " + $container + ")");

				app.debug.debug("plugin.eventFunctions.lapstonePage.pagehide: clear page specific event delegates");
				$("#" + $container.attr("id")).off();
				$(document).off("#" + $container.attr("id"));

				// app.debug.debug("plugin.eventFunctions.everyPage.pagehide:
				// empty parameter object");
				// window["page_" + $container.attr('id')]["parameter"] = {};

				app.debug.debug("remove page from DOM: " + $container.attr('id'));
				$container.remove();
				window['page_' + $container.attr('id')].events.pagehide(event, $container);
			},
			pageinit : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageinit(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pageinit(event, $container);
			},
			pageload : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageload(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pageload(event, $container);
			},
			pageloadfailed : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageloadfailed(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pageloadfailed(event, $container);
			},
			pageremove : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageremove(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pageremove(event, $container);
			},
			pageshow : function(event, $container) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageshow(" + event + ", " + $container + ")");

				window['page_' + $container.attr('id')].events.pageshow(event, $container);
				if (navigator.splashscreen != undefined)
					navigator.splashscreen.hide();
			}
		}
	},

	getCurrent : function() {
		return window["page_" + $("[data-role=page]").attr("id")];
	}
};
