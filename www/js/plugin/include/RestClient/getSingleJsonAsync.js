//# sourceURL=plugin_RestClient.getSingleJsonAsync.js
/**
 * 
 */
plugin_RestClient.getSingleJsonAsync = function(paramService, parameter, async) {
	app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get a single json object; async = true;");

	// the deferred object for the caller
	var dfd = $.Deferred(), server, service, path, promise, splittedService, wsd, cachedJson, wsEventTrigger;

	wsEventTrigger = $.Deferred();

	app.debug.debug("plugin_RestClient.getSingleJsonAsync() - get server name");
	// app.debug.todo("use getServer() and getService()");
	// if (paramService.indexOf('.') != -1) {
	// splittedService = paramService.split(".");
	// server = splittedService[0];
	// paramService = splittedService[1];
	// } else {
	// server = app.wsc.getDefaultServerName();
	// }

	// server = plugin_RestClient.getServer(paramService);
	// service = plugin_RestClient.getService(paramService);

	app.debug.debug("plugin_RestClient.getSingleJsonAsync() server: " + server + "; service: " + paramService);

	// get the path which is defined in wsd file
	wsd = app.rc.getWsd(paramService);
	app.rc.mergeWsdWithParameters(wsd, parameter);

	// // replace the parameters in path string
	// path = plugin_RestClient.getPath(parameter, path);

	// event triggering
	app.debug.info("plugin_RestClient - TRIGGER EVENT: " + paramService);
	$(document).trigger(paramService, [ wsEventTrigger.promise(), wsd.parameters ]);
	$(document).trigger("webserviceCall", [ wsEventTrigger.promise(), paramService, wsd ]);
	app.debug.webservice(paramService);

	// case: webesrvice is cacheable && webservice is cached
	// alert(JSON.stringify(parameter))
	if ((cachedJson = plugin_RestClient.functions.cacheJson(paramService, wsd.parameters)) && plugin_RestClient.config.webservices[paramService].cacheable) {
		app.debug.info("plugin_RestClient - CACHED: " + paramService);

		app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
		wsEventTrigger.resolve(cachedJson);

		return dfd.resolve(cachedJson);
	}

	// case: webservice request
	else {
		app.debug.info("plugin_RestClient - CALL: " + paramService);
		promise = app.wsc.getJson(wsd, wsd.parameters, async);

		promise.done(function(json) {

			app.debug.debug("plugin_RestClient.getSingleJsonAsync()- Webservice call done: " + JSON.stringify(json));
			plugin_RestClient.functions.cacheJson(paramService, wsd.parameters, json);

			app.debug.info("plugin_RestClient - RESOLVE TRIGGER EVENT: " + paramService);
			wsEventTrigger.resolve(json);

			dfd.resolve(json);
		});

		promise.fail(function(error, jqXHR) {
			app.debug.debug("plugin_RestClient.getSingleJsonAsync() - Webservice call failed: " + JSON.stringify(error));

			app.debug.info("plugin_RestClient - FAILED: " + error.id);

			dfd.reject(error, jqXHR);

			app.debug.info("plugin_RestClient - REJECT TRIGGER EVENT: " + paramService);
			wsEventTrigger.reject(error, jqXHR);
		});

		return dfd.promise();
	}

	// ask for the json file
	// add language wildcards wich could be defined in webservice
	// response

};