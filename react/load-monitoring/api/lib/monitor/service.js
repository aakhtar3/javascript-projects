`use strict`;

const os = require(`./os`),
  time = require(`./time`);

/**
 * Get the average load.
 * @param {Number} index
 * @returns {Number}
 */
const getLoad = (index) => os.computeAverage()[index];

/**
 * Gets the average load on a mutlicore system.
 * @returns {Number}
 */
const getAverage = () => getLoad(0) / os.NUM_OF_CUPS;

/**
 * Gets the average load on CPUs in the past minute.
 * @returns {Object}
 */
const getLoadAverage = () => ({
  averageLoad: getAverage(),
  timeStamp: time.getTime()
});

module.exports = {
  getLoadAverage
};
