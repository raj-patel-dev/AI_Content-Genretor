import express from "express";

import isAuthanticated from "../middleware/isAuthanticated.js";
import { handleStripePayment,handleFreeSubscription,verifyPayment } from "../controllers/handleStripePayment.js";

const stripeRouter = express.Router();

stripeRouter.post("/checkout",isAuthanticated,handleStripePayment);
stripeRouter.post("/free-plan",isAuthanticated,handleFreeSubscription);
stripeRouter.post("/verify-payment/:paymentId",isAuthanticated,verifyPayment);

export default stripeRouter;

