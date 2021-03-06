// # sourceURL=plugin.DemoMode.socket.js
/**
 * Copyright (c) 2018 martin.kattner@stygs.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

app.func("socket", function(wsd) {
  var dfd = $.Deferred();

  wsd.url = wsd.url.replace(app.wsc.getServer(wsd.server), "").replaceAll("/", "_").substring(1);

  var i = 0;

  var intervalFunction = function() {
    app.debug.info("DemoServer - load demo web socket: " + wsd.url);
    lapstone.globalLoader.AsyncJsonLoader("../files/demo/socket/" + wsd.url + "/" + i + ".json", 1)

    .done(function(json) {
      dfd.notify(json);
      i++;
    })

    .fail(function() {
      i = 0;
    })
  };

  intervalFunction();

  var interval = window.setInterval(intervalFunction, 1000);

  dfd.always(function() {
    app.debug.app("clear interval");
    window.clearInterval(interval);
  })

  return dfd;

}, plugin_DemoServer.functions);