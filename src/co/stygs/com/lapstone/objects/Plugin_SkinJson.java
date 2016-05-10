package co.stygs.com.lapstone.objects;

import java.util.List;

public class Plugin_SkinJson extends APlugin_JSON {

    public Plugin_SkinJson() {
	// TODO Auto-generated constructor stub
    }

    private Boolean useSkinPlugin;
    private String defaultSkin;
    private Plugin_SkinJson_Skins skins;

    public Boolean getUseSkinPlugin() {
	return useSkinPlugin;
    }

    public void setUseSkinPlugin(Boolean useSkinPlugin) {
	this.useSkinPlugin = useSkinPlugin;
    }

    public String getDefaultSkin() {
	return defaultSkin;
    }

    public void setDefaultSkin(String defaultSkin) {
	this.defaultSkin = defaultSkin;
    }

    public Plugin_SkinJson_Skins getSkins() {
	return skins;
    }

    public void setSkins(Plugin_SkinJson_Skins skins) {
	this.skins = skins;
    }

}
