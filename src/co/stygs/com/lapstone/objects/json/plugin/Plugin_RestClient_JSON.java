package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;
import co.stygs.com.lapstone.objects.json.Wsd_JSON;
import co.stygs.com.lapstone.objects.json.Wsd_JSON_Webservice;

public class Plugin_RestClient_JSON extends APlugin_JSON {

    public Plugin_RestClient_JSON() {
	// TODO Auto-generated constructor stub
    }

    public List<String> getWsdFiles() {
	return wsdFiles;
    }

    public void setWsdFiles(List<String> wsdFiles) {
	this.wsdFiles = wsdFiles;
    }

    private List<String> wsdFiles;
    private Map<String, Wsd_JSON_Webservice> webservices;
    private Boolean useKeepAlive;
    private Integer global_getJsonWithLoader_Timeout;
    private Integer global_getJsonWithLoader_Overrun;
    private Boolean global_getJsonWithLoader_UniqueLoader;

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
    public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception {
	ObjectMapper objectMapper = new ObjectMapper();
	File configuration;
	File currentFile;
	configuration = new File(www, "js/plugin/plugin.RestClient.json");
	Plugin_RestClient_JSON restClientJson = objectMapper.readValue(configuration, Plugin_RestClient_JSON.class);
	for (String url : restClientJson.getWsdFiles()) {
	    currentFile = new File(www, "page/" + url);
	    Wsd_JSON wsdJSON = objectMapper.readValue(currentFile, Wsd_JSON.class);
	    restClientJson.getWebservices().putAll(wsdJSON);
	    currentFile.delete();
	}
	objectMapper.writeValue(configuration, restClientJson);
	return null;
    }

    public Boolean getUseKeepAlive() {
	return useKeepAlive;
    }

    public void setUseKeepAlive(Boolean useKeepAlive) {
	this.useKeepAlive = useKeepAlive;
    }

    public Map<String, Wsd_JSON_Webservice> getWebservices() {
	return webservices;
    }

    public void setWebservices(Map<String, Wsd_JSON_Webservice> webservices) {
	this.webservices = webservices;
    }

    public Boolean getGlobal_getJsonWithLoader_UniqueLoader() {
	return global_getJsonWithLoader_UniqueLoader;
    }

    public void setGlobal_getJsonWithLoader_UniqueLoader(Boolean global_getJsonWithLoader_UniqueLoader) {
	this.global_getJsonWithLoader_UniqueLoader = global_getJsonWithLoader_UniqueLoader;
    }

}
