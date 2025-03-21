/*
  Warnings:

  - You are about to drop the `Imagen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Imagen" DROP CONSTRAINT "Imagen_productoId_fkey";

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "imagen" BYTEA;

-- DropTable
DROP TABLE "Imagen";
