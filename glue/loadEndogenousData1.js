// list the hepadnavirus sequences
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'hepadnaviridae-fasta'"]);
// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// for each sequence ID
_.each(seqIds, function(seqId) {
    // create an object in the custom table which uses the sequence ID as the row ID.
    glue.command(["create", "custom-table-row", "dfe_endogenous_data", seqId]);
    // associate the corresponding sequence with this object.
    glue.inMode("sequence/hepadnaviridae-fasta/"+seqId, function() {
        glue.command(["set", "link-target", "dfe_endogenous_data", "custom-table-row/dfe_endogenous_data/"+seqId]);
    });
});

// list the hepadnavirus sequences
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'hepadnaviridae-fasta'"]);
// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// for each sequence ID
_.each(seqIds, function(seqId) {
    // create an object in the custom table which uses the sequence ID as the row ID.
    glue.command(["create", "custom-table-row", "dfe_endogenous_data", seqId]);
    // associate the corresponding sequence with this object.
    glue.inMode("sequence/hepadnaviridae-fasta/"+seqId, function() {
        glue.command(["set", "link-target", "dfe_endogenous_data", "custom-table-row/dfe_endogenous_data/"+seqId]);
    });
});
