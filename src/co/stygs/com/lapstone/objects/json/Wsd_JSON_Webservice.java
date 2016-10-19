package co.stygs.com.lapstone.objects.json;

import java.util.Map;

public class Wsd_JSON_Webservice {

    public Wsd_JSON_Webservice() {
	// TODO Auto-generated constructor stub
    }

    private String info;
    private String url;
    private Map<String, String> parameters;
    private Map<String, String> headers;

    public String getInfo() {
        return info;
    }
    public void setInfo(String info) {
        this.info = info;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public Map<String, String> getParameters() {
        return parameters;
    }
    public void setParameters(Map<String, String> parameters) {
        this.parameters = parameters;
    }
    public Map<String, String> getHeaders() {
        return headers;
    }
    public void setHeaders(Map<String, String> headers) {
        this.headers = headers;
    }
    public String getMethod() {
        return method;
    }
    public void setMethod(String method) {
        this.method = method;
    }
    public Integer getTimeout() {
        return timeout;
    }
    public void setTimeout(Integer timeout) {
        this.timeout = timeout;
    }
    public Boolean getCacheable() {
        return cacheable;
    }
    public void setCacheable(Boolean cacheable) {
        this.cacheable = cacheable;
    }
    public Integer getCacheInMs() {
        return cacheInMs;
    }
    public void setCacheInMs(Integer cacheInMs) {
        this.cacheInMs = cacheInMs;
    }
    public String getServer() {
        return server;
    }
    public void setServer(String server) {
        this.server = server;
    }
    public String getDataType() {
        return dataType;
    }
    public void setDataType(String dataType) {
        this.dataType = dataType;
    }
    public String getContentType() {
        return contentType;
    }
    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getExtend() {
	return extend;
    }
    public void setExtend(String extend) {
	this.extend = extend;
    }

    private String method;
    private Integer timeout;
    private Boolean cacheable;
    private Integer cacheInMs;
    private String server;
    private String dataType;
    private String contentType;
    private String extend;

}
