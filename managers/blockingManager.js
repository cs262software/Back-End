/**
 * blockingController.js contains the functions related to blocking tasks
 */

'use strict';

// Initialize globals
var blockingModel = require('../models/blockingModel');

/**
 * getBlockingByLineID
 * 
 * returns the blocking instructions for given LineID, as well as the
 * last instruction for each character blocked (but not necessary changing
 * their blocking) before specified line
 *
 * @param: req.params.LineID, the line id
 *
 * @return: blocking, (json) all instructions in db blocking table associated with given LineID
 * 				JSON keys:
 * 					LineID, CharacterID, Name, OriginX, OriginY, OriginZ, DestX, DestY, DestZ, MovementType, Orientation
 */

exports.getBlockingByLineID = function( req, res ) {
	var lid = req.params.LineID;
	if( !lid ) {
		res.status(400).send({ error: "Missing lineID."});
	} else {
		blockingModel.getBlockingByLineID(lid, function(blocking) {
			res.send(blocking);
		});
	}
}


<<<<<<< Updated upstream
/*
 * updateBlocking updates blocking instructions for each instruction (associated with a character) for given lineid
 *
 * @params...
 *
 *
 *
=======
/**
 * createBlocking
 * 
 * creates and/or updates blocking instructions in database depending on
 * whether an instruction already exists for given characters and given line
 * 
 * @param: req.params.LineID, the line id
 * 
 * @param: req.body.blockingUpdateArray, array containing updates/new blocking instructions
 * 
>>>>>>> Stashed changes
 */

exports.createBlocking = function( req, res ) {
	var lid = req.params.LineID;
	if( !lid ) {
		res.status(400).send({ error: "Missing lineID."});
		return;
	}
	var blockingUpdateArray = req.body.blockingUpdateArray;
	if(!blockingUpdateArray) {
		res.status(400).send( { error: "No blocking data sent."});	// may change to a 200 okay
		return;
	}
	for (let i=0; i<blockingUpdateArray.length; i++) {
		let currDataSet = blockingUpdateArray[i];
		blockingModel.createBlocking(lid, currDataSet, function(result) {
<<<<<<< Updated upstream
			console.log(result);
		});

=======
		});
>>>>>>> Stashed changes
		res.status(200).send();
	}
}
