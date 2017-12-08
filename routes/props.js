/**
 * props.js Allows props information to be retrieved
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var propManager = require( '../managers/propManager' );

router.get( '/:LineID', function( req, res ) {
	propManager.getProps( req, res )
});

module.exports = router;
