/**
 * schedule.js Allows characters in a given part of the play to be retrieved
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var schedManager = require( '../managers/schedManager' );

router.get( '/:PlayID', function( req, res ) {
	// Not yet implemented, or necessarily needed...
	//schedManager.getPlayByID( req, res )
});

router.get('/', function( req, res ) {
	schedManager.getAllCharacters( req, res )
});

router.get('/:PlayID/acts', function(req, res) {
    schedManager.getCharactersByPlayID(req, res);
});

router.get('/:PlayID/:ActNum/scenes', function(req, res) {
    schedManager.getCharactersByActNum(req, res);
});

router.get('/:PlayID/:ActNum/:SceneNum/lines', function(req, res) {
	schedManager.getCheractersBySceneNum(req, res);
});

module.exports = router;
