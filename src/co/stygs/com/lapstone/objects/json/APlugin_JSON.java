package co.stygs.com.lapstone.objects.json;

import java.util.List;

public abstract class APlugin_JSON implements IPlugin_JSON{

    public APlugin_JSON() {
	// TODO Auto-generated constructor stub
    }
    
    private String name;
    private String shortname;
    private List<String> include;
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
    public List<String> getInclude() {
        return include;
    }
    public void setInclude(List<String> include) {
        this.include = include;
    }

}
