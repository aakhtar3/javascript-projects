`use strict`;

const router = require(`express`).Router(),
  monitorController = require(`./controller`);

/**
 * Gets the average load from the last minute.
 */
router.get(`/loadAverage`, monitorController.getLoadAverage);

module.exports = router;