// # sourceURL=pages.js
/**
 * Copyright (c) 2018 martin.kattner@gmail.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions: The above copyright
 * notice and this permission notice shall be included in all copies or
 * substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS",
 * WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// TODO add try catch to every function that is called in plugins or pages
app.page = {};
app["pages"] = {
	config : null,
	pageNames : [],
	includeOnce : [],

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
//			includeEverything();
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

		$.each(app.plugins.pluginNames, function(key, currentPluginName) {
			app.debug.debug("try to call: plugin_" + currentPluginName + ".pageSpecificEvents()", 6);
			window['plugin_' + currentPluginName].pageSpecificEvents();
		});

		dfd.resolve();
		return dfd.promise();

	},

	// call plugins' page functions
	// by pagebeforecreate
	callPluginsPageFunctions : function($currentLapstonePage) {
		var dfd = $.Deferred();

		var success = true;
		// alert("plugin page functin");
		$.each(app.plugins.pluginNames, function(key, currentPluginName) {
			window['plugin_' + currentPluginName].afterHtmlInjectedBeforePageComputing($currentLapstonePage);
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
			// load all the globalPage files
			promises.push(globalLoader.AsyncScriptLoader("../files/globalPages/" + globalPageName + ".js"))
		});

		promiseOfPromises = $.when.apply($, promises);

		promiseOfPromises.done(function() {

			// validate the globalPages
			app.debug.operation(function() {
				// need the timeout cause jQuery catches an exception
				window.setTimeout(function() {
					$.each(globalPageIncludes, function(index, globalPageName) {
						var currentGlobalPage;

						currentGlobalPage = window["globalPage_" + globalPageName];

						app.debug.validate(currentGlobalPage.async, "jsobject", "A globalPage must contain a async: {} object: " + globalPageName);
						app.debug.validate(currentGlobalPage.async.done, "jsobject", "A globalPage must contain a async.done() function: " + globalPageName);
						app.debug.validate(currentGlobalPage.async.fail, "jsobject", "A globalPage must contain a async.fail() function: " + globalPageName);
						app.debug.validate(currentGlobalPage.async.always, "jsobject", "A globalPage must contain a async.always() function: " + globalPageName);

					})

				}, 0)
			});

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
			app.debug.lapstone("pages.js jqm hook: pagebeforechange for: " + $(this).attr('id'));
			app.debug.deprecated("Will be removed.")
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforechange")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pagebeforecreate', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pagebeforecreate for: " + $(this).attr('id'));

			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforecreate")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
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
			app.debug.lapstone("jqm hook: pagebeforehide for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforehide")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pagebeforeload', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pagebeforeload for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforeload")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pagebeforeshow', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pagebeforeshow for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforeshow")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pagechange', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pagechange for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagechange")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pagechangefailed', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pagechangefailed for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagechangefailed")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pagecreate', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pagecreate for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagecreate")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pagehide', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pagehide for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pagehide")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pageinit', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pageinit for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageinit")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pageload', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pageload for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageload")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pageloadfailed', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pageloadfailed for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageloadfailed")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pageremove', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pageremove for: " + $(this).attr('id'));
			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageremove")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		/*
		 * 
		 */
		$(document).on('pageshow', '.app-page', function(event) {
			app.debug.lapstone("jqm hook: pageshow for: " + $(this).attr('id'));

			app.pages.history.push($(this).attr('id'));

			if (!app.pages.eventFunctions.pageTypeSelector(event, $(this), "pageshow")) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				return false;
			}
		});

		dfd.resolve();
		return dfd.promise();

	},

	// a function for each event
	eventPromises : {},
	// eventTimeouts: {},
	eventFunctions : {
		pageTypeSelector : function(event, $currentLapstonePage, eventName) {
			app.debug.trace("plugin.eventFunctions.pageTypeSelector(" + event + ", " + $currentLapstonePage + ", " + eventName + ")");
			app.debug.debug("PageId: " + $currentLapstonePage.attr('id'));

			var eventFunctionResult, currentLapstonePage;

			currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

			// alert($currentLapstonePage.attr('data-type'));
			if (currentLapstonePage === undefined) {
				// case 3: page ist not defined in pages.json
				app.debug.debug("case: page ist not defined in pages.json");
				alert("plugin.eventFunctions.pageTypeSelector() - Fatal error: Can't find the page object: page_" + $currentLapstonePage.attr('id') + "; Please have a look to your pages.json file.");
				app.nav.redirect("index.html", "none");
			}

			else {
				// case 4: page is a common lapstone page
				app.debug.debug("case: page is a common lapstone page");

				app.pages.eventPromises[eventName] = Array();

				eventFunctionResult = app.pages.eventFunctions.lapstonePage[eventName](event, $currentLapstonePage);

				// console.log(eventFunctionResult)
				if (eventFunctionResult && $.isFunction(eventFunctionResult.promise)) {
					app.pages.eventPromises[eventName].push(eventFunctionResult);
				}

				if (eventFunctionResult !== false) {
					// call the global pages
					$.each(currentLapstonePage.config.globalPage, function(index, globalPageName) {
						var currentGlobalPage, eventFunctionResult;

						currentGlobalPage = window["globalPage_" + globalPageName];

						app.debug.validate(currentGlobalPage[eventName], "function", "Unknown event function: " + globalPageName + "." + eventName)

						eventFunctionResult = currentGlobalPage[eventName](event, $currentLapstonePage);

						if (eventFunctionResult && $.isFunction(eventFunctionResult.promise)) {
							app.pages.eventPromises[eventName].push(eventFunctionResult);
						}
					});
				}

				else {
					// stop page loading
					console.log($($currentLapstonePage[0]).attr("id") + " " + eventName);
					// debugger
//					$($currentLapstonePage[0]).off();
				}

				$.when.apply($, app.pages.eventPromises[eventName]).always(function() {
					// window.clearTimeout(app.pages.eventTimeouts[eventName]);
					// app.notify.loader.remove();
				});

				return eventFunctionResult;
			}

		},

		lapstonePage : {
			pagebeforechange : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforechange(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pagebeforechange(event, $currentLapstonePage);
			},
			pagebeforecreate : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforecreate(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;
				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {

					app.debug.validate(app.plugins.functions.pluginLoaded("Actions"), "boolean");
					app.actions.loginObligate();

					return false;

				} else if (app.plugins.config.KeepAlive === true) {
					app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: : WebServiceClient requires keepAlive");

					if (window['page_' + $currentLapstonePage.attr('id')].config.useKeepAlive != undefined) {
						app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has keepAlive configuration in page.json");

						if (window['page_' + $currentLapstonePage.attr('id')].config.useKeepAlive) {
							app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: global keepAlive is TRUE");
							if (app.alive.isAlive() === true) {
								app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: server isAlive");

								return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, $currentLapstonePage);
							} else {
								app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: no connection to server");
								app.debug.debug("Can't load page because keepAlive failed. Check your connection. You'll be redirected to the index.html page.", 60);
								app.alive.badConnectionHandler();
								return false;
							}
						} else {
							app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has NO keepAlive entry in page.json file");
							return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, $currentLapstonePage);
						}
					} else {
						app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page does not require keepAlive");
						app.debug.debug("No useKeepAlive entry in your page_" + $currentLapstonePage.attr('id') + ".json. Please add it.", 60);
						return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, $currentLapstonePage);
					}
				} else {
					app.debug.debug("plugin.eventFunctions.lapstonePage.pagebeforecreate() case: WebServiceClient does not require keepAlive");
					return app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, $currentLapstonePage);
				}
			},
			pagebeforecreate_createPage : function(event, $currentLapstonePage) {
				app.debug.trace("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage()");
				app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - pageId: " + $currentLapstonePage.attr('id'));

				var promiseOfAsyncPageLoading, elements = null, dfdPageCreation, currentLapstonePage;

				dfdPageCreation = $.Deferred();

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];
				currentLapstonePage.events.pagebeforecreate(event, $currentLapstonePage);

				/**
				 * Include files from the inlcude array. Every time when the
				 * page is called.
				 */
				if (currentLapstonePage.include != undefined) {
					app.debug.trace("pages.js - page has an include array");

				}

				else {
					app.debug.trace("pages.js - page has no include array");
				}

				/**
				 * Preload the page template.
				 */
				if (currentLapstonePage.config.template != undefined) {
					app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - case: template != undefined");

					if (typeof currentLapstonePage.config.template == "string" && currentLapstonePage.config.template.length > 1) {
						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - case: typeof template == string");
						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - overwrite template");

						app.template.overwrite("#" + $currentLapstonePage.attr("id"), window['page_' + $currentLapstonePage.attr('id')].config.template);

						elements = app.template.elements(currentLapstonePage.config.template);
						currentLapstonePage.elements = {};

						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set elements");
						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - html code of page: " + $currentLapstonePage[0].outerHTML);

						$.each(elements, function(name, selector) {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set content from template to: " + "page_" + $currentLapstonePage.attr('id'));
							app.debug.debug("pages.eventFunctions.lapstonePage.pagebeforecreate_createPage() - set: " + name, 20);
							// alert(window['page_' +
							// $currentLapstonePage.attr('id')].elements[name]);
							currentLapstonePage.elements[name] = $currentLapstonePage.find(selector);
						});

						// elements for global page
						$.each(currentLapstonePage.config.globalPage, function(index, globalPageName) {
							var currentGlobalPage;

							currentGlobalPage = window["globalPage_" + globalPageName];

							app.debug.validate(currentGlobalPage.elements, "object");
							currentGlobalPage.elements = currentLapstonePage.elements;
						});

						// alert('page_' + $currentLapstonePage.attr('id'));
						// window['page_' +
						// $currentLapstonePage.attr('id')].elements =
						// elements;

					}
				}

				app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - create the page");
				if (window['page_' + $currentLapstonePage.attr('id')].config.asyncLoading === true) {
					app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - page IS async");

					window['page_' + $currentLapstonePage.attr('id')].async.elements = window['page_' + $currentLapstonePage.attr('id')].elements;

					app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.creator()");
					promiseOfAsyncPageLoading = window['page_' + $currentLapstonePage.attr('id')].async.creator($currentLapstonePage);

					window['page_' + $currentLapstonePage.attr('id')].async.result = null;

					promiseOfAsyncPageLoading.done(function(result) {
						if (result) {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: " + JSON.stringify(result));
							window['page_' + $currentLapstonePage.attr('id')].async.result = result;
						}

						else {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: []");
							window['page_' + $currentLapstonePage.attr('id')].async.result = Array();
						}

						window['page_' + $currentLapstonePage.attr('id')].setEvents($currentLapstonePage);

						// do this if user is still on page
						// because he could hava changed the page while ws
						// request
						// but maybe jqm is on the old page because the request
						// is to fast. So set a Timeout
						window.setTimeout(function() {
							if (window['page_' + $currentLapstonePage.attr('id')].config.name === app.pages.getCurrent().config.name) {
								app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.done()");
								window['page_' + $currentLapstonePage.attr('id')].async.done($currentLapstonePage);

								// call the done in globalPages

								dfdPageCreation.resolve($currentLapstonePage);
							} else {
								dfdPageCreation.reject($currentLapstonePage);
							}

						}, 5)
					});

					promiseOfAsyncPageLoading.fail(function(error) {
						app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - set: page.async.result: " + JSON.stringify(error));
						window['page_' + $currentLapstonePage.attr('id')].async.result = error;

						// do this if user is still on page
						if (window['page_' + $currentLapstonePage.attr('id')].config.name === app.pages.getCurrent().config.name) {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.fail()");
							window['page_' + $currentLapstonePage.attr('id')].async.fail($currentLapstonePage);
						}

						dfdPageCreation.reject($currentLapstonePage);
					});

					promiseOfAsyncPageLoading.always(function() {

						// do this if user is still on page
						if (window['page_' + $currentLapstonePage.attr('id')].config.name === app.pages.getCurrent().config.name) {
							app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - call: page.async.always()");
							window['page_' + $currentLapstonePage.attr('id')].async.always($currentLapstonePage);
						}
					});

					promiseOfAsyncPageLoading.progress(function() {
					});

				}

				else {
					app.debug.debug("app.pages.eventFunctions.lapstonePage.pagebeforecreate_createPage - page IS NOT async");

					window['page_' + $currentLapstonePage.attr('id')].setEvents($currentLapstonePage);

					window['page_' + $currentLapstonePage.attr('id')].creator($currentLapstonePage);

					dfdPageCreation.resolve($currentLapstonePage);
				}

				dfdPageCreation.done(function($currentLapstonePage) {

					// app.help.jQM.enhance($currentLapstonePage);
				});

				// call plugins' page functions
				app.debug.debug('Call: app.pages.callPluginsPageFunctions()');
				app.pages.callPluginsPageFunctions($currentLapstonePage);
				app.debug.debug('add data- HTML Attributes');

				$.each(window['page_' + $currentLapstonePage.attr('id')].config, function(key, value) {
					$currentLapstonePage.attr("data-" + key, value);
				});

				return dfdPageCreation.promise();

			},
			pagebeforehide : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforehide(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pagebeforehide(event, $currentLapstonePage);

			},
			pagebeforeload : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagebeforeload(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pagebeforeload(event, $currentLapstonePage);
			},
			pagebeforeshow : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagechange(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pagebeforeshow(event, $currentLapstonePage);

			},
			pagechange : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagechange(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pagechange(event, $currentLapstonePage);
			},
			pagechangefailed : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagechangefailed(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pagechangefailed(event, $currentLapstonePage);
			},
			pagecreate : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagecreate(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pagecreate(event, $currentLapstonePage);
			},
			pagehide : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pagehide(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				app.debug.debug("plugin.eventFunctions.lapstonePage.pagehide: clear page specific event delegates");
				$("#" + $currentLapstonePage.attr("id")).off();
				$(document).off("#" + $currentLapstonePage.attr("id"));

				// app.debug.debug("plugin.eventFunctions.everyPage.pagehide:
				// empty parameter object");
				// window["page_" +
				// $currentLapstonePage.attr('id')]["parameter"] = {};

				app.debug.debug("remove page from DOM: " + $currentLapstonePage.attr('id'));
				$currentLapstonePage.remove();
				currentLapstonePage.events.pagehide(event, $currentLapstonePage);
			},
			pageinit : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageinit(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pageinit(event, $currentLapstonePage);
			},
			pageload : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageload(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pageload(event, $currentLapstonePage);
			},
			pageloadfailed : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageloadfailed(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pageloadfailed(event, $currentLapstonePage);
			},
			pageremove : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageremove(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pageremove(event, $currentLapstonePage);
			},
			pageshow : function(event, $currentLapstonePage) {
				app.debug.trace("plugin.eventFunctions.lapstonePage.pageshow(" + event + ", " + $currentLapstonePage + ")");

				var currentLapstonePage;

				currentLapstonePage = window['page_' + $currentLapstonePage.attr('id')];

				if (currentLapstonePage.config.loginObligate === true && app.sess.loggedIn() === false) {
					return false;
				}

				currentLapstonePage.events.pageshow(event, $currentLapstonePage);
				if (navigator.splashscreen != undefined)
					navigator.splashscreen.hide();

				if (app.plugins.functions.pluginLoaded("Notification") === true)
					app.notify.popup.show();
			}
		}
	},

	getCurrent : function() {
		return window["page_" + $("[data-role=page]").attr("id")];
	}

};

// initialize first page when lapstone is loaded
$(document).on("lapstone", function() {
	$.mobile.initializePage();
});