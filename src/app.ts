import * as dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

import express, { Application, Request, Response, NextFunction } from 'express';
const app: Application = express();

import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import prisma from './DB/prisma';
import jwt from 'jsonwebtoken';

const passport = require('passport');
import AppleStrategy from 'passport-apple';

import helmet from 'helmet';
const rateLimitPromise = import('express-rate-limit');
import xss from 'xss-clean';

// import routes
import AuthRouter from './router/authRouter';
import ProfileRouters from './router/profileRouter';
import RealtorRouter from './router/realtorRouter';
import OtpRouters from './router/otpRouter';
import UserRouter from './router/userRouter';
import resetPasswordRouter from './router/resetPasswordRouter';
import PropertyRouter from './router/propertyRouter';
import TeamRouter from './router/teamRouter';
import RatingRouter from './router/ratingRouter';
import OfferRouter from './router/offerRouter';
import InvitationRouter from './router/invitationRouter';
import CorealtorRouter from './router/coRealtorRouter';
import TaskRouter from './router/taskRouter';
import AdminRouter from './router/adminRouter';
import PropertyFormRouter from './router/propertyFormRouter';
import TeamTaskRouter from './router/teamtaskRouter';
import InfoRouter from './router/infoRouter';
import FavoriteRouter from './router/favouriteRouter';
import FeedbackRouter from './router/feedbackRouter';
import WailistRouter from './router/waitlistRouter';
import AgentRouter from './router/agentRouter';
import GetAgentRouter from './router/getAgentRouter';
import AgentOTP from './router/OtpAgentRouter';

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_COOKIE));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());


interface UserInfo {
  id: string;
  name: string;
  emails: string;
}


const applyRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { default: rateLimit } = await rateLimitPromise;

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  limiter(req, res, next);
};
app.use(xss());
app.use(applyRateLimiter);
app.use(helmet());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SWAP SPACE App' });
});


app.get("/login", passport.authenticate('apple'));

app.post("/auth", function(req, res, next) {
	passport.authenticate('apple', function(err: string, user: UserInfo, info: any) {
		if (err) {
			if (err == "AuthorizationError") {
				res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! ");
			} else if (err == "TokenError") {
				res.send("Oops! Couldn't get a valid token from Apple's servers!");
			} else {
				res.send(err);
			}
		} else {

			if (req.body.user) {
				res.json({
					user: req.body.user,
					idToken: user
				});
			} else {
				res.json(user);
			}			
		}
	})(next);
});

// USE ROUTES

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/profiles', ProfileRouters);
app.use('/api/v1/agents', RealtorRouter);
app.use('/api/v1/otp', OtpRouters);
app.use('/api/v1/otp/realtor', AgentOTP);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/auth/password', resetPasswordRouter);
app.use('/api/v1/properties', PropertyRouter);
app.use('/api/v1/teams', TeamRouter);
app.use('/api/v1/ratings', RatingRouter);
app.use('/api/v1/offers', OfferRouter);
app.use('/api/v1/invitations', InvitationRouter);
app.use('/api/v1/auth/co-realtor', CorealtorRouter);
app.use('/api/v1/tasks', TaskRouter);
app.use('/api/v1/auth/admins', AdminRouter);
app.use('/api/v1/properties/owner', PropertyFormRouter);
app.use('/api/v1/teamtasks', TeamTaskRouter);
app.use('/api/v1/meetings', InfoRouter);
app.use('/api/v1/favorites', FavoriteRouter);
app.use('/api/v1/feedbacks', FeedbackRouter);
app.use('/api/v1/waitlist', WailistRouter);
app.use('/api/v1/auth', AgentRouter);
app.use('/api/v1/realtors', GetAgentRouter);

//ErrorHandlerMiddleware
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

passport.use(new AppleStrategy({
  clientID:  process.env.APPLE_ID  || " ",
  teamID: process.env.TEAM_ID || "",
  callbackURL: process.env.CALLBACK_URL,
  keyID: process.env.KEY_ID || "",
  privateKeyLocation: "",
  passReqToCallback: true
}, function(req, accessToken, refreshToken, idToken, profile, cb) {
 

  cb(null, idToken);
}));

//port
const port = process.env.PORT || 6001;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Listing on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
