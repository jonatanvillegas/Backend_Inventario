import { Router } from "express";
import ProductoController from "../Controller/ProductoController";
import auth from "../middleware/auth";
import verificarRol from "../middleware/autorizacionRol";


const ProductoaRouter = Router();

ProductoaRouter.post("/create",verificarRol(["ADMIN"]),auth,ProductoController.CrearProducto)

ProductoaRouter.get("/getAll",auth,verificarRol(["USER","ADMIN"]), ProductoController.ObtenerProductos)
ProductoaRouter.get("/get/:id",auth,verificarRol(["USER","ADMIN"]), ProductoController.ObtenerProducto);
ProductoaRouter.delete("/delete/:id",verificarRol(["ADMIN"]),auth,ProductoController.eliminarProdcuto)
ProductoaRouter.put("/actualizar/:id",verificarRol(["ADMIN"]),auth,ProductoController.ActualizarProducto)

export default ProductoaRouter