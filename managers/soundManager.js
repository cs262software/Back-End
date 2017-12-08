/*
 * soundManager.js contains the functions that handle fetching the sound info and error checking
 */

'use strict';

// Initialize globals
var soundModel = require('../models/soundModel.js');

/*
 * getSoundsInfo returns the sounding cue information for the given line
 *
 * @param: req.query.lineid, the LineID
 *
 * @return: The sound information for that line
 */

exports.getSoundsInfo = function(req, res) {
    var line = req.query.LineID;

    if (!line) {
        res.send({"status": "error", "message": "missing LineID in URL query"});
        return;
    }

    soundModel.getSoundsInfo(line, function(soundId, name, description, userId, note) {
        if (soundId === "-1") {
            res.send([{"status": "error", "message": "no sounds cue info for that line"}]);
        } else {
            res.send([{"SoundID": soundId, "Name": name, "Description": description, "UserID": userId, "Note": note}]);
        }
    });
}
