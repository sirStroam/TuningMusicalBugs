function biologyObject()
{
   //this.letters = [W,F,L,I,M,Y,V,C,P,T,A,S,Q,N,G,H,R,E,D,K];//Character
    this.proteinValues=[-2.1,-1.7,-1.3,-1.1,-0.7,-0.7,-0.5,0.0,0.1,0.3,0.5,0.5,0.8,0.9,1.2,1.2,1.8,1.9,2.0,2.8];//Double
    this.dnaValues=[0,1,2,3];//Values A=0,T=1,C=2,G=3
    this.rnaValues=[0,4,2,3];//Values A=0,U=4,C=2,G=3
    this.originalDNASequence=["A","C","A","T","G","A","G","A","C","A","G","A","C","A","G","A","C","C","C","C","C","A","G","A","G","A","C","A","G","A","C","C","C","C","T","A","G","A","C","A","C","A","G","A","G","A","G","A","G","T","A","T","G","C","A","G","G","A","C","A","G","G","G"];
    this.originalRNASequence=["A","U","G","G","A","A","U","U","C","U","C","G","C","U","C","A","U","G","G","A","A","U","C","U","C","G","C","U","C","A","A","U","A","U","G"];
    this.originalProteinSequence=["E","G","L","R","I","W","V","F","C","I","R","Y","K","K","G","N","S","G","A","L","Q","N","P","E","L","D","V","G","L","V","T","A","I","A","R","F","S","T","L","T","K","M","S","D","Q","D","E","A","P","H"];
    this.GenericDataArray=new Array();//This holds all letter values needed for conversion
    this.conversionValue = 10;
    this.userSequenceArray=new Array();
}

