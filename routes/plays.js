/**
 * plays.js Allows plays to be retrieved
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var playManager = require( '../controllers/playManager' );

router.get( '/:PlayID', function( req, res ) {
	// Not yet implemented, or necessarily needed...
	//playManager.getPlayByID( req, res )
});

router.get('/', function( req, res ) {
	playManager.getAllPlays( req, res )
});

router.get('/:PlayID/acts', function(req, res) {
    playManager.getActsByPlayID(req, res);
});

router.get('/:PlayID/:ActNum/scenes', function(req, res) {
    playManager.getScenesByActNum(req, res);
});

router.get('/:PlayID/:ActNum/:SceneNum/lines', function(req, res) {
	playManager.getLinesBySceneNum(req, res);
});

module.exports = router;