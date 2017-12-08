
/*
 * blockingModel.js contains the blocking-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require('mysql');
var db = require('./dbModule');
//var modelPass = require( './modelPasswords' );
var modelUser = require('./modelUser');

var conn = mysql.createConnection({
	host: 'localhost',
	user: modelUser.username,
	password: modelUser.password,
	database: 'theatreappsuite',
});

/**
 * getBlockingByLineID returns the blocking instructions at or before the LineID passed to the function
 *
 * @param: lid, the LineID
 *
 * @param: callback, the callback function
 *
 * @return: blocking...
 */
exports.getBlockingByLineID = function (lid, callback) {

	var sql = (`
		SELECT line.PlayID, line.ActNum, line.SceneNum, line.LineNum
		FROM line
		WHERE LineID = ?
	`);
	var inserts = [lid];
	sql = mysql.format(sql, inserts);

	db.queryDB(conn, sql, function (res) {
		if (res.length > 0) {
			sql = (`
				SELECT characterline.LineID AS LineID, characterline.CharacterID AS CharacterID, characterinfo.Name AS Name,
				blocking.OriginX AS OriginX, blocking.OriginY AS OriginY, blocking.OriginZ AS OriginZ,
				blocking.DestX AS DestX, blocking.DestY AS DestY, blocking.DestZ AS DestZ,
				blocking.MovementType AS MovementType, blocking.Orientation AS Orientation

				FROM line
				JOIN theatreappsuite.characterline ON characterline.LineID = line.lineID
				JOIN theatreappsuite.characterinfo ON characterinfo.CharacterID = characterline.CharacterID
				JOIN theatreappsuite.blocking ON blocking.BlockingID = characterline.BlockingID

				WHERE PlayID = ?
				AND ActNum = ?
				AND SceneNum = ?
				AND LineNum <= ?

				ORDER BY LineNum DESC
			`);

			inserts = [res[0].PlayID, res[0].ActNum, res[0].SceneNum, res[0].LineNum];
			sql = mysql.format(sql, inserts);

			db.queryDB(conn, sql, function (res2) {
				callback(res2);
			});
		}
		else {
			callback(res);
		}
	});
}

/*
 * createBlocking both updates/creates blocking instruction depending
 * on whether or not they exist in the db
 *
 * @param: lid, blockingUpdateArray
 *
 * @param: callback, the callback function
 *
 */
exports.createBlocking = function (lid, currDataSet, callback) {
	var charID = currDataSet.CharacterID;
	var destx = currDataSet.DestX;
	var desty = currDataSet.DestY;
	var destz = currDataSet.DestZ;

	var sql = ("SELECT BlockingID FROM characterline WHERE CharacterID=? AND LineID=?;");
	var inserts = [charID, lid];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function (res) {
		if( res.length == 0 ) {
			console.log("No LID");
			var sql1 = "INSERT INTO blocking (DestX, DestY, DestZ, OriginX, OriginY, OriginZ) VALUES (?,?,?,0,0,0);"
			var inserts1 = [destx, desty, destz];
			sql1 = mysql.format(sql1, inserts1);
			db.queryDB(conn, sql1, function (res1) {
				var blockingID = res1.insertId;
				var sql2 = "INSERT INTO characterline (CharacterID, LineID, BlockingID, Speaking) VALUES (?,?,?,?);"
				var insert2 = [charID, lid, blockingID, false];
				sql2 = mysql.format(sql2, insert2);
				db.queryDB(conn, sql2, function (res2) {
					callback(res2);
				});
			});
		}
		else {
			if ( res[0].BlockingID == null ) {
				console.log("LID, NO BID");
				var sql3 = "INSERT INTO blocking (DestX, DestY, DestZ, OriginX, OriginY, OriginZ) VALUES (?,?,?,0,0,0);"
				var inserts3 = [destx, desty, destz];
				sql3 = mysql.format(sql3, inserts3);
				db.queryDB(conn, sql3, function (res3) {
					var blockingID = res3.insertId;
					var sql4 = "UPDATE characterline SET BlockingID = ? WHERE CharacterID = ? AND LineID = ?;"
					var insert4 = [blockingID, charID, lid];
					sql4 = mysql.format(sql4, insert4);
					db.queryDB(conn, sql4, function (res4) {
						callback(res4);
					});
				});
			}
			else {
				console.log("LID AND BID");
				var sql5 = "UPDATE blocking SET DestX = ?, DestY = ?, DestZ = ? WHERE BlockingID = ?;"
				var inserts5 = [destx, desty, destz, res[0].BlockingID];
				sql5 = mysql.format(sql5, inserts5);
				db.queryDB(conn, sql5, function (res5) {
					callback(res5);
				});
			}
		}
	});
}
