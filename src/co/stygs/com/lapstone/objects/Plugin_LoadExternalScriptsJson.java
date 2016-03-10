package co.stygs.com.lapstone.objects;

import java.util.List;
import java.util.Map;

public class Plugin_LoadExternalScriptsJson {

    public Plugin_LoadExternalScriptsJson() {
	// TODO Auto-generated constructor stub
    }

    private String name;
    private String shortname;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getShortname() {
	return shortname;
    }

    public void setShortname(String shortname) {
	this.shortname = shortname;
    }

    public Plugin_LoadExternalScriptsJson_Scripts getScripts() {
	return scripts;
    }

    public void setScripts(Plugin_LoadExternalScriptsJson_Scripts scripts) {
	this.scripts = scripts;
    }

    private Plugin_LoadExternalScriptsJson_Scripts scripts;

}
