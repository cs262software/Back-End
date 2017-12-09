/**
 * plays.js Allows plays to be retrieved
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var playManager = require( '../managers/playManager' );

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

router.get('/actors/:PlayID/:CharacterID', function(req, res) {
	playManager.getLinesByPlayAndCharacter(req, res);
});

router.get('/directorsnote/:LineID', function(req, res) {
	playManager.getNoteByLineID(req, res);
});

router.post('/directorsnote/:LineID', function(req, res) {
	playManager.updateNote(req, res);
});

module.exports = router;
