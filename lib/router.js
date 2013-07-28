'use strict';


// Load Dependencies
var url                 = require('url');
var responseHandlers    = require('./response');


// Used to store all of the pathnames, sorted by HTTP method
//
var routes = {
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



// Parses the http request to identify the http method and url pathname
//
// @param   (url)       {String}    The url to intercept requests for
// @param   (funktion)  {Function}  The function for the request
//
function get (url, funktion) {
    routes.GET[url] = funktion;
}



// Parses the http request to identify the http method and url pathname
//
// @param   (url)       {String}    The url to intercept requests for
// @param   (funktion)  {Function}  The function for the request
//
function post (url, funktion) {
    routes.POST[url] = funktion;
}



// Parses the http request to identify the http method and url pathname
//
// @param   (url)       {String}    The url to intercept requests for
// @param   (funktion)  {Function}  The function for the request
//
function put (url, funktion) {
    routes.PUT[url] = funktion;
}



// Parses the http request to identify the http method and url pathname
//
// @param   (url)       {String}    The url to intercept requests for
// @param   (funktion)  {Function}  The function for the request
//
function del (url, funktion) {
    routes.DELETE[url] = funktion;
}



// Parses the http request to identify the http method and url pathname
//
// @param   (url)       {String}    The url to intercept requests for
// @param   (funktion)  {Function}  The function for the request
//
function patch (url, funktion) {
    routes.PATCH[url] = funktion;
}



// Expose a public api for the router
//
module.exports = {
    handler   : handler,
    get       : get,
    post      : post,
    put       : put,
    delete    : del,     // delete is a Javascript keyword
    patch     : patch
};