`use strict`;

const monitorService = require(`./service`);

/**
 * Gets the average load metric.
 * @param {Object} req 
 * @param {Object} res
 * @returns {Object}
 */
const getLoadAverage = (req, res) => {
  const averageLoad = monitorService.getLoadAverage();
  return res.send(averageLoad);
};

module.exports = {
  getLoadAverage
};
