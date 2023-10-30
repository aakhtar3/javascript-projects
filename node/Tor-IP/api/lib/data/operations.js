`use strict`;

const { schemas } = require(`./index.js`);
const { Ips }  = schemas;

/* https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findall */
const findAll = async (condition) =>
  Ips.findAll({ attributes: [`ipAddress`], where: condition });

/* https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findone */
const findOne = async (condition) =>
  Ips.findOne({ where: condition });

/* https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries */
const update = async (condition) =>
  Ips.update({ excluded: true }, { where: condition });

/* https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findorcreate */
const findOrCreate = async (condition) =>
  Ips.findOrCreate({ where: condition });

module.exports = {
  findAll,
  findOne,
  update,
  findOrCreate
};