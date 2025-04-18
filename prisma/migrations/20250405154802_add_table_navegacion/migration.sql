/*
  Warnings:

  - You are about to drop the column `pantalla` on the `Permiso` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId,navegacionId]` on the table `Permiso` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `navegacionId` to the `Permiso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permiso" DROP COLUMN "pantalla",
ADD COLUMN     "navegacionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Navegacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,
    "icono" TEXT NOT NULL,

    CONSTRAINT "Navegacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permiso_usuarioId_navegacionId_key" ON "Permiso"("usuarioId", "navegacionId");

-- AddForeignKey
ALTER TABLE "Permiso" ADD CONSTRAINT "Permiso_navegacionId_fkey" FOREIGN KEY ("navegacionId") REFERENCES "Navegacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
