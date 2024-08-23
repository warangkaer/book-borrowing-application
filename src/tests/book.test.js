const { expect } = require("chai");
const request = require("supertest");
const express = require("express");
const router = require("../routes/book.routes");

describe("Rest API for books management", () => {
  const app = express();
  app.use("/v1", router);

  it("have to return code 200", async () => {
    const response = await request(app)
      .get("/v1/books")
      .set("content-type", "application/json");
    expect(response.status).to.equal(200);
  });

  it("have to return data property", async () => {
    const response = await request(app)
      .get("/v1/books")
      .set("content-type", "application/json");
    expect(response.body).to.have.property("data");
  });

  it("for fresh app it have to return 5 data", async () => {
    const response = await request(app)
      .get("/v1/books")
      .set("content-type", "application/json");
    expect(Object.keys(response.body.data).length).to.equal(5);
  });
});
