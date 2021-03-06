'use strict';

let chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
let should = chai.should;
let walkSync = require('walk-sync');

chai.use(require('chai-fs'));

// path to your compiled templates file
let compiledTemplatesFile = './fixtures/templates.js';
let relativeCompiledTemplatesFile = '../fixtures/templates.js';
// path to all your uncompiled templates
let templatesPath = './fixtures/templates/';
// your path to ember
let emberPath = '../bower_components/ember/ember.min';


let files = walkSync(templatesPath, { directories: false });

let expectedTemplates = files.map( file => {
  return file.substring(0, file.indexOf('.'));
});

// expected files are optional, just provides additional testing
let expectedFiles = [
  'camelCase.hbs',
  'index-dash.hbs',
  'index.hbs',
  'nested/another.hbs',
  'components/my-component.hbs'
];

// optional spec for testing the walker
describe('walker helper', function() {
  it('should list all files', function() {
    expect(files).to.have.members(expectedFiles);
  });
});

// require ember
require(emberPath);
require(relativeCompiledTemplatesFile);

describe('templates task', function() {
  it('should generate a non empty file', function() {
    expect(compiledTemplatesFile).to.be.a.file().and.not.empty;
  });

  it('should generate all expected templates', function() {
    expectedTemplates.forEach( template => {
      expect(Ember.TEMPLATES).to.have.ownProperty(template);
    });
  });
});
