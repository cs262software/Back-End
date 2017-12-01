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
            callback("-1", "-1", "-1", "-1", "-1", "-1");
            return;
        } else {
            var lightId = res[0].LightID;
            var name = res[0].Name;
            var type = res[0].Type;
            var userId = res[0].UserID;
            var location = res[0].Location;
            var status = res[0].Status;

            callback(lightId, name, type, userId, location, status);
        }
    });
}
