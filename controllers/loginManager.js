/*
 * loginManager.js contains the functions that handle login content related tasks
 */

'use strict';

// Initialize globals
var bcrypt = require('bcrypt-nodejs');
var loginModel = require('../models/loginModel');

/*
 * createAccount creates a new account, with a username and password, in the database
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
        res.status(400).send({ error: "Missing username or password field."});
    } else {
        // Password is automatically salted when it is hashed
        var hash = bcrypt.hashSync(password);

        loginModel.createUser(username, hash, function(uid) {
            res.send({"userId": uid});
        });
    }
}

/*
 * postLogin returns the a user id if the credentials are found.
 *
 * @param: req.data.userName, the user's calvin username eg "abc3"
 * @param: req.data.password, the user's password
 *
 * @return: userId or null
 */

exports.postLogin = function( req, res ) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.status(400).json({ message: "Username or password was empty." });
    }
    else {
        loginModel.getPassword(username, function(hash, uid) {
            if (hash == "-1" && uid == "-1") {
                res.status(400).json({ message: "Invalid username or password." });
            }
            else {
                if (bcrypt.compareSync(password, hash)) {
                    res.json({ userId: uid });
                }
                else {
                    res.status(400).json({ message: "Invalid username or password." });
                }
            }
        });
    }
}
