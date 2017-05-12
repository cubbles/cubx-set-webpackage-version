'use strict';
var WebpackageVersionSetter = require('../lib/cubx-set-webpackage-version');
var commandLineArgs = require('command-line-args');

var optionDefinitions = [
  { name: 'webpackagePath', type: String, alias: 'p' },
  { name: 'version', type: String, alias: 'v' }
];

var options = commandLineArgs(optionDefinitions);

if (!options.webpackagePath) {
  console.error('Missed necessary parameter "webpackagePath". Usage: cubx-prepare-webpackage-release -p <webpackagPath> -v <version>');
  process.exit(0);
}
if (!options.version) {
  console.error('Missed necessary parameter "version". Usage: cubx-prepare-webpackage-release -p <webpackagPath> -v <version>');
  process.exit(0);
}
var setter = new WebpackageVersionSetter(options.webpackagePath, options.version);
setter.setManifestVersion();
