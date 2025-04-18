-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Producto_V" (
    "id" INTEGER,
    "nombre" TEXT,
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION,
    "stock" INTEGER,
    "createdAt" TIMESTAMP(3),
    "imagen" BYTEA,
    "categoria_nombre" TEXT
);
