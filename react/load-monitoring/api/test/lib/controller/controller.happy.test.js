`use strict`;

const expect = require(`chai`).expect,
  sinon = require(`sinon`),
  monitorController = require(`../../../lib/monitor/controller`);

describe(`When calling the monitor controller - Happy`, () => {
  let mockReq,
    mockRes;

  beforeEach(() => {
    mockReq = {},
    mockRes = {
      send: sinon.stub().resolvesThis()
    };
  });

  describe(`When calling getLoadAverage()`, () => {
    it(`Then it should call the send function`, async() => {
      const repsonse = await monitorController.getLoadAverage(mockReq, mockRes);
      expect(repsonse.send.called).to.be.true;
    });
  });

});
