package co.stygs.com.lapstone;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.mozilla.javascript.CompilerEnvirons;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;
import org.mozilla.javascript.Parser;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.NodeVisitor;

public class LapstoneCompiler {

	public LapstoneCompiler() {
		// TODO Auto-generated constructor stub
	}

	public static void Compile(File in, File out) throws IOException, CompressorException {
		String js = FileUtils.readFileToString(in, Lapstone.CHARSET);
		try {
			Parser parser = new Parser(new CompilerEnvirons(), new ErrorReporter() {

				@Override
				public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
					System.out.println(sourceName + " " + line + ": " + message + " " + lineSource + " " + lineOffset);

				}

				@Override
				public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource, int lineOffset) {
					System.out.println(sourceName + " " + line + ": " + message + " " + lineSource + " " + lineOffset);
					return null;
				}

				@Override
				public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
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

	public static void Css(File in, File out) throws IOException {
		FileUtils.writeStringToFile(out, FileUtils.readFileToString(in, Lapstone.CHARSET), Lapstone.CHARSET);
	}

}
