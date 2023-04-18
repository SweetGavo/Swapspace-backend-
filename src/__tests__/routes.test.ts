import app from "../server";
import supertest from "supertest";

//index test

describe("get to index", () => {
  it("should send data", async () => {
    const res = await supertest(app).get('/')
    expect(res.body.message).toBe('hello')
  });
});
