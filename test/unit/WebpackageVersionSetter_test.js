/* globals describe, beforeEach, it, expect, after */
(function () {
  'use strict';
  describe('WebpackageVersionSetter', function () {
    var WebpackageVersionSetter;
    var wpVersionSetter;
    var fs;
    var sampleWpPath;
    var sampleManifestPath;
    var path;
    var newVersion = '0.1.0';
    beforeEach(function () {
      fs = require('fs-extra');
      path = require('path');

      sampleWpPath = path.resolve(__dirname, '../resources/sample-wp');
      sampleManifestPath = path.join(sampleWpPath, 'manifest.webpackage');

      WebpackageVersionSetter = require('../../lib/cubx-set-webpackage-version');
      wpVersionSetter = new WebpackageVersionSetter(sampleWpPath, newVersion);
    });
    describe('#_isValidVersion', function () {
      it('should return true for a valid 3 digits version', function () {
        expect(wpVersionSetter._isValidVersion('1.0.0')).to.be.true;
      });
      it('should return true for a valid 1 digit version', function () {
        expect(wpVersionSetter._isValidVersion('1')).to.be.true;
      });
      it('should return true for a valid 3 digits version', function () {
        expect(wpVersionSetter._isValidVersion('1.0.0-SNAPSHOT')).to.be.true;
      });
      it('should return true for a valid 1 digit version', function () {
        expect(wpVersionSetter._isValidVersion('1-SNAPSHOT')).to.be.true;
      });
      it('should return false for a release version version', function () {
        expect(wpVersionSetter._isValidVersion('a.2.3')).to.be.false;
      });
      it('should return false for a release version version', function () {
        expect(wpVersionSetter._isValidVersion('1.2.3-S')).to.be.false;
      });
      it('should return false for a release version version', function () {
        expect(wpVersionSetter._isValidVersion('1.2.3-snapshot')).to.be.false;
      });
      it('should return false for a release version version', function () {
        expect(wpVersionSetter._isValidVersion('1.2.3.SNAPSHOT')).to.be.false;
      });
    });
    describe('#_loadManifest', function () {
      var expectedManifest;
      it('should load the manifest properly', function () {
        expectedManifest = JSON.parse(fs.readFileSync(path.join(sampleWpPath, 'manifest.webpackage'), 'utf8'));
        expect(wpVersionSetter._loadManifest()).to.deep.equal(expectedManifest);
      });
      it('should throw Error since webpackagePath is wrong and no manifest is found', function () {
        expect(function () {
          wpVersionSetter = new WebpackageVersionSetter('/wrong/wrong', '1.0');
          wpVersionSetter._loadManifest();
        }).to.throw(/Webpackage manifest not found/);
      });
    });
    describe('#setManifestVersion', function () {
      it('it should detect invalid release version and throw error', function () {
        expect(function () {
          wpVersionSetter.version = '1.2-snapshot';
          wpVersionSetter.setManifestVersion();
        }).to.throw(/Invalid version/);
      });
      describe('Prepare upload works properly', function () {
        var manifest;
        beforeEach(function () {
          manifest = JSON.parse(fs.readFileSync(sampleManifestPath, 'utf8'));
        });
        after(function () {
          manifest.version = newVersion + '-SNAPSHOT';
          fs.writeFileSync(sampleManifestPath, JSON.stringify(manifest, null, 2), 'utf8');
        });
        it('it should prepare the upload correctly', function () {
          wpVersionSetter.setManifestVersion();
          var newManifest = JSON.parse(fs.readFileSync(sampleManifestPath, 'utf8'));
          expect(newManifest.version).to.equal(newVersion);
        });
      });
    });
  });
})();
