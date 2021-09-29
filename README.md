# Fixm-To-ACRIS-Converter-Lib

Nodejs library for FIXM 4.2 XML schema to ACRIS JSON Schema converter which take an FIXM xml data as an input and produce ACRIS based JSON ouput. The sample folder has file which shows how to use the library.  


####  * The Project Consist of * ####
	-  JSON files that maps the fixm xml tags to ACRIS attributes
	-  Typescript source code
	-  scripts to convert the project to js
	-  Sample code in JS
#### * Running the sample * ####
	-  Build the project using “npm run build”
	-  Go to the sample folder
	-  run “ node sample.js”
	-  This will generate an ACRIS.json file corresponding  to the given fixm sample
        -  The file acris.json have the output of the execution.
	
The transformFixmToAcris and parseFixmFromFile function are  entry points into lib. The function transformFixmToAcris access XML file contenet and schema version. The function parseFixmFromFile accepts the file path and version . Version is optional filed . Default is 4.2 
	

