// import sinon from 'sinon'
import { EventEmitter } from 'events'
import sinon from 'sinon'

import { MockWebContents } from './web-contents'

export class MockMenu {
  constructor () {
    this.setApplicationMenu = sinon.stub()
    this.buildFromTemplate = sinon.stub()
    this.popup = sinon.stub()
    this.closePopup = sinon.stub()
    this.items = []
  }

  append (mockMenuItem) {
    this.items.push(mockMenuItem)
  }
  insert (position, mockMenuItem) {
    this.items = this.items.splice(position, 0, mockMenuItem)
  }
}

export class MockMenuItem {
  constructor (options) {
    this.enabled = !!options.enabled
    this.label = options.label
    this.click = options.click
    this.visible = !!options.visible
  }
}

class Screen extends EventEmitter {
  constructor () {
    super()
    this.getDisplayMatching = sinon.stub()
  }
}

class BrowserWindow extends EventEmitter {
  constructor () {
    super()

    this.getBounds = sinon.stub()
    this.getPosition = sinon.stub()
    this.getSize = sinon.stub()
    this.isVisible = sinon.stub().returns(true)
    this.setPosition = sinon.stub()
    this.loadURL = sinon.stub()

    this.webContents = new MockWebContents()
  }
}

class CommandLine {
  constructor () {
    this.appendSwitch = sinon.stub()
  }
}

class App extends EventEmitter {
  constructor () {
    super()

    this.getName = sinon.stub()
    this.getPath = sinon.stub()
    this.commandLine = new CommandLine()
  }
}

const mainWindowStub = CreateWindowStub()
const focusedWindowStub = CreateWindowStub()

BrowserWindow.fromId = sinon.stub().returns(mainWindowStub)
BrowserWindow.getAllWindows = sinon.stub().returns([])
BrowserWindow.getBounds = sinon.stub()
BrowserWindow.getFocusedWindow = sinon.stub().returns(focusedWindowStub)
BrowserWindow.getDevToolsExtensions = sinon.stub()

function CreateWindowStub () {
  return {
    id: 0,
    setMenuBarVisibility: sinon.stub(),
    setAutoHideMenuBar: sinon.stub(),
    setTitle: sinon.stub(),
    reload: sinon.stub()
  }
}

export const electronMock = {
  require: sinon.stub(),
  match: sinon.stub(),
  app: new App(),
  Menu: new MockMenu(),
  MenuItem: MockMenuItem,
  remote: {
    getCurrentWindow: sinon.stub(),
    require: sinon.stub(),
    Menu: MockMenu,
    MenuItem: MockMenuItem,
    app: new App()
  },
  ipcRenderer: {
    send: sinon.stub()
  },
  ipcMain: {
    on: sinon.stub()
  },
  dialog: {
    showMessageBox: sinon.stub()
  },
  screen: new Screen(),
  BrowserWindow
}

export const electronMainMock = Object.assign({}, electronMock, { remote: null })
