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

/* Requires body to have:
	{LightID 
	Name
	Type
	LineID
	UserID
	Location
	Status}*/
router.post('/update', function(req, res, next) {
    lightManager.updateLight(req, res);
});

/* Requires body to have:
	{LightID 
	Name
	Type
	LineID
	UserID
	Location
	Status}*/
router.put('/update', function(req, res, next) {
    lightManager.addLight(req, res);
});

module.exports = router;
