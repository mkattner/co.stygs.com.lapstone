package co.stygs.com.lapstone.objects.json;

import java.io.File;
import java.util.List;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inet.lib.less.Less;

public class Plugin_LoadExternalScripts_JSON extends APlugin_JSON {

    public Plugin_LoadExternalScripts_JSON() {
	// TODO Auto-generated constructor stub
    }

    private List<String> styleOrdered;
    private List<String> javascriptOrdered;

    public List<String> getStyleOrdered() {
	return styleOrdered;
    }

    public void setStyleOrdered(List<String> styleOrdered) {
	this.styleOrdered = styleOrdered;
    }

    public List<String> getJavascriptOrdered() {
	return javascriptOrdered;
    }

    public void setJavascriptOrdered(List<String> javascriptOrdered) {
	this.javascriptOrdered = javascriptOrdered;
    }

    @Override
    public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception {
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;
	File currentFile;
	configuration = new File(www, "js/plugin/plugin.LoadExternalScripts.json");
	Plugin_LoadExternalScripts_JSON loadExternalScriptsJson = objectMapper.readValue(configuration, Plugin_LoadExternalScripts_JSON.class);

	List<String> style;
	List<String> javascript;

	style = loadExternalScriptsJson.getStyleOrdered();

	// JAVASCRIPT
	javascript = loadExternalScriptsJson.getJavascriptOrdered();

	System.out.println();
	String combinedJavascript = "";
	for (String url : javascript) {
	    currentFile = new File(www, "page/" + url);
	    System.out.println("Add: " + currentFile.getAbsolutePath());
	    combinedJavascript += FileUtils.readFileToString(currentFile) + "\n\n";
	    currentFile.delete();
	}
	File allJavascriptFile = new File(www, "files/all.javascript." + lapstoneJson.getVersion().get("app") + ".js");
	FileUtils.write(allJavascriptFile, combinedJavascript);
	// Compressor.compressJavaScript(allJavascriptFile.getAbsolutePath(),
	// allJavascriptFile.getAbsolutePath(), new
	// JavascriptCompressorOptions());

	// STYLES
	System.out.println();
	String combinedStyle = "";
	for (String url : style) {
	    currentFile = new File(www, "page/" + url);
	    System.out.println("Add: " + currentFile.getAbsolutePath());
	    String currentStyle;

	    if (url.endsWith(".less")) {
		currentStyle = Less.compile(currentFile, true) + "\n\n";
	    }

	    else if (url.endsWith(".css")) {
		currentStyle = FileUtils.readFileToString(currentFile) + "\n\n";
	    } else {
		currentStyle = "";
	    }

	    // resolve dependencies
	    currentStyle = currentStyle.replaceAll("url\\(\\'", "url('" + url.substring(0, url.lastIndexOf("/") + 1));
	    currentStyle = currentStyle.replaceAll("url\\(\\\"", "url(\"" + url.substring(0, url.lastIndexOf("/") + 1));

	    combinedStyle += currentStyle;
	    currentFile.delete();
	}
	FileUtils.write(new File(www, "files/all.style.css"), combinedStyle);
	return null;
    }

}
