import { Router } from "express";
import UserController from "../Controller/UserController";
import AuthController from "../Controller/AuthController";


const userRouter = Router();

userRouter.post("/createUser",UserController.createUser)
userRouter.post("/login",AuthController.autentication)
export default userRouter