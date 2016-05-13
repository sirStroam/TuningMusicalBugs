function updatePitchMapTooltip($parent){	
	var voiceNum = getVoiceNumber($parent);
	var $textArea =  $("#areaPitch"+voiceNum);
	var targetArea = $("#mapArea"+voiceNum);

	targetArea.popover("hide");
	targetArea.attr("data-content","<textarea readonly>"+$textArea.val()+"</textarea>");	
}

function updatePitchMapData($parentId,voiceNumber){
	var $currMapPanel = $("#mappingPanel"+voiceNumber);
	var $range = $currMapPanel.find('[id^=range]');
	var $to = $currMapPanel.find('[id^=to]');

	writeRangeOut($range.val(),$to.val(),voiceNumber);

	call_pitch_Mapping($parentId,voiceNumber); 
	call_dur_Mapping($parentId,voiceNumber);
}


$(document).ready(function(){

	$('.pitch_mapping').on('change', '[id^=range], [id^=to],[id^=compressType]', function() {
		var $parentId =  $(this).closest('div[id]');
		testRangeValues($parentId);
		printLocalMap($parentId);
		tooltip($parentId);
	});

	$('.pitch_mapping').on('click', '[id^=modify]', function() {
		var $parentId =  $(this).closest('div[id]');
		replaceValue($parentId);
	});	


	function printLocalMap($parentId){
		var currVoiceNum = getVoiceNumber($parentId);		
		var $compressChoice = $parentId.find("option:selected");
		var $range = $parentId.find('[id^=range]');
		var $to = $parentId.find('[id^=to]');
		var $currArea = $parentId.find('[id^=mapArea]');
		var normalizeChoice = normalizeFactory.createNormalizer($compressChoice.text());

		musicNormalize.setAlgorithm(normalizeChoice);
		var currData = getDataArray($("#areaPitch"+currVoiceNum));
		var transformedData = musicNormalize.normalize(currData,$range.val(),$to.val());
		mapWriteOutput($currArea.attr("id"),transformedData);
	}

	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=pitchMapInfo]');
		var $input = $parentId.find('[id^=compressType]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}

	function testRangeValues($parentId){
		var maxRange = 88;
		var $range = $parentId.find('[id^=range]');
		var $to = $parentId.find('[id^=to]');
	
		if((isNaN(parseInt($range.val())) || isNaN(parseInt($range.val()))) || 
		(($range.val() < 0) || ($to.val() < $range.val()) || ($to.val() > maxRange))){
			$range.val(1);
			$to.val(maxRange);
		}
	}
});



	
	
	

