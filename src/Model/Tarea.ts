export type Tarea = {
    id:number,
    nombre:string,
    completado:boolean
}
export type TareaDTO = Omit<Tarea, "id">
    


