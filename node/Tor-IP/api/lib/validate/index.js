`use strict`;

const { isIPv4 } = require(`net`);

const ingestUrls = new Map([
  [ `https://www.dan.me.uk/tornodes`, `IP` ],
  [ `https://udger.com/resources/ip-list/tor_exit_node`, `IP address` ]
]);

const parseTypes = new Set([
  `html`,
])

const isValidIPv4 = (ip) => isIPv4(ip);

const isValidExternalSource = (url, type, parseKey) =>
  (ingestUrls.has(url) && (parseTypes.has(type)) && (ingestUrls.get(url) === parseKey));

module.exports = {
  isValidIPv4,
  isValidExternalSource
};