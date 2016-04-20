//////////////////////////////////////////////////////////graph start //////////////////////////////////

google.load("visualization", "1", {'packages':['corechart']});

var bool = 0;
var sliderVal = 1;
var targetData;
var startingData;
var morphToSong;
var currentVoiceNumber;

function openMorphGraph(voiceNumber)
{
	// Set callback to run when API is loaded
	//google.setOnLoadCallback(updateMorph);

	currentVoiceNumber = voiceNumber;
	loadFile(getTargetdata);
	
}

function updateMorph() 
{
	var slider = document.getElementById('slide');
	sliderVal = slider.value;	
	drawVisualization();
}

//Using function to update targetData with callback using asynchronous
function getTargetdata(data)
{
	targetData = data;

}

function startingData()
{
	startingData = new Array();

	for (var i = 0; i < 200; i++) 
	{
		startingData[i] = Math.floor(Math.random()*200);
	}

}
	
//asynchronous function with callback
function loadFile(callback)
{
	var file;
	var reader; 

	//Need to be set to server location
	if (morphToSong == "Beethoven's 9th")
	{
		file = "../morph/trueBeethoven";
	}
	else
	{
		file = "../morph/Finlandia"
	}
	
	if (window.XMLHttpRequest) 
	{ // Mozilla, Safari, ...
		reader = new XMLHttpRequest();
	} 
	else if (window.ActiveXObject) 
	{ // IE 8 and older
		reader = new ActiveXObject("Microsoft.XMLHTTP");
	}

	reader.onreadystatechange = function()
	{
		var MaxNoteCount = 2000;
		if(reader.readyState === 4)
		{
			if(reader.status === 200 || reader.status == 0)
			{
				var data = reader.responseText.split("\n");
				data = data.slice(0,data.length-2);

				var newData = new Array();
				for(i=0; i < MaxNoteCount; i++)
				{
					newData[i] = data[i % data.length];
				}

				callback(newData);
			}
			updateMorph();
		}
	}
	reader.open("GET", file, true);
	reader.send(null);
}

function initData()
{
	
	$("#slide").trigger('change');
}

function setStartData(inVal, morphTarget) 
{
	startingData = inVal;
	morphToSong = morphTarget;

}

// Called when the Visualization API is loaded.
function drawVisualization() 
{
	// Instantiate our graph object.
	var graph = new google.visualization.LineChart(document.getElementById('mygraph'));

	var morphVal;
	var data = new google.visualization.DataTable();
	data.addColumn('number');
		data.addColumn('number', morphToSong);
	data.addColumn('number', 'Voice Data');

	var textData = "";

	for (var i = 0; i < startingData.length; i++) 
	{
		morphVal = Math.floor((parseInt(targetData[i]) - parseInt(startingData[i]))*(sliderVal/100) + parseInt(startingData[i]));
		textData += morphVal+",";

		data.addRow([i+20,
		parseInt(targetData[i]),
		parseInt(morphVal) ]);
	}
	textData = textData.substring(0, textData.length - 1)
	document.getElementById("morphBox").value = textData;

	// specify options
	
		var options = 	{ width: "100%", allowHtml: true,
					  lines: [ { color: "#0075BE", style: "dot" },
					  		   { color: "#FF5506", style: "dot",} ],
					  chartArea: { width: "100%", height: "75%"},
		   			  'legend': {'position': 'bottom'}
	};
	
	setTimeout(function() {
		graph.draw(data, options)
	}, 200);
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(initData);

// The following functions are for actual array adjustments from the morph output.

/*
	This function updates the final pitch array with the morph values
*/
function adjustForMorph()
{
	var ModificationArray = new Array(); // This is used to modify the FinalPitchArray.
	var textBox = document.getElementById("morphBox");	// This gets the current panel's textbox.
	ModificationArray = $.map(textBox.value.split(","), function(value) { return parseInt(value, 10); });
	voiceArray[currentVoiceNumber - 1].FinalPitchArray = ModificationArray;
}

/*
	Seems it opens the over window for the morph. Maintained from the previous version.
*/
function openMorph(voicePanel) 
{
	var $SongOption = $(voicePanel).find('[id^=so_key_options]'); // This gets the location of the song drop down menu.
	var $SelectedSong = $SongOption.find('option:selected'); // This gets the song from the song drop down menu.
	var song = $SelectedSong.text();
	var voiceNumber = getVoiceNumber($(voicePanel));

	setStartData($(voicePanel).find("textarea").val().split(","), song);	
	openMorphGraph(voiceNumber);
	$(".morph-modal").modal("show");
	$(".morph-modal").data("voice-num", voicePanel.id);
}