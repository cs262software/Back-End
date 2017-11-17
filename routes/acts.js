/*
 * acts.js maintains the act amount routing information
 */

'use strict';

var express = require( 'express' );
var router = express.Router();
var actManager = require( '../controllers/actManager' );

router.get('/', function(req, res, next) {
    actManager.getActs(req, res);
});

module.exports = router;