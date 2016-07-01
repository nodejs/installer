'use strict';

const exec = require('child_process').exec;
const semver = require('semver');

module.exports = function(cb) {
  exec('node --version', (error, stdout, stderr) => {
    if (error) return cb(error);
    var output =  (stdout + stderr).replace(/(\r\n|\n|\r|\ )/gm, '');
    var sem = semver.valid(output);
    if (sem) return cb(null, sem);
    cb(null, new Error(output));
  });
};
