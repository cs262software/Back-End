/**
 * dbModule.js contains functions to connect, query, and disconnect from the db
 */
'use strict';

/*
 * Send a query to the DB connection
 *
 * @param: connection
 * @param: query, (string) query to send to db
 *
 * @return: query results
 */
exports.queryDB = function( connection, query, callback ) {
	connection.query( query, function( err, results, fields ) {
		if ( err ) {
			console.error( 'error fetching results: ' + err );
			callback( err );
		} else {
			callback( results );
		}
	} );
	return;
}
