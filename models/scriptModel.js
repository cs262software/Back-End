/**
 * scriptModel.js contains the script-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var DOMParser = require('xmldom').DOMParser
var parseString = require('xml2js').parseString;
var Promise = require('promise');
require('promise/lib/rejection-tracking').enable();
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'root',
	password : modelPass.fileModelPass,
	database : 'theatreappsuite',
} );

/**
 * inputXML takes an xml string and extracts information from it, putting it into the DB
 *
 * @param: uid, user id
 * @param: fid, file id
 *
 * @return: file path
 */
exports.inputXML = function( xmlFile ) {
	
	
	/*db.queryDB( conn, "DELETE FROM `play`;", function (res) { console.log(res); });
	db.queryDB( conn, "DELETE FROM `character`;", function (res) { console.log(res); });
	db.queryDB( conn, "DELETE FROM `line`;", function (res) { console.log(res); });
	db.queryDB( conn, "DELETE FROM `blocking`;", function (res) { console.log(res); });*/
	
	
	var xml = parseString(xmlFile, function (err, result) {
		//console.log(result["script"]["roles"][0]["character"])
		
		var playSql = mysql.format("INSERT INTO play (Name) VALUES ('" + result["script"]["$"]["title"] + "')");
		console.log(playSql)
		db.queryDB( conn, playSql, function (res) { 
			
			console.log(res); 
			var PlayID = res["insertId"];
			var Characters = []
			for (var c = 0; c < result["script"]["roles"][0]["character"].length; c++) {
				var item = result["script"]["roles"][0]["character"][c];
				console.log(item["$"]["name"])
				Characters.push([item["$"]["name"], null])
			}
			
			var Lines = [];
			var Blocks = [];
			var LineNum = 0;
			// Iterate through the acts
			for (var act = 0; act < result["script"]["act"].length; act++) {
				// Iterate through the scenes contained within each act
				for (var scene = 1; scene < result["script"]["act"][act]["scene"].length; scene++) {
					// Iterate through the lines within each scene
					for (var line = 0; line < result["script"]["act"][act]["scene"][scene]["line"].length; line++) {
						var txt = result["script"]["act"][act]["scene"][scene]["line"][line]
						//console.log("LINE " + line + ": " + txt["text"])
						Lines.push([PlayID, act + 1, scene + 1, line + 1, txt["text"]])
						//console.log(txt["$"])
						if (txt["$"] != null && txt["$"]["characterID"]) {
							Blocks.push(txt["$"]["characterID"]);
						} else {
							Blocks.push(null);
						}
					}
					
				}
			}
			var CharIds = []
			Characters.forEach(function (item, index, array) {
				var sql = "INSERT INTO `characterinfo` (`Name`, `Description`) VALUES (?, ?)";
				var inserts = item;
				sql = mysql.format( sql, inserts );
				//console.log(index + " " + item)
				//var qdb = Promise.denodeify(db.queryDB);
				var qdb = new Promise(function (resolve, reject) {
					db.queryDB(conn, sql, function (res) { resolve(res) });
				})
				var res = new Promise(function (resolve, reject) {
					qdb.then(function (res) {
						return resolve(res["insertId"]);
					});
				});
				res.then(function (r) {
					CharIds.push(r);
					console.log(CharIds)
				})
			});
			while (CharIds.length != Characters.length) {  }
			console.log("===========\n\n" + CharIds);
			return;
			
			//for (var i = 0; i < 20; i++)
			//	console.log("KXZC " + Lines[i])
			Lines.forEach(function (item, index, array) {
				var inserts = item;
				
				var sql = "INSERT INTO `line` (`PlayID`, `ActNum`, `SceneNum`, `LineNum`, `Text`) VALUES (?, ?, ?, ?, ?)";
				sql = mysql.format( sql, inserts );
				console.log("KZXC" + sql)
				db.queryDB( conn, sql, function( lres ) {
					if (Blocks[index] != null) {
						var sql = "INSERT INTO `characterline` (`LineID`, `CharacterID`, `Speaking`) VALUES (?, ?, ?);"
						sql = mysql.format(sql, [lres["insertId"], Blocks[index], 1]);
						db.queryDB( conn, sql, function (res) {});
					}
				} );
			});
			
			
		});
		
	})
	return
	//console.log()
	var Characters = []
	for (var c = 0; c < xml.getElementsByTagName("character").length; c++) {
		var item = xml.getElementsByTagName("character")[c];
		//console.log("=======================================\n" + item.attributes.getNamedItem("name"))
		Characters.push([item.attributes.getNamedItem("name").value, item.nodeValue])
	}
	
	var Lines = [];
	var Blocks = [];
	var LineNum = 0;
	// Iterate through the acts
	console.log("ACT length:" + xml.getElementsByTagName("act").length)
	for (var act = 0; act < xml.getElementsByTagName("act").length; act++) {
		// Iterate through the scenes contained within each act
		console.log("Scene length:" + xml.getElementsByTagName("act")[act].childNodes.length)
		for (var scene = 1; scene < xml.getElementsByTagName("act")[act].childNodes.length; scene += 2) {
			// Iterate through the lines within each scene
			//for (var i = 0; i < 141; i += 2)
				console.log("lineXZQ" + xml.getElementsByTagName("act")[act].childNodes[scene].childNodes[1].childNodes[0])
			//console.log("\n\n" + scene.childNodes)
			for (var line = 0; line < xml.getElementsByTagName("act")[act].childNodes[scene].childNodes.length; line++) {
				var txt = xml.getElementsByTagName("act")[act].childNodes[scene].childNodes[line];
				//console.log(line.nodeValue)
				Lines.push([PlayID, act + 1, scene + 1, line + 1, txt.nodeValue])
				if (txt.attributes != null && Array.from(txt.attributes).indexOf("characterID") > -1) {
					Blocks.push([txt.attributes.getNamedItem("characterID").value, LineNum - 1]);
				}
			}
			
		}
	}
	
	
	
	
	
	Characters.forEach(function (item, index, array) {
		var sql = "INSERT INTO `character` (`Name`, `Description`) VALUES (?, ?)";
		var inserts = item;
		sql = mysql.format( sql, inserts );
		//console.log(index + " " + item)
		db.queryDB( conn, sql, function( res ) {} );
	});
	
	for (var i = 0; i < 20; i++)
		console.log("KXZC " + Lines[i])
	Lines.forEach(function (item, index, array) {
		var inserts = item;
		
		var sql = "INSERT INTO `line` (`PlayID`, `ActNum`, `SceneNum`, `LineNum`, `Text`) VALUES (?, ?, ?, ?, ?)";
		sql = mysql.format( sql, inserts );
		console.log("KZXC" + sql)
		db.queryDB( conn, sql, function( res ) {} );
	});
	
	/*var sql = "INSERT INTO line (CharacterID, LineID) VALUES ('?', '?')";
	
	Lines.forEach(function (item, index, array) {
		var inserts = item;
		sql = mysql.format( sql, inserts );
		db.queryDB( conn, sql, function( res ) {} );
	});*/
	
}
