/*
 * lightModel.js contains the function to interact with the DB and get the lighting information
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
 * getLightsInfo searches the DB for the lights info associated with the line provided
 *
 * @param: lineId, the LineID
 * @param: callback, the callback function
 *
 * @return: the lighting info for that line
 */

exports.getLightsInfo = function(lineId, callback) {
    var sql = "SELECT light.LightID, Name, Type, UserID, Location, Status FROM light INNER JOIN lightingcue ON light.LightID = lightingcue.LightID WHERE lightingcue.LineID = ?";
    var inserts = [lineId];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if ( !res[0] || res.length === 0 ) {
            callback("-1");
            return;
        } else {
              callback(res);
        }
    });
}

exports.updateLight = function(LightID, Name, Type, LineID, UserID, Location, Status, callback) {
	var sql = "UPDATE light SET Name=?, Type=? WHERE LightID=?; UPDATE lightingcue SET LineID=?, UserID=?, Location=?, Status=? WHERE LightID=?";
	var inserts = [Name, Type, LightID, LineID, UserID, Location, Status, LightID];
	sql = mysql.format(sql, inserts);

	db.queryDB(conn, sql, function(res) {
		callback(res.affectedRows == 1);
	});
}

exports.addLight = function(LightID, Name, Type, LineID, UserID, Location, Status, callback) {
	var sql = "INSERT INTO light (LightID, Name, Type) VALUES (?, ?, ?); INSERT INTO lightingcue (LightID, LineID, UserID, Location, Status) VALUES (?, ?, ?, ?, ?);"
	var inserts = [LightID, Name, Type, LightID, LineID, UserID, Location, Status];
	sql = mysql.format(sql, inserts);

	db.queryDB(conn, sql, function(res) {
		callback(res.affectedRows == 1);
	});
}
