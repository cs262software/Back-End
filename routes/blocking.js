/*
 * blocking.js Maintains routing information for blocking
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var blockingManager = require( '../managers/blockingManager' );

// get/read blocking
router.get( '/:LineID', function( req, res, next ) {
	blockingManager.getBlockingByLineID( req, res );
});

// create blocking instruction
router.post( '/:LineID', function( req, res, next ) {
	blockingManager.createBlocking( req, res );
});

// update blocking instruction
// router.put( '/:LineID', function( req, res, next) {
//	blockingManager.updateBlocking( req, res );
//});

// delete blocking instruction
router.delete( '/:LineID', function( req, res, next ) {
	blockingManager.deleteBlocking( req, res );
});

module.exports = router;
