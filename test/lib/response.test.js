'use strict';


// Dependencies
//
var assert 		= require('assert');
var response	= require('../../lib/response');


describe('response()', function () {



	var res;

	beforeEach(function (done) {

		res = {
			writeHead:  function (statusCode, headers) {
				this.statusCode = statusCode;
				this.headers = headers;
			},
			end: function (content) {
				this.content = content;
			}
		};
		response(res);
		done();

	});



	describe('.json', function () {

		it('should return JSON content with the appropriate headers', function (done) {

			res.json(200, {name: 'Paul Jensen'});
			assert.equal(200, res.statusCode);
			assert.deepEqual({'Content-Type': 'application/json', 'Content-Length': 22}, res.headers);
			assert.deepEqual(JSON.stringify({name: 'Paul Jensen'}), res.content);
			done();

		});

		it('should handle passing stringified JSON data straight away', function (done) {

			res.json(200, '{"name":"Paul Jensen"}');
			assert.equal(200, res.statusCode);
			assert.deepEqual({'Content-Type': 'application/json', 'Content-Length': 22}, res.headers);
			assert.deepEqual(JSON.stringify({name: 'Paul Jensen'}), res.content);
			done();

		});

	});



	describe('.html', function () {

		it('should return html content with the appropriate headers', function (done) {

			var htmlContent = '<html><head><title>Hello world</title></head><body><h1>Hello everyone!</h1></body></html>';
			res.html(200, htmlContent);
			assert.equal(200, res.statusCode);
			assert.deepEqual({'Content-Type': 'text/html', 'Content-Length': 89}, res.headers);
			assert.deepEqual(htmlContent, res.content);
			done();

		});

	});



	describe('.text', function () {

		it('should return a plaintext response with the appropriate headers', function (done) {

			var textContent = 'Not found';
			res.text(404, textContent);
			assert.equal(404, res.statusCode);
			assert.deepEqual({'Content-Type': 'text/plain', 'Content-Length': 9}, res.headers);
			assert.deepEqual(textContent, res.content);
			done();

		});

	});



	describe('.css', function () {

		it('should return CSS content with the appropriate headers', function (done) {

			var cssContent = 'body {background: red;}';
			res.css(200, cssContent);
			assert.equal(200, res.statusCode);
			assert.deepEqual({'Content-Type': 'text/css', 'Content-Length': 23}, res.headers);
			assert.deepEqual(cssContent, res.content);
			done();

		});

	});



	describe('.js', function () {

		it('should return JS content with the appropriate headers', function (done) {

			var jsContent = 'alert("hi");';
			res.js(200, jsContent);
			assert.equal(200, res.statusCode);
			assert.deepEqual({'Content-Type': 'application/javascript', 'Content-Length': 12}, res.headers);
			assert.deepEqual(jsContent, res.content);
			done();

		});

	});



});