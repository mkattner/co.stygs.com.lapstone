// # sourceURL=plugin.KeepAlive.js
/**
 * Copyright (c) 2018 martin.kattner@gmail.com Permission is hereby granted,
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

var plugin_KeepAlive = {
	config: null,
	interval: null,
	// called by plugins.js
	constructor: function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded: function() {
		app.debug.trace(this.config.name + ".pluginsLoaded()");
		app.debug.debug("plugin_KeepAlive.pluginsLoaded() - try first keep alive");
		var dfd = $.Deferred();

		if (plugin_KeepAlive.config.useKeepAlive) {
			app.debug.debug("plugin_KeepAlive.pluginsLoaded() case: plugin_KeepAlive.config.useKeepAlive == true");
			app.debug.debug("plugin_KeepAlive.pluginsLoaded() call: plugin_KeepAlive.keepAliveRequest() to make a first keepAlive request");
			plugin_KeepAlive.keepAliveRequest();
			app.debug.debug("plugin_KeepAlive.pluginsLoaded() initialize the keepAlive interval: plugin_KeepAlive.interval ");
			plugin_KeepAlive.interval = window.setInterval(function() {
				plugin_KeepAlive.keepAliveRequest();
			}, plugin_KeepAlive.config.intervalInS * 1000);
		}

		dfd.resolve();
		return dfd.promise();

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded: function() {
		app.debug.trace("plugin_" + this.config.name + ".pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents: function() {
		app.debug.trace("plugin_" + this.config.name + ".definePluginEvents()");

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing: function(container) {
		app.debug.trace("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()");

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents: function(container) {
		app.debug.trace("plugin_" + this.config.name + ".pageSpecificEvents()");

	},
	// private functionsstartTime : 0.0,
	eventTriggering: function(isAlive) {
		app.debug.trace("plugin_KeepAlive.eventTriggering()");
		if (!isAlive) {
			$("[data-role=page]").trigger("connectionisdead");
			$(window).trigger("connectionisdead");
		}

		else if (isAlive) {
			$("[data-role=page]").trigger("connectionisalive");
			$(window).trigger("connectionisalive");
		}
	},

	ajax: function(url, data, type, method, timeout) {
		app.debug.trace("plugin.KeepAlive.js plugin_KeepAlive.ajax(" + url + ", " + data + ", " + type + ", " + method + ", " + timeout + ")");
		try {
			return $.ajax({
				cache: false,
				url: url,
				data: data,
				dataType: type,
				async: true,
				method: method,
				timeout: timeout,
				success: plugin_KeepAlive.ajaxSuccess,
				error: plugin_KeepAlive.ajaxError
			})

				.done(function(data, textStatus, jqXHR) {
					app.debug.trace("plugin_KeepAlive.ajaxSuccess()");
					var wsDuration = Date.now() - plugin_KeepAlive.startTime;
					if (wsDuration >= plugin_KeepAlive.config.maximumResponseTime) {
						app.persist.setPluginConfiguration("KeepAlive", "lastDuration", wsDuration);

						app.persist.setPluginConfiguration("KeepAlive", "isAlive", false);

						app.persist.setPluginConfiguration("KeepAlive", "error.code", 2);

						app.persist.setPluginConfiguration("KeepAlive", "error.text", "Timeout error");

					}

					else {
						app.persist.setPluginConfiguration("KeepAlive", "lastDuration", wsDuration);

						app.persist.setPluginConfiguration("KeepAlive", "isAlive", true);

						app.persist.setPluginConfiguration("KeepAlive", "error.code", 0);

						app.persist.setPluginConfiguration("KeepAlive", "error.text", "No error");
					}

					app.debug.warn(JSON.stringify(app.persist.getPluginConfiguration("KeepAlive")));

					plugin_KeepAlive.eventTriggering(plugin_KeepAlive.config.isAlive);

					app.debug.validate(app.alive.config.versionCheck, "boolean")
					if (app.alive.config.versionCheck === true) {

						app.debug.validate(data.data.versionApp, "string")
						if (data.data.versionApp.toIntegerVersion() > app.config.version.app.toIntegerVersion()) {
							// APP VERSION DOESN'T EQUAL
							app.actions.outdated("app")
						} else if (data.data.versionApp.toIntegerVersion() < app.config.version.app.toIntegerVersion()) {
							// SEVER OUTDATED
							app.actions.outdated("server")
						} else if (data.data.versionApp.toIntegerVersion() == app.config.version.app.toIntegerVersion()) {
							app.debug.debug("app version equals.");
						} else {
							app.debug.warn("No app version exists in keep alive response")
						}

						app.debug.validate(data.data.versionLapstone, "string")
						if (data.data.versionLapstone.toIntegerVersion() > app.config.version.lapstone.toIntegerVersion()) {
							// LAPSTONE VERSION DOESN'T EQUAL
							app.actions.outdated("lapstone")
						} else if (data.data.versionLapstone.toIntegerVersion() < app.config.version.lapstone.toIntegerVersion()) {
							// SEVER OUTDATED
							app.actions.outdated("server")
						} else if (data.data.versionLapstone.toIntegerVersion() == app.config.version.lapstone.toIntegerVersion()) {
							app.debug.debug("lapstone version equals.");
						} else {
							app.debug.warn("No lapstone version exists in keep alive response")
						}
					}
				})

				.fail(function(jqXHR, textStatus, errorThrown) {
					app.debug.trace("plugin_KeepAlive.ajaxError()");
					var wsDuration = Date.now() - plugin_KeepAlive.startTime;

					app.persist.setPluginConfiguration("KeepAlive", "lastDuration", wsDuration);

					app.persist.setPluginConfiguration("KeepAlive", "isAlive", false);

					app.persist.setPluginConfiguration("KeepAlive", "error.code", 1);

					app.persist.setPluginConfiguration("KeepAlive", "error.text", "Webservice Error");

					app.debug.debug("plugin_KeepAlive.ajaxSuccess() - KeepAlive request failed: " + plugin_KeepAlive.config.error.text + "\nTime: " + wsDuration + "\n\n" + JSON.stringify(errorThrown, null, 4), 60);
					plugin_KeepAlive.eventTriggering(plugin_KeepAlive.config.isAlive);

				});
		} catch (err) {
			alert("Fatal exception!\n\n" + JSON.stringify(err, null, 4));
			app.debug.log(JSON.stringify(err, null, 4));
		}
	},

	/*
	 * 
	 * 0 OK; 1 Webservice failed; 2 Timeout Error
	 */
	keepAliveRequest: function() {
		app.debug.trace("plugin_KeepAlive.keepAliveRequest()");

		var path, data, method, timeout, server, url, wsDuration;

		path = plugin_KeepAlive.config.path;
		data = "";
		method = plugin_KeepAlive.config.method;
		timeout = plugin_KeepAlive.config.timeout;

		try {
			server = plugin_WebServiceClient.functions.getServer(plugin_KeepAlive.config.server, false);
		} catch (e) {
			return;
		}

		// server = (server.endsWith("/") ? server.substr(0, server.length - 1)
		// : server);
		// path = (path.startsWith("/") ? path.substr(1, path.length) : path);
		// alert(server + " " + path)
		url = server.pathCombine(path);

		// url = url.replace("//", "/");
		wsDuration = 0;

		switch (plugin_KeepAlive.config.type) {
			case "json":
				plugin_KeepAlive.startTime = Date.now();

				var response = plugin_KeepAlive.ajax(url, data, "json", method, timeout);

				return response;
			case "xml":
				alert("still not implemented");
				break;
			case "text":
				alert("still not implemented");
				break;
			case "html":
				alert("still not implemented");
				break;
			default:
				alert("keepAliveRequest: no such type: " + plugin_KeepAlive.config.type);
		}
	},

	// public functions
	// called by user
	/**
	 * Public functions for plugin_KeepAlive
	 * 
	 * @namespace plugin_KeepAlive.functions
	 */
	functions: {
		request: function() {

			return plugin_KeepAlive.keepAliveRequest();

		},

		isAlive: function() {
			if (plugin_KeepAlive.config.useKeepAlive === false) {
				return true;
			}

			else {
				return plugin_KeepAlive.config.isAlive;
			}
		},

		badConnectionHandler: function() {
			app.nav.redirect(app.config.badConnectionPage, "none");
		}
	}
};
