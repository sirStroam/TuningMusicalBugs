//Algorithm Strategy section*******************************************************************************************************************************


//Division class
var Division = function(){
	
	this.normalize = function(data,minValue,maxValue)
	{
		var  dataShift;
		var _value = new Array();
		var dataMin = Math.min.apply(Math,data);
		var dataMax = Math.max.apply(Math,data);
		var dataRange = dataMax - dataMin;
		var newRange =  maxValue - minValue;
		var rangeScale;
		
		if(dataRange == 0){
			rangeScale = newRange / 1;
		}
		else{
			rangeScale = newRange / dataRange;
		}		
		

		for(var i=0; i< data.length; i++){
			dataShift = data[i] - dataMin;
			_value.push((Math.round(dataShift * rangeScale) + +minValue));	
		}		

		return _value;
	};	
};


//Modulo class
var Modulo = function(){
	
	this.normalize = function(data,minValue,maxValue)
	{	
		//may need a check		
		var moddedData;
		var _value = new Array();		
		var modNum = maxValue - minValue + 1;

		for(var i = 0; i < data.length; i++)
		{ 
			moddedData = parseInt(data[i] % modNum);
			if(moddedData < 0)
			{
				_value.push(maxValue + +moddedData);
			}
			else
			{
				_value.push(moddedData + +minValue);
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



