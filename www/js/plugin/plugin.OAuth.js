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

var plugin_OAuth = {
	config : null,
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

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 11);

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".pageSpecificEvents()", 11);

	},
	// private functions

	// public functions
	// called by user
	/**
	 * Public functions for plugin_OAuth
	 * 
	 * @namespace plugin_OAuth.functions
	 * 
	 */
	desktopOAuth : function(url) {
		// alert(app.config.apacheCordova);
		if (app.config.apacheCordova == null || app.config.apacheCordova == false) {
			// alert("desktop oauth");
			app.help.navigation.redirect(url);
			return true;
		}
		return false;
	},
	functions : {
		tokenFromUrl : function(parameter) {
			var url = window.location.href, regExpString, regExp, access_token;
			regExpString = "" + parameter + "=(.+)$";
			regExp = new RegExp(regExpString)
			// var error = /\?error=(.+)$/.exec(url);
			access_token = regExp.exec(url);
			if (access_token) {
				access_token = (access_token[0] + "").split("=");
				access_token = access_token[1] + "";
				access_token = access_token.split("&");
				access_token = access_token[0];
			} else {
				return false;
			}
			return access_token;
		},
		getQueryString : function() {
			try {
				//console.log("todo");
				return window.location.href.split('?')[1];
			} catch (e) {
				return '';
			}
		},
		generic : function(url) {
			if (url.indexOf("dropbox") > -1)
				return app.oa.dropbox(url);
			else if (url.indexOf("facebook") > -1)
				return app.oa.facebook(url);
			else {
				var dfd = $.Deferred();

				window.setTimeout(function() {
					dfd.resolve("Unkonwn URL: " + url);
				}, 1000);

				return dfd.promise();
			}
		},
		// dropbox
		dropbox : function(url) {
			if (plugin_OAuth.desktopOAuth(url))
				return;
			else {
				var dfd = $.Deferred(), loginWindow = window.open(url, '_blank', 'location=yes'), eventCount = 0;
				$(loginWindow).on('loadstart', function(e) {
					eventCount++;
					if (eventCount > 2) {
						var url, error, success;
						url = e.originalEvent.url;
						error = /\?error=(.+)$/.exec(url);
						success = /\?oauth_token=(.+)$/.exec(url);
						if (success) {
							loginWindow.close();
							dfd.resolve(url.split('?')[1]);
						} else if (error) {
							loginWindow.close();
							dfd.reject(error);
						}
					}
				});
				return dfd.promise();
			}
		},

		// facebook
		facebook : function(url) {
			if (plugin_OAuth.desktopOAuth(url))
				return;
			else {
				var dfd = $.Deferred(), loginWindow = window.open(url, '_blank', 'location=yes'), eventCount = 0;
				$(loginWindow).on('loadstart', function(e) {
					eventCount++;
					if (eventCount > 2) {
						var url, error, success;
						url = e.originalEvent.url;
						error = /\?error_code=(.+)$/.exec(url);
						success = /\?code=(.+)$/.exec(url);
						if (success) {
							loginWindow.close();
							dfd.resolve(url.split('?')[1]);
						} else if (error) {
							loginWindow.close();
							dfd.reject(error);
						}
					}
				});

				return dfd.promise();
			}
		},
		facebookToken : function(code, client_id, client_secret, redirect_uri) {
			$.post('https://accounts.google.com/o/oauth2/token', {
				code : code,
				client_id : client_id,
				client_secret : client_secret,
				redirect_uri : redirect_uri,
				grant_type : 'authorization_code'
			}).done(function(data) {
				// deferred.resolve(data);
			}).fail(function(response) {
				// deferred.reject(response.responseJSON);
			});
		}
	}
};