/*
 * characterModel.js contains the character-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
//var modelPass = require( './modelPasswords' );
var modelUser = require('./modelUser');

var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : modelUser.username,
	password : modelUser.password,
	database : 'theatreappsuite',
} );

/**
 * getCharactersByScene returns a list of character for a given scene.
 *
 * @param: PlayID, ActNum, SceneNum
 *
 * @param: callback, the callback function
 *
 * @return: a list of character names to ids
 */
exports.getCharactersByScene = function( PlayID, ActNum, SceneNum, callback ) {
    var sql = (`
		SELECT DISTINCT ci.Name, ci.CharacterID
		FROM characterinfo ci
		INNER JOIN characterline cl ON ci.CharacterID = cl.CharacterID
		INNER JOIN line l ON cl.LineID = l.LineID
		WHERE l.PlayID = ? AND l.ActNum = ? AND l.SceneNum = ?
	`);
	var inserts = [ PlayID, ActNum, SceneNum ];
	sql = mysql.format( sql, inserts );

	db.queryDB( conn, sql, function( res ) {
		callback(res);
	});
}
