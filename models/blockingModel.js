/*
 * blockingModel.js contains the blocking-related functions that interact with the DB
 */

'use strict';

// Initialize globals
var mysql = require( 'mysql' );
var db = require( './dbModule' );
var modelPass = require( './modelPasswords' );
var conn  = mysql.createConnection( {
	host     : 'localhost',
	user     : 'blockingModel',
	password : modelPass.blockingModel,
	database : 'DatabaseNameHere',
} );

