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
	var sql = "SELECT prop.PropID, Name, Description, UserID, MovementDescription FROM prop INNER JOIN propmovement ON prop.PropID = propmovement.PropID where propmovement.LineID = ?;"
	var inserts = [lineID];
	sql = mysql.format(sql, inserts);

	db.queryDB( conn, sql, function(res) {
		callback(res);
	});
}
