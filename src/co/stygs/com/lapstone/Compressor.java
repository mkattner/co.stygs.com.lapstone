package co.stygs.com.lapstone;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.io.IOUtils;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;

import com.yahoo.platform.yui.compressor.CssCompressor;
import com.yahoo.platform.yui.compressor.JavaScriptCompressor;
import com.yahoo.platform.yui.compressor.YUICompressor;

public class Compressor {

    public static Logger logger = Logger.getLogger(YUICompressor.class.getName());

    private static class YuiCompressorErrorReporter implements ErrorReporter {
	@Override
	public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
	    if (line < 0) {
		logger.log(Level.WARNING, message);
	    } else {
		logger.log(Level.WARNING, line + ':' + lineOffset + ':' + message);
	    }
	}

	@Override
	public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
	    if (line < 0) {
		logger.log(Level.SEVERE, message);
	    } else {
		logger.log(Level.SEVERE, line + ":" + lineOffset + ":" + message);
	    }
	}

	@Override
	public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource, int lineOffset) {
	    error(message, sourceName, line, lineSource, lineOffset);
	    return new EvaluatorException(message);
	}
    }

    public static class JavascriptCompressorOptions {
	public String charset = "UTF-8";
	public int lineBreakPos = -1;
	public boolean munge = true;
	public boolean verbose = true;
	public boolean preserveAllSemiColons = false;
	public boolean disableOptimizations = false;

	public JavascriptCompressorOptions() {
	}

	public JavascriptCompressorOptions(Boolean verbose) {
	    this.verbose = verbose;
	}
    }

    public static class StylesheetCompressorOptions {
	public String charset = "UTF-8";
    }

    public static void compressJavaScript(String inputFilename, String outputFilename, JavascriptCompressorOptions o) throws Exception {

	Reader in = null;
	Writer out = null;

	try {
	    
	    System.out.println();
	    System.out.println("Compress js: " + inputFilename);
	    System.out.println("  Rename to: " + outputFilename);

	    in = new InputStreamReader(new FileInputStream(inputFilename), o.charset);

	    JavaScriptCompressor compressor = new JavaScriptCompressor(in, new YuiCompressorErrorReporter());
	    in.close();
	    in = null;

	    out = new OutputStreamWriter(new FileOutputStream(outputFilename), o.charset);
	    compressor.compress(out, o.lineBreakPos, o.munge, o.verbose, o.preserveAllSemiColons, o.disableOptimizations);
	}

	finally {
	    IOUtils.closeQuietly(in);
	    IOUtils.closeQuietly(out);
	}
    }

    public static void compressStylesheet(String inputFilename, String outputFilename, StylesheetCompressorOptions o) throws Exception {

	Reader in = null;
	Writer out = null;

	try {
	    in = new InputStreamReader(new FileInputStream(inputFilename), o.charset);

	    CssCompressor compressor = new CssCompressor(in);

	    in.close();
	    in = null;

	    out = new OutputStreamWriter(new FileOutputStream(outputFilename), o.charset);
	    compressor.compress(out, 0);
	}

	finally {
	    IOUtils.closeQuietly(in);
	    IOUtils.closeQuietly(out);
	}
    }

}
