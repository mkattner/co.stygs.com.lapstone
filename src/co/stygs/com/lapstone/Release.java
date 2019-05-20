package co.stygs.com.lapstone;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.IOFileFilter;
import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.IPlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;
import co.stygs.com.lapstone.objects.json.Page_JSON;
import co.stygs.com.lapstone.objects.json.Plugin_JSON;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.helger.commons.charset.CCharset;
import com.helger.css.ECSSVersion;
import com.helger.css.decl.CSSDeclaration;
import com.helger.css.decl.CSSExpression;
import com.helger.css.decl.CSSExpressionMemberTermSimple;
import com.helger.css.decl.CSSStyleRule;
import com.helger.css.decl.CascadingStyleSheet;
import com.helger.css.reader.CSSReader;
import com.helger.css.writer.CSSWriter;
import com.helger.css.writer.CSSWriterSettings;
import com.inet.lib.less.Less;

public class Release implements ILogger {

    public static List<File> cssRegistry = new ArrayList<>();

    private static void compressSinglePageFile(File www, String version) throws Exception {

	File allPages = new File(www, "js/page/all.page.js");
	File allPagesMin = new File(www, "js/page/all.page.min." + version + ".js");

	try {

	    // Compressor.compressJavaScript(allPages.getAbsolutePath(),
	    // allPagesMin.getAbsolutePath(), o);
	    LapstoneCompiler.Compile(allPages, allPagesMin, www);

	    // slow in java, but very useful for debugging release version
	    FileUtils.writeStringToFile(allPagesMin, "//# sourceURL=all.page." + version + ".js" + "\n" + FileUtils.readFileToString(allPagesMin, Lapstone.CHARSET), Lapstone.CHARSET);
	}

	catch (Exception e) {

	    FileUtils.copyFile(allPages, allPagesMin);

	    LOGGER.error("ERROR: NOT ABLE TO COMPRESS: " + allPages.getAbsolutePath());
	    // throw new CompressorException(e);
	}

	// allPages.delete();

    }

    private static void compressSinglePluginFile(File www, String version) throws Exception {

	File allPlugins = new File(www, "js/plugin/all.plugin.js");
	File allPluginsMin = new File(www, "js/plugin/all.plugin.min." + version + ".js");

	// FileUtils.copyFile(allPlugins, allPluginsMin);
	try {

	    // Compressor.compressJavaScript(allPlugins.getAbsolutePath(),
	    // allPluginsMin.getAbsolutePath(), o);
	    LapstoneCompiler.Compile(allPlugins, allPluginsMin, www);
	    // slow in java, but very useful for debugging release version
	    FileUtils.writeStringToFile(allPluginsMin, "//# sourceURL=all.plugin." + version + ".js" + "\n" + FileUtils.readFileToString(allPluginsMin, Lapstone.CHARSET), Lapstone.CHARSET);
	}

	catch (Exception e) {
	    LOGGER.error("Exception", e);
	    FileUtils.writeStringToFile(allPluginsMin, "//# sourceURL=all.plugin." + version + ".js" + "\n" + FileUtils.readFileToString(allPlugins, Lapstone.CHARSET), Lapstone.CHARSET);

	}

	// allPlugins.delete();
    }

    private static void createCombinedFilesFile(File www_debug, File www, String newVersion) throws Exception {
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;

	// PLUGIN Skin
	// configuration = new File(www, "js/plugin/plugin.Skin.json");
	// Plugin_SkinJson skinJson = objectMapper.readValue(configuration,
	// Plugin_SkinJson.class);

	configuration = new File(www, "js/lapstone.json");
	LapstoneJSON lapstoneJson = objectMapper.readValue(configuration, LapstoneJSON.class);

	configuration = new File(www, "js/plugin/plugins.json");
	Map<String, Boolean> plugins = objectMapper.readValue(configuration, new TypeReference<HashMap<String, String>>() {
	});

	LOGGER.info("Run release methods on plugins.");
	for (String pluginName : plugins.keySet()) {
	    String curretnClass = "co.stygs.com.lapstone.objects.json.plugin.Plugin_" + pluginName + "_JSON";
	    try {
		LOGGER.debug("-----------------------------------------------------------------------------------");
		LOGGER.debug("Running release() method on: " + curretnClass);
		IPlugin_JSON plugin_JSON = (IPlugin_JSON) Class.forName(curretnClass).newInstance();
		plugin_JSON.release(www_debug, www, lapstoneJson);

	    } catch (ClassNotFoundException e) {
		LOGGER.trace("ClassNotFoundException: " + curretnClass, e);
	    }
	}

	// PLUGIN HtmlTemplates

	// PLUGIN LoadExternalScripts

	// PLUGIN RestClient

	// PLUGIN WebServiceError

	// ********************************************************************
	// create single plugin file

	Release.createSinglePluginFile(www_debug, www);

	// ********************************************************************
	// create single page file

	Release.createSinglePageFile(www_debug, www);

    }

    private static void createSinglePageFile(File www_debug, File www) throws Exception {
	String allPagesContent = "";
	Page_JSON pageConfiguration;
	ObjectMapper objectMapper = new ObjectMapper();
	objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	List<File> include_onceList = new ArrayList<>();
	// create map and copy just the used pages

	LOGGER.info("Create all.pages.js file. Copy just used pages. -------------------------------------------");

	File[] pageFiles = new File(www, "js/page").listFiles();
	Arrays.sort(pageFiles); // we must sort the array, as the listFiles
	// method doesn't guarantee that the return
	// value is sorted. page_*.js must be
	// inserted before the pages includes.
	for (File file : pageFiles) {
	    LOGGER.info("Processing: " + file.getName());
	    String currentFileContent;

	    if (!file.isDirectory()) {

		currentFileContent = FileUtils.readFileToString(file, Lapstone.CHARSET);

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
		    LOGGER.trace("Identifiyer: " + jsIdentifyer);

		    // Minify the js file

		    try {

			// Compressor.compressJavaScript(file.getAbsolutePath(), file.getAbsolutePath(),
			// new JavascriptCompressorOptions());
			LapstoneCompiler.Compile(file, file, www_debug);
		    }

		    catch (Exception e) {
			throw new CompressorException(e);
		    }

		    currentFileContent = FileUtils.readFileToString(file, Lapstone.CHARSET);

		}

		else if (file.getName().endsWith("json")) {
		    String jsIdentifyer = file.getName().substring(file.getName().indexOf(".") + 1, file.getName().indexOf(".", file.getName().indexOf(".") + 1));
		    LOGGER.trace("Identifiyer: " + jsIdentifyer);
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
		// file.delete();

		if (!currentFileContent.endsWith(";"))
		    currentFileContent += ";";

		currentFileContent += "\n";

		allPagesContent += currentFileContent;
	    }
	}

	String includeContent = "";
	for (File include_onceFile : include_onceList) {
	    // Minify the js include file

	    try {
		// Compressor.compressJavaScript(include_onceFile.getAbsolutePath(),
		// include_onceFile.getAbsolutePath(), new JavascriptCompressorOptions());
		LapstoneCompiler.Compile(include_onceFile, include_onceFile, www);
	    } catch (Exception e) {
		LOGGER.error("ERROR: NOT ABLE TO COMPRESS: " + include_onceFile.getAbsolutePath(), e);
		// throw new CompressorException(e);
	    }

	    LOGGER.info("Adding include_once file: " + include_onceFile.getAbsolutePath());
	    includeContent += ";" + FileUtils.readFileToString(include_onceFile, Charset.forName("UTF-8"));
	    // include_onceFile.delete();
	}
	includeContent = "includeEverything=function(){" + includeContent + "};";

	allPagesContent += includeContent;

	FileUtils.writeStringToFile(new File(www, "js/page/all.page.js"), allPagesContent, Lapstone.CHARSET);
	// FileUtils.deleteDirectory(new File(www, "js/page/include"));
    }

    private static void createSinglePluginFile(File www_debug, File www) throws Exception {
	StringBuilder allPluginsContent = new StringBuilder();
	APlugin_JSON pluginConfiguration;
	ObjectMapper objectMapper = new ObjectMapper();
	objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	// create map and copy just the used pages
	LOGGER.info("Create all.plugin.js file. Copy just used plugins. ----------------------------------------");
	// NEW
	File pluginJson, pluginJs, currentPluginFile;

	pluginJson = new File(www, "js/plugin/plugins.json");
	LinkedHashMap<String, Boolean> plugins = objectMapper.readValue(pluginJson, new TypeReference<LinkedHashMap<String, Boolean>>() {
	});

	pluginJs = new File(www, "js/plugin/plugins.js");
	allPluginsContent.append(FileUtils.readFileToString(pluginJs, Lapstone.CHARSET));
	// pluginJs.delete();

	pluginJson = new File(www, "js/plugin/plugins.json");
	allPluginsContent.append(";\n" + "var config_json = " + FileUtils.readFileToString(pluginJson, Lapstone.CHARSET));
	// pluginJson.delete();

	// for each plugin in lapstone
	for (String pluginName : plugins.keySet()) {
	    // just load used plugins
	    if (Boolean.TRUE.equals(plugins.get(pluginName))) {
		// JS
		currentPluginFile = new File(www, "js/plugin/plugin." + pluginName + ".js");
		try {
		    // Compressor.compressJavaScript(currentFile.getAbsolutePath(),
		    // currentFile.getAbsolutePath(), new JavascriptCompressorOptions());

		    LapstoneCompiler.Compile(currentPluginFile, currentPluginFile, www_debug);
		} catch (Exception e) {
		    throw new CompressorException(e);
		}
		allPluginsContent.append(";\n\n" + FileUtils.readFileToString(currentPluginFile, Lapstone.CHARSET));
		// Files.delete(currentPluginFile.toPath());

		// JSON
		currentPluginFile = new File(www, "js/plugin/plugin." + pluginName + ".json");

		// parse JSON file to include the included files

		String curretnClass = "co.stygs.com.lapstone.objects.json.plugin.Plugin_" + pluginName + "_JSON";
		try {
		    System.out.println("Running release() method on: " + curretnClass);
		    pluginConfiguration = (APlugin_JSON) objectMapper.readValue(currentPluginFile, Class.forName(curretnClass));

		} catch (ClassNotFoundException e) {
		    pluginConfiguration = objectMapper.readValue(currentPluginFile, Plugin_JSON.class);
		}

		for (String pluginIncludeFileName : pluginConfiguration.getInclude()) {
		    File pluginIncludeFile = new File(www, "js/plugin/include/" + pluginName + "/" + pluginIncludeFileName);
		    LOGGER.info("Adding include file: " + pluginIncludeFile.getAbsolutePath());

		    // slow
		    LapstoneCompiler.Compile(pluginIncludeFile, pluginIncludeFile, www_debug);

		    allPluginsContent.append(";\n\n" + FileUtils.readFileToString(pluginIncludeFile, Lapstone.CHARSET));
		    // pluginIncludeFile.delete();
		}

		allPluginsContent.append(";\n\n" + pluginConfiguration.getAdditionalJavascript(www));

		allPluginsContent.append(";\n\n" + "var config_" + pluginName + "=" + FileUtils.readFileToString(currentPluginFile, Lapstone.CHARSET));

		// Files.delete(currentPluginFile.toPath());
	    }

	}

	FileUtils.write(new File(www, "js/plugin/all.plugin.js"), allPluginsContent, Lapstone.CHARSET);

	Thread.sleep(1000);
	File includeDirectory = new File(www, "js/plugin/include");
	LOGGER.debug("Delete directorey: " + new File(www, "js/plugin/include").getAbsolutePath());
	Files.walk(includeDirectory.toPath()).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(new Consumer<File>() {

	    @Override
	    public void accept(File f) {
		LOGGER.trace(f.getAbsolutePath());
		try {
		    Files.delete(f.toPath());
		} catch (IOException e) {
		    e.printStackTrace();
		    System.exit(-1);
		}

	    }
	});
	;

	// FileUtils.deleteDirectory(includeDirectory);
    }

    // ************************************************************************
    //
    //
    // ************************************************************************
    public static Boolean ReleaseLapstone(Map<String, String> argMap) throws Exception {

	LOGGER.debug("Running method RELEASE() ------------------------------------------------------------------");

	try {
	    // initialize directories
	    File root = new File(argMap.get("path"));
	    File www = new File(root, "www");
	    File www_debug = new File(root, "www_debug");

	    // ********************************************************************
	    // debug output

	    LOGGER.debug("     root: " + root.getAbsolutePath());
	    LOGGER.debug("      www: " + www.getAbsolutePath());
	    LOGGER.debug("www_debug: " + www_debug.getAbsolutePath());

	    // ********************************************************************
	    // update app version
	    ObjectMapper objectMapper = new ObjectMapper();
	    File configuration = new File(www_debug, "js/lapstone.json");
	    LapstoneJSON lapstoneJson = objectMapper.readValue(configuration, LapstoneJSON.class);
	    String appVersion = (String) lapstoneJson.getVersion().get("app");
	    Integer buildVersion = Integer.parseInt(appVersion.split("\\.")[appVersion.split("\\.").length - 1]);
	    buildVersion++;
	    String newVersion = ((String) lapstoneJson.getVersion().get("app")).substring(0, ((String) lapstoneJson.getVersion().get("app")).lastIndexOf(".") + 1) + buildVersion.toString();
	    lapstoneJson.getVersion().put("app", newVersion);
	    objectMapper.writeValue(configuration, lapstoneJson);

	    System.out.println();
	    System.out.println("Updating app version from " + appVersion + " to " + newVersion);

	    // ********************************************************************
	    // copy www_debug to www

	    System.out.println("Delete directory: " + www.getAbsolutePath());
	    FileUtils.deleteDirectory(www);

	    System.out.println("Copy directory: " + www_debug.getAbsolutePath() + " to " + www.getAbsolutePath());
	    FileUtils.copyDirectory(www_debug, www, true);

	    System.out.println("Delete directory: " + "tools");
	    FileUtils.deleteQuietly(new File(www, "tools"));

	    // ********************************************************************
	    // set cordova configuration

	    configuration = new File(www, "js/lapstone.json");
	    lapstoneJson = objectMapper.readValue(configuration, LapstoneJSON.class);

	    lapstoneJson.setMin(true);

	    File startupStyle = new File(www, "js/lapstone.css");
	    File startupContent = new File(www, "js/lapstone.html");

	    lapstoneJson.setStartupContent(FileUtils.readFileToString(startupContent, Lapstone.CHARSET));
	    lapstoneJson.setStartupStyle(FileUtils.readFileToString(startupStyle, Lapstone.CHARSET));

	    Files.delete(startupStyle.toPath());
	    Files.delete(startupContent.toPath());

	    objectMapper.writeValue(configuration, lapstoneJson);

	    // ********************************************************************
	    // combine files
	    Release.createCombinedFilesFile(www_debug, www, newVersion);

	    // ********************************************************************
	    // minify plugins

	    Release.compressSinglePluginFile(www, newVersion);

	    // ********************************************************************
	    // minify pages

	    Release.compressSinglePageFile(www, newVersion);

	    // ********************************************************************
	    // compile less
	    System.out.println();
	    System.out.println("Compute the LESS and CSS style files --------------------------------------------------");
	    System.out.println();
	    System.out.println("Compile all the LESS files ending with .css.less --------------------------------------");
	    System.out.println();

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

		System.out.println("compute less file: " + lessFile.getAbsolutePath());
		System.out.println("     write to css: " + cssFromLessFile.getAbsolutePath());
		System.out.println();

		FileUtils.write(cssFromLessFile, Less.compile(lessFile, false), Lapstone.CHARSET);

	    }

	    // delete the less files
	    LOGGER.info("Delete the LESS files because they are unused in the RELEASE version. -----------------");

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
		LOGGER.trace("Delete less: " + lessFile.getAbsolutePath());
		FileUtils.deleteQuietly(lessFile);
	    }

	    // ********************************************************************
	    // minify css
	    LOGGER.info("Minify all CSS files. -----------------------------------------------------------------");

	    // for (File cssFile : FileUtils.listFiles(www, new IOFileFilter() {
	    //
	    // @Override
	    // public boolean accept(File file) {
	    // if (file.getName().endsWith(".css")) {
	    // switch (file.getName()) {
	    // case "lapstone.css":
	    // return false;
	    //
	    // case "all.style.css":
	    // return true;
	    //
	    // default:
	    // return false;
	    //
	    // }
	    // }
	    // return false;
	    // }
	    //
	    // @Override
	    // public boolean accept(File dir, String name) {
	    // // TODO Auto-generated method stub
	    // return false;
	    // }
	    //
	    // }, DirectoryFileFilter.DIRECTORY))
	    for (File cssFile : Release.cssRegistry) {

		File newCssFile = new File(cssFile.getAbsoluteFile().getParentFile().getAbsolutePath(), cssFile.getName().replace(".css", "." + newVersion + ".css"));

		System.out.println("              Read css: " + cssFile.getAbsolutePath());
		System.out.println("Compress and rename to: " + newCssFile.getAbsolutePath());

		// Compressor.compressStylesheet(cssFile.getAbsolutePath(),
		// newCssFile.getAbsolutePath(), c);
		cssFile.renameTo(newCssFile);
		cssFile.delete();

		CascadingStyleSheet aCSS = CSSReader.readFromFile(newCssFile, CCharset.CHARSET_UTF_8_OBJ, ECSSVersion.CSS30);
		if (aCSS == null) {
		    System.out.println("Error reading CSS file: " + newCssFile.getAbsolutePath());
		    return false;
		} else {
		    for (CSSStyleRule rule : aCSS.getAllStyleRules()) {
			int index = 0;
			for (CSSDeclaration declaration : rule.getAllDeclarations()) {
			    // DISPLAY:FLEX
			    if (declaration.getProperty().equals("display")) {

				String expression = declaration.getExpression().getAsCSSString(new CSSWriterSettings(), 0);
				if (expression.equals("flex")) {
				    // display: -webkit-box;
				    // display: -moz-box;
				    // display: -ms-flexbox;
				    // display: -webkit-flex;
				    // display: flex;
				    rule.addDeclaration(index, new CSSDeclaration("display", new CSSExpression().addMember(new CSSExpressionMemberTermSimple("-webkit-box"))));
				    index++;
				    rule.addDeclaration(index, new CSSDeclaration("display", new CSSExpression().addMember(new CSSExpressionMemberTermSimple("-moz-box"))));
				    index++;
				    rule.addDeclaration(index, new CSSDeclaration("display", new CSSExpression().addMember(new CSSExpressionMemberTermSimple("-ms-flexbox"))));
				    index++;
				    rule.addDeclaration(index, new CSSDeclaration("display", new CSSExpression().addMember(new CSSExpressionMemberTermSimple("-webkit-flex"))));
				    index++;
				}
			    }
			    // FLEX
			    else if (declaration.getProperty().equals("flex")) {
				String expression = declaration.getExpression().getAsCSSString(new CSSWriterSettings(), 0);

				// -webkit-box-flex: 8;
				// -moz-box-flex: 8;
				// width: 20%; -webkit-flex: 8;
				// -ms-flex: 8;
				// flex: 8;
				rule.addDeclaration(index, new CSSDeclaration("-webkit-box-flex", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
				rule.addDeclaration(index, new CSSDeclaration("-moz-box-flex", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
				rule.addDeclaration(index, new CSSDeclaration("-ms-flex", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
			    }
			    // JUSTIFY-CONTENT
			    else if (declaration.getProperty().equals("justify-content")) {
				String expression = declaration.getExpression().getAsCSSString(new CSSWriterSettings(), 0);

				rule.addDeclaration(index, new CSSDeclaration("-webkit-justify-content", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
				rule.addDeclaration(index, new CSSDeclaration("-moz-justify-content", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
				rule.addDeclaration(index, new CSSDeclaration("-ms-justify-content", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
			    }
			    // ALIGN-ITEMS
			    else if (declaration.getProperty().equals("align-items")) {
				String expression = declaration.getExpression().getAsCSSString(new CSSWriterSettings(), 0);

				rule.addDeclaration(index, new CSSDeclaration("-webkit-align-items", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
				rule.addDeclaration(index, new CSSDeclaration("-moz-align-items", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
				rule.addDeclaration(index, new CSSDeclaration("-ms-align-items", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
			    }
			    // FLEX-DIRECTION
			    else if (declaration.getProperty().equals("flex-direction")) {
				String expression = declaration.getExpression().getAsCSSString(new CSSWriterSettings(), 0);

				rule.addDeclaration(index, new CSSDeclaration("-webkit-flex-direction", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
				rule.addDeclaration(index, new CSSDeclaration("-moz-flex-direction", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
				rule.addDeclaration(index, new CSSDeclaration("-ms-flex-direction", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
				index++;
			    }
			    index++;
			}
		    }
		    new CSSWriter(ECSSVersion.CSS30, true).writeCSS(aCSS, new FileWriter(newCssFile));

		}
	    }

	    // // delete empty and unused directoryies
	    // for (File toDelete : FileUtils.listFilesAndDirs(new File(www,
	    // "ext"), new NotFileFilter(TrueFileFilter.INSTANCE),
	    // DirectoryFileFilter.DIRECTORY)) {
	    //
	    // if (!(toDelete.getName().equals("ext") ||
	    // toDelete.getName().equals("jQuery") ||
	    // toDelete.getName().equals("jQueryMobile"))) {
	    // System.out.println("Delete: " + toDelete.getAbsolutePath());
	    // FileUtils.deleteDirectory(toDelete);
	    // }
	    // }

	    // Compress lapstone
	    System.out.println("Compress lapstone:");
	    File lapstoneJsFile = new File(www, "js/lapstone.js");
	    // Compressor.compressJavaScript(lapstoneJsFile.getAbsolutePath(),
	    // lapstoneJsFile.getAbsolutePath(), new JavascriptCompressorOptions());

	    LapstoneCompiler.Compile(lapstoneJsFile, lapstoneJsFile, www_debug);

	    // slow in java, but very useful for debugging release version
	    FileUtils.writeStringToFile(lapstoneJsFile, "//# sourceURL=lapstone.js" + "\n" + FileUtils.readFileToString(lapstoneJsFile, Lapstone.CHARSET), Lapstone.CHARSET);

	    return true;

	} catch (IOException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	    return false;
	}
    }
}
