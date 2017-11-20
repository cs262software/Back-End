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
exports.getBlocking = function( lid, callback ) {
	if ( !lid ) return "NO RESULTS FOUND\n";
	var sql = 'SELECT * FROM `theatreappsuite`.`blocking` WHERE LineID = ?';
	var inserts = [ lid ];
	sql = mysql.format( sql, inserts);

	
	db.queryDB( conn, sql, function( res ) {
		// blocking info for each key stored in array where index i corresponds to info for character i
		var characterID = [], lineID =[] , originx = [], originy = [], destx = [], desty = [], movementType = [], orientation = [];
		// loop through all rows returned from db
		for (var i=0; i<res.length; i++) {
			characterID[i] = res[i].CharacterID;
			lineID[i] = res[i].LineID;
			originx[i] = res[i].OriginX;
			originy[i] = res[i].OriginX;
			destx[i] = res[i].DestX;
			desty[i] = res[i].DestY;
			movementType[i] = res[i].MovementType;
			orientation[i] = res[i].Orientation;
		}

		callback( characterID ? characterID : "NO CHARACTER ID FOUND\n",
			lineID ? lineID : "NO LINE ID FOUND\n",
			originx ? originx : "NO ORIGIN-X FOUND\n",
			originy ? originy : "NO ORIGIN-Y FOUND\n",
			destx ? destx : "NO DEST-X FOUND\n",
			desty ? desty : "NO DEST-Y FOUND\n",
			movementType ? movementType : "NO MOVEMENTTYPE FOUND\n",
			orientation ? orientation : "NO ORIENTATION FOUND\n"
			);
	} );
}


