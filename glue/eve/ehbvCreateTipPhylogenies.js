// ABOUT: script to create tip phylogenies
var outputPath = "trees/eve-orthologs/";

// Get list of alignments
alignmentResult = glue.tableToObjects(glue.command(["list", "alignment", "-w", "name like '%AL_EHBV%'"]));

// Iterate on DIGS data, adding sequences to alignments as appropriate
_.each(alignmentResult, function(alnObj) {

	// Get the locus ID
	var alignmentName = alnObj.name;
    var alignmentStem = alignmentName.replace("AL_", "");
    
    glue.log("INFO", "Checking for alignment ", alignmentName);

    // How many taxa?
    var numTaxa;
    glue.inMode("/alignment/"+alignmentName, function() {

		alignmentListResult = glue.tableToObjects(glue.command(["list", "member"]));
		numTaxa = alignmentListResult.length;

	});   
    glue.log("INFO", "NUMBER TAXA: ", numTaxa);


	if (numTaxa >= 4) {

		glue.command(["compute", "alignment", alignmentName, "hepadnaviridaeMafftAligner"]);
  
		// Record feature coverage in each alignment
		glue.inMode("/module/hepadnaviridaeFeaturePresenceRecorder", function() {		
			glue.command(["record", "feature-presence", alignmentName, "--recursive", "--featureName", "whole_genome", "--descendentFeatures" ]);
		});   

		// Create the phylogeny
		glue.inMode("/module/raxmlPhylogenyGenerator", function() {
	 
			
	 
			var treeOutputPath = outputPath + alignmentStem + ".tre";
			glue.log("INFO", "Tree will be written to path: ", treeOutputPath);
			glue.command(["generate", "nucleotide",  "phylogeny", alignmentName, "-a", "-o",treeOutputPath, "NEWICK_BOOTSTRAPS" ]);


		});   
		
		// Reroot the phylogenies
		glue.inMode("/module/hepadnaPhyloUtility", function() {

			var midpointPath = outputPath + alignmentStem + ".midpointRooted.tre";
			glue.log("INFO", "Tree will be written to path: ", midpointPath);
			glue.command(["reroot-phylogeny", "--inputFile",  treeOutputPath, "NEWICK_BOOTSTRAPS",  "--midpoint", "--outputFile", midpointPath, "NEWICK_BOOTSTRAPS" ]);

		});   

		
		// Export the annotations
		glue.inMode("/module/ehbvFigTreeAnnotationExporter", function() {

			var annotationPath = outputPath + alignmentStem + ".figtree-annotations.tsv";
			glue.log("INFO", "Tree will be written to path: ", midpointPath);
			glue.command(["export", "figtree-annotation",  alignmentName, "-f", annotationPath ]);

		});   
		
	}

});


