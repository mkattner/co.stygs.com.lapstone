package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.stygs.com.lapstone.Release;
import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;

public class Plugin_DeviceManager_JSON extends APlugin_JSON {

    private List<String> dependency;
   

    private Map<String, String> files;

    private Map<String, String> viewport;

    public Plugin_DeviceManager_JSON() {
	// TODO Auto-generated constructor stub
    }

    @Override
	public String getAdditionalJavascript(File www) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

    public List<String> getDependency() {
		return dependency;
	}
    public Map<String, String> getFiles() {
	return files;
    }

    public Map<String, String> getViewport() {
	return viewport;
    }

	@Override
    public Boolean release(File www_debug,File www, LapstoneJSON lapstoneJson) throws Exception {
	// TODO Auto-generated method stub

	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;

	configuration = new File(www, "js/plugin/plugin.DeviceManager.json");
	Plugin_DeviceManager_JSON deviceManager = objectMapper.readValue(configuration, Plugin_DeviceManager_JSON.class);

	for (String deviceOS : deviceManager.getFiles().keySet()) {
	    File cssFile = new File(www, "page/" + deviceManager.getFiles().get(deviceOS) + ".css");
	    Release.cssRegistry.add(cssFile);
	}
	return null;
    }

	public void setDependency(List<String> dependency) {
		this.dependency = dependency;
	}
	
	 
    public void setFiles(Map<String, String> files) {
	this.files = files;
    }

	public void setViewport(Map<String, String> viewport) {
	this.viewport = viewport;
    }

}
