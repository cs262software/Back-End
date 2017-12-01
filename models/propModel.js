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
 * getAllPlays returns a list of the scripts in the database
 *
 * @param: callback, the callback function
 *
 * @return: list of scripts
 */
exports.getProps = function(lineID, callback) {
	var sql = "SELECT prop.PropID, Name, Description, UserID, MovementDescription FROM prop INNER JOIN propmovement ON prop.PropID = propmovement.PropID where propmovement.LineID = ?;"
	var inserts = [lineID];
	sql = mysql.format(sql, inserts);

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
    var sql = "SELECT MAX(ActNum) as 'NumActs' FROM Line WHERE PlayID = ?;"
    var inserts = [playId];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if (res[0].NumActs === null) {
            callback("-1");
        }
        var actAmount = res[0].NumActs;
        callback(actAmount);
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
    var sql = "SELECT MAX(SceneNum) as 'NumScenes' FROM Line WHERE PlayID = ? AND ActNum = ?;"
    var inserts = [playId, actNum];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if (res[0].NumScenes === null) {
            callback("-1");
        }
        var sceneAmount = res[0].NumScenes;
        callback(sceneAmount);
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
