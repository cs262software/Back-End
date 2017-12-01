/**
 * propManager.js contains the functions that handle prop accesses
 */

'use strict';

//Initialize globals
var propModel = require('../models/propModel');

/**
 * getProps returns the list of props ids, names, and descriptions
 *
 * @param: req, res
 *
 * @return: List of props
 */
exports.getProps = function( req, res ) {
	let lineID = req.params.LineID;

	if (!lineID ) {
		res.status(400).send({ error: "Missing LineID as URL parameters" });
	} else {
		propModel.getProps(lineID, function(propList) {
			res.send(propList);
		});
	}
}
