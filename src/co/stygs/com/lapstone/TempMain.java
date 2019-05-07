package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;

public class TempMain {

	public static void main(String[] args) throws IOException, CompressorException {
		File in=new File("C:\\temp\\in.js");
		File out= new File("C:\\temp\\out.js");
		
		LapstoneCompiler.Compile(in, out);
		
	}

	public TempMain() {
		// TODO Auto-generated constructor stub
	}

}
