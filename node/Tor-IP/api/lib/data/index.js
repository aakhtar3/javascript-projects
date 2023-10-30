`use strict`;

const Sequelize = require(`sequelize`);
const config = require(`./config`);
const schema = require(`./schema.js`);

const sequelize = new Sequelize(config.name, config.user, config.password, config);
const schemas = schema(sequelize);

module.exports = {
  sequelize,
  schemas
};