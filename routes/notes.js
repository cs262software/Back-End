/**
 * notes.js Allows notes information to be retrieved or updated
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var notesManager = require( '../controllers/notesManager' );

router.get( '/:LineID', function( req, res ) {
	notesManager.getNotes( req, res )
});

router.post( '/update/:LineID', function( req, res ) {
	notesManager.updateNotes( req, res );
});

module.exports = router;
