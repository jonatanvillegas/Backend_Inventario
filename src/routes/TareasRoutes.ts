import {  Router } from "express";
import { actualizar, crearTarea, eliminarTarea, obtenerTarea, obtenerTareas } from "../Controller/TareaController";
import auth from "../middleware/auth";


const router = Router();


router.post("/create",crearTarea)

router.get("/getAll",auth, obtenerTareas)

router.get("/get/:id", obtenerTarea);

router.delete("/delete/:id",eliminarTarea)

router.put("/actualizar/:id",actualizar)

export default router