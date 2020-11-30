package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.IOFileFilter;
import com.fasterxml.jackson.databind.ObjectMapper;

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
//	    // update app version
	    ObjectMapper objectMapper = new ObjectMapper();
//	    File configuration = new File(www_debug, "js/lapstone.json");
//	    LapstoneJSON lapstoneJson = objectMapper.readValue(configuration, LapstoneJSON.class);
//	    String appVersion = (String) lapstoneJson.getVersion().get("app");
//	    Integer buildVersion = Integer.parseInt(appVersion.split("\\.")[appVersion.split("\\.").length - 1]);
//	    buildVersion++;
//	    String newVersion = ((String) lapstoneJson.getVersion().get("app")).substring(0, ((String) lapstoneJson.getVersion().get("app")).lastIndexOf(".") + 1) + buildVersion.toString();
//	    lapstoneJson.getVersion().put("app", newVersion);
//	    objectMapper.writeValue(configuration, lapstoneJson);

//	    System.out.println();
//	    System.out.println("Updating app version from " + appVersion + " to " + newVersion);

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



//	    objectMapper.writeValue(configuration, lapstoneJson);

	    for (File f : FileUtils.listFiles(new File(www_build,"js"), new IOFileFilter() {

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
