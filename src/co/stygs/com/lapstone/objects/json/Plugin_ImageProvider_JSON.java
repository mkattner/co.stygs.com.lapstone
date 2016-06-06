package co.stygs.com.lapstone.objects.json;

import java.io.File;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Plugin_ImageProvider_JSON extends APlugin_JSON {

    public Plugin_ImageProvider_JSON() {
	// TODO Auto-generated constructor stub
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
	    currentFile.delete();
	}
	objectMapper.writeValue(configuration, imageProviderJson);

	return null;
    }

    public List<String> getImgdFiles() {
	return imgdFiles;
    }

    public void setImgdFiles(List<String> imgdFiles) {
	this.imgdFiles = imgdFiles;
    }

    

    public Map<String, Map<String, String>> getImages() {
	return images;
    }

    public void setImages(Map<String, Map<String, String>> images) {
	this.images = images;
    }



    private List<String> imgdFiles;
    private Map<String, Map<String, String>> images;
}
