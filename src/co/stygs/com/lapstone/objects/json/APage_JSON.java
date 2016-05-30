package co.stygs.com.lapstone.objects.json;

import java.util.List;

public abstract class APage_JSON implements IPage_JSON{

    public APage_JSON() {
	// TODO Auto-generated constructor stub
    }

    public String getName() {
	return name;
    }
    public void setName(String name) {
	this.name = name;
    }

   

    public List<String> getInclude_once() {
	return include_once;
    }

    public void setInclude_once(List<String> include_once) {
	this.include_once = include_once;
    }

    public List<String> getInclude() {
	return include;
    }

    public void setInclude(List<String> include) {
	this.include = include;
    }

    private String name;
    private List<String> include;
    private List<String> include_once;

}
