import { NextFunction, Request, Response } from "express";
import {  PrismaClient, Role } from "@prisma/client";
import { Usuario } from "../Model/Usuario";

const prisma = new PrismaClient();

// Middleware para verificar permisos según el rol
const verificarRol =  (rolesPermitidos: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const usuario:Usuario = res.locals.payload; // Obtenemos el usuario del middleware de autenticación

        if (!usuario) {
            return res.status(401).json({ message: "No autorizado" });
        }

        //obteniendo el rol del usuario como objeto
        const rolUsuario = await prisma.user.findUnique({
            where:{
                id:usuario.id
            },
            select:{
                role:true
            }
        }) 

        if (!rolUsuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const role = rolUsuario.role
        
        if (!rolesPermitidos.includes(role)) {
            return res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });
        }

        next(); // Usuario autorizado, continuar con la solicitud
    };
};

export default verificarRol;
