`use strict`;

const { readFileSync } = require(`fs`);
const parseHtml = require(`../../lib/parse/html`);

const parseFile = (path) => {
  try { return readFileSync(path, `utf8`); }
  catch (error) { console.error(error); throw error; }
};

describe(`When parsing HTML`, () => {
  describe(`When pasring udger.com`, () => {
    it(`Then it should reutrn an Array`, () => {
      // https://udger.com/resources/ip-list/tor_exit_node
      expect(parseHtml(parseFile(`./test/__MOCK__/parse/udger.html`), `IP address`).length).toEqual(10);
    });
  });

  describe(`When pasring dan.me`, () => {
    it(`Then it should reutrn an Array`, () => {
      // https://www.dan.me.uk/tornodes
      expect(parseHtml(parseFile(`./test/__MOCK__/parse/dan.html`), `IP`).length).toEqual(11738);
    });
  });
});
