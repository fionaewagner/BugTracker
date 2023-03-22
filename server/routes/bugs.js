import express  from "express";
import { createBug, getBugs } from "../Controller/bugs.js";


export const bugsRouter = express.Router()

bugsRouter.route("/").get(getBugs);
bugsRouter.route("/create").post(createBug);
