//# sourceURL=page.badConnection.js
/*
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>
 */

/**
 * @author Martin Kattner <martin.kattner@gmail.com>
 */

var page_badConnection = {
  config: null,

  include: null,

  include_once: null,
  parameter: {},
  elements: null,

  constructor: function() {
    app.debug.debug("page_" + this.config.name + ".constructor()");
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();

  },

  // load the html structure
  creator: function(container) {
    app.debug.trace("page_" + this.config.name + ".creator()");
    app.template.overwrite("#" + container.attr("id"), "JQueryMobilePlainPage");
    $.each(app.detect.classes.array(), function(key, name) {
      if (!$('body').hasClass(key)) $('body').addClass(key);
    });
    var content = container.find('div[data-role=content]');
    content.append(function() {
      return $("<h1>").text("Bad Connection")
    });
    content.append(function() {
      return $("<p>").text("Check your internet connection. You will be redirected after your connection is back again.")
    });

  },

  async: {
    promise: null,

    result: null,

    elements: null,

    creator: function(container) {
      app.debug.trace("page_##template.async.creator()");
      var dfd = $.Deferred();
      dfd.resolve();
      return dfd.promise();
    },

    call: function(container) {
      app.debug.trace("page_##template.async.call()");
      return app.rc.getJson();
    },

    done: function(container) {
      app.debug.trace("page_##template.async.done()");
    },

    fail: function(container) {
      app.debug.trace("page_##template.async.fail()");
      alert("WS fails: " + JSON.stringify(this.result));
    },

    always: function(container) {
      app.debug.trace("page_##template.async.always()");
    },

    abort: function(container) {
      app.debug.trace("page_##template.async.abort()");
    }
  },

  // set the jquery events
  setEvents: function(container) {
    app.debug.trace("page_" + this.config.name + ".setEvents()");
    $(this.config.pageId).on("connectionisalive", function(event, duration) {
    	app.nav.back();
    });
  },

  functions: {},

  events: {

    // Triggered twice during the page change cyle: First prior to any page
    // loading or transition and next after page loading completes
    // successfully,
    // but before the browser history has been modified by the navigation
    // process.
    pagebeforechange: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pagebeforechange()");

    },

    // Triggered on the page being initialized, before most plugin
    // auto-initialization occurs.
    pagebeforecreate: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pagebeforecreate()");

    },

    // Triggered on the ���fromPage��� we are transitioning away from,
    // before
    // the
    // actual transition animation is kicked off.
    pagebeforehide: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pagebeforehide()");

    },

    // Triggered before any load request is made.
    pagebeforeload: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pagebeforeload()");

    },

    // Triggered on the ���toPage��� we are transitioning to, before the
    // actual
    // transition animation is kicked off.
    pagebeforeshow: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pagebeforeshow()");

    },

    // This event is triggered after the changePage() request has finished
    // loading the page into the DOM and all page transition animations have
    // completed.
    pagechange: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pagechange()");

    },

    // Triggered when the changePage() request fails to load the page.
    pagechangefailed: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pagechangefailed()");

    },

    // Triggered when the page has been created in the DOM (via ajax or
    // other)
    // and after all widgets have had an opportunity to enhance the
    // contained
    // markup.
    pagecreate: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pagecreate()");

    },

    // Triggered on the ���fromPage��� after the transition animation has
    // completed.
    pagehide: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pagehide()");

    },

    // Triggered on the page being initialized, after initialization occurs.
    pageinit: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pageinit()");

    },

    // Triggered after the page is successfully loaded and inserted into the
    // DOM.
    pageload: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pageload()");

    },

    // Triggered if the page load request failed.
    pageloadfailed: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pageloadfailed()");

    },

    // Triggered just before the framework attempts to remove an external
    // page
    // from the DOM.
    pageremove: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pageremove()");

    },

    // Triggered on the ���toPage��� after the transition animation has
    // completed.
    pageshow: function(event, container) {
      app.debug.trace("page_" + $(container).attr('id') + ".pageshow()");

    }
  }
};