/*
 * actManager.js contains the functions that handle fetching the act and error checking
 */

'use strict';

// Initialize globals
var actModel = require('../models/actModel.js');

/*
 * getActs returns the number of acts in the play if the play exists
 *
 * @param: req.query.playid, the PlayID
 *
 * @return: The number of acts for that play
 */

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