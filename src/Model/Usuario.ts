export type Usuario = {
    id:number
  email:string,
  password:string
  nombre:string | null,
  role:string,    
  createdAt: Date
}
export type UsuarioDTo = Omit<Usuario,"password">

export type Role = {
    ADMIN:string,
    USER:string
}