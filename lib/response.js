'use strict';

function responseHelpers (context) {
    
    context.json = function(statusCode, body) {
        context.writeHead(statusCode, {'Content-Type': 'application/json'});
        if (typeof body !== 'string') {body = JSON.stringify(body);}
        context.end(body);
    };

    context.html = function(statusCode, body) {
        context.writeHead(statusCode, {'Content-Type': 'text/html'});
        context.end(body);
    };

    context.text = function(statusCode, body) {
        context.writeHead(statusCode, {'Content-Type': 'text/plain'});
        context.end(body);
    };

    context.css = function(statusCode, body) {
        context.writeHead(statusCode, {'Content-Type': 'text/css'});
        context.end(body);
    };

    context.js = function(statusCode, body) {
        context.writeHead(statusCode, {'Content-Type': 'application/javascript'});
        context.end(body);
    };

}

module.exports = responseHelpers;