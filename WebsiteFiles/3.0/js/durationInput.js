
$(document).ready(function(){


	$('.duration_input').on('change', '[id^=dInput_set]', function() {	
		var $parentId =  $(this).closest('div[id]');
		var $area = $parentId.find('[id^=dAreaMap]');
		var $selectionBox = $parentId.find('[id^=dInput_set]');	
		var $selected = $selectionBox.find("option:selected");
		if($selected.text() == "Custom")
		{
			$area.val(0);
		}
	});

	$('.duration_input').on('change', '[id^=dInput_set], [id^=dAreaMap]', function() {
		var $parentId =  $(this).closest('div[id]');
		var currVoiceNum = getVoiceNumber($parentId);
		var $area = $parentId.find('[id^=dAreaMap]');	
		var $selected = $parentId.find("option:selected");
		

		tooltip($parentId);

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

		validatePanel($area, getVoiceNumber($parentId));
		var $noteCount = getNoteCount($area);
		call_pitch($selected.text(),$noteCount,$area.attr('id'));
		var $pitId = $('#input_set'+currVoiceNum).closest('div[id]');
		var $pitArea = $pitId.find('[id^=areaPitch]');
		var $pitSelection = $pitId.find("option:selected");//.find('[id^=dInput_Set]');
		validatePanel($area, getVoiceNumber($parentId));
		call_pitch($pitSelection.text(),$noteCount,$pitArea.attr('id'));
		
		var $range = $(".duration_mapping").closest('div[id]').find('[id^=dRange]');
		var $to = $(".duration_mapping").closest('div[id]').find('[id^=dTo]');
		dWriteRangeOut($range.val(),$to.val(),currVoiceNum);
		call_dur_Mapping($(this).closest('div[id]'),currVoiceNum);
		call_pitch_Mapping($(this).closest('div[id]'),currVoiceNum);

		updateDurationMappingData($parentId,currVoiceNum);
		updateTooltipVals($parentId);
	});


	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=durPitchInfo]');
		var $input = $parentId.find('[id^=dInput_set]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}		
});



	
	
	

