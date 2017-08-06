import sinon from 'sinon'

const installStub = sinon.stub()
installStub.returns(Promise.resolve())

export const electronDevtoolsInstallerMock = {
  __esModule: true,
  default: installStub,
  REACT_DEVELOPER_TOOLS: 'react'
}
