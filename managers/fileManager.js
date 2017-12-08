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
	filePath = "../" + filePath;
	fs.stat( filePath, function( err, stat ) {
		if( err == null ) {
			var content = fs.readFileSync( filePath, "utf-8" );
			res.send( content );
		} else if( err.code == 'ENOENT' ) {
			console.log( err.code );
			res.send( 'FILE DOES NOT EXIST\nFile Path: ' + filePath);
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
