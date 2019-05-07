package co.stygs.com.lapstone.objects.json;

import java.util.Map;

public class Plugin_HtmlTemplates_JSON_Template {

	private String content;

	private Map<String, String> elements;
	private String style;
	private Map<String, String> styles;
	private Boolean useSkin;
	public Plugin_HtmlTemplates_JSON_Template() {
		// TODO Auto-generated constructor stub
	}

	public String getContent() {
		return content;
	}

	public Map<String, String> getElements() {
		return elements;
	}

	public String getStyle() {
		return style;
	}

	public Map<String, String> getStyles() {
		return styles;
	}

	public Boolean getUseSkin() {
		return useSkin;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public void setElements(Map<String, String> elements) {
		this.elements = elements;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public void setStyles(Map<String, String> styles) {
		this.styles = styles;
	}

	public void setUseSkin(Boolean useSkin) {
		this.useSkin = useSkin;
	}

}
