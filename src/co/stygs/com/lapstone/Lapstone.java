package co.stygs.com.lapstone;

import java.util.HashMap;
import java.util.Map;

public class Lapstone {

    public Lapstone() {
	// TODO Auto-generated constructor stub
    }

    public static void main(String[] args) {
	System.out.println("Starting lapstone with args:");
	Map<String, String> argMap = new HashMap<String, String>();
	for (String arg : args) {
	    System.out.println(arg);
	}

	// prepare arguments
	for (String arg : args) {
	    argMap.put(arg.split("=")[0].substring(1), arg.split("=")[1]);
	}
	System.out.println(argMap.toString());

	switch (argMap.get("function")) {
	case "deploy":
	    break;

	}
    }
    


}
