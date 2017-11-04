/*
 * loginManager.js contains the functions that handle login content related tasks
 */

'use strict';

// Initialize globals
var loginModel = require('../models/loginModel.js')
//var fs = require( "fs" );

/*
 * postLogin returns the a user id if the credentials are found.
 *
 * @param: req.data.userName, the user's calvin username eg "abc3"
 * @param: req.data.password, the user's password
 *
 * @return: userId or null
 */

exports.postLogin = function( req, res ) {
    let userName = req.body.username;
    let password = req.body.password;
    loginModel.postLogin( userName, password, function( userId ) {
        res.send({ userId: userId });
    });
}
