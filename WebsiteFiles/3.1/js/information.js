var Info = function (){
	this.hashInfo = {};
};

Info.prototype.getText = function(text){
	 var textOut = this.hashInfo[text];

	return textOut === undefined ? "Not Available" : textOut;
}

Info.prototype.addInteger = function(){
	this.hashInfo["Integers"] = "\
<p align=\"left\">\
Integers are the set of numbers that include the natural numbers (0,1,2 ...), combined with the negatives of the natural numbers (0,-1,-2,...).\
</p>";	
}

Info.prototype.addEConstant = function(){
	this.hashInfo["E Constant"] ="\
<p align=\"left\">\
Known as Euler's number, e is a mathematical constant constant which represents the base of the natural logarithm function, or 2.718... This selection will display a decimal expansion of e.\
</p>";
}

Info.prototype.addFinobacci = function(){
	this.hashInfo["Fibonacci"] ="\
<p align=\"left\">\
The Fibonacci Sequence is a self generating series of numbers starting with 0 or 1. Each new number in the series is determined by the sum of the previous pair.\
</p>";
}

Info.prototype.addPascal = function(){
	this.hashInfo["Pascal"] ="\
<p align=\"left\">\
This algorithm uses Pascal's Triangle as a model for generating a series of integers derived from the sums of other integers.\
</p>";
}

//Needs checking
Info.prototype.addPhi = function(){
	this.hashInfo["Phi"] ="\
<p align=\"left\">\
Phi is known as the golden ratio. Phi is the ratio of 2 line segments (one large and one small). When the ratio of the two segments is the same as the proportions of the entire line (two segments combined) with its largest segment one finds a perfect ratio expressed 1.618xx. This infinitely long number can be found by taking the square root of 5, adding 1, and then dividing the result by 2. This selection will display a decimal expansion of Phi.\
</p>";
}

Info.prototype.addPi = function(){
	this.hashInfo["Pi"] ="\
<p align=\"left\">\
Pi is known as Archimedes' constant. Pi represents the ratio of a circle's circumference with its diameter. Pi is an infinite constant that is often expressed in the shorter form 3.14 or 22/7. This selection will display a decimal expansion of Pi.\
</p>";
}

Info.prototype.addPowers = function(){
	this.hashInfo["Powers"] ="\
<p align=\"left\">\
The Powers sequence takes each number in the set of integers and raises them to the second power (otherwise known as multiplying a number by itself. e.g. 2^2 = 2*2 = 4\
</p>";
}

Info.prototype.addSine = function(){
	this.hashInfo["Sine"] ="\
<p align=\"left\">\
The Sine function is a function of an angle, and is commonly used ro model periodic phenomena such as sound and light waves, the position and velocity of harmonic oscillators, sunlight intensity and day length, and average temperature variations throughout the year.\
</p>";
}

Info.prototype.addLogarithmic = function(){
	this.hashInfo["Logarithmic"] ="\
<p align=\"left\">\
The logarithmic compression operation is a scaling method that maps input values relative to an inverse exponential curve. The operation allows wide data spans to compress into smaller musical ranges, or visa versa.  The results will appear distorted with wider distributions of pitches in the bass and tighter distributions at the top of the musical range.  This operation was designed for input sets with large numbers like Pascal's Triangle or the Fibonacci series.\
</p>";
}

Info.prototype.addDivision = function(){
	this.hashInfo["Division"] ="\
<p align=\"left\">\
The division operation is a proportionate scaling method that maps (or normalizes) the numeric input values with a relatively even distribution throughout the designated musical range. In a simple example, when the source numbers 1,2,3 (as small, medium, and large values) are mapped to the range 1-88, they would convert to 1, 44, 88. \
</p>";
}


Info.prototype.addModulo = function(){
	this.hashInfo["Modulo"] ="\
<p align=\"left\">\
The modulo operation is a scaling method that maps input values within a cyclical pattern throughout the range you choose. In a simple example, when the source numbers 1, 2, 4, are mapped to the 3 note range 61-63, they would convert to 61, 62, 61, as the value 4 has the mod equivalent to 1 in a cyclical counting pattern: 1, 2, 3, 1, 2, 3, 1, 2, 3... (or 61,62,63,61,62,63…). \
</p>";
}

//new line not working
Info.prototype.addPitchMap = function(){
	this.hashInfo["PitchMap"] ="\
<p align=\"left\">\
These boxes indicate the range of pitches that are to be used (and heard). The range can vary from 0-88. Example ranges are,\
<br />&nbsp;Piano: 1-88\
<br />&nbsp;Flute: 39-76\
<br />&nbsp;Cello: 16-59\
</p>";
}

//new line not working
Info.prototype.addDurationMap = function(){
	this.hashInfo["durationMap"] ="\
<p align=\"left\">\
The purpose of the mapping process (called normalization) is to convert each input number into a pitch within a designated musical range.  Here the user can set the desired range for the melody.  The default range 1-88 represents the piano range with 88 keys.\
</p>";
}

Info.prototype.addSilence = function(){
	this.hashInfo["silence"] ="\
<p align=\"left\">\
Silences or \"rest,\" can be an important part of music. By adding silences, your melodic output can sound more musical. The \"value of silence:\" box allows you to translate a designated pitch number into a rest.\
</p>";
}


Info.prototype.addCustom = function(){
	this.hashInfo["Custom"] ="\
<p align=\"left\">\
Type in your own notes. Make sure they're comma-separated, and valid integer values.\
</p>";
}

Info.prototype.addPiano = function(){
	this.hashInfo["Piano"] ="\
<p align=\"left\">\
Certain instruments don't have a full pitch range. Below is the following instruments range.,\
<br />&nbsp;Piano: 1-88\
</p>";
}

Info.prototype.addDNA = function(){
	this.hashInfo["DNA"] = "\
<p align=\"left\">\
This algorithm converts a DNA sequence into a list of numbers. A DNA sequence is composed of four bases: adenine (A), thymine (T), cytosine (C), and guanine (G). The sequence can only contain the letters A, T, C, and G in either uppercase or lowercase; all non-letter characters will be ignored.    Sequences can be found from databanks: http://www.ncbi.nlm.nih.gov/  and http://genome.ucsc.edu/cgi-bin/hgGateway\
</p>";

}

Info.prototype.addRNA = function(){
	this.hashInfo["RNA"] = "\
<p align=\"left\">\
This algorithm converts a RNA sequence into a list of numbers.  A RNA sequence is composed of four bases: adenine (A), uracil (U), cytosine (C), and guanine (G). The sequence can only contain the letters A, U, C, and G in either uppercase or lowercase; all non-letter characters will be ignored.  Sequences can be found from databanks: http://www.ncbi.nlm.nih.gov/  and http://genome.ucsc.edu/cgi-bin/hgGateway\
</p>";
	
}

Info.prototype.addProtein = function(){
	this.hashInfo["Protein"] = "\
<p align=\"left\">\
This algorithm converts protein chains into a list of numbers.  The default settings are in reference to the Wimley-White whole residue octanol hydrophobicity scale (with averaging).   Proteins are made of amino acid residue chains that form organic compounds (from 20 standard amino acids).   Sequences can be found from databanks: http://www.ncbi.nlm.nih.gov/  \
</p>";
}



Info.prototype.fillHash = function(){
	this.addEConstant();
	this.addFinobacci();
	this.addInteger();
	this.addPascal();
	this.addPhi();
	this.addPi();
	this.addPowers();
	this.addSine();
	this.addLogarithmic();
	this.addDivision();
	this.addModulo();
	this.addPitchMap();
	this.addDurationMap();
	this.addSilence();
	this.addCustom();
	this.addPiano();
	this.addDNA();
	this.addRNA();
	this.addProtein();
}

information = new Info();
information.fillHash();