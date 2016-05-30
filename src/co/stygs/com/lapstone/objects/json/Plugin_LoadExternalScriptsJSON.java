package co.stygs.com.lapstone.objects.json;

import java.util.List;

public class Plugin_LoadExternalScriptsJSON extends APlugin_JSON {

    public Plugin_LoadExternalScriptsJSON() {
	// TODO Auto-generated constructor stub
    }

    private List<String> styleOrdered;
    private List<String> javascriptOrdered;

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

    @Override
    public Boolean release() {
	// TODO Auto-generated method stub
	return null;
    }

}
