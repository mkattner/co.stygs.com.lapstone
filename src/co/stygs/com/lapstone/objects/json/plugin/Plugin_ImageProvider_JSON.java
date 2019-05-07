package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.Imgd_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;

public class Plugin_ImageProvider_JSON extends APlugin_JSON {

    private List<String> dependency;

    private Map<String, Map<String, String>> images;

    private List<String> imgdFiles;

    public Plugin_ImageProvider_JSON() {
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

    public Map<String, Map<String, String>> getImages() {
	return images;
    }
    public List<String> getImgdFiles() {
	return imgdFiles;
    }
    
    @Override
    public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception {
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;
	File currentFile;
	configuration = new File(www, "js/plugin/plugin.ImageProvider.json");
	Plugin_ImageProvider_JSON imageProviderJson = objectMapper.readValue(configuration, Plugin_ImageProvider_JSON.class);
	for (String url : imageProviderJson.getImgdFiles()) {
	    currentFile = new File(www, "page/" + url);
	    Imgd_JSON imgdJSON = objectMapper.readValue(currentFile, Imgd_JSON.class);
	    imageProviderJson.getImages().putAll(imgdJSON);
	    Files.delete(currentFile.toPath());
	}

	System.out.println("Write new configuration: " + configuration.getAbsolutePath());
	objectMapper.writeValue(configuration, imageProviderJson);

	return null;
    }

	public void setDependency(List<String> dependency) {
		this.dependency = dependency;
	}
	
	 
    public void setImages(Map<String, Map<String, String>> images) {
	this.images = images;
    }

	public void setImgdFiles(List<String> imgdFiles) {
	this.imgdFiles = imgdFiles;
    }

}
