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
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		var dfd = $.Deferred();
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
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
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
		if (plugin_Debug.config.debugDevice) {
			$("body").on("change", "#cbxToggleDebug", function() {
				if ($(this).prop("checked")) {
					app.info.set("plugin_Debug.config.doDebugging", true);
				} else {
					app.info.set("plugin_Debug.config.doDebugging", false);
				}
			});
			$("body").on("click", "#btnRefresh", function() {
				location.reload();
			});
			$("body").on("click", "#btnShowLog", function() {
				var text = "";
				$.each(plugin_Debug.logObject, function(key, value) {
					text += value + "<br />\n";
				});
				app.notify.alert(text, "Log", "Log");
			});
			$("body").on("click", "#btnDeleteHtml5Storage", function() {
				app.store.localStorage.clear();
				location.reload();
			});
			$("body").on("change", "#txtDebugLevel", function() {
				var level = $('#txtDebugLevel').val();
				app.info.set("plugin_Debug.config.debugLevel", level);
			});
		}
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
		if (plugin_Debug.config.debugDevice) {
			app.debug.alert("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
			// show debug panel?
			if (plugin_Debug.config.debugPanel) {
				plugin_Debug.appendDebugArea();
			}
			// do debuging checkbox
			if (this.config.doDebugging) {
				$("#cbxToggleDebug").prop('checked', true);
			} else {
				$("#cbxToggleDebug").prop('checked', false);
			}
			// debug level
			$('#txtDebugLevel').val(plugin_Debug.config.debugLevel);

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
		app.debug.alert("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);

	},

	// private functions
	/**
	 * @private
	 */
	appendDebugArea : function(container) {
		app.debug.alert(this.config.name + ".appendDebugArea()", 5);
		// get inputs via FormInputDesigner
		var append = '<div>&nbsp;</div>';
		append += '<div id="divDebugCheckbox" data-role="fieldcontain" style="position: fixed; z-index:9999;">';
		append += '<fieldset class="debugGroup" data-role="controlgroup">';
		append += '<legend>Debug Area:</legend>';
		append += '<input type="button" name="btnRefresh" id="btnRefresh" class="custom" value="Refresh Page"/>';
		append += '<input type="button" name="btnShowLog" id="btnShowLog" class="custom" value="Show Log"/>';
		append += '<input type="checkbox" name="cbxToggleDebug" id="cbxToggleDebug" class="custom" />';
		append += '<input type="button" name="btnDeleteHtml5Storage" id="btnDeleteHtml5Storage" class="custom" value="Delete Html5 Storage"/>';
		append += '<p>Debug Level</p>';
		append += '<input type="text" name="txtDebugLevel" id="txtDebugLevel" />';
		append += '<label for="cbxToggleDebug">Toggle Debug</label>';
		append += '</fieldset>';
		append += '</div>';
		// alert(append);
		$('body').append(append);
	},

	// public functions
	/**
	 * @namespace plugin_Debug.functions
	 * 
	 */
	functions : {
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
			// console.log(text);
			if (plugin_Debug.config.doDebugging && (level >= plugin_Debug.config.debugLevel)) {
				alert("DebugLevel: " + level + "\n" + text);
			}
			if (plugin_Debug.config.logDebug && (level >= plugin_Debug.config.logDebugLevel)) {
				// plugin_Debug.functions.log("DebugLevel: " + level + " - " +
				// text);
				plugin_Debug.functions.log(text);
			}
		},
		/**
		 * Add line to log object.
		 * 
		 * @param {string}
		 *            text text to log
		 */
		log : function(text) {
			// Date.now()
			plugin_Debug.logObject.push(" - " + text);
		},
		/**
		 * Shows the log object in an alert window
		 */
		showLog : function() {
			alert(JSON.stringify(plugin_Debug.logObject));
		},
		feedback : {
			language : function(object) {
				console.log("Implement!: " + JSON.stringify(object));
				$.extend(true, plugin_Debug.feedback.language, object);
			},
			image : function(object) {
				console.log("Implement!: " + JSON.stringify(object));
				$.extend(true, plugin_Debug.feedback.image, object);
			}
		}
	}
};