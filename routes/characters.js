/*
 * characters.js Maintains routing information for characters
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var characterManager = require( '../managers/characterManager' );

router.get( '/:PlayID', function( req, res, next) {
	characterManager.getCharactersByPlay( req, res );
});

// get/read blocking
router.get( '/:PlayID/:ActNum/:SceneNum', function( req, res, next ) {
	characterManager.getCharactersByScene( req, res );
});

module.exports = router;
