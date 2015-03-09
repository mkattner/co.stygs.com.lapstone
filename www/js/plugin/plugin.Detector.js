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
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred();

		plugin_Detector.functions.classes.generate();
		app.debug.alert("Css Classes in body Tag: " + plugin_Detector.functions.classes.classNames(), 60);
		app.debug.alert(navigator.userAgent, 60);

		success = true;

		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);

		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.alert("plugin_" + this.config.name + ".definePluginEvents()", 11);

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

		//app.debug.alert("Fatal exception!\n\n" + JSON.stringify(err, null, 4), 50);
		//app.debug.log(JSON.stringify(err, null, 4));
	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 11);

		console.log("TODO - clean up & do not use pagebeforecreate");
			if (plugin_Detector.config.addCssClassesToBodyTag) {
				// add css classes

				$.each(app.detect.classes.array(), function(key, name) {
					if (!$('body').hasClass(key))
						$('body').addClass(key);
				});
			}
			success = true;
		
	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".pageSpecificEvents()", 11);

	},
	// private functions
	jQueryMobileAndCordovaLoaded : function() {
		plugin_Detector.cssClasses["app-jQueryMobile-and-Cordova"] = null;
	},

	jQueryMobileLoaded : function() {
		plugin_Detector.cssClasses["app-jQueryMobile"] = null;
	},

	cordovaLoaded : function() {
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
				var classes = "";
				$.each(plugin_Detector.cssClasses, function(key, value) {
					classes += key + " ";
				});
				return classes;
			},
			generate : function() {
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
				return plugin_Detector.cssClasses;
			}
		},
		isMobile : function() {
			if (plugin_Detector.functions.mobile.isApple() || plugin_Detector.functions.mobile.isBlackberry()
					|| plugin_Detector.functions.mobile.isCannonical() || plugin_Detector.functions.mobile.isGoogle()
					|| plugin_Detector.functions.mobile.isMicrosoft() || plugin_Detector.functions.mobile.isMozilla())
				return "app-mobile";
			else
				return false;
		},

		mobile : {
			isApple : function() {
				if (plugin_Detector.functions.mobile.apple.iOS())
					return "app-mobile-apple";
				else
					return false;
			},
			apple : {
				iOS : function() {
					if (navigator.userAgent.match(/iPhone|iPad|iPod/i))
						return "app-ios";
					else
						return false;
				},
				iPhone : function() {
					if (navigator.userAgent.match(/iPhone/i))
						return "app-ios";
					else
						return false;
				},
				iPad : function() {
					if (navigator.userAgent.match(/iPad/i))
						return "app-ios";
					else
						return false;
				},
				iPod : function() {
					if (navigator.userAgent.match(/iPod/i))
						return "app-ios";
					else
						return false;
				},
				version : {
					iOS3 : function() {
						if (navigator.userAgent.match(/OS 3_/i))
							return "app-ios-version-3";
						else
							return false;
					},
					iOS4 : function() {
						if (navigator.userAgent.match(/OS 4_/i))
							return "app-ios-version-4";
						else
							return false;
					},
					iOS5 : function() {
						if (navigator.userAgent.match(/OS 5_/i))
							return "app-ios-version-5";
						else
							return false;
					},
					iOS6 : function() {
						if (navigator.userAgent.match(/OS 6_/i))
							return "app-ios-version-6";
						else
							return false;
					},
					iOS7 : function() {
						if (navigator.userAgent.match(/OS 7_/i))
							return "app-ios-version-7";
						else
							return false;
					}
				}
			},
			isGoogle : function() {
				if (plugin_Detector.functions.mobile.google.Android())
					return "app-mobile-android";
				else
					return false;
			},
			google : {
				Android : function() {
					if (navigator.userAgent.match(/Android/i))
						return "app-android";
					else
						return false;
				},
				version : {}
			},
			isMicrosoft : function() {
				if (plugin_Detector.functions.mobile.microsoft.Windows())
					return "app-mobile-microsoft";
			},
			microsoft : {
				Windows : function() {
					if (navigator.userAgent.match(/IEMobile/i))
						return "app-windows-mobile";
					else
						return false;
				},
				version : {}
			},
			isBlackberry : function() {
				if (plugin_Detector.functions.mobile.blackberry.blackberry())
					return "app-mobile-blackberry";
				else
					return false;
			},
			blackberry : {
				blackberry : function() {
					if (navigator.userAgent.match(/BlackBerry/i))
						return "app-blackberry";
					else
						return false;
				},
				version : {}
			},
			isMozilla : function() {
				if (plugin_Detector.functions.mobile.mozilla.firefoxOS())
					return "app-mobile-mozilla";
				else
					return false;
			},
			mozilla : {
				firefoxOS : function() {
				}
			},
			isCannonical : function() {
				if (plugin_Detector.functions.mobile.canonical.ubuntu())
					return "app-mobile-cannonical";
				else
					return false;
			},
			canonical : {
				ubuntu : function() {
				}
			},
		},
		isDesktop : function() {
			if (plugin_Detector.functions.desktop.isApple() || plugin_Detector.functions.desktop.isCannonical()
					|| plugin_Detector.functions.desktop.isMicrosoft() || plugin_Detector.functions.desktop.isDebian())
				return "app-desktop";
			else
				return false;
		},
		desktop : {
			isApple : function() {
				if (plugin_Detector.functions.desktop.apple.Macintosh())
					return "app-desktop-apple";
				else
					return false;
			},
			apple : {
				Macintosh : function() {
					if (navigator.userAgent.match(/Macintosh/i))
						return "app-desktop-apple-macintish";
					else
						return false;
				},
				version : {}
			},
			isMicrosoft : function() {
				if (plugin_Detector.functions.desktop.microsoft.Windows())
					return "app-desktop-microsoft";
				else
					return false;
			},
			microsoft : {
				Windows : function() {
					return navigator.userAgent.match(/Windows/i);
				},
				version : {}
			},
			isCannonical : function() {
				if (plugin_Detector.functions.desktop.cannonical.Ubuntu())
					return "app-desktop-cannonical";
				else
					return false;
			},
			cannonical : {
				Ubuntu : function() {
					return navigator.userAgent.match(/Ubuntu/i);
				},
				version : {}
			},
			isDebian : function() {
				if (plugin_Detector.functions.desktop.debian.Debian())
					return "app-desktop-debian";
				else
					return false;
			},
			debian : {
				Debian : function() {
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