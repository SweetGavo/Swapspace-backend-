const request = require("supertest");
const app = require("../src/index");

describe("Test /agent route", () => {
  it("GET: /agent should return 200 response", async () => {
    const res = await request(app).get("/api/v1/agent");
    expect(res.statusCode).toBe(200);
  });
});
