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
 * Plugin: plugin_KeepAlive
 * 
 * @version 1.0
 * @namespace plugin_KeepAlive
 */
var plugin_KeepAlive = {
	config : null,
	interval : null,
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()");
		app.debug.alert("plugin_KeepAlive.pluginsLoaded() - try first keep alive");
		var dfd = $.Deferred();

		if (plugin_KeepAlive.config.useKeepAlive) {
			app.debug.alert("plugin_KeepAlive.pluginsLoaded() case: plugin_KeepAlive.config.useKeepAlive == true");
			app.debug.alert("plugin_KeepAlive.pluginsLoaded() call: plugin_KeepAlive.keepAliveRequest() to make a first keepAlive request");
			plugin_KeepAlive.keepAliveRequest();
			app.debug.alert("plugin_KeepAlive.pluginsLoaded() initialize the keepAlive interval: plugin_KeepAlive.interval ");
			plugin_KeepAlive.interval = window.setInterval("plugin_KeepAlive.keepAliveRequest()", plugin_KeepAlive.config.intervalInS * 1000);
		}

		dfd.resolve();
		return dfd.promise();

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.alert("plugin_" + this.config.name + ".definePluginEvents()");

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".afterHtmlInjectedBeforePageComputing()");

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.alert("plugin_" + this.config.name + ".pageSpecificEvents()");

	},
	// private functionsstartTime : 0.0,
	eventTriggering : function() {
		app.debug.alert("plugin_KeepAlive.eventTriggering()");
		if (!plugin_KeepAlive.config.isAlive) {
			$("[data-role=page]").trigger("connectionisdead");
		} else if (plugin_KeepAlive.config.isAlive) {
			$("[data-role=page]").trigger("connectionisalive");
		}
	},

	ajaxSuccess : function(data, textStatus, jqXHR) {
		app.debug.alert("plugin_KeepAlive.ajaxSuccess()");
		var wsDuration = Date.now() - plugin_KeepAlive.startTime;
		if (wsDuration >= plugin_KeepAlive.config.maximumResponseTime) {
			app.info.set("plugin_KeepAlive.config.lastDuration", wsDuration);
			app.info.set("plugin_KeepAlive.config.isAlive", false);
			app.info.set("plugin_KeepAlive.config.error.code", 2);
			app.info.set("plugin_KeepAlive.config.error.text", "Timeout error");
		} else {
			app.info.set("plugin_KeepAlive.config.lastDuration", wsDuration);
			app.info.set("plugin_KeepAlive.config.isAlive", true);
			app.info.set("plugin_KeepAlive.config.error.code", 0);
			app.info.set("plugin_KeepAlive.config.error.text", "No error");
		}
		app.debug.alert("plugin_KeepAlive.ajaxSuccess() value: plugin_KeepAlive.config.lastDuration = " + app.store.localStorage.get("config.plugin_KeepAlive.config.lastDuration"));
		app.debug.alert("plugin_KeepAlive.ajaxSuccess() value: plugin_KeepAlive.config.isAlive = " + app.store.localStorage.get("config.plugin_KeepAlive.config.isAlive"));
		app.debug.alert("plugin_KeepAlive.ajaxSuccess() value: plugin_KeepAlive.config.error.code = " + app.store.localStorage.get("config.plugin_KeepAlive.config.error.code"));
		app.debug.alert("plugin_KeepAlive.ajaxSuccess() value: plugin_KeepAlive.config.error.text = " + app.store.localStorage.get("config.plugin_KeepAlive.config.error.text"));
		plugin_KeepAlive.eventTriggering();
	},

	ajaxError : function(jqXHR, textStatus, errorThrown) {
		app.debug.alert("plugin_KeepAlive.ajaxError()");
		var wsDuration = Date.now() - plugin_KeepAlive.startTime;
		app.info.set("plugin_KeepAlive.config.lastDuration", wsDuration);
		app.info.set("plugin_KeepAlive.config.isAlive", false);
		app.info.set("plugin_KeepAlive.config.error.code", 1);
		app.info.set("plugin_KeepAlive.config.error.text", "Webservice Error: ");
		app.debug.alert("plugin_KeepAlive.ajaxSuccess() - KeepAlive request failed.\nReason: " + plugin_KeepAlive.config.error.text + "\nTime: " + wsDuration + "\n\n" + JSON.stringify(errorThrown, null, 4), 60);
		plugin_KeepAlive.eventTriggering();
	},

	ajax : function(url, data, type, method, timeout) {
		app.debug.alert("plugin.KeepAlive.js plugin_KeepAlive.ajax(" + url + ", " + data + ", " + type + ", " + method + ", " + timeout + ")");
		try {
			$.ajax({
				cache : false,
				url : url,
				data : data,
				dataType : type, 
				async : true,
				method : method, 
				timeout : timeout, 
				success : plugin_KeepAlive.ajaxSuccess,
				error : plugin_KeepAlive.ajaxError
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
	keepAliveRequest : function() {
		app.debug.alert("plugin_KeepAlive.keepAliveRequest()");

		var path, data, method, timeout, server, url, wsDuration;

		path = plugin_KeepAlive.config.path;
		data = "";
		method = plugin_KeepAlive.config.method;
		timeout = plugin_KeepAlive.config.timeout;
		server = plugin_WebServiceClient.functions.getServer(plugin_KeepAlive.config.server, false);
		url = server + "/" + path;
		wsDuration = 0;

		switch (plugin_KeepAlive.config.type) {
		case "json":
			plugin_KeepAlive.startTime = Date.now();
			plugin_KeepAlive.ajax(url, data, "json", method, timeout);
			break;
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
	 * 
	 */
	functions : {
		isAlive : function() {
			return plugin_KeepAlive.config.isAlive;
		},
		
		badConnectionHandler:function(){
			app.help.navigation.redirect(app.config.badConnectionPage, "slideup");
		}
	}
};