/*
 * playManager.js contains the functions that handle script accesses
 */

'use strict';

//Initialize globals
var playModel = require('../models/playModel');

/*
 * This is a prototype function that returns a default example script.
 * This should be replaced with an actual database controller
 */

function getPlay( id ) {
   return "<?xml version\"1.0\"?><script title=\"The Interview\" author=\"Patrick M. Bailey\" license=\"2011\"><roles><character id='1' name='John'/><character id='12' name='Princess'/></roles><act id='2'>t<scene id='2' title='Confrontation'><description>In <em>the</em> castle</description><line id='ABC1234'><!-- line id deterministically generated --><text><em>Princess enters the scene</em></text></line><line id='FEFE332' characterID='12'><text>But daddy, I <em>love</em> him!<!-- can include em, strong tags.--></text></line><!--</scene></act> XML MAY be well-formed (or not) --></script>"
}


/*
 * getPlay returns the xml of the script associated with a certain id
 *
 * @param: req.query.id, the id
 *
 * @return: Requested script xml
 */
exports.getPlay = function( req, res ) {
	var id = req.query.id;

	res.send(getPlay(req.id));
   
}

/*
 * Function that returns a list of scripts in the form of an array
 * 
 */
function getplayList () {
	playList = [];
	console.log( res );	
	return playList;
}

/*
 * getplayList returns the list of play scripts with their names and ids
 * 
 * @param: res
 *
 * @return: List of scripts
 */
exports.getplayList = function( res ) {

	res.send(getplayList());
}
