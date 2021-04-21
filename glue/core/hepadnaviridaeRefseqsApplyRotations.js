var rotationResultObjs;

var whereClause = "source.name in ('ncbi-refseqs')";

glue.command(["multi-unset", "field", "sequence", "-w", whereClause, "rotation"]);

/*

  In this project I have chosen a start point corresponding to the transcriptional
  start site of the hepadnavirus genome (just upstream of the Core protein)
  
  Most refseqs outside the orthohepadnavirus group meet the standard.
  References requiring rotation:
  
    REF_MASTER_HBV: NC_003977
    REF_DHBV: NC_001344
	
*/

// Orthohepadnavirus
shiftRight("ncbi-refseqs/NC_003977", 1367); // HBV: adjustment = 3182 - (1816 + 1) 
shiftRight("ncbi-refseqs/NC_028129", 1364); // Woolly monkey hepadnavirus = 3179 - (1816 - 1)
shiftRight("ncbi-refseqs/NC_004107", 1391); // Woodchuck hepatitis virus = 3323 - (1931 + 1)
shiftRight("ncbi-refseqs/NC_020881", 1414); // Long-fingered bat hepatitis virus = 3230 - (1815 + 1)
shiftRight("ncbi-refseqs/NC_024443", 1657); // Roundleaf bat hepatitis virus = 3368 - (1710 + 1)
shiftRight("ncbi-refseqs/NC_024444", 1720); // Horseshoe bat hepatitis virus = 3377 - (1657 + 1)
shiftRight("ncbi-refseqs/NC_024445", 1518); // Tent-making bat bat hepatitis virus = 3149 - (1630 + 1)
shiftRight("ncbi-refseqs/MH307930", 1556);  // Feline hepadnavirus = 3187 - (1665 + 1)
// Ground squirrel hepatitis virus (no adjustment)
// Arctic ground squirrel (no adjustment)
// Tai Forest hepadnavirus (to do)
// Shrew hepadnavirus (to do)
// EqHBV (to do)

// Avihepadnavirus
shiftRight("ncbi-refseqs/NC_001344", 504); // Duck hepatitis B virus: adjustment = 3027 - (2524 - 1)
shiftRight("ncbi-refseqs/NC_035210", 504); // Tinamou hepatitis B virus: adjustment = 3024 - (2521 - 1)
shiftRight("ncbi-refseqs/NC_001486", 504); // Heron hepatitis B virus: adjustment = 3027 - (2524 - 1)
shiftRight("ncbi-refseqs/NC_016561", 504); // Parrot hepatitis B virus: adjustment = 3027 - (2524 - 1)
shiftRight("ncbi-refseqs/NC_005890", 503); // Sheldgoose hepatitis B virus: adjustment = 3027 - (2524 - 1)
shiftRight("ncbi-refseqs/NC_005888", 503); // Ross's goose hepatitis B virus: adjustment = 3018 - (2515 - 1)
shiftRight("ncbi-refseqs/NC_005950", 504); // Snow goose hepatitis B virus
shiftRight("ncbi-refseqs/AJ441111", 504);  // Crane hepatitis B virus
shiftRight("ncbi-refseqs/AJ251934", 504);  // Stork hepatitis B virus

// Herpetohepadnavirus
// Tibetan frog hepadnavirus (no adjustment)

// Metahepadnavirus
shiftRight("ncbi-refseqs/NC_030445", 3122); // Bluegill hepatitis B virus: adjustment = 3260 - (139 - 1) 
// Eastern sea garfish hepatitis B virus: adjustment = 3260 - (139 - 1) | MH716822

// Parahepadnavirus
shiftRight("ncbi-refseqs/NC_027922", 327);// White sucker hepadnavirus: adjustment = 3542 - (3216 - 1) 
// Australasian snapper hepatitis B virus | MH716821

function shiftLeft(refSeqId, leftShift) {
	glue.inMode("sequence/"+refSeqId, function() {
		var length = glue.command(["show", "length"]).lengthResult.length;
		glue.command(["set", "field", "rotation", length-leftShift]);
	});
}

function shiftRight(refSeqId, rightShift) {
	glue.inMode("sequence/"+refSeqId, function() {
		glue.command(["set", "field", "rotation", rightShift]);
	});
}

