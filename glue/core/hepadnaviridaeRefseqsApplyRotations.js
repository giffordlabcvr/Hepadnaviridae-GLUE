var rotationResultObjs;

var whereClause = "source.name in ('ncbi-refseqs')";

glue.command(["multi-unset", "field", "sequence", "-w", whereClause, "rotation"]);

/*

  References requiring rotation
    REF_MASTER_HBV: NC_003977
    REF_DHBV: NC_001344
	
*/

// a more automated way to do this might be to just recognise the EcoR1 nucleotide motif, which seems to be
// TGGAA[CT]TC
// The '1' location is then just after the AA within this motif


/**
 * Most refseqs meet the standard. Those that don't are just a little bit off.
 */
shiftLeft("ncbi-refseqs/NC_003977", 2);
shiftRight("ncbi-refseqs/NC_001344", 1812);

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
