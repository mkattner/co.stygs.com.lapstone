package co.stygs.com.lapstone.objects;

public class Plugin_SkinJson {

    public Plugin_SkinJson() {
	// TODO Auto-generated constructor stub
    }

    private String name;
    private String shortname;
    private Boolean useSkinPlugin;
    private String defaultSkin;
    private Plugin_SkinJson_Skins skins;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getShortname() {
	return shortname;
    }

    public void setShortname(String shortname) {
	this.shortname = shortname;
    }

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
