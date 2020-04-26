package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;
import co.stygs.com.lapstone.objects.json.Wse_JSON;

public class Plugin_WebServiceError_JSON extends APlugin_JSON {

    private Map<String, String> actions;

    private List<String> dependency;

    private List<String> errorKeys;

    private List<String> strictErrorKeys;

    private Map<String, Map<String, String>> wse;

    private List<String> wseFiles;
    
    private String errorFlag;

    public Plugin_WebServiceError_JSON() {
	// TODO Auto-generated constructor stub
    }
    
    public Map<String, String> getActions() {
	return actions;
    }

	@Override
	public String getAdditionalJavascript(File www) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	 
    public List<String> getDependency() {
		return dependency;
	}


    public List<String> getErrorKeys() {
	return errorKeys;
    }

    public List<String> getStrictErrorKeys() {
	return strictErrorKeys;
    }

    public Map<String, Map<String, String>> getWse() {
	return wse;
    }

    public List<String> getWseFiles() {
	return wseFiles;
    }

    @Override
    public Boolean release(File www_debug,File www, LapstoneJSON lapstoneJson) throws Exception{
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;
	File currentFile;
	configuration = new File(www, "js/plugin/plugin.WebServiceError.json");
	Plugin_WebServiceError_JSON webServiceErrorJson = objectMapper.readValue(configuration, Plugin_WebServiceError_JSON.class);
	for (String url : webServiceErrorJson.getWseFiles()) {
	    currentFile = new File(www, "page/" + url);
	    Wse_JSON wseJSON = objectMapper.readValue(currentFile, Wse_JSON.class);
	    webServiceErrorJson.getWse().putAll(wseJSON);
	    Files.delete(currentFile.toPath());
	}
	objectMapper.writeValue(configuration, webServiceErrorJson);

	return null;
    }

    public void setActions(Map<String, String> actions) {
	this.actions = actions;
    }
    public void setDependency(List<String> dependency) {
		this.dependency = dependency;
	}
    public void setErrorKeys(List<String> errorKeys) {
	this.errorKeys = errorKeys;
    }
    public void setStrictErrorKeys(List<String> strictErrorKeys) {
	this.strictErrorKeys = strictErrorKeys;
    }
    public void setWse(Map<String, Map<String, String>> wse) {
	this.wse = wse;
    }


	public void setWseFiles(List<String> wseFiles) {
	this.wseFiles = wseFiles;
    }

	public String getErrorFlag() {
		return errorFlag;
	}

	public void setErrorFlag(String errorFlag) {
		this.errorFlag = errorFlag;
	}

}
