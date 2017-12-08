/**
 * propsManager.js contains the functions that handle prop accesses
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


/**
* propMovement creates or updates tables prop  and propmovement
*/

exports.propMovement = function ( req, res ) {
	let lineID = req.body.LineID;
	let propID = req.body.PropID;
	let movementDesc = req.body.newPropMovement;
	let newPropID = req.body.newPropID;

	if (!lineID) {
		res.status(400).send({ error: "Missing LineID as URL parameters"});
	} else {
		//create new prop movement
		if (!newPropID) {
			propModel.newPropMovement(lineID, propID, movementDesc, function(success) {
				res.send(success);
						});
		} else {
			propModel.updatePropMovement(lineID, propID, movementDesc, newPropID, function(success) {
				res.send({success});
			});
		}
	}
}
