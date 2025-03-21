import express,{ Request, Response }  from "express";
import dotenv from "dotenv"
import categoriaRouter from "./routes/CategoriaRoute";
import ProductoaRouter from "./routes/ProductoRoute";
import userRouter from "./routes/UserRoute";
import cors from "cors"

dotenv.config()
const app = express();

// Configurar CORS
app.use(cors({
    origin: "*", // Permite todas las conexiones 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.use(express.json());


app.use("/categoria",categoriaRouter)
app.use("/producto",ProductoaRouter)
app.use("/",userRouter)


const PORT = process.env.PORT;

app.get("/", (request:Request,response:Response)=>{
    response.status(200).send("La api esta en ejecucion")
})

app.listen(PORT,()=>{
    console.log("servidor corriendo",PORT);
}).on("error", (error)=>{
    throw new Error(error.message);
})