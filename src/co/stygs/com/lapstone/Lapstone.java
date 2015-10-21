package co.stygs.com.lapstone;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.ConsoleHandler;
import java.util.logging.Level;

public class Lapstone {

	public Lapstone() {
		// TODO Auto-generated constructor stub
	}

	// public static String workingDirectory = System.getProperty("user.dir");

	public static void main(String[] args) throws Exception {
		Compressor.logger.addHandler(new ConsoleHandler());
		Compressor.logger.setLevel(Level.ALL);

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
				if (!Deploy.DeployLapstone(argMap))
					PrintHelp();
				break;
			case "release":
				if (!Release.ReleaseLapstone(argMap))
					PrintHelp();
				break;
			case "page":
				if (!Page.PageLapstone(argMap))
					PrintHelp();
				break;
			default:
				System.out.println("Unknown function: "
						+ argMap.get("function"));
				PrintHelp();
			}
		}
	}

	public static void PrintHelp() {
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

}
