/*
 * sounds.js maintains the sounds routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var soundManager = require( '../controllers/soundManager' );

router.get('/cue', function(req, res, next) {
    soundManager.getSoundsCue(req, res);
});

router.get('/info', function(req, res, next) {
    soundManager.getSoundsInfo(req, res);
});

module.exports = router;