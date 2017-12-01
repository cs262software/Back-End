/**
 * fileModel.js contains the file-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelUser = require( './modelUser' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : modelUser.username,
	password : modelUser.password,
	database : 'theatreappsuite',
} );
var fs = require ( 'fs' );

exports.getAllFiles = function(callback) {
	var fileList = [];
	var files = fs.readdirSync('./parsing/output/');

	for (var i in files) {
		if ( !files.hasOwnProperty(i) ) continue;
		var name = './parsing/output' + '/' + files[i];
		if ( !fs.statSync(name).isDirectory() ) {
			fileList.push(name);
		}
	}
	callback(fileList);
}

/**
 * getFilePath searches db for file path if it is viewable by user
 *
 * @param: uid, user id
 * @param: fid, file id
 *
 * @return: file path
 */
exports.getFilePath = function( playID, callback ) {
	if ( !playID ) return "NO RESULTS FOUND\n";
	var sql = "SELECT FilePath FROM play WHERE playID = ?";
	var inserts = [ playID ];
	sql = mysql.format( sql, inserts );
	db.queryDB( conn, sql, function( res ) {
		var filePath = res[0].FilePath;
		callback( filePath ? filePath : "NO RESULTS FOUND\n" );
	} );
}
