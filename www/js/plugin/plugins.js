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
 * Plugin Manager
 * 
 * @version 1.0
 * @namespace
 */
var plugins = {
	config : null,
	pluginNames : [],
	constructor : function() {
		var dfd = $.Deferred();

		// reverse order
		startup.addFunction("lapstone is defining the plugins' events", plugins.callPluginEvents, "");
		startup.addFunction("lapstone is calling the plugins' loaded event", plugins.callPluginsLoadedEvent, "");
		startup.addFunction("lapstone is verifying the plugins' properties", plugins.verifyPlugins, "");
		startup.addFunction("lapstone is loading the plugins", plugins.loadPlugins, "");
		startup.addFunction("lapstone us verifying the plugins' configuration", plugins.verifyPluginNames, "");
		startup.addFunction("lapstone is loading the plugins' configuration", plugins.loadPluginConfig, "");
		dfd.resolve();
		return dfd.promise();
	},

	loadPluginConfig : function() {
		var dfd = $.Deferred(), promise;
		if (app.config.min) {
			plugins.config = config_json;
			dfd.resolve();
		} else {
			promise = globalLoader.AsyncJsonLoader("../js/plugin/plugins.json");
			promise.done(function(data) {
				plugins.config = data;
				// remove unused plugins
				$.each(plugins.config, function(pluginName, use) {
					if (!use)
						delete plugins.config[pluginName];
				});
				dfd.resolve();
			});

			promise.fail(function() {
				dfd.reject();
			});
		}

		return dfd.promise();
	},

	verifyPluginNames : function() {
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();
	},

	verifyPlugins : function() {
		var dfd = $.Deferred();

		$.each(plugins.config, function(pluginName, loaded) {
			if (plugins.config.Debug && loaded) {
				if (!window['plugin_' + pluginName].priv)
					console.warn("The plugin " + pluginName + " has no priv object.");
			}
		});

		dfd.resolve();
		return dfd.promise();
	},

	loadPluginConfiguration : function(key) {
		var dfd = $.Deferred(), promise;
		// load the config into plugins
		if (app.config.min) {
			window['plugin_' + key].config = window['config_' + key];
			dfd.resolve();
		} else {

			promise = globalLoader.AsyncJsonLoader("../js/plugin/plugin." + key + ".json");
			promise.done(function(json) {
				window['plugin_' + key].config = json;
				dfd.resolve();
			});
			promise.fail(function() {
				dfd.reject();
			});
		}

		return dfd.promise();
	},

	onPluginLoaded : function(key) {
		var dfd = $.Deferred(), promise, promiseConfiguration;

		if (window['plugin_' + key] == undefined) {
			alert("Fatal error: Plugin class is not defined: plugin_" + key);
			return;
		}

		promiseConfiguration = plugins.loadPluginConfiguration(key);

		promiseConfiguration.done(function() { // check the config:
			// name
			if (window['plugin_' + key].config.name == undefined) {
				alert("Fatal error: The property 'name' is not defined in JSON file: ../js/plugin." + key + ".json")
				return false;
			}
			// check the config: shortname
			if (window['plugin_' + key].config.shortname == undefined) {
				alert("Fatal error: The property 'shortname' is not defined in JSON file: ../js/plugin." + key + ".json")
				return false;
			}

			// call the plugin's contructor
			// console.log('plugin_' + key);
			promise = window['plugin_' + key].constructor();

			promise.done(function() {
				// attach plugin's public functions to app object
				app[window['plugin_' + key].config.shortname] = window['plugin_' + key].functions;

				// plugin succesfully loaded
				// attach plugin's name to array
				plugins.pluginNames.push(key);

				dfd.resolve();
			});
			promise.fail(function() {
				dfd.reject()
			});
		});

		promiseConfiguration.fail(function() {
			dfd.reject();
		});

		return dfd.promise();
	},

	loadPlugins : function() {
		var dfd = $.Deferred(), promises_js = Array(), promiseOfPromises_js, promises_func = Array(), promiseOfPromises_func;
		$.each(plugins.config, function(key, value) {
			if (value == true) {
				if (app.config.min) {
					// console.log("todo !!!!!");
					promises_js.push(plugins.onPluginLoaded(key));
				} else {
					promises_js.push(globalLoader.AsyncScriptLoader("../js/plugin/plugin." + key + ".js"));
				}
			}
		});

		promiseOfPromises_js = $.when.apply($, promises_js);

		if (app.config.min) {
			promiseOfPromises_js.done(function() {
				dfd.resolve();
			});
			promiseOfPromises_js.fail(function() {
				dfd.reject();
			});

		} else {

			promiseOfPromises_js.done(function() {
				$.each(plugins.config, function(key, value) {
					promises_func.push(plugins.onPluginLoaded(key));
				});

				promiseOfPromises_func = $.when.apply($, promises_func);

				promiseOfPromises_func.done(function() {
					dfd.resolve();
				});
				promiseOfPromises_func.fail(function() {
					dfd.reject()
				});
			});

			promiseOfPromises_js.fail(function() {
				dfd.reject();
			});
		}

		// dfd.resolve();
		return dfd.promise();
	},

	callPluginsLoadedEvent : function() {
		var dfd = $.Deferred(), promises = Array(), promiseOfPromises;

		$.each(plugins.pluginNames, function(key, value) {
			promises.push(window['plugin_' + value].pluginsLoaded());
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

	callPluginEvents : function() {
		var dfd = $.Deferred();
		$.each(plugins.pluginNames, function(key, value) {
			// try {
			window['plugin_' + value].definePluginEvents();
			// } catch (err) {
			// app.debug.alert("Notify: The plugin has no definePluginEvents()
			// method: plugin_" + value, 10);
			// }
		});
		dfd.resolve();
		return dfd.promise();
	},

	functions : {
		pluginLoaded : function(pluginName) {
			app.debug.trace("plugins.functions.pluginLoaded()");
			if (plugins.config.hasOwnProperty(pluginName)) {
				app.debug.debug("plugins.functions.pluginLoaded() - true: " + pluginName);
				return true;
			}

			else {
				app.debug.debug("plugins.functions.pluginLoaded() - false: " + pluginName);
				return false;
			}
		},

	}
};

// constructor
