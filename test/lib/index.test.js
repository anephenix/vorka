'use strict';


// Dependencies
//
const assert = require('assert');
const index  = require('../../lib/index');
const server = require('../../lib/index');

describe('index', () => {

	it('should return the server library', (done) => {

		assert.deepEqual(server, index);
		done();

	});

});