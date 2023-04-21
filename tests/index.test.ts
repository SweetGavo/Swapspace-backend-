import request from "supertest";
import app from "../src/server";

describe("Test /agent route", () => {
  it("GET: /agents should return 200 response", () => {
    request(app).get("/api/v1/agent/test", (data) => {
      expect(data.statusCode).toBe(200);
    });
  });
});
