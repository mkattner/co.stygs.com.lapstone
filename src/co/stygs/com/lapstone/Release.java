package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.IOFileFilter;

import co.stygs.com.lapstone.Compressor.JavascriptCompressorOptions;
import co.stygs.com.lapstone.Compressor.StylesheetCompressorOptions;
import co.stygs.com.lapstone.objects.LapstoneJson;
import co.stygs.com.lapstone.objects.Page_JSON;
import co.stygs.com.lapstone.objects.Plugin_JSON;
import co.stygs.com.lapstone.objects.Plugin_LoadExternalScriptsJson;
import co.stygs.com.lapstone.objects.Plugin_SkinJson;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inet.lib.less.Less;

public class Release {
    // ************************************************************************
    //
    //
    // ************************************************************************
    public static Boolean ReleaseLapstone(Map<String, String> argMap) throws Exception {

	System.out.println();
	System.out.println("Running method RELEASE()");
	try {
	    // initialize directories
	    File rootPath = new File(argMap.get("path"));
	    File www = new File(rootPath, "www");
	    File www_debug = new File(rootPath, "www_debug");

	    // ********************************************************************
	    // debug output

	    System.out.println("root path: " + rootPath.getAbsolutePath());
	    System.out.println("path to www: " + www.getAbsolutePath());
	    System.out.println("path to www_debug: " + www_debug.getAbsolutePath());

	    // ********************************************************************
	    // update app version

	    ObjectMapper objectMapper = new ObjectMapper();
	    File configuration = new File(www_debug, "js/lapstone.json");
	    LapstoneJson lapstoneJson = objectMapper.readValue(configuration, LapstoneJson.class);
	    String appVersion = (String) lapstoneJson.version.get("app");
	    Integer buildVersion = Integer.parseInt(appVersion.split("\\.")[appVersion.split("\\.").length - 1]);
	    buildVersion++;
	    String newVersion = ((String) lapstoneJson.version.get("app")).substring(0, ((String) lapstoneJson.version.get("app")).lastIndexOf(".") + 1) + buildVersion.toString();
	    lapstoneJson.version.put("app", newVersion);
	    objectMapper.writeValue(configuration, lapstoneJson);

	    System.out.println();
	    System.out.println("Updating app version from " + appVersion + " to " + newVersion);

	    // ********************************************************************
	    // copy www_debug to www

	    FileUtils.deleteDirectory(www);
	    FileUtils.copyDirectory(www_debug, www, true);

	    FileUtils.deleteQuietly(new File(www, "tools"));

	    // ********************************************************************
	    // set cordova configuration

	    configuration = new File(www, "js/lapstone.json");
	    lapstoneJson = objectMapper.readValue(configuration, LapstoneJson.class);

	    lapstoneJson.min = true;

	    objectMapper.writeValue(configuration, lapstoneJson);

	    // ********************************************************************
	    // combine files
	    Release.createCombinedFilesFile(www);

	    // ********************************************************************
	    // minify plugins

	    Release.compressSinglePluginFile(www, newVersion);

	    // ********************************************************************
	    // minify pages

	    Release.compressSinglePageFile(www, newVersion);

	    // ********************************************************************
	    // compile less
	    System.out.println("Compile all the .less files ending with TODO");
	    for (File lessFile : FileUtils.listFiles(www, new IOFileFilter() {

		@Override
		public boolean accept(File file) {
		    if (file.getName().endsWith(".css.less"))
			return true;
		    return false;
		}

		@Override
		public boolean accept(File dir, String name) {
		    // TODO Auto-generated method stub
		    return false;
		}

	    }, DirectoryFileFilter.DIRECTORY)) {
		File cssFromLessFile = new File(lessFile.getAbsolutePath().replace(".less", ""));

		System.out.println("computing less file: " + lessFile.getAbsolutePath());
		System.out.println("       write to css: " + cssFromLessFile.getAbsolutePath());
		System.out.println();

		FileUtils.write(cssFromLessFile, Less.compile(lessFile, false));

	    }

	    // delete the less files
	    System.out.println("Delete the less files.");
	    for (File lessFile : FileUtils.listFiles(www, new IOFileFilter() {

		@Override
		public boolean accept(File file) {
		    if (file.getName().endsWith(".less"))
			return true;
		    return false;
		}

		@Override
		public boolean accept(File dir, String name) {
		    // TODO Auto-generated method stub
		    return false;
		}

	    }, DirectoryFileFilter.DIRECTORY)) {
		System.out.println("Delete less: " + lessFile.getAbsolutePath());
		FileUtils.deleteQuietly(lessFile);
	    }

	    // ********************************************************************
	    // minify css
	    System.out.println("Minify all css files.");

	    StylesheetCompressorOptions c = new StylesheetCompressorOptions();
	    for (File cssFile : FileUtils.listFiles(www, new IOFileFilter() {

		@Override
		public boolean accept(File file) {
		    if (file.getName().endsWith(".css")) {
			if (file.getName().equals("lapstone.css"))
			    return false;
			return true;
		    }
		    return false;
		}

		@Override
		public boolean accept(File dir, String name) {
		    // TODO Auto-generated method stub
		    return false;
		}

	    }, DirectoryFileFilter.DIRECTORY)) {

		File newCssFile = new File(cssFile.getAbsoluteFile().getParentFile().getAbsolutePath(), cssFile.getName().replace(".css", "." + newVersion + ".css"));

		System.out.println();
		System.out.println("Compress css: " + cssFile.getAbsolutePath());
		System.out.println("   Rename to: " + newCssFile.getAbsolutePath());

		Compressor.compressStylesheet(cssFile.getAbsolutePath(), newCssFile.getAbsolutePath(), c);

		cssFile.delete();
	    }

	    return true;

	} catch (IOException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	    return false;
	}
    }

    private static void createCombinedFilesFile(File www) throws Exception {
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;

	configuration = new File(www, "js/plugin/plugin.LoadExternalScripts.json");
	Plugin_LoadExternalScriptsJson loadExternalScriptsJson = objectMapper.readValue(configuration, Plugin_LoadExternalScriptsJson.class);

	// configuration = new File(www, "js/plugin/plugin.Skin.json");
	// Plugin_SkinJson skinJson = objectMapper.readValue(configuration,
	// Plugin_SkinJson.class);

	List<String> style;
	List<String> javascript;

	style = loadExternalScriptsJson.getScripts().getStyle();
	style.addAll(loadExternalScriptsJson.getScripts().getStyleOrdered());

	javascript = loadExternalScriptsJson.getScripts().getJavascript();
	javascript.addAll(loadExternalScriptsJson.getScripts().getJavascriptOrdered());

	String combinedJavascript = "";
	for (String url : javascript) {
	    combinedJavascript += FileUtils.readFileToString(new File(www, "page/" + url));
	}
	FileUtils.write(new File(www, "files/all.javascript.js"), combinedJavascript);

	String combinedStyle = "";
	for (String url : style) {
	    combinedStyle += FileUtils.readFileToString(new File(www, "page/" + url));
	}
	FileUtils.write(new File(www, "files/all.style.css"), combinedStyle);

	// ********************************************************************
	// create single plugin file

	Release.createSinglePluginFile(www);

	// ********************************************************************
	// create single page file

	Release.createSinglePageFile(www);

    }

    private static void createSinglePluginFile(File www) throws Exception {
	String allPluginsContent = "";
	Plugin_JSON pluginConfiguration;
	ObjectMapper objectMapper = new ObjectMapper();
	objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	// create map and copy just the used pages
	System.out.println();
	System.out.println("Create all.plugin.js file. Copy just used plugins.");

	for (File file : new File(www, "js/plugin").listFiles()) {
	    System.out.println();
	    System.out.println("Processing: " + file.getName());
	    String currentFileContent;

	    if (!file.isDirectory()) {

		currentFileContent = FileUtils.readFileToString(file);

		// do not process hidden file
		if (file.getName().startsWith(".")) {
		    currentFileContent = "";
		}

		// plugin management file
		else if (file.getName().equals("plugins.js")) {
		}

		// plugin configuration file
		else if (file.getName().equals("plugins.json")) {
		    currentFileContent = "var config_json = " + currentFileContent;
		}

		// plugin javascript files
		else if (file.getName().endsWith("js")) {
		    String jsIdentifyer = file.getName().substring(file.getName().indexOf(".") + 1, file.getName().indexOf(".", file.getName().indexOf(".") + 1));
		    System.out.println("Identifiyer: " + jsIdentifyer);

		    // Minify the js file

		    try {

			Compressor.compressJavaScript(file.getAbsolutePath(), file.getAbsolutePath(), new JavascriptCompressorOptions());

		    }

		    catch (Exception e) {
			throw new CompressorException(e);
		    }

		    currentFileContent = FileUtils.readFileToString(file);
		}

		// plugin configuration files
		else if (file.getName().endsWith("json")) {
		    String jsIdentifyer = file.getName().substring(file.getName().indexOf(".") + 1, file.getName().indexOf(".", file.getName().indexOf(".") + 1));
		    System.out.println("Identifiyer: " + jsIdentifyer);
		    currentFileContent = "var config_" + jsIdentifyer + "=" + currentFileContent;

		    // parse JSON file to include the included files
		    pluginConfiguration = objectMapper.readValue(file, Plugin_JSON.class);
		    for (String pluginIncludeFileName : pluginConfiguration.getInclude()) {
			File pluginIncludeFile = new File(www, "js/plugin/include/" + pluginConfiguration.getName() + "/" + pluginIncludeFileName);
			System.out.println("Adding include file: " + pluginIncludeFile.getAbsolutePath());

			// Minify the js include file

			try {

			    Compressor.compressJavaScript(pluginIncludeFile.getAbsolutePath(), pluginIncludeFile.getAbsolutePath(), new JavascriptCompressorOptions());

			}

			catch (Exception e) {
			    throw new CompressorException(e);
			}

			currentFileContent += ";" + FileUtils.readFileToString(pluginIncludeFile);
			pluginIncludeFile.delete();
		    }

		}

		// delete processed file
		file.delete();

		// add semicolon at the end of js/json file
		if (!currentFileContent.endsWith(";"))
		    currentFileContent += ";";

		allPluginsContent += currentFileContent;
	    }
	}
	FileUtils.write(new File(www, "js/plugin/all.plugin.js"), allPluginsContent);
	FileUtils.deleteDirectory(new File(www, "js/plugin/include"));
    }

    private static void createSinglePageFile(File www) throws Exception {
	String allPagesContent = "";
	Page_JSON pageConfiguration;
	ObjectMapper objectMapper = new ObjectMapper();
	objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	List<File> include_onceList = new ArrayList<>();
	// create map and copy just the used pages
	System.out.println();
	System.out.println("Create all.pages.js file. Copy just used pages.");

	for (File file : new File(www, "js/page").listFiles()) {
	    System.out.println();
	    System.out.println("Processing: " + file.getName());
	    String currentFileContent;

	    if (!file.isDirectory()) {

		currentFileContent = FileUtils.readFileToString(file);

		if (file.getName().startsWith(".")) {
		    currentFileContent = "";
		}

		else if (file.getName().equals("pages.js")) {
		}

		else if (file.getName().equals("pages.json")) {
		    currentFileContent = "var config_json = " + currentFileContent;
		}

		else if (file.getName().endsWith("js")) {
		    String jsIdentifyer = file.getName().substring(file.getName().indexOf(".") + 1, file.getName().indexOf(".", file.getName().indexOf(".") + 1));
		    System.out.println("Identifiyer: " + jsIdentifyer);

		    // Minify the js file

		    try {

			Compressor.compressJavaScript(file.getAbsolutePath(), file.getAbsolutePath(), new JavascriptCompressorOptions());

		    }

		    catch (Exception e) {
			throw new CompressorException(e);
		    }

		    currentFileContent = FileUtils.readFileToString(file);

		}

		else if (file.getName().endsWith("json")) {
		    String jsIdentifyer = file.getName().substring(file.getName().indexOf(".") + 1, file.getName().indexOf(".", file.getName().indexOf(".") + 1));
		    System.out.println("Identifiyer: " + jsIdentifyer);
		    currentFileContent = "var config_" + jsIdentifyer + "=" + currentFileContent;

		    // parse JSON file to include the included files
		    pageConfiguration = objectMapper.readValue(file, Page_JSON.class);
		    for (String pageIncludeFileName : pageConfiguration.getInclude_once()) {
			File pageIncludeFile = new File(www, "js/page/include/" + pageIncludeFileName);

			if (!include_onceList.contains(pageIncludeFile)) {
			    include_onceList.add(pageIncludeFile);
			}
		    }
		}

		// delete processed file
		file.delete();

		if (!currentFileContent.endsWith(";"))
		    currentFileContent += ";";

		allPagesContent += currentFileContent;
	    }
	}

	for (File include_onceFile : include_onceList) {
	    // Minify the js include file

	    try {
		Compressor.compressJavaScript(include_onceFile.getAbsolutePath(), include_onceFile.getAbsolutePath(), new JavascriptCompressorOptions());
	    } catch (Exception e) {
		throw new CompressorException(e);
	    }

	    System.out.println("Adding include_once file: " + include_onceFile.getAbsolutePath());
	    allPagesContent += ";" + FileUtils.readFileToString(include_onceFile);
	    include_onceFile.delete();
	}
	FileUtils.write(new File(www, "js/page/all.page.js"), allPagesContent);
	FileUtils.deleteDirectory(new File(www, "js/page/include"));
    }

    private static void compressSinglePluginFile(File www, String version) throws Exception {
	JavascriptCompressorOptions o = new JavascriptCompressorOptions(false);

	File allPlugins = new File(www, "js/plugin/all.plugin.js");
	File allPluginsMin = new File(www, "js/plugin/all.plugin.min." + version + ".js");

	try {

	    Compressor.compressJavaScript(allPlugins.getAbsolutePath(), allPluginsMin.getAbsolutePath(), o);

	}

	catch (Exception e) {
	    throw new CompressorException(e);
	}

	allPlugins.delete();
    }

    private static void compressSinglePageFile(File www, String version) throws Exception {
	JavascriptCompressorOptions o = new JavascriptCompressorOptions(false);

	File allPages = new File(www, "js/page/all.page.js");
	File allPagesMin = new File(www, "js/page/all.page.min." + version + ".js");

	try {

	    Compressor.compressJavaScript(allPages.getAbsolutePath(), allPagesMin.getAbsolutePath(), o);

	}

	catch (Exception e) {
	    throw new CompressorException(e);
	}

	allPages.delete();

	
    }
}
