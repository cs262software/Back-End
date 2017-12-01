/*
 * lightManager.js contains the functions that handle fetching the lighting info and error checking
 */

'use strict';

// Initialize globals
var lightModel = require('../models/lightModel.js');

/*
 * getLightsCue returns the lighting cue information for the given line
 *
 * @param: req.query.lineid, the LineID
 *
 * @return: The lighting information for that line
 */

exports.getLightsCue = function(req, res) {
    var line = req.query.lineid;

    if (!line) {
        res.send({"status": "error", "message": "missing line ID number"});
        return;
    }

    lightModel.getLightsCue(line, function(lightId, userId, location, status) {
        if (lightId === "-1") {
            res.send({"status": "error", "message": "no lights cue info for that line"});
        } else {
            res.send({"LightID": lightId, "UserID": userId, "Location": location, "Status": status});
        }
    });
}

/*
 * getLightsInfo returns the lighting information for the given light
 *
 * @param: req.query.lightid, the LightID
 *
 * @return: The lighting information for that light
 */

exports.getLightsInfo = function(req, res) {
    var light = req.query.lightid;

    if (!light) {
        res.send({"status": "error", "message": "missing light ID number"});
        return;
    }

    lightModel.getLightsInfo(light, function(name, type) {
        if (name === "-1") {
            res.send({"status": "error", "message": "no lights info for that light"});
        } else {
            res.send({"Name": name, "Type": type});
        }
    });
}