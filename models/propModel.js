/**
 * propModel.js contains the prop-related functions that interact with the DB
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
 * getProps returns a list of the props for a given line
 *
 * @param: lineID
 * @param: callback
 *
 * @return: list of props
 */
exports.getProps = function(lineID, callback) {
	var sql = "SELECT prop.PropID, Name, Description, UserID, MovementDescription, LineID FROM prop INNER JOIN propmovement ON prop.PropID = propmovement.PropID where propmovement.LineID = ?;"
	var inserts = [lineID];
	sql = mysql.format(sql, inserts);

	db.queryDB( conn, sql, function(res) {
		callback(res);
	});
}


/*
* newPropMovement creates propmovement row for a given line ID
* @param: propID
* @param: lineID
* @param: userID
* @param: movementDesc
*
* @return: Success? (bool)
*/
exports.newPropMovement = function(lineID, propID, userID, movementDesc, callback) {
	var sql = "INSERT INTO `theatreappsuite`.`propmovement` (`PropID`, `LineID`, `UserID`, `MovementDescription`) VALUES (?, ?, ?, ?);"
	var inserts = [propID, lineID, null, movementDesc];
	sql = mysql.format(sql, inserts);
	db.queryDB (conn, sql, function (res) {
		callback(res.affectedRows == 1);
	});
}


/*
* updatePropMovement updates prop and propmovement tables for a given line
* @param: lineID
* @param: prop
* @param: movementDesc
* @param: newPropID
* @param: callback (function)
*
* @return:
*/

exports.updatePropMovement = function(lineID, propID, movementDesc, newPropID, callback) {
	var inserts = [newPropID, movementDesc, propID, lineID];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res.affectedRows);
	});
}

exports.updateNote = function(lineID, note, callback) {
	var sql = "UPDATE line SET DirectorNote = ? WHERE LineID = ?";
	var inserts = [note, lineID];
	sql = mysql.format(sql, inserts);
	db.queryDB(conn, sql, function(res) {
		callback(res.affectedRows == 1);
	});
}
