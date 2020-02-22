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
shiftRight("ncbi-refseqs/NC_003977", 1387); // Hepatitis B virus (strain ayw)
shiftLeft("ncbi-refseqs/NC_004107", 290); // Woodchuck hepatitis virus
shiftRight("ncbi-refseqs/NC_027922", 269); // Woodchuck hepatitis virus

// Avihepadnavirus
shiftRight("ncbi-refseqs/NC_001344", 1346); // Duck hepatitis B virus
shiftRight("ncbi-refseqs/NC_035210", 1290); // Tinamou hepatitis B virus
shiftRight("ncbi-refseqs/NC_001486", 1290); // Heron hepatitis B virus
shiftRight("ncbi-refseqs/NC_016561", 1305); // Parrot hepatitis B virus
shiftRight("ncbi-refseqs/NC_005890", 1314); // Parrot hepatitis B virus
shiftRight("ncbi-refseqs/NC_005950", 1287); // Snow goose hepatitis B virus
shiftRight("ncbi-refseqs/NC_005888", 1281); // Ross's goose hepatitis B virus


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
