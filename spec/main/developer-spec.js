import test from 'ava'
import mockery from 'mockery'
import sinon from 'sinon'

import { electronMainMock } from '../../spec/__mocks__/electron'

require('../setup').setup(test)

test('it installs devtron if not installed', (t) => {
  mockery.registerMock('electron', electronMainMock)
  mockery.registerMock('devtron', { install: sinon.spy() })

  const { BrowserWindow } = require('electron')
  BrowserWindow.getDevToolsExtensions.returns({})

  const { DeveloperFeatures } = require('../../src/main/developer')

  //eslint-disable-next-line
  const developerFeatures = new DeveloperFeatures()

  const devtron = require('devtron')
  t.is(devtron.install.callCount, 1)
})

test('does not it installs devtron if already installed', (t) => {
  mockery.registerMock('electron', electronMainMock)
  mockery.registerMock('devtron', { install: sinon.spy() })

  const { BrowserWindow } = require('electron')
  BrowserWindow.getDevToolsExtensions.returns({ devtron: {} })

  const { DeveloperFeatures } = require('../../src/main/developer')

  //eslint-disable-next-line
  new DeveloperFeatures()

  const devtron = require('devtron')
  t.is(devtron.install.callCount, 0)
})

test('it enables react HMR', (t) => {
  mockery.registerMock('electron', electronMainMock)
  mockery.registerMock('devtron', { install: sinon.spy() })
  mockery.registerMock('electron-compile', { enableLiveReload: sinon.spy() })

  const { DeveloperFeatures } = require('../../src/main/developer')
  //eslint-disable-next-line
  new DeveloperFeatures()

  const electronCompile = require('electron-compile')

  t.is(electronCompile.enableLiveReload.callCount, 1)
  t.is(electronCompile.enableLiveReload.firstCall.args[0].strategy, 'react-hmr')
})

test('it attempts to install react dev tools', (t) => {
  mockery.registerMock('electron', electronMainMock)
  mockery.registerMock('devtron', { install: sinon.spy() })
  mockery.registerMock('electron-devtools-installer', { __esModule: true, default: sinon.stub(), REACT_DEVELOPER_TOOLS: 'react-tools' })

  const electronDevtoolsInstaller = require('electron-devtools-installer')
  electronDevtoolsInstaller.default.returns(Promise.resolve())

  const { DeveloperFeatures } = require('../../src/main/developer')
  //eslint-disable-next-line
  new DeveloperFeatures()

  t.is(electronDevtoolsInstaller.default.callCount, 1)
  t.is(electronDevtoolsInstaller.default.firstCall.args[0], 'react-tools')
})
