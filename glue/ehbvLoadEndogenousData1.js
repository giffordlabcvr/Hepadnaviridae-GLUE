// list the hepadnavirus sequences
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'fasta-ehbv-curated'"]);
// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// for each sequence ID
_.each(seqIds, function(seqId) {
    // create an object in the custom table which uses the sequence ID as the row ID.
    glue.command(["create", "custom-table-row", "endogenous_data", seqId]);
    // associate the corresponding sequence with this object.
    glue.inMode("sequence/fasta-ehbv-curated/"+seqId, function() {
        glue.command(["set", "link-target", "endogenous_data", "custom-table-row/endogenous_data/"+seqId]);
    });
});

// list the hepadnavirus sequences
var listSeqResultRefs = glue.command(["list", "sequence", "-w", "source.name = 'fasta-ehbv-consensus'"]);
// extract from the result a list of sequence IDs.
var refSeqIds = glue.getTableColumn(listSeqResultRefs, "sequenceID");

// for each sequence ID
_.each(refSeqIds, function(seqId) {
    // create an object in the custom table which uses the sequence ID as the row ID.
    glue.command(["create", "custom-table-row", "endogenous_data", seqId]);
    // associate the corresponding sequence with this object.
    glue.inMode("sequence/fasta-ehbv-consensus/"+seqId, function() {
        glue.command(["set", "link-target", "endogenous_data", "custom-table-row/endogenous_data/"+seqId]);
    });
});
