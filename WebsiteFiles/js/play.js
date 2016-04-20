
//Array to hold voices  

//a boolean flag that's used for stopping playback
var stopped;
var paused = true;
var playing = false;
// probably need to delete the above, at least voiceArray....
/**
 *a basic data structure used for playback and creating midi download 
 *
 * @param pitchArray {Array} The array of pitches brought in from the Scale Options tab
 * @param durationArray {Array} The array of durations brought in from Duration Mapping
 * @param muted {boolean} a boolean flag that will be used for the eventual mute capability for play back
 * TODO: 
 * you should only process midi events if voice is not muted. Check boxes should be added to html(welcome.js' play()) for the user to click, which will set this flag to true.
 * then in makeMidiPlay() before you call playAndLight() check if the voice is muted. 
 */// uncomment class below if issue.

/****************************************************************Set Event Handlers**********************************************************************/

/**
 *Sets the onChange event Handlers for the tempo/progress slider 
 */

$("#progress").change(function () {
    setControls();
});
$("#tempo").change(function () {
    setControls();
});

/**
*Sets event handlers for play/stop/pause
*loads in midi.js framework soundfont
*/
$(function () {
    /* Play when Play button is clicked */
	$(".player-play").on("click",function(){play();} );//end play.click args
	$(".player-stop").on("click",function(){stop();} );//end stop.click args
	$(".player-pause").on("click",function(){pause();} );		
	
	//disablePlay(true);

	MIDI.loader = new widgets.Loader("Loading Instrument...");

	MIDI.loadPlugin({
	soundfontUrl: "/js/midiJs/soundfont/",
	instrument: [ "acoustic_grand_piano" ],
	onsuccess: function() {
		MIDI.loader.stop();
		disablePlay(false);
		}
	});
});

function instrumentTooltip($parentId){
		$infoTooltip = $($parentId.parentElement.parentElement).find('[id^=instrumentInfo]');
		var $input = $infoTooltip.closest('div[id]');	
		var $selected = $input.find("option:selected");
		var tooltipText = information.getText($selected.text());
	
		$infoTooltip.attr("data-original-title",tooltipText); 
	}
/****************************************************************End Set Event Handlers******************************************************************/

/****************************************************************Play Controls Handlers******************************************************************/

/**
* This function gets all the appropriate data from other tabs (using jQuery), creates voiceArray, then calls setControls() 
*/
// this is probably where I need to start working on changing this stuff. 
function getOutput() {
    
    var $voiceNum = $('#welcomeChoice option:selected').val();

    for (var i = 0; i < $voiceNum; i++) {
        var pitchArray;
        var durationArray;

        pitchArray = voiceArray[i].FinalPitchArray;
        durationArray = voiceArray[i].durationMappingArray;

        if (pitchArray != undefined && durationArray != undefined) 
        {
            if (document.getElementById('mute' + (i + 1)).checked) {
                voiceArray[i].muted = true;
            }
            else 
            {
                voiceArray[i].muted = false;
            }
        }
        else
        {
            alert("could not get voice " + $voiceNum);
        }
    }

    //set max on progress bar
    //---Kristi: set max on progress bar to the max noteCount of voices.
   
    $("#progress").attr("max", longestNoteCount(voiceArray));
    setControls();
}
/**
*This function sets all the "controls" to their default values. "Controls": the text boxes that hold our pitch and duration arrays, and the progress counter 
*/
function setDefaultControls() {
    
	unColorKeys();
    var maxProgress = $("#progress").attr("max");
    $("#counter").text("-" + " of " + maxProgress);
	var voiceCount = $('#welcomeChoice option:selected').val();
    
    for (var i = 0; i < voiceCount; i++) {
        var voiceNum = i + 1;
        var pitchArray = voiceArray[i].FinalPitchArray;
        var durationArray = voiceArray[i].durationMappingArray;
        //Setting textboxes affected by progress with empty values
        
        $("#voice" + voiceNum + "_pitch").val(pitchArray.toString());
        
        $("#voice" + voiceNum + "_curpitch").val("");
        $("#voice" + voiceNum + "_duration").val(durationArray.toString());
        $("#voice" + voiceNum + "_curduration").val("");
        $("#voice" + voiceNum + "_pitchplayed").val("");
        $("#voice" + voiceNum + "_durationplayed").val("");
    }
}

/**
*This function sets the controls according to the progress slider's current value. As well as color associated piano keys
*/
function setControls() {
   
var bpm=$("#tempo").val();
$("#bpm").text(bpm+" bpm");
var curval = parseInt($("#progress").val());
if (curval == 0) {
        setDefaultControls(voiceArray);
    } else {
        var $maxProgress = $("#progress").attr("max");
        $("#counter").text(curval + " of " + $maxProgress);
        unColorKeys();
    }
    
    var voiceCount = $('#welcomeChoice option:selected').val();
	for(i=0; i < voiceCount; i++)
	{
	    setVoiceControls(i, curval);
	}
}

/*
 *  This function lights the keys.
 */
function setVoiceControls(index,curval)
{
	var voiceNum = index + 1;
    var pitchArray = voiceArray[index].FinalPitchArray;
    var durationArray = voiceArray[index].durationMappingArray;
	colorKey(pitchArray[curval-1],voiceNum);
	
	if(pitchArray[curval - 1] < 10)
	{
		$("#voice" + voiceNum + "_curpitch").val('0' + pitchArray[curval - 1]);
	}
	else
		$("#voice" + voiceNum + "_curpitch").val(pitchArray[curval - 1]);
	if(durationArray[curval - 1] < 10)
	{
		$("#voice" + voiceNum + "_curduration").val('0' + durationArray[curval - 1]);
	}
	else
		$("#voice" + voiceNum + "_curduration").val(durationArray[curval - 1]);

	// pitchArray and durationArray should always be the same length. If not this will cause issues.
	var prePitchString = "";
    var preDurString = "";
	for(var i = curval; i < pitchArray.length; i++)
	{
		var pvalue = pitchArray[i];
		var dvalue = durationArray[i];
		if(pvalue < 10)
		{
					prePitchString = prePitchString.concat("0" + pvalue + " ");
		}// was zero before pvalue
		else 
		{
					prePitchString = prePitchString.concat(pvalue + " ");
		}
		
		if(dvalue < 10)
		{
					preDurString = preDurString.concat("0" + dvalue + " ");
		}// was zero before dvalue
		else 
		{
					preDurString = preDurString.concat(dvalue + " ");
		}
	}

    $("#voice" + voiceNum + "_pitch").val(prePitchString);	
    $("#voice" + voiceNum + "_duration").val(preDurString);
	
	if (curval - 1 > 0) 
    {
        var postPitchString = "";
        var postDurString = "";
		for(var i = 0; i < curval - 1; i++)
		{
			var pvalue = pitchArray[i];
			var dvalue = durationArray[i];
			if(pvalue < 10)
			{
						postPitchString = postPitchString.concat("0" + pvalue + " ");
			}
			else 
			{
						postPitchString = postPitchString.concat(pvalue + " ");
			}
					
			if(dvalue < 10)
			{
						postDurString = postDurString.concat("0" + dvalue + " ");
			}
			else 
			{
						postDurString = postDurString.concat(dvalue + " ");
			}

		}
        $("#voice" + voiceNum + "_pitchplayed").val(postPitchString);
        $("#voice" + voiceNum + "_durationplayed").val(postDurString);
    } 
    else
	{
        $("#voice" + voiceNum + "_pitchplayed").val("");
        $("#voice" + voiceNum + "_durationplayed").val("");
	}
}

/**
* This function sets all keys back to their default colors
*/
function unColorKeys()
{ //console.log("unColor called");
	$(".keyWhite").css("background","white");
	$(".keyBlack").css("background","black");
}
/**
* @param note {integer} the note on the keyboard to be colored
* @param voiceNum {integer} the index of voiceArray that is the voice the note belongs to
* This function colors the note passed in's associated key on the keyboard with the voiceNum's associated color
*/
function colorKey(note, voiceNum)
{
	if(voiceArray[voiceNum - 1].muted != true)
	{
   		if(voiceNum==1)
   		{
       		 $("#"+note).css("background","#ee5f5b");
        		//console.log("changing " + note+" to red");
    		}
    		else if(voiceNum==2)
    		{
        		$("#"+note).css("background","#5bc0de");
        		//console.log("changing " + note+" to blue");
    		}
    		else if(voiceNum==3)
    		{
    		    $("#"+note).css("background","#62c462");
    		}
    		else if(voiceNum==4)
    		{
        		$("#"+note).css("background","#fbb450");
    		}
	}
}



/****************************************************************End Play Controls Handlers**************************************************************/

/****************************************************************MIDI Download Handlers*******************************************************************/
/**
*This function sends the string created in createMidi() to the server for download creation using midi.class.php, 
*the submit() handler is set to createMidi.php so see both for how this works 
*
*/

function downloadMidi()
{
	createMidi("MTC");
	document.forms['download'].submit();
}
/**
*
*@param type {String} The type of time division. "MTC" is supported. The "SMPTE" durations aren't correct 
*This method creates a string that will be sent to the server to create a MIDI file for download.(see createMidi.php, and midi.class.php)
*It starts by setting the header data with format 0, trackCount to 1(overwritten in midi.class.php), and time division. 
*Then it creates a header Track to define the Time Signature and Tempo. 
*Then it iterates through the voiceArray and calls createTrack for each voice, and adds the resulting string to the overall midi data.	
*After iterating through voice Array it takes the whole string and puts in in the hidden "download" form.  
*/
function createMidi(type)
{
	//add 20 to current pitch values
	var channel=1;
	//get tempo
	var tempo=$("#tempo").val();
	// get voice amount
	var voiceNum = $('#welcomeChoice option:selected').val();
	//alert("bpm set at: "+ tempo);
	var microTempo=60000000/tempo;
	
	var division=480;
	if(type=='MTC')
	division=24
	
	var basedata = 'MFile 0 1 '+division+'|MTrk|0 TimeSig 4/4 24 8|0 Tempo '+microTempo+'|0 Meta TrkEnd|TrkEnd';
	var basedataArray=basedata.split('|');
	
	var mididata;
	 mididata =basedataArray.join('\r\n');
	for(i=0; i<voiceNum;i++)
	{
		var track=createTrack(basedataArray,voiceArray[i], i+1, microTempo, type);
		mididata=mididata+'\r\n'+track;
	}
	//console.log(mididata);
	document.forms['download'].notedata.value=mididata; 




	
}
//creates a track from pitchArray and adds it to the basedataArray, channel is the channel the track plays on(voice number)
function createTrack( basedataArray, voice,channel,microTempo,type)
{
	var nThisDuration;
	var nowDur = 0;
	var pitchArray = voice.FinalPitchArray;
	var durationArray = voice.durationMappingArray;
	var midiNotes = new Array(pitchArray.length);

	// get instrument string
	var trackdata = 'MTrk' //|0 Meta Text "'+voice.instrumentString+'"|0 ParCh='+channel+' p='+voice.instrument+' v=120';
	var trackdataArray = trackdata.split('|');
		
	for(var i=0; i < midiNotes.length; i++)
	{
		midiNotes[i] = pitchArray[i]+20;
		if (isNaN(midiNotes[i])) 
		{ 
			alert('note ' + i + ' is invalid. Notes must be integers.');
			return; 
		}
		if ((midiNotes[i]<0) || (midiNotes[i]>=127)) 
		{ 
			alert('note ' + midiNotes[i]+"= "+"midiNotes[" +i+"]"+ ' is invalid. Notes must be valid midi notes between 0 and 127.'); 
			return; 
		}
		
		if (type=="MTC")
			nThisDuration=getMidiClocks(durationArray[i]);
		else //SMPTE event time division
			nThisDuration= (1 << durationArray[i])*24;
		
		if (isNaN(nThisDuration)) 
		{ 
			alert('duration ' + i + ' is invalid. must be integer.'); 
			return; 
		}
		
		if (midiNotes[i] > 20)
		{
			//Add to the MIDI data an "On" event
			trackdataArray.push(nowDur +' On ch='+channel+ ' n='+midiNotes[i]+ ' v=120');			
			//Add to the MIDI data an "Off" event
			trackdataArray.push(nowDur + 6  +' Off ch='+channel+' n='+midiNotes[i]+ ' v=120');
		}
		nowDur += 6; // Increment a 16th note
	}
	trackdataArray.push(nowDur +' Meta TrkEnd');
	trackdataArray.push('TrkEnd');
	return trackdataArray.join('\r\n');
}


/****************************************************************End MIDI Download Handlers**************************************************************/

/****************************************************************Player Handlers*************************************************************************/

/*
 *  Note: paused = true  when not paused.
 *	      paused = false when actually paused.
 */
function makeMidiPlay() 
{
	var maxNoteCount = longestNoteCount(voiceArray);
	var voiceNum = $('#welcomeChoice option:selected').val();	
	var voiceProgress = 0;

	(function playR()
	{
		tempo=parseInt($("#tempo").val());
		setTimeout(function()
		{   
			if( (voiceProgress < maxNoteCount) && (paused) )
			{
				for(currentVoice = 0; currentVoice < voiceNum; currentVoice++)
				{    
				    if (!stopped)
				    {
				        if (voiceArray[currentVoice].muted != true) 
				        {
				            playAndLight(voiceProgress, currentVoice);
				        }
					}
					else // Player stopped. Stop playing.
					{
						return;
					}
				}
				playR();
			}
			else if(!paused) // If paused
			{   
				playR();
			}
			else // If not paused 
			{
				disableAllVoices(false);
				playing = false;
			}

			if(paused) // If not paused.
			{
				voiceProgress++;
			}		

		},(125)/(tempo/120));
	})();
}

function playAndLight(i, currentVoice) {
   
    var duration = (getMidiClocks(voiceArray[currentVoice].durationMappingArray[i]) / 24);
    var note = voiceArray[currentVoice].FinalPitchArray[i] + 20;
    var pos = i;
    
	if(!stopped)
	{
		MIDI.noteOn(currentVoice, note, 120, 0);
		MIDI.noteOff(currentVoice,note, duration);

		incrementControls(pos);
		pos++;
	}
}


function play()
{
	if(!paused){		
		paused = true;
		$(".player-pause").prop('disabled',false);
		$(".player-play").prop('disabled',true);
	}
	else{
		if(!playing){
			disableAllVoices(true);
			stopped=false;
			playing = true;
			makeMidiPlay();	
		}
	}
}

function pause()
{
	if(playing){
		paused = false;
		$(".player-pause").prop('disabled',true);
		$(".player-play").prop('disabled',false);
	}
}

function stop()
{
	turnNotesOff();
	disableAllVoices(false);
	stopped=true;
	paused = true;
	$("#progress").val(0);
	playing = false;
	$(".player-pause").prop('disabled',false);
	setDefaultControls();
		
}
/****************************************************************End Player Handlers**********************************************************************/

/****************************************************************Helper Functions*************************************************************************/
function turnNotesOff()
{
 var $voiceNum = $('#welcomeChoice option:selected').val();
   
    for (var i = 1; i <= $voiceNum; i++) {MIDI.noteOff(i,0,0);}
}

function disablePlay(boolean) {
	if(boolean)
		$(".play").find("input,select,button").prop('disabled', true);
	else
		$(".play").find("input,select,button").prop('disabled', false);
}



function muteTrack(elem) {
    
		var $this = elem;
		var voiceNum = parseInt($this.attr("id").slice(-1), 10);
		
		if($this.is(":checked"))
		{
			voiceArray[voiceNum - 1].muted = true;
			$this.parent().parent().addClass("muted");
		}
		else {
			voiceArray[voiceNum - 1].muted = false;
			$this.parent().parent().removeClass("muted");
		}
}


function selectInstrument(voiceNum) 
{
	var selected = $(".instrument"+voiceNum+"").prop("selectedIndex");
	var voice = voiceNum;
	var instrument = 0;
	var instrumentName;
	var selectedString=$(".instrument"+voiceNum);

	switch(selected)
	{			
		case 0: // Piano
			instrument = 0;
			instrumentName = "acoustic_grand_piano";
			break;
		case 1:
			instrument = 11;
			instrumentName = "vibraphone";
			break;
		case 2:
			instrument = 12;
			instrumentName = "marimba";
			break;
		case 3: // Classical Guitar
			instrument = 24;
			instrumentName = "acoustic_guitar_nylon";
			break;
		case 4:
			instrument = 118;
			instrumentName = "synth_drum";
			break;
		case 5:
			instrument = 33;
			instrumentName = "electric_bass_finger";
			break;
		case 6:
			instrument = 73;
			instrumentName = "flute";
			break;
		case 7:
			instrument = 42;
			instrumentName = "cello";
			break;
		case 8:
			instrument = 66;
			instrumentName = "tenor_sax";
			break;
		case 9:
			instrument = 115;
			instrumentName = "woodblock";
			break;
		case 10:
			instrument = 57;
			instrumentName = "trombone";
			break;
		case 11:
			instrument = 46;
			instrumentName = "orchestral_harp";
			break;
		case 12:
			instrument = 47;
			instrumentName = "timpani";
			break;
		case 13:
			instrument = 53;
			instrumentName = "voice_oohs";
			break;
		case 14:
			instrument = 75;
			instrumentName = "pan_flute";
			break;
		case 15:
			instrument = 45;
			instrumentName = "pizzicato_strings";
			break;
		case 16:
			instrument = 50;
			instrumentName = "synth_strings_1";
			break;
		case 17:
			instrument = 113;
			instrumentName = "agogo";
			break;
		case 18:
			instrument = 72;
			instrumentName = "piccolo";
			break;
		default:
			instrument = 0;
			instrumentName = "acoustic_grand_piano";
			break;
/* 
	No longer used.
		case 1:
			instrument = 27;
			instrumentName = "electric_guitar_clean";
			break;
		case 3:
			instrument = 65;
			instrumentName = "alto_sax";
			break;
*/
	}
	
	loadInstrument( (voice - 1), instrumentName, instrument);
	voiceArray[voice - 1].instrument = instrument;             // this is the (general midi number - 1) assocaited with the instrument.
	voiceArray[voice - 1].instrumentString = selectedString;   // I am assuming this is the string representation of the instrument.
}

function loadInstrument(voiceID, instrumentName, instrumentNum) 
{
	MIDI.loader.start();
	MIDI.loadResource(
	{
		instrument: instrumentName,
		onprogress: function(state, percent)
					{
						console.log(state, percent);
						disablePlay(true);
					},
		onsuccess: function()
		{
		 	MIDI.programChange(voiceID, instrumentNum);
		 	MIDI.loader.stop();
			disablePlay(false);
		}
	})
}	

function longestNoteCount(voiceArray){
	var maxLength = 1;
	var tempVal;
	var voiceNum = $('#welcomeChoice option:selected').val();

	for(i=0; i< voiceNum; i++){
		tempVal = voiceArray[i].FinalPitchArray.length;
	
		if(maxLength < tempVal)
	 		maxLength = tempVal;	
	}

	return maxLength;	
}

function getMidiClocks(intDur)
{
	var midiClocks=6;
	while(intDur>0)
	{
		midiClocks=midiClocks+(midiClocks/2);
		intDur--
	}
	return midiClocks
}

//parses string of ints (from pitch mapping or duration mapping) to an array
// probably can delete this function.
function toArray(input) {
    var result = new Array();
    if (input !== undefined) {
        result = input.split(",");
        for (var i = 0; i < result.length; i++) {
            result[i] = parseInt(result[i]);
        }
        return result;
    }
}

function incrementControls(currentStep)
{
	$("#progress").val(++currentStep);
	setControls();
}

function playPanel(numberOfVoice) {
    var $voice="\
		<div class='voice cf' id='voiceContainer"+numberOfVoice+"'>\
			<div class='play_voiceStyle cf'><label style='float:left;'>Pitch: </label>\
			\
			<div class='overflowDiv'> \
			<input type='text' class='outputRight' id='voice"+numberOfVoice+"_pitch' disabled >\
			</div> \
			\
			<input type='text' class='cur' id='voice"+numberOfVoice+"_curpitch' disabled > \
			\
			<div class='overflowDiv'> \
			<input type='text' class='outputLeft' id='voice"+numberOfVoice+"_pitchplayed'  disabled ></div> \
			</div> \
			\
			\
			<div class='play_voiceStyle cf'><label style='float:left;'>Duration: </label> \
			\
			<div class='overflowDiv'> \
			<input type='text' class='outputRight duration' id='voice"+numberOfVoice+"_duration' disabled> \
			</div> \
			\
			<input type='text' class='cur'id='voice"+numberOfVoice+"_curduration' disabled >\
			\
			<div class='overflowDiv'> \
			<input type='text' class='outputLeft duration' id='voice"+numberOfVoice+"_durationplayed' disabled></div>\
			</div>\
			\
			<div class='choose-mute'>Mute Track: <input type='checkbox' name='mute' id='mute"+numberOfVoice+"' onclick='muteTrack($(this))'></div>\
			<div class='choose-instrument'>Instrument: <select class='instrument"+numberOfVoice+"' onchange='selectInstrument("+numberOfVoice+");instrumentTooltip(this);'>\
				<option>Piano</option>\
				<option>Vibraphone</option>\
				<option>Marimba</option>\
				<option>Classical Guitar</option>\
				<option>Synth Drum</option>\
				<option>Bass</option>\
				<option>Flute</option>\
				<option>Cello</option>\
				<option>Tenor Sax</option>\
				<option>Woodblock</option>\
				<option>Trombone</option>\
				<option>Orchestral Harp</option>\
				<option>Timpani</option>\
				<option>Voice (Ooohs)</option>\
				<option>Pan Flute</option>\
				<option>Pizzicato Strings</option>\
				<option>Synth Strings</option>\
				<option>Agogo</option>\
				<option>Piccolo</option>\
			</select></div>\
			<img  id='instrumentInfo"+ numberOfVoice + "'>\
			</div>\
			";
		
			$("#voice_container_div").append($voice);
			var width=90/(+$(this).find('option:selected').text())+"%";
}
/****************************************************************End Helper Functions*********************************************************************/
