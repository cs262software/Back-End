/*
 * blockingController.js contains the functions related to blocking
 */

'use strict';

// Initialize globals
var fileModel = require('../models/blockingController.js')


/*
 * getBlocking returns the blocking instructions for a passed line ID if the requesting user has permission
 *
 * @param: req.line.lid, the line id
 *
 * @return: Blocking instructions for line
 */
exports.getBlocking = function( req, res ) {
	var uid = req.line.lid;
	
}