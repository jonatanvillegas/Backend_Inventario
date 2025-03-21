
export type Producto = {
    id:number,
    nombre:string,
    descripcion:string | null,
    precio:number,
    stock:number,
    imagen:string |null,
    categoriaId:number,
    createdAt:Date 
}
export type Producto_V = {
    id:number,
    nombre:string,
    descripcion:string | null,
    precio:number,
    stock:number,
    imagen:string |null,
    categoriaId:number,
    NombreCategoria:string,
    createdAt:Date 
}
export type ProductoDTO = Omit<Producto,"id"|"createdAt">