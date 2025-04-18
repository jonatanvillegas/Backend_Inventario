import express,{ Request, Response }  from "express";
import dotenv from "dotenv"
import categoriaRouter from "./routes/CategoriaRoute";
import ProductoaRouter from "./routes/ProductoRoute";
import userRouter from "./routes/UserRoute";
import cors from "cors"
import empresaRouter from "./routes/EmpresaRoute";
import dashboardRouter from "./routes/DashboardRoute";
import layoutdRouter from "./routes/LayoutRoute";


dotenv.config()
const app = express();

// Configurar CORS
app.use(cors({
    origin: "*", // Permite todas las conexiones 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.use(express.json());

app.use("/navegacion",layoutdRouter)
app.use("/dashboard",dashboardRouter)
app.use("/empresa",empresaRouter)
app.use("/categoria",categoriaRouter)
app.use("/producto",ProductoaRouter)
app.use("/",userRouter)

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const PORT = process.env.PORT;

app.get("/", (request:Request,response:Response)=>{
    response.status(200).send("La api esta en ejecucion")
})

app.listen(PORT,()=>{
    console.log("servidor corriendo",PORT);
}).on("error", (error)=>{
    throw new Error(error.message);
})