
/*
	Retained from previous version.
*/
function updatePitchMapTooltip($parent){	
	var voiceNum = getVoiceNumber($parent);
	var $textArea =  $("#areaPitch"+voiceNum);
	var targetArea = $("#mapArea"+voiceNum);

	targetArea.popover("hide");
	targetArea.attr("data-content","<textarea readonly>"+$textArea.val()+"</textarea>");	
}

/*
	This is how Javascript access the panel form the web page.
*/
$(document).ready(function(){
	
	/*	
    		this is called when the normalization value is changed or the range of the keyboard is changed.
    	*/
    $('.pitch_mapping').on('change', '[id^=compressType]', function ()
    {
        var $panel = $(this).closest('div[id]');
        var $TextBox = $panel.find('[id^=mapArea]');// This gets the Text Box
        var $Algorithm = $panel.find('[id^=compressType]');// This locates the algorithm drop down menu.
        var $SelectedAlgorithm = $Algorithm.find("option:selected");// This gets the current algorithm
        var voiceNumber = getVoiceNumber($panel);

        voiceArray[voiceNumber - 1].pitchMappingArrayAlgorithm = $SelectedAlgorithm.text();// This may not be needed.
        
        UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
        UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound); 

        LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);// Found in ScaleOptions.js

        $TextBox.val(voiceArray[voiceNumber - 1].pitchMappingArray);// Updates the Textbox on website.

	tooltip($panel);
    });

    /*
        Triggered if the Upper value is changed.
    */
    $('.pitch_mapping').on('change', '[id^=to]', function () {
        var $panel = $(this).closest('div[id]');
        var $TopRange = $panel.find('[id^=to]');
        var $BottomRange = $panel.find('[id^=range]');
        var $TextBox = $panel.find('[id^=mapArea]');

        var voiceNumber = getVoiceNumber($panel);

        if($TopRange.val() > 88)
        {
            $TopRange.val(88);
        }
        else if($TopRange.val() <= $BottomRange.val())
        {
            $TopRange.val(+$BottomRange.val() + 1);
        }

        voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound = $TopRange.val();

        UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);// This will need the mode from pitch mapping including the range.
        UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound); // This needs corrected once scale option is selected.

        LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

        $TextBox.val(voiceArray[voiceNumber - 1].pitchMappingArray);
    });

    /*
        Triggered if the Lower value is changed.
    */
    $('.pitch_mapping').on('change', '[id^=range]', function () {
        var $panel = $(this).closest('div[id]');
        var $TopRange = $panel.find('[id^=to]');
        var $BottomRange = $panel.find('[id^=range]');
        var $TextBox = $panel.find('[id^=mapArea]');
        var top = parseInt($TopRange.val());
        var bottom = parseInt($BottomRange.val());

        var voiceNumber = getVoiceNumber($panel);

		if ($BottomRange.val() < 0)
		{
			$BottomRange.val(0);
		}
        else if (bottom >= top)
        {
            $BottomRange.val($TopRange.val()-1);
        }

        voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound = $BottomRange.val();

        UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
        UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound); 

        LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

        $TextBox.val(voiceArray[voiceNumber - 1].pitchMappingArray);
    });

    /*
        This is triggered when the modify value is selected.
    */
	$('.pitch_mapping').on('click', '[id^=modify]', function() {
	    var $panel = $(this).closest('div[id]');
	    var $TextBox = $panel.find('[id^=mapArea]');
	    var voiceNumber = getVoiceNumber($panel);

	    var $firstElement = $panel.find('[id^=modiAll]');
	    var targetElement = $firstElement.val();
	    
	    var $secondElement = $panel.find('[id^=modiWith]');
	    var candidateElement = $secondElement.val();

	    if(DoesPitchContain(targetElement, voiceNumber))
	    {
	        if(candidateElement == 0) 
	        {
	            candidateElement = 0;
	            ModifyPitchMappingArray(targetElement, candidateElement, voiceNumber);

	            UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
	            LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

	            $TextBox.val(voiceArray[voiceNumber - 1].pitchMappingArray);
	        }
	        else if (candidateElement >= voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound && candidateElement <= voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound)
	        {
	            ModifyPitchMappingArray(targetElement, candidateElement, voiceNumber);

	            UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);// Found in pitchInput.js
	            LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

	            $TextBox.val(voiceArray[voiceNumber - 1].pitchMappingArray);
	        }
	        else {
                // go to the replace value method int websitefunctions and see how to show warning.
	        }
	    }
	    else {
            // go to the replace value method in websitefunctions and see how to show warning.
	    }
	    $firstElement.val("");
	    $secondElement.val("");
	});	

	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=pitchMapInfo]');
		var $input = $parentId.find('[id^=compressType]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}
});

/*
	Used from the initial loading of the website.
*/
function LoadDefaultPitchMappingUpperRange(voices, voiceTotal)
{
    $('[id^=mappingPanel1]').ready(function () {
        var $panel = $(this);
        var $UpperBound = $panel.find('[id^=to1]');
        $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayUpperBound);
    });
}

/*
	Loads during the init stage of the website.
*/
function LoadDefaultPitchMappingLowerRange(voices, voiceTotal) {
    $('[id^=mappingPanel1]').ready(function () {
        var $panel = $(this);
        var $UpperBound = $panel.find('[id^=range1]');
        $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayLowerBound);
    });
}

/*
	Used to update when the further voices are added.
*/
function LoadPitchMappingUpperRange(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=mappingPanel1]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=to1]');
            $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayUpperBound);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=mappingPanel2]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=to2]');
            $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayUpperBound);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=mappingPanel3]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=to3]');
            $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayUpperBound);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=mappingPanel4]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=to4]');
            $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayUpperBound);
        });
    }
}


/*
	Used When further voices are added.
*/
function LoadPitchMappingLowerRange(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=mappingPanel1]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=range1]');
            $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayLowerBound);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=mappingPanel2]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=range2]');
            $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayLowerBound);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=mappingPanel3]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=range3]');
            $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayLowerBound);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=mappingPanel4]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=range4]');
            $UpperBound.val(voices[voiceTotal - 1].pitchMappingArrayLowerBound);
        });
    }
}

/*
    Used to modify the array for pitchmapping.
*/
function ModifyPitchMappingArray(target,candidate,voiceNumber)
{
    for(var x = 0; x < voiceArray[voiceNumber - 1].pitchMappingArray.length; x++)
    {
        if(voiceArray[voiceNumber - 1].pitchMappingArray[x] == target)
        {
            voiceArray[voiceNumber - 1].pitchMappingArray[x] = candidate;
        }
    }
}

/*
	Checks for the existence of a candidate value to be changed.
*/
function DoesPitchContain(target, voiceNumber)
{
    for(var x = 0; x < voiceArray[voiceNumber - 1].pitchMappingArray.length; x++)
    {
        if(voiceArray[voiceNumber - 1].pitchMappingArray[x] == target)
        {
            return true;
        }
    }
    return false;
}

// below can go, perhaps
function LoadPitchMappingAlgorithm(voices, voiceTotal)
{
    if (voiceTotal == 1) {
        $('[id^=mappingPanel1]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=compressType1]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].pitchMappingArrayAlgorithm);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=mappingPanel2]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=compressType2]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].pitchMappingArrayAlgorithm);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=mappingPanel3]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=compressType3]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].pitchMappingArrayAlgorithm);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=mappingPanel4]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=compressType4]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].pitchMappingArrayAlgorithm);
        });
    }
}

/*
	Used to Load the text box from the init stage.
*/
function LoadDefaultPitchMappingInputTextBox(voices, voiceTotal) {
    $('[id^=mappingPanel1]').ready(function () {
        var $panel = $(this);
        var $NoteTextField = $panel.find('[id^=mapArea1]');
        $NoteTextField.val(voices[voiceTotal - 1].pitchMappingArray);
    });
}

/*
	Retrieves the current algorithm selected in pitchmapping.
*/
function GetCurrentSelectedPitchMappingAlgorithm(voiceNumber)
{
    var algorithm = "";
    if (voiceNumber == 1) {
        $('[id^=mappingPanel1]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=compressType1]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 2) {
        $('[id^=mappingPanel2]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=compressType2]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 3) {
        $('[id^=mappingPanel3]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=compressType3]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 4) {
        $('[id^=mappingPanel4]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=compressType4]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    return algorithm;
}

/*
	Used to update the pitchmapping input box when changes occur. And used when voices are increased.
*/
function LoadPitchMappingInputTextBox(voices,voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=mappingPanel1]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=mapArea1]');
            $NoteTextField.val(voices[voiceTotal - 1].pitchMappingArray);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=mappingPanel2]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=mapArea2]');
            $NoteTextField.val(voices[voiceTotal - 1].pitchMappingArray);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=mappingPanel3]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=mapArea3]');
            $NoteTextField.val(voices[voiceTotal - 1].pitchMappingArray);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=mappingPanel4]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=mapArea4]');
            $NoteTextField.val(voices[voiceTotal - 1].pitchMappingArray);
        });
    }
}

/*
	The is the GUI.
*/
function pitchMapping(numberOfVoice) {
    var voiceCount = numberOfVoice;
        var $voice = "\
		<div id='mappingPanel"+ voiceCount + "' class='full_view well well-sm'>\
			<fieldset>\
				<legend><h3>Voice "+ voiceCount + "</h3></legend>\
				<label>Mapping using:</label>\
				<select id='compressType"+ voiceCount + "'>\
					<option>Division</option>\
					<option>Logarithmic</option>\
					<option>Modulo</option>\
				</select>\
				<img id='pitchMapInfo"+ voiceCount + "'> \
				<br /><label>Range:</label><input type='number' id='range"+ voiceCount + "' name='Range'>\
				<label>to:</label><input type='number' id='to"+ voiceCount + "' name='to'>\
				<img  id='pRangeImg"+ voiceCount + "'>\
				<label>  Utilities:</label>\
				<button type='button' class='btn btn-default btn-sm' data-toggle='modal' onclick='openUtilities(\"pitchMapUtilityModal\",\"mapArea\","+voiceCount+",\"pitchMapUtilityBox\")'><span class='glyphicon glyphicon-wrench'></span></button><br>\
				<br /><label>Output:</label>\
				<textarea readonly id='mapArea"+ voiceCount + "'></textarea>\
				<fieldset>\
					<legend>Modifications</legend>\
					<label>Replace all:</label><input type='text' id='modiAll"+ voiceCount + "' >\
					<label>with:</label><input type='text' id='modiWith"+ voiceCount + "'>\
			<!--		<input name='addSilence' type='checkbox'><label>Add Silence</label>\
					<label>Value of silence:</label><input type='text' name='valueSilence' >\
					<img id='silenceImg"+ voiceCount + "'>\
			-->		<button type='button' id='modify"+ voiceCount + "' value='Modify'>Modify Output</button>\
				</fieldset>\
			</fieldset>\
		</div>\
		";
        $(".pitch_mapping").append($voice);
}
