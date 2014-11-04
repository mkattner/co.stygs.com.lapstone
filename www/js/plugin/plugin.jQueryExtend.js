/**
 * Plugin:
 * 
 * @version 1.0
 * @namespace 
 */
var plugin_jQueryExtend = {
	config : null,
	constructor : function() {
	},
	pluginsLoaded : function() {
		app.debug.alert(this.config.name + ".pluginsLoaded()", 11);
		(function($) {
			// Attrs
			$.fn.attrs = function(attrs) {
				var t = $(this);
				if (attrs) {
					// Set attributes
					t.each(function(i, e) {
						var j = $(e);
						for ( var attr in attrs) {
							j.attr(attr, attrs[attr]);
						}
						;
					});
					return t;
				} else {
					// Get attributes
					var a = {}, r = t.get(0);
					if (r) {
						r = r.attributes;
						for ( var i in r) {
							var p = r[i];
							if (typeof p.nodeValue !== 'undefined')
								a[p.nodeName] = p.nodeValue;
						}
					}
					return a;
				}
			};
		})(jQuery);
	},
	
	// called after all pages are loaded
	pagesLoaded : function() {
		app.debug.alert("plugin_" + this.config.name + ".pagesLoaded()", 11);
	},
	
	definePluginEvents : function() {
	},

	// called by pages.js
	afterHtmlInjectedBeforePageComputing : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".afterHtmlInjectedBeforePageComputing()", 5);
	},
	pageSpecificEvents : function(container) {
		app.debug.alert("Plugin: " + this.config.name + ".pageSpecificEvents()", 5);
	},

	functions : {}
};