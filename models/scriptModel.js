/**
 * scriptModel.js contains the script-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var parseString = require('xml2js').parseString;
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'root',
	password : modelPass.fileModelPass,
	database : 'theatreappsuite',
} );

/**
 * inputXML takes an xml string and extracts information from it, putting it into the DB
 *
 * @param: xmlFile, file in xml format containing play data
 *
 */
exports.inputXML = function( xmlFile ) {
	var xml = parseString(xmlFile, function (err, result) {
		// Insert play name into the database
		var playSql = mysql.format("INSERT INTO play (Name) VALUES ('" + result["script"]["$"]["title"] + "')");
		db.queryDB( conn, playSql, function (res) { 
			var PlayID = res["insertId"];
			// Iterate through xml character tags, pushing them onto a stack/list
			var Characters = []
			for (var c = 0; c < result["script"]["roles"][0]["character"].length; c++) {
				var item = result["script"]["roles"][0]["character"][c];
				Characters.push([item["$"]["name"], null])
			}
			// Iterate through xml line tags, pushing them onto a stack, and push speaking char onto another stack
			var Lines = [];
			var Blocks = [];
			// Iterate through the acts
			for (var act = 0; act < result["script"]["act"].length; act++) {
				// Iterate through the scenes contained within each act
				for (var scene = 1; scene < result["script"]["act"][act]["scene"].length; scene++) {
					// Iterate through the lines within each scene
					for (var line = 0; line < result["script"]["act"][act]["scene"][scene]["line"].length; line++) {
						var txt = result["script"]["act"][act]["scene"][scene]["line"][line]
						Lines.push([PlayID, act + 1, scene + 1, line + 1, txt["text"]])
						if (txt["$"] != null && txt["$"]["characterID"]) {
							Blocks.push(txt["$"]["characterID"]);
						} else {
							Blocks.push(null);
						}
					}
					
				}
			}
			// Iterate through the character stack, inserting each into the database
			Characters.forEach(function (item, index, array) {
				var sql = "INSERT INTO `characterinfo` (`Name`, `Description`) VALUES (?, ?)";
				var inserts = item;
				sql = mysql.format( sql, inserts );
				global.r = db.queryDB(conn, sql, function (res2) {});
				
			});
			// Iterate through the lines stack, inserting each into the database, also inserting the speaking character, if any
			Lines.forEach(function (item, index, array) {
				var inserts = item;
				var sql = "INSERT INTO `line` (`PlayID`, `ActNum`, `SceneNum`, `LineNum`, `Text`) VALUES (?, ?, ?, ?, ?)";
				sql = mysql.format( sql, inserts );
				db.queryDB( conn, sql, function( lres ) {
					// If blocks is not null, then a character is speaking this line
					if (Blocks[index] != null) {
						var charsql = "SELECT `CharacterID` FROM `characterinfo` WHERE `Name` = ?";
						charsql = mysql.format(charsql, Characters[Blocks[index]][0]);
						// Insert speaking character
						db.queryDB( conn, charsql, function (res) { 
							var charid = res[res.length - 1].CharacterID;
							var sql = "INSERT INTO `characterline` (`LineID`, `CharacterID`, `Speaking`) VALUES (?, ?, ?);"
							sql = mysql.format(sql, [lres["insertId"], charid, 1]);
							db.queryDB( conn, sql, function (res) {} );
						});
					}
				});
			});
		});
	});
}
