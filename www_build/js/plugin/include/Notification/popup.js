// Input 0
'use strict';
app.func("popup.add", function(a, e, c, d) {
  app.debug.validate(a);
  app.debug.validate(e);
  app.debug.validate(c);
  app.debug.validate(d);
  a = {templateId:a, templateElementsObject:e, buttonArray:c, callbackArray:d};
  app.notify.popup.popupQueue = app.notify.popup.popupQueue || [];
  app.notify.popup.popupQueue.push(a);
}, plugin_Notification.functions);
app.func("popup.show", function() {
  var a;
  app.notify.popup.popupQueue = app.notify.popup.popupQueue || [];
  (a = app.notify.popup.popupQueue.pop()) && app.notify.popup.open(a.templateId, a.templateElementsObject, a.buttonArray, a.callbackArray);
}, plugin_Notification.functions);
app.func("popup.open", function(a, e, c, d, g) {
  app.debug.validate(a);
  app.debug.validate(e);
  app.debug.validate(c);
  app.debug.validate(d);
  var b = app.template.get(a);
  var f = $.Deferred();
  b.promise = f.promise();
  void 0 !== g ? g.append(b) : $("div[data-role\x3dcontent]").append(b);
  b.addClass("app-popup");
  $.each(e, function(a, d) {
    "string" === typeof d ? b["_" + a]().empty().text(d) : b["_" + a]().empty().append(d);
  });
  b._close().addClass("click").on("storagefilled", function() {
    f.resolve();
    app.notify.popup.close(b);
  });
  app.debug.validate(d.length === c.length, "boolean");
  b._buttons().empty();
  $.each(c, function(a, c) {
    b._buttons().append(function() {
      return c.addClass("click").on("storagefilled", function() {
        if ("function" === typeof d[a]) {
          var c = d[a]($(this), b);
          "object" === typeof c ? (c.done(function() {
            f.resolve();
            app.notify.popup.close(b);
          }), app.debug.operation(function() {
            c.fail(function() {
              app.debug.app("Callback promise of popup button failed. Popup won't be closed. Close it manually.");
            });
          })) : !1 !== c && (f.resolve(), app.notify.popup.close(b));
        } else {
          f.resolve(), app.notify.popup.close(b);
        }
      });
    });
  });
  return b;
}, plugin_Notification.functions);
app.func("popup.close", function(a) {
  void 0 !== a ? a.remove() : $(".app-popup").remove();
  app.notify.popup.show();
}, plugin_Notification.functions);
