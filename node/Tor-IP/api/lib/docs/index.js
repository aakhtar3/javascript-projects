`use strict`;

const router = require(`express`).Router();
const swaggerJSDoc = require(`swagger-jsdoc`);
const swaggerUi = require(`swagger-ui-express`);

const options = {
  swaggerDefinition: {
    openapi: `3.0.0`,
    info: {
      title: `Tor Ips`,
      version: `1.0.0`,
      description: `Tor IPs API`,
    },
  },
  apis: [`./lib/service/index.js`]
};
const spec = swaggerJSDoc(options);

router.use(`/docs`, swaggerUi.serve, swaggerUi.setup(spec));

module.exports = router;