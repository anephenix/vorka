'use strict';

// Dependencies
//
const fs = require('fs');
const generator = {};
const path = require('path');

// Generates an application folder, and app files that are needed to run the app
//
generator.generate = (appName, location, cb) => {
	fs.mkdir(path.join(location, appName), cb);
};

module.exports = generator;

// It needs to:
// create an app directory
// create a package.json file
// install dependencies
// print instructions on how to run the app
