/*
 * roles.js Handles routing for user role requests
 */

'use strict';

var express = require('express');
var router = express.Router();

var roleManager = require( '../managers/roleManager' );

/* GET users roles */
router.get('/', function(req, res, next) {
	//Call roles from controller
	roleManager.getRoles ( req, res )
});

module.exports = router;
