import express  from "express";
import { register, login, forgotPassword, getUsers } from "../Controller/auth.js";

export const authRouter = express.Router()

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/forgotpassword").post(forgotPassword);
authRouter.route("/getusers").post(getUsers);



//future route examples

/*router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/likePost', likePost)*/
