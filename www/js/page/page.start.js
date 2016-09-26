/**
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var page_start = {
  config: null,

  include: null,

  include_once: null,

  parameter: {},

  elements: null,

  constructor: function() {
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();
  },

  // load the html structure
  creator: function(container) {
    app.debug.alert("page_" + this.config.name + ".creator()", 10);

    // initialisationPanel.show("");

  },
  async: {
    promise: null,// to implement

    result: null,

    elements: null,

    creator: function(container) {
      var dfd = $.Deferred();
      dfd.resolve();
      return dfd.promise();
    },

    call: function(container) {
      return app.rc.getJson();
    },

    done: function(container) {
    },

    fail: function(container) {
      alert("WS fails: " + JSON.stringify(this.result));
    },

    always: function(container) {
    },

    abort: function(container) {
    }
  },

  // set the jquery events
  setEvents: function(container) {
    app.debug.alert("page_" + this.config.name + ".setEvents()", 10);

  },

  functions: {},

  events: {

    // Triggered twice during the page change cyle: First prior to any page
    // loading or transition and next after page loading completes
    // successfully,
    // but before the browser history has been modified by the navigation
    // process.
    pagebeforechange: function(event, container) {

    },

    // Triggered on the page being initialized, before most plugin
    // auto-initialization occurs.
    pagebeforecreate: function(event, container) {

    },

    // Triggered on the ���fromPage��� we are transitioning away from,
    // before
    // the
    // actual transition animation is kicked off.
    pagebeforehide: function(event, container) {
    },

    // Triggered before any load request is made.
    pagebeforeload: function(event, container) {
    },

    // Triggered on the ���toPage��� we are transitioning to, before the
    // actual
    // transition animation is kicked off.
    pagebeforeshow: function(event, container) {

    },

    // This event is triggered after the changePage() request has finished
    // loading the page into the DOM and all page transition animations have
    // completed.
    pagechange: function(event, container) {
    },

    // Triggered when the changePage() request fails to load the page.
    pagechangefailed: function(event, container) {
    },

    // Triggered when the page has been created in the DOM (via ajax or
    // other)
    // and after all widgets have had an opportunity to enhance the
    // contained
    // markup.
    pagecreate: function(event, container) {
    },

    // Triggered on the ���fromPage��� after the transition animation has
    // completed.
    pagehide: function(event, container) {

      initialisationPanel.hide();
    },

    // Triggered on the page being initialized, after initialization occurs.
    pageinit: function(event, container) {
    },

    // Triggered after the page is successfully loaded and inserted into the
    // DOM.
    pageload: function(event, container) {

    },

    // Triggered if the page load request failed.
    pageloadfailed: function(event, container) {
    },

    // Triggered just before the framework attempts to remove an external
    // page
    // from the DOM.
    pageremove: function(event, container) {
    },

    // Triggered on the ���toPage��� after the transition animation has
    // completed.
    pageshow: function(event, container) {

      // window.setTimeout(function() {
      // alert(app.info.firstUse());
      app.nav.start();
      // }, 1000);
    }
  }
};