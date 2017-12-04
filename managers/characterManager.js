/*
 * characterManager.js contains the logic related to character tasks
 */

'use strict';

// Initialize globals
var characterModel = require('../models/characterModel')

exports.getCharactersByScene = function( req, res ) {
    var PlayID = req.params.PlayID;
    var ActNum = req.params.ActNum;
    var SceneNum = req.params.SceneNum;

    if ( !PlayID || !ActNum || !SceneNum ) {
        res.status(400).send({ error: "Missing PlayID, ActNum, and or SceneNum as URL parameters."});
    } else {
        characterModel.getCharactersByScene(PlayID, ActNum, SceneNum, function(characters) {
            res.send(characters);
        });
    }
}
