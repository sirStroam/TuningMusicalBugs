// JavaScript source code
////////////////////////////////////////////////inputs
//start global ************************************************************************************************
/*
    This may not be needed, I can't remember, but I think it is used with custom, to get the array loaded.
*/
function ParseCustomDurationData(text, voicelist) 
{
    voicelist.originalDurationArray = text.split(",");
}

/*
    Ditto for this as well.
*/
function ParseCustomPitchData(text, voicelist) 
{
    voicelist.originalPitchArray = text.split(",");
}

/*
    This is still used from the original website. It identifies what particular panel is being accessed and needs updated.
*/
function getVoiceNumber($parentId) 
{
    var $idName = $parentId.attr("id");
    return $idName.substring($idName.length - 1, $idName.length); 
}

/*
    Still intend on using this for invalid replace options in duration and pitch mapping. 
*/
function showWarning($parentId, fieldCheck, replaceValInlist, withinRange) {
    //	alert(fieldCheck+","+replaceValInlist+","+withinRange);
    var $button = $parentId.find("button");

    if (!fieldCheck) {
        $button.attr("data-content", "Please fill \"Modifications\" section with a value to modify output values.");

    }
    else {
        if (!replaceValInlist) {
            $button.attr("data-content", "The value you are replacing is not found in the output value list.");
        }


        if (!withinRange) {
            $button.attr("data-content", "Please make sure your values are within range.");
        }

    }

    $button.popover("show");
    setTimeout(function () { $button.popover("hide") }, 3500);
}

/*
    This is still intended on being used for updating tool tips.
*/
function updateTooltipVals($parent) {
    var targetArea;
    var $textArea = $parent.find("textarea");
    var $textAreaId = $textArea.attr("id");
    var voiceCount = getVoiceNumber($parent);

    if ("areaPitch" === $textAreaId.substring(0, $textAreaId.length - 1)) {
        targetArea = "mapArea" + voiceCount;
    }
    else {
        targetArea = "dMapArea" + voiceCount;
    }

    //	alert($textAreaId+","+targetArea+":"+$textArea.val());

    $("#" + targetArea).popover("hide");
    $("#" + targetArea).attr("data-content", "<textarea readonly>" + $textArea.val() + "</textarea>");
}

/*
    This method seems to have something to do with the play.js. Maybe Tyler knows about this. It looks new.
*/
function disableAllVoices(boolean) {
    var voicePanels = $('textarea,select,[id^=modify],[id^=dModify],[id^=note_count],[id^=range],[id^=to],[id^=dRange],[id^=dTo],[id^=modiAll],[id^=modiWith],[id^=dModiAll],[id^=dModiWith],.player-play');

    if (boolean) {
        voicePanels.prop('disabled', true);
    }
    else {
        voicePanels.prop('disabled', false);
    }
}
