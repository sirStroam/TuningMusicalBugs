/*
	Retained from previous version.
*/
function updateDurationMapTooltip($parent){	
	var voiceNum = getVoiceNumber($parent);
	var $textArea =  $("#dAreaMap"+voiceNum);
	var targetArea = $("#dMapArea"+voiceNum);

	targetArea.popover("hide");
	targetArea.attr("data-content","<textarea readonly>"+$textArea.val()+"</textarea>");	
}

$(document).ready(function(){
	/*
		This is thrown when the algorithm is changed.
	*/
    $('.duration_mapping').on('change', '[id^=dCompressType]', function () {
        var $panel = $(this).closest('div[id]');
        var $TextBox = $panel.find('[id^=dMapArea]');// This gets the Text Box
        var $Algorithm = $panel.find('[id^=dCompressType]');// This locates the algorithm drop down menu.
        var $SelectedAlgorithm = $Algorithm.find("option:selected");// This gets the current algorithm
        var voiceNumber = getVoiceNumber($panel);

        voiceArray[voiceNumber - 1].durationMappingArrayAlgorithm = $SelectedAlgorithm.text();

        UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber  - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber  - 1].durationMappingArrayUpperBound);

        $TextBox.val(voiceArray[voiceNumber - 1].durationMappingArray);
        
        tooltip($panel);
    });

    /*
        Triggered if the Upper value is changed.
    */
    $('.duration_mapping').on('change', '[id^=dTo]', function () {
        var $panel = $(this).closest('div[id]');
        var $TopRange = $panel.find('[id^=dTo]');
        var $BottomRange = $panel.find('[id^=dRange]');
        var $TextBox = $panel.find('[id^=dMapArea]');
    
        var voiceNumber = getVoiceNumber($panel);

        if ($TopRange.val() > 9) 
        {
            $TopRange.val(9);
        }
        else if ($TopRange.val() < 0)
        {
        	$TopRange.val(0);	
        }
        else if ($TopRange.val() < $BottomRange.val()) 
        {
            $TopRange.val(+$BottomRange.val());
        }

        voiceArray[voiceNumber - 1].durationMappingArrayUpperBound = $TopRange.val();

        UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound);

        $TextBox.val(voiceArray[voiceNumber - 1].durationMappingArray);
    });

    /*
        Triggered if the Lower value is changed.
    */
    $('.duration_mapping').on('change', '[id^=dRange]', function () {
        var $panel = $(this).closest('div[id]');
        var $TopRange = $panel.find('[id^=dTo]');
        var $BottomRange = $panel.find('[id^=dRange]');
        var $TextBox = $panel.find('[id^=dMapArea]');

        var voiceNumber = getVoiceNumber($panel);

        if ($BottomRange.val() < 0) 
        {
            $BottomRange.val(0);
        }
        else if ($BottomRange.val() > 9)
        {
        	$BottomRange.val(9);
        }
        else if ($BottomRange.val() >= $TopRange.val()) 
        {
            $BottomRange.val(+$TopRange.val());
        }

        voiceArray[voiceNumber - 1].durationMappingArrayLowerBound = $BottomRange.val();

        UpdateDurationMappingArray(voiceArray[voiceNumber - 1], GetCurrentSelectedDurationMappingAlgorithm(voiceNumber), voiceArray[voiceNumber - 1].durationMappingArrayLowerBound, voiceArray[voiceNumber - 1].durationMappingArrayUpperBound);

        $TextBox.val(voiceArray[voiceNumber - 1].durationMappingArray);
    });

    /*
        This is triggered when the modify value is selected.
    */
    $('.duration_mapping').on('click', '[id^=dModify]', function () {
        
        var $panel = $(this).closest('div[id]');
        var $TextBox = $panel.find('[id^=dMapArea]');
        var voiceNumber = getVoiceNumber($panel);

        var $firstElement = $panel.find('[id^=dModiAll]');
        var targetElement = $firstElement.val();

        var $secondElement = $panel.find('[id^=dModiWith]');
        var candidateElement = $secondElement.val();
       
        if (DoesDurationContain(targetElement, voiceNumber)) {
            if (candidateElement == 0 || (candidateElement >= voiceArray[voiceNumber - 1].durationMappingArrayLowerBound && candidateElement <= voiceArray[voiceNumber - 1].durationMappingArrayUpperBound)) {
               	if(candidateElement == 0)
               	{
               		candidateElement = 0;
               	}
                ModifyDurationMappingArray(targetElement, candidateElement, voiceNumber);
                $TextBox.val(voiceArray[voiceNumber - 1].durationMappingArray);
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
	/*
		Retained from previous version
	*/
	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=durMapInfo]');
		var $input = $parentId.find('[id^=dCompressType]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}
});

/*
	Default init.
*/
function LoadDefaultDurationMappingUpperRange(voices, voiceTotal) {
    $('[id^=dMappingPanel1]').ready(function () {
        var $panel = $(this);
        var $UpperBound = $panel.find('[id^=dTo1]');
        $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayUpperBound);
    });
}

/*
	Default init.
*/
function LoadDefaultDurationMappingLowerRange(voices, voiceTotal) {
    $('[id^=dMappingPanel1]').ready(function () {
        var $panel = $(this);
        var $UpperBound = $panel.find('[id^=dRange1]');
        $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayLowerBound);
    });
}

/*
	Used to update the Website of the Upper range for the duration set.
*/
function LoadDurationMappingUpperRange(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=dMappingPanel1]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=dTo1]');
            $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayUpperBound);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=dMappingPanel2]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=dTo2]');
            $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayUpperBound);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=dMappingPanel3]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=dTo3]');
            $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayUpperBound);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=dMappingPanel4]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=dTo4]');
            $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayUpperBound);
        });
    }
}

/*
	Updates the website of the lower bound of the duration set.
*/
function LoadDurationMappingLowerRange(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=dMappingPanel1]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=dRange1]');
            $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayLowerBound);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=dMappingPanel2]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=dRange2]');
            $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayLowerBound);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=dMappingPanel3]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=dRange3]');
            $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayLowerBound);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=dMappingPanel4]').ready(function () {
            var $panel = $(this);
            var $UpperBound = $panel.find('[id^=dRange4]');
            $UpperBound.val(voices[voiceTotal - 1].durationMappingArrayLowerBound);
        });
    }
}

/*
	Used to modify the duration mapping when replace value is selected.
*/
function ModifyDurationMappingArray(target, candidate, voiceNumber) {
    
    for (var x = 0; x < voiceArray[voiceNumber - 1].durationMappingArray.length; x++) {
        if (voiceArray[voiceNumber - 1].durationMappingArray[x] == target) {
            voiceArray[voiceNumber - 1].durationMappingArray[x] = candidate;
        }
    }
}

/*
	Checks to see if the Duration array contians candidate value user desires to replace.
*/
function DoesDurationContain(target, voiceNumber) {
    for (var x = 0; x < voiceArray[voiceNumber - 1].durationMappingArray.length; x++) {
        if (voiceArray[voiceNumber - 1].durationMappingArray[x] == target) {
            return true;
        }
    }
    return false;
}
// may not be needed.
function LoadDurationMappingAlgorithm(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=dMappingPanel1]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dCompressType1]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].durationMappingArrayAlgorithm);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=dMappingPanel2]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dCompressType2]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].durationMappingArrayAlgorithm);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=dMappingPanel3]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dCompressType3]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].durationMappingArrayAlgorithm);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=dMappingPanel4]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dCompressType4]');// This locates the algorithm drop down menu.
            var $SelectedAlgorithm = $Algorithm.find("option:selected");
            $SelectedAlgorithm.text(voices[voiceTotal - 1].durationMappingArrayAlgorithm);
        });
    }
}

/*
	Default init.
*/
function LoadDefaultDurationMappingInputTextBox(voices, voiceTotal) {
    $('[id^=dMappingPanel1]').ready(function () {
        var $panel = $(this);
        var $NoteTextField = $panel.find('[id^=dMapArea1]');
        $NoteTextField.val(voices[voiceTotal - 1].durationMappingArray);
    });
}

function GetCurrentSelectedDurationMappingAlgorithm(voiceNumber) {
    var algorithm = "";
    if (voiceNumber == 1) {
        $('[id^=dMappingPanel1]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dCompressType1]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 2) {
        $('[id^=dMappingPanel2]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dCompressType2]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 3) {
        $('[id^=dMappingPanel3]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dCompressType3]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    else if (voiceNumber == 4) {
        $('[id^=dMappingPanel4]').ready(function () {
            var $panel = $(this);
            var $Algorithm = $panel.find('[id^=dCompressType4]');
            var $selectedAlgorithm = $Algorithm.find("option:selected");
            algorithm = $selectedAlgorithm.text();
        });
    }
    return algorithm;
}

/*
	Loads the durationMapping text box on voice change and data change.
*/
function LoadDurationMappingInputTextBox(voices, voiceTotal) {
    if (voiceTotal == 1) {
        $('[id^=dMappingPanel1]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dMapArea1]');
            $NoteTextField.val(voices[voiceTotal - 1].durationMappingArray);
        });
    }
    else if (voiceTotal == 2) {
        $('[id^=dMappingPanel2]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dMapArea2]');
            $NoteTextField.val(voices[voiceTotal - 1].durationMappingArray);
        });
    }
    else if (voiceTotal == 3) {
        $('[id^=dMappingPanel3]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dMapArea3]');
            $NoteTextField.val(voices[voiceTotal - 1].durationMappingArray);
        });
    }
    else if (voiceTotal == 4) {
        $('[id^=dMappingPanel4]').ready(function () {
            var $panel = $(this);
            var $NoteTextField = $panel.find('[id^=dMapArea4]');
            $NoteTextField.val(voices[voiceTotal - 1].durationMappingArray);
        });
    }
}

/*
	The panel itself.
*/
function durationMapping(numberOfVoice) {
    var voiceCount = numberOfVoice;
        var $voice = "\
		<div id='dMappingPanel"+ voiceCount + "' class='full_view well well-sm'>\
			<fieldset>\
				<legend><h3>Voice "+ voiceCount + "</h3></legend>\
				<label>Mapping using:</label>\
				<select id='dCompressType"+ voiceCount + "'>\
					<option>Division</option>\
					<option>Logarithmic</option>\
					<option>Modulo</option>\
				</select>\
				<img id='durMapInfo"+ voiceCount + "'> \
				<br /><label>Range:</label><input type='number' id='dRange"+ voiceCount + "' name='Range'>\
				<label>to:</label><input type='number' id='dTo"+ voiceCount + "' name='to'>\
				<img  id='dRangeImg"+ voiceCount + "'>\
            <!-- Utilities removed at client request <label id='util"+ voiceCount+"'>  Modify Input:</label>\
				<button type='button' class='btn btn-default btn-sm' data-toggle='modal' onclick='openUtilities(\"durationMapUtilityModal\",\"dMapArea\","+voiceCount+",\"durationMapUtilityBox\")'><span class='glyphicon glyphicon-wrench'></span></button><br>\
            --> <br /><label>Output:</label>\
				<textarea readonly id='dMapArea"+ voiceCount + "'></textarea>\
				<fieldset>\
					<legend>Modifications</legend>\
					<label>Replace all:</label><input type='text' id='dModiAll"+ voiceCount + "' >\
					<label>with:</label><input type='text' id='dModiWith"+ voiceCount + "'>\
					<button type='button' id='dModify"+ voiceCount + "' value='Modify'>Modify Output</button>\
				</fieldset>\
			</fieldset>\
		</div>\
		";
        $(".duration_mapping").append($voice);
}
