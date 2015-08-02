'use strict';


// Dependencies
//
var assert = require('assert');
var index  = require('../../lib/index');
var server = require('../../lib/index');

describe('index', function () {

	it('should return the server library', function (done) {

		assert.deepEqual(server, index);
		done();

	});

});