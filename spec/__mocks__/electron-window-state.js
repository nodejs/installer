import sinon from 'sinon'

export const windowStateMock = function () {
  return {
    x: 500,
    y: 500,
    width: 1000,
    height: 700,
    manage: sinon.stub()
  }
}
