$(document).ready(function () 
{
   
    /*
        This is triggered only when the Scale Option is changed.
    */
    $('.scale_options').on('change', '[id^=so_scale_options]', function () 
    {
        var ModificationArray = new Array();// Due to previous solution, this is used to modify the FinalPitchArray.

        var $panel = $(this).closest('div[id]');// This gets the current panel.
        var $TextBox = $panel.find('[id^=so_text_area]');// This gets the current panel's textbox.

        var $ScaleOption = $panel.find('[id^=so_scale_options]');// This gets the scale selection drop down menu.
        var $SelectedScale = $ScaleOption.find("option:selected");// This gets the current data from the scale drop down menu.

        var $KeyOption = $panel.find('[id^=so_key_options]');// This gets the location of the Key drop down menu.
        var $SelectedKey = $KeyOption.find("option:selected");// This gets the current data from the key drop down menu.
        
        var voiceNumber = getVoiceNumber($panel);// Located in WebsiteFunctions.js
        var $keyLabel = $panel.find('[id^=scaleKeyLabel]')

        if($SelectedScale.text() == "Morph")
        {
            addMorphButton($(this).parent().parent());
            changeKeyToSong($KeyOption, $keyLabel);
        }
        else if($SelectedScale.text() != "Morph")
        {
            ModificationArray = adjustForKey(getScaleArray($SelectedScale.val()),voiceNumber);
            voiceArray[voiceNumber - 1].FinalPitchArray = createOutput(voiceArray[voiceNumber - 1].pitchMappingArray, ModificationArray, voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);
           
            $TextBox.val(voiceArray[voiceNumber - 1].FinalPitchArray);

			removeMorphButton($(this).parent().parent());
			changeSongToKey($KeyOption, $keyLabel);
        }
    });

    /*
        This is triggered only when Key is changed.
    */
    $('.scale_options').on('change', '[id^=so_key_options]', function () 
    {
        var ModificationArray = new Array();

        var $panel = $(this).closest('div[id]');
        var $TextBox = $panel.find('[id^=so_text_area]');

        var $ScaleOption = $panel.find('[id^=so_scale_options]');
        var $SelectedScale = $ScaleOption.find("option:selected");

        var $KeyOption = $panel.find('[id^=so_key_options]');
        var $SelectedKey = $KeyOption.find("option:selected");

        var voiceNumber = getVoiceNumber($panel);
        
        ModificationArray = adjustForKey(getScaleArray($SelectedScale.val()),voiceNumber);
        voiceArray[voiceNumber - 1].FinalPitchArray = createOutput(voiceArray[voiceNumber - 1].pitchMappingArray, ModificationArray, voiceArray[voiceNumber - 1].pitchMappingArrayLowerBound, voiceArray[voiceNumber - 1].pitchMappingArrayUpperBound);

        $TextBox.val(voiceArray[voiceNumber - 1].FinalPitchArray);
    });

});

/*
	This function changes the key selection to song selection for morph.
*/
function changeKeyToSong($keyOption, $keyLabel)
{
	$keyLabel.text("Song:");

	$keyOption.empty();
    $keyOption.append($("<option>Beethoven's 9th</option>"));
    $keyOption.append($("<option>Sibelius' Finlandia</option>"));
}

/*
	This function changes the song selection to key selection for normal scale adjustments.
*/
function changeSongToKey($keyOption, $keyLabel)
{
	$keyLabel.text("Key:");
	
	$keyOption.empty();		
	$keyOption.append($("<option>C</option>"));
	$keyOption.append($("<option>C&#9839;/D&#9837;</option>"));
	$keyOption.append($("<option>D</option>"));
	$keyOption.append($("<option>D&#9839;/E&#9837;</option>"));
	$keyOption.append($("<option>E</option>"));
	$keyOption.append($("<option>F</option>"));
	$keyOption.append($("<option>F&#9839;/G&#9837;</option>"));
	$keyOption.append($("<option>G</option>"));
	$keyOption.append($("<option>G&#9839;/A&#9837;</option>"));
	$keyOption.append($("<option>A</option>"));
	$keyOption.append($("<option>A&#9839;/B&#9837;</option>"));
	$keyOption.append($("<option>B</option>"));
}

/*
    This adds the morph button.
*/
function addMorphButton($elem) 
{
	// Add morph button
    $elem.find("select").eq(1).next().replaceWith("<button type='button' class='btn btn-success btn-xs' onclick='openMorph("+$elem.attr("id")+")'>Open Morph</button>");
}

/*
	This removes the morph button.
*/
function removeMorphButton($elem)
{
	// Add button to reopen morph window
    $elem.find("select").eq(1).next().replaceWith("<label>Output:</label>");
}

/*
    This is used to return the array that will be used to offset the keys per scale. Maintained from the previous version.
*/
function getScaleArray(choice){
		// All arrays are off by 3. Should be fixed eventually
		switch(choice){
			case "Blues":
					return new Array(0,2,1,0,1,0,0,0,-1,1,0,1);
			case "Chromatic":
					return new Array(0,0,0,0,0,0,0,0,0,0,0,0);							
			case "Major":
					return new Array(0,1,0,1,0,0,1,0,1,0,1,0);
			case "Minor":
					return new Array(0,1,0,0,1,0,1,0,0,-1,0,1);
			case "Pentatonic1":
					return new Array(0,1,0,1,0,-1,1,0,1,0,-1,1);
			case "Pentatonic2":
					return new Array(0,-1,1,0,1,0,1,0,-1,1,0,1);
			case "Whole Tone":
					return new Array(0,1,0,1,0,1,0,1,0,1,0,1);
			case "Octatonic":
		            return new Array(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1);
		    	case "Messiaen Mode 3":
		            return new Array(0, 1, 0, 0, 2, 1, 0, 0, 0, 2, 1, 0);
		    	case "Messiaen Mode 4":
		            return new Array(0, 0, 0, 2, 1, 0, 0, 0, 0, 2, 1, 0);
		    	case "Messiaen Mode 5":
		            return new Array(0, 0, 3, 2, 1, 0, 0, 0, 3, 2, 1, 0);
		    	case "Messiaen Mode 6":
		            return new Array(0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0);
			case "Morph":
					return new Array(0,0,0,0,0,0,0,0,0,0,0,0);
		}
	}

/*
    A helper method for changing the final array to suit users choice of scale. Maintained from the previous version.
*/
function createOutput(textAreaData, scaleArray, pitchMin, pitchMax) {
    var tempArray = new Array();
    for (var x = 0; x < textAreaData.length; x++)
    {
        tempArray.push(parseInt(textAreaData[x]));
    }
		for(var i = 0; i < tempArray.length; i++)
		{
			if(parseInt(tempArray[i])!==0)
			{
				if(tempArray[i] + scaleArray[tempArray[i] % 12] > pitchMax)
				{
					// Account for exceeding max by checking the next value down
					tempArray[i] --;
					i --;
				}
				else if(tempArray[i] + scaleArray[tempArray[i] % 12] < pitchMin)
				{
					// Account for exceeding min
					tempArray[i] ++;
					i --;
				}
				else
				{
					tempArray[i] += scaleArray[tempArray[i] % 12]; // this corresponds to the scale arrays
				}
			}
		}
		return tempArray;
	}
	
/*
    This is used to modifiy the final array. Maintained from the previous version.
*/
function adjustForKey(array, voiceValue){

    var shift = $("#so_key_options" + voiceValue).find("option:selected").index();
   
    for (var i = 0; i < shift + 4; i++) // +4 because arrays are off by 4. Needs to be shifted over eventually
		{
			var popped = array.pop();
			array.unshift(popped);	
		}
	
		return array;
	}

/*
    This is used for the initialization.
*/
function LoadDefaultScaleOptionInputTextBox(voices, voiceTotal) {
    $('[id^=scaleOptionsPanel1]').ready(function () {
        var $panel = $(this);
        var $NoteTextField = $panel.find('[id^=so_text_area1]');
        $NoteTextField.val(voices[voiceTotal - 1].FinalPitchArray);
    });
}

/*
    This is called when changes have occured in pitchmapping or pitchinput.js
*/
function GetCurrentSelectedScale(voiceNumber) {
    var algorithm = "";
    if (voiceNumber == 1) {
        $('[id^=scaleOptionsPanel1]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=so_scale_options1]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 2) {
        $('[id^=scaleOptionsPanel2]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=so_scale_options2]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 3) {
        $('[id^=scaleOptionsPanel3]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=so_scale_options3]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 4) {
        $('[id^=scaleOptionsPanel4]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=so_scale_options4]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    return algorithm;
}

/*
    This Loads the text box from pitchInput and pitchMapping when data is changed.
*/
function LoadScaleOptionsInputTextBox(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=scaleOptionsPanel1]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=so_text_area1]');
            $NoteTextField.val(voices[voiceTotal - 1].FinalPitchArray);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=scaleOptionsPanel2]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=so_text_area2]');
            $NoteTextField.val(voices[voiceTotal - 1].FinalPitchArray);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=scaleOptionsPanel3]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=so_text_area3]');
            $NoteTextField.val(voices[voiceTotal - 1].FinalPitchArray);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=scaleOptionsPanel4]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=so_text_area4]');
            $NoteTextField.val(voices[voiceTotal - 1].FinalPitchArray);
        });
    }
}

/*
	This is the Website panel GUI.
*/
function scaleOptions(numberOfVoice) {
    var voiceCount = numberOfVoice;
        var $voice = "\
		<div id='scaleOptionsPanel"+ voiceCount + "' class='full_view well well-sm'>\
			<fieldset>\
				<legend><h3>Voice "+ voiceCount + "</h3></legend>\
				<label>Scale By:</label>\
				<select id='so_scale_options"+ voiceCount + "'>\
					<option>Chromatic</option>\
					<option>Blues</option>\
					<option>Major</option>\
					<option>Minor</option>\
					<option>Pentatonic1</option>\
					<option>Pentatonic2</option>\
					<option>Whole Tone</option>\
					<option>Octatonic</option>\
                    			<option>Messiaen Mode 3</option>\
                    			<option>Messiaen Mode 4</option>\
                    			<option>Messiaen Mode 5</option>\
                    			<option>Messiaen Mode 6</option>\
					<option>Morph</option>\
				</select>\
				<label id='scaleKeyLabel'>Key:</label>\
				<select id='so_key_options"+ voiceCount + "'>\
					<option>C</option>\
					<option>C&#9839;/D&#9837;</option>\
					<option>D</option>\
					<option>D&#9839;/E&#9837;</option>\
					<option>E</option>\
					<option>F</option>\
					<option>F&#9839;/G&#9837;</option>\
					<option>G</option>\
					<option>G&#9839;/A&#9837;</option>\
					<option>A</option>\
					<option>A&#9839;/B&#9837;</option>\
					<option>B</option>\
				</select>\
				<br /><label>Output:</label><br />\
				<textarea readonly id='so_text_area"+ voiceCount + "'></textarea>\
			</fieldset>\
		</div>\
		";
        $(".scale_options").append($voice);
}
