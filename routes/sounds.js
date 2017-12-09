/*
 * sounds.js maintains the sounds routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var soundManager = require( '../managers/soundManager' );

router.get('/', function(req, res, next) {
    soundManager.getSoundsInfo(req, res);
});

module.exports = router;
