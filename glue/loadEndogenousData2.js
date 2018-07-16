// Load EVE data from tab file 
var loadResult;
glue.inMode("module/hepadnaviridaeTabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/DNA-ss/hepadnaviridae/HBVe-side-data"]));
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(eveObj) {

	glue.inMode("custom-table-row/dfe_endogenous_data/"+eveObj.id, function() {
	
		glue.command(["set", "field", "scaffold", eveObj.scaffold]);
		glue.command(["set", "field", "start_position", eveObj.extract_start]);
		glue.command(["set", "field", "end_position", eveObj.extract_end]);
		glue.command(["set", "field", "orientation", eveObj.orientation]);

	});
});
