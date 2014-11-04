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
		plugins.loadPluginConfig();
		plugins.verifyPluginNames();
		plugins.loadPlugins();
		plugins.callPluginsLoadedEvent();
		plugins.callPluginEvents();
	},

	loadPluginConfig : function() {

		if (app.config.min) {
			plugins.config = config_json;
		} else {
			var url = "../js/plugin/plugins.json";
			$.ajax({
				url : url,
				async : false,
				dataType : "json",
				success : function(json) {
					plugins.config = json;
				},
				error : function(jqXHR, textStatus, errorThrown) {
					alert("Fatal error in javascriptLoader.js: Can't load the plugin config. Url: " + url + " Error: " + textStatus);
				}
			});
		}
	},

	verifyPluginNames : function() {
	},

	onPluginLoaded : function(key) {
		if (window['plugin_' + key] == undefined) {
			alert("Fatal error: Plugin class is not defined: plugin_" + key);
			return;
		}

		// load the config into plugins
		if (app.config.min) {
			window['plugin_' + key].config = window['config_' + key];
		} else {
			window['plugin_' + key].config = JsonLoader("../js/plugin/plugin." + key + ".json");
		}

		// check the config: name
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
		window['plugin_' + key].constructor();

		// attach plugin's public functions to app object
		app.addObject(window['plugin_' + key].config.name, window['plugin_' + key].functions);
		app.addObject(window['plugin_' + key].config.shortname, window['plugin_' + key].functions);

		// plugin succesfully loaded
		// attach plugin's name to array
		plugins.pluginNames.push(key);

	},

	loadPlugins : function() {
		$.each(plugins.config, function(key, value) {
			if (value == true) {
				if (app.config.min) {
					// alert("load: " + key);
					plugins.onPluginLoaded(key);
				} else {
					var url = "../js/plugin/plugin." + key + ".js";
					$.ajax({
						url : url,
						async : false,
						dataType : "script",
						success : function(json) {
							plugins.onPluginLoaded(key);
						},
						error : function(jqXHR, textStatus, errorThrown) {
							alert("Fatal Error: Can't load plugin: " + url);
						}
					});
				}
			}
		});
	},

	callPluginsLoadedEvent : function() {
		$.each(plugins.pluginNames, function(key, value) {
			window['plugin_' + value].pluginsLoaded();
		});
	},

	callPluginEvents : function() {
		$.each(plugins.pluginNames, function(key, value) {
			try {
				window['plugin_' + value].definePluginEvents();
			} catch (err) {
				app.debug.alert("Notify: The plugin has no definePluginEvents() method: plugin_" + value, 10);
			}
		});
	},
};

// constructor
