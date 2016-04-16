//Algorithm Strategy section*******************************************************************************************************************************


//Division class
var Division = function(){
	
	this.normalize = function(data,minValue,maxValue)
	{
	    var translationArray = new Array();
	    
	    var dataMin = Math.min.apply(Math, data);
	    var dataMax = Math.max.apply(Math, data);
	    
	    var keyboardDistance = Math.abs(+minValue - +maxValue);
	    var dataDistance = Math.abs(+dataMin - +dataMax);
	    
	    if (dataDistance == 0)
	    {
	        dataDistance = 1;
	    }

	    var resolution = keyboardDistance / dataDistance;

	    for (var x = 0; x < data.length; x++)
	    {
	        translationArray.push(parseInt(Math.round((Math.abs(+dataMin - +data[x]) * resolution) + +minValue) - 1));
	      
	        if(translationArray[x] < minValue)
	        {
	            translationArray[x] = minValue;
	        }

	        if(translationArray[x] > maxValue)
	        {
	            translationArray[x] = maxValue;
	        }
	    }
	
	    return translationArray;
	};
};

//Modulo class
var Modulo = function(){
	
	this.normalize = function(data,minValue,maxValue)
	{	
		var _value = new Array();		
		var modNum = +maxValue - +minValue + 1;
		
		for(var i = 0; i < data.length; i++)
		{
		    if(+data[i] < 0)
		    {
		        _value.push(parseInt(+minValue +(+data[i] * -1) % +modNum));
		    }
		    else {
		        _value.push(parseInt(+minValue + +data[i] % +modNum));
		    }
		}		
		
		return _value;
	};	
};


//Logarithmic class
var Logarithmic = function(){
	
	this.normalize = function(data,minValue,maxValue)
	{
		var dataMin = Math.min.apply(Math,data);
		var dataMax = 0.0000000001;//min number greater than zero
		var _value = new Array();		
  		  
		//scale to positives and take log
		for (var i=0; i < data.length;i++)
		{
			_value.push(Math.log(data[i] - dataMin + 1));
		}	

		
		var maxInValue = Math.max.apply(Math,_value);
		dataMax =  maxInValue < dataMax ? dataMax : maxInValue;   

		
		for (var i=0; i < _value.length;i++)
		{
			_value[i] *= (maxValue - minValue)/ dataMax;
			_value[i] = parseInt(Math.round(_value[i]) + +minValue);
		}

		return _value; 		
	};	
	
};



//End of Algorithm Strategy section***********************************************************************************************************************

//START SIMPLE FACTORY PATTERN ##############################################################################################################################

//Instantiate new object and return according to case
var NormalizeFactory = function(choosenStrategy){

	this.createNormalizer = function(choosenStrategy){
			
		switch(choosenStrategy){
			case "Division":
					return new Division();
			case "Modulo":
					return new Modulo();							
			case "Logarithmic":
					return new Logarithmic();			
		}
	
		return "Error";	
	};
};

//END SIMPLE FACTORY PATTERN ##############################################################################################################################

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//NO NEED TO MODIFY THIS SECTION
var MusicNormalize = function(){
	this.strategy="";
}; 

//The MusicAlgorithm class inherits an object
MusicNormalize.prototype = {
	//The context in which we use our different algorithms. 
	setAlgorithm: function(strategy){
		this.strategy = strategy;
	},

	normalize:function(data,minValue,maxValue){
		return this.strategy.normalize(data,minValue,maxValue);
	}	
};



var musicNormalize = new MusicNormalize();
var normalizeFactory = new NormalizeFactory();
//NO NEED TO MODIFY THIS SECTION
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


function testNormalizeScale(){
/*
	var selectedAlgorithm = algorithmFactory.createSequence("Phi");
	musicAlgorithms.setAlgorithm(selectedAlgorithm);

	var normalizeChoice = normalizeFactory.createNormalizer("Modulo");
	musicNormalize.setAlgorithm(normalizeChoice);
	
	var currData = musicAlgorithms.getValues(4);
	alert("Hello "+musicNormalize.normalize(currData,1,88));
*/	

//	musicAlgorithms.getValues(23);

/*
	var compressedObject = document.getElementById("compressType");
	alert("ha:"+compressedObject.options[compressedObject.selectedIndex].text);

*/	
//alert("ha:"+factory(compressedObject.options[algorithm.selectedIndex].text));

}
