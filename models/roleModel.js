/**
 * roleModel.js contains the file-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'andrew',
	password : modelPass.roleModelPass,
	database : 'theatreappsuite',
} );

/**
 * getFilePath searches db for role path if it is viewable by user
 *
 * @param: uid, user id
 * @param: rid, role id
 *
 * @return: role path
 */
exports.getRolePath = function( userID, callback ) {
	if ( !userID ) return "NO RESULTS FOUND\n";
	var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
	var inserts = [ userID, playID ];
	sql = mysql.format( sql, inserts );
	db.queryDB( conn, sql, function( res ) {
        var rolePath = res[0].RolePath;
        var director = res[0].director;
        var stageManager = res[0].stageManager;
        var asstStgManager = res[0].asstStgManager;
        var light = res[0].light;
        var sound = res[0].sound;
        var stageCrew = res[0].stageCrew;
        var actor = res[0].actor;
		callback( rolePath ? rolePath : "NO RESULTS FOUND\n" );
	} );
}
