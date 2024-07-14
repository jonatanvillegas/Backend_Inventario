import { Request, Response } from "express"
import { Tarea } from "../Model/Tarea"

const tareas: Tarea[] = [];

const crearTarea = (request: Request, response: Response) => {
  const { nombre } = request.body;
  const nuevaTarea: Tarea = {
    id: tareas.length + 1,
    nombre,
    completado: false
  }
  tareas.push(nuevaTarea)
  response.status(201).json({ message: "Tarea creada correctamente", tarea: nuevaTarea })
}

const obtenerTareas = (request: Request, response: Response) => {
  try {
    response.status(201).json({ message: "Lista de tareas", tareas})
  } catch (error) {
    
  }
}

const obtenerTarea = (request: Request, response: Response) => {
  const { id } = request.params;
  const tarea = tareas.find(t => t.id === parseInt(id));

  if (!tarea) {
    return response.status(404).json({ message: "Tarea no encontrada" });
  }

  response.status(200).json(tarea);
};

const eliminarTarea = (request: Request,response: Response) => {
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
    //obteniendo el indecide el objeto
    const tareaIndex = tareas.findIndex(t=> t.id === tareaId)
    //eliminandolo del arreglo
    tareas.splice(tareaIndex,1)

    return response.status(200).json({"mensaje":"tarea eliminada correctamente", tareas})
  } catch (error) {
    
  }
}

const actualizar = (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { nombre, completado } = request.body;
    const tareaId = parseInt(id);

    if (isNaN(tareaId)) {
      return response.status(400).json({ message: "ID inválido" });
    }

    const tarea = tareas.find(t => t.id === tareaId);
    if (!tarea) {
      return response.status(404).json({ message: "Tarea no encontrada" });
    }

    if (nombre !== undefined) {
      tarea.nombre = nombre;
    }
    if (completado !== undefined) {
      tarea.completado = completado;
    }

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

