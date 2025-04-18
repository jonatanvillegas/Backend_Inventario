import {  PrismaClient} from "@prisma/client";
import { Request, Response } from "express"


const prisma = new PrismaClient();

class LayoutController {
    async ObtenerNavegacion(req: Request, res: Response) {
        try {
            const usuarioId = parseInt(req.params.id);
    
            if (isNaN(usuarioId)) {
                return res.status(400).json({ error: "El id del usuario no es válido." });
            }
    
            const permisos = await prisma.permiso.findMany({
                where: {
                    usuarioId: usuarioId
                },
                select: {
                    navegacion: {
                        select: {
                            id: true,
                            nombre: true,
                            ruta: true,
                            icono: true,
                        }
                    },
                    ver: true,
                    editar: true,
                    eliminar: true,
                    crear: true,
                }
            });
    
            // Si no se encuentran permisos para el usuario
            if (permisos.length === 0) {
                return res.status(404).json({ error: "El usuario no tiene permisos asignados." });
            }
    
            const permisosUsuario = {
                permisos: permisos
                    .filter(permiso => permiso.ver) // solo incluir los que puede ver
                    .map(permiso => ({
                        id: permiso.navegacion.id,
                        nombre: permiso.navegacion.nombre,
                        ruta: permiso.navegacion.ruta,
                        icono: permiso.navegacion.icono,
                        ver: permiso.ver,
                        editar: permiso.editar,
                        eliminar: permiso.eliminar,
                        crear: permiso.crear,
                    }))
            };
    
            return res.status(200).json(permisosUsuario.permisos);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los permisos del usuario." });
        }
    }

    

}

export default new LayoutController();