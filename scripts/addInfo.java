import java.io.*;
import javax.script.ScriptException;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;


public class addInfo {
    private static boolean hasAdded = false;

  public static void main(String [] args) {
      System.out.println("Adding accountss...");
      addEmAll();
      while(!hasAdded) {
          System.out.println(".");
      }
  }

  public static void addEmAll() {
      String[][] accounts = {
          {"em1", "pa1", "reg"}//,
          // {"em2", "pa2", "reg"},
          // {"em3", "pa3", "reg"},
          // {"em4", "pa4", "reg"}
      };

      for(int i = 0; i < accounts.length; i++) {
          add(accounts[i][0], accounts[i][1], accounts[i][2]);
          System.out.println(accounts[i][0] + ", " + accounts[i][1] + ", " + accounts[i][2]);
      }
      hasAdded = true;
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
          FileWriter fw = new FileWriter(regulars, true);
          BufferedWriter bw = new BufferedWriter(fw);
          PrintWriter out = new PrintWriter(bw);
          out.println("{");
          out.println("\t\'email\' : \'" + invocableEngine.invokeFunction("encrypt", em, pa ) + "\'");
          out.println("");
          out.println("\t\'pass\' : \'" + invocableEngine.invokeFunction("encrypt", pa, em) + "\'");
          out.println("}\n");
          out.close();
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
