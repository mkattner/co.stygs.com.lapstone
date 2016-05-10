package co.stygs.com.lapstone.objects;

import java.util.List;
import java.util.Map;

public class Plugin_LoadExternalScriptsJson extends APlugin_JSON {

    public Plugin_LoadExternalScriptsJson() {
	// TODO Auto-generated constructor stub
    }

    public Plugin_LoadExternalScriptsJson_Scripts getScripts() {
	return scripts;
    }

    public void setScripts(Plugin_LoadExternalScriptsJson_Scripts scripts) {
	this.scripts = scripts;
    }

    private Plugin_LoadExternalScriptsJson_Scripts scripts;

}
