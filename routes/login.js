/*
 * login.js Maintains the login routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var loginManager = require( '../controllers/loginManager' );

router.post( '/', function ( req, res, next ) {
	loginManager.postLogin( req, res )
});

router.post( '/create', function ( req, res, next) {
	loginManager.createLogin( req, res );
});

module.exports = router;
