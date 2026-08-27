import express from "express";

import isAuthanticated from "../middleware/isAuthanticated.js";
import { AIController } from "../controllers/AIController.js";
import checkApiRequestLimit from "../middleware/checkApiRequestLimit.js";

const AIRouter = express.Router();

AIRouter.post("/generate-content",isAuthanticated,checkApiRequestLimit,AIController);

export default AIRouter;
