'use strict';



// Used to store all of the pathnames, sorted by HTTP method
//
const routes = {
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
