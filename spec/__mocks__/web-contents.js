import sinon from 'sinon'
import { EventEmitter } from 'events'

export class MockWebContents extends EventEmitter {
  constructor () {
    super()

    this.reloadIgnoringCache = sinon.stub()
  }
}
