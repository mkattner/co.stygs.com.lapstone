package co.stygs.com.lapstone;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.stygs.com.lapstone.objects.json.Plugin_HtmlTemplates_JSON_Template;
import co.stygs.com.lapstone.objects.json.plugin.Plugin_HtmlTemplates_JSON;

public class Template {

	public Template() {
		// TODO Auto-generated constructor stub

	}

	public static Boolean TemplateLapstone(Map<String, String> argMap) {
		try {
			File appPath = new File(argMap.get("path"));
			File lapstonePath = new File(argMap.get("lapstone"));
			final File www_debug = new File(appPath, "www_debug");

			File html = new File(www_debug, "files/template/" + argMap.get("name") + ".html");
			File less = new File(www_debug, "files/template/" + argMap.get("name") + ".less");

			FileUtils.write(html, "", Lapstone.CHARSET, false);
			FileUtils.write(less, "", Lapstone.CHARSET, false);

			ObjectMapper objectMapper = new ObjectMapper();
			File configuration = new File(www_debug, "js/plugin/plugin.HtmlTemplates.json");
			Plugin_HtmlTemplates_JSON htmlTemplates = objectMapper.readValue(configuration, Plugin_HtmlTemplates_JSON.class);

			Plugin_HtmlTemplates_JSON_Template template = new Plugin_HtmlTemplates_JSON_Template();
			template.setContent("../files/template/" + html.getName());
			template.setStyle("../files/template/" + less.getName());
			template.setElements(new HashMap<>());

			htmlTemplates.getTemplates().put(argMap.get("name"), template);
			objectMapper.writeValue(configuration, htmlTemplates);

			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
