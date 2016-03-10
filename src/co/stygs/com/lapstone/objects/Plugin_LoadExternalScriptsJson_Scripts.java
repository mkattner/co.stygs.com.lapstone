package co.stygs.com.lapstone.objects;

import java.util.List;

public class Plugin_LoadExternalScriptsJson_Scripts {

    public Plugin_LoadExternalScriptsJson_Scripts() {
	// TODO Auto-generated constructor stub
    }

    public List<String> getStyleOrdered() {
	return styleOrdered;
    }

    public void setStyleOrdered(List<String> styleOrdered) {
	this.styleOrdered = styleOrdered;
    }

    public List<String> getJavascriptOrdered() {
	return javascriptOrdered;
    }

    public void setJavascriptOrdered(List<String> javascriptOrdered) {
	this.javascriptOrdered = javascriptOrdered;
    }

    private List<String> style;
    private List<String> javascript;

    public List<String> getStyle() {
	return style;
    }

    public void setStyle(List<String> style) {
	this.style = style;
    }

    public List<String> getJavascript() {
	return javascript;
    }

    public void setJavascript(List<String> javascript) {
	this.javascript = javascript;
    }

    private List<String> styleOrdered;
    private List<String> javascriptOrdered;

}
