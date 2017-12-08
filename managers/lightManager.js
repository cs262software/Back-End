/*
 * lightManager.js contains the functions that handle fetching the lighting info and error checking
 */

'use strict';

// Initialize globals
var lightModel = require('../models/lightModel.js');

/*
 * getLightsCue returns the lighting information for the given line
 *
 * @param: req.query.lineid, the LineID
 *
 * @return: The lighting information for that line
 */

exports.getLightsInfo = function(req, res) {
    var line = req.query.LineID;

    if (!line) {
        res.send({"status": "error", "message": "missing LineID number in url query"});
        return;
    }

    lightModel.getLightsInfo(line, function(lightId, name, type, userId, location, status) {
        if (lightId === "-1") {
            res.send([{"status": "error", "message": "no lights cue info for that line"}]);
        } else {
            res.send([{"LightID": lightId, "Name": name, "Type": type, "UserID": userId, "Location": location, "Status": status}]);
        }
    });
}
