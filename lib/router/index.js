'use strict';

// // Dependencies
// //
const fs 									= require('fs');
const path								= require('path');
const url                 = require('url');
const staticRouter        = require('./static');
const dynamicRouter       = require('./dynamic');
const responseHandlers    = require('../response');


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
// @return          {Object}    The parsed method and pathname of the request
//
function parseRequest (req) {
    return {method: req.method, pathname: url.parse(req.url).pathname};
}


// Handles all HTTP requests
//
// @param   (req)   {Object}    The http request object
// @param   (res)   {Object}    The http response object
//
// TODO - simplify the logic of this function - it's too coupled
//
function handler (req, res) {
    responseHandlers(res);
    const parsedRequest = parseRequest(req);
    const methodRoutes = staticRouter.routes[parsedRequest.method];
    if (typeof methodRoutes[parsedRequest.pathname] === 'function') {
        methodRoutes[parsedRequest.pathname](req,res);
    } else {
        const matchedUrl = dynamicRouter.routeExists(parsedRequest);
        if (matchedUrl) {
            dynamicRouter.populateParamsForRequest(
              req,
              parsedRequest.pathname, matchedUrl
            );
            methodRoutes[matchedUrl](req,res);
        } else {
            handleNotFound(res);
        }
    }
}

function handleExtensionNotHandled (extension, res) {
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.end(`File extension ${extension} is not currently handled by the server\n`);
}


function parseFilePath (filePath) {

	// Does the file exist?
	// If it does, detect the file type and serve
	// If it does not, return a 404
	const fullFilePath = path.join(process.cwd(), filePath);
	const exists = fs.existsSync(fullFilePath);
	if (!exists) return (req, res) => {
		handleNotFound(res);
	};
	const extension = path.extname(filePath).replace('.','');
	if (extension.length > 1) {
		return (req, res) => {
			res[extension](200, fs.readFileSync(fullFilePath, 'utf8'));
		};
	} else {
		return (req, res) => {
			handleExtensionNotHandled(extension, res);
		};
	}
}

function attachMethodToServer(method, server) {
	return addRouteForMethod(server, method);
}


/**
   A macro function that generates a function for attaching a handler to a
   route on a given HTTP method

   @param   (method)    {String}        The HTTP method
   @return              {Function}      The function that attaches a function to a route
*/
function addRouteForMethod (server, method) {
    return (passedUrl, functionOrFilePath) => {
        if (passedUrl.indexOf(':') > -1) {
            dynamicRouter.parseRoute(passedUrl, method);
        }
				// If this is a file reference, turn it into a function here
				if (typeof functionOrFilePath === 'string' ) {
					  functionOrFilePath = parseFilePath(functionOrFilePath);
				}
        staticRouter.routes[method.toUpperCase()][passedUrl] = functionOrFilePath;
				return server;
    };
}


// Expose a public api for the router
//
module.exports = {
  routes: staticRouter.routes, handler, attachMethodToServer
};
