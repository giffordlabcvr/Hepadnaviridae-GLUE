// ABOUT: script to create tip phylogenies
var outputPath = "trees/eve-tip/";

// Get list of alignments
alignmentResult = glue.tableToObjects(glue.command(["list", "alignment", "-w", "name like '%AL_EHBV%'"]));

// Iterate on DIGS data, adding sequences to alignments as appropriate
_.each(alignmentResult, function(alnObj) {

	// Get the locus ID
	var alignmentName = alnObj.name;
    glue.log("INFO", "Checking for alignment ", alignmentName);

    // How many taxa?
    var numTaxa;
    glue.inMode("/alignment/"+alignmentName, function() {

		alignmentListResult = glue.tableToObjects(glue.command(["list", "member"]));
		numTaxa = alignmentListResult.length;

	});   
    glue.log("INFO", "NUMBER TAXA: ", numTaxa);


	if (numTaxa >= 4) {

		glue.command(["compute", "alignment", alignmentName, "aavMafftAligner"]);
  
		// Record feature coverage in each alignment
		glue.inMode("/module/aavFeaturePresenceRecorder", function() {		
			glue.command(["record", "feature-presence", alignmentName, "--recursive", "--featureName", "whole_genome", "--descendentFeatures" ]);
		});   

		// Create the phylogenies
		glue.inMode("/module/raxmlPhylogenyGenerator", function() {
	 
			var alignmentStem = alignmentName.replace("AL_", "");
	 
			var treeOutputPath = outputPath + alignmentStem + ".tre";
			glue.log("INFO", "Tree will be written to path: ", treeOutputPath);
			glue.command(["generate", "nucleotide",  "phylogeny", alignmentName, "-a", "-o",treeOutputPath, "NEWICK_BOOTSTRAPS" ]);
		});   
	}
	
});



