/**
 * plays.js Allows plays to be retrieved
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var playManager = require( '../controllers/playManager' );

router.get( '/', function( req, res ) {
	playManager.getPlay( req, res )
});

router.get('/all', function( req, res ) {
	playManager.getPlayList( req, res )
});

router.get('/lines', function(req, res) {
	playManager.getLines(req, res);
});

module.exports = router;