// ~/www/js$ jsdoc ./ -r -p -d documentation
/**
 * Plugin: plugin_TEMPLATE__
 * 
 * @version 1.0
 * @namespace plugin_TEMPLATE__
 */
var plugin_WebServiceError = {
	config : null,
	// called by plugins.js
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.trace("plugin_WebServiceError.pluginsLoaded()");
		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;

		if (plugin_WebServiceError.config.errorKeys == undefined) {
			app.debug.error("No errorKeys Array in plugin.WebServiceError.json");
			dfd.reject();
		}

		// load the webservice definitions
		$.each(plugin_WebServiceError.config.wseFiles, function(path, loadFile) {
			if (loadFile) {
				promises.push(plugin_WebServiceError.loadDefinitionFileAsync(path));
			}
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

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.trace("plugin_WebServiceError.pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.trace("plugin_WebServiceError.definePluginEvents()");

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_WebServiceError.afterHtmlInjectedBeforePageComputing()");

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_WebServiceError.pageSpecificEvents()");

	},
	// private functions
	loadDefinitionFileAsync : function(path) {
		app.debug.trace("plugin_WebServiceError.loadDefinitionFileAsync(" + path + ")", 20);
		var dfd = $.Deferred(), promise;
		promise = globalLoader.AsyncJsonLoader(path);

		promise.done(function(json) {
			$.each(json, function(name, values) {
				app.debug.debug("pugin.WebServiceError.js ~ plugin_WebServiceError.loadDefinitionFileAsync() - add: " + name, 20);
				plugin_WebServiceError.config.wse[name] = values;
			});
			dfd.resolve();
		});
		promise.done(function() {
			dfd.reject();
		});

		return dfd.promise();
	},

	loadDefinitionFile : function(path) {
		app.debug.trace("plugin_WebServiceError.loadDefinitionFile()");
		app.debug.debug("Load definition file: " + path);
		var json = globalLoader.JsonLoader(path);
		$.each(json, function(name, values) {
			app.debug.debug("Add definition: " + name, 20);
			plugin_WebServiceError.config.wse[name] = values;
		});
	},

	// public functions
	// called by user
	functions : {
		action : function(exceptionConfig) {
			app.debug.trace("plugin_WebServiceError.functions.action()");
		},

		getErrorName : function(webserviceResult) {
			app.debug.trace("plugin_WebServiceError.functions.getErrorName()");
			var errorName = false;

			if (webserviceResult.statusText === "error" && webserviceResult.readyState === 0 && webserviceResult.status === 0) {
				app.debug.debug("plugin_WebServiceError.functions.getErrorName() - case: webservice timed out");
				errorName = "timeout";
			}

			else {

				$.each(plugin_WebServiceError.config.errorKeys, function(index, errorKey) {

					if (webserviceResult.hasOwnProperty(errorKey)) {
						app.debug.debug("plugin_WebServiceError.functions.getErrorName() - case: webservice result has error key: " + errorKey);
						errorName = webserviceResult[errorKey];
						return false;
					}

				});
			}

			return errorName;
		},

		getExceptionConfig : function(webserviceResult) {
			app.debug.trace("plugin_WebServiceError.functions.getExceptionConfig()");

			var errorName = null;

			errorName = plugin_WebServiceError.functions.getErrorName(webserviceResult);

			if (errorName) {
				app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - errors");
				for (key in plugin_WebServiceError.config.wse) {
					app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - " + key + " == " + errorName);
					if (key == errorName) {
						app.debug.debug("plugin_WebServiceError.functions.getExceptionConfig() - case: error found");
						return plugin_WebServiceError.config.wse[key];
					}
				}
			}

			return false;
		}

	}
};