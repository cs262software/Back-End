/*
 * loginManager.js contains the functions that handle account related tasks
 */

'use strict';

// Initialize globals
var loginModel = require('../models/userModel.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var jwtPrivateKey = "OUelfRXH4bVdhVt9rAuKmG4aMsZvJDRmqs1uL9jH";

/*
 * createLogin creates a new login, with a username and password, in the database
 *
 * @param: req.query.username, the new username
 * @param: req.query.password, the new pasword
 *
 * @return: A signed JWT token.
 */

exports.createLogin = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.status(400).send({ error: "Missing a parameter"});
    } else {
        // Password is automatically salted when it is hashed
        var hash = bcrypt.hashSync(password);

        loginModel.createLogin(username, hash, function(uid) {
            // Check whether the account was created successfully.
            if (uid === -1) {
                res.status(400).send({ error: "Could not insert the new user into the database."});
            } else {
                res.send({ message: "New user created successfully."});
            }
        });
    }
}

/*
 * login returns a signed JWT if the user credentials are correct
 *
 * @param: req.query.username, the username
 * @param: req.query.password, the pasword
 *
 * @return: The UserID
 */

exports.login = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.status(400).send({ error: "Missing username or password." });
    } else {
        loginModel.getPassword(username, function(hash, uid) {
            if (hash === "-1" || uid === "-1") {
                res.status(400).send({ error: "Incorrect username or password." });
            }
            if (bcrypt.compareSync(password, hash)) {
                // Login is valid. Create a JWT and send it to the user.
                // Set the token to expire in an hour.
                jwt.sign(
                    {
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        UserID: uid
                    },
                    jwtPrivateKey,
                    {/* options */},
                    function(err, token) {
                        if (err) {
                            res.status(500).send({ error: "Could not create a signed auth token." });
                        } else {
                            // Attach the generated token as an auth header.
                            res.header('X-Auth-Token', token);
                            res.header('Access-Control-Expose-Headers', 'X-Auth-Token');
                            res.send({ message: "Login successful."});
                        }
                    }
                );
            }
            else {
                res.status(400).send({ error: "Incorrect username or password." });
            }
        });
    }
}
