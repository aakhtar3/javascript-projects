/* Refactored Server */

const express = require('express');
const server = express();
const router = express.Router();
const routes = [
    require('./dataApi/routes')
];

routes.forEach(route => router.use(route));

server
    .use(express.text())
    .use(express.json())
    .use('/', router);

module.exports = server;
