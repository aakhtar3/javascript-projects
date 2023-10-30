`use strict`;

const parseHtml = require(`./html`);

const parseKey = new Set([
  `IP address`,
  `IP`
]);

const parseData = (data, ipKey) => {
  if (!parseKey.has(ipKey)) return [];

  return parseHtml(data, ipKey);
};

module.exports = parseData;