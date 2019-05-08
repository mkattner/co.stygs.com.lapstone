package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.ConsoleAppender;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;

public class Lapstone  implements ILogger{

    // public static String workingDirectory = System.getProperty("user.dir");
    public static Map<String, String> argMap;

    public static final Charset CHARSET = Charset.forName("UTF-8");

    public static void main(String[] args) throws Exception {

	org.apache.log4j.BasicConfigurator.configure();

	System.out.println("Running LAPSTONE with parameters:");
	argMap = new HashMap<String, String>();
	for (String arg : args) {
	    System.out.println(arg);
	}

	// prepare parameters
	for (String arg : args) {
	    argMap.put(arg.split("=")[0].substring(1).trim(), arg.split("=")[1].trim());
	}

	if (argMap.get("function") == null) {
	    System.out.println("Missing parameter: function");
	    PrintHelp();
	}

	else {

	    String logParam;
	    if ((logParam = argMap.get("log")) != null) {
		switch (logParam) {
		case "T":
		    Logger.getRootLogger().setLevel(Level.TRACE);
		    break;

		case "D":
		    Logger.getRootLogger().setLevel(Level.DEBUG);
		    break;
		case "I":
		    Logger.getRootLogger().setLevel(Level.INFO);
		    break;

		case "W":
		    Logger.getRootLogger().setLevel(Level.WARN);
		    break;

		case "E":
		    Logger.getRootLogger().setLevel(Level.ERROR);
		    break;

		case "F":
		    Logger.getRootLogger().setLevel(Level.FATAL);
		    break;
		default:
		    break;
		}

	    } else {
		Logger.getRootLogger().setLevel(Level.INFO);
	    }
	    // Define log pattern layout
	    PatternLayout layout = new PatternLayout("%-5p %m%n");
	    Logger.getRootLogger().removeAllAppenders();
	    Logger.getRootLogger().addAppender(new ConsoleAppender(layout));

	    switch (argMap.get("function")) {
	    case "deploy":

		if (argMap.get("path") == null) {
		    LOGGER.error("Missing parameter: -path");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("lapstone") == null) {
		    LOGGER.error("Missing parameter: -lapstone");
		    Lapstone.PrintHelp();
		}

		else if (!Deploy.DeployLapstone(argMap)) {
		    PrintHelp();
		}

		else {
		    LOGGER.info("Deploy done!");
		}

		break;

	    case "release":
		if (argMap.get("path") == null) {
		    LOGGER.error("Missing parameter: -path");
		    Lapstone.PrintHelp();
		}

		else if (!Release.ReleaseLapstone(argMap)) {
		    PrintHelp();
		}

		else {
		    LOGGER.info("Release done!");
		}

		break;

	    case "page":
		if (argMap.get("path") == null) {
		    LOGGER.error("Missing parameter: -path");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("modus") == null) {
		    LOGGER.error("Missing parameter: -modus");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("lapstone") == null) {
		    LOGGER.error("Missing parameter: -lapstone");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("name") == null) {
		    LOGGER.error("Missing parameter: -name");
		    Lapstone.PrintHelp();
		}

		else if (!Page.PageLapstone(argMap)) {
		    PrintHelp();
		}

		else {
		    LOGGER.info("Page done!");
		}

		break;
	    case "template":
		if (argMap.get("path") == null) {
		    LOGGER.error("Missing parameter: -path");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("modus") == null) {
		    LOGGER.error("Missing parameter: -modus");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("lapstone") == null) {
		    LOGGER.error("Missing parameter: -lapstone");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("name") == null) {
		    LOGGER.error("Missing parameter: -name");
		    Lapstone.PrintHelp();
		}

		else if (!Template.TemplateLapstone(argMap)) {
		    PrintHelp();
		}

		else {
		    LOGGER.info("Template done!");
		}
		break;
	    case "plugin":

		if (argMap.get("path") == null) {
		    LOGGER.error("Missing parameter: -path");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("modus") == null) {
		    LOGGER.error("Missing parameter: -modus");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("lapstone") == null) {
		    LOGGER.error("Missing parameter: -lapstone");
		    Lapstone.PrintHelp();
		}

		else if (argMap.get("name") == null) {
		    LOGGER.error("Missing parameter: -name");
		    Lapstone.PrintHelp();
		}

		else if (!Plugin.LapstonePlugin(argMap)) {
		    PrintHelp();
		}

		else {
		    LOGGER.info("Plugin done!");
		}

		break;

	    default:
		LOGGER.error("Unknown function: " + argMap.get("function"));
		PrintHelp();
	    }
	}

    }

    public static void PrintHelp() {
	System.out.println();
	System.out.println("HELP - HELP - HELP - HELP - HELP - HELP - HELP");
	System.out.println("Printing: ./lapstone.txt");
	System.out.println();

	try {
	    List<String> lines = FileUtils.readLines(new File("lapstone.txt"), Lapstone.CHARSET);

	    for (String line : lines) {
		System.out.println(line);
	    }

	}

	catch (IOException e) {
	    System.out.println("FATAL - ERROR - ERROR - ERROR - ERROR - ERROR");
	    e.printStackTrace();
	}
    }

    public Lapstone() {
	// TODO Auto-generated constructor stub
    }
}
