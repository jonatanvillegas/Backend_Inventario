import { Router } from "express";
import auth from "../middleware/auth";
import LayoutController from "../Controller/LayoutController";


const layoutdRouter = Router();

layoutdRouter.get("/datos/:id",auth,LayoutController.ObtenerNavegacion)



export default layoutdRouter