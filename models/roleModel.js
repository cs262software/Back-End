/**
 * roleModel.js contains the file-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'andrew',
	password : modelPass.roleModelPass,
	database : 'theatreappsuite',
} );

/**
 * getFilePath searches db for role path if it is viewable by user
 *
 * @param: uid, user id
 * @param: pid, play id
 *
 * @return: role path
 */
exports.getRolePath = function( userID, playID, callback ) {
	if ( !userID ) return "NO RESULTS FOUND\n";
	var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
	var inserts = [ userID, playID ];
    sql = mysql.format(sql, inserts);
    //var obj = {};
    db.queryDB(conn, sql, function (res) {
        /*var rolePath = "RolePath";
        obj[rolePath] = res[0].RolePath;
        /*var director = "director";
        obj[director] = res[0].director;
        var stageManager = "stageManager";
        obj[stageManager] = res[0].stageManager;
        var asstStgManager = "asstStgManager";
        obj[asstStgManager] = res[0].getAsstStgManager;
        var light = "light";
        obj[light] = res[0].light;
        var sound = "sound";
        obj[sound] = res[0].sound;
        var stageCrew = "stageCrew";
        obj[stageCrew] = res[0].stageCrew;
        var actor = "actor";
        obj[actor] = res[0].actor; 
        var rolePath = res[0].RolePath;
        var director = res[0].director;
        var stageManager = res[0].stageManager;
        var asstStgManager = res[0].asstStgManager;
        var light = res[0].light;
        var sound = res[0].sound;
        var stageCrew = res[0].stageCrew;
        var actor = res[0].actor; 
        var myJSON = JSON.stringify(obj); */

        callback(res ? res : "NO RESULTS FOUND\n");
    });
}

/*exports.getDirector = function (userID, callback) {
    if (!userID) return "NO RESULTS FOUND\n";
    var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
    var inserts = [userID, playID];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function (res) {
        var director = res[0].director;
        callback(director ? director : false);
    });
}

exports.getStageManager = function (userID, callback) {
    if (!userID) return "NO RESULTS FOUND\n";
    var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
    var inserts = [userID, playID];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function (res) {
        var stageManager = res[0].stageManager;
        callback(stageManager ? stageManager : false);
    });
}

exports.getAsstStgManager = function (userID, callback) {
    if (!userID) return "NO RESULTS FOUND\n";
    var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
    var inserts = [userID, playID];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function (res) {
        var asstStgManager = res[0].asstStgManager;
        callback(asstStgManager ? asstStgManager : false);
    });
}

exports.getLight = function (userID, callback) {
    if (!userID) return "NO RESULTS FOUND\n";
    var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
    var inserts = [userID, playID];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function (res) {
        var light = res[0].light;
        callback(lgiht ? light : false);
    });
}

exports.getSound = function (userID, callback) {
    if (!userID) return "NO RESULTS FOUND\n";
    var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
    var inserts = [userID, playID];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function (res) {
        var sound = res[0].sound;
        callback(sound ? sound : false);
    });
}

exports.getStageCrew = function (userID, callback) {
    if (!userID) return "NO RESULTS FOUND\n";
    var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
    var inserts = [userID, playID];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function (res) {
        var stageCrew = res[0].stageCrew;
        callback(stageCrew ? stageCrew : false);
    });
}

exports.getDirector = function (userID, callback) {
    if (!userID) return "NO RESULTS FOUND\n";
    var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
    var inserts = [userID, playID];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function (res) {
        var isDirector = res[0].isDirector;
        callback(isDirector ? isDirector : false);
    });
}

exports.getActor = function (userID, callback) {
    if (!userID) return "NO RESULTS FOUND\n";
    var sql = "SELECT RolePath FROM permissions WHERE userID = ? AND playID = ?";
    var inserts = [userID, playID];
    sql = mysql.format(sql, inserts);
    db.queryDB(conn, sql, function (res) {
        var actor = res[0].actor;
        callback(actor ? actor : false);
    });
} */
