'use strict';

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
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        if (typeof body !== 'string') {body = JSON.stringify(body);}
        res.end(body);
    };



    // Returns a HTML response to the HTTP request
    //
    // @param statusCode      {Number}  The status code to return
    // @param body            {String}  The html body to return
    //
    res.html = function(statusCode, body) {
        res.writeHead(statusCode, {'Content-Type': 'text/html'});
        res.end(body);
    };



    // Returns a plaintext response to the HTTP request
    //
    // @param statusCode      {Number}  The status code to return
    // @param body            {String}  The plaintext to return
    //
    res.text = function(statusCode, body) {
        res.writeHead(statusCode, {'Content-Type': 'text/plain'});
        res.end(body);
    };



    // Returns a css response to the HTTP request
    //
    // @param statusCode      {Number}  The status code to return
    // @param body            {String}  The css to return
    //
    res.css = function(statusCode, body) {
        res.writeHead(statusCode, {'Content-Type': 'text/css'});
        res.end(body);
    };

    // Returns a js response to the HTTP request
    //
    // @param statusCode      {Number}  The status code to return
    // @param body            {String}  The js to return
    //
    res.js = function(statusCode, body) {
        res.writeHead(statusCode, {'Content-Type': 'application/javascript'});
        res.end(body);
    };

}

// Expose the response helpers attach function as the API
module.exports = responseHelpers;