/*
 * accountManager.js contains the functions that handle account related tasks
 */

'use strict';

// Initialize globals
var accountModel = require('../models/accountModel.js')

exports.validateAccount = function(req, res) {
    var accountMock1 = {
        id: 1,
        username: "jesseboi",
        password: "1234"
    }

    var accountMock2 = {
        id: 2,
        username: "jackbeanstalk",
        password: "iluvgold"
    }

    var accountMock3 = {
        id: 3,
        username: "spongebobsquarepants",
        password: "imready500"
    }

    var accounts = [accountMock1, accountMock2, accountMock3]

    var username = req.query.username;
    var password = req.query.password;

    // to check multiple accounts
    for (var i = 0; i < 3; i++) {
        if (accounts[i].username === username && accounts[i].password === password) {
            return res.send({"id": accounts[i].id});
        }
    }
    return res.send({"status": "error", "message": "missing username or password"});

    // to check a single account
    // if(!username || !password) {
    //     return res.send({"status": "error", "message": "missing username or password"});
    // } else if(username != accountMock.username || password != accountMock.password) {
    //     return res.send({"status": "error", "message": "wrong username or password"});
    // } else {
    //     return res.send({"id": accountMock.id});
    // }
}

exports.createAccount = function(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (!username || !password) {
        return res.send({"status": "error", "message": "missing a parameter"});
    } else {
        // var newUser = {
        //     id: 0,
        //     username: u,
        //     password: p
        // }

        // return res.send(newUser);

        accountModel.createUser(u, p);


    }

}