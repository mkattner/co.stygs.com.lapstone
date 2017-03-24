/**
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var page_lapstone = {
  config: null,

  include: null,

  include_once: null,

  parameter: {},

  elements: null,

  constructor: function() {
    app.debug.trace("page_lapstone.constructor()");
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();

  },

  creator: function(container) {
    app.debug.trace("page_lapstone.creator()");

    page_lapstone.elements.content.append(function() {
      return $("<h1>").text(app.lang.string("Connect your app to a Server", "page.lapstone"))
    });

    page_lapstone.elements.content.append(function() {
      return $("<p>").text(app.lang.string("Open plugin.WebServceClient.json and edit the \"defaultServer\" and \"server\" property.", "page.lapstone"));
    });
    
    page_lapstone.elements.content.append(function() {
      return $("<p>").text(app.lang.string("Open plugin.KeepAlive.json and edit the \"server\" and \"path\" property.", "page.lapstone"));
    }); 
    
    page_lapstone.elements.content.append(function() {
      return $("<h2>").text(app.lang.string("If your Server Address differs in each App Installation then use the following functions.", "page.lapstone"))
    });
    
    page_lapstone.elements.content.append(function() {
      return $("<p>").text(app.lang.string("app.wsc.getServer(); app.wsc.setServer()", "page.lapstone"))
    });

  },

  async: {
    promise: null,

    result: null,

    elements: null,

    creator: function(container) {
      app.debug.trace("page_lapstone.async.creator()");
      var dfd = $.Deferred();
      dfd.resolve();
      return dfd.promise();
    },

    call: function(container) {
      app.debug.trace("page_lapstone.async.call()");
      return app.rc.getJson();
    },

    done: function(container) {
      app.debug.trace("page_lapstone.async.done()");
    },

    fail: function(container) {
      app.debug.trace("page_lapstone.async.fail()");
      alert("WS fails: " + JSON.stringify(this.result));
    },

    always: function(container) {
      app.debug.trace("page_lapstone.async.always()");
    },

    abort: function(container) {
      app.debug.trace("page_lapstone.async.abort()");
    }
  },

  // set the jquery events

  setEvents: function(container) {
    app.debug.trace("page_lapstone.setEvents()");

  },

  functions: {},

  events: {

    pagebeforechange: function(event, container) {
      app.debug.trace("page_lapstone.pagebeforechange()");

    },

    pagebeforecreate: function(event, container) {
      app.debug.trace("page_lapstone.pagebeforecreate()");
    },

    pagebeforehide: function(event, container) {
      app.debug.trace("page_lapstone.pagebeforehide()");
    },

    pagebeforeload: function(event, container) {
      app.debug.trace("page_lapstone.pagebeforeload()");
    },

    pagebeforeshow: function(event, container) {
      app.debug.trace("page_lapstone.pagebeforeshow()");
    },

    pagechange: function(event, container) {
      app.debug.trace("page_lapstone.pagechange()");
    },

    pagechangefailed: function(event, container) {
      app.debug.trace("page_lapstone.pagechangefailed()");
    },

    pagecreate: function(event, container) {
      app.debug.trace("page_lapstone.pagecreate()");
    },

    pagehide: function(event, container) {
      app.debug.trace("page_lapstone.pagehide()");
    },

    pageinit: function(event, container) {
      app.debug.trace("page_lapstone.pageinit()");
    },

    pageload: function(event, container) {
      app.debug.trace("page_lapstone.pageload()");
    },

    pageloadfailed: function(event, container) {
      app.debug.trace("page_lapstone.pageloadfailed()");
    },

    pageremove: function(event, container) {
      app.debug.trace("page_lapstone.pageremove()");
    },

    pageshow: function(event, container) {
      app.debug.trace("page_lapstone.pageshow()");
    }
  }
};