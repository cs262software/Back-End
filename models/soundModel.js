/*
 * soundModel.js contains the function to interact with the DB and get the sound information
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
 * getSoundsCue searches the DB for the sounds info associated with the line provided
 *
 * @param: lineId, the LineID
 * @param: callback, the callback function
 *
 * @return: the sound info for that line
 */

exports.getSoundsCue = function(lineId, callback) {
    var sql = "SELECT `SoundID`, `UserID`, `Note` FROM `theatreappsuite`.`soundcue` WHERE `LineID` = ?";
    var inserts = [lineId];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if (res.length === 0) {
            callback("-1", "-1", "-1");
            return;
        }
        var soundId = res[0].SoundID;
        var userId = res[0].UserID;
        var note = res[0].Note;

        callback(soundId, userId, note);
    });
}

/**
 * getSoundsInfo searches the DB for the sounds info associated with the sound provided
 *
 * @param: soundId, the SoundID
 * @param: callback, the callback function
 *
 * @return: the sounding info for that sound
 */

exports.getSoundsInfo = function(soundId, callback) {
    var sql = "SELECT `Name`, `Description` FROM `theatreappsuite`.`sound` WHERE `SoundID` = ?";
    var inserts = [soundId];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if (res.length === 0) {
            callback("-1", "-1");
            return;
        }
        var name = res[0].Name;
        var description = res[0].Description;

        callback(name, description);
    });
}