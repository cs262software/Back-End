/*
 * scripts.js Allows scripts to be posted
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var scriptManager = require( '../controllers/scriptManager' );


router.get( '/', function( req, res, next ) {
	scriptManager.inputXML( req, res )
} );

module.exports = router;
