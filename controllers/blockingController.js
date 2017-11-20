/*
 * blockingController.js contains the functions related to blocking tasks
 */

'use strict';

// Initialize globals
var blockingModel = require('../models/blockingModel')


/*
 * getBlocking returns the blocking instructions for given lineid
 *
 * @param: req.line.LineID, the line id
 *
 * @return: a json object whose keys contain arrays of values corresponding to all
 *			blocking instructions and info for all characters associated with a given lineid
 */
exports.getBlocking = function( req, res ) {
	var lid = req.query.LineID;
	if( !lid ) {
		res.status(400).send({ error: "Missing lineID."});
	} else {
		blockingModel.getBlocking( lid, function(characterid, lineid, originx, originy, destx, desty, movementtype, orientation) {
			res.json({
				CharacterID: characterid,
				LineID: lineid,
				OriginX: originx,
				OriginY: originy,
				DestX: destx,
				DestY: desty,
				MovementType: movementtype,
				Orientation: orientation
			})
		});
	}	
}


