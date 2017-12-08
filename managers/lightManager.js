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

    //lightModel.getLightsInfo(line, function(lightId, name, type, userId, location, status) {
    lightModel.getLightsInfo(line, function(lights) {
        if (lights === "-1") {
              res.send([{"status": "error", "message": "no lights cue info for that line"}]);
        } else {
 //           res.send([{"LightID": lightId, "Name": name, "Type": type, "UserID": userId, "Location": location, "Status": status}]);
              res.send(lights);
        }
    });
}

exports.updateLight = function(req, res) {
	let LightID = req.body.LightID;
	let Name = req.body.Name;
	let Type = req.body.Type;
	let LineID = req.body.LineID;
	let UserID = req.body.UserID;
	let Location = req.body.Location;
	let Status = req.body.Status;

	lightModel.updateLight(LightID, Name, Type, LineID, UserID, Location, Status, function(success) {
		res.send({success});
	});
}

exports.addLight = function(req, res) {
	let LightID = req.body.LightID;
	let Name = req.body.Name;
	let Type = req.body.Type;
	let LineID = req.body.LineID;
	let UserID = req.body.UserID;
	let Location = req.body.Location;
	let Status = req.body.Status;

	lightModel.addLight(LightID, Name, Type, LineID, UserID, Location, Status, function(success) {
		res.send({success});
	});
}
