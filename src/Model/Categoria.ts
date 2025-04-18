export type Categoria = {
    id: number;
    nombre: string;
};

export type CategoriaDTO = Omit<Categoria,"id">;

export type CategoriaConStock = {
    id :number
    nombre:String
    productosEnStock: number
}