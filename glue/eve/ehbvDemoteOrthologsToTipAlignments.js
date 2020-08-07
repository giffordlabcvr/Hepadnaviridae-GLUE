// ABOUT: script to populate EHBV tips within constrained alignment
// EHBV sequences are added to alignments based on the taxonomic data associated with 
// the reference sequences.
// EHBV sequences are linked to reference sequences via the locus ID

// Preset variables
var refconDataPath = "tabular/eve/ehbv-refseqs-side-data.tsv";
var rootAlignment = 'AL_Hepadnaviridae';

// Load the refcon data and store relationships between locus and viral taxonomy
var ehbvRefseqResultMap = {};
get_refcon_data(ehbvRefseqResultMap, refconDataPath);
//glue.log("INFO", "RESULT WAS ", ehbvRefseqResultMap);


// Load DIGS hit data from tabular file 
var loadResult;
glue.inMode("module/hepadnaviridaeTabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/ehbv-side-data.tsv"]));
	// glue.log("INFO", "load result was:", loadResult);
});

// Iterate on DIGS data, adding sequences to alignments as appropriate
_.each(loadResult, function(eveObj) {

	// Get the locus ID
	var locus_numeric_id = eveObj.locus_numeric_id;
	var sequenceID = eveObj.sequenceID;
	var locusObj = ehbvRefseqResultMap[locus_numeric_id];
	
	glue.log("INFO", "Sequence ID", sequenceID);
	glue.log("INFO", "Locus ID", locus_numeric_id);


	if (locus_numeric_id != 'NK') { // Skip elements that haven't been assigned to a locus

		var locus_name = locusObj.locus_name;
		glue.log("INFO", "Locus name:", locus_name);

	

		// Get the taxonomy 
	
		var virus_genus = locusObj.virus_genus;

		// Does an alignment exist for this locus ID
        var alignmentName = "AL_EHBV-" + locus_name;

		//glue.log("INFO", "LOADED EHBV INFO ", locusObj);
		glue.log("INFO", "Adding sequence:", eveObj.sequenceID);
		glue.log("INFO", "to alignment", alignmentName);
		glue.log("INFO", "genus:", locusObj.virus_genus);
		
		var parentAlignmentName;
		if (virus_genus == 'NK') {	// Skip references that havent been assigned to a genus			

		}
		else {
				
			parentAlignmentName = "AL_" + virus_genus;

			glue.log("INFO", "PARENT ALIGNMENT: ", parentAlignmentName);

			var alignmentExists = does_alignment_exist(alignmentName);
		
			if (alignmentExists == undefined) { // If not create the alignment
				
				// Create the alignment
				var refseqName = "REF_EHBV-" + locus_name;
				
				glue.log("INFO", "CREATING ALIGNMENT WITH CONSTRAINING REFERENCE: ", refseqName);
				glue.inMode("/alignment/"+parentAlignmentName, function() {
					glue.command(["extract", "child", alignmentName, "-r", refseqName]);
				});
						
			}	

			// Add the sequence to the alignment
			glue.inMode("/alignment/"+parentAlignmentName, function() {			
				glue.command(["demote", "member", alignmentName, "-w", "sequence.sequenceID = '"+sequenceID+"'"]);
			});
			
		}
		
	}

});


//-~-~ SUBROUTINES

// get a list of sequence IDs from a given source in an alignment
function get_refcon_data(resultMap, refconDataPath) {

  // Load EVE reference data from tab file 
  var loadResult;
  glue.inMode("module/hepadnaviridaeTabularUtility", function() {
	  loadResult = glue.tableToObjects(glue.command(["load-tabular", refconDataPath]));
	  glue.log("INFO", "load result was:", loadResult);
  });

  _.each(loadResult, function(eveObj) {

	  var source_name = eveObj.source_name
	  var sequenceID = eveObj.sequenceID
	  var locus_numeric_id = eveObj.locus_numeric_id;
	  glue.log("INFO", "Setting locus data for EVE reference:", eveObj.sequenceID);
	  resultMap[locus_numeric_id] = eveObj;
	
  });
  
}

// check whether an alignment exists
function does_alignment_exist(alignmentName) {

	var alignmentExists = undefined;
	// glue.log("INFO", "Checking for alignment ", alignmentName);

    alignmentResult = glue.tableToObjects(glue.command(["list", "alignment", "-w", "name = '"+alignmentName+"'"]));
	//glue.log("INFO", "list result was:", alignmentResult);

	var rowObj =  alignmentResult[0];
	if (rowObj) {
		alignmentExists = rowObj['name'];
		//glue.log("INFO", "got exists value:", alignmentExists);
	}
	
	return alignmentExists;
}
