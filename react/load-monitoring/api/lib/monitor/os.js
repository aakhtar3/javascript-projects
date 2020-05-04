`use strict`;

const os = require(`os`),
  NUM_OF_CUPS = os.cpus().length;

/**
  * The os.loadavg() method returns an array containing the 1, 5, and 15 minute load averages.
  * @returns {Array}
  */
const computeAverage = () => os.loadavg();

module.exports = {
  computeAverage,
  NUM_OF_CUPS
};