import express from 'express';
import sendOTP, { resetPassword, signin, signout, signup, verifyOTP } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post('/signin',signin)
authRouter.get('/signout',signout)
authRouter.post('/sendOtp', sendOTP);
authRouter.post('/verifyOtp', verifyOTP);
authRouter.post('/resetPassword', resetPassword);
authRouter.get("/signout", signout);


export default authRouter;
