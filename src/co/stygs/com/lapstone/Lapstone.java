package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.ConsoleHandler;
import java.util.logging.Level;

import org.apache.commons.io.FileUtils;

public class Lapstone {

	public Lapstone() {
		// TODO Auto-generated constructor stub
	}

	// public static String workingDirectory = System.getProperty("user.dir");

	public static void main(String[] args) throws Exception {
		Compressor.logger.addHandler(new ConsoleHandler());
		Compressor.logger.setLevel(Level.ALL);
		org.apache.log4j.BasicConfigurator.configure();

		System.out.println("Running LAPSTONE with parameters:");
		Map<String, String> argMap = new HashMap<String, String>();
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

			switch (argMap.get("function")) {
			case "deploy":

				if (argMap.get("path") == null) {
					System.out.println("Missing parameter: -path");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("lapstone") == null) {
					System.out.println("Missing parameter: -lapstone");
					Lapstone.PrintHelp();
				}

				else if (!Deploy.DeployLapstone(argMap)) {
					PrintHelp();
				}

				break;

			case "release":
				if (argMap.get("path") == null) {
					System.out.println("Missing parameter: -path");
					Lapstone.PrintHelp();
				}

				else if (!Release.ReleaseLapstone(argMap)) {
					PrintHelp();
				}

				break;

			case "page":
				if (argMap.get("path") == null) {
					System.out.println("Missing parameter: -path");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("modus") == null) {
					System.out.println("Missing parameter: -modus");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("lapstone") == null) {
					System.out.println("Missing parameter: -lapstone");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("name") == null) {
					System.out.println("Missing parameter: -name");
					Lapstone.PrintHelp();
				}

				else if (!Page.PageLapstone(argMap)) {
					PrintHelp();
				}

				break;
			case "template":
				if (argMap.get("path") == null) {
					System.out.println("Missing parameter: -path");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("modus") == null) {
					System.out.println("Missing parameter: -modus");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("lapstone") == null) {
					System.out.println("Missing parameter: -lapstone");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("name") == null) {
					System.out.println("Missing parameter: -name");
					Lapstone.PrintHelp();
				}

				else if (!Template.TemplateLapstone(argMap)) {
					PrintHelp();
				}
				break;
			case "plugin":

				if (argMap.get("path") == null) {
					System.out.println("Missing parameter: -path");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("modus") == null) {
					System.out.println("Missing parameter: -modus");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("lapstone") == null) {
					System.out.println("Missing parameter: -lapstone");
					Lapstone.PrintHelp();
				}

				else if (argMap.get("name") == null) {
					System.out.println("Missing parameter: -name");
					Lapstone.PrintHelp();
				}

				else if (!Plugin.LapstonePlugin(argMap)) {
					PrintHelp();
				}

				break;

			default:
				System.out.println("Unknown function: " + argMap.get("function"));
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
			List<String> lines = FileUtils.readLines(new File("lapstone.txt"));

			for (String line : lines) {
				System.out.println(line);
			}

		}

		catch (IOException e) {
			System.out.println("FATAL - ERROR - ERROR - ERROR - ERROR - ERROR");
			e.printStackTrace();
		}
	}
}
