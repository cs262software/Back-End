/*
 * accountModel.js contains the functions to interact with the DB on the account side
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'root',
	password : modelPass.accountModelPass,
	database : 'theatreappsuite',
} );

/**
 * getPassword searches the DB for the password connected to the username provided
 *
 * @param: username, the username
 * @param: callback, the callback function
 *
 * @return: the salted password and the UserID
 */

exports.getPassword = function(username, callback) {
	var sql = "SELECT `Password`, `UserID` FROM `theatreappsuite`.`user` WHERE `UserName` = ?";
	var inserts = [username];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
	  	if (res.length === 0) {
		  	callback("-1", "-1");
	  		return;
		}
		var hash = res[0].Password;
		var uid = res[0].UserID;
		callback(hash, uid);
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