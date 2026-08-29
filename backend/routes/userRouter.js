import express from 'express';
import {register,login,logout,userProfile,checkAuth} from "../controllers/userController.js"
import isAuthanticated from "../middleware/isAuthanticated.js";
import { verifyPayment } from "../controllers/handleStripePayment.js";

const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/logout",logout);
userRouter.get("/profile",isAuthanticated,userProfile); 
userRouter.get("/auth/check",checkAuth);

export default userRouter;
