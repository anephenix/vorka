'use strict';



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



// Expose the public API
//
module.exports = {routes};