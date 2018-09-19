import java.io.BufferedOutputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class DataWrite {
	public static void main(String[] args) {
		DataWrite dw = new DataWrite();
		// dw.read("C:\\Users\\SinghM\\eclipse-workspace\\CourseInformationHub\\bin\\TestWrite.txt");
		int[] data = { 71, 73, 70, 56, 57, 97, 13, 0, 12, 0, 145 };
		// dw.dataWrite(data,
		// "C:\\Users\\SinghM\\eclipse-workspace\\CourseInformationHub\\bin\\TestWrite.txt");
		dw.characterRead("C:\\Users\\SinghM\\eclipse-workspace\\CourseInformationHub\\bin\\TestWrite.txt");
		dw.characterWrite("Course 1\nCourse 2",
				"C:\\Users\\SinghM\\eclipse-workspace\\CourseInformationHub\\bin\\TestWrite.txt");
	}

	public void write(int[] data, String file) {
		try (FileOutputStream f = new FileOutputStream(file)) {
			for (int x : data) {
				f.write(x);
				System.out.print(x);
			}
			f.close();
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}

	public void dataWrite(int[] data, String file) {
		try (FileOutputStream f = new FileOutputStream(file);
				BufferedOutputStream bStream = new BufferedOutputStream(f);
				DataOutputStream dataStream = new DataOutputStream(bStream);) {
			for (int x : data) {
				dataStream.writeInt(x);
			}
			dataStream.close();
		} catch (IOException e) {
			System.out.println("Error: " + e.getMessage());
		}
	}

	public void read(String file) {
		try (FileInputStream f = new FileInputStream(file);) {
			boolean endOfFile = false;
			while (endOfFile == false) {
				int input = f.read();
				if (input == -1) {
					endOfFile = true;
				} else {
					System.out.print(input + " ");
				}
			}
			f.close();
		} catch (IOException e) {
			System.out.println("Error: " + e.getMessage());
		}
	}

	public void characterRead(String file) {
		try (FileReader reader = new FileReader(file);) {
			int inByte;
			do {
				inByte = reader.read();
				if (inByte != -1) {
					System.out.print((char) inByte);
				}
			} while (inByte != -1);
			reader.close();
		} catch (IOException e) {
			System.out.println("Error: " + e.getMessage());
		}

	}

	public void characterWrite(String text, String file) {
		try (FileWriter writer = new FileWriter(file, true);) {
			char[] textAsArray = text.toCharArray();
			for (char c : textAsArray) {
				writer.write(c);
			}
		} catch (IOException e) {
			System.out.println("Error: " + e.getMessage());
		}

	}

}
