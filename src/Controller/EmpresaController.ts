import { Empresa } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { EmpresaDTO } from "../Model/Empresa";

const prisma = new PrismaClient();

class EmpresaContorller {
    async CrearEmpresa(req: Request, res: Response) {
        const Empresa: EmpresaDTO = req.body;

        if (!Empresa) {
            return res.status(500).json({ mesaje: "empresa undefined." })
        }

        const EmpresaDTO: Empresa = await prisma.empresa.create({
            data: {
                nombre: Empresa.nombre,
                descripcion: Empresa.descripcion,
                limitStock: Empresa.limitStock,
                CodigoPostal: Empresa.CodigoPostal,
                telefono: Empresa.telefono,
                paginacion: Empresa.paginacion,
                ciudad: Empresa.ciudad,
                email: Empresa.email,
                direccion: Empresa.direccion
            }
        })

        res.status(201).json({ mesaje: "registro creado exitosamente", EmpresaDTO })
    }
    async ObtenerEmpresa(req: Request, res: Response) {


        const Empresa: Empresa | null = await prisma.empresa.findFirst();

        if (!Empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }

        res.status(200).json(Empresa);
        await prisma.$disconnect();
    }
    async actualizarEmpresa(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const Empresa: EmpresaDTO = request.body;
            const EmpresaId = parseInt(id);

            if (isNaN(EmpresaId)) {
                return response.status(400).json({ message: "ID inválido" });
            }

            const EmpresaObj: Empresa = await prisma.empresa.update({
                where: {
                    id: EmpresaId
                }, data: {
                    nombre: Empresa.nombre,
                    descripcion: Empresa.descripcion,
                    limitStock: Empresa.limitStock,
                    CodigoPostal: Empresa.CodigoPostal,
                    telefono: Empresa.telefono,
                    paginacion: Empresa.paginacion,
                    ciudad: Empresa.ciudad,
                    email: Empresa.email,
                    direccion: Empresa.direccion
                }
            })

            response.status(200).json({ message: "Empresa actualizada correctamente", EmpresaObj });
        } catch (error) {
            response.status(500).json({ message: "Error al actualizar el registro de empresa", error });
        }
    };
}

export default new EmpresaContorller();