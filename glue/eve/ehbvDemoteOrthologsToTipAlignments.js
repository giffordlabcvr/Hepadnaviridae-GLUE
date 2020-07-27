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
glue.log("INFO", "RESULT WAS ", ehbvRefseqResultMap);


// Add DIGS sequences to root alignment
// add member -w "source.name = 'fasta-digs-ehbv'"
glue.inMode("/alignment/"+rootAlignment, function() {
	glue.command(["add", "member", "-w", "source.name = 'fasta-digs-ehbv'"]);

});


// Load DIGS hit data from tabular file 
var loadResult;
glue.inMode("module/hepadnaviridaeTabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/ehbv-side-data.tsv"]));
	// glue.log("INFO", "load result was:", loadResult);
});


// Iterate on DIGS data, adding sequences to alignments as appropriate
_.each(loadResult, function(eveObj) {

	// Get the locus ID
	var locus_name = eveObj.locus_name;
	var locus_numeric_id = eveObj.locus_numeric_id;
	var sequenceID = eveObj.sequenceID;
	
	glue.log("INFO", "Sequence ID", eveObj.sequenceID);
	glue.log("INFO", "Locus ID", eveObj.locus_numeric_id);
	glue.log("INFO", "Locus name:", eveObj.locus_name);

	if (locus_name == 'NK') { // Skip elements that haven't been assigned to a locus
	
	}
	
	else {
	
		// Does an alignment exist for this locus ID
	    var alignmentName = locus_name.replace("ortho.", "AL_EHBV-");
		glue.log("INFO", "Adding sequence:", eveObj.id);
		glue.log("INFO", "to alignment", alignmentName);

		var alignmentExists = does_alignment_exist(alignmentName);
		
		if (alignmentExists) {

			// Add the sequence to the alignment
			glue.inMode("/alignment/"+alignmentName, function() {
				glue.command(["add", "member", "-w", "sequenceID = '"+sequenceID+"'"]);
			});
			
		}
		else  {
		
			// If not create the alignment
				
			// Get the taxonomy 
			var locusObj    = ehbvRefseqResultMap[locus_numeric_id];
	        glue.log("INFO", "LOADED EHBV INFO ", locusObj);
		
			var clade_ns    = locusObj.virus_clade_ns;
			var subclade_ns = locusObj.virus_subclade_ns;
			var clade_vp    = locusObj.virus_clade_vp;
			var subclade_vp = locusObj.virus_subclade_vp;
			
			var parentAlignmentName;
			if (subclade_ns == 'NULL') {
					
				parentAlignmentName = "AL_EHBV_" + subclade_vp;		
			}
			else {
			
				parentAlignmentName = "AL_EHBV_" + subclade_ns;
				
			}
	        glue.log("INFO", "PARENT ALIGNMENT: ", parentAlignmentName);
						
			// Create the alignment
			var refseqName = "REF_EHBV_" + locus_name;
	        glue.log("INFO", "CONSTRAINING REFERENCE: ", refseqName);

            // create alignment -r 
			//createAlignmentResult = glue.tableToObjects(glue.command(["create", "alignment", alignmentName, "-r", refseqName]));
			//glue.log("INFO", "create alignment result was:", createAlignmentResult); 

			// Add the sequence to the alignment
			//glue.inMode("/alignment/"+alignmentName, function() {
			//	glue.command(["add", "member", "-w", "sequenceID = '"+sequenceID+"'"]);
			//});
			
		}		
	}

});


//-~-~ SUBROUTINES

// get a list of sequence IDs from a given source in an alignment
function get_refcon_data(resultMap, refconDataPath) {

  // Load EVE reference data from tab file 
  var loadResult;
  glue.inMode("module/aavTabularUtility", function() {
	  loadResult = glue.tableToObjects(glue.command(["load-tabular", refconDataPath]));
	  // glue.log("INFO", "load result was:", loadResult);
  });

  _.each(loadResult, function(eveObj) {

	  var source_name = eveObj.source_name
	  var sequenceID = eveObj.sequenceID
	  var locus_numeric_id = eveObj.locus_numeric_id;
	  glue.log("INFO", "Setting locus data for EVE reference:", eveObj.sequenceID);
	  resultMap[locus_numeric_id] = eveObj;
	
  });
  
}

// get a list of sequence IDs from a given source in an alignment
function does_alignment_exist(alignmentName) {

	var alignmentExists;
	  glue.log("INFO", "Checking for alignment ", alignmentName);

    alignmentResult = glue.tableToObjects(glue.command(["list", "alignment", "-w", "name = '"+alignmentName+"'"]));
	glue.log("INFO", "list result was:", alignmentResult);
	
	alignmentExists = alignmentResult['name'];
		
	return alignmentExists;
}

