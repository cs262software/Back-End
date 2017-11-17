/*
 * accountManager.js contains the functions that handle account related tasks
 */

'use strict';

// Initialize globals
var accountModel = require('../models/accountModel.js');
var bcrypt = require('bcrypt-nodejs');

/*
 * validateAccount returns the UserID if the user credentials are correct
 *
 * @param: req.query.username, the username
 * @param: req.query.password, the pasword
 *
 * @return: The UserID
 */

exports.validateAccount = function(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (!username || !password) {
        res.send({"status": "error", "message": "missing username or password"});
    } else {
        accountModel.getPassword(username, function(hash, uid) {
            if (hash === "-1" || uid === "-1") {
                res.send({"status": "error", "message": "incorrect username or password"});
            }
            if (bcrypt.compareSync(password, hash)) res.send({"userID": uid});
            else {
                res.send({"status": "error", "message": "incorrect username or password"});
            }
        });
    }
}

/*
 * createAccount creates a new account, with a username and password, in the database
 *
 * @param: req.query.username, the new username
 * @param: req.query.password, the new pasword
 *
 * @return: The new UserID
 */

exports.createAccount = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.send({"status": "error", "message": "missing a parameter"});
    } else {
        // Password is automatically salted when it is hashed
        var hash = bcrypt.hashSync(password);

        accountModel.createUser(username, hash, function(uid) {
            res.send({"userID": uid});
        });
    }

}
