// #sourceURL=plugin_RestClient.getWebSocket

plugin_RestClient.getWebSocket = function(paramService, parameter) {

	var wsd;

	app.debug.debug("plugin_RestClient.getSingleJson() - get server name");

	// get the path which is defined in wsd file
	wsd = app.rc.getWsd(paramService);
	app.rc.mergeWsdWithParameters(wsd, parameter);

	// set async to false (in each case)

	// event triggering

	return app.wsoc.getWebSocket(wsd);

};