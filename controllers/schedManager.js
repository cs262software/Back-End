/**
 * schedManager.js contains the functions that handle play accesses
 */

'use strict';

//Initialize globals
var schedModel = require('../models/schedModel');

/**
 * getAllPlays returns the list of play scripts with their names and ids
 *
 * @param: req, res
 *
 * @return: List of scripts
 */
exports.getAllCharacters = function( req, res ) {
    schedModel.getAllCharacters(function(playList) {
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

exports.getCharactersByPlayID = function(req, res) {
    var play = req.params.PlayID;

    if (!play) {
        res.send({"status": "error", "message": "missing PlayID number as URL parameter"});
        return;
    }

    schedModel.getCharactersByPlayID(play, function(actAmount) {
        if (actAmount === "-1") {
            res.send({"status": "error", "message": "invalid PlayID"});
            return;
        }

        let acts = [];

        for (let act = 1; act <= actAmount; act++) {
            acts.push({"ActNum": act});
        }

        res.send(acts);
    });
}

/*
 * getScenesByActNum returns the number of scenes in the play and act if the play and act exist
 *
 * @param: req.params.PlayID, the PlayID
 * @param: req.params.ActNum, the ActNum
 *
 * @return: The number of scenes in that act and play
 */

exports.getCharactersByActNum = function(req, res) {
    var play = req.params.PlayID;
    var act = req.params.ActNum;

    if (!play || !act) {
        res.send({"status": "error", "message": "missing PlayID or ActNum as URL parameters"});
        return;
    }

    schedModel.getCharactersByActNum(play, act, function(sceneAmount) {
        if (sceneAmount === "-1") {
            res.send({"status": "error", "message": "invalid PlayID or ActNum"});
            return;
        }

        let scenes = [];

        for (let scene = 1; scene <= sceneAmount; scene++) {
            scenes.push({"SceneNum": scene});
        }

        res.send(scenes);
    });
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
exports.getCharactersBySceneNum = function(req, res) {
	let playID = req.params.PlayID;
	let actNum = req.params.ActNum;
	let sceneNum = req.params.SceneNum;

	if (!playID || !actNum || !sceneNum) {
		res.status(400).send({ error: "Missing PlayID, ActNum, or SceneNum as URL parameters"});
	} else {
		schedModel.getCharactersBySceneNum(playID, actNum, sceneNum, function(lines) {
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
