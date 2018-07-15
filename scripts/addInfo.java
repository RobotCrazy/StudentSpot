import java.io.*;
import javax.script.ScriptException;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;


public class addInfo {

  public static void main(String [] args) {
    add("testEm", "testPa", "reg");
  }

  public static void add(String em, String pa, String accType) {
    String regulars = "../accounts/regularLogins.txt";
    String admins = "../accounts/adminLogins.txt";
    try {
      ScriptEngineManager manager = new ScriptEngineManager();
      ScriptEngine javascriptEngine = manager.getEngineByExtension("js");
      FileInputStream fileInputStream = new FileInputStream("./accountInfoStorage.js");
      BufferedReader reader = new BufferedReader(new InputStreamReader(fileInputStream));
      javascriptEngine.eval(reader);
      Invocable invocableEngine = (Invocable)javascriptEngine;
      if(accType.equals("reg")) {
        try {
          FileWriter fw = new FileWriter(regulars);
          BufferedWriter bw = new BufferedWriter(fw);
          bw.write("{");
          bw.newLine();
          bw.write("\temail : " + invocableEngine.invokeFunction("encrypt", "testEm", "unique"));
          bw.newLine();
          bw.write("\tpass : " + invocableEngine.invokeFunction("encrypt", "testPa", "unique"));
          bw.newLine();
          bw.write("}");
          bw.close();
        } catch(IOException ex) {
          System.out.println("Error writing to file \'"  + regulars + "\'");
        } catch(Exception e) {
          System.err.println(e);
        }
      }
    } catch(Exception e) {
      System.err.println(e);
    }



    // else if(accType.equals("adm")) {
    //   try {
    //     FileWriter fileWriter = new FileWriter(admins);
    //     BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
    //     bufferedWriter.write("Hello there,");
    //     bufferedWriter.write(" here is some text.");
    //     bufferedWriter.newLine();
    //     bufferedWriter.write("We are writing");
    //     bufferedWriter.write(" the text to the file.");
    //     bufferedWriter.close();
    //   }
    //   catch(IOException ex) {
    //     System.out.println("Error writing to file \'"  + fileName + "\'");
    //   }
    // }
  }
}
