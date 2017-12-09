/**
 * playManager.js contains the functions that handle play accesses
 */

'use strict';

//Initialize globals
var playModel = require('../models/playModel');

/**
 * getAllPlays returns the list of play scripts with their names and ids
 *
 * @param: req, res
 *
 * @return: List of scripts
 */
exports.getAllPlays = function( req, res ) {
    playModel.getAllPlays(function(playList) {
    	res.send(playList);
    });
}

/*
 * getActsByPlayID returns the number of acts in the play if the play exists
 *
 * @param: req.param.playid, the PlayID
 *
 * @return: The number of acts for that play
 */

exports.getActsByPlayID = function(req, res) {
    var play = req.params.PlayID;

    if (!play) {
        res.status(400).send({ error: "Missing PlayID number as a URL parameter." });
    } else {
        playModel.getActsByPlayID(play, function(acts) {
            if (acts.length > 0) {
                res.send(acts);
            } else {
                res.status(404).send({ error: "No acts found for given PlayID." });
            }
        });
    }
}

/*
 * getScenesByActNum returns the number of scenes in the play and act if the play and act exist
 *
 * @param: req.params.PlayID, the PlayID
 * @param: req.params.ActNum, the ActNum
 *
 * @return: The number of scenes in that act and play
 */

exports.getScenesByActNum = function(req, res) {
    var play = req.params.PlayID;
    var act = req.params.ActNum;

    if (!play || !act) {
        res.status(400).send({ error: "Missing PlayID or ActNum as URL parameters."});
    } else {
        playModel.getScenesByActNum(play, act, function(scenes) {
            if (scenes.length > 0) {
                res.send(scenes);
            } else {
                res.status(404).send({ error: "No scenes found for given PlayID and ActNum"});
            }
        });
    }
}

/**
 * getLineBySceneNum returns the lines and ids of lines associated with a play, act and scene
 *
 * @param: req.params.PlayID
 * @param: req.params.ActNum
 * @param: req.params.SceneNum
 *
 * @return: Lines and IDs in JSON obj
 */
exports.getLinesBySceneNum = function(req, res) {
	let playID = req.params.PlayID;
	let actNum = req.params.ActNum;
	let sceneNum = req.params.SceneNum;

	if (!playID || !actNum || !sceneNum) {
		res.status(400).send({ error: "Missing PlayID, ActNum, or SceneNum as URL parameters"});
	} else {
		playModel.getLinesBySceneNum(playID, actNum, sceneNum, function(lines) {
			if (lines.length > 0) {
				res.send(lines);
			} else {
				res.status(404).send({
					error: "No lines found for given PlayID, ActNum, and SceneNum."
				});
			}
		});
	}
}

/**
 * getLineByPlayAndCharacter returns the lines and ids of lines associated with a play, and character
 *
 * @param: req.params.PlayID
 * @param: req.params.CharacterID
 *
 * @return: Lines and IDs in JSON obj
 */
exports.getLinesByPlayAndCharacter = function(req, res) {
	let playID = req.params.PlayID;
	let characterID = req.params.CharacterID;

	if (!playID || !characterID) {
		res.status(400).send({ error: "Missing PlayID, or CharacterID as URL parameters"});
	} else {
		playModel.getLinesByPlayAndCharacter(playID, characterID, function(lines) {
			if (lines.length > 0) {
				res.send(lines);
			} else {
				res.status(404).send({
					error: "No lines found for given PlayID, and CharacterID."
				});
			}
		});
	}
}

exports.getNoteByLineID = function( req, res ) {
	let lineID = req.params.LineID;
	if (!lineID) {
		res.status(400).send({ error: "Missing LineID as URL parameter."});
	} else {
		playModel.getNoteByLineID(lineID, function(notes) {
			res.send(notes);
		});
	}
}

exports.updateNote = function( req, res ) {
    var lineID = req.params.LineID;
	if( !lineID ) {
		res.status(400).send({ error: "Missing LineID as URL parameter."});
		return;
	}

    var directorsNote = req.body.directorsNote;
	if(!directorsNote) {
		res.status(400).send({ error: "No directors note data sent."});	// may change to a 200 okay
		return;
	}

	playModel.updateDirectorsNote(lineID, directorsNote, function(result) {
        if (result.affectedRows > 0) {
            res.status(200).send();
            return;
        }
        res.status(500).send();
	});
}
