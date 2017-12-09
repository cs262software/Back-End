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
		characterinfo.Name AS CharacterSpeaking, 0 AS PromptLine, 0 AS CharacterLine

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

exports.getLineNumsByCharacter = function(playID, actNum, sceneNum, characterID, callback) {
	var sql = (`
		SELECT l.LineNum
		FROM line l
		INNER JOIN characterline cl ON cl.LineID = l.LineID
		WHERE cl.CharacterID = ?
		AND cl.Speaking = 1
		AND l.PlayID = ?
		AND l.ActNum = ?
		AND l.SceneNum = ?
	`);
	var inserts = [characterID, playID, actNum, sceneNum];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res);
	});
}

exports.getLinesWithStubs = function(playID, actNum, sceneNum, SQLstubs, callback) {
	var SQLstart = "SELECT base.LineID,  base.LineNum, base.Text, base.CharacterSpeaking, stub.PromptLine, stub.CharacterLine FROM (";
	var SQLbase = "SELECT line.LineID AS LineID, line.LineNum AS LineNum, line.Text AS Text, characterinfo.Name AS CharacterSpeaking FROM line LEFT JOIN characterline ON (characterline.LineID = line.LineID AND characterline.Speaking = true) LEFT JOIN characterinfo ON characterinfo.CharacterID = characterline.CharacterID WHERE line.PlayID = ? AND line.ActNum = ? AND line.SceneNum = ?";
	var baseInserts = [playID, actNum, sceneNum];
	SQLbase = mysql.format(SQLbase, baseInserts);

	var SQLmiddle = ") AS base LEFT JOIN (";

	var stubInserts = [playID, actNum, sceneNum, playID, actNum, sceneNum];
	SQLstubs = mysql.format(SQLstubs, stubInserts);

	var SQLend = ") AS stub ON base.LineID = stub.LineID;";

	var SQLcomplete = SQLstart + SQLbase + SQLmiddle + SQLstubs + SQLend;

	db.queryDB(conn, SQLcomplete, function(finalRes) {
		callback(finalRes);
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
