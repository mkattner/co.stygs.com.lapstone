/*
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

/**
 * @author Martin Kattner <martin.kattner@gmail.com>
 */

// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_Detector
 * 
 * @version 1.0
 * @namespace plugin_Detector
 */
var plugin_Detector = {
	config : null,
	cssClasses : {},
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.trace("plugin_Detector.pluginsLoaded()");
		var dfd = $.Deferred();

		plugin_Detector.functions.classes.generate();
		app.debug.alert("Css Classes in body Tag: " + plugin_Detector.functions.classes.classNames(), 60);
		app.debug.alert(navigator.userAgent, 60);

		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.trace("plugin_Detector.pagesLoaded()");

		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.trace("plugin_Detector.definePluginEvents()");

		var dfdCordovaDeviceReady = $.Deferred(), dfdJQueryMobileInit = $.Deferred();

		// resolve dfdCordovaDeviceReady on deviceready
		document.addEventListener("deviceready", function() {
			dfdCordovaDeviceReady.resolve();
		}, false);

		// resolve dfdJQueryMobileInit on mobileinit
		$(document).bind("mobileinit", function() {
			dfdJQueryMobileInit.resolve();
		});
		// alert(navigator.userAgent);
		// when both are ready
		$.when(dfdCordovaDeviceReady, dfdJQueryMobileInit).then(plugin_Detector.jQueryMobileAndCordovaLoaded);
		$.when(dfdCordovaDeviceReady).then(plugin_Detector.cordovaLoaded);
		$.when(dfdJQueryMobileInit).then(plugin_Detector.jQueryMobileLoaded);

		// app.debug.alert("Fatal exception!\n\n" + JSON.stringify(err, null,
		// 4), 50);
		// app.debug.log(JSON.stringify(err, null, 4));
	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_Detector.afterHtmlInjectedBeforePageComputing()");

		console.log("TODO - clean up & do not use pagebeforecreate");
		if (plugin_Detector.config.addCssClassesToBodyTag) {
			// add css classes

			$.each(app.detect.classes.array(), function(key, name) {
				if (!$('body').hasClass(key))
					$('body').addClass(key);
			});
		}

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_Detector.pageSpecificEvents()");

	},
	// private functions
	jQueryMobileAndCordovaLoaded : function() {
		app.debug.trace("plugin_Detector.jQueryMobileAndCordovaLoaded()");
		plugin_Detector.cssClasses["app-jQueryMobile-and-Cordova"] = null;
	},

	jQueryMobileLoaded : function() {
		app.debug.trace("plugin_Detector.jQueryMobileLoaded()");
		plugin_Detector.cssClasses["app-jQueryMobile"] = null;
	},

	cordovaLoaded : function() {
		app.debug.trace("plugin_Detector.cordovaLoaded()");
		plugin_Detector.cssClasses["app-Cordova"] = null;
	},

	// public functions
	// called by user
	/**
	 * Public functions for plugin_Detector
	 * 
	 * @namespace plugin_Detector.functions
	 * 
	 */
	functions : {

		classes : {
			classNames : function() {
				app.debug.trace("plugin_Detector.functions.classes.classNames()");
				var classes = "";
				$.each(plugin_Detector.cssClasses, function(key, value) {
					classes += key + " ";
				});
				return classes;
			},
			generate : function() {
				app.debug.trace("plugin_Detector.functions.classes.generate()");
				var className;
				if (className = plugin_Detector.functions.isMobile())
					plugin_Detector.cssClasses[className] = null;

				if (className = plugin_Detector.functions.isDesktop())
					plugin_Detector.cssClasses[className] = null;

				// iterate the mobile devices
				$.each(plugin_Detector.functions.mobile, function(key, value) {
					if (typeof value == 'function') {
						if (className = plugin_Detector.functions.mobile[key]())
							plugin_Detector.cssClasses[className] = null;
					} else if (typeof value == 'object') {
						$.each(plugin_Detector.functions.mobile[key], function(key1, value1) {
							if (typeof value1 == 'function') {
								if (className = plugin_Detector.functions.mobile[key][key1]())
									plugin_Detector.cssClasses[className] = null;
							} else if (typeof value1 == 'object') {
								$.each(plugin_Detector.functions.mobile[key][key1], function(key2, value2) {
									if (typeof value2 == 'function') {
										if (className = plugin_Detector.functions.mobile[key][key1][key2]())
											plugin_Detector.cssClasses[className] = null;
									}
								});
							}
						});
					}
				});
				// iterate the desktop devices
				$.each(plugin_Detector.functions.desktop, function(key, value) {
					if (typeof value == 'function') {
						if (className = plugin_Detector.functions.desktop[key]())
							plugin_Detector.cssClasses[className] = null;
					} else if (typeof value == 'object') {
						$.each(plugin_Detector.functions.desktop[key], function(key1, value1) {
							if (typeof value1 == 'function') {
								if (className = plugin_Detector.functions.desktop[key][key1]())
									plugin_Detector.cssClasses[className] = null;
							} else if (typeof value1 == 'object') {
								$.each(plugin_Detector.functions.desktop[key][key1], function(key2, value2) {
									if (typeof value2 == 'function') {
										if (className = plugin_Detector.functions.desktop[key][key1][key2]())
											plugin_Detector.cssClasses[className] = null;
									}
								});
							}
						});
					}

				});
				// iterate the media devices
				$.each(plugin_Detector.functions.media, function(key, value) {
					if (typeof value == 'function') {
						if (className = plugin_Detector.functions.media[key]())
							plugin_Detector.cssClasses[className] = null;
					} else if (typeof value == 'object') {
						$.each(plugin_Detector.functions.media[key], function(key1, value1) {
							if (typeof value1 == 'function') {
								if (className = plugin_Detector.functions.media[key][key1]())
									plugin_Detector.cssClasses[className] = null;
							} else if (typeof value1 == 'object') {
								$.each(plugin_Detector.functions.media[key][key1], function(key2, value2) {
									if (typeof value2 == 'function') {
										if (className = plugin_Detector.functions.media[key][key1][key2]())
											plugin_Detector.cssClasses[className] = null;
									}
								});
							}
						});
					}

				});
				// iterate the browsers
				$.each(plugin_Detector.functions.browser, function(key, value) {
					if (typeof value == 'function') {
						if (className = plugin_Detector.functions.browser[key]())
							plugin_Detector.cssClasses[className] = null;
					} else if (typeof value == 'object') {
						$.each(plugin_Detector.functions.browser[key], function(key1, value1) {
							if (typeof value1 == 'function') {
								if (className = plugin_Detector.functions.browser[key][key1]())
									plugin_Detector.cssClasses[className] = null;
							} else if (typeof value1 == 'object') {
								$.each(plugin_Detector.functions.browser[key][key1], function(key2, value2) {
									if (typeof value2 == 'function') {
										if (className = plugin_Detector.functions.browser[key][key1][key2]())
											plugin_Detector.cssClasses[className] = null;
									}
								});
							}
						});
					}

				});
			},
			array : function() {
				app.debug.trace("plugin_Detector.functions.classes.array()");
				return plugin_Detector.cssClasses;
			}
		},
		isMobile : function() {
			app.debug.trace("plugin_Detector.functions.isMobile()");
			if (plugin_Detector.functions.mobile.isApple() || plugin_Detector.functions.mobile.isBlackberry() || plugin_Detector.functions.mobile.isCannonical() || plugin_Detector.functions.mobile.isGoogle()
					|| plugin_Detector.functions.mobile.isMicrosoft() || plugin_Detector.functions.mobile.isMozilla())
				return "app-mobile";
			else
				return false;
		},

		mobile : {
			isApple : function() {
				app.debug.trace("plugin_Detector.functions.mobile.isApple()");
				if (plugin_Detector.functions.mobile.apple.iOS())
					return "app-mobile-apple";
				else
					return false;
			},
			apple : {
				iOS : function() {
					app.debug.trace("plugin_Detector.functions.mobile.apple.iOS()");
					if (navigator.userAgent.match(/iPhone|iPad|iPod/i))
						return "app-ios";
					else
						return false;
				},
				iPhone : function() {
					app.debug.trace("plugin_Detector.functions.mobile.apple.iPhone()");
					if (navigator.userAgent.match(/iPhone/i))
						return "app-ios";
					else
						return false;
				},
				iPad : function() {
					app.debug.trace("plugin_Detector.functions.mobile.apple.iPad()");
					if (navigator.userAgent.match(/iPad/i))
						return "app-ios";
					else
						return false;
				},
				iPod : function() {
					app.debug.trace("plugin_Detector.functions.mobile.apple.iPod()");
					if (navigator.userAgent.match(/iPod/i))
						return "app-ios";
					else
						return false;
				},
				version : {
					iOS3 : function() {
						app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS3()");
						if (navigator.userAgent.match(/OS 3_/i))
							return "app-ios-version-3";
						else
							return false;
					},
					iOS4 : function() {
						app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS4()");
						if (navigator.userAgent.match(/OS 4_/i))
							return "app-ios-version-4";
						else
							return false;
					},
					iOS5 : function() {
						app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS5()");
						if (navigator.userAgent.match(/OS 5_/i))
							return "app-ios-version-5";
						else
							return false;
					},
					iOS6 : function() {
						app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS6()");
						if (navigator.userAgent.match(/OS 6_/i))
							return "app-ios-version-6";
						else
							return false;
					},
					iOS7 : function() {
						app.debug.trace("plugin_Detector.functions.mobile.apple.version.iOS7()");
						if (navigator.userAgent.match(/OS 7_/i))
							return "app-ios-version-7";
						else
							return false;
					}
				}
			},
			isGoogle : function() {
				app.debug.trace("plugin_Detector.functions.mobile.isGoogle()");
				if (plugin_Detector.functions.mobile.google.Android())
					return "app-mobile-android";
				else
					return false;
			},
			google : {

				Android : function() {
					app.debug.trace("plugin_Detector.functions.mobile.google.Android()");
					if (navigator.userAgent.match(/Android/i))
						return "app-android";
					else
						return false;
				},
				version : {}
			},
			isMicrosoft : function() {
				app.debug.trace("plugin_Detector.functions.mobile.isMicrosoft()");
				if (plugin_Detector.functions.mobile.microsoft.Windows())
					return "app-mobile-microsoft";
			},
			microsoft : {
				Windows : function() {
					app.debug.trace("plugin_Detector.functions.mobile.microsoft.Windows()");
					if (navigator.userAgent.match(/IEMobile/i))
						return "app-windows-mobile";
					else
						return false;
				},
				version : {}
			},
			isBlackberry : function() {
				app.debug.trace("plugin_Detector.functions.mobile.isBlackberry()");
				if (plugin_Detector.functions.mobile.blackberry.blackberry())
					return "app-mobile-blackberry";
				else
					return false;
			},
			blackberry : {
				blackberry : function() {
					app.debug.trace("plugin_Detector.functions.mobile.blackberry.blackberry()");
					if (navigator.userAgent.match(/BlackBerry/i))
						return "app-blackberry";
					else
						return false;
				},
				version : {}
			},
			isMozilla : function() {
				app.debug.trace("plugin_Detector.functions.mobile.isMozilla()");
				if (plugin_Detector.functions.mobile.mozilla.firefoxOS())
					return "app-mobile-mozilla";
				else
					return false;
			},
			mozilla : {
				firefoxOS : function() {
					app.debug.trace("plugin_Detector.functions.mobile.mozilla.firefoxOS()");
				}
			},
			isCannonical : function() {
				app.debug.trace("plugin_Detector.functions.mobile.isCannonical()");
				if (plugin_Detector.functions.mobile.canonical.ubuntu())
					return "app-mobile-cannonical";
				else
					return false;
			},
			canonical : {
				ubuntu : function() {
					app.debug.trace("plugin_Detector.functions.mobile.cannonical.ubuntu()");
				}
			},
		},
		isDesktop : function() {
			app.debug.trace("plugin_Detector.functions.isDesktop()");
			if (plugin_Detector.functions.desktop.isApple() || plugin_Detector.functions.desktop.isCannonical() || plugin_Detector.functions.desktop.isMicrosoft() || plugin_Detector.functions.desktop.isDebian())
				return "app-desktop";
			else
				return false;
		},
		desktop : {
			isApple : function() {
				app.debug.trace("plugin_Detector.functions.desktop.isApple()");
				if (plugin_Detector.functions.desktop.apple.Macintosh())
					return "app-desktop-apple";
				else
					return false;
			},
			apple : {
				Macintosh : function() {
					app.debug.trace("plugin_Detector.functions.desktop.apple.Macintosh()");
					if (navigator.userAgent.match(/Macintosh/i))
						return "app-desktop-apple-macintish";
					else
						return false;
				},
				version : {}
			},
			isMicrosoft : function() {
				app.debug.trace("plugin_Detector.functions.desktop.isMicrosoft()");
				if (plugin_Detector.functions.desktop.microsoft.Windows())
					return "app-desktop-microsoft";
				else
					return false;
			},
			microsoft : {
				Windows : function() {
					app.debug.trace("plugin_Detector.functions.microsoft.Windows()");
					return navigator.userAgent.match(/Windows/i);
				},
				version : {}
			},
			isCannonical : function() {
				app.debug.trace("plugin_Detector.functions.desktop.isCannonical()");
				if (plugin_Detector.functions.desktop.cannonical.Ubuntu())
					return "app-desktop-cannonical";
				else
					return false;
			},
			cannonical : {
				Ubuntu : function() {
					app.debug.trace("plugin_Detector.functions.desktop.cannonical.Ubuntu()");
					return navigator.userAgent.match(/Ubuntu/i);
				},
				version : {}
			},
			isDebian : function() {
				app.debug.trace("plugin_Detector.functions.desktop.isDebian()");
				if (plugin_Detector.functions.desktop.debian.Debian())
					return "app-desktop-debian";
				else
					return false;
			},
			debian : {
				Debian : function() {
					app.debug.trace("plugin_Detector.functions.desktop.debian.debian()");
					return navigator.userAgent.match(/X11; Linux/i);
				},
				version : {}
			},

		},
		browser : {
			microsoft : {
				version : {}
			},
			apple : {
				version : {}
			},
			cannonical : {
				version : {}
			},
			mozilla : {
				version : {}
			},
			google : {
				version : {}
			}
		},
		media : {
			sony : {
				version : {}
			},
			microsoft : {
				version : {}
			},
			nintendo : {
				version : {}
			}
		}
	}
};