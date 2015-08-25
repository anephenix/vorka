'use strict';



// Generates response helpers for different content types
//
// @param   res             {Object}        The HTTP response object
// @param   contentType     {String}        The content type header
// @return                  {Function}      The response helper function
//
function generateResponseHelper (res, contentType) {
    return function (statusCode, body) {
        res.writeHead(statusCode, {'Content-Type': contentType, 'Content-Length': body.length });
        res.end(body);        
    };
}



// Attaches helper functions to the HTTP response object
//
// @param res                 {Object}  The HTTP response object  
//
function responseHelpers (res) {

    // Returns a JSON response to the HTTP request
    //
    // @param statusCode      {Number}                      The status code to return
    // @param body            {Object|Number|Array|String}  The data to encode to JSON
    //
    res.json = function(statusCode, body) {
        if (typeof body !== 'string') {body = JSON.stringify(body);}
        res.writeHead(statusCode, {'Content-Type': 'application/json', 'Content-Length': body.length });
        res.end(body);
    };

    res.html = generateResponseHelper(res, 'text/html');

    res.text = generateResponseHelper(res, 'text/plain');

    res.css = generateResponseHelper(res, 'text/css');

    res.js = generateResponseHelper(res, 'application/javascript');

}



// Expose the response helpers attach function as the API
module.exports = responseHelpers;