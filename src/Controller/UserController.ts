import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UsuarioDTo } from "../Model/Usuario";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

class UserController {
    async createUser(req: Request, res: Response) {
        const { nombre, email, password,role } = req.body;

        // Validaciones básicas
        if (!nombre || !email || !password || !role) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Formato de correo electrónico no válido." });
        }

        // Validar la longitud del password (por ejemplo, mínimo 6 caracteres)
        if (password.length < 6) {
            return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
        }

        try {
            // Encriptar la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Crear el usuario en la base de datos
            const user = await prisma.user.create({
                data: {
                    nombre,
                    email,
                    role,
                    password: hashedPassword,
                },
            });

            // Obtener los módulos de navegación disponibles
        const navegaciones = await prisma.navegacion.findMany();

        // Crear los permisos iniciales para el usuario (todos con valor false)
        const permisosData = navegaciones.map(navegacion => ({
            usuarioId: user.id,
            navegacionId: navegacion.id,
            ver: false,
            editar: false,
            eliminar: false,
            crear: false,
        }));

        // Crear los permisos en la base de datos
        await prisma.permiso.createMany({
            data: permisosData,
        });

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: "Error al crear el usuario." });
        }
    }

    async obtenerUser(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log(email)
        // Validaciones básicas
        if (!email || !password) {
            return res.status(400).json({ error: "Correo electrónico y contraseña son obligatorios." });
        }

        try {
            // Buscar el usuario por su correo electrónico
            const user = await prisma.user.findUnique({
                where: { email },
            });
            console.log(user)
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado." });
            }

            // Comparar la contraseña proporcionada con la almacenada
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Contraseña incorrecta." });
            }

            return res.status(200).json({ message: "Autenticación exitosa."});
        } catch (error) {
            return res.status(500).json({ error: "Error al autenticar el usuario." });
        }
    }
    async obtenerUsuarios(req: Request, res: Response) {
        try {
            // Buscar el usuario por su correo electrónico
            const users:UsuarioDTo[] = await prisma.user.findMany({
                select:{
                    id:true,
                    nombre:true,
                    email:true,
                    role:true,
                    createdAt:true
                }
            });

            if (users.length < 0) {
                return res.status(404).json({ error: "Revisar base de datis." });
            }

            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: "Error al autenticar el usuario." });
        }
    }
    async obtenerPermisosPorUsuario(req: Request, res: Response) {
        try {
            // Obtener el id del usuario desde los parámetros de la URL
            const usuarioId = parseInt(req.params.id);
    
            // Verificar si el id del usuario es válido
            if (isNaN(usuarioId)) {
                return res.status(400).json({ error: "El id del usuario no es válido." });
            }
    
            // Buscar los permisos del usuario en la tabla de permisos, incluyendo la información de la navegación
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
    
            // Formatear la respuesta en el formato deseado
            const permisosUsuario = {
                userId: usuarioId,
                permisos: permisos.map(permiso => ({
                    id: permiso.navegacion.id,
                    nombre: permiso.navegacion.nombre,
                    ver: permiso.ver,
                    editar: permiso.editar,
                    eliminar: permiso.eliminar,
                    crear: permiso.crear,
                }))
            };
    
            // Retornar la respuesta con los permisos formateados
            return res.status(200).json(permisosUsuario);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los permisos del usuario." });
        }
    }
    async actualizarPermisosPorUsuario(req: Request, res: Response) {
        try {
            const { userId, permisos } = req.body;
    
            if (!userId || !Array.isArray(permisos)) {
                return res.status(400).json({ error: "Datos inválidos proporcionados." });
            }
    
            // Iterar sobre cada permiso recibido
            for (const permiso of permisos) {
                await prisma.permiso.upsert({
                    where: {
                        usuarioId_navegacionId: {
                            usuarioId: userId,
                            navegacionId: permiso.id // ID del módulo (Navegacion)
                        }
                    },
                    update: {
                        ver: permiso.ver,
                        editar: permiso.editar,
                        eliminar: permiso.eliminar,
                        crear: permiso.crear,
                    },
                    create: {
                        usuarioId: userId,
                        navegacionId: permiso.id,
                        ver: permiso.ver,
                        editar: permiso.editar,
                        eliminar: permiso.eliminar,
                        crear: permiso.crear,
                    }
                });
            }
    
            return res.status(200).json({ message: "Permisos actualizados correctamente." });
        } catch (error) {
            console.error("Error al actualizar permisos:", error);
            return res.status(500).json({ error: "Error al actualizar los permisos del usuario." });
        }
    }
    
    
}

export default new UserController();
