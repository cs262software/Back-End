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

/**
 * createUser inserts the new account with username and password into the database
 *
 * @param: username, the username
 * @param: password, the password
 * @param: callback, the callback function
 *
 * @return: the new UserID
 */
exports.createUser = function(username, password, callback) {
	var sql = "INSERT INTO `theatreappsuite`.`user` (`UserName`, `Password`) VALUES (?, ?);"
	var inserts = [username, password];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		// put username length checking here if not handled by front-end
		callback(res.insertId);
	});
}

/**
 * getPassword searches the DB for the password connected to the username provided
 *
 * @param: username, the username
 * @param: callback, the callback function
 *
 * @return: the salted password and the UserID
 */

exports.getPassword = function(username, callback) {
	var sql = "SELECT Password, UserID FROM theatreappsuite.user WHERE UserName = ?";
	var inserts = [username];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
	  	if (res.length > 0 && res[0].Password && res[0].UserID) {
			var hash = res[0].Password;
			var uid = res[0].UserID;
			callback(hash, uid);
		}
		else {
			callback("-1", "-1");
		}
	});
}

/*
 * postLogin searches db for user id if the credentials are found.
 *
 * @param: userName, the user's calvin username eg "abc3"
 * @param: password, the user's password
 *
 * @return: userId or null
 */

// exports.postLogin = function( userName, password, callback ) {
//     if ( !userName || !password ) return null;
//     var sql = "SELECT UserId FROM theatreappsuite.user WHERE UserName = ? AND Password = ? LIMIT 0, 1";
//     var inserts = [ userName, password ];
//     sql = mysql.format( sql, inserts );
//     db.queryDB( conn, sql, function( res ) {
// 		if (res.length > 0 && res[0].UserId) {
// 			callback(res[0].UserId);
// 		}
//         else {
//         	callback( null );
// 		}
//     });
// }
