/**
 * props.js Allows props information to be retrieved
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var propsManager = require( '../controllers/propsManager' );

router.get( '/:LineID', function( req, res ) {
	propsManager.getProps( req, res )
});

module.exports = router;
