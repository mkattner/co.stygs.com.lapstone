// Input 0
'use strict';
app.func("loader.show", function(b, e, d) {
  var a = $(".template" + b);
  1 !== a.length ? (a.remove(), a = app.template.get(b), void 0 !== d ? d.append(a) : $("div[data-role\x3dcontent]").append(a)) : a = app.template.get(b, a);
  a.addClass("app-loader");
  $.each(e, function(b, c) {
    "string" === typeof c ? a["_" + b]().empty().text(c) : a["_" + b]().empty().append(c);
  });
  return a;
}, plugin_Notification.functions);
app.func("loader.remove", function() {
  $(".app-loader").remove();
}, plugin_Notification.functions);
app.func("loader.isActive", function() {
  return 0 < $(".app-loader").length ? !0 : !1;
}, plugin_Notification.functions);
