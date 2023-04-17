import express  from "express";
import { register, login, forgotPassword, getUsers, deleteUser, updateUser, getUserById } from "../Controller/auth.js";

export const authRouter = express.Router()

authRouter.route("/register").post(register);
authRouter.route('/:_id').get(getUserById)
authRouter.patch('/:_id', updateUser)
authRouter.route("/login").post(login);
authRouter.route("/forgotpassword").post(forgotPassword);
authRouter.route("/getusers").post(getUsers);
authRouter.delete('/:_id',deleteUser);



//future route examples

/*router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/likePost', likePost)*/
