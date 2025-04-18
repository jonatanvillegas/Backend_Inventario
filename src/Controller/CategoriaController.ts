import { Request, Response } from "express"
import { Categoria, CategoriaDTO } from "../Model/Categoria";
import { categoria_v, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CategoriaController {
  async crearCategoria (request: Request, response: Response) {
    try {
      const { nombre } = request.body;

      // Validación del nombre de la Categoria
      if (!nombre || nombre.trim() === "") {
        return response.status(400).json({ mensaje: "Debes proporcionar un nombre válido para la Categoria" });
      }

      // Crear la Categoria utilizando Prisma
      const NuevaCategoria:CategoriaDTO = await prisma.categoria.create({
        data: {
          nombre: nombre,
        }
      });
      
      console.log(NuevaCategoria)
      // Respuesta exitosa
      response.status(201).json({ message: "Categoria creada correctamente", Categoria: NuevaCategoria });
    } catch (error) {
      // Manejo de errores
      console.error("Error al crear la Categoria:", error);
      response.status(500).json({ message: "Error al crear la Categoria", error });
    } finally {
      // Cerrar la conexión de Prisma al finalizar
      await prisma.$disconnect();
    }
  };

  async obtenerCategorias (request: Request, response: Response) {
    try {

      const Categorias:categoria_v[] = await prisma.$queryRaw<categoria_v[]>`
      SELECT * FROM "categoria_v"`;

      if (!Categorias) {
        return response.status(404).json({ message: "debes de ingresar una Categoria" });
      }

      const categoriasTransformadas = Categorias.map(cat => ({
        ...cat,
        productosenstock: Number(cat.productosenstock), // Convertir BigInt a Number
      }));
      
      response.status(201).json( categoriasTransformadas )
      await prisma.$disconnect();
    } catch (error) {

    }
  }

   async obtenerCategoria (request: Request, response: Response) {
    const { id } = request.params;
    const IdCategoria = parseInt(id);

    const Categoria: Categoria | null = await prisma.categoria.findUnique({
      where: {
        id: IdCategoria
      }
    })

    if (!Categoria) {
      return response.status(404).json({ message: "Categoria no encontrada" });
    }

    response.status(200).json(Categoria);
    await prisma.$disconnect();
  };

  // const eliminarTarea = async (request: Request,response: Response) => {
  //   try {
  //     //obteniendo valor de la url
  //     const { id } = request.params;
  //     const tareaId = parseInt(id)

  //     if(isNaN(tareaId)){
  //       return response.status(400).json({"mensaje":"ID no valido"})
  //     }

  //     //validacion de datos 
  //     if (tareaId === -1) {
  //       return response.status(404).json({"mensaje":"tarea no encontrada"})
  //     }

  //     const tarea = await prisma.tarea.delete({
  //       where:{
  //         id: tareaId
  //       }
  //     })

  //     return response.status(200).json({"mensaje":"tarea eliminada correctamente", tarea})
  //   } catch (error) {

  //   }
  // }

  async actualizarCategoria (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nombre } = request.body;
      const categoriaId = parseInt(id);

      if (isNaN(categoriaId)) {
        return response.status(400).json({ message: "ID inválido" });
      }

      const Categoria: Categoria = await prisma.categoria.update({
        where: {
          id: categoriaId
        }, data: {
          nombre: nombre,
        }
      })

      response.status(200).json({ message: "Categoria actualizada correctamente", Categoria });
    } catch (error) {
      response.status(500).json({ message: "Error al actualizar la Categoria", error });
    }
  };
}
  
export default new CategoriaController();