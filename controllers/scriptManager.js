/*
 * scriptManager.js contains the functions that handle script accesses
 */

'use strict';
var model = require('../models/scriptModel')
var fs = require('fs')


/*
 * getScript returns the xml of the script associated with a certain id
 *
 * @param: req.query.id, the id
 *
 * @return: Requested script xml
 */
exports.inputXML = function( req, res ) {
	var id = req.query.id;
	
	var xml = fs.readFileSync('parsing/output/test.xml')
	xml = xml.toString();
	//console.log(xml)
	res.send(model.inputXML(xml));
   
}
