'use strict';



// Load dependencies/modules
//
var http        = require('http');
var router      = require('./router');



// Load the http server
//
var server      = http.createServer(router.handler);



// Alias router's route functions to the http server 
//
['get','post','put','delete','patch','head']
.forEach(function (method) {
	server[method] = router[method];
});



// Expose the http server as the API
//
module.exports  = server;