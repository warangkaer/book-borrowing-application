const { expect } = require("chai");
const request = require("supertest");
const express = require("express");
const router = require("../routes/member.routes");

describe("Rest API for member management", () => {
  const app = express();
  app.use("/v1", router);

  it("should return code 200", async () => {
    const response = await request(app)
      .get("/v1/members")
      .set("content-type", "application/json");

    expect(response.status).to.equal(200);
  });

  it("should return data property", async () => {
    const response = await request(app)
      .get("/v1/members")
      .set("content-type", "application/json");
    expect(response.body).to.have.property("data");
  });

  it("should return updated data", () => {
    const data = { member_code: "c-103", book_code: "c-116" };
    request(app)
      .put("/v1/members/book")
      .set("content-type", "application/json")
      .send(data)
      .then((response) => {
        console.log(response);

        response.body.should.have.property("data");
        done();
      })
      .catch((err) => done(err));
  });

  it("should return inserted data", () => {
    const data = { member_code: "c-103", book_code: "c-116" };
    request(app)
      .post("/v1/members/book")
      .set("content-type", "application/json")
      .send(data)
      .then((response) => {
        response.body.should.have.property("data");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should return code 422", () => {
    const data = { member_code: "c-103", book_code: "c-119" };
    request(app)
      .post("/v1/members/book")
      .set("content-type", "application/json")
      .send(data)
      .then((response) => {
        expect(response.status).to.equal(422);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
