`use strict`;

const config = {
  host: process.env.DB_HOST || `mydb`,
  user: process.env.DB_USER || `root`,
  password: process.env.DB_PASSWORD || `123456`,
  name: process.env.DB_NAME || `ip_db`,
  port: process.env.DB_PORT || `3306`,
  dialect: process.env.DB_DIALECT || `sqlite`,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = config;
