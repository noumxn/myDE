import java.io.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        try {
            String code = new String(Files.readAllBytes(Paths.get("code.java")));
            System.out.println("User Code:\n" + code);
        } catch (IOException e) {
            System.err.println("Error reading the code file: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Error during execution: " + e.getMessage());
        }
    }
}
