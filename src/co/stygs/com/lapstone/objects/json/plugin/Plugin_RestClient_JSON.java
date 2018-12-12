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
	}public List<String> getDependency() {
		return dependency;
	}

	public void setDependency(List<String> dependency) {
		this.dependency = dependency;
	}
	
	 
    private List<String> dependency;


	public List<String> getWsdFiles() {
		return wsdFiles;
	}

	public void setWsdFiles(List<String> wsdFiles) {
		this.wsdFiles = wsdFiles;
	}

	private List<String> wsdFiles;
	private Map<String, Wsd_JSON_Webservice> webservices;
	private Boolean useKeepAlive;
	private Integer global_getJsonWithLoader_timeout;
	private Integer global_getJsonWithLoader_overrun;
	private Boolean global_getJsonWithLoader_uniqueLoaderPageScoped;
	private String global_getJsonWithLoader_multilanguageContext;
	private Boolean global_getJsonWithLoader_uniqueLoader;
	private String global_getJsonWithLoader_loaderTemplate;

	public Integer getGlobal_getJsonWithLoader_timeout() {
		return global_getJsonWithLoader_timeout;
	}

	public void setGlobal_getJsonWithLoader_timeout(Integer global_getJsonWithLoader_timeout) {
		this.global_getJsonWithLoader_timeout = global_getJsonWithLoader_timeout;
	}

	public Integer getGlobal_getJsonWithLoader_overrun() {
		return global_getJsonWithLoader_overrun;
	}

	public void setGlobal_getJsonWithLoader_overrun(Integer global_getJsonWithLoader_overrun) {
		this.global_getJsonWithLoader_overrun = global_getJsonWithLoader_overrun;
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

	public Boolean getGlobal_getJsonWithLoader_uniqueLoader() {
		return global_getJsonWithLoader_uniqueLoader;
	}

	public void setGlobal_getJsonWithLoader_uniqueLoader(Boolean global_getJsonWithLoader_uniqueLoader) {
		this.global_getJsonWithLoader_uniqueLoader = global_getJsonWithLoader_uniqueLoader;
	}

	public Boolean getGlobal_getJsonWithLoader_uniqueLoaderPageScoped() {
		return global_getJsonWithLoader_uniqueLoaderPageScoped;
	}

	public void setGlobal_getJsonWithLoader_uniqueLoaderPageScoped(Boolean global_getJsonWithLoader_uniqueLoaderPageScoped) {
		this.global_getJsonWithLoader_uniqueLoaderPageScoped = global_getJsonWithLoader_uniqueLoaderPageScoped;
	}

	public String getGlobal_getJsonWithLoader_multilanguageContext() {
		return global_getJsonWithLoader_multilanguageContext;
	}

	public void setGlobal_getJsonWithLoader_multilanguageContext(String global_getJsonWithLoader_multilanguageContext) {
		this.global_getJsonWithLoader_multilanguageContext = global_getJsonWithLoader_multilanguageContext;
	}

	public String getGlobal_getJsonWithLoader_loaderTemplate() {
		return global_getJsonWithLoader_loaderTemplate;
	}

	public void setGlobal_getJsonWithLoader_loaderTemplate(String global_getJsonWithLoader_loaderTemplate) {
		this.global_getJsonWithLoader_loaderTemplate = global_getJsonWithLoader_loaderTemplate;
	}
	@Override
	public String getAdditionalJavascript(File www) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
