function VoiceObject(id)
{
    this.VoiceID = id; // Integer.

    this.originalPitchArray = new Array(); // Integer
    this.originalPitchArrayAlgorithm = "Sine";// May be deleted, Used as default value.

    this.originalDurationArray = new Array(); // Integer
    this.originalDurationArrayAlgorithm = "Quarter Notes";// May be deleted, Used as default value.

    this.pitchMappingArray = new Array(); // Integer
    this.pitchMappingArrayAlgorithm = "Division";// May be deleted, Used as default value.
    this.pitchMappingArrayLowerBound = 1;// Used for ease of access these values instead of pulling from website.
    this.pitchMappingArrayUpperBound = 88;// Used as default values.

    this.durationMappingArray = new Array(); // Integer. This is the data that is sent into play.js for the final output.
    this.durationMappingArrayAlgorithm = "Division";
    this.durationMappingArrayLowerBound = 0;
    this.durationMappingArrayUpperBound = 6;

    this.FinalPitchArray = new Array(); // Integer. This is the data that is sent into play.js for the final output.
    this.FinalPitchArrayScale = "Chromatic";
    
    /*
        Below may be used for the play.js class once the refactor there is complete.
    */
    this.instrument = "";
    this.instrumentString = "";

    this.muted = false;
    /*Create the biology object to be used for DNA/RNA/Proteins/Codons */
    this.biology=new biologyObject();
}

