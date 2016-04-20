<?php
if (isset($_POST['notedata'])){

	require('./midi.class.php');
	
	$txt = $_POST['notedata'];
	//echo $txt;
	//echo '\r\n \r\n';
	$midi = new Midi();
	//echo "midi made";
	
	$midi->importTxt($txt);
	//echo $midi->getTrackCount();
	$destFilename  = 'output3A.mid';
	//echo $destFilename;
	
	///$tracks=$midi->tracks();
	echo $midi->getMid();
	//$midi->downloadMidFile($destFilename); //not from a midi file
	//echo 'Binary test'
	//echo json_encode($binary);
}
else
	echo "not set"
?>
