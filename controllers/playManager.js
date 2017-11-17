/**
 * playManager.js contains the functions that handle play accesses
 */

'use strict';

var playModel = require("../models/playModel.js");

/**
 * This is a prototype function that returns a default example play.
 * This should be replaced with an actual database controller
 */

function getPlay(id) {
   return "<?xml version\"1.0\"?><play title=\"The Interview\" author=\"Patrick M. Bailey\" license=\"2011\"><roles><character id='1' name='John'/><character id='12' name='Princess'/></roles><act id='2'>t<scene id='2' title='Confrontation'><deplayion>In <em>the</em> castle</deplayion><line id='ABC1234'><!-- line id deterministically generated --><text><em>Princess enters the scene</em></text></line><line id='FEFE332' characterID='12'><text>But daddy, I <em>love</em> him!<!-- can include em, strong tags.--></text></line><!--</scene></act> XML MAY be well-formed (or not) --></play>"
}


/**
 * getPlay returns the xml of the play associated with a certain id
 *
 * @param: req.query.id, the id
 *
 * @return: Requested play xml
 */
exports.getPlay = function(req, res) {
	var id = req.query.id;

	res.send(getPlay(req.id));
   
}

/**
 * getLine returns the lines and ids of lines associated with a play, act and scene
 *
 * @param: req.query.playID
 * @param: req.query.actNum
 * @param: req.query.sceneNum
 *
 * @return: Lines and IDs in JSON obj
 */
exports.getLines = function(req, res) {
	let playID = req.query.playID;
	let actNum = req.query.actNum;
	let sceneNum = req.query.sceneNum;

	if (!playID || !actNum || !sceneNum) {
		res.status(400).send({ error: "Missing playID, actNum, or sceneNum"});
	} else {
		playModel.getLines(playID, actNum, sceneNum, function(lines) {
			if (lines.length > 0) {
				res.send(lines);
			} else {
				res.status(404).send({
					error: "No lines found for given PlayID, actNum, and sceneNum."
				});
			}
		});
	}
}
