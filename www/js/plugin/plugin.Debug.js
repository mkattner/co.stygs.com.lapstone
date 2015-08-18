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

/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace plugin_Debug
 */
var plugin_Debug = {
	/**
	 * Configuration loaded from json file or html5 storage. Use
	 * plugin_Informator to get access.
	 * 
	 * @private
	 */
	config : null,

	/**
	 * Log object
	 * 
	 * @private
	 */
	logObject : [],
	feedback : {
		language : {},
		image : {}
	},
	// obligate functions

	/**
	 * Constructor is called by plugins.js
	 * 
	 * @protected
	 * 
	 */
	constructor : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	/**
	 * PluginsLoaded event. Called by plugins.js after all plugins are loaded.
	 * 
	 * @protected
	 */
	pluginsLoaded : function() {
		app.debug.trace("plugin_Debug.pluginsLoaded()");
		var dfd = $.Deferred();

		// add dev language to language array
		plugin_MultilanguageIso639_3.config.availableLanguages.push("dev");

		dfd.resolve();
		return dfd.promise();
	},

	// called after all pages are loaded
	/**
	 * PagesLoaded event. Called by pages.js after all pages are loaded.
	 * 
	 * @protected
	 */
	pagesLoaded : function() {
		app.debug.trace("plugin_Debug.pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},
	/**
	 * Define the jQuery event delegations for the plugin. Called by pages.js
	 * after ...
	 * 
	 * @protected
	 * @returns {boolean} Succesfull or unsuccessful
	 */
	definePluginEvents : function() {
		app.debug.trace("plugin_Debug.definePluginEvents()");
	},

	// called by pages.js
	/**
	 * AfterHtmlInjectedBeforePageComputing event. Called by pages.js after
	 * page.create().
	 * 
	 * @protected
	 * @param container
	 *            {object} jQuery page div
	 */
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_Debug.pagesLoaded()");
		if (plugin_Debug.config.debugDevice && (app.config.min == false)) {
			var debugDiv, select;

			debugDiv = app.ni.element.div({
				id : "divDebug",
				attributes : {
					"data-enhance" : "false"
				},
				styles : {
					"position" : "fixed",
					"z-index" : "1050",
					"top" : "0px",
					"left" : "0px",
					"padding" : "5px",
					"min-width" : "150px",
					"min-height" : "50px",
					"background-color" : "rgba(200, 200, 200, 0.7)"
				}
			});

			select = app.ni.select.single({
				id : "selConsoleLevel",
				label : true,
				labelText : "console level",
				container : true
			});

			$.each(plugin_Debug.config.debugLevels, function(levelName, ratingValue) {
				select.find("select").append(app.ni.select.option({
					text : levelName,
					value : levelName,
					selected : (plugin_Debug.config.consoleLevel == levelName) ? true : false
				}));
			});

			debugDiv.append(select);

			select = app.ni.select.single({
				id : "selLogLevel",
				label : true,
				labelText : "log level",
				container : true
			});

			$.each(plugin_Debug.config.debugLevels, function(levelName, ratingValue) {
				select.find("select").append(app.ni.select.option({
					text : levelName,
					value : levelName,
					selected : (plugin_Debug.config.logLevel == levelName) ? true : false
				}));
			});

			debugDiv.append(select);

			debugDiv.append(app.ni.button.button({
				id : "btnClose",
				value : "close"
			}))

			container.append(debugDiv);
		}
	},
	/**
	 * Called once by pages.js
	 * 
	 * @protected
	 * @param container
	 *            {object} jQuery page div
	 */
	pageSpecificEvents : function(container) {
		app.debug.trace("plugin_Debug.pageSpecificEvents()");

		if (plugin_Debug.config.debugDevice && (app.config.min == false)) {
			$(document).on('change', '#selConsoleLevel', function() {
				app.info.set("plugin_Debug.config.consoleLevel", $('#selConsoleLevel option:selected').val());
			});

			$(document).on('change', '#selLogLevel', function() {
				app.info.set("plugin_Debug.config.logLevel", $('#selLogLevel option:selected').val());
			});

			$(document).on('click', '#btnClose', function() {
				$('#divDebug').slideUp();
			})
		}
	},

	// private functions
	/**
	 * @private
	 */

	// public functions
	/**
	 * @namespace plugin_Debug.functions
	 * 
	 */
	functions : {
		// debug functions
		trace : function(output) {
			this.log(output, "TRACE");
		},
		debug : function(output) {
			this.log(output, "DEBUG");
		},
		info : function(output) {
			this.log(output, "INFO");
		},
		warn : function(output) {
			this.log(output, "WARN");
		},
		error : function(output) {
			this.log(output, "ERROR");
		},
		fatal : function(output) {
			this.log(output, "FATAL");
		},
		/**
		 * Alert if the configured debug level is smaller then the current debug
		 * level.
		 * 
		 * @param {string}
		 *            text Text to show.
		 * @param {int}
		 *            level Current debug level.
		 */
		alert : function(text, level) {
			plugin_Debug.functions.log(text, "DEBUG");
		},
		log : function(output, level) {

			// log to object
			if (plugin_Debug.config.debugLevels[level] >= plugin_Debug.config.debugLevels[plugin_Debug.config.logLevel]) {
				plugin_Debug.logObject.push(output);
			}
			// log to console

			// alert(output + level);
			if (plugin_Debug.config.debugLevels[level] >= plugin_Debug.config.debugLevels[plugin_Debug.config.consoleLevel]) {
				console.log(level + ": " + output);
			}
			// log to webservice
		},

		/**
		 * Shows the log object in an alert window
		 */
		showLog : function() {
			console.warn("Deprecated function!!");
			alert(JSON.stringify(plugin_Debug.logObject));
		},
		feedback : {

			language : function(object) {
				app.debug.trace("plugin_Debug.functions.feedback.language()");
				app.debug.warn("Unimplemented language: " + JSON.stringify(object));
				$.extend(true, plugin_Debug.feedback.language, object);
			},

			languageGetJson : function() {
				app.debug.trace("plugin_Debug.functions.feedback.languageGetJson()");
				return JSON.stringify($.extend(true, plugin_Debug.feedback.language, plugin_MultilanguageIso639_3.dictionary));
			},

			image : function(object) {
				app.debug.trace("plugin_Debug.functions.feedback.image()");
				app.debug.warn("Unimplemented image: " + JSON.stringify(object));
				$.extend(true, plugin_Debug.feedback.image, object);
			},
			imageGetJson : function() {
				app.debug.trace("plugin_Debug.functions.feedback.languageGetJson()");
				return JSON.stringify($.extend(true, plugin_Debug.feedback.image, plugin_ImageProvider.images));
			}
		}
	},
/**
 * Add line to log object.
 * 
 * @param {string}
 *            text text to log
 */

};