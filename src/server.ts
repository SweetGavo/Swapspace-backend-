import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import config from "./config";
const app = express();

// middlewares::::::::::
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); //help urlencoded data to be readable object
// middlewares::::::::::

//import routes:::::::::
import Agent from "./router";
//end of import routes:::::::

app.use(`${config.BASE_PATH}/agent`, Agent);

export default app;
