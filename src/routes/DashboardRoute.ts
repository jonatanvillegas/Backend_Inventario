import { Router } from "express";
import auth from "../middleware/auth";
import verificarRol from "../middleware/autorizacionRol";
import DashboardController from "../Controller/DashboardController";


const dashboardRouter = Router();

dashboardRouter.get("/datos",auth,verificarRol(["USER","ADMIN"]),DashboardController.ObtenerDatos)

dashboardRouter.get("/bajoStock",auth,verificarRol(["USER","ADMIN"]),DashboardController.ProductoBajoStock)


export default dashboardRouter