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
The Logarithmic Compression operation scales the output values into an inverse exponential curve. This step in the algorithm transforms numeric source values so that they can be interpreted as musical notes. The purpose of this process (called normalization) is to convert each number into a pitch (or note) in a designated instrument range. The range 1-88 represents the piano range with 88 keys.\
</p>";
}

Info.prototype.addDivision = function(){
	this.hashInfo["Division"] ="\
<p align=\"left\">\
The division operation is a scaling method that maps (or normalizes) the numeric output values proportionally throughout the range you choose. In a simple example, when the source numbers 1,2,3 (as small, medium, and large values) are mapped to the range 1-88, they would convert to 1, 44, 88 (as small, medium, and large values in a wider range). This step in the algorithm transforms numeric source values so that they can be interpreted as musical notes. The purpose of this process (called normalization) is to convert each number into a pitch (or note) in a designated instrument range. The range 1-88 represents the piano range with 88 keys.\
</p>";
}


Info.prototype.addModulo = function(){
	this.hashInfo["Modulo"] ="\
<p align=\"left\">\
The modulo operation is a scaling method that maps values within a cyclical pattern throughout the range you choose. In a simple example, when the source numbers 1, 2, 4, are mapped to the range 1-3, they would convert to 1, 2, 1, as the value 4 has the mod equivalent to 1 in a cyclical counting pattern: 1, 2, 3, 1, 2, 3, 1, 2,3. This step in the algorithm transforms numeric source values so that they can be interpreted as musical notes. The purpose of this process (called normalization) is to convert each number into a pitch (or note) in a designated instrument range. The range 1-88 represents the piano range with 88 keys.\
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
The duration range indicates what musical durations should be applied to the given pitches. Below is a chart with the length of the note followed by the number associated with it.\
</p>\
Whole: 8 Dotted Whole: 9\
<br />Half: 6 Dotted Half: 7\
<br />Quarter: 4 Dotted Quarter: 5\
<br />8th: 2 Dotted 8th: 3\
<br />16th: 0 Dotted 16th: 1";
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
Custom info goes here.\
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
}

information = new Info();
information.fillHash();
