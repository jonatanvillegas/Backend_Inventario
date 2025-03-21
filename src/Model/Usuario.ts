export type Usuario = {
    id:number
  email:string,
  password:string
  nombre:string,
  role:string,    
  createdAt: Date
}

export type Role = {
    ADMIN:string,
    USER:string
}