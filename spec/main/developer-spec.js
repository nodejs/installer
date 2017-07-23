import test from 'ava'
import mockery from 'mockery'
import sinon from 'sinon'

import { electronMock } from '../../spec/__mocks__/electron'

require('../setup').setup(test)

test('it installs devtron if not installed', (t) => {
  mockery.registerMock('electron', electronMock)
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
  mockery.registerMock('electron', electronMock)
  mockery.registerMock('devtron', { install: sinon.spy() })

  const { BrowserWindow } = require('electron')
  BrowserWindow.getDevToolsExtensions.returns({ devtron: {} })

  const { DeveloperFeatures } = require('../../src/main/developer')

  //eslint-disable-next-line
  const developerFeatures = new DeveloperFeatures()

  const devtron = require('devtron')
  t.is(devtron.install.callCount, 0)
})
