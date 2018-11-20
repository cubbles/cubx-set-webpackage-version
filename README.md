# cubx-set-webpackage-version

[![Build Status](https://travis-ci.org/cubbles/cubx-set-webpackage-version.svg?branch=master)](https://travis-ci.org/cubbles/cubx-set-webpackage-version)

Module for setting the version of a webpackage.

Usage: 
* command line: 

```bash
cubx-set-webpackage-version -p <webpackagePath> -V <webpackageVersion>
```

*  other npm modules

```javascript
    var webpackagePath = ...
    var webpackageVersion = ...
    var WebpackageVersionSetter = require('cubx-set-webpackage-version');
    var wpVersionSetter = new WebpackageVersionSetter(webpackagePath, webpackageVersion);
    wpVersionSetter.setManifestVersion();
```
