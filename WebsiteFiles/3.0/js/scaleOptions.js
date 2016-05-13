/*ToDo
*/
$(document).ready(start);

function start(){
	$('.scale_options').on('change', '[id^=so_scale_options], [id^=so_key_options]', function() {
		$(this).parent().parent().find("select").eq(1).css({ display: "" }).prev().html("Key: ");
		//parentId = $(this).closest('div[id]')
		if($(this).val() === "Morph")
			Morph($(this).parent().parent());
		else
			doScaleOptions(getVoiceNumber($(this).closest('div[id]')));
	});
	
	// Not necessary. There should be one event in one place to avoid redundancy
	$('.pitch_mapping').on('change', '[id^=range], [id^=to],[id^=compressType]', function() {
		doScaleOptions(getVoiceNumber($(this).closest('div[id]')));
	});
	
	$(".pitch_input").on('change','[id^=input_set],[id^=note_count]',function(){
		doScaleOptions(getVoiceNumber($(this).closest('div[id]')));
	});
}

function doScaleOptions(currVoiceNum){
		var textAreaData = getDataArray($("#mapArea"+currVoiceNum));
		var $so_textArea = $('.scale_options').find('[id^=so_text_area'+currVoiceNum+']');
		var $pitchMin = $('#range'+currVoiceNum).val();
		var $pitchMax = $('#to'+currVoiceNum).val();
		var $scaleBySelection = $("#so_scale_options"+currVoiceNum).find("option:selected");
		
		// Get array based on user choice and adjust for key
		var selectedScaleArray = adjustForKey(getScaleArray($scaleBySelection.val()));
			
		// apply array to data in scale options text area
		textAreaData = createOutput(textAreaData, selectedScaleArray, $pitchMin, $pitchMax);
		mapWriteOutput($so_textArea.attr("id"),textAreaData);
	}
	
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
			case "Morph":
					return new Array(0,0,0,0,0,0,0,0,0,0,0,0);
		}
	}
	
function createOutput(textAreaData, scaleArray, pitchMin, pitchMax){
		for(var i = 0; i < textAreaData.length; i++)
		{
			if(textAreaData[i] + scaleArray[textAreaData[i] % 12] > pitchMax)
			{
				// Account for exceeding max by checking the next value down
				textAreaData[i] --;
				i --;
			}
			else if(textAreaData[i] + scaleArray[textAreaData[i] % 12] < pitchMin)
			{
				// Account for exceeding min
				textAreaData[i] ++;
				i --;
			}
			else
			{
				textAreaData[i] += scaleArray[textAreaData[i] % 12]; // this corresponds to the scale arrays
			}
		}
		return textAreaData;
	}
	
function adjustForKey(array){
		var shift = $("#so_key_options1").find("option:selected").index();
		for(var i = 0; i < shift + 4; i++) // +4 because arrays are off by 4. Needs to be shifted over eventually
		{
			var popped = array.pop();
			array.unshift(popped);	
		}
	
		return array;
	}
	

/* Dylan: Adds Morph panel to the correct voice  */
function Morph($elem) {
	// Set starting data
	setStartData($elem.find("textarea").val().split(","));
	update();
    
    // Add button to reopen morph window
    $elem.find("select").eq(1).css({ display: "none" }).prev().html("<button type='button' class='btn btn-success btn-xs' onclick='openMorph("+$elem.attr("id")+")'>Open Morph</button>");
	
	$(".morph-modal").modal("show");
	$(".morph-modal").data("voice-num", $elem.attr("id"));

	$("[data-slider]").change();
}

function openMorph(voice) {
	setStartData($(voice).find("textarea").val().split(","));
	update();
	
	$(".morph-modal").modal("show");
	$(".morph-modal").data("voice-num", voice.id);
}
