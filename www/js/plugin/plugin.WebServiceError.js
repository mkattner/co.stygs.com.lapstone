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
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;
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
		;
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
	loadDefinitionFileAsync : function(path) {
		app.debug.alert("pugin.WebServiceError.js ~ plugin_WebServiceError.loadDefinitionFileAsync(" + path + ")", 20);
		var dfd = $.Deferred(), promise;
		promise = globalLoader.AsyncJsonLoader(path);

		promise.done(function(json) {
			$.each(json, function(name, values) {
				app.debug.alert("pugin.WebServiceError.js ~ plugin_WebServiceError.loadDefinitionFileAsync() - add: " + name, 20);
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
		app.debug.alert("pugin.WebServiceError.js ~ plugin_WebServiceError.loadDefinitionFile(" + path + ")", 20);
		var json = globalLoader.JsonLoader(path);
		app.debug.alert("pugin.WebServiceError.js ~ plugin_WebServiceError.loadDefinitionFile() - add each webservice definition", 20);
		$.each(json, function(name, values) {
			app.debug.alert("pugin.WebServiceError.js ~ plugin_WebServiceError.loadDefinitionFile() - add: " + name, 20);
			plugin_WebServiceError.config.wse[name] = values;
		});
	},

	// public functions
	// called by user
	functions : {
		doAction : function() {
		},

		getExceptionConfig : function(exception) {
			app.debug.alert("plugin.WebServiceError.js ~ plugin_WebServiceError.functions.getExceptionConfig()", 60);

			var errorName;

			 //alert(typeof exception + " " + JSON.stringify(exception));

			if (exception.error != undefined) {
				errorName = exception.error;
			} else if (exception.status != undefined) {
				errorName = exception.status;
			} else if (exception.exception)
				errorName = exception.exception;
			
			app.debug.alert("plugin.WebServiceError.js ~ plugin_WebServiceError.functions.getExceptionConfig() - errors", 60);
			for (key in plugin_WebServiceError.config.wse) {
				app.debug.alert("plugin.WebServiceError.js ~ plugin_WebServiceError.functions.getExceptionConfig() - " + key + " == " + errorName, 60);
				if (key == errorName) {
					app.debug.alert("plugin.WebServiceError.js ~ plugin_WebServiceError.functions.getExceptionConfig() - case: error found", 60);
					return plugin_WebServiceError.config.wse[key];
				}
			}

			return false;
		}

	}
};