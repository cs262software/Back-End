/*
 * blockingModel.js contains the blocking-related functions that interact with the DB
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
 * getBlockingByLineID returns the blocking instructions at or before the LineID passed to the function
 *
 * @param: lid, the LineID
 *
 * @param: callback, the callback function
 *
 * @return: blocking elements stored in arrays with i indices corresponding to i characters
 */
exports.getBlockingByLineID = function( lid, callback ) {

	var sql = (`
		SELECT line.PlayID, line.ActNum, line.SceneNum, line.LineNum
		FROM line
		WHERE LineID = ?
	`);
	var inserts = [ lid ];
	sql = mysql.format( sql, inserts );

	db.queryDB( conn, sql, function( res ) {
		if (res.length > 0) {
			sql = (`
				SELECT characterline.LineID AS LineID, characterline.CharacterID AS CharacterID, characterinfo.Name AS Name,
				blocking.OriginX AS OriginX, blocking.OriginY AS OriginY, blocking.OriginZ AS OriginZ,
				blocking.DestX AS DestX, blocking.DestY AS DestY, blocking.DestZ AS DestZ,
				blocking.MovementType AS MovementType, blocking.Orientation AS Orientation

				FROM line
				JOIN theatreappsuite.characterline ON characterline.LineID = line.lineID
				JOIN theatreappsuite.characterinfo ON characterinfo.CharacterID = characterline.CharacterID
				JOIN theatreappsuite.blocking ON blocking.BlockingID = characterline.BlockingID

				WHERE PlayID = ?
				AND ActNum = ?
				AND SceneNum = ?
				AND LineNum <= ?

				ORDER BY LineNum DESC
			`);

			inserts = [ res[0].PlayID, res[0].ActNum, res[0].SceneNum, res[0].LineNum ];
			sql = mysql.format( sql, inserts );

			db.queryDB( conn, sql, function( res2 ) {
				callback(res2);
			});
		}
		else {
			callback(res);
		}
	});
}
