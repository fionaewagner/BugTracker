import express  from "express";
import { createComment, deleteComment, getComments, updateComment } from "../Controller/comment.js";

export const commentRouter = express.Router()

commentRouter.route('/').post(createComment)
commentRouter.route('/').get(getComments)
commentRouter.route('/:_id').delete(deleteComment)
commentRouter.route('/:_id').patch(updateComment)
