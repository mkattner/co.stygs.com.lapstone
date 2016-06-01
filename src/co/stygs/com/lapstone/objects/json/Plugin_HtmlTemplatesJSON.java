package co.stygs.com.lapstone.objects.json;

import java.util.Map;

public class Plugin_HtmlTemplatesJSON extends APlugin_JSON{

    public Plugin_HtmlTemplatesJSON() {
	// TODO Auto-generated constructor stub
    }

    @Override
    public Boolean release() {
	// TODO Auto-generated method stub
	return null;
    }

    public Map<String, Plugin_HtmlTemplates_TemplateJSON> getTemplates() {
	return templates;
    }

    public void setTemplates(Map<String, Plugin_HtmlTemplates_TemplateJSON> templates) {
	this.templates = templates;
    }

    private Map<String, Plugin_HtmlTemplates_TemplateJSON> templates;
}
