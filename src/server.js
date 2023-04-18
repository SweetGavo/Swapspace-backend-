const app = require("./index");
const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT || 5050, () =>
  console.log(`AH severes running on ${process.env.PORT || 5050}`)
);
