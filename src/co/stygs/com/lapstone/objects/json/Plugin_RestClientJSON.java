package co.stygs.com.lapstone.objects.json;

import java.util.List;
import java.util.Map;

public class Plugin_RestClientJSON extends APlugin_JSON {

    public Plugin_RestClientJSON() {
	// TODO Auto-generated constructor stub
    }

    public List<String> getWsdFiles() {
	return wsdFiles;
    }

    public void setWsdFiles(List<String> wsdFiles) {
	this.wsdFiles = wsdFiles;
    }

    private List<String> wsdFiles;
    private Map<String, Map<String, String>> webservices;
    private Boolean useKeepAlive;
    private Integer global_getJsonWithLoader_Timeout;
    private Integer global_getJsonWithLoader_Overrun;

    public Integer getGlobal_getJsonWithLoader_Timeout() {
	return global_getJsonWithLoader_Timeout;
    }

    public void setGlobal_getJsonWithLoader_Timeout(Integer global_getJsonWithLoader_Timeout) {
	this.global_getJsonWithLoader_Timeout = global_getJsonWithLoader_Timeout;
    }

    public Integer getGlobal_getJsonWithLoader_Overrun() {
	return global_getJsonWithLoader_Overrun;
    }

    public void setGlobal_getJsonWithLoader_Overrun(Integer global_getJsonWithLoader_Overrun) {
	this.global_getJsonWithLoader_Overrun = global_getJsonWithLoader_Overrun;
    }

    @Override
    public Boolean release() {
	// TODO Auto-generated method stub
	return null;
    }

    public Boolean getUseKeepAlive() {
	return useKeepAlive;
    }

    public void setUseKeepAlive(Boolean useKeepAlive) {
	this.useKeepAlive = useKeepAlive;
    }

    public Map<String, Map<String, String>> getWebservices() {
	return webservices;
    }

    public void setWebservices(Map<String, Map<String, String>> webservices) {
	this.webservices = webservices;
    }

}
