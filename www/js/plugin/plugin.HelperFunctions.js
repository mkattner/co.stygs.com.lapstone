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

	},

	// called after all plugins are loaded
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);

	},

	// called after all pages are loaded
	// caller pages.js
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);

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

				var success = false;
				var regex = new RegExp(plugin_HelperFunctions.config.validate.firstname, "g");
				if (firstname == undefined)
					success = false;
				else if (regex.test(firstname)) {
					success = true;
				}
				return success;
			},
			lastname : function(lastname) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.lastname(" + lastname + ")", 20);

				var success = false;
				var regex = new RegExp(plugin_HelperFunctions.config.validate.lastname, "g");
				if (lastname == undefined)
					success = false;
				else if (regex.test(lastname)) {
					success = true;
				}
				return success;
			},
			username : function(username) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.username(" + username + ")", 20);

				var success = false;
				var regex = new RegExp(plugin_HelperFunctions.config.validate.username, "g");
				if (username == undefined)
					success = false;
				else if (regex.test(username)) {
					success = true;
				}
				return success;
			},
			email : function(email) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.email(" + email + ")", 20);

				var success = false;
				var regex = new RegExp(plugin_HelperFunctions.config.validate.email, "g");
				if (email == undefined)
					success = false;
				else if (regex.test(email)) {
					success = true;
				}
				return success;
			},
			password : function(password) {
				app.debug.alert("plugin_HelperFunctions.functions.validate.password(" + password + ")", 20);

				var success = false;
				var regex = new RegExp(plugin_HelperFunctions.config.validate.password, "g");
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
				object.find('[type=button]').button();
				object.find('[data-role=navbar]').navbar();
				object.find('[type=text], textarea, [type=search], [type=password], [type=number]').textinput();
				object.find('[type=range]').slider();
				object.find('[type=radio]').checkboxradio();
				object.find('select').selectmenu();
			}
		},
		navigation : {
			redirect : function(url, transition) {
				setTimeout(function() {
					if (transition != undefined)
						$.mobile.changePage(url, {
							transition : transition
						});
					else
						$(location).attr("href", url);
				}, 50);
			},
			back : function() {
				window.history.back();
			},
			forward : function() {
				window.history.forward();
			},
			reload : function() {
				location.reload();
			},
			redirectAndReload : function(url) {
				$.mobile.ajaxEnabled = false;
				window.location.replace(url);
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
				return returnObject;
			}
		}
	}
};