package co.stygs.com.lapstone;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import co.stygs.com.lapstone.objects.LapstoneJson;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Deploy {
    // ************************************************************************
    //
    //
    // ************************************************************************
    public static Boolean DeployLapstone(Map<String, String> argMap) {
	if (argMap.get("path") == null) {
	    System.out.println("Missing parameter: -path");
	    Lapstone.PrintHelp();
	    return false;
	}
	if (argMap.get("lapstone") == null) {
	    System.out.println("Missing parameter: -lapstone");
	    Lapstone.PrintHelp();
	    return false;
	}
	try {
	    File appPath = new File(argMap.get("path"));
	    File lapstonePath = new File(argMap.get("lapstone"));
	    final File www_debug = new File(appPath, "www_debug");
	    final File www = new File(lapstonePath, "www");

	    // ********************************************************************
	    // debug output

	    System.out.println("app path\t\t" + appPath.getAbsolutePath());
	    System.out.println("app path www_debug\t"
		    + www_debug.getAbsolutePath());
	    System.out.println("lapstone path\t\t"
		    + lapstonePath.getAbsolutePath());
	    System.out.println("lapstone path www\t" + www.getAbsolutePath());

	    // ********************************************************************
	    // update cordova version
	    ObjectMapper objectMapper = new ObjectMapper();
	    File configuration = new File(www, "js/lapstone.json");
	    LapstoneJson lapstoneJson;

	    lapstoneJson = objectMapper.readValue(configuration,
		    LapstoneJson.class);

	    String appVersion = (String) lapstoneJson.version.get("lapstone");
	    Integer buildVersion = Integer
		    .parseInt(appVersion.split("\\.")[appVersion.split("\\.").length - 1]);
	    buildVersion++;
	    String newVersion = ((String) lapstoneJson.version.get("lapstone"))
		    .substring(0, ((String) lapstoneJson.version
			    .get("lapstone")).lastIndexOf(".") + 1)
		    + buildVersion.toString();
	    lapstoneJson.version.put("lapstone", newVersion);
	    objectMapper.writeValue(configuration, lapstoneJson);

	    // ********************************************************************
	    // Copy everything if not exist
	    FileUtils.copyDirectory(www, www_debug, new FileFilter() {
		@Override
		public boolean accept(File pathname) {

		    File destination = new File(pathname.getAbsolutePath()
			    .replace(www.getAbsolutePath(),
				    www_debug.getAbsolutePath()));

		    if (destination.isDirectory()) {
			if (pathname.getName().equals("test")) {
			    return false;
			}

			else if (pathname.getName().equals("documentation")) {
			    return false;
			}

			else {
			    return true;
			}
		    }

		    else if (!destination.exists()) {
			return true;
		    }

		    return false;
		}
	    }, true);

	    // ********************************************************************
	    // copy plugins (*.js files and *.json files if they do not exist)
	    FileUtils.copyDirectory(new File(www, "js/plugin"), new File(
		    www_debug, "js/plugin"), new FileFilter() {

		@Override
		public boolean accept(File pathname) {
		    File destination = new File(www_debug, "js/plugin/"
			    + pathname.getName());

		    if (pathname.getName().endsWith(".js")) {
			return true;
		    }

		    else if (pathname.getName().endsWith(".json")
			    && !destination.exists()) {
			return true;
		    }
		    return false;
		}
	    }, true);

	    // ********************************************************************
	    // copy pages (if they do not exist)
	    FileUtils.copyDirectory(new File(www, "js/page"), new File(
		    www_debug, "js/page"), new FileFilter() {

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

	    FileUtils.copyFile(new File(www, "js/lapstone.js"), new File(
		    www_debug, "js/lapstone.js"));

	    // update app configuration
	    File configLapstone = new File(www, "js/lapstone.json");
	    File configApp = new File(www_debug, "js/lapstone.json");
	    LapstoneJson lapstone = objectMapper.readValue(configLapstone,
		    LapstoneJson.class);
	    LapstoneJson app = objectMapper.readValue(configApp,
		    LapstoneJson.class);
	    app.version.put("lapstone", lapstone.version.get("lapstone"));
	    objectMapper.writeValue(configApp, app);

	    // ********************************************************************
	    // copy lapstone.jar
	    FileUtils.copyFile(new File(lapstonePath, "lapstone.jar"),
		    new File(appPath, "lapstone.jar"), true);

	    return true;
	} catch (IOException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	    return false;
	}
    }
}
