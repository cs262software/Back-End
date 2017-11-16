'use strict';

// Initialize globals
var actModel = require('../models/actModel.js');

exports.getActs = function(req, res) {
    var play = req.query.playid;

    if (!play) {
        res.send({"status": "error", "message": "missing play ID number"});
        return;
    }

    actModel.getActAmount(play, function(actAmount) {
        if (actAmount === "-1") {
            res.send({"status": "error", "message": "invalid play id"});
            return;
        }

        let acts = [];

        for (let act = 1; act <= actAmount; act++) {
            acts.push({"actId": act});
        }

        res.send({"acts": acts});
    });
}