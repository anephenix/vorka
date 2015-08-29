'use strict';



// Dependencies
//
var url                 = require('url');
var responseHandlers    = require('./response');
var _                   = require('lodash');



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



// Used to store dynamic routes, sorted by HTTP method,
// and match based on routes
//
var dynamicRoutes = {
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



// 
//
function parseDynamicRoute (url, method) {
    // Split the url into segments (based on number of items in url, and remove trailing slashes);
    var splitUrl    = _.compact(url.split('/'));
    if (!dynamicRoutes[method][splitUrl.length]) {
        dynamicRoutes[method][splitUrl.length] = [url];
    } else {
        dynamicRoutes[method][splitUrl.length].push(url);
    }
}



// 
//
function urlMatchesDynamicRoute (splitUrl, possibleUrl) {
    var splitPossibleUrl = _.compact(possibleUrl.split('/'));
    for (var i=0;i<splitUrl.length;i++) {
        if (splitUrl[i] === splitPossibleUrl[i]) {
            if (i === splitUrl.length-1) {
                return true;
            } 
        } else {
            if (splitPossibleUrl[i].match(':') !== null) {
                if (i === splitUrl.length-1) {
                    return true;
                }
            } else {
                return false;
            }
        }
    }
}



// Checks if a dynamic route exists for the url
//
function dynamicRouteExists (parsedRequest) {
    var splitUrl    = _.compact(parsedRequest.pathname.split('/'));    
    var possibleUrls = dynamicRoutes[parsedRequest.method][splitUrl.length];
    if (possibleUrls && possibleUrls.length > 0) {
        for (var i=0;i<possibleUrls.length;i++) {
            var possibleUrl = possibleUrls[i];
            if (urlMatchesDynamicRoute(splitUrl, possibleUrl)) {
                return possibleUrl;
            } else {
                if (i === possibleUrls.length -1) {
                    return false;
                }
            }
        }
    } else {
        return false;
    }
}



// Populates the req.params object with the parameters
// from the parsed url
//
function populateParamsForRequest (req, pathname, url) {
    req.params = {};
    var splitPathname    = _.compact(pathname.split('/'));    
    var splitUrl        = _.compact(url.split('/'));
    for (var i=0; i<splitUrl.length;i++) {
        if (splitUrl[i].match(':') !== null) {
            req.params[splitUrl[i].replace(':','')] = splitPathname[i];
        }
    }   
}



// Handles all HTTP requests
//
// @param   (req)   {Object}    The http request object
// @param   (res)   {Object}    The http response object
//
function handler (req, res) {
    responseHandlers(res);
    var parsedRequest = parseRequest(req);
    if (typeof routes[parsedRequest.method][parsedRequest.pathname] === 'function') {
        routes[parsedRequest.method][parsedRequest.pathname](req,res);
    } else {
        var url = dynamicRouteExists(parsedRequest);
        if (url) {
            populateParamsForRequest(req, parsedRequest.pathname, url);
            routes[parsedRequest.method][url](req,res);
        } else {
            handleNotFound(res);
        }
    } 
}



// A macro function that generates a function 
// for attaching a handler to a route on a 
// given HTTP method
//
// @param   (method)    {String}        The HTTP method
// @return              {Function}      The function that attaches a function to a route
//
function addRouteForMethod (method) {
    return function (url, funktion) {
        if (url.match(':') !== null) {
            parseDynamicRoute(url, method);
        }
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