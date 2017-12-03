/*
 * lights.js maintains the lights routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var lightManager = require( '../managers/lightManager' );

router.get('/', function(req, res, next) {
    lightManager.getLightsInfo(req, res);
});

module.exports = router;
