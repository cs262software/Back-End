/*
 * blockingModel.js contains the blocking-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'theatreSuiteUser',
	password : modelPass.blockingModelPass,
	database : 'theatreappsuite',
} );


/**
 * getBlocking returns the blocking instructions associated with the LineID passed to the function
 *
 * @param: lid, the LineID
 *
 * @param: callback, the callback function
 *
 * @return: blocking elements stored in arrays with i indices corresponding to i characters
 */
exports.getBlockingScene = function( lid, callback ) {
	if ( !lid ) return "NO RESULTS FOUND\n";
	var sql = "SELECT characterline.lineid AS LineID, characterline.characterid AS CharacterID, characterinfo.name AS Name, \
	blocking.originx AS OriginX, blocking.originy AS OriginY, blocking.originz AS OriginZ, blocking.destx AS DestX, blocking.desty AS DestY, blocking.destz AS DestZ, blocking.movementType AS MovementType, blocking.orientation AS Orientation \
	FROM characterline \
	INNER JOIN theatreappsuite.blocking ON characterline.BlockingID = blocking.BlockingID \
	INNER JOIN theatreappsuite.characterinfo ON characterline.CharacterID = characterinfo.CharacterID \
	WHERE Play = ? AND ActNum = ? AND SceneNum = ?";
	var inserts = [ lid ];
	sql = mysql.format( sql, inserts);

/**
 * getBlocking returns the blocking instructions associated with the LineID passed to the function
 *
 * @param: lid, the LineID
 *
 * @param: callback, the callback function
 *
 * @return: blocking elements stored in arrays with i indices corresponding to i characters
 */
exports.getBlocking = function( lid, callback ) {
	if ( !lid ) return "NO RESULTS FOUND\n";
	var sql = "SELECT characterline.lineid AS LineID, characterline.characterid AS CharacterID, characterinfo.name AS Name, \
	blocking.originx AS OriginX, blocking.originy AS OriginY, blocking.originz AS OriginZ, blocking.destx AS DestX, blocking.desty AS DestY, blocking.destz AS DestZ, blocking.movementType AS MovementType, blocking.orientation AS Orientation \
	FROM characterline \
	INNER JOIN theatreappsuite.blocking ON characterline.BlockingID = blocking.BlockingID \
	INNER JOIN theatreappsuite.characterinfo ON characterline.CharacterID = characterinfo.CharacterID \
	WHERE LineID = ?";	
	var inserts = [ lid ];
	sql = mysql.format( sql, inserts);



	
	db.queryDB( conn, sql, function( res ) {

		if ( res.length == 0) {
			if ( !lid ) return "NO RESULTS FOUND\n";
			sql = "SELECT characterline.characterid AS CharacterID, characterline.lineid AS LineID, characterinfo.name AS Name \
			FROM characterline \
			INNER JOIN theatreappsuite.characterinfo ON characterline.characterid = characterinfo.characterid \
			WHERE LineID = ?";	
			inserts = [ lid ];
			sql = mysql.format( sql, inserts);

			db.queryDB(conn, sql, function(res2) {
				callback(res2);
			})
		}

		
		else {
			callback(res);
		}



	} );
}


