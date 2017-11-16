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

exports.getSceneAmount = function(playId, actId, callback) {
    var sql = "SELECT MAX(SceneNum) as 'NumScenes' FROM Line WHERE PlayID = ? AND ActNum = ?;"
    var inserts = [playId, actId];
    sql = mysql.format(sql, inserts);

    db.queryDB(conn, sql, function(res) {
        if (res[0].NumScenes === null) {
            callback("-1");
        }
        var sceneAmount = res[0].NumScenes;
        callback(sceneAmount);
    });
}