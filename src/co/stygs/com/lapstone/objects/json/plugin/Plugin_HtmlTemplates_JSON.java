package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inet.lib.less.Less;

import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;
import co.stygs.com.lapstone.objects.json.Plugin_HtmlTemplates_JSON_Template;

public class Plugin_HtmlTemplates_JSON extends APlugin_JSON {

    public Plugin_HtmlTemplates_JSON() {
	// TODO Auto-generated constructor stub
    }

    @Override
    public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception {
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;
	File currentFile;

	configuration = new File(www, "js/plugin/plugin.HtmlTemplates.json");
	Plugin_HtmlTemplates_JSON htmlTemplates = objectMapper.readValue(configuration, Plugin_HtmlTemplates_JSON.class);

	for (String templateName : htmlTemplates.getTemplates().keySet()) {
	    String styleUrl = htmlTemplates.getTemplates().get(templateName).getStyle();
	    String contentUrl = htmlTemplates.getTemplates().get(templateName).getContent();

	    File styleFile = new File(www, "page/" + styleUrl);
	    File contentFile = new File(www, "page/" + contentUrl);

	    String style;
	    if (styleFile.getName().endsWith(".less"))
		style = Less.compile(styleFile, true);
	    else
		style = FileUtils.readFileToString(styleFile);
	    String content = FileUtils.readFileToString(contentFile);

	    htmlTemplates.getTemplates().get(templateName).setStyle(style);
	    htmlTemplates.getTemplates().get(templateName).setContent(content);

	    System.out.println("Delete: " + styleFile.getAbsolutePath());
	    System.out.println("Delete: " + contentFile.getAbsolutePath());

	    styleFile.delete();
	    contentFile.delete();
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

}
