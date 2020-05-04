`use strict`;

const moment = require(`moment-timezone`)
  .tz.setDefault(`America/New_York`);

/**
 * Gets the current time.
 * @returns {String}
 */
const getTime = () => moment().valueOf();

module.exports = {
  getTime
};
