/*
 * files.js Maintains the file system routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var fileManager = require( '../controllers/fileManager' );

router.post('/upload', function( req, res, next) {
	fileManager.postFile( req, res )
});

router.get( '/', function( req, res, next ) {
	fileManager.getFile( req, res )
});

router.get('/all', function( req, res, next) {
	fileManager.getAllFiles( req, res )
});

module.exports = router;
