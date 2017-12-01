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

/**
 * updateNotes updates the director's notes on a line
 *
 * @param: req, res
 *
 * @return: Success? (Bool)
 */
exports.updateNotes = function( req, res ) {
	let lineID = req.params.LineID;
	let note = req.body.note;

	if (!lineID || !note) {
		res.status(400).send({ error: "Missing LineID or note (/api/notes/:LineID?note=x)" });
	} else {
		playModel.updateNote(lineID, note, function(success) {
			res.send(success);
		});
	}
}
