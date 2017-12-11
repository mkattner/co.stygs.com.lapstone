package co.stygs.com.lapstone;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.IOFileFilter;
import co.stygs.com.lapstone.Compressor.JavascriptCompressorOptions;
import co.stygs.com.lapstone.Compressor.StylesheetCompressorOptions;
import co.stygs.com.lapstone.objects.json.IPlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;
import co.stygs.com.lapstone.objects.json.Page_JSON;
import co.stygs.com.lapstone.objects.json.Plugin_JSON;
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

public class Release {

	public static List<File> cssRegistry = new ArrayList<>();

	// ************************************************************************
	//
	//
	// ************************************************************************
	public static Boolean ReleaseLapstone(Map<String, String> argMap) throws Exception {

		System.out.println();
		System.out.println("Running method RELEASE() ------------------------------------------------------------------");
		System.out.println();
		try {
			// initialize directories
			File rootPath = new File(argMap.get("path"));
			File www = new File(rootPath, "www");
			File www_debug = new File(rootPath, "www_debug");

			// ********************************************************************
			// debug output

			System.out.println("        root path: " + rootPath.getAbsolutePath());
			System.out.println("      path to www: " + www.getAbsolutePath());
			System.out.println("path to www_debug: " + www_debug.getAbsolutePath());

			// ********************************************************************
			// update app version
			ObjectMapper objectMapper = new ObjectMapper();
			File configuration = new File(www_debug, "js/lapstone.json");
			LapstoneJSON lapstoneJson = objectMapper.readValue(configuration, LapstoneJSON.class);
			String appVersion = (String) lapstoneJson.getVersion().get("app");
			Integer buildVersion = Integer.parseInt(appVersion.split("\\.")[appVersion.split("\\.").length - 1]);
			buildVersion++;
			String newVersion = ((String) lapstoneJson.getVersion().get("app")).substring(0, ((String) lapstoneJson.getVersion().get("app")).lastIndexOf(".") + 1)
					+ buildVersion.toString();
			lapstoneJson.getVersion().put("app", newVersion);
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
			lapstoneJson = objectMapper.readValue(configuration, LapstoneJSON.class);

			lapstoneJson.setMin(true);

			File startupStyle = new File(www, "js/lapstone.css");
			File startupContent = new File(www, "js/lapstone.html");

			lapstoneJson.setStartupContent(FileUtils.readFileToString(startupContent));
			lapstoneJson.setStartupStyle(FileUtils.readFileToString(startupStyle));

			startupStyle.delete();
			startupContent.delete();

			objectMapper.writeValue(configuration, lapstoneJson);

			// ********************************************************************
			// combine files
			Release.createCombinedFilesFile(www, newVersion);

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

				FileUtils.write(cssFromLessFile, Less.compile(lessFile, false));

			}

			// delete the less files
			System.out.println();
			System.out.println("Delete the LESS files because they are unused in the RELEASE version. -----------------");
			System.out.println();

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
			System.out.println();
			System.out.println("Minify all CSS files. -----------------------------------------------------------------");
			System.out.println();

			StylesheetCompressorOptions c = new StylesheetCompressorOptions();
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

								rule.addDeclaration(index,
										new CSSDeclaration("-webkit-justify-content", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
								index++;
								rule.addDeclaration(index,
										new CSSDeclaration("-moz-justify-content", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
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

								rule.addDeclaration(index,
										new CSSDeclaration("-webkit-flex-direction", new CSSExpression().addMember(new CSSExpressionMemberTermSimple(expression))));
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
			Compressor.compressJavaScript(lapstoneJsFile.getAbsolutePath(), lapstoneJsFile.getAbsolutePath(), new JavascriptCompressorOptions());
			// slow in java, but very useful for debugging release version
			FileUtils.writeStringToFile(lapstoneJsFile, "//# sourceURL=lapstone.js" + "\n" + FileUtils.readFileToString(lapstoneJsFile));

			return true;

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

	private static void createCombinedFilesFile(File www, String newVersion) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		File configuration;
		File currentFile;

		// PLUGIN Skin
		// configuration = new File(www, "js/plugin/plugin.Skin.json");
		// Plugin_SkinJson skinJson = objectMapper.readValue(configuration,
		// Plugin_SkinJson.class);

		configuration = new File(www, "js/lapstone.json");
		LapstoneJSON lapstoneJson = objectMapper.readValue(configuration, LapstoneJSON.class);

		configuration = new File(www, "js/plugin/plugins.json");
		Map<String, Boolean> plugins = objectMapper.readValue(configuration, HashMap.class);
		for (String pluginName : plugins.keySet()) {
			String curretnClass = "co.stygs.com.lapstone.objects.json.plugin.Plugin_" + pluginName + "_JSON";
			try {
				System.out.println();
				System.out.println("-----------------------------------------------------------------------------------");
				System.out.println("Running release() method on: " + curretnClass);
				IPlugin_JSON plugin_JSON = (IPlugin_JSON) Class.forName(curretnClass).newInstance();
				plugin_JSON.release(www, lapstoneJson);

			} catch (ClassNotFoundException e) {
				System.out.println("ClassNotFoundException: " + curretnClass);
			}
		}

		// PLUGIN HtmlTemplates

		// PLUGIN LoadExternalScripts

		// PLUGIN RestClient

		// PLUGIN WebServiceError

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
		System.out.println("Create all.plugin.js file. Copy just used plugins. ----------------------------------------");
		System.out.println();

		File[] pluginFiles = new File(www, "js/plugin").listFiles();
		Arrays.sort(pluginFiles); // we must sort the array, as the listFiles
		// method doesn't guarantee that the return
		// value is sorted. plugin_*.js must be
		// inserted before the plugins includes.
		for (File file : pluginFiles) {
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

				currentFileContent += "\n";

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
		System.out.println("Create all.pages.js file. Copy just used pages. -------------------------------------------");
		System.out.println();

		File[] pageFiles = new File(www, "js/page").listFiles();
		Arrays.sort(pageFiles); // we must sort the array, as the listFiles
		// method doesn't guarantee that the return
		// value is sorted. page_*.js must be
		// inserted before the pages includes.
		for (File file : pageFiles) {
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

				currentFileContent += "\n";

				allPagesContent += currentFileContent;
			}
		}

		String includeContent = "";
		for (File include_onceFile : include_onceList) {
			// Minify the js include file

			try {
				Compressor.compressJavaScript(include_onceFile.getAbsolutePath(), include_onceFile.getAbsolutePath(), new JavascriptCompressorOptions());
			} catch (Exception e) {
				throw new CompressorException(e);
			}

			System.out.println("Adding include_once file: " + include_onceFile.getAbsolutePath());
			includeContent += ";" + FileUtils.readFileToString(include_onceFile);
			include_onceFile.delete();
		}
		includeContent = "includeEverything=function(){" + includeContent + "};";

		allPagesContent += includeContent;
		FileUtils.write(new File(www, "js/page/all.page.js"), allPagesContent);
		FileUtils.deleteDirectory(new File(www, "js/page/include"));
	}

	private static void compressSinglePluginFile(File www, String version) throws Exception {
		JavascriptCompressorOptions o = new JavascriptCompressorOptions(false);

		File allPlugins = new File(www, "js/plugin/all.plugin.js");
		File allPluginsMin = new File(www, "js/plugin/all.plugin.min." + version + ".js");

		// FileUtils.copyFile(allPlugins, allPluginsMin);
		try {

			Compressor.compressJavaScript(allPlugins.getAbsolutePath(), allPluginsMin.getAbsolutePath(), o);
			// slow in java, but very useful for debugging release version
			FileUtils.writeStringToFile(allPluginsMin, "//# sourceURL=all.plugin." + version + ".js" + "\n" + FileUtils.readFileToString(allPluginsMin));
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
			// slow in java, but very useful for debugging release version
			FileUtils.writeStringToFile(allPagesMin, "//# sourceURL=all.page." + version + ".js" + "\n" + FileUtils.readFileToString(allPagesMin));
		}

		catch (Exception e) {
			throw new CompressorException(e);
		}

		allPages.delete();

	}
}
