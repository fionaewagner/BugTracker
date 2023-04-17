import express  from "express";
import { createBug, deleteBug, getBugs } from "../Controller/bugs.js";


export const bugsRouter = express.Router()

bugsRouter.route("/").get(getBugs);
bugsRouter.route("/group").get(getBugs);
bugsRouter.route("/create").post(createBug);
bugsRouter.delete('/:_id',deleteBug);
