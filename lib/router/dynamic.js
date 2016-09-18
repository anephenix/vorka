'use strict';


// Dependencies
//
const _ = require('lodash');


// Used to store dynamic routes, sorted by HTTP method,
// and match based on routes
//
const dynamicRoutes = {
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
    const splitUrl    = _.compact(url.split('/'));
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
    const splitPossibleUrl = _.compact(possibleUrl.split('/'));
    for (let i=0;i<splitUrl.length;i++) {
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
    const splitUrl    = _.compact(parsedRequest.pathname.split('/'));
    const possibleUrls = dynamicRoutes[parsedRequest.method][splitUrl.length];
    if (possibleUrls && possibleUrls.length > 0) {
        for (let i=0;i<possibleUrls.length;i++) {
            let possibleUrl = possibleUrls[i];
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
    const splitPathname   = _.compact(pathname.split('/'));
    const splitUrl        = _.compact(url.split('/'));
    for (let i=0; i<splitUrl.length;i++) {
        if (splitUrl[i].indexOf(':') > -1) {
            req.params[splitUrl[i].replace(':','')] = splitPathname[i];
        }
    }
}


module.exports = {parseRoute, routeExists, populateParamsForRequest};
