import { Router } from "express";
import UserController from "../Controller/UserController";
import AuthController from "../Controller/AuthController";
import auth from "../middleware/auth";
import verificarRol from "../middleware/autorizacionRol";

const userRouter = Router();

userRouter.post("/createUser",UserController.createUser)
userRouter.post("/login",AuthController.autentication)

userRouter.get("/getAll",auth,verificarRol(["USER","ADMIN"]), UserController.obtenerUsuarios)
userRouter.get("/permisos/:id",auth,verificarRol(["ADMIN"]), UserController.obtenerPermisosPorUsuario)
userRouter.put("/editarpermiso",auth,verificarRol(["ADMIN"]), UserController.actualizarPermisosPorUsuario)
export default userRouter