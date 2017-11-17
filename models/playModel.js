/**
 * playModel.js contains the play-related functions that interact with the DB
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

/**
 * getPlayList returns a list of the scripts in the database
 *
 * @param: callback, the callback function
 *
 * @return: list of scripts
 */
exports.getPlayList = function(callback) {
	var sql = "SELECT Name, PlayID FROM theatreappsuite.play";

	db.queryDB( conn, sql, function(res) {
		callback(res);
	});
}

/**
 * getLines gets the lines and ids from a play given playID, actNum, and sceneNum
 *
 * @param: playID
 * @param: actNum
 * @param: sceneNum
 * @param: callback (function)
 *
 * @return: list of lines and ids and notes
 */
exports.getLines = function(playID, actNum, sceneNum, callback) {
	var sql = "SELECT LineID, LineNum, Text FROM line WHERE PlayID = ? AND ActNum = ? AND SceneNum = ?";
	var inserts = [playID, actNum, sceneNum];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res);
	});
}
