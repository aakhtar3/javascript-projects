`use strict`;

const express = require(`express`),
  cors = require(`cors`),
  router = express.Router(),
  routes = [
    require(`./monitor/router`)
  ];

// Init express.
const app = express();

// Enable cors.
app.use(cors({
  origin: true
}));

// Load all routes.
routes.forEach(route => router.use(route));

// Load router.
app.use(`/`, router);

module.exports = app;
