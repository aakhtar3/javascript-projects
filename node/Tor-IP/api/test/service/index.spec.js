`use strict`;

const request = require(`supertest`);
const server = require(`../../lib/server`);

describe(`When requesting with sucessful responses`, () => {
  describe(`When calling PUT /tor/ip/exlcude`, () => {
    it(`Then it should reutrn 200`, async () => {
      await request(server)
        .put(`/tor/ip/ingest`)
        .send({
          "url": `https://udger.com/resources/ip-list/tor_exit_node`,
          "type": `html`,
          "ipKey": `IP address`
        })
        .set(`Accept`, `application/json`)
        .expect(`Content-Type`, /text/)
        .expect(200);
    });
  });

  describe.skip(`When calling POST /tor/ip/exlcude`, () => {
    it(`Then it should reutrn 200`, async () => {
      await request(server)
        .post(`/tor/ip/exlcude`)
        .send({ "ipAddress": `1.1.1.1` })
        .set(`Accept`, `application/json`)
        .expect(`Content-Type`, /text/)
        .expect(200);
    });
  });

  describe(`When calling /tor/ip`, () => {
    it(`Then it should return 200`, async () => {
      const response = await request(server)
        .get(`/tor/ip`)
        .expect(`Content-Type`, /json/)
        .expect(200);
  
      expect(response.body).toBeDefined();
    });
  });
});

describe(`When requesting with un-sucessful responses`, () => {
  describe(`When calling /tor/ip/exclude`, () => {
    it(`Then it should return a list of Ips`, async () => {
      await request(server)
        .post(`/tor/ip/exclude`)
        .expect(`Content-Type`, /text/)
        .expect(400);
    });
  });

  describe(`When calling /tor/ip/ingest`, () => {
    it(`Then it should return a list of Ips`, async () => {
      await request(server)
        .put(`/tor/ip/ingest`)
        .expect(`Content-Type`, /text/)
        .expect(400);
    });
  });
});