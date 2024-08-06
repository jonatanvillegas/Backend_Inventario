import express,{ Request, Response }  from "express";
import dotenv from "dotenv"
import router from "./routes/TareasRoutes";
import userRouter from "./routes/UserRoute";


dotenv.config()
const app = express();
app.use(express.json());


app.use("/tarea",router)
app.use("/",userRouter)


const PORT = process.env.PORT;

app.get("/", (request:Request,response:Response)=>{
    response.status(200).send("hola esta actualizando que plan nsns")
})

app.listen(PORT,()=>{
    console.log("servidor corriendo");
}).on("error", (error)=>{
    throw new Error(error.message);
})