/*
 * loginModel.js contains the functions to interact with the DB on the login side
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
});

/**
 * createLogin inserts the new account with username and password into the database
 *
 * @param: username, the username
 * @param: password, the password
 * @param: callback, the callback function
 *
 * @return: the new UserID
 */
exports.createLogin = function(username, password, callback) {
	var sql = "INSERT INTO `theatreappsuite`.`user` (`UserName`, `Password`) VALUES (?, ?);"
	var inserts = [username, password];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
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
	var sql = "SELECT `Password`, `UserID` FROM `theatreappsuite`.`user` WHERE `UserName` = ?";
	var inserts = [username];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
	  	if (res.length === 0) {
		  	callback("-1", "-1");
		} else {
			var hash = res[0].Password;
			var uid = res[0].UserID;
			callback(hash, uid);
		}
	});
}
