/*
 * blockingController.js contains the functions related to blocking tasks
 */

'use strict';

// Initialize globals
var blockingModel = require('../models/blockingModel');

/*
 * getBlocking returns the blocking instructions for given lineid
 *
 * @param: req.line.LineID, the line id
 *
 * @return: a json object whose keys contain arrays of values corresponding to all
 *			blocking instructions and info for all characters associated with a given lineid
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


/*
 * updateBlocking updates blocking instructions for each instruction (associated with a character) for given lineid
 *
 * @params...
 *
 *
 *
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
			console.log(result);
		});

		res.status(200).send();
	}
}
