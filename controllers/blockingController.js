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
		blockingModel.getBlocking(lid, function(blocking) {
			res.send(blocking);
		} );
		
	}	
}


exports.updateBlocking = function( req, res ) {
	var lid = req.query.LineID;
	if( !lid ) {
		res.status(400).send({ error: "Missing lineID."});
	} else {
		for(var updateLine in req) {
			lid = update.query.LineID;
			var charID = update.query.characterID;
			var name = update.query.Name;
			var destx = updateLine.query.DestX;
			var desty = updateLine.query.DestY;
			var destz = updateLine.query.DestZ;
			blockingModel.updateBlocking(lid, charID, name, destx, desty, destz, function(success) {
				res.send(success);
			} );
		}
	}
}