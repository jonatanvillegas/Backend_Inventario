-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT,
    "ciudad" TEXT,
    "CodigoPostal" INTEGER,
    "limitStock" INTEGER NOT NULL,
    "paginacion" INTEGER DEFAULT 25,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);
