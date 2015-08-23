'use strict';



// Load Dependencies
var url                 = require('url');
var responseHandlers    = require('./response');



// Used to store all of the pathnames, sorted by HTTP method
//
var routes = {
    HEAD    : {},
    GET     : {},
    POST    : {},
    PUT     : {},
    DELETE  : {},
    PATCH   : {}
};



// Handles pathnames that don't have a function bound to them
//
// @param   (res)   {Object}    The http response object
//
function handleNotFound (res) {
    // TODO - have a way to specify a custom 404 (html/json/xml)
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found\n');
}



// Parses the http request to identify the http method and url pathname
//
// @param   (req)   {Object}    The http request object
//
function parseRequest (req) {
    return {method: req.method, pathname: url.parse(req.url).pathname};
}



// Handles all HTTP requests
//
//
// @param   (req)   {Object}    The http request object
// @param   (res)   {Object}    The http response object
//
function handler (req, res) {
    responseHandlers(res);
    var parsed = parseRequest(req);
    if (typeof routes[parsed.method][parsed.pathname] === 'function') {
        routes[parsed.method][parsed.pathname](req,res);
    } else {
        handleNotFound(res);
    }
}



// A macro function that generates a function 
// for attaching a handler to a route on a 
// given HTTP method
//
// @param   (method)    {String}      The HTTP method
//
function addRouteForMethod (method) {
    return function (url, funktion) {
        routes[method][url] = funktion;
    };
}



// Expose a public api for the router
//
module.exports = {
    routes    : routes,
    handler   : handler,
    head      : addRouteForMethod('HEAD'),
    get       : addRouteForMethod('GET'),
    post      : addRouteForMethod('POST'),
    put       : addRouteForMethod('PUT'),
    delete    : addRouteForMethod('DELETE'),     // delete is a Javascript keyword
    patch     : addRouteForMethod('PATCH')
};