import dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";

process.on("unhandledRejection", (e) => {
  console.log(e);
});

process.on("uncaughtException", (e) => {
  console.log(e);
});

app.listen(config.port, () => {
  console.log(`Server Running On Port ${config.port}`);
});
