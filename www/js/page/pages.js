var pages = {
	config : null,
	pageNames : [],
	constructor : function() {
		if (window.globalPage == undefined) {
			var url = "../files/globalPage.js";
			$.ajax({
				url : url,
				dataType : "script",
				async : false,
				success : function(data, textStatus, jqXHR) {
					;
				},
				error : function(jqXHR, textStatus, errorThrown) {
					alert("Fatal error in plugin_//globalPage.js: Can't load the javascript. Url: " + url + " Error: " + textStatus);
					alert(errorThrown);
				}
			});
		}

		pages.loadPageConfig();
		pages.verifyPageNames();
		pages.loadPages();
		pages.setEvents();
		pages.callPluginsPagesLoaded();
	},

	callPluginsPagesLoaded : function() {
		$.each(plugins.pluginNames, function(key, value) {
			window['plugin_' + value].pagesLoaded();
		});
	},

	loadPageConfig : function() {
		if (app.config.min) {
			pages.config = config_json;
		} else {
			var url = "../js/page/pages.json";
			$.ajax({
				url : url,
				async : false,
				dataType : "json",
				success : function(json) {
					pages.config = json;
				},
				error : function(jqXHR, textStatus, errorThrown) {
					alert("Fatal error in pages.js: Can't load page. Url: " + url + " Error: " + textStatus);
				}
			});
		}
	},

	verifyPageNames : function() {
	},

	onPageLoaded : function(key) {
		if (window['page_' + key] == undefined) {
			alert("Fatal error: Page class is not defined: page_" + key);
			return;
		}

		if (app.config.min) {
			window['page_' + key].config = window['config_' + key];
		} else {
			window['page_' + key].config = JsonLoader("../js/page/page." + key + ".json");
		}

		if (window['page_' + key].config.name == undefined) {
			alert("Fatal error: The property 'name' is not defined in JSON file: ../js/page." + key + ".json")
			return false;
		}
		if (window['page_' + key].config.shortname == undefined) {
			alert("Fatal error: The property 'shortname' is not defined in JSON file: ../js/page." + key + ".json")
			return false;
		}

		window['page_' + key].constructor();
		window['page_' + key]['config']['page'] = key;
		window['page_' + key]['config']['pageId'] = '#' + key;

		app.addObject(window['page_' + key].config.name, window['page_' + key].functions);
		app.addObject(window['page_' + key].config.shortname, window['page_' + key].functions);

		pages.pageNames.push(key);

	},

	loadPages : function() {
		var success = true;
		$.each(pages.config, function(key, value) {
			if (app.config.min) {
				success = pages.onPageLoaded(key);
			} else {
				var url = "../js/page/page." + key + ".js";
				$.ajax({
					url : url,
					async : false,
					dataType : "script",
					success : function(json) {
						success = pages.onPageLoaded(key);
					},
					error : function() {
						alert("Fatal Error: Can't load page: " + url);
					}
				});
			}
		});
		// set the plugins' events for pages
		pages.callPluginPageEventFunctions();
	},

	// call plugins' page functions
	// is called only once
	// use delegates in plugins
	callPluginPageEventFunctions : function() {

		$.each(plugins.pluginNames, function(key, value) {
			app.debug.alert("pages.js ~ try to call: plugin_" + value + ".pageSpecificEvents()", 6);
			window['plugin_' + value].pageSpecificEvents();
		});
	},

	// call plugins' page functions
	// by pagebeforecreate
	callPluginsPageFunctions : function(container) {
		var success = true;
		// alert("plugin page functin");
		$.each(plugins.pluginNames, function(key, value) {
			window['plugin_' + value].afterHtmlInjectedBeforePageComputing(container);
		});
	},
	setEvents : function() {

		// jQuery Mobile Events

		// jquery Mobile Events for specific pages

		/*
		 * 
		 */
		$(document).on('pagebeforechange', '.app-page', function(event) {
			app.debug.alert("pages.js jQuery mobile event: pagebeforechange for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforechange");
		});

		/*
		 * 
		 */
		$(document).on(
				'pagebeforecreate',
				'.app-page',
				function(event) {
					app.debug.alert("pages.js ~ jQuery mobile event: pagebeforecreate for: " + $(this).attr('id'), 5);
					pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforecreate");
					// ---
					//
					// alert($(this).attr('data-type'));
					if ($(this).attr('data-type') == "static" || $(this).attr('data-type') == "static-inline") {

					} else if (window['page_' + $(this).attr('id')] == undefined) {
						alert("-Fatal error: Can't find the page object: page_" + $(this).attr('id')
								+ "; Please have a look to your pages.json file. You'll be redirected to the index.html page.");
						app.help.navigation.redirect("index.html");
					} else {
						// case 3: page is a common lapstone page

					}

				});

		/*
		 * 
		 */
		$(document).on('pagebeforehide', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pagebeforehide for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforehide");
		});

		/*
		 * 
		 */
		$(document).on('pagebeforeload', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pagebeforeload for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforeload");
		});

		/*
		 * 
		 */
		$(document).on('pagebeforeshow', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pagebeforeshow for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagebeforeshow");
		});

		/*
		 * 
		 */
		$(document).on('pagechange', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pagechange for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagechange");
		});

		/*
		 * 
		 */
		$(document).on('pagechangefailed', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pagechangefailed for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagechangefailed");
		});

		/*
		 * 
		 */
		$(document).on('pagecreate', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pagecreate for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagecreate");
		});

		/*
		 * 
		 */
		$(document).on('pagehide', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pagehide for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pagehide");
		});

		/*
		 * 
		 */
		$(document).on('pageinit', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pageinit for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pageinit");
		});

		/*
		 * 
		 */
		$(document).on('pageload', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pageload for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pageload");
		});

		/*
		 * 
		 */
		$(document).on('pageloadfailed', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pageloadfailed for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pageloadfailed");
		});

		/*
		 * 
		 */
		$(document).on('pageremove', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pageremove for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pageremove");
		});

		/*
		 * 
		 */
		$(document).on('pageshow', '.app-page', function(event) {
			app.debug.alert("pages.js ~ jQuery mobile event: pageshow for: " + $(this).attr('id'), 5);
			pages.eventFunctions.pageTypeSelector(event, $(this), "pageshow");
		});
	},

	// a function for each event
	eventFunctions : {
		pageTypeSelector : function(event, container, eventName) {
			app.debug.alert("pages.js ~ plugin.eventFunctions.pageTypeSelector(" + event + ", " + container + ", " + eventName + ")", 5);
			app.debug.alert("pages.js ~ PageId: " + container.attr('id'), 5);

			// alert(container.attr('data-type'));
			if (container.attr('data-type') == "static") {
				// case 1: page is static
				app.debug.alert("pages.js ~ case: page type is static", 5);
				pages.eventFunctions.everyPage[eventName](event, container);
				pages.eventFunctions.staticPage[eventName](event, container);
			} else if (container.attr('data-type') == "static-inline") {
				// case 2: page is inline-static
				app.debug.alert("pages.js ~ case: page type is inline-static", 5);
				var staticContainer = container.clone();
				globalPage[eventName](event, container);
				pages.eventFunctions.everyPage[eventName](event, container);
				pages.eventFunctions.staticInlinePage[eventName](event, container, staticContainer);
			} else if (window['page_' + container.attr('id')] == undefined) {
				// case 3: page ist not defined in pages.json
				app.debug.alert("pages.js ~ case: page ist not defined in pages.json", 5);
				alert("plugin.eventFunctions.pageTypeSelector() - Fatal error: Can't find the page object: page_" + container.attr('id')
						+ "; Please have a look to your pages.json file.");
				app.help.navigation.redirect("index.html");
			} else {
				// case 4: page is a common lapstone page
				app.debug.alert("pages.js ~ case: page is a common lapstone page", 5);
				// alert(window["page_" +
				// container.attr('id')].config.isGlobalPage)
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
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pagebeforechange(" + event + ", " + container + ")", 5);
			},
			pagebeforecreate : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pagebeforecreate(" + event + ", " + container + ")", 5);
			},
			pagebeforehide : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pagebeforehide(" + event + ", " + container + ")", 5);
			},
			pagebeforeload : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pagebeforeload(" + event + ", " + container + ")", 5);
			},
			pagebeforeshow : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pagechange(" + event + ", " + container + ")", 5);
			},
			pagechange : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pagechange(" + event + ", " + container + ")", 5);
			},
			pagechangefailed : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pagechangefailed(" + event + ", " + container + ")", 5);
			},
			pagecreate : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pagecreate(" + event + ", " + container + ")", 5);
			},
			pagehide : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pagehide(" + event + ", " + container + ")", 5);

				$("#" + container.attr("id")).off();
				$(document).off("#" + container.attr("id"));

				app.debug.alert("pages.js ~ remove page from DOM: " + container.attr('id'), 5);
				container.remove();

			},
			pageinit : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pageinit(" + event + ", " + container + ")", 5);
			},
			pageload : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pageload(" + event + ", " + container + ")", 5);
			},
			pageloadfailed : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pageloadfailed(" + event + ", " + container + ")", 5);
			},
			pageremove : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pageremove(" + event + ", " + container + ")", 5);
			},
			pageshow : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.everyPage.pageshow(" + event + ", " + container + ")", 5);
			}
		},

		staticPage : {
			pagebeforechange : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pagebeforechange(" + event + ", " + container + ")", 5);
			},
			pagebeforecreate : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pagebeforecreate(" + event + ", " + container + ")", 5);

				app.debug.alert("pages.js ~ do language string replacement", 5);
				container.find("[data-language]").each(function(index, element) {
					var languageArray = $(this).attr('data-language').split(".");
					$(this).html(app.lang.string(languageArray[1], languageArray[0]));
				});
			},
			pagebeforehide : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pagebeforehide(" + event + ", " + container + ")", 5);
			},
			pagebeforeload : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pagebeforeload(" + event + ", " + container + ")", 5);
			},
			pagebeforeshow : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pagechange(" + event + ", " + container + ")", 5);
			},
			pagechange : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pagechange(" + event + ", " + container + ")", 5);
			},
			pagechangefailed : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pagechangefailed(" + event + ", " + container + ")", 5);
			},
			pagecreate : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pagecreate(" + event + ", " + container + ")", 5);
			},
			pagehide : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pagehide(" + event + ", " + container + ")", 5);
			},
			pageinit : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pageinit(" + event + ", " + container + ")", 5);
			},
			pageload : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pageload(" + event + ", " + container + ")", 5);
			},
			pageloadfailed : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pageloadfailed(" + event + ", " + container + ")", 5);
			},
			pageremove : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pageremove(" + event + ", " + container + ")", 5);
			},
			pageshow : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticPage.pageshow(" + event + ", " + container + ")", 5);
			}
		},
		staticInlinePage : {
			pagebeforechange : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pagebeforechange(" + event + ", " + container + ")", 5);
			},
			pagebeforecreate : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pagebeforecreate(" + event + ", " + container + ")", 5);
				app.debug.alert("pages.js ~ do language string replacement", 5);

				staticContainer.find("[data-language]").each(function(index, element) {
					var languageArray = $(this).attr('data-language').split(".");
					$(this).html(app.lang.string(languageArray[1], languageArray[0]));
				});
				var html = staticContainer.html();
				container.find('div[data-role=content]').append(html);
				// wichtig, dass macht irgend eine sache mit den dialog feldern.
				pages.callPluginsPageFunctions(container);
			},
			pagebeforehide : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pagebeforehide(" + event + ", " + container + ")", 5);
			},
			pagebeforeload : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pagebeforeload(" + event + ", " + container + ")", 5);
			},
			pagebeforeshow : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pagechange(" + event + ", " + container + ")", 5);
			},
			pagechange : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pagechange(" + event + ", " + container + ")", 5);
			},
			pagechangefailed : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pagechangefailed(" + event + ", " + container + ")", 5);
			},
			pagecreate : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pagecreate(" + event + ", " + container + ")", 5);
			},
			pagehide : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pagehide(" + event + ", " + container + ")", 5);
			},
			pageinit : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pageinit(" + event + ", " + container + ")", 5);
			},
			pageload : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pageload(" + event + ", " + container + ")", 5);
			},
			pageloadfailed : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pageloadfailed(" + event + ", " + container + ")", 5);
			},
			pageremove : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pageremove(" + event + ", " + container + ")", 5);
			},
			pageshow : function(event, container, staticContainer) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.staticInlinePage.pageshow(" + event + ", " + container + ")", 5);
			}
		},
		lapstonePage : {
			pagebeforechange : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforechange(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pagebeforechange(event, container);
			},
			pagebeforecreate : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforecreate(" + event + ", " + container + ")", 5);

				if (window['page_' + container.attr('id')].config.loginObligate && !app.sess.loggedIn()) {
					app.notify.add.alert(app.lang.string("login_obligate_text", "app-session"), false, app.lang
							.string("login_obligate_headline", "app-session"), app.lang.string("ok", "actions"));
					app.store.localStorage.clearHtml5();
					$(document).off();
					app.help.navigation.redirect(app.config.startPage);
				} else if (plugin_WebServiceClient.config.useKeepAlive) {
					app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforecreate() case: : WebServiceClient requires keepAlive", 5);
					if (window['page_' + container.attr('id')].config.useKeepAlive != undefined) {
						app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has keepAlive configuration in page.json",
								5);
						if (window['page_' + container.attr('id')].config.useKeepAlive) {
							app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforecreate() case: global keepAlive is TRUE", 5);
							if (plugin_WebServiceClient.config.keepAlive.isAlive) {
								app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforecreate() case: server isAlive", 5);
								pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, container);
							} else {
								app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforecreate() case: no connection to server", 5);
								app.debug
										.alert(
												"pages.js ~ Can't load page because keepAlive failed. Check your connection. You'll be redirected to the index.html page.",
												60);
								app.notify.add.alert(app.lang.string("bad_connection_text", "app-keepAlive"), false, app.lang.string("bad_connection_headline",
										"app-keepAlive"), app.lang.string("ok", "actions"));
								app.store.localStorage.clearHtml5();
								$(document).off();
								app.help.navigation.redirect(app.config.startPage);
							}
						} else {
							app.debug.alert(
									"pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page has NO keepAlive entry in page.json file", 5);
							pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, container);
						}
					} else {
						app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforecreate() case: Page does not require keepAlive", 5);
						app.debug.alert("pages.js ~ No useKeepAlive entry in your page_" + container.attr('id') + ".json. Please add it.", 60);
						pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, container);
					}
				} else {
					app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforecreate() case: WebServiceClient does not require keepAlive", 5);
					pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(event, container);
				}
			},
			pagebeforecreate_createPage : function(event, container) {
				app.debug.alert("pages.js ~ pages.eventFunctions.lapstonePage.pagebeforecreate_createPage(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pagebeforecreate(event, container);
				window['page_' + container.attr('id')].creator(container);
				window['page_' + container.attr('id')].setEvents(container);
				// call plugins' page functions
				app.debug.alert('pages.js ~ Call: pages.callPluginsPageFunctions()', 5);
				pages.callPluginsPageFunctions(container);
				app.debug.alert('pages.js ~ add data- HTML Attributes', 5);
				$.each(window['page_' + container.attr('id')].config, function(key, value) {
					container.attr("data-" + key, value);
				});
			},
			pagebeforehide : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforehide(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pagebeforehide(event, container);
			},
			pagebeforeload : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagebeforeload(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pagebeforeload(event, container);
			},
			pagebeforeshow : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagechange(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pagebeforeshow(event, container);
			},
			pagechange : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagechange(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pagechange(event, container);
			},
			pagechangefailed : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagechangefailed(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pagechangefailed(event, container);
			},
			pagecreate : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagecreate(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pagecreate(event, container);
			},
			pagehide : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pagehide(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pagehide(event, container);
			},
			pageinit : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pageinit(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pageinit(event, container);
			},
			pageload : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pageload(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pageload(event, container);
			},
			pageloadfailed : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pageloadfailed(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pageloadfailed(event, container);
			},
			pageremove : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pageremove(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pageremove(event, container);
			},
			pageshow : function(event, container) {
				app.debug.alert("pages.js ~ plugin.eventFunctions.lapstonePage.pageshow(" + event + ", " + container + ")", 5);
				window['page_' + container.attr('id')].events.pageshow(event, container);
			}
		}
	}
};
