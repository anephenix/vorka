'use strict';


// Dependencies
//
var assert = require('assert');
var index  = require('../../lib/index');
var server = require('../../lib/index');

describe('index', () => {

	it('should return the server library', (done) => {

		assert.deepEqual(server, index);
		done();

	});

});