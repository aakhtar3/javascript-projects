`use strict`;

const { DataTypes } = require(`sequelize`);

// https://sequelize.org/docs/v6/core-concepts/model-basics/#using-sequelizedefine
const schemas = (sequelize) => ({
  Ips: sequelize.define(`ips`, {
    ipAddress: {
      type: DataTypes.STRING
    },
    excluded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
});

module.exports = schemas;