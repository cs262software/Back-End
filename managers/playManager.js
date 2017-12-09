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
    let characterID = req.query.CharacterID;

	if (!playID || !actNum || !sceneNum) {
		res.status(400).send({ error: "Missing PlayID, ActNum, or SceneNum as URL parameters"});
	} else {
        if (typeof characterID === 'undefined') {
    		playModel.getLinesBySceneNum(playID, actNum, sceneNum, function(lines) {
				res.send(lines);
    		});
        } else {
            playModel.getLineNumsByCharacter(playID, actNum, sceneNum, characterID, function(result) {
                if (result.length > 0) {
                    // Extract the line numbers from the result set.
                    let linenums = [];
                    for (let i = 0; i < result.length; i++) {
                        linenums.push(result[i].LineNum);
                    }

                    // Get the lines directly before each of our character's lines.
                    var promptlines = linenums.slice();
                    for (let i = 0; i < promptlines.length; i++)
                    {
                        promptlines[i] = (promptlines[i] - 1);
                    }

                    // Formulate a SQL query to get the character's lines.
                    var lineSQLstring = "SELECT l.LineID, 0 AS PromptLine, 1 AS CharacterLine FROM line l WHERE l.PlayID = ? AND l.ActNum = ? AND l.SceneNum = ? AND (";
                    for (let i = 0; i < linenums.length; i++)
                    {
                        if (i != (linenums.length - 1)) //If this is not the last item in the array
                        {
                            lineSQLstring += "l.LineNum = " + linenums[i].toString() + " OR "; //Append an OR
                        }
                        else
                        {
                            lineSQLstring += "l.LineNum = " + linenums[i].toString() + ")"; //Close the paranthese
                        }
                    }

                    // Forumlate a SQL query to get the prompt lines.
                    var promptSQLstring = "SELECT l.LineID, 1 PromptLine, 0 AS CharacterLine FROM line l WHERE l.PlayID = ? AND l.ActNum = ? AND l.SceneNum = ? AND (";
                    for (let i = 0; i < promptlines.length; i++)
                    {
                        if (i != (promptlines.length - 1)) //If this is not the last item in the array
                        {
                            promptSQLstring += "l.LineNum = " + promptlines[i].toString() + " OR "; //Append an OR
                        }
                        else
                        {
                            promptSQLstring += "l.LineNum = " + promptlines[i].toString() + ")"; //Close the paranthese
                        }
                    }

                    // Add a union to get the query for the line stubs.
                    var SQLstubs = lineSQLstring + " UNION " + promptSQLstring;

                    // Retrieve lines with identifier stubs attached.
                    playModel.getLinesWithStubs(playID, actNum, sceneNum, SQLstubs, function(finalResult) {
                        res.send(finalResult);
                    });
                }
                else {
                    playModel.getLinesBySceneNum(playID, actNum, sceneNum, function(regularLines) {
        				res.send(regularLines);
            		});
                }
    		});
        }
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
