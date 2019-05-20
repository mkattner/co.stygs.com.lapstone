package co.stygs.com.lapstone.objects.json;

import java.util.List;

import co.stygs.com.lapstone.ILogger;

public abstract class APlugin_JSON implements IPlugin_JSON, ILogger{

    private List<String> include;
    
    private String name;
    private String shortname;
    public APlugin_JSON() {
	// TODO Auto-generated constructor stub
    }
    public List<String> getInclude() {
        return include;
    }
    public String getName() {
        return name;
    }
    public String getShortname() {
        return shortname;
    }
    public void setInclude(List<String> include) {
        this.include = include;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setShortname(String shortname) {
        this.shortname = shortname;
    }

}
