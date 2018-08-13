# Hepadnaviridae-GLUE

## Description

This is Hepadnaviridae-GLUE: a GLUE project for the [hepadnaviruses](https://viralzone.expasy.org/9?outline=all_by_species) (family Hepadnaviridae ).

[GLUE](http://tools.glue.cvr.ac.uk) is an open source, data-centric bioinformatics environment specialised for developing virus genome data resources (VGDR).

 This [GLUE](http://tools.glue.cvr.ac.uk) project contains reference information for the hepadnavirus family, including:

* A set of hepadnavirus reference sequences linked to auxiliary data.
* A comprehensive list of hepadnavirus genome features and their specific locations on full genome reference sequences.
* Alignments of hepadnavirus reference sequences arranged hierarchically by clade.

## Who can use this resource, and for what?

Hepadnaviridae-GLUE can be used a straightforward data repository, with no requirement for use of the GLUE software framework. 

In addition, the Hepadnaviridae-GLUE project can be developed within the GLUE framework by extending the core dataset with new data and functionality.
So far we have used Hepadnaviridae-GLUE to develop the following GLUE extension projects. 

* [Hepadnaviridae-EVE](https://giffordlabcvr.github.io/Hepadnaviridae-EVE/) - a GLUE project for endogenous hepadnaviral elements.

Note that Hepadnaviridae-GLUE serves as a data repository for hepadnavirus reference data, and these data can be accessed here, without any requirement to install GLUE. 

## Installation

You can install Hepadnaviridae-GLUE on computers running Windows, MacOSX or Linux.

1. Install [GLUE](http://tools.glue.cvr.ac.uk), based on the [GLUE installation instructions](http://tools.glue.cvr.ac.uk/#/installation). 
2. Once GLUE is installed and working, clone the Hepadnaviridae-GLUE repository into your `gluetools/projects` directory.
3. Within the `gluetools/projects/Hepadnaviridae-GLUE` directory, start GLUE and build the Hepadnaviridae-GLUE extension by issuing the following command in GLUE:

```
Mode path: /
GLUE> run file hepadnaviridae.glue
```
4. This should run to completion and produce the `OK` result.


## Contributors

Robert J. Gifford (robert.gifford@glasgow.ac.uk)

Josh Singer (josh.singer@glasgow.ac.uk)

William de Souza (wmarciel2@gmail.com)

## License

The project is licensed under the [GNU Affero General Public License v. 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)
