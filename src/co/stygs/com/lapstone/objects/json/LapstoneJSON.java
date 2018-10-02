package co.stygs.com.lapstone.objects.json;

import java.util.Map;

public class LapstoneJSON {

    public LapstoneJSON() {
	// TODO Auto-generated constructor stub
    }

    private String name;
    private String title;
    private Map<String, Object> version;
    private Boolean min;
    private String startPage;
    private String startPage_firstStart;
    private String startPage_loggedIn;
    private String badConnectionPage;
    private String startupContent;
    private String startupStyle;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public Map<String, Object> getVersion() {
        return version;
    }
    public void setVersion(Map<String, Object> version) {
        this.version = version;
    }
    public Boolean getMin() {
        return min;
    }
    public void setMin(Boolean min) {
        this.min = min;
    }
    public String getStartPage() {
        return startPage;
    }
    public void setStartPage(String startPage) {
        this.startPage = startPage;
    }
    public String getStartPage_firstStart() {
        return startPage_firstStart;
    }
    public void setStartPage_firstStart(String startPage_firstStart) {
        this.startPage_firstStart = startPage_firstStart;
    }
    public String getStartPage_loggedIn() {
        return startPage_loggedIn;
    }
    public void setStartPage_loggedIn(String startPage_loggedIn) {
        this.startPage_loggedIn = startPage_loggedIn;
    }
    public String getBadConnectionPage() {
        return badConnectionPage;
    }
    public void setBadConnectionPage(String badConnectionPage) {
        this.badConnectionPage = badConnectionPage;
    }
    public String getStartupContent() {
        return startupContent;
    }
    public void setStartupContent(String startupContent) {
        this.startupContent = startupContent;
    }
    public String getStartupStyle() {
        return startupStyle;
    }
    public void setStartupStyle(String startupStyle) {
        this.startupStyle = startupStyle;
    }

}
