package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Page {
	public static Boolean PageLapstone(Map<String, String> argMap) {

		try {
			File appPath = new File(argMap.get("path"));
			File lapstonePath = new File(argMap.get("lapstone"));
			final File www_debug = new File(appPath, "www_debug");
			// final File www = new File(lapstonePath, "www");

			File templateJs = new File(lapstonePath, "tools/template/page.template.js");
			File templateHtml = new File(lapstonePath, "tools/template/page.template.html");
			File templateJson = new File(lapstonePath, "tools/template/page.template.json");

			File newJs = new File(www_debug, "js/page/page." + argMap.get("name") + ".js");
			File newHtml = new File(www_debug, "page/" + argMap.get("name") + ".html");
			File newJson = new File(www_debug, "js/page/page." + argMap.get("name") + ".json");

			String json = FileUtils.readFileToString(templateJson, Lapstone.CHARSET);
			String js = FileUtils.readFileToString(templateJs, Lapstone.CHARSET);
			String html = FileUtils.readFileToString(templateHtml, Lapstone.CHARSET);

			json = json.replace("##template", argMap.get("name"));
			js = js.replace("##template", argMap.get("name"));
			html = html.replace("##template", argMap.get("name"));

			// write content to new page files
			FileUtils.write(newJson, json, Lapstone.CHARSET, false);
			FileUtils.write(newJs, js, Lapstone.CHARSET, false);
			FileUtils.write(newHtml, html, Lapstone.CHARSET, false);

			// register page
			File pages = new File(www_debug, "js/page/pages.json");
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, Boolean> pagesJson = objectMapper.readValue(pages, new TypeReference<Map<String, Boolean>>() {
			});
			pagesJson.put(argMap.get("name"), true);
			objectMapper.writeValue(pages, pagesJson);

			return true;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

}
