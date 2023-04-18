const request = require('supertest')
const app = require('../src/index')

describe("Test /users route", () => {

   it("GET: /users should return 200 response", async () => {
      const res = await request(app).get('/v1/users')
      expect(res.statusCode).toBe(200)
   })

   it("GET /users should return an object containing users aray", async () => {
      const res = await request(app).get('/v1/users')
      expect(res.body).toEqual(expect.objectContaining({
         users: []
      }))
   })
})