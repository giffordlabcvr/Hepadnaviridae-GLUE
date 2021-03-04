Begin SCREENDB;
	db_name=eve_hepadna;
	mysql_server=localhost;
ENDBLOCK;

BEGIN SCREENSETS;
	query_aa_fasta=/home2/giff01r/DIGS/projects/eve/final_fasta/hepadna-probes.faa;
	reference_aa_fasta=/home2/giff01r/DIGS/projects/eve/final_fasta/hepadna-refs.faa;
	consolidated_reference_aa_fasta=/home2/giff01r/DIGS/projects/eve/final_fasta/hepadna_refs_consolidate_final.faa;
	output_path=./tmp/;
	bitscore_min_tblastn=60;
	seq_length_minimum=40;
	defragment_range=1000;
	consolidate_range=3000;
	blast_threads=8;
ENDBLOCK;

BEGIN TARGETS;
	Aves/
	Squamata/
	Crocodilia/
	Amphibia/
	Actinopterygii/
	Sarcopterygii/
	Chondrichthyes/
ENDBLOCK;

