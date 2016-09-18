'use strict';


// Dependencies
//
const assert = require('assert');
const router = require('../../lib/router');
const server = require('../../lib/server');


describe('server', () => {

	it('should return a http server', (done) => {

		assert(typeof server.listen === 'function');
		done();

	});

	it('should have router functions available', (done) => {

		const check = i => assert.deepEqual(router[i], server[i]);
		['get', 'post', 'put', 'delete', 'patch', 'head'].map(check);
		done();

	});

});
