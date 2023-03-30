import express  from "express";
import { createGroup, deleteGroup, getGroups, joinGroup } from "../Controller/group.js";


export const groupRouter = express.Router()

groupRouter.route("/").get(getGroups);
groupRouter.route("/").post(createGroup);
groupRouter.route("/join").post(joinGroup);
groupRouter.delete('/:_id',deleteGroup);
