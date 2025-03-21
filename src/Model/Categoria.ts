export type Categoria = {
    id: number;
    nombre: string;
};

export type CategoriaDTO = Omit<Categoria,"id">;