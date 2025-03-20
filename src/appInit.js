import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "../src/models/product.model.js"

//archivos de configuracion
dotenv.config({path: "../.env"})

const productsEjemplos = [   
   
  { "title": "Samsung Galaxy S25 5G 256GB - Icyblue", "price": 47968, "description": "Smartphone de alta gama con conectividad 5G y almacenamiento de 256GB.", "stock": 10, "category": "Smartphones" },
  { "title": "Samsung Galaxy S25 Plus 5G 512GB - Mint", "price": 62800, "description": "Versión Plus del Galaxy S25 con mayor capacidad de almacenamiento y pantalla ampliada.", "stock": 8, "category": "Smartphones" },
  { "title": "Samsung Galaxy S25 Ultra 5G 512GB - Titanium Black", "price": 76400, "description": "Modelo Ultra con cámara de alta resolución y batería de larga duración.", "stock": 5, "category": "Smartphones" },
  { "title": "iPhone 16 PRO MAX 256GB Black Titanium", "price": 67200, "description": "Último modelo de Apple con pantalla de 6.7 pulgadas y cámara avanzada.", "stock": 7, "category": "Smartphones" },
  { "title": "iPhone 16 128GB - Negro", "price": 46400, "description": "Modelo base de la nueva generación de iPhone con almacenamiento de 128GB.", "stock": 12, "category": "Smartphones" },
  { "title": "iPhone 16 PRO 256GB - Desert Titanium", "price": 62000, "description": "Versión Pro del iPhone 16 con mejoras en cámara y rendimiento.", "stock": 9, "category": "Smartphones" },
  { "title": "Honor Magic 7 Lite 512 GB - Purple", "price": 24000, "description": "Smartphone con diseño elegante y gran capacidad de almacenamiento.", "stock": 15, "category": "Smartphones" },
  { "title": "Xiaomi REDMI A3 128GB - Azul", "price": 6560, "description": "Celular económico de Xiaomi con buenas prestaciones y diseño moderno.", "stock": 20, "category": "Smartphones" },
  { "title": "Samsung Galaxy A16 5G 6+128GB 5G - Negro", "price": 11360, "description": "Modelo de gama media con conectividad 5G y buena relación calidad-precio.", "stock": 18, "category": "Smartphones" },
  { "title": "Honor X5B 128GB - Azul", "price": 7040, "description": "Dispositivo accesible con almacenamiento suficiente para el uso diario.", "stock": 25, "category": "Smartphones" }

  ]

//variables de entorno
const URI_MONGODB = process.env.URI_MONGODB;
//mongodb://localhost:27017/ustore
const enviromentInit = async () => {
    await mongoose.connect(URI_MONGODB)

    let result = await ProductModel.insertMany(productsEjemplos)

    console.log("Products inserted", result)
}

enviromentInit()
