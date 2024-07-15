-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "completado" BOOLEAN NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);
