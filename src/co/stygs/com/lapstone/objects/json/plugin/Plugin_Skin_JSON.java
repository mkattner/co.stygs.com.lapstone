package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inet.lib.less.Less;

import co.stygs.com.lapstone.Compressor;
import co.stygs.com.lapstone.Compressor.StylesheetCompressorOptions;
import co.stygs.com.lapstone.Release;
import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;

public class Plugin_Skin_JSON extends APlugin_JSON {

    public Plugin_Skin_JSON() {
	// TODO Auto-generated constructor stub
    }

    private Boolean useSkinPlugin;
    private String defaultSkin;

    public Map<String, List<String>> getSkins() {
	return skins;
    }

    public void setSkins(Map<String, List<String>> skins) {
	this.skins = skins;
    }

    private Map<String, List<String>> skins;

    public Boolean getUseSkinPlugin() {
	return useSkinPlugin;
    }

    public void setUseSkinPlugin(Boolean useSkinPlugin) {
	this.useSkinPlugin = useSkinPlugin;
    }

    public String getDefaultSkin() {
	return defaultSkin;
    }

    public void setDefaultSkin(String defaultSkin) {
	this.defaultSkin = defaultSkin;
    }

    @Override
    public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception {
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;
	File currentFile;

	configuration = new File(www, "js/plugin/plugin.Skin.json");
	Plugin_Skin_JSON skinJson = objectMapper.readValue(configuration, Plugin_Skin_JSON.class);

	if (skinJson.getUseSkinPlugin()) {
	    for (String skin : skinJson.getSkins().keySet()) {
		String combinedStyle = "";
		for (String url : skinJson.getSkins().get(skin)) {
		    currentFile = new File(www, "page/" + url);
		    System.out.println("Add: " + currentFile.getAbsolutePath());

		    String currentStyle = Less.compile(currentFile, true) + "\n\n";

		    // resolve dependencies
		    currentStyle = currentStyle.replaceAll("url\\(\\'", "url('" + url.substring(0, url.lastIndexOf("/") + 1));
		    currentStyle = currentStyle.replaceAll("url\\(\\\"", "url(\"" + url.substring(0, url.lastIndexOf("/") + 1));

		    combinedStyle += currentStyle;

		    currentFile.delete();
		}

		File allSkins = new File(www, "css/skin/" + skin + "/all.skin." + skin + ".css");
		System.out.println("Wirte combined skin file: " + allSkins.getAbsolutePath());
		FileUtils.write(allSkins, combinedStyle);
		System.out.println("compress skin file:       " + allSkins.getAbsolutePath());
		Compressor.compressStylesheet(allSkins.getAbsolutePath(), allSkins.getAbsolutePath(), new StylesheetCompressorOptions());
		Release.cssRegistry.add(allSkins);
	    }
	}

	return null;
    }

}
