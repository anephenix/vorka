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

		assert.deepEqual(router.get, server.get);
		assert.deepEqual(router.post, server.post);
		assert.deepEqual(router.put, server.put);
		assert.deepEqual(router.delete, server.delete);
		assert.deepEqual(router.patch, server.patch);
		assert.deepEqual(router.head, server.head);
		done();

	});

});