// Load EVE data from tab file 
var loadResult;
glue.inMode("module/hepadnaviridaeTabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/ehbv-digs/ehbv-side-data.tsv"]));
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(eveObj) {

	glue.inMode("custom-table-row/locus_data/"+eveObj.id, function() {
	
		glue.log("INFO", "Entering locus table data for DIGS sequence:", eveObj.id);
		
		glue.command(["set", "field", "scaffold", eveObj.scaffold]);
		glue.command(["set", "field", "start_position", eveObj.extract_start]);
		glue.command(["set", "field", "end_position", eveObj.extract_end]);
		glue.command(["set", "field", "orientation", eveObj.orientation]);
	});

	glue.inMode("sequence/fasta-digs-ehbv/"+eveObj.id, function() {
	
		glue.log("INFO", "Entering sequence table data for DIGS sequence:", eveObj.id);

		glue.command(["set", "field", "name", eveObj.locus_id]);
		glue.command(["set", "field", "full_name", eveObj.locus_id]);
		glue.command(["set", "field", "family", eveObj.virus_family]);
		glue.command(["set", "field", "genus", eveObj.virus_genus]);
		glue.command(["set", "field", "clade", eveObj.virus_clade]);

	});


});


