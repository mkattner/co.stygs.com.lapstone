package co.stygs.com.lapstone;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.mozilla.javascript.CompilerEnvirons;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;
import org.mozilla.javascript.Parser;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.NodeVisitor;

import com.google.javascript.jscomp.CompilationLevel;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.SourceFile;

public class LapstoneCompiler implements ILogger {

	public static void Compile(File in, File out) throws IOException, CompressorException {
		LOGGER.debug("Compile: " + in.getName() + " to " + out.getName());
		Rhino(in, out);
		Closure(out, out);
	}

	private static void Rhino(File in, File out) throws IOException, CompressorException {
		LOGGER.debug("Rhino: " + in.getName() + " to " + out.getName());
		String js = FileUtils.readFileToString(in, Lapstone.CHARSET);
		try {
			Parser parser = new Parser(new CompilerEnvirons(), new ErrorReporter() {

				@Override
				public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
					System.out.println(sourceName + " " + line + ": " + message + " " + lineSource + " " + lineOffset);

				}

				@Override
				public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource, int lineOffset) {
					System.out.println(sourceName + " " + line + ": " + message + " " + lineSource + " " + lineOffset);
					return null;
				}

				@Override
				public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
					System.out.println(sourceName + " " + line + ": " + message + " " + lineSource + " " + lineOffset);

				}
			});

			// Read the input file

			AstRoot astRoot = parser.parse(js, in.getName(), 0);

			astRoot.visit(new NodeVisitor() {

				@Override
				public boolean visit(AstNode node) {
					// System.out.println(node.toString());
					if (node.getType() == 38) {
						// System.out.println("f - " + node.toString());

						if (node.toSource().startsWith("app.debug.")) {
							System.out.println("Remove: " + node.toSource());
							try {
								node.getParent().getParent().removeChild(node.getParent());
								return false;
							} catch (Exception e) {
								System.out.println(node.toSource());
								System.out.println(node.getParent().toSource());
								System.out.println(node.getParent().getParent().toSource());
								e.printStackTrace();
								System.out.println("Error above is not critical, but dirty.");
							}
						}
					}

					return true;
				}
			});

			FileUtils.writeStringToFile(out, astRoot.toSource(), Lapstone.CHARSET);

		}

		catch (Exception e) {
			System.out.println("Lapstone compilation error in: " + in.getAbsolutePath());
			e.printStackTrace();
			System.out.println("Error above is not critical, but dirty.");
			FileUtils.writeStringToFile(out, FileUtils.readFileToString(in, Lapstone.CHARSET), Lapstone.CHARSET);
		}

	}

	private static void Closure(File in, File out) throws IOException {
		LOGGER.debug("Closure: " + in.getName() + " to " + out.getName());
		
		com.google.javascript.jscomp.Compiler compiler = new Compiler();

		CompilerOptions options = new CompilerOptions();
		options.setEmitUseStrict(false);
		// Advanced mode is used here, but additional options could be set, too.
		CompilationLevel.SIMPLE_OPTIMIZATIONS.setOptionsForCompilationLevel(options);

		// To get the complete set of externs, the logic in
		// CompilerRunner.getDefaultExterns() should be used here.
		SourceFile extern = SourceFile.fromCode("externs.js", "");

		// The dummy input name "input.js" is used here so that any warnings or
		// errors will cite line numbers in terms of input.js.
		SourceFile input = SourceFile.fromCode("input.js", FileUtils.readFileToString(in, Lapstone.CHARSET));

		// compile() returns a Result, but it is not needed here.
		compiler.compile(extern, input, options);

		// The compiler is responsible for generating the compiled code; it is not
		// accessible via the Result.
		FileUtils.writeStringToFile(out, compiler.toSource(), Lapstone.CHARSET);
	}

	public static void Css(File in, File out) throws IOException {
		FileUtils.writeStringToFile(out, FileUtils.readFileToString(in, Lapstone.CHARSET), Lapstone.CHARSET);
	}

	public LapstoneCompiler() {
		// TODO Auto-generated constructor stub
	}

}
