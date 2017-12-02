/*
 * userModel.js contains the file-related functions that interact with the DB

Create an endpoint to update role sharing settings.
This should accept an array of objects.
The objects should contain the role id, a value specifying
whether the user is being added (included)
or removed (excluded) from a file, and the file id.
Should update the database accordingly.
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
* updateUser updates role sharing settings.
*
* @param: an array of objects [roleID, add or remove user from, file ID]
* @return: updated database
*
*/

exports.updateUser = function(roleID, update, fileID) {
    var sql = ";"
    var inserts = [roleID, add/include or removed/excluded from file, fileID];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function(res) {
      //put username length checking here if not handled by front-end
      callback(res.insertId);
    });
}

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
