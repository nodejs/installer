'use strict';

const request = require('request');
const semver = require('semver');
const osenv = require('osenv');
const path = require('path');
const once = require('once');
const fs = require('fs');
const sudo = require('electron-sudo');

const checkNode = require('./check-node');

module.exports = function install(version, update, cb) {
  // TODO: Support more than just Mac
  version = semver.valid(version);
  cb = once(cb);
  var u = `https://nodejs.org/dist/v${version}/node-v${version}.pkg`;
  var p = path.join(osenv.tmpdir(), `node-v${version}.pkg`);
  console.log(u, p);
  var file = fs.createWriteStream(p);
  request(u).on('error', cb).pipe(file).on('close', () => {
    var cwd = `installer -pkg ${p} -target /`;

    var sudoOpts = {
      name: 'Install Node',
      // icns: '/path/to/icns/file' // (optional, only for MacOS),
      process: {
        on: function(ps) {
          ps.stdout.pipe(process.stdout);
          ps.stderr.pipe(process.stderr);
        }
      }
    };
    update();
    sudo.exec(cwd, sudoOpts, (err) => {
      if (err) return cb(err);
      checkNode(cb);
    });
  });
};
