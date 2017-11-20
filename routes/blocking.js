/*
 * blocking.js Maintains routing information for blocking
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var blockingController = require( '../controllers/blockingController' );


// get/read blocking 
router.get( '/', function( req, res, next) {
	blockingController.getBlocking( req, res )
} );

	

// create blocking instruction
router.post( '/create', function(req, res, next) {
	blockingController.createBlocking( req, res)
} );



// delete blocking instruction
router.post( '/delete', function(req, res, next) {
	blockingController.deleteBlocking(req, res)
} );

module.exports = router;
