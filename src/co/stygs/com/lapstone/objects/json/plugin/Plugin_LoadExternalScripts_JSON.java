package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
import java.util.List;
import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.helger.commons.charset.CCharset;
import com.helger.css.ECSSVersion;
import com.helger.css.decl.CascadingStyleSheet;
import com.helger.css.reader.CSSReader;
import com.helger.css.writer.CSSWriter;
import com.inet.lib.less.Less;

import co.stygs.com.lapstone.Lapstone;
import co.stygs.com.lapstone.LapstoneCompiler;
import co.stygs.com.lapstone.Release;
import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;

public class Plugin_LoadExternalScripts_JSON extends APlugin_JSON {

	private List<String> dependency;

	private List<String> javascriptOrdered;

	private List<String> styleOrdered;

	public Plugin_LoadExternalScripts_JSON() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getAdditionalJavascript(File www) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public List<String> getDependency() {
		return dependency;
	}

	public List<String> getJavascriptOrdered() {
		return javascriptOrdered;
	}

	public List<String> getStyleOrdered() {
		return styleOrdered;
	}

	@Override
	public Boolean release(File www_debug, File www, LapstoneJSON lapstoneJson) throws Exception {
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
			System.out.println("Compress: " + currentFile.getAbsolutePath());

			try {
				// Compressor.compressJavaScript(currentFile.getAbsolutePath(),
				// currentFile.getAbsolutePath(), new JavascriptCompressorOptions());
				if (currentFile.getAbsolutePath().contains("ext")) {
					LOGGER.info("Skip external file: " + currentFile.getAbsolutePath());
				} else {
					LOGGER.info("Compile external file: " + currentFile.getAbsolutePath());
					LapstoneCompiler.Compile(currentFile, currentFile, www_debug);
				}
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("ERROR: NOT ABLE TO COMPRESS: " + currentFile.getAbsolutePath());
			}

			System.out.println("Add: " + currentFile.getAbsolutePath());

			combinedJavascript += FileUtils.readFileToString(currentFile, Lapstone.CHARSET) + "\n\n";

			Files.delete(currentFile.toPath());
		}
		File allJavascriptFile = new File(www, "files/all.javascript." + lapstoneJson.getVersion().get("app") + ".js");
		System.out.println("Wirte combined script file: " + allJavascriptFile.getAbsolutePath());
		FileUtils.write(allJavascriptFile, combinedJavascript, Lapstone.CHARSET);

		// STYLES
		System.out.println();
		String combinedStyle = "";
		for (String url : style) {
			currentFile = new File(www, "page/" + url);
			System.out.println("Add: " + currentFile.getAbsolutePath());
			String currentStyle;

			if (url.endsWith(".less")) {
				System.out.println("Compile and compress LESS file: " + currentFile.getAbsolutePath());
				currentStyle = Less.compile(currentFile, true) + "\n\n";
			}

			else if (url.endsWith(".css")) {
				System.out.println("Compress CSS file:              " + currentFile.getAbsolutePath());

				CascadingStyleSheet aCSS = CSSReader.readFromFile(currentFile, CCharset.CHARSET_UTF_8_OBJ, ECSSVersion.CSS30);
				if (aCSS == null) {
					throw new Exception();
				} else {

					new CSSWriter(ECSSVersion.CSS30, true).writeCSS(aCSS, new FileWriter(currentFile));
				}

				// Compressor.compressStylesheet(currentFile.getAbsolutePath(),
				// currentFile.getAbsolutePath(), new
				// StylesheetCompressorOptions());

				currentStyle = FileUtils.readFileToString(currentFile, Lapstone.CHARSET) + "\n\n";
			} else {
				currentStyle = "";
			}

			// resolve dependencies
			// TODO
			System.out.println("Resolve url('') dependencies    ");
			// url(
			currentStyle = currentStyle.replaceAll("(url\\()(?!\\\"|\\')", "url(" + url.substring(0, url.lastIndexOf("/") + 1));
			// url('
			currentStyle = currentStyle.replaceAll("url\\(\\'", "url('" + url.substring(0, url.lastIndexOf("/") + 1));
			// url("
			currentStyle = currentStyle.replaceAll("url\\(\\\"", "url(\"" + url.substring(0, url.lastIndexOf("/") + 1));

			combinedStyle += currentStyle;
			Files.delete(currentFile.toPath());
		}
		File allStyles = new File(www, "files/all.style.css");
		System.out.println("Wirte combined style file: " + allStyles.getAbsolutePath());
		FileUtils.write(allStyles, combinedStyle, Lapstone.CHARSET);
		Release.cssRegistry.add(allStyles);

		return null;
	}

	public void setDependency(List<String> dependency) {
		this.dependency = dependency;
	}

	public void setJavascriptOrdered(List<String> javascriptOrdered) {
		this.javascriptOrdered = javascriptOrdered;
	}

	public void setStyleOrdered(List<String> styleOrdered) {
		this.styleOrdered = styleOrdered;
	}

}
