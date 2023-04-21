import request from "supertest";
import app from "../src/server";

describe("Test /agent route", () => {
  it("GET: /agents should return 200 response", () => {
    request(app)
      .get("/api/v1/agent/test")
      .then((res) => {
        expect(res.statusCode).toBe(200);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  return;
});
