/*
 * plays.js Allows scripts to be retrieved
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var playManager = require( '../controllers/playManager' );

router.get( '/', function( req, res, next ) {
	playManager.getPlay( req, res )
	playManager.getPlayList( res )
} );

module.exports = router;
