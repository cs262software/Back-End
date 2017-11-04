'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'accountModel',
	password : modelPass.accountModelPass,
	database : 'DatabaseNameHere',
} );

exports.readUser = function(username, password) {
	db.connectDB( conn );
	var sql = "SELECT `UserID` FROM `theatreappsuite`.`user` WHERE `UserName` = \"?\"";
	var inserts = [username];
	sql = mysql.format( sql, inserts );
	db.query( conn, sql, function( res ) {
	  var uid = res[0].UserID;
	  callback( uid ? uid : "USER NOT FOUND" );
	} );
}

exports.createUser = function(username, password) {
	db.connectDB( conn );
	var sql = "INSERT INTO `theatreappsuite`.`user` (`UserName`, `Password`) VALUES (?, ?);"
	var inserts = [username, password];
	sql = mysql.format( sql, inserts );


	// return the ID
	var sql = "SELECT `UserID` FROM `theatreappsuite`.`user` WHERE `UserName` = \"?\"";
	var inserts = [username];
	sql = mysql.format(sql, inserts);

}