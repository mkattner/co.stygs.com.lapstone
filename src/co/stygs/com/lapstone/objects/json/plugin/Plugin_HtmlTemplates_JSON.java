package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inet.lib.less.Less;

import co.stygs.com.lapstone.ILogger;
import co.stygs.com.lapstone.Lapstone;
import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;
import co.stygs.com.lapstone.objects.json.Plugin_HtmlTemplates_JSON_Template;

public class Plugin_HtmlTemplates_JSON extends APlugin_JSON implements ILogger {

	public Plugin_HtmlTemplates_JSON() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception {
		LOGGER.debug("Release: " + this.getClass().getSimpleName());

		ObjectMapper objectMapper = new ObjectMapper();
		File configuration;

		configuration = new File(www, "js/plugin/plugin.HtmlTemplates.json");
		Plugin_HtmlTemplates_JSON htmlTemplates = objectMapper.readValue(configuration, Plugin_HtmlTemplates_JSON.class);

		for (String templateName : htmlTemplates.getTemplates().keySet()) {
			String styleUrl = htmlTemplates.getTemplates().get(templateName).getStyle();
			String contentUrl = htmlTemplates.getTemplates().get(templateName).getContent();

			if (htmlTemplates.getTemplates().get(templateName).getUseSkin()) {
				LOGGER.debug("Process files for skinned template: " + templateName);
				Plugin_Skin_JSON plugin_Skin_JSON = objectMapper.readValue(new File(www, "js/plugin/plugin.Skin.json"), Plugin_Skin_JSON.class);

				File contentFile;
				contentFile = new File(www, "page/" + contentUrl);

				htmlTemplates.getTemplates().get(templateName).setStyles(new HashMap<>());
				for (String skinName : plugin_Skin_JSON.getSkins().keySet()) {

					File styleFile;

					String newStyleUrl = styleUrl.replaceAll("skin", skinName);

					styleFile = new File(www, "page/" + newStyleUrl);

					String style;

					if (styleFile.exists()) {
						if (styleFile.getName().endsWith(".less")) {
							LOGGER.trace("Process less style: " + styleFile.getAbsolutePath());
							style = Less.compile(styleFile, true);
						} else {
							LOGGER.trace("Process css style: " + styleFile.getAbsolutePath());
							style = FileUtils.readFileToString(styleFile,Lapstone.CHARSET);
						}

						htmlTemplates.getTemplates().get(templateName).getStyles().put(skinName, style);

						LOGGER.trace("Delete: " + styleFile.getAbsolutePath());
						Files.delete(styleFile.toPath());
					}
				}
				htmlTemplates.getTemplates().get(templateName).setStyle(null);

				String content;

				LOGGER.trace("Process html content: " + contentFile.getAbsolutePath());
				content = FileUtils.readFileToString(contentFile,Lapstone.CHARSET);

				htmlTemplates.getTemplates().get(templateName).setContent(content);

				LOGGER.trace("Delete: " + contentFile.getAbsolutePath());
				Files.delete(contentFile.toPath());
			}

			else {
				LOGGER.debug("Process files for template: " + templateName);

				File styleFile;
				File contentFile;

				styleFile = new File(www, "page/" + styleUrl);
				contentFile = new File(www, "page/" + contentUrl);

				String style;
				String content;

				if (styleFile.getName().endsWith(".less")) {
					LOGGER.trace("Process less style: " + styleFile.getAbsolutePath());
					style = Less.compile(styleFile, true);
				} else {
					LOGGER.trace("Process css style: " + styleFile.getAbsolutePath());
					style = FileUtils.readFileToString(styleFile,Lapstone.CHARSET);
				}

				LOGGER.trace("Process html content: " + contentFile.getAbsolutePath());
				content = FileUtils.readFileToString(contentFile,Lapstone.CHARSET);

				htmlTemplates.getTemplates().get(templateName).setStyle(style);
				htmlTemplates.getTemplates().get(templateName).setContent(content);

				LOGGER.trace("Delete: " + styleFile.getAbsolutePath());
				styleFile.delete();

				LOGGER.trace("Delete: " + contentFile.getAbsolutePath());
				contentFile.delete();

			}

		}

		System.out.println("Write new configuration: " + configuration.getAbsolutePath());
		objectMapper.writeValue(configuration, htmlTemplates);
		return null;
	}

	public Map<String, Plugin_HtmlTemplates_JSON_Template> getTemplates() {
		return templates;
	}

	public void setTemplates(Map<String, Plugin_HtmlTemplates_JSON_Template> templates) {
		this.templates = templates;
	}

	private Map<String, Plugin_HtmlTemplates_JSON_Template> templates;

	public List<String> getDependency() {
		return dependency;
	}

	public void setDependency(List<String> dependency) {
		this.dependency = dependency;
	}

	public Boolean getUseSkinPlugin() {
		return useSkinPlugin;
	}

	public void setUseSkinPlugin(Boolean useSkinPlugin) {
		this.useSkinPlugin = useSkinPlugin;
	}

	private List<String> dependency;
	private Boolean useSkinPlugin;

	@Override
	public String getAdditionalJavascript(File www) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
