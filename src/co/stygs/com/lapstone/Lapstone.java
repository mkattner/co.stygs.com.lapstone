package co.stygs.com.lapstone;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.ConsoleHandler;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;

import co.stygs.com.lapstone.objects.LapstoneJson;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yahoo.platform.yui.compressor.JavaScriptCompressor;
import com.yahoo.platform.yui.compressor.YUICompressor;

public class Lapstone {

    public Lapstone() {
	// TODO Auto-generated constructor stub
    }

    static {

    }

    public static String workingDirectory = System.getProperty("user.dir");
    private static Logger logger = Logger.getLogger(YUICompressor.class
	    .getName());

    public static void main(String[] args) {
	logger.addHandler(new ConsoleHandler());
	logger.setLevel(Level.ALL);

	System.out.println("Running LAPSTONE with parameters:");
	Map<String, String> argMap = new HashMap<String, String>();
	for (String arg : args) {
	    System.out.println(arg);
	}

	// prepare parameters
	for (String arg : args) {
	    argMap.put(arg.split("=")[0].substring(1), arg.split("=")[1]);
	}

	if (argMap.get("function") == null) {
	    System.out.println("Missing parameter: function");
	    PrintHelp();
	} else {

	    switch (argMap.get("function")) {
	    case "deploy":
		try {
		    Deploy(argMap);
		} catch (Exception e) {
		    // TODO Auto-generated catch block
		    e.printStackTrace();
		}
		break;
	    case "release":
		try {
		    Release(argMap);
		} catch (Exception e) {
		    // TODO Auto-generated catch block
		    e.printStackTrace();
		}
		break;
	    case "page":
		try {
		    Page(argMap);
		} catch (Exception e) {
		    // TODO Auto-generated catch block
		    e.printStackTrace();
		}
		break;
	    default:
		System.out.println("Unknown function: "
			+ argMap.get("function"));
	    }
	}
    }

    // ************************************************************************
    //
    //
    // ************************************************************************
    private static Boolean Deploy(Map<String, String> argMap) throws Exception {
	if (argMap.get("path") == null) {
	    System.out.println("Missing parameter: -path");
	    PrintHelp();
	    return false;
	}
	if (argMap.get("lapstone") == null) {
	    System.out.println("Missing parameter: -lapstone");
	    PrintHelp();
	    return false;
	}

	File appPath = new File(argMap.get("path"));
	File lapstonePath = new File(argMap.get("lapstone"));
	final File www_debug = new File(appPath, "www_debug");
	final File www = new File(lapstonePath, "www");

	// ********************************************************************
	// debug output

	System.out.println("app path\t\t" + appPath.getAbsolutePath());
	System.out
		.println("app path www_debug\t" + www_debug.getAbsolutePath());
	System.out
		.println("lapstone path\t\t" + lapstonePath.getAbsolutePath());
	System.out.println("lapstone path www\t" + www.getAbsolutePath());

	// ********************************************************************
	// update cordova version
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration = new File(www, "js/lapstone.json");
	LapstoneJson lapstoneJson = objectMapper.readValue(configuration,
		LapstoneJson.class);
	String appVersion = (String) lapstoneJson.version.get("lapstone");
	Integer buildVersion = Integer
		.parseInt(appVersion.split("\\.")[appVersion.split("\\.").length - 1]);
	buildVersion++;
	String newVersion = ((String) lapstoneJson.version.get("lapstone"))
		.substring(0, ((String) lapstoneJson.version.get("lapstone"))
			.lastIndexOf(".") + 1)
		+ buildVersion.toString();
	lapstoneJson.version.put("lapstone", newVersion);
	objectMapper.writeValue(configuration, lapstoneJson);

	// ********************************************************************
	// Copy everything if not exist
	FileUtils.copyDirectory(www, www_debug, new FileFilter() {
	    @Override
	    public boolean accept(File pathname) {

		File destination = new File(pathname.getAbsolutePath().replace(
			www.getAbsolutePath(), www_debug.getAbsolutePath()));
		if (destination.isDirectory())
		    return true;
		else if (!destination.exists()) {
		    return true;
		}

		return false;
	    }
	}, true);

	// delete the documentation folder (because its not up to date)
	FileUtils.deleteQuietly(new File(www_debug, "js/documentation"));

	// ********************************************************************
	// copy plugins (*.js files and *.json files if they do not exist)
	FileUtils.copyDirectory(new File(www, "js/plugin"), new File(www_debug,
		"js/plugin"), new FileFilter() {

	    @Override
	    public boolean accept(File pathname) {
		File destination = new File(www_debug, "js/plugin/"
			+ pathname.getName());
		if (pathname.getName().endsWith(".js"))
		    return true;
		else if (pathname.getName().endsWith(".json")
			&& !destination.exists())
		    return true;
		return false;
	    }
	}, true);

	// ********************************************************************
	// copy pages (if they do not exist)
	FileUtils.copyDirectory(new File(www, "js/page"), new File(www_debug,
		"js/page"), new FileFilter() {

	    @Override
	    public boolean accept(File pathname) {
		File destination = new File(www_debug, "js/page/"
			+ pathname.getName());
		if (destination.getName().equals("pages.js"))
		    return true;
		else if (!destination.exists())
		    return true;
		return false;
	    }
	}, true);

	FileUtils.copyFile(new File(www, "js/lapstone.js"), new File(www_debug,
		"js/lapstone.js"));

	// update app configuration
	File configLapstone = new File(www, "js/lapstone.json");
	File configApp = new File(www_debug, "js/lapstone.json");
	LapstoneJson lapstone = objectMapper.readValue(configLapstone,
		LapstoneJson.class);
	LapstoneJson app = objectMapper
		.readValue(configApp, LapstoneJson.class);
	app.version.put("lapstone", lapstone.version.get("lapstone"));
	objectMapper.writeValue(configApp, app);

	// ********************************************************************
	// copy lapstone.jar
	FileUtils.copyFile(new File(lapstonePath, "lapstone.jar"), new File(
		appPath, "lapstone.jar"), true);

	return true;
    }

    private static Boolean Page(Map<String, String> argMap) throws Exception {
	if (argMap.get("path") == null) {
	    System.out.println("Missing parameter: -path");
	    PrintHelp();
	    return false;
	}
	if (argMap.get("lapstone") == null) {
	    System.out.println("Missing parameter: -lapstone");
	    PrintHelp();
	    return false;
	}
	if (argMap.get("name") == null) {
	    System.out.println("Missing parameter: -name");
	    PrintHelp();
	    return false;
	}
	if (argMap.get("modus") == null) {
	    System.out.println("Missing parameter: -modus");
	    PrintHelp();
	    return false;
	}

	File appPath = new File(argMap.get("path"));
	File lapstonePath = new File(argMap.get("lapstone"));
	final File www_debug = new File(appPath, "www_debug");
	// final File www = new File(lapstonePath, "www");

	File templateJs = new File(lapstonePath,
		"tools/template/page.template.js");
	File templateHtml = new File(lapstonePath,
		"tools/template/page.template.html");
	File templateJson = new File(lapstonePath,
		"tools/template/page.template.json");

	File newJs = new File(www_debug, "js/page/page." + argMap.get("name")
		+ ".js");
	File newHtml = new File(www_debug, "page/" + argMap.get("name")
		+ ".html");
	File newJson = new File(www_debug, "js/page/page." + argMap.get("name")
		+ ".json");

	String json = FileUtils.readFileToString(templateJson);
	String js = FileUtils.readFileToString(templateJs);
	String html = FileUtils.readFileToString(templateHtml);

	json = json.replace("##template", argMap.get("name"));
	js = js.replace("##template", argMap.get("name"));
	html = html.replace("##template", argMap.get("name"));

	// write content to new page files
	FileUtils.write(newJson, json, false);
	FileUtils.write(newJs, js, false);
	FileUtils.write(newHtml, html, false);

	// register page
	File pages = new File(www_debug, "js/page/pages.json");
	ObjectMapper objectMapper = new ObjectMapper();
	Map<String, Boolean> pagesJson = objectMapper.readValue(pages,
		Map.class);
	pagesJson.put(argMap.get("name"), true);
	objectMapper.writeValue(pages, pagesJson);

	return true;
    }

    // ************************************************************************
    //
    //
    // ************************************************************************
    private static Boolean Release(Map<String, String> argMap) throws Exception {
	System.out.println("Running method RELEASE()");

	// initialize directories
	File rootPath = new File(argMap.get("path"));
	File www = new File(rootPath, "www");
	File www_debug = new File(rootPath, "www_debug");

	// ********************************************************************
	// debug output

	System.out.println("root path: " + rootPath.getAbsolutePath());
	System.out.println("path to www: " + www.getAbsolutePath());
	System.out.println("path to www_debug" + www_debug.getAbsolutePath());

	// ********************************************************************
	// update app version

	ObjectMapper objectMapper = new ObjectMapper();
	File configuration = new File(www_debug, "js/lapstone.json");
	LapstoneJson lapstoneJson = objectMapper.readValue(configuration,
		LapstoneJson.class);
	String appVersion = (String) lapstoneJson.version.get("app");
	Integer buildVersion = Integer
		.parseInt(appVersion.split("\\.")[appVersion.split("\\.").length - 1]);
	buildVersion++;
	String newVersion = ((String) lapstoneJson.version.get("app"))
		.substring(0, ((String) lapstoneJson.version.get("app"))
			.lastIndexOf(".") + 1)
		+ buildVersion.toString();
	lapstoneJson.version.put("app", newVersion);
	objectMapper.writeValue(configuration, lapstoneJson);

	// ********************************************************************
	// copy www_debug to www

	FileUtils.deleteDirectory(www);
	FileUtils.copyDirectory(www_debug, www, true);

	FileUtils.deleteQuietly(new File(www, "tools"));

	// ********************************************************************
	// set cordova configuration

	configuration = new File(www, "js/lapstone.json");
	lapstoneJson = objectMapper
		.readValue(configuration, LapstoneJson.class);

	lapstoneJson.min = true;

	objectMapper.writeValue(configuration, lapstoneJson);

	// ********************************************************************
	// create single plugin file

	String allPluginsContent = "";
	// create map and copy just the used pages
	for (File file : new File(www, "js/plugin").listFiles()) {
	    System.out.println("Processing: " + file.getName());
	    String currentFileContent = FileUtils.readFileToString(file);

	    if (file.getName().startsWith(".")) {
		currentFileContent = "";
	    }

	    else if (file.getName().equals("plugins.js")) {
	    }

	    else if (file.getName().equals("plugins.json")) {
		currentFileContent = "var config_json = " + currentFileContent;
	    }

	    else if (file.getName().endsWith("js")) {
		String jsIdentifyer = file.getName().substring(
			file.getName().indexOf(".") + 1,
			file.getName().indexOf(".",
				file.getName().indexOf(".") + 1));
		System.out.println("Identifiyer: " + jsIdentifyer);
	    }

	    else if (file.getName().endsWith("json")) {
		String jsIdentifyer = file.getName().substring(
			file.getName().indexOf(".") + 1,
			file.getName().indexOf(".",
				file.getName().indexOf(".") + 1));
		System.out.println("Identifiyer: " + jsIdentifyer);
		currentFileContent = "var config_" + jsIdentifyer + "="
			+ currentFileContent;

	    }

	    // delete processed file
	    file.delete();

	    if (!currentFileContent.endsWith(";"))
		currentFileContent += ";";

	    allPluginsContent += currentFileContent;
	}

	FileUtils.write(new File(www, "js/plugin/all.plugin.js"),
		allPluginsContent);

	// ********************************************************************
	// create single page file

	String allPagesContent = "";
	// create map and copy just the used pages
	for (File file : new File(www, "js/page").listFiles()) {
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
		    currentFileContent = "var config_json = "
			    + currentFileContent;
		}

		else if (file.getName().endsWith("js")) {
		    String jsIdentifyer = file.getName().substring(
			    file.getName().indexOf(".") + 1,
			    file.getName().indexOf(".",
				    file.getName().indexOf(".") + 1));
		    System.out.println("Identifiyer: " + jsIdentifyer);
		}

		else if (file.getName().endsWith("json")) {
		    String jsIdentifyer = file.getName().substring(
			    file.getName().indexOf(".") + 1,
			    file.getName().indexOf(".",
				    file.getName().indexOf(".") + 1));
		    System.out.println("Identifiyer: " + jsIdentifyer);
		    currentFileContent = "var config_" + jsIdentifyer + "="
			    + currentFileContent;

		}

		// delete processed file
		file.delete();

		if (!currentFileContent.endsWith(";"))
		    currentFileContent += ";";

		allPagesContent += currentFileContent;
	    }
	}

	FileUtils.write(new File(www, "js/page/all.page.js"), allPagesContent);

	// ********************************************************************

	// ********************************************************************
	// minify plugins

	Options o = new Options();

	File allPlugins = new File(www, "js/plugin/all.plugin.js");
	File allPluginsMin = new File(www, "js/plugin/all.plugin.min.js");

	compressJavaScript(allPlugins.getAbsolutePath(),
		allPluginsMin.getAbsolutePath(), o);

	allPlugins.delete();

	// ********************************************************************
	// minify pages

	File allPages = new File(www, "js/page/all.page.js");
	File allPagesMin = new File(www, "js/page/all.page.min.js");

	compressJavaScript(allPages.getAbsolutePath(),
		allPagesMin.getAbsolutePath(), o);

	allPages.delete();

	return true;
    }

    private static void PrintHelp() {
	System.out.println("Help for lapstone.jar:");
	System.out.println("DEPLOY");
	System.out
		.println("java -jar lapstone.jar -function=deploy -path=/Users/martinkattner/stygs/app.extern.gtn.dakora/app.extern.gtn.dakora -lapstone=/Users/martinkattner/stygs/co.stygs.com.lapstone");
	System.out.println("RELEASE");
	System.out.println("RELEASE");
	System.out.println("PAGE:");
	System.out
		.println("java -jar lapstone.jar -function=page -path=/Users/martinkattner/stygs/app.extern.gtn.dakora/app.extern.gtn.dakora -lapstone=/Users/martinkattner/stygs/co.stygs.com.lapstone -name=configuration -modus=new");
    }

    private static class YuiCompressorErrorReporter implements ErrorReporter {
	public void warning(String message, String sourceName, int line,
		String lineSource, int lineOffset) {
	    if (line < 0) {
		logger.log(Level.WARNING, message);
	    } else {
		logger.log(Level.WARNING, line + ':' + lineOffset + ':'
			+ message);
	    }
	}

	public void error(String message, String sourceName, int line,
		String lineSource, int lineOffset) {
	    if (line < 0) {
		logger.log(Level.SEVERE, message);
	    } else {
		logger.log(Level.SEVERE, line + ':' + lineOffset + ':'
			+ message);
	    }
	}

	public EvaluatorException runtimeError(String message,
		String sourceName, int line, String lineSource, int lineOffset) {
	    error(message, sourceName, line, lineSource, lineOffset);
	    return new EvaluatorException(message);
	}
    }

    public static class Options {
	public String charset = "UTF-8";
	public int lineBreakPos = -1;
	public boolean munge = true;
	public boolean verbose = true;
	public boolean preserveAllSemiColons = false;
	public boolean disableOptimizations = false;
    }

    public static void compressJavaScript(String inputFilename,
	    String outputFilename, Options o) throws IOException {

	Reader in = null;
	Writer out = null;

	try {
	    in = new InputStreamReader(new FileInputStream(inputFilename),
		    o.charset);

	    JavaScriptCompressor compressor = new JavaScriptCompressor(in,
		    new YuiCompressorErrorReporter());
	    in.close();
	    in = null;

	    out = new OutputStreamWriter(new FileOutputStream(outputFilename),
		    o.charset);
	    compressor.compress(out, o.lineBreakPos, o.munge, o.verbose,
		    o.preserveAllSemiColons, o.disableOptimizations);
	} finally {
	    IOUtils.closeQuietly(in);
	    IOUtils.closeQuietly(out);
	}
    }

}
