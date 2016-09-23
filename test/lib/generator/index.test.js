'use strict';

const assert = require('assert');
const fs = require('fs');
const generator = require('');
const path = require('path');

describe('generator', () => {

	let folderName = 'flight';
	let appFolderPath = path.join(process.cwd(), 'test','sandbox', folderName);

	beforeEach((done) => {
		fs.exists(appFolderPath, (exists) => {
			if (!exists) return done();
			fs.unlink(appFolderPath, done);
		});
	});
	// Remove any folders that we need to create during the process of testing

  it('should create an app skeleton for a developer', (done) => {
		fs.exists(appFolderPath, (exists) => {
			assert.equal(false, exists);
			generator.generate(appFolderPath, (err) => {
				assert.equal(null, err);
				fs.exists(appFolderPath, (nowExists) => {
					assert(nowExists);
					
				});
			});
			// Call the generator

		});
		// Assert that a folder with the expected name does not yet exist
		// Run app generator with a given name
		// Assert that a folder with the expected name exists
		// Assert that an app.js file exists
		// Assert that the file has the expected content
		// Assert that a package.json file exists
		// Assert that it too has the expected content
	});

  it('should allow the user to run the app with ease');

});
