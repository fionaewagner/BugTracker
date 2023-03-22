import express from "express";
import { getPrivateData } from "../Controller/private.js";
import { protect } from "../middleware/auth.js";

export const privRouter = express.Router()

privRouter.route('/').get(protect, getPrivateData);


