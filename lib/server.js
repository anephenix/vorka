'use strict';

// Load dependencies/modules
var http        = require('http');
var router      = require('./router');

// Load the http server
var server      = http.createServer(router.handler);

// Alias router's route functions to the http server 
server.get      = router.get;
server.post     = router.post;
server.put      = router.put;
server.delete   = router.delete;
server.patch    = router.patch;
server.head 	= router.head;

// Expose the http server as the API
module.exports  = server;