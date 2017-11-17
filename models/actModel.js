/*
 * actModel.js contains the function to interact with the DB and get the act amount
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelUser = require( './modelUser' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : modelUser.username,
	password : modelUser.password,
	database : 'theatreappsuite',
} );

/**
 * getActAmount searches the DB for the acts associated with the play provided
 *
 * @param: playId, the PlayID
 * @param: callback, the callback function
 *
 * @return: the number of acts in the play
 */

exports.getActAmount = function(playId, callback) {
    var sql = "SELECT MAX(ActNum) as 'NumActs' FROM Line WHERE PlayID = ?;"
    var inserts = [playId];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if (res[0].NumActs === null) {
            callback("-1");
        }
        var actAmount = res[0].NumActs;
        callback(actAmount);
    });
}
