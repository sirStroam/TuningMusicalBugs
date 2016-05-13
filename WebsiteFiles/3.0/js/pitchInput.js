
$(document).ready(function(){
	
	// This event must be separate to clear the text box if custom is selected
	$('.pitch_input').on('change', '[id^=input_set]', function() {	
		var $parentId =  $(this).closest('div[id]');
		var $area = $parentId.find('[id^=areaPitch]');
		var $selectionBox = $parentId.find('[id^=input_set]');	
		var $selected = $selectionBox.find("option:selected");
		if($selected.text() == "Custom")
		{
			$area.val(0);
		}
	});
	

	$('.pitch_input').on('change', '[id^=input_set], [id^=note_count],[id^=areaPitch]', function() {	
//		alert("Alert 1");
		var $parentId =  $(this).closest('div[id]');
		var $countId = $parentId.find('[id^=note_count]');
		var $area = $parentId.find('[id^=areaPitch]');	
		var $selectionBox = $parentId.find('[id^=input_set]');	
		var $selected = $selectionBox.find("option:selected");
		var voiceNumber = getVoiceNumber($parentId);
		if($selected.text() == "Custom")
		{
			$area.prop("readonly", false);
			//alert("text area is editable");
		}
		else
		{
			$area.prop("readonly", true);
			//alert("text area is not editable");
		}
		tooltip($parentId);
		noteCountTest($countId);
		
		validatePanel($area, getVoiceNumber($parentId));

		var $durId = $('#dInput_set'+voiceNumber).closest('div[id]');
		var $durArea = $durId.find('[id^=dAreaMap]');
		var $durSelectionBox = $durId.find('[id^=dInput_set]');
		var $durSelection = $durSelectionBox.find("option:selected");


		call_pitch($selected.text(),$countId.val(),$area.attr('id'));
		call_pitch($durSelection.text(),$countId.val(),$durArea.attr('id'));

		updatePitchMapData($parentId,voiceNumber);

		updateTooltipVals($parentId);
		updateDurationMapTooltip($parentId);
	});
	
	
	
	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=pitchInfo]');
		var $input = $parentId.find('[id^=input_set]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}		

	function noteCountTest($countId){
		var maxNoteCount = 2000;
		var defaultCount = 24;
	
		var noteVal = $countId.val();	

		if(noteVal < 1 || noteVal > maxNoteCount){
			$countId.val(defaultCount);
		}
//		alert(noteLength);
	}

});



	
	
	

