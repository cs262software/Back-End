/*
 * loginManager.js contains the functions that handle account related tasks
 */

'use strict';

// Initialize globals
var loginModel = require('../models/loginModel.js');
var bcrypt = require('bcrypt-nodejs');

/*
 * validateLogin returns the UserID if the user credentials are correct
 *
 * @param: req.query.username, the username
 * @param: req.query.password, the pasword
 *
 * @return: The UserID
 */

exports.validateLogin = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.send({"status": "error", "message": "missing username or password"});
    } else {
        loginModel.getPassword(username, function(hash, uid) {
            if (hash === "-1" || uid === "-1") {
                res.send({"status": "error", "message": "incorrect username or password"});
            }
            if (bcrypt.compareSync(password, hash)) {
                res.send({"userId": uid});
            }
            else {
                res.send({"status": "error", "message": "incorrect username or password"});
            }
        });
    }
}

/*
 * createLogin creates a new login, with a username and password, in the database
 *
 * @param: req.query.username, the new username
 * @param: req.query.password, the new pasword
 *
 * @return: The new UserID
 */

exports.createLogin = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.send({"status": "error", "message": "missing a parameter"});
    } else {
        // Password is automatically salted when it is hashed
        var hash = bcrypt.hashSync(password);

        loginModel.createLogin(username, hash, function(uid) {
            res.send({"userID": uid});
        });
    }

}
