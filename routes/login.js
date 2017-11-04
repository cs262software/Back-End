/*
 * login.js Maintains the login routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var loginManager = require( '../controllers/loginManager' );

router.post( '/', function( req, res, next ) {
	loginManager.postLogin( req, res )
});

module.exports = router;
