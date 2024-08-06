import { Request, Response } from "express"
import { Tarea, TareaDTO } from "../Model/Tarea"
import {  PrismaClient } from "@prisma/client";

const   prisma = new PrismaClient();

const crearTarea = async (request: Request, response: Response) => {
  try {
    const { nombre } = request.body;
    
    // Validación del nombre de la tarea
    if (!nombre || nombre.trim() === "") {
      return response.status(400).json({ mensaje: "Debes proporcionar un nombre válido para la tarea" });
    }

    // Crear la tarea utilizando Prisma
    const nuevaTarea:TareaDTO = await prisma.tarea.create({
      data: {
        nombre: nombre,
        completado: false // Guarda el nombre sin espacios al inicio o final
      }
    });

    // Respuesta exitosa
    response.status(201).json({ message: "Tarea creada correctamente", tarea: nuevaTarea });
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear la tarea:", error);
    response.status(500).json({ message: "Error al crear la tarea", error });
  } finally {
    // Cerrar la conexión de Prisma al finalizar
    await prisma.$disconnect();
  }
};

const obtenerTareas = async (request: Request, response: Response) => {
  try {
    const tareas:Tarea[] = await prisma.tarea.findMany();

    if (!tareas) {
      return response.status(404).json({ message: "debes de ingresar una tarea" });
    }

    response.status(201).json({ message: "Lista de tareas", tareas})
    await prisma.$disconnect();
  } catch (error) {
    
  }
}

const obtenerTarea = async (request: Request, response: Response) => {
  const { id } = request.params;
  const tareaId = parseInt(id);

  const tarea: Tarea | null = await prisma.tarea.findUnique({
    where: {
      id : tareaId
    }
  })

  if (!tarea) {
    return response.status(404).json({ message: "Tarea no encontrada" });
  }

  response.status(200).json(tarea);
  await prisma.$disconnect();
};

const eliminarTarea = async (request: Request,response: Response) => {
  try {
    //obteniendo valor de la url
    const { id } = request.params;
    const tareaId = parseInt(id)

    if(isNaN(tareaId)){
      return response.status(400).json({"mensaje":"ID no valido"})
    }

    //validacion de datos 
    if (tareaId === -1) {
      return response.status(404).json({"mensaje":"tarea no encontrada"})
    }
    
    const tarea = await prisma.tarea.delete({
      where:{
        id: tareaId
      }
    })

    return response.status(200).json({"mensaje":"tarea eliminada correctamente", tarea})
  } catch (error) {
    
  }
}

const actualizar = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { nombre, completado } = request.body;
    const tareaId = parseInt(id);

    if (isNaN(tareaId)) {
      return response.status(400).json({ message: "ID inválido" });
    }

    const tarea:Tarea  = await prisma.tarea.update({
      where: {
        id: tareaId
      },data:{
        nombre:nombre,
        completado:completado
      }
    })

    response.status(200).json({ message: "Tarea actualizada correctamente", tarea });
  } catch (error) {
    response.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};



export {
  crearTarea,
  obtenerTareas,
  obtenerTarea,
  eliminarTarea,
  actualizar
}

