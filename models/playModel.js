/**
 * playModel.js contains the play-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelUser = require( './modelUser' );
var conn  = mysql.createConnection( {
	host	 : 'localhost',
	user	 : modelUser.username,
	password : modelUser.password,
	database : 'theatreappsuite',
} );

/**
 * getAllPlays returns a list of the scripts in the database
 *
 * @param: callback, the callback function
 *
 * @return: list of scripts
 */
exports.getAllPlays = function(callback) {
	var sql = "SELECT Name, PlayID FROM theatreappsuite.play";

	db.queryDB( conn, sql, function(res) {
		callback(res);
	});
}

/**
 * getActsByPlayID searches the DB for the acts associated with the play provided
 *
 * @param: playId, the PlayID
 * @param: callback, the callback function
 *
 * @return: the number of acts in the play
 */

exports.getActsByPlayID = function(playId, callback) {
	var sql = "SELECT DISTINCT ActNum FROM Line WHERE PlayID = ? ORDER BY ActNum ASC;"
	var inserts = [playId];
	sql = mysql.format(sql, inserts);

	db.queryDB(conn, sql, function(res) {
		callback(res);
	});
}

/**
 * getScenesByActNum searches the DB for the scenes associated with the play and act provided
 *
 * @param: playId, the PlayID
 * @param: actNum, the act number in that specific play
 * @param: callback, the callback function
 *
 * @return: the number of scenes in that act
 */

exports.getScenesByActNum = function(playId, actNum, callback) {
	var sql = "SELECT DISTINCT SceneNum FROM Line WHERE PlayID = ? AND ActNum = ? ORDER BY SceneNum ASC;"
	var inserts = [playId, actNum];
	sql = mysql.format(sql, inserts);

	db.queryDB(conn, sql, function(res) {
		callback(res);
	});
}

/**
 * getLinesBySceneNum gets the lines and ids from a play given playID, actNum, and sceneNum
 *
 * @param: playID
 * @param: actNum
 * @param: sceneNum
 * @param: callback (function)
 *
 * @return: list of lines and ids and notes
 */
exports.getLinesBySceneNum = function(playID, actNum, sceneNum, callback) {
	var sql = "SELECT LineID, LineNum, Text FROM line WHERE PlayID = ? AND ActNum = ? AND SceneNum = ?";
	var inserts = [playID, actNum, sceneNum];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res);
	});
}

/**
 * getNote gets the DirectorsNote of a given line
 *
 * @param: lineID
 * @param: callback (function)
 *
 * @return: list of lines and ids and notes
 */
exports.getNote = function(lineID, callback) {
	var sql = "SELECT DirectorNote FROM line WHERE LineID = ?";
	var inserts = [lineID];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		if (!res[0]) {
			callback("");
		} else {
			callback(res[0].DirectorNote);
		}
	});
}

/**
 * updateNote updates the DirectorsNote of a given line
 *
 * @param: lineID
 * @param: note
 * @param: callback (function)
 *
 * @return: Success? (bool)
 */
exports.updateNote = function(lineID, note, callback) {
	console.log( "note " + note + " lineID " + lineID);
	var sql = "UPDATE line SET DirectorNote = ? WHERE LineID = ?";
	var inserts = [note, lineID];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res.affectedRows == 1);
	});
}
