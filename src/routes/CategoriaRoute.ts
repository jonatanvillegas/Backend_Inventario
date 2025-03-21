import { Router } from "express";
import CategoriaController from "../Controller/CategoriaController";
import auth from "../middleware/auth";
import verificarRol from "../middleware/autorizacionRol";


const categoriaRouter = Router();

categoriaRouter.post("/create",auth,verificarRol(["ADMIN"]),CategoriaController.crearCategoria)

categoriaRouter.get("/getAll",auth, verificarRol(["USER"]),CategoriaController.obtenerCategorias)

categoriaRouter.get("/get/:id",auth,verificarRol(["USER"]), CategoriaController.obtenerCategoria);

// categoriaRouter.delete("/delete/:id",eliminarTarea)

categoriaRouter.put("/actualizar/:id",auth,verificarRol(["ADMIN"]),CategoriaController.actualizarCategoria)

export default categoriaRouter