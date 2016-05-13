//Array to hold voices
var voiceArray;
//a boolean flag that's used for stopping playback
var stopped;
var paused = true;
var playing = false;

/**
 *a basic data structure used for playback and creating midi download 
 *
 * @param pitchArray {Array} The array of pitches brought in from the Scale Options tab
 * @param durationArray {Array} The array of durations brought in from Duration Mapping
 * @param muted {boolean} a boolean flag that will be used for the eventual mute capability for play back
 */
function Voice(pitchArray, durationArray, muted) {
    this.pitchArray = pitchArray;
    this.durationArray = durationArray;
	this.muted=muted;
	this.instrument;
	this.instrumentString;
}
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
	
	disablePlay(true);

	MIDI.loader = new widgets.Loader("Music Algorithms");
        Pace.start();
        $(".pace-progress").html("Loading Sound Fonts...").css({ paddingBottom: "10px" });

	MIDI.loadPlugin({
	soundfontUrl: "/js/midiJs/soundfont/",
	instrument: [ "acoustic_grand_piano", "synth_drum", "electric_guitar_clean", "marimba", "vibraphone" ],
	callback: function() {
		MIDI.loader.stop();
                Pace.stop();
		disablePlay(false);
		}
	});
});
/****************************************************************End Set Event Handlers******************************************************************/

/****************************************************************Play Controls Handlers******************************************************************/

/**
* This function gets all the appropriate data from other tabs (using jQuery), creates voiceArray, then calls setControls() 
*/

function getOutput() {
   
    //get pitch from Pitch Mapping Tab output
    voiceArray = new Array();
    var $voiceNum = $('#welcomeChoice option:selected').val();
    //alert("voiceNum: " +voiceNum);
    for (var i = 1; i <= $voiceNum; i++) {
        var pitchArray;
        var durationArray;

        //get pitch from Pitch Mapping/ scale options
     
        var $pitch = $("#so_text_area" + i).val();
        pitchArray = toArray($pitch);
       
        //get duration from Duration mapping tab output
        var $duration = $("#dMapArea" + i).val();
        durationArray = toArray($duration);
        if (pitchArray != undefined && durationArray != undefined) {
            
            voiceArray[i - 1] = new Voice(pitchArray, durationArray,false);
           
        } else {
            alert("could not get voice " + $voiceNum);
        }
/*
        //get  MAX!!! noteCount from Pitch input
        var $stringNoteCount = $("#note_count1").val();
        var noteCount = parseInt($stringNoteCount);
*/
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
    for (var i = 0; i < voiceArray.length; i++) {
        var voiceNum = i + 1;
        var pitchArray = voiceArray[i].pitchArray;
        var durationArray = voiceArray[i].durationArray;
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
        setDefaultControls();
    } else {
        var $maxProgress = $("#progress").attr("max");
        $("#counter").text(curval + " of " + $maxProgress);
		unColorKeys();
        }
	for(i=0; i<voiceArray.length;i++)
	{
		setVoiceControls(i,curval);
	}
}
function setVoiceControls(index,curval)
{
	var voiceNum = index + 1;
            var pitchArray = voiceArray[index].pitchArray;
            var durationArray = voiceArray[index].durationArray;
            $("#voice" + voiceNum + "_curpitch").val(pitchArray[curval - 1]);
			colorKey(pitchArray[curval-1],voiceNum);
            $("#voice" + voiceNum + "_pitch").val(pitchArray.slice(curval, pitchArray.length).toString());
            if (curval - 1 > 0) {
                $("#voice" + voiceNum + "_pitchplayed").val(pitchArray.slice(0, curval - 1));
                $("#voice" + voiceNum + "_durationplayed").val(durationArray.slice(0, curval - 1));
            } else {

                $("#voice" + voiceNum + "_pitchplayed").val("");
                $("#voice" + voiceNum + "_durationplayed").val("");
            }

            $("#voice" + voiceNum + "_curduration").val(durationArray[curval - 1]);
            $("#voice" + voiceNum + "_duration").val(durationArray.slice(curval, durationArray.length).toString());

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
	//alert("bpm set at: "+ tempo);
	var microTempo=60000000/tempo;
	
	var division=480;
	if(type=='MTC')
	division=24
	
	var basedata = 'MFile 0 1 '+division+'|MTrk|0 TimeSig 4/4 24 8|0 Tempo '+microTempo+'|0 Meta TrkEnd|TrkEnd';
	var basedataArray=basedata.split('|');
	
	var mididata;
	 mididata =basedataArray.join('\r\n');
	for(i=0; i<voiceArray.length;i++)
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
//alert("creating voice on channel"+channel);
		var pitchArray=voice.pitchArray;
		var durationArray=voice.durationArray;
		var midiNotes=new Array(pitchArray.length);
		//get instrument string
		var trackdata='MTrk'//|0 Meta Text "'+voice.instrumentString+'"|0 ParCh='+channel+' p='+voice.instrument+' v=120';
		var trackdataArray=trackdata.split('|');
																						
																						
		var dur2=microTempo/24;//1 MIDI clock
		//24 MIDI clocks in every quarter note
		var nowDur =0;//(1 << durationArray[1]) * 120;
	for(var i=0;i<midiNotes.length;i++)
	{
		midiNotes[i]=pitchArray[i]+20;
		
		if (isNaN(midiNotes[i])) { alert('note ' + i + ' is invalid. Notes must be integers.'); return; }
		if ((midiNotes[i]<0) || (midiNotes[i]>=127)) { alert('note ' + midiNotes[i]+"= "+"midiNotes[" +i+"]"+ ' is invalid. Notes must be valid midi notes between 0 and 127.'); return; }
		
		if(type=="MTC")
		nThisDuration=getMidiClocks(durationArray[i]);
		//SMPTE event time division
		else
		nThisDuration= (1 << durationArray[i])*24;
		
		if (isNaN(nThisDuration)) { alert('duration ' + i + ' is invalid. must be integer.'); return; }
		
		if (midiNotes[i] > 20) {
				//Add to the MIDI data an "On" event
				
				trackdataArray.push( nowDur +' On ch='+channel+ ' n='+midiNotes[i]+ ' v=120');			
				
				//Add to the MIDI data an "Off" event
				trackdataArray.push(nowDur + nThisDuration  +' Off ch='+channel+' n='+midiNotes[i]+ ' v=120');
			}
			
			nowDur += nThisDuration;
		
	}
		trackdataArray.push(nowDur + ' Meta TrkEnd');
		trackdataArray.push('TrkEnd');
		//alert("track: "+trackdataArray.toString());
		return trackdataArray.join('\r\n');
}


/****************************************************************End MIDI Download Handlers**************************************************************/

/****************************************************************Player Handlers*************************************************************************/
function makeMidiPlay() 
{

	//createMidi("MTC");
/*	//working version
	var maxNoteCount = longestNoteCount(voiceArray);
	var j =0;
	var _pos = 0;
	(function playR(){
		setTimeout(function(){

			if(j < maxNoteCount){
				for(currVoice = 0; currVoice < voiceArray.length; currVoice++){

					duration = voiceArray[currVoice].durationArray[j];	
					note = voiceArray[currVoice].pitchArray[j] + 20;
					MIDI.noteOn(currVoice, note, 127, 0);
					MIDI.noteOff(currVoice,note, duration);
				//	console.log(currVoice+" currentVoice: "+note)//viewing voice notes
				}
				$("#progress").val(++_pos);
				setControls();
				//console.log("\n");

				playR();
			}
			else{
				j=0;
				disableAllVoices(false);
			}

			j++
		},1000);//hard to multiply with multiple voice 1000 * (dr[j] / 4)
		//The timer can be used for tempo

	})();
*/

	var maxNoteCount = longestNoteCount(voiceArray);
	var i = 0;
	(function playR(){
	tempo=parseInt($("#tempo").val());
		setTimeout(function(){
			
			if(i < maxNoteCount && paused){
				for(currentVoice = 0; currentVoice < voiceArray.length; currentVoice++){
					if(!stopped)
					{
						if(voiceArray[currentVoice].muted != true)
							playAndLight(i,currentVoice);
					}
					else
						return;
				}

				playR();
			}
			else if(!paused){
				
				playR();
			}
			else{
				disableAllVoices(false);
				playing = false;
			}


			if(paused){
				i++;
			}
			
				
			

		},(1000/2)/(tempo/120));
	})();

/*
	var maxNoteCount = longestNoteCount(voiceArray);
	var j =0;
	var _pos = 0;
	var duration;

	(function playR(){
		setTimeout(function(){

			if(j < maxNoteCount){
				for(currVoice = 0; currVoice < voiceArray.length; currVoice++){
					duration = voiceArray[currVoice].durationArray[j];
					note = voiceArray[currVoice].pitchArray[j] + 20;
					MIDI.noteOn(currVoice, note, 120, 0);
					MIDI.noteOff(currVoice,note, duration);
				///	console.log(currVoice+" currentVoice: "+note)//viewing voice notes
				}
				$("#progress").val(++_pos);
				setControls();
				//console.log("\n");

				playR();
			}
			else{
			//	j=0;
				disableAllVoices(false);
			}

			j++
		},Math.abs(1000-(1000*(duration/4))));
		//The timer can be used for tempo
	})();
*/
}

function playAndLight(i,currentVoice){
	var duration = (getMidiClocks(voiceArray[currentVoice].durationArray[i])/24);
	var note = voiceArray[currentVoice].pitchArray[i] + 20;
	var pos = i;
	setTimeout(function(){
		if(!stopped)
		{
			MIDI.noteOn(currentVoice, note, 120, 0);
			MIDI.noteOff(currentVoice,note, duration);

			incrementControls(pos);
			pos++;
		}
	},Math.abs(1000-(1000*(duration/4))));

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


function selectInstrument(voiceNum) {
			var selected = $(".instrument"+voiceNum+"").prop("selectedIndex");
			var voice = voiceNum;
			var instrument = 0;
			var selectedString=$(".instrument"+voiceNum);
			
			switch(selected)
			{
				case 0:
					instrument = 0;
					break;
				case 1:
					instrument = 27;
					break;
				case 2:
					instrument = 12;
					break;
				case 3:
					instrument = 11;
					break;
				case 4: 
					instrument = 118;
					break;
				default:
					instrument = 0;
					break;
		}
		
		MIDI.programChange( (voice - 1), instrument);
		voiceArray[voice-1].instrument=instrument;
		voiceArray[voice-1].instrumentString=selectedString;
}



function longestNoteCount(voiceArray){
	var maxLength = 1;
	var tempVal;

	for(i=0; i< voiceArray.length; i++){
		tempVal = voiceArray[i].pitchArray.length;
	
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
/****************************************************************End Helper Functions*********************************************************************/
