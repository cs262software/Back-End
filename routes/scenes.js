/*
 * scenes.js maintains the scene amount routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var sceneManager = require( '../controllers/sceneManager' );

router.get('/', function(req, res, next) {
    sceneManager.getScenes(req, res);
});

module.exports = router;