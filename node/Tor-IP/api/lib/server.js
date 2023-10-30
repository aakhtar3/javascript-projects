`use strict`;

require(`dotenv`).config();

const express = require(`express`);
const router = express.Router();
const { sequelize } = require(`./data`);

sequelize.sync();

const routes = [
  require(`./service`),
  require(`./docs`)
];

routes.forEach((route) => router.use(route));

const server = express()
  .disable(`x-powered-by`)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(`/`, router);

module.exports = server;