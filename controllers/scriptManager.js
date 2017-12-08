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
	var file = 'parsing/output/' + req.query.file;
	
	
	
	fs.stat( file, function( err, stat ) {
			if( err == null ) {
				var xml = fs.readFileSync(file)
				xml = xml.toString();
				res.send(model.inputXML(xml));
			} else if( err.code == 'ENOENT' ) {
				console.log( err.code );
				res.send( 'FILE DOES NOT EXIST\nPlayID: ' + file );
			} else {
				console.log( 'FILE ERROR: ', err.code );
			}
	});
	
   
}
