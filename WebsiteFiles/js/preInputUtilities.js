/*
This file contains all the functions pertaining to processing and opening utilities.
*/

var voiceNumber; //Keep track of which voice we're working with
var lastStream; //used for the undo function in sample rate, gets populated after each call to a sample function.

/*
ACCEPT METHODS: They're all pretty much the same. They send the text back then trigger the proper event to update everything else.
*/
function acceptPitchInputUtilities() {
	var homeText = $("#areaPitch"+voiceNumber);
	homeText.val($("#pitchInputUtilityBox").val());

	$("#input_set"+voiceNumber).val("Custom");
	$("#areaPitch"+voiceNumber).attr('readonly', false);
	
	$("#areaPitch"+voiceNumber).trigger('change'); //Throw event that causes validation to happen.	
	$(".Utility-modal").modal("hide");
}

function acceptDurationInputUtilities() {
	var homeText = $("#dAreaMap"+voiceNumber);
	homeText.val($("#durationInputUtilityBox").val());
	$("#dInput_set"+voiceNumber).val("Custom");
	$("#dAreaMap"+voiceNumber).attr('readonly', false);
	
	$("#dAreaMap"+voiceNumber).trigger('change');	
	$(".Utility-modal").modal("hide");
}

/* MAY REIMPLEMENT, NOT USED FOR NOW
function acceptPitchMapUtilities() {
	var homeText = $("#mapArea"+voiceNumber);
	homeText.val($("#pitchMapUtilityBox").val());
	voiceArray[voiceNumber - 1].pitchMappingArray = $("#pitchMapUtilityBox").val().split(",");
	$("#to"+voiceNumber).trigger('change');
	$(".Utility-modal").modal("hide");
}

function acceptDurationMapUtilities() {
	var homeText = $("#dMapArea"+voiceNumber);
	homeText.val($("#durationMapUtilityBox").val());
	voiceArray[voiceNumber - 1].durationMappingArray = $("#durationMapUtilityBox").val().split(",");
	$("dTo"+voiceNumber).trigger('change');
	$(".Utility-modal").modal("hide");
	
}
*/

/*
END ACCEPT METHODS
*/

function openUtilities(modalID, homeID, voiceNum, utilID){

	var homeText = $("#" + homeID + "" + voiceNum); //This is the text box for the voice we're working with
	var utilText = $("#" + utilID); //This is the text box in the pop-up modal(the utility)
	
	voiceNumber = voiceNum;
	
	utilText.val(homeText.val().split(","));
	
	$("#"+modalID).modal("show");
}

/*DEPRECATED
function toggleDisplay(id){
	$(id).toggle();
} */

//Opens up the div of divID, and ensures all others are hidden in the utility
function toggleSelection(divID){
	
	if($(divID).css('display')== 'none'){
		$(".util-div").hide();
		$(divID).show();
	}
	else {
		$(divID).hide();
	}
	
	
}

/*
UTILITY FUNCTIONS - THESE DO ALL THE DATA MANIPULATION WORK
*/

function separateCharacters(textArea){
	var array = textArea.value.split('');
	textArea.value = array;
}

function addCommas(intervalID, homeTextID){
	var preData = $(homeTextID).val(); //String
	var interval = parseInt($(intervalID).val(), 10); //A number
	var array = new Array(); //what we send back
	if(interval === 1)
		array = preData.split('');
	else if(interval > 1){
		var temp = preData.split('');
		var counter = 0;
		var nextCharSet = "";
		for(var i = 0; i < temp.length; i++){
			nextCharSet += temp[i];
			counter++;
			if(counter % (interval) === 0) {
				array.push(nextCharSet);
				nextCharSet = "";
				
			}
			
			
		}
		
		if(nextCharSet !== ""){
			array.push(nextCharSet);
		}
	}
	
	
	$(homeTextID).val(array);
}

//Reverses the order of the notes. Pretty simple.
function reverseNotes(textArea) {
	var array = textArea.value.split(",");
	
	array.reverse();
	
	textArea.value = array;
}

//Executes replace, replacing any instances of target with substitute
function replace(textArea, targetTextArea, substituteTextArea){
	var content = textArea.value; //should be in string form
	var target = targetTextArea.value;
	var substitute = substituteTextArea.value;
	
	var expression = new RegExp(target, "g"); //In order to do a global replace(replace more than once) we have to use a regex

	content = content.replace(expression, substitute);

	
	textArea.value = content.split(",");

}


function undo(homeText){
homeText.value = lastStream;	
	
}


function sampleAverage(interval, text){
 var skip = parseInt(interval, 10);
 var cumSum = 0;
 var length = 0;
 var sequence = text.value.split(",");
 lastStream = sequence.slice();
 var result = [];

 for (var i = 0; i < sequence.length; i++){
	length++;
	cumSum += parseInt(sequence[i]);
	if(length % skip == 0){
		result.push(Math.round(cumSum/length));
		cumSum = 0;
		length = 0;
	}

 
 }
	if(cumSum > 0)
		result.push(Math.round(cumSum/length));
 text.value = result;
}

function sampleMedian(interval, text) {
 var skip = parseInt(interval, 10);
 var length = 0;
 var sequence = text.value.split(",");
 lastStream = sequence.slice();
 var result = [];
 
 for(var i = 0; i < sequence.length; i++){
	
	if(length !== 0 && length % skip == 0){
		result.push(parseInt(sequence[i-Math.round(length/2)], 10));
		length = 0;
	}
	length++;
 }
 
 if(length > 0)
	result.push(parseInt(sequence[sequence.length - Math.round(length/2)], 10));
 
 text.value = result;
}

function sampleActual(interval, text) {
 var skip = parseInt(interval, 10);
 var length = 0;
 var sequence = text.value.split(",");
 lastStream = sequence.slice();
 var result = [];
 
 for(var i = 0; i < sequence.length; i++){
	length++;
	
	if(length !== 0 && length % skip == 0)
		result.push(parseInt(sequence[i], 10));
		
	
 } 
 
 text.value = result;
}

function filter(textArea, rangeLowText, rangeHighText, outputTextArea){
	var content = textArea.value.split(",");
	var high = parseInt(rangeHighText.value, 10);
	var low = parseInt(rangeLowText.value, 10);

	for(var i = 0; i < content.length; i++){
		var note = parseInt(content[i], 10);
		
		if(note < low || note > high) {
			content[i] = 0;
		}
	}
	
	outputTextArea.value = content;
}



//inverts the notes around value
function invertExplicit(value, textArea){
	var array = textArea.value.split(",");
	var invertValue = parseInt(value, 10);
	
	for(var i = 0; i < array.length; i++){
	
		var dif = Math.abs(parseInt(array[i], 10)-invertValue);
		
		if(parseInt(array[i], 10) > invertValue){
			array[i] = Math.round(invertValue-dif);
		}
		else {
			array[i] = Math.round(invertValue+dif);
		}
	}
	
	textArea.value = array;
}

function multiply(value, textArea){

multValue = parseInt(value, 10);
sequence = textArea.value.split(",");

for(var i = 0; i < sequence.length; i++){
	sequence[i] = parseFloat(sequence[i]) * multValue;
}

textArea.value = sequence;

}

function floor(textArea){

 sequence = textArea.value.split(",");
 
 for(var i = 0; i < sequence.length; i++){
	sequence[i] = Math.floor(parseFloat(sequence[i]));
 }
 
 textArea.value = sequence;
}

function ceiling(textArea){
 sequence = textArea.value.split(",");
 
 for(var i = 0; i < sequence.length; i++){
	sequence[i] = Math.ceil(parseFloat(sequence[i]));
 }
 
 textArea.value = sequence;
}

function round(textArea){
 sequence = textArea.value.split(",");
 
 for(var i = 0; i < sequence.length; i++){
	sequence[i] = Math.round(parseFloat(sequence[i]));
 }
 
 textArea.value = sequence;
}


//Inverts the notes with respect to the middle value between minimum and maximum.
//That is, the minimum note should become maximum, and vice versa.
//The notes are less-affected the closer to the middle they are.
function invert(textArea) {
	var array = textArea.value.split(",");
	var max = 0;
	var min = 1000;
	var note;
	
	//Calculate middle value to invert around
	for(var i = 0; i < array.length; i++) {
		note = parseInt(array[i]);
		if(note > max)
			max = note;
			
		if(note < min)
			min = note;
	}
	
	//var mid = Math.round((max+min)/2); //everything will be inverted around this value
	var mid = (max+min)/2.0;
	for(i = 0; i < array.length; i++) {
		var dif = Math.abs(parseInt(array[i])-mid);
		if(parseInt(array[i]) > mid)
			array[i] = Math.round(mid-dif);
		else
			array[i] = Math.round(mid+dif);
	}
	
	textArea.value = array;
}
//Converts each character into its underlying ascii number
function charToNote(textArea) {
	var array = textArea.value.split(",");
	
	for(var i = 0; i < array.length; i++){
		array[i] = array[i].charCodeAt(0);
		
	}
	
	textArea.value = array;	
}
/*
END UTILITY FUNCTIONS
*/