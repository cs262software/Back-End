/*
 * login.js Maintains the account system routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var loginManager = require( '../controllers/loginManager' );

router.post('/', function(req, res, next) {
    loginManager.validateLogin(req, res)
});

router.post('/create', function(req, res, next) {
    loginManager.createLogin(req, res);
});

module.exports = router;
