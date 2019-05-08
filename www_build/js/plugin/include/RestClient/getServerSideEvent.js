// Input 0
'use strict';
plugin_RestClient.GetServerSideEvent = function(a, b) {
  app.debug.debug("plugin_RestClient.getSingleJson() - get server name");
  a = app.rc.getWsd(a);
  app.rc.mergeWsdWithParameters(a, b);
  return app.wsc.getServerSideEvent(a);
};
