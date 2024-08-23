const http = require("http");
const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cors());

const middlewareContentType = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    return res.status(422).json({
      message: "this route only accept content-type : application/json",
    });
  }
  return next();
};

// routes
// const swaggerRoutes = require("./src/routes/swagger.routes");
const memberRoutes = require("./src/routes/member.routes");
const bookRoutes = require("./src/routes/book.routes");
// app.use("/v1", swaggerRoutes);
app.use("/v1", middlewareContentType, memberRoutes);
app.use("/v1", middlewareContentType, bookRoutes);

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
        name: "Yusril Bagas Panji Pamukti",
        url: "",
        email: "yusrilbagas135@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/v1",
      },
    ],
  },
  apis: ["./src/routes/*.routes.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.APP_PORT || 3001;
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  console.log(`server running on ${port}`);
});
httpServer.timeout = 30000;
