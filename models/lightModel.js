/*
 * lightModel.js contains the function to interact with the DB and get the lighting information
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'root',
	password : modelPass.accountModelPass,
	database : 'theatreappsuite',
} );

/**
 * getLightsCue searches the DB for the lights info associated with the line provided
 *
 * @param: lineId, the LineID
 * @param: callback, the callback function
 *
 * @return: the lighting info for that line
 */

exports.getLightsCue = function(lineId, callback) {
    var sql = "SELECT `LightID`, `UserID`, `Location`, `Status` FROM `theatreappsuite`.`lightingcue` WHERE `LineID` = ?";
    var inserts = [lineId];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if (res.length === 0) {
            callback("-1", "-1", "-1", "-1");
            return;
        }
        var lightId = res[0].LightID;
        var userId = res[0].UserID;
        var location = res[0].Location;
        var status = res[0].Status;

        callback(lightId, userId, location, status);
    });
}

/**
 * getLightsInfo searches the DB for the lights info associated with the light provided
 *
 * @param: lightId, the LightID
 * @param: callback, the callback function
 *
 * @return: the lighting info for that light
 */

exports.getLightsInfo = function(lightId, callback) {
    var sql = "SELECT `Name`, `Type` FROM `theatreappsuite`.`light` WHERE `LightID` = ?";
    var inserts = [lightId];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if (res.length === 0) {
            callback("-1", "-1");
            return;
        }
        var name = res[0].Name;
        var type = res[0].Type;

        callback(name, type);
    });
}