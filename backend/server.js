import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRouter.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import AIRouter from "./routes/AIRouter.js";
import stripeRouter from "./routes/stripeRouter.js";
import User from "./models/User.js";
import connectDB from "./utils/connectDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

cron.schedule("0 * * * *",async() => {
    try{
        const today = new Date();
        const updateUser = await User.updateMany(
            {trialActive:true,trialExpires: { $lt:today}},
            {
                trialActive:false,
                subscriptionPlan: "Free",
                monthlyRequestCount: 5
            }   
        )
        console.log("Trial cron:",updateUser?.modifiedCount ?? 0,)
    } catch(error) {
        console.log(error);
    }
});

cron.schedule("0 0 1 * *",async () => {
    try{
        const today = new Date();
        await User.updateMany(
            { subscriptionPlan: "Basic",nextBillingDate: {$lt:today}},
            {monthlyRequestCount:0}
        );
    } catch(error) {
        console.log(error);
    }
});

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin : process.env.CLIENT_URL,
    credentials:true,
};

app.use(cors(corsOptions));

app.use("/api/v1/users",userRouter);
app.use("/api/v1/ai",AIRouter);
app.use("/api/v1/stripe",stripeRouter);

app.use(errorHandler);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
});
