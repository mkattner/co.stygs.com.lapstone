package co.stygs.com.lapstone.objects.json.plugin;

import java.io.File;
import java.util.List;

import org.apache.commons.io.FileUtils;

import co.stygs.com.lapstone.Lapstone;
import co.stygs.com.lapstone.objects.json.APlugin_JSON;
import co.stygs.com.lapstone.objects.json.LapstoneJSON;

public class Plugin_Actions_JSON extends APlugin_JSON {

	public Plugin_Actions_JSON() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public List<String> getActions() {
		return actions;
	}

	public void setActions(List<String> actions) {
		this.actions = actions;
	}

	private List<String> actions;

	@Override
	public String getAdditionalJavascript(File www) throws Exception {
		StringBuilder sb = new StringBuilder();

		for (String fileName : getActions()) {
			sb.append("\n\n;" + FileUtils.readFileToString(new File(www, "files/actions/" + fileName),Lapstone.CHARSET));
		}
		return sb.toString();
	}

}
