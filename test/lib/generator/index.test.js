'use strict';

const assert = require('assert');
const fs = require('fs');
const generator = require('../../../lib/generator');
const path = require('path');

describe('generator', () => {

	const folderName = 'flight';
	const appFolderLocation = path.join(process.cwd(), 'test','sandbox');
	const appFolderPath = path.join(appFolderLocation, folderName);

	beforeEach((done) => {
		fs.exists(appFolderPath, (exists) => {
			if (!exists) return done();
			fs.rmdir(appFolderPath, done);
		});
	});

  it('should create an app skeleton for a developer', (done) => {
		fs.exists(appFolderPath, (exists) => {
			assert.equal(false, exists);
			generator.generate(folderName, appFolderLocation, (err) => {
				assert.equal(null, err);
				fs.exists(appFolderPath, (nowExists) => {
					assert(nowExists);
					done();
				});
			});
		});
		// Assert that an app.js file exists
		// Assert that the file has the expected content
		// Assert that a package.json file exists
		// Assert that it too has the expected content
	});

  it('should allow the user to run the app with ease');

});
