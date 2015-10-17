'use strict';


// Dependencies
//
var assert = require('assert');
var router = require('../../../lib/router');


describe('router', () => {

	describe('#routes', () => {

		it('should return the list of all the HTTP methods and the routes associated with them', (done) => {

			var routes = {
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

				var routeFunk = () => { done(); };
				router.get('/my-test', routeFunk);
				var mockedMethod = {method: 'GET', url: '/my-test'};
				router.handler(mockedMethod, {});

			});

		});


		describe('when the route is not matched', () => {

			it('should return a response notifying the user that the route was not found', (done) => {

				var mockedMethod 	= {method: 'GET', url: '/my-other-test'};
				var mockedResponse 	= {statusCode: null, headers: null, content: null};
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

				var routeFunk = (req) => {
					assert.equal(req.params.username, 'paulbjensen');
					done(); 
				};
				router.get('/users/:username', routeFunk);
				var mockedMethod = {method: 'GET', url: '/users/paulbjensen'};
				var mockedResponse 	= {statusCode: null, headers: null, content: null};
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

				var routeFunk = (req) => {
					assert.equal(req.params.username, 'paulbjensen');
					done(); 
				};
				router.get('/users/:username/posts/', routeFunk);
				var mockedMethod = {method: 'GET', url: '/users/paulbjensen/posts'};
				var mockedResponse 	= {statusCode: null, headers: null, content: null};
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

				var routeFunk = (req) => {
					assert.equal(req.params.username, 'paulbjensen');
					assert.equal(req.params.id, 42);
					done();
				};
				var routeFunkTwo = () => {
					done(new Error('Should not have been triggered'));
				};
				router.get('/users/:username/posts/:id', routeFunk);
				router.get('/users/:username/posts/test', routeFunkTwo);
				var mockedMethod = {method: 'GET', url: '/users/paulbjensen/posts/42'};
				var mockedResponse 	= {statusCode: null, headers: null, content: null};
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

				var routeFunkTwo = () => {
					done(new Error('Should not have been triggered'));
				};
				router.get('/users/:username/posts/test', routeFunkTwo);
				var mockedMethod 	= {method: 'GET', url: '/my-other-test/will/not/triger'};

				var mockedResponse = {statusCode: null, headers: null, content: null};
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

	describe('#head', () => {

		it('should attach a function to the route passed in', (done) => {

			var funk = (req, res) => { res.end(''); };
			router.head('/',funk);
			assert.deepEqual(funk, router.routes.HEAD['/']);
			done();

		});

	});

	describe('#get', () => {

		it('should attach a function to the route passed in', (done) => {

			var funk = (req, res) => { res.end(''); };
			router.get('/',funk);
			assert.deepEqual(funk, router.routes.GET['/']);
			done();

		});

	});

	describe('#post', () => {

		it('should attach a function to the route passed in', (done) => {

			var funk = (req, res) => { res.end(''); };
			router.post('/',funk);
			assert.deepEqual(funk, router.routes.POST['/']);
			done();

		});

	});

	describe('#put', () => {

		it('should attach a function to the route passed in', (done) => {

			var funk = (req, res) => { res.end(''); };
			router.put('/',funk);
			assert.deepEqual(funk, router.routes.PUT['/']);
			done();

		});

	});

	describe('#delete', () => {

		it('should attach a function to the route passed in', (done) => {

			var funk = (req, res) => { res.end(''); };
			router.delete('/',funk);
			assert.deepEqual(funk, router.routes.DELETE['/']);
			done();

		});

	});

	describe('#patch', () => {

		it('should attach a function to the route passed in', (done) => {

			var funk = (req, res) => { res.end(''); };
			router.patch('/',funk);
			assert.deepEqual(funk, router.routes.PATCH['/']);
			done();

		});

	});

});