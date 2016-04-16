
function updateDurationMapTooltip($parent){	
	var voiceNum = getVoiceNumber($parent);
	var $textArea =  $("#dAreaMap"+voiceNum);
	var targetArea = $("#dMapArea"+voiceNum);

	targetArea.popover("hide");
	targetArea.attr("data-content","<textarea readonly>"+$textArea.val()+"</textarea>");	
}


function updateDurationMappingData($durrationInputParentId,voiceNumber){
	var $parentId =  $(".duration_mapping").closest('div[id]');
	
	var $range = $parentId.find('[id^=dRange]');
	var $to = $parentId.find('[id^=dTo]');

	dWriteRangeOut($range.val(),$to.val(),voiceNumber);
	call_dur_Mapping($durrationInputParentId,voiceNumber);
	call_pitch_Mapping($durrationInputParentId,voiceNumber);
}


$(document).ready(function(){

	$('.duration_mapping').on('change', '[id^=dCompressType],[id^=dRange],[id^=dTo]', function() {	
		var $parentId =  $(this).closest('div[id]');
		testRangeValues($parentId);
		printLocalMap($parentId);
		tooltip($parentId);
	});

	$('.duration_mapping').on('click', '[id^=dModify]', function() {
		var $parentId =  $(this).closest('div[id]');
		replaceValue($parentId);
	});


	function printLocalMap($parentId){
		var currVoiceNum = getVoiceNumber($parentId);		

		var $compressChoice = $parentId.find("option:selected");
		var $range = $parentId.find('[id^=dRange]');
		var $to = $parentId.find('[id^=dTo]');
		var $currArea = $parentId.find('[id^=dMapArea]');
		var normalizeChoice = normalizeFactory.createNormalizer($compressChoice.text());//factory
		musicNormalize.setAlgorithm(normalizeChoice);
		var currData = getDataArray($("#dAreaMap"+currVoiceNum));
		var transformedData = musicNormalize.normalize(currData,$range.val(),$to.val());
		mapWriteOutput($currArea.attr("id"),transformedData);
	}

	function tooltip($parentId){
		$infoTooltip = $parentId.find('[id^=durMapInfo]');
		var $input = $parentId.find('[id^=dCompressType]');		
		var $selected = $input.find("option:selected");

		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}

	function testRangeValues($parentId){
		var $range = $parentId.find('[id^=dRange]');
		var $to = $parentId.find('[id^=dTo]');

			
		if((isNaN(parseInt($range.val())) || isNaN(parseInt($range.val()))) || 
		(($range.val() < 0) || ($to.val() < $range.val()) || ($to.val() > 9))){
			$range.val(0);
			$to.val(6);
		}
	}

});

	

