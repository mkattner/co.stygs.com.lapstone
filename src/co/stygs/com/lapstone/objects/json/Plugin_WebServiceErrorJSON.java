package co.stygs.com.lapstone.objects.json;

import java.util.List;
import java.util.Map;

public class Plugin_WebServiceErrorJSON extends APlugin_JSON {

    public Plugin_WebServiceErrorJSON() {
	// TODO Auto-generated constructor stub
    }

    @Override
    public Boolean release() {
	// TODO Auto-generated method stub
	return null;
    }

    public Map<String, String> getActions() {
        return actions;
    }

    public void setActions(Map<String, String> actions) {
        this.actions = actions;
    }

    public List<String> getStrictErrorKeys() {
        return strictErrorKeys;
    }

    public void setStrictErrorKeys(List<String> strictErrorKeys) {
        this.strictErrorKeys = strictErrorKeys;
    }

    public List<String> getErrorKeys() {
        return errorKeys;
    }

    public void setErrorKeys(List<String> errorKeys) {
        this.errorKeys = errorKeys;
    }

    public List<String> getWseFiles() {
        return wseFiles;
    }

    public void setWseFiles(List<String> wseFiles) {
        this.wseFiles = wseFiles;
    }

    public Map<String, Map<String, String>> getWse() {
        return wse;
    }

    public void setWse(Map<String, Map<String, String>> wse) {
        this.wse = wse;
    }

    private Map<String, String> actions;
    private List<String> strictErrorKeys;
    private List<String> errorKeys;
    private List<String> wseFiles;
    private Map<String, Map<String, String>> wse;

}
