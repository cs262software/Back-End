/**
 * notes.js Allows notes information to be retrieved or updated
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var notesManager = require( '../controllers/notesManager' );

// Requires in url query: ?LineID=$
router.get( '/', function( req, res ) {
	notesManager.getNotes( req, res )
});

// This post requires body to look like
// { LineID: #, note: "XXX" }
router.post( '/update', function( req, res ) {
	notesManager.updateNotes( req, res );
});

module.exports = router;
