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
import org.apache.commons.io.filefilter.FileFilterUtils;
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

public class Build implements ILogger {

    // ************************************************************************
    //
    //
    // ************************************************************************
    public static Boolean BuildLapstone(Map<String, String> argMap) throws Exception {

	LOGGER.debug("Running method RELEASE() ------------------------------------------------------------------");

	try {
	    // initialize directories
	    File root = new File(argMap.get("path"));
	    File www_build = new File(root, "www_build");
	    File www_debug = new File(root, "www_debug");
	    if (!www_debug.exists())
		www_debug = new File(root, "www");

	    // ********************************************************************
	    // debug output

	    LOGGER.debug("     root: " + root.getAbsolutePath());
	    LOGGER.debug("www_build: " + www_build.getAbsolutePath());
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

	    System.out.println("Delete directory: " + www_build.getAbsolutePath());
	    FileUtils.deleteDirectory(www_build);
	    FileUtils.copyDirectory(www_debug, www_build, true);

	    FileUtils.deleteQuietly(new File(www_build, "tools"));
	    // delete the documentation folder (because its not up to date)
	    FileUtils.deleteQuietly(new File(www_build, "js/documentation"));

	    // delete the test folder (because it has no use)
	    FileUtils.deleteQuietly(new File(www_build, "test"));

	    // ********************************************************************
	    // set cordova configuration



	    objectMapper.writeValue(configuration, lapstoneJson);

	    for (File f : FileUtils.listFiles(www_build, new IOFileFilter() {

		@Override
		public boolean accept(File file) {
		    if (file.getName().endsWith(".js"))
			return true;
		    return false;
		}

		@Override
		public boolean accept(File dir, String name) {
		    // TODO Auto-generated method stub
		    return false;
		}
	    }, DirectoryFileFilter.DIRECTORY)) {
		System.out.println(f);
		LapstoneCompiler.Closure(f, f, www_debug);
	    }
	    return true;

	} catch (IOException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	    return false;
	}
    }
}
