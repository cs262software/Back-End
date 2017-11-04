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
	user     : 'theatreSuiteUser',
	password : modelPass.loginModelPass,
	database : 'theatreappsuite',
});

/*
 * postLogin searches db for user id if the credentials are found.
 *
 * @param: userName, the user's calvin username eg "abc3"
 * @param: password, the user's password
 *
 * @return: userId or null
 */

exports.postLogin = function( userName, password, callback ) {
    if ( !userName || !password ) return null;
    var sql = "SELECT UserId FROM theatreappsuite.user WHERE UserName = ? AND Password = ? LIMIT 0, 1";
    var inserts = [ userName, password ];
    sql = mysql.format( sql, inserts );
    db.queryDB( conn, sql, function( res ) {
		if (res.length > 0 && res[0].UserId) {
			callback(res[0].UserId);
		}
        else {
        	callback( null );
		}
    });
}
