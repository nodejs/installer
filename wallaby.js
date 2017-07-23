// This file configures Wallaby, a test runner
// It's a plugin for editors - if you don't use Wallaby,
// you can ignore this file

module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      'spec/__mocks__/*.js',
      'spec/setup.js'
    ],

    tests: [
      'spec/main/*-spec.js',
      'spec/utils/*-spec.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    testFramework: 'ava',

    debug: true
  }
}
