'use strict';


// Dependencies
//
const assert = require('assert');
let router = require('../../../lib/router');


describe('router', () => {

	describe('#routes', () => {

		it('should return the list of all the HTTP methods and the routes associated with them', (done) => {

			let routes = {
			    HEAD    : {},
			    GET     : {},
			    POST    : {},
			    PUT     : {},
			    DELETE  : {},
			    PATCH   : {}
			};

			assert.deepEqual(routes, router.routes);
			done();

		});

	});

	describe('#handler', () => {

		describe('when the route is matched', () => {

			it('should execute the route', (done) => {

				let routeFunk = () => { done(); };

				router.get = router.attachMethodToServer('GET', {});
				router.get('/my-test', routeFunk);
				let mockedMethod = {method: 'GET', url: '/my-test'};
				router.handler(mockedMethod, {});

			});

		});


		describe('when the route is not matched', () => {

			it('should return a response notifying the user that the route was not found', (done) => {

				let mockedMethod 	= {method: 'GET', url: '/my-other-test'};
				let mockedResponse 	= {statusCode: null, headers: null, content: null};
				mockedResponse.writeHead = (statusCode, headers) => {
					mockedResponse.statusCode 	= statusCode;
					mockedResponse.headers 		= headers;
				};
				mockedResponse.end 	= (content) => {
					mockedResponse.content = content;
				};

				router.handler(mockedMethod, mockedResponse);
				assert.equal(404,mockedResponse.statusCode);
				assert.deepEqual({'Content-Type': 'text/plain'}, mockedResponse.headers);
				assert.equal('Not Found\n', mockedResponse.content);
				done();

			});

		});

        describe('when a route with dynamic variables is matched', () => {

		 	it('should execute the route, and populate the req.params object with the matching parameters', (done) => {

				let routeFunk = (req) => {
					assert.equal(req.params.username, 'paulbjensen');
					done();
				};
				router.get('/users/:username', routeFunk);
				let mockedMethod = {method: 'GET', url: '/users/paulbjensen'};
				let mockedResponse 	= {statusCode: null, headers: null, content: null};
				mockedResponse.writeHead = (statusCode, headers) => {
					mockedResponse.statusCode 	= statusCode;
					mockedResponse.headers 	= headers;
				};
				mockedResponse.end = (content) => {
					mockedResponse.content = content;
				};
				router.handler(mockedMethod, mockedResponse);

         	});

         	it('should execute the route and populate the req.params object with the matching parameters if the route parameter is inside the url', (done) => {

						let routeFunk = (req) => {
							assert.equal(req.params.username, 'paulbjensen');
							done();
						};
						router.get('/users/:username/posts/', routeFunk);
						let mockedMethod = {method: 'GET', url: '/users/paulbjensen/posts'};
						let mockedResponse 	= {statusCode: null, headers: null, content: null};
						mockedResponse.writeHead = (statusCode, headers) => {
							mockedResponse.statusCode 	= statusCode;
							mockedResponse.headers 		= headers;
						};
						mockedResponse.end = (content) => {
							mockedResponse.content = content;
						};
						router.handler(mockedMethod, mockedResponse);

         	});

         	it('should execute the route and populate the req.params object with the matching parameters if the route parameters are inside the url', (done) => {

				let routeFunk = (req) => {
					assert.equal(req.params.username, 'paulbjensen');
					assert.equal(req.params.id, 42);
					done();
				};
				let routeFunkTwo = () => {
					done(new Error('Should not have been triggered'));
				};
				router.get('/users/:username/posts/:id', routeFunk);
				router.get('/users/:username/posts/test', routeFunkTwo);
				let mockedMethod = {method: 'GET', url: '/users/paulbjensen/posts/42'};
				let mockedResponse 	= {statusCode: null, headers: null, content: null};
				mockedResponse.writeHead = (statusCode, headers) => {
					mockedResponse.statusCode 	= statusCode;
					mockedResponse.headers 		= headers;
				};
				mockedResponse.end =  (content) => {
					mockedResponse.content = content;
				};
				router.handler(mockedMethod, mockedResponse);

         	});

        });

        describe('when a route with dynamic variables is not matched', () => {

			it('should return a response notifying the user that the route was not found', (done) => {

				let routeFunkTwo = () => {
					done(new Error('Should not have been triggered'));
				};
				router.get('/users/:username/posts/test', routeFunkTwo);
				let mockedMethod 	= {method: 'GET', url: '/my-other-test/will/not/triger'};

				let mockedResponse = {statusCode: null, headers: null, content: null};
				mockedResponse.writeHead = (statusCode, headers) => {
					mockedResponse.statusCode = statusCode;
					mockedResponse.headers = headers;
				};
				mockedResponse.end = (content) => {
					mockedResponse.content = content;
				};

				router.handler(mockedMethod, mockedResponse);
				assert.equal(404,mockedResponse.statusCode);
				assert.deepEqual({'Content-Type': 'text/plain'}, mockedResponse.headers);
				assert.equal('Not Found\n', mockedResponse.content);
				done();

			});


    });

	});

	describe('#handleExtensionNotHandled', () => {});

	describe('#parseFilePath', () => {

		describe('when the file does not exist', () => {

			it('should attach a file not found handler');

		});

		describe('when the file extension is not handled', () => {

			it('should attach a file extension not handled handler', (done) => {

				const extension = '.d';
				let mockedResponse = {statusCode: null, headers: null, content: null};
				mockedResponse.writeHead = (statusCode, headers) => {
					mockedResponse.statusCode = statusCode;
					mockedResponse.headers = headers;
				};
				mockedResponse.end = (content) => {
					mockedResponse.content = content;
				};
				router.handleExtensionNotHandled(extension, mockedResponse);
				assert.equal(500,mockedResponse.statusCode);
				assert.deepEqual({'Content-Type': 'text/plain'}, mockedResponse.headers);
				assert.equal('File extension .d is not currently handled by the server\n', mockedResponse.content);
				done();
			});

		});

		it('should return a handler for the file based on the file extension');

	});

});
