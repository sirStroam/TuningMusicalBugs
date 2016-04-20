//Algorithm Strategy section*******************************************************************************************************************************


//Fibonacci Sequence class
var FibonacciSequence = function(){
	
	this.getValues = function(numberOfValues)
	{	
		var maxSequence = 92;
		var _value = new Array();
		var _returnVal = new Array();
		var f_one = 0;
		var f_two = 1;		

		for(k = 1; k < maxSequence; k++){			
			_value.push(f_one); 
      		
			f_one += f_two;
			f_two = f_one - f_two;
    		}
					
		for(var i=1; i<= numberOfValues; i++){
			_returnVal.push(_value[(i-1) % _value.length]);	//The -1 to avoid if statement
		}
		
		return _returnVal;
	};	
};


//Integer Sequence class
var IntegerSequence = function(){
	
	this.getValues = function(numberOfValues)
	{	
		var _value = new Array();		

		for(k =1 ; k <= numberOfValues; k++){			
			_value.push(k-1);       		
    		}
		
		return _value;
	};	
};

//Pascal Sequence class
var PascalSequence = function(){
	
	this.getValues = function(numberOfValues)
	{	
		var _value = new Array();		
        	var row;
 		var value;
		var countDigit = 1;
      		var rowNum = findRowInPascal(numberOfValues);
	  
       		for(var i=0; i<= rowNum; i++) 
        	{           
            		row = i+1;             
            		value = 1;    
            		for(var column=0; (column <= i) && (countDigit <= numberOfValues); column++) 
            		{
				if(column > 0) 
				{
						value = value * (row - column) / column;                    
				}     
				_value.push(value); 
				countDigit++;                    
		    	   }
        	}		
		return _value; 		
	};	

	
	var findRowInPascal = function(c){
		//using formula (n*(n+1))/2 = c with quadratic frormula
		
		if(c == 0) return 0;//How will we error check
		
		var cTerm = -((c-0.5)*2);	
		var quadraticFormula = ((-1)+ Math.sqrt(1-(4*cTerm)))/2	;
		
		return Math.floor(quadraticFormula)+1;
	};
};


//Power Sequence class
var PowerSequence = function(){
	
	this.getValues = function(numberOfValues)
	{	
		var _value = new Array();		

		for(k =0 ; k < numberOfValues; k++){			
			_value.push(k*k);       		
    		}
		
		return _value;
	};	
};


//E Sequence using spigot by Stephen R. Schmitt 
var ESequence = function(){
	
	this.getValues = function(numberOfValues)
	{
		var _value = new Array();

		if(numberOfValues <1){
		 	return _value;
		}

		if(numberOfValues  == 1){
			_value.push(2);
			return _value;
		}

		_value.push(2);	
		var size = Math.floor(parseInt(numberOfValues,10) + 8);
		var N = size;
		var n;

		var a = new Array(N);
		a[0] = 0;
		a[1] = 0;
		for (i = 2; i < size; i++) a[i] = 1;

		var x = 0;
		while (N > 9)
		{
			// generate next digit
							
			for (n = N; n > 0; n--)
			{
			    a[n] = x%n;
			    x = 10*a[n-1] + Math.floor(x/n);
			}
			_value.push(x);
			N--;			
		}
		return _value;
	};	
};



//Pi Sequence using spigot  by Stephen R. Schmitt
var PiSequence = function(){

	this.getValues = function(numberOfValues)
	{
		var _value = new Array();		

		if(numberOfValues <1){
			return _value;//important to have 
		}


		var useValue = numberOfValues;	

		if (useValue % 4)
        		useValue = useValue + (4 - (useValue % 4));

		
		var size = Math.floor(useValue*14/4);
		var x = "";
		var a, b, c, d, e, g, n, m;
		var f = new Array(size + 1);
		var splitter;

		a = 10000; //base 10000 increase the speed of algorithm
		b = 1;
		c = size;
		e = 0;
				
		while (b != c)                          // init array
		{
			f[b] = Math.floor(a/5);
			b++;
		} 
		f[c] = 0;


		while (c > 0)                           // start algorithm
		{
			g = 2*c;
			d = 0;
			b = c;
			while (b > 0)                       // inner loop
			{
			    d = d + f[b]*a;
			    g = g - 1;
			    f[b] = d % g;
			    d = Math.floor(d/g);
			    g = g - 1;
			    b = b - 1;                      // decrement inner loop counter
			    if (b != 0)
				d = d*b;
			}

			c = c - 14;                         // decrement outer loop counter

			// output four digits
			x = zintstr(e +Math.floor(d/a), 4);
			
			splitter = x;
			for(var i=1; i<=4; i++){
				if(_value.length == numberOfValues) break;				 

				_value.push(splitter.substring(i,i+1));
			}
			
			e = d % a;
		}
		return _value;
	};


	// format a positive integer with leading zeroes
	var zintstr=function( num, width )
	{
	    var str = num.toString(10);
	    var len = str.length;
	    var intgr = " ";
	    var i;

	    // append leading spaces
	    for (i = 0; i < width - len; i++)
		intgr += '0';

	    // append digits
	    for (i = 0; i < len; i++)
		intgr += str.charAt(i);

	    return intgr;
	};
	
};


//Sine Sequence class
var SineSequence = function(){
	
	this.getValues = function(numberOfValues)
	{	
		var _value = new Array();
		var value;	

		for(var i=0; i<numberOfValues*11; i = i+11)
		{
			value = i * Math.PI / 180;
			value = 100*Math.sin(value);			
			_value.push(~~value);		
		}
		return _value;
	};	
};

// Used for default output with sine wave for easier listening.
var QuarterNotes = function () {
    this.getValues = function (numberOfValues) {
        var durationArray = new Array();
        for(var x = 0; x < numberOfValues; x++)
        {
            durationArray.push(0);
        }

        return durationArray;
    };
};

//Phi (Golden Ratio) Sequence class
var PhiSequence = function(){
	
	this.getValues = function(numberOfValues)
	{	
		var _value = new Array();
		
		//if a higher base used, calculation speed increase and digit count increse. 
		var base=10,b=0,c=3434,d=0,n=numberOfValues,k=0;
		var f = new Array(3435);
		
		while(b<c){
			f[b++]=1;
		}
		
		f[1] += 5;//square root 5
				
		while(n-- > 0){	
			d=0;
			k=c;
			while(--k >0){
				
				b = 10*k;
				d += f[k]*base;
				f[k] = d % b;
				d = ~~(d/b);
				d *= 2*k-1;
			}
			
			d += f[0]*base;
			_value.push(~~(d/base));
			f[0] = d%base;
		}	

		return _value;
	};	
	
};

var CustomSequence = function(){
	this.getValues = function(numberOfValues)
	{
		return new Array();
	};
};


//End of Algorithm Strategy section***********************************************************************************************************************

//START SIMPLE FACTORY PATTERN ##############################################################################################################################

//Instantiate new object and return according to case
var AlgorithmFactory = function(chosenStrategy){

	this.createSequence = function(chosenStrategy){
			
		switch(chosenStrategy){
			case "Fibonacci":
					return new FibonacciSequence();
			case "E Constant":
					return new ESequence();							
			case "Pascal":
					return new PascalSequence();
			case "Integers":
					return new IntegerSequence();
			case "Phi":
					return new PhiSequence();
			case "Pi":
					return new PiSequence();
			case "Powers":
					return new PowerSequence();
			case "Sine":
					return new SineSequence();	
			case "Custom":
					return new CustomSequence();
			case "Quarter Notes":
					return new QuarterNotes();
		}
	
		return "Error";	
	};
};

//END SIMPLE FACTORY PATTERN ##############################################################################################################################

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//NO NEED TO MODIFY THIS SECTION
var MusicAlgorithms = function(){
	this.strategy="";
}; 

//The MusicAlgorithm class inherits an object
MusicAlgorithms.prototype = {
	//The context in which we use our different algorithms. 
	setAlgorithm: function(strategy){
		this.strategy = strategy;
	},

	getValues:function(numberOfValues){
		return this.strategy.getValues(numberOfValues);
	}	
};



var musicAlgorithms = new MusicAlgorithms();
var algorithmFactory = new AlgorithmFactory();
//NO NEED TO MODIFY THIS SECTION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


function testSequence(){

	var userChoice = algorithmFactory.createSequence("Phi");
	musicAlgorithms.setAlgorithm(userChoice);
	
	
	alert("Hello "+musicAlgorithms.getValues(8));	

//	musicAlgorithms.getValues(23);

/*
	var compressedObject = document.getElementById("compressType");
	alert("ha:"+compressedObject.options[algorithm.selectedIndex].text);

	var algorithmContext = new AlgorithmContext();
	
	alert("ha:"+factory(compressedObject.options[algorithm.selectedIndex].text));
*/
}



