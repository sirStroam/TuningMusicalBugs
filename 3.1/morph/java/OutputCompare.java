import java.io.*;
import java.util.Hashtable;
import java.util.Scanner;
public class OutputCompare
{
	public static void main(String[] args)
	{
		int correct = 0, count =0;
		int incorrect = 0;
		String keyV = "", outV = "";	//keyV is value of from key file, outV is value from output file
		
		try
		{
			Scanner key = new Scanner(new File("keys.txt"));	//Key file name
			Scanner outp = new Scanner(new File("output.txt"));	//Output file name
			Hashtable<String,Integer> stat = new Hashtable<String,Integer>();
			
			while(key.hasNext()){
				keyV = key.nextLine();
				stat.put(keyV,1);
				count++;
			}
			
			
			while(outp.hasNextLine())
			{
				outV = outp.nextLine();
			
				if(stat.get(outV) != null)	//correct
					correct++;
				else	//incorrect
				{
					incorrect++; //not used in code
				}
			}
			key.close();
			outp.close();
//			printMatrix(errorMatrix);
			System.out.println("\r\nCorrect: " + correct + "\nCountt: " + count);
			System.out.println("Accuracy: "+(((double)correct/count) *100)+ "%");
		}
		catch(IOException e)
		{
			System.out.println(e);
			System.exit(-1);
		}
	}

}