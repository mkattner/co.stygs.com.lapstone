package co.stygs.com.lapstone;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.mozilla.javascript.CompilerEnvirons;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;
import org.mozilla.javascript.Parser;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.IfStatement;
import org.mozilla.javascript.ast.NodeVisitor;
import org.mozilla.javascript.ast.SwitchCase;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableList;
import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.CompilationLevel;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.ComposeWarningsGuard;
import com.google.javascript.jscomp.DiagnosticGroup;
import com.google.javascript.jscomp.DiagnosticGroups;
import com.google.javascript.jscomp.DiagnosticType;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.jscomp.parsing.parser.trees.GetAccessorTree;

import co.stygs.com.lapstone.objects.json.Plugin_JSON;

public class LapstoneCompiler implements ILogger {

    public static void Compile(File in, File out, File www) throws IOException, CompressorException {
	LOGGER.debug("Lapstone Compile: " + in.getName() + " to " + out.getName());
	Rhino(in, out, www);
	Closure(out, out, www);
    }

    private static void Rhino(File in, File out, File www) throws IOException, CompressorException {
	LOGGER.debug("Rhino: " + in.getName() + " to " + out.getName());
	String js = FileUtils.readFileToString(in, Lapstone.CHARSET);
	try {
	    Parser parser = new Parser(new CompilerEnvirons(), new ErrorReporter() {

		@Override
		public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
		    LOGGER.error(sourceName + " " + line + ": " + message + " " + lineSource + " " + lineOffset);

		}

		@Override
		public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource, int lineOffset) {
		    LOGGER.error(sourceName + " " + line + ": " + message + " " + lineSource + " " + lineOffset);
		    return null;
		}

		@Override
		public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
		    LOGGER.warn(sourceName + " " + line + ": " + message + " " + lineSource + " " + lineOffset);

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
			    LOGGER.trace("Remove: " + node.toSource());
			    try {
				// SWITCH / CASE
				if (node.getParent().getParent().getType() == 116) {
				    SwitchCase switchCase = (SwitchCase) node.getParent().getParent();

				    throw new Exception();
				    // TODO delete debug
				} else if (node.getParent().getParent().getType() == 113) {
				    IfStatement ifStatement = (IfStatement) node.getParent().getParent();

				    throw new Exception();

				    // problem is, that the debug statement is alone.
				    // TODO delete debug
				} else {
				    node.getParent().getParent().removeChild(node.getParent());
				}
				return false;
			    } catch (Exception e) {
				LOGGER.warn("-------------------------------------------------------------------------------------");
				LOGGER.warn("Can't remove debug output");
				LOGGER.warn("Node: " + node.toSource());
				LOGGER.warn("Parent: " + node.getParent().toSource());
				LOGGER.warn("Grandparent: " + node.getParent().getParent().toSource());
				LOGGER.warn("Exception", e);
				LOGGER.warn("Error above is not critical, but dirty.");
				LOGGER.warn("-------------------------------------------------------------------------------------");

			    }
			}
		    }

		    return true;
		}
	    });

	    FileUtils.writeStringToFile(out, astRoot.toSource(), Lapstone.CHARSET);

	}

	catch (Exception e) {
	    LOGGER.error("-------------------------------------------------------------------------------------");
	    LOGGER.error("Lapstone compilation error in: " + in.getName());
	    LOGGER.error("Rhino is unable to parse: " + in.getAbsolutePath());
	    LOGGER.error("Exception", e);
	    LOGGER.error("Error above is not critical, but dirty.");
	    LOGGER.error("-------------------------------------------------------------------------------------");

	    FileUtils.writeStringToFile(out, FileUtils.readFileToString(in, Lapstone.CHARSET), Lapstone.CHARSET);
	}

    }

    public static void Closure(File in, File out, File www) throws IOException {
	LOGGER.debug("Closure: " + in.getName() + " to " + out.getName());

	com.google.javascript.jscomp.Compiler compiler = new Compiler();

	CompilerOptions options = new CompilerOptions();
	// options.setEmitUseStrict(false);
	// Advanced mode is used here, but additional options could be set, too.
	CompilationLevel.SIMPLE_OPTIMIZATIONS.setOptionsForCompilationLevel(options);
	options.setPrettyPrint(true);
	options.setPrintInputDelimiter(true);
	options.setPreferSingleQuotes(false);

	// for(DiagnosticGroup d: DiagnosticGroups.getRegisteredGroups().values()) {
	// options.setWarningLevel(d, CheckLevel.WARNING);
	// }

	options.setWarningLevel(DiagnosticGroups.forName("ambiguousFunctionDecl"), CheckLevel.WARNING);
	options.setWarningLevel(DiagnosticGroups.forName("checkRegExp"), CheckLevel.WARNING);

	options.setWarningLevel(DiagnosticGroups.forName("checkVars"), CheckLevel.WARNING);
	// options.setWarningLevel(DiagnosticGroups.forName("checkRegExp"), CheckLevel.WARNING);
	// options.setWarningLevel(DiagnosticGroups.forName("checkRegExp"), CheckLevel.WARNING);
	// options.setWarningLevel(DiagnosticGroups.forName("checkRegExp"), CheckLevel.WARNING);
	// options.setWarningLevel(DiagnosticGroups.forName("checkRegExp"), CheckLevel.WARNING);
	// options.setWarningLevel(DiagnosticGroups.forName("checkRegExp"), CheckLevel.WARNING);
	// options.setWarningLevel(DiagnosticGroups.forName("checkRegExp"), CheckLevel.WARNING);
	// options.setWarningLevel(DiagnosticGroups.forName("checkRegExp"), CheckLevel.WARNING);
	// To get the complete set of externs, the logic in
	// CompilerRunner.getDefaultExterns() should be used here.

	List<SourceFile> externs = new ArrayList<>(10);
	SourceFile extern = SourceFile.fromCode("hardCoded.js", " ");

	externs.add(extern);

	for (File f : new File(www, "ext/externs").listFiles()) {
	    externs.add(SourceFile.fromFile(f.getAbsolutePath(), Lapstone.CHARSET));
	}

	ObjectMapper objectMapper = new ObjectMapper();
	LinkedHashMap<String, Boolean> plugins = objectMapper.readValue(new File(www, "js/plugin/plugins.json"), new TypeReference<LinkedHashMap<String, Boolean>>() {
	});

	if (!in.getName().equals("lapstone.js")) {
	    externs.add(SourceFile.fromCode("lapstone", "var lapstone={}; var app={};"));
	}

	for (String pluginName : plugins.keySet()) {
	    // just load used plugins
	    if (Boolean.TRUE.equals(plugins.get(pluginName))) {
		File f = new File(www, "js/plugin/plugin." + pluginName + ".js");
		if (!f.getName().equals(in.getName()))
		    externs.add(SourceFile.fromCode(pluginName, "var plugin_" + pluginName + "={};"));
	    }
	}

	// The dummy input name "input.js" is used here so that any warnings or
	// errors will cite line numbers in terms of input.js.
	SourceFile input = SourceFile.fromCode(in.getName(), FileUtils.readFileToString(in, Lapstone.CHARSET));

	// compile() returns a Result, but it is not needed here.
	compiler.compile(ImmutableList.copyOf(externs), ImmutableList.of(input), options);

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
