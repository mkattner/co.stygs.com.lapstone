package co.stygs.com.lapstone.objects.json;

public class Wsd_JSON_Webservice {

    public Wsd_JSON_Webservice() {
	// TODO Auto-generated constructor stub
    }

    private Integer cacheInMs;
    private Boolean cacheable;
    private String method;
    private Integer timeout;
    private String url;

    public Integer getCacheInMs() {
	return cacheInMs;
    }

    public void setCacheInMs(Integer cacheInMs) {
	this.cacheInMs = cacheInMs;
    }

    public Boolean getCacheable() {
	return cacheable;
    }

    public void setCacheable(Boolean cacheable) {
	this.cacheable = cacheable;
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

    public String getUrl() {
	return url;
    }

    public void setUrl(String url) {
	this.url = url;
    }

    public String getLocal() {
	return local;
    }

    public void setLocal(String local) {
	this.local = local;
    }

    private String local;

}
