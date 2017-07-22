import test from 'ava'
import mockery from 'mockery'

require('../setup').setup(test)

test('it returns false if the executable is not electron', (t) => {
  const { isDevMode } = require('../../src/utils/is-dev-mode')
  t.is(isDevMode(), false)
})

test('it returns true if it is electron', (t) => {
  mockery.resetCache()
  const oldExecPath = process.execPath

  process.execPath = '/hello/electron'

  const { isDevMode } = require('../../src/utils/is-dev-mode')
  t.is(isDevMode(), true)

  process.execPath = oldExecPath
})
