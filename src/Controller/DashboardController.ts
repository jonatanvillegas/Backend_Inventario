import { Empresa, PrismaClient, Producto, Producto_V } from "@prisma/client";
import { Request, Response } from "express"


const prisma = new PrismaClient();

class DashboardController {
    async ObtenerDatos(request: Request, response: Response) {
        try {
            const Empresa: Empresa | null = await prisma.empresa.findFirst();

            const TotalProductos = await prisma.producto.count({
                where: {
                    stock: {
                        gt: 0
                    }
                }
            });
            const BajoStock = await prisma.producto.count({
                where: {
                    stock: {
                        lte: Empresa?.limitStock
                    }
                }
            });
            const CantidadCategorias = await prisma.categoria.count();
            const ValorInventario = await prisma.producto.aggregate({
                where: {
                    stock: {
                        gt: 0
                    }
                },
                _sum: {
                    precio: true
                }
            })

            const resumenInventario = {
                totalProductos: TotalProductos,
                bajoStock: BajoStock,
                cantidadCategorias: CantidadCategorias,
                valorInventario: ValorInventario._sum.precio ?? 0
            };

            return response.status(200).json(resumenInventario);
        } catch (error) {
            // Manejo de errores
            console.error('Error al obtener datos del inventario:', error);
            return response.status(500).json({ mensaje: 'Error al obtener los datos del inventario.' });

        } finally {
            // Cerrar la conexión de Prisma al finalizar
            await prisma.$disconnect();
        }
    };

    async ProductoBajoStock(request: Request, response: Response) {
        try {
            const Empresa: Empresa | null = await prisma.empresa.findFirst();

            const Productos: Producto_V[] = await prisma.$queryRaw<Producto_V[]>`
            SELECT * FROM "Producto_V"
            WHERE stock <= ${Empresa?.limitStock ?? 0}
            `;

            const ListaProductos = {
                Productos,
                limitStock:Empresa?.limitStock
            }
            return response.status(200).json(ListaProductos);
        } catch (error) {
            // Manejo de errores
            console.error('Error al obtener datos del inventario:', error);
            return response.status(500).json({ mensaje: 'Error al obtener los datos del inventario.' });

        } finally {
            // Cerrar la conexión de Prisma al finalizar
            await prisma.$disconnect();
        }
    };

}

export default new DashboardController();