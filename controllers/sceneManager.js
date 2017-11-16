'use strict';

// Initialize globals
var sceneModel = require('../models/sceneModel.js');

exports.getScenes = function(req, res) {
    var play = req.query.playid;
    var act = req.query.act;

    if (!play || !act) {
        res.send({"status": "error", "message": "missing play ID number or act number"});
        return;
    }

    sceneModel.getSceneAmount(play, act, function(sceneAmount) {
        if (sceneAmount === "-1") {
            res.send({"status": "error", "message": "invalid play id or act number"});
            return;
        }

        let scenes = [];

        for (let scene = 1; scene <= sceneAmount; scene++) {
            scenes.push({"sceneId": scene});
        }

        res.send({"scenes": scenes});
    });
}