/*
 * roleManager.js contains the functions that handle file requests for user roles
 */

'use strict';

// Initialize globals
var roleModel = require('../models/roleModel.js')
var fs = require( "fs" );

/*
 * getRoles returns the contents of a file if the requesting user has permission
 *
 * @param: req.query.uid, the user id
 *
 * @return: Requested file content
 */
exports.getRoles = function (req, res) {
    var uid = req.query.uid;
    var pid = req.query.pid;
    
    var rolePath = roleModel.getRolePath(uid, pid, function (roles) {
        
        res.send(roles);

    });
}
