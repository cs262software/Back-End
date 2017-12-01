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
 * getSoundsInfo searches the DB for the sounds info associated with the line provided
 *
 * @param: lineId, the LineID
 * @param: callback, the callback function
 *
 * @return: the sound info for that line
 */

exports.getSoundsInfo = function(lineId, callback) {
    var sql = "SELECT sound.SoundID, Name, Description, UserID, Note FROM sound INNER JOIN soundcue ON sound.SoundID = soundcue.SoundID WHERE soundcue.LineID = ?";
    var inserts = [lineId];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if (!res[0] || res.length === 0) {
            callback("-1", "-1", "-1", "-1", "-1");
            return;
        }
        var soundId = res[0].SoundID;
        var name = res[0].Name;
        var description = res[0].Description;
        var userId = res[0].UserID;
        var note = res[0].Note;

        callback(soundId, name, description, userId, note);
    });
}
