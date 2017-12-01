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

exports.getAllFiles = function(callback) {
		var sql = "SELECT FROM theatreappsuite.file";
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
