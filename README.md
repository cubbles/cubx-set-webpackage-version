# cubx-set-webpackage-version

[![Build Status](https://travis-ci.org/cubbles/cubx-set-webpackage-version.svg?branch=master)](https://travis-ci.org/cubbles/cubx-set-webpackage-version)

Module for setting the version of a webpackage.

Usage: 
* command line: 


    cubx-set-webpackage-version -p <webpackagPath> -v <version>

*  other npm modules


    var webpackagePath = ...
    var version = ...
    var WebpackageVersionSetter = requiere('cubx-set-webpackage-version');
    var wpVersionSetter = new WebpackageVersionSetter(webpackagePath, version);
    wpVersionSetter.setManifestVersion();
 
