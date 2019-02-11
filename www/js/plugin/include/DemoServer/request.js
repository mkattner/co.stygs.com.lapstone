// # sourceURL=plugin.DemoMode.request.js
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

app.func("request", function(wsd) {
  var dfd = $.Deferred();

  wsd.url = wsd.url.replace(app.wsc.getServer(wsd.server), "").substring(1).replaceAll("/", "_") + ".json";

  switch (wsd.method.toLowerCase()) {
  case "get":
    app.debug.info("DemoServer - load demo web service: " + wsd.url);
    globalLoader.AsyncJsonLoader("../files/demo/ws/" + wsd.url)

    .done(function(data) {
      dfd.resolve(data);
    })

    .fail(function(error) {
      dfd.reject($.extend(true, {
        "error": "demoServerError"
      }, error));
    });

    break;
  default:
    dfd.reject({
      "error": "unimplemented: " + wsd.method
    });
  }

  return dfd.promise()
}, plugin_DemoServer.functions);