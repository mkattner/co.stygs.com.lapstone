package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.FileUtils;

import com.google.common.collect.ImmutableList;
import com.google.javascript.jscomp.CompilationLevel;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.ConformanceConfig;
import com.google.javascript.jscomp.Requirement;
import com.google.javascript.jscomp.Result;
import com.google.javascript.jscomp.SourceFile;

public class LapstoneCompiler {

	public LapstoneCompiler() {
		// TODO Auto-generated constructor stub
	}

	private static final com.google.javascript.jscomp.Compiler GOOGLE_COMPILER;
	private static final CompilerOptions GOOGLE_COMPILER_OPTIONS;

	static {
		GOOGLE_COMPILER = new com.google.javascript.jscomp.Compiler();
		GOOGLE_COMPILER_OPTIONS = new CompilerOptions();
		GOOGLE_COMPILER_OPTIONS.setPrettyPrint(true);

		GOOGLE_COMPILER_OPTIONS.setDefineReplacements(defineReplacements);
		ConformanceConfig.parseFrom("");
		
		CompilationLevel.SIMPLE_OPTIMIZATIONS.setOptionsForCompilationLevel(GOOGLE_COMPILER_OPTIONS);
		GOOGLE_COMPILER.initOptions(GOOGLE_COMPILER_OPTIONS);
	}

	public static void Compile(File in, File out) throws IOException, CompressorException {

		List<SourceFile> externs = ImmutableList.of();
		SourceFile input = SourceFile.fromFile(in.getAbsolutePath());
		List<SourceFile> inputs = ImmutableList.of(input);

		Result result = GOOGLE_COMPILER.compile(externs, inputs, GOOGLE_COMPILER_OPTIONS);
		
		if(result.success) {
			
			FileUtils.writeStringToFile(out, GOOGLE_COMPILER.toSource());
			
		}else
		{
			throw new CompressorException();
		}
	}

}
