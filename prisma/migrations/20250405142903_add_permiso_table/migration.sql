-- CreateTable
CREATE TABLE "Permiso" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "pantalla" TEXT NOT NULL,
    "ver" BOOLEAN NOT NULL DEFAULT false,
    "editar" BOOLEAN NOT NULL DEFAULT false,
    "eliminar" BOOLEAN NOT NULL DEFAULT false,
    "crear" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Permiso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Permiso" ADD CONSTRAINT "Permiso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
