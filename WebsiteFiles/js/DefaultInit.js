// JavaScript source code
/*
  Used to load default values from the start.
  If defaults need changed, this is the place to do it.
*/
function Init(voices)
{
    CreateVoiceArray(voices);

    LoadOriginalPitchArray(voices);
    LoadOriginalDurationArray(voices);
    LoadPitchMappingArray(voices);
    LoadDurationMappingArray(voices);
    LoadScaleOption(voices);
}

function CreateVoiceArray(voices)
{
    for(var x = 0; x < 4; x++)
    {
        voices.push(new VoiceObject(x + 1));
    }
}

function LoadOriginalPitchArray(voices)
{
    var DefaultAlgorithm = algorithmFactory.createSequence("Sine");//get from user
    var DefaultNoteCount = 24;
    musicAlgorithms.setAlgorithm(DefaultAlgorithm);

    for (var x = 0; x < voices.length; x++)
    {
        voices[x].originalPitchArray = musicAlgorithms.getValues(DefaultNoteCount);
    }
}

function LoadOriginalDurationArray(voices)
{
    var DefaultAlgorithm = algorithmFactory.createSequence("Sine");//get from user
    var DefaultNoteCount = voices[0].originalPitchArray.length;
    musicAlgorithms.setAlgorithm(DefaultAlgorithm);

    for (var x = 0; x < voices.length; x++) 
    {
        voices[x].originalDurationArray = musicAlgorithms.getValues(DefaultNoteCount);
    }
}

function LoadPitchMappingArray(voices)
{
    var DefaultPitchMappingAlgorithm = "Division";
    var lowerKeyboardBound = 1;
    var upperKeyboardBound = 88;

    musicNormalize.setAlgorithm(normalizeFactory.createNormalizer(DefaultPitchMappingAlgorithm));

    for (var x = 0; x < voices.length; x++)
    {
        voices[x].pitchMappingArray = musicNormalize.normalize(voices[x].originalPitchArray, lowerKeyboardBound, upperKeyboardBound);
    }
}

function LoadDurationMappingArray(voices)
{
    var DefaultDurationMappingAlgorithm = "Division";
    var lowerNoteBound = 0;
    var upperNoteBound = 6;

    musicNormalize.setAlgorithm(normalizeFactory.createNormalizer(DefaultDurationMappingAlgorithm));

    for (var x = 0; x < voices.length; x++)
    {
        voices[x].durationMappingArray = musicNormalize.normalize(voices[x].originalDurationArray, lowerNoteBound, upperNoteBound);
    }
}

function LoadScaleOption(voices)
{
    var DefaultScale = "Chromatic";
    var lowerKeyboardRange = 1;
    var upperKeyboardRange = 88;
    var selectedScaleArray = adjustForKey(getScaleArray(DefaultScale));

    for (var x = 0; x < voices.length; x++)
    {
        voices[x].FinalPitchArray = createOutput(voices[x].pitchMappingArray, selectedScaleArray, lowerKeyboardRange, upperKeyboardRange);
    }
}
