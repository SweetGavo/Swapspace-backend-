import * as user from "../agent";
//index test

describe("userHandler", () => {
  it("should create a new user", async () => {
    const req = { body: { username: "joeboyw", password: "1234we" } }; //mocking the data to test imitating request object from the user handler function
    //spie is a function that check when others interact with it
    const next = (error: any) => {
      expect(error.code).toBe(400);
      expect(error.error).toBe("internal server error");
    };
    const res: any = {
      json(token: any) {
        expect(token).toBeTruthy();
        // console.log(token);
      },
      status(code: any) {
        expect(code).toBe(201);
      },
    };
    await user.createNewUser(req, res, next);
  });
});
