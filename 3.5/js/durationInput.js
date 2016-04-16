
$(document).ready(function(){

    /*
        This is thrown when the user interacts with the drop down menu.
    */
	$('.duration_input').on('change', '[id^=dInput_set]', function() {	  
	    var $panel = $(this).closest('div[id]');
		var $TextBox = $panel.find('[id^=dAreaMap]');
		var $Algorithm = $panel.find('[id^=dInput_set]');	
		var $SelectedAlgorithm = $Algorithm.find("option:selected");
		var voiceNumber = getVoiceNumber($panel);
		
		voiceArray[voiceNumber - 1].originalDurationArrayAlgorithm = $SelectedAlgorithm.text();

		if($SelectedAlgorithm.text() == "Custom")
		{
		    $TextBox.prop("readonly", false);
		    $TextBox.val("");
		    
		    $TextBox.val(populateDurationCustomText(voiceArray[voiceNumber - 1].originalPitchArray.length))
		    voiceArray[voiceNumber - 1].originalDurationArray = $TextBox.val().split(",");
		    UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound);

		    LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
		}
		else if($SelectedAlgorithm.text() !=  "Custom")
		{
		    $TextBox.prop("readonly", true);

		    UpdateOriginalDurationArray(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text());
		    UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound); // This needs adjusted once duration mapping is dealt with.

		    LoadDurationMappingInputTextBox(voiceArray, voiceNumber);

		    $TextBox.val(voiceArray[voiceNumber - 1].originalDurationArray);
		}
		
		tooltip($panel);		
		updateTooltipVals($panel);
	});
	
	/*
		This function fills the durationInput textbox with the appropriate number of notes (1 by default) in order to match the number of notes in the pitch section.
	*/
	function populateDurationCustomText(noteCount) {
		var customArray = new Array();
	    for(var i = 0; i < noteCount; i++)
		{
	        customArray.push(1);
	    }
		return customArray;
		
	}
	
	/*
		This is used when custom is selected and the user is inputing values in the window.
	*/
	$('.duration_input').on('change', '[id^=dAreaMap]', function() {	 
	    var $panel = $(this).closest('div[id]');
		var voiceNumber = getVoiceNumber($panel);
		var $TextBox = $panel.find('[id^=dAreaMap]');	
	
		tooltip($panel);

		var TextData = document.getElementById($TextBox.attr('id')).value;
		var candidateArray = TextData.split(",");
	    
		if (candidateArray.length > voiceArray[voiceNumber - 1].originalPitchArray.length)
		{    
		    var DifferenceInLength = candidateArray.length - voiceArray[voiceNumber - 1].originalPitchArray.length;
		    candidateArray.length -= DifferenceInLength;

		    if (ValidateCustomData(candidateArray) == false)
		    {
		        alert("Make Sure All Data Entered Is An Integer");
		     
		        $TextBox.val(populateDurationCustomText(voiceArray[voiceNumber - 1].originalPitchArray.length));
		        voiceArray[voiceNumber - 1].originalDurationArray = $TextBox.val().split(",");
		        UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound);
		    }
		    else
		    {
		        voiceArray[voiceNumber - 1].originalDurationArray = candidateArray;
		        UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound);
		        $TextBox.val(voiceArray[voiceNumber - 1].originalDurationArray);

		        LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
		    }
		}
		else if (candidateArray.length < voiceArray[voiceNumber - 1].originalPitchArray.length)
		{
		    if (ValidateCustomData(candidateArray) == false)
		    {
		        alert("Make Sure All Data Entered Is An Integer");

		        $TextBox.val(populateDurationCustomText(voiceArray[voiceNumber - 1].originalPitchArray.length));
		        voiceArray[voiceNumber - 1].originalDurationArray = $TextBox.val().split(",");
		        UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound);
		    }
		    else
		    {
		        var DifferenceInLength = voiceArray[voiceNumber - 1].originalPitchArray.length - candidateArray.length;
		        var FillerArray = populateDurationCustomText(DifferenceInLength);
		        var OriginalArray = $TextBox.val().split(",");

		        candidateArray = OriginalArray.concat(FillerArray);
		        
		        voiceArray[voiceNumber - 1].originalDurationArray = candidateArray;
		        UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound);
		        LoadDurationMappingInputTextBox(voiceArray, voiceNumber);

		        $TextBox.val(voiceArray[voiceNumber - 1].originalDurationArray);
		    }
		}
		else
		{
		    if (ValidateCustomData(candidateArray) == false)
		    {
		        alert("Make Sure All Data Entered Is An Integer");

		        $TextBox.val(populateDurationCustomText(voiceArray[voiceNumber - 1].originalPitchArray.length))
		        voiceArray[voiceNumber - 1].originalDurationArray = $TextBox.val().split(",");
		        UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound);
		    }
		    else
		    {
		        voiceArray[voiceNumber - 1].originalDurationArray = candidateArray;
		        UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound);

		        LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
		        $TextBox.val(voiceArray[voiceNumber - 1].originalDurationArray);
		    }
		}
		updateTooltipVals($panel);
	});

	/*
		This is retained from previous version
	*/
	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=durPitchInfo]');
		var $input = $parentId.find('[id^=dInput_set]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}		
});

/*
	Updates the array when called.
*/
function UpdateDurationMappingArray(voices, algorithm, low, high) {
    var DurationMappingAlgorithm = algorithm;
    var lowerNoteBound = voices.durationMappingArrayLowerBound;
    var upperNoteBound = voices.durationMappingArrayUpperBound;

    musicNormalize.setAlgorithm(normalizeFactory.createNormalizer(DurationMappingAlgorithm));
    
    voices.durationMappingArray = musicNormalize.normalize(voices.originalDurationArray, lowerNoteBound, upperNoteBound);
}

/*
	This updates the original array when called.
*/
function UpdateOriginalDurationArray(voices, algorithm) {
    var Algorithm = algorithmFactory.createSequence(algorithm);
    musicAlgorithms.setAlgorithm(Algorithm);

    voices.originalDurationArray = musicAlgorithms.getValues(voices.originalPitchArray.length);
}

/*
	Default init.
*/
function LoadDefaultDurationInputTextBox(voices, voiceTotal) {
    $('[id^=dPitchPanel1]').ready(function () {
        var $panel = $(this);
        var $NoteTextField = $panel.find('[id^=dAreaMap1]');
        $NoteTextField.val(voices[voiceTotal - 1].originalDurationArray);
    });
}

/*
	This gets the user input data from the text field to update originalDurationArray.
*/
function GetCustomDataField(voiceNumber)
{
    var tempArray = new Array();
    if (voiceNumber == 1) {
        $('[id^=dPitchPanel1]').ready(function () {
            var $panel = $(this);
            var $TextBox = $panel.find('[id^=dAreaMap1]');
            var TextData = document.getElementById($TextBox.attr('id')).value;
            tempArray = TextData.split(",");
        });
    }
    else if (voiceNumber == 2) {
        $('[id^=dPitchPanel2]').ready(function () {
            var $panel = $(this);
            var $TextBox = $panel.find('[id^=dAreaMap2]');
            var TextData = document.getElementById($TextBox.attr('id')).value;
            tempArray = TextData.split(",");
        });
    }
    else if (voiceNumber == 3) {
        $('[id^=dPitchPanel3]').ready(function () {
            var $panel = $(this);
            var $TextBox = $panel.find('[id^=dAreaMap3]');
            var TextData = document.getElementById($TextBox.attr('id')).value;
            tempArray = TextData.split(",");
        });
    }
    else if (voiceNumber == 4) {
        $('[id^=dPitchPanel4]').ready(function () {
            var $panel = $(this);
            var $TextBox = $panel.find('[id^=dAreaMap4]');
            var TextData = document.getElementById($TextBox.attr('id')).value;
            tempArray = TextData.split(",");
        });
    }
    return tempArray;
}
/*
    This allows the pitchInput.js to acquire information form the durationInput.js panels for updating purposes.
        Note: The weird panelpitch methods inside the if stucture cannot return values.
*/
function GetCurrentSelectedDurationAlgorithm(voiceNumber)
{
    var algorithm = "";
    if (voiceNumber == 1)
    {
    	/*
    		Below is an example of the weird panelpitch method... function... whatever
    	*/
        $('[id^=dPitchPanel1]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dInput_set1]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if(voiceNumber == 2)
    {
        $('[id^=dPitchPanel2]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dInput_set2]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 3) {
        $('[id^=dPitchPanel3]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dInput_set3]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 4) {
        $('[id^=dPitchPanel4]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dInput_set4]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    return algorithm;
}

/*
    This loads the current algorithm after a voice has been deleted
*/
function LoadDurationAlgorithm(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=dPitchPanel1]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dInput_set1]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].originalDurationArrayAlgorithm);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=dPitchPanel2]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dInput_set2]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].originalDurationArrayAlgorithm);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=dPitchPanel3]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dInput_set3]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].originalDurationArrayAlgorithm);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=dPitchPanel4]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dInput_set4]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].originalDurationArrayAlgorithm);
        });
    }
}

/*
    This updates from pitchInput.js the length of the notes. Only Note Count effects this.
*/
function UpdateDurationInputTextBoxFromPitchInput(voices, voiceNumber)
{
    if(voiceNumber == 1)
    {
        $('[id^=dPitchPanel1').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dAreaMap1]');
            $NoteTextField.val(voices.originalDurationArray);
        });
    }
    else if(voiceNumber == 2)
    {
        $('[id^=dPitchPanel2').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dAreaMap2]');
            $NoteTextField.val(voices.originalDurationArray);
        });
    }
    else if (voiceNumber == 3) {
        $('[id^=dPitchPanel3').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dAreaMap3]');
            $NoteTextField.val(voices.originalDurationArray);
        });
    }
    else if (voiceNumber == 4) {
        $('[id^=dPitchPanel4').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dAreaMap4]');
            $NoteTextField.val(voices.originalDurationArray);
        });
    }
}

/*
    This is called when voices are increased and decreased
*/
function LoadDurationInputTextBox(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=dPitchPanel1]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dAreaMap1]');
            $NoteTextField.val(voices[voiceTotal - 1].originalDurationArray);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=dPitchPanel2]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dAreaMap2]');
            $NoteTextField.val(voices[voiceTotal - 1].originalDurationArray);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=dPitchPanel3]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dAreaMap3]');
            $NoteTextField.val(voices[voiceTotal - 1].originalDurationArray);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=dPitchPanel4]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dAreaMap4]');
            $NoteTextField.val(voices[voiceTotal - 1].originalDurationArray);
        });
    }

}

/*
    This is used to generate the panel.
*/
function durationInput(numberOfVoice) {
    var voiceCount = numberOfVoice;
        var $voice = "\
		<div id='dPitchPanel"+ voiceCount + "' class='full_view well well-sm'>\
			<fieldset>\
				<legend><h3>Voice "+ voiceCount + "</h3></legend>\
					<label>Input Set:</label>\
					<select id='dInput_set"+ voiceCount + "' name='inputSet' >\
					<option>Sine</option>\
					<option>Fibonacci</option>\
					<option>Integers</option>\
					<option>Pascal</option>\
					<option>Phi</option>\
					<option>Pi</option>\
					<option>Powers</option>\
					<option>E Constant</option>\
					<option>Custom</option>\
				</select>\
				<img id='durPitchInfo"+ voiceCount + "'> \
				<label>  Utilities:</label>\
				<button type='button' class='btn btn-default btn-sm' data-toggle='modal' onclick='openUtilities(\"durationInputUtilityModal\",\"dAreaMap\","+voiceCount+",\"durationInputUtilityBox\")'><span class='glyphicon glyphicon-wrench'></span></button><br>\
				<textarea readonly id='dAreaMap"+ voiceCount + "'></textarea>\
			</fieldset>\
		</div>\
		";
        $(".duration_input").append($voice);
}
