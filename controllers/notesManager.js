/**
 * notesManager.js contains the functions that handle notes accesses
 */

'use strict';

//Initialize globals
var playModel = require('../models/playModel');

/**
 * getNotes returns the directors notes on a line
 *
 * @param: req, res
 *
 * @return: Notes
 */
exports.getNotes = function( req, res ) {
	let lineID = req.params.LineID;

	if (!lineID ) {
		res.status(400).send({ error: "Missing LineID as URL parameter" });
	} else {
		playModel.getNote(lineID, function(notes) {
			res.send(notes);
		});
	}
}
