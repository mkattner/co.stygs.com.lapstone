package co.stygs.com.lapstone.objects.json;

import java.util.List;

public abstract class APage_JSON implements IPage_JSON{

    private List<String> include;

    private List<String> include_once;
    private String name;

   

    public APage_JSON() {
	// TODO Auto-generated constructor stub
    }

    public List<String> getInclude() {
	return include;
    }

    public List<String> getInclude_once() {
	return include_once;
    }

    public String getName() {
	return name;
    }

    public void setInclude(List<String> include) {
	this.include = include;
    }
    public void setInclude_once(List<String> include_once) {
	this.include_once = include_once;
    }
    public void setName(String name) {
	this.name = name;
    }

}
