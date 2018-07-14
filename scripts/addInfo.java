import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;
public class addInfo {

  public static void main(String[] args) {
    ScriptEngineManager manager = new ScriptEngineManager();
    ScriptEngine engine = manager.getEngineByName("JavaScript");
    // read script file
    engine.eval(Files.newBufferedReader(Paths.get("C:/Scripts/Jsfunctions.js"), StandardCharsets.UTF_8));

    Invocable inv = (Invocable) engine;
    // call function from script file
    inv.invokeFunction("yourFunction", "param");
    JSONObject obj = new JSONObject();
    obj.put("email", inv.invokeFunction("encrypt", "testing"));
    obj.put("password", inv.invokeFunction("encrypt", "test"));

    try (FileWriter file = new FileWriter("../accounts/regularLogins.json")) {

        file.write(obj.toJSONString());
        file.flush();

    } catch (IOException e) {
        e.printStackTrace();
    }

    System.out.print(obj);
  }
}
