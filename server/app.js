/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose-q')();
var config = require('./config/environment');
var OrientDB = require('orientjs');

// Connect to databases
mongoose.connect(config.mongo.uri, config.mongo.options);

var orientDBServer = OrientDB(config.orientDB);
var orientDatabase = orientDBServer.use('podyum');

// Populate DB with sample data
if(config.seedDB) { 
	require('./config/seed'); 
}

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
	serveClient: (config.env === 'production') ? false : true,
	path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app, orientDatabase);

// Start server
server.listen(config.port, config.ip, function () {
	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;

// On server shutdown
var gracefulShutdown = function() {
	console.log("Received kill signal, shutting down gracefully.");
	orientDBServer.close();
	server.close(function() {
		console.log("Closed out remaining connections.");
		process.exit()
	});

	// if after 
	setTimeout(function() {
		console.error("Could not close connections in time, forcefully shutting down");
		process.exit()
	}, 10*1000); 
};
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown); 
