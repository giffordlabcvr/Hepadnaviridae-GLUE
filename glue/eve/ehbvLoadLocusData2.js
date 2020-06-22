// Load EVE data from tab file 
var loadResult;
glue.inMode("module/hepadnaviridaeTabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/ehbv-side-data.tsv"]));
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(eveObj) {

	glue.inMode("custom-table-row/locus_data/"+eveObj.sequenceID, function() {
	
		glue.log("INFO", "Entering locus table data for DIGS sequence:", eveObj.sequenceID);		
		glue.command(["set", "field", "scaffold", eveObj.scaffold]);
		glue.command(["set", "field", "start_position", eveObj.extract_start]);
		glue.command(["set", "field", "end_position", eveObj.extract_end]);
		glue.command(["set", "field", "orientation", eveObj.orientation]);
		glue.command(["set", "field", "bitscore", eveObj.bitscore]);
		glue.command(["set", "field", "identity", eveObj.identity]);
		glue.command(["set", "field", "assigned_name", eveObj.assigned_name]);
		glue.command(["set", "field", "host_class", eveObj.host_class]);
		glue.command(["set", "field", "host_superorder", eveObj.host_superorder]);
		glue.command(["set", "field", "host_order", eveObj.host_order]);
		
	});

	glue.inMode("sequence/fasta-digs-ehbv/"+eveObj.sequenceID, function() {
	
		glue.log("INFO", "Entering sequence table data for DIGS sequence:", eveObj.sequenceID);
		glue.command(["set", "field", "name", eveObj.sequenceID]);
		glue.command(["set", "field", "full_name", eveObj.sequenceID]);
		glue.command(["set", "field", "genus", eveObj.virus_genus]);
		glue.command(["set", "field", "clade", eveObj.virus_clade]);

	});

});

