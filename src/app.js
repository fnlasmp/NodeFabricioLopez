import express from "express";
import viewsRouter from "./routes/views.router.js"
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

//archivos de configuracion
dotenv.config({path: "../.env"})
//variables de entorno
const PORT = process.env.PORT;
const URI_MONGODB = process.env.URI_MONGODB;
//iniciar express
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//engine handlebars para vistas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
//rutas estaticas
app.use(express.static(__dirname + "/public"))
//mongoose connection
mongoose.connect(URI_MONGODB)
.then(()=>{
    console.log("conected to mongodb")
})
.catch((error)=>{
    console.log("error connecting to mongodb", error)
    process.exit()
})
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})
//routes
app.use("/", viewsRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)

