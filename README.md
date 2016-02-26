Vorka
===

An experimental web framework for Node.js

[![npm version](https://badge.fury.io/js/vorka.svg)](http://badge.fury.io/js/vorka)
[![Build Status](https://travis-ci.org/anephenix/vorka.svg?branch=master)](https://travis-ci.org/anephenix/vorka)
[![Code Climate](https://codeclimate.com/github/anephenix/vorka/badges/gpa.svg)](https://codeclimate.com/github/anephenix/vorka)
[![Dependency Status](https://david-dm.org/anephenix/vorka.svg)](https://david-dm.org/anephenix/vorka)
[![devDependency Status](https://david-dm.org/anephenix/vorka/dev-status.svg)](https://david-dm.org/anephenix/vorka#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/anephenix/vorka/badge.svg?branch=master&service=github)](https://coveralls.io/github/anephenix/vorka?branch=master)
[![Codacy Badge](https://www.codacy.com/project/badge/db641ecf28b2425a8252d949a9b41490)](https://www.codacy.com/app/paulbjensen/vorka)

Installation
---

    npm install vorka

Why Vorka?
---

Vorka was a fresh look at how HTTP works in Node.js, and an attempt at building a small DSL around it to support simple sites. I noticed in rudimentary benchmarking tests that a Node.js HTTP server's bootup time compared to Connect/ExpressJS was significantly faster (57ms vs 120ms on a 2010 MacBook Air 11"). I explored this concept a bit more, and came up with a project, which is named after the song "Vorka" by the Hidden Orchestra.

It's essentially a sandbox for experimentation.

Usage
---

Here is a simple example of returning some inline HTML with a 200 status when making a GET request to /

	const app = require('vorka');

	app.get('/', (req, res) => {
		res.html(200, '<html><head><title>Sample HTML</title></head><body><h1>Hello</h1></body></html>');
	});

	app.listen(3000);

Vorka supplies a simple HTTP server that is extended with some helper functions:

DSL helper functions
---

#### HTTP method helper functions

Similar to Sinatra in Ruby or Express in Node, we provide a simple DSL for adding routes and functions based on their HTTP method. Below is an example for a GET request for an app.css file at /app.css

    e.g.

    app.get('/app.css', (req, res) => {
    	res.css(200, 'body { background: red; }');
    });

The same pattern exists for the following HTTP methods:

	- POST 		(app.post)
	- PUT 		(app.put)
	- PATCH		(app.patch)
	- DELETE 	(app.delete)
	- HEAD 		(app.head)

#### Response helper functions

There are also HTTP response helper functions that populate the HTTP headers for common formats:

	- HTML
	- CSS
	- JavaScript
	- plain text

e.g.

	app.get('/app.js', (req, res) => {
		res.js(200, 'alert("hi");');
	});


Contributing to Vorka
---

We welcome contributions to Vorka. Here are some useful tips:

- We use JSHint to help keep the code formatting consistent
- We write and run tests using Mocha
- We currently benchmark manually, but will be bringing in a benchmarking suite soon

Licence and rights
---

&copy; 2016 Anephenix Ltd. Vorka is licenced under the MIT license. - See LICENSE for details.
