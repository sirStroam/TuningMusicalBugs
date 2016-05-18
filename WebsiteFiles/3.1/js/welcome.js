// This is driving the site.

var voiceArray = new Array(); // voiceArray holds the voice objects that are associated with each panel.

$(document).ready(function () {    
    
    var voiceTotal = 1;
    var previousVoiceCount = voiceTotal;		// This is used with the voice change functions.

    Init(voiceArray); 							//Loads 4 voices with default data.

    CreateDefaultPanels(voiceTotal);			// This creates the panel
    LoadDefaultPanels(voiceArray, voiceTotal);	// This loads the default values into the panels
    displayImage();								// This does something.
    
    updateDefaultPitchMapTooltip(1);
    updateDefaultDurationMapTooltip(1);
	/*
		This is called whenever the voice count is changed by the the user.
	*/
	$("#welcomeChoice").change(function () 
	{
		var previousVoiceCount = voiceTotal;// Updates previousVoiceCount.
	    voiceTotal = $(this).find('option:selected').text();
		changeVoiceCount(voiceTotal, previousVoiceCount, voiceArray);// Executes voice change procedures.

		displayImage(); // This prints the little I and the pop ups from the textboxes in later panels.
	
		if($("#tabs_container").css('visibility') != "hidden")
			$("#options ul li").find("#tab").click();
			
		$(".choose-instrument").find("select").each(function() 
		{
				$(this).change();
		});
	});
        
});

/*
	This sets the values for the pop up windows initially when user goes to pitch mapping and duration mapping.
    They can see the original data set.
*/
function updateDefaultPitchMapTooltip(voiceNum) {
    var targetArea = $("#mapArea" + voiceNum);

    targetArea.popover("hide");
    targetArea.attr("data-content", "<textarea readonly>" + voiceArray[voiceNum - 1].originalPitchArray + "</textarea>");
}

function updateDefaultDurationMapTooltip(voiceNum) {
    var targetArea = $("#dMapArea" + voiceNum);

    targetArea.popover("hide");
    targetArea.attr("data-content", "<textarea readonly>" + voiceArray[voiceNum - 1].originalDurationArray + "</textarea>");
}
/*
	This is used to change the voices via CreatePanels and LoadPanels.
*/
function changeVoiceCount(voiceTotal, previousVoiceCount, voiceArray) 
{
	CreatePanels(voiceTotal, previousVoiceCount);// Creates the new panels
	LoadPanels(voiceArray, voiceTotal, previousVoiceCount);// This loads the panel after the initial creation.
}

/*
	This is used to create the default number of voices when the website is initially loaded..
*/
function CreateDefaultPanels(voiceNumber)
{
	pitchInput(voiceNumber);
	durationInput(voiceNumber);//  this creates the panel
	pitchMapping(voiceNumber);// this creates the panel
	durationMapping(voiceNumber);// this creates the panel
	scaleOptions(voiceNumber); // Initialize Scale Options Tab creates the panel
	playPanel(voiceNumber);
}
	
/*
	This is used after the Website is up and running and the user changes the number of voices.
	Two conditions are checked, if the voice number has increased or decreased.
*/
function CreatePanels(voiceTotal, previousVoiceCount)
{
	var voiceIncrementor = 1;

	if(previousVoiceCount < voiceTotal)
	{
		for(var x = previousVoiceCount; x < voiceTotal; x++)
		{
			pitchInput(+previousVoiceCount + voiceIncrementor);
			durationInput(+previousVoiceCount + voiceIncrementor);
			pitchMapping(+previousVoiceCount + voiceIncrementor);
			durationMapping(+previousVoiceCount + voiceIncrementor);// this creates the panel
			scaleOptions(+previousVoiceCount + voiceIncrementor);
			playPanel(+previousVoiceCount + voiceIncrementor);// Move this into the loop as they get completed.
			// Major Issues with playPanel, play.js
			voiceIncrementor++;
		}
	}
	else if(previousVoiceCount > voiceTotal)
	{
		for( var x = previousVoiceCount; x > voiceTotal; x--)
		{
			removeVoice(x);
		}
	}
}

/*
	Loads the panels on the initial start up of the website.
*/
function LoadDefaultPanels(voices, voiceTotal)
{
	LoadDefaultPitchInputNoteCount(voices, voiceTotal);// Found in pitchInput.js
	LoadDefaultPitchInputTextBox(voices, voiceTotal);// Found in pitchInput.js

	LoadDefaultDurationInputTextBox(voices, voiceTotal);// Found in durationInput.js

	LoadDefaultPitchMappingInputTextBox(voices, voiceTotal);// Found in pitchmapping.js
	LoadDefaultPitchMappingLowerRange(voices, voiceTotal);// Found in pitchmapping.js
	LoadDefaultPitchMappingUpperRange(voices, voiceTotal);// Found in pitchmapping.js

	LoadDefaultDurationMappingInputTextBox(voices, voiceTotal);// Found in durationmapping.js
	LoadDefaultDurationMappingLowerRange(voices, voiceTotal);// Found in durationmapping.js
	LoadDefaultDurationMappingUpperRange(voices, voiceTotal);// Found in durationmapping.js

	LoadDefaultScaleOptionInputTextBox(voices, voiceTotal);// Found in scaleOptions.js
}
    
/*
	This is used once the website is already up and running.
*/
function LoadPanels(voices, voiceTotal, previousVoiceCount)
{
	var voiceIncrementor = 1;

	if (previousVoiceCount < voiceTotal) {
		for (var x = previousVoiceCount; x < voiceTotal; x++) 
		{
			UpdateOriginalPitchArray(voiceArray[voiceIncrementor], "Sine");
	        	UpdateOriginalPitchArrayCount(voiceArray[voiceIncrementor], "Sine", 24);
	        	UpdatePitchMappingArray(voiceArray[voiceIncrementor], "Division", 1, 88);// 1 was zero

	        	voiceArray[voiceIncrementor].pitchMappingArrayLowerBound = 1;// was zero
	        	voiceArray[voiceIncrementor].pitchMappingArrayUpperBound = 88;

	        	UpdateFinalPitchArray(voiceArray[voiceIncrementor], "Chromatic", 0, 88);

	        	UpdateOriginalDurationArray(voiceArray[voiceIncrementor], "Sine");
	        	UpdateDurationMappingArray(voiceArray[voiceIncrementor], "Division", 0, 6);
	      
	        	voiceArray[voiceIncrementor].durationMappingArrayLowerBound = 0;
	        	voiceArray[voiceIncrementor].durationMappingArrayUpperBound = 6;

	        	//voiceArray[voiceIncrementor].durationMappingArray = voiceArray[voiceIncrementor].originalDurationArray;

			LoadPitchInputNoteCount(voices, +previousVoiceCount + voiceIncrementor);//Found in pitchInput.js
			LoadPitchInputTextBox(voices, +previousVoiceCount + voiceIncrementor);//Found in pitchInput.js

			LoadDurationInputTextBox(voices, +previousVoiceCount + voiceIncrementor);// Found in durationInput.js

			LoadPitchMappingLowerRange(voices, +previousVoiceCount + voiceIncrementor);// Found in pitchMapping.js
			LoadPitchMappingUpperRange(voices, +previousVoiceCount + voiceIncrementor);// Found in pitchMapping.js
			LoadPitchMappingInputTextBox(voices, +previousVoiceCount + voiceIncrementor);// Found in pitchMapping.js

			LoadDurationMappingUpperRange(voices, +previousVoiceCount + voiceIncrementor);// Found in durationMapping.js
			LoadDurationMappingLowerRange(voices, +previousVoiceCount + voiceIncrementor);// Found in durationMapping.js
			LoadDurationMappingInputTextBox(voices, +previousVoiceCount + voiceIncrementor);// Found in durationMapping.js

			LoadScaleOptionsInputTextBox(voices, +previousVoiceCount + voiceIncrementor);// Found in scaleOptions.js

			voiceIncrementor++;
		}
	}
}

/*
	Used when the voice count is decreased. Removes the panel fields. Voice Object however is maintained in memory.
*/
function removeVoice(voiceIndex) 
{
	$( ("#pitchPanel" + voiceIndex) ).remove();
	$( ("#mappingPanel" + voiceIndex) ).remove();
	$( ("#dPitchPanel" + voiceIndex) ).remove();
	$( ("#dMappingPanel" + voiceIndex) ).remove();
	$( ("#scaleOptionsPanel" + voiceIndex) ).remove();
	$( ("#voiceContainer" + voiceIndex) ).remove();
}

/*
	Code below is from the original Website. Did not refactor at this time. <---- IDeal 
*/
function displayImage(){//name could change			
	$(".full_view").each(function(){//Gives every image in the index an image 
		var $parentId = $(this)
		var $img = $parentId.find("img");
		var $modifyButton = $parentId.find("button");
		var noteCount = $("[id^=note_count]");

		//Note: "Undefined" not being checked because it does not seem to produce an error in jquery.  
		$img.attr({src:"images/info.png"});
		$img.tooltip({title:"Default",placement:"right",
		html:"true"});
		
		$modifyButton.popover({title:"Attention!",placement:"top",
		html:"true",content:"Default",trigger:"manual"});

		noteCount.tooltip({title:"Max note count is 2000. Fibonacci max note count is 47. Pascal's Triangle max note count is 561.",placement:"top"});

		initialInfo($parentId);	
	});

	popoverPitchValue();
}

function popoverPitchValue(){
	$("textarea").filter(function(){ 
		return this.id.match(/\w+apArea\d+$/);
	}).each(function(){
		var $parent= $(this).closest("div[id]");
		var $voice = $parent.find('h3');
		var targetArea;
		var $textAreaId = $parent.find("textarea").attr("id");
		var voiceCount = getVoiceNumber($parent);
		var voiceName;

		if("mapArea" === $textAreaId.substring(0,$textAreaId.length-1)){
			targetArea = "areaPitch"+voiceCount;
			voiceName = "Pitch Input";
		}	
		else{
			targetArea = "dAreaMap"+voiceCount;
			voiceName = "Duration Input";
		}
	

		$(this).popover({trigger: 'focus', title:$voice.text()+" "+voiceName,placement:"top",
		html:"true",content:"<textarea  readonly>"+$("#"+targetArea).val()+"</textarea>"});	

		$(this).tooltip({title:"Click text area",placement:"bottom"});		
	});
}


function initialInfo($parentId){
	var groupImg = $parentId.find("img");
	var imgCount = groupImg.length;
	var tooltip;

	if(imgCount > 0){
		var $currInfo = groupImg.filter(function() {
			return this.id.match(/\w+Info\d+$/);
		});

		var $selectedBox = $parentId.find("select");
		var $selected = $selectedBox.find("option:selected");

		tooltip = information.getText($selected.text());
		$currInfo.attr("data-original-title",tooltip);
	}

	if(imgCount == 3 || imgCount == 2 ){
		var $currRangeInfo = groupImg.filter(function() {
			return this.id.match(/\w+RangeImg\d+$/);
		});

		if(imgCount == 3){					
			tooltip = information.getText("PitchMap");
		}
		else
		{
			tooltip = information.getText("durationMap");
		}		

		$currRangeInfo.attr("data-original-title",tooltip);
	}


	if(imgCount > 2){
		var $silenceInfo = groupImg.filter(function() {
			return this.id.match(/silenceImg\d+$/);
		});

		tooltip = information.getText("silence");
		$silenceInfo.attr("data-original-title",tooltip);
	}
}

