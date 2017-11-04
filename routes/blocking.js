/*
 * blocking.js Maintains routing information for blocking
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var blockingController = require( '../controllers/blockingController' );

router.get( '/', function( req, res, next ) {
	blockingController.getBlocking( req, res )
} );

module.exports = router;
