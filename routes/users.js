/*
 * login.js Maintains the account system routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var userManager = require( '../managers/userManager' );

router.post('/create', function(req, res, next) {
    userManager.createLogin(req, res);
});

router.post('/login', function(req, res, next) {
    userManager.login(req, res);
});

module.exports = router;
