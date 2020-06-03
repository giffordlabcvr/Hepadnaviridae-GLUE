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
shiftLeft("ncbi-refseqs/NC_003977", 1367); // HBV: adjustment = 3182 - (1816 + 1) 
shiftLeft("ncbi-refseqs/NC_028129", 1364); // Woolly monkey hepadnavirus = 3179 - (1816 - 1)
shiftLeft("ncbi-refseqs/NC_004107", 1391); // Woodchuck hepatitis virus = 3323 - (1931 + 1)
shiftLeft("ncbi-refseqs/NC_020881", 1414); // Long-fingered bat hepatitis virus = 3230 - (1815 + 1)
shiftLeft("ncbi-refseqs/NC_024443", 1657); // Roundleaf bat hepatitis virus = 3368 - (1710 + 1)
shiftLeft("ncbi-refseqs/NC_024444", 1720); // Horseshoe bat hepatitis virus = 3377 - (1657 + 1)
shiftLeft("ncbi-refseqs/NC_024445", 1518); // Tent-making bat bat hepatitis virus = 3149 - (1630 + 1)
shiftLeft("ncbi-refseqs/MH307930", 1556);  // Feline hepadnavirus = 3187 - (1665 + 1)
// Ground squirrel hepatitis virus (no adjustment)
// Arctic ground squirrel (no adjustment)


// Avihepadnavirus
shiftLeft("ncbi-refseqs/NC_001344", 502); // Duck hepatitis B virus: adjustment =3027 - (2524 + 1) 
//shiftLeft("ncbi-refseqs/NC_035210", 1289); // Tinamou hepatitis B virus
//shiftLeft("ncbi-refseqs/NC_001486", 1289); // Heron hepatitis B virus
//shiftLeft("ncbi-refseqs/NC_016561", 1304); // Parrot hepatitis B virus
//shiftLeft("ncbi-refseqs/NC_005890", 1313); // Parrot hepatitis B virus
//shiftLeft("ncbi-refseqs/NC_005950", 1286); // Snow goose hepatitis B virus
//shiftLeft("ncbi-refseqs/NC_005888", 1280); // Ross's goose hepatitis B virus
//shiftLeft("ncbi-refseqs/AJ441111", 1283);  // Crane hepatitis B virus
//shiftLeft("ncbi-refseqs/AJ251934", 1295);  // Stork hepatitis B virus

// Metahepadnavirus
shiftLeft("ncbi-refseqs/NC_001344", 3120); // Bluegill hepatitis B virus: adjustment = 3260 - (139 + 1) 



function shiftLeft(refSeqId, leftShift) {
	glue.inMode("sequence/"+refSeqId, function() {
		var length = glue.command(["show", "length"]).lengthResult.length;
		glue.command(["set", "field", "rotation", length-leftShift]);
	});
}

function shiftLeft(refSeqId, rightShift) {
	glue.inMode("sequence/"+refSeqId, function() {
		glue.command(["set", "field", "rotation", rightShift]);
	});
}

