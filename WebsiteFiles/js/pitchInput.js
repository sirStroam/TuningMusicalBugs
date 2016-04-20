

$(document).ready(function()
{	
	/*
        	This function is triggered when the algorithm is changed.
    	*/
    $('.pitch_input').on('change', '[id^=input_set]', function() 
    {
        var $panel = $(this).closest('div[id]');// This gets the specific voice panel
        var $TextBox = $panel.find('[id^=areaPitch]');// This gets the Text Box
        var $Algorithm = $panel.find('[id^=input_set]');// This locates the algorithm drop down menu.
        var $SelectedAlgorithm = $Algorithm.find("option:selected");// This gets the current algorithm
        var $NoteCount = $panel.find('[id^=note_count]');
        var voiceNumber = getVoiceNumber($panel);// This identifies the specific panel that is to be effected.

        voiceArray[voiceNumber - 1].originalPitchArrayAlgorithm = $SelectedAlgorithm.text();// may not be needed.

        if($SelectedAlgorithm.text() == "Custom")
        {
            biologyDestructor($panel);

            $TextBox.prop("readonly", false);
            $TextBox.val("");

            $NoteCount.prop("readonly", true);
            $NoteCount.val(" ");
        }

        else if ($SelectedAlgorithm.text() != "Custom")
        {
            if ($SelectedAlgorithm.text() == "DNA" || $SelectedAlgorithm.text() == "RNA"|| $SelectedAlgorithm.text()=="Protein")
            {
                biologyLoader($panel);
            }
            else
            {
                biologyDestructor($panel);

                $TextBox.prop("readonly", true);
                $NoteCount.prop("readonly", false);
                
                if ($SelectedAlgorithm.text() == "Pascal")
                {
                    if($NoteCount.val() > 561)
                    {
                        $NoteCount.val(561);

                        UpdateOriginalPitchArrayCount(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text(), $NoteCount.val());
                        UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
                        UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

                        UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
                        UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);

                        UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);
                        LoadPitchMappingInputTextBox(voiceArray, voiceNumber); // found in pitchMapping.js
                        LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
                        LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

                        $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
                    }
                }
                else if ($SelectedAlgorithm.text() == "Fibonacci") {
                  
                    if ($NoteCount.val() > 47) {
                       
                        $NoteCount.val(47);

                        UpdateOriginalPitchArrayCount(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text(), $NoteCount.val());
                        UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
                        UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

                        UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
                        UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);

                        UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);
                        LoadPitchMappingInputTextBox(voiceArray, voiceNumber); // found in pitchMapping.js
                        LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
                        LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

                        $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
                    }
                }

                UpdateOriginalPitchArray(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text());
                UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
                UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

                LoadPitchMappingInputTextBox(voiceArray, voiceNumber);
                LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

                $NoteCount.val(voiceArray[voiceNumber - 1].originalPitchArray.length);
                $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);

            }
        }
        tooltip($panel);
        updatePitchMapTooltip($panel);
    });
    
    /*
        This function is called when the note count is changed.
    */
    $('.pitch_input').on('input', '[id^=note_count]', function () {
        var UpperNoteBound = 2000;
        var $panel = $(this).closest('div[id]');// This gets the specific voice panel
        var $NoteCount = $panel.find('[id^=note_count]');
        var $TextBox = $panel.find('[id^=areaPitch]');// This gets the Text Box
        var $Algorithm = $panel.find('[id^=input_set]');// This locates the algorithm drop down menu.
        var $SelectedAlgorithm = $Algorithm.find("option:selected");// This gets the current algorithm
        var voiceNumber = getVoiceNumber($panel);// This identifies the specific pane
      
        if ($NoteCount.val() > UpperNoteBound)
        {
            $NoteCount.val(UpperNoteBound);
	    
	        if ($SelectedAlgorithm.text() == "Pascal")
                {
                    if($NoteCount.val() > 561)
                    {
                        $NoteCount.val(561);

                        UpdateOriginalPitchArrayCount(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text(), $NoteCount.val());
                        UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
                        UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

                        UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
                        UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);

                        UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);
                        LoadPitchMappingInputTextBox(voiceArray, voiceNumber); // found in pitchMapping.js
                        LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
                        LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

                        $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
                    }
                }
                else if ($SelectedAlgorithm.text() == "Fibonacci") {
                  
                    if ($NoteCount.val() > 47) {
                       
                        $NoteCount.val(47);

                        UpdateOriginalPitchArrayCount(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text(), $NoteCount.val());
                        UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
                        UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

                        UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
                        UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);

                        UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);
                        LoadPitchMappingInputTextBox(voiceArray, voiceNumber); // found in pitchMapping.js
                        LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
                        LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

                        $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
                    }
                }
	    
            UpdateOriginalPitchArrayCount(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text(), $NoteCount.val());
            UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
            UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

            UpdateDurationNoteCount(voiceArray[voiceNumber - 1],voiceNumber);
            UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);
           
            UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);
            LoadPitchMappingInputTextBox(voiceArray, voiceNumber); // found in pitchMapping.js
            LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
            LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

            $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
        }
        else if($NoteCount.val() < 0)
        {
            $NoteCount.val(1);

            UpdateOriginalPitchArrayCount(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text(), $NoteCount.val());
            UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);// this needs to be updating the other panels.
            UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurerntSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);// this needs to be updating the other panels.

            UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
            UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);
            
            UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);

            LoadPitchMappingInputTextBox(voiceArray, voiceNumber);
            LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
            LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

            $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
        }
        else
        {
            if ($SelectedAlgorithm.text() == "Pascal") {
                if ($NoteCount.val() > 561) {
                    $NoteCount.val(561);

                    UpdateOriginalPitchArrayCount(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text(), $NoteCount.val());
                    UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
                    UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

                    UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
                    UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);

                    UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);
                    LoadPitchMappingInputTextBox(voiceArray, voiceNumber); // found in pitchMapping.js
                    LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
                    LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

                    $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
                }
            }
            else if ($SelectedAlgorithm.text() == "Fibonacci") {

                if ($NoteCount.val() > 47) {

                    $NoteCount.val(47);

                    UpdateOriginalPitchArrayCount(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text(), $NoteCount.val());
                    UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
                    UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

                    UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
                    UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);

                    UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);
                    LoadPitchMappingInputTextBox(voiceArray, voiceNumber); // found in pitchMapping.js
                    LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
                    LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

                    $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
                }
            }
            
            UpdateOriginalPitchArrayCount(voiceArray[voiceNumber - 1], $SelectedAlgorithm.text(), $NoteCount.val());
            UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);// this needs to be updating the other panels.
            UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);// this needs to be updating the other panels.
            
            UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);// these two are issues.
            UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);// these two are issues.
            
            $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
            UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);

            LoadPitchMappingInputTextBox(voiceArray, voiceNumber);
            LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
            LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);

            updateTooltipVals($panel);
            updateDurationMapTooltip($panel);
            updatePitchMapTooltip($panel);
        }
    });

    /*
        This is called when user types into a text box.
    */
    $('.pitch_input').on('change', '[id^=areaPitch]', function () {
            var UpperNoteLimit = 2000;
            var $panel = $(this).closest('div[id]');
            var $NoteCount = $panel.find('[id^=note_count]');
            var $TextBox = $panel.find('[id^=areaPitch]');
            var voiceNumber = getVoiceNumber($panel);

            var TextData = document.getElementById($TextBox.attr('id')).value;
            var candidateArray = TextData.split(",");

            if (candidateArray.length > UpperNoteLimit) {
                $NoteCount.val(UpperNoteLimit);
                var DifferenceInLength = candidateArray.length - UpperNoteLimit;
                candidateArray.length -= DifferenceInLength;
                if (ValidateCustomData(candidateArray) == false) {
                    alert("Make Sure All Data Entered Is An Integer");
                }
                else {
                    voiceArray[voiceNumber - 1].originalPitchArray = candidateArray;

                    UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
                    UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

                    UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
                    UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);

                    $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
                    UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);

                    LoadPitchMappingInputTextBox(voiceArray, voiceNumber);
                    LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
                    LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);
                }
            }
            else {
                if (ValidateCustomData(candidateArray) == false) {
                    alert("Make Sure All Data Entered Is An Integer");
                }
                else {
                    $NoteCount.val(candidateArray.length);
                    voiceArray[voiceNumber - 1].originalPitchArray = candidateArray;

                    UpdatePitchMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedPitchMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
                    UpdateFinalPitchArray(voiceArray[voiceNumber - 1], GetCurrentSelectedScale(voiceNumber), voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

                    UpdateDurationNoteCount(voiceArray[voiceNumber - 1], voiceNumber);
                    UpdateDurationMappingNoteCount(voiceArray[voiceNumber - 1]);

                    $TextBox.val(voiceArray[voiceNumber - 1].originalPitchArray);
                    UpdateDurationInputTextBoxFromPitchInput(voiceArray[voiceNumber - 1], voiceNumber);

                    LoadPitchMappingInputTextBox(voiceArray, voiceNumber);
                    LoadDurationMappingInputTextBox(voiceArray, voiceNumber);
                    LoadScaleOptionsInputTextBox(voiceArray, voiceNumber);
                }
            }
            updateTooltipVals($panel);
            updateDurationMapTooltip($panel);
            updatePitchMapTooltip($panel);
	})
	
	/*
		Maintained from previous version.
	*/

	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=pitchInfo]');
		var $input = $parentId.find('[id^=input_set]');		
		var $selected = $input.find("option:selected");
		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}		
});

/*
	Regex used to validate incoming user data for custom.
*/
function ValidateCustomData(userTextData)
{
    var conditional = true;
    var index = 0;
    var acceptableInput = new RegExp("[0-9]{1,}");
  
    while(conditional && index <= userTextData.length - 1)
    {
        conditional = acceptableInput.test(userTextData[index]);
        index++;
    }
    return conditional;
}

/*
	Updates the number of notes displayed if pitchmapping notes are changed.
*/
function UpdateDurationMappingNoteCount(voices)
{
    if (voices.originalPitchArray.length < voices.durationMappingArray.length)
    {
        var DifferenceInLength = voices.durationMappingArray.length - voices.originalPitchArray.length;
        voices.durationMappingArray.length -= DifferenceInLength;
    }
    else
    {
        var Algorithm = GetCurrentSelectedDurationMappingAlgorithm(voices.VoiceID);// this will pull from the duration input page.
        var LowerNoteValue = voices.durationMappingArrayLowerBound;
        var UpperNoteValue = voices.durationMappingArrayUpperBound;
        musicNormalize.setAlgorithm(normalizeFactory.createNormalizer(Algorithm));

        voices.durationMappingArray = musicNormalize.normalize(voices.originalDurationArray, LowerNoteValue, UpperNoteValue);
    }
}

/*
	Updates the number of notes displayed if pitchmapping notes are changed.
*/
function UpdateDurationNoteCount(voices, voiceNumber)
{
    if(voices.originalPitchArray.length < voices.originalDurationArray.length)
    {
        var DifferenceInLength = voices.originalDurationArray.length - voices.originalPitchArray.length;
        voices.originalDurationArray.length -= DifferenceInLength;
    }
    else
    {
        var algorithm = GetCurrentSelectedDurationAlgorithm(voiceNumber);// this will pull from the duration input page.
        if (algorithm == "Custom") {
            
            voices.originalDurationArray = GetCustomDataField(voiceNumber);
            populateDurationCustomTextInPitchInput(voices, voices.originalPitchArray.length, voices.originalDurationArray.length);
        }
        else
        {
            var Algorithm = algorithmFactory.createSequence(algorithm);
            musicAlgorithms.setAlgorithm(Algorithm);

            voices.originalDurationArray = musicAlgorithms.getValues(voices.originalPitchArray.length);
        }
   }
}

/*
	Used to update originalDurationArray and maintains previously entered values if array is increased.
*/
function populateDurationCustomTextInPitchInput(voices, newNoteCount, oldNoteCount) {
  
    for (var i = oldNoteCount; i < newNoteCount; i++) {
        voices.originalDurationArray.push(1);
    }
}

/*
	Used to load the default input values for pitch
*/
function LoadDefaultPitchInputNoteCount(voices, voiceTotal) {
    $('[id^=pitchPanel1]').ready(function () {
        var $panel = $(this);
        var $NoteCountField = $panel.find('[id^=note_count1]');
        $NoteCountField.val(voices[voiceTotal - 1].originalPitchArray.length);
    });
}

/*
	Used to update the scale options page.
*/
function UpdateFinalPitchArray(voices,scale,low,high)
{
    var Scale = scale;
    var lowerKeyboardRange = low;
    var upperKeyboardRange = high;
    var selectedScaleArray = adjustForKey(getScaleArray(Scale));
    
    voices.FinalPitchArray = createOutput(voices.pitchMappingArray, selectedScaleArray, lowerKeyboardRange, upperKeyboardRange);
}

/*
	Used to update pitchmapping.
*/
function UpdatePitchMappingArray(voices, algorithm, low, high) 
{
    var PitchMappingAlgorithm = algorithm;
    var lowerKeyboardBound = low;
    var upperKeyboardBound = high;
    musicNormalize.setAlgorithm(normalizeFactory.createNormalizer(PitchMappingAlgorithm));
  
    voices.pitchMappingArray = musicNormalize.normalize(voices.originalPitchArray, lowerKeyboardBound, upperKeyboardBound);
}

/*
	Updates the original pitch array when note count changes.
*/
function UpdateOriginalPitchArrayCount(voices, algorithm, count) {
    var Algorithm = algorithmFactory.createSequence(algorithm);
    musicAlgorithms.setAlgorithm(Algorithm);

    voices.originalPitchArray = musicAlgorithms.getValues(count);
}

/*
	Updates the array itself.
*/
function UpdateOriginalPitchArray(voices, algorithm)
{
    var Algorithm = algorithmFactory.createSequence(algorithm);
    musicAlgorithms.setAlgorithm(Algorithm);

    voices.originalPitchArray = musicAlgorithms.getValues(voices.originalPitchArray.length);
}
// below may not be needed.
function LoadPitchAlgorithm(voices, voiceTotal)
{
    if (voiceTotal == 1) {
        $('[id^=pitchPanel1]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=input_set1]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].originalPitchArrayAlgorithm);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=pitchPanel2]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=input_set2]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].originalPitchArrayAlgorithm);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=pitchPanel3]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=input_set3]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].originalPitchArrayAlgorithm);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=pitchPanel4]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=input_set4]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].originalPitchArrayAlgorithm);
        });
    }
}

/*
	This updates the website with new note count at pitch input.
*/
function LoadPitchInputNoteCount(voices, voiceTotal) {
    if (voiceTotal == 1)
    {
        $('[id^=pitchPanel1]').ready(function () {
            var $panel = $(this);
            var $NoteCountField = $panel.find('[id^=note_count1]');
            $NoteCountField.val(voices[voiceTotal - 1].originalPitchArray.length);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=pitchPanel2]').ready(function () {
            var $panel = $(this);
            var $NoteCountField = $panel.find('[id^=note_count2]');
            $NoteCountField.val(voices[voiceTotal - 1].originalPitchArray.length);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=pitchPanel3]').ready(function () {
            var $panel = $(this);
            var $NoteCountField = $panel.find('[id^=note_count3]');
            $NoteCountField.val(voices[voiceTotal - 1].originalPitchArray.length);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=pitchPanel4]').ready(function () {
            var $panel = $(this);
            var $NoteCountField = $panel.find('[id^=note_count4]');
            $NoteCountField.val(voices[voiceTotal - 1].originalPitchArray.length);
        });
    }
}

/*
	Used during init.
*/
function LoadDefaultPitchInputTextBox(voices, voiceTotal) {
    $('[id^=pitchPanel1]').ready(function () {
        var $panel = $(this);
        var $NoteTextField = $panel.find('[id^=areaPitch1]');
        $NoteTextField.val(voices[voiceTotal - 1].originalPitchArray);
    });
}

/*
	Updates the website with new data in pitch input.
*/
function LoadPitchInputTextBox(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=pitchPanel1]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=areaPitch1]');
            $NoteTextField.val(voices[voiceTotal - 1].originalPitchArray);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=pitchPanel2]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=areaPitch2]');
            $NoteTextField.val(voices[voiceTotal - 1].originalPitchArray);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=pitchPanel3]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=areaPitch3]');
            $NoteTextField.val(voices[voiceTotal - 1].originalPitchArray);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=pitchPanel4]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=areaPitch4]');
            $NoteTextField.val(voices[voiceTotal - 1].originalPitchArray);
        });
    }
}

/*
	Panel creation here.
*/
function pitchInput(numberOfVoice) {
    var voiceCount = numberOfVoice;
        var $voice = "\
		<div id='pitchPanel"+ voiceCount + "' class='full_view well well-sm'>\
			<fieldset>\
				<legend><h3>Voice "+ voiceCount + "</h3>\</legend>\
				<label for='inputSet'>Input Set:</label>\
					<select id='input_set"+ voiceCount + "' name='inputSet' >\
					<option>Sine</option>\
					<option>Fibonacci</option>\
					<option>Integers</option>\
					<option>Pascal</option>\
					<option>Phi</option>\
					<option>Pi</option>\
					<option>Powers</option>\
					<option>E Constant</option>\
                    <option>DNA</option>\
                    <option>RNA</option>\
                    <option>Protein</option>\
					<option>Custom</option>\
				</select>\
				<img id='pitchInfo"+ voiceCount + "'> \
				<label id='notes"+ voiceCount + "'>Note Count:</label>\
				<input type='text' id='note_count"+ voiceCount + "'></input>\
				<label id='util"+ voiceCount+"'>  Utilities:</label>\
				<button type='button' class='btn btn-default btn-sm' data-toggle='modal' onclick='openUtilities(\"pitchInputUtilityModal\",\"areaPitch\","+voiceCount+",\"pitchInputUtilityBox\")'><span class='glyphicon glyphicon-wrench'></span></button><br>\
                <label id='dna"+ voiceCount + "' style='display:none'>Sequence:</label>\
                <textarea id='sequence"+ voiceCount + "' style='display:none'></textarea><br>\
                <div class='panel-group' id='accordion' style='display:none'>\
                    <div class='panel panel-default'>\
                        <div class='panel-heading'>\
                            <h4 class='panel-title'>\
                                <a class='accordion-toggle' data-toggle='collapse' href='#collapseOne"+voiceCount+"'>Options</a>\
                            </h4>\
                        </div>\
                        <div id='collapseOne"+voiceCount+"' class='panel-collapse collapse in'>\
                            <div class='panel-body'>\
                                    <span><br id='A"+voiceCount+"'style='display:none'>\
                                    <label id='A"+voiceCount+"'style='display:none'>A=</label>\
                                    <input type='text' id='letterAText"+voiceCount+"'style='display:none'></input>\
                                    <label id='T"+voiceCount+"'style='display:none'>T=</label>\
                                    <input type='text' id='letterTText"+voiceCount+"'style='display:none'></input>\
                                    <label id='U"+voiceCount+"'style='display:none'>U=</label>\
                                    <input type='text' id='letterUText"+voiceCount+"'style='display:none'></input>\
                                    <label id='C"+voiceCount+"'style='display:none'>C=</label>\
                                    <input type='text' id='letterCText"+voiceCount+"'style='display:none'></input>\
                                    <label id='G"+voiceCount+"'style='display:none'>G=</label>\
                                    <input type='text' id='letterGText"+voiceCount+"'style='display:none'></input>\
                                    <ul id='panels"+voiceCount+"'style='display:none'list-style-type: 'none'>\
                                        <li><input type='radio' name='extra"+voiceCount+"' id='default"+voiceCount+"'style='display:none' checked='checked'></input>\
                                           <label id='defaultRadio"+voiceCount+"'style='display:none'>Single Bases</label></li>\
                                        <li><input type='radio' name='extra"+voiceCount+"' id='codons"+voiceCount+"'style='display:none'></input>\
                                           <label id='codonsRadio"+voiceCount+"'style='display:none'>Codons</label></li>\
                                        <li><input type='radio' name='extra"+voiceCount+"'id='duplicates"+voiceCount+"'style='display:none''></input>\
                                           <label id='countDuplicateRadio"+voiceCount+"'style='display:none'>Duplicates</label></li>\
                                        <li><button id='convert"+voiceCount+"'style='display:none'>Convert</button></li>\
                                    </ul>\
                                    <\span>\
                              </div>\
                    </div>\
                    </div>\
                </div>\
				<label>Input:</label>\
				<textarea readonly id='areaPitch"+ voiceCount + "'></textarea>\
			</fieldset>\
		</div>\
		";

        $(".pitch_input").append($voice);
}

