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
 * Plugin: plugin_HelperFunctions
 * 
 * @version 1.0
 * @namespace plugin_HelperFunctions
 */
var plugin_HelperFunctions = {
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
		var dfd = $.Deferred();
		dfd.resolve();
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
	pageSpecificEvents : function() {
		app.debug.alert("plugin_" + this.config.name + ".pageSpecificEvents()", 11);

	},
	// private functions

	// public functions
	// called by user
	/**
	 * Public functions for plugin_HelperFunctions
	 * 
	 * @namespace plugin_HelperFunctions.functions
	 * 
	 */
	functions : {
		validate : {
			firstname : function(firstname) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.firstname(" + firstname + ")", 20);

				var success = false, regex = new RegExp(plugin_HelperFunctions.config.validate.firstname, "g");
				if (firstname == undefined)
					success = false;
				else if (regex.test(firstname)) {
					success = true;
				}
				return success;
			},
			lastname : function(lastname) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.lastname(" + lastname + ")", 20);

				var success = false, regex = new RegExp(plugin_HelperFunctions.config.validate.lastname, "g");
				if (lastname == undefined)
					success = false;
				else if (regex.test(lastname)) {
					success = true;
				}
				return success;
			},
			username : function(username) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.username(" + username + ")", 20);

				var success = false, regex = new RegExp(plugin_HelperFunctions.config.validate.username, "g");
				if (username == undefined)
					success = false;
				else if (regex.test(username)) {
					success = true;
				}
				return success;
			},
			email : function(email) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.email(" + email + ")", 20);

				var success = false, regex = new RegExp(plugin_HelperFunctions.config.validate.email, "g");
				if (email == undefined)
					success = false;
				else if (regex.test(email)) {
					success = true;
				}
				return success;
			},
			website : function(website) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.website(" + website + ")", 20);

				var success = false, regex = new RegExp(plugin_HelperFunctions.config.validate.website, "g");
				if (website == undefined)
					success = false;
				else if (regex.test(website)) {
					success = true;
				}
				return success;
			},
			password : function(password) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.password(" + password + ")", 20);

				var success = false, regex = new RegExp(plugin_HelperFunctions.config.validate.password, "g");
				if (password == undefined)
					success = false;
				else if (regex.test(password)) {
					success = true;
				}
				return success;
			},
			equal : function(s1, s2) {
				var success = false;
				if (s1 == s2) {
					success = true;
				}
				return success;
			}
		},
		random : {
			integer : function(digits) {
				return Math.floor((Math.random() * digits) + 1);
			}
		},
		jQM : {
			enhance : function(object) {
				// http://stackoverflow.com/questions/14550396/jquery-mobile-markup-enhancement-of-dynamically-added-content

				object.find('[data-role=listview]').listview().listview('refresh');
				object.find('[data-role=collapsible]').collapsible();
				object.find('[data-role=controlgroup]').controlgroup();
				object.find('[data-role=slider]').flipswitch().flipswitch("refresh");
				object.find('[type=button], [type=submit]').button();
				object.find('[data-role=navbar]').navbar();
				object.find('[type=text], textarea, [type=search], [type=password], [type=number], [type=file]').textinput();
				object.find('[data-type=range]').slider().slider("refresh");
				object.find('[type=radio], [type=checkbox]').checkboxradio();
				object.find('select').selectmenu();
			}
		},
		navigation : {
			redirect : function(url, transition) {
				console.log("Deprecated Function! Use: ")
				setTimeout(function() {
					if (transition != undefined)
						$.mobile.changePage(url, {
							transition : transition
						});
					else {
						$(location).attr("href", url);
					}
				}, 50);
			},
			back : function() {
				console.warn("Deprecated Function! Use: app.nav...")
				window.history.back();
			},
			forward : function() {
				console.warn("Deprecated Function! Use: app.nav...")
				window.history.forward();
			},
			reload : function() {
				console.warn("Deprecated Function! Use: app.nav...")
				location.reload();
			},
			redirectAndReload : function(url) {
				console.warn("Deprecated Function! Use: app.nav...")
				$.mobile.ajaxEnabled = false;
				window.location.replace(url);
			}
		},
		object : {
			setDeep : function(el, key, value) {
				app.debug.alert("plugin_HelperFunctions.js ~ plugin_HelperFunctions.functions.object.setDeep(" + el + ", " + key + ", " + value + ")", 20);
				key = key.split('.');
				var i = 0, n = key.length;
				for (; i < n - 1; ++i) {
					el = el[key[i]];
				}
				el[key[i]] = value;
			},

			setDeepBase64Key : function(el, key, value) {
				app.debug.alert("plugin_HelperFunctions.js ~ plugin_HelperFunctions.functions.object.setDeepBase64Key(" + el + ", " + key + ", " + value + ")",
						20);
				key = key.split('.');
				var i = 0, n = key.length;
				for (; i < n - 1; ++i) {
					el = el[atob(key[i])];
				}
				app.debug.alert("plugin_HelperFunctions.js ~ plugin_HelperFunctions.functions.object.setDeepBase64Key - " + el[atob(key[i])] + " = " + value,
						20);
				el[atob(key[i])] = value;
			},

			getDeep : function(el, key) {
				app.debug.alert("plugin_HelperFunctions.js ~ plugin_HelperFunctions.functions.object.getDeep(" + el + ", " + key + ")", 20);
				key = key.split('.');
				var i = 0, n = key.length;
				for (; i < n; ++i) {
					el = el[key[i]];
				}
				return el;
			}
		},
		form : {
			serialize : function(container) {
				var returnObject = {};
				container.find("input").each(function(key, HTMLInputElement) {
					// alert($(HTMLInputElement).html());
					// alert($(HTMLInputElement).attr("name") + "=" +
					// $(HTMLInputElement).val());
					if ($(HTMLInputElement).attr("type") == "checkbox")
						returnObject[$(HTMLInputElement).attr("name")] = $(HTMLInputElement).is(':checked');
					else if ($(HTMLInputElement).attr("type") == "radio") {
						if ($(HTMLInputElement).is(':checked')) {
							returnObject[$(HTMLInputElement).attr("name")] = $(HTMLInputElement).val();
						}
					} else
						returnObject[$(HTMLInputElement).attr("name")] = $(HTMLInputElement).val();
				});
				container.find("select").each(function(key, HTMLSelectElement) {
					var array = Array();
					$(HTMLSelectElement).find("option:selected").each(function(key, value) {
						array.push($(value).text());
					});
					returnObject[$(HTMLSelectElement).attr("name")] = array;
				});
				return returnObject;
			}
		}
	}
};