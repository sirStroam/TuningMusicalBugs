import java.io.*;
import java.util.Scanner;


public class ChangeBetaRange{

	public static void main(String[] args){
		int currentLine = 0;

		try
		{
			Scanner fileIn = new Scanner(new File("betaBeethovenNote"));	
			PrintWriter output = new PrintWriter(new File("trueBeethoven"));

			while(fileIn.hasNextInt()){
				currentLine = fileIn.nextInt();
	
				output.println(currentLine - 12);	   
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
