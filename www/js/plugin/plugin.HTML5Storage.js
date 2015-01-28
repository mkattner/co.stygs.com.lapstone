// data-html5-*
/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace
 */
var plugin_HTML5Storage = {
	config : null,
	constructor : function() {
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
	},

	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
	},

	definePluginEvents : function() {
		// data-html5-<storage id>
		$(document).on("click", "a", function(event) {
			app.debug.alert("plugin.HTML5Storage.js plugin_HTML5Storage.definePluginEvents()", 12);
			$.each($(this).attrs(), function(key, value) {
				if (key.substring(0, 11).trim().toLowerCase() == "data-html5-") {
					app.debug.alert("plugin.HTML5Storage.js plugin_HTML5Storage.definePluginEvents() Set localStorage: " + key + " = " + value, 60);
					plugin_HTML5Storage.functions.localStorage.set(key, value);
				}
			});
		});
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
	},
	pageSpecificEvents : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
	},

	// private functions
	setDeep : function(el, key, value) {
		app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.setDeep(' + el + ', ' + key + ', ' + value + ')', 20);
		key = key.split('.');
		var i = 0, n = key.length;
		for (; i < n - 1; ++i) {
			el = el[key[i]];
		}
		return el[key[i]] = value;
	},

	setDeepX : function(el, key, value) {
		app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.setDeepX(' + el + ', ' + key + ', ' + value + ')', 20);
		keyS = key.split('.');
		if (keyS[0]) {
			if (keyS.length == 1)
				el[keyS[0]] = value;
			else {
				if (el[keyS[0]] == undefined)
					el[keyS[0]] = {};
				el[keyS[0]] = this.setDeepX(el[keyS[0]], key.substr(keyS[0].length + 1), value);
			}
		}
		return el;
	},

	getDeep : function(el, key) {
		app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.getDeep(' + el + ', ' + key + ')', 20);
		key = key.split('.');
		var i = 0, n = key.length;
		for (; i < n; ++i) {
			el = el[key[i]];
		}
		return el;
	},

	parseValue : function(value) {
		app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.parseValue(' + value + ')', 20);
		switch (value) {
		// is true?
		case "true":
			app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.parseValue() - case: value == true', 20);
			value = true;
			break;
		// is false?
		case "false":
			app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.parseValue() - case: value == false', 20);
			value = false;
			break;
		// is null?
		case "null":
			app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.parseValue() - case: value == null', 20);
			value = null;
			break;
		default:
			app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.parseValue() - case: default', 20);
			if (/^(\+|\-){0,1}([0-9])+$/.test(value)) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.parseValue() - case: typeof value == integer', 20);
				value = parseInt(value);
			}
			// is float?
			if (/^(\+|\-){0,1}([0-9])+(\.){1}([0-9])+$/.test(value)) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.parseValue() - case: typeof value == float', 20);
				value = parseFloat(value);
			}
			break;
		}
		app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.parseValue() - return: ' + value, 20);
		return value;
	},
	getSpace : function(length) {
		app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.getSpace(' + length + ')', 20);
		var string = "";
		for (i = 0; i < length; i++)
			string = string + " ";
		return string;
	},

	// public functions
	functions : {
		pufferedFormValuePrefix : "pufferedFormValue-",
		loadValueIntoObject : function(locator) {
			app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.loadValueIntoObject(' + locator + ')', 20);
			var propertyLocation = locator.substring("config.".length), value = this.localStorage.get(locator);
			plugin_HTML5Storage.setDeep(window, propertyLocation, value);
		},

		localStorage : {
			set : function(key, val) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.set(' + key + ', ' + val + ')', 1);
				key = key.toLowerCase();
				window.localStorage.setItem(app.config.name + "." + key, val);
				return true;
			},
			get : function(key) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.get(' + key + ')', 3);
				key = key.toLowerCase();
				return plugin_HTML5Storage.parseValue(window.localStorage.getItem(app.config.name + "." + key));
			},
			clear : function() {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.clear()', 3);
				// window.localStorage.clear();
				$.each(window.localStorage, function(key, value) {
					if (key.substring(0, app.config.name.length) == app.config.name) {
						window.localStorage.removeItem(key);
					}
				});
				return true;
			},
			clearHtml5 : function() {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.clearHtml5()', 3);
				$.each(window.localStorage, function(key, value) {
					if (key.substr(app.config.name.length + 1, 10) == "data-html5") {
						try {
							window.localStorage.removeItem(key.trim())
						} catch (err) {
							alert(err);
						}
					}
				});
				return true;
			},

			pufferFormValues : function(container) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.pufferFormValues()', 3);
				container.find("input[type=text], input[type=password]").each(
						function(elementNumber, element) {
							plugin_HTML5Storage.functions.localStorage.set(plugin_HTML5Storage.functions.pufferedFormValuePrefix + container.attr("id") + "__"
									+ $(element).attr("id"), $(element).val());
						});
			},
			getPufferedFormValue : function(container, id) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.getPufferedFormValue()', 3);
				var containerId;
				if (typeof container == "object")
					containerId = container.attr("id");
				else
					containerId = container;
				return plugin_HTML5Storage.functions.localStorage.get(plugin_HTML5Storage.functions.pufferedFormValuePrefix + containerId + "__" + id);
			},
			restorePufferedFormValues : function(container) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.restorePufferedFormValues()', 3);
				container.find("input[type=text]").each(function(elementNumber, element) {
					var id, value;
					id = $(element).attr("id");
					value = plugin_HTML5Storage.functions.localStorage.getPufferedFormValue(container, id);
					$(element).val(value);
				});
			},
			clearPufferedFormValues : function() {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.clearPufferedFormValues()', 3);
				$.each(window.localStorage, function(key, value) {
					if (key.substring(0, app.config.name.length) == app.config.name) {
						newkey = key.substring(app.config.name.length + 1);
						var comp1, comp2;
						comp1 = newkey.substring(0, plugin_HTML5Storage.functions.pufferedFormValuePrefix.length).toLowerCase();
						comp2 = plugin_HTML5Storage.functions.pufferedFormValuePrefix.toLowerCase();
						// console.log(comp1 + " == " + comp2);
						// console.log(comp2);
						if (comp1 == comp2) {
							// alert("dsasd");
							window.localStorage.removeItem(key);
						}
					}
				});
			},
			removeItem : function(key) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.removeItem()', 3);
				window.localStorage.removeItem(app.config.name + "." + key);
				return true;
			},
			show : function() {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.show()', 3);
				var string = '', i = 0;
				$.each(window.localStorage, function(key, value) {
					if (key.substring(0, app.config.name.length) == app.config.name) {
						string += key + "\n" + plugin_HTML5Storage.getSpace(app.config.name.length + 1) + key.substring(app.config.name.length + 1) + " = "
								+ value + "\n";
						i++;
					} else {
						string += key + " = " + value + "\n";
						i++;
					}
					/*
					 * if (i % 20 == 0) { alert(string); string = ""; }
					 */
				});
				return string;
			},
			log : function() {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.log()', 3);
				$.each(window.localStorage, function(key, value) {
					if (key.substring(0, app.config.name.length) == app.config.name) {
						app.debug.log(key.substring(app.config.name.length + 1) + " = " + value);
					}
				});
			},
			setObject : function(name, object) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.setObject()', 3);
				// alert(JSON.stringify(object));
				name = name.toLowerCase();
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.setObject(' + name + ', ' + JSON.stringify(object) + ')',
						20);
				$.each(object, function(key, value) {
					if (typeof value == "object" && value != null) {
						plugin_HTML5Storage.functions.localStorage.setObject((name + "." + key).trim(), value);
					} else {
						plugin_HTML5Storage.functions.localStorage.set((name + "." + key).trim(), value);
					}
				});
				// app.store.localStorage.show();
				return true;
			},
			getObject : function(name) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.getObject()', 3);
				name = name.toLowerCase();
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.getObject("' + name + '")', 20);
				var object = {};
				$.each(window.localStorage, function(key, value) {

					if (key.substr(app.config.name.length + 1, name.length).trim() == name.trim()) {
						// alert(key.substr(app.config.name.length + 1,
						// name.length).trim() + " = " + value);
						object = plugin_HTML5Storage.setDeepX(object, key.substr(app.config.name.length + 1), plugin_HTML5Storage.functions.localStorage
								.get(key.substr(app.config.name.length + 1)));
					}
				});

				if (object[name] != undefined)
					return object[name];
				else {
					return null;
				}
			},
			removeObject : function(name) {
				name = name.toLowerCase();
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.removeObject(' + name + ')', 20);
				var success = true;
				$.each(window.localStorage, function(key, value) {
					if (key.substr(app.config.name.length + 1, name.length) == name.trim()) {
						try {
							window.localStorage.removeItem(key.trim())
						} catch (err) {
							alert(err);
							success = false;
						}
					}
				});
				return success;
			},
			getList : function(identifier) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.localStorage.getList(' + identifier + ')', 20);
				var list = {};
				$.each(window.localStorage, function(key, value) {
					if (key.substr(app.config.name.length + 1, identifier.length) == identifier) {
						list[key.substr(app.config.name.length + 1)] = plugin_HTML5Storage.functions.localStorage.get(key.substr(app.config.name.length + 1));
					}
				});
				return list;
			}
		},
		sessionStorage : {
			set : function(key, val) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.sessionStorage.set(' + key + ', ' + val + ')', 3);
				window.sessionStorage.setItem(key, val);
			},
			get : function(key) {
				app.debug.alert('plugin.HTML5Storage.js ~ plugin_HTML5Storage.functions.sessionStorage.get(' + key + ')', 3);
				window.sessionStorage.getItem(key);
			},
			clear : function() {
				window.sessionStorage.clear();
			},
			removeItem : function(key) {
				window.sessionStorage.removeItem(key);
			},
			show : function() {

			}
		},
		ss : this.sessionStorage,
	}
};