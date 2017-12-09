/*
 * fileManager.js contains the functions that handle file content related tasks
 */

'use strict';

// Initialize globals
var fileModel = require('../models/fileModel.js')
var fs = require( "fs" );

/*
 * getFile returns the contents of a file if the requesting user has permission
 *
 * @param: req.query.uid, the user id
 * @param: req.query.fid, the file id
 *
 * @return: Requested file content
 */
exports.getFile = function( req, res ) {
	var filePath = req.query.filePath;
	fs.stat( filePath, function( err, stat ) {
		if( err == null ) {
			var responseData = {
				content: fs.readFileSync( filePath, "utf-8" ),
			}
			var jsonContent = JSON.stringify(responseData);
			res.send(jsonContent);
		} else if( err.code == 'ENOENT' ) {
			console.log( err.code );
			res.send( 'FILE DOES NOT EXIST\nPath: ' + filePath );
		} else {
			console.log( 'FILE ERROR: ', err.code );
		}
	} );
}

exports.getAllFiles = function( req, res ) {
	fileModel.getAllFiles(function(fileList) {
		res.send(fileList);
	});
}

exports.postFile = function( req, res ) {
	if (!req.body.file) {
		return res.status(400).send("No file was uploaded.");
	}

	const file = req.body.file;
	const fileName = req.body.fileName;
	fs.writeFile('./parsing/output/' + fileName, file, (err) => {
		if (err) {
			res.status(500).send();
		}

		return res.status(200).send("File uploaded successfully!");
	});
}
