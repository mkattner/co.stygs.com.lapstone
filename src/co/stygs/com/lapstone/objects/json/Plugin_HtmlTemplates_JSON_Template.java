package co.stygs.com.lapstone.objects.json;

import java.util.Map;

public class Plugin_HtmlTemplates_JSON_Template {

	public Plugin_HtmlTemplates_JSON_Template() {
		// TODO Auto-generated constructor stub
	}

	private String content;
	private String style;
	private Map<String, String> elements;
	private Map<String, String> styles;
	private Boolean useSkin;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public Map<String, String> getElements() {
		return elements;
	}

	public void setElements(Map<String, String> elements) {
		this.elements = elements;
	}

	public Boolean getUseSkin() {
		return useSkin;
	}

	public void setUseSkin(Boolean useSkin) {
		this.useSkin = useSkin;
	}

	public Map<String, String> getStyles() {
		return styles;
	}

	public void setStyles(Map<String, String> styles) {
		this.styles = styles;
	}

}
