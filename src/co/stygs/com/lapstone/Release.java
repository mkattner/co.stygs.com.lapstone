package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.apache.commons.io.FileUtils;

import co.stygs.com.lapstone.Compressor.JavascriptCompressorOptions;
import co.stygs.com.lapstone.objects.LapstoneJson;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Release {
	// ************************************************************************
	//
	//
	// ************************************************************************
	public static Boolean ReleaseLapstone(Map<String, String> argMap) {
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
			System.out.println("path to www_debug"
					+ www_debug.getAbsolutePath());

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
			lapstoneJson = objectMapper.readValue(configuration,
					LapstoneJson.class);

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

			FileUtils.write(new File(www, "js/page/all.page.js"),
					allPagesContent);

			// ********************************************************************

			// ********************************************************************
			// minify plugins

			JavascriptCompressorOptions o = new JavascriptCompressorOptions();

			File allPlugins = new File(www, "js/plugin/all.plugin.js");
			File allPluginsMin = new File(www, "js/plugin/all.plugin.min.js");

			Compressor.compressJavaScript(allPlugins.getAbsolutePath(),
					allPluginsMin.getAbsolutePath(), o);

			allPlugins.delete();

			// ********************************************************************
			// minify pages

			File allPages = new File(www, "js/page/all.page.js");
			File allPagesMin = new File(www, "js/page/all.page.min.js");

			Compressor.compressJavaScript(allPages.getAbsolutePath(),
					allPagesMin.getAbsolutePath(), o);

			allPages.delete();

			return true;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

}
