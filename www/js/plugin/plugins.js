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
		startup.addFunction("plugins: plugin events", plugins.callPluginEvents, "");
		startup.addFunction("plugins: plugin loaded event", plugins.callPluginsLoadedEvent, "");
		startup.addFunction("plugins: load all plugin files", plugins.loadPlugins, "");
		startup.addFunction("plugins: verify plugin names", plugins.verifyPluginNames, "");
		startup.addFunction("plugins: load all plugin config files", plugins.loadPluginConfig, "");
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

		promisepromiseConfiguration = plugins.loadPluginConfiguration(key);

		promisepromiseConfiguration.done(function() { // check the config:
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
				app.addObject(window['plugin_' + key].config.name, window['plugin_' + key].functions);
				app.addObject(window['plugin_' + key].config.shortname, window['plugin_' + key].functions);

				// plugin succesfully loaded
				// attach plugin's name to array
				plugins.pluginNames.push(key);

				dfd.resolve();
			});
			promise.fail(function() {
				dfd.reject()
			});
		});
		promisepromiseConfiguration.fail(function() {
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
			try {
				window['plugin_' + value].definePluginEvents();
			} catch (err) {
				app.debug.alert("Notify: The plugin has no definePluginEvents() method: plugin_" + value, 10);
			}
		});
		dfd.resolve();
		return dfd.promise();
	},
};

// constructor
