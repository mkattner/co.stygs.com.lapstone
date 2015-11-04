package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Plugin {

    public Plugin() {
	// TODO Auto-generated constructor stub
    }

    public static Boolean LapstonePlugin(Map<String, String> argMap) throws Exception {

	switch (argMap.get("modus")) {
	case "new":
	    Plugin.newPlugin(argMap);
	    break;

	default:

	    break;
	}

	return true;
    }

    private static Boolean newPlugin(Map<String, String> argMap) throws Exception {
	try {
	    File appPath = new File(argMap.get("path"));
	    File lapstonePath = new File(argMap.get("lapstone"));
	    final File www_debug = new File(appPath, "www_debug");

	    File templateJs = new File(lapstonePath, "tools/template/plugin.template.js");
	    File templateJson = new File(lapstonePath, "tools/template/plugin.template.json");

	    File newJs = new File(www_debug, "js/plugin/plugin." + argMap.get("name") + ".js");
	    File newJson = new File(www_debug, "js/plugin/plugin." + argMap.get("name") + ".json");

	    String json = FileUtils.readFileToString(templateJson);
	    String js = FileUtils.readFileToString(templateJs);

	    json = json.replace("##template", argMap.get("name"));
	    js = js.replace("##template", argMap.get("name"));

	    // write content to new page files
	    FileUtils.write(newJson, json, false);
	    FileUtils.write(newJs, js, false);

	    // register page
	    File pages = new File(www_debug, "js/plugin/plugins.json");
	    ObjectMapper objectMapper = new ObjectMapper();
	    Map<String, Boolean> pluginJson = objectMapper.readValue(pages, Map.class);
	    pluginJson.put(argMap.get("name"), true);
	    objectMapper.writeValue(pages, pluginJson);

	    return true;

	} catch (IOException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	    return false;
	}

    }
}
