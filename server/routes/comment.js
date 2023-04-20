import express  from "express";
import { createComment, getComments } from "../Controller/comment.js";

export const commentRouter = express.Router()

commentRouter.route('/').post(createComment)
commentRouter.route('/').get(getComments)
commentRouter.route('/:_id').get()
