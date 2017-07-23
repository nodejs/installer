import test from 'ava'

require('../setup').setup(test)

test('it returns a new browserWindow', (t) => {
  const { windowManager } = require('../../src/main/window-manager')
  const browserWindow = windowManager.createMainWindow()

  t.truthy(browserWindow)
})
