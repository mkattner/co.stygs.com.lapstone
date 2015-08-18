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
		app.debug.trace("plugin_HelperFunctions.pluginsLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.trace("plugin_HelperFunctions.pagesLoaded()");
		var dfd = $.Deferred();
		dfd.resolve();
		return dfd.promise();

	},

	// called after pluginsLoaded()
	// caller: plugins.js
	definePluginEvents : function() {
		app.debug.trace("plugin_HelperFunctions.definePluginEvents()");

	},
	// called by pages.js
	// called for each page after createPage();
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.trace("plugin_HelperFunctions.afterHtmlInjectedBeforePageComputing()");

	},
	// called once
	// set the jQuery delegates
	// caller: pages.js
	pageSpecificEvents : function() {
		app.debug.trace("plugin_HelperFunctions.pageSpecificEvents()");

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
			regex : function(value, regex) {
				app.debug.trace("plugin_HelperFunctions.functions.validate.regex()");

				var success;
				success = false;
				regex = new RegExp(regex, "g");

				app.debug.debug("plugin_HelperFunctions.functions.validate.regex() - regex: " + regex);

				if (value == undefined)
					success = false;
				else if (regex.test(value)) {
					success = true;
				}
				return success;
			},
			firstname : function(firstname) {
				app.debug.trace("plugin_HelperFunctions.functions.validate.firstname()");

				var success, regex;
				success = false;
				regex = new RegExp(plugin_HelperFunctions.config.validate.firstname, "g");

				app.debug.debug("plugin_HelperFunctions.functions.validate.firstname() - regex: " + regex);

				if (firstname == undefined)
					success = false;
				else if (regex.test(firstname)) {
					success = true;
				}
				return success;
			},
			lastname : function(lastname) {
				app.debug.trace("plugin_HelperFunctions.functions.validate.lastname()");

				var success, regex;
				success = false;
				regex = new RegExp(plugin_HelperFunctions.config.validate.lastname, "g");

				app.debug.debug("plugin_HelperFunctions.functions.validate.lastname() - regex: " + regex);

				if (lastname == undefined)
					success = false;
				else if (regex.test(lastname)) {
					success = true;
				}
				return success;
			},
			username : function(username) {
				app.debug.trace("plugin_HelperFunctions.functions.validate.username()");

				var success, regex;
				success = false;
				regex = new RegExp(plugin_HelperFunctions.config.validate.username, "g");

				app.debug.debug("plugin_HelperFunctions.functions.validate.username() - regex: " + regex);

				if (username == undefined)
					success = false;
				else if (regex.test(username)) {
					success = true;
				}
				return success;
			},
			email : function(email) {
				app.debug.trace("plugin_HelperFunctions.functions.validate.email()");

				var success, regex;
				success = false;
				regex = new RegExp(plugin_HelperFunctions.config.validate.email, "g");

				app.debug.debug("plugin_HelperFunctions.functions.validate.email() - regex: " + regex);

				if (email == undefined)
					success = false;
				else if (regex.test(email)) {
					success = true;
				}
				return success;
			},
			website : function(website) {
				app.debug.trace("plugin_HelperFunctions.functions.validate.website()");

				var success, regex;
				success = false;
				regex = new RegExp(plugin_HelperFunctions.config.validate.website, "g");

				app.debug.debug("plugin_HelperFunctions.functions.validate.website() - regex: " + regex);

				if (website == undefined)
					success = false;
				else if (regex.test(website)) {
					success = true;
				}
				return success;
			},
			password : function(password) {
				app.debug.trace("plugin_HelperFunctions.functions.validate.password()");

				var success, regex;
				success = false;
				regex = new RegExp(plugin_HelperFunctions.config.validate.password, "g");

				app.debug.debug("plugin_HelperFunctions.functions.validate.password() - regex: " + regex);

				if (password == undefined)
					success = false;
				else if (regex.test(password)) {
					success = true;
				}
				return success;
			},
			equal : function(s1, s2) {
				app.debug.trace("plugin_HelperFunctions.functions.validate.equal()");
				var success = false;
				if (s1 == s2) {
					success = true;
				}
				return success;
			}
		},
		random : {
			integer : function(digits) {
				app.debug.trace("plugin_HelperFunctions.functions.random.integer()");
				return Math.floor((Math.random() * digits) + 1);
			}
		},
		jQM : {
			enhance : function(object) {
				app.debug.trace("plugin_HelperFunctions.functions.jQM.enhance()");
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
				console.log("Deprecated Function! Use: app.nav...")
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
				app.debug.trace("plugin_HelperFunctions.functions.object.setDeep()");
				key = key.split('.');
				var i = 0, n = key.length;
				for (; i < n - 1; ++i) {
					el = el[key[i]];
				}
				el[key[i]] = value;
			},

			setDeepBase64Key : function(el, key, value) {
				app.debug.trace("plugin_HelperFunctions.functions.object.setDeepBase64Key()");
				key = key.split('.');
				var i = 0, n = key.length;
				for (; i < n - 1; ++i) {
					el = el[atob(key[i])];
				}
				app.debug.debug("plugin_HelperFunctions.js ~ plugin_HelperFunctions.functions.object.setDeepBase64Key - " + el[atob(key[i])] + " = " + value, 20);
				el[atob(key[i])] = value;
			},

			getDeep : function(el, key) {
				app.debug.trace("plugin_HelperFunctions.functions.object.getDeep()");
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
				app.debug.trace("plugin_HelperFunctions.functions.form.serialize()");
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