const express = require("express");
const router = express.Router();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Code Test PT Eigen",
      version: "0.1.0",
      description: "This application only use for test",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "",
        url: "",
        email: "",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["*.routes.js"],
};

const specs = swaggerJsdoc(options);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
