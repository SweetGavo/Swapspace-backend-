import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import config from "./config";
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); //help urlencoded data to be readable object

// middlewares

import agent from "./router";

// end of import routes
app.use(`${config.BASE_PATH}/agent`, agent);

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.log(err);
  res.status(500).json({ code: 500, error: err.message });
});

export default app;
