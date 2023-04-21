import app from "./server";
import dotenv from "dotenv";
dotenv.config();
import config from "./config";
process.on("unhandledRejection", (e) => {
  console.log(e);
});

process.on("uncaughtException", (e) => {
  console.log(e);
});

app.listen(config.port, () => {
  return console.log(`Server Running On Port ${config.port}`);
});

export default app;
