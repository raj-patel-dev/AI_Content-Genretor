import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Not authorized",
        });
    }

    const user = await User.findById(req?.user?.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    let requestLimit = user?.monthlyRequestCount ?? 0;
    if(user?.trialActive) {
        requestLimit = user?.monthlyRequestCount;
    }

    if(user?.apiRequestCount >= requestLimit) {
        res.status(429);
        throw new Error("API Request limit reached,please subscribe to a plan");
    }
    next();
});

export default checkApiRequestLimit;