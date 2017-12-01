/*
 * soundManager.js contains the functions that handle fetching the sound info and error checking
 */

'use strict';

// Initialize globals
var soundModel = require('../models/soundModel.js');

/*
 * getSoundsCue returns the sounding cue information for the given line
 *
 * @param: req.query.lineid, the LineID
 *
 * @return: The sounding information for that line
 */

exports.getSoundsCue = function(req, res) {
    var line = req.query.lineid;

    if (!line) {
        res.send({"status": "error", "message": "missing line ID number"});
        return;
    }

    soundModel.getSoundsCue(line, function(soundId, userId, note) {
        if (soundId === "-1") {
            res.send({"status": "error", "message": "no sounds cue info for that line"});
        } else {
            res.send({"SoundID": soundId, "UserID": userId, "Note": note});
        }
    });
}

/*
 * getSoundsInfo returns the sounding information for the given sound
 *
 * @param: req.query.soundid, the SoundID
 *
 * @return: The sound information for that sound
 */

exports.getSoundsInfo = function(req, res) {
    var sound = req.query.soundid;

    if (!sound) {
        res.send({"status": "error", "message": "missing sound ID number"});
        return;
    }

    soundModel.getSoundsInfo(sound, function(name, description) {
        if (name === "-1") {
            res.send({"status": "error", "message": "no sounds info for that sound"});
        } else {
            res.send({"Name": name, "Description": description});
        }
    });
}