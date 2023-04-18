import merge from "lodash.merge";
//making sure NODE_ENV is set, defult is "developement"
process.env.NODE_ENV = process.env.NODE_ENV || "developement";
//set stage
const stage = process.env.STAGE || "local";
let envConfig;
//dynamically require each config depending on the stage we are in
if (stage === "production") {
  //set config to production
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

//export along with marge

export default merge(
  {
    //default setting of app in dev
    stage,
    env: process.env.NODE_ENV,
    BASE_PATH: process.env.BASE_PATH,
    port: 3000,
    secrete: {
      JWT: process.env.JWT_SECRETE,
      dbURL: process.env.DATABASE_URL,
    },
  },
  envConfig
);
