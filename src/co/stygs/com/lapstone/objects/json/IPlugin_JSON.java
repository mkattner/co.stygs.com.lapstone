package co.stygs.com.lapstone.objects.json;

import java.io.File;

public interface IPlugin_JSON {
    public Boolean release(File www, LapstoneJSON lapstoneJson) throws Exception;
   
    
    public String getAdditionalJavascript(File www) throws Exception;
//    public String addJavaSript(File www, LapstoneJSON lapstoneJson);
}
