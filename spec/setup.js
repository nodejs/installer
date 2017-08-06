import mockery from 'mockery'

import { logMock } from './__mocks__/electron-log'
import { electronDevtoolsInstallerMock } from './__mocks__/electron-devtools-installer'
import { electronCompileMock } from './__mocks__/electron-compile'
import { electronMock } from './__mocks__/electron'
import { windowStateMock } from './__mocks__/electron-window-state'

export function setup (test) {
  test.before((t) => {
    mockery.enable({
      useCleanCache: true
    })
    mockery.warnOnUnregistered(false)
  })

  test.beforeEach(() => {
    mockery.resetCache()

    mockery.registerMock('electron-window-state', windowStateMock)
    mockery.registerMock('electron', electronMock)
    mockery.registerMock('electron-log', logMock)
    mockery.registerMock('electron-devtools-installer', electronDevtoolsInstallerMock)
    mockery.registerMock('electron-compile', electronCompileMock)
  })

  test.after((t) => {
    mockery.disable()
  })

  test.afterEach((t) => {
    mockery.deregisterAll()
  })
}
