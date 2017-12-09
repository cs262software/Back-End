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
	var sql = "SELECT DISTINCT ActNum FROM line WHERE PlayID = ? ORDER BY ActNum ASC;"
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
	var sql = "SELECT DISTINCT SceneNum FROM line WHERE PlayID = ? AND ActNum = ? ORDER BY SceneNum ASC;"
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
	var sql = (`
		SELECT line.LineID AS LineID, line.LineNum AS LineNum, line.Text AS Text,
		characterinfo.Name AS CharacterSpeaking

		FROM line
		LEFT JOIN characterline ON (characterline.LineID = line.LineID AND characterline.Speaking = true)
		LEFT JOIN characterinfo ON characterinfo.CharacterID = characterline.CharacterID

		WHERE line.PlayID = ? AND line.ActNum = ? AND line.SceneNum = ?
	`);
	var inserts = [playID, actNum, sceneNum];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res);
	});
}

/**
 * getLinesByPlayAndCharacter gets the lines and ids from a play given playID, and characterID
 *
 * @param: playID
 * @param: characterID
 * @param: callback (function)
 *
 * @return: list of lines and ids
 */
exports.getLinesByPlayAndCharacter = function(playID, characterID, callback) {
	var sql = (`
		SELECT ActNum, SceneNum, Text
		FROM line l
		INNER JOIN characterline cl ON l.LineID = cl.LineID
		WHERE l.PlayID = ? AND cl.CharacterID = ?
		ORDER BY l.ActNum, l.SceneNum
	`);
	var inserts = [playID, characterID];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res);
	});
}

/**
 * getNoteByLineID gets the DirectorsNote of a given line
 *
 * @param: lineID
 * @param: callback (function)
 *
 * @return: list of lines and ids and notes
 */
exports.getNoteByLineID = function(lineID, callback) {
	var sql = "SELECT DirectorNote FROM line WHERE LineID = ?";
	var inserts = [lineID];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res);
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
exports.updateDirectorsNote = function(lineID, note, callback) {
	var sql = "UPDATE line SET DirectorNote = ? WHERE LineID = ?";
	var inserts = [note, lineID];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res);
	});
}
