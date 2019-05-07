package co.stygs.com.lapstone.objects.json;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Wsd_JSON_Webservice {

    private Boolean cacheable;

    private Integer cacheInMs;
    private String contentType;
    private String dataType;
    private String extend;

    private Map<String, String> headers;
    private String info;
    private String method;
    private Map<String, String> parameters;
    private String server;
    private Integer timeout;
    private String url;
    public Wsd_JSON_Webservice() {
	// TODO Auto-generated constructor stub
    }
    public Boolean getCacheable() {
        return cacheable;
    }
    public Integer getCacheInMs() {
        return cacheInMs;
    }
    public String getContentType() {
        return contentType;
    }
    public String getDataType() {
        return dataType;
    }
    public String getExtend() {
	return extend;
    }
    public Map<String, String> getHeaders() {
        return headers;
    }
    public String getInfo() {
        return info;
    }
    public String getMethod() {
        return method;
    }
    public Map<String, String> getParameters() {
        return parameters;
    }
    public String getServer() {
        return server;
    }
    public Integer getTimeout() {
        return timeout;
    }
    public String getUrl() {
        return url;
    }
    public void setCacheable(Boolean cacheable) {
        this.cacheable = cacheable;
    }
    public void setCacheInMs(Integer cacheInMs) {
        this.cacheInMs = cacheInMs;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public void setExtend(String extend) {
	this.extend = extend;
    }
    public void setHeaders(Map<String, String> headers) {
        this.headers = headers;
    }
    public void setInfo(String info) {
        this.info = info;
    }
    public void setMethod(String method) {
        this.method = method;
    }
    public void setParameters(Map<String, String> parameters) {
        this.parameters = parameters;
    }
    public void setServer(String server) {
        this.server = server;
    }
    public void setTimeout(Integer timeout) {
        this.timeout = timeout;
    }
    public void setUrl(String url) {
        this.url = url;
    }

}
