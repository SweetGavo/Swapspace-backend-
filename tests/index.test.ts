import request from "supertest";
import app from "../src/server";

describe("Test /agent route", () => {
  it("GET: /agents should return 200 response", async () => {
    let res = await request(app).get("/api/v1/agent/test");
    expect(res.statusCode).toBe(200);
  });
});
