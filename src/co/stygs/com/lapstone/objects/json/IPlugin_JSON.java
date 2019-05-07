package co.stygs.com.lapstone.objects.json;

import java.io.File;

public interface IPlugin_JSON {
    public String getAdditionalJavascript(File www) throws Exception;
//    public String addJavaSript(File www, LapstoneJSON lapstoneJson);
   
    
    public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception;
}
