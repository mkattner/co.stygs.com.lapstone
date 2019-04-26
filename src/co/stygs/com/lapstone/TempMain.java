package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;

public class TempMain {

	public TempMain() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) throws IOException, CompressorException {
		File in=new File("C:\\Users\\Martin Kattner\\GIT\\com.bsb-driveline.eye-sea.server\\app\\www_debug\\js\\plugin\\plugin.BSB.js");
		File out= new File("C:\\temp\\out.js");
		
		LapstoneCompiler.Compile(in, out);
		
	}

}
