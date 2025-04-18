import { Router } from "express";
import CategoriaController from "../Controller/CategoriaController";
import auth from "../middleware/auth";
import verificarRol from "../middleware/autorizacionRol";


const categoriaRouter = Router();

categoriaRouter.post("/create",auth,verificarRol(["USER","ADMIN"]),CategoriaController.crearCategoria)

categoriaRouter.get("/getAll",auth,verificarRol(["USER","ADMIN"]),CategoriaController.obtenerCategorias)

categoriaRouter.get("/get/:id",auth,verificarRol(["USER","ADMIN"]), CategoriaController.obtenerCategoria);

// categoriaRouter.delete("/delete/:id",eliminarTarea)

categoriaRouter.put("/actualizar/:id",auth,verificarRol(["USER","ADMIN"]),CategoriaController.actualizarCategoria)

export default categoriaRouter