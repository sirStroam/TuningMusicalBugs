import java.io.*;
import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class ParseMidi{

	public static void main(String[] args){
		String currentLine ="";
		
		Pattern p = Pattern.compile("n=(\\d+)");
		Matcher m = null;

		try
		{
			Scanner fileIn = new Scanner(new File("BeethovenMidi"));	
			PrintWriter output = new PrintWriter(new File("midiOutput"));
			
			while(fileIn.hasNext()){
				currentLine = fileIn.nextLine();
				m = p.matcher(currentLine);

				if (m.find())
				{
				    output.println(m.group(1));
				}
				   
			}
			
			fileIn.close();
			output.close();
			
		}
		catch(IOException e)
		{
			System.out.println(e);
			System.exit(-1);
		}

	}
}
