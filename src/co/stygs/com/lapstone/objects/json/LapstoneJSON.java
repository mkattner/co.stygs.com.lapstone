package co.stygs.com.lapstone.objects.json;

import java.util.Map;

public class LapstoneJSON {

	private String badConnectionPage;

	private Boolean min;
	private String name;
	private String startPage;
	private String startPage_firstStart;
	private String startPage_loggedIn;
	private String startupContent;
	private String startupStyle;
	private String title;
	private Map<String, Object> version;
	public LapstoneJSON() {
		// TODO Auto-generated constructor stub
	}

	public String getBadConnectionPage() {
		return badConnectionPage;
	}

	public Boolean getMin() {
		return min;
	}

	public String getName() {
		return name;
	}

	public String getStartPage() {
		return startPage;
	}

	public String getStartPage_firstStart() {
		return startPage_firstStart;
	}

	public String getStartPage_loggedIn() {
		return startPage_loggedIn;
	}

	public String getStartupContent() {
		return startupContent;
	}

	public String getStartupStyle() {
		return startupStyle;
	}

	public String getTitle() {
		return title;
	}

	public Map<String, Object> getVersion() {
		return version;
	}

	public void setBadConnectionPage(String badConnectionPage) {
		this.badConnectionPage = badConnectionPage;
	}

	public void setMin(Boolean min) {
		this.min = min;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setStartPage(String startPage) {
		this.startPage = startPage;
	}

	public void setStartPage_firstStart(String startPage_firstStart) {
		this.startPage_firstStart = startPage_firstStart;
	}

	public void setStartPage_loggedIn(String startPage_loggedIn) {
		this.startPage_loggedIn = startPage_loggedIn;
	}

	public void setStartupContent(String startupContent) {
		this.startupContent = startupContent;
	}

	public void setStartupStyle(String startupStyle) {
		this.startupStyle = startupStyle;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setVersion(Map<String, Object> version) {
		this.version = version;
	}

}
