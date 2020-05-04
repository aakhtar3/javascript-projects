`use strict`;

const expect = require(`chai`).expect,
  monitorService = require(`../../../lib/monitor/service`);

describe(`When calling the monitor service - Happy`, () => {
  
  describe(`When calling getLoadAverage()`, () => {
    it(`Then it should return a number`, () => {
      const response = monitorService.getLoadAverage();
      expect(response.averageLoad).to.be.an(`number`);
    });
  });

});
