// Load EVE data from tab file 
var loadResult;
glue.inMode("module/hepadnaviridaeTabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/ehbv-refseqs-side-data.tsv"]));
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(eveObj) {

	glue.inMode("custom-table-row/refcon_data/"+eveObj.id, function() {
	
		glue.log("INFO", "Entering locus data for EVE reference:", eveObj.id);

		glue.command(["set", "field", "locus_numeric_id", eveObj.locus_numeric_id]);
		glue.command(["set", "field", "nearest_upstream_orf", eveObj.nearest_upstream_orf]);
		glue.command(["set", "field", "nearest_downstream_orf", eveObj.nearest_downstream_orf]);
		glue.command(["set", "field", "host_group_name", eveObj.host_group_name]);

	});

	glue.inMode("sequence/fasta-refseqs-ehbv/"+eveObj.id, function() {
	
		glue.log("INFO", "Entering sequence table data for EVE reference:", eveObj.id);

		glue.command(["set", "field", "name", eveObj.id]);
		glue.command(["set", "field", "full_name", eveObj.full_name]);
		glue.command(["set", "field", "genus", eveObj.genus]);

	});

});


	