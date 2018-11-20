#! /usr/bin/env node
'use strict';
var WebpackageVersionSetter = require('../lib/cubx-set-webpackage-version');
var commandLineArgs = require('command-line-args');

var optionDefinitions = [
  { name: 'webpackagePath', type: String, alias: 'p' },
  { name: 'webpackageVersion', type: String, alias: 'V' }
];

var options = commandLineArgs(optionDefinitions);

if (!options.webpackagePath) {
  console.error('Missed necessary parameter "webpackagePath". Usage: cubx-prepare-webpackage-release -p <webpackagPath> -V <webpackageVersion>');
  process.exit(0);
}
if (!options.webpackageVersion) {
  console.error('Missed necessary parameter "webpackageVersion". Usage: cubx-prepare-webpackage-release -p <webpackagPath> -V <webpackageVersion>');
  process.exit(0);
}
var setter = new WebpackageVersionSetter(options.webpackagePath, options.webpackageVersion);
setter.setManifestVersion();
