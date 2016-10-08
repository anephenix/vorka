'use strict';



// Load dependencies/modules
//
const http        = require('http');
const router      = require('./router');



// Load the http server
//
const server      = http.createServer(router.handler);



// Alias router's route functions to the http server
//
['get','post','put','delete','patch','head']
.forEach((method) => {
	server[method] = router.attachMethodToServer(method, server);
});



// Expose the http server as the API
//
module.exports  = server;
