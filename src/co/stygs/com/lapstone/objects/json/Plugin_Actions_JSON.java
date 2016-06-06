package co.stygs.com.lapstone.objects.json;

import java.io.File;
import java.util.List;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Plugin_Actions_JSON extends APlugin_JSON {

    public Plugin_Actions_JSON() {
	// TODO Auto-generated constructor stub
    }

    @Override
    public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception {
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;
	File currentFile;

	File actionsJs = new File(www, "js/plugin/plugin.Actions.js");
	String actionsJsContent = FileUtils.readFileToString(actionsJs);

	configuration = new File(www, "js/plugin/plugin.Actions.json");
	Plugin_Actions_JSON actionsJson = objectMapper.readValue(configuration, Plugin_Actions_JSON.class);

	for (String url : actionsJson.getActionFiles()) {
	    currentFile = new File(www, "page/" + url);

	    String currentContent = FileUtils.readFileToString(currentFile);

	    actionsJsContent += "\n;" + currentContent;
	    currentFile.delete();
	}

	FileUtils.writeStringToFile(actionsJs, actionsJsContent);
	
	return null;
    }

    public List<String> getActionFiles() {
	return actionFiles;
    }

    public void setActionFiles(List<String> actionFiles) {
	this.actionFiles = actionFiles;
    }

    private List<String> actionFiles;

}
