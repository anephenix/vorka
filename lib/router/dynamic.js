'use strict';



// Dependencies
//
var _                   = require('lodash');



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



// Parses the dynamic route in order to store it for reference later
//
// @param   (url)       {String}    The url
// @param   (method)    {String}    The HTTP method
//
function parseRoute (url, method) {
    // Split the url into segments (based on number of items in url, and remove trailing slashes);
    var splitUrl    = _.compact(url.split('/'));
    if (!dynamicRoutes[method][splitUrl.length]) {
        dynamicRoutes[method][splitUrl.length] = [url];
    } else {
        dynamicRoutes[method][splitUrl.length].push(url);
    }
}



// Checks if a url matches a route with parameters
//
// @param   (splitUrl)      {Array}     The url pathname turned into parts
// @param   (possibleUrl)   {String}    The possible matching url
// @return                  {Boolean}   Does the url match? 
//
function urlMatchesRoute (splitUrl, possibleUrl) {
    var splitPossibleUrl = _.compact(possibleUrl.split('/'));
    for (var i=0;i<splitUrl.length;i++) {
        if (splitUrl[i] === splitPossibleUrl[i]) {
            if (i === splitUrl.length-1) {
                return true;
            } 
        } else {
            if (splitPossibleUrl[i].indexOf(':') > -1) {
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
// @param   (parsedRequest)     {Object}                The parsed request object
// @return                      {String or Boolean}     Either the matching string, or false
//
function routeExists (parsedRequest) {
    var splitUrl    = _.compact(parsedRequest.pathname.split('/'));    
    var possibleUrls = dynamicRoutes[parsedRequest.method][splitUrl.length];
    if (possibleUrls && possibleUrls.length > 0) {
        for (var i=0;i<possibleUrls.length;i++) {
            var possibleUrl = possibleUrls[i];
            if (urlMatchesRoute(splitUrl, possibleUrl)) {
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
// @param   (req)       {Object}    The http request object
// @param   (pathname)  {String}    The pathname for the request
// @param   (url)       {String}    The matched url
//
function populateParamsForRequest (req, pathname, url) {
    req.params = {};
    var splitPathname   = _.compact(pathname.split('/'));    
    var splitUrl        = _.compact(url.split('/'));
    for (var i=0; i<splitUrl.length;i++) {
        if (splitUrl[i].indexOf(':') > -1) {
            req.params[splitUrl[i].replace(':','')] = splitPathname[i];
        }
    }   
}



module.exports = {
	parseRoute 					: parseRoute,
	routeExists 				: routeExists,
	populateParamsForRequest 	: populateParamsForRequest
};