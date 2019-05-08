// Input 0
'use strict';
plugin_RestClient.getWebSocket = function(a, b) {
  app.debug.debug("plugin_RestClient.getSingleJson() - get server name");
  a = app.rc.getWsd(a);
  app.rc.mergeWsdWithParameters(a, b);
  return app.wsoc.getWebSocket(a);
};
