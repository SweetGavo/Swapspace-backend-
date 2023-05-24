import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
const app: Application = express();

import cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

import helmet from "helmet";



// import routes
import AuthRouter from './router/authRouter';
import ProfileRouter from './router/profileRouter';
import RectorRouter from './router/rectorRouter';
import OtpRouter from './router/otpRouter';
import UserRouter from './router/userRouter';
import resetPasswordRouter from './router/resetPasswordRouter'
import PropertyRouter from './router/propertyRouter';
import GroupRouter from './router/groupRouter';


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_COOKIE));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SWAP SPACE App" });

});


// USE ROUTES

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/profiles', ProfileRouter);
app.use('/api/v1/agents', RectorRouter);
app.use('/api/v1/otp', OtpRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/auth/password', resetPasswordRouter);
app.use('/api/v1/properties', PropertyRouter);
app.use('/api/v1/members', GroupRouter);


//ErrorHandlerMiddleware
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";




app.use(helmet());


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//port
const port = 6001;
const start = async () => {
  try {

    app.listen(port, () => {
      console.log(`Listing on port ${port}...`);
    });
  } catch (error) {
    console.log(error)
  }
};

start()