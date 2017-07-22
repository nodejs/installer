import mockery from 'mockery'

import { logMock } from './__mocks__/electron-log'
import { electronMock } from './__mocks__/electron'
import { windowStateMock } from './__mocks__/electron-window-state'

export function setup (test) {
  test.before((t) => {
    mockery.enable()
    mockery.warnOnUnregistered(false)
  })

  test.beforeEach(() => {
    mockery.resetCache()

    mockery.registerMock('electron-window-state', windowStateMock)
    mockery.registerMock('electron', electronMock)
    mockery.registerMock('electron-log', logMock)
  })

  test.after((t) => {
    mockery.disable()
  })

  test.afterEach((t) => {
    mockery.deregisterAll()
  })
}
