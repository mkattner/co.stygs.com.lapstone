package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inet.lib.less.Less;

import co.stygs.com.lapstone.Lapstone;
import co.stygs.com.lapstone.LapstoneCompiler;
import co.stygs.com.lapstone.Release;
import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;

public class Plugin_Skin_JSON extends APlugin_JSON {

	private String defaultSkin;

	private List<String> dependency;

	private Map<String, List<String>> skins;

	private Boolean useSkinPlugin;

	public Plugin_Skin_JSON() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getAdditionalJavascript(File www) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public String getDefaultSkin() {
		return defaultSkin;
	}

	public List<String> getDependency() {
		return dependency;
	}

	public Map<String, List<String>> getSkins() {
		return skins;
	}

	public Boolean getUseSkinPlugin() {
		return useSkinPlugin;
	}

	@Override
	public Boolean release(File www_debug, File www, LapstoneJSON lapstoneJson) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		File configuration;
		File currentFile;

		configuration = new File(www, "js/plugin/plugin.Skin.json");
		Plugin_Skin_JSON skinJson = objectMapper.readValue(configuration, Plugin_Skin_JSON.class);

		if (skinJson.getUseSkinPlugin()) {

			// CREATE the CSS FILES
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

					// Files.delete(currentFile.toPath());
				}

				File allSkins = new File(www, "css/skin/" + skin + "/all.skin." + skin + ".css");
				System.out.println("Wirte combined skin file: " + allSkins.getAbsolutePath());
				FileUtils.write(allSkins, combinedStyle, Lapstone.CHARSET);
				System.out.println("compress skin file:       " + allSkins.getAbsolutePath());
				// Compressor.compressStylesheet(allSkins.getAbsolutePath(),
				// allSkins.getAbsolutePath(), new StylesheetCompressorOptions());
				LapstoneCompiler.Css(allSkins, allSkins);
				Release.cssRegistry.add(allSkins);
			}

			// DELETE ALL OLD CSS FILES
			// do this in an extra loop to allow multiple usage of less and css files in
			// different skins.
			for (String skin : skinJson.getSkins().keySet()) {
				for (String url : skinJson.getSkins().get(skin)) {
					currentFile = new File(www, "page/" + url);
					Files.delete(currentFile.toPath());
				}
			}

		}

		return null;
	}

	public void setDefaultSkin(String defaultSkin) {
		this.defaultSkin = defaultSkin;
	}

	public void setDependency(List<String> dependency) {
		this.dependency = dependency;
	}

	public void setSkins(Map<String, List<String>> skins) {
		this.skins = skins;
	}

	public void setUseSkinPlugin(Boolean useSkinPlugin) {
		this.useSkinPlugin = useSkinPlugin;
	}

}
