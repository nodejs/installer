import test from 'ava'

require('../setup').setup(test)

test('it starts with an empty window', (t) => {
  const { App } = require('../../src/main/main')
  const installer = new App()

  t.is(installer.mainWindow, null)
})

test('it creates a window once onReady is emitted', (t) => {
  const { app, BrowserWindow } = require('electron')
  const { App } = require('../../src/main/main')
  const installer = new App()

  BrowserWindow.getDevToolsExtensions.returns({ devtron: {} })
  app.emit('ready')

  t.is(installer.mainWindow, null)
})
