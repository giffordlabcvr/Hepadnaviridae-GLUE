// Remove feature location annotations all reference sequences except master
glue.command(["multi-delete", "feature_location", "-w", "referenceSequence.name not like '%MASTER%'"]);

var generaArray = [ "Orthohepadnavirus", "Avehepadnavirus", "Herpetohepadnavirus", 
                     "Metahepadnavirus", "Parahepadnavirus", "Nakednavirus"  ];

var generaMap = {};
generaMap['Orthohepadnavirus']    = 'REF_Ortho_MASTER_HBV';
generaMap['Avehepadnavirus']      = 'REF_Ave_MASTER_DHBV';
generaMap['Herpetohepadnavirus']  = 'REF_Herpeto_MASTER_tfHBV';
generaMap['Metahepadnavirus']     = 'REF_Meta_MASTER_bgHBV';
generaMap['Parahepadnavirus']     = 'REF_Para_MASTER_wsHBV';
generaMap['Nakednavirus']        = 'REF_Nackedna_MASTER_ACNDV';

var alignmentMap = {};
alignmentMap['Orthohepadnavirus'] = 'AL_Orthohepadna';
alignmentMap['Avehepadnavirus'] = 'AL_Avehepadna';
alignmentMap['Herpetohepadnavirus'] = 'AL_Herpetohepadna';
alignmentMap['Metahepadnavirus'] = 'AL_Metahepadna';
alignmentMap['Parahepadnavirus'] = 'AL_Parahepadna';
alignmentMap['Nakednavirus']  = 'AL_Nakedna';

// Iterate through genera
_.each(generaArray, function(genusName) {
    inheritFeaturesFromGenusMaster(genusName);
});

// Get feature names for a give reference sequence
function inheritFeaturesFromGenusMaster(genusName) {

    var genusRefMaster = generaMap[genusName];
    var genusAlignment = alignmentMap[genusName];

	//glue.logInfo("genusRefMaster "+generaMap);
	//glue.logInfo("genusAlignment "+genusAlignment);

	glue.logInfo("Genus "+genusName+" - ref: "+genusRefMaster+" msa: "+genusAlignment);

	// Get list of features on master reference
	var featuresToInherit = get_features(genusRefMaster);

	// Get genus reference sequences
	var genusRefSeqObjs = get_genus_references(genusName);

	_.each(genusRefSeqObjs, function(refSeqObj) {
	
		if (refSeqObj.name != genusRefMaster) {
	
			for(var k = 0; k < featuresToInherit.length; k++) {
				var featureID = featuresToInherit[k];
				glue.logInfo(" Inheriting feature: "+featureID+" from "+genusRefMaster+" to "+refSeqObj.name);		

				glue.inMode("reference/"+refSeqObj.name, function() {
					glue.command(["inherit", "feature-location", 			
						genusAlignment, "-l", genusRefMaster, featureID]);
				});
			}			
		}
	});

	
}

// Get feature names for a give reference sequence
function get_features(refseqID) {

	var myFeatures;	
	glue.inMode("reference/"+refseqID, function(){
		myFeatures = glue.getTableColumn(glue.command(["list", "feature-location"]), "feature.name");
	});
	return myFeatures;
}

// Get feature names for a give reference sequence
function get_genus_references(genusName) {

	// Get all genus reference sequences
	var resultMap = {};
	var whereClause = "genus = '"+genusName+"' and source.name = 'ncbi-refseqs' or genus = '"+genusName+"' and source.name = 'fasta-refseqs'";
	var genusRefSeqObjs = glue.tableToObjects(glue.command(["list", "sequence","sequenceID", "name", "genus","-w",whereClause]));
	_.each(genusRefSeqObjs,function(resultObj){
		var sequenceID = resultObj.sequenceID;
		var refSeqName = resultObj.name;
		var refGenus = resultObj.genus;
	    glue.logInfo("Refseqs id: "+sequenceID+" name: "+refSeqName+" genus: "+refGenus);
		resultMap[sequenceID] = resultObj;
	});		


    var genusRefSeqObjs = [];
	var genusReferences = glue.tableToObjects(glue.command(["list", "reference", "sequence.sequenceID", "name" ]));
	_.each(genusReferences, function(refSeqObj) {

		var refSeqName = refSeqObj['name'];        
		var refSeqID   = refSeqObj['sequence.sequenceID'];
	    
	    //glue.logInfo("Reference id='"+refSeqID+"', name='"+refSeqName+"'");
		if (resultMap[refSeqID]) {
	  
	         glue.logInfo("Adding "+genusName+" reference: "+refSeqObj+" - id='"+refSeqID+"', name='"+refSeqName+"'");;
			 genusRefSeqObjs.push(refSeqObj); 
		}
		
	});
	return genusRefSeqObjs;
	
}










