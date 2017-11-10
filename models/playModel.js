/*
 * playModel.js contains the script-related functions that interact with the DB
 */

// Initialize globals
var mysql = require ( 'mysql');
var db = require( './dbModule');
var modelPass = require( './modelPasswords' );
var conn = mysql.createConnection ( {
	host	:'localhost',
	user	:'theatreSuiteUser',
	password:'modelPass.loginModelPass,
	databse :'theatreappsuite',
});


/*
 * getPlayList returns a list of the scripts in the database
 *
 * @param: callback, the callback function
 *
 * @return: list of scripts
 */
exports.getPlayList = function(callback) {
	var sql = "SELECT Name, PlayID FROM theatreappsuite.play";
	
	db.queryDB( conn, sql, function(res)) {
		callback(res);		
	});
} 
