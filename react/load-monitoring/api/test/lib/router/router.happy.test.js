`use strict`;

const expect = require(`chai`).expect,
  express = require(`supertest`),
  server = require(`../../../lib/server`);

describe(`When calling the router - Happy`, () => {
  
  describe(`When calling /loadAverage`, () => {
    it(`Then it should return the load average`, done => {
      express(server)
        .get(`/loadAverage`)
        .expect(response => {
          expect(response.status).to.equal(200);
          expect(response.type).to.equal(`application/json`);
          expect(response.body.averageLoad).to.be.an(`number`);
        })
        .end(done);
    });
  });

});
