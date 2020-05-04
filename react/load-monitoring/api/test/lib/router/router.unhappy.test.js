`use strict`;

const expect = require(`chai`).expect,
  express = require(`supertest`),
  server = require(`../../../lib/server`);

describe(`When calling the router - Un Happy`, () => {
  
  describe(`When calling /`, () => {
    it(`Then it should return 404`, done => {
      express(server)
        .get(`/`)
        .expect(response => {
          expect(response.status).to.equal(404);
          expect(response.type).to.equal(`text/html`);
        })
        .end(done);
    });
  });

});

