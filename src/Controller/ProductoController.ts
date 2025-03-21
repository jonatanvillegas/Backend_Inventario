import { Request, Response } from "express"
import { Producto,Producto_V,ProductoDTO } from "../Model/Producto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductoController {
    async ObtenerProductos(req:Request,res:Response){
        try {
            //obteniendo informacion de una vista 
            const Productos:Producto_V[] = await prisma.$queryRaw<Producto_V[]>`
            SELECT * FROM "Producto_V"`;

            if (!Productos) {
                return res.status(404).json({ message: "debes de ingresar productos" })
            }

            res.status(200).json({mensaje:"Todos los productos",Productos});
        } catch (error) {
            res.status(500).json({ message: "Error al otener los productos", error });
        }
    }
    async ObtenerProducto(req:Request,res:Response){
        try {
            const {id} = req.params;

            const IdProducto = parseInt(id);

            //obteniendo un registro de la vista
            const Producto:Producto_V[] = await prisma.$queryRaw<Producto_V[]>`
            SELECT * FROM "Producto_V" WHERE id =  ${IdProducto} 
            `;

            if (Producto.length === 0) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }


            res.status(200).json(Producto);
        } catch (error) {
            res.status(500).json({ message: "Error al otener el producto", error });
        }
    }
    async CrearProducto(req: Request, res: Response) {
        try {
            const producto: ProductoDTO = req.body;
    
            // Validación de datos requeridos
            if (!producto.nombre || !producto.precio || !producto.stock || !producto.categoriaId) {
                return res.status(400).json({ message: "Debes ingresar los datos correctos" });
            }
            
            // Creación del producto en la base de datos
            const nuevoProducto: Producto = await prisma.producto.create({
                data: {
                    nombre: producto.nombre,
                    descripcion: producto.descripcion || null, // Evita undefined, usa null si está vacío
                    imagen: producto.imagen || null,
                    categoriaId: producto.categoriaId,
                    stock: producto.stock,
                    precio: producto.precio,
                },
            });
    
            // Respuesta exitosa
            return res.status(201).json({ message: "Producto creado correctamente", producto: nuevoProducto });
    
        } catch (error:unknown) {
            if (error instanceof Error) {
                return res.status(500).json({ message: "Error al crear el producto", error: error.message });
            }
            return res.status(500).json({ message: "Error desconocido al crear el producto" });
        }
    }
    
    async ActualizarProducto(req:Request,res:Response){
        try {
            const {id} = req.params;

            const IdProducto = parseInt(id);
            const producto:ProductoDTO = req.body;

            if (!producto) {
                res.status(401).json({ message: "Deves ingresar los datos correctos" });
            }
            const Producto:Producto = await prisma.producto.update({
                where:{
                    id : IdProducto
                
                }, data:{
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    categoriaId: producto.categoriaId,
                    stock: producto.stock,
                    precio:producto.precio
                }
                
            });

            res.status(201).json({ message: "Producto actualizado correctamente", producto: Producto });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el producto", error });
        }
    }
    async eliminarProdcuto (request: Request,response: Response) {
    try {
      //obteniendo valor de la url
      const { id } = request.params;
      const IdProducto = parseInt(id)

      if(isNaN(IdProducto)){
        return response.status(400).json({"mensaje":"ID no valido"})
      }

      const producto = await prisma.producto.delete({
        where:{
          id: IdProducto
        }
      })

      return response.status(200).json({"mensaje":"Producto eliminado correctamente", producto})
    } catch (error) {
        response.status(500).json({ message: "Error al eliminar el producto", error });
    }
  }
}


export default new ProductoController();