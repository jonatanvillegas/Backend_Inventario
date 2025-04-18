import { Router } from "express";
import EmpresaContorller from "../Controller/EmpresaController";
import auth from "../middleware/auth";
import verificarRol from "../middleware/autorizacionRol";


const empresaRouter = Router();

empresaRouter.post("/create",auth,verificarRol(["USER","ADMIN"]),EmpresaContorller.CrearEmpresa)

empresaRouter.get("/getAll",auth,verificarRol(["USER","ADMIN"]),EmpresaContorller.ObtenerEmpresa)


empresaRouter.put("/actualizar/:id",auth,verificarRol(["USER","ADMIN"]),EmpresaContorller.actualizarEmpresa)

export default empresaRouter