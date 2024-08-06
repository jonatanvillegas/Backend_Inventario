const bcrypt = require('bcrypt');
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "../utils/jwt";

const prisma = new PrismaClient();

class AuthController {
    async autentication(req:Request,res:Response){
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({"mensaje": "alguno de los campos esta vacio"})
        }
        const user = await prisma.user.findUnique({where:{
            email
        }})

        if (
            !user
        ) {
            return res.status(404).json({"mensaje":"usuario no encontrado"});
        }
        const validacionPassword = bcrypt.compare(password, user.password);

        if (!validacionPassword) {
            return res.status(500).json({"mensaje":"password invalida"})
        }
        const token = jwt.sign({id: user.id, email: user.email})

        return res.status(200).json({"mensaje":"Usuario autenticado","usuario": {id: user.id, nombre: user.nombre, email: user.email},"token":token })
    }
}

export default new AuthController();