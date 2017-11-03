/**
 * fileModel.js contains the file-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'andrew',
	password : modelPass.fileModelPass,
	database : 'theatreappsuite',
} );

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
