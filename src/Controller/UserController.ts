import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

class UserController {
    async createUser(req: Request, res: Response) {
        const { nombre, email, password } = req.body;

        // Validaciones básicas
        if (!nombre || !email || !password) {
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
                    password: hashedPassword,
                },
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
                return res.status(401).json({ error: "Contraseña incorrecta." });
            }

            return res.status(200).json({ message: "Autenticación exitosa."});
        } catch (error) {
            return res.status(500).json({ error: "Error al autenticar el usuario." });
        }
    }
}

export default new UserController();
