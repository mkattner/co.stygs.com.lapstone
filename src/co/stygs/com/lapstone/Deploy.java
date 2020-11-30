package co.stygs.com.lapstone;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.stygs.com.lapstone.objects.json.LapstoneJSON;

public class Deploy {
	// ************************************************************************
	//
	//
	// ************************************************************************
	public static Boolean DeployLapstone(Map<String, String> argMap) {

		try {
			File appPath = new File(argMap.get("path"));
			File lapstonePath = new File(argMap.get("lapstone"));
			final File www_debug = new File(appPath, "www_debug");
			final File www = new File(lapstonePath, "www");

			// ********************************************************************
			// debug output

			System.out.println("app path\t\t" + appPath.getAbsolutePath());
			System.out.println("app path www_debug\t" + www_debug.getAbsolutePath());
			System.out.println("lapstone path\t\t" + lapstonePath.getAbsolutePath());
			System.out.println("lapstone path www\t" + www.getAbsolutePath());

			// ********************************************************************
			// update cordova version
			
			
			ObjectMapper objectMapper = new ObjectMapper();
			/**
			if (argMap.get("updateVersion") != null) {
				File configuration = new File(www, "js/lapstone.json");
				LapstoneJSON lapstoneJson;

				lapstoneJson = objectMapper.readValue(configuration, LapstoneJSON.class);

				String appVersion = (String) lapstoneJson.getVersion().get("lapstone");
				Integer buildVersion = Integer.parseInt(appVersion.split("\\.")[appVersion.split("\\.").length - 1]);
				buildVersion++;
				String newVersion = ((String) lapstoneJson.getVersion().get("lapstone")).substring(0, ((String) lapstoneJson.getVersion().get("lapstone")).lastIndexOf(".") + 1)
						+ buildVersion.toString();
				lapstoneJson.getVersion().put("lapstone", newVersion);
				objectMapper.writeValue(configuration, lapstoneJson);
			}
			**/
			// ********************************************************************
			// Copy everything if not exist
			FileUtils.copyDirectory(www, www_debug, new FileFilter() {
				@Override
				public boolean accept(File pathname) {

					File destination = new File(pathname.getAbsolutePath().replace(www.getAbsolutePath(), www_debug.getAbsolutePath()));

					// if (destination.getName().startsWith("page.lapstone")) {
					// return false;
					// }

					if (destination.isDirectory()) {
						return true;
					}

					else if (!destination.exists()) {
						return true;
					}

					return false;
				}
			}, true);

			// delete the documentation folder (because its not up to date)
			FileUtils.deleteQuietly(new File(www_debug, "js/documentation"));

			// delete the test folder (because it has no use)
			FileUtils.deleteQuietly(new File(www_debug, "test"));

			// ********************************************************************
			// copy plugins (*.js files and *.json files if they do not exist)
			FileUtils.copyDirectory(new File(www, "js/plugin"), new File(www_debug, "js/plugin"), new FileFilter() {

				@Override
				public boolean accept(File pathname) {
					File destination = new File(www_debug, "js/plugin/" + pathname.getName());

					if (pathname.getName().endsWith(".js")) {
						return true;
					}

					else if (pathname.getName().endsWith(".json") && !destination.exists()) {
						return true;
					}
					return false;
				}
			}, true);

			// ********************************************************************
			// copy pages (if they do not exist)
			FileUtils.copyDirectory(new File(www, "js/page"), new File(www_debug, "js/page"), new FileFilter() {

				@Override
				public boolean accept(File pathname) {
					File destination = new File(www_debug, "js/page/" + pathname.getName());

					if (destination.getName().startsWith("page.lapstone")) {
						return false;
					}

					else if (destination.getName().equals("pages.js")) {
						return true;
					}

					else if (!destination.exists()) {
						return true;
					}
					return false;
				}
			}, true);

			// ********************************************************************
			// overwrite plugin includes

			FileUtils.copyDirectory(new File(www, "js/plugin/include"), new File(www_debug, "js/plugin/include"), true);

			FileUtils.copyFile(new File(www, "js/lapstone.js"), new File(www_debug, "js/lapstone.js"));

			// update app configuration
			File configLapstone = new File(www, "js/lapstone.json");
			File configApp = new File(www_debug, "js/lapstone.json");
			LapstoneJSON lapstone = objectMapper.readValue(configLapstone, LapstoneJSON.class);
			LapstoneJSON app = objectMapper.readValue(configApp, LapstoneJSON.class);
			app.getVersion().put("lapstone", lapstone.getVersion().get("lapstone"));
			objectMapper.writeValue(configApp, app);

			// ********************************************************************
			// copy lapstone.jar
			FileUtils.copyFile(new File(lapstonePath, "target/lapstone.jar"), new File(appPath, "lapstone.jar"), true);
			FileUtils.copyFile(new File(lapstonePath, "lapstone.txt"), new File(appPath, "lapstone.txt"), true);

			return true;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
}
