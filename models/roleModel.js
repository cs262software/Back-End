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
	user     : 'theatreSuiteUser',
	password : modelPass.fileModelPass,
	database : 'theatreappsuite',
} );

/**
 * getFilePath searches db for role path if it is viewable by user
 *
 * @param: uid, user id
 * @param: pid, play id
 *
 * @return: role path
 */
exports.getRolePath = function( userID, playID, callback ) {
	if ( !userID ) return "NO RESULTS FOUND\n";
    var sql = "SELECT Director, StageManager, AsstStageManager, Light, Sound, StageCrew, Actor FROM permissions WHERE userID = ? AND playID = ?";
	var inserts = [ userID, playID ];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function (res) {
        
        callback(res ? res : "NO RESULTS FOUND\n");
    });
}


