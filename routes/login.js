/*
 * login.js Maintains the account system routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var accountManager = require( '../controllers/accountManager' );

router.post('/', function(req, res, next) {
    accountManager.validateAccount(req, res)
});

router.post('/create', function(req, res, next) {
    accountManager.createAccount(req, res);
});

module.exports = router;
